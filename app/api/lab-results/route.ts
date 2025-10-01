import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const searchParams = request.nextUrl.searchParams;
    const consultationId = searchParams.get('consultation_id');

    if (!consultationId) {
      return NextResponse.json({ error: 'consultation_id is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('lab_results')
      .select('*')
      .eq('consultation_id', consultationId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching lab results:', error);
      return NextResponse.json({ error: 'Failed to fetch lab results' }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json({ error: 'Failed to fetch lab results' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const body = await request.json();

    const { data, error } = await supabase
      .from('lab_results')
      .insert([body])
      .select()
      .single();

    if (error) {
      console.error('Error creating lab result:', error);
      return NextResponse.json({ error: 'Failed to create lab result' }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json({ error: 'Failed to create lab result' }, { status: 500 });
  }
}
