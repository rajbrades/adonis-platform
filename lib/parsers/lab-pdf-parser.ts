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

  console.log('=== PDF PARSING ===')

  if (text.match(/quest\s*diagnostics/i)) {
    result.labName = 'Quest Diagnostics'
  }

  const dateMatch = text.match(/Collected:\s*(\d{2}\/\d{2}\/\d{4})/i)
  if (dateMatch) result.testDate = dateMatch[1]

  // Extract each biomarker explicitly
  const biomarkers: ParsedBiomarker[] = []
  
  // Helper to add biomarker
  const addBiomarker = (name: string, value: number, unit: string, range: string) => {
    biomarkers.push({
      biomarker: name,
      value: value,
      unit: unit,
      referenceRange: range,
      status: 'normal'
    })
    console.log(`✓ ${name}: ${value} ${unit} (${range})`)
  }

  // Testosterone
  let match = text.match(/TESTOSTERONE,?\s*TOTAL[\s\S]{0,100}?(\d+)\s*(\d+-\d+)\s*ng\/dL/i)
  if (match) addBiomarker('Testosterone Total', parseFloat(match[1]), 'ng/dL', match[2])
  
  match = text.match(/TESTOSTERONE,?\s*FREE[\s\S]{0,100}?(\d+\.?\d*)\s*(\d+\.?\d*-\d+\.?\d*)\s*pg\/mL/i)
  if (match) addBiomarker('Testosterone Free', parseFloat(match[1]), 'pg/mL', match[2])
  
  match = text.match(/TESTOSTERONE,?BIOAVAILABLE[\s\S]{0,100}?(\d+\.?\d*)\s*(\d+\.?\d*-\d+\.?\d*)\s*ng\/dL/i)
  if (match) addBiomarker('Testosterone Bioavailable', parseFloat(match[1]), 'ng/dL', match[2])

  // Thyroid
  match = text.match(/TSH\s*(\d+\.?\d*)\s*(\d+\.?\d*-\d+\.?\d*)\s*mIU\/L/i)
  if (match) addBiomarker('TSH', parseFloat(match[1]), 'mIU/L', match[2])
  
  match = text.match(/T4,?\s*FREE\s*(\d+\.?\d*)\s*(\d+\.?\d*-\d+\.?\d*)\s*ng\/dL/i)
  if (match) addBiomarker('T4 Free', parseFloat(match[1]), 'ng/dL', match[2])
  
  match = text.match(/T3,?\s*FREE\s*(\d+\.?\d*)\s*(\d+\.?\d*-\d+\.?\d*)\s*pg\/mL/i)
  if (match) addBiomarker('T3 Free', parseFloat(match[1]), 'pg/mL', match[2])

  // Vitamin D
  match = text.match(/VITAMIN\s*D[\s\S]{0,100}?(\d+)\s*(\d+-\d+)\s*ng\/mL/i)
  if (match) addBiomarker('Vitamin D', parseFloat(match[1]), 'ng/mL', match[2])

  // Lipids
  match = text.match(/CHOLESTEROL,?\s*TOTAL\s*(\d+)\s*[HL\s]*<?\s*(\d+)\s*mg\/dL/i)
  if (match) addBiomarker('Cholesterol Total', parseFloat(match[1]), 'mg/dL', `<${match[2]}`)
  
  match = text.match(/HDL\s*CHOLESTEROL\s*(\d+)\s*>\s*OR\s*=\s*(\d+)\s*mg\/dL/i)
  if (match) addBiomarker('HDL Cholesterol', parseFloat(match[1]), 'mg/dL', `>=${match[2]}`)
  
  match = text.match(/LDL-?CHOLESTEROL\s*(\d+)\s*[HL\s]*mg\/dL/i)
  if (match) addBiomarker('LDL Cholesterol', parseFloat(match[1]), 'mg/dL', '<100')
  
  match = text.match(/TRIGLYCERIDES\s*(\d+)\s*[HL\s]*<?\s*(\d+)\s*mg\/dL/i)
  if (match) addBiomarker('Triglycerides', parseFloat(match[1]), 'mg/dL', `<${match[2]}`)
  
  match = text.match(/NON\s*HDL\s*CHOLESTEROL\s*(\d+)\s*[HL\s]*<?\s*(\d+)\s*mg\/dL/i)
  if (match) addBiomarker('Non HDL Cholesterol', parseFloat(match[1]), 'mg/dL', `<${match[2]}`)
  
  match = text.match(/APOLIPOPROTEIN\s*B\s*(\d+)\s*[HL\s]*<?\s*(\d+)\s*mg\/dL/i)
  if (match) addBiomarker('Apolipoprotein B', parseFloat(match[1]), 'mg/dL', `<${match[2]}`)
  
  match = text.match(/LIPOPROTEIN\s*\(a\)\s*<?\s*(\d+)\s*<?\s*(\d+)\s*nmol\/L/i)
  if (match) addBiomarker('Lipoprotein (a)', parseFloat(match[1]), 'nmol/L', `<${match[2]}`)

  // Metabolic
  match = text.match(/GLUCOSE\s*(\d+)\s*[HL\s]*(\d+-\d+)\s*mg\/dL/i)
  if (match) addBiomarker('Glucose', parseFloat(match[1]), 'mg/dL', match[2])
  
  match = text.match(/HEMOGLOBIN\s*A1c\s*(\d+\.?\d*)\s*<?\s*(\d+\.?\d*)\s*%/i)
  if (match) addBiomarker('Hemoglobin A1c', parseFloat(match[1]), '%', `<${match[2]}`)
  
  match = text.match(/INSULIN\s*(\d+\.?\d*)\s*uIU\/mL/i)
  if (match) addBiomarker('Insulin', parseFloat(match[1]), 'uIU/mL', '<=18.4')

  // Kidney
  match = text.match(/CREATININE\s*(\d+\.?\d*)\s*(\d+\.?\d*-\d+\.?\d*)\s*mg\/dL/i)
  if (match) addBiomarker('Creatinine', parseFloat(match[1]), 'mg/dL', match[2])
  
  match = text.match(/UREA\s*NITROGEN[\s\S]{0,50}?(\d+)\s*(\d+-\d+)\s*mg\/dL/i)
  if (match) addBiomarker('BUN', parseFloat(match[1]), 'mg/dL', match[2])
  
  match = text.match(/EGFR\s*(\d+)\s*>\s*OR\s*=\s*(\d+)/i)
  if (match) addBiomarker('eGFR', parseFloat(match[1]), 'mL/min/1.73m2', `>=${match[2]}`)

  // Electrolytes  
  match = text.match(/SODIUM\s*(\d+)\s*[HL\s]*(\d+-\d+)\s*mmol\/L/i)
  if (match) addBiomarker('Sodium', parseFloat(match[1]), 'mmol/L', match[2])
  
  match = text.match(/POTASSIUM\s*(\d+\.?\d*)\s*(\d+\.?\d*-\d+\.?\d*)\s*mmol\/L/i)
  if (match) addBiomarker('Potassium', parseFloat(match[1]), 'mmol/L', match[2])
  
  match = text.match(/CHLORIDE\s*(\d+)\s*[HL\s]*(\d+-\d+)\s*mmol\/L/i)
  if (match) addBiomarker('Chloride', parseFloat(match[1]), 'mmol/L', match[2])
  
  match = text.match(/CARBON\s*DIOXIDE\s*(\d+)\s*(\d+-\d+)\s*mmol\/L/i)
  if (match) addBiomarker('Carbon Dioxide', parseFloat(match[1]), 'mmol/L', match[2])
  
  match = text.match(/CALCIUM\s*(\d+\.?\d*)\s*(\d+\.?\d*-\d+\.?\d*)\s*mg\/dL/i)
  if (match) addBiomarker('Calcium', parseFloat(match[1]), 'mg/dL', match[2])

  // Liver
  match = text.match(/ALT\s*(\d+)\s*(\d+-\d+)\s*U\/L/i)
  if (match) addBiomarker('ALT', parseFloat(match[1]), 'U/L', match[2])
  
  match = text.match(/AST\s*(\d+)\s*(\d+-\d+)\s*U\/L/i)
  if (match) addBiomarker('AST', parseFloat(match[1]), 'U/L', match[2])
  
  match = text.match(/ALKALINE\s*PHOSPHATASE\s*(\d+)\s*(\d+-\d+)\s*U\/L/i)
  if (match) addBiomarker('Alkaline Phosphatase', parseFloat(match[1]), 'U/L', match[2])
  
  match = text.match(/BILIRUBIN,?\s*TOTAL\s*(\d+\.?\d*)\s*(\d+\.?\d*-\d+\.?\d*)\s*mg\/dL/i)
  if (match) addBiomarker('Bilirubin Total', parseFloat(match[1]), 'mg/dL', match[2])
  
  match = text.match(/GGT\s*(\d+)\s*(\d+-\d+)\s*U\/L/i)
  if (match) addBiomarker('GGT', parseFloat(match[1]), 'U/L', match[2])
  
  match = text.match(/PROTEIN,?\s*TOTAL\s*(\d+\.?\d*)\s*(\d+\.?\d*-\d+\.?\d*)\s*g\/dL/i)
  if (match) addBiomarker('Protein Total', parseFloat(match[1]), 'g/dL', match[2])
  
  match = text.match(/ALBUMIN\s*(\d+\.?\d*)\s*(\d+\.?\d*-\d+\.?\d*)\s*g\/dL/i)
  if (match) addBiomarker('Albumin', parseFloat(match[1]), 'g/dL', match[2])
  
  match = text.match(/GLOBULIN\s*(\d+\.?\d*)\s*(\d+\.?\d*-\d+\.?\d*)\s*g\/dL/i)
  if (match) addBiomarker('Globulin', parseFloat(match[1]), 'g/dL', match[2])

  // CBC
  match = text.match(/WHITE\s*BLOOD\s*CELL\s*COUNT\s*(\d+\.?\d*)\s*(\d+\.?\d*-\d+\.?\d*)\s*Thousand\/uL/i)
  if (match) addBiomarker('WBC', parseFloat(match[1]), 'Thousand/uL', match[2])
  
  match = text.match(/RED\s*BLOOD\s*CELL\s*COUNT\s*(\d+\.?\d*)\s*(\d+\.?\d*-\d+\.?\d*)\s*Million\/uL/i)
  if (match) addBiomarker('RBC', parseFloat(match[1]), 'Million/uL', match[2])
  
  match = text.match(/HEMOGLOBIN\s*(\d+\.?\d*)\s*(\d+\.?\d*-\d+\.?\d*)\s*g\/dL/i)
  if (match) addBiomarker('Hemoglobin', parseFloat(match[1]), 'g/dL', match[2])
  
  match = text.match(/HEMATOCRIT\s*(\d+\.?\d*)\s*(\d+\.?\d*-\d+\.?\d*)\s*%/i)
  if (match) addBiomarker('Hematocrit', parseFloat(match[1]), '%', match[2])
  
  match = text.match(/MCV\s*(\d+\.?\d*)\s*(\d+\.?\d*-\d+\.?\d*)\s*fL/i)
  if (match) addBiomarker('MCV', parseFloat(match[1]), 'fL', match[2])
  
  match = text.match(/MCH\s*(\d+\.?\d*)\s*(\d+\.?\d*-\d+\.?\d*)\s*pg/i)
  if (match) addBiomarker('MCH', parseFloat(match[1]), 'pg', match[2])
  
  match = text.match(/MCHC\s*(\d+\.?\d*)\s*(\d+\.?\d*-\d+\.?\d*)\s*g\/dL/i)
  if (match) addBiomarker('MCHC', parseFloat(match[1]), 'g/dL', match[2])
  
  match = text.match(/RDW\s*(\d+\.?\d*)\s*(\d+\.?\d*-\d+\.?\d*)\s*%/i)
  if (match) addBiomarker('RDW', parseFloat(match[1]), '%', match[2])
  
  match = text.match(/PLATELET\s*COUNT\s*(\d+)\s*(\d+-\d+)\s*Thousand\/uL/i)
  if (match) addBiomarker('Platelet Count', parseFloat(match[1]), 'Thousand/uL', match[2])
  
  match = text.match(/MPV\s*(\d+\.?\d*)\s*(\d+\.?\d*-\d+\.?\d*)\s*fL/i)
  if (match) addBiomarker('MPV', parseFloat(match[1]), 'fL', match[2])
  
  match = text.match(/ABSOLUTE\s*NEUTROPHILS\s*(\d+)\s*(\d+-\d+)\s*cells\/uL/i)
  if (match) addBiomarker('Absolute Neutrophils', parseFloat(match[1]), 'cells/uL', match[2])
  
  match = text.match(/ABSOLUTE\s*LYMPHOCYTES\s*(\d+)\s*(\d+-\d+)\s*cells\/uL/i)
  if (match) addBiomarker('Absolute Lymphocytes', parseFloat(match[1]), 'cells/uL', match[2])
  
  match = text.match(/ABSOLUTE\s*MONOCYTES\s*(\d+)\s*(\d+-\d+)\s*cells\/uL/i)
  if (match) addBiomarker('Absolute Monocytes', parseFloat(match[1]), 'cells/uL', match[2])
  
  match = text.match(/ABSOLUTE\s*EOSINOPHILS\s*(\d+)\s*(\d+-\d+)\s*cells\/uL/i)
  if (match) addBiomarker('Absolute Eosinophils', parseFloat(match[1]), 'cells/uL', match[2])
  
  match = text.match(/ABSOLUTE\s*BASOPHILS\s*(\d+)\s*(\d+-\d+)\s*cells\/uL/i)
  if (match) addBiomarker('Absolute Basophils', parseFloat(match[1]), 'cells/uL', match[2])

  // Other Hormones
  match = text.match(/ESTRADIOL\s*(\d+)\s*[HL\s]*<\s*OR\s*=\s*(\d+)\s*pg\/mL/i)
  if (match) addBiomarker('Estradiol', parseFloat(match[1]), 'pg/mL', `<=${match[2]}`)
  
  match = text.match(/PSA,?\s*TOTAL\s*(\d+\.?\d*)\s*<\s*OR\s*=\s*(\d+\.?\d*)\s*ng\/mL/i)
  if (match) addBiomarker('PSA', parseFloat(match[1]), 'ng/mL', `<=${match[2]}`)
  
  match = text.match(/SEX\s*HORMONE\s*BINDING\s*GLOBULIN\s*(\d+)\s*(\d+-\d+)\s*nmol\/L/i)
  if (match) addBiomarker('SHBG', parseFloat(match[1]), 'nmol/L', match[2])
  
  match = text.match(/DHEA\s*SULFATE\s*(\d+)\s*(\d+-\d+)\s*mcg\/dL/i)
  if (match) addBiomarker('DHEA-S', parseFloat(match[1]), 'mcg/dL', match[2])
  
  match = text.match(/PREGNENOLONE[\s\S]{0,50}?(\d+)\s*(\d+-\d+)\s*ng\/dL/i)
  if (match) addBiomarker('Pregnenolone', parseFloat(match[1]), 'ng/dL', match[2])
  
  match = text.match(/IGF\s*1[\s\S]{0,50}?(\d+)\s*(\d+-\d+)\s*ng\/mL/i)
  if (match) addBiomarker('IGF-1', parseFloat(match[1]), 'ng/mL', match[2])

  // Iron
  match = text.match(/IRON,?\s*TOTAL\s*(\d+)\s*(\d+-\d+)\s*mcg\/dL/i)
  if (match) addBiomarker('Iron Total', parseFloat(match[1]), 'mcg/dL', match[2])
  
  match = text.match(/IRON\s*BINDING\s*CAPACITY\s*(\d+)\s*[HL\s]*(\d+-\d+)\s*mcg\/dL/i)
  if (match) addBiomarker('TIBC', parseFloat(match[1]), 'mcg/dL', match[2])
  
  match = text.match(/%\s*SATURATION\s*(\d+)\s*(\d+-\d+)\s*%/i)
  if (match) addBiomarker('Iron Saturation', parseFloat(match[1]), '%', match[2])
  
  match = text.match(/FERRITIN\s*(\d+)\s*(\d+-\d+)\s*ng\/mL/i)
  if (match) addBiomarker('Ferritin', parseFloat(match[1]), 'ng/mL', match[2])

  // Inflammatory
  match = text.match(/HS\s*CRP\s*(\d+\.?\d*)\s*mg\/L/i)
  if (match) addBiomarker('HS CRP', parseFloat(match[1]), 'mg/L', '<1.0')
  
  match = text.match(/HOMOCYSTEINE\s*(\d+\.?\d*)\s*<\s*or\s*=\s*(\d+\.?\d*)\s*umol\/L/i)
  if (match) addBiomarker('Homocysteine', parseFloat(match[1]), 'umol/L', `<=${match[2]}`)

  result.biomarkers = biomarkers
  console.log(`Total extracted: ${biomarkers.length}`)
  
  return result
}
