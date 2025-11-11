import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const pdfParse = (await import('pdf-parse-fork')).default
    
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const data = await pdfParse(buffer)
    const text = data.text

    console.log('📄 PDF Text Length:', text.length)
    console.log('📄 First 500 chars:', text.substring(0, 500))

    // Extract test date
    let testDate = new Date().toISOString().split('T')[0]
    const dateMatch = text.match(/Collected[:\s]+(\d{2}\/\d{2}\/\d{4})/i)
    if (dateMatch) {
      const [month, day, year] = dateMatch[1].split('/')
      testDate = `${year}-${month}-${day}`
      console.log('✅ Test date:', testDate)
    }

    // More flexible biomarker extraction
    const biomarkers: any[] = []
    
    // Look for common biomarker names and their values
    const biomarkerPatterns = [
      { name: 'TRIGLYCERIDES', pattern: /TRIGLYCERIDES\s+(\d+\.?\d*)\s*(H|L)?\s*([\d<>=\.\-\s]+)?\s*mg\/dL/i },
      { name: 'TESTOSTERONE, TOTAL', pattern: /TESTOSTERONE[,\s]+TOTAL[,\s]*MS\s+(\d+\.?\d*)\s*([\d\-]+)\s*ng\/dL/i },
      { name: 'TESTOSTERONE, FREE', pattern: /TESTOSTERONE[,\s]+FREE\s+(\d+\.?\d*)\s*([\d\.\-]+)\s*pg\/mL/i },
      { name: 'TSH', pattern: /\bTSH\b\s+(\d+\.?\d*)\s*([\d\.\-]+)\s*mIU\/L/i },
      { name: 'T4, FREE', pattern: /T4[,\s]+FREE\s+(\d+\.?\d*)\s*([\d\.\-]+)\s*ng\/dL/i },
      { name: 'T3, FREE', pattern: /T3[,\s]+FREE\s+(\d+\.?\d*)\s*(H|L)?\s*([\d\.\-]+)\s*pg\/mL/i },
      { name: 'VITAMIN D', pattern: /VITAMIN D[^0-9]*(\d+\.?\d*)\s*([\d\-]+)\s*ng\/mL/i },
      { name: 'PSA, TOTAL', pattern: /PSA[,\s]+TOTAL\s+(\d+\.?\d*)\s*(<\s*OR\s*=\s*[\d\.]+)\s*ng\/mL/i },
      { name: 'GLUCOSE', pattern: /\bGLUCOSE\b\s+(\d+)\s*([\d\-]+)\s*mg\/dL/i },
      { name: 'HEMOGLOBIN A1c', pattern: /HEMOGLOBIN A1c\s+(\d+\.?\d*)\s*(<[\d\.]+)\s*%/i },
      { name: 'HDL CHOLESTEROL', pattern: /HDL CHOLESTEROL\s+(\d+)\s*(>=?\d+)\s*mg\/dL/i },
      { name: 'LDL CHOLESTEROL', pattern: /LDL[- ]CHOLESTEROL\s+(\d+)\s*(H|L)?\s*([\d\-]+)\s*mg\/dL/i },
      { name: 'CHOLESTEROL, TOTAL', pattern: /CHOLESTEROL[,\s]+TOTAL\s+(\d+)\s*(<\d+)\s*mg\/dL/i },
      { name: 'ESTRADIOL', pattern: /ESTRADIOL\s+(\d+)\s*(H)?\s*(<\s*OR\s*=\s*\d+)\s*pg\/mL/i },
      { name: 'DHEA SULFATE', pattern: /DHEA SULFATE\s+(\d+)\s*([\d\-]+)\s*mcg\/dL/i },
      { name: 'CORTISOL', pattern: /CORTISOL[^0-9]*(\d+\.?\d*)\s*mcg\/dL/i },
      { name: 'PROLACTIN', pattern: /PROLACTIN\s+(\d+\.?\d*)\s*([\d\.\-]+)\s*ng\/mL/i },
      { name: 'FSH', pattern: /\bFSH\b\s+(<?\d+\.?\d*)\s*(L)?\s*([\d\.\-]+)\s*mIU\/mL/i },
      { name: 'LH', pattern: /\bLH\b\s+(\d+\.?\d*)\s*(L)?\s*([\d\.\-]+)\s*mIU\/mL/i },
      { name: 'CREATININE', pattern: /CREATININE\s+(\d+\.?\d*)\s*([\d\.\-]+)\s*mg\/dL/i },
      { name: 'BUN', pattern: /UREA NITROGEN\s*\(BUN\)\s+(\d+)\s*([\d\-]+)\s*mg\/dL/i },
      { name: 'eGFR', pattern: /EGFR\s+(\d+)\s*(>\s*OR\s*=\s*\d+)\s*mL\/min/i },
      { name: 'ALT', pattern: /\bALT\b\s+(\d+)\s*([\d\-]+)\s*U\/L/i },
      { name: 'AST', pattern: /\bAST\b\s+(\d+)\s*([\d\-]+)\s*U\/L/i },
      { name: 'HEMOGLOBIN', pattern: /HEMOGLOBIN\s+(\d+\.?\d*)\s*([\d\.\-]+)\s*g\/dL/i },
      { name: 'HEMATOCRIT', pattern: /HEMATOCRIT\s+(\d+\.?\d*)\s*(H)?\s*([\d\.\-]+)\s*%/i },
      { name: 'WBC', pattern: /WHITE BLOOD CELL COUNT\s+(\d+\.?\d*)\s*([\d\.\-]+)\s*Thousand\/uL/i },
      { name: 'RBC', pattern: /RED BLOOD CELL COUNT\s+(\d+\.?\d*)\s*([\d\.\-]+)\s*Million\/uL/i },
      { name: 'PLATELETS', pattern: /PLATELET COUNT\s+(\d+)\s*([\d\-]+)\s*Thousand\/uL/i },
      { name: 'IRON', pattern: /\bIRON[,\s]+TOTAL\s+(\d+)\s*([\d\-]+)\s*mcg\/dL/i },
      { name: 'FERRITIN', pattern: /FERRITIN\s+(\d+)\s*([\d\-]+)\s*ng\/mL/i },
      { name: 'HS CRP', pattern: /HS CRP\s+(\d+\.?\d*)\s*mg\/L/i },
      { name: 'INSULIN', pattern: /INSULIN\s+(\d+\.?\d*)\s*(<\s*OR\s*=\s*[\d\.]+)\s*uIU\/mL/i },
    ]

    for (const pattern of biomarkerPatterns) {
      const match = text.match(pattern.pattern)
      if (match) {
        const value = match[1].replace('<', '')
        const hasStatus = match[2] === 'H' || match[2] === 'L'
        const refRange = hasStatus ? match[3] : match[2]
        
        biomarkers.push({
          biomarker: pattern.name,
          value: value,
          unit: pattern.pattern.source.match(/([a-zA-Z\/µ%]+)\//)?.[1] || 'N/A',
          referenceRange: refRange || 'See report',
          status: hasStatus ? (match[2] === 'H' ? 'high' : 'low') : 'normal'
        })
        console.log('✅ Found:', pattern.name, '=', value)
      }
    }

    console.log(`📊 Total biomarkers extracted: ${biomarkers.length}`)

    return NextResponse.json({
      testDate,
      labName: 'Quest Diagnostics',
      biomarkers
    })

  } catch (error: any) {
    console.error('PDF Parse Error:', error)
    return NextResponse.json({ 
      error: `Failed to parse PDF: ${error.message}`,
      details: error.stack
    }, { status: 500 })
  }
}
