import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { parseLabPDF } from '@/lib/parsers/lab-pdf-parser'

export async function POST(request: NextRequest) {
  console.log('========== PARSE PDF API CALLED ==========')
  
  try {
    const { userId } = await auth()
    
    if (!userId) {
      console.log('❌ No userId - unauthorized')
      return NextResponse.json({ 
        success: false,
        error: 'Unauthorized' 
      }, { status: 401 })
    }

    console.log('✓ User authenticated:', userId)

    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      console.log('❌ No file in form data')
      return NextResponse.json({ 
        success: false,
        error: 'No file provided' 
      }, { status: 400 })
    }

    console.log('✓ File received:', file.name, 'Size:', file.size)

    const buffer = Buffer.from(await file.arrayBuffer())
    console.log('✓ Buffer created, length:', buffer.length)
    
    console.log('⏳ Starting PDF parsing...')
    const parsed = await parseLabPDF(buffer)
    console.log('✓ Parsing complete!')

    console.log('📊 Results:', {
      biomarkersFound: parsed.biomarkers.length,
      labName: parsed.labName,
      testDate: parsed.testDate,
      biomarkers: parsed.biomarkers.map(b => `${b.biomarker}: ${b.value}`)
    })

    return NextResponse.json({ 
      success: true, 
      parsed,
      biomarkersFound: parsed.biomarkers.length
    })

  } catch (error) {
    console.error('❌ PDF parse error:', error)
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack')
    
    return NextResponse.json({ 
      success: true, 
      parsed: { biomarkers: [] },
      biomarkersFound: 0,
      message: 'Could not extract biomarkers automatically',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
