import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { consultationId, patientId } = await request.json()

    if (!consultationId || !patientId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    console.log('Linking consultation:', consultationId, 'to patient:', patientId)

    // Update consultation with patient_id
    const { data, error } = await supabase
      .from('consultations')
      .update({ 
        patient_id: patientId,
        linked_at: new Date().toISOString()
      })
      .eq('id', consultationId)
      .select()
      .single()

    if (error) {
      console.error('Error linking consultation:', error)
      return NextResponse.json(
        { error: 'Failed to link consultation' },
        { status: 500 }
      )
    }

    console.log('Consultation linked successfully:', data)

    return NextResponse.json({
      success: true,
      consultation: data
    })

  } catch (error: any) {
    console.error('Link consultation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
