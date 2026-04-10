<div align="center">
  
  <h1>🚀 CornerStone</h1>
  <p><strong>A Production-Ready Laptop eCommerce Platform</strong></p>

  <p>
    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
    <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" />
    <img src="https://img.shields.io/badge/Turborepo-EF4444?style=for-the-badge&logo=turborepo&logoColor=white" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  </p>

  <p>
    A modern full-stack eCommerce application built with scalability, performance, and real-world architecture in mind.
  </p>

</div>

---

## 🌟 Overview

**CornerStone** is a full-stack B2C eCommerce platform designed to simulate a real-world online laptop store.  
It focuses on building a **secure, scalable, and production-ready system** rather than just a basic project.

This project demonstrates how modern applications are structured using:
- Monorepo architecture  
- Secure backend systems  
- Optimized frontend performance  

---

## 🔥 Live Demo

- 🌐 **Live Site:** Coming Soon  
- 🚀 **Status:** Deployment in progress (Vercel)

---

## 📸 Preview

> Add screenshots or GIFs here

```html
<img src="/preview.png" width="800" alt="Project Preview">
````

---

## ⚙️ Tech Stack

### 🧠 Frontend

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* ShadCN UI

### 🔌 Backend

* Supabase (PostgreSQL)
* Supabase Auth
* Row-Level Security (RLS)

### ⚡ State Management

* TanStack Query (Server State)
* Zustand (Client State)

### 🏗 Architecture & DevOps

* Monorepo (Turborepo)
* pnpm Workspaces
* Vercel (Deployment)
* GitHub Actions (CI/CD - in progress)

---

## ✨ Features

### 🛍️ eCommerce Core

* Browse laptop products
* Detailed product pages
* Add to cart functionality

### 🔐 Authentication & Security

* Secure login/signup
* Protected routes
* User-specific data using RLS

### 🛒 Smart Cart System

* Real-time updates
* Atomic operations using PostgreSQL RPC
* No duplicate entries or race conditions
* User-specific cart isolation

### ⚡ Performance & UX

* Optimized caching & data fetching
* Minimal UI flickering
* Context-aware login redirects

---

## 🧠 Key Highlights

* 💡 Atomic cart logic using PostgreSQL RPC
* 🔒 Strong Row-Level Security (RLS)
* ⚡ Real-time sync with Supabase + TanStack Query
* 🧱 Scalable monorepo architecture
* 🎯 Built with production-level best practices

---

## 🧩 Project Structure

```text
CornerStone/
│
├── apps/
│   └── web/            # Next.js frontend
│
├── packages/
│   ├── ui/             # Shared UI components
│   ├── types/          # TypeScript types
│   └── schemas/        # Zod validation schemas
│
├── supabase/           # DB schema & SQL functions
│
└── turbo.json          # Turborepo config
```

---

## 🛠️ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/jayanthanghjkl/CornerStone.git
cd CornerStone
```

### 2️⃣ Install Dependencies

```bash
pnpm install
```

### 3️⃣ Setup Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

### 4️⃣ Database Setup (Important)

Run this in Supabase SQL Editor:

```sql
CREATE OR REPLACE FUNCTION add_to_cart(p_product_id UUID, p_quantity INT)
RETURNS void AS $$
BEGIN
  INSERT INTO public.cart_items (user_id, product_id, quantity)
  VALUES (auth.uid(), p_product_id, p_quantity)
  ON CONFLICT (user_id, product_id)
  DO UPDATE SET
    quantity = cart_items.quantity + EXCLUDED.quantity,
    created_at = now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

### 5️⃣ Run Development Server

```bash
pnpm dev
```

---

## ⚡ Challenges Solved

| Challenge               | Solution               |
| ----------------------- | ---------------------- |
| Race conditions in cart | Atomic RPC functions   |
| Duplicate cart items    | PostgreSQL ON CONFLICT |
| Auth redirect issues    | Context-aware routing  |
| Data leakage            | Strict RLS policies    |

---

## 📈 Roadmap

* [ ] UI/UX Enhancements
* [ ] Wishlist Feature
* [ ] Payment Integration (Stripe/Razorpay)
* [ ] Order Management System
* [ ] Admin Dashboard
* [ ] Full CI/CD Pipeline

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -m "Add feature"`)
4. Push (`git push origin feature/new-feature`)
5. Open a Pull Request

---

## 📬 Connect With Me

* GitHub: [https://github.com/jayanthanghjkl](https://github.com/jayanthanghjkl)
* LinkedIn: (Add your link)

---

<div align="center">

### 💡 Final Note

This project represents my journey from **learning development → building production-ready systems**.

⭐ Star the repo • 🍴 Fork it • 📢 Share it

**Let’s build something amazing 🚀**

</div>
