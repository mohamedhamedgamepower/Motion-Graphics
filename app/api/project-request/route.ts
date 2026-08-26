import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

// Handles the "Send Project Request" form. Kept as a tiny API route so the
// form component doesn't need to know anything about Supabase directly.
export async function POST(request: Request) {
  const body = await request.json();

  const { name, email, company, package_name, videos_needed, message, reference_link } = body;

  if (!name || !email) {
    return NextResponse.json(
      { error: "Name and email are required." },
      { status: 400 }
    );
  }

  const supabase = createServerSupabaseClient();

  const { error } = await supabase.from("project_requests").insert({
    name,
    email,
    company: company || null,
    package_name: package_name || null,
    videos_needed: videos_needed || null,
    message: message || null,
    reference_link: reference_link || null,
  });

  if (error) {
    console.error("Error saving project request:", error.message);
    return NextResponse.json(
      { error: "Could not save your request. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
