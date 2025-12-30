import LogoPameran from "@/assets/logo_pameran";
import { navItems } from "@/assets/data/navigation.data";

import Link from "next/link";

export default function Navbar() {
  return (
    <div className="bg-base-100 shadow-sm sticky top-0 z-50">
      <div className="navbar mx-auto px-2 sm:px-4">
        {/* Mobile menu button */}
        <div className="navbar-start">
          <div className="dropdown xl:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-base font-medium">
                    {item.title}
                  </Link>
                </li>
              ))}
              <li className="mt-2 pt-2 border-t border-base-300">
                <a
                  href="https://backoffice-pktep.teknologipendidikan.my.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm text-primary-content font-semibold"
                >
                  Submit Karya
                </a>
              </li>
            </ul>
          </div>

          {/* Logo - centered on mobile */}
          <Link
            href="/"
            className="btn btn-ghost text-xl xl:flex"
            aria-label="Beranda"
          >
            <LogoPameran
              className="h-6 xl:h-8 w-auto"
              style={{ height: "auto", width: "80px", maxWidth: "96px" }}
              fillcolorbottom="black"
              fillcolortop="black"
              alt="Logo Pameran Karya"
            />
          </Link>
        </div>

        {/* Large Desktop menu (≥1536px) */}
        <div className="navbar-end hidden 2xl:flex">
          <ul className="menu menu-horizontal px-1 py-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-md text-gray-900 font-medium hover:bg-primary hover:text-primary-content transition-colors duration-200 px-3"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="ml-4">
            <a
              href="https://backoffice-pktep.teknologipendidikan.my.id/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary font-semibold shadow-sm hover:shadow-md transition-all duration-200"
            >
              Submit Karya
            </a>
          </div>
        </div>

        {/* Medium Desktop menu (1280px-1535px, includes 1366x768) */}
        <div className="navbar-end hidden xl:flex 2xl:hidden">
          <ul className="menu menu-horizontal px-0 py-1">
            {navItems.map((item, index) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-xs text-gray-900 font-medium hover:bg-primary hover:text-primary-content transition-colors duration-200 px-1.5"
                >
                  {/* Shorten some text for space */}
                  {item.title === "Jelajah karya"
                    ? "Karya"
                    : item.title === "Konferensi"
                      ? "Event"
                      : item.title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="ml-1">
            <a
              href="https://backoffice-pktep.teknologipendidikan.my.id/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-xs font-medium shadow-sm hover:shadow-md transition-all duration-200 px-3"
            >
              Submit
            </a>
          </div>
        </div>

        {/* Mobile menu spacer */}
        <div className="navbar-end xl:hidden">
          {/* This keeps the logo centered on mobile */}
        </div>
      </div>
    </div>
  );
}
