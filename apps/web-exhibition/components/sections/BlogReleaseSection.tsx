import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blog";

export default function BlogReleaseSection() {
  const blogPosts = getAllBlogPosts().slice(0, 3); // Get only 3 posts

  if (blogPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-8 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Rilisan Terbaru
          </h2>
          <p className="text-base text-gray-600">
            Berita dan pengumuman terbaru
          </p>
        </div>

        {/* Blog Cards with Image Overlay */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <div className="relative h-40 md:h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex gap-1 mb-2">
                    {post.tags.slice(0, 1).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-white text-sm md:text-base font-semibold line-clamp-2 leading-tight">
                    {post.title}
                  </h3>
                  <div className="text-white/80 text-xs mt-1">
                    {new Date(post.date).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/blog"
            className=" inline-flex items-center px-4 py-2 text-md font-medium border rounded text-gray-800 hover:text-blue-700 hover:underline transition-colors"
          >
            Lihat Semua Pengumuman
          </Link>
        </div>
      </div>
    </section>
  );
}
