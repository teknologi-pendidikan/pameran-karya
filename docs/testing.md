# Panduan ujicoba aplikasi

_Sebelum melakukan ujicoba, alangkah baiknya untuk membaca [konsep](docs/concept.md) dari aplikasi pameran karya._

## Gambaran Umum

Secara umum, proses ujicoba dilakukan untuk memastikan bahwa fitur - fitur yang telah dikembangkan telah **memenuhi** kebutuhan serta tujuan dari calon pengguna. Selain hal tersebut, ujicoba digunakan memastikan bahwa selutuh fitur telah mencapai titik stabil yang tidak akan menimbulkan masalah ketika digunakan oleh para pengguna pada saat aplikasi telah dirilis kepada publik.

## Orientasi Pengembangan

Orientasi pengembangan adalah dasar asumsi dari calon pengguna yang akan menggunakan aplikasi. Dasar berikut digunakan sebagai acuan pengembangan dari aplikasi berdasarkan mayoritas masyarakat yang akan dijangkau oleh kegiatan pameran karya. Efek samping dari pengguna diluar orientasi ini adalah munculnya galat, ketidakberfungsian fitur bahkan tidak dapat diaksesnya aplikasi, jika menemukan hal tersebut, laporkan kasus tersebut dengan format rincian yang telah diberikan pada sheet-laporan galat.

| Aspek            | Orientasi                                                                                      |
| ---------------- | ---------------------------------------------------------------------------------------------- |
| Nama Aplikasi    | Pameran Karya Teknologi Pendidikan                                                             |
| Target Pengguna  | Masyarakat dengan rentang umur 19 - 30 tahun dalam lingkup pekerjaan bidang pendidikan         |
| Target Perangkat | PC/Laptop dengan rasio layar 16:9 (1280x720 - 1920x1080) serta Smartphone keluaran tahun 2018+ |
| Target OS        | Windows 10+, MacOS 12+, Linux Ubuntu 20.04+, Android 10+, iOS 14+                              |
| Target Browser   | Chrome 98+, Firefox 2021+, Safari 2022 update 3+                                               |
| Target Orientasi | Landscape                                                                                      |

## Daftar Halaman

Berikut adalah daftar halaman yang dapat diakses pada aplikasi pameran karya. Untuk memudahkan pengujian, halaman dapat diakses dengan menggunakan alamat url yang telah disediakan pada kolom **Tautan**. Untuk melihat deskripsi dari halaman tersebut, dapat dilihat pada kolom **Deskripsi**. Jika terjadi kesalahan pada halaman tersebut, laporkan dengan format rincian yang telah diberikan pada sheet-laporan galat.

| Tautan                                                                                                     | Deskripsi                         |
| :--------------------------------------------------------------------------------------------------------- | :-------------------------------- |
| [`/`](`https://pamerankarya.teknologipendidikan.or.id/`)                                                   | Halaman utama                     |
| [`/karya/`](`https://pamerankarya.teknologipendidikan.or.id/karya/`)                                       | Halaman Daftar Kategori Media     |
| [`/karya/2d`](`https://pamerankarya.teknologipendidikan.or.id/karya/2d`)                                   | Halaman Media 2d                  |
| [`/karya/3d`](`https://pamerankarya.teknologipendidikan.or.id/karya/3d`)                                   | Halaman Media 3d                  |
| [`/karya/dokumenpembelajaran`](`https://pamerankarya.teknologipendidikan.or.id/karya/dokumenpembelajaran`) | Halaman Media dokumenpembelajaran |
| [`/karya/multimedia`](`https://pamerankarya.teknologipendidikan.or.id/karya/multimedia`)                   | Halaman Media Multimedia          |
| [`/karya/videopembelajaran`](`https://pamerankarya.teknologipendidikan.or.id/karya/videopembelajaran`)     | Halaman Media videosinematografi  |
| [`/karya/presentasi`](`https://pamerankarya.teknologipendidikan.or.id/karya/presentasi`)                   | Halaman Media presentasi          |
| [`/karya/website`](`https://pamerankarya.teknologipendidikan.or.id/karya/website`)                         | Halaman Media website             |
| [`/post/tentang`](`https://pamerankarya.teknologipendidikan.or.id/post/tentang`)                           | Halaman Tentang Pameran           |
| [`/post/pedoman-pengunjung`](`https://pamerankarya.teknologipendidikan.or.id/post/pedoman-pengunjung`)     | Halaman Pedoman Pengunjung        |
| [`/post/pedoman-partisipan`](`https://pamerankarya.teknologipendidikan.or.id/post/pedoman-partisipan`)     | Halaman Pedoman Partisipan        |
| [`/post/kirimkarya`](`https://pamerankarya.teknologipendidikan.or.id/post/kirimkarya`)                     | Halaman Pengiriman Karya          |
| [`/404`](`https://pamerankarya.teknologipendidikan.or.id/404`)                                             | Halaman 404                       |
| [`/500`](`https://pamerankarya.teknologipendidikan.or.id/500`)                                             | Halaman 500                       |

