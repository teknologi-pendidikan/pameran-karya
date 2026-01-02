import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ensureUserProfile } from "@/lib/user-profile";
import AccountSetupForm from "./account-setup-form";

export default async function AccountSetup({
  searchParams,
}: {
  searchParams: { from?: string };
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/auth");
  }

  try {
    // Try to ensure user profile exists, but don't fail if it doesn't
    let profile;
    try {
      profile = await ensureUserProfile();
    } catch (profileError) {
      console.error("Error ensuring user profile:", profileError);
      // Create a minimal profile object if ensureUserProfile fails
      const { data: existingProfile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      profile = existingProfile || {
        id: user.id,
        full_name: user.user_metadata?.full_name || "",
        email: user.email || "",
      };
    }

    // Check if user has completed their setup (has bio or affiliation)
    const { data: personData } = await supabase
      .from("person")
      .select("bio, affiliation_id, tag")
      .eq("profile_id", user.id)
      .single();

    // If user has already completed setup, redirect to dashboard
    if (personData && (personData.bio || personData.affiliation_id)) {
      return redirect("/dashboard");
    }

    return (
      <AccountSetupForm
        user={user}
        profile={profile}
        fromWorkSubmission={searchParams.from === "work-submission"}
      />
    );
  } catch (error) {
    console.error("Error loading account setup:", error);
    return redirect("/auth/error");
  }
}
