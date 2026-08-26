import { createServerSupabaseClient } from "./supabase/server";
import type { Package, Project } from "./types";

// All the read queries the public website needs live here, in one place.
// If you ever need to change how projects or packages are fetched
// (e.g. add sorting, pagination), this is the only file to edit.

export async function getProjects(): Promise<Project[]> {
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

export async function getProjectBySlug(slug: string): Promise<Project | null> {
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
