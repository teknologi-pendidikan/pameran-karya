import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import { getWorkById, canUserAccessWork } from "@/lib/database";
import { ensureUserProfile } from "@/lib/user-profile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import Link from "next/link";
import { ArrowLeftIcon, EditIcon } from "lucide-react";

interface WorkDetailPageProps {
  params: Promise<{ id: string }>;
}

interface WorkCategory {
  category_id?: string;
  category?: {
    category_id: string;
    label: string;
  };
}

interface WorkPerson {
  person_id: string;
  contribution_role?: string;
  ordering?: number;
  person: {
    person_id: string;
    name: string;
    slug: string;
    affiliation?: string;
    bio?: string;
    tag?: string;
  };
}

interface Asset {
  asset_id: string;
  work_id: string;
  type: "image" | "video" | "audio" | "document" | "link";
  file_url: string;
  thumbnail_url?: string;
  license?: string;
  created_at: string;
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
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
    const work = await getWorkById(id);

    if (!work) {
      return notFound();
    }

    // Check if user can access this work
    const canAccess = await canUserAccessWork(id, profile);
    if (!canAccess) {
      return notFound();
    }

    const getStatusBadgeVariant = (status: string) => {
      switch (status) {
        case "draft":
          return "secondary";
        case "final":
          return "default";
        case "archived":
          return "outline";
        default:
          return "secondary";
      }
    };

    const getStatusColor = (status: string) => {
      switch (status) {
        case "draft":
          return "bg-yellow-100 text-yellow-800";
        case "final":
          return "bg-green-100 text-green-800";
        case "archived":
          return "bg-gray-100 text-gray-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };

    return (
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        {/* Mobile Layout */}
        <div className="flex flex-col space-y-4 sm:hidden">
          {/* Back Button */}
          <Link href="/dashboard">
            <Button variant="outline" size="sm" className="w-fit">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>

          {/* Title */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
              {work.title}
            </h1>
            <p className="text-muted-foreground text-sm">Work Details</p>
          </div>

          {/* Action Button */}
          <Link href={`/dashboard/works/${work.work_id}/edit`}>
            <Button variant="outline" size="sm" className="w-full">
              <EditIcon className="h-4 w-4 mr-2" />
              Edit Work
            </Button>
          </Link>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">{work.title}</h1>
              <p className="text-muted-foreground">Work Details</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Link href={`/dashboard/works/${work.work_id}/edit`}>
              <Button variant="outline" size="sm">
                <EditIcon className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </Link>
          </div>
        </div>

        {/* Work Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Work Information</CardTitle>
                  <Badge
                    variant={getStatusBadgeVariant(work.status)}
                    className={getStatusColor(work.status)}
                  >
                    {work.status.toUpperCase()}
                  </Badge>
                </div>
                <CardDescription>
                  Created on{" "}
                  {format(
                    new Date(work.created_at),
                    "MMMM d, yyyy 'at' h:mm a"
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Title</h3>
                  <p>{work.title}</p>
                </div>

                {work.abstract && (
                  <div>
                    <h3 className="font-semibold mb-2">Abstract</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {work.abstract}
                    </p>
                  </div>
                )}

                <div>
                  <h3 className="font-semibold mb-2">Slug</h3>
                  <code className="text-sm bg-muted px-2 py-1 rounded">
                    {work.slug}
                  </code>
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            {work.work_category && work.work_category.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Categories</CardTitle>
                  <CardDescription>
                    Categories assigned to this work
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {work.work_category.map((wc: WorkCategory) => (
                      <Badge
                        key={wc.category?.category_id || wc.category_id}
                        variant="outline"
                      >
                        {wc.category?.label || "Unknown Category"}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Authors/Contributors */}
            {work.work_person && work.work_person.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Contributors</CardTitle>
                  <CardDescription>
                    People who contributed to this work
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {work.work_person
                      .sort(
                        (a: WorkPerson, b: WorkPerson) =>
                          (a.ordering || 0) - (b.ordering || 0)
                      )
                      .map((wp: WorkPerson) => (
                        <div
                          key={wp.person.person_id}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div>
                            <p className="font-medium">{wp.person.name}</p>
                            {wp.person.affiliation && (
                              <p className="text-sm text-muted-foreground">
                                {wp.person.affiliation}
                              </p>
                            )}
                          </div>
                          {wp.contribution_role && (
                            <Badge variant="secondary">
                              {wp.contribution_role}
                            </Badge>
                          )}
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Status:</span>
                  <Badge
                    variant={getStatusBadgeVariant(work.status)}
                    className={getStatusColor(work.status)}
                  >
                    {work.status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Created:</span>
                  <span className="text-sm">
                    {format(new Date(work.created_at), "MMM d, yyyy")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Categories:</span>
                  <span className="text-sm">
                    {work.work_category?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Contributors:</span>
                  <span className="text-sm">
                    {work.work_person?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Assets:</span>
                  <span className="text-sm">{work.asset?.length || 0}</span>
                </div>
              </CardContent>
            </Card>

            {/* Assets */}
            {work.asset && work.asset.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Assets</CardTitle>
                  <CardDescription>
                    Files and media attached to this work
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {work.asset.map((asset: Asset) => (
                      <div
                        key={asset.asset_id}
                        className="flex items-center justify-between p-2 border rounded"
                      >
                        <div>
                          <Badge variant="outline">{asset.type}</Badge>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <a
                            href={asset.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View
                          </a>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Database error:", error);
    return notFound();
  }
}
