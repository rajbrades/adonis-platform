import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Only import and use Supabase when the route is actually called
    const { createClient } = await import('@supabase/supabase-js')
    
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ 
        error: 'Supabase configuration missing' 
      }, { status: 500 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    const { data, error } = await supabase
      .from('consultations')
      .select('*')
      .limit(1)

    if (error) {
      return NextResponse.json({ 
        error: error.message,
        connected: false 
      }, { status: 500 })
    }

    return NextResponse.json({ 
      connected: true,
      message: 'Database connection successful' 
    })
  } catch (error: any) {
    return NextResponse.json({ 
      error: error.message,
      connected: false 
    }, { status: 500 })
  }
}
