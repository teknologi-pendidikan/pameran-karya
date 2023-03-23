import FrameChara from "../../../public/frame-chara.png";
import Image from "next/image";
import SectionTitle from "@components/atoms/section-title";

export default function JenisKarya() {
  return (
    <div className="container mx-auto mt-28">
        <SectionTitle title="Kategori Karya Pameran" />
      <div className="flex flex-row items-center justify-center space-x-4">
        <Image
          src={FrameChara}
          alt="frame-chara"
          priority
          quality={50}
          className="transition ease-in-out duration-500 saturate-50 hover:scale-110 hover:saturate-100"
        />
        <Image
          src={FrameChara}
          alt="frame-chara"
          priority
          quality={50}
          className="transition ease-in-out duration-500 saturate-50 hover:scale-110 hover:saturate-100"
        />
        <Image
          src={FrameChara}
          alt="frame-chara"
          priority
          quality={50}
          className="transition ease-in-out duration-500 saturate-50 hover:scale-110 hover:saturate-100"
        />
        <Image
          src={FrameChara}
          alt="frame-chara"
          priority
          quality={50}
          className="transition ease-in-out duration-500 saturate-50 hover:scale-110 hover:saturate-100"
        />
      </div>
    </div>
  );
}
