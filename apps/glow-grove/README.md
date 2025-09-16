# Glow Grove

A modern e-commerce demonstration application showcasing product catalogs, shopping cart functionality, and checkout processes.

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: React Context API
- **Build Tool**: Vite
- **UI Components**: Custom component library

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables (optional)
cp .env.example .env

# Start development server
npm run dev
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE` | Backend API base URL | `http://localhost:4001` |
| `VITE_NODE_ENV` | Environment | `development` |

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint

# Run tests
npm test
```

## Features

- **Product Catalog**: Browse and search products
- **Shopping Cart**: Add/remove items with persistent storage
- **Checkout Process**: Complete order flow with form validation
- **Interactive Quiz**: Personalized skincare recommendations
- **Responsive Design**: Mobile-first approach
- **SEO Optimized**: Meta tags and structured data

## API Integration

The app integrates with the Blogsite API for quiz submissions:

- **Quiz Results**: Automatically submits quiz results to `/api/quiz-results`
- **Environment Configurable**: API base URL configurable via `VITE_API_BASE`
- **Error Handling**: Graceful degradation if API is unavailable

## Deployment

### Build

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

### Environment Configuration

For production, set the appropriate environment variables:

```bash
VITE_API_BASE=https://your-api-domain.com
VITE_NODE_ENV=production
```