"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { UserProfile } from "@/lib/auth";
import { createBrowserClient } from "@supabase/ssr/dist/main/createBrowserClient";

interface NavbarProps {
  user: UserProfile | null;
}

export default function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/auth");
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/submit">Submit Work</Link>
            </li>
            {user.role === "admin" && (
              <>
                <li>
                  <Link href="/admin">Admin Panel</Link>
                </li>
                <li>
                  <Link href="/admin/works">Manage Works</Link>
                </li>
                <li>
                  <Link href="/admin/people">Manage People</Link>
                </li>
                <li>
                  <Link href="/admin/categories">Categories</Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <Link href="/dashboard" className="btn btn-ghost text-xl">
          Pameran Karya
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link
              href="/dashboard"
              className={pathname === "/dashboard" ? "active" : ""}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/submit"
              className={pathname === "/submit" ? "active" : ""}
            >
              Submit Work
            </Link>
          </li>
          {user.role === "admin" && (
            <li>
              <details>
                <summary>Admin</summary>
                <ul className="p-2">
                  <li>
                    <Link href="/admin">Admin Panel</Link>
                  </li>
                  <li>
                    <Link href="/admin/works">Manage Works</Link>
                  </li>
                  <li>
                    <Link href="/admin/people">Manage People</Link>
                  </li>
                  <li>
                    <Link href="/admin/categories">Categories</Link>
                  </li>
                </ul>
              </details>
            </li>
          )}
        </ul>
      </div>

      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
              {user.email.charAt(0).toUpperCase()}
            </div>
          </div>
          <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <div className="flex flex-col">
                <span className="font-medium">{user.email}</span>
                <span className="text-sm opacity-60">{user.role}</span>
              </div>
            </li>
            <li>
              <hr />
            </li>
            <li>
              <button
                onClick={handleSignOut}
                className={`text-error ${isLoading ? "loading" : ""}`}
                disabled={isLoading}
              >
                Sign out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
