import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Event, WithContext } from "schema-dts";
import {
  openGraphGlobalMetadata,
  twitterGlobalMetadata,
} from "@/app/global-metadata";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "300", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Pameran Karya Teknologi Pendidikan",
    template: "%s | Pameran Karya Teknologi Pendidikan",
  },
  applicationName: "Pameran Karya Teknologi Pendidikan",
  description:
    "Pameran Karya Teknologi Pendidikan (PKTEP) merupakan kegiatan pameran akademik berbasis hybrid (luring dan daring) yang bertujuan untuk menampilkan karya, produk, dan hasil penelitian mahasiswa di bidang Teknologi Pendidikan dari berbagai perguruan tinggi di Indonesia.",
  authors: [
    {
      name: "Teknologi Pendidikan ID",
      url: "https://teknologipendidikan.or.id",
    },
    {
      name: "Ikatan Mahasiswa Teknologi Pendidikan Indonesia",
      url: "https://imatepsi.or.id",
    },
  ],
  publisher: "Teknologi Pendidikan ID",
  creator: "Teknologi Pendidikan ID",
  openGraph: {
    ...openGraphGlobalMetadata,
    title: "Pameran Karya Teknologi Pendidikan",
    description:
      "Pameran Karya Teknologi Pendidikan (PKTEP) merupakan kegiatan pameran akademik berbasis hybrid (luring dan daring) yang bertujuan untuk menampilkan karya, produk, dan hasil penelitian mahasiswa di bidang Teknologi Pendidikan dari berbagai perguruan tinggi di Indonesia.",
    url: "https://pamerankarya.teknologipendidikan.or.id",
    siteName: "Pameran Karya Teknologi Pendidikan",
    locale: "id_ID",
    type: "website",
    countryName: "Indonesia",
    images: [
      {
        url: "/opengraph.png",
        width: 1200,
        height: 630,
        alt: "Pameran Karya Teknologi Pendidikan",
      },
    ],
  },
  metadataBase: new URL("https://pamerankarya.teknologipendidikan.or.id"),
  alternates: {
    canonical: "/",
  },
  referrer: "strict-origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/icon-256.png",
    other: [
      {
        rel: "android-chrome",
        url: "/icon-256.png",
      },
    ],
  },
  twitter: {
    ...twitterGlobalMetadata,
    card: "summary_large_image",
    title: "Pameran Karya Teknologi Pendidikan",
    description:
      "Pameran Karya Teknologi Pendidikan (PKTEP) merupakan kegiatan pameran akademik berbasis hybrid (luring dan daring) yang bertujuan untuk menampilkan karya, produk, dan hasil penelitian mahasiswa di bidang Teknologi Pendidikan dari berbagai perguruan tinggi di Indonesia.",
    creator: "@teknologipendidikan",
    images: [
      {
        url: "/opengraph.png",
        width: 1200,
        height: 630,
        alt: "Pameran Karya Teknologi Pendidikan",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  generator: "EDTECH-ID AppUniverse",
  keywords: [
    "Teknologi Pendidikan",
    "Pameran Karya TEP",
    "Pameran Teknologi Pendidikan",
    "Karya Mahasiswa TEP",
    "Mahasiswa Teknologi Pendidikan",
    "Karya Teknologi",
    "Pendidikan Digital",
    "Aplikasi Pendidikan",
  ],
};

const jsonLd: WithContext<Event> = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Pameran Karya Teknologi Pendidikan",
  description:
    "Pameran Karya Teknologi Pendidikan (PKTEP) merupakan kegiatan pameran akademik berbasis hybrid (luring dan daring) yang bertujuan untuk menampilkan karya, produk, dan hasil penelitian mahasiswa di bidang Teknologi Pendidikan dari berbagai perguruan tinggi di Indonesia.",
  image: "https://pamerankarya.teknologipendidikan.or.id/opengraph.png",
  startDate: "2026-01-05",
  endDate: "2026-03-31",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
  location: [
    {
      "@type": "VirtualLocation",
      url: "https://pamerankarya.teknologipendidikan.or.id/konferensi",
    },
    {
      "@type": "Place",
      name: "Gedung A20, Universitas Negeri Malang",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Jalan Semarang No 5",
        addressLocality: "Malang",
        postalCode: "61451",
        addressCountry: "ID",
      },
    },
  ],
  performer: {
    "@type": "PerformingGroup",
    name: "Teknologi Pendidikan ID & IMATEPSI",
  },
  offers: {
    "@type": "Offer",
    name: "General Admission",
    price: "0",
    priceCurrency: "IDR",
    validFrom: "2026-01-01",
    url: "https://pamerankarya.teknologipendidikan.or.id/whitepaper",
    availability: "https://schema.org/InStock",
  },
  organizer: {
    "@type": "Organization",
    name: "Teknologi Pendidikan ID",
    url: "https://teknologipendidikan.or.id",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={plusJakartaSans.className}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${plusJakartaSans.className} antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
    </html>
  );
}
