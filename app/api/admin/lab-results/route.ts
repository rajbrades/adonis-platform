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
    
    console.log('💾 Saving lab results for patient:', body.patient_id)

    const { data, error } = await supabase
      .from('lab_results')
      .insert({
        user_id: '00000000-0000-0000-0000-000000000000',
        patient_id: body.patient_id,
        patient_name: body.patient_name,
        patient_dob: body.patient_dob,
        test_date: body.test_date,
        lab_name: body.lab_name,
        panel_name: 'Comprehensive Panel',
        biomarkers: body.biomarkers,
        uploaded_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw error

    console.log('✅ Lab results saved successfully!')
    return NextResponse.json(data)
  } catch (error: any) {
    console.error('❌ Error saving lab results:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
