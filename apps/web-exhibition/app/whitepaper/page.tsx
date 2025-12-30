import Whitepaper from "@/assets/whitepaper.mdx";
import { Metadata } from "next";
import { openGraphGlobalMetadata } from "@/app/global-metadata";

export const metadata: Metadata = {
  title: "Whitepaper PameranKarya",
  description:
    "Whitepaper resmi untuk Pameran Karya Teknologi Pendidikan (PKTEP) yang menjelaskan tujuan, format, dan manfaat dari pameran akademik berbasis hybrid (luring dan daring) ini. Whitepaper menjelaskan kebijakan dan pedoman untuk peserta, penyelenggara, dan pemangku kepentingan lainnya.",
  authors: [
    {
      name: "Rengga Prakoso Nugroho",
      url: "http://pamerankarya.teknologipendidikan.or.id/person/rengga-prakoso-nugroho",
    },
    {
      name: "Teknologi Pendidikan ID",
      url: "https://teknologipendidikan.or.id",
    },
    {
      name: "Ikatan Mahasiswa Teknologi Pendidikan Indonesia",
      url: "https://imatepsi.or.id",
    },
  ],
  openGraph: {
    ...openGraphGlobalMetadata,
    title: "Whitepaper PameranKarya",
    description:
      "Whitepaper resmi untuk Pameran Karya Teknologi Pendidikan (PKTEP) yang menjelaskan tujuan, format, dan manfaat dari pameran akademik berbasis hybrid (luring dan daring) ini. Whitepaper menjelaskan kebijakan dan pedoman untuk peserta, penyelenggara, dan pemangku kepentingan lainnya.",
    url: "https://pamerankarya.teknologipendidikan.or.id/whitepaper",
  },
};

export default function Page() {
  return (
    <div className="min-h-screen">
      <div className="flex bg-gray-200 w-full py-16 mb-8">
        <div className="max-w-7xl container mx-auto px-4 lg:px-0">
          <h1 className="text-3xl lg:text-5xl font-bold mb-4">
            Whitepaper PameranKarya
          </h1>
        </div>
      </div>

      <div className="prose prose-lg prose-slate max-w-7xl mx-auto px-4 lg:px-0 pb-16">
        <Whitepaper />
      </div>
    </div>
  );
}
