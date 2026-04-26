# Mohammed Humaid — Portfolio

Personal portfolio website for Mohammed Humaid, a WordPress Developer & CTO with 8+ years of experience building high-performance websites, API integrations, and scalable digital solutions.

**Live repo:** [github.com/mohamedhumaid/Portfolio](https://github.com/mohamedhumaid/Portfolio)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion 12 + GSAP 3 (ScrollTrigger, TextPlugin) |
| 3D / WebGL | React Three Fiber v8 + Three.js |
| Showcase player | Remotion Player (InfiniteBentoPan) |
| UI components | shadcn/ui + Aceternity UI |
| Smooth scroll | Lenis |
| Icons | Lucide React |
| Fonts | Inter + Space Grotesk (Google Fonts) |

---

## Sections

| Section | Description |
|---|---|
| **Hero** | Full-viewport split layout — GSAP word-stagger heading, typewriter role, interactive 3D globe with orbit rings + surface nodes, mouse-parallax stats card, animated background boxes grid |
| **About** | Professional photo (340×430), bio, animated GSAP stat counters, education entries |
| **Experience** | GSAP scroll-triggered vertical timeline with alternating role cards |
| **Skills** | Radial orbital timeline — 8 skill nodes orbit a cobalt-blue center orb; click any node to expand proficiency details and related skills |
| **Capabilities** | InfiniteBentoPan Remotion player showcasing tech metrics, HUD corner brackets, AI-workflow highlight cards |
| **Projects** | 3-column card grid with hover overlay and tech tag badges |
| **Contact** | Glass contact cards (Email, LinkedIn, WhatsApp) + animated message form |
| **Footer** | CinematicFooter — GSAP parallax giant text, scrolling marquee, magnetic pill buttons, back-to-top arrow |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install & Run

```bash
# Clone the repo
git clone https://github.com/mohamedhumaid/Portfolio.git
cd Portfolio

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx               # Root layout — fonts, metadata, dark mode
│   ├── page.tsx                 # Page composition — all sections + footer
│   └── globals.css              # CSS variables, glass/glow utilities, scrollbar
├── components/
│   ├── sections/
│   │   ├── Hero.tsx             # 3D globe, GSAP headings, mouse parallax, stats card
│   │   ├── About.tsx            # Photo, bio, GSAP counters, education
│   │   ├── Experience.tsx       # Vertical alternating timeline
│   │   ├── Skills.tsx           # Radial orbital timeline section wrapper
│   │   ├── Capabilities.tsx     # Remotion player + highlight cards
│   │   ├── Projects.tsx         # Project card grid
│   │   └── Contact.tsx          # Contact cards + form
│   ├── ui/
│   │   ├── NavBar.tsx           # Sticky nav, auto-hides at footer
│   │   ├── GlassCard.tsx        # Reusable glass card primitive
│   │   ├── HeroScene3D.tsx      # Three.js globe with Fibonacci-distributed nodes
│   │   ├── ParticleField.tsx    # Full-screen R3F particle background
│   │   ├── ScrollReveal.tsx     # Framer Motion whileInView wrapper
│   │   ├── background-boxes.tsx # Aceternity animated box grid (hero background)
│   │   ├── radial-orbital-timeline.tsx  # RAF-driven orbital skill animation
│   │   ├── infinite-bento-pan.tsx       # Remotion bento composition
│   │   └── button.tsx / badge.tsx       # shadcn/ui primitives
│   └── motion-footer.tsx        # CinematicFooter with GSAP parallax
├── data/
│   └── profile.ts               # Single source of truth for all content
└── lib/
    ├── gsap.ts                  # GSAP + ScrollTrigger + TextPlugin registration
    └── utils.ts                 # cn() class utility
public/
└── mohammed-humaid.jpg          # Profile photo
```

---

## Customisation

All personal content lives in **`src/data/profile.ts`**:

| Key | Controls |
|---|---|
| `name`, `title`, `bio`, `roles` | Hero heading, typewriter, About bio |
| `stats` | Animated counters (years, projects, companies) |
| `experience[]` | Timeline role cards |
| `skills` | Orbital timeline nodes (update `Skills.tsx` data too) |
| `projects[]` | Project cards |
| `education[]` | Education entries in About |
| `social` | LinkedIn, WhatsApp, and email links |

Replace **`public/mohammed-humaid.jpg`** with your own photo (ideally portrait, ≥ 400px wide).

---

## Design System

| Token | Value |
|---|---|
| Background | `#0a0a0f` |
| Accent — Cobalt Blue | `#0047AB` |
| Accent — Light Blue | `#4d8fe0` |
| Accent — Cyan | `#06b6d4` |
| Text Primary | `#e2e8f0` |
| Text Muted | `#64748b` |
| Glass Surface | `rgba(255, 255, 255, 0.04)` |
| Glass Border | `rgba(255, 255, 255, 0.08)` |
| Font — Headings | Space Grotesk |
| Font — Body | Inter |

---

## Key Design Decisions

- **No purple anywhere** — the entire palette uses cobalt blue (`#0047AB`) and cyan (`#06b6d4`).
- **Skills animation** — the orbital rotation runs via `requestAnimationFrame` writing directly to `node.style.transform`. Zero React re-renders during animation; only click events trigger state updates.
- **3D Globe** — built with Three.js + React Three Fiber using Fibonacci sphere distribution for 80 evenly-spaced surface nodes representing global web reach.
- **CinematicFooter** — uses `position: fixed` + `clip-path` curtain technique; the footer is always rendered below the main content and revealed as you scroll to the bottom.
- **NavBar** — auto-hides when the user reaches the footer zone (scroll position within 5% of page bottom), reappears on scroll up.

---

## Deployment

The simplest deployment path is [Vercel](https://vercel.com):

1. Push to GitHub (already done at `mohamedhumaid/Portfolio`)
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Next.js — click **Deploy**

No environment variables required.

---

## Contact

**Mohammed Humaid**
- LinkedIn: [linkedin.com/in/mohammed-humaid-217477130](https://www.linkedin.com/in/mohammed-humaid-217477130)
- WhatsApp: [+20 101 879 3733](https://wa.me/201018793733)
- Email: mshumaid5@gmail.com
