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
  
  // Quest format: NAME VALUE [H|L] RANGE UNIT [LAB]
  // Must have at least NAME, VALUE, and RANGE
  
  // This regex requires:
  // 1. Biomarker name (uppercase, can have spaces/punctuation)
  // 2. Single space before value
  // 3. Value (number with optional decimal)
  // 4. Single space after value
  // 5. Optional H or L flag
  // 6. Reference range
  // 7. Unit
  const pattern = /^([A-Z][A-Z\s,\(\)\/\-\.%]+?)\s(\d{1,4}(?:\.\d{1,2})?)\s*([HL])?\s+([<>]?\s*\d+(?:\.\d+)?(?:\s*[-–]\s*\d+(?:\.\d+)?)?|>\s*OR\s*=\s*\d+|<\s*OR\s*=\s*\d+)\s+([a-zA-Z\/\%\(\)]+.*?)\s*(TP|EZ|AMD)?$/
  
  const lines = text.split('\n')
  let skipSection = false
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    
    // Skip sections
    if (line.includes('PERFORMING SITE')) {
      skipSection = true
      continue
    }
    if (skipSection && line.includes('PAGE')) {
      skipSection = false
      continue
    }
    if (skipSection) continue
    
    // Skip non-data lines
    if (!line ||
        line.length < 15 ||
        line.startsWith('Test Name') ||
        line.startsWith('In Range') ||
        line.includes('PAGE OF') ||
        line.includes('CLIENT SERVICES') ||
        line.includes('Quest, Quest Diagnostics') ||
        line.includes('Laboratory Director') ||
        line.includes('CLIA:') ||
        line.includes('For ages') ||
        line.includes('Reference range') ||
        line.includes('Desirable range') ||
        line.includes('Risk Category') ||
        line.includes('Optimal') ||
        line.includes('DIAGNOSTICS') ||
        /^\d{4,5}\s+[A-Z]/.test(line) || // Starts with 4-5 digits (address)
        /^[A-Z]{2,3}\s+QUEST/.test(line) // State code + QUEST
    ) continue
    
    const match = line.match(pattern)
    
    if (match) {
      const name = match[1].trim()
      const value = match[2]
      const flag = match[3] || ''
      const range = match[4]
      const unit = match[5]
      
      // Additional validation
      if (name.length < 3) continue
      if (name.includes('PANEL')) continue
      if (name.includes('et al')) continue
      if (name.includes('Pearson')) continue
      
      // Validate value is reasonable
      const numValue = parseFloat(value)
      if (isNaN(numValue)) continue
      if (numValue > 10000) continue // Too large
      
      biomarkers.push({
        biomarker: name.replace(/\s+/g, ' ').trim(),
        value: value,
        unit: unit.replace(/\(calc\)/g, '').trim() || extractUnitFromName(name),
        referenceRange: range.replace(/\s+/g, ' ').replace('> OR =', '>=').replace('< OR =', '<=').trim(),
        status: flag === 'H' ? 'high' : flag === 'L' ? 'low' : 'normal'
      })
    }
  }
  
  return biomarkers
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
