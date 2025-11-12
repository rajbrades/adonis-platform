import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

export async function POST(req: NextRequest) {
  try {
    console.log('🤖 Using Claude AI to extract biomarkers from PDF...')
    
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Convert PDF to base64
    const arrayBuffer = await file.arrayBuffer()
    const base64Data = Buffer.from(arrayBuffer).toString('base64')
    
    console.log('📄 PDF size:', file.size, 'bytes')

    // Use Claude to extract biomarkers from PDF
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    })

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      messages: [{
        role: 'user',
        content: [
          {
            type: 'document',
            source: {
              type: 'base64',
              media_type: 'application/pdf',
              data: base64Data,
            },
          },
          {
            type: 'text',
            text: `Extract ALL biomarkers from this Quest Diagnostics lab report and return them as a JSON array. For each biomarker include: biomarker name, value, unit, reference range, and status (normal/high/low).

Also extract the collection date in YYYY-MM-DD format.

Return ONLY valid JSON in this format:
{
  "testDate": "YYYY-MM-DD",
  "biomarkers": [
    {
      "biomarker": "TESTOSTERONE, TOTAL",
      "value": "612",
      "unit": "ng/dL",
      "referenceRange": "250-827",
      "status": "normal"
    }
  ]
}`,
          },
        ],
      }],
    })

    const responseText = message.content[0].type === 'text' ? message.content[0].text : ''
    console.log('🤖 Claude response:', responseText.substring(0, 500))
    
    // Parse JSON from response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Could not extract JSON from Claude response')
    }
    
    const result = JSON.parse(jsonMatch[0])
    
    console.log(`✅ Extracted ${result.biomarkers.length} biomarkers using AI`)

    return NextResponse.json({
      testDate: result.testDate,
      labName: 'Quest Diagnostics',
      biomarkers: result.biomarkers
    })

  } catch (error: any) {
    console.error('❌ Error:', error)
    return NextResponse.json({ 
      error: error.message,
      testDate: new Date().toISOString().split('T')[0],
      labName: 'Quest Diagnostics',
      biomarkers: []
    }, { status: 500 })
  }
}
