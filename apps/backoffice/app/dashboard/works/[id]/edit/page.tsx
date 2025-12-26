import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import { getWorkById } from "@/lib/database";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeftIcon, SaveIcon, EyeIcon } from "lucide-react";

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

  try {
    const work = await getWorkById(id);

    if (!work) {
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
            <Button size="sm">
              <SaveIcon className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Success Message */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="text-green-800 font-semibold mb-2">
            🎉 Work Created Successfully!
          </h3>
          <p className="text-green-700 text-sm">
            Your work has been submitted and you've been set as the first
            author. You can now add more details, contributors, or assets.
          </p>
        </div>

        {/* Current Work Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Current Work Status
              <Badge variant="outline">{work.status.toUpperCase()}</Badge>
            </CardTitle>
            <CardDescription>
              Summary of what&apos;s been set up for your work
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Title:</span>
                <span className="text-sm text-muted-foreground">
                  {work.title}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Categories:</span>
                <span className="text-sm text-muted-foreground">
                  {work.work_category?.length || 0} assigned
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Authors:</span>
                <span className="text-sm text-muted-foreground">
                  {work.work_person?.length || 0} (You as first author)
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Assets:</span>
                <span className="text-sm text-muted-foreground">
                  {work.asset?.length || 0} attached
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle>What You Can Do Next</CardTitle>
            <CardDescription>
              Suggested actions to complete your work submission
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">
                  ✏️ Edit Basic Information
                </h4>
                <p className="text-sm text-muted-foreground">
                  Update title, abstract, or change status to final
                </p>
                <Button variant="outline" size="sm" disabled>
                  Edit Info (Coming Soon)
                </Button>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">👥 Add Co-Authors</h4>
                <p className="text-sm text-muted-foreground">
                  Add collaborators and contributors to your work
                </p>
                <Button variant="outline" size="sm" disabled>
                  Add Authors (Coming Soon)
                </Button>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">📎 Manage Assets</h4>
                <p className="text-sm text-muted-foreground">
                  Add more files, images, or links related to your work
                </p>
                <Button variant="outline" size="sm" disabled>
                  Add Assets (Coming Soon)
                </Button>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">🏷️ Update Categories</h4>
                <p className="text-sm text-muted-foreground">
                  Modify or add more relevant categories
                </p>
                <Button variant="outline" size="sm" disabled>
                  Edit Categories (Coming Soon)
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Details Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Current Work Details</CardTitle>
            <CardDescription>
              Preview of your work as it appears to others
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Abstract</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {work.abstract}
              </p>
            </div>

            {work.work_category && work.work_category.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {work.work_category.map((wc: any) => (
                    <Badge
                      key={wc.category?.category_id || wc.category_id}
                      variant="outline"
                    >
                      {wc.category?.label || "Unknown Category"}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {work.work_person && work.work_person.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Authors</h4>
                <div className="space-y-2">
                  {work.work_person
                    .sort(
                      (a: any, b: any) => (a.ordering || 0) - (b.ordering || 0)
                    )
                    .map((wp: any) => (
                      <div
                        key={wp.person.person_id}
                        className="flex items-center justify-between text-sm"
                      >
                        <div>
                          <span className="font-medium">{wp.person.name}</span>
                          {wp.person.affiliation && (
                            <span className="text-muted-foreground ml-2">
                              ({wp.person.affiliation})
                            </span>
                          )}
                        </div>
                        {wp.contribution_role && (
                          <Badge variant="secondary" className="text-xs">
                            {wp.contribution_role}
                          </Badge>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}

            {work.asset && work.asset.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Assets</h4>
                <div className="space-y-2">
                  {work.asset.map((asset: any) => (
                    <div
                      key={asset.asset_id}
                      className="flex items-center justify-between p-2 border rounded text-sm"
                    >
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{asset.type}</Badge>
                        <span className="text-muted-foreground truncate max-w-xs">
                          {asset.file_url}
                        </span>
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
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  } catch (error) {
    console.error("Database error:", error);
    return notFound();
  }
}
