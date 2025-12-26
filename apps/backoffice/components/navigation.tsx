"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import {
  LogOutIcon,
  HomeIcon,
  PlusIcon,
  FolderIcon,
  UserIcon,
} from "lucide-react";

interface NavigationProps {
  user: User | null;
}

export function Navigation({ user }: NavigationProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/auth");
    router.refresh();
  };

  if (!user) return null;

  const navItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: HomeIcon,
      exact: true,
    },
    {
      href: "/dashboard/works/new",
      label: "Submit Work",
      icon: PlusIcon,
      exact: true,
    },
  ];

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link href="/dashboard" className="text-xl font-bold">
              Pameran Karya
            </Link>

            <div className="hidden md:flex items-center space-x-4">
              {navItems.map((item) => {
                const isActive = item.exact
                  ? pathname === item.href
                  : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
              <UserIcon className="h-4 w-4" />
              <span>{user.email}</span>
            </div>

            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOutIcon className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden mt-4 flex items-center space-x-2 overflow-x-auto">
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                <item.icon className="h-3 w-3" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
