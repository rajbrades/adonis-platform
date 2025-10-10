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

    console.log('PDF text extracted, length:', text.length)

    // Detect Quest
    if (text.match(/quest\s*diagnostics/i)) {
      result.labName = 'Quest Diagnostics'
    }

    // Extract collection date
    const dateMatch = text.match(/Collected:\s*(\d{2}\/\d{2}\/\d{4})/i)
    if (dateMatch) result.testDate = dateMatch[1]

    // Simple line-by-line parsing for Quest format
    const lines = text.split('\n')
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      // Look for common biomarkers
      try {
        // Testosterone Total
        if (line.includes('TESTOSTERONE') && line.includes('TOTAL') && !line.includes('FREE')) {
          const match = line.match(/(\d+\.?\d*)\s+(\d+-\d+)\s+ng\/dL/i)
          if (match) {
            result.biomarkers.push({
              biomarker: 'Testosterone Total',
              value: parseFloat(match[1]),
              unit: 'ng/dL',
              referenceRange: match[2],
              status: 'normal'
            })
          }
        }
        
        // Vitamin D
        if (line.includes('VITAMIN D') || line.includes('25-OH')) {
          const match = line.match(/(\d+\.?\d*)\s+(\d+-\d+)\s+ng\/mL/i)
          if (match) {
            result.biomarkers.push({
              biomarker: 'Vitamin D',
              value: parseFloat(match[1]),
              unit: 'ng/mL',
              referenceRange: match[2],
              status: 'normal'
            })
          }
        }
        
        // TSH
        if (line.match(/^TSH\s/i)) {
          const match = line.match(/(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+m[iI]U\/L/i)
          if (match) {
            result.biomarkers.push({
              biomarker: 'TSH',
              value: parseFloat(match[1]),
              unit: 'mIU/L',
              referenceRange: match[2],
              status: 'normal'
            })
          }
        }
        
        // Cholesterol Total
        if (line.includes('CHOLESTEROL') && line.includes('TOTAL')) {
          const match = line.match(/(\d+\.?\d*)\s+[HL\s]*<?\s*(\d+)\s+mg\/dL/i)
          if (match) {
            result.biomarkers.push({
              biomarker: 'Cholesterol Total',
              value: parseFloat(match[1]),
              unit: 'mg/dL',
              referenceRange: `<${match[2]}`,
              status: 'normal'
            })
          }
        }
        
        // HDL
        if (line.includes('HDL') && line.includes('CHOLESTEROL')) {
          const match = line.match(/(\d+\.?\d*)\s+>\s*OR\s*=\s*(\d+)\s+mg\/dL/i)
          if (match) {
            result.biomarkers.push({
              biomarker: 'HDL Cholesterol',
              value: parseFloat(match[1]),
              unit: 'mg/dL',
              referenceRange: `>=${match[2]}`,
              status: 'normal'
            })
          }
        }
        
        // LDL
        if (line.includes('LDL') && line.includes('CHOLESTEROL')) {
          const match = line.match(/(\d+\.?\d*)\s+[HL\s]*mg\/dL/i)
          if (match) {
            result.biomarkers.push({
              biomarker: 'LDL Cholesterol',
              value: parseFloat(match[1]),
              unit: 'mg/dL',
              referenceRange: '<100',
              status: 'normal'
            })
          }
        }
        
        // Triglycerides
        if (line.includes('TRIGLYCERIDES')) {
          const match = line.match(/(\d+\.?\d*)\s+[HL\s]*<?\s*(\d+)\s+mg\/dL/i)
          if (match) {
            result.biomarkers.push({
              biomarker: 'Triglycerides',
              value: parseFloat(match[1]),
              unit: 'mg/dL',
              referenceRange: `<${match[2]}`,
              status: 'normal'
            })
          }
        }
        
        // Glucose
        if (line.match(/^GLUCOSE\s/i)) {
          const match = line.match(/(\d+\.?\d*)\s+[HL\s]*(\d+-\d+)\s+mg\/dL/i)
          if (match) {
            result.biomarkers.push({
              biomarker: 'Glucose',
              value: parseFloat(match[1]),
              unit: 'mg/dL',
              referenceRange: match[2],
              status: 'normal'
            })
          }
        }
        
        // Hemoglobin A1c
        if (line.includes('HEMOGLOBIN A1c') || line.includes('A1C')) {
          const match = line.match(/(\d+\.?\d*)\s+<?\s*(\d+\.?\d*)\s+%/i)
          if (match) {
            result.biomarkers.push({
              biomarker: 'Hemoglobin A1c',
              value: parseFloat(match[1]),
              unit: '%',
              referenceRange: `<${match[2]}`,
              status: 'normal'
            })
          }
        }
        
        // PSA
        if (line.includes('PSA') && line.includes('TOTAL')) {
          const match = line.match(/(\d+\.?\d*)\s+<\s*OR\s*=\s*(\d+\.?\d*)\s+ng\/mL/i)
          if (match) {
            result.biomarkers.push({
              biomarker: 'PSA',
              value: parseFloat(match[1]),
              unit: 'ng/mL',
              referenceRange: `<=${match[2]}`,
              status: 'normal'
            })
          }
        }
        
        // Estradiol
        if (line.includes('ESTRADIOL')) {
          const match = line.match(/(\d+\.?\d*)\s+[HL\s]*<\s*OR\s*=\s*(\d+)\s+pg\/mL/i)
          if (match) {
            result.biomarkers.push({
              biomarker: 'Estradiol',
              value: parseFloat(match[1]),
              unit: 'pg/mL',
              referenceRange: `<=${match[2]}`,
              status: 'normal'
            })
          }
        }
        
        // Hemoglobin
        if (line.match(/^HEMOGLOBIN\s+\d/i)) {
          const match = line.match(/(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+g\/dL/i)
          if (match) {
            result.biomarkers.push({
              biomarker: 'Hemoglobin',
              value: parseFloat(match[1]),
              unit: 'g/dL',
              referenceRange: match[2],
              status: 'normal'
            })
          }
        }
        
        // Creatinine
        if (line.match(/^CREATININE\s/i)) {
          const match = line.match(/(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+mg\/dL/i)
          if (match) {
            result.biomarkers.push({
              biomarker: 'Creatinine',
              value: parseFloat(match[1]),
              unit: 'mg/dL',
              referenceRange: match[2],
              status: 'normal'
            })
          }
        }
        
      } catch (lineError) {
        // Skip this line if there's an error
        continue
      }
    }

    console.log('Extracted biomarkers:', result.biomarkers.length)

  } catch (error) {
    console.error('PDF parsing error:', error)
    // Return empty result instead of throwing
  }

  return result
}
