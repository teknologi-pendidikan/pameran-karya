import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Hero from "@/components/section/Hero";
import Header from "@/components/section/Header";
import Blur from "@/components/section/Blur";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Header />
      <div id="pv">
        <div className="h-screen w-full flex items-center">
        <video
          id="bg"
          loop
          autoPlay
          muted
          className="w-full h-screen z-0 bgvideo"
        >
          <source src="/pv_bg_.mp4" type="audio/mp4" />
        </video>
      </div>
      <div className="flex min-h-screen flex-col items-center justify-start overflow-hidden p-8 font-GoogleSans absolute left-1/2 top-36 z-10">
        <div className="space-y-16 md:space-y-44">
          <Hero />
        </div>
      </div>

      </div>
      

      <style jsx>{`
        .bgvideo {
          opacity: 1;
          width: 2295px;
          height: 1290.94px;
        }
      `}</style>
    </>
  );
}
