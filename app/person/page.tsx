import { createClient as createClientStatic } from "@supabase/supabase-js";
import Link from "next/link";

// Shared Supabase client for build-time operations
const getSupabaseClient = () =>
  createClientStatic(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
  );

interface Person {
  person_id: string;
  name: string;
  slug: string;
  bio?: string;
  image?: string;
  affiliation?: string;
  works_count?: number;
  tag?: string;
}

export const metadata = {
  title: "Direktori Eksibitor - Pameran Karya Teknologi Pendidikan",
  description:
    "Jelajahi profil dan karya para mahasiswa Teknologi Pendidikan Indonesia yang berpartisipasi dalam Pameran Karya.",
};

export default async function PersonDirectoryPage() {
  const supabase = getSupabaseClient();

  // Fetch all persons with their works count in a single efficient query
  const { data: personsWithCounts, error } = await supabase
    .from("person")
    .select(
      `
      *,
      work_person(count)
    `,
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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6">Direktori Eksibitor</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Temui para mahasiswa Teknologi Pendidikan dari seluruh Indonesia
            yang berpartisipasi dalam Pameran Karya. Jelajahi profil dan
            karya-karya inovatif mereka dalam bidang teknologi pendidikan.
          </p>
        </div>

        {/* Person Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {persons.map((person) => (
            <Link
              key={person.person_id}
              href={`/person/${person.slug}`}
              className="group block transition-transform hover:scale-105 hover:border-rose-100 border border-transparent shadow-sm rounded-lg overflow-hidden"
            >
              <div className="card card-side bg-base-100 shadow-sm w-full">
                <figure>
                  <img
                    src={person.image || "/placeholder-4x6.png"}
                    alt={person.name}
                    width={192}
                    height={192}
                    className="h-48 w-auto"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{person.name}</h2>
                  <p>{person.bio}</p>
                  <div className="flex flex-col gap-2">
                    {/* <div className="badge badge-secondary">
                      {person.works_count || 0} Karya
                    </div> */}
                    <div className="badge badge-outline text-xs">
                      {person.affiliation}
                    </div>
                    {person.tag && (
                      <div
                        className={`badge badge-outline text-xs
                        ${
                          person.tag === "Committee"
                            ? "bg-red-600 text-white"
                            : person.tag === "Operations"
                              ? "bg-blue-500 text-white"
                              : person.tag === "Volunteer"
                                ? "bg-green-600 text-white"
                                : "badge-gray"
                        }
                      }`}
                      >
                        {person.tag}
                      </div>
                    )}
                  </div>
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
