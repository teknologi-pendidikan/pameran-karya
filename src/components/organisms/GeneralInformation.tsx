import Image from "next/image";
import Informasi from "@/public/placeholder.png";
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
    <section className="space-y-24 my-40" id="informasi-pengumuman">
      <div className="space-y-8 flex flex-col items-center justify-center">
        <div className="space-y-3">
          <h2 className="text-4xl text-grey-700 font-display font-semibold text-center">
            Informasi & Pengumuman
          </h2>
        </div>
        <Image src={Informasi} alt="informasi" />
        <div className="grid grid-cols-3">
          {listpost.map((post) => (
            <div
              id={post.slug}
              key={post.slug}
              className="border border-gray-200 m-2 rounded-xl shadow-lg overflow-hidden flex flex-col transition ease-in-out duration-500 hover:scale-110"
            >
              <Link href={`/post/${post.slug}`}>
                <Image
                  width={450}
                  height={300}
                  alt={post.frontmatter.title}
                  src={`/${post.frontmatter.image}`}
                />
                <p className="p-4 font-semibold text-center">
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
