# Lettfaktura Frontend

A modern React application for invoice management built with Vite and modern web technologies.

## Tech Stack

### Core Framework & Build Tools

- **React**: `^19.1.1` - Modern React with latest features
- **React DOM**: `^19.1.1` - DOM rendering for React
- **Vite**: `^7.1.2` - Lightning-fast build tool and dev server
- **Node.js**: `v22.12.0` (recommended)
- **npm**: `10.9.0`

### JavaScript Version

- **ES2020** - Modern JavaScript features
- **ESM Modules** - Using ES6 import/export syntax
- **JSX** - React JSX syntax enabled

### Routing & Navigation

- **React Router DOM**: `^7.8.2` - Client-side routing with latest v7 features
  - Nested routing with layout components
  - Programmatic navigation
  - Route protection patterns

### HTTP Client & API

- **Axios**: `^1.11.0` - Promise-based HTTP client
  - Custom axios instance with interceptors
  - Request/response transformation
  - Timeout and error handling
  - Environment-based API URL configuration

### State Management & Utilities

- **js-cookie**: `^3.0.5` - Cookie handling utility
- **React Helmet Async**: `^2.0.5` - Document head management

### Development Tools

- **ESLint**: `^9.33.0` - Code linting and quality
  - React Hooks plugin for hooks linting
  - React Refresh plugin for fast refresh
  - Custom rules configuration
- **Vite Plugin React SWC**: `^4.0.0` - Ultra-fast React compilation using SWC
- **TypeScript Support**: Type definitions for React (`^19.1.10`) and React DOM (`^19.1.7`)

### CSS & Styling

- **Pure CSS** - Custom CSS files for styling
- **CSS Variables** - Modern CSS custom properties
- **Responsive Design** - Mobile-first responsive layouts

### Project Structure

```
src/
├── components/
│   └── layouts/          # Layout components (Public/Private)
├── pages/               # Page components
├── routes/              # Routing configuration
├── services/            # API services
├── utils/               # Utility functions
└── assets/              # Static assets
```

### Build Configuration

- **Vite Config**: Modern build configuration with React SWC
- **ESLint Config**: Modern flat config with recommended rules
- **Package Type**: ESM modules
- **Browser Compatibility**: Modern browsers with ES2020 support

### Deployment

- **Vercel**: Configured for deployment with SPA routing
- **Environment Variables**: Vite environment variable support
- **Build Output**: Optimized production builds

### Key Features

- Modern React 19 with concurrent features
- Fast development with Vite HMR
- Type-safe development with TypeScript definitions
- Code quality enforcement with ESLint
- Responsive design patterns
- API integration with custom axios setup
- Route-based code organization
- Production-ready build configuration

## Getting Started

### Prerequisites

- Node.js v22.12.0 or later
- npm 10.9.0 or later

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Linting

```bash
npm run lint
```

### Preview Production Build

```bash
npm run preview
```

## Environment Configuration

Create a `.env` file based on `.env.example` to configure API endpoints and other environment variables.
