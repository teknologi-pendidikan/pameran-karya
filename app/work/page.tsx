/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient as createClientStatic } from "@supabase/supabase-js";
import Link from "next/link";
import Image from "next/image";

interface Work {
  work_id: string;
  title: string;
  slug: string;
  abstract?: string;
  created_at: string;
  contributors?: Contributor[];
  asset_count?: number;
  featured_asset?: Asset;
}

interface Contributor {
  person_id: string;
  name: string;
  slug: string;
  //   image?: string;
  contribution_role?: string;
  affiliation?: string;
}

interface Asset {
  asset_id: string;
  type: string;
  thumbnail_url?: string;
  file_url?: string;
}

// Shared Supabase client for build-time operations
const getSupabaseClient = () =>
  createClientStatic(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
  );

export const metadata = {
  title: "Direktori Karya - Pameran Karya Teknologi Pendidikan",
  description:
    "Jelajahi koleksi karya inovatif dari mahasiswa Teknologi Pendidikan Indonesia. Temukan berbagai proyek, penelitian, dan karya kreatif dalam bidang teknologi pendidikan.",
  keywords:
    "karya teknologi pendidikan, student work, innovation, educational technology, research",
};

export default async function WorkDirectoryPage() {
  const supabase = getSupabaseClient();

  // Fetch all works with contributors and asset counts
  const { data: worksWithDetails, error } = await supabase
    .from("work")
    .select(
      `
      work_id,
      title,
      slug,
      abstract,
      created_at,
      work_person(
        person!inner(
          person_id,
          name,
          slug,
          affiliation
        ),
        contribution_role
      ),
      asset(
        asset_id,
        type,
        thumbnail_url,
        file_url
      )
    `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching works:", error);
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Error Loading Works</h1>
          <p className="text-gray-600">
            Unable to load the works directory at this time.
          </p>
        </div>
      </div>
    );
  }

  // Transform the data
  const works: Work[] =
    worksWithDetails?.map((work: any) => ({
      work_id: work.work_id,
      title: work.title,
      slug: work.slug,
      abstract: work.abstract,
      created_at: work.created_at,
      contributors:
        work.work_person?.map((wp: any) => ({
          person_id: wp.person.person_id,
          name: wp.person.name,
          slug: wp.person.slug,
          //   image: wp.person.image,
          contribution_role: wp.contribution_role,
          affiliation: wp.person.affiliation,
        })) || [],
      asset_count: work.asset?.length || 0,
      featured_asset: work.asset?.[0] || null,
    })) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6">Direktori Karya</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Jelajahi koleksi karya inovatif dari mahasiswa Teknologi Pendidikan
            Indonesia. Temukan berbagai proyek, penelitian, dan karya kreatif
            dalam bidang teknologi pendidikan.
          </p>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {works.length}
            </div>
            <div className="text-blue-800 font-medium">Total Karya</div>
          </div>
          <div className="bg-linear-to-br from-green-50 to-green-100 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {works.reduce((sum, work) => sum + (work.asset_count || 0), 0)}
            </div>
            <div className="text-green-800 font-medium">Total Aset</div>
          </div>
          <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {
                new Set(
                  works.flatMap(
                    (work) => work.contributors?.map((c) => c.person_id) || [],
                  ),
                ).size
              }
            </div>
            <div className="text-purple-800 font-medium">Kontributor</div>
          </div>
        </div>

        {/* Works Grid */}
        {works.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {works.map((work) => (
              <Link
                key={work.work_id}
                href={`/work/${work.slug}`}
                className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow duration-300 group"
              >
                {/* Featured Asset Thumbnail */}
                <figure className="h-48">
                  {work.featured_asset?.thumbnail_url ||
                  work.featured_asset?.file_url ? (
                    <img
                      src={
                        work.featured_asset.thumbnail_url ||
                        work.featured_asset.file_url ||
                        "/placeholder-work.png"
                      }
                      alt={work.title}
                      width={400}
                      height={192}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 aspect-video"
                    />
                  ) : (
                    <div className="w-full h-full bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2">📄</div>
                        <div className="text-gray-500 text-sm">No Preview</div>
                      </div>
                    </div>
                  )}
                </figure>

                <div className="card-body p-4">
                  {/* Title and Date */}
                  <div className="mb-3">
                    <h2 className="card-title text-lg group-hover:text-blue-600 transition-colors line-clamp-2">
                      {work.title}
                    </h2>
                    <div className="text-xs text-gray-500 mt-1">
                      <time dateTime={work.created_at}>
                        {new Date(work.created_at).toLocaleDateString("id-ID", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                  </div>

                  {/* Abstract */}
                  {work.abstract && (
                    <p className="text-sm text-gray-600 line-clamp-3 mb-4 leading-relaxed">
                      {work.abstract}
                    </p>
                  )}

                  {/* Contributors */}
                  {work.contributors && work.contributors.length > 0 && (
                    <div className="mb-4">
                      <div className="text-xs text-gray-500 mb-2">
                        Contributors:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {work.contributors.slice(0, 3).map((contributor) => (
                          <span
                            key={contributor.person_id}
                            className="badge badge-outline text-xs"
                          >
                            {contributor.name}
                          </span>
                        ))}
                        {work.contributors.length > 3 && (
                          <span className="badge badge-ghost text-xs">
                            +{work.contributors.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="card-actions justify-between items-center">
                    <div className="text-xs text-gray-500">
                      {work.asset_count || 0}{" "}
                      {work.asset_count === 1 ? "asset" : "assets"}
                    </div>
                    <div className="btn btn-link btn-sm">View Details →</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-16">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2">No Works Available</h3>
            <p>Check back later for new works from our students.</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-4">Contribute Your Work</h2>
          <p className="text-xl mb-6 text-blue-100">
            Mahasiswa Teknologi Pendidikan? Bagikan karya inovatif Anda dan
            inspirasi rekan-rekan lainnya.
          </p>
          <Link
            href="/person"
            className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Lihat Direktori Eksibitor
          </Link>
        </div>
      </div>
    </div>
  );
}
