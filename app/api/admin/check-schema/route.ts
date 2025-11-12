import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: NextRequest) {
  try {
    const { data, error } = await supabase
      .from('lab_results')
      .select('*')
      .limit(1)

    if (error) throw error

    return NextResponse.json({
      columns: data && data.length > 0 ? Object.keys(data[0]) : [],
      sampleData: data
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
