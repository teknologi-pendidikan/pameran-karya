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
      <h1 className="text-9xl font-bold">Coming Soon</h1>
      <p className="text-2xl font-semibold">
        Kami sedang mengembangkan halaman ini. Silahkan kembali lagi nanti.
      </p>
      <div className="mt-8" />
      <p className="text-xl ">
        You can go back to the{" "}
        <Link href="/" className="underline text-theme-blue-accent font-medium">
          {" "}
          homepage{" "}
        </Link>{" "}
        or try searching for what you are looking for.
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
