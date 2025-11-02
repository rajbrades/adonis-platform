import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'


export async function GET(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )


  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch all lab results, ordered by test date descending
    const { data, error } = await supabase
      .from('lab_results')
      .select('*')
      .order('test_date', { ascending: false })

    if (error) {
      console.error('Error fetching lab results:', error)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true,
      results: data || []
    })

  } catch (error) {
    console.error('Error listing lab results:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch lab results',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
