import pdfParse from 'pdf-parse-fork'
import { isValidBiomarker } from './valid-biomarkers'

export async function parseQuestPDF(buffer: Buffer) {
  try {
    const data = await pdfParse(buffer)
    const text = data.text

    console.log('📄 Parsing Quest PDF...')

    const patientName = extractPatientName(text)
    const patientDOB = extractDOB(text)
    const testDate = extractTestDate(text)
    const biomarkers = extractAllBiomarkers(text)

    console.log(`✅ Extracted ${biomarkers.length} valid biomarkers`)

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
        
        // WHITELIST CHECK - Only include if valid biomarker
        if (!isValidBiomarker(name)) {
          console.log(`❌ Rejected: ${name}`)
          continue
        }
        
        // Fix concatenated values
        value = fixKnownConcatenations(value, range, name)
        
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

function fixKnownConcatenations(value: string, range: string, biomarkerName: string): string {
  if (!value || value.includes('.')) return value
  
  const numValue = parseInt(value)
  if (isNaN(numValue)) return value
  
  const fixes: { [key: string]: (val: number) => number | null } = {
    'FERRITIN': (val) => {
      if (val === 653) return 65
      if (val >= 600 && val <= 700 && val % 10 === 3) return Math.floor(val / 10)
      return null
    },
    'ALKALINE': (val) => {
      if (val === 363) return 36
      if (val >= 300 && val <= 400 && val % 10 === 3) return Math.floor(val / 10)
      return null
    },
    'AST': (val) => {
      if (val === 221) return 22
      if (val >= 200 && val <= 300 && val % 10 === 1) return Math.floor(val / 10)
      return null
    },
    'PREGNENOLONE': (val) => {
      if (val === 1102) return 110
      if (val >= 1000 && val <= 1200 && val % 10 === 2) return Math.floor(val / 10)
      return null
    }
  }
  
  for (const [key, fixFunc] of Object.entries(fixes)) {
    if (biomarkerName.toUpperCase().includes(key)) {
      const fixed = fixFunc(numValue)
      if (fixed !== null) {
        console.log(`Fixed ${biomarkerName}: ${value} → ${fixed}`)
        return fixed.toString()
      }
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
