/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { exploreItems } from "@/assets/data/homepage.data";

export default function Page() {
  return (
    <main>
      <section id="explore" className="relative">
        <div className="container mx-auto px-4 my-8 py-8 flex flex-col items-center">
          <div className="text-center max-w-3xl">
            <h1 className="text-5xl mb-4">Explore and Discover</h1>
          </div>

          {/* Area 1 - Explore Category */}
          <div className="w-full mx-auto mt-12">
            <div className="flex flex-row gap-6 h-[500px] overflow-x-auto scrollbar-hide mx-auto pb-4">
              {exploreItems.map((item, index) => (
                <Link
                  href={item.link}
                  key={item.id}
                  className="min-w-[350px] h-full rounded-2xl overflow-hidden relative group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl shadow-lg"
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
        </div>
      </section>

      {/* Area 2 - Featured Photo */}
      <section className="container mx-auto px-4 my-16">
        <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden relative group cursor-pointer transform transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl shadow-lg">
          {/* Background Image */}
          <div className="h-[600px] relative">
            <img
              src="/placeholder-16x9.jpg"
              alt="Universitas Negeri Malang"
              className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 brightness-75 group-hover:brightness-50"
            />
          </div>

          {/* Dynamic Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-purple-800/50 to-indigo-900/70 group-hover:from-blue-900/80 group-hover:via-purple-800/70 group-hover:to-indigo-900/90 transition-all duration-700"></div>

          {/* Animated Particles */}
          <div className="absolute top-20 left-20 w-3 h-3 bg-white/30 rounded-full group-hover:bg-white/60 group-hover:scale-150 transition-all duration-500"></div>
          <div className="absolute top-40 right-32 w-2 h-2 bg-white/20 rounded-full group-hover:bg-white/50 group-hover:scale-125 transition-all duration-700 delay-100"></div>
          <div className="absolute bottom-32 left-32 w-4 h-4 border border-white/20 rounded-full group-hover:border-white/50 group-hover:rotate-45 transition-all duration-600 delay-200"></div>

          {/* Content Container */}
          <div className="absolute inset-0 flex items-center p-12">
            <div className="max-w-2xl text-white">
              {/* University Badge */}
              <div className="inline-block mb-6 transform group-hover:-translate-y-2 transition-transform duration-500">
                <span className="px-4 py-2 bg-white/15 backdrop-blur-md rounded-full text-sm font-medium border border-white/20 group-hover:bg-white/25 group-hover:border-white/40 transition-all duration-300">
                  🎓 Featured Institution
                </span>
              </div>

              {/* Main Title */}
              <h1 className="text-6xl font-bold mb-6 leading-tight transform group-hover:translate-x-4 transition-all duration-700">
                <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                  Universitas Negeri Malang
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl mb-8 text-white/90 leading-relaxed transform group-hover:translate-x-2 transition-all duration-500 delay-100">
                Melahirkan generasi unggul dalam bidang teknologi pendidikan
                yang inovatif dan berkelanjutan untuk masa depan Indonesia yang
                cerah.
              </p>

              {/* CTA Section */}
              <div className="flex items-center space-x-6 transform group-hover:translate-y-0 transition-all duration-500 delay-200">
                <Link
                  href="/university/malang"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3"
                >
                  <span>Jelajahi Lebih Dalam</span>
                  <svg
                    className="w-5 h-5"
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
                </Link>

                {/* Stats */}
                <div className="flex space-x-6 text-white/80">
                  <div className="text-center group-hover:text-white transition-colors duration-300">
                    <div className="text-2xl font-bold">150+</div>
                    <div className="text-sm">Karya</div>
                  </div>
                  <div className="text-center group-hover:text-white transition-colors duration-300">
                    <div className="text-2xl font-bold">45</div>
                    <div className="text-sm">Mahasiswa</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Action Indicator */}
          <div className="absolute bottom-8 right-8 group-hover:bottom-10 group-hover:right-10 transition-all duration-300">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
              <svg
                className="w-6 h-6 text-white group-hover:rotate-45 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </div>
          </div>

          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1500 ease-out"></div>
        </div>
      </section>

      {/* Area 4 - Featured Photography from Students */}
      <section className="container mx-auto px-4 my-16">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-purple-800 to-indigo-900 bg-clip-text text-transparent">
              Student Photography Showcase
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover the creative vision of our talented students through
              their captivating photography work, showcasing diverse
              perspectives and innovative techniques.
            </p>
          </div>

          {/* Photography Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-auto">
            {/* Photo 1 - Large Portrait */}
            <div className="md:col-span-2 lg:row-span-2 group cursor-pointer">
              <div className="relative h-96 lg:h-[600px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:scale-[1.02]">
                <img
                  src="/placeholder-4x6.png"
                  alt="Student Photography"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <div className="mb-2">
                    <span className="px-3 py-1 bg-purple-600 rounded-full text-xs font-medium">
                      Portrait
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Urban Solitude</h3>
                  <div className="flex items-center space-x-3">
                    <img
                      src="/placeholder-4x6.png"
                      alt="Student"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium">Sarah Putri</p>
                      <p className="text-sm text-white/80">
                        Universitas Brawijaya
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Photo 2 - Medium Landscape */}
            <div className="lg:col-span-2 group cursor-pointer">
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:scale-[1.02]">
                <img
                  src="/placeholder-16x9.jpg"
                  alt="Student Photography"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <div className="mb-2">
                    <span className="px-3 py-1 bg-green-600 rounded-full text-xs font-medium">
                      Landscape
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    Mountain Reflection
                  </h3>
                  <div className="flex items-center space-x-3">
                    <img
                      src="/placeholder-4x6.png"
                      alt="Student"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium">Andi Wijaya</p>
                      <p className="text-sm text-white/80">
                        Universitas Negeri Malang
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Photo 3 - Square Abstract */}
            <div className="group cursor-pointer">
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:scale-[1.02]">
                <img
                  src="/placeholder-4x6.png"
                  alt="Student Photography"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <div className="mb-2">
                    <span className="px-3 py-1 bg-orange-600 rounded-full text-xs font-medium">
                      Abstract
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Color Symphony</h3>
                  <div className="flex items-center space-x-2">
                    <img
                      src="/placeholder-4x6.png"
                      alt="Student"
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium">Maya Chen</p>
                      <p className="text-xs text-white/80">UIN Malang</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Photo 4 - Tall Portrait */}
            <div className="lg:row-span-2 group cursor-pointer">
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:scale-[1.02]">
                <img
                  src="/placeholder-4x6.png"
                  alt="Student Photography"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <div className="mb-2">
                    <span className="px-3 py-1 bg-blue-600 rounded-full text-xs font-medium">
                      Street
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">City Life</h3>
                  <div className="flex items-center space-x-3">
                    <img
                      src="/placeholder-4x6.png"
                      alt="Student"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium">Reza Pratama</p>
                      <p className="text-sm text-white/80">
                        Universitas Brawijaya
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Photo 5 - Wide Panoramic */}
            <div className="md:col-span-2 group cursor-pointer">
              <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:scale-[1.02]">
                <img
                  src="/placeholder-16x9.jpg"
                  alt="Student Photography"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <div className="mb-2">
                    <span className="px-3 py-1 bg-teal-600 rounded-full text-xs font-medium">
                      Nature
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Sunset Horizon</h3>
                  <div className="flex items-center space-x-3">
                    <img
                      src="/placeholder-4x6.png"
                      alt="Student"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium">Indira Sari</p>
                      <p className="text-sm text-white/80">
                        Universitas Negeri Malang
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Photo 6 - Small Square */}
            <div className="group cursor-pointer">
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:scale-[1.02]">
                <img
                  src="/placeholder-4x6.png"
                  alt="Student Photography"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <div className="mb-2">
                    <span className="px-3 py-1 bg-pink-600 rounded-full text-xs font-medium">
                      Macro
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Morning Dew</h3>
                  <div className="flex items-center space-x-2">
                    <img
                      src="/placeholder-4x6.png"
                      alt="Student"
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium">Dewa Putra</p>
                      <p className="text-xs text-white/80">UIN Malang</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <Link
              href="/photography"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 space-x-3"
            >
              <span>View All Photography</span>
              <svg
                className="w-5 h-5"
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
            </Link>
          </div>
        </div>
      </section>

      {/* Area 3 - Follow Us */}
      <section className="container mx-auto px-4 my-4 py-8">
        <div className="max-w-7xl mx-auto rounded-2xl overflow-hidden relative group cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
          {/* Background Image */}
          <img
            src="/placeholder-16x9.jpg"
            alt="Follow us on Instagram"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 via-pink-600/80 to-orange-500/90 group-hover:from-purple-700/95 group-hover:via-pink-700/85 group-hover:to-orange-600/95 transition-all duration-500"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-row items-center min-h-[200px] p-8">
            {/* Instagram Icon */}
            <div className="flex-shrink-0 mr-8">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                <svg
                  className="w-10 h-10 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
            </div>

            {/* Text Content */}
            <div className="flex-grow text-white">
              <h1 className="text-4xl font-bold mb-4 group-hover:translate-x-2 transition-transform duration-300">
                Follow Us on Instagram
              </h1>
              <p className="text-lg mb-6 opacity-90 group-hover:opacity-100 transition-all duration-300">
                Stay updated with our latest news, behind-the-scenes content,
                and connect with our community.
              </p>
              <div className="flex items-center space-x-2 text-white/80 group-hover:text-white transition-colors duration-300">
                <span className="text-sm font-medium">@pamerankarya</span>
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
      </section>
    </main>
  );
}
