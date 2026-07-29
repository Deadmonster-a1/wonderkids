<div align="center">

# 🌟 WonderKids Academy

**A Next-Generation, 3D-Enhanced Interactive Web Experience**

[![React](https://img.shields.io/badge/React-19.0-blue.svg?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare_Workers-F38020.svg?style=for-the-badge&logo=cloudflare&logoColor=white)](https://workers.cloudflare.com/)
[![Hono](https://img.shields.io/badge/Hono-E36002.svg?style=for-the-badge&logo=hono&logoColor=white)](https://hono.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748.svg?style=for-the-badge&logo=prisma&logoColor=white)](https://prisma.io/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC.svg?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

</div>

---

## ✨ Overview

Welcome to **WonderKids**, an ultra-modern, agency-tier web application built to shatter the constraints of static web design. Leveraging the power of WebGL, advanced scroll physics, and a hyper-fast edge backend, WonderKids provides a deeply immersive, sensory-rich digital environment for a preschool.

This project is not just a website; it is an **interactive digital playground** featuring high-end visual design principles, dynamic 3D elements, buttery-smooth kinetic interactions, and a fully featured admin dashboard.

## 🚀 Key Features

- **🌐 Interactive 3D Environments:** Powered by `three.js` and `@react-three/fiber`, featuring floating geometries, mouse-parallax, and physical shading.
- **🎬 Cinematic Scroll Sequences:** Utilizes `GSAP` and `ScrollTrigger` combined with `Lenis` smooth-scrolling for pinned, story-driven scroll animations.
- **⚡ Edge-Native Backend:** Powered by Cloudflare Workers and Hono for zero-cold-start, globally distributed API performance.
- **✨ Haptic Micro-Interactions:** Magnetic buttons, custom trailing cursors, and fluid physics powered by `framer-motion`.
- **🗄️ Full-Stack Admin Dashboard:** Complete CMS for managing admissions, teachers, galleries, fees, programs, and site settings.
- **🔔 Real-Time Notifications:** Live SSE (Server-Sent Events) notifications for new contact messages and admission inquiries straight to the admin dashboard.

## 🛠️ Technology Stack

### Frontend Architecture
- **Framework:** React 19 + Vite + TypeScript
- **Styling:** Tailwind CSS v4 + Lucide React
- **3D Engine:** Three.js + React Three Fiber + Drei
- **Animation:** GSAP + Framer Motion
- **Scroll Physics:** Lenis Studio
- **Forms:** React Hook Form + Zod

### Edge Backend Architecture
- **Serverless Framework:** Cloudflare Workers + Hono (`hono/streaming`, `hono/cors`)
- **Database ORM:** Prisma Edge Client (`@prisma/client/edge`)
- **Storage:** Cloudflare R2 (Object Storage)
- **Security:** JWT Authentication + Zod Validation

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- A [Cloudflare](https://dash.cloudflare.com/) Account (for deployment & R2)
- A PostgreSQL Database (e.g., Supabase, Neon)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Deadmonster-a1/wonderkids.git
   cd wonderkids
   ```

2. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   ```

### 🌍 Environment Configuration

**Frontend (`/.env`):**
```env
VITE_API_URL=http://localhost:8787/api
```

**Backend (`/server/.env`):**
```env
DATABASE_URL="postgres://user:pass@host/db"
JWT_SECRET="your_super_secret_key"
ADMIN_EMAIL="masteraccess72@gmail.com"
ADMIN_PASSWORD="admin_password"
```

### 🏃 Running Locally

To run the full stack locally, open two terminal windows:

**Terminal 1 (Backend - Wrangler):**
```bash
cd server
npm run dev
```

**Terminal 2 (Frontend - Vite):**
```bash
# In the project root
npm run dev
```
*The frontend will be available at `http://localhost:5173`*

## ☁️ Cloudflare Deployment

1. **Authenticate Wrangler**
   ```bash
   cd server
   npx wrangler login
   ```

2. **Create the R2 Bucket**
   ```bash
   npx wrangler r2 bucket create wonderkids-uploads
   ```

3. **Set Production Secrets**
   ```bash
   npx wrangler secret put DATABASE_URL
   npx wrangler secret put JWT_SECRET
   ```

4. **Deploy the Worker**
   ```bash
   npm run deploy
   ```

## 🏗️ Project Structure

```text
wonderkids/
├── src/                # Frontend React Application
│   ├── components/     # 3D Elements, Layouts, and UI Components
│   ├── pages/          # Public and Admin pages
│   └── index.css       # Global Physics and Tailwind Configuration
├── server/             # Cloudflare Worker Backend
│   ├── src/index.ts    # Hono Router Entry Point
│   ├── src/routes/     # API Route Definitions
│   ├── src/controllers/# Request Handlers
│   └── wrangler.toml   # Cloudflare Configuration
├── .env                # Frontend Environment Variables
└── package.json        # Project Dependencies
```

## 🎨 Design Philosophy

WonderKids strictly adheres to the principles of **High-End Visual Design**:
- **Zero Generic UI:** Soft, playful aesthetics designed specifically for early education.
- **Spatial Rhythm:** Generous padding and Z-axis layering to create depth.
- **The Doppelrand Effect:** Double-bezel hardware styling for cards and containers.
- **Kinetic Tension:** Elements anticipate user interaction rather than just reacting to it.

---

<div align="center">
  <i>"Children do not play to learn. They learn because they play." — A Cosmic Sandbox Experience</i>
</div>
