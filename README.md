# StackIt

> Personal business assistant for small business owners.
> Last updated: March 2026

---

## Running the app locally

**One-time setup**

1. Install dependencies:
   ```bash
   npm install
   ```
2. Generate the Prisma client (required for types; the app can run without a real database using in-memory demo data):
   ```bash
   npm run prisma:generate
   ```
3. (Optional) Copy `.env.example` to `.env` and add any keys you need. For local development with the current prototype you can leave it minimal—Clerk runs in keyless mode and the app uses in-memory data when the database is not configured.

**Run the app**

- **Web app only** (typical):

  ```bash
  npm run dev
  ```

  Opens at **http://localhost:3000** with hot reload.

- **Web app + background worker** (Fastify + BullMQ; requires Redis):
  ```bash
  npm run dev:all
  ```
  Runs both the Next.js dev server and the worker. Set `REDIS_URL` in `.env` or use default `127.0.0.1:6379`.

**Other commands**

| Command                  | Purpose                                           |
| ------------------------ | ------------------------------------------------- |
| `npm run build`          | Production build                                  |
| `npm run start`          | Run production server (`next start`)              |
| `npm run lint`           | Run ESLint                                        |
| `npm run prisma:migrate` | Run database migrations (requires `DATABASE_URL`) |

---

## Phase 1 — Landing Page (Current Focus)

**Goal:** Build a fully shippable, conversion-optimised public marketing website before any app or service code.

The website must stand on its own — it should be investor-ready, customer-ready, and deployable to Vercel as a standalone site.

No app logic, no auth, no dashboard code in this phase.

---

### Why Phase 1 First

- Validates positioning and messaging before a line of app code is written
- Gives us a URL to share with early interest leads immediately
- Forces clarity on what we're selling before we build it
- SEO and waitlist collection starts now, not after the app ships

---

### Phase 1 Scope

**Tech stack:**

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Framer Motion (scroll animations)
- anime.js v4 (continuous animations, loops, timelines)
- Lucide React (icons)
- Fonts: Instrument Serif (hero display) + Geist (headings + body) + Geist Mono (labels)

**Design direction — Sketch.com inspired light theme:**

- Warm off-white base (`#FAFAF8`) — not pure white
- Single accent colour: Indigo (`#5B57E8`) used sparingly
- All-in-one scroll layout
- Sticky nav with blur-on-scroll
- Soft diffused shadows — no harsh drop shadows
- Rounded corners (16px) everywhere
- Alternating section backgrounds for rhythm (no hard dividers)
- Mobile responsive

**Colour palette:**

```
--bg-base:      #FAFAF8   warm off-white — main page background
--bg-surface:   #FFFFFF   pure white — cards
--bg-elevated:  #F4F4F1   warm grey — alt sections
--bg-subtle:    #F0EFEB   subtle tint — hover states
--border:       #E8E8E3   soft warm grey border
--accent:       #5B57E8   indigo — CTAs, links, active
--accent-hover: #4A46D4   darker on hover
--accent-soft:  #EEEDFD   light indigo tint — badges
--text-primary: #1A1A1A   near black — headlines
--text-secondary:#6B6B6B  medium grey — body
--text-tertiary: #A8A8A8  light grey — labels, metadata
--shadow-sm:    0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)
--shadow-md:    0 4px 16px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)
--shadow-lg:    0 8px 32px rgba(0,0,0,0.10), 0 4px 8px rgba(0,0,0,0.04)
--shadow-xl:    0 20px 60px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.06)
```

**Typography:**

```
Display (hero only): Instrument Serif — editorial, elegant
                     Mix normal + italic for headline emphasis word
Headings + Body:     Geist — clean, modern, highly legible
Mono:                Geist Mono — timestamps, labels only
Never use:           Inter, Roboto, Arial, system-ui, Sora, DM Sans
```

**Hero headline technique:**

```
Line 1: "Your Business."  → Instrument Serif, 72px, #1A1A1A, normal
Line 2: "One Screen."     → Instrument Serif, 72px, italic, #5B57E8
```

**Card component:**

```css
background: #FFFFFF;
border: 1px solid #E8E8E3;
border-radius: 16px;
box-shadow: 0 4px 16px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04);
transition: all 200ms ease;

hover:
  border-color: #D4D4CC;
  box-shadow: 0 8px 32px rgba(0,0,0,0.10);
  transform: translateY(-2px);
```

**Animation libraries:**

- Framer Motion — scroll reveals, page transitions, entrance animations
- anime.js v4 — continuous loops (hero float), timeline sequences, count-up numbers
- Import: `import anime from 'animejs'` (v4 API — do not use v3 syntax)

**Page sections (in order):**

1. Nav Bar — sticky, blur-on-scroll, logo + links + CTA
2. Hero — mixed typography headline, CTAs, floating dashboard mockup
3. Social Proof Bar — "trusted by NZ small businesses"
4. Problem Section — 3 pain point cards
5. Features Section — bento grid layout, 6 tiles
6. How It Works — 3-step flow with connector line
7. Integrations — Shopify, Square, open banking logo grid
8. Pricing — 3 tiers (Starter $99 / Growth $149 / Pro $199)
9. Testimonials — 3 staggered cards
10. FAQ — accordion with Framer Motion AnimatePresence
11. Final CTA — full-width panel + email capture
12. Footer — links, "Made in NZ 🇳🇿", copyright

---

### Phase 1 Definition of Done

- [ ] All 12 sections built and visually complete
- [ ] Sticky nav with blur-on-scroll working
- [ ] Fully responsive on mobile
- [ ] Pricing section with 3 tiers, middle card highlighted
- [ ] FAQ accordion functional with smooth animation
- [ ] Consistent light theme throughout — warm, clean, premium
- [ ] No placeholder lorem ipsum — real StackIt copy throughout
- [ ] Early access CTA captures email (static form, no backend needed yet)
- [ ] Deployable to Vercel as a standalone site
- [ ] Feels like sketch.com quality — not a generic SaaS template

