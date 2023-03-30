// @ts-nocheck
import Head from "next/head";
import LeftPanel from "@/components/organisms/leftPanel";
import RightPanel from "@/components/organisms/RightPanel";
import About from "@/components/organisms/section/About";
import Image from "next/image";
import ImageBG from "@/public/assets/bg-fullpage.webp";
import ImaageMainmenuBG from "@/public/assets/bg-mainmenu.webp";

import { GetStaticProps } from "next";
import JenisKarya from "@/components/organisms/section/JenisKarya";
import PlayerSelector from "@/components/organisms/section/PlayerSelector";
import GeneralInformation from "@/components/organisms/section/GeneralInformation";

import fs from "fs";
import matter from "gray-matter";

type Frontcontent = {
  id: string;
  title: string;
  desc: string;
  link: string;
};

export default function Home({ content, posts }) {
  return (
    <>
      <Head>
        <title>
          Pameran Karya Teknologi Pendidikan 2023 - Universitas Negeri Malang
        </title>
      </Head>
      <main
        className="bg-theme-blue-accent xl:bg-transparent relative"
        aria-label="Pameran Karya Teknologi Pendidikan 2023"
      >
        <Image src={ImaageMainmenuBG} alt="" className="absolute top-0 -z-20" />
        <Image
          src={ImageBG}
          alt=""
          className="absolute top-0 -z-10 min-h-screen"
          priority
          quality={100}
        />
        <section
          aria-label="mainmenu"
          id="mainmenu"
          className="relative flex items-center justify-center h-screen mb-12 overflow-hidden"
        >
          <div
            id="panel-mainmenu"
            className="flex flex-col xl:flex-row justify-center items-center xl:space-x-[50rem] xl:w-full px-16 scale-[0.6] xl:scale-[0.6] 2xl:scale-[0.85] space-y-4 xl:mt-40 2xl:mt-80"
          >
            <LeftPanel content={content} />
            <RightPanel content={content} />
          </div>
        </section>
        <div
          id="main-content"
          className="container mx-auto flex flex-col space-y-12 items-start justify-start px-4 lg:max-w-screen-3xl pb-12 mb-12 text-white"
        >
          <About />
          <GeneralInformation listpost={posts} />
          <PlayerSelector />
          <JenisKarya />
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps<{
  content: Frontcontent[];
}> = async () => {
  const SHEETS_ENDPOINT = `https://sheets.googleapis.com/v4/spreadsheets/1BDDtfwkzrbBoSAsm3EY1R8njzVTW-M-gi2zqL0m92mI/values/descinfo?key=${process.env.GAPI_SPREADSHEETS}&majorDimension=COLUMNS`;

  const content = [];
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

  const files = fs.readdirSync("posts");
  const posts = files.map((fileName) => {
    const slug = fileName.replace(".md", "");
    const readFile = fs.readFileSync(`posts/${fileName}`, "utf-8");
    const { data: frontmatter } = matter(readFile);

    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      content,
      posts,
    },
  };
};
