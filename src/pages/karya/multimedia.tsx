// @ts-nocheck
import SectionLayout from "@/components/template/section-layout";
import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

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

export default function Multimedia({ content }: dataKarya) {
  return (
    <SectionLayout
      id="karya-dokumen-pembelajaran"
      ariaLabel="Karya Multimedia Pembelajaran"
      title="Karya Multimedia Pembelajaran"
    >
      <div className="space-y-2 bg-red-300 px-6 py-4 mb-6 rounded-lg border-4 border-gray-800">
        <p className="text-3xl font-bold">Perhatian!</p>
        <p className="text-lg text-gray-800">
          <b>
            Multimedia Interaktif pada halaman ini merupakan program aplikasi
            komputer/smartphone yang didistribusikan dalam bentuk executable/apk
          </b>
          . Anda mungkin akan menerima peringatan bahwa file tersebut tidak aman
          / tidak dikenal. Beberapa aplikasi bahkan tidak dapat ditemukan karena
          pemindai keamanan Google for Education telah memblokirnya. Jika Anda
          merasa ragu atau tidak yakin, jangan ragu untuk menghubungi kami
          melalui email:{" "}
          <a
            className="text-blue-500 hover:underline"
            href="mailto:timpamerandigital@teknologipendidikan.or.id"
          >
            timpamerandigital@teknologipendidikan.or.id
          </a>{" "}
          / batalkan unduhan yang sedang berlangsung.
        </p>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 pb-24 px-4">
        {content.map((item) => (
          <Link
            className="flex flex-col space-y-2 items-start justify-start transition ease-in-out duration-500 hover:scale-110"
            key={item.uuid_karya}
            href={item.src_obj}
          >
            <div className="flex flex-col justify-between w-full">
              <h2 className="text-xl font-bold">{item.judul_karya}</h2>
              <p className="text-base line-clamp-5">{item.deskripsi_karya}</p>
              <p className="text-sm pt-2">
                Dikembangkan oleh:{" "}
                <span className="font-semibold"> {item.peserta}</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </SectionLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const SHEETS = "karya-multimedia";
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
