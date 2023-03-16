/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Image from "next/image";

function Header() {
  return (
    <header className="my-4 z-50 block xl:absolute xl:top-0 w-full font-PlusJakartaSans">
      <nav className="flex flex-col items-center">
        <Link href="/">
          <h1 className="hidden">Pameran Karya Teknologi Pendidikan 2023</h1>
          <Image
            className=""
            src="/logo-pameran.svg"
            alt="Logo Pameran TEP 2023"
            width={300}
            height={100}
          />
        </Link>
        <div className="mb-4 block space-x-8">
          <Link
            href="/about"
            className="text-base font-medium text-white hover:text-gray-200 hover:underline underline-offset-4"
          >
            Tentang
          </Link>
          <Link
            href="/speakers"
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
        <div className="ml-10 hidden space-x-4 md:block"></div>
      </nav>
    </header>
  );
}

export default Header;
