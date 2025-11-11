import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { patient_name, patient_dob, test_date, biomarkers } = body

    console.log('💾 Saving lab results:', { patient_name, patient_dob, biomarkers_count: biomarkers?.length })

    // Validate required fields
    if (!patient_name || !patient_dob) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Insert lab results - use placeholder user_id since we don't have proper user accounts yet
    const { data, error } = await supabase
      .from('lab_results')
      .insert({
        user_id: 'admin-upload', // Placeholder - will be replaced when we link accounts
        patient_name: patient_name,
        patient_dob: patient_dob,
        test_date: test_date || new Date().toISOString().split('T')[0],
        biomarkers: biomarkers || []
      })
      .select()
      .single()

    if (error) {
      console.error('❌ Supabase error:', error)
      return NextResponse.json({ 
        error: error.message,
        hint: error.hint,
        details: error.details 
      }, { status: 500 })
    }

    console.log('✅ Lab results saved successfully:', data.id)
    return NextResponse.json({ success: true, id: data.id })
  } catch (error: any) {
    console.error('❌ Error saving lab results:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const { data, error } = await supabase
      .from('lab_results')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(data || [])
  } catch (error: any) {
    console.error('Error fetching lab results:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
