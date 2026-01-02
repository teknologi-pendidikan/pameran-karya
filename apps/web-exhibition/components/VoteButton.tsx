"use client";

import Link from "next/link";

interface VoteButtonProps {
  workId: string;
  workTitle: string;
  workSlug: string;
  authors: string;
}

export default function VoteButton({
  workId,
  workTitle,
  workSlug,
  authors,
}: VoteButtonProps) {
  const handleVote = () => {
    // Create encoded work data for security
    const workData = {
      workId,
      title: workTitle,
      slug: workSlug,
      authors,
      timestamp: Date.now(), // Add timestamp for additional security
    };

    // Base64 encode the work data
    const encodedData = btoa(JSON.stringify(workData));

    // Create the voting URL with encoded data
    const backofficeUrl =
      process.env.NEXT_PUBLIC_BACKOFFICE_URL || "http://localhost:3001";
    const voteUrl = `${backofficeUrl}/vote?data=${encodeURIComponent(encodedData)}`;

    // Open in new tab
    window.open(voteUrl, "_blank");
  };

  return (
    <button
      onClick={handleVote}
      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
    >
      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
      Vote for This Work
    </button>
  );
}