---

### Phase 1 Build Order

```
Day 1:   Nav + Hero (typography, mockup, animations)
Day 2:   Social Proof + Problem + Features (bento grid)
Day 3:   How It Works + Integrations + Pricing
Day 4:   Testimonials + FAQ + Final CTA + Footer
Day 5:   Polish — animations, mobile, copy review
Day 6:   Deploy to Vercel — share URL
```

---

### What Phase 1 Is NOT

- No app code, dashboard code, or auth
- No Shopify/Akahu integration code
- No backend, no database
- No real email backend (mailto or static form is fine for now)
- No dark theme anywhere on the landing page

---

### File Structure

```
app/
  page.tsx                   ← main landing page (root route)
  layout.tsx                 ← Geist + Instrument Serif fonts

components/
  landing/
    Navbar.tsx
    Hero.tsx
    SocialProof.tsx
    Problem.tsx
    Features.tsx
    HowItWorks.tsx
    Integrations.tsx
    Pricing.tsx
    Testimonials.tsx
    FAQ.tsx
    FinalCTA.tsx
    Footer.tsx
  ui/
    LightCard.tsx             ← reusable card component

lib/
  fonts.ts
```

---

## Phase 2 — MVP App

> Full product spec. Build begins after Phase 1 landing page is live and deployed.

---

## 0. What We Are Building

A **personal business assistant** for small business owners. Not a BI tool. Not a reporting platform. Not a dashboard for data teams.

A lightweight, modular screen that pulls from their existing tools — Shopify, their bank account, Stripe — and gives them **30 seconds of clarity every morning**, set up for them in a single onboarding call.

### The One Liner

> "Every small business owner deserves a personal assistant that knows their numbers."

### The Aha Moment (north star for every product decision)

> "By the end of the onboarding call, the owner can answer: how much came in, what sold, and whether cash is improving — without logging into 3 apps."

### What This Is Not

Do not build toward any of these. Do not let descriptions drift toward these:

- A BI tool
- A reporting platform
- An analyst tool
- "Power BI for small business"
- An accounting tool
- A mini-ERP

---

## 0.2 Product Philosophy — Adaptability & Creative Freedom

This is the most important product principle after data trust.

Starting a business is hard. Complex. Overwhelming. The last thing
a new or growing business owner needs is software that adds to that
complexity — software that forces them into someone else's idea of
how a business should be run.

Every business owner runs their business differently.
A matcha brand cares about daily orders and top products.
A tradie cares about outstanding invoices and cash in bank.
A salon cares about booking revenue and returning clients.
A freelancer cares about monthly income vs expenses.

None of them should be forced into the same dashboard.

---

### The Core Principle

> The software adapts to the business. The business never adapts to the software.

This means the dashboard is not a fixed report. It is a canvas.
The owner decides what they see, how they see it, and what matters
to them. We provide the building blocks. They build their view.

---

### What Full Customisation Means in Practice

**1. Any block, any position, any size**

Owners are not locked into a preset layout after onboarding.
The preset layout is a helpful starting point — not a template
they are stuck with. From day one they can:

- Drag any block anywhere on the canvas
- Resize any block to be as prominent or subtle as they want
- Remove any block they do not care about
- Add any block from the full library at any time
- Rename any block with their own label ("My Revenue" instead of "Revenue This Month")

**2. Custom block labels**

Every block label is editable. Double-click to rename.
A cafe owner might rename "Revenue This Month" to "Takings This Month."
A tradie might rename "Cash in Bank" to "Business Account."
The product speaks their language, not ours.

**3. Multiple dashboards**

Owners can create more than one dashboard:

- "Daily Check" dashboard (5 blocks, quick morning view)
- "Monthly Review" dashboard (deeper metrics, bigger picture)
- "Cash Focus" dashboard (all cash/invoice blocks)

**4. Block library — open and growing**

The block library is not locked to 8 metrics. It is a growing library organised by category:

Revenue & Sales: Revenue Today, Revenue This Month, Sales vs Last Month, Orders Today, Average Order Value, Refunds This Month

Products: Top Selling Product, Top 5 Products, Units Sold Today, Low Stock Warning

Customers: New vs Returning (%), New Customers This Month, Customer Lifetime Value, Repeat Purchase Rate

Cash & Finance: Cash in Bank, Payments Received This Week, Outstanding Invoices, Overdue Invoices, Monthly Income vs Expenses, Cash Runway (days)

Custom: Custom Metric (manual input), Custom Goal (target + progress), Notes Block (freeform text)

**5. Custom Metric block — the wildcard**

An owner can create a Custom Metric block where they:

- Name it anything ("Walk-ins Today", "Instagram Followers", "Staff Hours")
- Update it manually OR connect it to a data source later
- Set a target value and track progress

**6. Custom Goal blocks**

Owners can set goals and track them visually:

- "Revenue goal: $20,000 this month" — progress bar filling up
- "New customers goal: 50 this month" — % complete
- "Cash target: $15,000 by end of quarter" — trend line toward target

**7. Block appearance customisation**

Each block can be customised visually:

- Accent colour (choose from palette)
- Display format (currency, number, percentage, days)
- Time range (today / this week / this month / last 30 days / custom)
- Show/hide trend indicator
- Show/hide trust bar

---

### What This Is NOT (Customisation Edition)

- No configuration screens with 20 settings
- No JSON editors or code inputs
- No setup wizards for individual blocks
- No required fields — every customisation is optional
- No customisation that takes more than 3 clicks to complete

Every customisation option must pass this test:
"Could a cafe owner figure this out without reading any instructions?"
If the answer is no — simplify it or remove it.

---

### The Emotional Standard

When a business owner looks at their dashboard they should feel:

