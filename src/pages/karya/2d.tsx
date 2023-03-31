// @ts-nocheck

import React from "react";
import { GetStaticProps } from "next";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import NextJsImageGallery from "@/components/atoms/wrapper-next-image-gallery";

type Photo = {
  uuid_karya: string;
  uuid_peserta: string;
  judul_karya: string;
  width: number;
  height: number;
  title: string;
  alt: string;
  sizes: string;
  src: string;
};

const breakpoints = [4320, 2160, 1080, 640, 384, 256, 128];

export default function Gallery({ photos }) {
  const photosData = photos.map((photo, index) => {
    const width = photo.width * 4;
    const height = photo.height * 4;
    return {
      src: photo.src,
      key: photo.uuid_karya,
      width: width,
      height: height,
      title: photo.title,
      alt: photo.alt,
      sizes: photo.sizes,
      images: breakpoints.map((breakpoint) => {
        const breakpointHeight = Math.round((height / width) * breakpoint);
        return {
          src: photo.src,
          width: breakpoint,
          height: breakpointHeight,
        };
      }),
    };
  });

  const [index, setIndex] = React.useState(-1);

  return (
    <div className="container mx-auto my-4 px-2">
      <h1 className="text-4xl font-bold text-center py-8">Galeri 2 Dimensi</h1>
      <PhotoAlbum
        layout="masonry"
        photos={photosData}
        renderPhoto={NextJsImageGallery}
        onClick={({ index }) => setIndex(index)}
      />

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={photosData}
      />
    </div>
  );
}

export const getStaticProps: GetStaticProps<{
  photos: Photo[];
}> = async () => {
  const SHEETS = "karya-2d";
  const DATA_ENDPOINT = `${process.env.SPREADSHEET_ENDPOINT}/${SHEETS}?key=${process.env.GAPI_SPREADSHEETS}&majorDimension=COLUMNS`;

  const photos = [];
  await fetch(DATA_ENDPOINT)
    .then((response) => response.json())
    .then((json) => {
      const data = json.values;
      const uuid_karya = data[0];
      const uuid_peserta = data[2];
      const judul_karya = data[3];
      const width = data[5];
      const height = data[6];
      const src = data[7];

      for (let i = 1; i < data[0].length; i += 1) {
        const item = {
          uuid_karya: uuid_karya[i],
          uuid_peserta: uuid_peserta[i],
          title: judul_karya[i],
          alt: judul_karya[i],
          sizes: "0",
          width: width[i],
          height: height[i],
          src: src[i],
        };
        photos.push(item);
      }
    });

  return {
    props: {
      photos,
    },
  };
};
