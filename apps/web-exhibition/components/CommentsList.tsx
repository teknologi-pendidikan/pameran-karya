"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

interface Comment {
  id: string;
  author_name: string;
  body: string;
  created_at: string;
}

interface CommentsListProps {
  pageSlug: string;
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

export default function CommentsList({ pageSlug }: CommentsListProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchComments() {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from("comments")
          .select("id, author_name, body, created_at")
          .eq("page_slug", pageSlug)
          .eq("is_approved", true)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching comments:", error);
          setError("Failed to load comments");
          return;
        }

        setComments(data || []);
      } catch (err) {
        console.error("Unexpected error:", err);
        setError("Failed to load comments");
      } finally {
        setLoading(false);
      }
    }

    fetchComments();
  }, [pageSlug]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <div className="w-5 h-5 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
            <svg
              className="w-3 h-3 text-purple-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          Comments
        </h3>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <div className="w-5 h-5 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
            <svg
              className="w-3 h-3 text-purple-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          Comments
        </h3>
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
        <div className="w-5 h-5 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
          <svg
            className="w-3 h-3 text-purple-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        Comments ({comments.length})
      </h3>

      {comments.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No comments yet. Be the first to share your thoughts!
        </p>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="border-l-4 border-purple-100 pl-6 pb-6 last:pb-0"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">
                  {comment.author_name}
                </h4>
                <time
                  className="text-sm text-gray-500"
                  dateTime={comment.created_at}
                >
                  {new Date(comment.created_at).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>
              </div>
              <div className="text-gray-700 whitespace-pre-wrap">
                {comment.body}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