- **Ownership** — "This is MY dashboard. It shows MY business."
- **Clarity** — "I know exactly what is happening right now."
- **Control** — "I can change anything I do not like."
- **Pride** — "I built this view. It works for how I run things."

---

### The Block Registry — Architecture Requirement

```typescript
// Every block type is registered here — never hardcoded elsewhere
const BLOCK_REGISTRY: BlockDefinition[] = [
  {
    type: "revenue_today",
    label: "Revenue Today",
    category: "Revenue & Sales",
    requiredIntegrations: ["shopify"],
    defaultSize: { w: 4, h: 2 },
    configOptions: ["timeRange", "displayFormat", "accentColour"],
    compute: computeRevenueToday,
  },
  {
    type: "custom_metric",
    label: "Custom Metric",
    category: "Custom",
    requiredIntegrations: [],
    defaultSize: { w: 3, h: 2 },
    configOptions: ["label", "value", "target", "displayFormat"],
    compute: null,
  },
];
```

---

### Phased Customisation Rollout

**v0.1 — Foundation**

- Drag, resize, remove blocks
- Add blocks from library (8 core blocks)
- Preset starter layout
- Block registry pattern in place

**v0.2 — Personalisation**

- Custom block labels (double-click to rename)
- Multiple dashboards
- Custom Metric block (manual input)
- Block time range selector

**v0.3 — Goals & Expression**

- Custom Goal blocks with progress tracking
- Block accent colour picker
- Expanded block library (20+ blocks)
- Show/hide trust bar per block

**Future**

- Custom data sources via Zapier
- Shared dashboards for team members
- Dashboard templates by business type
- Mobile block reordering

---

## 0.5 UI/UX & Aesthetic Standard — Non-Negotiable

UI and UX is a primary selling point of this product. The interface is part of the moat. Small business owners choose tools they enjoy opening.

**The standard: every screen must feel like it was designed by a world-class product studio, not assembled from a component library.**

---

### Visual Identity — App Direction

The app aesthetic is **refined dark-mode first, with warm accents**.

> Note: The landing page (Phase 1) uses a light theme. The app (Phase 2) uses dark theme. These are intentionally separate.

Think: calm, confident, premium but approachable. Not corporate. Not startup-generic. The kind of interface a business owner opens every morning and feels good about.

**App Colour Palette:**

```
Background:    #0A0A0F  (near black, slightly warm)
Surface:       #111118  (card/block backgrounds)
Surface raised:#1A1A24  (elevated elements, hover states)
Border:        #2A2A3A  (subtle borders)
Primary:       #6366F1  (indigo — action, CTAs, active states)
Primary soft:  #6366F120 (indigo with opacity — subtle highlights)
Success:       #22C55E  (green — positive metrics, ok status)
Warning:       #F59E0B  (amber — stale, watch out)
Danger:        #EF4444  (red — error, critical alerts)
Text primary:  #F8F8FF  (near white)
Text secondary:#94A3B8  (muted — labels, metadata)
Text tertiary: #475569  (very muted — timestamps, helper text)
```

**App Typography:**

```
Display font:  "Sora" (Google Fonts) — headings, metric values, large numbers
Body font:     "DM Sans" (Google Fonts) — all body text, labels, UI copy
Mono font:     "JetBrains Mono" — timestamps, sync logs, technical metadata only
Never use:     Inter, Roboto, Arial, system-ui as primary fonts
```

**Motion & Animation:**

```
Page transitions:    150ms ease-out fade
Block drag:          smooth, with subtle shadow lift on pickup
Number updates:      count-up animation when metric value changes
Block load:          skeleton shimmer then fade in real data
Toast notifications: slide in from bottom-right, auto-dismiss 4s
Hover states:        100ms ease transitions on all interactive elements
Onboarding tooltips: gentle pulse on highlighted element
Status dot:          subtle breathing pulse animation on stale state
```

---

### Layout Principles

**Generous whitespace.** Blocks breathe. Nothing feels cramped.
Padding inside blocks: minimum 24px. Gap between blocks: 12px.

**Information hierarchy is sacred.** On every block, the eye should land in this order:

1. The number (large, bold, primary colour or white)
2. The label (smaller, muted)
3. The trend (colour-coded arrow + percentage)
4. The trust bar (smallest, most muted — present but not distracting)

**Consistent radius.** All blocks, cards, buttons, inputs use `border-radius: 12px`.

