import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

const pdfParse = require('pdf-parse')

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const data = await pdfParse(buffer)

    return NextResponse.json({ 
      success: true,
      text: data.text,
      textLength: data.text.length,
      preview: data.text.substring(0, 2000)
    })

  } catch (error) {
    console.error('Debug error:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed'
    }, { status: 500 })
  }
}
