# Dokumentasi Teknis Aplikasi Pameran Karya Teknologi Pendidikan

## Daftar isi

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)

### Dokumen Teknis Lainnya

- [Konsep Aplikasi](concept.md)
- [Penggunaan Panel Admin](adminpanel.md)
- [Penggunaan Google Sheets](google-sheets.md)
- [Penggunaan Netlify](Netlify.md)
- [Arsitektur Aplikasi](architecture.md)
- [Pemetaan Karya Teknologi Pendidikan](mapping.md)

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

``` text
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
