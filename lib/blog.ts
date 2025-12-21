import fs from "fs";
import path from "path";
import matter from "gray-matter";

const blogDirectory = path.join(process.cwd(), "assets/blog");

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  image: string;
  content: string;
}

// Cache for blog posts to avoid re-reading files
let blogPostsCache: BlogPost[] | null = null;
let cacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

function createSlugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .trim();
}

function loadBlogPosts(): BlogPost[] {
  // Return cached version if still valid
  if (blogPostsCache && Date.now() - cacheTime < CACHE_DURATION) {
    return blogPostsCache;
  }

  try {
    if (!fs.existsSync(blogDirectory)) {
      return [];
    }

    const fileNames = fs.readdirSync(blogDirectory);
    const allPostsData = fileNames
      .filter((fileName) => fileName.endsWith(".mdx"))
      .map((fileName) => {
        try {
          const fullPath = path.join(blogDirectory, fileName);
          const fileContents = fs.readFileSync(fullPath, "utf8");
          const { data, content } = matter(fileContents);

          // Create slug from title instead of filename
          const slug = createSlugFromTitle(
            data.title || fileName.replace(/\.mdx$/, ""),
          );

          return {
            slug,
            title: data.title || "Untitled",
            description: data.description || "",
            date: data.date || new Date().toISOString(),
            author: data.author || "Unknown",
            tags: data.tags || [],
            image: data.image || "/placeholder-16x9.jpg",
            content,
          } as BlogPost;
        } catch (error) {
          console.error(`Error reading blog post ${fileName}:`, error);
          return null;
        }
      })
      .filter((post): post is BlogPost => post !== null);

    // Sort posts by date (newest first)
    const sortedPosts = allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));

    // Update cache
    blogPostsCache = sortedPosts;
    cacheTime = Date.now();

    return sortedPosts;
  } catch (error) {
    console.error("Error loading blog posts:", error);
    return [];
  }
}

export function getAllBlogPosts(): BlogPost[] {
  return loadBlogPosts();
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  const allPosts = loadBlogPosts();
  return allPosts.find((post) => post.slug === slug) || null;
}

export function getAllBlogSlugs(): string[] {
  return loadBlogPosts().map((post) => post.slug);
}
