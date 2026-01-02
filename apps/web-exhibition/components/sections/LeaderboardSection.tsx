import Link from "next/link";

export default function LeaderboardSection() {
  return (
    <section className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6">
            <svg
              className="w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 15.39l-3.76 2.27.99-4.28L5.71 9.69l4.38-.38L12 5.1l1.91 4.21 4.38.38-3.52 3.69.99 4.28L12 15.39z" />
            </svg>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            🏆 Vote Leaderboard
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Lihat karya mana yang memimpin dalam voting komunitas! Ranking
            diperbarui secara real-time.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            {/* Embedded Iframe */}
            <div className="relative">
              <iframe
                src={`${process.env.NEXT_PUBLIC_BACKOFFICE_URL || "http://localhost:3001"}/leaderboard`}
                className="w-full h-[500px] md:h-[600px]"
                title="Vote Leaderboard Preview"
                frameBorder="0"
                style={{ border: "none" }}
              />

              {/* Overlay with link to full page */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none">
                <div className="absolute bottom-6 left-6 right-6 flex justify-center pointer-events-auto">
                  <Link
                    href="/leaderboard"
                    className="inline-flex items-center px-6 py-3 bg-white/95 backdrop-blur-sm text-gray-900 font-semibold rounded-xl shadow-lg hover:bg-white hover:shadow-xl transition-all duration-200 border border-gray-200"
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
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-2M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    View Full Leaderboard
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center border border-white/50 shadow-sm">
            <div className="text-3xl mb-2">🗳️</div>
            <h3 className="font-semibold text-gray-900 mb-1">One Vote Each</h3>
            <p className="text-sm text-gray-600">
              Setiap orang hanya bisa vote sekali
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center border border-white/50 shadow-sm">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-semibold text-gray-900 mb-1">
              Real-time Updates
            </h3>
            <p className="text-sm text-gray-600">
              Hasil voting diperbarui langsung
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center border border-white/50 shadow-sm">
            <div className="text-3xl mb-2">🏅</div>
            <h3 className="font-semibold text-gray-900 mb-1">
              Fair Competition
            </h3>
            <p className="text-sm text-gray-600">
              Semua karya memiliki kesempatan sama
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Belum vote? Suaramu sangat berharga!
          </p>
          <Link
            href="/explore"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-pink-700 transform hover:-translate-y-1 transition-all duration-200"
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
            Jelajahi Karya & Vote Sekarang
          </Link>
        </div>
      </div>
    </section>
  );
}
