/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Image from "next/image";

function Header() {
  return (
    <header className="transition-all ease-in-out font-GoogleSans pt-4 z-50 absolute left-0 top-0">
      <nav className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-around space-x-16">
          <div className="flex items-center">
            <Link href="/">
              <Image
                className="h-20 w-auto"
                src="/logo-pameran.svg"
                alt="GDG Chennai - Devfest 2022"
                width={200}
                height={100}
              />
            </Link>
          </div>
          <div className="hidden space-x-8 lg:block">
            <Link
              href="/about"
              className="text-base font-medium text-white hover:text-gray-200"
            >
              About
            </Link>
            <Link
              href="/speakers"
              className="text-base font-medium text-white hover:text-gray-200"
            >
              Speakers
            </Link>
            <Link
              href="/schedule"
              className="text-base font-medium text-white hover:text-gray-200"
            >
              Schedule
            </Link>
            <Link
              href="/sponsors"
              className="text-base font-medium text-white hover:text-gray-200"
            >
              Sponsors
            </Link>
          </div>
          <div className="ml-10 hidden space-x-4 md:block"></div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
