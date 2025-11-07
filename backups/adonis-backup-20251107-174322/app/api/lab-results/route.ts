import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'



export async function GET(request: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )


  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { data: results, error } = await supabase
      .from('lab_results')
      .select('*')
      .eq('clerk_user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching lab results:', error)
      return NextResponse.json(
        { error: 'Failed to fetch lab results' },
        { status: 500 }
      )
    }

    return NextResponse.json(results)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
