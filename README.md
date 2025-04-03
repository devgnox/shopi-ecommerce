# Shopi E-commerce  [![es](https://img.shields.io/badge/lang-es-red.svg)](https://github.com/devgnox/shopi-ecommerce/README.es.md) [![es](https://img.shields.io/badge/lang-en-yellow.svg)](https://github.com/devgnox/shopi-ecommerce/README.md)

A modern e-commerce platform built with Next.js, Tailwind CSS, and React Query (TanStack Query).

![Shopi E-commerce](https://github.com/user-attachments/assets/3b71bdc2-efbf-4b15-95d8-ec194a461620)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Performance Optimizations](#performance-optimizations)

## Overview

Shopi is a full-featured e-commerce application that demonstrates advanced front-end development techniques. The platform provides a seamless shopping experience with product browsing, detailed product views, cart management, user authentication, and favorites management.

## Features

### Product Catalog
- Responsive product grid layout
- Category-based filtering
- Pagination
- Loading, empty, and error states
- Mobile-friendly design

### Product Details
- Dynamic product pages
- Image gallery
- Product variants (size, color)
- Related products section
- Add to cart functionality

### Shopping Cart

- Add/update/remove items
- Persistent cart (localStorage)
- Order summary with subtotal, taxes, and total
- Buy funtionality

### User Account
- Authentication (login/register)
- Favorites system
- Order history

### UI/UX Features
- Responsive design (mobile, tablet, desktop)
- Smooth animations and transitions
- Accessible design with ARIA attributes

## Tech Stack

- **Framework**: Next.js 15.2.4 with App Router
- **UI Library**: React 19.0.0
- **Styling**: Tailwind CSS 4.0.17
- **Data Fetching**: TanStack Query (React Query) 5.70.0
- **Component Libraries**: 
  - Headless UI 2.2.0
  - Swiper 11.2.6
- **HTTP Client**: Axios 1.8.4
- **Icons**: Lucide React 0.485.0
- **Notifications**: React Hot Toast 2.5.2
- **Utilities**: Tailwind Merge 3.0.2
- **Table Management**: TanStack Table 8.21.2
- **Development Tools**:
  - ESLint 9
- **Dummy Data API**: [DummyJSON](https://dummyjson.com/)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/shopi-ecommerce.git
cd shopi-ecommerce
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm run start
# or
yarn build
yarn start
```

## Project Structure

```
shopi-ecommerce/
├── app/                   # App Router pages and layout
│   ├── auth/              # Authentication pages
│   ├── productos/         # Product pages
│   ├── profile/           # User profile
│   ├── api/               # API routes
│   └── layout.js          # Root layout
├── components/            # Reusable components
│   ├── UI/                # UI elements
│   ├── ProductCard.jsx    # Product card component
│   └── ...
├── hooks/                 # Custom hooks
│   ├── useAuth.js         # Authentication hook
│   ├── useCart.js         # Cart management hook
│   └── ...
├── lib/                   # Utility functions
│   ├── api.js             # API client
│   ├── utils.js           # Helper functions
│   └── ...
├── public/                # Static assets
├── styles/                # Global styles
├── .eslintrc.js           # ESLint configuration
├── tailwind.config.js     # Tailwind configuration
└── package.json           # Project dependencies
```

## Performance Optimizations

- Implemented dynamic imports for non-critical components
- Used Next.js Image component for automatic image optimization
- Added proper caching headers for static assets
- Employed code splitting to reduce initial bundle size
- Implemented lazy loading for below-the-fold content
- Used Tailwind's JIT compiler for minimal CSS output


---

Created with ❤️ using Next.js, Tailwind CSS, and TanStack Query
