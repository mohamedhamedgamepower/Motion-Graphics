import { unstable_noStore as noStore } from "next/cache";
import { createServerSupabaseClient } from "./supabase/server";

import type { Package, Project } from "./types";

// All the read queries the public website needs live here, in one place.
// Data is always fetched fresh from Supabase so Admin changes
// appear on the live website without requiring a new deployment.

export async function getProjects(): Promise<Project[]> {
  noStore();

  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching projects:", error.message);
    return [];
  }

  return data ?? [];
}

export async function getFeaturedProject(): Promise<Project | null> {
  noStore();

  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("featured", true)
    .order("display_order", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Error fetching featured project:", error.message);
    return null;
  }

  return data;
}

export async function getProjectBySlug(
  slug: string
): Promise<Project | null> {
  noStore();

  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("Error fetching project:", error.message);
    return null;
  }

  return data;
}

export async function getPackages(): Promise<Package[]> {
  noStore();

  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("packages")
    .select("*")
    .eq("active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching packages:", error.message);
    return [];
  }

  return data ?? [];
}