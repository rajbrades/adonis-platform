import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: NextRequest) {
  try {
    const { data, error } = await supabase
      .from('lab_results')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    console.log('📊 Found lab results:', data?.length || 0)
    return NextResponse.json(data || [])
  } catch (error: any) {
    console.error('Error fetching lab results:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    console.log('💾 Saving lab results for:', body.patient_name)

    // Check for existing labs for this patient on this date
    const { data: existing } = await supabase
      .from('lab_results')
      .select('id')
      .eq('user_id', body.patient_id || 'admin-upload')
      .eq('test_date', body.test_date)
      .maybeSingle()

    if (existing) {
      console.log('⚠️  Lab results already exist for this test date')
      return NextResponse.json({ 
        error: 'Lab results already uploaded for this test date. Please delete the existing results first.' 
      }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('lab_results')
      .insert({
        user_id: body.patient_id || 'admin-upload',
        patient_name: body.patient_name,
        patient_dob: body.patient_dob,
        test_date: body.test_date,
        panel_name: body.lab_name || 'Quest Diagnostics',
        pdf_url: body.pdf_url || null,
        uploaded_by: 'admin',
        biomarkers: body.biomarkers,
        uploaded_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw error

    console.log('✅ Lab results saved!')
    return NextResponse.json(data)
  } catch (error: any) {
    console.error('❌ Error saving lab results:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
