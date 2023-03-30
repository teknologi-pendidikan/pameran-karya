import Player_1 from "@/public/assets/img-jeniskarya.webp";
import Player_2 from "@/public/assets/img-jeniskarya.webp";
import Image from "next/image";
import Slider from "react-slick";
import SectionLayout from "@/components/template/section-layout";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function PlayerSelector() {
  const sliderSetting = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    cssEase: "linear",
  };
  return (
    <SectionLayout
      id="player-selector"
      ariaLabel="Gerbang akses pengunjung atau partisipan"
      title="Siapa Anda?"
    >
      {/* Player Selector Desktop Mode */}
      <div
        id="player-selector"
        className="hidden xl:flex flex-row justify-between items-center"
      >
        <div
          id="player-partisipan"
          className="text-3xl text-center saturate-0 hover:scale-110 hover:saturate-100 transition ease-in-out duration-500"
        >
          <Image src={Player_1} alt="player_1" />
          <h3>Partsipan Pameran</h3>
        </div>
        <div
          id="player-partisipan"
          className="text-3xl text-center saturate-0 hover:scale-110 hover:saturate-100 transition ease-in-out duration-500"
        >
          <Image src={Player_1} alt="player_1" />
          <h3>Partsipan Pameran</h3>
        </div>
        <div
          id="player-pengunjung"
          className="text-3xl text-center saturate-0 hover:scale-110 hover:saturate-100 transition ease-in-out duration-500"
        >
          <Image src={Player_2} alt="player_1" />
          <h3>Pengunjung Pameran</h3>
        </div>
      </div>

      {/* Player Selector Mobile Nav */}
      <div id="slider-container" className="block xl:hidden overflow-x-hidden">
        <Slider {...sliderSetting}>
          <div
            id="player-partisipan"
            className="text-3xl text-center saturate-0 hover:scale-110 hover:saturate-100 transition ease-in-out duration-500"
          >
            <Image src={Player_1} alt="player_1" />
            <h3>Partsipan Pameran</h3>
          </div>
          <div
            id="player-pengunjung"
            className="text-3xl text-center saturate-0 hover:scale-110 hover:saturate-100 transition ease-in-out duration-500"
          >
            <Image src={Player_2} alt="player_1" />
            <h3>Pengunjung Pameran</h3>
          </div>
        </Slider>
      </div>
    </SectionLayout>
  );
}
