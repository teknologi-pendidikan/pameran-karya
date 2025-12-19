/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

interface FeaturedUniversityProps {
  title?: string;
  description?: string;
  image?: string;
  link?: string;
  stats?: {
    works: number;
    students: number;
  };
}

export default function FeaturedUniversity({
  title = "Universitas Negeri Malang",
  description = "Melahirkan generasi unggul dalam bidang teknologi pendidikan yang inovatif dan berkelanjutan untuk masa depan Indonesia yang cerah.",
  image = "/placeholder-16x9.jpg",
  link = "/university/malang",
  stats = { works: 150, students: 45 },
}: FeaturedUniversityProps) {
  return (
    <section className="container mx-auto px-4 my-16">
      <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden relative group cursor-pointer transform transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl shadow-lg">
        {/* Background Image */}
        <div className="h-[600px] relative">
          <img
            src={image}
            alt={title}
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
                {title}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl mb-8 text-white/90 leading-relaxed transform group-hover:translate-x-2 transition-all duration-500 delay-100">
              {description}
            </p>

            {/* CTA Section */}
            <div className="flex items-center space-x-6 transform group-hover:translate-y-0 transition-all duration-500 delay-200">
              <Link
                href={link}
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
                  <div className="text-2xl font-bold">{stats.works}+</div>
                  <div className="text-sm">Karya</div>
                </div>
                <div className="text-center group-hover:text-white transition-colors duration-300">
                  <div className="text-2xl font-bold">{stats.students}</div>
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
  );
}
