import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { patientName, patientDOB, testDate, panelName, biomarkers } = body

    // Generate user_id from name + DOB
    const userId = `${patientName.toLowerCase().replace(/\s+/g, '_')}_${patientDOB.replace(/\//g, '')}`

    const { data, error } = await supabase
      .from('lab_results')
      .insert({
        user_id: userId,
        patient_name: patientName,
        patient_dob: patientDOB,
        test_date: testDate,
        panel_name: panelName || 'Complete Panel',
        biomarkers: biomarkers
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: data.id })
  } catch (error: any) {
    console.error('Error saving lab results:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
