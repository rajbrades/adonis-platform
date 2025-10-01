// lib/supabase-storage.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const BUCKET_NAME = 'lab-results';
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];

export interface UploadResult {
  success: boolean;
  data?: {
    path: string;
    url: string;
  };
  error?: string;
}

export interface LabResult {
  id: string;
  consultation_id: string;
  file_name: string;
  file_url: string;
  file_type: string;
  file_size?: number;
  uploaded_by: string;
  uploaded_at: string;
  result_date?: string;
  lab_name?: string;
  status: 'pending_review' | 'reviewed' | 'abnormal' | 'normal';
  provider_notes?: string;
  is_critical?: boolean;
  metadata?: any;
}

export async function initializeStorage() {
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();
  
  if (listError) {
    console.error('Error listing buckets:', listError);
    return false;
  }

  const bucketExists = buckets?.some(bucket => bucket.name === BUCKET_NAME);
  
  if (!bucketExists) {
    const { error: createError } = await supabase.storage.createBucket(BUCKET_NAME, {
      public: false,
      fileSizeLimit: MAX_FILE_SIZE,
      allowedMimeTypes: ALLOWED_FILE_TYPES
    });
    
    if (createError) {
      console.error('Error creating bucket:', createError);
      return false;
    }
  }
  
  return true;
}

export async function uploadLabResult(
  file: File,
  consultationId: string,
  uploadedBy: string = 'provider'
): Promise<UploadResult> {
  try {
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return {
        success: false,
        error: 'Invalid file type. Only PDF and images (JPEG, PNG) are allowed.'
      };
    }

    if (file.size > MAX_FILE_SIZE) {
      return {
        success: false,
        error: 'File size exceeds 10MB limit.'
      };
    }

    const timestamp = Date.now();
    const fileExt = file.name.split('.').pop();
    const fileName = `${consultationId}/${timestamp}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, file, {
        contentType: file.type,
        upsert: false
      });

    if (error) {
      console.error('Upload error:', error);
      return {
        success: false,
        error: 'Failed to upload file. Please try again.'
      };
    }

    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName);

    const { error: dbError } = await supabase
      .from('lab_results')
      .insert({
        consultation_id: consultationId,
        file_name: file.name,
        file_url: publicUrl,
        file_type: file.type,
        file_size: file.size,
        uploaded_by: uploadedBy,
        status: 'pending_review'
      });

    if (dbError) {
      await supabase.storage.from(BUCKET_NAME).remove([fileName]);
      console.error('Database error:', dbError);
      return {
        success: false,
        error: 'Failed to save file information. Please try again.'
      };
    }

    await supabase
      .from('consultations')
      .update({ 
        lab_results_ready: true,
        lab_results_count: supabase.sql`lab_results_count + 1`
      })
      .eq('id', consultationId);

    return {
      success: true,
      data: {
        path: fileName,
        url: publicUrl
      }
    };
  } catch (error) {
    console.error('Unexpected error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.'
    };
  }
}

export async function getSignedUrl(filePath: string): Promise<string | null> {
  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .createSignedUrl(filePath, 3600);

    if (error) {
      console.error('Error creating signed URL:', error);
      return null;
    }

    return data.signedUrl;
  } catch (error) {
    console.error('Unexpected error getting signed URL:', error);
    return null;
  }
}

export async function deleteLabResult(
  labResultId: string,
  filePath: string
): Promise<boolean> {
  try {
    const { error: storageError } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath]);

    if (storageError) {
      console.error('Storage deletion error:', storageError);
      return false;
    }

    const { error: dbError } = await supabase
      .from('lab_results')
      .delete()
      .eq('id', labResultId);

    if (dbError) {
      console.error('Database deletion error:', dbError);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Unexpected error deleting lab result:', error);
    return false;
  }
}

export async function getLabResults(consultationId: string): Promise<LabResult[]> {
  try {
    const { data, error } = await supabase
      .from('lab_results')
      .select('*')
      .eq('consultation_id', consultationId)
      .order('uploaded_at', { ascending: false });

    if (error) {
      console.error('Error fetching lab results:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching lab results:', error);
    return [];
  }
}

export async function updateLabResult(
  labResultId: string,
  updates: Partial<LabResult>
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('lab_results')
      .update(updates)
      .eq('id', labResultId);

    if (error) {
      console.error('Error updating lab result:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Unexpected error updating lab result:', error);
    return false;
  }
}

export async function markLabResultsViewed(
  consultationId: string,
  viewedBy: string
): Promise<void> {
  try {
    await supabase
      .from('consultations')
      .update({ lab_results_viewed_at: new Date().toISOString() })
      .eq('id', consultationId);

    const { data: results } = await supabase
      .from('lab_results')
      .select('id')
      .eq('consultation_id', consultationId);

    if (results && results.length > 0) {
      const views = results.map(result => ({
        lab_result_id: result.id,
        viewed_by: viewedBy
      }));

      await supabase
        .from('lab_results_views')
        .insert(views);
    }
  } catch (error) {
    console.error('Error marking lab results as viewed:', error);
  }
}
