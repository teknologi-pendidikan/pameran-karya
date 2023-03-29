import Link from "next/link";

const Links404 = [
  {
    href: "/",
    label: "Beranda",
  },
  {
    href: "/karya",
    label: "Pameran Karya",
  },
  {
    href: "/post/pedoman-pengunjung",
    label: "Pedoman Pengunjung",
  },
  {
    href: "/ruang-spatial",
    label: "Venue Pameran Digital",
  },
];

export default function Custom404() {
  return (
    <div className="container mx-auto px-4 flex flex-col justify-center h-screen">
      <h1 className="text-9xl font-bold">500 - Server Error</h1>
      <p className="text-2xl font-semibold">
        Kami sedang mengalami masalah komunikasi dengan sistem kami.
      </p>
      <div className="mt-8" />
      <p className="text-xl ">
        Silakan mencoba kembali beberapa saat lagi. Jika masalah masih
        berlanjut, hubungi kami di{" "}
        <Link
          href="https://wa.me/6285748250120"
          className="underline text-theme-blue-accent font-medium"
        >
          {" "}
          WhatsApp{" "}
        </Link>{" "}
        atau{" "}
        <Link
          href="mailto:dptsi@teknologipendidikan.or.id "
          className="underline text-theme-blue-accent font-medium"
        >
          {" "}
          Email{" "}
        </Link>{" "}
        kami.
      </p>
      <div className="mt-4 flex flex-col">
        {Links404.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-lg underline text-theme-blue-accent pt-1"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
