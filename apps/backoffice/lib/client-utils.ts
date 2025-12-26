// Client-side database utilities
// These functions can be used in client components

export interface Work {
  work_id: string;
  title: string;
  abstract: string | null;
  status: "draft" | "final" | "archived";
  created_at: string;
  slug: string;
}

export interface Category {
  category_id: string;
  type: string | null;
  label: string;
  slug: string;
}

export interface Person {
  person_id: string;
  name: string;
  affiliation: string | null;
  slug: string;
  bio: string | null;
  tag: string | null;
}

export interface Asset {
  asset_id: string;
  work_id: string;
  type: "image" | "video" | "audio" | "document" | "link";
  file_url: string;
  thumbnail_url: string | null;
  license: string | null;
  created_at: string;
}

// Utility function to generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
