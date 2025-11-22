import pdfParse from 'pdf-parse-fork'

export async function parseQuestPDF(buffer: Buffer) {
  try {
    const data = await pdfParse(buffer)
    const text = data.text

    console.log('📄 Parsing Quest PDF...')
    console.log('First 500 chars:', text.substring(0, 500))

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
  
  console.log(`Total lines: ${lines.length}`)
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    
    // Look for lines with biomarker patterns
    // Very simple: uppercase word(s), then a number, then something that looks like a range
    
    // Skip obvious headers/footers
    if (line.includes('Test Name') || 
        line.includes('PAGE') ||
        line.includes('CLIENT SERVICES') ||
        line.includes('Quest, Quest') ||
        line.includes('PERFORMING SITE') ||
        line.includes('Laboratory Director')) {
      continue
    }
    
    // Look for pattern: WORD(S) NUMBER ... RANGE ... UNIT
    // Example: "IRON, TOTAL 152 50-180 mcg/dL"
    // Example: "FERRITIN 65 38-380 ng/mL"
    
    // Match: starts with letters, has a number somewhere, has a dash (for range)
    if (/^[A-Z]/.test(line) && /\d+/.test(line) && /-/.test(line)) {
      
      // Extract parts using a simpler approach
      const parts = line.trim().split(/\s+/)
      
      if (parts.length < 4) continue
      
      // Find the first number - that's probably the value
      let valueIdx = -1
      for (let j = 0; j < parts.length; j++) {
        if (/^\d+\.?\d*$/.test(parts[j])) {
          valueIdx = j
          break
        }
      }
      
      if (valueIdx === -1 || valueIdx === 0) continue
      
      // Everything before the value is the name
      const name = parts.slice(0, valueIdx).join(' ')
      const value = parts[valueIdx]
      
      // Skip if name is too short or looks like garbage
      if (name.length < 3) continue
      if (name.includes('For ages')) continue
      if (name.includes('Desirable')) continue
      if (name.includes('DIAGNOSTICS')) continue
      if (/^\d{4,}/.test(name)) continue
      
      // Check for H/L flag
      let flag = ''
      let rangeStart = valueIdx + 1
      if (rangeStart < parts.length && (parts[rangeStart] === 'H' || parts[rangeStart] === 'L')) {
        flag = parts[rangeStart]
        rangeStart++
      }
      
      // Find the range (something with a dash or < or >)
      let range = ''
      let unitStart = rangeStart
      for (let j = rangeStart; j < parts.length; j++) {
        if (parts[j].includes('-') || parts[j].includes('<') || parts[j].includes('>') || parts[j] === 'OR' || parts[j] === '=') {
          range += (range ? ' ' : '') + parts[j]
          unitStart = j + 1
        } else if (range && /^\d/.test(parts[j])) {
          range += ' ' + parts[j]
          unitStart = j + 1
        } else {
          break
        }
      }
      
      // Rest is unit
      const unit = parts.slice(unitStart).filter(p => p !== 'TP' && p !== 'EZ' && p !== 'AMD' && !p.includes('(calc)')).join(' ')
      
      // Validate value is reasonable
      const numValue = parseFloat(value)
      if (isNaN(numValue) || numValue > 50000) continue
      
      if (name && value && range) {
        console.log(`Found: ${name} = ${value} ${flag} (${range}) ${unit}`)
        
        biomarkers.push({
          biomarker: name,
          value: value,
          unit: unit || extractUnitFromName(name),
          referenceRange: range,
          status: flag === 'H' ? 'high' : flag === 'L' ? 'low' : 'normal'
        })
      }
    }
  }
  
  console.log(`Extracted ${biomarkers.length} total biomarkers`)
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
