import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// TEMPORARY MOCK DATA FOR AI TESTING
const MOCK_PATIENT = {
  id: 'test-123',
  name: 'John Executive',
  age: 42,
  occupation: 'Tech CEO',
  submitted: '2 hours ago',
  priority: 'high',
  status: 'pending',
  goals: ['Optimize testosterone', 'Increase energy', 'Improve body composition'],
  symptoms: ['Low energy', 'Difficulty building muscle', 'Reduced libido', 'Poor sleep quality'],
  conditions: ['None'],
  lifestyle: {
    exercise: '4-5 times per week',
    sleep: '5-6 hours',
    stress: 'High'
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('consultations')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
    }

    const pending = data?.filter(c => c.status === 'pending') || []
    const reviewed = data?.filter(c => c.status !== 'pending') || []

    // Add mock patient for testing
    return NextResponse.json({
      pending: [MOCK_PATIENT, ...pending.map(transformConsultation)],
      reviewed: reviewed.map(transformConsultation)
    })

  } catch (error) {
    console.error('Fetch error:', error)
    // Return mock data even if Supabase fails
    return NextResponse.json({
      pending: [MOCK_PATIENT],
      reviewed: []
    })
  }
}

function transformConsultation(consultation: any) {
  const timeSince = getTimeSince(consultation.created_at)
  
  return {
    id: consultation.id,
    name: `${consultation.first_name} ${consultation.last_name}`,
    age: consultation.age,
    occupation: consultation.occupation || 'Not specified',
    submitted: consultation.status === 'pending' ? timeSince : undefined,
    reviewed: consultation.status !== 'pending' ? timeSince : undefined,
    priority: consultation.priority || 'medium',
    status: consultation.status,
    treatment: consultation.provider_notes || undefined,
    goals: consultation.optimization_goals || [],
    symptoms: consultation.symptoms || [],
    conditions: consultation.medical_conditions || [],
    lifestyle: {
      exercise: consultation.exercise_frequency || 'Not specified',
      sleep: consultation.sleep_hours || 'Not specified',
      stress: consultation.stress_level || 'Not specified'
    }
  }
}

function getTimeSince(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`
  return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`
}
