"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { generateSlug } from "@/lib/database";

export interface CreateWorkData {
  title: string;
  abstract: string;
  status: "draft" | "ready" | "final" | "ready for review";
  categories: string[];
  authorName: string;
  authorAffiliation?: string;
  assetFile?: File;
  assetUrl?: string;
  assetType: "image" | "video" | "audio" | "document" | "link";
}

export interface CreateWorkResult {
  success: boolean;
  workId?: string;
  redirectTo?: string;
  error?: string;
}

export async function createWorkAction(
  data: CreateWorkData
): Promise<CreateWorkResult> {
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("You must be logged in to submit work");
  }

  try {
    // Generate slug from title
    const slug = generateSlug(data.title);

    // Create the work
    const { data: work, error: workError } = await supabase
      .from("work")
      .insert([
        {
          title: data.title,
          abstract: data.abstract,
          status: data.status,
          slug,
        },
      ])
      .select()
      .single();

    if (workError) throw workError;

    console.log("Work created successfully:", work.work_id);

    // Add categories to work
    if (data.categories.length > 0) {
      console.log("Adding categories:", data.categories);

      const workCategories = data.categories.map((categoryId) => ({
        work_id: work.work_id,
        category_id: categoryId,
      }));

      console.log("Work categories to insert:", workCategories);

      const { error: categoryError } = await supabase
        .from("work_category")
        .insert(workCategories);

      if (categoryError) {
        console.error("Category insertion error:", categoryError);
        throw categoryError;
      }

      console.log("Categories added successfully");
    }

    // Step 2: Create or find person record for current user linked to their profile
    const authorSlug = generateSlug(data.authorName);
    let person;

    // First, try to find existing person linked to this user's profile
    const { data: userPerson } = await supabase
      .from("person")
      .select("*")
      .eq("profile_id", user.id)
      .single();

    if (userPerson) {
      // User already has a person record, update it if needed
      if (
        userPerson.name !== data.authorName ||
        userPerson.affiliation !== (data.authorAffiliation || null)
      ) {
        const { data: updatedPerson, error: updateError } = await supabase
          .from("person")
          .update({
            name: data.authorName,
            affiliation: data.authorAffiliation || null,
            slug: authorSlug,
          })
          .eq("person_id", userPerson.person_id)
          .select()
          .single();

        if (updateError) {
          console.error("Person update error:", updateError);
          throw updateError;
        }

        person = updatedPerson;
        console.log("Updated existing person:", person.person_id);
      } else {
        person = userPerson;
        console.log("Using existing person:", person.person_id);
      }
    } else {
      // Create new person record linked to the user's profile (fallback for existing users)
      const { data: newPerson, error: personError } = await supabase
        .from("person")
        .insert([
          {
            name: data.authorName,
            affiliation: data.authorAffiliation || null,
            slug: authorSlug,
            tag: "author",
            profile_id: user.id, // Link to user's profile
          },
        ])
        .select()
        .single();

      if (personError) {
        console.error("Person creation error:", personError);
        throw personError;
      }

      person = newPerson;
      console.log("Created new person:", person.person_id);
    }

    // Step 3: Link person as first author to work
    const { error: workPersonError } = await supabase
      .from("work_person")
      .insert([
        {
          work_id: work.work_id,
          person_id: person.person_id,
          contribution_role: "First Author",
          ordering: 1,
        },
      ]);

    if (workPersonError) {
      console.error("Work-person linking error:", workPersonError);
      throw workPersonError;
    }

    console.log("Linked person as first author");

    // Step 4: Add basic asset if provided
    if (data.assetUrl || data.assetFile) {
      const assetUrl = data.assetUrl || "placeholder-url"; // Handle file upload later

      const { error: assetError } = await supabase.from("asset").insert([
        {
          work_id: work.work_id,
          type: data.assetType,
          file_url: assetUrl,
          license: "All Rights Reserved",
        },
      ]);

      if (assetError) {
        console.error("Asset creation error:", assetError);
        throw assetError;
      }

      console.log("Added basic asset");
    }

    // TODO: Associate work with current user via work_person table
    // DONE: Person is now linked as first author

    console.log("Work creation completed successfully");
    return {
      success: true,
      workId: work.work_id,
      redirectTo: "edit", // Redirect to edit page instead of detail
    };
  } catch (error) {
    console.error("Error creating work:", error);

    // More detailed error information
    if (error && typeof error === "object" && "code" in error) {
      const dbError = error as { code: unknown; message?: string };
      return {
        success: false,
        error: `Database error (${dbError.code}): ${
          dbError.message || "Unknown error"
        }`,
      };
    }

    return {
      success: false,
      error:
        "Failed to create work: " +
        (error instanceof Error ? error.message : String(error)),
    };
  }
}

export async function deleteWorkAction(workId: string) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("You must be logged in");
  }

  try {
    const { error } = await supabase
      .from("work")
      .delete()
      .eq("work_id", workId);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error("Error deleting work:", error);
    throw new Error("Failed to delete work");
  }
}

export async function updateWorkAction(
  workId: string,
  updates: {
    title?: string;
    abstract?: string;
    status?: "draft" | "ready" | "final" | "archived";
    categories?: string[];
  }
): Promise<CreateWorkResult> {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      success: false,
      error: "You must be logged in",
    };
  }

  try {
    // Prepare work updates
    const workUpdates: any = { ...updates };
    delete workUpdates.categories; // Remove categories from work updates

    // Update slug if title changed
    if (updates.title) {
      workUpdates.slug = generateSlug(updates.title);
    }

    // Update the work
    const { data: work, error: workError } = await supabase
      .from("work")
      .update(workUpdates)
      .eq("work_id", workId)
      .select()
      .single();

    if (workError) throw workError;

    // Update categories if provided
    if (updates.categories) {
      // First, remove existing categories
      await supabase.from("work_category").delete().eq("work_id", workId);

      // Then add new categories
      if (updates.categories.length > 0) {
        const workCategories = updates.categories.map((categoryId) => ({
          work_id: workId,
          category_id: categoryId,
        }));

        const { error: categoryError } = await supabase
          .from("work_category")
          .insert(workCategories);

        if (categoryError) throw categoryError;
      }
    }

    return { success: true, workId };
  } catch (error) {
    console.error("Error updating work:", error);

    if (error && typeof error === "object" && "code" in error) {
      const dbError = error as { code: unknown; message?: string };
      return {
        success: false,
        error: `Database error (${dbError.code}): ${
          dbError.message || "Unknown error"
        }`,
      };
    }

    return {
      success: false,
      error:
        "Failed to update work: " +
        (error instanceof Error ? error.message : String(error)),
    };
  }
}
