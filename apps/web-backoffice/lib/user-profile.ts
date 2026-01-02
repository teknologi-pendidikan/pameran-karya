"use server";

import { createClient } from "@/lib/supabase/server";
import { generateSlug } from "@/lib/client-utils";

export async function ensureUserProfile() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User not authenticated");
  }

  try {
    // Check if user profile exists
    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (existingProfile) {
      // Profile already exists, check if person record also exists
      const { data: existingPerson } = await supabase
        .from("person")
        .select("*")
        .eq("profile_id", user.id)
        .single();

      if (!existingPerson) {
        // Create person record for existing profile, but handle race condition
        try {
          await createPersonForUser(user, existingProfile);
        } catch (error: unknown) {
          // If it's a duplicate key error, it means another concurrent call already created the person
          if (
            error &&
            typeof error === "object" &&
            "code" in error &&
            "message" in error &&
            error.code === "23505" &&
            typeof error.message === "string" &&
            error.message.includes("person_slug_key")
          ) {
            console.log(
              "Person record was already created by concurrent call, continuing..."
            );
          } else {
            // Re-throw other errors
            throw error;
          }
        }
      }

      return existingProfile;
    }

    // Create new profile for user
    const { data: newProfile, error: profileError } = await supabase
      .from("profiles")
      .insert([
        {
          id: user.id,
          email: user.email || "",
          full_name:
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            user.email?.split("@")[0] ||
            "User",
          access_level: "participant",
        },
      ])
      .select()
      .single();

    if (profileError) {
      console.error("Error creating user profile:", profileError);
      throw profileError;
    }

    console.log("Created new user profile:", newProfile);

    // Create person record for the new user, but handle race condition
    try {
      await createPersonForUser(user, newProfile);
    } catch (error: unknown) {
      // If it's a duplicate key error, it means another concurrent call already created the person
      if (
        error &&
        typeof error === "object" &&
        "code" in error &&
        "message" in error &&
        error.code === "23505" &&
        typeof error.message === "string" &&
        error.message.includes("person_slug_key")
      ) {
        console.log(
          "Person record was already created by concurrent call, continuing..."
        );
      } else {
        // Re-throw other errors
        throw error;
      }
    }

    return newProfile;
  } catch (error) {
    console.error("Error in ensureUserProfile:", error);
    throw error;
  }
}

async function createPersonForUser(
  user: { id: string; email?: string },
  profile: { full_name: string; id: string }
) {
  const supabase = await createClient();

  console.log("Creating person for user:", {
    userId: user.id,
    profileFullName: profile.full_name,
    userEmail: user.email,
  });

  // First, double-check if person already exists (race condition protection)
  const { data: existingPerson } = await supabase
    .from("person")
    .select("*")
    .eq("profile_id", user.id)
    .single();

  if (existingPerson) {
    console.log(
      "Person already exists for this user, skipping creation:",
      existingPerson.person_id
    );
    return existingPerson;
  }

  // Generate unique person slug from full name
  const baseSlug = generateSlug(
    profile.full_name || user.email?.split("@")[0] || "user"
  );

  console.log("Generated base slug:", baseSlug);

  let uniqueSlug;
  try {
    uniqueSlug = await generateUniquePersonSlug(baseSlug);
    console.log("Generated unique slug:", uniqueSlug);
  } catch (slugError) {
    console.error("Error generating unique slug:", slugError);
    throw slugError;
  }

  const personData = {
    name: profile.full_name,
    affiliation_id: null, // Can be filled later by user
    slug: uniqueSlug,
    tag: "author",
    profile_id: user.id, // Link to user's profile
    bio: null, // Can be filled later by user
  };

  console.log("Attempting to insert person data:", personData);

  try {
    const { data: newPerson, error: personError } = await supabase
      .from("person")
      .insert([personData])
      .select()
      .single();

    if (personError) {
      console.error("Supabase error details:", {
        code: personError.code,
        message: personError.message,
        details: personError.details,
        hint: personError.hint,
        personData,
      });
      throw personError;
    }

    console.log("Successfully created person record:", newPerson?.person_id);
    return newPerson;
  } catch (error) {
    console.error("Catch block error in createPersonForUser:", error);
    throw error;
  }
}

async function generateUniquePersonSlug(baseSlug: string): Promise<string> {
  const supabase = await createClient();
  let slug = baseSlug;
  let counter = 1;
  let maxAttempts = 50; // Prevent infinite loops

  console.log("Starting slug generation with base:", baseSlug);

  while (maxAttempts > 0) {
    try {
      // Check if slug already exists
      const { data: existingPerson, error: checkError } = await supabase
        .from("person")
        .select("slug")
        .eq("slug", slug)
        .maybeSingle(); // Use maybeSingle instead of single to avoid errors when no match

      if (checkError) {
        console.error("Error checking slug existence:", checkError);
        throw checkError;
      }

      if (!existingPerson) {
        // Slug is unique
        console.log("Found unique slug:", slug);
        return slug;
      }

      console.log("Slug already exists:", slug, "trying next variant");

      // Slug exists, try with a number suffix
      slug = `${baseSlug}-${counter}`;
      counter++;
      maxAttempts--;
    } catch (error) {
      console.error("Error in slug generation loop:", error);
      throw error;
    }
  }

  // Fallback: use timestamp if we can't find unique slug
  const fallbackSlug = `${baseSlug}-${Date.now()}`;
  console.log("Using fallback slug:", fallbackSlug);
  return fallbackSlug;
}

export async function getUserProfile() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return null;
  }

  try {
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    return profile;
  } catch (error) {
    console.error("Error getting user profile:", error);
    return null;
  }
}
