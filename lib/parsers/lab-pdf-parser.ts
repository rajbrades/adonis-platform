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

  // Split into lines and parse line by line - more reliable for Quest format
  const lines = text.split('\n')
  const added = new Set<string>() // Track what we've added to avoid duplicates
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    
    // Skip empty lines
    if (!line) continue
    
    // Testosterone Total - multiple formats
    if (/TESTOSTERONE.*TOTAL.*MALE/i.test(line) && !added.has('Testosterone Total')) {
      const match = line.match(/(\d+)\s+(\d+-\d+)\s+ng\/dL/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'Testosterone Total', value: parseFloat(match[1]), unit: 'ng/dL', referenceRange: match[2], status: 'normal' })
        added.add('Testosterone Total')
      }
    }
    
    // Testosterone Free
    if (/TESTOSTERONE.*FREE[^B]/i.test(line) && !added.has('Testosterone Free')) {
      const match = line.match(/(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+pg\/mL/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'Testosterone Free', value: parseFloat(match[1]), unit: 'pg/mL', referenceRange: match[2], status: 'normal' })
        added.add('Testosterone Free')
      }
    }
    
    // Testosterone Bioavailable
    if (/TESTOSTERONE.*BIOAVAILABLE/i.test(line) && !added.has('Testosterone Bioavailable')) {
      const match = line.match(/(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+ng\/dL/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'Testosterone Bioavailable', value: parseFloat(match[1]), unit: 'ng/dL', referenceRange: match[2], status: 'normal' })
        added.add('Testosterone Bioavailable')
      }
    }
    
    // TSH
    if (/^TSH\s/i.test(line) && !added.has('TSH')) {
      const match = line.match(/(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+m[iI]U\/L/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'TSH', value: parseFloat(match[1]), unit: 'mIU/L', referenceRange: match[2], status: 'normal' })
        added.add('TSH')
      }
    }
    
    // T4 Free
    if (/T4.*FREE/i.test(line) && !added.has('T4 Free')) {
      const match = line.match(/(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+ng\/dL/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'T4 Free', value: parseFloat(match[1]), unit: 'ng/dL', referenceRange: match[2], status: 'normal' })
        added.add('T4 Free')
      }
    }
    
    // T3 Free
    if (/T3.*FREE/i.test(line) && !added.has('T3 Free')) {
      const match = line.match(/(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+pg\/mL/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'T3 Free', value: parseFloat(match[1]), unit: 'pg/mL', referenceRange: match[2], status: 'normal' })
        added.add('T3 Free')
      }
    }
    
    // Vitamin D
    if (/VITAMIN\s*D.*25-OH/i.test(line) && !added.has('Vitamin D')) {
      const match = line.match(/(\d+)\s+(\d+-\d+)\s+ng\/mL/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'Vitamin D', value: parseFloat(match[1]), unit: 'ng/mL', referenceRange: match[2], status: 'normal' })
        added.add('Vitamin D')
      }
    }
    
    // Cholesterol Total
    if (/CHOLESTEROL.*TOTAL/i.test(line) && !added.has('Cholesterol Total')) {
      const match = line.match(/(\d+)\s+[HL\s]*<?\s*(\d+)\s+mg\/dL/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'Cholesterol Total', value: parseFloat(match[1]), unit: 'mg/dL', referenceRange: `<${match[2]}`, status: 'normal' })
        added.add('Cholesterol Total')
      }
    }
    
    // HDL
    if (/HDL\s*CHOLESTEROL/i.test(line) && !added.has('HDL Cholesterol')) {
      const match = line.match(/(\d+)\s+>\s*OR\s*=\s*(\d+)\s+mg\/dL/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'HDL Cholesterol', value: parseFloat(match[1]), unit: 'mg/dL', referenceRange: `>=${match[2]}`, status: 'normal' })
        added.add('HDL Cholesterol')
      }
    }
    
    // LDL
    if (/LDL-?CHOLESTEROL/i.test(line) && !added.has('LDL Cholesterol')) {
      const match = line.match(/(\d+)\s+[HL\s]*mg\/dL/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'LDL Cholesterol', value: parseFloat(match[1]), unit: 'mg/dL', referenceRange: '<100', status: 'normal' })
        added.add('LDL Cholesterol')
      }
    }
    
    // Triglycerides
    if (/TRIGLYCERIDES/i.test(line) && !/NON/i.test(line) && !added.has('Triglycerides')) {
      const match = line.match(/(\d+)\s+[HL\s]*<?\s*(\d+)\s+mg\/dL/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'Triglycerides', value: parseFloat(match[1]), unit: 'mg/dL', referenceRange: `<${match[2]}`, status: 'normal' })
        added.add('Triglycerides')
      }
    }
    
    // Non HDL Cholesterol
    if (/NON\s*HDL\s*CHOLESTEROL/i.test(line) && !added.has('Non HDL Cholesterol')) {
      const match = line.match(/(\d+)\s+[HL\s]*<?\s*(\d+)\s+mg\/dL/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'Non HDL Cholesterol', value: parseFloat(match[1]), unit: 'mg/dL', referenceRange: `<${match[2]}`, status: 'normal' })
        added.add('Non HDL Cholesterol')
      }
    }
    
    // Apolipoprotein B
    if (/APOLIPOPROTEIN\s*B/i.test(line) && !added.has('Apolipoprotein B')) {
      const match = line.match(/(\d+)\s+[HL\s]*<?\s*(\d+)\s+mg\/dL/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'Apolipoprotein B', value: parseFloat(match[1]), unit: 'mg/dL', referenceRange: `<${match[2]}`, status: 'normal' })
        added.add('Apolipoprotein B')
      }
    }
    
    // Lipoprotein (a)
    if (/LIPOPROTEIN\s*\(a\)/i.test(line) && !added.has('Lipoprotein (a)')) {
      const match = line.match(/<?\s*(\d+)\s+<?\s*(\d+)\s+nmol\/L/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'Lipoprotein (a)', value: parseFloat(match[1]), unit: 'nmol/L', referenceRange: `<${match[2]}`, status: 'normal' })
        added.add('Lipoprotein (a)')
      }
    }
    
    // Glucose
    if (/^GLUCOSE\s/i.test(line) && !added.has('Glucose')) {
      const match = line.match(/(\d+)\s+[HL\s]*(\d+-\d+)\s+mg\/dL/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'Glucose', value: parseFloat(match[1]), unit: 'mg/dL', referenceRange: match[2], status: 'normal' })
        added.add('Glucose')
      }
    }
    
    // Hemoglobin A1c
    if (/HEMOGLOBIN\s*A1c/i.test(line) && !added.has('Hemoglobin A1c')) {
      const match = line.match(/(\d+\.?\d*)\s+<?\s*(\d+\.?\d*)\s+%/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'Hemoglobin A1c', value: parseFloat(match[1]), unit: '%', referenceRange: `<${match[2]}`, status: 'normal' })
        added.add('Hemoglobin A1c')
      }
    }
    
    // Insulin
    if (/^INSULIN\s/i.test(line) && !added.has('Insulin')) {
      const match = line.match(/(\d+\.?\d*)\s+uIU\/mL/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'Insulin', value: parseFloat(match[1]), unit: 'uIU/mL', referenceRange: '<=18.4', status: 'normal' })
        added.add('Insulin')
      }
    }
    
    // Creatinine
    if (/^CREATININE\s/i.test(line) && !added.has('Creatinine')) {
      const match = line.match(/(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+mg\/dL/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'Creatinine', value: parseFloat(match[1]), unit: 'mg/dL', referenceRange: match[2], status: 'normal' })
        added.add('Creatinine')
      }
    }
    
    // BUN
    if (/UREA\s*NITROGEN/i.test(line) && !added.has('BUN')) {
      const match = line.match(/(\d+)\s+(\d+-\d+)\s+mg\/dL/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'BUN', value: parseFloat(match[1]), unit: 'mg/dL', referenceRange: match[2], status: 'normal' })
        added.add('BUN')
      }
    }
    
    // eGFR
    if (/^EGFR\s/i.test(line) && !added.has('eGFR')) {
      const match = line.match(/(\d+)\s+>\s*OR\s*=\s*(\d+)/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'eGFR', value: parseFloat(match[1]), unit: 'mL/min/1.73m2', referenceRange: `>=${match[2]}`, status: 'normal' })
        added.add('eGFR')
      }
    }
    
    // Electrolytes
    if (/^SODIUM\s/i.test(line) && !added.has('Sodium')) {
      const match = line.match(/(\d+)\s+[HL\s]*(\d+-\d+)\s+mmol\/L/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'Sodium', value: parseFloat(match[1]), unit: 'mmol/L', referenceRange: match[2], status: 'normal' })
        added.add('Sodium')
      }
    }
    
    if (/^POTASSIUM\s/i.test(line) && !added.has('Potassium')) {
      const match = line.match(/(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+mmol\/L/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'Potassium', value: parseFloat(match[1]), unit: 'mmol/L', referenceRange: match[2], status: 'normal' })
        added.add('Potassium')
      }
    }
    
    if (/^CHLORIDE\s/i.test(line) && !added.has('Chloride')) {
      const match = line.match(/(\d+)\s+[HL\s]*(\d+-\d+)\s+mmol\/L/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'Chloride', value: parseFloat(match[1]), unit: 'mmol/L', referenceRange: match[2], status: 'normal' })
        added.add('Chloride')
      }
    }
    
    if (/CARBON\s*DIOXIDE/i.test(line) && !added.has('Carbon Dioxide')) {
      const match = line.match(/(\d+)\s+(\d+-\d+)\s+mmol\/L/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'Carbon Dioxide', value: parseFloat(match[1]), unit: 'mmol/L', referenceRange: match[2], status: 'normal' })
        added.add('Carbon Dioxide')
      }
    }
    
    if (/^CALCIUM\s/i.test(line) && !added.has('Calcium')) {
      const match = line.match(/(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+mg\/dL/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'Calcium', value: parseFloat(match[1]), unit: 'mg/dL', referenceRange: match[2], status: 'normal' })
        added.add('Calcium')
      }
    }
    
    // Liver
    if (/^ALT\s/i.test(line) && !added.has('ALT')) {
      const match = line.match(/(\d+)\s+(\d+-\d+)\s+U\/L/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'ALT', value: parseFloat(match[1]), unit: 'U/L', referenceRange: match[2], status: 'normal' })
        added.add('ALT')
      }
    }
    
    if (/^AST\s/i.test(line) && !added.has('AST')) {
      const match = line.match(/(\d+)\s+(\d+-\d+)\s+U\/L/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'AST', value: parseFloat(match[1]), unit: 'U/L', referenceRange: match[2], status: 'normal' })
        added.add('AST')
      }
    }
    
    if (/ALKALINE\s*PHOSPHATASE/i.test(line) && !added.has('Alkaline Phosphatase')) {
      const match = line.match(/(\d+)\s+(\d+-\d+)\s+U\/L/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'Alkaline Phosphatase', value: parseFloat(match[1]), unit: 'U/L', referenceRange: match[2], status: 'normal' })
        added.add('Alkaline Phosphatase')
      }
    }
    
    if (/BILIRUBIN.*TOTAL/i.test(line) && !added.has('Bilirubin Total')) {
      const match = line.match(/(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+mg\/dL/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'Bilirubin Total', value: parseFloat(match[1]), unit: 'mg/dL', referenceRange: match[2], status: 'normal' })
        added.add('Bilirubin Total')
      }
    }
    
    if (/^GGT\s/i.test(line) && !added.has('GGT')) {
      const match = line.match(/(\d+)\s+(\d+-\d+)\s+U\/L/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'GGT', value: parseFloat(match[1]), unit: 'U/L', referenceRange: match[2], status: 'normal' })
        added.add('GGT')
      }
    }
    
    if (/PROTEIN.*TOTAL/i.test(line) && !added.has('Protein Total')) {
      const match = line.match(/(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+g\/dL/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'Protein Total', value: parseFloat(match[1]), unit: 'g/dL', referenceRange: match[2], status: 'normal' })
        added.add('Protein Total')
      }
    }
    
    if (/^ALBUMIN\s/i.test(line) && !/GLOBULIN/i.test(line) && !added.has('Albumin')) {
      const match = line.match(/(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+g\/dL/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'Albumin', value: parseFloat(match[1]), unit: 'g/dL', referenceRange: match[2], status: 'normal' })
        added.add('Albumin')
      }
    }
    
    if (/^GLOBULIN\s/i.test(line) && !added.has('Globulin')) {
      const match = line.match(/(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+g\/dL/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'Globulin', value: parseFloat(match[1]), unit: 'g/dL', referenceRange: match[2], status: 'normal' })
        added.add('Globulin')
      }
    }
    
    // CBC
    if (/WHITE\s*BLOOD\s*CELL\s*COUNT/i.test(line) && !added.has('WBC')) {
      const match = line.match(/(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+Thousand\/uL/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'WBC', value: parseFloat(match[1]), unit: 'Thousand/uL', referenceRange: match[2], status: 'normal' })
        added.add('WBC')
      }
    }
    
    if (/RED\s*BLOOD\s*CELL\s*COUNT/i.test(line) && !added.has('RBC')) {
      const match = line.match(/(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+Million\/uL/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'RBC', value: parseFloat(match[1]), unit: 'Million/uL', referenceRange: match[2], status: 'normal' })
        added.add('RBC')
      }
    }
    
    if (/^HEMOGLOBIN\s+\d/i.test(line) && !/A1c/i.test(line) && !added.has('Hemoglobin')) {
      const match = line.match(/(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+g\/dL/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'Hemoglobin', value: parseFloat(match[1]), unit: 'g/dL', referenceRange: match[2], status: 'normal' })
        added.add('Hemoglobin')
      }
    }
    
    if (/^HEMATOCRIT\s/i.test(line) && !added.has('Hematocrit')) {
      const match = line.match(/(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+%/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'Hematocrit', value: parseFloat(match[1]), unit: '%', referenceRange: match[2], status: 'normal' })
        added.add('Hematocrit')
      }
    }
    
    if (/^MCV\s/i.test(line) && !added.has('MCV')) {
      const match = line.match(/(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+fL/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'MCV', value: parseFloat(match[1]), unit: 'fL', referenceRange: match[2], status: 'normal' })
        added.add('MCV')
      }
    }
    
    if (/^MCH\s/i.test(line) && !/MCHC/i.test(line) && !added.has('MCH')) {
      const match = line.match(/(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+pg/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'MCH', value: parseFloat(match[1]), unit: 'pg', referenceRange: match[2], status: 'normal' })
        added.add('MCH')
      }
    }
    
    if (/^MCHC\s/i.test(line) && !added.has('MCHC')) {
      const match = line.match(/(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+g\/dL/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'MCHC', value: parseFloat(match[1]), unit: 'g/dL', referenceRange: match[2], status: 'normal' })
        added.add('MCHC')
      }
    }
    
    if (/^RDW\s/i.test(line) && !added.has('RDW')) {
      const match = line.match(/(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+%/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'RDW', value: parseFloat(match[1]), unit: '%', referenceRange: match[2], status: 'normal' })
        added.add('RDW')
      }
    }
    
    if (/PLATELET\s*COUNT/i.test(line) && !added.has('Platelet Count')) {
      const match = line.match(/(\d+)\s+(\d+-\d+)\s+Thousand\/uL/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'Platelet Count', value: parseFloat(match[1]), unit: 'Thousand/uL', referenceRange: match[2], status: 'normal' })
        added.add('Platelet Count')
      }
    }
    
    if (/^MPV\s/i.test(line) && !added.has('MPV')) {
      const match = line.match(/(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+fL/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'MPV', value: parseFloat(match[1]), unit: 'fL', referenceRange: match[2], status: 'normal' })
        added.add('MPV')
      }
    }
    
    // Differentials
    if (/ABSOLUTE\s*NEUTROPHILS/i.test(line) && !added.has('Absolute Neutrophils')) {
      const match = line.match(/(\d+)\s+(\d+-\d+)\s+cells\/uL/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'Absolute Neutrophils', value: parseFloat(match[1]), unit: 'cells/uL', referenceRange: match[2], status: 'normal' })
        added.add('Absolute Neutrophils')
      }
    }
    
    if (/ABSOLUTE\s*LYMPHOCYTES/i.test(line) && !added.has('Absolute Lymphocytes')) {
      const match = line.match(/(\d+)\s+(\d+-\d+)\s+cells\/uL/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'Absolute Lymphocytes', value: parseFloat(match[1]), unit: 'cells/uL', referenceRange: match[2], status: 'normal' })
        added.add('Absolute Lymphocytes')
      }
    }
    
    if (/ABSOLUTE\s*MONOCYTES/i.test(line) && !added.has('Absolute Monocytes')) {
      const match = line.match(/(\d+)\s+(\d+-\d+)\s+cells\/uL/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'Absolute Monocytes', value: parseFloat(match[1]), unit: 'cells/uL', referenceRange: match[2], status: 'normal' })
        added.add('Absolute Monocytes')
      }
    }
    
    if (/ABSOLUTE\s*EOSINOPHILS/i.test(line) && !added.has('Absolute Eosinophils')) {
      const match = line.match(/(\d+)\s+(\d+-\d+)\s+cells\/uL/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'Absolute Eosinophils', value: parseFloat(match[1]), unit: 'cells/uL', referenceRange: match[2], status: 'normal' })
        added.add('Absolute Eosinophils')
      }
    }
    
    if (/ABSOLUTE\s*BASOPHILS/i.test(line) && !added.has('Absolute Basophils')) {
      const match = line.match(/(\d+)\s+(\d+-\d+)\s+cells\/uL/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'Absolute Basophils', value: parseFloat(match[1]), unit: 'cells/uL', referenceRange: match[2], status: 'normal' })
        added.add('Absolute Basophils')
      }
    }
    
    if (/^NEUTROPHILS\s+\d/i.test(line) && !/ABSOLUTE/i.test(line) && !added.has('Neutrophils')) {
      const match = line.match(/(\d+\.?\d*)\s+%/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'Neutrophils', value: parseFloat(match[1]), unit: '%', referenceRange: '40-70', status: 'normal' })
        added.add('Neutrophils')
      }
    }
    
    if (/^LYMPHOCYTES\s+\d/i.test(line) && !/ABSOLUTE/i.test(line) && !added.has('Lymphocytes')) {
      const match = line.match(/(\d+\.?\d*)\s+%/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'Lymphocytes', value: parseFloat(match[1]), unit: '%', referenceRange: '20-40', status: 'normal' })
        added.add('Lymphocytes')
      }
    }
    
    if (/^MONOCYTES\s+\d/i.test(line) && !/ABSOLUTE/i.test(line) && !added.has('Monocytes')) {
      const match = line.match(/(\d+\.?\d*)\s+%/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'Monocytes', value: parseFloat(match[1]), unit: '%', referenceRange: '2-8', status: 'normal' })
        added.add('Monocytes')
      }
    }
    
    if (/^EOSINOPHILS\s+\d/i.test(line) && !/ABSOLUTE/i.test(line) && !added.has('Eosinophils')) {
      const match = line.match(/(\d+\.?\d*)\s+%/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'Eosinophils', value: parseFloat(match[1]), unit: '%', referenceRange: '1-4', status: 'normal' })
        added.add('Eosinophils')
      }
    }
    
    if (/^BASOPHILS\s+\d/i.test(line) && !/ABSOLUTE/i.test(line) && !added.has('Basophils')) {
      const match = line.match(/(\d+\.?\d*)\s+%/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'Basophils', value: parseFloat(match[1]), unit: '%', referenceRange: '0.5-1', status: 'normal' })
        added.add('Basophils')
      }
    }
    
    // Hormones
    if (/^ESTRADIOL/i.test(line) && !added.has('Estradiol')) {
      const match = line.match(/(\d+)\s+[HL\s]*<\s*OR\s*=\s*(\d+)\s+pg\/mL/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'Estradiol', value: parseFloat(match[1]), unit: 'pg/mL', referenceRange: `<=${match[2]}`, status: 'normal' })
        added.add('Estradiol')
      }
    }
    
    if (/PSA.*TOTAL/i.test(line) && !added.has('PSA')) {
      const match = line.match(/(\d+\.?\d*)\s+<\s*OR\s*=\s*(\d+\.?\d*)\s+ng\/mL/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'PSA', value: parseFloat(match[1]), unit: 'ng/mL', referenceRange: `<=${match[2]}`, status: 'normal' })
        added.add('PSA')
      }
    }
    
    if (/SEX\s*HORMONE\s*BINDING\s*GLOBULIN/i.test(line) && !added.has('SHBG')) {
      const match = line.match(/(\d+)\s+(\d+-\d+)\s+nmol\/L/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'SHBG', value: parseFloat(match[1]), unit: 'nmol/L', referenceRange: match[2], status: 'normal' })
        added.add('SHBG')
      }
    }
    
    if (/DHEA\s*SULFATE/i.test(line) && !added.has('DHEA-S')) {
      const match = line.match(/(\d+)\s+(\d+-\d+)\s+mcg\/dL/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'DHEA-S', value: parseFloat(match[1]), unit: 'mcg/dL', referenceRange: match[2], status: 'normal' })
        added.add('DHEA-S')
      }
    }
    
    if (/^CORTISOL/i.test(line) && !added.has('Cortisol')) {
      const match = line.match(/(\d+\.?\d*)\s+(\d+\.?\d*-\d+\.?\d*)\s+(?:μg|ug)\/dL/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'Cortisol', value: parseFloat(match[1]), unit: 'μg/dL', referenceRange: match[2], status: 'normal' })
        added.add('Cortisol')
      }
    }
    
    if (/PREGNENOLONE/i.test(line) && !added.has('Pregnenolone')) {
      const match = line.match(/(\d+)\s+(\d+-\d+)\s+ng\/dL/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'Pregnenolone', value: parseFloat(match[1]), unit: 'ng/dL', referenceRange: match[2], status: 'normal' })
        added.add('Pregnenolone')
      }
    }
    
    if (/IGF\s*1/i.test(line) && !added.has('IGF-1')) {
      const match = line.match(/(\d+)\s+(\d+-\d+)\s+ng\/mL/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'IGF-1', value: parseFloat(match[1]), unit: 'ng/mL', referenceRange: match[2], status: 'normal' })
        added.add('IGF-1')
      }
    }
    
    // Iron Studies
    if (/IRON.*TOTAL/i.test(line) && !/BINDING/i.test(line) && !added.has('Iron Total')) {
      const match = line.match(/(\d+)\s+(\d+-\d+)\s+mcg\/dL/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'Iron Total', value: parseFloat(match[1]), unit: 'mcg/dL', referenceRange: match[2], status: 'normal' })
        added.add('Iron Total')
      }
    }
    
    if (/IRON\s*BINDING\s*CAPACITY/i.test(line) && !added.has('TIBC')) {
      const match = line.match(/(\d+)\s+[HL\s]*(\d+-\d+)\s+mcg\/dL/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'TIBC', value: parseFloat(match[1]), unit: 'mcg/dL', referenceRange: match[2], status: 'normal' })
        added.add('TIBC')
      }
    }
    
    if (/%\s*SATURATION/i.test(line) && !added.has('Iron Saturation')) {
      const match = line.match(/(\d+)\s+(\d+-\d+)\s+%/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'Iron Saturation', value: parseFloat(match[1]), unit: '%', referenceRange: match[2], status: 'normal' })
        added.add('Iron Saturation')
      }
    }
    
    if (/^FERRITIN\s/i.test(line) && !added.has('Ferritin')) {
      const match = line.match(/(\d+)\s+(\d+-\d+)\s+ng\/mL/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'Ferritin', value: parseFloat(match[1]), unit: 'ng/mL', referenceRange: match[2], status: 'normal' })
        added.add('Ferritin')
      }
    }
    
    // Inflammatory
    if (/HS\s*CRP/i.test(line) && !added.has('HS CRP')) {
      const match = line.match(/(\d+\.?\d*)\s+mg\/L/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'HS CRP', value: parseFloat(match[1]), unit: 'mg/L', referenceRange: '<1.0', status: 'normal' })
        added.add('HS CRP')
      }
    }
    
    if (/HOMOCYSTEINE/i.test(line) && !added.has('Homocysteine')) {
      const match = line.match(/(\d+\.?\d*)\s+<\s*or\s*=\s*(\d+\.?\d*)\s+umol\/L/i)
      if (match) {
        result.biomarkers.push({ biomarker: 'Homocysteine', value: parseFloat(match[1]), unit: 'umol/L', referenceRange: `<=${match[2]}`, status: 'normal' })
        added.add('Homocysteine')
      }
    }
  }

  console.log('Extracted biomarkers:', result.biomarkers.length)
  
  return result
}
