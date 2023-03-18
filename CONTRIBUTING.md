# Dokumentasi Teknis Aplikasi Pameran Karya Teknologi Pendidikan

## Daftar isi

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Directory Structure](#directory-structure)
- [Technical Difficulties](#technical-difficulties)

### Dokumen Teknis Lainnya

- [Konsep Aplikasi](/docs/concept.md)
- [Penggunaan Panel Admin (wip)](/docs/adminpanel.md)
- [Penggunaan Google Sheets](/docs/google-sheets.md)
- [Penggunaan Netlify (wip)](/docs/Netlify.md)
- [Arsitektur Aplikasi](/docs/architecture.md)
- [Pemetaan Karya Teknologi Pendidikan](/docs/mapping.md)

## Introduction

Pameran Karya Teknologi Pendidikan 2023 adalah sebuah aplikasi berbasis web yang dibuat untuk memudahkan pengelolaan data pameran karya teknologi pendidikan yang diselenggarakan oleh Mahasiswa Departemen Teknologi Pendiidkan Universitas Negeri Malang.

Aplikasi ini dikembangkan sebagai salah satu syarat untuk memenuhi tugas akhir dari mata kuliah Proyek Pameran Digital yang diampu oleh Ibu Arafah Husna, M.Pd.

Tujuan kami dalam membuat aplikasi ini adalah untuk memudahkan memperkenalkan karya teknologi pendidikan yang dibuat oleh mahasiswa Departemen Teknologi Pendidikan Universitas Negeri Malang kepada masyarakat luas melalui saluran digital.

## Installation

1. Install [Node.js (v16)](https://nodejs.org/en/download/)
2. Install [PNPM](https://pnpm.io/installation)
3. Install dependencies `pnpm install`
4. Copy `.env.example` to `.env` and fill the environment variables
   - `GAPI_SPREADSHEET` is the Google Sheets API key
   - `REVALIDATE_SECRET` is the secret key for triggering the build hooks
   - `URL` is the URL of the website, use `http://localhost:3000` for development
   - `NEXT_PUBLIC_URL` is the URL of the website, use `http://localhost:3000` for development
5. Run the development server `pnpm dev`

## Usage

1. Run the development server `pnpm dev`
2. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Directory Structure

```text
/
|---src/
|   |---components/ # Reusable components
|   |---data/ # Data fetching
|   |---hooks/ # Custom hooks
|   |---lib/ # Utility functions
|   |---pages/ # Next.js pages
|   |---styles/ # Global styles
|---public # Static files
|---docs # Documentation
```

## Technical Difficulties

- [ ] Mobile view is not responsive
- [ ] The website is not SEO friendly
- [ ] The website is not accessible
- [ ] The website is not optimized for performance
- [ ] The website is not optimized for security
- [ ] The website is not optimized for privacy
- [ ] The website is not optimized for accessibility