**Depth through layering.** Background (#0A0A0F) → surface (#111118) → raised (#1A1A24). Three levels only.

---

### Block Design Standard

```
┌─────────────────────────────────────┐
│  Revenue This Month          ● green │  ← label left, status dot right
│                                      │
│  $14,250                             │  ← value: Sora, 36px, white
│  ↑ 12% vs last month                 │  ← trend: green/red, 14px
│                                      │
│  ──────────────────────────────────  │  ← subtle divider
│  Synced 2m ago · Shopify  ⟳          │  ← trust bar: mono, 11px, muted
└─────────────────────────────────────┘

Hover state:
- Border brightens from #2A2A3A to #6366F140
- Subtle indigo glow: box-shadow 0 0 0 1px #6366F140
- Remove button appears top-right with fade-in

Loading state:
- Skeleton shimmer animation in surface colour
- Pulse at 1.5s interval
- Never show empty blocks — always shimmer or real data

Error state:
- Red border: #EF444440
- Status dot red with pulse
- Error message in trust bar: "Sync failed · tap to retry"
```

---

### Dashboard Canvas Standard

```
Canvas background: subtle dot grid pattern (#1A1A24, 24px spacing)

Empty state:
  → centre-aligned geometric illustration, on-brand
  → "Drag a block from the sidebar to get started"
  → subtle animated arrow pointing to sidebar

Drag interaction:
  → block lifts: box-shadow 0 20px 60px #00000080
  → block opacity 0.9 while dragging
  → drop zone highlights indigo on hover
  → satisfying snap animation on drop (spring physics feel)

Sidebar panel:
  → width: 240px
  → slides in from right on toggle
  → block cards: icon + metric name + source badge
  → greyed out + lock icon if integration not connected
  → tooltip on hover: "Connect Shopify to unlock this block"
```

---

### Onboarding UI Standard

```
Layout: centred card on dark background
Card width: 480px max
Progress: minimal dot indicators at top (not a progress bar)
Transitions: slide left/right between steps (200ms ease)

Each step:
  → one large headline (Sora, 28px)
  → one supporting sentence (DM Sans, 16px, muted)
  → one primary action (full-width indigo button)
  → optional secondary action (text link, muted)

Connection step:
  → each integration shown as a large card with logo
  → status: idle → loading spinner → connected (green checkmark)
  → success: card border turns green, checkmark animates in

Tutorial tooltips:
  → dark tooltip with indigo accent border
  → spotlight effect on highlighted element
  → backdrop: 40% dark overlay on rest of screen
  → "skip tutorial" always visible, never hidden
```

---

### Morning Digest Email Standard

```
Max width: 600px
Background: #0A0A0F (dark email — stands out in inbox)
Font: -apple-system, BlinkMacSystemFont, Segoe UI

Structure:
  → subtle wordmark at top
  → warm personalised greeting (human tone, not system tone)
  → 4-5 key stats in clean grid (icon + value + label)
  → alerts section only if alerts exist (amber/red accent)
  → single CTA button: "Open dashboard" (indigo, pill shape)
  → minimal footer (unsubscribe, settings link)

Tone: like a message from a smart friend, not a system notification.
```

---

### Responsive Design Standard

```
Desktop first (primary use case — morning check)
  → full drag-and-drop canvas with sidebar

Tablet (secondary)
  → sidebar collapses to icon rail
  → blocks reflow to 2-column grid
  → drag-and-drop still functional

Mobile (digest + quick check only)
  → single column block list (no drag-and-drop on mobile v0.1)
  → blocks stacked vertically, full width
  → bottom nav: Dashboard | Alerts | Settings
```

---

### Component Quality Bar

```
□ Has hover state
□ Has focus state (keyboard accessible)
□ Has loading state
□ Has error state
□ Has empty state
□ Transitions are smooth — no jarring snaps
□ Works on dark background without looking washed out
□ Typography hierarchy is clear at a glance
□ Touch targets minimum 44px on mobile
□ No layout shift when data loads in
```

---

### Explicitly Banned Patterns

```
❌ Default shadcn/ui components with zero customisation
❌ White backgrounds anywhere in the main app
❌ Generic purple gradient hero sections
❌ Tables with visible borders for metric display
❌ Inter, Roboto, Arial, system-ui as primary fonts
❌ Flat colourless buttons with no depth
❌ No hover states on interactive elements
❌ Skeleton loaders that look different from real content shape
❌ Inconsistent border radius across components
❌ Pure white (#FFFFFF) text on near-black — use #F8F8FF
❌ Alerts that look like browser alert() dialogs
❌ Generic pie charts as the default metric visualisation
❌ Any screen with no clear visual hierarchy
❌ Any screen that looks like it could belong to any other SaaS product
```

---

### The UI/UX Principle to Pin on the Wall

> **The dashboard should feel like something a business owner is proud to open in front of someone else.**

If it looks like a spreadsheet — we have failed.
If it looks like enterprise SaaS — we have failed.
If it looks like it was built with care, specifically for them — we have succeeded.

---

## 1. Tech Stack — Use Exactly This

### Frontend — Core (Fixed)

- **Next.js 14+ with TypeScript** — App Router
- **Tailwind CSS** — all styling, no other CSS frameworks
- **shadcn/ui** — base UI components (always customise, never use defaults as-is)
- **TanStack Query** — all data fetching and caching
- **react-grid-layout** — drag and drop dashboard canvas
- **React Hook Form + Zod** — all forms and validation
- **Recharts** — metric visualisations inside blocks

### Frontend — UI/UX & Animation (Flexible)

The following layer is **not fixed**. When building any screen, page, or component, pick the best available tool for the visual and interaction goal. Do not default to the simplest option — default to the best option.

Preferred starting points (use, swap, or combine as needed):

- **Framer Motion** — page transitions, block animations, scroll reveals, spring physics
- **anime.js v4** — continuous loops, timeline sequences, count-up numbers (`import anime from 'animejs'`)
- **GSAP** — complex timeline animations, scroll-triggered sequences
- **Motion One** — lightweight CSS-based animations for micro-interactions
- **Lottie (lottie-react)** — icon animations, loading states
- **Three.js / React Three Fiber** — 3D elements, hero backgrounds
- **Tailwind CSS animations** — simple hover states, fade-ins, utility-first transitions

**Fonts:** Always use Google Fonts or a premium font that fits the aesthetic. Landing page uses Instrument Serif + Geist. App uses Sora + DM Sans.

**Colour:** App palette (section 0.5) is fixed for the dashboard. Landing page uses the light palette defined in Phase 1.

**Rule:** Before picking any UI/animation library, ask — _does this produce something a world-class product studio would ship?_ If yes, use it. If it produces generic output, find something better.

### Backend

- **Next.js API routes** — simple CRUD endpoints
- **Fastify + TypeScript** — dedicated backend for sync, webhooks, jobs
- **Prisma ORM** — all database access
- **BullMQ** — background job queue
- **Pino** — structured logging (log by orgId, integrationId, jobId)

### Database & Infrastructure

- **PostgreSQL via Neon** — primary database
- **Redis via Upstash** — BullMQ queues and short-lived cache
- **Vercel** — Next.js frontend deployment
- **Railway** — Fastify backend + BullMQ workers

### Auth & External Services

- **Clerk** — authentication and session management
- **Sentry** — error tracking (required from day one)
- **PostHog** — product analytics (track logins, refresh clicks, block usage)
- **Resend** — morning digest emails
- **Akahu** — NZ open banking / bank feed integration
- **Shopify Admin API** — direct integration, no middleware abstraction

### Important Decisions

- Never use middleware (Apideck/Merge) for Shopify — build direct for control and trust
- Never compute metrics live from external APIs in the request path — always serve from MetricSnapshot table
- Never use GraphQL — REST only for v0.1
- Never use WebSockets — use 60-second polling from frontend + manual refresh button
- TypeScript strict mode throughout
- UI/UX library choices are the engineer's call per screen — optimise for quality, not familiarity

---

## 2. Database Schema

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String      @id @default(cuid())
  clerkId       String      @unique
  email         String      @unique
  firstName     String?
  createdAt     DateTime    @default(now())
  organizations OrgMember[]
}

