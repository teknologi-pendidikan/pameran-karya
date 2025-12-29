import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react";

export const metadata = {
  title: "Tentang Kami - Backoffice Pameran Karya Teknologi Pendidikan",
  description:
    "Informasi tentang platform backoffice pameran karya teknologi pendidikan Universitas Negeri Malang",
};

export default function AboutPage() {
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
            Tentang Backoffice Pameran Karya Teknologi Pendidikan
          </h1>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2>Tentang Platform</h2>
          <p>
            Backoffice Pameran Karya Teknologi Pendidikan adalah sistem
            manajemen internal yang dikembangkan oleh Program Studi Teknologi
            Pendidikan, Fakultas Ilmu Pendidikan, Universitas Negeri Malang.
            Platform ini dirancang untuk mengelola, mengkurasi, dan
            mempublikasikan karya-karya akademik mahasiswa dan dosen di bidang
            teknologi pendidikan.
          </p>

          <h2>Visi dan Misi</h2>
          <h3>Visi</h3>
          <p>
            Menjadi platform terdepan dalam pengelolaan dan pameran karya
            teknologi pendidikan yang inovatif, berkelanjutan, dan berdampak
            positif bagi dunia pendidikan.
          </p>

          <h3>Misi</h3>
          <ul>
            <li>
              Menyediakan sistem manajemen yang efisien untuk karya akademik
            </li>
            <li>
              Memfasilitasi kolaborasi antara mahasiswa, dosen, dan praktisi
              pendidikan
            </li>
            <li>
              Meningkatkan visibilitas penelitian dan inovasi teknologi
              pendidikan
            </li>
            <li>
              Mendukung pengembangan kompetensi digital dalam bidang pendidikan
            </li>
          </ul>

          <h2>Fitur Utama</h2>
          <div className="grid md:grid-cols-2 gap-6 not-prose">
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">
                📝 Manajemen Submission
              </h3>
              <p className="text-gray-600">
                Sistem terintegrasi untuk menerima, mengevaluasi, dan mengelola
                submission karya dari berbagai kategori teknologi pendidikan.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">
                🎯 Kurasi Profesional
              </h3>
              <p className="text-gray-600">
                Tim kurator ahli yang mengevaluasi kualitas dan relevansi setiap
                karya berdasarkan standar akademik yang ketat.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">🏛️ Pameran Digital</h3>
              <p className="text-gray-600">
                Platform pameran online yang memungkinkan karya diakses dan
                diapresiasi oleh komunitas akademik global.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">👥 Manajemen User</h3>
              <p className="text-gray-600">
                Sistem role-based access control yang memungkinkan pengelolaan
                user berdasarkan tingkat akses dan tanggung jawab.
              </p>
            </div>
          </div>

          <h2>Tim Pengembang</h2>
          <p>
            Platform ini dikembangkan oleh tim multidisiplin yang terdiri dari:
          </p>
          <ul>
            <li>
              <strong>Akademisi:</strong> Dosen dan peneliti Teknologi
              Pendidikan
            </li>
            <li>
              <strong>Developer:</strong> Tim pengembang aplikasi web
            </li>
            <li>
              <strong>Designer:</strong> Spesialis user experience dan interface
            </li>
            <li>
              <strong>Content Manager:</strong> Pengelola konten dan kurasi
            </li>
          </ul>

          <h2>Teknologi yang Digunakan</h2>
          <p>
            Platform ini dibangun menggunakan teknologi modern untuk memastikan
            performa, keamanan, dan skalabilitas yang optimal:
          </p>
          <ul>
            <li>Next.js 14 untuk frontend dan backend</li>
            <li>Supabase untuk database dan autentikasi</li>
            <li>TypeScript untuk type safety</li>
            <li>Tailwind CSS dan daisyUI untuk styling</li>
            <li>Cloud hosting untuk reliability dan performance</li>
          </ul>
        </div>

        <div className="mt-12 pt-8 border-t">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Kontak Kami</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Informasi Kontak</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <span>govtech@um.ac.id</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <span>Jl. Semarang No. 5, Malang, Jawa Timur 65145</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <span>(0341) 551312</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Departemen</h3>
              <p className="text-gray-600">
                Program Studi Teknologi Pendidikan
                <br />
                Fakultas Ilmu Pendidikan
                <br />
                Universitas Negeri Malang
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Link href="/">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali ke Beranda
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
