# Components

This document provides an overview of the key components in the Auto USDT Frontend project.

## Component Organization

Components are organized into the following categories:

### UI Components (`src/components/ui/`)

Basic UI elements that form the building blocks of the application:

- Buttons
- Inputs
- Cards
- Modals
- Dropdowns
- Loaders

### Layout Components (`src/components/layout/`)

Components that define the overall structure of the application:

- Header
- Footer
- Sidebar
- Navigation
- Container

### Authentication Components (`src/components/auth/`)

Components related to user authentication:

- Login Form
- Registration Form
- Wallet Connection
- Authentication Modals

### Section Components (`src/components/sections/`)

Larger components that make up specific sections of pages:

- Hero Sections
- Feature Sections
- Pricing Sections
- Contact Sections

## Component Usage Guidelines

### Component Props

All components should have well-defined props with TypeScript interfaces. For example:

```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}
```

### Component Structure

Components should follow a consistent structure:

1. Import statements
2. Type definitions
3. Component function
4. Export statement

Example:

```tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps {
  // props definition
}

export function Button({ variant = 'primary', size = 'md', children, onClick, disabled }: ButtonProps) {
  // component implementation
  return (
    <button
      className={cn(
        'rounded-md font-medium transition-colors',
        // variant and size specific classes
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
```

### Styling Approach

Components use Tailwind CSS for styling, with the following conventions:

- Use the `cn` utility for conditional class names
- Follow a mobile-first responsive approach
- Use design tokens from the Tailwind configuration

## Key Components Reference

### Button

The primary button component with multiple variants and sizes.

### Card

Container component for displaying content in a card format.

### Input

Text input component with various states (default, error, disabled).

### Modal

Dialog component for displaying content that requires user interaction.

### Header

Main navigation header with responsive design.

### Footer

Page footer with links and information.

For more detailed information about specific components, refer to the component files in the source code. 