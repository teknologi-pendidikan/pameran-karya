import { createClient } from "@/lib/supabase/server";
import {
  generateSlug,
  generateSlugWithUuid,
  type Work,
  type Category,
  type Person,
  type Asset,
  type Affiliation,
} from "@/lib/client-utils";

// Re-export types for server-side use
export type { Work, Category, Person, Asset, Affiliation };
export { generateSlug, generateSlugWithUuid };

// Get all works (for curators/operations) or user's works (for participants)
export async function getWorks(
  userProfile?: { id: string; access_level: string } | null
) {
  const supabase = await createClient();

  // If user is curator or operations, show all works
  if (
    userProfile &&
    ["curator", "operations"].includes(userProfile.access_level)
  ) {
    const { data, error } = await supabase
      .from("work")
      .select(
        `
        *,
        work_person(
          person(*),
          contribution_role,
          ordering
        )
      `
      )
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as Work[];
  }

  // For participants, only show their own works
  if (userProfile?.id) {
    return getCurrentUserWorks(userProfile.id);
  }

  // Fallback: return empty array if no user profile
  return [];
}

// Get work by ID with related data
export async function getWorkById(workId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("work")
    .select(
      `
      *,
      work_category(
        category(*)
      ),
      work_person(
        person(*),
        contribution_role,
        ordering
      ),
      asset(*)
    `
    )
    .eq("work_id", workId)
    .single();

  if (error) throw error;
  return data;
}

// Get current user's works using the profile_id link
export async function getCurrentUserWorks(userId: string) {
  const supabase = await createClient();

  // Get works where the user has person records linked to their profile
  const { data, error } = await supabase
    .from("work")
    .select(
      `
      *,
      work_person!inner(
        person!inner(profile_id),
        contribution_role,
        ordering
      )
    `
    )
    .eq("work_person.person.profile_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Work[];
}

// Create a new work
export async function createWork(workData: {
  title: string;
  abstract?: string;
  status?: "draft" | "final";
  slug: string;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("work")
    .insert([workData])
    .select()
    .single();

  if (error) throw error;
  return data as Work;
}

// Update work
export async function updateWork(workId: string, updates: Partial<Work>) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("work")
    .update(updates)
    .eq("work_id", workId)
    .select()
    .single();

  if (error) throw error;
  return data as Work;
}

// Delete work
export async function deleteWork(workId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("work").delete().eq("work_id", workId);

  if (error) throw error;
}

// Get all categories
export async function getCategories() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("category")
    .select("*")
    .order("label");

  if (error) throw error;
  return data as Category[];
}

// Check if user can access a specific work using profile_id link
export async function canUserAccessWork(
  workId: string,
  userProfile: {
    id: string;
    access_level: string;
    full_name: string;
    email: string;
  }
) {
  const supabase = await createClient();

  // Curators and operations can access all works
  if (["curator", "operations"].includes(userProfile.access_level)) {
    return true;
  }

  // For participants, check if they have any person records linked to this work
  // First, get the person IDs linked to this user profile
  const { data: personData } = await supabase
    .from("person")
    .select("person_id")
    .eq("profile_id", userProfile.id);

  if (!personData || personData.length === 0) {
    return false; // No person records linked to this user
  }

  const personIds = personData.map((p) => p.person_id);

  // Then check if any of these persons are linked to the work
  const { data } = await supabase
    .from("work_person")
    .select("work_id")
    .eq("work_id", workId)
    .in("person_id", personIds);

  return data && data.length > 0;
}

// Create category
export async function createCategory(categoryData: {
  label: string;
  slug: string;
  type?: string;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("category")
    .insert([categoryData])
    .select()
    .single();

  if (error) throw error;
  return data as Category;
}

// Get all people with affiliation data
export async function getPeople() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("person")
    .select(
      `
      *,
      affiliation(*)
    `
    )
    .order("name");

  if (error) throw error;
  return data as Person[];
}

// Create person
export async function createPerson(personData: {
  name: string;
  slug: string;
  affiliation_id?: string;
  bio?: string;
  tag?: string;
  profile_id?: string;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("person")
    .insert([personData])
    .select(
      `
      *,
      affiliation(*)
    `
    )
    .single();

  if (error) throw error;
  return data as Person;
}

// Add category to work
export async function addCategoryToWork(workId: string, categoryId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("work_category")
    .insert([{ work_id: workId, category_id: categoryId }]);

  if (error) throw error;
}

// Add person to work
export async function addPersonToWork(
  workId: string,
  personId: string,
  contributionRole?: string,
  ordering?: number
) {
  const supabase = await createClient();
  const { error } = await supabase.from("work_person").insert([
    {
      work_id: workId,
      person_id: personId,
      contribution_role: contributionRole,
      ordering: ordering,
    },
  ]);

  if (error) throw error;
}

// Create asset for work
export async function createAsset(assetData: {
  work_id: string;
  type: "image" | "video" | "audio" | "document" | "link";
  file_url: string;
  thumbnail_url?: string;
  license?: string;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("asset")
    .insert([assetData])
    .select()
    .single();

  if (error) throw error;
  return data as Asset;
}

// Affiliation functions

// Get all affiliations
export async function getAffiliations() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("affiliation")
    .select("*")
    .order("name");

  if (error) throw error;
  return data as Affiliation[];
}

// Create affiliation
export async function createAffiliation(affiliationData: {
  name: string;
  short_name?: string;
  type: "university" | "institute" | "company" | "organization" | "other";
  country?: string;
  website?: string;
  slug: string;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("affiliation")
    .insert([affiliationData])
    .select()
    .single();

  if (error) throw error;
  return data as Affiliation;
}

// Update affiliation
export async function updateAffiliation(
  affiliationId: string,
  updates: Partial<Affiliation>
) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("affiliation")
    .update(updates)
    .eq("affiliation_id", affiliationId)
    .select()
    .single();

  if (error) throw error;
  return data as Affiliation;
}

// Get affiliation by ID
export async function getAffiliationById(affiliationId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("affiliation")
    .select("*")
    .eq("affiliation_id", affiliationId)
    .single();

  if (error) throw error;
  return data as Affiliation;
}
