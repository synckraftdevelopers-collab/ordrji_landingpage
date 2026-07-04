import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || 'placeholder-key';

// Browser-safe client (anon key, respects RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-only client (service key, bypasses RLS — use only in API routes)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
