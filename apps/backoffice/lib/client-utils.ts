// Client-side database utilities
// These functions can be used in client components

export interface Work {
  work_id: string;
  title: string;
  abstract: string | null;
  status: "draft" | "ready" | "final" | "archived";
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
  profile_id: string | null;
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

// Get allowed status options based on user role
export function getAllowedStatusOptions(
  accessLevel: string
): Array<{ value: string; label: string }> {
  const baseStatuses = [
    { value: "draft", label: "Draft" },
    { value: "ready", label: "Ready for Review" },
  ];

  // Only curators and operations can set status to final
  if (["curator", "operations"].includes(accessLevel)) {
    baseStatuses.push({ value: "final", label: "Final" });
  }

  return baseStatuses;
}
