import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { parseLabPDF } from '@/lib/parsers/lab-pdf-parser'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ 
        success: false,
        error: 'No file provided' 
      }, { status: 400 })
    }

    console.log('Processing file:', file.name, 'Size:', file.size)

    const buffer = Buffer.from(await file.arrayBuffer())
    const parsed = await parseLabPDF(buffer)

    console.log('Parse successful, biomarkers found:', parsed.biomarkers.length)

    if (parsed.biomarkers.length === 0) {
      return NextResponse.json({ 
        success: false,
        error: 'No biomarkers could be extracted from this PDF. The file may be scanned or in an unsupported format. Please enter results manually.',
        parsed
      })
    }

    return NextResponse.json({ success: true, parsed })

  } catch (error) {
    console.error('PDF parse error:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to parse PDF. Please try again or enter results manually.'
    }, { status: 500 })
  }
}