## Daftar Fitur

Berikut adalah daftar fitur yang dapat diakses pada aplikasi pameran karya. Untuk memudahkan pengujian, fitur dapat diakses dengan menggunakan alamat url yang telah disediakan pada kolom **Tautan**. Untuk melihat deskripsi dari fitur tersebut, dapat dilihat pada kolom **Deskripsi**. Jika terjadi kesalahan pada fitur tersebut, laporkan dengan format rincian yang telah diberikan pada sheet-laporan galat.

- Media 2D dapat diperbesar dengan cara klik pada gambar
- Media Video dapat diputar dengan cara klik pada thumbnail
- Total karya participant dapat dilihat pada halaman pertisipan
- Slide presentasi dapat berpindah secara otomatis
- Slide presentasi dapat berpindah secara manual dengan cara klik pada tombol next dan previous

## Known Issues

- Halaman pengiriman karya tidak dapat diakses karena belum dibuatkan form pengiriman karya
- Halaman 404 dan 500 memang dibuat untuk menampilkan halaman error, sehingga tidak perlu dilaporkan
- Halaman kategori media tidak memiliki konten deskripsi karena belum dibuatkan konten deskripsi
- Halaman media 2d, 3d, dokumenpembelajaran, multimedia, videosinematografi, presentasi, dan website memiliki tampilan yang berbeda jika diakses melalui smartphone.
- Halaman media 2d seringkali menampilkan gamabr yang blur atau tidak HD, hal tersebut dapat terpicu karena jaringan yang lambat atau gambar yang tidak HD pada saat pengiriman karya.
- Halaman videopembelajaran seringkali menampilkan video yang tidak dapat diputar, hal tersebut dapat terpicu karena jaringan yang lambat, video yang tidak sesuai dengan format yang diharapkan ataupun video telah dihapus/unlisted oleh pengirim karya.
- Halaman website seringkali menampilkan website yang tidak dapat diakses, hal tersebut dapat terpicu karena jaringan yang lambat, website yang tidak sesuai dengan format yang diharapkan ataupun website telah dihapus/unlisted oleh pengirim karya.

## Format Laporan Galat

Berikut adalah format laporan galat yang dapat digunakan untuk melaporkan galat yang terjadi pada aplikasi pameran karya. Laporan galat dapat dilakukan dengan mengisi kolom pada sheet-laporan galat. Laporan galat yang tidak sesuai dengan format yang telah ditentukan akan diabaikan. Silahkan mengisi kolom dengan format yang telah ditentukan pada sheet-laporan galat.

| Summary                    | Deskripsi                                         | Steps to Reproduce                        | Expected Result       | Actual Result         | Screenshot                                   |
| :------------------------- | :------------------------------------------------ | :---------------------------------------- | :-------------------- | :-------------------- | :------------------------------------------- |
| Judul / Penjelasan singkat | Deskripsi lebih lanjut + perangkat yang digunakan | Langkah - langkah untuk memunculkan galat | Hasil yang diharapkan | Hasil yang sebenarnya | Screenshot dari halaman yang mengalami galat |
