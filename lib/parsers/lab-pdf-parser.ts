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

    // Detect Quest
    if (text.match(/quest\s*diagnostics/i)) {
      result.labName = 'Quest Diagnostics'
    }

    // Extract collection date
    const dateMatch = text.match(/Collected:\s*(\d{2}\/\d{2}\/\d{4})/i)
    if (dateMatch) result.testDate = dateMatch[1]

    // Quest-specific patterns - test name followed by value, flag (H/L), range, unit
    const biomarkerPatterns = [
      // Testosterone Total
      /TESTOSTERONE,?\s*TOTAL.*?\s+(\d+\.?\d*)\s+(\d+-\d+)\s+(ng\/dL)/i,
      // Testosterone Free
      /TESTOSTERONE,?\s*FREE[^\d]*?(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+(pg\/mL)/i,
      // Vitamin D
      /VITAMIN\s*D,?25-OH.*?\s+(\d+\.?\d*)\s+(\d+-\d+)\s+(ng\/mL)/i,
      // TSH
      /TSH[^\d]*?(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+(mIU\/L)/i,
      // T4 Free
      /T4,?\s*FREE[^\d]*?(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+(ng\/dL)/i,
      // T3 Free
      /T3,?\s*FREE[^\d]*?(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+(pg\/mL)/i,
      // Cholesterol Total
      /CHOLESTEROL,?\s*TOTAL[^\d]*?(\d+\.?\d*)\s+[HL\s]*<?\s*(\d+)\s+(mg\/dL)/i,
      // HDL
      /HDL\s*CHOLESTEROL[^\d]*?(\d+\.?\d*)\s+>\s*OR\s*=\s*(\d+)\s+(mg\/dL)/i,
      // LDL
      /LDL-?CHOLESTEROL[^\d]*?(\d+\.?\d*)\s+[HL\s]*(mg\/dL)/i,
      // Triglycerides
      /TRIGLYCERIDES[^\d]*?(\d+\.?\d*)\s+[HL\s]*<?\s*(\d+)\s+(mg\/dL)/i,
      // Glucose
      /GLUCOSE[^\d]*?(\d+\.?\d*)\s+[HL\s]*(\d+-\d+)\s+(mg\/dL)/i,
      // Hemoglobin A1c
      /HEMOGLOBIN\s*A1c[^\d]*?(\d+\.?\d*)\s+<?\s*(\d+\.?\d*)\s+(%)/i,
      // Hemoglobin
      /HEMOGLOBIN[^A\d]*?(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+(g\/dL)/i,
      // Hematocrit
      /HEMATOCRIT[^\d]*?(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+(%)/i,
      // Creatinine
      /CREATININE[^\d]*?(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+(mg\/dL)/i,
      // PSA
      /PSA,?\s*TOTAL[^\d]*?(\d+\.?\d*)\s+<\s*OR\s*=\s*(\d+\.?\d*)\s+(ng\/mL)/i,
      // Estradiol
      /ESTRADIOL[^\d]*?(\d+\.?\d*)\s+[HL\s]*<\s*OR\s*=\s*(\d+)\s+(pg\/mL)/i,
      // Iron
      /IRON,?\s*TOTAL[^\d]*?(\d+\.?\d*)\s+(\d+-\d+)\s+(mcg\/dL)/i,
      // Ferritin
      /FERRITIN[^\d]*?(\d+\.?\d*)\s+(\d+-\d+)\s+(ng\/mL)/i,
      // SHBG
      /SEX\s*HORMONE\s*BINDING\s*GLOBULIN[^\d]*?(\d+\.?\d*)\s+(\d+-\d+)\s+(nmol\/L)/i,
      // DHEA-S
      /DHEA\s*SULFATE[^\d]*?(\d+\.?\d*)\s+(\d+-\d+)\s+(mcg\/dL)/i,
      // Cortisol
      /CORTISOL[^\d]*?(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+(μg\/dL|ug\/dL)/i,
      // Insulin
      /INSULIN[^\d]*?(\d+\.?\d*)\s+(uIU\/mL)/i,
      // IGF-1
      /IGF\s*1[^\d]*?(\d+\.?\d*)\s+(\d+-\d+)\s+(ng\/mL)/i,
      // Prolactin
      /PROLACTIN[^\d]*?(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+(ng\/mL)/i,
    ]

    for (const pattern of biomarkerPatterns) {
      const match = text.match(pattern)
      if (match) {
        let biomarkerName = ''
        let value = 0
        let unit = ''
        let referenceRange = ''

        // Determine biomarker name from pattern
        if (pattern.source.includes('TESTOSTERONE,?\\s*TOTAL')) {
          biomarkerName = 'Testosterone Total'
          value = parseFloat(match[1])
          referenceRange = match[2]
          unit = match[3]
        } else if (pattern.source.includes('TESTOSTERONE,?\\s*FREE')) {
          biomarkerName = 'Testosterone Free'
          value = parseFloat(match[1])
          referenceRange = match[2]
          unit = match[3]
        } else if (pattern.source.includes('VITAMIN\\s*D')) {
          biomarkerName = 'Vitamin D'
          value = parseFloat(match[1])
          referenceRange = match[2]
          unit = match[3]
        } else if (pattern.source.includes('TSH')) {
          biomarkerName = 'TSH'
          value = parseFloat(match[1])
          referenceRange = match[2]
          unit = match[3]
        } else if (pattern.source.includes('T4,?\\s*FREE')) {
          biomarkerName = 'T4 Free'
          value = parseFloat(match[1])
          referenceRange = match[2]
          unit = match[3]
        } else if (pattern.source.includes('T3,?\\s*FREE')) {
          biomarkerName = 'T3 Free'
          value = parseFloat(match[1])
          referenceRange = match[2]
          unit = match[3]
        } else if (pattern.source.includes('CHOLESTEROL,?\\s*TOTAL')) {
          biomarkerName = 'Cholesterol Total'
          value = parseFloat(match[1])
          referenceRange = `<${match[2]}`
          unit = match[3]
        } else if (pattern.source.includes('HDL\\s*CHOLESTEROL')) {
          biomarkerName = 'HDL Cholesterol'
          value = parseFloat(match[1])
          referenceRange = `>=${match[2]}`
          unit = match[3]
        } else if (pattern.source.includes('LDL')) {
          biomarkerName = 'LDL Cholesterol'
          value = parseFloat(match[1])
          referenceRange = '<100'
          unit = match[2]
        } else if (pattern.source.includes('TRIGLYCERIDES')) {
          biomarkerName = 'Triglycerides'
          value = parseFloat(match[1])
          referenceRange = `<${match[2]}`
          unit = match[3]
        } else if (pattern.source.includes('GLUCOSE')) {
          biomarkerName = 'Glucose'
          value = parseFloat(match[1])
          referenceRange = match[2]
          unit = match[3]
        } else if (pattern.source.includes('HEMOGLOBIN\\s*A1c')) {
          biomarkerName = 'Hemoglobin A1c'
          value = parseFloat(match[1])
          referenceRange = `<${match[2]}`
          unit = match[3]
        } else if (pattern.source.includes('HEMOGLOBIN[^A')) {
          biomarkerName = 'Hemoglobin'
          value = parseFloat(match[1])
          referenceRange = match[2]
          unit = match[3]
        } else if (pattern.source.includes('HEMATOCRIT')) {
          biomarkerName = 'Hematocrit'
          value = parseFloat(match[1])
          referenceRange = match[2]
          unit = match[3]
        } else if (pattern.source.includes('CREATININE')) {
          biomarkerName = 'Creatinine'
          value = parseFloat(match[1])
          referenceRange = match[2]
          unit = match[3]
        } else if (pattern.source.includes('PSA')) {
          biomarkerName = 'PSA'
          value = parseFloat(match[1])
          referenceRange = `<=${match[2]}`
          unit = match[3]
        } else if (pattern.source.includes('ESTRADIOL')) {
          biomarkerName = 'Estradiol'
          value = parseFloat(match[1])
          referenceRange = `<=${match[2]}`
          unit = match[3]
        } else if (pattern.source.includes('IRON')) {
          biomarkerName = 'Iron Total'
          value = parseFloat(match[1])
          referenceRange = match[2]
          unit = match[3]
        } else if (pattern.source.includes('FERRITIN')) {
          biomarkerName = 'Ferritin'
          value = parseFloat(match[1])
          referenceRange = match[2]
          unit = match[3]
        } else if (pattern.source.includes('SEX\\s*HORMONE')) {
          biomarkerName = 'SHBG'
          value = parseFloat(match[1])
          referenceRange = match[2]
          unit = match[3]
        } else if (pattern.source.includes('DHEA')) {
          biomarkerName = 'DHEA-S'
          value = parseFloat(match[1])
          referenceRange = match[2]
          unit = match[3]
        } else if (pattern.source.includes('CORTISOL')) {
          biomarkerName = 'Cortisol'
          value = parseFloat(match[1])
          referenceRange = match[2]
          unit = match[3]
        } else if (pattern.source.includes('INSULIN')) {
          biomarkerName = 'Insulin'
          value = parseFloat(match[1])
          referenceRange = '<=18.4'
          unit = match[2]
        } else if (pattern.source.includes('IGF')) {
          biomarkerName = 'IGF-1'
          value = parseFloat(match[1])
          referenceRange = match[2]
          unit = match[3]
        } else if (pattern.source.includes('PROLACTIN')) {
          biomarkerName = 'Prolactin'
          value = parseFloat(match[1])
          referenceRange = match[2]
          unit = match[3]
        }

        if (biomarkerName) {
          result.biomarkers.push({
            biomarker: biomarkerName,
            value,
            unit,
            referenceRange,
            status: 'normal'
          })
        }
      }
    }

  } catch (error) {
    console.error('PDF parsing error (non-fatal):', error)
  }

  return result
}
