import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ensureUserProfile } from "@/lib/user-profile";
import CertificateGenerator from "@/components/certificate-generator";

export default async function CertificatePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/auth");
  }

  // Ensure user has a profile
  let profile;
  try {
    profile = await ensureUserProfile();
  } catch (error) {
    console.error("Error ensuring user profile:", error);
    return redirect("/auth");
  }

  // Check if user has any works (using the proper relationship via work_person -> person -> profile_id)
  const { data: works, error } = await supabase
    .from("work")
    .select(
      `
      work_id,
      title,
      status,
      work_person!inner(
        person!inner(profile_id)
      )
    `
    )
    .eq("work_person.person.profile_id", user.id)
    .in("status", ["ready", "final"]); // These are the "published" statuses based on schema

  if (error) {
    console.error("Error fetching works:", error);
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-red-600">Error loading works data</p>
      </div>
    );
  }

  if (!works || works.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px] flex-col space-y-4">
        <h1 className="text-2xl font-bold">Certificate Generator</h1>
        <p className="text-muted-foreground text-center max-w-md">
          You need to have at least one ready or final work to generate a
          certificate. Please submit and complete a work first.
        </p>
      </div>
    );
  }

  return (
    <CertificateGenerator
      profile={profile}
      worksCount={works.length}
      works={works}
    />
  );
}
