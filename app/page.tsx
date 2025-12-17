import { Button } from "@/components/ui/button";
import Link from "next/link";
import Script from "next/script";
import LogoPameran from "@/app/assets/logo_pameran";

export default function Page() {
  return (
    <>
      <section
        id="hero"
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
        }}
      >
        <div className="hero-overlay"></div>
        <div
          id="logo"
          className="absolute top-1/12 lg:top-1/6 left-1/2 transform -translate-x-1/2 w-full"
        >
          <LogoPameran className="mx-auto mb-8 h-8 lg:h-24 w-auto" />
        </div>
        <div className="hero-content text-neutral-content text-center relative">
          <div className="">
            <h1 className="mb-5 text-5xl font-bold">
              Pameran Karya Teknologi Pendidikan
            </h1>
            <p className="mb-5">
              Program akhir tahun untuk menampilkan karya-karya dari mahasiswa
              Teknologi Pendidikan di Indonesia.
            </p>
            <Button asChild variant="default">
              <Link href="/whitepaper">Baca Whitepaper Kegiatan</Link>
            </Button>
          </div>
        </div>
        <div
          id="creator"
          className="absolute text-gray-50 bottom-1/6 lg:bottom-1/4 left-1/2 transform -translate-x-1/2 w-full"
        >
          <p className="text-xs text-center mx-auto px-4">
            Dikelola bersama oleh seluruh civitas Teknologi Pendidikan di
            Indonesia.
          </p>
        </div>
      </section>
    </>
  );
}
