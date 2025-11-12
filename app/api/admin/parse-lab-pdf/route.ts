import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const pdfParse = (await import('pdf-parse-fork')).default
    
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    console.log('📄 PDF File size:', buffer.length, 'bytes')
    
    const data = await pdfParse(buffer)
    const text = data.text

    console.log('📄 PDF Text Length:', text.length)
    console.log('📄 First 1000 chars:', text.substring(0, 1000))

    if (text.length < 100) {
      return NextResponse.json({
        testDate: new Date().toISOString().split('T')[0],
        labName: 'Quest Diagnostics',
        biomarkers: [],
        error: 'PDF text extraction failed - file may be image-based or encrypted'
      })
    }

    // Extract test date
    let testDate = new Date().toISOString().split('T')[0]
    const dateMatch = text.match(/Collected[:\s]+(\d{2}\/\d{2}\/\d{4})/i)
    if (dateMatch) {
      const [month, day, year] = dateMatch[1].split('/')
      testDate = `${year}-${month}-${day}`
      console.log('✅ Test date:', testDate)
    }

    // Extract all biomarkers from the PDF
    const biomarkers: any[] = []
    const lines = text.split('\n')
    
    // Quest format pattern: "BIOMARKER_NAME    VALUE    STATUS    RANGE"
    for (const line of lines) {
      // Skip empty lines and headers
      if (!line.trim() || line.includes('Test Name') || line.includes('Patient Information')) continue
      
      // Match patterns like: "TESTOSTERONE, TOTAL    612    250-827 ng/dL"
      const match = line.match(/^([A-Z][A-Z\s,\(\)\/\-]+?)\s+(\d+\.?\d*)\s*(H|L)?\s*([\d\.\-<>]+.*?)$/i)
      
      if (match) {
        const name = match[1].trim()
        const value = match[2]
        const flag = match[3] || ''
        const range = match[4]
        
        console.log(`✅ Found: ${name} = ${value}`)
        
        biomarkers.push({
          biomarker: name,
          value: value,
          unit: extractUnit(range),
          referenceRange: range,
          status: flag === 'H' ? 'high' : flag === 'L' ? 'low' : 'normal'
        })
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
      testDate: new Date().toISOString().split('T')[0],
      labName: 'Quest Diagnostics',
      biomarkers: []
    }, { status: 500 })
  }
}

function extractUnit(range: string): string {
  const unitMatch = range.match(/(mg\/dL|ng\/dL|pg\/mL|mIU\/L|mcg\/dL|mmol\/L|g\/dL|%|U\/L|nmol\/L|fL|pg|Thousand\/uL|Million\/uL|cells\/uL)/)
  return unitMatch ? unitMatch[1] : ''
}
