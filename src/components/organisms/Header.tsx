/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import LogoPameran from "@components/atoms/logo-pameran";

type HeaderProps = {
  posRootHeader?: string;
  extendRootHeader?: string;
};

function Header(header: HeaderProps) {
  return (
    <nav
      className={`${header.extendRootHeader} z-10 flex flex-col items-center py-4 w-full font-PlusJakartaSans `}
    >
      <Link href="/">
        <h1 className="hidden">Pameran Karya Teknologi Pendidikan 2023</h1>
        <LogoPameran />
      </Link>
      <div className="mb-4 hidden 2xl:block space-x-8">
        <Link
          href="/about"
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
          href="/schedule"
          className="text-base font-medium text-white hover:text-gray-200 hover:underline underline-offset-4"
        >
          Tim Belakang Layar
        </Link>
        <Link
          href="/sponsors"
          className="text-base font-medium text-white hover:text-gray-200 hover:underline underline-offset-4"
        >
          Butuh bantuan?
        </Link>
      </div>
    </nav>
  );
}

export default Header;
