import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  try {
    const body = await req.json()
    const { name, dob } = body

    console.log('🔍 Searching for patient with:', { name, dob })

    if (!name || !dob) {
      return NextResponse.json({ 
        error: 'Name and date of birth are required' 
      }, { status: 400 })
    }

    // Fetch lab results - use case-insensitive search
    const { data, error } = await supabase
      .from('lab_results')
      .select('*')
      .ilike('patient_name', name) // Case-insensitive LIKE
      .eq('patient_dob', dob)
      .order('test_date', { ascending: false })

    console.log('📊 Query results:', { 
      found: data?.length || 0, 
      error: error?.message,
      results: data?.map(r => ({ patient_name: r.patient_name, patient_dob: r.patient_dob }))
    })

    if (error) {
      console.error('Error fetching patient results:', error)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true,
      results: data || []
    })

  } catch (error) {
    console.error('Error in patient results:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch results',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
