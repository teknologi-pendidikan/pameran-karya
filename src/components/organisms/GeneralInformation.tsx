import Image from "next/image";
import Informasi from "@/public/assets/placeholder.webp";
import Link from "next/link";

type Props = {
  listpost: {
    slug: string;
    frontmatter: {
      title: string;
      image: string;
    };
  }[];
};

export default function GeneralInformation({ listpost }: Props) {
  return (
    <section
      className="space-y-24 my-40"
      id="informasi-pengumuman"
      aria-label="Informasi & Pengumuman terkait Pameran Karya"
    >
      <div className="space-y-8 flex flex-col items-center justify-center">
        <div className="space-y-3">
          <h2 className="text-4xl text-grey-700 font-display font-semibold text-center">
            Informasi & Pengumuman
          </h2>
        </div>
        <Image src={Informasi} alt="informasi" />
        <div className="grid grid-cols-1 xl:grid-cols-3">
          {listpost.map((post) => (
            <div
              id={post.slug}
              key={post.slug}
              className="border border-theme-flower m-2 rounded-md shadow-lg overflow-hidden flex flex-col transition ease-in-out duration-500 hover:scale-110 bg-theme-blue-dark text-theme-white hover:shadow-theme-flower hover:shadow-2xl"
            >
              <Link href={`/post/${post.slug}`}>
                <Image
                  width={450}
                  height={300}
                  alt={post.frontmatter.title}
                  src={`/${post.frontmatter.image}`}
                  className="hidden xl:block"
                />
                <p className="py-2 px-1 font-semibold text-center">
                  {post.frontmatter.title}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
