import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const { data: consultation, error } = await supabase
      .from('consultations')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error

    return NextResponse.json(consultation)
  } catch (error: any) {
    console.error('Fetch consultation error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
