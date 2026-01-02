"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

interface VoteResult {
  work_id: string;
  work_title: string;
  work_slug: string;
  vote_count: string;
}

export default function LeaderboardPage() {
  const [topResults, setTopResults] = useState<VoteResult[]>([]);
  const [totalVoters, setTotalVoters] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();

      // Get voting results using the database function
      const { data: voteResults, error: voteError } =
        await supabase.rpc("get_vote_counts");

      const { count: voterCount, error: voterCountError } = await supabase
        .from("votes")
        .select("*", { count: "exact", head: true });

      if (voteError) {
        console.error("Error fetching vote results:", voteError);
      }

      if (voterCountError) {
        console.error("Error fetching voter count:", voterCountError);
      }

      // Get top 10 results for leaderboard
      setTopResults(voteResults?.slice(0, 10) || []);
      setTotalVoters(voterCount || 0);
      setLoading(false);
    };

    fetchData();

    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading leaderboard...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white p-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-2">🏆 Vote Leaderboard</h1>
          <p className="text-blue-100 mb-4">Real-time voting results</p>
          <div className="flex justify-center gap-8 text-sm">
            <div className="bg-white/20 rounded-lg px-4 py-2">
              <span className="font-semibold">{totalVoters || 0}</span> Total
              Votes
            </div>
            <div className="bg-white/20 rounded-lg px-4 py-2">
              <span className="font-semibold">{topResults.length}</span> Works
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 -mt-4">
        {topResults.length > 0 ? (
          <div className="space-y-3">
            {topResults.map((result, index) => {
              const percentage = totalVoters
                ? Math.round((Number(result.vote_count) / totalVoters) * 100)
                : 0;

              return (
                <div
                  key={result.work_id}
                  className={`transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-lg bg-white rounded-xl shadow-sm border p-6 ${
                    index === 0
                      ? "border-yellow-300 bg-gradient-to-r from-yellow-50 to-amber-50"
                      : index === 1
                        ? "border-gray-300 bg-gradient-to-r from-gray-50 to-slate-50"
                        : index === 2
                          ? "border-orange-300 bg-gradient-to-r from-orange-50 to-red-50"
                          : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex items-center justify-center w-12 h-12 rounded-full text-lg font-bold ${
                          index === 0
                            ? "bg-yellow-500 text-white"
                            : index === 1
                              ? "bg-gray-500 text-white"
                              : index === 2
                                ? "bg-orange-500 text-white"
                                : "bg-blue-500 text-white"
                        }`}
                      >
                        {index === 0
                          ? "🥇"
                          : index === 1
                            ? "🥈"
                            : index === 2
                              ? "🥉"
                              : index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                          {result.work_title}
                        </h3>
                        <p className="text-gray-500 text-sm">
                          /{result.work_slug}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        {result.vote_count}
                      </div>
                      <div className="text-sm text-gray-500">
                        {percentage}% of votes
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">
                        Vote Progress
                      </span>
                      <span className="text-xs font-medium text-gray-700">
                        {percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          index === 0
                            ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                            : index === 1
                              ? "bg-gradient-to-r from-gray-400 to-gray-600"
                              : index === 2
                                ? "bg-gradient-to-r from-orange-400 to-orange-600"
                                : "bg-gradient-to-r from-blue-400 to-blue-600"
                        }`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
            <div className="text-6xl mb-4">🗳️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Votes Yet
            </h3>
            <p className="text-gray-500">
              Voting results will appear here as people start voting for their
              favorite works.
            </p>
          </div>
        )}
      </div>

      <div className="text-center py-6 text-gray-500 text-sm">
        <p>Updated in real-time • Pameran Karya Teknologi Pendidikan</p>
      </div>
    </div>
  );
}
