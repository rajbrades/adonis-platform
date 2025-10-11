import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, dob } = body

    if (!name || !dob) {
      return NextResponse.json({ 
        error: 'Name and date of birth are required' 
      }, { status: 400 })
    }

    // Fetch lab results for this specific patient
    const { data, error } = await supabase
      .from('lab_results')
      .select('*')
      .eq('patient_name', name)
      .eq('patient_dob', dob)
      .order('test_date', { ascending: false })

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
