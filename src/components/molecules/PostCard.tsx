import Image from "next/image";
import Link from "next/link";

type PostCardProps = {
  title: string;
  desc: string;
  link: string;
  image: string;
};

export default function PostCard({ link, title, desc, image }: PostCardProps) {
  console.log(title);
  return (
    <div className="border border-gray-200 m-2 rounded-xl shadow-lg overflow-hidden flex flex-col transition ease-in-out duration-500 hover:scale-110">
      <Link href={`/post/${link}`}>
        <Image width={500} height={300} alt={title} src={`/${image}`} />
        <h1 className="p-4">{title}</h1>
      </Link>
    </div>
  );
}
