import { Metadata } from "next"
import { Button } from "components/Button/Button"

export const metadata: Metadata = {
  title: "Pameran Karya Teknologi Pendidikan",
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    url: "https://pamerankarya.teknologipendidikan.or.id/",
    images: [
      {
        width: 1200,
        height: 630,
        url: "#",
      },
    ],
  },
}

export default function ComingSoon() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-blue-100/50 blur-3xl"></div>
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-slate-100/50 blur-3xl"></div>
        <div className="absolute top-1/3 right-1/3 h-32 w-32 rounded-full bg-indigo-100/30 blur-2xl"></div>
      </div>

      {/* Main content */}
      <div className="relative flex min-h-screen items-center justify-center px-4 py-16">
        <div className="mx-auto w-full max-w-6xl">
          {/* Hero section */}
          <div className="mb-20 text-center">
            {/* Status badge */}
            <div className="mb-8 flex justify-center">
              <div className="group inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-white/80 px-6 py-3 shadow-sm backdrop-blur-sm transition-all hover:shadow-md">
                <div className="relative">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500"></div>
                  <div className="absolute inset-0 h-2 w-2 animate-ping rounded-full bg-blue-400"></div>
                </div>
                <span className="text-sm font-medium text-slate-700">Segera Hadir</span>
              </div>
            </div>

            {/* Main heading */}
            <div className="space-y-6">
              <h1 className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-7xl lg:text-8xl">
                Pameran Karya
              </h1>
              <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500"></div>
              <p className="mx-auto max-w-4xl text-lg leading-relaxed text-slate-600 md:text-xl lg:text-2xl">
                Program akhir tahun untuk menampilkan karya-karya terbaik dari mahasiswa Teknologi Pendidikan di
                Indonesia.
              </p>
            </div>
          </div>

          {/* Content grid */}
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Team section */}
            <div className="group rounded-3xl border border-white/60 bg-white/40 p-8 shadow-lg backdrop-blur-md transition-all hover:bg-white/50 hover:shadow-xl md:p-10">
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500">
                    <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800">Tim Pengembang</h2>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-4">
                    <div className="group/item flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-blue-50/50">
                      <div className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 transition-transform group-hover/item:scale-125"></div>
                      <span className="text-slate-700 transition-colors group-hover/item:text-slate-900">
                        Departemen Teknologi Pendidikan UM
                      </span>
                    </div>
                    <div className="group/item flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-blue-50/50">
                      <div className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 transition-transform group-hover/item:scale-125"></div>
                      <span className="text-slate-700 transition-colors group-hover/item:text-slate-900">
                        Teknologi Pendidikan ID
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="group/item flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-blue-50/50">
                      <div className="h-2 w-2 rounded-full bg-gradient-to-r from-indigo-400 to-indigo-500 transition-transform group-hover/item:scale-125"></div>
                      <span className="text-slate-700 transition-colors group-hover/item:text-slate-900">
                        Ikatan Mahasiswa TEP Seluruh Indonesia
                      </span>
                    </div>
                    <div className="group/item flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-blue-50/50">
                      <div className="h-2 w-2 rounded-full bg-gradient-to-r from-indigo-400 to-indigo-500 transition-transform group-hover/item:scale-125"></div>
                      <span className="text-slate-700 transition-colors group-hover/item:text-slate-900">
                        Educational Technology Career Lab
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-slate-200/50 bg-slate-50/50 p-4">
                  <p className="text-center text-sm text-slate-600">
                    <span className="font-medium">+</span> mitra dan kolaborator lainnya
                  </p>
                </div>
              </div>
            </div>

            {/* CTA section */}
            <div className="group rounded-3xl border border-white/60 bg-white/40 p-8 shadow-lg backdrop-blur-md transition-all hover:bg-white/50 hover:shadow-xl md:p-10">
              <div className="flex h-full flex-col justify-center space-y-8 text-center">
                <div className="flex items-center justify-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500">
                    <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800">Tetap Terhubung</h2>
                </div>

                <div className="space-y-6">
                  <p className="text-lg text-slate-600">
                    Ikuti perkembangan terbaru dan dapatkan akses early access ketika platform diluncurkan
                  </p>

                  <div className="space-y-4">
                    <Button href="https://teknologipendidikan.or.id/">Kunjungi Teknologi Pendidikan ID</Button>

                    <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-400"></div>
                        <span>Gratis</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-400"></div>
                        <span>Open Source</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-purple-400"></div>
                        <span>Kolaboratif</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-20 border-t border-slate-200/50 pt-8">
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
              <p className="text-sm text-slate-500">
                © 2025 Pameran Karya Teknologi Pendidikan. Semua hak dilindungi.
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>Dibuat dengan</span>
                <span className="text-red-400">♥</span>
                <span>untuk Teknologi Pendidikan di Indonesia</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
