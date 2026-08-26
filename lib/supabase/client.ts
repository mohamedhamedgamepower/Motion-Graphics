"use client";

import { createClient } from "@supabase/supabase-js";

// This is the ONLY place the Supabase browser client is created.
// It uses the public anon key, which is safe to expose in the browser —
// Row Level Security (RLS) policies on the database decide what it can
// actually read or write. Never put the "service_role" key in this file.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  // This warning shows up clearly in the browser console instead of a
  // confusing crash, so a beginner can tell exactly what's missing.
  console.warn(
    "Supabase environment variables are missing. Check your .env.local file — see README.md."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
