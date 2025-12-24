# Pameran Karya - Backoffice

A modern web application for managing creative work submissions and exhibitions. Built with Next.js, Supabase, and daisyUI.

## Features

- 🔐 **Authentication System** - Secure login/signup with Supabase Auth
- 👥 **Role-based Access Control** - Admin and User roles with different permissions
- 📝 **Work Submission** - Easy form for submitting creative works
- 👤 **People Management** - Manage author and contributor profiles
- 🏷️ **Category System** - Organize works by categories and types
- 📊 **Dashboard** - Overview of system statistics and recent activities
- 🎨 **Modern UI** - Built with daisyUI components and Tailwind CSS
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile devices

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS 4 + daisyUI 5
- **Language**: TypeScript
- **Package Manager**: pnpm

## Database Schema

The system uses the following main entities:

- **Work**: Creative submissions with title, abstract, status, and slug
- **Person**: Author/contributor profiles with name, affiliation, and bio
- **Category**: Classification system for works
- **Asset**: Files and media associated with works
- **Project & Story**: Organizational structures for grouping works

## Setup Instructions

### 1. Prerequisites

- Node.js 18+ installed
- pnpm package manager
- Supabase account and project

### 2. Environment Setup

1. Copy the environment template:

   ```bash
   cp .env.example .env.local
   ```

2. Fill in your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_SITE_URL=http://localhost:3001
   ```

### 3. Database Setup

1. In your Supabase project, run the SQL schema provided in `supabase/schema.sql`
2. This will create all necessary tables, functions, and RLS policies

### 4. Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The application will be available at `http://localhost:3001`

### 5. First Admin User

The system determines admin roles based on email patterns. Users with emails containing `@admin` or `@pamerankarya` are automatically granted admin privileges.

For production, modify the role detection logic in `lib/auth.ts`.

## User Roles

### User Role

- View dashboard with personal statistics
- Submit new works
- Manage their own submissions

### Admin Role

- All user permissions
- Access to admin panel
- Manage all works, people, and categories
- View system-wide statistics
- Moderate submissions

## Key Pages

- `/` - Landing page (redirects to dashboard if logged in)
- `/auth` - Login/signup page
- `/dashboard` - Main dashboard with statistics
- `/submit` - Work submission form
- `/admin` - Admin panel (admin only)
- `/admin/works` - Manage all works (admin only)
- `/admin/people` - Manage people/authors (admin only)
- `/admin/categories` - Manage categories (admin only)

## Development

### Project Structure

```
app/
├── auth/           # Authentication pages
├── dashboard/      # User dashboard
├── submit/         # Work submission
├── admin/          # Admin pages
├── globals.css     # Global styles with daisyUI
└── layout.tsx      # Root layout

components/
├── navbar.tsx      # Navigation component
└── role-guard.tsx  # Role-based access control

lib/
├── auth.ts         # Authentication utilities
└── supabase/       # Supabase client configurations
```

### Key Features Implementation

1. **Authentication Flow**

   - Client-side auth with Supabase
   - Server-side session management
   - Middleware for route protection

2. **Role-based Access**

   - RoleGuard component for protecting routes
   - Dynamic navbar based on user role
   - Admin-only pages and features

3. **Form Management**

   - Comprehensive work submission form
   - Dynamic author and asset management
   - Auto-generated slugs
   - Form validation and error handling

4. **Admin Interface**
   - CRUD operations for all entities
   - Bulk operations and filtering
   - Statistics and analytics

## Production Deployment

1. Set up your production Supabase project
2. Update environment variables
3. Deploy to your preferred platform (Vercel, Netlify, etc.)
4. Configure domain and SSL
5. Set up email templates in Supabase for auth emails

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please open an issue on the GitHub repository.
