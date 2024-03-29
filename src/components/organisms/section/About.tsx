import Link from "next/link";
import dynamic from "next/dynamic";
import React from "react";
import SectionLayout from "@/components/template/section-layout";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function About() {
  return (
    <SectionLayout
      title="Tentang Pameran Karya TEP 2023"
      id="tentang"
      ariaLabel="Tentang Pameran Karya TEP 2023"
    >
      <div className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-20">
        <div className="w-full space-y-10">
          <p className="">
            Ayo bergabung dalam perayaan kreativitas dan inovasi dalam bidang
            teknologi pendidikan!{" "}
            <Link
              href="https://pamerankarya.teknologipendidikan.or.id/"
              target="_blank"
              rel="noreferrer"
              className="text-theme-flower hover:text-theme-flower hover:underline font-semibold"
            >
              Pameran karya mahasiswa teknologi pendidikan Universitas Negeri
              Malang 2023{" "}
            </Link>{" "}
            siap memukau Anda dengan karya-karya spektakuler yang dirancang
            untuk memajukan dunia pendidikan.
            <br />
            <br />
            Dalam pameran ini, Anda akan dihadirkan dengan beragam media
            pembelajaran dan teknologi pembelajaran yang tidak hanya menarik,
            tetapi juga jarang diketahui oleh masyarakat publik. Mari
            berinteraksi dengan para mahasiswa teknologi pendidikan yang sangat
            berbakat, yang dengan semangat memperkenalkan inovasi teknologi
            terbaru yang dapat meningkatkan efektivitas proses belajar mengajar.
            <br />
            <br />
            Jangan lewatkan kesempatan untuk mempelajari dan memahami lebih
            dalam bagaimana teknologi dapat memperkaya pengalaman belajar kita.
            Dari aplikasi pembelajaran interaktif hingga platform virtual
            reality yang memukau, pameran ini akan menghadirkan karya-karya yang
            tidak hanya mencengangkan, tetapi juga dapat mengubah paradigma
            pendidikan yang sudah ada.
          </p>
        </div>
        <div className="w-full">
          <div className="rounded-lg overflow-hidden">
            <ReactPlayer
              width="100%"
              url="https://www.youtube.com/watch?v=EZ_DPwBU4h8"
              light={<img src="/assets/placeholder.webp" alt="hero" />}
            />
          </div>
        </div>
      </div>
    </SectionLayout>
  );
}
