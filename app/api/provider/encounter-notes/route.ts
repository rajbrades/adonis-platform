import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { patient_id, provider_id, lab_result_id, note_content, note_type, biomarkers_reviewed, status, action } = body

    if (!patient_id || !provider_id || !note_content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Determine status and signing fields
    const noteData: any = {
      patient_id,
      provider_id,
      lab_result_id,
      note_content,
      note_type: note_type || 'clinical_assessment',
      biomarkers_reviewed,
      status: action === 'sign' ? 'signed' : 'draft'
    }

    // If signing, add signature timestamp and provider
    if (action === 'sign') {
      noteData.signed_at = new Date().toISOString()
      noteData.signed_by = provider_id
    }

    const { data, error } = await supabase
      .from('provider_encounter_notes')
      .insert(noteData)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Error saving encounter note:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const patient_id = searchParams.get('patient_id')
    const status = searchParams.get('status') // optional filter

    if (!patient_id) {
      return NextResponse.json({ error: 'patient_id required' }, { status: 400 })
    }

    let query = supabase
      .from('provider_encounter_notes')
      .select('*')
      .eq('patient_id', patient_id)

    // Filter by status if provided
    if (status) {
      query = query.eq('status', status)
    }

    query = query.order('created_at', { ascending: false })

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json(data || [])
  } catch (error: any) {
    console.error('Error fetching encounter notes:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
