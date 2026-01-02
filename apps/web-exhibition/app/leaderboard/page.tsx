import Link from "next/link";

export default function LeaderboardPage() {
  const backofficeUrl =
    process.env.NEXT_PUBLIC_BACKOFFICE_URL || "http://localhost:3001";

  return (
    <div className="min-h-screen container mx-auto px-4 py-8 max-w-7xl">
      <div className="">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Link
              href="/"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
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
              Back to Exhibition
            </Link>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            🏆 Vote Leaderboard
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            See which works are leading in the community vote! Rankings update
            in real-time as votes are cast.
          </p>
        </div>

        {/* Leaderboard Iframe */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <iframe
            src={`${backofficeUrl}/leaderboard`}
            className="w-full h-screen min-h-[800px]"
            title="Vote Leaderboard"
            frameBorder="0"
            allowFullScreen
            style={{
              border: "none",
              borderRadius: "1rem",
            }}
          />
        </div>

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8 border border-purple-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Havent voted yet?
            </h2>
            <p className="text-gray-600 mb-6">
              Your voice matters! Browse the exhibition and cast your vote for
              your favorite work.
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              Browse Exhibition
            </Link>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Real-time Updates
            </h3>
            <p className="text-sm text-gray-600">
              Leaderboard refreshes automatically every 30 seconds
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              One Vote Per Person
            </h3>
            <p className="text-sm text-gray-600">
              Each participant can vote for one work only
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Fair & Transparent
            </h3>
            <p className="text-sm text-gray-600">
              All votes are counted equally and displayed publicly
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Vote Leaderboard - Pameran Karya Teknologi Pendidikan",
  description:
    "Real-time voting leaderboard showing the most popular works in the exhibition",
  openGraph: {
    title: "Vote Leaderboard - Pameran Karya",
    description: "See which works are leading in the community vote!",
  },
};