model Organization {
  id              String           @id @default(cuid())
  name            String
  digestTime      String           @default("07:00")
  timezone        String           @default("Pacific/Auckland")
  createdAt       DateTime         @default(now())
  members         OrgMember[]
  integrations    Integration[]
  dashboards      Dashboard[]
  metricSnapshots MetricSnapshot[]
  syncJobLogs     SyncJobLog[]
  alerts          Alert[]
  digestLogs      DigestLog[]
}

model OrgMember {
  id             String       @id @default(cuid())
  userId         String
  organizationId String
  role           String       @default("owner")
  user           User         @relation(fields: [userId], references: [id])
  organization   Organization @relation(fields: [organizationId], references: [id])

  @@unique([userId, organizationId])
}

model Integration {
  id             String       @id @default(cuid())
  organizationId String
  provider       String       // "shopify" | "akahu" | "stripe"
  accessToken    String       // encrypted at rest — never log this
  refreshToken   String?      // encrypted at rest — never log this
  shopDomain     String?
  status         String       @default("active") // active | error | disconnected
  connectedAt    DateTime     @default(now())
  lastSyncedAt   DateTime?
  organization   Organization @relation(fields: [organizationId], references: [id])
  syncJobLogs    SyncJobLog[]
}

model Dashboard {
  id             String       @id @default(cuid())
  organizationId String
  name           String       @default("My Dashboard")
  layout         Json
  createdAt      DateTime     @default(now())
  updatedAt      DateTime     @updatedAt
  organization   Organization @relation(fields: [organizationId], references: [id])
  blocks         Block[]
}

model Block {
  id          String    @id @default(cuid())
  dashboardId String
  metricType  String
  label       String
  position    Json      // { x, y, w, h, i }
  visible     Boolean   @default(true)
  config      Json?
  dashboard   Dashboard @relation(fields: [dashboardId], references: [id])
}

model MetricSnapshot {
  id                String       @id @default(cuid())
  organizationId    String
  metricType        String
  value             Float
  currency          String       @default("NZD")
  timeRange         String       // "today" | "this_month" | "last_month" | "this_week"
  calculatedAt      DateTime     @default(now())
  lastSyncedAt      DateTime
  sourceSystems     String[]
  status            String       @default("ok") // ok | stale | partial | error
  definitionVersion String       @default("1.0")
  metadata          Json?
  organization      Organization @relation(fields: [organizationId], references: [id])

  @@index([organizationId, metricType])
}

model SyncJobLog {
  id             String       @id @default(cuid())
  organizationId String
  integrationId  String
  jobType        String
  status         String       // pending | running | success | failed
  recordCount    Int?
  errorMessage   String?
  startedAt      DateTime     @default(now())
  completedAt    DateTime?
  organization   Organization @relation(fields: [organizationId], references: [id])
  integration    Integration  @relation(fields: [integrationId], references: [id])
}

model RawOrder {
  id               String   @id @default(cuid())
  organizationId   String
  shopifyOrderId   String
  totalPrice       Float
  currency         String
  status           String
  customerId       String?
  lineItems        Json
  shopifyCreatedAt DateTime
  syncedAt         DateTime @default(now())

  @@unique([organizationId, shopifyOrderId])
  @@index([organizationId, shopifyCreatedAt])
}

model RawCustomer {
  id                String   @id @default(cuid())
  organizationId    String
  shopifyCustomerId String
  ordersCount       Int
  totalSpent        Float
  shopifyCreatedAt  DateTime
  syncedAt          DateTime @default(now())

  @@unique([organizationId, shopifyCustomerId])
}

model RawTransaction {
  id                 String   @id @default(cuid())
  organizationId     String
  akahuTransactionId String
  amount             Float
  direction          String   // "credit" | "debit"
  description        String
  date               DateTime
  accountId          String
  accountName        String?
  syncedAt           DateTime @default(now())

  @@unique([organizationId, akahuTransactionId])
  @@index([organizationId, date])
}

model Alert {
  id             String       @id @default(cuid())
  organizationId String
  type           String       // cash_low | invoice_overdue | revenue_drop | stock_low
  message        String
  severity       String       // info | warning | critical
  read           Boolean      @default(false)
  createdAt      DateTime     @default(now())
  organization   Organization @relation(fields: [organizationId], references: [id])
}

model DigestLog {
  id             String       @id @default(cuid())
  organizationId String
  sentAt         DateTime     @default(now())
  content        String
  opened         Boolean      @default(false)
  organization   Organization @relation(fields: [organizationId], references: [id])
}
```

---

## 3. API Routes

```
// Auth
POST   /api/auth/webhook                     Clerk webhook — create User + Org on signup

// Organizations
GET    /api/organizations/:id                get org details + digest settings
PATCH  /api/organizations/:id                update org name, digest time, timezone

// Integrations
GET    /api/integrations                     list all integrations for org + status
POST   /api/integrations/shopify/connect     initiate Shopify OAuth flow
GET    /api/integrations/shopify/callback    Shopify OAuth callback — save token
POST   /api/integrations/akahu/connect       initiate Akahu OAuth flow
GET    /api/integrations/akahu/callback      Akahu OAuth callback — save token
DELETE /api/integrations/:id                 disconnect integration
GET    /api/integrations/:id/status          connection health check

