import LogoPameran from "@/assets/logo_pameran";

export default function Footer() {
  return (
    <div className="bg-base-200 pt-12 pb-16 mt-16">
      <footer className="container mx-auto max-w-7xl footer footer-vertical sm:footer-horizontal px-4 text-base-content">
        <nav>
          <h6 className="footer-title">Tentang Kami</h6>
          <a className="link link-hover">Whitepaper</a>
          <a className="link link-hover">Pengelola</a>
          <a className="link link-hover">Sponsor</a>
        </nav>
        <nav>
          <h6 className="footer-title">Jelajah karya</h6>
          <a className="link link-hover">Proyek Matakuliah</a>
          <a className="link link-hover">Exhibitor</a>
          <a className="link link-hover">Kategori</a>
        </nav>
        <nav>
          <h6 className="footer-title">Kebijakan</h6>
          <a className="link link-hover">Ketentuan Layanan</a>
          <a className="link link-hover">Kebijakan kurasi</a>
          <a className="link link-hover">Layanan Sanggahan</a>
        </nav>
        <nav>
          <h6 className="footer-title">Teknologi</h6>
          <a className="link link-hover">Fork our codebase</a>
          <a className="link link-hover">Kebijakan opensource</a>
          <a className="link link-hover">Security disclosure</a>
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
