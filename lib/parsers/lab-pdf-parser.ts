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
  // Look for patient name in header
  const match = text.match(/Patient Information[^]*?([A-Z]+,\s*[A-Z]+)/)
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
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    
    // Skip empty lines and headers
    if (!line || line.includes('Test Name') || line.includes('Reference Range')) continue
    
    // Pattern 1: NAME VALUE FLAG RANGE UNIT
    // Example: "IRON, TOTAL 152 50-180 mcg/dL"
    const pattern1 = /^([A-Z][A-Z\s,\(\)\/\-\.]+?)\s+(\d+\.?\d*|<\d+)\s*(H|L)?\s*([\d\.\-<>]+(?:\s*-\s*[\d\.]+)?|<\s*\d+|>\s*\d+|> OR = \d+)\s*(.+?)?\s*$/
    
    const match = line.match(pattern1)
    
    if (match) {
      const name = match[1].trim()
      const value = match[2].trim()
      const flag = match[3] || ''
      let range = match[4] ? match[4].trim() : ''
      const unit = match[5] ? match[5].trim() : ''
      
      // Skip if it looks like a header or label
      if (name.length < 3 || name.includes('PAGE') || name.includes('CLIENT')) continue
      
      // Clean up unit
      const cleanUnit = unit.replace(/\(calc\)/g, '').trim()
      
      // Clean up range
      range = range.replace('> OR =', '>=').replace('< OR =', '<=')
      
      biomarkers.push({
        biomarker: name,
        value: value,
        unit: cleanUnit || extractUnitFromName(name),
        referenceRange: range,
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
    if (name.includes(key)) return unit
  }
  
  return ''
}
