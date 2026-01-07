#  Server-Rendered E-commerce Product Management Dashboard

A high-performance **Server-Side Rendered (SSR)** administrative dashboard built with **Next.js 16**.  
This project demonstrates a **server-first architecture** for managing e-commerce products with excellent performance, SEO, security, and scalability.

---

##  Project Links

- **Live Demo:**  
  https://server-rendered-e-commerce-product-xi.vercel.app

- 💻 **Source Code:**  
  https://github.com/bnspavankumar2005/Server-Rendered-E-commerce-Product-Management-Dashboard

---

##  Admin Access (Demo Credentials)

Use the following demo credentials to access admin features:

- **Email:** `admin@demo.com`
- **Password:** `admin123456`
- **Login URL:**  
  https://server-rendered-e-commerce-product-xi.vercel.app/sign-in

>  Unauthorized users are redirected to the login page using **Next.js Middleware**.

---

## Objective

The goal of this project is to build a **scalable, server-side rendered dashboard** using **Next.js App Router**.

This approach:
- Reduces client-side JavaScript
- Improves initial page load performance
- Enhances SEO
- Eliminates loading waterfalls common in CSR apps

---

## Project Overview

###  Server-First Architecture
- Data is fetched directly from **PostgreSQL** inside **Server Components**
- HTML is generated on the server and sent to the client instantly

###  Server Actions
- No traditional REST or API routes
- Forms submit directly to **Server Actions**
- Validation, database updates, and cache revalidation happen in one request

###  Data Management
- Real-time inventory tracking
- Inventory value calculations
- Direct image uploads to **Cloudinary**

---

##  Features

###  Security & Authentication
- **Clerk Authentication**
- Middleware-protected routes
- Admin-only access

###  Product Management (CRUD)
- Create products with validation
- Read paginated product lists
- Update product details and images
- Delete products with confirmation

###  Analytics
- Total inventory count
- Inventory value calculation
- Stock level visualization using **Recharts**
- Status badges: In Stock / Low Stock / Out of Stock

###  Cloud & Infrastructure
- **Neon PostgreSQL** (serverless database)
- **Cloudinary** for image storage
- **Vercel** for deployment

---

##  Tech Stack

| Category | Technology |
|--------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | PostgreSQL (Neon) |
| ORM | Prisma |
| Authentication | Clerk |
| Image Storage | Cloudinary |
| Charts | Recharts |
| Deployment | Vercel |

---

## Application Workflow

1. User requests dashboard
2. Clerk middleware validates session
3. Server fetches data via Prisma
4. Page renders on the server (SSR)
5. User submits form
6. Server Action processes mutation
7. Cache revalidation updates UI instantly

---

##  Required Environment Variables

Create a `.env` or `.env.local` file in the project root:

```env
DATABASE_URL=your_neon_postgresql_connection_string

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
