<div align="center">

# 🌟 Wonderkids

**A Next-Generation, 3D-Enhanced Interactive AI Web Experience**

[![React](https://img.shields.io/badge/React-19.0-blue.svg?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-Animation-88CE02.svg?style=for-the-badge&logo=greensock)](https://greensock.com/gsap/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC.svg?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

</div>

---

## ✨ Overview

Welcome to **Wonderkids**, an ultra-modern, agency-tier web application built to shatter the constraints of static web design. Leveraging the power of WebGL, advanced scroll physics, and Google's Gemini AI, Wonderkids provides a deeply immersive, sensory-rich digital environment.

This project is not just a website; it is an **interactive digital playground** featuring high-end visual design principles, Double-Bezel architecture, and buttery-smooth kinetic interactions.

## 🚀 Key Features

- **🌐 Interactive 3D Environments:** Powered by `three.js` and `@react-three/fiber`, featuring floating geometries, mouse-parallax, and physical shading.
- **🎬 Cinematic Scroll Sequences:** Utilizes `GSAP` and `ScrollTrigger` combined with `Lenis` smooth-scrolling for pinned, story-driven scroll animations.
- **🧠 AI Integration:** Deeply integrated with `@google/genai` to provide dynamic, intelligent interactions.
- **✨ Haptic Micro-Interactions:** Magnetic buttons, custom trailing cursors, and fluid physics powered by `framer-motion`.
- **💎 Luxury Aesthetic:** Implements the "Ethereal Soft Structuralism" design language with asymmetric bento grids and ultra-diffused ambient shadows.

## 🛠️ Technology Stack

### Frontend Architecture
- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS v4
- **3D Engine:** Three.js + React Three Fiber + Drei + Postprocessing
- **Animation:** GSAP (ScrollTrigger) + Framer Motion
- **Smooth Scroll:** Lenis Studio

### Backend & AI
- **Server:** Node.js + Express
- **AI Engine:** Google Gemini API (`@google/genai`)
- **Security:** Helmet + Express Rate Limit + CORS

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- A Gemini API Key from [Google AI Studio](https://aistudio.google.com/)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/wonderkids.git
   cd wonderkids-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env.local` file in the root directory and add your Gemini API Key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Run the Development Server**
   This project uses concurrently to spin up both the Vite frontend and the Express backend simultaneously:
   ```bash
   npm run dev
   ```
   *The application will be available at `http://localhost:5173`*

## 🏗️ Project Structure

```text
wonderkids/
├── src/                # Frontend React Application
│   ├── components/     # 3D Elements, Layouts, and UI Components
│   ├── index.css       # Global Physics and Tailwind Configuration
│   └── main.tsx        # React Root and Lenis Scroll Initialization
├── server/             # Express.js Backend
│   └── src/index.ts    # API Routes and Gemini Integration
├── .env.local          # Environment Variables (Ignored in Git)
└── package.json        # Project Dependencies and Scripts
```

## 🎨 Design Philosophy

Wonderkids strictly adheres to the principles of **High-End Visual Design**:
- **Zero Generic UI:** No standard Bootstrap grids or default Lucide icons.
- **Spatial Rhythm:** Generous padding and Z-axis layering to create depth.
- **The Doppelrand Effect:** Double-bezel hardware styling for cards and containers.
- **Kinetic Tension:** Elements anticipate user interaction rather than just reacting to it.

---

<div align="center">
  <i>"Children do not play to learn. They learn because they play." — A Cosmic Sandbox Experience</i>
</div>
