import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    // Use pdf-parse-fork instead
    const pdfParse = (await import('pdf-parse-fork')).default
    
    const formData = await req.formData()
    const file = formData.get('pdf') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const data = await pdfParse(buffer)
    const text = data.text

    console.log('PDF parsed successfully, text length:', text.length)

    // Extract patient info
    let patientName = 'Unknown Patient'
    let patientDOB = '01/01/1980'
    let testDate = new Date().toLocaleDateString('en-US')

    // Patient name patterns
    const namePatterns = [
      /Patient[:\s]+([A-Z][A-Za-z]+,\s*[A-Z][A-Za-z]+)/i,
      /Name[:\s]+([A-Z][A-Za-z]+,\s*[A-Z][A-Za-z]+)/i,
      /([A-Z][A-Za-z]+,\s*[A-Z][A-Za-z]+)\s+DOB/i
    ]
    
    for (const pattern of namePatterns) {
      const match = text.match(pattern)
      if (match) {
        patientName = match[1].trim()
        break
      }
    }

    // DOB patterns
    const dobPatterns = [
      /DOB[:\s]+(\d{2}\/\d{2}\/\d{4})/i,
      /Date of Birth[:\s]+(\d{2}\/\d{2}\/\d{4})/i,
      /(\d{2}\/\d{2}\/\d{4})\s+(?:Sex|Gender|Male|Female)/i
    ]
    
    for (const pattern of dobPatterns) {
      const match = text.match(pattern)
      if (match) {
        patientDOB = match[1]
        break
      }
    }

    // Test date patterns
    const datePatterns = [
      /Collected[:\s]+(\d{2}\/\d{2}\/\d{4})/i,
      /Specimen Collected[:\s]+(\d{2}\/\d{2}\/\d{4})/i,
      /Date Collected[:\s]+(\d{2}\/\d{2}\/\d{4})/i,
      /Report Date[:\s]+(\d{2}\/\d{2}\/\d{4})/i
    ]
    
    for (const pattern of datePatterns) {
      const match = text.match(pattern)
      if (match) {
        testDate = match[1]
        break
      }
    }

    // Extract biomarkers with comprehensive patterns
    const biomarkers: any[] = []
    
    const biomarkerPatterns = [
      // Hormones
      { name: 'Testosterone, Total', unit: 'ng/dL', pattern: /Testosterone[,\s]*Total[:\s]+(\d+(?:\.\d+)?)/i },
      { name: 'Testosterone, Free', unit: 'pg/mL', pattern: /(?:Testosterone[,\s]*Free|Free\s+Testosterone)[:\s]+(\d+(?:\.\d+)?)/i },
      { name: 'Estradiol', unit: 'pg/mL', pattern: /Estradiol[:\s]+(\d+(?:\.\d+)?)/i },
      { name: 'DHEA-S', unit: 'mcg/dL', pattern: /DHEA-?S[:\s]+(\d+(?:\.\d+)?)/i },
      { name: 'SHBG', unit: 'nmol/L', pattern: /SHBG[:\s]+(\d+(?:\.\d+)?)/i },
      
      // Thyroid
      { name: 'TSH', unit: 'mIU/L', pattern: /\bTSH\b[:\s]+(\d+(?:\.\d+)?)/i },
      { name: 'Free T3', unit: 'pg/mL', pattern: /Free T3[:\s]+(\d+(?:\.\d+)?)/i },
      { name: 'Free T4', unit: 'ng/dL', pattern: /Free T4[:\s]+(\d+(?:\.\d+)?)/i },
      
      // Other hormones
      { name: 'Cortisol', unit: 'µg/dL', pattern: /Cortisol[:\s]+(\d+(?:\.\d+)?)/i },
      { name: 'Prolactin', unit: 'ng/mL', pattern: /Prolactin[:\s]+(\d+(?:\.\d+)?)/i },
      { name: 'IGF-1', unit: 'ng/mL', pattern: /IGF-?1[:\s]+(\d+(?:\.\d+)?)/i },
      { name: 'PSA, Total', unit: 'ng/mL', pattern: /PSA[,\s]*Total[:\s]+(\d+(?:\.\d+)?)/i },
      
      // Metabolic
      { name: 'Glucose', unit: 'mg/dL', pattern: /\bGlucose\b[:\s]+(\d+)/i },
      { name: 'HbA1c', unit: '%', pattern: /HbA1c[:\s]+(\d+(?:\.\d+)?)/i },
      { name: 'Insulin', unit: 'µIU/mL', pattern: /Insulin[:\s]+(\d+(?:\.\d+)?)/i },
      
      // Lipids
      { name: 'Cholesterol, Total', unit: 'mg/dL', pattern: /(?:Cholesterol[,\s]*Total|Total\s+Cholesterol)[:\s]+(\d+)/i },
      { name: 'HDL', unit: 'mg/dL', pattern: /\bHDL\b[:\s]+(\d+)/i },
      { name: 'LDL', unit: 'mg/dL', pattern: /\bLDL\b[:\s]+(\d+)/i },
      { name: 'Triglycerides', unit: 'mg/dL', pattern: /Triglycerides[:\s]+(\d+)/i },
      
      // Vitamins
      { name: 'Vitamin D, 25-OH', unit: 'ng/mL', pattern: /Vitamin D[^0-9]*(\d+(?:\.\d+)?)/i },
      { name: 'Vitamin B12', unit: 'pg/mL', pattern: /(?:Vitamin\s+)?B-?12[:\s]+(\d+)/i },
      
      // Kidney
      { name: 'Creatinine', unit: 'mg/dL', pattern: /Creatinine[:\s]+(\d+(?:\.\d+)?)/i },
      { name: 'BUN', unit: 'mg/dL', pattern: /\bBUN\b[:\s]+(\d+)/i },
      { name: 'eGFR', unit: 'mL/min', pattern: /eGFR[:\s]+(\d+)/i },
      
      // Liver
      { name: 'ALT', unit: 'U/L', pattern: /\bALT\b[:\s]+(\d+)/i },
      { name: 'AST', unit: 'U/L', pattern: /\bAST\b[:\s]+(\d+)/i },
      
      // CBC
      { name: 'WBC', unit: 'K/µL', pattern: /\bWBC\b[:\s]+(\d+(?:\.\d+)?)/i },
      { name: 'RBC', unit: 'M/µL', pattern: /\bRBC\b[:\s]+(\d+(?:\.\d+)?)/i },
      { name: 'Hemoglobin', unit: 'g/dL', pattern: /Hemoglobin[:\s]+(\d+(?:\.\d+)?)/i },
      { name: 'Hematocrit', unit: '%', pattern: /Hematocrit[:\s]+(\d+(?:\.\d+)?)/i },
      { name: 'Platelets', unit: 'K/µL', pattern: /Platelets?[:\s]+(\d+)/i },
      
      // Iron
      { name: 'Iron', unit: 'µg/dL', pattern: /\bIron\b[:\s]+(\d+)/i },
      { name: 'Ferritin', unit: 'ng/mL', pattern: /Ferritin[:\s]+(\d+)/i },
    ]

    for (const bio of biomarkerPatterns) {
      const match = text.match(bio.pattern)
      if (match) {
        biomarkers.push({
          biomarker: bio.name,
          value: match[1],
          unit: bio.unit,
          referenceRange: 'See report',
          status: 'normal'
        })
      }
    }

    return NextResponse.json({
      patientName,
      patientDOB,
      testDate,
      panelName: 'Complete Panel',
      biomarkers,
      debug: {
        textLength: text.length,
        biomarkersFound: biomarkers.length,
        firstChars: text.substring(0, 200)
      }
    })

  } catch (error: any) {
    console.error('PDF Parse Error:', error)
    return NextResponse.json({ 
      error: `Failed to parse PDF: ${error.message}`,
      details: error.stack
    }, { status: 500 })
  }
}
