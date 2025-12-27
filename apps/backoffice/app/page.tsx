import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative px-6 py-24 mx-auto max-w-7xl lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Backoffice Pameran Karya Teknologi Pendidikan
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Sistem manajemen backoffice untuk mengelola dan menampilkan
            karya-karya teknologi pendidikan dari mahasiswa dan akademisi.
            Platform ini memungkinkan admin untuk mengelola submission, review,
            dan publikasi karya akademik.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/auth">
              <Button size="lg">Masuk ke Dashboard</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Fitur Utama
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Platform manajemen komprehensif untuk karya teknologi pendidikan
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  📄 Manajemen Submission
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Kelola dan review submission karya akademik dari mahasiswa
                    dan dosen
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  🏛️ Kurasi Pameran
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Organisir dan kelola tampilan karya untuk pameran teknologi
                    pendidikan
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  👥 Manajemen User
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Kelola akses dan permission untuk contributor dan admin
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <Link href="/tentang" className="text-gray-400 hover:text-gray-500">
              Tentang Kami
            </Link>
            <Link
              href="/kebijakan-privasi"
              className="text-gray-400 hover:text-gray-500"
            >
              Kebijakan Privasi
            </Link>
            <Link
              href="/ketentuan-layanan"
              className="text-gray-400 hover:text-gray-500"
            >
              Ketentuan Layanan
            </Link>
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 text-gray-500">
              &copy; 2025 Universitas Malang. Teknologi Pendidikan.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
