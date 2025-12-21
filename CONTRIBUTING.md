# Contributing to Pameran Karya Teknologi Pendidikan

Welcome to the Pameran Karya TEP contributing guide! We're excited that you're interested in contributing to this platform that showcases the innovative works of Educational Technology students across Indonesia.

## How to Contribute

### For Students and Academic Community

- **Submit Your Work**: Share your academic projects and innovations
- **Join as Exhibitor**: Register as an exhibitor to showcase your portfolio
- **Content Creation**: Write blog posts about educational technology trends
- **Event Participation**: Participate in conferences, talks, and competitions

### For Developers and Designers

- **Code Contributions**: Help improve the platform functionality
- **UI/UX Improvements**: Enhance user experience and accessibility
- **Bug Reports**: Report issues and suggest improvements
- **Documentation**: Improve documentation and guides

## Development Setup

### Prerequisites

- Node.js 22 or higher
- pnpm
- Git
- Supabase account (for database access)
- Code editor (VS Code recommended)

### Getting Started

1. **Fork the Repository**

   ```bash
   # Fork via GitHub UI, then clone your fork
   git clone https://github.com/your-username/pamerankarya.git
   cd pamerankarya
   ```

2. **Set Up Development Environment**

   ```bash
   # Install dependencies
   pnpm install

   # Copy environment template
   cp .env.example .env.local
   ```

3. **Configure Environment Variables**

   ```bash
   # .env.local
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_supabase_anon_key
   ```

4. **Start Development Server**

   ```bash
   pnpm dev
   ```

5. **Verify Setup**
   - Open <http://localhost:3000>
   - Check that the homepage loads correctly
   - Verify database connection works

## Contribution Types

### Bug Reports

Before creating a bug report, please:

- Check existing issues to avoid duplicates
- Include clear reproduction steps
- Provide relevant system information

**Bug Report Template:**

```markdown
**Describe the Bug**
A clear and concise description of the bug.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected Behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g., Windows, macOS, Linux]
- Browser: [e.g., Chrome, Firefox, Safari]
- Version: [e.g., 22]

**Additional Context**
Any other context about the problem.
```

### Feature Requests

When proposing new features:

- Explain the use case and benefits
- Consider impact on existing functionality
- Provide mockups or detailed descriptions
- Discuss with maintainers before implementation

**Feature Request Template:**

```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Alternative solutions or features you've considered.

**Additional context**
Any other context or screenshots about the feature request.
```

### Code Contributions

#### Code Style Guidelines

We use automated tools to maintain code quality:

- **ESLint** for JavaScript/TypeScript linting
- **Prettier** for code formatting
- **Husky** for pre-commit hooks
- **TypeScript** for type safety

**Key Principles:**

- Follow existing code patterns and conventions
- Write self-documenting code with clear variable names
- Add TypeScript types for new interfaces and functions
- Use modern React patterns (hooks, functional components)
- Implement responsive design with mobile-first approach

#### Component Development

**React Component Guidelines:**

```typescript
// ✅ Good: Functional component with proper typing
interface ButtonProps {
  variant: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Button({ variant, children, onClick }: ButtonProps) {
  return (
    <button
      className={`btn ${variant === 'primary' ? 'btn-primary' : 'btn-secondary'}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

**Styling Guidelines:**

- Use Tailwind CSS utility classes
- Leverage daisyUI components when appropriate
- Ensure accessibility (ARIA labels, semantic HTML)
- Test responsive design on multiple screen sizes
- Follow the established design system

#### Database Changes

When working with Supabase:

- Create migrations for schema changes
- Update TypeScript types accordingly
- Test queries thoroughly
- Consider data privacy and security

**Example Migration:**

```sql
-- supabase/migrations/20241222000000_add_new_table.sql
CREATE TABLE public.categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Categories are viewable by everyone"
ON public.categories FOR SELECT
USING (true);
```

### Content Contributions

#### Blog Posts

We welcome educational technology content:

- Industry insights and trends
- Student success stories
- Technical tutorials
- Research findings
- Tool reviews and comparisons

**Blog Post Structure:**

```markdown
---
title: "Your Article Title"
description: "Brief description for SEO"
date: "2024-12-22"
author: "Your Name"
tags: ["teknologi", "pendidikan", "innovation"]
image: "/blog/your-image.jpg"
---

# Your Article Title

Introduction paragraph that hooks the reader...

## Main Content Sections

Well-structured content with clear headings...

## Conclusion

Actionable takeaways for readers...
```

#### Documentation Updates

Help improve our documentation:

- Fix typos and grammatical errors
- Add missing information
- Create tutorials and guides
- Translate content to Bahasa Indonesia
- Update outdated information

## Pull Request Process

### 1. Branch Strategy

```bash
# Create feature branch from main
git checkout main
git pull origin main
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/bug-description

# For documentation
git checkout -b docs/update-contributing
```

### 2. Development Workflow

```bash
# Make your changes
# Test thoroughly
pnpm lint
pnpm build

# Commit with descriptive messages
git add .
git commit -m "feat: add new component for exhibitor profiles

- Add ExhibitorCard component with responsive design
- Implement portfolio showcase functionality
- Add accessibility improvements for screen readers
- Update TypeScript interfaces for new data structure"
```

