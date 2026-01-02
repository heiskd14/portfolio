# Portfolio Website

## Overview

A modern developer portfolio website built with React and Express. The application showcases projects, skills, and provides a contact form for visitors. It features a dark-themed UI with smooth animations, responsive design, and a PostgreSQL database for persistent storage.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with CSS variables for theming
- **UI Components**: shadcn/ui component library (Radix UI primitives)
- **Animations**: Framer Motion for scroll reveals and transitions
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite

The frontend follows a component-based architecture with:
- Pages in `client/src/pages/`
- Reusable UI components in `client/src/components/ui/`
- Layout components in `client/src/components/layout/`
- Section components in `client/src/components/sections/`
- Custom hooks in `client/src/hooks/`

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM
- **Database**: PostgreSQL
- **API Design**: REST API with typed routes defined in `shared/routes.ts`
- **Validation**: Zod schemas for input validation

The backend follows a simple layered architecture:
- `server/index.ts` - Entry point and middleware setup
- `server/routes.ts` - API route handlers
- `server/storage.ts` - Data access layer using repository pattern
- `server/db.ts` - Database connection configuration

### Shared Code
The `shared/` directory contains code used by both frontend and backend:
- `shared/schema.ts` - Drizzle table definitions and Zod schemas
- `shared/routes.ts` - API route definitions with type-safe contracts

### Database Schema
Three main tables:
- **projects** - Portfolio projects with title, description, image, URLs, and tags
- **skills** - Technical skills categorized by type (Frontend, Backend, Tools)
- **messages** - Contact form submissions

### Build System
- Development: `tsx` for running TypeScript directly
- Production: Custom build script using esbuild for server and Vite for client
- Database migrations: Drizzle Kit with `db:push` command

## External Dependencies

### Database
- **PostgreSQL** - Primary database, connected via `DATABASE_URL` environment variable
- **Drizzle ORM** - Type-safe database queries and schema management
- **connect-pg-simple** - PostgreSQL session store (available but not currently used)

### Frontend Libraries
- **@tanstack/react-query** - Server state management and caching
- **framer-motion** - Animation library for scroll reveals
- **react-scroll** - Smooth scrolling for navigation
- **react-hook-form** - Form state management
- **@hookform/resolvers** - Zod integration for form validation
- **Radix UI** - Accessible, unstyled UI primitives (via shadcn/ui)

### Development Tools
- **Vite** - Frontend build tool with HMR
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type safety across the stack
- **Drizzle Kit** - Database migration tooling

### Replit-Specific
- **@replit/vite-plugin-runtime-error-modal** - Error overlay in development
- **@replit/vite-plugin-cartographer** - Development tooling (dev only)
- **@replit/vite-plugin-dev-banner** - Development banner (dev only)