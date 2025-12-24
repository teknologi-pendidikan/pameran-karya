import { RoleGuard } from "@/components/role-guard";
import Link from "next/link";

export default async function AdminPage() {
  return (
    <RoleGuard allowedRoles={["admin"]}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <p className="text-base-content/60 mt-1">
            Manage the Pameran Karya system
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/admin/works"
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
          >
            <div className="card-body">
              <div className="flex items-center">
                <div className="bg-primary/10 p-3 rounded-lg mr-4">
                  <svg
                    className="w-6 h-6 text-primary"
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
                </div>
                <div>
                  <h2 className="card-title">Manage Works</h2>
                  <p className="text-sm opacity-60">
                    View, edit, and moderate submissions
                  </p>
                </div>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/people"
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
          >
            <div className="card-body">
              <div className="flex items-center">
                <div className="bg-secondary/10 p-3 rounded-lg mr-4">
                  <svg
                    className="w-6 h-6 text-secondary"
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
                </div>
                <div>
                  <h2 className="card-title">Manage People</h2>
                  <p className="text-sm opacity-60">
                    Add and edit author profiles
                  </p>
                </div>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/categories"
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
          >
            <div className="card-body">
              <div className="flex items-center">
                <div className="bg-accent/10 p-3 rounded-lg mr-4">
                  <svg
                    className="w-6 h-6 text-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="card-title">Categories</h2>
                  <p className="text-sm opacity-60">
                    Manage work categories and tags
                  </p>
                </div>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/projects"
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
          >
            <div className="card-body">
              <div className="flex items-center">
                <div className="bg-info/10 p-3 rounded-lg mr-4">
                  <svg
                    className="w-6 h-6 text-info"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="card-title">Projects & Stories</h2>
                  <p className="text-sm opacity-60">
                    Organize works into projects
                  </p>
                </div>
              </div>
            </div>
          </Link>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex items-center">
                <div className="bg-warning/10 p-3 rounded-lg mr-4">
                  <svg
                    className="w-6 h-6 text-warning"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="card-title">Analytics</h2>
                  <p className="text-sm opacity-60">View system statistics</p>
                </div>
              </div>
              <div className="card-actions justify-end">
                <span className="badge badge-warning">Coming Soon</span>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex items-center">
                <div className="bg-error/10 p-3 rounded-lg mr-4">
                  <svg
                    className="w-6 h-6 text-error"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="card-title">System Settings</h2>
                  <p className="text-sm opacity-60">
                    Configure system preferences
                  </p>
                </div>
              </div>
              <div className="card-actions justify-end">
                <span className="badge badge-error">Coming Soon</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Quick Actions</h2>
            <div className="flex flex-wrap gap-2 mt-4">
              <button className="btn btn-outline btn-sm">Export Data</button>
              <button className="btn btn-outline btn-sm">Import Data</button>
              <button className="btn btn-outline btn-sm">Backup System</button>
              <button className="btn btn-outline btn-sm">View Logs</button>
            </div>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
