import Link from "next/link";
import dynamic from "next/dynamic";
import React from "react";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function About() {
  return (
    <section className="space-y-24 my-40" id="tentang">
      <div className="space-y-8">
        <div className="space-y-3">
          <h2 className="text-4xl text-grey-700 font-display font-semibold text-center">
            Selamat datang Teknolog Pendidikan!
          </h2>
        </div>
        <div className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-20">
          <div className="w-full space-y-10">
            <p className="">
              Ayo bergabung dalam perayaan kreativitas dan inovasi dalam bidang
              teknologi pendidikan!{" "}
              <Link
                href="https://pamerankarya.teknologipendidikan.or.id/"
                target="_blank"
                rel="noreferrer"
                className="text-blue-700 hover:text-blue-900 hover:underline font-semibold"
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
              berinteraksi dengan para mahasiswa teknologi pendidikan yang
              sangat berbakat, yang dengan semangat memperkenalkan inovasi
              teknologi terbaru yang dapat meningkatkan efektivitas proses
              belajar mengajar.
              <br />
              <br />
              Jangan lewatkan kesempatan untuk mempelajari dan memahami lebih
              dalam bagaimana teknologi dapat memperkaya pengalaman belajar
              kita. Dari aplikasi pembelajaran interaktif hingga platform
              virtual reality yang memukau, pameran ini akan menghadirkan
              karya-karya yang tidak hanya mencengangkan, tetapi juga dapat
              mengubah paradigma pendidikan yang sudah ada.
            </p>

            {/* <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="flex justify-center"></div>
                <FontAwesomeIcon icon={faCalendarAlt} />
                <span className="text-base">Oct - Dec, 2022</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex justify-center"></div>
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <span className="text-base">In-person / Hybrid</span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-6">
              <Link
                // text="Find DevFest near you"
                className="w-full sm:w-5/6 md:w-auto justify-between"
                href="https://gdg.community.dev/events/"
              />
            </div> */}
          </div>
          <div className="w-full">
            <div className="rounded-lg overflow-hidden">
              <ReactPlayer
                width="100%"
                url="https://www.youtube.com/watch?v=EZ_DPwBU4h8"
                light="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
