// Biomarker Categories for ADONIS Platform
// lib/biomarker-categories.ts

export type BiomarkerCategory = {
  id: string
  name: string
  description: string
  icon: string
  defaultExpanded: boolean
  priority: number
  biomarkers: string[]
}

export const BIOMARKER_CATEGORIES: BiomarkerCategory[] = [
  {
    id: 'sex-hormones',
    name: 'Sex Hormones',
    description: 'Male reproductive hormones and sexual health markers',
    icon: '🎯',
    defaultExpanded: true,
    priority: 1,
    biomarkers: [
      'Testosterone Total',
      'Testosterone Free',
      'Testosterone Bioavailable',
      'Estradiol',
      'SHBG',
      'DHEA-S',
      'Pregnenolone',
      'Prolactin',
      'IGF-1',
      'Cortisol',
    ],
  },
  {
    id: 'thyroid',
    name: 'Thyroid',
    description: 'Thyroid function and metabolism regulation',
    icon: '🦋',
    defaultExpanded: false,
    priority: 2,
    biomarkers: [
      'TSH',
      'T3 Free',
      'T4 Free',
    ],
  },
  {
    id: 'cancer-screening',
    name: 'Cancer Screening',
    description: 'Prostate and cancer markers',
    icon: '🔬',
    defaultExpanded: false,
    priority: 3,
    biomarkers: [
      'PSA',
    ],
  },
  {
    id: 'metabolic',
    name: 'Metabolic Panel',
    description: 'Blood sugar, cholesterol, and cardiovascular health',
    icon: '🍽️',
    defaultExpanded: false,
    priority: 4,
    biomarkers: [
      'Glucose',
      'Hemoglobin A1c',
      'Insulin',
      'Cholesterol Total',
      'HDL Cholesterol',
      'LDL Cholesterol',
      'Non-HDL Cholesterol',
      'Triglycerides',
      'Apolipoprotein B',
      'Lipoprotein(a)',
      'Cholesterol/HDL Ratio',
      'LDL/HDL Ratio',
    ],
  },
  {
    id: 'kidney',
    name: 'Kidney Function',
    description: 'Kidney health and electrolyte balance',
    icon: '💧',
    defaultExpanded: false,
    priority: 5,
    biomarkers: [
      'Creatinine',
      'BUN',
      'eGFR',
      'Sodium',
      'Potassium',
      'Chloride',
      'Carbon Dioxide',
      'Calcium',
    ],
  },
  {
    id: 'liver',
    name: 'Liver Function',
    description: 'Liver health and protein metabolism',
    icon: '♻️',
    defaultExpanded: false,
    priority: 6,
    biomarkers: [
      'ALT',
      'AST',
      'Alkaline Phosphatase',
      'Bilirubin Total',
      'GGT',
      'Protein Total',
      'Albumin',
      'Globulin',
      'Albumin/Globulin Ratio',
    ],
  },
  {
    id: 'cbc',
    name: 'Complete Blood Count',
    description: 'Red blood cells, white blood cells, and platelets',
    icon: '🩸',
    defaultExpanded: false,
    priority: 7,
    biomarkers: [
      'WBC',
      'RBC',
      'Hemoglobin',
      'Hematocrit',
      'MCV',
      'MCH',
      'MCHC',
      'RDW',
      'Platelet Count',
      'MPV',
      'Absolute Neutrophils',
      'Absolute Lymphocytes',
      'Absolute Monocytes',
      'Absolute Eosinophils',
      'Absolute Basophils',
      'Neutrophils %',
      'Lymphocytes %',
      'Monocytes %',
      'Eosinophils %',
      'Basophils %',
    ],
  },
  {
    id: 'iron',
    name: 'Iron Studies',
    description: 'Iron levels and storage capacity',
    icon: '🧲',
    defaultExpanded: false,
    priority: 8,
    biomarkers: [
      'Iron Total',
      'TIBC',
      'Iron Saturation',
      'Ferritin',
    ],
  },
  {
    id: 'inflammation',
    name: 'Inflammation & Cardiovascular',
    description: 'Inflammatory markers and heart disease risk',
    icon: '❤️',
    defaultExpanded: false,
    priority: 9,
    biomarkers: [
      'HS CRP',
      'Homocysteine',
    ],
  },
  {
    id: 'vitamins',
    name: 'Vitamins',
    description: 'Essential vitamin levels',
    icon: '💊',
    defaultExpanded: false,
    priority: 10,
    biomarkers: [
      'Vitamin D',
      'Vitamin B12',
    ],
  },
]

// Biomarkers to exclude from display
const EXCLUDED_BIOMARKERS = [
  'IGF-1 Z-Score',
  'IGF-1Z-Score',
  'IGF1 Z-Score',
  'IGF1Z-Score',
]

// Helper function to find category for a biomarker
export function getCategoryForBiomarker(biomarkerName: string): BiomarkerCategory | undefined {
  // Check if biomarker should be excluded
  if (EXCLUDED_BIOMARKERS.some(excluded => 
    biomarkerName.toLowerCase().includes(excluded.toLowerCase()) ||
    excluded.toLowerCase().includes(biomarkerName.toLowerCase())
  )) {
    return undefined
  }

  return BIOMARKER_CATEGORIES.find(category =>
    category.biomarkers.some(name => 
      biomarkerName.toLowerCase().includes(name.toLowerCase()) ||
      name.toLowerCase().includes(biomarkerName.toLowerCase())
    )
  )
}

// Helper function to categorize an array of biomarkers
export function categorizeBiomarkers(biomarkers: any[]): Map<string, any[]> {
  const categorized = new Map<string, any[]>()
  
  // Initialize all categories
  BIOMARKER_CATEGORIES.forEach(category => {
    categorized.set(category.id, [])
  })
  
  // Add 'uncategorized' for biomarkers that don't match any category
  categorized.set('uncategorized', [])
  
  // Categorize each biomarker (excluding IGF-1 Z-Score)
  biomarkers.forEach(biomarker => {
    // Skip excluded biomarkers
    if (EXCLUDED_BIOMARKERS.some(excluded => 
      biomarker.biomarker.toLowerCase().includes(excluded.toLowerCase())
    )) {
      return
    }

    const category = getCategoryForBiomarker(biomarker.biomarker)
    if (category) {
      categorized.get(category.id)?.push(biomarker)
    } else {
      categorized.get('uncategorized')?.push(biomarker)
    }
  })
  
  return categorized
}

// Helper to get category summary (for collapsed accordion preview)
export function getCategorySummary(biomarkers: any[]): {
  total: number
  optimized: number
  needsWork: number
  atRisk: number
} {
  const summary = {
    total: biomarkers.length,
    optimized: 0,
    needsWork: 0,
    atRisk: 0,
  }
  
  biomarkers.forEach(biomarker => {
    const status = biomarker.status?.toLowerCase() || ''
    if (status === 'normal' || status === 'optimized') {
      summary.optimized++
    } else if (status === 'high' || status === 'low' || status.includes('needs')) {
      summary.needsWork++
    } else if (status === 'critical' || status.includes('risk')) {
      summary.atRisk++
    }
  })
  
  return summary
}
