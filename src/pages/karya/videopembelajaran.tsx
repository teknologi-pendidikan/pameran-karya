// @ts-nocheck
import SectionLayout from "@/components/template/section-layout";
import dynamic from "next/dynamic";
import React from "react";
import { GetStaticProps } from "next";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

type dataKarya = {
  uuid_karya: string;
  peserta: string;
  uuid_peserta: string;
  judul_karya: string;
  deskripsi_karya: string;
  width: number;
  height: number;
  src_obj: string;
  src_cover: string;
};

export default function KaryaVideo({ content }: dataKarya) {
  return (
    <SectionLayout
      id="karya-videopembelajaran"
      ariaLabel="Karya Video Pembelajaran"
      title="Karya Video Pembelajaran"
    >
      <div className="grid grid-cols-3 gap-8 pb-24">
        {content.map((item) => (
          <div
            className="flex flex-col space-y-2 items-start justify-start"
            key={item.uuid_karya}
          >
            <ReactPlayer
              width="100%"
              height={280}
              url={item.src_obj}
              //   light={item.image}
            />
            <div className="flex flex-col justify-between w-full">
              <h2 className="text-xl font-bold">{item.judul_karya}</h2>
              <p className="text-base">{item.deskripsi_karya}</p>
              <p className="text-base pt-2">
                Dikembangkan oleh:{" "}
                <span className="font-semibold"> {item.peserta}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </SectionLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const SHEETS = "karya-video";
  const DATA_ENDPOINT = `${process.env.SPREADSHEET_ENDPOINT}/${SHEETS}?key=${process.env.GAPI_SPREADSHEETS}&majorDimension=COLUMNS`;

  const content = [];
  await fetch(DATA_ENDPOINT)
    .then((res) => res.json())
    .then((json) => {
      const data = json.values;
      const uuid = data[0];
      const peserta = data[1];
      const uuid_peserta = data[2];
      const judul_karya = data[3];
      const deskripsi_karya = data[4];
      const width = data[5];
      const height = data[6];
      const src_obj = data[7];
      const src_cover = data[8];

      for (let i = 1; i < data[0].length; i++) {
        const item = {
          uuid: uuid[i],
          peserta: peserta[i],
          uuid_peserta: uuid_peserta[i],
          judul_karya: judul_karya[i],
          deskripsi_karya: deskripsi_karya[i],
          width: width[i],
          height: height[i],
          src_obj: src_obj[i],
          src_cover: src_cover[i],
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
