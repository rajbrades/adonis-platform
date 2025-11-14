import { NextRequest, NextResponse } from 'next/server'
import pdfParse from 'pdf-parse-fork'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('pdf') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const data = await pdfParse(buffer)
    const rawText = data.text

    console.log('📄 First 500 chars:')
    console.log(rawText.substring(0, 500))

    return NextResponse.json({
      fileName: file.name,
      fileSize: file.size,
      pageCount: data.numpages,
      rawText: rawText,
      preview: rawText.substring(0, 1000)
    })
  } catch (error: any) {
    console.error('Error:', error)
    return NextResponse.json({ 
      error: error.message,
      stack: error.stack 
    }, { status: 500 })
  }
}
