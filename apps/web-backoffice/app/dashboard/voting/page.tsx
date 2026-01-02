import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function VotingResultsPage() {
  const supabase = await createClient();

  // Check if user is authenticated and is admin
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/auth/login");
  }

  // Get voting results
  const { data: voteResults, error: voteError } =
    await supabase.rpc("get_vote_counts");

  const { count: totalVoters } = await supabase
    .from("votes")
    .select("*", { count: "exact", head: true });

  if (voteError) {
    console.error("Error fetching vote results:", voteError);
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Voting Results
        </h1>
        <p className="text-gray-600">
          Real-time voting results for all works in the exhibition
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Total Voters
          </h3>
          <p className="text-3xl font-bold text-blue-600">{totalVoters || 0}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Total Works
          </h3>
          <p className="text-3xl font-bold text-green-600">
            {voteResults?.length || 0}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Leading Work
          </h3>
          <p className="text-sm font-medium text-purple-600">
            {voteResults && voteResults.length > 0
              ? `${voteResults[0].work_title} (${voteResults[0].vote_count} votes)`
              : "No votes yet"}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Vote Rankings</h2>
        </div>

        {voteResults && voteResults.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Work Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Votes
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Percentage
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {voteResults.map(
                  (
                    result: {
                      work_id: string;
                      work_title: string;
                      work_slug: string;
                      vote_count: number;
                    },
                    index: number
                  ) => {
                    const percentage = totalVoters
                      ? Math.round(
                          (Number(result.vote_count) / totalVoters) * 100
                        )
                      : 0;

                    return (
                      <tr key={result.work_id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span
                              className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                                index === 0
                                  ? "bg-yellow-100 text-yellow-800"
                                  : index === 1
                                    ? "bg-gray-100 text-gray-800"
                                    : index === 2
                                      ? "bg-orange-100 text-orange-800"
                                      : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {index + 1}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {result.work_title}
                          </div>
                          <div className="text-sm text-gray-500">
                            /{result.work_slug}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-2xl font-bold text-gray-900">
                            {result.vote_count}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-900">
                              {percentage}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <a
                            href={`/work/${result.work_slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-900"
                          >
                            View Work
                          </a>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-6 py-12 text-center">
            <svg
              className="w-12 h-12 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Votes Yet
            </h3>
            <p className="text-gray-500">
              Voting results will appear here as people start voting.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export const metadata = {
  title: "Voting Results - Pameran Karya",
  description: "View real-time voting results for the exhibition",
};
