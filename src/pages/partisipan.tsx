// @ts-nocheck
import Head from "next/head";
import Link from "next/link";
import ProfileCard from "@/components/molecules/profile-card";

import { GetStaticProps } from "next";

type Frontcontent = {
  uuid: string;
  name: string;
  nim: number;
  angkatan: number;
  jumlah_karya: number;
  image: string;
};

export default function Partisipan({ partisipan }) {
  return (
    <>
      <Head>
        <title>Partisipan Pameran</title>
      </Head>
      <main className="container mx-auto px-4 max-w-screen-2xl space-y-12 mb-24 mt-8">
        <div className="space-y-5 bg-blue-300 px-6 py-16 md:px-12 md:py-24 rounded-lg border-4 border-gray-800">
          <h1 className="text-5xl md:text-7xl font-bold">
            Partisipan Pameran Karya.
          </h1>
          <p className="text-lg md:text-xl text-gray-800">
            Para peserta yang berpartisipasi dalam pameran karya ini, baik dalam
            bentuk karya tulis, karya seni, maupun karya lainnya. Semua karya
            yang dipamerkan diharapkan dapat menjadi inspirasi bagi para peserta
            lainnya.
          </p>
        </div>
        <div className="space-y-14">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
            {partisipan.map((item) => (
              <Link key={item.uuid} href={`/partisipan/${item.nim}`}>
                <ProfileCard
                  key={item.uuid}
                  uuid={item.uuid}
                  name={item.name}
                  title={item.nim}
                  image={item.image}
                  description={item.jumlah_karya}
                />
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps<{
  content: Frontcontent[];
}> = async () => {
  const SHEETS_ENDPOINT = `https://sheets.googleapis.com/v4/spreadsheets/1BDDtfwkzrbBoSAsm3EY1R8njzVTW-M-gi2zqL0m92mI/values/peserta?key=${process.env.GAPI_SPREADSHEETS}&majorDimension=COLUMNS`;

  const content = [];
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

  return {
    props: {
      partisipan: content,
    },
  };
};
