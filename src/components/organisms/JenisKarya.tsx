import FrameChara from "../../../public/frame-chara.webp";
import SectionTitle from "@components/atoms/section-title";
import JenisKaryaCard from "@components/molecules/JenisKaryaCards";

const jeniskarya = [
  {
    id: 1,
    title: "Aplikasi",
    image: FrameChara,
    link: "/karya/aplikasi",
  },
  {
    id: 2,
    title: "Game",
    image: FrameChara,
    link: "/karya/game",
  },
  {
    id: 3,
    title: "VR/AR",
    image: FrameChara,
    link: "/karya/vr",
  },
  {
    id: 4,
    title: "Website",
    image: FrameChara,
    link: "/karya/website",
  },
];

export default function JenisKarya() {
  return (
    <section className="container mx-auto mt-28" id="kategori-karya">
      <SectionTitle title="Kategori Karya Pameran" />
      <div className="flex flex-row items-center justify-center space-x-4">
        {jeniskarya.map((item) => (
          <JenisKaryaCard
            key={item.id}
            title={item.title}
            image={item.image}
            link={item.link}
          />
        ))}
      </div>
    </section>
  );
}
