import { notFound } from "next/navigation";
import { createClient as createClientStatic } from "@supabase/supabase-js";
import { YouTubeEmbed } from "@next/third-parties/google";
import { getYouTubeVideoId } from "@/lib/youtubeEmbed";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { openGraphGlobalMetadata } from "@/app/global-metadata";
import BackButton from "@/components/BackButton";
import ShareButton from "@/components/ShareButton";
import VoteButton from "@/components/VoteButton";

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
  affiliation?: {
    affiliation_id: string;
    name: string;
    short_name?: string;
    type: string;
  };
  contribution_role?: string;
  ordering?: number;
}

interface WorkPersonRelation {
  person: {
    person_id: string;
    name: string;
    slug: string;
    bio?: string;
    affiliation?: {
      affiliation_id: string;
      name: string;
      short_name?: string;
      type: string;
    };
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
          affiliation(
            affiliation_id,
            name,
            short_name,
            type
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

  // Handle empty database case
  if (slug === "_empty_") {
    notFound();
  }

  const data = await getWorkData(slug);

  if (!data) {
    notFound();
  }

  const { work, assets, contributors } = data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Navigation */}
        <div className="mb-6 flex justify-between items-center">
          <BackButton />
          <div className="flex items-center gap-3">
            <VoteButton
              workId={work.work_id}
              workTitle={work.title}
              workSlug={work.slug}
              authors={contributors.map((c) => c.name).join(", ") || "Unknown"}
            />
            <ShareButton
              title={work.title}
              url={`${process.env.NEXT_PUBLIC_SITE_URL || "https://pamerankarya.teknologipendidikan.or.id"}/work/${work.slug}`}
              description={work.abstract || work.description}
            />
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 mb-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {work.title}
            </h1>
            <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-500 mb-8">
              <time dateTime={work.created_at} className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Created:{" "}
                {new Date(work.created_at).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              {work.updated_at && work.updated_at !== work.created_at && (
                <time dateTime={work.updated_at} className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Updated:{" "}
                  {new Date(work.updated_at).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Abstract */}
            {work.abstract && (
              <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <svg
                      className="w-3 h-3 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  Abstract
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                  <p className="whitespace-pre-wrap">{work.abstract}</p>
                </div>
              </section>
            )}

            {/* Description */}
            {work.description && (
              <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <svg
                      className="w-3 h-3 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  Description
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                  <div className="whitespace-pre-wrap">{work.description}</div>
                </div>
              </section>
            )}

            {/* Assets Section */}
            {assets.length > 0 && (
              <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                    <svg
                      className="w-3 h-3 text-purple-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  Media & Assets
                  <span className="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                    {assets.length}
                  </span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {assets.map((asset, index) => (
                    <div
                      key={asset.asset_id}
                      className="group relative bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
                    >
                      {/* Media Preview */}
                      <div className="aspect-video relative overflow-hidden bg-gray-100">
                        {asset.type === "video" && asset.file_url ? (
                          (() => {
                            const videoId = getYouTubeVideoId(asset.file_url);
                            return videoId ? (
                              <div className="w-full h-full relative">
                                <YouTubeEmbed
                                  videoid={videoId}
                                  style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
                                  params="controls=1&rel=0"
                                />
                              </div>
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
                                <div className="text-center">
                                  <svg
                                    className="w-8 h-8 text-red-400 mx-auto mb-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                    />
                                  </svg>
                                  <p className="text-sm text-red-600">
                                    Video not available
                                  </p>
                                </div>
                              </div>
                            );
                          })()
                        ) : (
                          <div className="relative w-full h-full group">
                            <Image
                              src={
                                asset.thumbnail_url ||
                                asset.file_url ||
                                "/placeholder-asset.png"
                              }
                              alt={`${work.title} - Asset ${index + 1}`}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {asset.file_url && asset.type !== "video" && (
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center">
                                <a
                                  href={asset.file_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-gray-900 px-4 py-2 rounded-lg font-medium shadow-lg hover:bg-gray-100"
                                >
                                  View Full Size
                                </a>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Asset Info */}
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              asset.type === "video"
                                ? "bg-red-100 text-red-700"
                                : asset.type === "image"
                                  ? "bg-blue-100 text-blue-700"
                                  : asset.type === "document"
                                    ? "bg-green-100 text-green-700"
                                    : asset.type === "audio"
                                      ? "bg-purple-100 text-purple-700"
                                      : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {asset.type.toUpperCase()}
                          </span>
                          {asset.license && (
                            <span className="text-xs text-gray-500">
                              {asset.license}
                            </span>
                          )}
                        </div>
                        <time
                          className="text-xs text-gray-400"
                          dateTime={asset.created_at}
                        >
                          Added{" "}
                          {new Date(asset.created_at).toLocaleDateString(
                            "id-ID"
                          )}
                        </time>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* No Assets Message */}
            {assets.length === 0 && (
              <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-12">
                <div className="text-center">
                  <svg
                    className="w-12 h-12 text-gray-300 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011 1v2a1 1 0 01-1 1h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V8H3a1 1 0 01-1-1V5a1 1 0 011-1h4zM9 3v1h6V3H9zm2 8a1 1 0 112 0v6a1 1 0 11-2 0v-6zm4 0a1 1 0 112 0v6a1 1 0 11-2 0v-6z"
                    />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No Media Available
                  </h3>
                  <p className="text-gray-500">
                    No assets have been uploaded for this work yet.
                  </p>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Contributors */}
            {contributors.length > 0 && (
              <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <div className="w-5 h-5 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                    <svg
                      className="w-3 h-3 text-indigo-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                    </svg>
                  </div>
                  Contributors
                </h2>
                <div className="space-y-3">
                  {contributors.map((contributor) => (
                    <Link
                      key={contributor.person_id}
                      href={`/person/${contributor.slug}`}
                      className="block group"
                    >
                      <div className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mr-3 group-hover:scale-105 transition-transform duration-200">
                          <span className="text-indigo-700 font-semibold text-sm">
                            {contributor.name.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
                            {contributor.name}
                          </p>
                          {contributor.contribution_role && (
                            <p className="text-xs text-indigo-600 font-medium">
                              {contributor.contribution_role}
                            </p>
                          )}
                          {contributor.affiliation?.name && (
                            <p className="text-xs text-gray-500 truncate">
                              {contributor.affiliation.name}
                            </p>
                          )}
                        </div>
                        <svg
                          className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors duration-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Quick Info */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Work Information
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Created:</span>
                  <time dateTime={work.created_at} className="text-gray-900">
                    {format(new Date(work.created_at), "MMM d, yyyy")}
                  </time>
                </div>
                {work.updated_at && work.updated_at !== work.created_at && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Updated:</span>
                    <time dateTime={work.updated_at} className="text-gray-900">
                      {format(new Date(work.updated_at), "MMM d, yyyy")}
                    </time>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Contributors:</span>
                  <span className="text-gray-900">{contributors.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Assets:</span>
                  <span className="text-gray-900">{assets.length}</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

// Cache for static params to avoid duplicate queries
let staticParamsCache: { slug: string }[] | null = null;

// Generate static params for all work slugs
export async function generateStaticParams() {
  // Always check cache first
  if (staticParamsCache !== null) {
    return staticParamsCache;
  }

  try {
    const supabase = getSupabaseClient();
    const { data: works, error } = await supabase
      .from("work")
      .select("slug")
      .order("slug");

    if (error) {
      console.warn("Error fetching works for static params:", error);
      // For static export, we need to return something when there's no data
      staticParamsCache = [{ slug: "_empty_" }];
      return staticParamsCache;
    }

    if (!works || works.length === 0) {
      console.warn("No works found in database for static generation");
      // For static export, we need to return something when there's no data
      staticParamsCache = [{ slug: "_empty_" }];
      return staticParamsCache;
    }

    staticParamsCache = works.map((work) => ({
      slug: work.slug,
    }));

    return staticParamsCache;
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    // For static export, we need to return something when there's no data
    staticParamsCache = [{ slug: "_empty_" }];
    return staticParamsCache;
  }
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
    title: `${work.title}`,
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
      "karya teknologi pendidikan",
      "pameran karya",
      "mahasiswa teknologi pendidikan",
      work.title,
      ...contributorNames.split(", "),
    ].join(", "),
    openGraph: {
      ...openGraphGlobalMetadata,
      title: `${work.title} | Pameran Karya Teknologi Pendidikan`,
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
