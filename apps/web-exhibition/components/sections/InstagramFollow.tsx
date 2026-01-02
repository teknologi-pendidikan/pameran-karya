 
import Link from "next/link";

interface InstagramFollowProps {
  title?: string;
  description?: string;
  handle?: string;
  image?: string;
  link?: string;
}

export default function InstagramFollow({
  title = "Follow Us on Instagram",
  description = "Stay updated with our latest news, behind-the-scenes content, and connect with our community.",
  handle = "@pamerankaryatep",
  image = "/placeholder-foto-praktikum-lego-16x9.webp",
  link = "https://instagram.com/pamerankaryatep",
}: InstagramFollowProps) {
  return (
    <section className="container mx-auto px-4 my-4 py-4 md:py-8">
      <div className="max-w-7xl mx-auto rounded-xl md:rounded-2xl overflow-hidden relative group cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
        {/* Background Image */}
        <img
          src={image}
          alt="Follow us on Instagram"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 via-pink-600/80 to-orange-500/90 group-hover:from-purple-700/95 group-hover:via-pink-700/85 group-hover:to-orange-600/95 transition-all duration-500"></div>

        {/* Content */}
        <Link
          href={link}
          className="relative z-10 flex flex-col md:flex-row items-center min-h-[160px] md:min-h-[200px] p-6 md:p-8 block"
        >
          {/* Instagram Icon */}
          <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-8">
            <div className="w-16 md:w-20 h-16 md:h-20 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
              <svg
                className="w-8 md:w-10 h-8 md:h-10 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-grow text-white text-center md:text-left">
            <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 group-hover:translate-x-0 md:group-hover:translate-x-2 transition-transform duration-300">
              {title}
            </h2>
            <p className="text-base md:text-lg mb-4 md:mb-6 opacity-90 group-hover:opacity-100 transition-all duration-300">
              {description}
            </p>
            <div className="flex items-center justify-center md:justify-start space-x-2 text-white/80 group-hover:text-white transition-colors duration-300">
              <span className="text-sm font-medium">{handle}</span>
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
        </Link>
      </div>
    </section>
  );
}
