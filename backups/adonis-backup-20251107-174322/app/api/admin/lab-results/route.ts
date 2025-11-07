import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )


  try {
    // Create Supabase client inside the handler
    
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { patientName, patientDOB, panelName, testDate, biomarkers } = body

    if (!patientName || !patientDOB) {
      return NextResponse.json({ 
        error: 'Patient name and date of birth are required' 
      }, { status: 400 })
    }

    // Generate a unique patient ID from name + DOB
    const patientId = `${patientName.replace(/\s+/g, '_')}_${patientDOB.replace(/\//g, '')}`.toLowerCase()

    console.log('Creating lab result for patient:', patientId)

    // Create lab result (no need to check/create user - just store the result)
    const { data: labResult, error: labError } = await supabase
      .from('lab_results')
      .insert({
        user_id: patientId,
        patient_name: patientName,
        patient_dob: patientDOB,
        panel_name: panelName,
        test_date: testDate,
        uploaded_at: new Date().toISOString(),
        uploaded_by: userId,
        biomarkers: biomarkers.map((b: any) => ({
          biomarker: b.biomarker,
          value: parseFloat(b.value) || b.value,
          unit: b.unit,
          referenceRange: b.referenceRange,
          status: b.status
        }))
      })
      .select()
      .single()

    if (labError) {
      console.error('Error creating lab result:', labError)
      return NextResponse.json({ 
        error: 'Failed to create lab result',
        details: labError.message 
      }, { status: 500 })
    }

    console.log('Created lab result:', labResult.id)

    return NextResponse.json({ 
      success: true,
      labResultId: labResult.id,
      patientId
    })

  } catch (error) {
    console.error('Error creating lab result:', error)
    return NextResponse.json({ 
      error: 'Failed to create lab result',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
