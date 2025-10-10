import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const body = await request.json()
    const { patientEmail, panelName, testDate, providerNotes, biomarkers } = body

    const { data: patient, error: patientError } = await supabase
      .from('user_profiles')
      .select('clerk_user_id')
      .eq('email', patientEmail)
      .single()

    if (patientError || !patient) {
      return NextResponse.json({ 
        success: false, 
        error: 'Patient not found with that email' 
      }, { status: 404 })
    }

    const { data: consultation } = await supabase
      .from('consultations')
      .select('id, order_id')
      .eq('user_id', patient.clerk_user_id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (!consultation) {
      return NextResponse.json({ 
        success: false, 
        error: 'No consultation found for this patient' 
      }, { status: 404 })
    }

    const { data: ranges } = await supabase
      .from('biomarker_ranges')
      .select('*')

    const rangesMap = new Map(ranges?.map(r => [r.biomarker_name, r]) || [])

    const resultsData = biomarkers.map((b: any) => {
      const range = rangesMap.get(b.biomarker)
      return {
        biomarker: b.biomarker,
        value: parseFloat(b.value),
        unit: b.unit,
        reference_range: b.referenceRange,
        status: b.status,
        optimal_range: range ? `${range.optimal_min}-${range.optimal_max}` : undefined
      }
    })

    const { data: labResult, error: labError } = await supabase
      .from('lab_results')
      .insert({
        order_id: consultation.order_id,
        consultation_id: consultation.id,
        lab_panel_name: panelName,
        results_data: resultsData,
        status: 'completed',
        test_date: testDate,
        results_received_at: new Date().toISOString(),
        provider_notes: providerNotes,
        reviewed_by: userId,
        reviewed_at: new Date().toISOString()
      })
      .select()
      .single()

    if (labError) {
      console.error('Error inserting lab result:', labError)
      return NextResponse.json({ 
        success: false, 
        error: labError.message 
      }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      labResultId: labResult.id 
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}
