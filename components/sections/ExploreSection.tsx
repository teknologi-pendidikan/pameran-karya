/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { exploreItems } from "@/assets/data/homepage.data";

export default function ExploreSection() {
  return (
    <section id="explore" className="relative">
      <div className="container mx-auto px-4 my-8 py-8 flex flex-col items-center">
        <div className="text-center max-w-3xl">
          <h1 className="text-5xl mb-4">Explore and Discover</h1>
          <p className="text-lg text-gray-600">
            Jelajahi berbagai kategori dan temukan karya terbaik dari para
            mahasiswa Teknologi Pendidikan di seluruh Indonesia.
          </p>
        </div>

        {/* Area 1 - Explore Category */}
        <div className="w-full mx-auto mt-12 flex justify-center">
          <div className="flex flex-row gap-6 h-125 overflow-x-auto scrollbar-hide pb-4 px-4">
            {exploreItems.map((item, index) => (
              <Link
                href={item.link}
                key={item.id}
                className="min-w-[300px] h-full rounded-2xl overflow-hidden relative group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl shadow-lg flex-shrink-0"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Overlay Image */}
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-90 group-hover:brightness-75"
                  />
                )}

                {/* Dynamic Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 group-hover:via-black/40 transition-all duration-500"></div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-8 h-8 border-2 border-white/30 rounded-full group-hover:border-white/60 group-hover:scale-110 transition-all duration-300"></div>
                <div className="absolute top-6 right-6 w-4 h-4 bg-white/20 rounded-full group-hover:bg-white/40 group-hover:scale-125 transition-all duration-300 delay-75"></div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-between p-8 text-white z-20">
                  {/* Top Section */}
                  <div className="transform group-hover:-translate-y-2 transition-transform duration-500">
                    <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-medium backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300">
                      {item.type}
                    </span>
                  </div>

                  {/* Bottom Section */}
                  <div className="transform group-hover:translate-y-0 transition-all duration-500">
                    <h2 className="text-3xl font-bold mb-4 leading-tight group-hover:text-white transition-colors duration-300">
                      {item.title}
                    </h2>

                    {/* CTA Button */}
                    <div className="flex items-center space-x-2 text-white/80 group-hover:text-white transition-all duration-300 transform group-hover:translate-x-2">
                      <span className="font-medium">Explore Now</span>
                      <div className="w-8 h-8 border border-white/40 rounded-full flex items-center justify-center group-hover:border-white group-hover:bg-white/10 transition-all duration-300">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center max-w-2xl">
          <Link
            href="/work"
            className="inline-block text-blue-600 font-semibold hover:underline"
          >
            Lihat Semua Karya &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
