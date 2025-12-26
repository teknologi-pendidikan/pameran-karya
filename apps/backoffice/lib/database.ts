import { createClient } from "@/lib/supabase/server";
import {
  generateSlug,
  type Work,
  type Category,
  type Person,
  type Asset,
} from "@/lib/client-utils";

// Re-export types for server-side use
export type { Work, Category, Person, Asset };
export { generateSlug };

// Get all works
export async function getWorks() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("work")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Work[];
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

// Get current user's works
export async function getCurrentUserWorks(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("work")
    .select(
      `
      *,
      work_person!inner(person_id)
    `
    )
    .eq("work_person.person_id", userId)
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

// Get all people
export async function getPeople() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("person")
    .select("*")
    .order("name");

  if (error) throw error;
  return data as Person[];
}

// Create person
export async function createPerson(personData: {
  name: string;
  slug: string;
  affiliation?: string;
  bio?: string;
  tag?: string;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("person")
    .insert([personData])
    .select()
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
