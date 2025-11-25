import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { patient_id, provider_id, lab_result_id, note_content, note_type, biomarkers_reviewed, action, encounter_type, signed_by_name } = body

    if (!patient_id || !provider_id || !note_content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Handle DRAFT: Update existing or create new
    if (action === 'draft') {
      // Check for existing active draft
      const { data: existingDraft } = await supabase
        .from('provider_encounter_notes')
        .select('*')
        .eq('patient_id', patient_id)
        .eq('is_active_draft', true)
        .single()

      if (existingDraft) {
        // UPDATE existing draft
        const { data, error } = await supabase
          .from('provider_encounter_notes')
          .update({
            note_content,
            lab_result_id,
            encounter_type,
            biomarkers_reviewed,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingDraft.id)
          .select()
          .single()

        if (error) throw error
        return NextResponse.json({ ...data, action: 'updated' })
      } else {
        // INSERT new draft
        const { data, error } = await supabase
          .from('provider_encounter_notes')
          .insert({
            patient_id,
            provider_id,
            lab_result_id,
            note_content,
            note_type: note_type || 'clinical_assessment',
            biomarkers_reviewed,
            status: 'draft',
            encounter_type: encounter_type || "followup_lab_review",
            is_active_draft: true
          })
          .select()
          .single()

        if (error) throw error
        return NextResponse.json({ ...data, action: 'created' })
      }
    }

    // Handle SIGN: Mark draft inactive, create signed note
    if (action === 'sign') {
      // Mark any active draft as inactive
      await supabase
        .from('provider_encounter_notes')
        .update({ is_active_draft: false })
        .eq('patient_id', patient_id)
        .eq('is_active_draft', true)

      // Create signed note
      const { data, error } = await supabase
        .from('provider_encounter_notes')
        .insert({
          patient_id,
          encounter_type: encounter_type || "followup_lab_review",
          provider_id,
          lab_result_id,
          note_content,
          note_type: note_type || 'clinical_assessment',
          biomarkers_reviewed,
          status: 'signed',
          signed_at: new Date().toISOString(),
          signed_by: signed_by_name || provider_id,
          is_active_draft: false
        })
        .select()
        .single()

      if (error) throw error
      return NextResponse.json({ ...data, action: 'signed' })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error: any) {
    console.error('Error saving encounter note:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const patient_id = searchParams.get('patient_id')
    const status = searchParams.get('status')
    const active_draft_only = searchParams.get('active_draft_only')

    if (!patient_id) {
      return NextResponse.json({ error: 'patient_id required' }, { status: 400 })
    }

    let query = supabase
      .from('provider_encounter_notes')
      .select('*')
      .eq('patient_id', patient_id)

    if (status) {
      query = query.eq('status', status)
    }

    if (active_draft_only === 'true') {
      query = query.eq('is_active_draft', true)
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

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const note_id = searchParams.get('note_id')

    if (!note_id) {
      return NextResponse.json({ error: 'note_id required' }, { status: 400 })
    }

    // Only allow deleting drafts
    const { data: note } = await supabase
      .from('provider_encounter_notes')
      .select('status')
      .eq('id', note_id)
      .single()

    if (note?.status !== 'draft') {
      return NextResponse.json({ error: 'Can only delete drafts' }, { status: 403 })
    }

    const { error } = await supabase
      .from('provider_encounter_notes')
      .delete()
      .eq('id', note_id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting note:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
