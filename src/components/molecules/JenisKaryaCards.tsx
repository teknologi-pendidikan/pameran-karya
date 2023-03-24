import Image, { StaticImageData } from "next/image";
import Link from "next/link";

type JenisKaryaCardProps = {
  title: string;
  image: StaticImageData;
  link: string;
};

export default function JenisKaryaCard(props: JenisKaryaCardProps) {
  return (
    <Link
      href={props.link}
      className="transition ease-in-out duration-500 saturate-50 hover:scale-110 hover:saturate-100"
    >
      <Image src={props.image} alt={props.title} quality={50} />
    </Link>
  );
}
