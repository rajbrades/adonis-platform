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
    
    // Skip PERFORMING SITE section entirely
    if (line.includes('PERFORMING SITE')) {
      inPerformingSite = true
      continue
    }
    if (inPerformingSite && (line.includes('PAGE') || i === lines.length - 1)) {
      inPerformingSite = false
      continue
    }
    if (inPerformingSite) continue
    
    // Skip obvious non-biomarker lines
    if (!line || 
        line.length < 10 ||
        line.includes('Test Name') || 
        line.includes('In Range') ||
        line.includes('Out Of Range') ||
        line.includes('Reference Range') ||
        line.includes('PAGE') ||
        line.includes('CLIENT SERVICES') ||
        line.includes('Quest, Quest') ||
        line.includes('Laboratory Director') ||
        line.includes('QUEST DIAGNOSTICS') ||
        line.includes('CHANTILLY') ||
        line.includes('ORTEGA') ||
        line.includes('FOWLER') ||
        line.includes('NEWBROOK') ||
        line.includes('CLIA') ||
        line.includes('DRIVE') ||
        line.includes('AVE') ||
        line.includes('HWY')
    ) continue
    
    // Split line into tokens
    const tokens = line.split(/\s+/)
    
    // Need at least: [NAME, VALUE, RANGE, UNIT]
    if (tokens.length < 3) continue
    
    // Find where the biomarker name ends (first all-caps token that's not followed by another name token)
    let nameEndIdx = 0
    let biomarkerName = ''
    
    for (let j = 0; j < tokens.length; j++) {
      const token = tokens[j]
      
      // If token is a number or flag, name has ended
      if (/^\d+\.?\d*$/.test(token) || token === 'H' || token === 'L') {
        nameEndIdx = j - 1
        biomarkerName = tokens.slice(0, j).join(' ')
        break
      }
    }
    
    if (!biomarkerName || nameEndIdx < 0) continue
    
    // Skip if name is too short or contains exclude words
    if (biomarkerName.length < 3 ||
        biomarkerName.includes('PANEL') ||
        biomarkerName.includes('DIAGNOSTICS') ||
        biomarkerName.includes('NICHOLS') ||
        biomarkerName.includes('Reference') ||
        biomarkerName.includes('Optimal') ||
        biomarkerName.includes('Risk Category')
    ) continue
    
    // Next token after name should be the value
    const valueIdx = nameEndIdx + 1
    if (valueIdx >= tokens.length) continue
    
    const valueToken = tokens[valueIdx]
    
    // Validate it's a number
    if (!/^\d+\.?\d*$/.test(valueToken)) continue
    
    const value = valueToken
    const numValue = parseFloat(value)
    
    // Skip unreasonably large values (addresses/zips)
    if (numValue > 50000) continue
    
    // Check for H/L flag
    let flag = ''
    let rangeIdx = valueIdx + 1
    
    if (rangeIdx < tokens.length && (tokens[rangeIdx] === 'H' || tokens[rangeIdx] === 'L')) {
      flag = tokens[rangeIdx]
      rangeIdx++
    }
    
    // Find reference range (should start with number or < or >)
    let referenceRange = ''
    let unitIdx = rangeIdx
    
    for (let j = rangeIdx; j < tokens.length; j++) {
      const token = tokens[j]
      
      // If it looks like a reference range
      if (/^[<>]?\.?\d+/.test(token) || token === 'OR' || token === '=') {
        referenceRange += (referenceRange ? ' ' : '') + token
        unitIdx = j + 1
      } else if (token.includes('-') && /\d/.test(token)) {
        // Range like "38-380"
        referenceRange += (referenceRange ? ' ' : '') + token
        unitIdx = j + 1
      } else {
        break
      }
    }
    
    // Remaining tokens are unit
    const unit = tokens.slice(unitIdx).filter(t => 
      t !== 'TP' && t !== 'EZ' && t !== 'AMD' && !t.includes('(calc)')
    ).join(' ')
    
    // Only add if we have valid data
    if (biomarkerName && value && referenceRange) {
      biomarkers.push({
        biomarker: biomarkerName.trim(),
        value: value,
        unit: unit.trim() || extractUnitFromName(biomarkerName),
        referenceRange: referenceRange.replace(/\s+/g, ' ').trim(),
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
    'PREGNENOLONE': 'ng/dL'
  }
  
  for (const [key, unit] of Object.entries(unitMap)) {
    if (name.toUpperCase().includes(key)) return unit
  }
  
  return ''
}
