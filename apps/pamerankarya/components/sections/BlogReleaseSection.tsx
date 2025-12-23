import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blog";

export default function BlogReleaseSection() {
  const blogPosts = getAllBlogPosts().slice(0, 3); // Get only 3 posts

  if (blogPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-base-content mb-4">
            Rilisan dan Pengumuman
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Rilisan dan pengumuman terbaru seputar Pameran Karya Teknologi
            Pendidikan
          </p>
        </div>

        {/* Blog Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {blogPosts.map((post) => (
            <div key={post.slug} className="card bg-base-100 shadow-xl">
              <figure className="aspect-video relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </figure>
              <div className="card-body">
                <div className="flex flex-wrap gap-2 mb-2">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="badge badge-primary badge-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="card-title text-lg line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-base-content/70 line-clamp-3 text-sm">
                  {post.description}
                </p>
                <div className="flex items-center justify-between text-sm text-base-content/60 mt-2">
                  <span>{post.author}</span>
                  <span>
                    {new Date(post.date).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="card-actions justify-end mt-4">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="btn btn-primary btn-sm"
                  >
                    Baca Selengkapnya
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link href="/blog" className="btn btn-link btn-primary">
            Lihat Semua Artikel
          </Link>
        </div>
      </div>
    </section>
  );
}
