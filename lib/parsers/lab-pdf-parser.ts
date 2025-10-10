import type { Buffer } from 'buffer'

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
  // @ts-ignore - pdf-parse doesn't have types
  const pdfParse = (await import('pdf-parse')).default
  
  const result: ParsedLabResult = { biomarkers: [] }
  
  const data = await pdfParse(buffer)
  const text = data.text

  console.log('PDF extracted successfully, length:', text.length)

  // Detect Quest
  if (text.match(/quest\s*diagnostics/i)) {
    result.labName = 'Quest Diagnostics'
  }

  // Extract collection date
  const dateMatch = text.match(/Collected:\s*(\d{2}\/\d{2}\/\d{4})/i)
  if (dateMatch) result.testDate = dateMatch[1]

  // Parse each test result
  const testPatterns = [
    {
      name: 'Testosterone Total',
      pattern: /TESTOSTERONE,?\s*TOTAL[^\n]*?(\d+)\s+(\d+-\d+)\s+ng\/dL/i,
      unit: 'ng/dL'
    },
    {
      name: 'Testosterone Free',
      pattern: /TESTOSTERONE,?\s*FREE[^\n]*?(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+pg\/mL/i,
      unit: 'pg/mL'
    },
    {
      name: 'Vitamin D',
      pattern: /VITAMIN\s*D[^\n]*?(\d+)\s+(\d+-\d+)\s+ng\/mL/i,
      unit: 'ng/mL'
    },
    {
      name: 'TSH',
      pattern: /TSH\s+(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+m[iI]U\/L/i,
      unit: 'mIU/L'
    },
    {
      name: 'T4 Free',
      pattern: /T4,?\s*FREE\s+(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+ng\/dL/i,
      unit: 'ng/dL'
    },
    {
      name: 'T3 Free',
      pattern: /T3,?\s*FREE\s+(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+pg\/mL/i,
      unit: 'pg/mL'
    },
    {
      name: 'Cholesterol Total',
      pattern: /CHOLESTEROL,?\s*TOTAL[^\n]*?(\d+)\s+[HL\s]*<\s*(\d+)\s+mg\/dL/i,
      unit: 'mg/dL'
    },
    {
      name: 'HDL Cholesterol',
      pattern: /HDL\s*CHOLESTEROL\s+(\d+)\s+>\s*OR\s*=\s*(\d+)\s+mg\/dL/i,
      unit: 'mg/dL'
    },
    {
      name: 'LDL Cholesterol',
      pattern: /LDL-?CHOLESTEROL[^\n]*?(\d+)\s+[HL\s]*mg\/dL/i,
      unit: 'mg/dL',
      defaultRange: '<100'
    },
    {
      name: 'Triglycerides',
      pattern: /TRIGLYCERIDES[^\n]*?(\d+)\s+[HL\s]*<\s*(\d+)\s+mg\/dL/i,
      unit: 'mg/dL'
    },
    {
      name: 'Glucose',
      pattern: /GLUCOSE\s+(\d+)\s+[HL\s]*(\d+-\d+)\s+mg\/dL/i,
      unit: 'mg/dL'
    },
    {
      name: 'Hemoglobin A1c',
      pattern: /HEMOGLOBIN\s*A1c\s+(\d+\.?\d*)\s+<\s*(\d+\.?\d*)\s+%/i,
      unit: '%'
    },
    {
      name: 'Hemoglobin',
      pattern: /HEMOGLOBIN\s+(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+g\/dL/i,
      unit: 'g/dL'
    },
    {
      name: 'Hematocrit',
      pattern: /HEMATOCRIT\s+(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+%/i,
      unit: '%'
    },
    {
      name: 'Creatinine',
      pattern: /CREATININE\s+(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+mg\/dL/i,
      unit: 'mg/dL'
    },
    {
      name: 'PSA',
      pattern: /PSA,?\s*TOTAL\s+(\d+\.?\d*)\s+<\s*OR\s*=\s*(\d+\.?\d*)\s+ng\/mL/i,
      unit: 'ng/mL'
    },
    {
      name: 'Estradiol',
      pattern: /ESTRADIOL[^\n]*?(\d+)\s+[HL\s]*<\s*OR\s*=\s*(\d+)\s+pg\/mL/i,
      unit: 'pg/mL'
    },
    {
      name: 'Iron Total',
      pattern: /IRON,?\s*TOTAL\s+(\d+)\s+(\d+-\d+)\s+mcg\/dL/i,
      unit: 'mcg/dL'
    },
    {
      name: 'Ferritin',
      pattern: /FERRITIN\s+(\d+)\s+(\d+-\d+)\s+ng\/mL/i,
      unit: 'ng/mL'
    },
    {
      name: 'SHBG',
      pattern: /SEX\s*HORMONE\s*BINDING\s*GLOBULIN\s+(\d+)\s+(\d+-\d+)\s+nmol\/L/i,
      unit: 'nmol/L'
    },
    {
      name: 'DHEA-S',
      pattern: /DHEA\s*SULFATE\s+(\d+)\s+(\d+-\d+)\s+mcg\/dL/i,
      unit: 'mcg/dL'
    },
    {
      name: 'Insulin',
      pattern: /INSULIN\s+(\d+\.?\d*)\s+uIU\/mL/i,
      unit: 'uIU/mL',
      defaultRange: '<=18.4'
    },
    {
      name: 'IGF-1',
      pattern: /IGF\s*1[^\n]*?(\d+)\s+(\d+-\d+)\s+ng\/mL/i,
      unit: 'ng/mL'
    },
    {
      name: 'Cortisol',
      pattern: /CORTISOL[^\n]*?(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+(?:μg|ug)\/dL/i,
      unit: 'μg/dL'
    },
  ]

  for (const test of testPatterns) {
    const match = text.match(test.pattern)
    if (match) {
      const value = parseFloat(match[1])
      const referenceRange = match[2] || test.defaultRange || ''
      
      result.biomarkers.push({
        biomarker: test.name,
        value,
        unit: test.unit,
        referenceRange,
        status: 'normal'
      })
    }
  }

  console.log('Extracted biomarkers:', result.biomarkers.length)
  
  return result
}
