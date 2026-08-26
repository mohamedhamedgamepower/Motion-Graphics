// Shared types that mirror the Supabase database tables.
// Keep this file in sync with supabase/schema.sql — if you add a column
// there, add it here too so the rest of the app knows about it.

export type ProjectCategory =
  | "business"
  | "product"
  | "social-media"
  | "promotional"
  | "real-estate"
  | "food-restaurants";

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  description: string | null;
  thumbnail_url: string;
  video_url: string;
  duration: string | null; // e.g. "0:18"
  featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Package {
  id: string;
  name: string;
  videos_count: number;
  price: number;
  currency: string; // e.g. "USD"
  description: string | null;
  features: string[];
  popular: boolean;
  display_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProjectRequest {
  id?: string;
  name: string;
  email: string;
  company: string | null;
  package_name: string | null;
  videos_needed: string | null;
  message: string | null;
  reference_link: string | null;
  created_at?: string;
}

// Human-readable labels for each category — used by the filter bar and cards.
export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  business: "Business",
  product: "Product",
  "social-media": "Social Media",
  promotional: "Promotional",
  "real-estate": "Real Estate",
  "food-restaurants": "Food & Restaurants",
};
