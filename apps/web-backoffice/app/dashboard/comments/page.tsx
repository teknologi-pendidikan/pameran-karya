import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/server";
import { createClient } from "@/lib/client";
import CommentsModerationTable from "../../../components/CommentsModerationTable";

export default async function CommentsPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/auth/signin");
  }

  // Check if user has admin or moderator access
  const supabase = createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("access_level")
    .eq("id", session.user.id)
    .single();

  if (
    !profile ||
    !["operations", "serviceaccount"].includes(profile.access_level)
  ) {
    redirect("/dashboard");
  }

  // Fetch pending comments
  const { data: pendingComments, error: pendingError } = await supabase
    .from("comments")
    .select(
      `
      id,
      page_slug,
      author_name,
      body,
      created_at,
      ip_hash
    `
    )
    .eq("is_approved", false)
    .order("created_at", { ascending: false });

  // Fetch recent approved comments
  const { data: approvedComments, error: approvedError } = await supabase
    .from("comments")
    .select(
      `
      id,
      page_slug,
      author_name,
      body,
      created_at,
      moderated_by,
      moderated_at
    `
    )
    .eq("is_approved", true)
    .order("moderated_at", { ascending: false })
    .limit(20);

  if (pendingError || approvedError) {
    console.error("Error fetching comments:", {
      pendingError: pendingError?.message || pendingError,
      approvedError: approvedError?.message || approvedError,
    });

    // Only show error UI for actual errors, not empty results
    if (pendingError?.message || approvedError?.message) {
      return (
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Comment Moderation
            </h1>
            <p className="text-muted-foreground">
              Review and moderate user comments before they appear on the public
              site.
            </p>
          </div>

          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <svg
                className="w-6 h-6 text-destructive mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L9.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L10.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <h2 className="text-lg font-semibold text-destructive">
                Error Loading Comments
              </h2>
            </div>
            <div className="text-destructive/90">
              <p>
                There was an error loading the comments. Please try refreshing
                the page.
              </p>
              {pendingError?.message && (
                <p className="mt-2 text-sm">Pending: {pendingError.message}</p>
              )}
              {approvedError?.message && (
                <p className="mt-2 text-sm">
                  Approved: {approvedError.message}
                </p>
              )}
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Comment Moderation</h1>
        <p className="text-muted-foreground">
          Review and moderate user comments before they appear on the public
          site.
        </p>
      </div>

      <div className="space-y-6">
        {/* Pending Comments */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center">
              <div className="w-6 h-6 bg-orange-500/10 rounded-lg flex items-center justify-center mr-3">
                <svg
                  className="w-4 h-4 text-orange-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              Pending Review
            </h2>
            <div className="bg-orange-500/10 text-orange-500 px-3 py-1 rounded-full text-sm font-medium">
              {pendingComments?.length || 0} pending
            </div>
          </div>

          {!pendingComments || pendingComments.length === 0 ? (
            <div className="bg-secondary border p-8 text-center">
              <div className="text-muted-foreground mb-2">
                <svg
                  className="w-12 h-12 mx-auto"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-muted-foreground">
                No comments awaiting moderation
              </p>
            </div>
          ) : (
            <CommentsModerationTable
              comments={pendingComments}
              type="pending"
            />
          )}
        </div>

        {/* Recently Approved */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <div className="w-6 h-6 bg-primary/10 flex items-center justify-center mr-3">
              <svg
                className="w-4 h-4 text-primary"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            Recently Approved
          </h2>

          {!approvedComments || approvedComments.length === 0 ? (
            <div className="bg-secondary border p-8 text-center">
              <div className="text-muted-foreground mb-2">
                <svg
                  className="w-12 h-12 mx-auto"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-muted-foreground">No approved comments yet</p>
            </div>
          ) : (
            <CommentsModerationTable
              comments={approvedComments || []}
              type="approved"
            />
          )}
        </div>
      </div>
    </div>
  );
}
