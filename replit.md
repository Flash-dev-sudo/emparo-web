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

## Recent Changes

### June 29, 2025 - Production Deployment Fix & Render Configuration
- Fixed critical deployment path resolution issue preventing successful Render deployment
- Created custom production build script (production-build.js) to properly structure static files
- Updated render.yaml configuration with correct build command and environment variables
- Resolved static file serving path conflicts between development and production environments
- Added dynamic PORT environment variable support for Render's deployment requirements
- Configured DATABASE_URL environment variable for production database connection
- Verified build process creates correct file structure with all required assets
- Successfully tested production build pipeline with comprehensive file verification

### June 29, 2025 - Deployment Configuration & Text Readability Enhancement
- Fixed deployment path issue on Render with comprehensive build configuration
- Created render.yaml with symlink solution for path resolution problems
- Added build verification scripts and deployment utilities
- Enhanced text readability throughout website with improved contrast and typography
- Updated font weights from light to medium/bold for better visibility
- Applied high-contrast text with shadows on colored backgrounds
- Improved text colors from light gray to darker shades for better readability

### June 29, 2025 - Authentic Logo Design & Hero Section Redesign
- Created custom SVG rooster logo inspired by authentic Emparo storefront branding
- Replaced placeholder kiwi-bird icons with flame-like rooster silhouette throughout site
- Updated logo in navigation header, hero section, and footer components
- Completely redesigned hero section to match reference design with:
  - Orange gradient background matching brand colors
  - Large "PERI PERI" typography in yellow
  - Two-column layout with content cards and chicken image
  - Black content cards with rounded corners and authentic restaurant info
  - Customer rating display and call-to-action buttons
  - Rooster logo integration in strategic positions
- Enhanced visual consistency with authentic restaurant branding

### June 27, 2025 - Major Architecture Update
- Separated aesthetic home page from ordering functionality
- Added dedicated `/order` page for menu browsing and cart functionality
- Updated navigation to include "Order Menu" link
- Redesigned home page with featured dishes section inspired by Apple/Samsung design approach
- Updated contact information with real London address: 24 Blackstock Rd, Finsbury Park, N4 2DW
- Updated business hours: Daily 1 PM - 4 AM
- Integrated actual food images from provided zip file into gallery and featured sections
- Removed prices from home page for cleaner aesthetic presentation
- Added phone number: 020 3441 6940

### June 27, 2025 - Database Integration & Readability Improvements
- Connected to live Turso database with authentic menu data (14 items)
- Removed person image from About section for cleaner aesthetic
- Enhanced text readability across all sections with improved typography
- Added loading states for dynamic content from database
- Updated featured dishes to display actual menu items from database
- Improved contrast and spacing for better text readability
- Added bold emphasis to key restaurant process description

### June 27, 2025 - Comprehensive Menu Integration
- Successfully integrated complete menu system with 42 authentic items across 5 categories
- Connected to website database with comprehensive menu structure matching till system:
  - Starters (10 items): Chips, Peri Peri Chips, Potato Wedges, Wings, etc.
  - Platters (5 items): Family Platter, Chicken Platter, Mixed Grill, etc.
  - Fried Chicken (7 items): Whole/Half Fried Chicken, Wings, Burgers, etc.
  - Pizzas (8 items): Margherita, Peri Peri Chicken, Pepperoni, etc.
  - Mains (12 items): Grilled Chicken, Steaks, Curries, Fish & Chips, etc.
- Redesigned menu display with clean list layout (no image dependency)
- Improved text readability with larger fonts and better spacing
- Enhanced cart functionality with proper item addition and storage
- Updated menu categories to match authentic restaurant structure

### Architecture Changes
- **Home Page**: Now focuses on visual appeal with featured dishes, no pricing
- **Order Page**: Dedicated menu with full ordering functionality and cart
- **Navigation**: Updated to support two-page structure
- **Featured Dishes Component**: New component showcasing popular items without prices
- **Image Integration**: Real food images from client's assets now used throughout

## User Preferences

Preferred communication style: Simple, everyday language.
Design preference: Clean, aesthetic approach similar to Apple/Samsung websites with separate ordering functionality.