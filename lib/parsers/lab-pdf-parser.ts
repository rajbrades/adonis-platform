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

  console.log('PDF extracted successfully, length:', text.length)

  if (text.match(/quest\s*diagnostics/i)) {
    result.labName = 'Quest Diagnostics'
  }

  const dateMatch = text.match(/Collected:\s*(\d{2}\/\d{2}\/\d{4})/i)
  if (dateMatch) result.testDate = dateMatch[1]

  // Comprehensive list of ALL Quest biomarkers
  const testPatterns = [
    // Hormones - Testosterone
    { name: 'Testosterone Total', pattern: /TESTOSTERONE,?\s*TOTAL[^\n]*?(\d+)\s+(\d+-\d+)\s+ng\/dL/i, unit: 'ng/dL' },
    { name: 'Testosterone Free', pattern: /TESTOSTERONE,?\s*FREE[^\n]*?(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+pg\/mL/i, unit: 'pg/mL' },
    { name: 'Testosterone Bioavailable', pattern: /TESTOSTERONE,?\s*BIOAVAILABLE[^\n]*?(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+ng\/dL/i, unit: 'ng/dL' },
    
    // Thyroid
    { name: 'TSH', pattern: /TSH\s+(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+m[iI]U\/L/i, unit: 'mIU/L' },
    { name: 'T4 Free', pattern: /T4,?\s*FREE\s+(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+ng\/dL/i, unit: 'ng/dL' },
    { name: 'T3 Free', pattern: /T3,?\s*FREE\s+(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+pg\/mL/i, unit: 'pg/mL' },
    
    // Vitamins
    { name: 'Vitamin D', pattern: /VITAMIN\s*D[^\n]*?(\d+)\s+(\d+-\d+)\s+ng\/mL/i, unit: 'ng/mL' },
    { name: 'Vitamin B12', pattern: /VITAMIN\s*B12[^\n]*?(\d+)\s+(\d+-\d+)\s+pg\/mL/i, unit: 'pg/mL' },
    
    // Lipids
    { name: 'Cholesterol Total', pattern: /CHOLESTEROL,?\s*TOTAL[^\n]*?(\d+)\s+[HL\s]*<\s*(\d+)\s+mg\/dL/i, unit: 'mg/dL' },
    { name: 'HDL Cholesterol', pattern: /HDL\s*CHOLESTEROL\s+(\d+)\s+>\s*OR\s*=\s*(\d+)\s+mg\/dL/i, unit: 'mg/dL' },
    { name: 'LDL Cholesterol', pattern: /LDL-?CHOLESTEROL[^\n]*?(\d+)\s+[HL\s]*mg\/dL/i, unit: 'mg/dL', defaultRange: '<100' },
    { name: 'Triglycerides', pattern: /TRIGLYCERIDES[^\n]*?(\d+)\s+[HL\s]*<\s*(\d+)\s+mg\/dL/i, unit: 'mg/dL' },
    { name: 'Non HDL Cholesterol', pattern: /NON\s*HDL\s*CHOLESTEROL[^\n]*?(\d+)\s+[HL\s]*<\s*(\d+)\s+mg\/dL/i, unit: 'mg/dL' },
    { name: 'Apolipoprotein B', pattern: /APOLIPOPROTEIN\s*B[^\n]*?(\d+)\s+[HL\s]*<\s*(\d+)\s+mg\/dL/i, unit: 'mg/dL' },
    { name: 'Lipoprotein (a)', pattern: /LIPOPROTEIN\s*\(a\)[^\n]*?<?\s*(\d+)\s+<\s*(\d+)\s+nmol\/L/i, unit: 'nmol/L' },
    { name: 'CHOL/HDLC Ratio', pattern: /CHOL\/HDLC\s*RATIO\s+(\d+\.?\d*)\s+<\s*(\d+\.?\d*)/i, unit: 'ratio', defaultRange: '<5.0' },
    { name: 'LDL/HDL Ratio', pattern: /LDL\/HDL\s*RATIO\s+(\d+\.?\d*)/i, unit: 'ratio', defaultRange: '<2.28' },
    
    // Metabolic
    { name: 'Glucose', pattern: /GLUCOSE\s+(\d+)\s+[HL\s]*(\d+-\d+)\s+mg\/dL/i, unit: 'mg/dL' },
    { name: 'Hemoglobin A1c', pattern: /HEMOGLOBIN\s*A1c\s+(\d+\.?\d*)\s+<\s*(\d+\.?\d*)\s+%/i, unit: '%' },
    { name: 'Insulin', pattern: /INSULIN\s+(\d+\.?\d*)\s+uIU\/mL/i, unit: 'uIU/mL', defaultRange: '<=18.4' },
    
    // Kidney Function
    { name: 'Creatinine', pattern: /CREATININE\s+(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+mg\/dL/i, unit: 'mg/dL' },
    { name: 'BUN', pattern: /UREA\s*NITROGEN\s*\(BUN\)\s+(\d+)\s+(\d+-\d+)\s+mg\/dL/i, unit: 'mg/dL' },
    { name: 'eGFR', pattern: /EGFR\s+(\d+)\s+>\s*OR\s*=\s*(\d+)\s+mL\/min/i, unit: 'mL/min/1.73m2' },
    
    // Electrolytes
    { name: 'Sodium', pattern: /SODIUM\s+(\d+)\s+[HL\s]*(\d+-\d+)\s+mmol\/L/i, unit: 'mmol/L' },
    { name: 'Potassium', pattern: /POTASSIUM\s+(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+mmol\/L/i, unit: 'mmol/L' },
    { name: 'Chloride', pattern: /CHLORIDE\s+(\d+)\s+[HL\s]*(\d+-\d+)\s+mmol\/L/i, unit: 'mmol/L' },
    { name: 'Carbon Dioxide', pattern: /CARBON\s*DIOXIDE\s+(\d+)\s+(\d+-\d+)\s+mmol\/L/i, unit: 'mmol/L' },
    { name: 'Calcium', pattern: /CALCIUM\s+(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+mg\/dL/i, unit: 'mg/dL' },
    
    // Liver Function
    { name: 'ALT', pattern: /ALT\s+(\d+)\s+(\d+-\d+)\s+U\/L/i, unit: 'U/L' },
    { name: 'AST', pattern: /AST\s+(\d+)\s+(\d+-\d+)\s+U\/L/i, unit: 'U/L' },
    { name: 'Alkaline Phosphatase', pattern: /ALKALINE\s*PHOSPHATASE\s+(\d+)\s+(\d+-\d+)\s+U\/L/i, unit: 'U/L' },
    { name: 'Bilirubin Total', pattern: /BILIRUBIN,?\s*TOTAL\s+(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+mg\/dL/i, unit: 'mg/dL' },
    { name: 'GGT', pattern: /GGT\s+(\d+)\s+(\d+-\d+)\s+U\/L/i, unit: 'U/L' },
    { name: 'Protein Total', pattern: /PROTEIN,?\s*TOTAL\s+(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+g\/dL/i, unit: 'g/dL' },
    { name: 'Albumin', pattern: /ALBUMIN\s+(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+g\/dL/i, unit: 'g/dL' },
    { name: 'Globulin', pattern: /GLOBULIN\s+(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+g\/dL/i, unit: 'g/dL' },
    { name: 'Albumin/Globulin Ratio', pattern: /ALBUMIN\/GLOBULIN\s*RATIO\s+(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)/i, unit: 'ratio' },
    
    // CBC
    { name: 'WBC', pattern: /WHITE\s*BLOOD\s*CELL\s*COUNT\s+(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+Thousand\/uL/i, unit: 'Thousand/uL' },
    { name: 'RBC', pattern: /RED\s*BLOOD\s*CELL\s*COUNT\s+(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+Million\/uL/i, unit: 'Million/uL' },
    { name: 'Hemoglobin', pattern: /HEMOGLOBIN\s+(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+g\/dL/i, unit: 'g/dL' },
    { name: 'Hematocrit', pattern: /HEMATOCRIT\s+(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+%/i, unit: '%' },
    { name: 'MCV', pattern: /MCV\s+(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+fL/i, unit: 'fL' },
    { name: 'MCH', pattern: /MCH\s+(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+pg/i, unit: 'pg' },
    { name: 'MCHC', pattern: /MCHC\s+(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+g\/dL/i, unit: 'g/dL' },
    { name: 'RDW', pattern: /RDW\s+(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+%/i, unit: '%' },
    { name: 'Platelet Count', pattern: /PLATELET\s*COUNT\s+(\d+)\s+(\d+-\d+)\s+Thousand\/uL/i, unit: 'Thousand/uL' },
    { name: 'MPV', pattern: /MPV\s+(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+fL/i, unit: 'fL' },
    { name: 'Neutrophils', pattern: /NEUTROPHILS\s+(\d+\.?\d*)\s+%/i, unit: '%', defaultRange: '40-70' },
    { name: 'Lymphocytes', pattern: /LYMPHOCYTES\s+(\d+\.?\d*)\s+%/i, unit: '%', defaultRange: '20-40' },
    { name: 'Monocytes', pattern: /MONOCYTES\s+(\d+\.?\d*)\s+%/i, unit: '%', defaultRange: '2-8' },
    { name: 'Eosinophils', pattern: /EOSINOPHILS\s+(\d+\.?\d*)\s+%/i, unit: '%', defaultRange: '1-4' },
    { name: 'Basophils', pattern: /BASOPHILS\s+(\d+\.?\d*)\s+%/i, unit: '%', defaultRange: '0.5-1' },
    { name: 'Absolute Neutrophils', pattern: /ABSOLUTE\s*NEUTROPHILS\s+(\d+)\s+(\d+-\d+)\s+cells\/uL/i, unit: 'cells/uL' },
    { name: 'Absolute Lymphocytes', pattern: /ABSOLUTE\s*LYMPHOCYTES\s+(\d+)\s+(\d+-\d+)\s+cells\/uL/i, unit: 'cells/uL' },
    { name: 'Absolute Monocytes', pattern: /ABSOLUTE\s*MONOCYTES\s+(\d+)\s+(\d+-\d+)\s+cells\/uL/i, unit: 'cells/uL' },
    { name: 'Absolute Eosinophils', pattern: /ABSOLUTE\s*EOSINOPHILS\s+(\d+)\s+(\d+-\d+)\s+cells\/uL/i, unit: 'cells/uL' },
    { name: 'Absolute Basophils', pattern: /ABSOLUTE\s*BASOPHILS\s+(\d+)\s+(\d+-\d+)\s+cells\/uL/i, unit: 'cells/uL' },
    
    // Other Hormones
    { name: 'Estradiol', pattern: /ESTRADIOL[^\n]*?(\d+)\s+[HL\s]*<\s*OR\s*=\s*(\d+)\s+pg\/mL/i, unit: 'pg/mL' },
    { name: 'PSA', pattern: /PSA,?\s*TOTAL\s+(\d+\.?\d*)\s+<\s*OR\s*=\s*(\d+\.?\d*)\s+ng\/mL/i, unit: 'ng/mL' },
    { name: 'SHBG', pattern: /SEX\s*HORMONE\s*BINDING\s*GLOBULIN\s+(\d+)\s+(\d+-\d+)\s+nmol\/L/i, unit: 'nmol/L' },
    { name: 'DHEA-S', pattern: /DHEA\s*SULFATE\s+(\d+)\s+(\d+-\d+)\s+mcg\/dL/i, unit: 'mcg/dL' },
    { name: 'Cortisol', pattern: /CORTISOL[^\n]*?(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+(?:μg|ug)\/dL/i, unit: 'μg/dL' },
    { name: 'Prolactin', pattern: /PROLACTIN[^\n]*?(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+ng\/mL/i, unit: 'ng/mL' },
    { name: 'Pregnenolone', pattern: /PREGNENOLONE[^\n]*?(\d+)\s+(\d+-\d+)\s+ng\/dL/i, unit: 'ng/dL' },
    { name: 'IGF-1', pattern: /IGF\s*1[^\n]*?(\d+)\s+(\d+-\d+)\s+ng\/mL/i, unit: 'ng/mL' },
    
    // Iron Studies
    { name: 'Iron Total', pattern: /IRON,?\s*TOTAL\s+(\d+)\s+(\d+-\d+)\s+mcg\/dL/i, unit: 'mcg/dL' },
    { name: 'TIBC', pattern: /IRON\s*BINDING\s*CAPACITY[^\n]*?(\d+)\s+[HL\s]*(\d+-\d+)\s+mcg\/dL/i, unit: 'mcg/dL' },
    { name: 'Iron Saturation', pattern: /%\s*SATURATION\s+(\d+)\s+(\d+-\d+)\s+%/i, unit: '%' },
    { name: 'Ferritin', pattern: /FERRITIN\s+(\d+)\s+(\d+-\d+)\s+ng\/mL/i, unit: 'ng/mL' },
    
    // Inflammatory Markers
    { name: 'HS CRP', pattern: /HS\s*CRP\s+(\d+\.?\d*)\s+mg\/L/i, unit: 'mg/L', defaultRange: '<1.0' },
    { name: 'Homocysteine', pattern: /HOMOCYSTEINE\s+(\d+\.?\d*)\s+<\s*or\s*=\s*(\d+\.?\d*)\s+umol\/L/i, unit: 'umol/L' },
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