// Sync
POST   /api/sync/:integrationId/run          manually trigger full sync for integration

// Dashboards
GET    /api/dashboards/:id                   get dashboard with blocks + layout
POST   /api/dashboards/:id/layout            save layout after drag/drop — fires on dragStop
POST   /api/dashboards/:id/blocks            add a block to dashboard
DELETE /api/dashboards/:id/blocks/:blockId   remove a block from dashboard
PATCH  /api/dashboards/:id/blocks/:blockId   update block label or config

// Metrics
GET    /api/metrics/summary                  all latest MetricSnapshots for org dashboard
GET    /api/metrics/:metricType              single metric with full trust metadata
POST   /api/metrics/refresh                  trigger manual recompute for all metrics

// Webhooks
POST   /api/webhooks/shopify                 receive Shopify webhook events

// Alerts
GET    /api/alerts                           list unread alerts for org
PATCH  /api/alerts/:id/read                  mark alert as read

// Digest
POST   /api/digest/send                      manually trigger digest send (admin use)
GET    /api/digest/preview                   preview digest content for org
```

---

## 4. Metric Types — All Valid Values

```typescript
type MetricType =
  | "revenue_today"
  | "revenue_this_month"
  | "orders_today"
  | "top_product"
  | "new_vs_returning"
  | "cash_in_bank"
  | "sales_vs_last_month"
  | "payments_received";
```

### Metric Computation Rules

```typescript
async function computeMetric(
  orgId: string,
  metricType: MetricType,
  date: Date
): Promise<MetricSnapshot>

// revenue_today
SUM(totalPrice) FROM RawOrder
WHERE organizationId = orgId
AND DATE(shopifyCreatedAt) = today
AND status NOT IN ('refunded', 'cancelled')

// revenue_this_month
SUM(totalPrice) FROM RawOrder
WHERE organizationId = orgId
AND MONTH(shopifyCreatedAt) = currentMonth
AND YEAR(shopifyCreatedAt) = currentYear
AND status NOT IN ('refunded', 'cancelled')

// orders_today
COUNT(*) FROM RawOrder
WHERE organizationId = orgId
AND DATE(shopifyCreatedAt) = today

// top_product
EXPLODE lineItems from RawOrders this month
GROUP BY productId
ORDER BY SUM(quantity) DESC
LIMIT 1
→ metadata: { productName, unitsSold, revenue }

// new_vs_returning
new = COUNT customers WHERE ordersCount = 1
returning = COUNT customers WHERE ordersCount >= 2
→ value = returning / total * 100 (% returning)
→ metadata: { newCount, returningCount, total }

// cash_in_bank
Running sum of credits minus debits per accountId
→ metadata: { accountName, lastTransactionDate }

// sales_vs_last_month
((revenue_this_month - revenue_last_month) / revenue_last_month) * 100
→ metadata: { thisMonth, lastMonth }

// payments_received
SUM(amount) FROM RawTransaction
WHERE organizationId = orgId
AND direction = 'credit'
AND DATE(date) >= startOfThisWeek
```

### Trust Metadata — Required on Every Snapshot

```typescript
{
  value: number,
  currency: "NZD",
  status: "ok" | "stale" | "partial" | "error",
  lastSyncedAt: DateTime,
  calculatedAt: DateTime,
  sourceSystems: string[],
  timeRange: string,
  definitionVersion: "1.0",
  metadata: object | null
}

// Stale: lastSyncedAt > 2 hours ago → status = "stale"
// Error: sync failed > 3 times in a row → status = "error"
// Partial: some sources connected, some not → status = "partial"
```

---

## 5. Drag and Drop Canvas

```typescript
const GRID_COLS = 12;
const ROW_HEIGHT = 120;
const MARGIN = [12, 12];
const CONTAINER_PADDING = [16, 16];

const MIN_W = 2;
const MIN_H = 2;
const MAX_W = 6;
const MAX_H = 4;

const PRESET_LAYOUT = [
  { i: "revenue_this_month", x: 0, y: 0, w: 4, h: 2, minW: 2, minH: 2 },
  { i: "cash_in_bank", x: 4, y: 0, w: 4, h: 2, minW: 2, minH: 2 },
  { i: "orders_today", x: 8, y: 0, w: 4, h: 2, minW: 2, minH: 2 },
  { i: "top_product", x: 0, y: 2, w: 6, h: 3, minW: 3, minH: 2 },
  { i: "new_vs_returning", x: 6, y: 2, w: 6, h: 3, minW: 3, minH: 2 },
];

// Save layout to DB on onDragStop and onResizeStop
// POST /api/dashboards/:id/layout with full layout array
// Optimistic update on frontend — don't wait for API response
```

---

## 6. Block Component — What Every Block Renders

```tsx
<BlockContainer>
  <BlockHeader>
    <BlockLabel>{block.label}</BlockLabel>
    <StatusDot status={snapshot.status} />
  </BlockHeader>
  <BlockValue>{formatCurrency(snapshot.value, snapshot.currency)}</BlockValue>
  <TrendBadge>
    <TrendArrow direction={trend > 0 ? "up" : "down"} />
    <TrendValue>{Math.abs(trend)}% vs last month</TrendValue>
  </TrendBadge>
  {snapshot.metadata && <BlockMetadata data={snapshot.metadata} />}
  <TrustBar>
    <SyncedAt>Synced {timeAgo(snapshot.lastSyncedAt)}</SyncedAt>
    <SourceLabel>from {snapshot.sourceSystems.join(", ")}</SourceLabel>
    <RefreshButton onClick={handleManualRefresh} />
  </TrustBar>
</BlockContainer>

