# ArenaMind AI – Smart Stadium Operating System

> **Hackathon Submission** · Challenge: **Smart Stadiums & Tournament Operations**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?logo=vercel)](https://arenamind-ai.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 🏆 Project Name

**ArenaMind AI** — an AI-powered Smart Stadium Operating System built for the FIFA World Cup 2026.

---

## 🎯 Chosen Challenge / Vertical

**Smart Stadiums & Tournament Operations**

---

## ❗ Problem Statement

Managing a 70,000-seat stadium during a World Cup match is operationally overwhelming:

- Crowd bottlenecks cause stampedes and injuries at entry/exit points.
- Staff and volunteers operate in silos with no real-time coordination.
- Fans with disabilities or language barriers struggle to navigate venues.
- Operations teams rely on outdated manual processes and slow incident response.
- No unified AI layer exists to synthesise crowd data, routing, and decisions in real time.

---

## 💡 Solution Overview

ArenaMind AI is a unified, AI-first stadium operating system that gives every stakeholder — operations managers, volunteers, security staff, and fans — a single intelligent platform powered by Google Gemini AI.

It combines real-time crowd intelligence, smart navigation, volunteer coordination, and an AI copilot into one glassmorphic, multilingual web application that runs in any browser.

---

## ✨ Features

| # | Feature | Description |
|---|---------|-------------|
| 1 | 🤖 **AI Stadium Copilot** | Conversational Gemini AI for operational decisions, incident response, and crowd management advice |
| 2 | 🗺 **Live Stadium Map** | Interactive 3D venue built with React Three Fiber showing real-time crowd overlays by zone |
| 3 | 👥 **Crowd Intelligence** | Live density heatmap, predictive analytics, and bottleneck early-warning alerts |
| 4 | 🧭 **Smart Navigation** | AI-optimised fastest, accessible, and emergency routing for fans inside the venue |
| 5 | 🤝 **Volunteer Hub** | Task assignment engine, AI-generated checklists, real-time status board |
| 6 | 📊 **AI Reports** | Auto-generated crowd summaries, incident logs, and performance insight exports |
| 7 | ♿ **Accessibility** | Voice assistant, high-contrast mode, large-text mode, wheelchair-specific routing |
| 8 | 🌍 **Multilingual** | English, Spanish, French, Arabic, Hindi — switchable at runtime |
| 9 | 🔐 **Auth & Profiles** | Email login, Google (mock), Phone OTP (mock), persistent session, editable profile |

---

## 🤖 AI Usage (Gemini / GenAI)

- **Google Gemini API** powers the AI Stadium Copilot — a context-aware conversational assistant that understands stadium state and provides actionable operational guidance.
- AI is used to **generate volunteer task checklists** dynamically based on match phase and crowd conditions.
- AI **summarises crowd analytics** into human-readable reports for operations managers.
- AI **recommends routing strategies** by analysing simulated crowd density data in each stadium zone.
- The app is built to swap in a live `GEMINI_API_KEY` for full AI responses; it includes graceful mock fallbacks so all features work without a key during evaluation.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router), React 19, TypeScript 5 |
| Styling | Tailwind CSS v4, custom glassmorphism design system |
| Animations | Framer Motion 12, GSAP 3 |
| 3D / WebGL | React Three Fiber, @react-three/drei, Three.js |
| State | Zustand 5 with `persist` middleware |
| Icons | Lucide React |
| Deployment | Vercel |

---

## 🏗 Project Architecture

