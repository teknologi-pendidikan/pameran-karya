// @ts-nocheck
import Head from "next/head";
import LeftPanel from "@/components/organisms/leftPanel";
import RightPanel from "@/components/organisms/RightPanel";
import About from "@/components/organisms/About";

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
      <main className="bg-white xl:bg-transparent">
        <header id="mainmenu" className="relative flex items-center justify-center h-screen mb-12 overflow-hidden">
          <div
            id="panel-mainmenu"
            // className="grid xl:grid-cols-2 xl:justify-items-center xl:items-center place-content-center gap-2"
            className="flex flex-col xl:flex-row justify-center xl:justify-between items-center space-x-4 xl:w-full px-16 scale-[0.6] xl:scale-100 space-y-4"
          >
            <LeftPanel content={content} />
            <RightPanel content={content} />
          </div>
          <video
            id="pv"
            loop
            autoPlay
            muted
            className="absolute -z-10 w-auto min-w-full min-h-full max-w-none"
          >
            <source
              src="https://is3.cloudhost.id/teknologipendidikan/videoprofil-tepum.mp4"
              type="video/mp4"
            />
          </video>
        </header>
        <section id="main-content" className="container mx-auto px-4 lg:max-w-screen-3xl space-y-24 mb-24 ">
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
