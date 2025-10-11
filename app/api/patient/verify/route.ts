import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'



export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )


  try {
    const body = await req.json()
    const { name, dob } = body

    if (!name || !dob) {
      return NextResponse.json({ 
        error: 'Name and date of birth are required' 
      }, { status: 400 })
    }

    // Check if patient has any lab results
    const { data, error } = await supabase
      .from('lab_results')
      .select('id, test_date')
      .eq('patient_name', name)
      .eq('patient_dob', dob)
      .order('test_date', { ascending: false })

    if (error) {
      console.error('Error verifying patient:', error)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    const hasResults = data && data.length > 0

    return NextResponse.json({ 
      success: hasResults,
      count: data?.length || 0,
      message: hasResults ? 'Patient verified' : 'No results found'
    })

  } catch (error) {
    console.error('Error in patient verification:', error)
    return NextResponse.json({ 
      error: 'Verification failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
