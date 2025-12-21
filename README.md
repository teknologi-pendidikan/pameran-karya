# Pameran Karya Teknologi Pendidikan (PKTEP) 2025

[![Next.js](https://img.shields.io/badge/Next.js-16.1.0-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.1-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.x-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![daisyUI](https://img.shields.io/badge/daisyUI-5.5.14-5A0EF8?logo=daisyui)](https://daisyui.com/)
[![Supabase](https://img.shields.io/badge/Supabase-2.89.0-3ECF8E?logo=supabase)](https://supabase.io/)

> **Pameran Karya TEP 2025** adalah platform digital untuk menampilkan karya-karya inovatif dari mahasiswa Teknologi Pendidikan di seluruh Indonesia. Platform ini menyediakan ruang bagi mahasiswa untuk memamerkan hasil karya akademik, berbagi inspirasi, dan membangun jejaring dengan sesama mahasiswa Teknologi Pendidikan.

## Tentang Proyek

Pameran Karya TEP 2025 merupakan ajang mahasiswa Teknologi Pendidikan memperkenalkan karsa cipta, produk, dan kompetensi yang telah ditempuh selama berkuliah. Platform ini menggabungkan tiga komponen utama:

- **Students Short Talks (SST)** - Presentasi singkat untuk berbagi ide dan inspirasi
- **Showcase Produk Matakuliah (SPM)** - Pameran digital dan fisik hasil proyek matakuliah
- **Kompetisi Produk Matakuliah (KPM)** - Ajang kompetisi karya unggulan mahasiswa

### 📅 Informasi Acara

- **Tanggal**: To be announced
- **Lokasi**: Gedung A20, Universitas Negeri Malang, Jawa Timur
- **Dikelola oleh**: Teknologi Pendidikan ID & Ikatan Mahasiswa Teknologi Pendidikan Indonesia

## Fitur Utama

### Direktori Karya

- Koleksi lengkap karya mahasiswa dari seluruh Indonesia
- Filter dan pencarian berdasarkan kategori, universitas, atau penulis
- Detail karya dengan abstract, kontributor, dan aset digital

### Direktori Eksibitor

- Profil mahasiswa yang berpartisipasi
- Portfolio karya individual
- Informasi kontak dan afiliasi universitas

### Blog & Whitepaper

- Artikel tentang teknologi pendidikan modern
- Dokumentasi lengkap tentang event dan penyelenggaraan
- Resource untuk mahasiswa dan pendidik

### Conference Platform

- Live streaming konferensi
- Jadwal acara dan speaker
- Interactive sessions dan Q&A

## 🛠️ Tech Stack

### Frontend

- **Next.js 16.1.0** - React framework dengan App Router
- **React 19.2.1** - UI library
- **TypeScript 5.x** - Type-safe development
- **Tailwind CSS 4.x** - Utility-first CSS framework
- **daisyUI 5.5.14** - Tailwind CSS component library
- **Framer Motion** (via tw-animate-css) - Animations
- **Base UI** - Headless UI components
- **Radix UI** - Accessible UI primitives

### Content Management

- **MDX** - Markdown with JSX support
- **Gray Matter** - YAML front matter parsing
- **React Markdown** - Markdown rendering
- **Remark GFM** - GitHub Flavored Markdown

### Backend & Database

- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Authentication
  - Real-time subscriptions
  - File storage

### Development Tools

- **ESLint 9.x** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **Lint-staged** - Run linters on staged files
- **pnpm** - Fast, disk space efficient package manager

### Deployment

- **Netlify** - Primary hosting platform
- **Cloudflare Pages** - Secondary hosting platform

## Quick Start

### Prerequisites

- Node.js 22+
- pnpm
- Supabase account untuk backend services

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd pamerankarya
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Environment Setup**

   ```bash
   # Copy environment template
   cp .env.example .env.local

   # Add your Supabase credentials
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_supabase_anon_key
   ```

4. **Start development server**

   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Generate optimized production build
pnpm build

# Start production server
pnpm start
```

## Project Structure

```
pamerankarya/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Homepage
│   ├── blog/             # Blog pages
│   ├── conference/       # Conference platform
│   ├── explore/          # Category exploration
│   ├── person/           # Exhibitor directory
│   ├── work/             # Work showcase
│   └── whitepaper/       # Documentation
├── assets/                # Static content
│   ├── blog/             # Blog posts (MDX)
│   ├── data/             # Static data files
│   └── whitepaper.mdx    # Event documentation
├── components/            # React components
│   ├── sections/         # Homepage sections
│   └── ui/               # Reusable UI components
├── lib/                  # Utility functions
├── public/               # Public assets
├── supabase/             # Database schema & migrations
└── utils/                # Supabase client utilities
```

## Contributing

We welcome contributions from the Educational Technology community! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

### Quick Contribution Guide

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm typegen:build` | Generate types and check TypeScript |

## Deployment

The project is configured for deployment on Netlify with automatic builds from the main branch.

### Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` - Supabase publishable key

## Database Schema

The project uses Supabase PostgreSQL with the following main tables:

- `work` - Student works and projects
- `contributors` - Work contributors/authors
- `assets` - Digital assets and files
- `persons` - Exhibitor profiles

See `supabase/migrations/` for complete schema definitions.

Please do seed data as needed for development using Supabase dashboard or CLI, or refer to the `supabase/seed/` folder for sample data scripts.

## Documentation

- [Contributing Guidelines](CONTRIBUTING.md)
- [Changelog](CHANGELOG.md)
- [Event Whitepaper](assets/whitepaper.mdx)

## Design System

The project uses a comprehensive design system built on:

- **daisyUI themes** - Consistent color palettes and component styling
- **Plus Jakarta Sans** - Primary font family
- **Responsive design** - Mobile-first approach with Tailwind CSS
- **Accessibility** - WCAG 2.1 compliant components

## Support & Community

- **Website**: [teknologipendidikan.or.id](https://teknologipendidikan.or.id)
- **Organization**: Teknologi Pendidikan ID
- **Community**: Ikatan Mahasiswa Teknologi Pendidikan Indonesia

## License

This project is part of the Educational Technology Indonesia initiative. Please respect the intellectual property of student works and contributors.

Licensed under the [GNU AGPL v3](LICENSE).
