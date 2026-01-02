import { notFound } from "next/navigation";
import { createClient as createClientStatic } from "@supabase/supabase-js";
import { YouTubeEmbed } from "@next/third-parties/google";
import { getYouTubeVideoId } from "@/lib/youtubeEmbed";
import Image from "next/image";
import Link from "next/link";
import { openGraphGlobalMetadata } from "@/app/global-metadata";

// Helper function to get YouTube thumbnail or original URL
const getImageUrl = (url: string | undefined): string => {
  if (!url) return "/placeholder-work.png";

  const videoId = getYouTubeVideoId(url);
  if (videoId) {
    return `https://img.youtube.com/vi/${videoId}/default.jpg`;
  }

  return url;
};

interface PersonData {
  person: PersonWithWorks;
  works: Work[];
}

interface PersonWithWorks {
  id: string;
  name: string;
  slug: string;
  bio?: string;
  tag?: string;
  image?: string;
  created_at: string;
  work_person?: WorkPersonRelation[];
  affiliation?: {
    affiliation_id: string;
    name: string;
    short_name?: string;
    type: string;
  };
  [key: string]: unknown;
}

interface WorkPersonRelation {
  work: WorkWithAssets;
  contribution_role?: string;
  ordering?: number;
}

interface WorkWithAssets {
  work_id: string;
  title: string;
  slug: string;
  abstract?: string;
  created_at: string;
  asset?: Asset[];
}

// Shared Supabase client for build-time operations
const getSupabaseClient = () =>
  createClientStatic(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
  );

// Cache for person data to avoid duplicate queries
const personDataCache = new Map<string, PersonData>();

interface Asset {
  asset_id: string;
  type: string;
  file_url?: string;
  thumbnail_url?: string;
  license?: string;
  created_at: string;
}

