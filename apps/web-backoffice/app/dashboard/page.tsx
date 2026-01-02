import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getWorks, getCategories } from "@/lib/database";
import { WorksList } from "@/components/works-list";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusIcon, AwardIcon } from "lucide-react";
import Link from "next/link";
import { ensureUserProfile } from "@/lib/user-profile";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/auth");
  }

  // Ensure user has a profile with participant access level
  let profile;
  try {
    profile = await ensureUserProfile();
  } catch (error) {
    console.error("Error ensuring user profile:", error);
    // Continue without profile if there's an error
    profile = null;
  }

  try {
    const [works, categories] = await Promise.all([
      getWorks(profile),
      getCategories(),
    ]);

    return (
      <>
        <div className="space-y-4 md:space-y-6">
          {/* Header */}
          <div className="flex flex-col space-y-3 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Welcome back, {profile?.full_name || user.email}
              </p>
            </div>
            {/* Desktop Action Buttons - Hidden on mobile */}
            <div className="hidden sm:flex sm:gap-3">
              <Link href="/dashboard/certificate">
                <Button variant="outline">
                  <AwardIcon className="w-4 h-4 mr-2" />
                  Generate Certificate
                </Button>
              </Link>
              <Link href="/dashboard/works/new">
                <Button>
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Submit New Work
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile CTA Buttons - Full width, shown only on mobile */}
          <div className="sm:hidden space-y-2">
            <Link href="/dashboard/certificate" className="block">
              <Button
                variant="outline"
                className="w-full h-12 text-base font-semibold"
              >
                <AwardIcon className="w-5 h-5 mr-2" />
                Generate Certificate
              </Button>
            </Link>
            <Link href="/dashboard/works/new" className="block">
              <Button className="w-full h-12 text-base font-semibold">
                <PlusIcon className="w-5 h-5 mr-2" />
                Submit New Work
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
            <Card className="col-span-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">
                  Total Works
                </CardTitle>
                <div className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground">
                  📄
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-lg sm:text-2xl font-bold">
                  {works.length}
                </div>
                <p className="text-xs text-muted-foreground">
                  All submitted works
                </p>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">
                  Completed Works
                </CardTitle>
                <div className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground">
                  ✅
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-lg sm:text-2xl font-bold">
                  {
                    works.filter(
                      (w) => w.status === "ready" || w.status === "final"
                    ).length
                  }
                </div>
                <p className="text-xs text-muted-foreground">
                  Ready & Final works
                </p>
              </CardContent>
            </Card>

            <Card className="col-span-2 lg:col-span-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">
                  Draft Works
                </CardTitle>
                <div className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground">
                  📝
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-lg sm:text-2xl font-bold">
                  {works.filter((w) => w.status === "draft").length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Works in progress
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Works List */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg md:text-xl">Recent Works</CardTitle>
              <CardDescription className="text-sm">
                All submitted works in the system
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <WorksList works={works} />
            </CardContent>
          </Card>
        </div>
      </>
    );
  } catch (error) {
    console.error("Database error:", error);
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
            <CardDescription>
              There was an error loading the dashboard. Please try again later.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }
}
