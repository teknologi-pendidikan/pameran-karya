import { getUserProfile } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

interface DashboardStats {
  totalWorks: number;
  totalPeople: number;
  totalCategories: number;
  recentWorks: any[];
}

async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = await createSupabaseServerClient();

  // Get counts
  const [worksCount, peopleCount, categoriesCount, recentWorks] =
    await Promise.all([
      supabase.from("work").select("*", { count: "exact", head: true }),
      supabase.from("person").select("*", { count: "exact", head: true }),
      supabase.from("category").select("*", { count: "exact", head: true }),
      supabase
        .from("work")
        .select(
          `
        *,
        work_person(
          person(name)
        )
      `
        )
        .order("created_at", { ascending: false })
        .limit(5),
    ]);

  return {
    totalWorks: worksCount.count || 0,
    totalPeople: peopleCount.count || 0,
    totalCategories: categoriesCount.count || 0,
    recentWorks: recentWorks.data || [],
  };
}

export default async function DashboardPage() {
  const user = await getUserProfile();

  if (!user) {
    redirect("/auth");
  }

  const stats = await getDashboardStats();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-base-content/60 mt-1">
            Welcome back, {user.email}
          </p>
        </div>
        <div className="badge badge-outline">
          {user.role === "admin" ? "Administrator" : "User"}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="stat">
              <div className="stat-title">Total Works</div>
              <div className="stat-value text-primary">{stats.totalWorks}</div>
              <div className="stat-desc">Creative submissions</div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="stat">
              <div className="stat-title">Contributors</div>
              <div className="stat-value text-secondary">
                {stats.totalPeople}
              </div>
              <div className="stat-desc">Artists & creators</div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="stat">
              <div className="stat-title">Categories</div>
              <div className="stat-value text-accent">
                {stats.totalCategories}
              </div>
              <div className="stat-desc">Work classifications</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/submit" className="btn btn-primary btn-outline">
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Submit New Work
            </Link>

            {user.role === "admin" && (
              <>
                <Link
                  href="/admin/works"
                  className="btn btn-secondary btn-outline"
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Manage Works
                </Link>

                <Link
                  href="/admin/people"
                  className="btn btn-accent btn-outline"
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
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                    />
                  </svg>
                  Manage People
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Recent Works */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-4">Recent Works</h2>
          {stats.recentWorks.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author(s)</th>
                    <th>Status</th>
                    <th>Created</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentWorks.map((work) => (
                    <tr key={work.work_id}>
                      <td>
                        <div className="font-bold">{work.title}</div>
                        {work.abstract && (
                          <div className="text-sm opacity-50 truncate max-w-xs">
                            {work.abstract}
                          </div>
                        )}
                      </td>
                      <td>
                        {work.work_person?.length > 0 ? (
                          <div className="flex flex-col">
                            {work.work_person
                              .slice(0, 2)
                              .map((wp: any, idx: number) => (
                                <span key={idx} className="text-sm">
                                  {wp.person?.name}
                                </span>
                              ))}
                            {work.work_person.length > 2 && (
                              <span className="text-sm opacity-50">
                                +{work.work_person.length - 2} more
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-sm opacity-50">No authors</span>
                        )}
                      </td>
                      <td>
                        <div
                          className={`badge ${
                            work.status === "final"
                              ? "badge-success"
                              : work.status === "draft"
                              ? "badge-warning"
                              : "badge-neutral"
                          }`}
                        >
                          {work.status}
                        </div>
                      </td>
                      <td className="text-sm opacity-50">
                        {new Date(work.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-base-content/60">No works submitted yet</p>
              <Link href="/submit" className="btn btn-primary mt-4">
                Submit the first work
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
