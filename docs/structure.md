# Project Structure

This document outlines the structure of the Auto USDT Frontend project, explaining the purpose of each directory and key files.

## Root Directory

- `.next/`: Contains the build output from Next.js
- `.vscode/`: VS Code configuration files
- `docs/`: Project documentation
- `node_modules/`: External dependencies
- `public/`: Static assets that are served directly
- `src/`: Source code for the application
- `.env`: Environment variables
- `.gitignore`: Specifies files to be ignored by Git
- `next.config.js`: Next.js configuration
- `package.json`: Project metadata and dependencies
- `tailwind.config.js`: Tailwind CSS configuration
- `tsconfig.json`: TypeScript configuration

## Source Directory (`src/`)

The `src/` directory contains all the application source code, organized as follows:

### `app/`

Contains the Next.js App Router structure:

- `layout.tsx`: Root layout component
- `page.tsx`: Home page component
- `globals.css`: Global CSS styles

### `components/`

Reusable UI components organized by category:

- `auth/`: Authentication-related components
- `layout/`: Layout components (header, footer, etc.)
- `sections/`: Page section components
- `ui/`: Basic UI components (buttons, inputs, etc.)

### `hooks/`

Custom React hooks for reusing stateful logic.

### `lib/`

Utility libraries and shared code.

### `utils/`

Helper functions and utilities.

### `services/`

API service functions for data fetching and manipulation.

### `types/`

TypeScript type definitions.

### `middleware/`

Next.js middleware for request processing.

### `config/`

Configuration files and constants.

## Key Files

- `src/app/layout.tsx`: Defines the main layout structure
- `src/app/page.tsx`: The home page component
- `package.json`: Lists all dependencies and scripts
- `next.config.js`: Configuration for Next.js
- `tailwind.config.js`: Configuration for Tailwind CSS
- `tsconfig.json`: TypeScript compiler options 