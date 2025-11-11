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

    console.log('📄 PDF parsed, extracting data...')

    // Extract test date
    let testDate = new Date().toISOString().split('T')[0]
    const dateMatch = text.match(/Collected[:\s]+(\d{2}\/\d{2}\/\d{4})/i)
    if (dateMatch) {
      const [month, day, year] = dateMatch[1].split('/')
      testDate = `${year}-${month}-${day}`
    }

    // Extract biomarkers from Quest table format
    const biomarkers: any[] = []
    const lines = text.split('\n')

    // Quest format: TEST_NAME VALUE REFERENCE_RANGE UNIT
    // Example: "TESTOSTERONE, TOTAL 740 250-1100 ng/dL"
    // Example: "TRIGLYCERIDES 198 H <150 mg/dL"
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      // Skip empty lines and headers
      if (!line || line.includes('Test Name') || line.includes('Reference Range')) continue
      
      // Pattern 1: Name Value Status? Range Unit
      // TRIGLYCERIDES 198 H <150 mg/dL
      const pattern1 = /^([A-Z][A-Z\s,\-()]+?)\s+(\d+\.?\d*)\s*(H|L)?\s+([\d<>=\.\-\s]+)\s+([a-zA-Z\/µ%]+)$/
      
      // Pattern 2: Name Value Range Unit  
      // TESTOSTERONE, TOTAL 740 250-1100 ng/dL
      const pattern2 = /^([A-Z][A-Z\s,\-()]+?)\s+(\d+\.?\d*)\s+([\d<>=\.\-\s]+)\s+([a-zA-Z\/µ%]+)$/
      
      // Pattern 3: Multi-line format (name on one line, value on next)
      const namePattern = /^[A-Z][A-Z\s,\-()]+$/
      
      let match = line.match(pattern1) || line.match(pattern2)
      
      if (match) {
        const hasStatus = match.length === 6
        const biomarker = {
          biomarker: match[1].trim(),
          value: match[2],
          unit: hasStatus ? match[5] : match[4],
          referenceRange: hasStatus ? match[4] : match[3],
          status: hasStatus && (match[3] === 'H' || match[3] === 'L') ? (match[3] === 'H' ? 'high' : 'low') : 'normal'
        }
        biomarkers.push(biomarker)
        console.log('✅ Extracted:', biomarker.biomarker, '=', biomarker.value)
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
