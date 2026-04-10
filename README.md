<div align="center">
  
  <h1>🚀 CornerStone</h1>
  <p><strong>A Production-Ready Laptop eCommerce Platform</strong></p>

  <p>
    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
    <img src="https://img.shields.io/badge/Turborepo-EF4444?style=for-the-badge&logo=turborepo&logoColor=white" alt="Turborepo" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  </p>

  > A modern full-stack eCommerce application built with scalability, performance, and real-world architecture in mind.

</div>

---

## 🌟 Overview

**CornerStone** is a full-stack B2C eCommerce platform designed to simulate a real-world online laptop store.  
It focuses on building a **secure, scalable, and production-ready system** rather than just a basic project.

This project demonstrates how modern applications are structured using **monorepo architecture, secure backend systems, and optimized frontend performance**.

---

## 🔥 Live Demo

- 🌐 **Live Site:** Coming Soon  
- 🚀 **Status:** Deployment in progress (Vercel)

---

## 📸 Preview

> **Note:** _Add your screenshots or demo GIFs here_
>
> `<img src="/path-to-image.png" width="800" alt="Home Page Screenshot">`

---

## ⚙️ Tech Stack

### 🧠 Frontend
* **Next.js** (App Router)
* **TypeScript**
* **Tailwind CSS**
* **ShadCN UI**

### 🔌 Backend
* **Supabase** (PostgreSQL)
* **Supabase Auth**
* **Row-Level Security (RLS)**

### ⚡ State Management
* **TanStack Query** (Server State)
* **Zustand** (Client State)

### 🏗 Architecture & DevOps
* **Monorepo** (Turborepo)
* **pnpm Workspaces**
* **Vercel** (Deployment)
* **GitHub Actions** (CI/CD - *in progress*)

---

## ✨ Features

### 🛍️ eCommerce Core
* Browse a wide catalog of laptop products.
* Detailed product specification pages.
* Seamless "Add to Cart" functionality.

### 🔐 Authentication & Security
* Secure login and signup flows.
* Protected routes for authenticated users.
* User-specific data access restricted using Postgres RLS.

### 🛒 Smart Cart System
* **Real-time updates:** Cart reflects changes instantly.
* **Atomic operations:** Prevents duplicate entries and race conditions using PostgreSQL RPC.
* **Data isolation:** User-specific cart sessions.

### ⚡ Performance & UX
* Optimized data fetching with intelligent caching.
* Minimal UI flickering on state changes.
* Context-aware redirects after login.

---

## 🧠 Key Highlights

* 💡 **Atomic Cart Logic:** Built using PostgreSQL RPC to completely eliminate race conditions.
* 🔒 **Row-Level Security:** Ensures absolute data isolation between users at the database level.
* ⚡ **Real-Time Sync:** Powered by the combination of Supabase and TanStack Query.
* 🧱 **Scalable Foundation:** Turborepo monorepo architecture sets the stage for future micro-frontends or admin apps.
* 🎯 **Best Practices:** Built strictly adhering to production-level standards.

---

## 🧩 Project Structure

```text
CornerStone/
│
├── apps/
│   └── web/            # Next.js frontend application
│
├── packages/
│   ├── ui/             # Shared UI components (ShadCN, etc.)
│   ├── types/          # Shared TypeScript types/interfaces
│   └── schemas/        # Zod validation schemas
│
├── supabase/           # Database schema, migrations & SQL functions
│
└── turbo.json          # Turborepo configuration
