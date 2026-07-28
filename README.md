<p align="center">
  <img src="https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Built%20With-Next.js%20%2B%20TypeScript-000000?style=for-the-badge&logo=nextdotjs" />
  <img src="https://img.shields.io/badge/AI-Google%20GenKit-4285F4?style=for-the-badge&logo=google" />
  <img src="https://img.shields.io/badge/UI-Radix%20%2B%20Tailwind-06B6D4?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Deployed-Vercel-000000?style=for-the-badge&logo=vercel" />
  <img src="https://img.shields.io/badge/Vibe%20Coded-Yes%20🎵-ff69b4?style=for-the-badge" />
</p>

# ⚡ Tech Pulse

> **AI-powered tech news aggregation platform that keeps you on the pulse of innovation.**

Tech Pulse is a full-stack Next.js application that aggregates, curates, and delivers tech news with AI-powered intelligence. Built with Google's GenKit AI for smart article analysis, GSAP for cinema-grade animations, and a premium Radix UI component library — this isn't just a news reader, it's an experience.

🌐 **[Live on Vercel →](https://tech-pulse-kingping77777.vercel.app)**

---

## ✨ Features

### 📰 News & Content
- **AI-Curated Feed** — Intelligent article surfacing powered by Google GenKit AI
- **Article View** — Full article reading experience with rich formatting
- **Trending Topics** — Real-time tracking of what's hot in tech
- **Company Profiles** — Deep dives into tech companies and their latest moves

### 🧠 AI Intelligence
- **Smart Summaries** — AI-generated article summaries via Google GenKit
- **Intelligence Dashboard** — AI-powered analytics and insights page
- **Fetch Now** — On-demand content fetching with AI processing

### 👤 User Experience
- **Save & Like** — Bookmark and like articles for later
- **User Profiles** — Personalized content experience
- **Admin Panel** — Content management dashboard
- **Live Feed** — Real-time tech news updates

### 🎨 Design & Performance
- **GSAP Animations** — Buttery smooth, cinema-quality transitions
- **Radix UI Primitives** — Accessible, composable component library
- **Tailwind CSS** — Utility-first styling with custom design tokens
- **Responsive** — Flawless experience from mobile to desktop

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js (App Router) |
| **Language** | TypeScript |
| **AI Engine** | Google GenKit AI (`@genkit-ai/google-genai`) |
| **Animations** | GSAP (`@gsap/react`) |
| **UI Components** | Radix UI (Accordion, Dialog, Tabs, Dropdown, etc.) |
| **Styling** | Tailwind CSS |
| **Forms** | React Hook Form + Zod validation |
| **Charts** | Recharts |
| **Deployment** | Vercel |

---

## 📁 Project Structure

```
Tech-pulse/
├── src/
│   ├── app/
│   │   ├── (app)/                 # App route group
│   │   │   ├── admin/             # Admin dashboard
│   │   │   ├── article/           # Article detail pages
│   │   │   ├── company/           # Company profile pages
│   │   │   ├── fetch-now/         # On-demand content fetching
│   │   │   ├── intelligence/      # AI intelligence dashboard
│   │   │   ├── liked/             # Liked articles
│   │   │   ├── live/              # Live news feed
│   │   │   ├── profile/           # User profile
│   │   │   ├── saved/             # Saved/bookmarked articles
│   │   │   ├── trends/            # Trending topics
│   │   │   ├── HomePageClientContent.tsx
│   │   │   └── StitchPage.tsx
│   │   ├── api/                   # API routes
│   │   ├── globals.css            # Global styles
│   │   ├── layout.tsx             # Root layout
│   │   ├── page.tsx               # Landing page
│   │   └── template.tsx           # Page template
│   ├── ai/                        # GenKit AI flows
│   └── components/                # Shared UI components
├── docs/                          # Documentation
├── stitch_downloads/              # Design assets
├── next.config.ts                 # Next.js configuration
├── tailwind.config.ts             # Tailwind configuration
├── tsconfig.json                  # TypeScript configuration
├── vercel.json                    # Vercel deployment config
├── components.json                # shadcn/ui component config
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+
- **npm**
- A **Google GenKit API Key** for AI features

### Installation

```bash
# Clone the repository
git clone https://github.com/kingping77777/Tech-pulse-.git
cd Tech-pulse-

# Install dependencies
npm install

# Set up environment variables
# Create a .env.local file with your API keys:
# GOOGLE_GENAI_API_KEY=your_key_here

# Start the development server
npm run dev
```

The app will be running at `http://localhost:3000`.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js dev server on port 3000 |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run Next.js linter |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run genkit:dev` | Start GenKit AI development server |
| `npm run genkit:watch` | Start GenKit AI with watch mode |

---

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GOOGLE_GENAI_API_KEY` | Google GenKit AI API key | ✅ For AI features |

> 🔒 **API keys are not included in this repository.** Create a `.env.local` file and add your keys there. Never commit secrets to version control.

---

## 🌐 Deployment

Tech Pulse is deployed on **Vercel** with optimized configuration:

- **Region**: `iad1` (US East)
- **Framework**: Next.js (auto-detected)
- **API Caching**: Configured with `no-store, no-cache` headers for real-time data

---

## 🎯 Transparency Note

**This project was vibe-coded with heavy AI assistance.** Full transparency:

- ✅ The product vision is ambitious and well-executed — a genuine AI-powered news platform
- ✅ 10+ distinct pages/routes with real functionality (not placeholder screens)
- ✅ Google GenKit AI integration for intelligent content processing
- ✅ Production-grade UI with Radix primitives, GSAP animations, and Tailwind
- ✅ Deployed and live on Vercel
- ⚠️ AI coding tools were used extensively throughout development
- ⚠️ Build artifacts (`next_build_status.txt`, `ts_errors.txt`, etc.) are committed — a sign of the rapid development process
- ⚠️ Some TypeScript errors exist in the build logs (typical of fast-paced AI-assisted development)

This project showcases the power of modern AI-assisted development — a full-featured news platform with AI intelligence, built and shipped at speed. The code is real, the features work, and the deployment is live.

---

## 🤝 Contributing

Contributions are welcome! Areas of interest:

- Improving AI summarization quality
- Adding more news source integrations
- Building a recommendation engine
- Enhancing the mobile experience
- Cleaning up TypeScript type errors

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -m 'Add improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

---

## 📜 License

This project is open source. See the repository for license details.

---

<p align="center">
  <b>Built with ⚡ and an obsession for tech by <a href="https://github.com/kingping77777">@kingping77777</a></b>
</p>
