import { RoleGuard } from '@/components/role-guard'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import Link from 'next/link'

interface WorkWithAuthors {
  work_id: string
  title: string
  abstract: string
  status: 'draft' | 'final' | 'archived'
  slug: string
  created_at: string
  work_person: Array<{
    person: { name: string } | null
    contribution_role: string
  }>
  asset: Array<{
    asset_id: string
    type: string
    file_url: string
  }>
}

async function getWorks(): Promise<WorkWithAuthors[]> {
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from('work')
    .select(`
      work_id,
      title,
      abstract,
      status,
      slug,
      created_at,
      work_person(
        person(name),
        contribution_role
      ),
      asset(
        asset_id,
        type,
        file_url
      )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching works:', error)
    return []
  }

  return data as WorkWithAuthors[]
}

export default async function AdminWorksPage() {
  const works = await getWorks()

  return (
    <RoleGuard allowedRoles={['admin']}>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Manage Works</h1>
            <p className="text-base-content/60 mt-1">
              Review and manage all submitted works
            </p>
          </div>
          <Link href="/submit" className="btn btn-primary">
            Add New Work
          </Link>
        </div>

      {/* Stats */}
      <div className="stats shadow w-full">
        <div className="stat">
          <div className="stat-title">Total Works</div>
          <div className="stat-value">{works.length}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Draft</div>
          <div className="stat-value text-warning">
            {works.filter(w => w.status === 'draft').length}
          </div>
        </div>
        <div className="stat">
          <div className="stat-title">Final</div>
          <div className="stat-value text-success">
            {works.filter(w => w.status === 'final').length}
          </div>
        </div>
        <div className="stat">
          <div className="stat-title">Archived</div>
          <div className="stat-value text-neutral">
            {works.filter(w => w.status === 'archived').length}
          </div>
        </div>
      </div>

      {/* Works Table */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Work</th>
                  <th>Authors</th>
                  <th>Status</th>
                  <th>Assets</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {works.map((work) => (
                  <tr key={work.work_id}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="font-bold">{work.title}</div>
                          <div className="text-sm opacity-50 max-w-xs truncate">
                            {work.abstract || 'No description'}
                          </div>
                          <div className="text-xs opacity-40">
                            /{work.slug}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {work.work_person && work.work_person.length > 0 ? (
                        <div className="space-y-1">
                          {work.work_person.slice(0, 2).map((wp, idx) => (
                            <div key={idx} className="text-sm">
                              <span className="font-medium">{wp.person?.name}</span>
                              <span className="opacity-60 text-xs ml-1">
                                ({wp.contribution_role})
                              </span>
                            </div>
                          ))}
                          {work.work_person.length > 2 && (
                            <div className="text-xs opacity-50">
                              +{work.work_person.length - 2} more
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-sm opacity-50">No authors</span>
                      )}
                    </td>
                    <td>
                      <div className={`badge ${
                        work.status === 'final' ? 'badge-success' :
                        work.status === 'draft' ? 'badge-warning' :
                        'badge-neutral'
                      }`}>
                        {work.status}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center space-x-1">
                        <span className="text-sm">
                          {work.asset?.length || 0}
                        </span>
                        {work.asset && work.asset.length > 0 && (
                          <div className="tooltip" data-tip="Asset types">
                            <div className="flex space-x-1">
                              {Array.from(new Set(work.asset.map(a => a.type))).map(type => (
                                <div key={type} className="badge badge-xs badge-outline">
                                  {type}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="text-sm opacity-60">
                      {new Date(work.created_at).toLocaleDateString()}
                    </td>
                    <td>
                      <div className="flex space-x-2">
                        <Link
                          href={`/admin/works/${work.work_id}`}
                          className="btn btn-ghost btn-xs"
                        >
                          View
                        </Link>
                        <button className="btn btn-ghost btn-xs text-error">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {works.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl opacity-20 mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-2">No works submitted yet</h3>
              <p className="text-base-content/60 mb-4">
                Get started by submitting the first work
              </p>
              <Link href="/submit" className="btn btn-primary">
                Submit First Work
              </Link>
            </div>
          )}
        </div>
      </div>
    </RoleGuard>
  )
}
