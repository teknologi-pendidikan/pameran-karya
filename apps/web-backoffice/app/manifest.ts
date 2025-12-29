import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Backoffice Pameran Karya Teknologi Pendidikan",
    short_name: "Backoffice PKTEP",
    description:
      "Sistem manajemen backoffice untuk mengelola dan menampilkan karya-karya teknologi pendidikan dari mahasiswa dan akademisi",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#3b82f6",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
