/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import LogoPameran from "@components/atoms/logo-pameran";

type NavbarProps = {
  posRootNavbar?: string;
  extendRootNavbar?: string;
};

const NAVLINK = [
  {
    name: "Tentang",
    link: "/tentang",
  },
  {
    name: "Partisipan",
    link: "/partisipan",
  },
  {
    name: "Karya",
    link: "/karya",
  },
  {
    name: "Panduan",
    link: "/panduan",
  },
  {
    name: "Butuh bantuan?",
    link: "/bantuan",
  },
];

function Navbar(Navbar: NavbarProps) {
  return (
    <div
      id="navbar-wrapper"
      className={`w-full ${Navbar.extendRootNavbar} z-10 flex justify-center`}
    >
      <nav
        id="navbar"
        className="flex flex-row items-center justify-between space-x-1 container"
      >
        <Link href="/">
          <h1 className="hidden">Pameran Karya Teknologi Pendidikan 2023</h1>
          <LogoPameran width={200} height={75} />
        </Link>
        <div className="hidden 2xl:block space-x-8 items-center">
          {NAVLINK.map((link) => (
            <Link
              key={link.link}
              href={link.link}
              className="text-base font-medium text-white hover:text-gray-200 hover:underline underline-offset-4"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
