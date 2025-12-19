import { notFound } from "next/navigation";
import { createClient as createClientStatic } from "@supabase/supabase-js";
import { getYouTubeEmbedUrl } from "@/lib/youtubeEmbed";

interface Person {
  id: string;
  name: string;
  slug: string;
  bio?: string;
  image?: string;
  created_at: string;
  [key: string]: unknown;
}

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

export default async function PersonPage({ params }: PageProps) {
  // For static generation, use direct Supabase client without cookies
  const supabase = createClientStatic(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
  );
  const { slug } = await params;

  // Fetch person data based on slug
  const { data: person, error } = await supabase
    .from("person")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !person) {
    notFound();
  }

  // Fetch works with assets by person
  const { data: works, error: worksError } = await supabase.rpc(
    "get_works_with_assets_by_person",
    { p_person_id: person.id, p_slug: slug }
  );

  if (worksError) {
    console.error("Error fetching works:", worksError);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Person Header */}
        <div className="mb-8">
          {person.image && (
            <div className="mb-6">
              <img
                src={person.image}
                alt={person.name}
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
              {works.map((work: Work, workIndex: number) => (
                <div
                  key={work.work_id}
                  className="card bg-base-100 w-1/2 shadow-md"
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
                          <div
                            key={asset.asset_id}
                            className="card bg-base-100 shadow-sm"
                          >
                            <figure className="h-48">
                              {asset.type === "video" && asset.file_url ? (
                                <iframe
                                  src={getYouTubeEmbedUrl(asset.file_url)}
                                  title={`${work.title} - Asset ${
                                    assetIndex + 1
                                  }`}
                                  className="w-full h-full"
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                  allowFullScreen
                                />
                              ) : (
                                <img
                                  src={
                                    asset.thumbnail_url || asset.file_url || ""
                                  }
                                  alt={`${work.title} - Asset ${
                                    assetIndex + 1
                                  }`}
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
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Generate static params for all person slugs
export async function generateStaticParams() {
  // For static generation, use direct Supabase client without cookies
  const supabase = createClientStatic(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
  );

  const { data: persons } = await supabase.from("person").select("slug");

  if (!persons) {
    return [];
  }

  return persons.map((person) => ({
    slug: person.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  // For static generation, use direct Supabase client without cookies
  const supabase = createClientStatic(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
  );
  const { slug } = await params;

  const { data: person } = await supabase
    .from("person")
    .select("name, bio")
    .eq("slug", slug)
    .single();

  if (!person) {
    return {
      title: "Person Not Found",
    };
  }

  return {
    title: ` ${person.name} - Pameran Karya Teknologi Pendidikan`,
    description: person.bio
      ? person.bio.slice(0, 160)
      : `Learn more about ${person.name}`,
  };
}
