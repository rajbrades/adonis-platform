import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('consultations')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({
        pending: [],
        reviewed: []
      })
    }

    const pending = data?.filter(c => c.status === 'pending') || []
    const reviewed = data?.filter(c => c.status !== 'pending') || []

    return NextResponse.json({
      pending: pending.map(transformConsultation),
      reviewed: reviewed.map(transformConsultation)
    })

  } catch (error) {
    console.error('Fetch error:', error)
    return NextResponse.json({
      pending: [],
      reviewed: []
    })
  }
}

function transformConsultation(consultation: any) {
  const timeSince = getTimeSince(consultation.created_at)
  const age = calculateAge(consultation.date_of_birth)
  
  return {
    id: consultation.id,
    name: `${consultation.first_name} ${consultation.last_name}`,
    age: age,
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
      exercise: consultation.lifestyle?.exerciseFrequency || 'Not specified',
      sleep: consultation.lifestyle?.sleepHours ? `${consultation.lifestyle.sleepHours} hours` : 'Not specified',
      stress: consultation.lifestyle?.stressLevel || 'Not specified'
    }
  }
}

function calculateAge(dateOfBirth: string): number {
  if (!dateOfBirth) return 0
  const today = new Date()
  const birthDate = new Date(dateOfBirth)
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
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