interface Work {
  work_id: string;
  title: string;
  slug: string;
  abstract?: string;
  contribution_role?: string;
  ordering?: number;
  work_created_at: string;
  assets: Asset[];
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getPersonData(slug: string) {
  // Check cache first
  if (personDataCache.has(slug)) {
    return personDataCache.get(slug);
  }

  const supabase = getSupabaseClient();

  // Fetch person with works and assets in a single optimized query
  const { data: personWithWorks, error } = await supabase
    .from("person")
    .select(
      `
      *,
      affiliation(
        affiliation_id,
        name,
        short_name,
        type
      ),
      work_person(
        work(
          work_id,
          title,
          slug,
          abstract,
          created_at,
          asset(
            asset_id,
            type,
            file_url,
            thumbnail_url,
            license,
            created_at
          )
        ),
        contribution_role,
        ordering
      )
    `
    )
    .eq("slug", slug)
    .order("ordering", { referencedTable: "work_person" })
    .single();

  if (error || !personWithWorks) {
    console.error("Error fetching person data:", error);

    // Try fallback query - just get the person without works
    const { data: personOnly, error: personError } = await supabase
      .from("person")
      .select(
        `
        *,
        affiliation(
          affiliation_id,
          name,
          short_name,
          type
        )
      `
      )
      .eq("slug", slug)
      .single();

    if (personError || !personOnly) {
      console.error("Error fetching person fallback:", personError);
      return null;
    }

    // Return person with empty works array
    const result = {
      person: personOnly,
      works: [],
    };

    personDataCache.set(slug, result);
    return result;
  }

  // Transform the data structure for easier rendering
  const works =
    (personWithWorks as PersonWithWorks).work_person?.map(
      (wp: WorkPersonRelation) => ({
        work_id: wp.work.work_id,
        title: wp.work.title,
        slug: wp.work.slug,
        abstract: wp.work.abstract,
        contribution_role: wp.contribution_role,
        ordering: wp.ordering,
        work_created_at: wp.work.created_at,
        assets: wp.work.asset || [],
      })
    ) || [];

  const result = {
    person: personWithWorks,
    works,
  };

  // Cache the result
  personDataCache.set(slug, result);
  return result;
}

export default async function PersonPage({ params }: PageProps) {
  const { slug } = await params;

  const data = await getPersonData(slug);

  if (!data) {
    notFound();
  }

  const { person, works } = data;

  return (
    <div className="min-h-screen container mx-auto px-4 py-8 max-w-7xl">
      <div className="">
        {/* Person Header */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
            {/* Avatar */}
            {person.image && (
              <div className="avatar flex-shrink-0">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full ring-2 ring-gray-100">
                  <Image
                    src={person.image}
                    alt={person.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* Person Info */}
            <div className="flex-1 text-center sm:text-left min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                {person.name}
              </h1>

              {/* Tags and Affiliation */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-4">
                {person.affiliation && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    🎓 {person.affiliation.name}
                  </span>
                )}
                {person.tag && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    🏷️ {person.tag}
                  </span>
                )}
              </div>

              {person.bio && (
                <div className="prose prose-sm prose-gray max-w-none">
                  <div className="whitespace-pre-wrap leading-relaxed text-gray-600 text-sm">
                    {person.bio}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Works Section */}
        {works && works.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900">
                Works ({works.length})
              </h2>
              <div className="badge badge-neutral">
                {works.length} {works.length === 1 ? "work" : "works"}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {works.map((work: Work) => (
                <Link
                  href={`/work/${work.slug}`}
                  key={work.work_id}
                  className="card bg-white shadow-md hover:shadow-xl transition-all duration-300 group hover:scale-[1.02]"
                >
                  {/* Featured Asset Thumbnail */}
                  <figure className="h-48 overflow-hidden">
                    {work.assets && work.assets.length > 0 && work.assets[0] ? (
                      (() => {
                        const firstAsset = work.assets[0];
                        if (
                          firstAsset.type === "video" &&
                          firstAsset.file_url
                        ) {
                          const videoId = getYouTubeVideoId(
                            firstAsset.file_url
                          );
                          return videoId ? (
                            <YouTubeEmbed
                              videoid={videoId}
                              height={192}
                              width={400}
                              params="controls=1&rel=0"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                              <div className="text-center">
                                <div className="text-4xl mb-2">🎥</div>
                                <div className="text-gray-500 text-sm">
                                  Video
                                </div>
                              </div>
                            </div>
                          );
                        } else {
                          return (
                            <img
                              src={getImageUrl(
                                firstAsset.thumbnail_url || firstAsset.file_url
                              )}
                              alt={work.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          );
                        }
                      })()
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-4xl mb-2">📄</div>
                          <div className="text-gray-500 text-sm">
                            No Preview
                          </div>
                        </div>
                      </div>
                    )}
                  </figure>

                  <div className="card-body p-3 sm:p-4">
                    {/* Title and Date */}
                    <div className="mb-3">
                      <h3 className="card-title text-sm sm:text-base group-hover:text-blue-600 transition-colors line-clamp-2">
                        {work.title}
                      </h3>
                      <div className="text-xs text-gray-500 mt-1">
                        <time dateTime={work.work_created_at}>
                          {new Date(work.work_created_at).toLocaleDateString(
                            "id-ID",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </time>
                      </div>
                    </div>

                    {/* Abstract */}
                    {work.abstract && (
                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-3 leading-relaxed">
                        {work.abstract}
                      </p>
                    )}

                    {/* Role and Assets - Combined for compactness */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      {work.contribution_role && (
                        <span className="badge badge-primary badge-xs">
                          {work.contribution_role}
                        </span>
                      )}
                      <div className="text-xs text-gray-500">
                        {work.assets?.length || 0} asset
                        {work.assets?.length !== 1 ? "s" : ""}
                      </div>
                    </div>

                    {/* Assets Preview - Simplified */}
                    {work.assets && work.assets.length > 0 && (
                      <div className="mb-3">
                        <div className="flex flex-wrap gap-1">
                          {work.assets.slice(0, 2).map((asset) => (
                            <span
                              key={asset.asset_id}
                              className="badge badge-outline badge-xs"
                            >
                              {asset.type.toUpperCase()}
                            </span>
                          ))}
                          {work.assets.length > 2 && (
                            <span className="badge badge-ghost badge-xs">
                              +{work.assets.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="card-actions justify-end">
                      <div className="btn btn-link btn-xs text-blue-600 hover:text-blue-700 p-0">
                        View →
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* No Works Message */}
        {(!works || works.length === 0) && (
          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 text-center">
            <div className="text-4xl sm:text-5xl mb-3">📚</div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900">
              No Works Available
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              This person has not contributed to any works yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Cache for static params to avoid duplicate queries
let staticParamsCache: { slug: string }[] | null = null;

// Generate static params for all person slugs
export async function generateStaticParams() {
  if (staticParamsCache) {
    return staticParamsCache;
  }

  const supabase = getSupabaseClient();
  const { data: persons } = await supabase
    .from("person")
    .select("slug")
    .order("slug");

  if (!persons) {
    return [];
  }

  staticParamsCache = persons.map((person) => ({
    slug: person.slug,
  }));

  return staticParamsCache;
}

// Generate metadata for SEO using cached data
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  const data = await getPersonData(slug);

  if (!data) {
    return {
      title: "Person Not Found",
    };
  }

  const { person } = data;

  return {
    title: `${person.name}`,
    description: person.bio
      ? person.bio.slice(0, 160)
      : `Learn more about ${person.name}`,
    openGraph: {
      ...openGraphGlobalMetadata,
      title: `${person.name} - Pameran Karya Teknologi Pendidikan`,
      description: person.bio
        ? person.bio.slice(0, 160)
        : `Learn more about ${person.name}`,
      images: person.image ? [{ url: person.image }] : [],
    },
  };
}
