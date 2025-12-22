import LogoPameran from "@/assets/logo_pameran";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-base-200 pt-12 pb-16 mt-16">
      <footer className="container mx-auto max-w-7xl footer footer-vertical sm:footer-horizontal px-4 text-base-content">
        <nav>
          <h6 className="footer-title">Tentang Kami</h6>
          <Link href="/whitepaper" className="link link-hover">
            Whitepaper
          </Link>
          <Link
            href="/blog/dibalik-layar-tim-pengelola-pameran-karya-tep"
            className="link link-hover"
          >
            Pengelola
          </Link>
          <Link href="/blog/sponsor" className="link link-hover">
            Sponsor
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title">Jelajah karya</h6>
          <Link href="/eksibitor" className="link link-hover">
            Eksibitor
          </Link>
          <Link href="/work" className="link link-hover">
            Lihat semua karya
          </Link>
          <Link href="/category" className="link link-hover">
            Kategori
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title">Berpartisipasi</h6>
          <Link
            href="/blog/pedoman-pengiriman-karya-untuk-pameran-karya-tep"
            className="link link-hover"
          >
            Pedoman Unggah
          </Link>
          <Link href="/informasi-kurasi" className="link link-hover">
            Kebijakan kurasi
          </Link>
          <Link
            href="https://discord.gg/pxEftVUJyD"
            className="link link-hover"
          >
            Helpdesk & Diskusi (Discord)
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title">Teknologi</h6>
          <Link
            href="https://github.com/teknologi-pendidikan/pameran-karya"
            className="link link-hover"
          >
            Fork our codebase
          </Link>
          <Link href="/.well-known/security.txt" className="link link-hover">
            Security disclosure
          </Link>
        </nav>
      </footer>
      <footer className="container mx-auto max-w-7xl footer footer-vertical sm:footer-horizontal text-base-content border-base-300 border-t px-4 py-8 mt-8">
        <aside className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-4">
          <LogoPameran
            className="h-8 sm:h-10 w-auto max-w-48 sm:max-w-64"
            style={{ height: "auto", width: "100%", maxWidth: "256px" }}
            fillcolorbottom="black"
            fillcolortop="black"
          />
          <p className="text-center sm:text-left text-sm lg:max-w-xs">
            by Teknologi Pendidikan ID & Ikatan Mahasiswa Teknologi Pendidikan
            Indonesia
          </p>
        </aside>
      </footer>
    </div>
  );
}
