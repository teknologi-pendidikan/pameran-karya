import { createClient as createClientStatic } from "@supabase/supabase-js";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Person {
  person_id: string;
  name: string;
  slug: string;
  bio?: string;
  affiliation?: string;
  works_count?: number;
}

export const metadata = {
  title: "Direktori Person - Pameran Karya Teknologi Pendidikan",
  description:
    "Jelajahi profil dan karya para mahasiswa Teknologi Pendidikan Indonesia yang berpartisipasi dalam Pameran Karya.",
};

export default async function PersonDirectoryPage() {
  // For static generation, use direct Supabase client without cookies
  const supabase = createClientStatic(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
  );

  // Fetch all persons with their works count
  const { data: persons, error } = await supabase
    .from("person")
    .select("*")
    .order("name", { ascending: true });

  // Fetch works count for each person using the work_person junction table
  let personsWithCounts = persons;
  if (persons) {
    personsWithCounts = await Promise.all(
      persons.map(async (person) => {
        const { count } = await supabase
          .from("work_person")
          .select("*", { count: "exact", head: true })
          .eq("person_id", person.person_id);
        return { ...person, works_count: count || 0 };
      })
    );
  }

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

  if (!personsWithCounts || personsWithCounts.length === 0) {
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
          <h1 className="text-5xl font-bold mb-6">Direktori Person</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Temui para mahasiswa Teknologi Pendidikan dari seluruh Indonesia
            yang berpartisipasi dalam Pameran Karya. Jelajahi profil dan
            karya-karya inovatif mereka dalam bidang teknologi pendidikan.
          </p>
          <div className="mt-6">
            <Badge variant="outline" className="text-lg px-4 py-2">
              {personsWithCounts.length} Person Terdaftar
            </Badge>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {personsWithCounts.length}
            </div>
            <div className="text-blue-800 font-medium">Total Person</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {personsWithCounts.reduce(
                (sum, person) => sum + (person.works_count || 0),
                0
              )}
            </div>
            <div className="text-green-800 font-medium">Total Karya</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {
                personsWithCounts.filter(
                  (person) => (person.works_count || 0) > 0
                ).length
              }
            </div>
            <div className="text-purple-800 font-medium">Person Aktif</div>
          </div>
        </div>

        {/* Person Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {personsWithCounts.map((person) => (
            <Link
              key={person.person_id}
              href={`/person/${person.slug}`}
              className="group block transition-transform hover:scale-105"
            >
              <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-4 pt-6">
                  <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                    {person.name}
                  </CardTitle>
                  {person.affiliation && (
                    <CardDescription className="text-xs text-blue-600 font-medium mb-2">
                      {person.affiliation}
                    </CardDescription>
                  )}
                  {person.bio && (
                    <CardDescription className="line-clamp-3 text-sm leading-relaxed">
                      {person.bio}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex justify-center">
                    <Badge
                      variant={
                        person.works_count && person.works_count > 0
                          ? "default"
                          : "secondary"
                      }
                    >
                      {person.works_count || 0} Karya
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8">
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
