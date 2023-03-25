import SectionTitle from "@components/atoms/section-title";
import Player_1 from "../../../public/frame-chara-selector.webp";
import Player_2 from "../../../public/frame-chara-selector-2.webp";
import Image from "next/image";

export default function PlayerSelector() {
  return (
    <section className="mt-28" id="player-selector">
      <SectionTitle title="Siapa Anda?" />
      <div className="flex flex-row items-center justify-center space-x-[20rem]">
        <div className="text-3xl text-center saturate-0 hover:scale-110 hover:saturate-100 transition ease-in-out duration-500">
          <Image src={Player_1} alt="player_1" />
          <h3>Partsipan Pameran</h3>
        </div>
        <div className="text-3xl text-center saturate-0 hover:scale-110 hover:saturate-100 transition ease-in-out duration-500">
          <Image src={Player_2} alt="player_1" />
          <h3>Pengunjung Pameran</h3>
          <div className="absolute top-0 -left-0 bg-black bg-opacity-50">
            <p>test area</p>
          </div>
        </div>
      </div>
    </section>
  );
}
