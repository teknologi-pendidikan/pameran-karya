import { notFound } from "next/navigation";
import { createClient as createClientStatic } from "@supabase/supabase-js";
import { getYouTubeEmbedUrl } from "@/lib/youtubeEmbed";
import Image from "next/image";
import Link from "next/link";

interface WorkData {
  work: WorkWithDetails;
  assets: Asset[];
  contributors: Contributor[];
}

interface WorkWithDetails {
  work_id: string;
  title: string;
  slug: string;
  abstract?: string;
  description?: string;
  created_at: string;
  updated_at?: string;
  [key: string]: unknown;
}

interface Asset {
  asset_id: string;
  type: string;
  file_url?: string;
  thumbnail_url?: string;
  license?: string;
  created_at: string;
  metadata?: {
    width?: number;
    height?: number;
    duration?: number;
    size?: number;
  };
}

interface Contributor {
  person_id: string;
  name: string;
  slug: string;
  image?: string;
  bio?: string;
  affiliation?: string;
  contribution_role?: string;
  ordering?: number;
}

interface WorkPersonRelation {
  person: {
    person_id: string;
    name: string;
    slug: string;
    bio?: string;
    affiliation?: string;
  };
  contribution_role?: string;
  ordering?: number;
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Shared Supabase client for build-time operations
const getSupabaseClient = () =>
  createClientStatic(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
  );

// Cache for work data to avoid duplicate queries
const workDataCache = new Map<string, WorkData>();

async function getWorkData(slug: string) {
  // Check cache first
  if (workDataCache.has(slug)) {
    return workDataCache.get(slug);
  }

  const supabase = getSupabaseClient();

  // Fetch work with assets and contributors in a single optimized query
  const { data: workWithDetails, error } = await supabase
    .from("work")
    .select(
      `
      *,
      asset(
        asset_id,
        type,
        file_url,
        thumbnail_url,
        license,
        created_at
      ),
      work_person(
        person!inner(
          person_id,
          name,
          slug,
          bio,
          affiliation
        ),
        contribution_role,
        ordering
      )
    `
    )
    .eq("slug", slug)
    .order("ordering", { referencedTable: "work_person" })
    .single();

  if (error || !workWithDetails) {
    console.error("Error fetching work data:", error);
    return null;
  }

  // Transform the data structure for easier rendering
  const assets = workWithDetails.asset || [];
  const contributors =
    workWithDetails.work_person?.map((wp: WorkPersonRelation) => ({
      person_id: wp.person.person_id,
      name: wp.person.name,
      slug: wp.person.slug,
      image: undefined, // Remove image since it doesn't exist in schema
      bio: wp.person.bio,
      affiliation: wp.person.affiliation,
      contribution_role: wp.contribution_role,
      ordering: wp.ordering,
    })) || [];

  const result: WorkData = {
    work: workWithDetails as WorkWithDetails,
    assets,
    contributors: contributors.sort(
      (a: Contributor, b: Contributor) => (a.ordering || 0) - (b.ordering || 0)
    ),
  };

  // Cache the result
  workDataCache.set(slug, result);
  return result;
}

export default async function WorkPage({ params }: PageProps) {
  const { slug } = await params;

  const data = await getWorkData(slug);

  if (!data) {
    notFound();
  }

  const { work, assets, contributors } = data;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Work Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            {work.title}
          </h1>
          <div className="text-center text-gray-600 mb-4">
            <time dateTime={work.created_at}>
              Created:{" "}
              {new Date(work.created_at).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            {work.updated_at && work.updated_at !== work.created_at && (
              <>
                <span className="mx-2">•</span>
                <time dateTime={work.updated_at}>
                  Updated:{" "}
                  {new Date(work.updated_at).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </>
            )}
          </div>
        </div>

        {/* Contributors Section */}
        {contributors.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contributors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {contributors.map((contributor) => (
                <Link
                  key={contributor.person_id}
                  href={`/person/${contributor.slug}`}
                  className="card card-side bg-base-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <figure className="w-24 h-24 shrink-0">
                    <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-gray-400 text-xs font-semibold">
                        {contributor.name.charAt(0)}
                      </span>
                    </div>
                  </figure>
                  <div className="card-body p-3">
                    <h3 className="font-semibold text-sm">
                      {contributor.name}
                    </h3>
                    {contributor.contribution_role && (
                      <span className="badge badge-primary badge-sm">
                        {contributor.contribution_role}
                      </span>
                    )}
                    {contributor.affiliation && (
                      <p className="text-xs text-gray-600 truncate">
                        {contributor.affiliation}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Abstract Section */}
        {work.abstract && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Abstract</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {work.abstract}
              </p>
            </div>
          </div>
        )}

        {/* Description Section */}
        {work.description && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {work.description}
              </div>
            </div>
          </div>
        )}

        {/* Assets Section */}
        {assets.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Assets ({assets.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {assets.map((asset, index) => (
                <div
                  key={asset.asset_id}
                  className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow"
                >
                  <figure className="h-64">
                    {asset.type === "video" && asset.file_url ? (
                      <iframe
                        src={getYouTubeEmbedUrl(asset.file_url)}
                        title={`${work.title} - Asset ${index + 1}`}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    ) : (
                      <Image
                        src={
                          asset.thumbnail_url ||
                          asset.file_url ||
                          "/placeholder-asset.png"
                        }
                        alt={`${work.title} - Asset ${index + 1}`}
                        width={400}
                        height={256}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </figure>
                  <div className="card-body p-4">
                    <div className="flex items-center justify-between">
                      <span className="badge badge-outline">
                        {asset.type.toUpperCase()}
                      </span>
                      {asset.license && (
                        <span className="text-sm text-gray-500">
                          License: {asset.license}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      <time dateTime={asset.created_at}>
                        Added:{" "}
                        {new Date(asset.created_at).toLocaleDateString("id-ID")}
                      </time>
                    </div>
                    {asset.file_url && asset.type !== "video" && (
                      <div className="card-actions justify-end mt-2">
                        <a
                          href={asset.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary btn-sm"
                        >
                          View Full Size
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No assets message */}
        {assets.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <p>No assets available for this work yet.</p>
          </div>
        )}

        {/* Back to Directory */}
        <div className="text-center mt-12">
          <Link href="/person" className="btn btn-outline btn-lg">
            ← Back to Directory
          </Link>
        </div>
      </div>
    </div>
  );
}

// Cache for static params to avoid duplicate queries
let staticParamsCache: { slug: string }[] | null = null;

// Generate static params for all work slugs
export async function generateStaticParams() {
  if (staticParamsCache) {
    return staticParamsCache;
  }

  const supabase = getSupabaseClient();
  const { data: works } = await supabase
    .from("work")
    .select("slug")
    .order("slug");

  if (!works) {
    return [];
  }

  staticParamsCache = works.map((work) => ({
    slug: work.slug,
  }));

  return staticParamsCache;
}

// Generate metadata for SEO using cached data
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  const data = await getWorkData(slug);

  if (!data) {
    return {
      title: "Work Not Found",
    };
  }

  const { work, contributors } = data;
  const contributorNames = contributors.map((c) => c.name).join(", ");

  return {
    title: `${work.title} - Pameran Karya Teknologi Pendidikan`,
    description: work.abstract
      ? work.abstract.slice(0, 160)
      : `Explore the innovative work "${work.title}" by ${
          contributorNames || "students"
        } from Teknologi Pendidikan Indonesia.`,
    keywords: [
      "teknologi pendidikan",
      "educational technology",
      "student work",
      "innovation",
      work.title,
      ...contributorNames.split(", "),
    ].join(", "),
    openGraph: {
      title: `${work.title} - Pameran Karya Teknologi Pendidikan`,
      description: work.abstract
        ? work.abstract.slice(0, 160)
        : `Explore the innovative work "${work.title}" by ${
            contributorNames || "students"
          }.`,
      type: "article",
      publishedTime: work.created_at,
      modifiedTime: work.updated_at || work.created_at,
      authors: contributorNames ? [contributorNames] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${work.title} - Pameran Karya`,
      description:
        work.abstract?.slice(0, 200) ||
        `Innovative work by ${
          contributorNames || "students"
        } from Teknologi Pendidikan Indonesia.`,
    },
  };
}
