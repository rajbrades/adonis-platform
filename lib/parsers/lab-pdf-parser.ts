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
    
    if (line.includes('PERFORMING SITE')) {
      inPerformingSite = true
      continue
    }
    if (inPerformingSite) continue
    
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
        let value = match[2]
        const flag = match[3] || ''
        const range = match[4] || ''
        const unit = match[5] || ''
        
        if (name.length < 3 || 
            name.includes('Reference') ||
            name.includes('For ages') ||
            name.includes('Desirable') ||
            name.includes('Risk Category')) continue
        
        // POST-PROCESSING: Fix concatenated values
        value = fixConcatenation(value, range, name)
        
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

function fixConcatenation(value: string, range: string, biomarkerName: string): string {
  // Only process integer values (no decimals)
  if (!value || value.includes('.')) return value
  
  const numValue = parseInt(value)
  if (isNaN(numValue)) return value
  
  // Extract first digit of range
  const rangeMatch = range.match(/(\d+)/)
  if (!rangeMatch) return value
  
  const rangeFirstDigit = rangeMatch[1][0]
  const valueLastDigit = value[value.length - 1]
  
  // If value's last digit matches range's first digit, likely concatenated
  if (valueLastDigit === rangeFirstDigit) {
    // Additional validation: is the truncated value more reasonable?
    const truncated = value.slice(0, -1)
    const truncatedNum = parseInt(truncated)
    
    // Only fix if:
    // 1. Original value is 3-4 digits
    // 2. Truncated value is 2-3 digits
    // 3. Makes biological sense (< 1000 for most biomarkers)
    if (value.length >= 3 && value.length <= 4 && 
        truncated.length >= 2 && truncatedNum < 1000) {
      console.log(`Fixed concatenation: ${biomarkerName} ${value} → ${truncated}`)
      return truncated
    }
  }
  
  return value
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
    'PHOSPHATASE': 'U/L',
    'AST': 'U/L',
    'ALT': 'U/L'
  }
  
  for (const [key, unit] of Object.entries(unitMap)) {
    if (name.toUpperCase().includes(key)) return unit
  }
  
  return ''
}
