import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import { getWorkById, getCategories, canUserAccessWork } from "@/lib/database";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeftIcon, EyeIcon } from "lucide-react";
import { WorkEditForm } from "@/components/work-edit-form";
import { ensureUserProfile } from "@/lib/user-profile";

interface WorkEditPageProps {
  params: Promise<{ id: string }>;
}

export default async function WorkEditPage({ params }: WorkEditPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/auth");
  }

  // Get user profile
  const profile = await ensureUserProfile();

  try {
    const [work, categories] = await Promise.all([
      getWorkById(id),
      getCategories(),
    ]);

    if (!work) {
      return notFound();
    }

    // Check if user can access this work
    const canAccess = await canUserAccessWork(id, profile);
    if (!canAccess) {
      return notFound();
    }

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Edit Work</h1>
              <p className="text-muted-foreground">{work.title}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Link href={`/dashboard/works/${id}`}>
              <Button variant="outline" size="sm">
                <EyeIcon className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </Link>
          </div>
        </div>

        {/* Edit Form */}
        <WorkEditForm
          work={work}
          categories={categories}
          userProfile={profile}
        />
      </div>
    );
  } catch (error) {
    console.error("Database error:", error);
    return notFound();
  }
}
