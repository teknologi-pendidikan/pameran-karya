import LogoPameran from "@/app/assets/logo_pameran";

export default function Footer() {
  return (
    <div className="bg-base-200 pt-12 pb-16">
      <footer className="container mx-auto max-w-7xl footer sm:footer-horizontal  text-base-content p-10">
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
      </footer>
      <footer className=" container mx-auto max-w-7xl footer text-base-content border-base-300 border-t px-10 py-4">
        <aside className="grid-flow-col items-center">
          <LogoPameran
            className="h-10 w-auto"
            style={{ height: "auto", width: "256px" }}
            fillcolorbottom="black"
            fillcolortop="black"
          />
          <p className="mx-4 text-sm">
            by Teknologi Pendidikan ID
            <br />& Ikatan Mahasiswa Teknologi Pendidikan Indonesia
          </p>
        </aside>
      </footer>
    </div>
  );
}
