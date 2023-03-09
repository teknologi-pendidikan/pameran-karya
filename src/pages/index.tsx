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
      <div className="flex min-h-screen flex-col items-center justify-start overflow-hidden p-8 font-GoogleSans">
        <div className="space-y-16 md:space-y-44">
          <Blur />
          <Hero />
        </div>
      </div>
    </>
  );
}
