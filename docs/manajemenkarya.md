# Manajemen Karya Pameran

## Gambaran Umum

Manajemen karya merupakan proses untuk mengelola karya yang akan dipamerkan. Tim Manajemen karya bertugas untuk melakukan input data pada database karya. Karya yang diinput merupakan hasil dari proses kurasi yang telah dilakukan oleh tim kurator. Dalam pameran karya teknologi pendidikan, terdapat beberapa tahap dalam manajemen karya, yaitu:

1. Impor data karya hasil kurasi
2. Unggah cover karya
3. Validasi data karya
4. Typecheck data karya

Empat langkah tersebut akan dijelaskan lebih lanjut pada bagian selanjutnya.

### Pembagian Tugas

Pembagian tugas manajemen karya dilakukan berdasarkan jenis karya yang dipamerkan. Berikut adalah pembagian tugas manajemen karya:

| Jenis Karya      | PIC Manajemen |
| ---------------- | ------------- |
| karya-dokumen    | Anastasia     |
| karya-2d         | Anastasia     |
| karya-3d         | Fauza         |
| karya-video      | Fauza         |
| karya-presentasi | Yosela        |
| karya-website    | Yosela        |
| karya-multimedia | Rengga        |

## Impor Data Karya Hasil Kurasi

Proses Impor Data Karya telah terotomatasi. Tim kurator hanya perlu mencentang karya yang telah memenuhi syarat untuk ditampilkan pada karya. Tim manajemen karya tidak perlu melakukan impor data karya secara manual.

## Unggah Cover Karya

Unggah cover karya dilakukan untuk mengunggah cover karya yang akan ditampilkan pada halaman pameran. Cover karya yang diunggah harus sesuai dengan spesifikasi teknis yang telah ditentukan. Berikut adalah spesifikasi teknis cover karya:

1. Format file: JPG
2. Ukuran file: max 1 MB
3. Resolusi:
   | Jenis Karya | Resolusi | Rasio | Sumber |
   | ----------- | -------- | ----- | ------ |
   | 2D | 200x280 | A4 | File karya |
   | Dokumen | 200x280 | A4 | Sampul Depan |
   | 3D | 1280x720 | 16:9 | Screenshot Object |
   | Video | 1280x720 | 16:9 | Thumbnail |
   | Audio | 1280x720 | 16:9 | Opengraph |
   | Website | 1280x720 | 16:9 | Beranda Depan |
   | Multimedia | 1280x720 | 16:9 | Main menu / Splashscreen |
   | Presentasi | 1280x720 | 16:9 | Slide pertama |
   | Lainnya | 1280x720 | 16:9 | Sampul Depan |

Berikut adalah langkah - langkah untuk melakukan unggah cover karya:

1. Buka halaman [manajemen karya](https://docs.google.com/spreadsheets/d/1BDDtfwkzrbBoSAsm3EY1R8njzVTW-M-gi2zqL0m92mI/edit?usp=sharing)
2. Pilih sheets dengan awalan `karya-`, misalnya `karya-2d`. Sesuaikan dengan pembagian yang telah dilakukan oleh team lead manajemen.
3. Akan terdapat daftar karya yang telah diimpor. Pilih karya yang akan diberikan cover karya.
4. Unggah cover karya menuju folder [gdrive cover-karya](https://drive.google.com/drive/folders/14aQjfJDQibhVIvQH-gPT0Lu_TYLSQBw7?usp=sharing)
5. Rename cover karya sesuai dengan `uuid-karya`
6. Salin tautan cover karya dengan perizinan `anyone with the link can view`
7. Tempel tautan cover karya pada kolom `src_cover`
8. Lakukan proses ini untuk setiap karya yang akan diberikan cover karya.
9. Jika semua karya telah diberikan cover karya, maka lanjutkan ke langkah berikutnya.

## Validasi Data Karya

Validasi objek karya dilakukan untuk memastikan bahwa objek karya yang akan dipamerkan telah sesuai dengan spesifikasi teknis dari jenis karya yang dipamerkan. Validasi objek karya dilakukan dengan cara memeriksa metadata objek karya yang telah diimpor. Metadata objek karya yang diperiksa meliputi:

1. Nama file
2. Ukuran file
3. Tipe file
4. Resolusi file
5. Durasi file

Berikut adalah langkah - langkah untuk melakukan validasi objek karya:

1. Buka halaman [manajemen karya](https://docs.google.com/spreadsheets/d/1BDDtfwkzrbBoSAsm3EY1R8njzVTW-M-gi2zqL0m92mI/edit?usp=sharing)
2. Pilih sheets dengan awalan `karya-`, misalnya `karya-2d`. Sesuaikan dengan pembagian yang telah dilakukan oleh team lead manajemen.
3. Akan terdapat daftar karya yang telah diimpor. Pilih karya yang akan divalidasi.
4. Periksa metadata karya yang telah diimpor. Pastikan bahwa metadata karya telah sesuai dengan spesifikasi teknis dari jenis karya yang dipamerkan.
5. Jika metadata karya telah sesuai, maka tandai karya tersebut dengan warna hijau. Jika metadata karya tidak sesuai, maka tandai karya tersebut dengan warna merah.
6. Jika metadata karya tidak sesuai, maka hubungi team lead manajemen untuk melakukan perbaikan metadata karya.
7. Lakukan proses ini untuk setiap karya yang akan dipamerkan.
8. Jika semua karya telah divalidasi, maka lanjutkan ke langkah berikutnya.

Berikut adalah metadata karya yang perlu diperiksa:

| Nama Metadata   | Deskripsi                         | Contoh                                          |
| --------------- | --------------------------------- | ----------------------------------------------- |
| uuid_karya      | nomor induk karya                 | 6bd4576e-18ae-4faf-a6c8-11635e842ae6            |
| nama_peserta    | Nama lengkap mahasiswa            | John Doe                                        |
| uuid_peserta    | nomor induk sistem mahasiswa      | 6bd4576e-18ae-4faf-a6c8-11635e842ae6            |
| judul_karya     | Judul karya                       | Wajah Muram John Doe                            |
| deskripsi_karya | Deskripsi karya                   | Karya ini merupakan karya yang ...              |
| width           | Lebar objek karya (dalam piksel)  | 1920                                            |
| height          | Tinggi objek karya (dalam piksel) | 1080                                            |
| src_obj         | tautan karya                      | `https://drive.google.com/file/d/a86fs8rn92835` |
| src_cover       | tautan cover karya                | `https://drive.google.com/file/d/a86fs8rn92835` |
| validasi        | status validasi                   | centang                                         |

## Typecheck data karya

Typecheck merupakan proses pengecekan data yang dilakukan oleh sistem. Proses ini melakukan pencocokan kompabilitas data pada database dengan data yang diimpor. Proses ini dilakukan untuk memastikan bahwa data yang diimpor telah sesuai dengan spesifikasi teknis yang telah ditentukan. Sistem ini terotomatisasi pada saat proses WCU dilakukan
