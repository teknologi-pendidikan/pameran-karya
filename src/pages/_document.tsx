import { Html, Head, Main, NextScript } from "next/document";

const webdata = {
  "@context": "http://schema.org/",
  "@type": "Event",
  name: "Pameran Karya Teknologi Pendidikan 2023",
  description:
    "Pameran Karya Teknologi Pendidikan 2023 merupakan proyek mahasiswa departemen Teknologi Pendidikan Universitas Negeri Malang dalam memperkenalkan produk dan hasil pengembangan dari keilmuan prodi Teknologi Pendidikan",
  image: "https://pamerankarya.teknologipendidikan.or.id/opengraph.jpg",
  eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  startDate: "2023-05-25T18:02:00.000+07:00",
  endDate: "2023-05-26T18:02:00.000+07:00",
  location: [
    {
      "@type": "Place",
      name: "Gedung Sasana Krida, Universitas Negeri Malang",
      address: {
        streetAddress: "Jalan Veteran",
        addressLocality: "Kota Malang",
        addressRegion: "Jawa Timur",
        postalCode: "65144",
        addressCountry: "Indonesia",
      },
    },
    {
      "@type": "VirtualLocation",
      url: "",
    },
  ],
  organizer: {
    "@type": "Organization",
    name: "Mahasiswa Teknologi Pendidikan UM",
    url: "https://tep.ac.id",
  },
  performer: {
    "@type": "Person",
    name: "Mahasiswa Departemen Teknologi Pendidikan UM",
  },
};

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="title"
          content="Pameran Karya Teknologi Pendidikan 2023 - Universitas Negeri Malang"
        />
        <meta
          name="description"
          content="Pameran Karya Teknologi Pendidikan 2023 merupakan proyek mahasiswa departemen Teknologi Pendidikan Universitas Negeri Malang dalam memperkenalkan produk dan hasil pengembangan dari keilmuan prodi Teknologi Pendidikan"
        />
        <meta
          name="keywords"
          content="Pameran Karya, Teknologi Pendidikan, 2023"
        />
        <meta
          name="author"
          content="Tim Pengembangan Platform Digital Pameran TEP 2023"
        />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="google" content="nositelinkssearchbox" />
        <meta name="google" content="notranslate" />
        <meta
          name="copyright"
          content="Mahasiswa Teknologi Pendidikan UM 2023"
        ></meta>

        {/*  Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://pamerankarya.teknologipendidikan.or.id/"
        />
        <meta
          property="og:title"
          content="Pameran Karya Teknologi Pendidikan 2023 - Universitas Negeri Malang"
        />
        <meta
          property="og:description"
          content="Pameran Karya Teknologi Pendidikan 2023 merupakan proyek mahasiswa departemen Teknologi Pendidikan Universitas Negeri Malang dalam memperkenalkan produk dan hasil pengembangan dari keilmuan prodi Teknologi Pendidikan"
        />
        <meta
          property="og:image"
          content="https://pamerankarya.teknologipendidikan.or.id/opengraph.jpg"
        ></meta>
        <link rel="manifest" href="/manifest.json" />

        {/* JSON-LD Structured Data */}
        <script
          key="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webdata) }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