// Status dot: ok → green, stale → amber, partial → amber, error → red
```

---

## 7. Background Jobs

```typescript
const JOBS = {
  "integration.refresh_token": {
    schedule: "every 6 hours",
    retries: 3,
    backoff: "exponential",
  },
  "sync.shopify.orders": {
    trigger: [
      "webhook: orders/create",
      "webhook: orders/updated",
      "schedule: every 30 mins",
    ],
    retries: 5,
    backoff: "exponential",
    onComplete: ["metrics.compute_snapshot", "alerts.evaluate"],
  },
  "sync.shopify.customers": {
    schedule: "every 1 hour",
    retries: 3,
    backoff: "exponential",
    onComplete: ["metrics.compute_snapshot"],
  },
  "sync.akahu.transactions": {
    schedule: "every 1 hour",
    retries: 3,
    backoff: "exponential",
    onComplete: ["metrics.compute_snapshot", "alerts.evaluate"],
  },
  "metrics.compute_snapshot": {
    trigger: "on completion of any sync job",
    retries: 3,
    backoff: "exponential",
  },
  "alerts.evaluate": {
    trigger: "after metrics.compute_snapshot",
    retries: 2,
    backoff: "fixed",
  },
  "digest.send_morning": {
    schedule: "daily cron — check each org's digestTime field",
    retries: 3,
    backoff: "exponential",
  },
};

// Every job MUST:
// 1. Log start with orgId, integrationId, jobType
// 2. Write SyncJobLog record with status = "running"
// 3. Handle errors → SyncJobLog status = "failed" with errorMessage
// 4. On success → SyncJobLog status = "success" with recordCount
// 5. Never throw unhandled exceptions — always catch and log to Sentry
```

---

## 8. Shopify Integration

```typescript
// Required OAuth scopes:
const SHOPIFY_SCOPES = [
  "read_orders",
  "read_customers",
  "read_products",
  "read_inventory",
];

// Webhooks to subscribe on connect:
const SHOPIFY_WEBHOOKS = [
  "orders/create",
  "orders/updated",
  "refunds/create",
  "customers/create",
  "app/uninstalled",
];

// Webhook handler:
// 1. Verify HMAC-SHA256 signature — reject 401 if invalid
// 2. Check idempotency — store webhook ID, reject duplicates
// 3. Identify org from shop domain in header
// 4. Enqueue appropriate sync job
// 5. Return 200 immediately

// app/uninstalled:
// → set Integration status = "disconnected"
// → create Alert: "Shopify has been disconnected. Reconnect to resume syncing."
// → do NOT delete historical data
```

---

## 9. Akahu Integration (NZ Open Banking)

```typescript
// Akahu connects to: ANZ, ASB, BNZ, Westpac, Kiwibank
// Docs: https://developers.akahu.nz

// Transaction sync:
// GET https://api.akahu.io/v1/transactions
// Upsert into RawTransaction by akahuTransactionId

// Balance calculation:
// Sum all credits minus all debits per accountId
// Include accountName in metadata for display

// Security:
// Never log Akahu access tokens
// Encrypt at rest with AES-256
// Minimum scopes: read_transactions, read_accounts
```

---

## 10. Alert Engine

```typescript
const ALERT_RULES = [
  {
    type: "cash_low",
    condition: (snapshots) => {
      const cashInBank = snapshots.find((s) => s.metricType === "cash_in_bank");
      const monthlyExpenses = estimateMonthlyExpenses(snapshots);
      const runwayDays = (cashInBank.value / monthlyExpenses) * 30;
      return runwayDays < 21;
    },
    severity: "warning",
    message: (data) =>
      `Cash is tighter than usual — you have about ${data.runwayDays} days of runway at current spend.`,
  },
  {
    type: "revenue_drop",
    condition: (snapshots) => {
      const vsLastMonth = snapshots.find(
        (s) => s.metricType === "sales_vs_last_month",
      );
      return vsLastMonth.value < -30;
    },
    severity: "warning",
    message: (data) =>
      `Sales are down ${Math.abs(data.pctChange)}% compared to this time last month.`,
  },
  {
    type: "no_sales_today",
    condition: (snapshots) => {
      const ordersToday = snapshots.find(
        (s) => s.metricType === "orders_today",
      );
      const hour = new Date().getHours();
      return ordersToday.value === 0 && hour >= 14;
    },
    severity: "info",
    message: () =>
      `No sales yet today — unusual for this time of day based on your history.`,
  },
];

// Deduplication: check for existing unread Alert of same type before inserting
```

---

## 11. Morning Digest

```typescript
const digestTemplate = (data: DigestData) => `
Subject: ☀️ ${data.businessName} — ${formatDate(data.date)}

Good morning ${data.ownerFirstName},

Here's your business for ${data.dayOfWeek}:

💰 Revenue: ${formatCurrency(data.revenueToday)} today · ${formatCurrency(data.revenueMonth)} this month
📦 Orders: ${data.ordersToday} order${data.ordersToday !== 1 ? "s" : ""} today
🏆 Top seller: ${data.topProduct.name} (${data.topProduct.units} units)
🏦 Cash in bank: ${formatCurrency(data.cashInBank)}

${
  data.alerts.length > 0
    ? `⚠️ Heads up:\n${data.alerts.map((a) => `• ${a.message}`).join("\n")}`
    : "✅ Everything looks healthy today."
}

Open your dashboard →

— Your business assistant
`;

