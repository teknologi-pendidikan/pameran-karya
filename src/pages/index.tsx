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
      <div
        id="header-contents"
        className="flex items-center justify-center h-screen space-x-96 pt-12 overflow-hidden"
      >
        <LeftPanel />
        <RightPanel />
      </div>

      <style jsx>
        {`
          * {
            outline: 8px solid white;
          }
        `}
      </style>
    </>
  );
}
