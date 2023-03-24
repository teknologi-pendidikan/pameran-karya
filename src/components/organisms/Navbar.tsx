/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import LogoPameran from "@components/atoms/logo-pameran";

type NavbarProps = {
  posRootNavbar?: string;
  extendRootNavbar?: string;
};

function Navbar(Navbar: NavbarProps) {
  return (
    <nav
      className={`${Navbar.extendRootNavbar} z-10 flex flex-row items-center py-1 w-full font-PlusJakartaSans px-12 mx-auto`}
    >
      <Link href="/">
        <h1 className="hidden">Pameran Karya Teknologi Pendidikan 2023</h1>
        <LogoPameran width={200} height={75} />
      </Link>
      <div className="px-8 hidden 2xl:block space-x-8 items-center">
        <Link
          href="/tentang"
          className="text-base font-medium text-white hover:text-gray-200 hover:underline underline-offset-4"
        >
          Tentang
        </Link>
        <Link
          href="/partisipan"
          className="text-base font-medium text-white hover:text-gray-200 hover:underline underline-offset-4"
        >
          Partisipan
        </Link>
        <Link
          href="/karya"
          className="text-base font-medium text-white hover:text-gray-200 hover:underline underline-offset-4"
        >
          karya
        </Link>
        <Link
          href="/bantuan"
          className="text-base font-medium text-white hover:text-gray-200 hover:underline underline-offset-4"
        >
          Butuh bantuan?
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
