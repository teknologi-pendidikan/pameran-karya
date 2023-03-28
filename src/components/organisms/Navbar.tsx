/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import LogoPameran from "@components/atoms/logo-pameran";

type NavbarProps = {
  colorLogo: string;
  extendRootNavbar: string;
};

const NAVLINK = [
  {
    name: "Tentang",
    link: "/post/tentang-pamerankarya",
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
    name: "Pedoman Pengunjung",
    link: "/post/pedoman-pengunjung",
  },
];

function Navbar(Navbar: NavbarProps) {
  return (
    <header
      id="navbar-wrapper"
      className={`w-full ${Navbar.extendRootNavbar} z-10 flex justify-center`}
    >
      <nav
        id="navbar"
        className="flex flex-row items-center justify-between space-x-1 container px-4"
      >
        <Link aria-label="Halaman Utama Pameran Karya" href="/">
          <h1 className="hidden">Pameran Karya Teknologi Pendidikan 2023</h1>
          <LogoPameran
            width={200}
            height={75}
            colorKarya={Navbar.colorLogo}
            colorPameran={Navbar.colorLogo}
            colorTEP={Navbar.colorLogo}
          />
        </Link>
        <div className="hidden md:block space-x-8 items-center">
          {NAVLINK.map((link) => (
            <Link
              key={link.link}
              href={link.link}
              className="font-medium hover:underline underline-offset-4"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
