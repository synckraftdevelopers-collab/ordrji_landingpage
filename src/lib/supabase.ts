import { createClient } from '@supabase/supabase-js';

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const svc  = process.env.SUPABASE_SERVICE_KEY;

if (!url || !anon) {
  throw new Error(
    'Missing Supabase env vars: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are required.'
  );
}

/**
 * Browser-safe client — uses anon/publishable key, respects RLS.
 * Safe to import in Client Components.
 */
export const supabase = createClient(url, anon);

/**
 * Server-only admin client — uses service_role key, bypasses RLS.
 * Import ONLY in API routes (src/app/api/). Never in Client Components.
 */
export const supabaseAdmin = createClient(url, svc ?? anon, {
  auth: { persistSession: false },
});
