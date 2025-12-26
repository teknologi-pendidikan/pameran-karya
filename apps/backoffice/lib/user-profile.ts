"use server";

import { createClient } from "@/lib/supabase/server";

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
      // Profile already exists
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
    return newProfile;
  } catch (error) {
    console.error("Error in ensureUserProfile:", error);
    throw error;
  }
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
