"use client";

import { useState } from "react";
import { createClient } from "@/lib/client";

interface Comment {
  id: string;
  page_slug: string;
  author_name: string;
  body: string;
  created_at: string;
  ip_hash?: string;
  moderated_by?: string;
  moderated_at?: string;
}

interface CommentsModerationTableProps {
  comments: Comment[];
  type: "pending" | "approved";
}

export default function CommentsModerationTable({
  comments: initialComments,
  type,
}: CommentsModerationTableProps) {
  const [comments, setComments] = useState(initialComments);
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set());
  const supabase = createClient();

  const handleApprove = async (commentId: string) => {
    if (processingIds.has(commentId)) return;

    setProcessingIds((prev) => new Set(prev).add(commentId));

    try {
      const { error } = await supabase
        .from("comments")
        .update({
          is_approved: true,
          moderated_at: new Date().toISOString(),
          moderated_by: (await supabase.auth.getUser()).data.user?.id,
        })
        .eq("id", commentId);

      if (error) {
        console.error("Error approving comment:", error);
        alert("Failed to approve comment. Please try again.");
        return;
      }

      // Remove from local state if it's pending
      if (type === "pending") {
        setComments((prev) =>
          prev.filter((comment) => comment.id !== commentId)
        );
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setProcessingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(commentId);
        return newSet;
      });
    }
  };

  const handleReject = async (commentId: string) => {
    if (processingIds.has(commentId)) return;

    if (!confirm("Are you sure you want to delete this comment permanently?")) {
      return;
    }

    setProcessingIds((prev) => new Set(prev).add(commentId));

    try {
      const { error } = await supabase
        .from("comments")
        .delete()
        .eq("id", commentId);

      if (error) {
        console.error("Error rejecting comment:", error);
        alert("Failed to delete comment. Please try again.");
        return;
      }

      // Remove from local state
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setProcessingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(commentId);
        return newSet;
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPageTitle = (pageSlug: string) => {
    // Extract meaningful title from slug
    if (pageSlug.startsWith("work/")) {
      return `Work: ${pageSlug.replace("work/", "").replace(/-/g, " ")}`;
    }
    return pageSlug.replace(/-/g, " ").replace(/\//g, " > ");
  };

  if (comments.length === 0) {
    return null;
  }

  return (
    <div className="bg-secondary border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-accent">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Author & Comment
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Page
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Date
              </th>
              {type === "approved" && (
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Moderated By
                </th>
              )}
              {type === "pending" && (
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  IP Hash
                </th>
              )}
              <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-secondary divide-y divide-border">
            {comments.map((comment) => (
              <tr key={comment.id} className="hover:bg-accent/50">
                <td className="px-6 py-4">
                  <div className="max-w-xs">
                    <div className="font-medium text-foreground mb-1">
                      {comment.author_name}
                    </div>
                    <div className="text-sm text-muted-foreground break-all">
                      {comment.body.length > 100
                        ? `${comment.body.substring(0, 100)}...`
                        : comment.body}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-foreground font-medium">
                    {getPageTitle(comment.page_slug)}
                  </div>
                  <div className="text-xs text-muted-foreground font-mono">
                    {comment.page_slug}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  {formatDate(comment.created_at)}
                </td>
                {type === "approved" && (
                  <td className="px-6 py-4">
                    <div className="text-sm text-foreground">
                      {comment.moderated_by ? "System" : "Unknown"}
                    </div>
                    {comment.moderated_at && (
                      <div className="text-xs text-muted-foreground">
                        {formatDate(comment.moderated_at)}
                      </div>
                    )}
                  </td>
                )}
                {type === "pending" && (
                  <td className="px-6 py-4 text-xs text-muted-foreground font-mono">
                    {comment.ip_hash?.substring(0, 12)}...
                  </td>
                )}
                <td className="px-6 py-4 text-right">
                  {type === "pending" ? (
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleApprove(comment.id)}
                        disabled={processingIds.has(comment.id)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium text-white bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {processingIds.has(comment.id) ? (
                          <svg
                            className="animate-spin -ml-1 mr-1 h-3 w-3"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        ) : (
                          <svg
                            className="w-3 h-3 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(comment.id)}
                        disabled={processingIds.has(comment.id)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium text-white bg-destructive hover:bg-destructive/90 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {processingIds.has(comment.id) ? (
                          <svg
                            className="animate-spin -ml-1 mr-1 h-3 w-3"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        ) : (
                          <svg
                            className="w-3 h-3 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"
                              clipRule="evenodd"
                            />
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 012 0v4a1 1 0 11-2 0V7zM8 15a1 1 0 112 0 1 1 0 01-2 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                        Delete
                      </button>
                    </div>
                  ) : (
                    <div className="text-xs text-primary font-medium">
                      Approved
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
