import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { buildPrompt } from '@/lib/ai/prompts'

export async function POST(req: NextRequest) {
  try {
    const { promptId, patientData, labResults } = await req.json()

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'AI service not configured' },
        { status: 500 }
      )
    }

    const prompt = buildPrompt(promptId, {
      name: patientData.name,
      age: patientData.age,
      occupation: patientData.occupation,
      symptoms: patientData.symptoms,
      goals: patientData.goals,
      conditions: patientData.conditions,
      lifestyle: patientData.lifestyle,
      labResults: labResults
    })

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY
    })

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      messages: [{
        role: 'user',
        content: prompt
      }]
    })

    const analysis = response.content[0].type === 'text' 
      ? response.content[0].text 
      : ''

    return NextResponse.json({ 
      analysis,
      promptId,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('AI Analysis Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate AI analysis' },
      { status: 500 }
    )
  }
}
