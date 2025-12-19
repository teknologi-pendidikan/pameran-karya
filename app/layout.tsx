import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Pameran Karya Teknologi Pendidikan",
  description:
    "Program akhir tahun untuk menampilkan karya-karya terbaik dari mahasiswa Teknologi Pendidikan di Indonesia. Dikelola bersama oleh seluruh civitas Teknologi Pendidikan di Indonesia.",
  authors: [
    {
      name: "Teknologi Pendidikan ID",
      url: "https://teknologipendidikan.or.id",
    },
  ],
  generator: "EDTECH-ID AppUniverse",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={plusJakartaSans.className}>
      <body className={`${plusJakartaSans.className} antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
