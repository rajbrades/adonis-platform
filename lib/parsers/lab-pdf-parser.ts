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
  
  // Track if we're in sections to skip
  let inPerformingSite = false
  let skipUntilNextSection = false
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    
    // Detect and skip PERFORMING SITE section
    if (line.includes('PERFORMING SITE')) {
      inPerformingSite = true
      continue
    }
    
    // Exit PERFORMING SITE when we hit end markers
    if (inPerformingSite && (line.includes('PAGE') || line.includes('CLIENT SERVICES'))) {
      inPerformingSite = false
      continue
    }
    
    // Skip everything in PERFORMING SITE section
    if (inPerformingSite) continue
    
    // Skip lines that are clearly not biomarkers
    if (!line || 
        line.length < 5 ||
        line.includes('Test Name') || 
        line.includes('In Range') ||
        line.includes('Out Of Range') ||
        line.includes('Reference Range') ||
        line.includes('PAGE') ||
        line.includes('CLIENT SERVICES') ||
        line.includes('Quest, Quest') ||
        line.includes('PANEL') ||
        line.includes('Laboratory Director') ||
        line.includes('QUEST DIAGNOSTICS') ||
        line.includes('CHANTILLY') ||
        line.includes('ORTEGA') ||
        line.includes('FOWLER') ||
        line.includes('NEWBROOK') ||
        line.includes('CLIA:') ||
        line.includes('DRIVE') ||
        line.includes('AVE') ||
        line.includes('HWY') ||
        line.match(/^\d{5}\s+/) || // Starts with 5-digit zip
        line.match(/^[A-Z]{2}\s+QUEST/) // State code + QUEST
    ) continue
    
    // Pattern requires spaces around value to prevent digit concatenation
    const pattern = /^([A-Z][A-Z\s,\(\)\/\-\.%]+?)\s+(\d+\.?\d*)\s+([HL])?\s*([<>]?\s*\d+\.?\d*(?:\s*[-–]\s*\d+\.?\d*)?|> OR = \d+\.?\d*|< OR = \d+\.?\d*)\s+([a-zA-Z\/\%\(\)]+.*?)\s*(TP|EZ|AMD)?$/
    
    const match = line.match(pattern)
    
    if (match) {
      const name = match[1].trim()
      const value = match[2]
      const flag = match[3] || ''
      const range = match[4] || ''
      const unit = match[5] || ''
      
      // Additional filters for non-biomarker lines
      if (name.length < 3 || 
          name.includes('Reference') ||
          name.includes('For ages') ||
          name.includes('Desirable') ||
          name.includes('Risk Category') ||
          name.includes('Optimal') ||
          name.includes('Moderate') ||
          name.includes('High Risk') ||
          name.includes('DIAGNOSTICS') ||
          name.includes('NICHOLS') ||
          name.includes('SJC') ||
          name.includes('TAMPA') ||
          /^\d+$/.test(name) || // Pure numbers
          /^[A-Z]{2,5}$/.test(name) // State codes
      ) continue
      
      // Skip unreasonably large values (likely addresses/zip codes)
      const numValue = parseFloat(value)
      if (numValue > 50000) continue
      
      biomarkers.push({
        biomarker: name.replace(/\s+/g, ' ').trim(),
        value: value,
        unit: unit.replace(/\(calc\)/g, '').trim() || extractUnitFromName(name),
        referenceRange: range.replace('> OR =', '>=').replace('< OR =', '<=').trim(),
        status: flag === 'H' ? 'high' : flag === 'L' ? 'low' : 'normal'
      })
    }
  }
  
  return biomarkers.filter(b => b.biomarker && b.value)
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
    'CRP': 'mg/L'
  }
  
  for (const [key, unit] of Object.entries(unitMap)) {
    if (name.toUpperCase().includes(key)) return unit
  }
  
  return ''
}
