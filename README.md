# Adventuring Ghost Monorepo

A modern monorepo with multiple React frontends, featuring a shared UI package with a beautiful sunrise theme.

## 🎨 Theme Colors

The project uses a custom sunrise theme with these colors:
- **Cyan**: `#59D5E0`
- **Yellow**: `#F5DD61`
- **Orange**: `#FAA300`
- **Pink**: `#F4538A`

## 📁 Project Structure

```
Portfolio.sites/
├── apps/
│   ├── portfolio/              # Personal portfolio website
│   ├── glow-grove/             # E-commerce demo application
│   ├── blogsite-api/           # RESTful API with authentication
│   ├── hike-harvest-serverless/ # AWS Lambda serverless API
│   ├── netops-showcase-aws/    # Network topology & Packet Tracer
│   └── security-lab/           # AWS security configurations
├── packages/
│   ├── ui/                     # Shared UI components
│   └── types/                  # Shared TypeScript types
├── terraform/                  # Infrastructure as Code
├── screenshots/                # Project screenshots (netops only)
└── docs/                       # Documentation
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm 8+

### Step-by-Step Setup

1. **Navigate to the project directory**
   ```bash
   cd "C:\Users\kathe\OneDrive\Documents\Code projects\Portfolio.sites"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the shared packages**
   ```bash
   npm run build --workspace=packages/ui
   npm run build --workspace=packages/types
   ```

4. **Start the development server**
   ```bash
   # For Portfolio app
   npm run dev:portfolio
   
   # For Glow Grove e-commerce
   npm run dev:glow-grove
   
   # For Blogsite API
   npm run dev:blogsite-api
   ```

5. **Open your browser**
   - Portfolio: `http://localhost:3005`
   - Glow Grove: `http://localhost:3006`
   - Blogsite API: `http://localhost:4001`

### Portfolio App Features

- **Home Page**: Hero section with call-to-action buttons, skills overview, and recent work showcase
- **Projects Page**: Grid of project cards with search functionality and filtering
- **Project Detail Pages**: Individual project pages with full details, links, and tech stack
- **Notes Page**: Interactive note-taking app with form and list (ready for API integration)
- **Contact Page**: Contact form with professional information and social links
- **404 Page**: Custom not found page with navigation options
- **SEO Optimized**: Dynamic meta tags, Open Graph, and Twitter Card support
- **Responsive Design**: Mobile-first approach with beautiful sunrise theme
- **Shared Components**: Consistent UI using Button, Card, and Input components

### Glow Grove E-commerce Features

- **Product Catalog**: Browse and search products with filtering
- **Shopping Cart**: Add/remove items with persistent storage
- **Checkout Process**: Complete order flow with form validation
- **Interactive Quiz**: Personalized skincare recommendations
- **Responsive Design**: Mobile-first approach with consistent sunrise theme
- **SEO Optimized**: Meta tags and structured data
- **Type Safety**: Full TypeScript support with custom interfaces

### Blogsite API Features

- **User Authentication**: JWT-based authentication system
- **Blog Management**: CRUD operations for posts and comments
- **Quiz Integration**: Store and validate quiz results
- **Rate Limiting**: Protection against abuse
- **API Documentation**: Interactive Swagger UI
- **Security**: CORS, input validation, and security headers

## 📦 Available Scripts

### Root Level
- `npm run dev:portfolio` - Start portfolio app (port 3005)
- `npm run dev:glow-grove` - Start glow-grove app (port 3006)
- `npm run dev:blogsite-api` - Start blogsite API (port 4001)
- `npm run build` - Build all packages and apps
- `npm run test` - Run tests across all workspaces
- `npm run lint` - Run linting across all workspaces

### Individual Apps
- `npm run build --workspace=apps/portfolio` - Build portfolio
- `npm run build --workspace=apps/glow-grove` - Build glow-grove
- `npm run build --workspace=apps/blogsite-api` - Build blogsite API

### UI Package (`packages/ui`)
- `npm run build` - Build the package
- `npm run dev` - Watch mode for development

### Types Package (`packages/types`)
- `npm run build` - Build the package
- `npm run dev` - Watch mode for development

## 🎯 Features

