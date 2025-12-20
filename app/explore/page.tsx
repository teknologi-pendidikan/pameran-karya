/* eslint-disable @next/next/no-img-element */
import { exploreItems, categoryItems } from "@/assets/data/homepage.data";
import ExploreCarousel from "@/components/ExploreCarousel";
import CategoryCarousel from "@/components/CategoryCarousel";

export default function ExplorePage() {
  return (
    <>
      <section className="container mx-auto px-4 my-2 py-8 flex flex-col items-start max-w-7xl space-y-12">
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
      </section>
    </>
  );
}