### 3. Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**

```bash
feat(auth): add social media login integration
fix(ui): resolve mobile navigation menu overlay issue
docs(readme): update installation instructions
style(components): format code according to Prettier rules
refactor(api): optimize database queries for better performance
```

### 4. Pull Request Template

When creating a pull request, include:

```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## How Has This Been Tested?
Describe the tests you ran and provide instructions to reproduce.

## Screenshots (if applicable)
Add screenshots to help explain your changes.

## Checklist
- [ ] My code follows the code style of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
```

### 5. Review Process

- Maintainers will review your PR within 2-3 business days
- Address feedback promptly and professionally
- Update your branch if main has moved forward
- Be patient and respectful during the review process

## Design Guidelines

### Visual Design Principles

- **Clean and Modern**: Minimalist approach with purposeful elements
- **Accessible**: WCAG 2.1 AA compliance for all users
- **Indonesian Context**: Cultural sensitivity and local relevance
- **Mobile-First**: Responsive design for all screen sizes
- **Consistent**: Follow established design system

### Color Palette

```css
/* Primary Colors */
--primary: #4A90E2;     /* Main brand blue */
--secondary: #7B68EE;   /* Accent purple */
--accent: #FF6B6B;      /* Highlight red */

/* Neutral Colors */
--base-100: #FFFFFF;    /* Background white */
--base-200: #F8F9FA;    /* Light gray */
--base-300: #E9ECEF;    /* Medium gray */
--base-content: #212529; /* Text color */
```

### Typography

```css
/* Font Family: Plus Jakarta Sans */
--font-primary: 'Plus Jakarta Sans', sans-serif;

/* Font Weights */
--font-light: 300;
--font-regular: 400;
--font-medium: 500;
--font-bold: 700;
```

## Internationalization

We support bilingual content (Indonesian and English):

- Write content in Indonesian by default
- Provide English translations for key sections
- Use semantic HTML for proper language declaration
- Consider cultural context in content creation

## Security Guidelines

### Data Privacy

- Never commit sensitive information (API keys, passwords)
- Use environment variables for configuration
- Follow GDPR and Indonesian data protection laws
- Implement proper authentication and authorization

### Code Security

- Validate all user inputs
- Use parameterized queries for database operations
- Implement proper CORS policies
- Keep dependencies updated

## Performance Guidelines

### Frontend Performance

- Optimize images (WebP format, proper sizing)
- Implement lazy loading for non-critical content
- Minimize bundle size through code splitting
- Use Next.js built-in optimizations

### Backend Performance

- Optimize database queries
- Implement proper caching strategies
- Use CDN for static assets
- Monitor performance metrics

## Learning Resources

### Educational Technology

- [AECT](https://aect.org/) - Association for Educational Communications & Technology
- [Indonesian Educational Technology Community](https://teknologipendidikan.or.id/)

### Development Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [daisyUI Documentation](https://daisyui.com/)
- [Supabase Documentation](https://supabase.io/docs)

### Design Resources

- [Figma Community](https://www.figma.com/community)
- [Material Design Guidelines](https://material.io/design)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## Community Guidelines

### Code of Conduct

We are committed to providing a welcoming and inclusive environment:

- Be respectful and professional in all interactions
- Welcome newcomers and help them get started
- Focus on constructive feedback and collaborative problem-solving
- Respect different perspectives and experiences
- Report inappropriate behavior to maintainers

### Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **Pull Requests**: Code discussions and reviews
- **Email**: Direct contact with maintainers
- **Community Forums**: General discussions about educational technology

## Roadmap and Future Plans

### Short-term Goals (Q1 2025)

- [ ] Implement user authentication and profiles
- [ ] Add advanced search and filtering
- [ ] Improve mobile responsiveness
- [ ] Create comprehensive API documentation
- [ ] Add automated testing suite

### Medium-term Goals (Q2-Q3 2025)

- [ ] Multi-language support (full i18n)
- [ ] Real-time collaboration features
- [ ] Advanced analytics dashboard
- [ ] Integration with learning management systems
- [ ] Mobile application development

### Long-term Vision

- Become the primary platform for educational technology showcase in Indonesia
- Foster innovation and collaboration among students
- Support career development and networking
- Contribute to educational technology research and development

## Getting Help

### Documentation

- Check this contributing guide
- Read the main README.md
- Browse existing issues and discussions

### Direct Contact

- Create a GitHub issue for technical problems
- Email maintainers for sensitive issues
- Join community discussions for general questions

### Response Times

- Issues: 2-3 business days
- Pull requests: 2-3 business days
- Security concerns: 24-48 hours

---

## Recognition

All contributors will be recognized in our:

- README.md contributors section
- Annual community report
- Conference presentations and acknowledgments
- Social media highlights

Thank you for contributing to the future of educational technology in Indonesia! Your efforts help create better learning experiences for students and educators across the nation.

---

**Happy Contributing! 🚀**

*"Technology is best when it brings people together."* - Matt Mullenweg
