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
        <div className="px-8 py-8">
          <div className="flex items-center justify-between">
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
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-12">
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
