import { notFound } from "next/navigation";
import { getBlogPostBySlug, getAllBlogSlugs } from "@/lib/blog";
import MarkdownContent from "@/components/MarkdownContent";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const slugs = getAllBlogSlugs();
    return slugs.map((slug) => ({
      slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  try {
    const { slug } = await params;
    const post = getBlogPostBySlug(slug);

    if (!post) {
      return {
        title: "Post Not Found",
      };
    }

    return {
      title: post.title,
      description: post.description,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Error",
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="">
      <header className="flex bg-gray-200 w-full pt-16 pb-12 mb-8">
        <div className="max-w-7xl container mx-auto px-4 lg:px-0">
          <h1 className="text-3xl lg:text-5xl mb-4">{post.title}</h1>
          <p id="tldr" className="text-md lg:max-w-3/6">
            {post.description}
          </p>
          <p itemProp="author" className="text-sm mt-4">
            Diterbitkan oleh:{" "}
            <span className="font-semibold">{post.author}</span>
          </p>
        </div>
      </header>

      {/* <header className="mb-8">
        <div className="aspect-video rounded-xl overflow-hidden mb-6">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

        <div className="flex items-center text-gray-600 text-sm mb-4">
          <span>By {post.author}</span>
          <span className="mx-2">•</span>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>

        <p className="text-xl text-gray-700 leading-relaxed">
          {post.description}
        </p>
      </header> */}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-0 pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Article Content - 3/4 width */}
          <div className="lg:w-3/4">
            <div className="prose prose-lg prose-slate max-w-none">
              <MarkdownContent content={post.content} />
            </div>
          </div>

          {/* Sidebar - 1/4 width */}
          <aside className="lg:w-1/4">
            <div className="sticky top-8 space-y-6">
              {/* Featured Image */}
              {post.image && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Featured Image
                  </h3>
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Article Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Metadata artikel
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Diterbitkan pada:</span>{" "}
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <div>
                    <span className="font-medium">Penulis:</span> {post.author}
                  </div>
                </div>
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">Tag</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* Footer
      <footer className="mt-12 pt-8 border-t border-gray-200">
        <Link
          href="/blog"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Lihat artikel lainnya
        </Link>
      </footer> */}
    </article>
  );
}
