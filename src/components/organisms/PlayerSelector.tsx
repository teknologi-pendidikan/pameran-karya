import SectionTitle from "@components/atoms/section-title";
import Player_1 from "@/public/assets/img-jeniskarya.webp";
import Player_2 from "@/public/assets/img-jeniskarya.webp";
import Image from "next/image";
import Slider from "react-slick";

export default function PlayerSelector() {
  const sliderSetting = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    cssEase: "linear",
  };
  return (
    <section
      className="mt-28 overflow-x-hidden"
      id="player-selector"
      aria-label="Gerbang akses pengunjung atau partisipan"
    >
      <SectionTitle title="Siapa Anda?" />
      <div id="slider-container">
        <Slider {...sliderSetting} className="block xl:hidden">
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

      <style jsx>{`
        .slick-slider .slick-arrow:before {
          color: #333;
          font-size: 2rem;
        }

        .slick-slider .slick-dots button:before {
          font-size: 1.5rem;
          color: teal;
        }

        .slick-slider .slick-dots li.slick-active button::before {
          color: teal;
        }
        .slick-slider .slick-dots {
          bottom: -44px;
        }

        .slick-slider .slick-dots li {
          margin: 0 0.5rem;
        }
      `}</style>
    </section>
  );
}
