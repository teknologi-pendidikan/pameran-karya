import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Kebijakan Privasi - Backoffice Pameran Karya Teknologi Pendidikan",
  description:
    "Kebijakan privasi untuk platform backoffice pameran karya teknologi pendidikan",
};

export default function PrivacyPolicyPage() {
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
            Kebijakan Privasi
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
          <h2>1. Informasi yang Kami Kumpulkan</h2>
          <p>
            Backoffice Pameran Karya Teknologi Pendidikan mengumpulkan informasi
            berikut:
          </p>
          <ul>
            <li>
              <strong>Informasi Akun:</strong> Nama, email, dan informasi profil
              yang Anda berikan saat mendaftar
            </li>
            <li>
              <strong>Data Karya:</strong> Konten karya akademik, metadata, dan
              file yang Anda upload
            </li>
            <li>
              <strong>Informasi Teknis:</strong> Alamat IP, browser, dan data
              penggunaan untuk meningkatkan layanan
            </li>
            <li>
              <strong>Data OAuth:</strong> Informasi profil Google yang
              diperlukan untuk autentikasi
            </li>
          </ul>

          <h2>2. Bagaimana Kami Menggunakan Informasi</h2>
          <p>Kami menggunakan informasi yang dikumpulkan untuk:</p>
          <ul>
            <li>Menyediakan dan mengelola layanan platform</li>
            <li>Memproses dan menampilkan submission karya</li>
            <li>Berkomunikasi dengan pengguna terkait layanan</li>
            <li>Meningkatkan keamanan dan fungsionalitas platform</li>
            <li>Menganalisis penggunaan untuk pengembangan layanan</li>
          </ul>

          <h2>3. Berbagi Informasi</h2>
          <p>
            Kami tidak menjual atau menyewakan informasi pribadi Anda. Kami
            dapat membagikan informasi dalam situasi berikut:
          </p>
          <ul>
            <li>
              <strong>Karya Publik:</strong> Karya yang disetujui akan
              ditampilkan secara publik
            </li>
            <li>
              <strong>Tim Internal:</strong> Admin dan moderator memiliki akses
              untuk mengelola platform
            </li>
            <li>
              <strong>Kepatuhan Hukum:</strong> Jika diperlukan untuk mematuhi
              hukum yang berlaku
            </li>
            <li>
              <strong>Penyedia Layanan:</strong> Dengan vendor tepercaya yang
              membantu operasional platform
            </li>
          </ul>

          <h2>4. Keamanan Data</h2>
          <p>
            Kami menerapkan langkah-langkah keamanan yang sesuai untuk
            melindungi informasi Anda:
          </p>
          <ul>
            <li>Enkripsi data saat transit dan penyimpanan</li>
            <li>Akses terbatas berdasarkan prinsip kebutuhan tahu</li>
            <li>Pemantauan keamanan berkelanjutan</li>
            <li>Backup data reguler</li>
          </ul>

          <h2>5. Hak Anda</h2>
          <p>Sebagai pengguna, Anda memiliki hak untuk:</p>
          <ul>
            <li>Mengakses dan memperbarui informasi pribadi Anda</li>
            <li>Menghapus akun dan data terkait</li>
            <li>Menarik persetujuan penggunaan data</li>
            <li>Meminta portabilitas data</li>
            <li>Mengajukan keluhan terkait privasi</li>
          </ul>

          <h2>6. Penyimpanan Data</h2>
          <p>
            Data Anda disimpan selama akun aktif dan periode retensi yang
            diperlukan untuk tujuan operasional dan kepatuhan. Data karya yang
            dipublikasikan dapat disimpan lebih lama untuk tujuan arsip
            akademik.
          </p>

          <h2>7. Cookie dan Teknologi Pelacakan</h2>
          <p>Platform ini menggunakan cookie dan teknologi serupa untuk:</p>
          <ul>
            <li>Menjaga sesi login Anda</li>
            <li>Mengingat preferensi pengguna</li>
            <li>Menganalisis kinerja platform</li>
            <li>Meningkatkan pengalaman pengguna</li>
          </ul>

          <h2>8. Perubahan Kebijakan</h2>
          <p>
            Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu.
            Perubahan signifikan akan dikomunikasikan melalui email atau
            pemberitahuan di platform.
          </p>

          <h2>9. Kontak</h2>
          <p>
            Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, silakan
            hubungi kami:
          </p>
          <ul>
            <li>
              <strong>Email:</strong> govtech@um.ac.id
            </li>
            <li>
              <strong>Alamat:</strong> Universitas Negeri Malang, Jl. Semarang
              No. 5, Malang, Jawa Timur 65145
            </li>
          </ul>

          <h2>10. Dasar Hukum</h2>
          <p>Pemrosesan data pribadi kami didasarkan pada:</p>
          <ul>
            <li>Persetujuan eksplisit dari pengguna</li>
            <li>Kepentingan sah dalam menyediakan layanan pendidikan</li>
            <li>Kepatuhan terhadap kewajiban hukum</li>
            <li>Perlindungan kepentingan vital subjek data</li>
          </ul>
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
