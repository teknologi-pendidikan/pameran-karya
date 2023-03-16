// @ts-nocheck

import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Header from "@/components/section/Header";
import Image from "next/image";

type Frontcontent = {
  uuid: string;
  name: string;
  nim: number;
  angkatan: number;
  jumlah_karya: number;
  image: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const SHEETS_ENDPOINT = `https://sheets.googleapis.com/v4/spreadsheets/1BDDtfwkzrbBoSAsm3EY1R8njzVTW-M-gi2zqL0m92mI/values/peserta?key=${process.env.GAPI_SPREADSHEETS}&majorDimension=COLUMNS`;

  let content = [];
  await fetch(SHEETS_ENDPOINT)
    .then((response) => response.json())
    .then((json) => {
      const data = json.values;
      const uuid = data[0];
      const nim = data[1];
      const nama = data[2];
      const angkatan = data[3];
      const jumlah_karya = data[4];
      const image = data[5];

      for (let i = 1; i < data[0].length; i += 1) {
        const item = {
          uuid: uuid[i],
          nim: nim[i],
          name: nama[i],
          angkatan: angkatan[i],
          jumlah_karya: jumlah_karya[i],
          image: image[i],
        };
        content.push(item);
      }
    });

  const paths = content.map((item) => ({
    params: { nim: item.nim },
  }));

  return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
  const id = context.params.nim;
  const SHEETS_ENDPOINT = `https://sheets.googleapis.com/v4/spreadsheets/1BDDtfwkzrbBoSAsm3EY1R8njzVTW-M-gi2zqL0m92mI/values/peserta?key=${process.env.GAPI_SPREADSHEETS}&majorDimension=COLUMNS`;

  let content = [];
  await fetch(SHEETS_ENDPOINT)
    .then((response) => response.json())
    .then((json) => {
      const data = json.values;
      const uuid = data[0];
      const nim = data[1];
      const nama = data[2];
      const angkatan = data[3];
      const jumlah_karya = data[4];
      const image = data[5];

      for (let i = 1; i < data[0].length; i += 1) {
        const item = {
          uuid: uuid[i],
          nim: nim[i],
          name: nama[i],
          angkatan: angkatan[i],
          jumlah_karya: jumlah_karya[i],
          image: image[i],
        };
        content.push(item);
      }
    });

  const partisipan = content.filter((item) => item.nim === id);

  return {
    props: {
      partisipan,
    },
  };
};

export default function Partisipan({ partisipan }) {
  return (
    <>
      <Head>
        <title>Partisipan Pameran</title>
      </Head>
      <Header position="fixed" />
      <main className="container mx-auto px-4 max-w-screen-2xl space-y-24 mb-24 ">
        <div className="space-y-5 bg-blue-300 px-6 py-16 md:px-12 md:py-24 rounded-lg border-4 border-gray-800 flex flex-row space-x-8">
          <Image
            className="w-32 h-32 md:w-44 md:h-44 rounded-full object-cover"
            src={partisipan[0].image}
            alt={partisipan[0].name}
            width={200}
            height={200}
          />
          <div>
            <h1 className="text-5xl md:text-7xl font-bold">
              {partisipan[0].name}
            </h1>
            <p className="text-lg md:text-xl text-gray-800">
              {partisipan[0].nim}
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
