import FrameChara from "@/public/assets/img-jeniskarya.webp";
import SectionLayout from "@/components/template/section-layout";
import JenisKaryaCard from "@components/molecules/JenisKaryaCards";
import Slider from "react-slick";

const jeniskarya = [
  {
    id: 1,
    title: "Media E-Book & Modul Ajar",
    image: FrameChara,
    link: "/karya/dokumenpembelajaran",
  },
  {
    id: 2,
    title: "Media 2D",
    image: FrameChara,
    link: "/karya/2d",
  },
  {
    id: 3,
    title: "Media 3D",
    image: FrameChara,
    link: "/karya/3d",
  },
  {
    id: 4,
    title: "Video & Animasi Pembelajaran",
    image: FrameChara,
    link: "/karya/videopembelajaran",
  },
  {
    id: 5,
    title: "Media Presentasi",
    image: FrameChara,
    link: "/karya/presentasi",
  },
  {
    id: 6,
    title: "Multimedia Interaktif",
    image: FrameChara,
    link: "/karya/mutimediainteraktif",
  },
];

export default function JenisKarya() {
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
      <div id="container-karyacard-mobile" className="flex xl:hidden">
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
