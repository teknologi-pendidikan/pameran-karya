// @ts-nocheck
import Head from "next/head";
import LeftPanel from "@/components/organisms/leftPanel";
import RightPanel from "@/components/organisms/RightPanel";
import About from "@/components/organisms/About";
import Image from "next/image";
import ImageBG from "../../public/bg-pik.png";

import { GetStaticProps } from "next";

type Frontcontent = {
  id: string;
  title: string;
  desc: string;
  link: string;
};

export default function Home({ content }) {
  return (
    <>
      <Head>
        <title>
          Pameran Karya Teknologi Pendidikan 2023 - Universitas Negeri Malang
        </title>
      </Head>
      <main className="bg-white xl:bg-transparent relative">
        <Image
          src={ImageBG}
          alt="bgpik"
          className="absolute top-0 -z-10"
          priority
        />
        <header
          id="mainmenu"
          className="relative flex items-center justify-center h-screen mb-12 overflow-hidden border-b-4"
        >
          <div
            id="panel-mainmenu"
            className="flex flex-col xl:flex-row justify-center items-center space-x-[50rem] xl:w-full px-16 scale-[0.6] xl:scale-[0.6] 2xl:scale-[0.85] space-y-4 xl:mt-40 2xl:mt-80"
          >
            <LeftPanel content={content} />
            <RightPanel content={content} />
          </div>
        </header>
        <section
          id="main-content"
          className="container mx-auto px-4 lg:max-w-screen-3xl space-y-24 mb-24 text-white"
        >
          <About />
        </section>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps<{
  content: Frontcontent[];
}> = async () => {
  const SHEETS_ENDPOINT = `https://sheets.googleapis.com/v4/spreadsheets/1BDDtfwkzrbBoSAsm3EY1R8njzVTW-M-gi2zqL0m92mI/values/descinfo?key=${process.env.GAPI_SPREADSHEETS}&majorDimension=COLUMNS`;

  let content = [];
  await fetch(SHEETS_ENDPOINT)
    .then((response) => response.json())
    .then((json) => {
      const data = json.values;
      const id = data[0];
      const title = data[1];
      const desc = data[2];
      const link = data[3];

      for (let i = 1; i < data[0].length; i += 1) {
        const item = {
          id: id[i],
          title: title[i],
          desc: desc[i],
          link: link[i],
        };
        content.push(item);
      }
    });

  return {
    props: {
      content,
    },
  };
};
