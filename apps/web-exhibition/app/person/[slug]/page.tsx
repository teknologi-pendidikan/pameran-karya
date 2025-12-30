import { notFound } from "next/navigation";
import { createClient as createClientStatic } from "@supabase/supabase-js";
import { YouTubeEmbed } from "@next/third-parties/google";
import { getYouTubeVideoId } from "@/lib/youtubeEmbed";
import Image from "next/image";
import Link from "next/link";
import {
  openGraphGlobalMetadata,
  twitterGlobalMetadata,
} from "@/app/global-metadata";

interface PersonData {
  person: PersonWithWorks;
  works: Work[];
}

interface PersonWithWorks {
  id: string;
  name: string;
  slug: string;
  bio?: string;
  image?: string;
  created_at: string;
  work_person?: WorkPersonRelation[];
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
      .select("*")
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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Person Header */}
        <div className="mb-8">
          {person.image && (
            <div className="mb-6">
              <Image
                src={person.image}
                alt={person.name}
                width={192}
                height={192}
                className="w-48 h-48 rounded-full object-cover mx-auto"
              />
            </div>
          )}
          <h1 className="text-4xl font-bold text-center mb-4">{person.name}</h1>
        </div>

        {/* Person Bio */}
        {person.bio && (
          <div className="prose prose-lg mx-auto mb-8">
            <div className="whitespace-pre-wrap">{person.bio}</div>
          </div>
        )}

        {/* Works with Assets */}
        {works && works.length > 0 && (
          <div className="mb-8">
            <h2 className="text-3xl font-semibold mb-6">Works</h2>
            <div className="space-y-8">
              {works.map((work: Work) => (
                <Link
                  href={`/work/${work.slug}`}
                  key={work.work_id}
                  className="card  w-1/2 shadow-md hover:shadow-lg transition-shadow block hover:border-rose-100 border border-transparent"
                >
                  <div className="card-body">
                    {/* Work Header */}
                    <div className="mb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="card-title">{work.title}</h3>
                        {work.contribution_role && (
                          <span className="badge badge-primary">
                            {work.contribution_role}
                          </span>
                        )}
                      </div>
                      {work.abstract && (
                        <p className="text-gray-600 mb-3">
                          {work.abstract.slice(0, 200)}
                          {work.abstract.length > 200 ? "..." : ""}
                        </p>
                      )}
                      <p className="text-sm text-gray-500">
                        Created:{" "}
                        {new Date(work.work_created_at).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Assets Grid */}
                    {work.assets && work.assets.length > 0 && (
                      <div className="grid grid-cols-1 gap-4">
                        {work.assets.map((asset: Asset, assetIndex: number) => (
                          <div key={asset.asset_id} className="card  shadow-sm">
                            <figure className="h-48">
                              {asset.type === "video" && asset.file_url ? (
                                (() => {
                                  const videoId = getYouTubeVideoId(
                                    asset.file_url
                                  );
                                  return videoId ? (
                                    <YouTubeEmbed
                                      videoid={videoId}
                                      height={192}
                                      width={400}
                                      params="controls=1&rel=0"
                                    />
                                  ) : (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                      <p className="text-gray-500 text-sm">
                                        Video not available
                                      </p>
                                    </div>
                                  );
                                })()
                              ) : (
                                <Image
                                  src={
                                    asset.thumbnail_url || asset.file_url || ""
                                  }
                                  alt={`${work.title} - Asset ${
                                    assetIndex + 1
                                  }`}
                                  width={400}
                                  height={192}
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </figure>
                            <div className="card-body p-3">
                              <div className="flex items-center justify-between">
                                <span className="badge badge-outline text-xs">
                                  {asset.type.toUpperCase()}
                                </span>
                                {asset.license && (
                                  <span className="text-xs text-gray-500">
                                    {asset.license}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* No assets message */}
                    {(!work.assets || work.assets.length === 0) && (
                      <div className="text-center text-gray-500 py-8">
                        No assets available for this work
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
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
