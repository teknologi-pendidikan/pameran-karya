import { createClient as createClientStatic } from "@supabase/supabase-js";
import Link from "next/link";
import { Metadata } from "next";
import { openGraphGlobalMetadata } from "@/app/global-metadata";

export const metadata: Metadata = {
  title: "Direktori Eksibitor",
  description:
    "Temui para mahasiswa Teknologi Pendidikan dari seluruh Indonesia yang berpartisipasi dalam Pameran Karya. Jelajahi profil dan karya-karya inovatif mereka dalam bidang teknologi pendidikan.",
  authors: [
    {
      name: "Teknologi Pendidikan ID",
      url: "https://teknologipendidikan.or.id",
    },
    {
      name: "Ikatan Mahasiswa Teknologi Pendidikan Indonesia",
      url: "https://imatepsi.or.id",
    },
  ],
  openGraph: {
    ...openGraphGlobalMetadata,
    title: "Direktori Eksibitor",
    description:
      "Temui para mahasiswa Teknologi Pendidikan dari seluruh Indonesia yang berpartisipasi dalam Pameran Karya. Jelajahi profil dan karya-karya inovatif mereka dalam bidang teknologi pendidikan.",
    url: "https://pamerankarya.teknologipendidikan.or.id/person",
  },
};

// Shared Supabase client for build-time operations
const getSupabaseClient = () =>
  createClientStatic(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
  );

interface Person {
  person_id: string;
  name: string;
  slug: string;
  bio?: string;
  image?: string;
  affiliation?: {
    affiliation_id: string;
    name: string;
    short_name?: string;
    type: string;
  };
  works_count?: number;
  tag?: string;
}

export default async function PersonDirectoryPage() {
  const supabase = getSupabaseClient();

  // Fetch all persons with their works count in a single efficient query
  const { data: personsWithCounts, error } = await supabase
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
      work_person(count)
    `
    )
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching persons:", error);
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Error Loading Persons</h1>
          <p className="text-gray-600">
            Unable to load the person directory at this time.
          </p>
        </div>
      </div>
    );
  }

  // Transform the data to include works_count
  const persons =
    personsWithCounts?.map((person) => ({
      ...person,
    })) || [];

  return <PersonDirectoryContent persons={persons} />;
}

function PersonDirectoryContent({ persons }: { persons: Person[] }) {
  if (!persons || persons.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Direktori Person</h1>
          <p className="text-gray-600">Belum ada person yang terdaftar.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-5xl mb-6">Direktori Eksibitor</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Temui para mahasiswa Teknologi Pendidikan dari seluruh Indonesia
            yang berpartisipasi dalam Pameran Karya. Jelajahi profil dan
            karya-karya inovatif mereka dalam bidang teknologi pendidikan.
          </p>
        </div>

        {/* Person Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {persons.map((person) => (
            <Link
              key={person.person_id}
              href={`/person/${person.slug}`}
              className="group block transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            >
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-full">
                {/* Profile Image */}
                <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 aspect-[4/5]">
                  <img
                    src={
                      person.image ||
                      "/placeholder-foto-praktikum-lego-16x9.webp"
                    }
                    alt={person.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Tag Badge - Positioned on image */}
                  {person.tag && (
                    <div
                      className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium shadow-sm
                        ${
                          person.tag === "Committee"
                            ? "bg-red-500 text-white"
                            : person.tag === "Operations"
                              ? "bg-blue-500 text-white"
                              : person.tag === "Volunteer"
                                ? "bg-green-500 text-white"
                                : "bg-gray-500 text-white"
                        }
                      `}
                    >
                      {person.tag}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {person.name}
                  </h3>

                  {person.bio && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
                      {person.bio}
                    </p>
                  )}

                  {/* Affiliation */}
                  {person.affiliation?.name && (
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-1 4h1m1-4h1m-1 4h1"
                        />
                      </svg>
                      <span className="truncate">
                        {person.affiliation.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-4">
            Bergabung dengan Pameran Karya
          </h2>
          <p className="text-xl mb-6 text-blue-100">
            Ingin menampilkan karya Anda? Bergabunglah dengan komunitas
            Teknologi Pendidikan Indonesia.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Pelajari Lebih Lanjut
          </Link>
        </div>
      </div>
    </div>
  );
}
