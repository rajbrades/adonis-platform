import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'



export async function GET(request: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )


  try {
    const { data: ranges, error } = await supabase
      .from('biomarker_ranges')
      .select('*')
      .order('biomarker_name')

    if (error) {
      console.error('Error fetching biomarker ranges:', error)
      return NextResponse.json(
        { error: 'Failed to fetch biomarker ranges' },
        { status: 500 }
      )
    }

    return NextResponse.json(ranges)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
