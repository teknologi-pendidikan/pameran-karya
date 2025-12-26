import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getCategories } from "@/lib/database";
import { WorkSubmissionForm } from "@/components/work-submission-form";
import { ensureUserProfile } from "@/lib/user-profile";

export default async function NewWorkPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/auth");
  }

  try {
    const categories = await getCategories();

    // Ensure user has a profile
    const userProfile = await ensureUserProfile();

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Submit New Work</h1>
          <p className="text-muted-foreground">
            Create a new academic work submission
          </p>
        </div>

        <WorkSubmissionForm categories={categories} userProfile={userProfile} />
      </div>
    );
  } catch (error) {
    console.error("Database error:", error);
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Error Loading Form</h2>
          <p className="text-muted-foreground">
            There was an error loading the submission form. Please try again
            later.
          </p>
        </div>
      </div>
    );
  }
}
