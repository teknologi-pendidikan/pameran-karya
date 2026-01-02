"use client";

export default function BackButton() {
  const handleBack = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  return (
    <button
      onClick={handleBack}
      className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 hover:underline hover:cursor-pointer"
    >
      <svg
        className="w-4 h-4 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
      Back
    </button>
  );
}
