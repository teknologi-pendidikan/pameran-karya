/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient as createClientStatic } from "@supabase/supabase-js";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { WorkDirectoryClient } from "@/app/work/WorkDirectoryClient";

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
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
  );

export const metadata = {
  title: "Direktori Karya - Pameran Karya Teknologi Pendidikan",
  description:
    "Jelajahi koleksi karya inovatif dari mahasiswa Teknologi Pendidikan Indonesia. Temukan berbagai proyek, penelitian, dan karya kreatif dalam bidang teknologi pendidikan.",
  keywords:
    "karya teknologi pendidikan, student work, innovation, educational technology, research",
};

// Server component to fetch data
async function getWorksData() {
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
    `
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching works:", error);
    return null;
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
          contribution_role: wp.contribution_role,
          affiliation: wp.person.affiliation,
        })) || [],
      asset_count: work.asset?.length || 0,
      featured_asset: work.asset?.[0] || null,
    })) || [];

  return works;
}

export default async function WorkDirectoryPage() {
  const works = await getWorksData();

  if (!works) {
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

  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse">
              <div className="h-16 bg-gray-200 rounded mb-8"></div>
              <div className="h-16 bg-gray-200 rounded mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="card bg-gray-100">
                    <div className="h-48 bg-gray-200"></div>
                    <div className="card-body">
                      <div className="h-6 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded mb-4"></div>
                      <div className="h-16 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      }
    >
      <WorkDirectoryClient initialWorks={works} />
    </Suspense>
  );
}
