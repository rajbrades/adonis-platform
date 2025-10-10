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

    const result: ParsedLabResult = { biomarkers: [] }

    const testDateMatch = text.match(/(?:Collection\s*Date|Test\s*Date|Date\s*Collected)[:\s]+(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/i)
    if (testDateMatch) result.testDate = testDateMatch[1]

    if (text.match(/labcorp/i)) result.labName = 'Labcorp'
    if (text.match(/quest\s*diagnostics/i)) result.labName = 'Quest Diagnostics'

    const patterns: Record<string, RegExp> = {
      'Testosterone Total': /Testosterone,?\s*Total.*?(\d+\.?\d*)\s*(ng\/dL)/i,
      'Vitamin D': /Vitamin\s*D.*?(\d+\.?\d*)\s*(ng\/mL)/i,
      'TSH': /TSH.*?(\d+\.?\d*)\s*(μIU\/mL|uIU\/mL)/i,
      'HDL Cholesterol': /HDL.*?(\d+\.?\d*)\s*(mg\/dL)/i,
      'LDL Cholesterol': /LDL.*?(\d+\.?\d*)\s*(mg\/dL)/i,
      'Hemoglobin A1c': /A1[Cc].*?(\d+\.?\d*)\s*(%)/i,
      'Glucose': /Glucose.*?(\d+\.?\d*)\s*(mg\/dL)/i,
      'Cortisol': /Cortisol.*?(\d+\.?\d*)\s*(μg\/dL)/i,
    }

    for (const [name, pattern] of Object.entries(patterns)) {
      const match = text.match(pattern)
      if (match) {
        result.biomarkers.push({
          biomarker: name,
          value: parseFloat(match[1]),
          unit: match[2],
          referenceRange: '',
          status: 'normal'
        })
      }
    }

    return result
  } catch (error) {
    console.error('PDF parsing error:', error)
    throw new Error('Failed to parse PDF')
  }
}
