"use client";

import { useState } from "react";
import CommentsList from "./CommentsList";
import CommentForm from "./CommentForm";

interface CommentsSectionProps {
  pageSlug: string;
}

export default function CommentsSection({ pageSlug }: CommentsSectionProps) {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCommentSubmitted = () => {
    // Refresh the comments list after a successful submission
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="space-y-8">
      <CommentForm
        pageSlug={pageSlug}
        onCommentSubmitted={handleCommentSubmitted}
      />
      <div key={refreshKey}>
        <CommentsList pageSlug={pageSlug} />
      </div>
    </div>
  );
}
