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
    // Check if profile exists (should be created by trigger)
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profile) {
      return profile;
    }

    // If profile doesn't exist yet, wait briefly for trigger to complete
    console.log("Profile not found, waiting for database trigger...");
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Try again
    const { data: retryProfile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (retryProfile) {
      return retryProfile;
    }

    throw new Error("Profile was not created by database trigger");
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

    if (!profile) return null;

    // Get the name from person table (SSOT)
    const { data: person } = await supabase
      .from("person")
      .select("name")
      .eq("profile_id", user.id)
      .single();

    // Return profile with name from person table
    return {
      ...profile,
      full_name:
        person?.name ||
        profile.full_name ||
        user.user_metadata?.full_name ||
        user.email?.split("@")[0] ||
        "User",
    };
  } catch (error) {
    console.error("Error getting user profile:", error);
    return null;
  }
}
