import LogoPameran from "@/assets/logo_pameran";
import { navItems } from "@/assets/data/navigation.data";

import Link from "next/link";

export default function Navbar() {
  return (
    <div className="bg-base-100 shadow-sm sticky top-0 z-50">
      <div className="navbar mx-auto px-4">
        {/* Mobile menu button */}
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
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
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow  rounded-box w-52"
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
            className="btn btn-ghost text-xl lg:flex"
            aria-label="Beranda"
          >
            <LogoPameran
              className="h-6 lg:h-8 w-auto"
              style={{ height: "auto", width: "96px", maxWidth: "128px" }}
              fillcolorbottom="black"
              fillcolortop="black"
              alt="Logo Pameran Karya"
            />
          </Link>
        </div>

        {/* Desktop menu */}
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1 py-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-md text-gray-900 font-medium hover:bg-primary hover:text-primary-content transition-colors duration-200"
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

        {/* Mobile menu spacer */}
        <div className="navbar-end lg:hidden">
          {/* This keeps the logo centered on mobile */}
        </div>
      </div>
    </div>
  );
}
