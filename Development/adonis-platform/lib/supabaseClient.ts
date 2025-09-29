import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface ConsultationSubmission {
  id?: string
  created_at?: string
  first_name: string
  last_name: string
  email: string
  phone: string
  date_of_birth: string
  occupation?: string
  optimization_goals?: string[]
  medical_history?: any
}