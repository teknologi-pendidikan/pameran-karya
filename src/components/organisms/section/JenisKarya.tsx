import frame2D from "@/public/assets/Kategorisasi_2D.png";
import frame3D from "@/public/assets/Kategorisasi_3D.png";
import frameEbook from "@/public/assets/Kategorisasi_Ebook.png";
import frameMI from "@/public/assets/Kategorisasi_MI.png";
import framePresentasi from "@/public/assets/Kategorisasi_PPT.png";
import frameVideo from "@/public/assets/Kategorisasi_VidNimasi.png";
import SectionLayout from "@/components/template/section-layout";
import JenisKaryaCard from "@components/molecules/JenisKaryaCards";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const jeniskarya = [
  {
    id: 1,
    title: "Media E-Book & Modul Ajar",
    image: frameEbook,
    link: "/karya/dokumenpembelajaran",
  },
  {
    id: 2,
    title: "Media 2D",
    image: frame2D,
    link: "/karya/2d",
  },
  {
    id: 3,
    title: "Media 3D",
    image: frame3D,
    link: "/comingsoon",
  },
  {
    id: 4,
    title: "Video & Animasi Pembelajaran",
    image: frameVideo,
    link: "/karya/videopembelajaran",
  },
  {
    id: 5,
    title: "Media Presentasi",
    image: framePresentasi,
    link: "/comingsoon",
  },
  {
    id: 6,
    title: "Multimedia Interaktif",
    image: frameMI,
    link: "/comingsoon",
  },
];

export default function JenisKarya() {
  const sliderSetting = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    cssEase: "linear",
    arrows: false,
  };
  return (
    <SectionLayout
      id="kategori-karya"
      ariaLabel="Kategori karya yang dipamerkan"
      title="Kategori Karya"
    >
      <div
        id="karyacard-desktop"
        className="hidden lg:flex flex-row items-center justify-center space-x-4"
      >
        {jeniskarya.map((item) => (
          <JenisKaryaCard
            key={item.id}
            title={item.title}
            image={item.image}
            link={item.link}
          />
        ))}
      </div>
      <div id="container-karyacard-mobile" className="xl:hidden">
        <Slider {...sliderSetting}>
          {jeniskarya.map((item) => (
            <JenisKaryaCard
              key={item.id}
              title={item.title}
              image={item.image}
              link={item.link}
            />
          ))}
        </Slider>
      </div>
    </SectionLayout>
  );
}
