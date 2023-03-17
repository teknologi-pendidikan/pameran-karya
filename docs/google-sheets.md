# Google Sheets Pameran karya

Google Sheets menjadi pilihan sebagai manajemen konten dan database utama dari seluruh data yang terdapat pada situs pameran ini. Semua data pameran akan tersentral melalui google sheet dan akan difetch oleh situs web untuk ditampilkan pada halaman-halaman yang dibutuhkan. Google sheets juga akan digunakan untuk mengelola data-data yang diperlukan oleh situs web, seperti data pengunjung, data peserta pameran, dan data sponsor.

Google Sheets dapat diakses melalui tautan ini: [Akses Publik](https://docs.google.com/spreadsheets/d/e/2PACX-1vTUjtWpc-r5ivb2Rr6rmNMXEbO45YXsj139OSluEU2ZtJLOnCBuMT_8cEizb5c9z8zi2v8o-VDS0HGN/pubhtml) atau [Akses Administrator (email @teknologipendidikan.or.id)](https://docs.google.com/spreadsheets/d/1BDDtfwkzrbBoSAsm3EY1R8njzVTW-M-gi2zqL0m92mI/edit?usp=sharing)

## Struktur Data

Google sheets terdiri dari 4 sheet utama, yaitu:

- Sheet `descinfo`
- Sheet `peserta`
- Sheet `teams`
- Sheet `karya-peserta`

### Sheet `descinfo`

| Nama Kolom | Tipe Data | Deskripsi       |
| :--------- | :-------- | :-------------- |
| `id`       | `string`  | ID deskripsi    |
| `title`    | `string`  | Judul deskripsi |
| `desc`     | `string`  | Deskripsi       |
| `link`     | `string`  | Tautan          |

### Sheet `peserta`

| Nama Kolom     | Tipe Data | Deskripsi                   |
| :------------- | :-------- | :-------------------------- |
| `uuid`         | `string`  | UUID peserta                |
| `name`         | `string`  | Nama peserta                |
| `nim`          | `string`  | NIM peserta                 |
| `angkatan`     | `string`  | Angkatan Peserta / kategori |
| `jumlah_karya` | `string`  | Jumlah karya Peserta        |
| `link_foto`    | `string`  | Tautan Foto Profil UM       |

### Sheet `teams`

| Nama Kolom | Tipe Data | Deskripsi     |
| :--------- | :-------- | :------------ |
| `uuid`     | `string`  | UUID tim      |
| `name`     | `string`  | Nama tim      |
| `desc`     | `string`  | Deskripsi tim |
| `link`     | `string`  | Tautan tim    |
| `members`  | `string`  | Anggota tim   |

### Sheet `karya-peserta`

| Nama Kolom | Tipe Data | Deskripsi       |
| :--------- | :-------- | :-------------- |
| `uuid`     | `string`  | UUID karya      |
| `nim`      | `string`  | NIM peserta     |
| `title`    | `string`  | Judul karya     |
| `desc`     | `string`  | Deskripsi karya |
| `link`     | `string`  | Tautan karya    |
| `peserta`  | `string`  | Peserta karya   |
| `email`    | `string`  | Email peserta   |
| `jenis`    | `string`  | Jenis karya     |
| `ack`      | `booelan` | Acknowledgement |
