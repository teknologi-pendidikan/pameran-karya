"use client";

import { useState } from "react";

interface CommentFormProps {
  pageSlug: string;
  onCommentSubmitted?: () => void;
}

export default function CommentForm({
  pageSlug,
  onCommentSubmitted,
}: CommentFormProps) {
  const [formData, setFormData] = useState({
    author_name: "",
    comment_body: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.author_name.trim() || !formData.comment_body.trim()) {
      setMessage({
        type: "error",
        text: "Please fill in all fields",
      });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const backofficeUrl =
        process.env.NEXT_PUBLIC_WEB_BACKOFFICE_URL ||
        "https://backoffice.pamerankarya.teknologipendidikan.or.id";

      const response = await fetch(`${backofficeUrl}/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          page_slug: pageSlug,
          author_name: formData.author_name.trim(),
          comment_body: formData.comment_body.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit comment");
      }

      // Success
      setMessage({
        type: "success",
        text:
          result.message ||
          "Comment submitted successfully! It will be visible after moderation.",
      });

      // Reset form
      setFormData({
        author_name: "",
        comment_body: "",
      });

      // Notify parent component if callback provided
      onCommentSubmitted?.();
    } catch (error) {
      console.error("Error submitting comment:", error);
      setMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "Failed to submit comment. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear message when user starts typing
    if (message) {
      setMessage(null);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
        <div className="w-5 h-5 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
          <svg
            className="w-3 h-3 text-blue-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        Leave a Comment
      </h3>

      {message && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-50 border border-green-200 text-green-800"
              : "bg-red-50 border border-red-200 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="author_name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Your Name *
          </label>
          <input
            type="text"
            id="author_name"
            name="author_name"
            value={formData.author_name}
            onChange={handleInputChange}
            required
            maxLength={100}
            disabled={isSubmitting}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label
            htmlFor="comment_body"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Your Comment *
          </label>
          <textarea
            id="comment_body"
            name="comment_body"
            value={formData.comment_body}
            onChange={handleInputChange}
            required
            maxLength={2000}
            rows={5}
            disabled={isSubmitting}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed resize-vertical"
            placeholder="Share your thoughts about this work..."
          />
          <div className="mt-1 text-sm text-gray-500 text-right">
            {formData.comment_body.length}/2000 characters
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-start">
            <svg
              className="w-5 h-5 text-blue-500 mr-2 mt-0.5 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <div className="text-sm text-gray-600">
              <p className="font-medium mb-1">Comment Guidelines</p>
              <ul className="space-y-1 text-xs">
                <li>• Comments will be reviewed before publication</li>
                <li>• Please be respectful and constructive</li>
                <li>• Avoid spam, links, or promotional content</li>
                <li>• Maximum 2000 characters per comment</li>
              </ul>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={
            isSubmitting ||
            !formData.author_name.trim() ||
            !formData.comment_body.trim()
          }
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
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
              Submitting...
            </>
          ) : (
            "Submit Comment"
          )}
        </button>
      </form>
    </div>
  );
}
