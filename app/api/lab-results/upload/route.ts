// app/api/lab-results/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { uploadLabResult, initializeStorage } from '@/lib/supabase-storage';

export async function POST(request: NextRequest) {
  try {
    // Initialize storage bucket if needed
    await initializeStorage();

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const consultationId = formData.get('consultationId') as string;
    const uploadedBy = formData.get('uploadedBy') as string || 'provider';

    if (!file || !consultationId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await uploadLabResult(file, consultationId, uploadedBy);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.data
    });
  } catch (error) {
    console.error('Upload endpoint error:', error);
    return NextResponse.json(
      { error: 'Failed to upload lab result' },
      { status: 500 }
    );
  }
}

// Configure route to handle file uploads
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
