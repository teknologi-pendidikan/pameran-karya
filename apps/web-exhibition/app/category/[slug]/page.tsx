/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient as createClientStatic } from "@supabase/supabase-js";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAllBlogPosts } from "@/lib/blog";
import { openGraphGlobalMetadata } from "@/app/global-metadata";

interface Work {
  work_id: string;
  title: string;
  slug: string;
  abstract?: string;
  created_at: string;
  status: string;
  contributors?: Contributor[];
  asset_count?: number;
  featured_asset?: Asset;
}

interface Contributor {
  person_id: string;
  name: string;
  slug: string;
  contribution_role?: string;
  affiliation?: string;
}

interface Asset {
  asset_id: string;
  type: string;
  thumbnail_url?: string;
  file_url?: string;
}

interface Category {
  category_id: string;
  type?: string;
  label: string;
  slug: string;
}

// Shared Supabase client for build-time operations
const getSupabaseClient = () =>
  createClientStatic(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
  );

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const supabase = getSupabaseClient();

  const { data: categories } = await supabase.from("category").select("slug");

  return (
    categories?.map((category) => ({
      slug: category.slug,
    })) || []
  );
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const supabase = getSupabaseClient();

  // Get category information
  const { data: category } = await supabase
    .from("category")
    .select("label, type")
    .eq("slug", resolvedParams.slug)
    .single();

  if (!category) {
    return {
      title: "Category Not Found - Pameran Karya Teknologi Pendidikan",
    };
  }

  return {
    title: `${category.label}`,
    description: `Jelajahi karya-karya dalam kategori ${category.label}. Temukan berbagai proyek, penelitian, dan karya kreatif dalam bidang teknologi pendidikan.`,
    keywords: `${category.label}, kategori karya, teknologi pendidikan, student work, ${category.type || ""}`,
    openGraph: {
      ...openGraphGlobalMetadata,
      title: `${category.label}`,
      description: `Jelajahi karya-karya dalam kategori ${category.label}. Temukan berbagai proyek, penelitian, dan karya kreatif dalam bidang teknologi pendidikan.`,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const resolvedParams = await params;
  const supabase = getSupabaseClient();

  // Get category information
  const { data: category, error: categoryError } = await supabase
    .from("category")
    .select("*")
    .eq("slug", resolvedParams.slug)
    .single();

  if (categoryError || !category) {
    notFound();
  }

  // Get works for this category with their details
  const { data: categoryWorksResult, error: worksError } = await supabase
    .from("work_category")
    .select(
      `
      work!inner(
        work_id,
        title,
        slug,
        abstract,
        created_at,
        status,
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
      )
    `
    )
    .eq("category_id", category.category_id)
    // .eq("work.status", "final") // Only show finalized works
    .order("work(created_at)", { ascending: false });

  if (worksError) {
    console.error("Error fetching works for category:", worksError);
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Error Loading Works</h1>
          <p className="text-gray-600">
            Unable to load works for this category at this time.
          </p>
        </div>
      </div>
    );
  }

  // Transform the data
  const works: Work[] =
    categoryWorksResult?.map((item: any) => {
      const work = item.work;
      return {
        work_id: work.work_id,
        title: work.title,
        slug: work.slug,
        abstract: work.abstract,
        created_at: work.created_at,
        status: work.status,
        contributors:
          work.work_person?.map((wp: any) => ({
            person_id: wp.person.person_id,
            name: wp.person.name,
            slug: wp.person.slug,
            contribution_role: wp.contribution_role,
            affiliation: wp.person.affiliation,
          })) || [],
        asset_count: work.asset?.length || 0,
        featured_asset: work.asset?.[0] || null,
      };
    }) || [];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Breadcrumb Navigation */}
      <nav className="breadcrumbs mb-2">
        <ul>
          <li>
            <Link href="/">Beranda</Link>
          </li>
          <li>
            <Link href="/work">Direktori Karya</Link>
          </li>
          <li className="font-semibold">{category.label}</li>
        </ul>
      </nav>

      {/* Header Section */}
      <header className="text-left mb-8 md:mb-12">
        <h1 className="text-3xl md:text-5xl lg:text-7xl mb-3 md:mb-4 font-bold">
          {category.label}
        </h1>
        <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6">
          <div className="badge badge-primary badge-md md:badge-lg">
            {works.length} Karya
          </div>
          <div className="badge badge-secondary badge-md md:badge-lg">
            {works.reduce((sum, work) => sum + (work.asset_count || 0), 0)} Aset
          </div>
          <div className="badge badge-accent badge-md md:badge-lg">
            {
              new Set(
                works.flatMap(
                  (work) => work.contributors?.map((c) => c.person_id) || []
                )
              ).size
            }{" "}
            Kontributor
          </div>
        </div>
        <p className="text-base md:text-lg text-gray-600 max-w-3xl leading-relaxed">
          Jelajahi koleksi karya dalam kategori{" "}
          <strong>{category.label}</strong>. Temukan berbagai proyek,
          penelitian, dan karya kreatif yang telah dikembangkan oleh mahasiswa
          Teknologi Pendidikan Indonesia.
        </p>
      </header>

      {/* Works Grid */}
      {works.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {works.map((work) => (
            <Link
              key={work.work_id}
              href={`/work/${work.slug}`}
              className="card  shadow-md hover:shadow-xl transition-shadow duration-300 group"
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
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
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
          <div className="text-6xl mb-4">📂</div>
          <h3 className="text-xl font-semibold mb-2">Belum Ada Karya</h3>
          <p>
            Kategori ini belum memiliki karya. Periksa kembali nanti untuk
            karya-karya baru.
          </p>
        </div>
      )}

      {/* Navigation to Other Categories */}
      <div className="text-center mt-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-4">Jelajahi Kategori Lainnya</h2>
        <p className="text-xl mb-6 text-blue-100">
          Temukan berbagai kategori karya lainnya dari mahasiswa Teknologi
          Pendidikan Indonesia.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/work"
            className="btn btn-outline btn-white border-white text-white hover:bg-white hover:text-blue-600"
          >
            Semua Karya
          </Link>
          <Link
            href="/person"
            className="btn btn-outline btn-white border-white text-white hover:bg-white hover:text-purple-600"
          >
            Direktori Eksibitor
          </Link>
        </div>
      </div>
    </div>
  );
}