### Portfolio Website
- **Home Page**: Hero section, skills overview, and recent work
- **Projects Index**: Searchable grid of all projects with filtering
- **Project Detail Pages**: Full project information with external links
- **Notes Page**: Interactive note-taking app (ready for API integration)
- **Contact Page**: Contact form and professional information
- **404 Page**: Custom error page with navigation

### Shared UI Package
- **Button Component**: Primary and secondary variants with different sizes
- **Card Component**: Flexible card layout with padding options
- **Input Component**: Form inputs with labels, validation, and error states
- **Theme System**: Consistent sunrise color palette and typography

### Shared Types Package
- **Project Type**: TypeScript interface for project data structure
- **Reusable Types**: Shared type definitions across the monorepo

### Routing
- React Router v6 for client-side navigation
- Dynamic routes for project detail pages (`/projects/:slug`)
- Responsive navigation with mobile support
- Active page highlighting

## 🔧 Development

### Adding New Projects

1. **Add project data** to `apps/portfolio/src/data/projects.ts`:
   ```typescript
   {
     slug: "your-project",
     title: "Your Project Title",
     tagline: "Short description",
     description: "Long detailed description...",
     tech: ["React", "TypeScript", "TailwindCSS"],
     links: {
       live: "https://your-project.com",
       github: "https://github.com/yourname/your-project",
       caseStudy: "https://example.com/case-study",
       video: "https://youtube.com/watch?v=..."
     },
     status: "Live", // or "WIP", "Archived"
     date: "2025-01-01", // ISO date string
     highlights: [
       "Key feature 1",
       "Key feature 2"
     ],
     thumbnail: "/src/assets/projects/your-project.jpg"
   }
   ```

2. **Add project thumbnail** (optional):
   - Place image in `apps/portfolio/src/assets/projects/<slug>.jpg`
   - Reference in project data as `thumbnail: "/src/assets/projects/<slug>.jpg"`

3. **Update project links**:
   - `live`: URL to live demo
   - `github`: GitHub repository URL
   - `caseStudy`: Detailed case study URL
   - `video`: Demo video URL

### Modifying the UI Package
1. Make changes in `packages/ui/src/`
2. Build the package: `npm run build --workspace=packages/ui`
3. Changes will be reflected in consuming apps

### Modifying the Types Package
1. Make changes in `packages/types/src/`
2. Build the package: `npm run build --workspace=packages/types`
3. Update consuming apps to use new types

### Notes App API Integration
The Notes page is ready for backend integration. Current features:
- Form for adding new notes
- List display with delete functionality
- Simulated API calls (replace with real endpoints)
- Future features planned: real-time updates, search, markdown support

## 🎨 Customization

### Theme Colors
Modify the sunrise colors in:
- `packages/ui/tailwind.config.js`
- `packages/ui/src/styles/theme.css`

### Adding New Components
1. Create component in `packages/ui/src/components/`
2. Export from `packages/ui/src/index.ts`
3. Build the package
4. Import in your apps

### Adding New Types
1. Create type definition in `packages/types/src/`
2. Export from `packages/types/src/index.ts`
3. Build the package
4. Import in your apps

## 🚀 Deployment

### Portfolio App
```bash
# Build for production
npm run build --workspace=apps/portfolio

# Preview build
npm run preview --workspace=apps/portfolio
```

### UI Package
```bash
# Build for distribution
npm run build --workspace=packages/ui
```

### Types Package
```bash
# Build for distribution
npm run build --workspace=packages/types
```

## 📝 Notes

- The monorepo uses npm workspaces for dependency management
- All apps share the same UI components and theme
- TypeScript is configured for type safety across the project
- Tailwind CSS provides utility-first styling with custom theme
- React Router handles client-side navigation
- Project data is centralized in `apps/portfolio/src/data/projects.ts`
- Each project has its own detail page accessible via `/projects/:slug`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test across all apps
5. Submit a pull request

## Pre-Launch SAFE_MODE
This repo uses **SAFE_MODE** to prevent accidental cloud spend before launch.
- `SAFE_MODE=true` blocks deploy verbs in CI and via a local pre-push hook.
- Use safe commands only: `terraform plan`, `serverless package`, `cdk synth`.
- To go live, open a PR that sets `SAFE_MODE=false` and adds explicit deploy workflows.

## 📸 Screenshots
See the `screenshots/` directory for project screenshots, particularly the NetOps showcase images.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
