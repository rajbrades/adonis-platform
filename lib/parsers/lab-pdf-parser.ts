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

  if (text.match(/quest\s*diagnostics/i)) {
    result.labName = 'Quest Diagnostics'
  }

  const dateMatch = text.match(/Collected:\s*(\d{2}\/\d{2}\/\d{4})/i)
  if (dateMatch) result.testDate = dateMatch[1]

  const added = new Set<string>()
  
  // Quest-specific patterns - values often run together with test names
  const patterns = [
    // Hormones - Testosterone
    { name: 'Testosterone Total', regex: /TESTOSTERONE,?\s*TOTAL[\s\S]*?(\d+)\s*(\d+-\d+)\s*ng\/dL/i, unit: 'ng/dL' },
    { name: 'Testosterone Free', regex: /TESTOSTERONE,?\s*FREE[\s\S]*?(\d+\.?\d*)\s*(\d+\.?\d*-\d+\.?\d*)\s*pg\/mL/i, unit: 'pg/mL' },
    { name: 'Testosterone Bioavailable', regex: /TESTOSTERONE,?BIOAVAILABLE[\s\S]*?(\d+\.?\d*)\s*(\d+\.?\d*-\d+\.?\d*)\s*ng\/dL/i, unit: 'ng/dL' },
    
    // Thyroid
    { name: 'TSH', regex: /TSH\s*(\d+\.?\d*)\s*(\d+\.?\d*-\d+\.?\d*)\s*mIU\/L/i, unit: 'mIU/L' },
    { name: 'T4 Free', regex: /T4,?\s*FREE\s*(\d+\.?\d*)\s*(\d+\.?\d*-\d+\.?\d*)\s*ng\/dL/i, unit: 'ng/dL' },
    { name: 'T3 Free', regex: /T3,?\s*FREE\s*(\d+\.?\d*)\s*(\d+\.?\d*-\d+\.?\d*)\s*pg\/mL/i, unit: 'pg/mL' },
    
    // Vitamins
    { name: 'Vitamin D', regex: /VITAMIN\s*D[\s\S]*?(\d+)\s*(\d+-\d+)\s*ng\/mL/i, unit: 'ng/mL' },
    
    // Lipids
    { name: 'Cholesterol Total', regex: /CHOLESTEROL,?\s*TOTAL\s*(\d+)\s*[HL\s]*<?\s*(\d+)\s*mg\/dL/i, unit: 'mg/dL' },
    { name: 'HDL Cholesterol', regex: /HDL\s*CHOLESTEROL\s*(\d+)\s*>\s*OR\s*=\s*(\d+)\s*mg\/dL/i, unit: 'mg/dL' },
    { name: 'LDL Cholesterol', regex: /LDL-?CHOLESTEROL\s*(\d+)\s*[HL\s]*mg\/dL/i, unit: 'mg/dL', defaultRange: '<100' },
    { name: 'Triglycerides', regex: /TRIGLYCERIDES\s*(\d+)\s*[HL\s]*<?\s*(\d+)\s*mg\/dL/i, unit: 'mg/dL' },
    { name: 'Non HDL Cholesterol', regex: /NON\s*HDL\s*CHOLESTEROL\s*(\d+)\s*[HL\s]*<?\s*(\d+)\s*mg\/dL/i, unit: 'mg/dL' },
    { name: 'Apolipoprotein B', regex: /APOLIPOPROTEIN\s*B\s*(\d+)\s*[HL\s]*<?\s*(\d+)\s*mg\/dL/i, unit: 'mg/dL' },
    { name: 'Lipoprotein (a)', regex: /LIPOPROTEIN\s*\(a\)\s*<?\s*(\d+)\s*<?\s*(\d+)\s*nmol\/L/i, unit: 'nmol/L' },
    
    // Metabolic
    { name: 'Glucose', regex: /GLUCOSE\s*(\d+)\s*[HL\s]*(\d+-\d+)\s*mg\/dL/i, unit: 'mg/dL' },
    { name: 'Hemoglobin A1c', regex: /HEMOGLOBIN\s*A1c\s*(\d+\.?\d*)\s*<?\s*(\d+\.?\d*)\s*%/i, unit: '%' },
    { name: 'Insulin', regex: /INSULIN\s*(\d+\.?\d*)\s*uIU\/mL/i, unit: 'uIU/mL', defaultRange: '<=18.4' },
    
    // Kidney
    { name: 'Creatinine', regex: /CREATININE\s*(\d+\.?\d*)\s*(\d+\.?\d*-\d+\.?\d*)\s*mg\/dL/i, unit: 'mg/dL' },
    { name: 'BUN', regex: /UREA\s*NITROGEN[\s\S]*?(\d+)\s*(\d+-\d+)\s*mg\/dL/i, unit: 'mg/dL' },
    { name: 'eGFR', regex: /EGFR\s*(\d+)\s*>\s*OR\s*=\s*(\d+)/i, unit: 'mL/min/1.73m2' },
    
    // Electrolytes
    { name: 'Sodium', regex: /SODIUM\s*(\d+)\s*[HL\s]*(\d+-\d+)\s*mmol\/L/i, unit: 'mmol/L' },
    { name: 'Potassium', regex: /POTASSIUM\s*(\d+\.?\d*)\s*(\d+\.?\d*-\d+\.?\d*)\s*mmol\/L/i, unit: 'mmol/L' },
    { name: 'Chloride', regex: /CHLORIDE\s*(\d+)\s*[HL\s]*(\d+-\d+)\s*mmol\/L/i, unit: 'mmol/L' },
    { name: 'Carbon Dioxide', regex: /CARBON\s*DIOXIDE\s*(\d+)\s*(\d+-\d+)\s*mmol\/L/i, unit: 'mmol/L' },
    { name: 'Calcium', regex: /CALCIUM\s*(\d+\.?\d*)\s*(\d+\.?\d*-\d+\.?\d*)\s*mg\/dL/i, unit: 'mg/dL' },
    
    // Liver
    { name: 'ALT', regex: /ALT\s*(\d+)\s*(\d+-\d+)\s*U\/L/i, unit: 'U/L' },
    { name: 'AST', regex: /AST\s*(\d+)\s*(\d+-\d+)\s*U\/L/i, unit: 'U/L' },
    { name: 'Alkaline Phosphatase', regex: /ALKALINE\s*PHOSPHATASE\s*(\d+)\s*(\d+-\d+)\s*U\/L/i, unit: 'U/L' },
    { name: 'Bilirubin Total', regex: /BILIRUBIN,?\s*TOTAL\s*(\d+\.?\d*)\s*(\d+\.?\d*-\d+\.?\d*)\s*mg\/dL/i, unit: 'mg/dL' },
    { name: 'GGT', regex: /GGT\s*(\d+)\s*(\d+-\d+)\s*U\/L/i, unit: 'U/L' },
    { name: 'Protein Total', regex: /PROTEIN,?\s*TOTAL\s*(\d+\.?\d*)\s*(\d+\.?\d*-\d+\.?\d*)\s*g\/dL/i, unit: 'g/dL' },
    { name: 'Albumin', regex: /ALBUMIN\s*(\d+\.?\d*)\s*(\d+\.?\d*-\d+\.?\d*)\s*g\/dL/i, unit: 'g/dL' },
    { name: 'Globulin', regex: /GLOBULIN\s*(\d+\.?\d*)\s*(\d+\.?\d*-\d+\.?\d*)\s*g\/dL/i, unit: 'g/dL' },
    
    // CBC
    { name: 'WBC', regex: /WHITE\s*BLOOD\s*CELL\s*COUNT\s*(\d+\.?\d*)\s*(\d+\.?\d*-\d+\.?\d*)\s*Thousand\/uL/i, unit: 'Thousand/uL' },
    { name: 'RBC', regex: /RED\s*BLOOD\s*CELL\s*COUNT\s*(\d+\.?\d*)\s*(\d+\.?\d*-\d+\.?\d*)\s*Million\/uL/i, unit: 'Million/uL' },
    { name: 'Hemoglobin', regex: /HEMOGLOBIN\s*(\d+\.?\d*)\s*(\d+\.?\d*-\d+\.?\d*)\s*g\/dL/i, unit: 'g/dL' },
    { name: 'Hematocrit', regex: /HEMATOCRIT\s*(\d+\.?\d*)\s*(\d+\.?\d*-\d+\.?\d*)\s*%/i, unit: '%' },
    { name: 'MCV', regex: /MCV\s*(\d+\.?\d*)\s*(\d+\.?\d*-\d+\.?\d*)\s*fL/i, unit: 'fL' },
    { name: 'MCH', regex: /MCH\s*(\d+\.?\d*)\s*(\d+\.?\d*-\d+\.?\d*)\s*pg/i, unit: 'pg' },
    { name: 'MCHC', regex: /MCHC\s*(\d+\.?\d*)\s*(\d+\.?\d*-\d+\.?\d*)\s*g\/dL/i, unit: 'g/dL' },
    { name: 'RDW', regex: /RDW\s*(\d+\.?\d*)\s*(\d+\.?\d*-\d+\.?\d*)\s*%/i, unit: '%' },
    { name: 'Platelet Count', regex: /PLATELET\s*COUNT\s*(\d+)\s*(\d+-\d+)\s*Thousand\/uL/i, unit: 'Thousand/uL' },
    { name: 'MPV', regex: /MPV\s*(\d+\.?\d*)\s*(\d+\.?\d*-\d+\.?\d*)\s*fL/i, unit: 'fL' },
    { name: 'Absolute Neutrophils', regex: /ABSOLUTE\s*NEUTROPHILS\s*(\d+)\s*(\d+-\d+)\s*cells\/uL/i, unit: 'cells/uL' },
    { name: 'Absolute Lymphocytes', regex: /ABSOLUTE\s*LYMPHOCYTES\s*(\d+)\s*(\d+-\d+)\s*cells\/uL/i, unit: 'cells/uL' },
    { name: 'Absolute Monocytes', regex: /ABSOLUTE\s*MONOCYTES\s*(\d+)\s*(\d+-\d+)\s*cells\/uL/i, unit: 'cells/uL' },
    { name: 'Absolute Eosinophils', regex: /ABSOLUTE\s*EOSINOPHILS\s*(\d+)\s*(\d+-\d+)\s*cells\/uL/i, unit: 'cells/uL' },
    { name: 'Absolute Basophils', regex: /ABSOLUTE\s*BASOPHILS\s*(\d+)\s*(\d+-\d+)\s*cells\/uL/i, unit: 'cells/uL' },
    
    // Other Hormones
    { name: 'Estradiol', regex: /ESTRADIOL\s*(\d+)\s*[HL\s]*<\s*OR\s*=\s*(\d+)\s*pg\/mL/i, unit: 'pg/mL' },
    { name: 'PSA', regex: /PSA,?\s*TOTAL\s*(\d+\.?\d*)\s*<\s*OR\s*=\s*(\d+\.?\d*)\s*ng\/mL/i, unit: 'ng/mL' },
    { name: 'SHBG', regex: /SEX\s*HORMONE\s*BINDING\s*GLOBULIN\s*(\d+)\s*(\d+-\d+)\s*nmol\/L/i, unit: 'nmol/L' },
    { name: 'DHEA-S', regex: /DHEA\s*SULFATE\s*(\d+)\s*(\d+-\d+)\s*mcg\/dL/i, unit: 'mcg/dL' },
    { name: 'Pregnenolone', regex: /PREGNENOLONE[\s\S]*?(\d+)\s*(\d+-\d+)\s*ng\/dL/i, unit: 'ng/dL' },
    { name: 'IGF-1', regex: /IGF\s*1[\s\S]*?(\d+)\s*(\d+-\d+)\s*ng\/mL/i, unit: 'ng/mL' },
    
    // Iron
    { name: 'Iron Total', regex: /IRON,?\s*TOTAL\s*(\d+)\s*(\d+-\d+)\s*mcg\/dL/i, unit: 'mcg/dL' },
    { name: 'TIBC', regex: /IRON\s*BINDING\s*CAPACITY\s*(\d+)\s*[HL\s]*(\d+-\d+)\s*mcg\/dL/i, unit: 'mcg/dL' },
    { name: 'Iron Saturation', regex: /%\s*SATURATION\s*(\d+)\s*(\d+-\d+)\s*%/i, unit: '%' },
    { name: 'Ferritin', regex: /FERRITIN\s*(\d+)\s*(\d+-\d+)\s*ng\/mL/i, unit: 'ng/mL' },
    
    // Inflammatory
    { name: 'HS CRP', regex: /HS\s*CRP\s*(\d+\.?\d*)\s*mg\/L/i, unit: 'mg/L', defaultRange: '<1.0' },
    { name: 'Homocysteine', regex: /HOMOCYSTEINE\s*(\d+\.?\d*)\s*<\s*or\s*=\s*(\d+\.?\d*)\s*umol\/L/i, unit: 'umol/L' },
  ]

  for (const pattern of patterns) {
    if (added.has(pattern.name)) continue
    
    const match = text.match(pattern.regex)
    if (match) {
      const value = parseFloat(match[1])
      const referenceRange = match[2] || pattern.defaultRange || ''
      
      result.biomarkers.push({
        biomarker: pattern.name,
        value,
        unit: pattern.unit,
        referenceRange,
        status: 'normal'
      })
      added.add(pattern.name)
      console.log(`✓ Found ${pattern.name}: ${value} ${pattern.unit}`)
    }
  }

  console.log('Total biomarkers extracted:', result.biomarkers.length)
  
  return result
}
