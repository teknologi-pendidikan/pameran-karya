// @ts-nocheck
import Head from "next/head";
import Header from "@/components/organisms/Header";
import LeftPanel from "@/components/organisms/leftPanel";
import RightPanel from "@/components/organisms/RightPanel";

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
      <main className="flex bg-black xl:bg-transparent xl:flex flex-col">
        <section id="mainmenu">
          <div id="video-wrapper" className="absolute hidden xl:block -z-10">
            <video id="pv" loop autoPlay muted>
              <source
                src="https://is3.cloudhost.id/teknologipendidikan/videoprofil-tepum.mp4"
                type="video/mp4"
              />
            </video>
          </div>
          <div
            id="panel-mainmenu"
            className="flex xl:flex-row xl:space-y-0 flex-col items-center justify-between h-screen overflow-hidden px-8 space-y-3"
          >
            <LeftPanel content={content} />
            <RightPanel content={content} />
          </div>
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
