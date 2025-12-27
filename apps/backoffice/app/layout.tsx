import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { createClient } from "@/lib/supabase/server";
import { Navigation } from "@/components/navigation";
import { ensureUserProfile } from "@/lib/user-profile";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Backoffice Pameran Karya Teknologi Pendidikan",
  description:
    "Sistem manajemen backoffice untuk mengelola dan menampilkan karya-karya teknologi pendidikan dari mahasiswa dan akademisi",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Get user profile if user is authenticated
  let userProfile = null;
  if (user) {
    try {
      userProfile = await ensureUserProfile();
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  }

  return (
    <html lang="en" data-theme="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background`}
      >
        <Navigation user={user} userProfile={userProfile} />
        <main className={user ? "container mx-auto px-4 py-8" : ""}>
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
