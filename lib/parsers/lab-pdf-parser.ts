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
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    
    if (!line || 
        line.includes('Test Name') || 
        line.includes('PAGE') ||
        line.includes('CLIENT SERVICES') ||
        line.includes('Quest, Quest') ||
        line.includes('PANEL') ||
        line.length < 5) continue
    
    const patterns = [
      /^([A-Z][A-Z\s,\(\)\/\-\.%]+?)(\d+\.?\d*)\s*([HL])?\s*([<>]?\s*\d+\.?\d*(?:\s*-\s*\d+\.?\d*)?|> OR = \d+|< OR = \d+)?\s*([a-zA-Z\/\%\(\)]+.*?)?(TP|EZ|AMD)?$/,
      /^([A-Z][A-Z\s,\(\)\/\-\.%]+?)(\d+\.?\d*)([<>]?\s*\d+\.?\d*(?:\s*-\s*\d+\.?\d*)?|> OR = \d+|< OR = \d+)\s*([a-zA-Z\/\%]+.*?)?(TP|EZ|AMD)?$/,
    ]
    
    let matched = false
    
    for (const pattern of patterns) {
      const match = line.match(pattern)
      
      if (match) {
        const name = match[1].trim()
        const value = match[2]
        const flag = match[3] || ''
        const range = match[4] || ''
        const unit = match[5] || ''
        
        if (name.length < 3 || 
            name.includes('Reference') ||
            name.includes('For ages') ||
            name.includes('Desirable') ||
            name.includes('Risk Category')) continue
        
        biomarkers.push({
          biomarker: name.replace(/\s+/g, ' ').trim(),
          value: value,
          unit: unit.replace(/\(calc\)/g, '').trim() || extractUnitFromName(name),
          referenceRange: range.replace('> OR =', '>=').replace('< OR =', '<=').trim(),
          status: flag === 'H' ? 'high' : flag === 'L' ? 'low' : 'normal'
        })
        
        matched = true
        break
      }
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
