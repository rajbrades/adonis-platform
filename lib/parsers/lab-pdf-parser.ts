const pdfParse = require('pdf-parse')

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
  try {
    const data = await pdfParse(buffer)
    const text = data.text

    console.log('PDF text length:', text.length)
    console.log('First 500 chars:', text.substring(0, 500))

    const result: ParsedLabResult = { biomarkers: [] }

    const testDateMatch = text.match(/(?:Collection\s*Date|Test\s*Date|Date\s*Collected|Specimen\s*Collected)[:\s]+(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/i)
    if (testDateMatch) result.testDate = testDateMatch[1]

    if (text.match(/labcorp/i)) result.labName = 'Labcorp'
    if (text.match(/quest\s*diagnostics/i)) result.labName = 'Quest Diagnostics'

    const patterns: Record<string, RegExp[]> = {
      'Testosterone Total': [
        /Testosterone,?\s*Total.*?(\d+\.?\d*)\s*(ng\/dL|ng\/mL)/i,
        /Testosterone\s*,?\s*Serum.*?(\d+\.?\d*)\s*(ng\/dL)/i,
        /Total\s*Testosterone.*?(\d+\.?\d*)\s*(ng\/dL)/i
      ],
      'Testosterone Free': [
        /Testosterone,?\s*Free.*?(\d+\.?\d*)\s*(pg\/mL|ng\/dL)/i,
        /Free\s*Testosterone.*?(\d+\.?\d*)\s*(pg\/mL)/i
      ],
      'Vitamin D': [
        /Vitamin\s*D.*?(\d+\.?\d*)\s*(ng\/mL)/i,
        /25[-\s]?Hydroxy\s*Vitamin\s*D.*?(\d+\.?\d*)\s*(ng\/mL)/i,
        /Vitamin\s*D,?\s*25[-\s]?OH.*?(\d+\.?\d*)\s*(ng\/mL)/i
      ],
      'TSH': [
        /TSH.*?(\d+\.?\d*)\s*(μIU\/mL|uIU\/mL|mIU\/L)/i,
        /Thyroid\s*Stimulating\s*Hormone.*?(\d+\.?\d*)\s*(μIU\/mL|uIU\/mL)/i
      ],
      'HDL Cholesterol': [
        /HDL.*?Cholesterol.*?(\d+\.?\d*)\s*(mg\/dL)/i,
        /Cholesterol,?\s*HDL.*?(\d+\.?\d*)\s*(mg\/dL)/i
      ],
      'LDL Cholesterol': [
        /LDL.*?Cholesterol.*?(\d+\.?\d*)\s*(mg\/dL)/i,
        /Cholesterol,?\s*LDL.*?(\d+\.?\d*)\s*(mg\/dL)/i
      ],
      'Cholesterol Total': [
        /Cholesterol,?\s*Total.*?(\d+\.?\d*)\s*(mg\/dL)/i,
        /Total\s*Cholesterol.*?(\d+\.?\d*)\s*(mg\/dL)/i
      ],
      'Triglycerides': [
        /Triglycerides.*?(\d+\.?\d*)\s*(mg\/dL)/i
      ],
      'Hemoglobin A1c': [
        /A1[Cc].*?(\d+\.?\d*)\s*(%)/i,
        /Hemoglobin\s*A1[Cc].*?(\d+\.?\d*)\s*(%)/i,
        /HbA1[Cc].*?(\d+\.?\d*)\s*(%)/i
      ],
      'Glucose': [
        /Glucose.*?(\d+\.?\d*)\s*(mg\/dL)/i,
        /Blood\s*Glucose.*?(\d+\.?\d*)\s*(mg\/dL)/i
      ],
      'Cortisol': [
        /Cortisol.*?(\d+\.?\d*)\s*(μg\/dL|ug\/dL|mcg\/dL)/i
      ],
      'Estradiol': [
        /Estradiol.*?(\d+\.?\d*)\s*(pg\/mL)/i
      ],
      'PSA': [
        /PSA.*?(\d+\.?\d*)\s*(ng\/mL)/i,
        /Prostate\s*Specific\s*Antigen.*?(\d+\.?\d*)\s*(ng\/mL)/i
      ],
      'SHBG': [
        /SHBG.*?(\d+\.?\d*)\s*(nmol\/L)/i,
        /Sex\s*Hormone\s*Binding\s*Globulin.*?(\d+\.?\d*)\s*(nmol\/L)/i
      ],
      'Creatinine': [
        /Creatinine.*?(\d+\.?\d*)\s*(mg\/dL)/i
      ],
      'Hemoglobin': [
        /Hemoglobin[^A].*?(\d+\.?\d*)\s*(g\/dL)/i
      ]
    }

    for (const [name, patternList] of Object.entries(patterns)) {
      for (const pattern of patternList) {
        const match = text.match(pattern)
        if (match) {
          result.biomarkers.push({
            biomarker: name,
            value: parseFloat(match[1]),
            unit: match[2],
            referenceRange: '',
            status: 'normal'
          })
          break
        }
      }
    }

    console.log('Extracted biomarkers:', result.biomarkers.length)

    return result
  } catch (error) {
    console.error('PDF parsing error:', error)
    throw new Error(`Failed to parse PDF: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
