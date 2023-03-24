// @ts-nocheck
import fs from "fs";
import matter from "gray-matter";
import md from "markdown-it";
import Head from "next/head";

type slugtype = {
  params: {
    slug: string;
  };
};

type frontmattertype = {
  title: string;
  date: string;
  desc: string;
  cover_image: string;
};

export async function getStaticPaths() {
  const files = fs.readdirSync("posts");
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(".md", ""),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }: slugtype) {
  const fileName = fs.readFileSync(`posts/${slug}.md`, "utf-8");
  const { data: frontmatter, content } = matter(fileName);
  return {
    props: {
      frontmatter,
      content,
    },
  };
}

export default function PostPage({
  frontmatter,
  content,
}: {
  frontmatter: frontmattertype;
  content: string;
}) {
  return (
    <main className="container mx-auto px-32 mt-16 mb-24">
      <Head>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.desc} />
      </Head>
      <article className="prose prose-xl max-w-none">
        <h1>{frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: md().render(content) }} />
      </article>
    </main>
  );
}
