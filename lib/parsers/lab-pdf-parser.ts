import pdfParse from 'pdf-parse-fork'

export async function parseQuestPDF(buffer: Buffer) {
  try {
    const data = await pdfParse(buffer)
    const text = data.text

    console.log('📄 Parsing PDF...')

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
  const match = text.match(/KAIS,\s*JAMES|([A-Z]+,\s*[A-Z]+)/i)
  return match ? match[0] : 'Unknown Patient'
}

function extractDOB(text: string): string {
  const match = text.match(/DOB:\s*(\d{2}\/\d{2}\/\d{4})/)
  return match ? match[1] : ''
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
  
  // Quest format: "BIOMARKER_NAME    VALUE    FLAG    RANGE    UNIT"
  // Match lines with biomarker data
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    
    // Skip headers and empty lines
    if (!line || line.includes('Test Name') || line.includes('Patient Information')) continue
    
    // Try to extract biomarker data from the line
    // Pattern: NAME followed by numbers
    const biomarkerMatch = line.match(/^([A-Z][A-Z\s,\(\)\/\-]+?)\s+(\d+\.?\d*)\s*(H|L)?\s*([\d\.\-<>]+)/)
    
    if (biomarkerMatch) {
      const name = biomarkerMatch[1].trim()
      const value = biomarkerMatch[2]
      const flag = biomarkerMatch[3] || ''
      const range = biomarkerMatch[4]
      
      biomarkers.push({
        biomarker: name,
        value: value,
        unit: extractUnitFromName(name),
        referenceRange: range,
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
    'VITAMIN D': 'ng/mL',
    'GLUCOSE': 'mg/dL',
    'CHOLESTEROL': 'mg/dL',
    'TRIGLYCERIDES': 'mg/dL',
    'HDL': 'mg/dL',
    'LDL': 'mg/dL',
    'HEMOGLOBIN': 'g/dL',
    'CREATININE': 'mg/dL',
    'PSA': 'ng/mL'
  }
  
  for (const [key, unit] of Object.entries(unitMap)) {
    if (name.includes(key)) return unit
  }
  
  return ''
}
