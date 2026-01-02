// Client-side database utilities
// These functions can be used in client components

export interface Work {
  work_id: string;
  title: string;
  abstract: string | null;
  status: "draft" | "ready" | "final" | "archived";
  created_at: string;
  slug: string;
  work_person?: {
    person: {
      name: string;
      affiliation?: Affiliation | null;
    };
    contribution_role: string;
    ordering: number;
  }[];
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
  affiliation_id: string | null;
  slug: string;
  bio: string | null;
  tag: string | null;
  profile_id: string | null;
  affiliation?: Affiliation | null;
}

export interface Affiliation {
  affiliation_id: string;
  name: string;
  short_name: string | null;
  type: "university" | "institute" | "company" | "organization" | "other";
  country: string | null;
  website: string | null;
  slug: string;
  created_at: string;
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

// Utility function to generate 5 random characters
function generateRandomSuffix(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 5; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Utility function to generate slug from title with optional random suffix
export function generateSlug(
  title: string,
  addRandomSuffix: boolean = false
): string {
  const baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  if (addRandomSuffix) {
    return `${baseSlug}-${generateRandomSuffix()}`;
  }

  return baseSlug;
}

// Alternative function to generate slug with UUID suffix
export function generateSlugWithUuid(title: string, uuid: string): string {
  const baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  // Take first 5 characters from UUID (removing hyphens first)
  const uuidSuffix = uuid.replace(/-/g, "").substring(0, 5);

  return `${baseSlug}-${uuidSuffix}`;
}

// Get first author from work_person relationship
export function getFirstAuthor(
  work: Work
): { name: string; affiliation: Affiliation | null | undefined } | null {
  if (!work.work_person || work.work_person.length === 0) {
    return null;
  }

  // Find the first author (ordering = 1) or the one with "First Author" role
  const firstAuthor = work.work_person.find(
    (wp) => wp.ordering === 1 || wp.contribution_role === "First Author"
  );

  // If no specific first author found, return the first person in the list
  const authorToReturn = firstAuthor || work.work_person[0];

  return {
    name: authorToReturn.person.name,
    affiliation: authorToReturn.person.affiliation,
  };
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
