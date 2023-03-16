// @ts-nocheck

import Head from "next/head";
import Header from "@/components/section/Header";
import LeftPanel from "@/components/section/leftPanel";
import RightPanel from "@/components/section/RightPanel";
import Script from "next/script";

import { GetStaticProps } from "next";

type Frontcontent = {
  id: string;
  title: string;
  desc: string;
  link: string;
};

export default function Home({ content }) {
  const webdata = {
    "@context": "http://schema.org/",
    "@type": "Event",
    name: "Pameran Karya Teknologi Pendidikan 2023",
    description:
      "Pameran Karya Teknologi Pendidikan 2023 merupakan proyek mahasiswa departemen Teknologi Pendidikan Universitas Negeri Malang dalam memperkenalkan produk dan hasil pengembangan dari keilmuan prodi Teknologi Pendidikan",
    image: "https://pamerankarya.teknologipendidikan.or.id/opengraph.jpg",
    eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    startDate: "2023-05-25T18:02:00.000+07:00",
    endDate: "2023-05-26T18:02:00.000+07:00",
    location: [
      {
        "@type": "Place",
        name: "Gedung Sasana Krida, Universitas Negeri Malang",
        address: {
          streetAddress: "Jalan Veteran",
          addressLocality: "Kota Malang",
          addressRegion: "Jawa Timur",
          postalCode: "65144",
          addressCountry: "Indonesia",
        },
      },
      {
        "@type": "VirtualLocation",
        url: "",
      },
    ],
    organizer: {
      "@type": "Organization",
      name: "Mahasiswa Teknologi Pendidikan UM",
      url: "https://tep.ac.id",
    },
    performer: {
      "@type": "Person",
      name: "Mahasiswa Departemen Teknologi Pendidikan UM",
    },
  };
  return (
    <>
      <Head>
        <title>
          Pameran Karya Teknologi Pendidikan 2023 - Universitas Negeri Malang
        </title>
        <meta
          name="title"
          content="Pameran Karya Teknologi Pendidikan 2023 - Universitas Negeri Malang"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Pameran Karya Teknologi Pendidikan 2023 merupakan proyek mahasiswa departemen Teknologi Pendidikan Universitas Negeri Malang dalam memperkenalkan produk dan hasil pengembangan dari keilmuan prodi Teknologi Pendidikan"
        />
        <meta
          name="keywords"
          content="Pameran Karya, Teknologi Pendidikan, 2023"
        />
        <meta
          name="author"
          content="Tim Pengembangan Platform Digital Pameran TEP 2023"
        />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="google" content="nositelinkssearchbox" />
        <meta name="google" content="notranslate" />
        <meta
          name="copyright"
          content="Mahasiswa Teknologi Pendidikan UM 2023"
        ></meta>

        {/*  Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://pamerankarya.teknologipendidikan.or.id/"
        />
        <meta
          property="og:title"
          content="Pameran Karya Teknologi Pendidikan 2023 - Universitas Negeri Malang"
        />
        <meta
          property="og:description"
          content="Pameran Karya Teknologi Pendidikan 2023 merupakan proyek mahasiswa departemen Teknologi Pendidikan Universitas Negeri Malang dalam memperkenalkan produk dan hasil pengembangan dari keilmuan prodi Teknologi Pendidikan"
        />
        <meta
          property="og:image"
          content="https://pamerankarya.teknologipendidikan.or.id/opengraph.jpg"
        ></meta>

        {/* JSON-LD Structured Data */}
        <script
          key="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webdata) }}
        />
      </Head>
      <main className="flex bg-black xl:bg-transparent xl:flex flex-col scrollbar-hide">
        <Header />
        <section id="mainmenu">
          <div id="video-wrapper" className="absolute hidden xl:block -z-10">
            <video id="pv" loop autoPlay muted>
              <source src="/pv_bg_.mp4" type="audio/mp4" />
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
