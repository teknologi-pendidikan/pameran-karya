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
import { PlusIcon } from "lucide-react";
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
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {profile?.full_name || user.email}
            </p>
          </div>
          <Link href="/dashboard/works/new">
            <Button>
              <PlusIcon className="w-4 h-4 mr-2" />
              Submit New Work
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Works</CardTitle>
              <div className="h-4 w-4 text-muted-foreground">📄</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{works.length}</div>
              <p className="text-xs text-muted-foreground">
                All submitted works
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Draft Works</CardTitle>
              <div className="h-4 w-4 text-muted-foreground">📝</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {works.filter((w) => w.status === "draft").length}
              </div>
              <p className="text-xs text-muted-foreground">Works in progress</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <div className="h-4 w-4 text-muted-foreground">🏷️</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{categories.length}</div>
              <p className="text-xs text-muted-foreground">
                Available categories
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Works List */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Works</CardTitle>
            <CardDescription>All submitted works in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <WorksList works={works} categories={categories} />
          </CardContent>
        </Card>
      </div>
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
