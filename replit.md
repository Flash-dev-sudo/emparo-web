# Emparo Peri Peri Restaurant Website

## Overview

This is a modern, fast food restaurant website for Emparo Peri Peri, built with React, Express.js, and PostgreSQL. The application features a dynamic menu system connected to a Turso database, responsive design with Tailwind CSS, and comprehensive restaurant website functionality including menu display, gallery, about section, and contact form.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: React Query (@tanstack/react-query) for server state
- **Styling**: Tailwind CSS with custom Emparo brand colors
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL via Turso (libSQL)
- **API Structure**: RESTful endpoints for menu items and contact form
- **Development**: Hot module replacement with Vite integration

### Brand Integration
- **Color Scheme**: Orange (#F97316), Black (#0F0F0F), White (#FFFFFF)
- **Typography**: Montserrat and Poppins fonts
- **Branding**: Rooster symbol/logo throughout the application
- **Design**: Modern, responsive layout with smooth animations

## Key Components

### Database Schema
- **Menu Items Table**: Stores restaurant menu with categories, prices, descriptions, images, and heat levels
- **Users Table**: Basic user structure (currently unused but prepared for future authentication)

### Frontend Components
- **Navigation**: Fixed header with smooth scrolling navigation
- **Hero Section**: Prominent branding with call-to-action
- **Menu Section**: Dynamic menu display with category filtering and cart functionality
- **Gallery Section**: Responsive image gallery showcase
- **About Section**: Brand story and values presentation
- **Contact Section**: Contact form with backend integration
- **Cart System**: Shopping cart with local storage persistence

### API Endpoints
- `GET /api/menu` - Retrieve all menu items
- `GET /api/menu/:category` - Filter menu items by category
- `POST /api/contact` - Handle contact form submissions

## Data Flow

1. **Menu Data**: Fetched from Turso database via Drizzle ORM
2. **State Management**: React Query handles caching and synchronization
3. **Cart Management**: Local state with localStorage persistence
4. **Form Handling**: Direct API communication for contact submissions
5. **Image Assets**: External URLs for menu and gallery images

## External Dependencies

### Database
- **Turso Database**: LibSQL compatible PostgreSQL database
- **Connection**: Direct connection using provided credentials
- **ORM**: Drizzle for type-safe database operations

### UI Libraries
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library
- **Class Variance Authority**: Component variant management
- **Tailwind CSS**: Utility-first styling framework

### Development Tools
- **TypeScript**: Type safety across the stack
- **Vite**: Fast build tool and development server
- **ESBuild**: Fast JavaScript bundler for production

## Deployment Strategy

The application is structured for deployment on Render with the following considerations:

### Build Process
- Frontend builds to `dist/public` directory
- Backend compiles to `dist/index.js`
- Static assets served from build directory

### Environment Configuration
- Database credentials configured via environment variables
- Production-ready Express server setup
- Proper error handling and logging

### File Structure
```
├── client/          # React frontend
├── server/          # Express backend
├── shared/          # Shared types and schemas
├── dist/            # Build output
└── migrations/      # Database migrations
```

## Changelog
- June 27, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.