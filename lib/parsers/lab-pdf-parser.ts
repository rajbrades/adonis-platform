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
  const result: ParsedLabResult = { biomarkers: [] }
  
  try {
    const data = await pdfParse(buffer)
    const text = data.text

    const testDateMatch = text.match(/(?:Collection\s*Date|Test\s*Date|Date\s*Collected|Specimen\s*Collected)[:\s]+(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/i)
    if (testDateMatch) result.testDate = testDateMatch[1]

    if (text.match(/labcorp/i)) result.labName = 'Labcorp'
    if (text.match(/quest\s*diagnostics/i)) result.labName = 'Quest Diagnostics'

    const patterns: Record<string, RegExp[]> = {
      'Testosterone Total': [
        /Testosterone,?\s*Total.*?(\d+\.?\d*)\s*(ng\/dL|ng\/mL)/i,
        /Testosterone\s*,?\s*Serum.*?(\d+\.?\d*)\s*(ng\/dL)/i,
      ],
      'Vitamin D': [
        /Vitamin\s*D.*?(\d+\.?\d*)\s*(ng\/mL)/i,
        /25[-\s]?Hydroxy.*?(\d+\.?\d*)\s*(ng\/mL)/i,
      ],
      'TSH': [
        /TSH.*?(\d+\.?\d*)\s*(μIU\/mL|uIU\/mL|mIU\/L)/i,
      ],
      'HDL Cholesterol': [
        /HDL.*?(\d+\.?\d*)\s*(mg\/dL)/i,
      ],
      'LDL Cholesterol': [
        /LDL.*?(\d+\.?\d*)\s*(mg\/dL)/i,
      ],
      'Glucose': [
        /Glucose.*?(\d+\.?\d*)\s*(mg\/dL)/i,
      ],
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

  } catch (error) {
    console.error('PDF parsing error (non-fatal):', error)
  }

  return result
}
