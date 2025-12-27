import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Ketentuan Layanan - Backoffice Pameran Karya Teknologi Pendidikan",
  description:
    "Ketentuan layanan untuk platform backoffice pameran karya teknologi pendidikan",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Beranda
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Ketentuan Layanan
          </h1>
          <p className="text-lg text-gray-600">
            Terakhir diperbarui:{" "}
            {new Date().toLocaleDateString("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2>1. Penerimaan Ketentuan</h2>
          <p>
            Dengan mengakses dan menggunakan platform Backoffice Pameran Karya
            Teknologi Pendidikan (Platform), Anda menyetujui untuk terikat
            dengan ketentuan layanan ini. Jika Anda tidak setuju dengan
            ketentuan ini, harap tidak menggunakan Platform.
          </p>

          <h2>2. Deskripsi Layanan</h2>
          <p>Platform ini menyediakan sistem manajemen backoffice untuk:</p>
          <ul>
            <li>Mengelola submission karya teknologi pendidikan</li>
            <li>Review dan kurasi konten akademik</li>
            <li>Organisasi pameran karya digital</li>
            <li>Manajemen user dan permission</li>
            <li>Arsip dan publikasi karya akademik</li>
          </ul>

          <h2>3. Kelayakan Pengguna</h2>
          <p>Platform ini ditujukan untuk:</p>
          <ul>
            <li>Dosen dan staff akademik Universitas Negeri Malang</li>
            <li>
              Mahasiswa yang terdaftar di program studi Teknologi Pendidikan
            </li>
            <li>Administrator dan moderator yang ditunjuk</li>
            <li>Peneliti dan akademisi yang diotorisasi</li>
          </ul>

          <h2>4. Akun Pengguna</h2>
          <p>Untuk menggunakan Platform, Anda harus:</p>
          <ul>
            <li>Membuat akun dengan informasi yang akurat dan lengkap</li>
            <li>Menjaga keamanan kredensial login Anda</li>
            <li>Memperbarui informasi profil secara berkala</li>
            <li>Tidak membagikan akses akun kepada pihak lain</li>
            <li>Segera melaporkan aktivitas mencurigakan</li>
          </ul>

          <h2>5. Penggunaan yang Dapat Diterima</h2>
          <p>Anda setuju untuk menggunakan Platform dengan cara yang:</p>
          <ul>
            <li>Mematuhi semua hukum dan regulasi yang berlaku</li>
            <li>Menghormati hak kekayaan intelektual</li>
            <li>Tidak melanggar privasi atau hak orang lain</li>
            <li>Tidak mengandung konten yang menyinggung atau berbahaya</li>
            <li>Sesuai dengan etika akademik dan profesional</li>
          </ul>

          <h2>6. Konten dan Hak Kekayaan Intelektual</h2>
          <p>Terkait konten yang Anda upload:</p>
          <ul>
            <li>Anda mempertahankan kepemilikan hak cipta atas karya Anda</li>
            <li>
              Anda memberikan lisensi non-eksklusif untuk menampilkan karya
            </li>
            <li>Anda menjamin bahwa konten tidak melanggar hak pihak lain</li>
            <li>Platform berhak menghapus konten yang melanggar ketentuan</li>
            <li>Karya yang dipublikasikan dapat diakses secara publik</li>
          </ul>

          <h2>7. Moderasi dan Review</h2>
          <p>Platform menerapkan proses review untuk:</p>
          <ul>
            <li>Memastikan kualitas konten akademik</li>
            <li>Mematuhi standar etika dan plagiarisme</li>
            <li>Melindungi dari konten yang tidak sesuai</li>
            <li>Menjaga reputasi institusi</li>
          </ul>

          <h2>8. Privasi dan Data</h2>
          <p>
            Penggunaan data pribadi diatur oleh{" "}
            <Link
              href="/kebijakan-privasi"
              className="text-blue-600 hover:underline"
            >
              Kebijakan Privasi
            </Link>{" "}
            kami yang merupakan bagian integral dari ketentuan ini.
          </p>

          <h2>9. Pembatasan Layanan</h2>
          <p>Kami berhak untuk:</p>
          <ul>
            <li>Membatasi atau menangguhkan akses Platform</li>
            <li>Menghapus konten yang melanggar ketentuan</li>
            <li>Mengakhiri akun pengguna yang bermasalah</li>
            <li>Melakukan pemeliharaan sistem terjadwal</li>
          </ul>

          <h2>10. Penafian Jaminan</h2>
          <p>
            Platform disediakan sebagaimana adanya tanpa jaminan apapun. Kami
            tidak menjamin ketersediaan, akurasi, atau kehandalan layanan secara
            mutlak.
          </p>

          <h2>11. Pembatasan Tanggung Jawab</h2>
          <p>
            Dalam batas yang diizinkan hukum, kami tidak bertanggung jawab atas:
          </p>
          <ul>
            <li>
              Kerugian langsung atau tidak langsung dari penggunaan Platform
            </li>
            <li>Kehilangan data atau gangguan layanan</li>
            <li>Tindakan pihak ketiga atau konten pengguna</li>
            <li>Pelanggaran keamanan di luar kendali kami</li>
          </ul>

          <h2>12. Indemnifikasi</h2>
          <p>
            Anda setuju untuk melindungi dan membebaskan kami dari klaim,
            kerusakan, atau kerugian yang timbul dari:
          </p>
          <ul>
            <li>Pelanggaran ketentuan layanan ini</li>
            <li>Pelanggaran hak pihak ketiga</li>
            <li>Penggunaan Platform yang tidak sah</li>
            <li>Konten yang Anda upload</li>
          </ul>

          <h2>13. Perubahan Ketentuan</h2>
          <p>
            Kami dapat memperbarui ketentuan ini dari waktu ke waktu. Perubahan
            material akan dikomunikasikan melalui:
          </p>
          <ul>
            <li>Pemberitahuan email</li>
            <li>Pengumuman di Platform</li>
            <li>Update tanggal Terakhir diperbarui</li>
          </ul>

          <h2>14. Penghentian</h2>
          <p>Ketentuan ini berlaku hingga:</p>
          <ul>
            <li>Anda menghentikan penggunaan Platform</li>
            <li>Kami mengakhiri layanan atau akun Anda</li>
            <li>Ketentuan baru menggantikan yang lama</li>
          </ul>

          <h2>15. Hukum yang Berlaku</h2>
          <p>
            Ketentuan ini diatur oleh hukum Republik Indonesia. Setiap sengketa
            akan diselesaikan melalui pengadilan yang berwenang di Malang, Jawa
            Timur.
          </p>

          <h2>16. Kontak</h2>
          <p>Untuk pertanyaan tentang ketentuan layanan ini:</p>
          <ul>
            <li>
              <strong>Email:</strong> govtech@um.ac.id
            </li>
            <li>
              <strong>Alamat:</strong> Universitas Negeri Malang, Jl. Semarang
              No. 5, Malang, Jawa Timur 65145
            </li>
            <li>
              <strong>Departemen:</strong> Teknologi Pendidikan, Fakultas Ilmu
              Pendidikan
            </li>
          </ul>

          <h2>17. Keterpisahan</h2>
          <p>
            Jika ada bagian dari ketentuan ini yang dianggap tidak sah atau
            tidak dapat dilaksanakan, bagian lainnya tetap berlaku sepenuhnya.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t">
          <Link href="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Beranda
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
