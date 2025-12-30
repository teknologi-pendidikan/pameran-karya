import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import { getWorkById, getCategories, canUserAccessWork } from "@/lib/database";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeftIcon, EyeIcon, TrashIcon } from "lucide-react";
import { WorkEditForm } from "@/components/work-edit-form";
import { ensureUserProfile } from "@/lib/user-profile";
import { DeleteWorkButton } from "@/components/delete-work-button";

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

  let work, categories;
  try {
    [work, categories] = await Promise.all([getWorkById(id), getCategories()]);
  } catch (error) {
    console.error("Database error:", error);
    return notFound();
  }

  if (!work) {
    return notFound();
  }

  // Check if user can access this work
  const canAccess = await canUserAccessWork(id, profile);
  if (!canAccess) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <div className="bg-base-200 border-b-2">
        <div className="px-4 sm:px-8 py-4 sm:py-8">
          {/* Mobile Layout */}
          <div className="flex flex-col space-y-4 sm:hidden">
            {/* Back Button */}
            <div className="flex justify-between items-center">
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  size="sm"
                  className="!rounded-none px-4 py-2 text-sm font-medium border-2"
                >
                  <ArrowLeftIcon className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-2xl font-bold text-base-content mb-2">
                Edit Work
              </h1>
              <p className="text-base-content/70 text-sm line-clamp-2">
                {work.title}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-2">
              <Link href={`/dashboard/works/${id}`}>
                <Button
                  variant="outline"
                  className="w-full !rounded-none px-4 py-3 text-base font-medium border-2"
                >
                  <EyeIcon className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </Link>

              {/* Delete Button - Only for operations users */}
              {profile?.access_level === "operations" && (
                <div className="w-full">
                  <DeleteWorkButton
                    workId={id}
                    workTitle={work.title}
                    isMobile
                  />
                </div>
              )}
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  size="lg"
                  className="!rounded-none px-6 py-3 text-base font-medium border-2"
                >
                  <ArrowLeftIcon className="h-5 w-5 mr-3" />
                  Dashboard
                </Button>
              </Link>
              <div className="w-px h-12 bg-base-content/20"></div>
              <div>
                <h1 className="text-4xl font-bold text-base-content mb-2">
                  Edit Work
                </h1>
                <p className="text-base-content/70 text-lg max-w-2xl">
                  {work.title}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link href={`/dashboard/works/${id}`}>
                <Button
                  variant="outline"
                  size="lg"
                  className="!rounded-none px-6 py-3 text-base font-medium border-2"
                >
                  <EyeIcon className="h-5 w-5 mr-3" />
                  View Details
                </Button>
              </Link>

              {/* Delete Button - Only for operations users */}
              {profile?.access_level === "operations" && (
                <DeleteWorkButton workId={id} workTitle={work.title} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-8 py-6 sm:py-12">
        <div className="w-full">
          <WorkEditForm
            work={work}
            categories={categories}
            userProfile={profile}
          />
        </div>
      </div>
    </div>
  );
}
