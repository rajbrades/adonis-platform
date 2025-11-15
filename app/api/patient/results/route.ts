import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  try {
    const body = await req.json()
    const { patient_id } = body

    console.log('🔍 Fetching lab results for patient_id:', patient_id)

    if (!patient_id) {
      return NextResponse.json({ 
        error: 'Patient ID is required' 
      }, { status: 400 })
    }

    // Query by patient_id (stored as user_id in lab_results table)
    const { data, error } = await supabase
      .from('lab_results')
      .select('*')
      .eq('user_id', patient_id)
      .order('test_date', { ascending: false })

    console.log('📊 Found lab results:', data?.length || 0)

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