```
arenamind-ai/
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── page.tsx                # Landing / marketing page
│   │   ├── layout.tsx              # Root layout + metadata
│   │   ├── login/                  # Auth – login page
│   │   ├── register/               # Auth – registration page
│   │   ├── role-selection/         # Role picker (Manager / Volunteer / Fan)
│   │   └── dashboard/
│   │       ├── layout.tsx          # Sidebar shell, nav, language switcher
│   │       ├── page.tsx            # Main dashboard overview
│   │       ├── ai-copilot/         # Gemini AI chat interface
│   │       ├── crowd-analytics/    # Heatmap + density analytics
│   │       ├── map/                # 3D stadium map (Three.js)
│   │       ├── smart-navigation/   # Route finder & guidance
│   │       ├── volunteer-hub/      # Task board & AI checklist
│   │       ├── reports/            # AI-generated report viewer
│   │       ├── accessibility/      # Accessibility controls
│   │       ├── profile/            # User profile editor
│   │       └── settings/           # App settings
│   ├── components/                 # Shared UI components
│   └── store/
│       ├── useAuthStore.ts         # Auth state (Zustand + persist)
│       └── useDemoStore.ts         # Demo/simulation state
├── public/                         # Static assets, robots.txt
├── .env.example                    # Environment variable template
└── next.config.ts                  # Next.js configuration
```

---

## ⚙️ How It Works

1. **Fan / Staff opens the app** → lands on the marketing page → registers and selects a role (Manager, Volunteer, or Fan).
2. **Role-based dashboard** renders the relevant modules and sidebar navigation.
3. **AI Copilot** accepts natural language questions (e.g., _"Gate 7 is overcrowded, what should I do?"_) and returns Gemini-generated operational guidance.
4. **Crowd Intelligence** polls simulated sensor data every few seconds, renders a live heatmap, and fires alerts when thresholds are breached.
5. **Smart Navigation** takes a destination input, evaluates simulated crowd density, and returns an optimal route with step-by-step directions.
6. **Volunteer Hub** lets managers publish tasks; the AI generates a checklist for each assignment automatically.
7. **Reports** module compiles the session's crowd, incident, and task data into a formatted AI summary.
8. All state is persisted in `localStorage` via Zustand, so sessions survive page reloads.

---

## 🚀 Installation & Run Steps

### Prerequisites

- Node.js ≥ 20
- npm ≥ 9

### 1 — Clone

```bash
git clone https://github.com/YOUR_USERNAME/arenamind-ai.git
cd arenamind-ai
```

### 2 — Install dependencies

```bash
npm install
```

### 3 — Configure environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
GEMINI_API_KEY=your_gemini_api_key_here   # optional – mock mode works without it
```

### 4 — Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5 — Build for production

```bash
npm run build
npm run start
```

---

## 🌐 Deployment Link

> **[https://arenamind-ai.vercel.app](https://arenamind-ai.vercel.app)**  
> Deployed on Vercel — zero-config, instant global CDN.

To deploy your own instance:
1. Push to a GitHub repository
2. Import at [vercel.com/new](https://vercel.com/new)
3. Add `NEXT_PUBLIC_APP_URL` and (optionally) `GEMINI_API_KEY` in Vercel environment settings
4. Click **Deploy** ✅

---

## 📌 Assumptions

- Stadium sensor data (crowd density, gate flow) is **simulated** client-side; in production this would connect to real IoT/CCTV data feeds via WebSocket.
- Google / Phone OAuth are **mocked** — a production build would integrate Firebase Auth or NextAuth.
- Gemini API calls are wrapped with a **mock fallback** so judges can evaluate all features without a live API key.
- The app targets Chrome / Firefox on desktop and mobile; 3D map requires WebGL support.
- A single deployment handles all three roles (Manager, Volunteer, Fan) via role-based UI switching.

---

## 🔮 Future Improvements

- **Live IoT integration** — connect real stadium sensor APIs (crowd counters, gate scanners, CCTV AI)
- **Push notifications** — real-time alerts to staff devices via Web Push / Firebase Cloud Messaging
- **Gemini multimodal** — analyse CCTV feeds directly using Gemini vision for automated incident detection
- **Digital twin** — photorealistic 3D stadium model with live zone occupancy overlays
- **Wearable integration** — staff smartwatch alerts for urgent incidents
- **Offline-first PWA** — service worker caching so the app works in low-connectivity stadium environments
- **Analytics dashboard** — post-match debrief with full crowd flow replay

---

## 📄 License

MIT © 2026 ArenaMind AI
