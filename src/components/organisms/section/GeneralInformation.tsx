import Image from "next/image";
import Informasi from "@/public/assets/placeholder.webp";
import Link from "next/link";
import SectionLayout from "@/components/template/section-layout";

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
    <SectionLayout
      id="informasi-pengumuman"
      ariaLabel="Informasi & Pengumuman terkait Pameran Karya"
      title="Informasi & Pengumuman"
    >
      <div className="space-y-8 flex flex-col items-center justify-center">
        <Image src={Informasi} alt="informasi" />
        <div className="flex flex-row justify-around items-center w-full">
          {listpost.slice(0, 3).map((post) => (
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
    </SectionLayout>
  );
}
