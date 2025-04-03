# Shopi E-commerce  [![es](https://img.shields.io/badge/lang-es-red.svg)](https://github.com/devgnox/shopi-ecommerce/README.es.md) [![es](https://img.shields.io/badge/lang-en-yellow.svg)](https://github.com/devgnox/shopi-ecommerce/README.md)

Una plataforma de comercio electrónico moderna creada con Next.js, Tailwind CSS y React Query (TanStack Query).

![Shopi E-commerce](https://github.com/user-attachments/assets/3b71bdc2-efbf-4b15-95d8-ec194a461620)

## Tabla de contenido

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Estructura del proyecto](#project-structure)
- [Optimizaciones de rendimiento](#performance-optimizations)

## Overview

Shopi es una aplicación de comercio electrónico completa que utiliza técnicas avanzadas de desarrollo frontend. La plataforma ofrece una experiencia de compra fluida con navegación de productos, vistas detalladas, gestión del carrito de compras, autenticación de usuarios y gestión de favoritos.

## Features

### Catálogo de productos
- Diseño adaptable de cuadrícula de productos
- Filtrado por categorías
- Paginación
- Estados de carga, vacío y error
- Diseño optimizado para dispositivos móviles

### Detalles del producto
- Páginas de producto dinámicas
- Galería de imágenes
- Variantes de producto (talla, color)
- Sección de productos relacionados
- Función para añadir al carrito

### Sección de carritos de compra
- Añadir, actualizar y eliminar artículos
- Carrito persistente (almacenamiento local)
- Resumen del pedido con subtotal, impuestos y total
- Funcionalidad de compra

### Cuenta de usuario
- Autenticación (iniciar sesión/registrarse)
- Sistema de favoritos
- Historial de pedidos

### UX/UI
- Diseño adaptable (móvil, tableta, escritorio)
- Animaciones y transiciones fluidas
- Diseño accesible con atributos ARIA

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

### Requisitos 

- Node.js 18+ 
- npm or yarn

### Instalación

1. Clonar el repositorio
```bash
git clone https://github.com/your-username/shopi-ecommerce.git
cd shopi-ecommerce
```

2. Instalar dependencias
```bash
npm install
# or
yarn install
```

3. Ejecute el servidor de desarrollo
```bash
npm run dev
# or
yarn dev
```

4. Abrir [http://localhost:3000](http://localhost:3000) en su navegador

### Build para producción

```bash
npm run build
npm run start
# or
yarn build
yarn start
```

## Estructura del proyecto

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

## Optimizaciones de rendimiento

- Se implementaron importaciones dinámicas para componentes no críticos.
- Se utilizó el componente de imagen Next.js para la optimización automática de imágenes.
- Se añadieron encabezados de caché adecuados para recursos estáticos.
- Se empleó la división de código para reducir el tamaño inicial del paquete.
- Se implementó la carga diferida para el contenido debajo de la página.
- Se utilizó el compilador JIT de Tailwind para una salida CSS mínima.

---

Creado con 💜 usando Next.js, Tailwind CSS y TanStack Query