// DigestLog record created on send
// Track opens via Resend webhook → update DigestLog.opened = true
```

---

## 12. Onboarding Flow (Self-Serve)

```
Step 1 — Sign Up (Clerk)
Step 2 — Name Your Business
Step 3 — Tell Us About Your Setup (tools + digest time)
Step 4 — Connect Your Tools (OAuth per integration)
Step 5 — Interactive Tutorial (3 tooltips, skippable)
Step 6 — Preset Dashboard Loads With Real Data
Step 7 — Confirmation banner on live dashboard
```

**Design principles:** One screen, one job. Progress always visible. Errors are human. Tutorial is optional. First value in under 5 minutes.

---

## 13. Security Requirements

```typescript
// 1. Encrypt all OAuth tokens at rest (AES-256-GCM)
// 2. Never log access tokens — use Pino redact
const logger = pino({
  redact: ["accessToken", "refreshToken", "authorization", "*.token"],
});
// 3. Verify Shopify webhook signatures on every request
// 4. Row-level access control — every DB query includes WHERE organizationId = session.orgId
// 5. Clerk session verification on every protected API route
// 6. Minimum OAuth scopes only
// 7. All secrets via environment variables — never hardcoded
```

---

## 14. Observability

```typescript
// Sentry: initialise in both Next.js and Fastify, tag with orgId + integrationId
// PostHog events:
posthog.capture("dashboard_viewed", { orgId, blockCount });
posthog.capture("block_added", { orgId, metricType });
posthog.capture("block_removed", { orgId, metricType });
posthog.capture("manual_refresh_clicked", { orgId, metricType });
posthog.capture("integration_connected", { orgId, provider });
posthog.capture("onboarding_completed", { orgId });
posthog.capture("digest_opened", { orgId });

// Pino structured logs on every sync job:
logger.info({
  event: "sync_completed",
  orgId,
  integrationId,
  jobType,
  recordCount,
  durationMs,
});
logger.error({
  event: "sync_failed",
  orgId,
  integrationId,
  jobType,
  errorMessage,
  attempt,
});
```

---

## 15. Frontend Polling Strategy

```typescript
const { data: metrics } = useQuery({
  queryKey: ["metrics", orgId],
  queryFn: () => fetch("/api/metrics/summary").then((r) => r.json()),
  refetchInterval: 60_000,
  refetchIntervalInBackground: false,
  staleTime: 30_000,
});

// Manual refresh:
const handleManualRefresh = async () => {
  await fetch("/api/metrics/refresh", { method: "POST" });
  await refetch();
};

// No WebSockets. No SSE. Simple polling is enough.
```

---

## 16. Do Not Build in v0.1

```
❌ Freeform canvas engine
❌ "Why did this happen" causal/correlation engine
❌ Business Health Score (0–100)
❌ AI features of any kind
❌ Xero integration — API pricing too expensive early stage
❌ Square integration — phase 2
❌ GraphQL
❌ Microservices architecture
❌ WebSockets or SSE
❌ Custom charting library — use Recharts
❌ Inventory management module
❌ Staff/labour cost tracking
❌ Marketing attribution
❌ Complex drill-downs
❌ Multi-currency support
❌ Report generation / PDF exports
❌ Kafka or complex stream processing
❌ Event sourcing
❌ Middleware abstraction (Apideck/Merge)
```

---

## 17. Build Order — Follow This Exactly

```
── PHASE 1 ─────────────────────────────────────────────

Day 1:   Nav + Hero (typography, mockup, animations)
Day 2:   Social Proof + Problem + Features (bento grid)
Day 3:   How It Works + Integrations + Pricing
Day 4:   Testimonials + FAQ + Final CTA + Footer
Day 5:   Polish — animations, mobile, copy review
Day 6:   Deploy to Vercel — share URL

── PHASE 2 / WEEK 1 ────────────────────────────────────

Day 1–2: Project scaffold
  □ Next.js 14 + TypeScript + Tailwind + shadcn/ui
  □ Clerk auth integration
  □ Prisma + Neon Postgres — run migrations
  □ Sentry + PostHog initialised
  □ Environment variables configured

Day 3–4: Dashboard shell
  □ react-grid-layout canvas with PRESET_LAYOUT
  □ Block components rendering hardcoded dummy data
  □ Trust bar UI on every block (static timestamps)
  □ Block sidebar panel (static, not yet functional)

Day 5: Onboarding flow (steps 1–3)

── WEEK 2 ──────────────────────────────────────────────

Day 6–7: Shopify OAuth + token encryption
Day 8–9: Raw data sync (Fastify + BullMQ + Upstash Redis)
Day 10:  Metrics computation layer (all 8 metrics + /api/metrics/summary)

── WEEK 3 ──────────────────────────────────────────────

Day 11–12: Live dashboard (TanStack Query + 60s polling)
Day 13:    Shopify webhooks (HMAC verification + idempotency)
Day 14–15: Akahu bank feed

── WEEK 4 ──────────────────────────────────────────────

Day 16–17: Canvas interactions (drag/add/remove blocks)
Day 18:    Alert engine
Day 19:    Morning digest (Resend)
Day 20:    Polish + pilot prep

── WEEK 5–6 ────────────────────────────────────────────

  □ Onboard first 3 pilot businesses manually
  □ Fix everything that breaks
  □ Collect feedback after 2 weeks
  □ Decide v0.2 scope based on what pilots ask for
```

---

## 18. Definition of Done — v0.1 Is Complete When

```
□ User can sign up and create an organization
□ User can connect Shopify via OAuth in under 2 minutes
□ User can connect NZ bank account via Akahu
□ Dashboard loads with preset layout and real data in all 5 blocks
□ Every block shows last synced timestamp, source label, status dot, and manual refresh
□ Revenue data matches Shopify Admin within acceptable rounding tolerance
□ User can drag blocks to rearrange — layout persists on refresh
□ User can add a block from the sidebar panel
□ User can remove a block from the canvas
□ Morning digest email sends at configured time with plain English summary
□ Cash low alert fires when runway < 21 days
□ Revenue drop alert fires when sales down > 30% WoW
□ Sentry capturing errors in production
□ PostHog tracking dashboard views and refresh clicks
□ We can onboard a pilot end to end in 45 minutes or less
□ 3 pilots actively using it within 2 weeks of launch
□ At least 2 pilots say they would be unhappy if it disappeared
```

---

_Phase 1 first. Ship the landing page. Get the URL live. Then build the app._
