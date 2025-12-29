 
import { exploreItems, categoryItems } from "@/assets/data/homepage.data";
import ExploreCarousel from "@/components/ExploreCarousel";
import CategoryCarousel from "@/components/CategoryCarousel";
import Link from "next/link";

export default function ExplorePage() {
  return (
    <>
      <section className="container mx-auto px-4 my-2 py-8 flex flex-col items-start max-w-7xl space-y-12">
        <div className="text-left w-full max-w-3xl">
          <h1 className="text-5xl mb-4">Jelajah koleksi kami</h1>
          <p className="text-lg text-gray-600">
            Jelajahi berbagai kategori dan temukan karya terbaik dari para
            mahasiswa Teknologi Pendidikan di seluruh Indonesia.
          </p>
        </div>
        <div className="w-full">
          <div className="max-w-3xl mb-4 sm:mb-6">
            <h1 className="text-xl sm:text-2xl mb-2 sm:mb-4">Teratas</h1>
          </div>
          {/* Area 1 - Explore Category */}
          <ExploreCarousel items={exploreItems} />
        </div>

        <div className="w-full">
          <div className="max-w-3xl mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl mb-2 sm:mb-4">Kategori</h2>
          </div>
          {/* Area 2 - Categories */}
          <CategoryCarousel items={categoryItems} />
        </div>
        <div className="mt-12 text-center max-w-2xl">
          <Link
            href="/work"
            className="inline-block text-blue-600 font-semibold hover:underline"
          >
            Saya ingin melihat semua karya! &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
