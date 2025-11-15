/**
 * Functional Medicine Optimal Ranges
 * These are tighter ranges than standard lab reference ranges,
 * representing optimal health rather than absence of disease.
 */

interface FunctionalRange {
  biomarker: string
  unit: string
  optimalMin: number
  optimalMax: number
  category: string
}

export const FUNCTIONAL_RANGES: FunctionalRange[] = [
  // HORMONES
  {
    biomarker: 'Testosterone, Total',
    unit: 'ng/dL',
    optimalMin: 550,
    optimalMax: 850,
    category: 'Hormones'
  },
  {
    biomarker: 'Testosterone, Free',
    unit: 'pg/mL',
    optimalMin: 12,
    optimalMax: 25,
    category: 'Hormones'
  },
  {
    biomarker: 'Estradiol',
    unit: 'pg/mL',
    optimalMin: 20,
    optimalMax: 30,
    category: 'Hormones'
  },
  {
    biomarker: 'DHEA-S',
    unit: 'mcg/dL',
    optimalMin: 250,
    optimalMax: 380,
    category: 'Hormones'
  },
  {
    biomarker: 'SHBG',
    unit: 'nmol/L',
    optimalMin: 20,
    optimalMax: 40,
    category: 'Hormones'
  },
  {
    biomarker: 'Progesterone',
    unit: 'ng/mL',
    optimalMin: 0.5,
    optimalMax: 1.5,
    category: 'Hormones'
  },
  {
    biomarker: 'DHT',
    unit: 'ng/dL',
    optimalMin: 30,
    optimalMax: 85,
    category: 'Hormones'
  },
  {
    biomarker: 'Pregnenolone',
    unit: 'ng/dL',
    optimalMin: 50,
    optimalMax: 150,
    category: 'Hormones'
  },

  // THYROID
  {
    biomarker: 'TSH',
    unit: 'mIU/L',
    optimalMin: 0.5,
    optimalMax: 2.0,
    category: 'Thyroid'
  },
  {
    biomarker: 'Free T3',
    unit: 'pg/mL',
    optimalMin: 3.2,
    optimalMax: 4.2,
    category: 'Thyroid'
  },
  {
    biomarker: 'Free T4',
    unit: 'ng/dL',
    optimalMin: 1.1,
    optimalMax: 1.5,
    category: 'Thyroid'
  },
  {
    biomarker: 'Reverse T3',
    unit: 'ng/dL',
    optimalMin: 10,
    optimalMax: 18,
    category: 'Thyroid'
  },

  // METABOLIC
  {
    biomarker: 'Glucose',
    unit: 'mg/dL',
    optimalMin: 75,
    optimalMax: 90,
    category: 'Metabolic'
  },
  {
    biomarker: 'Hemoglobin A1c',
    unit: '%',
    optimalMin: 4.8,
    optimalMax: 5.3,
    category: 'Metabolic'
  },
  {
    biomarker: 'Insulin',
    unit: 'uIU/mL',
    optimalMin: 2,
    optimalMax: 5,
    category: 'Metabolic'
  },
  {
    biomarker: 'HOMA-IR',
    unit: '',
    optimalMin: 0.5,
    optimalMax: 1.5,
    category: 'Metabolic'
  },

  // LIPIDS
  {
    biomarker: 'Total Cholesterol',
    unit: 'mg/dL',
    optimalMin: 160,
    optimalMax: 200,
    category: 'Lipids'
  },
  {
    biomarker: 'LDL Cholesterol',
    unit: 'mg/dL',
    optimalMin: 60,
    optimalMax: 100,
    category: 'Lipids'
  },
  {
    biomarker: 'HDL Cholesterol',
    unit: 'mg/dL',
    optimalMin: 55,
    optimalMax: 80,
    category: 'Lipids'
  },
  {
    biomarker: 'Triglycerides',
    unit: 'mg/dL',
    optimalMin: 50,
    optimalMax: 90,
    category: 'Lipids'
  },
  {
    biomarker: 'Apolipoprotein B',
    unit: 'mg/dL',
    optimalMin: 60,
    optimalMax: 80,
    category: 'Lipids'
  },

  // VITAMINS & MINERALS
  {
    biomarker: 'Vitamin D, 25-OH',
    unit: 'ng/mL',
    optimalMin: 50,
    optimalMax: 80,
    category: 'Vitamins'
  },
  {
    biomarker: 'Vitamin B12',
    unit: 'pg/mL',
    optimalMin: 500,
    optimalMax: 1000,
    category: 'Vitamins'
  },
  {
    biomarker: 'Folate',
    unit: 'ng/mL',
    optimalMin: 12,
    optimalMax: 25,
    category: 'Vitamins'
  },
  {
    biomarker: 'Magnesium',
    unit: 'mg/dL',
    optimalMin: 2.2,
    optimalMax: 2.6,
    category: 'Minerals'
  },
  {
    biomarker: 'Zinc',
    unit: 'mcg/dL',
    optimalMin: 90,
    optimalMax: 120,
    category: 'Minerals'
  },
  {
    biomarker: 'Copper',
    unit: 'mcg/dL',
    optimalMin: 85,
    optimalMax: 115,
    category: 'Minerals'
  },
  {
    biomarker: 'Selenium',
    unit: 'mcg/L',
    optimalMin: 120,
    optimalMax: 150,
    category: 'Minerals'
  },

  // INFLAMMATION
  {
    biomarker: 'hs-CRP',
    unit: 'mg/L',
    optimalMin: 0,
    optimalMax: 1.0,
    category: 'Inflammation'
  },
  {
    biomarker: 'Homocysteine',
    unit: 'umol/L',
    optimalMin: 5,
    optimalMax: 8,
    category: 'Inflammation'
  },
  {
    biomarker: 'Fibrinogen',
    unit: 'mg/dL',
    optimalMin: 200,
    optimalMax: 350,
    category: 'Inflammation'
  },

  // LIVER
  {
    biomarker: 'ALT',
    unit: 'U/L',
    optimalMin: 10,
    optimalMax: 30,
    category: 'Liver'
  },
  {
    biomarker: 'AST',
    unit: 'U/L',
    optimalMin: 10,
    optimalMax: 30,
    category: 'Liver'
  },
  {
    biomarker: 'GGT',
    unit: 'U/L',
    optimalMin: 10,
    optimalMax: 30,
    category: 'Liver'
  },
  {
    biomarker: 'Alkaline Phosphatase',
    unit: 'U/L',
    optimalMin: 50,
    optimalMax: 90,
    category: 'Liver'
  },
  {
    biomarker: 'Bilirubin, Total',
    unit: 'mg/dL',
    optimalMin: 0.4,
    optimalMax: 1.0,
    category: 'Liver'
  },

  // KIDNEY
  {
    biomarker: 'Creatinine',
    unit: 'mg/dL',
    optimalMin: 0.8,
    optimalMax: 1.2,
    category: 'Kidney'
  },
  {
    biomarker: 'BUN',
    unit: 'mg/dL',
    optimalMin: 10,
    optimalMax: 18,
    category: 'Kidney'
  },
  {
    biomarker: 'eGFR',
    unit: 'mL/min/1.73m2',
    optimalMin: 90,
    optimalMax: 120,
    category: 'Kidney'
  },
  {
    biomarker: 'Uric Acid',
    unit: 'mg/dL',
    optimalMin: 4.0,
    optimalMax: 5.5,
    category: 'Kidney'
  },

  // BLOOD COUNTS
  {
    biomarker: 'Hemoglobin',
    unit: 'g/dL',
    optimalMin: 14.0,
    optimalMax: 16.5,
    category: 'Blood'
  },
  {
    biomarker: 'Hematocrit',
    unit: '%',
    optimalMin: 42,
    optimalMax: 50,
    category: 'Blood'
  },
  {
    biomarker: 'RBC',
    unit: 'M/uL',
    optimalMin: 4.5,
    optimalMax: 5.5,
    category: 'Blood'
  },
  {
    biomarker: 'WBC',
    unit: 'K/uL',
    optimalMin: 5.0,
    optimalMax: 7.5,
    category: 'Blood'
  },
  {
    biomarker: 'Platelets',
    unit: 'K/uL',
    optimalMin: 175,
    optimalMax: 250,
    category: 'Blood'
  },
  {
    biomarker: 'Ferritin',
    unit: 'ng/mL',
    optimalMin: 50,
    optimalMax: 150,
    category: 'Blood'
  },

  // ELECTROLYTES
  {
    biomarker: 'Sodium',
    unit: 'mmol/L',
    optimalMin: 138,
    optimalMax: 142,
    category: 'Electrolytes'
  },
  {
    biomarker: 'Potassium',
    unit: 'mmol/L',
    optimalMin: 4.0,
    optimalMax: 4.5,
    category: 'Electrolytes'
  },
  {
    biomarker: 'Chloride',
    unit: 'mmol/L',
    optimalMin: 100,
    optimalMax: 106,
    category: 'Electrolytes'
  },
  {
    biomarker: 'CO2',
    unit: 'mmol/L',
    optimalMin: 25,
    optimalMax: 30,
    category: 'Electrolytes'
  },
  {
    biomarker: 'Calcium',
    unit: 'mg/dL',
    optimalMin: 9.5,
    optimalMax: 10.2,
    category: 'Electrolytes'
  },

  // PROSTATE (Men)
  {
    biomarker: 'PSA',
    unit: 'ng/mL',
    optimalMin: 0,
    optimalMax: 1.0,
    category: 'Prostate'
  },

  // GROWTH FACTORS
  {
    biomarker: 'IGF-1',
    unit: 'ng/mL',
    optimalMin: 180,
    optimalMax: 250,
    category: 'Growth Factors'
  },

  // CORTISOL
  {
    biomarker: 'Cortisol AM',
    unit: 'mcg/dL',
    optimalMin: 12,
    optimalMax: 18,
    category: 'Stress'
  },
  {
    biomarker: 'Cortisol PM',
    unit: 'mcg/dL',
    optimalMin: 3,
    optimalMax: 8,
    category: 'Stress'
  }
]

export function getOptimalRange(biomarkerName: string): FunctionalRange | null {
  // Normalize biomarker name for matching
  const normalized = biomarkerName.toLowerCase().trim()
  
  return FUNCTIONAL_RANGES.find(range => 
    range.biomarker.toLowerCase().includes(normalized) ||
    normalized.includes(range.biomarker.toLowerCase())
  ) || null
}

export function calculateFunctionalStatus(
  value: number,
  labMin: number,
  labMax: number,
  optimalMin: number,
  optimalMax: number
): 'optimal' | 'suboptimal-low' | 'suboptimal-high' | 'low' | 'high' {
  // Outside lab range
  if (value < labMin) return 'low'
  if (value > labMax) return 'high'
  
  // Within optimal range
  if (value >= optimalMin && value <= optimalMax) return 'optimal'
  
  // Suboptimal (in lab range but outside optimal)
  if (value < optimalMin) return 'suboptimal-low'
  return 'suboptimal-high'
}
