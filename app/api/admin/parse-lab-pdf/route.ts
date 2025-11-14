import { NextRequest, NextResponse } from 'next/server'
import { parseQuestPDF } from '@/lib/parsers/lab-pdf-parser'

export async function POST(req: NextRequest) {
  try {
    console.log('📋 Parsing Quest Diagnostics PDF...')
    
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer())
    
    // Parse the PDF using the real parser
    const result = await parseQuestPDF(buffer)

    console.log(`✅ Successfully parsed PDF: ${result.biomarkers.length} biomarkers found`)

    return NextResponse.json({
      testDate: result.testDate,
      labName: 'Quest Diagnostics',
      patientName: result.patientName,
      patientDOB: result.patientDOB,
      biomarkers: result.biomarkers
    })

  } catch (error: any) {
    console.error('❌ Error parsing PDF:', error)
    return NextResponse.json({ 
      error: error.message,
      testDate: new Date().toISOString().split('T')[0],
      labName: 'Quest Diagnostics',
      biomarkers: []
    }, { status: 500 })
  }
}
