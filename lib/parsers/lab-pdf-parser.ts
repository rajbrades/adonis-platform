interface ParsedBiomarker {
  biomarker: string
  value: number
  unit: string
  referenceRange: string
  status: 'normal' | 'high' | 'low' | 'critical'
}

interface ParsedLabResult {
  patientName?: string
  testDate?: string
  labName?: string
  biomarkers: ParsedBiomarker[]
}

export async function parseLabPDF(buffer: Buffer): Promise<ParsedLabResult> {
  const pdf = require('pdf-parse-fork')
  
  const result: ParsedLabResult = { biomarkers: [] }
  
  const data = await pdf(buffer)
  const text = data.text

  console.log('=== PDF PARSING DEBUG ===')
  console.log('PDF text length:', text.length)
  console.log('First 1000 chars:', text.substring(0, 1000))

  if (text.match(/quest\s*diagnostics/i)) {
    result.labName = 'Quest Diagnostics'
    console.log('✓ Detected Quest Diagnostics')
  }

  const dateMatch = text.match(/Collected:\s*(\d{2}\/\d{2}\/\d{4})/i)
  if (dateMatch) {
    result.testDate = dateMatch[1]
    console.log('✓ Extracted date:', dateMatch[1])
  }

  // Try simple regex patterns on the entire text first
  const simplePatterns = [
    { name: 'Testosterone Total', regex: /TESTOSTERONE.*TOTAL.*?(\d+)\s+(\d+-\d+)\s+ng\/dL/is },
    { name: 'TSH', regex: /TSH\s+(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+mIU\/L/i },
    { name: 'Vitamin D', regex: /VITAMIN\s*D.*?(\d+)\s+(\d+-\d+)\s+ng\/mL/is },
    { name: 'Cholesterol Total', regex: /CHOLESTEROL.*TOTAL.*?(\d+)\s+[HL\s]*<?\s*(\d+)\s+mg\/dL/is },
    { name: 'HDL Cholesterol', regex: /HDL\s*CHOLESTEROL\s+(\d+)\s+>\s*OR\s*=\s*(\d+)\s+mg\/dL/i },
    { name: 'LDL Cholesterol', regex: /LDL-?CHOLESTEROL.*?(\d+)\s+[HL\s]*mg\/dL/is },
    { name: 'Triglycerides', regex: /TRIGLYCERIDES[^\n]*?(\d+)\s+[HL\s]*<?\s*(\d+)\s+mg\/dL/i },
    { name: 'Glucose', regex: /GLUCOSE\s+(\d+)\s+[HL\s]*(\d+-\d+)\s+mg\/dL/i },
    { name: 'Hemoglobin A1c', regex: /HEMOGLOBIN\s*A1c\s+(\d+\.?\d*)\s+<?\s*(\d+\.?\d*)\s+%/i },
    { name: 'Creatinine', regex: /CREATININE\s+(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+mg\/dL/i },
    { name: 'Hemoglobin', regex: /HEMOGLOBIN\s+(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+g\/dL/i },
    { name: 'PSA', regex: /PSA.*TOTAL\s+(\d+\.?\d*)\s+<\s*OR\s*=\s*(\d+\.?\d*)\s+ng\/mL/is },
    { name: 'Estradiol', regex: /ESTRADIOL[^\n]*?(\d+)\s+[HL\s]*<\s*OR\s*=\s*(\d+)\s+pg\/mL/i },
  ]

  console.log('\n=== TESTING PATTERNS ===')
  for (const pattern of simplePatterns) {
    console.log(`Testing: ${pattern.name}`)
    const match = text.match(pattern.regex)
    if (match) {
      console.log(`  ✓ MATCHED! Value: ${match[1]}, Range: ${match[2] || 'N/A'}`)
      const value = parseFloat(match[1])
      const unit = extractUnit(pattern.name)
      result.biomarkers.push({
        biomarker: pattern.name,
        value,
        unit,
        referenceRange: match[2] || '',
        status: 'normal'
      })
    } else {
      console.log(`  ✗ No match`)
    }
  }

  console.log('\n=== RESULTS ===')
  console.log('Total biomarkers extracted:', result.biomarkers.length)
  console.log('Biomarkers:', result.biomarkers.map(b => b.biomarker).join(', '))
  
  return result
}

function extractUnit(biomarkerName: string): string {
  const units: Record<string, string> = {
    'Testosterone Total': 'ng/dL',
    'TSH': 'mIU/L',
    'Vitamin D': 'ng/mL',
    'Cholesterol Total': 'mg/dL',
    'HDL Cholesterol': 'mg/dL',
    'LDL Cholesterol': 'mg/dL',
    'Triglycerides': 'mg/dL',
    'Glucose': 'mg/dL',
    'Hemoglobin A1c': '%',
    'Creatinine': 'mg/dL',
    'Hemoglobin': 'g/dL',
    'PSA': 'ng/mL',
    'Estradiol': 'pg/mL',
  }
  return units[biomarkerName] || ''
}
