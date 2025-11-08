import { NextRequest, NextResponse } from 'next/server'
import { parseQuestPDF } from '@/lib/parsers/lab-pdf-parser'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('pdf') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const result = await parseQuestPDF(buffer)

    return NextResponse.json({
      ...result,
      debug: {
        fileName: file.name,
        fileSize: file.size,
        biomarkerCount: result.biomarkers?.length || 0
      }
    })
  } catch (error: any) {
    console.error('Error in debug:', error)
    return NextResponse.json({ 
      error: error.message,
      stack: error.stack 
    }, { status: 500 })
  }
}
