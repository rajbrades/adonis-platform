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
    { name: 'Testosterone Total', regex: /TESTOSTERONE[\s\S]*?TOTAL[\s\S]*?(\d+)\s+(\d+-\d+)\s+ng\/dL/i },
    { name: 'Testosterone Free', regex: /TESTOSTERONE[\s\S]*?FREE[^\n]*?(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+pg\/mL/i },
    { name: 'Testosterone Bioavailable', regex: /TESTOSTERONE[\s\S]*?BIOAVAILABLE[^\n]*?(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+ng\/dL/i },
    { name: 'TSH', regex: /TSH\s+(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+mIU\/L/i },
    { name: 'T4 Free', regex: /T4[\s\S]*?FREE\s+(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+ng\/dL/i },
    { name: 'T3 Free', regex: /T3[\s\S]*?FREE\s+(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+pg\/mL/i },
    { name: 'Vitamin D', regex: /VITAMIN\s*D[\s\S]*?(\d+)\s+(\d+-\d+)\s+ng\/mL/i },
    { name: 'Cholesterol Total', regex: /CHOLESTEROL[\s\S]*?TOTAL[\s\S]*?(\d+)\s+[HL\s]*<?\s*(\d+)\s+mg\/dL/i },
    { name: 'HDL Cholesterol', regex: /HDL\s*CHOLESTEROL\s+(\d+)\s+>\s*OR\s*=\s*(\d+)\s+mg\/dL/i },
    { name: 'LDL Cholesterol', regex: /LDL-?CHOLESTEROL[\s\S]*?(\d+)\s+[HL\s]*mg\/dL/i },
    { name: 'Triglycerides', regex: /TRIGLYCERIDES[^\n]*?(\d+)\s+[HL\s]*<?\s*(\d+)\s+mg\/dL/i },
    { name: 'Non HDL Cholesterol', regex: /NON\s*HDL\s*CHOLESTEROL[^\n]*?(\d+)\s+[HL\s]*<?\s*(\d+)\s+mg\/dL/i },
    { name: 'Apolipoprotein B', regex: /APOLIPOPROTEIN\s*B[^\n]*?(\d+)\s+[HL\s]*<?\s*(\d+)\s+mg\/dL/i },
    { name: 'Lipoprotein (a)', regex: /LIPOPROTEIN\s*\(a\)[^\n]*?<?\s*(\d+)\s+<?\s*(\d+)\s+nmol\/L/i },
    { name: 'Glucose', regex: /GLUCOSE\s+(\d+)\s+[HL\s]*(\d+-\d+)\s+mg\/dL/i },
    { name: 'Hemoglobin A1c', regex: /HEMOGLOBIN\s*A1c\s+(\d+\.?\d*)\s+<?\s*(\d+\.?\d*)\s+%/i },
    { name: 'Insulin', regex: /INSULIN\s+(\d+\.?\d*)\s+uIU\/mL/i },
    { name: 'Creatinine', regex: /CREATININE\s+(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+mg\/dL/i },
    { name: 'BUN', regex: /UREA\s*NITROGEN[^\n]*?(\d+)\s+(\d+-\d+)\s+mg\/dL/i },
    { name: 'eGFR', regex: /EGFR\s+(\d+)\s+>\s*OR\s*=\s*(\d+)/i },
    { name: 'Sodium', regex: /SODIUM\s+(\d+)\s+[HL\s]*(\d+-\d+)\s+mmol\/L/i },
    { name: 'Potassium', regex: /POTASSIUM\s+(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+mmol\/L/i },
    { name: 'Chloride', regex: /CHLORIDE\s+(\d+)\s+[HL\s]*(\d+-\d+)\s+mmol\/L/i },
    { name: 'Carbon Dioxide', regex: /CARBON\s*DIOXIDE\s+(\d+)\s+(\d+-\d+)\s+mmol\/L/i },
    { name: 'Calcium', regex: /CALCIUM\s+(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+mg\/dL/i },
    { name: 'ALT', regex: /ALT\s+(\d+)\s+(\d+-\d+)\s+U\/L/i },
    { name: 'AST', regex: /AST\s+(\d+)\s+(\d+-\d+)\s+U\/L/i },
    { name: 'Alkaline Phosphatase', regex: /ALKALINE\s*PHOSPHATASE\s+(\d+)\s+(\d+-\d+)\s+U\/L/i },
    { name: 'Bilirubin Total', regex: /BILIRUBIN[\s\S]*?TOTAL\s+(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+mg\/dL/i },
    { name: 'GGT', regex: /GGT\s+(\d+)\s+(\d+-\d+)\s+U\/L/i },
    { name: 'Protein Total', regex: /PROTEIN[\s\S]*?TOTAL\s+(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+g\/dL/i },
    { name: 'Albumin', regex: /ALBUMIN\s+(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+g\/dL/i },
    { name: 'Globulin', regex: /GLOBULIN\s+(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+g\/dL/i },
    { name: 'WBC', regex: /WHITE\s*BLOOD\s*CELL\s*COUNT\s+(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+Thousand\/uL/i },
    { name: 'RBC', regex: /RED\s*BLOOD\s*CELL\s*COUNT\s+(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+Million\/uL/i },
    { name: 'Hemoglobin', regex: /HEMOGLOBIN\s+(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+g\/dL/i },
    { name: 'Hematocrit', regex: /HEMATOCRIT\s+(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+%/i },
    { name: 'MCV', regex: /MCV\s+(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+fL/i },
    { name: 'MCH', regex: /MCH\s+(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+pg/i },
    { name: 'MCHC', regex: /MCHC\s+(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+g\/dL/i },
    { name: 'RDW', regex: /RDW\s+(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+%/i },
    { name: 'Platelet Count', regex: /PLATELET\s*COUNT\s+(\d+)\s+(\d+-\d+)\s+Thousand\/uL/i },
    { name: 'MPV', regex: /MPV\s+(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+fL/i },
    { name: 'Absolute Neutrophils', regex: /ABSOLUTE\s*NEUTROPHILS\s+(\d+)\s+(\d+-\d+)\s+cells\/uL/i },
    { name: 'Absolute Lymphocytes', regex: /ABSOLUTE\s*LYMPHOCYTES\s+(\d+)\s+(\d+-\d+)\s+cells\/uL/i },
    { name: 'Absolute Monocytes', regex: /ABSOLUTE\s*MONOCYTES\s+(\d+)\s+(\d+-\d+)\s+cells\/uL/i },
    { name: 'Absolute Eosinophils', regex: /ABSOLUTE\s*EOSINOPHILS\s+(\d+)\s+(\d+-\d+)\s+cells\/uL/i },
    { name: 'Absolute Basophils', regex: /ABSOLUTE\s*BASOPHILS\s+(\d+)\s+(\d+-\d+)\s+cells\/uL/i },
    { name: 'Neutrophils', regex: /NEUTROPHILS\s+(\d+\.?\d*)\s+%/i },
    { name: 'Lymphocytes', regex: /LYMPHOCYTES\s+(\d+\.?\d*)\s+%/i },
    { name: 'Monocytes', regex: /MONOCYTES\s+(\d+\.?\d*)\s+%/i },
    { name: 'Eosinophils', regex: /EOSINOPHILS\s+(\d+\.?\d*)\s+%/i },
    { name: 'Basophils', regex: /BASOPHILS\s+(\d+\.?\d*)\s+%/i },
    { name: 'PSA', regex: /PSA[\s\S]*?TOTAL\s+(\d+\.?\d*)\s+<\s*OR\s*=\s*(\d+\.?\d*)\s+ng\/mL/i },
    { name: 'Estradiol', regex: /ESTRADIOL[^\n]*?(\d+)\s+[HL\s]*<\s*OR\s*=\s*(\d+)\s+pg\/mL/i },
    { name: 'SHBG', regex: /SEX\s*HORMONE\s*BINDING\s*GLOBULIN\s+(\d+)\s+(\d+-\d+)\s+nmol\/L/i },
    { name: 'DHEA-S', regex: /DHEA\s*SULFATE\s+(\d+)\s+(\d+-\d+)\s+mcg\/dL/i },
    { name: 'Pregnenolone', regex: /PREGNENOLONE[^\n]*?(\d+)\s+(\d+-\d+)\s+ng\/dL/i },
    { name: 'IGF-1', regex: /IGF\s*1[^\n]*?(\d+)\s+(\d+-\d+)\s+ng\/mL/i },
    { name: 'Iron Total', regex: /IRON[\s\S]*?TOTAL\s+(\d+)\s+(\d+-\d+)\s+mcg\/dL/i },
    { name: 'TIBC', regex: /IRON\s*BINDING\s*CAPACITY[^\n]*?(\d+)\s+[HL\s]*(\d+-\d+)\s+mcg\/dL/i },
    { name: 'Iron Saturation', regex: /%\s*SATURATION\s+(\d+)\s+(\d+-\d+)\s+%/i },
    { name: 'Ferritin', regex: /FERRITIN\s+(\d+)\s+(\d+-\d+)\s+ng\/mL/i },
    { name: 'HS CRP', regex: /HS\s*CRP\s+(\d+\.?\d*)\s+mg\/L/i },
    { name: 'Homocysteine', regex: /HOMOCYSTEINE\s+(\d+\.?\d*)\s+<\s*or\s*=\s*(\d+\.?\d*)\s+umol\/L/i },
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
        referenceRange: match[2] || getDefaultRange(pattern.name),
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
    'Testosterone Free': 'pg/mL',
    'Testosterone Bioavailable': 'ng/dL',
    'TSH': 'mIU/L',
    'T4 Free': 'ng/dL',
    'T3 Free': 'pg/mL',
    'Vitamin D': 'ng/mL',
    'Cholesterol Total': 'mg/dL',
    'HDL Cholesterol': 'mg/dL',
    'LDL Cholesterol': 'mg/dL',
    'Triglycerides': 'mg/dL',
    'Non HDL Cholesterol': 'mg/dL',
    'Apolipoprotein B': 'mg/dL',
    'Lipoprotein (a)': 'nmol/L',
    'Glucose': 'mg/dL',
    'Hemoglobin A1c': '%',
    'Insulin': 'uIU/mL',
    'Creatinine': 'mg/dL',
    'BUN': 'mg/dL',
    'eGFR': 'mL/min/1.73m2',
    'Sodium': 'mmol/L',
    'Potassium': 'mmol/L',
    'Chloride': 'mmol/L',
    'Carbon Dioxide': 'mmol/L',
    'Calcium': 'mg/dL',
    'ALT': 'U/L',
    'AST': 'U/L',
    'Alkaline Phosphatase': 'U/L',
    'Bilirubin Total': 'mg/dL',
    'GGT': 'U/L',
    'Protein Total': 'g/dL',
    'Albumin': 'g/dL',
    'Globulin': 'g/dL',
    'WBC': 'Thousand/uL',
    'RBC': 'Million/uL',
    'Hemoglobin': 'g/dL',
    'Hematocrit': '%',
    'MCV': 'fL',
    'MCH': 'pg',
    'MCHC': 'g/dL',
    'RDW': '%',
    'Platelet Count': 'Thousand/uL',
    'MPV': 'fL',
    'Absolute Neutrophils': 'cells/uL',
    'Absolute Lymphocytes': 'cells/uL',
    'Absolute Monocytes': 'cells/uL',
    'Absolute Eosinophils': 'cells/uL',
    'Absolute Basophils': 'cells/uL',
    'Neutrophils': '%',
    'Lymphocytes': '%',
    'Monocytes': '%',
    'Eosinophils': '%',
    'Basophils': '%',
    'PSA': 'ng/mL',
    'Estradiol': 'pg/mL',
    'SHBG': 'nmol/L',
    'DHEA-S': 'mcg/dL',
    'Pregnenolone': 'ng/dL',
    'IGF-1': 'ng/mL',
    'Iron Total': 'mcg/dL',
    'TIBC': 'mcg/dL',
    'Iron Saturation': '%',
    'Ferritin': 'ng/mL',
    'HS CRP': 'mg/L',
    'Homocysteine': 'umol/L',
  }
  return units[biomarkerName] || ''
}

function getDefaultRange(biomarkerName: string): string {
  const ranges: Record<string, string> = {
    'LDL Cholesterol': '<100',
    'Insulin': '<=18.4',
    'HS CRP': '<1.0',
    'Neutrophils': '40-70',
    'Lymphocytes': '20-40',
    'Monocytes': '2-8',
    'Eosinophils': '1-4',
    'Basophils': '0.5-1',
  }
  return ranges[biomarkerName] || ''
}
