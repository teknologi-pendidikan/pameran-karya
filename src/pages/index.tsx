import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Hero from "@/components/section/Hero";
import Header from "@/components/section/Header";
import Blur from "@/components/section/Blur";
import LeftPanel from "@/components/section/leftPanel";
import RightPanel from "@/components/section/RightPanel";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <main className="bg-black hidden xl:block scrollbar-hide">
        <Header />

        <video
          id="bg"
          loop
          autoPlay
          muted
          className="absolute -z-10 w-auto min-w-full max-h-max"
        >
          <source src="/pv_bg_.mp4" type="audio/mp4" />
        </video>
        <section
          id="mainmenu"
          className="flex items-center justify-between h-screen w-screen pt-12 overflow-hidden px-12"
        >
          <LeftPanel />
          <RightPanel />
        </section>

        <style jsx>
          {`
            * {
              outline: 8px solid white;
            }
          `}
        </style>
      </main>
      <div className="xl:hidden flex h-screen mx-64">
        <div className="flex flex-col m-auto space-y-4">
          <span className="text-black font-body text-2xl">
            Mohon maaf, resolusi layar anda pada saat ini belum kami dukung
            sepenuhnya. Mohon gunakan perangkat yang memiliki resolusi minima
            1280 x 720 (resolusi HD). Terima kasih telah berkenan untuk
            mengunjungi pameran ini.
          </span>
          <span className="text-black font-thin text-md">
            Tim Pengembangan Platform Digital Pameran TEP 2023
            <br /><span className="text-blue-700">
            pamerandigital[at]teknologipendidikan[dot]or[dot]id
          </span> </span>
        </div>
      </div>
    </>
  );
}
