import Image from "next/image";
import Link from "next/link";

type PostCardProps = {
  title: string;
  desc: string;
  link: string;
  image: string;
};

export default function PostCard({ link, title, image }: PostCardProps) {
  console.log(title);
  return (
    <div className="border border-theme-flower rounded-md shadow-lg overflow-hidden flex flex-col transition ease-in-out duration-500 hover:scale-110">
      <Link href={`/post/${link}`}>
        <Image width={500} height={300} alt={title} src={`/${image}`} />
        <h2 className="">{title}</h2>
      </Link>
    </div>
  );
}
