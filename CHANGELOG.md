# Changelog

All notable changes to the Pameran Karya Teknologi Pendidikan project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned

- User authentication and registration system
- Advanced work filtering and search capabilities
- Real-time conference streaming integration

## [0.1.0] - 2024-12-22

### Initial Release 🎉

First official release of the Pameran Karya Teknologi Pendidikan platform for showcasing Educational Technology student works across Indonesia.

### Added

#### Core Platform

- Responsive homepage with navigation and featured sections
- Next.js 16.1.0 with App Router and TypeScript support
- Static site generation for optimal performance
- Modern UI components with daisyUI and Tailwind CSS

#### Content Features

- **Work Directory** (`/work`) - Student project showcase with detail pages
- **Exhibitor Directory** (`/person`) - Student profiles and portfolios
- **Blog System** (`/blog`) - MDX-powered educational content
- **Conference Platform** (`/conference`) - Event streaming and schedules
- **Category Exploration** (`/explore`) - Browse by content categories
- **Documentation** (`/whitepaper`) - Event information and guidelines

#### Technical Features

- Supabase PostgreSQL database with optimized schema
- SEO optimization with dynamic meta tags and Open Graph
- WCAG 2.1 AA accessibility compliance
- PWA-ready with web app manifest
- Performance optimized (Lighthouse 90+ target)

#### Database Schema

- `work` table - Student projects and academic works
- `contributors` table - Work authors and collaborators
- `assets` table - Digital files and media
- `persons` table - Student and exhibitor profiles

### Tech Stack

- **Frontend**: Next.js 16.1.0, React 19.2.1, TypeScript 5.x
- **Styling**: Tailwind CSS 4.x, daisyUI 5.5.14
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Content**: MDX for blog posts and documentation
- **Deployment**: Netlify with static export

### Event Details

- **Date**: December 25-26, 2025
- **Location**: Building A20, Universitas Negeri Malang, East Java
- **Format**: Hybrid (Physical + Digital)
- **Components**: Students Short Talks, Project Showcase, Competitions

### Known Limitations

- Authentication system not yet implemented
- Limited to static content (no real-time features)
- Basic bilingual support (full i18n pending)
- Admin-only content management
