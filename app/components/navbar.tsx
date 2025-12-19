import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import LogoPameran from "@/app/assets/logo_pameran";

import Link from "next/link";

const navItems = [
  { title: "Beranda", href: "/" },
  { title: "Whitepaper", href: "/whitepaper" },
  { title: "Direktori Eksibitor", href: "/person" },
];

export default function Navbar() {
  return (
    <div className=" g-base-100 shadow-sm">
      <div className="navbar bg-base-100 max-w-7xl mx-auto px-4">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl">
            <LogoPameran
              className="h-8 w-auto"
              style={{ height: "auto", width: "128px" }}
              fillcolorbottom="black"
              fillcolortop="black"
            />
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
