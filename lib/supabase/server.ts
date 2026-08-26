import { createClient } from "@supabase/supabase-js";

// Server-side Supabase client used inside Server Components and API routes.
// It also uses the public anon key — the site only ever reads/writes data
// that RLS policies (see supabase/schema.sql) explicitly allow for the
// public. This keeps the "front door" identical on server and client,
// which is easier to reason about for a beginner-friendly project.
export function createServerSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false },
  });
}
