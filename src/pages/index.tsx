// @ts-nocheck
import Header from "@/components/section/Header";
import LeftPanel from "@/components/section/leftPanel";
import RightPanel from "@/components/section/RightPanel";

import { GetStaticProps } from "next";

type Frontcontent = {
  id: string;
  title: string;
  desc: string;
  link: string;
};

export default function Home({ content }) {
  console.log(content);
  return (
    <>
      <main className="hidden xl:flex flex-col scrollbar-hide">
        <video
          id="bg"
          loop
          autoPlay
          muted
          className="absolute -z-10 object-cover"
        >
          <source src="/pv_bg_.mp4" type="audio/mp4" />
        </video>
        <Header />
        <section
          id="panel-mainmenu"
          className="flex items-center justify-between h-screen overflow-hidden px-12 mt-12"
        >
          <LeftPanel content={content} />
          <RightPanel content={content}/>
        </section>
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
            <br />
            <span className="text-blue-700">
              pamerandigital[at]teknologipendidikan[dot]or[dot]id
            </span>{" "}
          </span>
        </div>
      </div>
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
