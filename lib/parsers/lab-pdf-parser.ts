import pdfParse from 'pdf-parse-fork'

export async function parseQuestPDF(buffer: Buffer) {
  try {
    const data = await pdfParse(buffer)
    const text = data.text

    console.log('📄 Parsing Quest PDF...')

    const patientName = extractPatientName(text)
    const patientDOB = extractDOB(text)
    const testDate = extractTestDate(text)
    const biomarkers = extractAllBiomarkers(text)

    console.log(`✅ Extracted ${biomarkers.length} biomarkers`)

    return {
      patientName,
      patientDOB,
      testDate,
      panelName: 'Quest Diagnostics Comprehensive Panel',
      biomarkers
    }
  } catch (error: any) {
    throw new Error(`Failed to parse PDF: ${error.message}`)
  }
}

function extractPatientName(text: string): string {
  const match = text.match(/Patient Information[^]*?([A-Z]+,\s*[A-Z]+)/i)
  return match ? match[1].trim() : 'Unknown Patient'
}

function extractDOB(text: string): string {
  const match = text.match(/DOB:\s*(\d{2}\/\d{2}\/\d{4})/)
  if (match) {
    const [month, day, year] = match[1].split('/')
    return `${year}-${month}-${day}`
  }
  return ''
}

function extractTestDate(text: string): string {
  const match = text.match(/Collected:\s*(\d{2}\/\d{2}\/\d{4})/)
  if (match) {
    const [month, day, year] = match[1].split('/')
    return `${year}-${month}-${day}`
  }
  return new Date().toISOString().split('T')[0]
}

function extractAllBiomarkers(text: string): any[] {
  const biomarkers: any[] = []
  const lines = text.split('\n')
  
  let inPerformingSite = false
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    
    // Skip PERFORMING SITE section
    if (line.includes('PERFORMING SITE')) {
      inPerformingSite = true
      continue
    }
    if (inPerformingSite) {
      if (line.includes('PAGE') || line.includes('CLIENT SERVICES')) {
        inPerformingSite = false
      }
      continue
    }
    
    // Skip obvious non-biomarker lines
    if (!line || line.length < 10) continue
    if (line.includes('Test Name')) continue
    if (line.includes('PAGE OF')) continue
    if (line.includes('CLIENT SERVICES')) continue
    if (line.includes('Quest, Quest')) continue
    if (line.includes('Laboratory Director')) continue
    if (line.includes('CLIA:')) continue
    
    // Multiple patterns to try (from most specific to most lenient)
    const patterns = [
      // Pattern 1: NAME VALUE H/L RANGE UNIT LAB
      /^([A-Z][A-Z\s,\(\)\/\-\.]+?)\s+(\d+\.?\d*)\s+([HL])\s+([<>]?[\d\.\-\s]+)\s+([a-zA-Z\/\%]+)/,
      // Pattern 2: NAME VALUE RANGE UNIT LAB
      /^([A-Z][A-Z\s,\(\)\/\-\.]+?)\s+(\d+\.?\d*)\s+([<>]?[\d\.\-\s]+)\s+([a-zA-Z\/\%]+)/,
      // Pattern 3: NAME VALUE H/L RANGE UNIT
      /^([A-Z][A-Z\s,\(\)\/\-\.]+?)\s+(\d+\.?\d*)\s+([HL])\s+([<>]?[\d\.\-\s]+)\s+([a-zA-Z\/\%]+)/,
      // Pattern 4: NAME VALUE RANGE UNIT (most lenient)
      /^([A-Z][A-Z\s,\(\)\/\-\.]+?)\s+(\d+\.?\d*)\s+([<>]?[\d\.\-\s]+)\s+([a-zA-Z\/\%]+)/
    ]
    
    let matched = false
    
    for (const pattern of patterns) {
      const match = line.match(pattern)
      
      if (match) {
        const name = match[1].trim()
        const value = match[2]
        
        // Check if match[3] is H/L or part of range
        let flag = ''
        let range = ''
        let unit = ''
        
        if (match[3] === 'H' || match[3] === 'L') {
          flag = match[3]
          range = match[4]
          unit = match[5] || ''
        } else {
          flag = ''
          range = match[3]
          unit = match[4] || ''
        }
        
        // Validate biomarker name
        if (name.length < 3) continue
        if (name.includes('PANEL')) continue
        if (name.includes('For ages')) continue
        if (name.includes('Reference')) continue
        if (name.includes('Desirable')) continue
        if (name.includes('et al')) continue
        if (name.includes('DIAGNOSTICS')) continue
        if (/^\d{4,5}/.test(name)) continue // Starts with address number
        
        // Validate value
        const numValue = parseFloat(value)
        if (isNaN(numValue) || numValue > 10000) continue
        
        // Clean up range
        range = range.replace(/\s+/g, ' ').replace('> OR =', '>=').replace('< OR =', '<=').trim()
        
        // Clean up unit
        unit = unit.replace(/\(calc\)/g, '').replace('TP', '').replace('EZ', '').replace('AMD', '').trim()
        
        biomarkers.push({
          biomarker: name.replace(/\s+/g, ' ').trim(),
          value: value,
          unit: unit || extractUnitFromName(name),
          referenceRange: range,
          status: flag === 'H' ? 'high' : flag === 'L' ? 'low' : 'normal'
        })
        
        matched = true
        break
      }
    }
  }
  
  // Deduplicate by name
  const seen = new Set()
  return biomarkers.filter(b => {
    if (seen.has(b.biomarker)) return false
    seen.add(b.biomarker)
    return true
  })
}

function extractUnitFromName(name: string): string {
  const unitMap: { [key: string]: string } = {
    'TESTOSTERONE': 'ng/dL',
    'ESTRADIOL': 'pg/mL',
    'TSH': 'mIU/L',
    'T4': 'ng/dL',
    'T3': 'pg/mL',
    'VITAMIN D': 'ng/mL',
    'GLUCOSE': 'mg/dL',
    'CHOLESTEROL': 'mg/dL',
    'TRIGLYCERIDES': 'mg/dL',
    'HDL': 'mg/dL',
    'LDL': 'mg/dL',
    'HEMOGLOBIN': 'g/dL',
    'HEMATOCRIT': '%',
    'CREATININE': 'mg/dL',
    'PSA': 'ng/mL',
    'IRON': 'mcg/dL',
    'FERRITIN': 'ng/mL',
    'DHEA': 'mcg/dL',
    'INSULIN': 'uIU/mL',
    'IGF': 'ng/mL',
    'CRP': 'mg/L',
    'PREGNENOLONE': 'ng/dL',
    'ALKALINE': 'U/L',
    'AST': 'U/L',
    'ALT': 'U/L'
  }
  
  for (const [key, unit] of Object.entries(unitMap)) {
    if (name.toUpperCase().includes(key)) return unit
  }
  
  return ''
}
