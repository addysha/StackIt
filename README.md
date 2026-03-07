

# StackIt 

> Personal business assistant for small business owners.
> Last updated: March 2026

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

---

## 0.2 Product Philosophy  Adaptability & Creative Freedom

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
- Rename any block with their own label
("My Revenue" instead of "Revenue This Month")

**2. Custom block labels**

Every block label is editable. Double-click to rename.
A cafe owner might rename "Revenue This Month" to "Takings This Month."
A tradie might rename "Cash in Bank" to "Business Account."
The product speaks their language, not ours.

**3. Multiple dashboards**

Owners can create more than one dashboard.
Examples of how different owners use this:

- "Daily Check" dashboard (5 blocks, quick morning view)
- "Monthly Review" dashboard (deeper metrics, bigger picture)
- "Cash Focus" dashboard (all cash/invoice blocks)

Each dashboard has its own layout, its own blocks, its own name.

**4. Block library  open and growing**

The block library is not locked to 8 metrics.
It is a growing library of analytical blocks that owners can
browse and add freely. Blocks are organised by category:

Revenue & Sales

- Revenue Today
- Revenue This Month
- Sales vs Last Month
- Orders Today
- Average Order Value
- Refunds This Month

Products

- Top Selling Product
- Top 5 Products (ranked list block)
- Units Sold Today
- Low Stock Warning (when inventory connected)

Customers

- New vs Returning (%)
- New Customers This Month
- Customer Lifetime Value (avg)
- Repeat Purchase Rate

Cash & Finance

- Cash in Bank
- Payments Received This Week
- Outstanding Invoices (count + value)
- Overdue Invoices
- Monthly Income vs Expenses
- Cash Runway (days)

Custom

- Custom Metric (manual input — owner types their own number)
- Custom Goal (set a target, track progress toward it)
- Notes Block (freeform text — reminders, to-do, context)

**5. Custom Metric block — the wildcard**

This is for the things we have not thought of.
An owner can create a Custom Metric block where they:

- Name it anything ("Walk-ins Today", "Instagram Followers", "Staff Hours")
- Update it manually OR connect it to a data source later
- Set a target value and track progress

This respects the fact that every business has metrics that matter
to them specifically — metrics no SaaS tool will ever predict.

**6. Custom Goal blocks**

Owners can set goals and track them visually:

- "Revenue goal: $20,000 this month" — progress bar filling up
- "New customers goal: 50 this month" — % complete
- "Cash target: $15,000 by end of quarter" — trend line toward target

Goals make the dashboard motivational, not just informational.
This is the difference between a tool and an assistant that is
rooting for you.

**7. Block appearance customisation**

Each block can be customised visually:

- Accent colour (choose from palette)
- Display format (currency, number, percentage, days)
- Time range (today / this week / this month / last 30 days / custom)
- Show/hide trend indicator
- Show/hide trust bar (for owners who want a cleaner view)

---

### What This Is NOT (Customisation Edition)

This is not about making the product infinitely complex.
The customisation must always feel effortless.

- No configuration screens with 20 settings
- No JSON editors or code inputs
- No setup wizards for individual blocks
- No required fields — every customisation is optional
- No customisation that requires understanding data schemas
- No customisation that takes more than 3 clicks to complete

Every customisation option must pass this test:
"Could a cafe owner figure this out without reading any instructions?"
If the answer is no — simplify it or remove it.

---

### The Emotional Standard

When a business owner looks at their dashboard they should feel:

Ownership — "This is MY dashboard. It shows MY business."
Clarity — "I know exactly what is happening right now."
Control — "I can change anything I do not like."
Pride — "I built this view. It works for how I run things."

Not: "I guess this is what everyone sees."
Not: "I do not know what half of these numbers mean."
Not: "I wish I could move that block or add this metric."

---

### The Block Registry — Architecture Requirement

The block library must be built as an extensible system from day one.
Not as 8 hardcoded components — as a registry of block types that
can be added, configured, and rendered dynamically.

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
    requiredIntegrations: [], // works with zero integrations
    defaultSize: { w: 3, h: 2 },
    configOptions: ["label", "value", "target", "displayFormat"],
    compute: null, // manually updated by owner
  },
  // adding a new block = one new entry here
  // canvas, sidebar, config panels all read from this registry
];
```

---

### Phased Customisation Rollout

Not everything ships in v0.1 — but architecture must support it all.

v0.1 — Foundation

- Drag, resize, remove blocks
- Add blocks from library (8 core blocks)
- Preset starter layout
- Block registry pattern in place

v0.2 — Personalisation

- Custom block labels (double-click to rename)
- Multiple dashboards
- Custom Metric block (manual input)
- Block time range selector

v0.3 — Goals & Expression

- Custom Goal blocks with progress tracking
- Block accent colour picker
- Expanded block library (20+ blocks)
- Show/hide trust bar per block

Future

- Custom data sources via Zapier
- Shared dashboards for team members
- Dashboard templates by business type
- Mobile block reordering

## 0.5 UI/UX & Aesthetic Standard — Non-Negotiable

UI and UX is a primary selling point of this product. The interface is
part of the moat. Small business owners choose tools they enjoy opening.
If the product looks generic, it feels untrustworthy. If it looks
exceptional, it feels like it was built specifically for them.

**The standard: every screen must feel like it was designed by a
world-class product studio, not assembled from a component library.**

---

### Visual Identity — Direction

The aesthetic is **refined dark-mode first, with warm accents**.

Think: calm, confident, premium but approachable. Not corporate.
Not startup-generic. The kind of interface a business owner opens
every morning and feels good about. Like checking a beautifully
designed watch rather than a spreadsheet.

**Colour Palette:**

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

**Typography:**

```
Display font:  "Sora" (Google Fonts) — headings, metric values,
               large numbers. Has character without being loud.
Body font:     "DM Sans" (Google Fonts) — all body text, labels,
               UI copy. Clean and modern, highly legible at small sizes.
Mono font:     "JetBrains Mono" — timestamps, sync logs,
               technical metadata only.

Never use: Inter, Roboto, Arial, system-ui as primary fonts.
These make the product look generic.
```

**Motion & Animation:**

```
Page transitions:   150ms ease-out fade
Block drag:         smooth, with subtle shadow lift on pickup
Number updates:     count-up animation when metric value changes
Block load:         skeleton shimmer then fade in real data
Toast notifications: slide in from bottom-right, auto-dismiss 4s
Hover states:       100ms ease transitions on all interactive elements
Onboarding tooltips: gentle pulse on highlighted element
Status dot:         subtle breathing pulse animation on stale state
```

---

### Layout Principles

**Generous whitespace.** Blocks breathe. Nothing feels cramped.
Padding inside blocks: minimum 24px. Gap between blocks: 12px.

**Information hierarchy is sacred.** On every block, the eye
should land in this order:

1. The number (large, bold, primary colour or white)
2. The label (smaller, muted)
3. The trend (colour-coded arrow + percentage)
4. The trust bar (smallest, most muted — present but not distracting)

**Consistent radius.** All blocks, cards, buttons, inputs use
border-radius: 12px. No mixing of sharp and rounded elements.

**Depth through layering.** Background (#0A0A0F) → surface
(#111118) → raised (#1A1A24). Three levels only. No flat design
that makes everything look the same elevation.

---

### Block Design Standard

Every metric block must meet this standard:

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
  → gives spatial context for block placement
  → disappears visually when blocks are dense enough

Empty state (no blocks added yet):
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

The onboarding must feel like a premium consumer app, not an
enterprise SaaS setup wizard.

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
  → each connection feels like an achievement

Tutorial tooltips:
  → dark tooltip with indigo accent border
  → spotlight effect on highlighted element
  → backdrop: 40% dark overlay on rest of screen
  → "skip tutorial" always visible, never hidden
```

---

### Morning Digest Email Standard

The email is part of the product. It must be as well-designed
as the dashboard.

```
Max width: 600px
Background: #0A0A0F (dark email — stands out in inbox)
Font: system fonts that render dark-mode well
  → -apple-system, BlinkMacSystemFont, Segoe UI

Structure:
  → subtle wordmark at top
  → warm personalised greeting (human tone, not system tone)
  → 4-5 key stats in clean grid (icon + value + label)
  → alerts section only if alerts exist (amber/red accent)
  → single CTA button: "Open dashboard" (indigo, pill shape)
  → minimal footer (unsubscribe, settings link)

Tone: like a message from a smart friend, not a system notification.
Never: tables with visible borders, garish colours, corporate headers.
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
  → optimised for: morning digest email → tap CTA → quick check
```

---

### Component Quality Bar

Every component must pass this checklist before it ships:

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

> **The dashboard should feel like something a business owner is
> proud to open in front of someone else.**

If it looks like a spreadsheet — we have failed.
If it looks like enterprise SaaS — we have failed.
If it looks like it was built with care, specifically for them — we have succeeded.

---

## 1. Tech Stack — Use Exactly This

### Frontend

- **Next.js 14+ with TypeScript** — App Router
- **Tailwind CSS** — all styling, no other CSS frameworks
- **shadcn/ui** — all UI components
- **TanStack Query** — all data fetching and caching
- **react-grid-layout** — drag and drop dashboard canvas
- **React Hook Form + Zod** — all forms and validation
- **Recharts** — metric visualisations inside blocks

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
- TypeScript strict mode throughout — inconsistent API responses from Shopify and Akahu make this essential

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
  digestTime      String           @default("07:00") // NZ time HH:MM
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
  shopDomain     String?      // shopify only e.g. "mybusiness.myshopify.com"
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
  layout         Json         // react-grid-layout layout array stored as JSON
  createdAt      DateTime     @default(now())
  updatedAt      DateTime     @updatedAt
  organization   Organization @relation(fields: [organizationId], references: [id])
  blocks         Block[]
}

model Block {
  id          String    @id @default(cuid())
  dashboardId String
  metricType  String    // see Section 5 for all valid metric types
  label       String    // display label shown on block
  position    Json      // { x, y, w, h, i } for react-grid-layout
  visible     Boolean   @default(true)
  config      Json?     // optional per-block settings
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
  sourceSystems     String[]     // ["shopify"] | ["akahu"] | ["shopify", "stripe"]
  status            String       @default("ok") // ok | stale | partial | error
  definitionVersion String       @default("1.0")
  metadata          Json?        // e.g. { productName, unitsSold } for top_product
  organization      Organization @relation(fields: [organizationId], references: [id])

  @@index([organizationId, metricType])
}

model SyncJobLog {
  id             String       @id @default(cuid())
  organizationId String
  integrationId  String
  jobType        String       // see Section 7 for all job types
  status         String       // pending | running | success | failed
  recordCount    Int?
  errorMessage   String?
  startedAt      DateTime     @default(now())
  completedAt    DateTime?
  organization   Organization @relation(fields: [organizationId], references: [id])
  integration    Integration  @relation(fields: [integrationId], references: [id])
}

model RawOrder {
  id             String   @id @default(cuid())
  organizationId String
  shopifyOrderId String
  totalPrice     Float
  currency       String
  status         String
  customerId     String?
  lineItems      Json     // raw Shopify line items array
  shopifyCreatedAt DateTime
  syncedAt       DateTime @default(now())

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
  message        String       // plain English — written as a human would say it
  severity       String       // info | warning | critical
  read           Boolean      @default(false)
  createdAt      DateTime     @default(now())
  organization   Organization @relation(fields: [organizationId], references: [id])
}

model DigestLog {
  id             String       @id @default(cuid())
  organizationId String
  sentAt         DateTime     @default(now())
  content        String       // plain English digest content that was sent
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
  | "revenue_today" // sum of RawOrders today, status != refunded
  | "revenue_this_month" // sum of RawOrders this calendar month
  | "orders_today" // count of RawOrders today
  | "top_product" // line items grouped by product, sorted by units sold this month
  | "new_vs_returning" // customers with ordersCount = 1 vs 2+
  | "cash_in_bank" // latest balance from RawTransaction per Akahu account
  | "sales_vs_last_month" // revenue_this_month vs same period last month as % change
  | "payments_received"; // sum of credit RawTransactions this week
```

### Metric Computation Rules

```typescript
// Every metric function signature:
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
Latest balance calculation from RawTransactions per account
Running sum of credits minus debits up to today
→ metadata: { accountName, lastTransactionDate }

// sales_vs_last_month
((revenue_this_month - revenue_last_month) / revenue_last_month) * 100
→ value = % change
→ metadata: { thisMonth, lastMonth }

// payments_received
SUM(amount) FROM RawTransaction
WHERE organizationId = orgId
AND direction = 'credit'
AND DATE(date) >= startOfThisWeek
```

### Trust Metadata — Required on Every Snapshot

```typescript
// Every MetricSnapshot MUST include all of these:
{
  value: number,
  currency: "NZD",
  status: "ok" | "stale" | "partial" | "error",
  lastSyncedAt: DateTime,       // when data was last pulled from source
  calculatedAt: DateTime,       // when this snapshot was computed
  sourceSystems: string[],      // ["shopify"] | ["akahu"] | ["shopify","stripe"]
  timeRange: string,            // "today" | "this_month" | "this_week"
  definitionVersion: "1.0",
  metadata: object | null       // extra data specific to metric type
}

// Stale threshold: lastSyncedAt > 2 hours ago → status = "stale"
// Error threshold: sync failed > 3 times in a row → status = "error"
// Partial: some sources connected, some not → status = "partial"
```

---

## 5. Drag and Drop Canvas

```typescript
// Library: react-grid-layout
// Docs: https://github.com/react-grid-layout/react-grid-layout

// Canvas configuration:
const GRID_COLS = 12;
const ROW_HEIGHT = 120; // pixels
const MARGIN = [12, 12]; // [horizontal, vertical] gap between blocks
const CONTAINER_PADDING = [16, 16];

// Block size constraints:
const MIN_W = 2; // minimum 2 columns wide
const MIN_H = 2; // minimum 2 rows tall
const MAX_W = 6; // maximum 6 columns wide
const MAX_H = 4; // maximum 4 rows tall

// Preset starter layout — shown after onboarding, before user customises:
const PRESET_LAYOUT = [
  { i: "revenue_this_month", x: 0, y: 0, w: 4, h: 2, minW: 2, minH: 2 },
  { i: "cash_in_bank", x: 4, y: 0, w: 4, h: 2, minW: 2, minH: 2 },
  { i: "orders_today", x: 8, y: 0, w: 4, h: 2, minW: 2, minH: 2 },
  { i: "top_product", x: 0, y: 2, w: 6, h: 3, minW: 3, minH: 2 },
  { i: "new_vs_returning", x: 6, y: 2, w: 6, h: 3, minW: 3, minH: 2 },
];

// Layout persistence:
// - Save layout to DB on onDragStop and onResizeStop events
// - POST /api/dashboards/:id/layout with full layout array
// - Optimistic update on frontend — don't wait for API response to re-render

// Block sidebar panel (right side of canvas):
// - Shows all available metric types as draggable cards
// - Greyed out + tooltip if required integration not connected
// - "Connect Shopify first" tooltip on hover for disconnected blocks
// - Drag from sidebar onto canvas to add block
// - OR click block in sidebar to add at next available position

// Block removal:
// - Hover over block to reveal X button (top right corner)
// - Confirm removal with inline confirmation (no modal)
// - Block removed from canvas and deleted from DB
```

---

## 6. Block Component — What Every Block Renders

```tsx
// Every metric block renders exactly this structure:

<BlockContainer>
  {/* Top row */}
  <BlockHeader>
    <BlockLabel>{block.label}</BlockLabel> // e.g. "Revenue This Month"
    <StatusDot status={snapshot.status} /> // green/amber/red dot
  </BlockHeader>

  {/* Main value */}
  <BlockValue>
    {formatCurrency(snapshot.value, snapshot.currency)} // e.g. "$4,250"
  </BlockValue>

  {/* Trend indicator */}
  <TrendBadge>
    <TrendArrow direction={trend > 0 ? "up" : "down"} />
    <TrendValue>{Math.abs(trend)}% vs last month</TrendValue>
  </TrendBadge>

  {/* Metadata (for top_product etc) */}
  {snapshot.metadata && <BlockMetadata data={snapshot.metadata} />}

  {/* Trust bar — always visible at bottom */}
  <TrustBar>
    <SyncedAt>Synced {timeAgo(snapshot.lastSyncedAt)}</SyncedAt>
    <SourceLabel>from {snapshot.sourceSystems.join(", ")}</SourceLabel>
    <RefreshButton onClick={handleManualRefresh} />
  </TrustBar>
</BlockContainer>

// Status dot colours:
// ok      → green  (#22c55e)
// stale   → amber  (#f59e0b) + tooltip "Data may be outdated"
// partial → amber  (#f59e0b) + tooltip "Some sources unavailable"
// error   → red    (#ef4444) + tooltip "Sync failed — click refresh to retry"

// Loading state: skeleton animation while TanStack Query fetches
// Error state: show last known value with error status dot
```

---

## 7. Background Jobs

```typescript
// Queue: BullMQ with Upstash Redis
// All jobs include: orgId, integrationId, jobId in structured logs

const JOBS = {
  "integration.refresh_token": {
    schedule: "every 6 hours",
    description: "Refresh expired OAuth tokens for all active integrations",
    retries: 3,
    backoff: "exponential",
  },

  "sync.shopify.orders": {
    trigger: [
      "webhook: orders/create",
      "webhook: orders/updated",
      "schedule: every 30 mins",
    ],
    description:
      "Fetch new/updated orders from Shopify API, upsert into RawOrder",
    retries: 5,
    backoff: "exponential",
    onComplete: ["metrics.compute_snapshot", "alerts.evaluate"],
  },

  "sync.shopify.customers": {
    schedule: "every 1 hour",
    description: "Fetch customer data, upsert into RawCustomer",
    retries: 3,
    backoff: "exponential",
    onComplete: ["metrics.compute_snapshot"],
  },

  "sync.akahu.transactions": {
    schedule: "every 1 hour",
    description:
      "Fetch bank transactions from Akahu, upsert into RawTransaction",
    retries: 3,
    backoff: "exponential",
    onComplete: ["metrics.compute_snapshot", "alerts.evaluate"],
  },

  "metrics.compute_snapshot": {
    trigger: "on completion of any sync job",
    description:
      "Recompute all MetricSnapshots for org, store with trust metadata",
    retries: 3,
    backoff: "exponential",
  },

  "alerts.evaluate": {
    trigger: "after metrics.compute_snapshot",
    description:
      "Run alert rules against latest snapshots, create Alert records",
    retries: 2,
    backoff: "fixed",
  },

  "digest.send_morning": {
    schedule: "daily cron — check each org's digestTime field",
    description: "Generate plain English digest, send via Resend email",
    retries: 3,
    backoff: "exponential",
  },
};

// Every job MUST:
// 1. Log start with orgId, integrationId, jobType
// 2. Write SyncJobLog record with status = "running"
// 3. Handle errors and update SyncJobLog status = "failed" with errorMessage
// 4. Update SyncJobLog status = "success" with recordCount on completion
// 5. Never throw unhandled exceptions — always catch and log to Sentry
```

---

## 8. Shopify Integration

```typescript
// OAuth Flow:
// 1. POST /api/integrations/shopify/connect
//    → redirect to: https://{shop}.myshopify.com/admin/oauth/authorize
//    → params: client_id, scope, redirect_uri, state (CSRF token)
//
// 2. GET /api/integrations/shopify/callback
//    → verify state matches CSRF token
//    → exchange code for permanent access token
//    → encrypt token with AES-256 before storing
//    → create Integration record
//    → enqueue sync.shopify.orders (full historical 90 days)
//    → enqueue sync.shopify.customers
//    → subscribe to webhooks (see below)

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

// Webhook handler — POST /api/webhooks/shopify:
// 1. Verify HMAC-SHA256 signature — reject with 401 if invalid
//    const hmac = req.headers['x-shopify-hmac-sha256']
//    const body = req.rawBody
//    verify using SHOPIFY_WEBHOOK_SECRET
// 2. Check idempotency — store webhook ID, reject duplicates
// 3. Identify org from shop domain in header
// 4. Enqueue appropriate sync job
// 5. Return 200 immediately — never do heavy work in handler

// app/uninstalled webhook:
// → set Integration status = "disconnected"
// → create Alert: "Shopify has been disconnected. Reconnect to resume syncing."
// → do NOT delete historical data
```

---

## 9. Akahu Integration (NZ Open Banking)

```typescript
// Akahu connects to: ANZ, ASB, BNZ, Westpac, Kiwibank
// Docs: https://developers.akahu.nz

// OAuth Flow:
// 1. POST /api/integrations/akahu/connect
//    → redirect to Akahu OAuth page
//    → user selects their bank and logs in securely through Akahu
//
// 2. GET /api/integrations/akahu/callback
//    → exchange code for access token
//    → encrypt and store token
//    → create Integration record
//    → enqueue sync.akahu.transactions (full historical 90 days)

// Transaction sync:
// GET https://api.akahu.io/v1/transactions
// Upsert into RawTransaction by akahuTransactionId

// Balance calculation:
// Sum all credits minus all debits per accountId
// This gives running balance = cash_in_bank metric
// Include accountName in metadata for display

// Security:
// Never log Akahu access tokens
// Encrypt at rest with AES-256
// Request minimum scopes: read transactions, read accounts
```

---

## 10. Alert Engine

```typescript
// Runs after every metrics.compute_snapshot job
// Creates Alert records with plain English messages
// Rules:

const ALERT_RULES = [
  {
    type: "cash_low",
    condition: (snapshots) => {
      const cashInBank = snapshots.find((s) => s.metricType === "cash_in_bank");
      const monthlyExpenses = estimateMonthlyExpenses(snapshots); // from transactions
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
      return vsLastMonth.value < -30; // more than 30% drop
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
      return ordersToday.value === 0 && hour >= 14; // no sales by 2pm
    },
    severity: "info",
    message: () =>
      `No sales yet today — unusual for this time of day based on your history.`,
  },
];

// Deduplication:
// Don't create duplicate alert if same type already exists unread
// Check for existing unread Alert of same type before inserting
```

---

## 11. Morning Digest

```typescript
// Sent daily via Resend at org.digestTime (NZ timezone)
// Plain English — not a report, not a chart, a message

// Email template:
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

${
  data.salesTrend > 0
    ? `📈 Sales are up ${data.salesTrend}% vs last month — good momentum.`
    : data.salesTrend < -10
      ? `📉 Sales are down ${Math.abs(data.salesTrend)}% vs last month — worth keeping an eye on.`
      : ""
}

Open your dashboard →
[CTA BUTTON]

—
Your business assistant
`;

// DigestLog record created on send
// Track opens via Resend webhook → update DigestLog.opened = true
```

---

## 12. Onboarding Flow (Self-Serve)

```
Step 1 — Sign Up (Clerk)
  Email + password
  Clerk creates User record
  Webhook creates Organization record in DB

Step 2 — Name Your Business
  Single input: "What's your business called?"
  Creates Organization.name

Step 3 — Tell Us About Your Setup
  "Let's get to know your business"
  • Which tools do you use? (checkboxes)
    ☐ Shopify  ☐ Square  ☐ Stripe  ☐ Xero  ☐ MYOB  ☐ Other
  • What time do you want your morning digest? (time picker, default 07:00)
  Saves to Organization record

Step 4 — Connect Your Tools
  One screen per integration they selected
  Large clear OAuth button per tool
  "Click below — it takes 30 seconds. We'll handle the rest."
  Progress indicator: "1 of 2 connected ✓"
  Skip option for any tool (can reconnect later in settings)

Step 5 — Interactive Tutorial (3 steps max, skippable)
  Shown after first connection completes
  Overlay tooltips — not a separate screen

  Tooltip 1 → points at a block:
  "This is a block. Each one shows a key number from your business."

  Tooltip 2 → points at sidebar:
  "Drag any block from here onto your dashboard."

  Tooltip 3 → points at trust bar:
  "This tells you when your data last updated and where it came from."

  "Got it — show me my dashboard →" button skips remaining tips

Step 6 — Preset Dashboard Loads With Real Data
  After first sync completes (show loading skeleton while syncing):
  → preset layout with 5 blocks populated with real data
  → subtle "Your data is live" toast notification
  → first-time empty state if no data yet:
    "Connected! Your first sync is running —
     check back in a few minutes."

Step 7 — Confirmation
  No separate screen — just the live dashboard
  Subtle banner at top (dismissible):
  "🎉 You're all set. First morning digest arrives
   tomorrow at {digestTime}. — Dismiss"
```

### Self-Serve Design Principles

**Every screen has one job.** No screen asks more than one question or
shows more than one action. If a user has to think about what to do
next, the screen has failed.

**Progress is always visible.** User always knows where they are:
"Step 2 of 4" or a visual progress bar. Never leave them wondering
how much is left.

**Errors are human.** If an OAuth connection fails:
"Couldn't connect to Shopify — try again" with a retry button.
Not a stack trace. Not a generic error code.

**Tutorial is optional.** Power users can skip every tooltip
immediately. The product should be self-explanatory enough that
the tutorial is a bonus, not a requirement.

**First value as fast as possible.** The goal is to get them to a
live dashboard with real numbers in under 5 minutes from sign-up.
Every extra step is a drop-off risk.

---

## 13. Security Requirements

```typescript
// These are non-negotiable even at MVP:

// 1. Encrypt all OAuth tokens at rest
//    Use AES-256-GCM encryption
//    Store encrypted value + IV in DB
//    Encryption key from environment variable — never hardcoded

// 2. Never log access tokens
//    Pino redact config:
const logger = pino({
  redact: ["accessToken", "refreshToken", "authorization", "*.token"],
});

// 3. Verify Shopify webhook signatures on every request
//    Reject with 401 if invalid
//    Never process unverified webhook payloads

// 4. Row-level access control on every API route
//    Every DB query must include WHERE organizationId = session.orgId
//    Never trust client-provided orgId without verification against session

// 5. Clerk session verification on every protected API route
//    Use Clerk middleware — no route should be accessible without valid session

// 6. Minimum OAuth scopes
//    Only request what you actually need
//    Shopify: read_orders, read_customers, read_products, read_inventory
//    Akahu: read_transactions, read_accounts

// 7. Environment variables — never hardcode secrets
//    DATABASE_URL, CLERK_SECRET_KEY, SHOPIFY_CLIENT_SECRET,
//    AKAHU_CLIENT_SECRET, ENCRYPTION_KEY, SENTRY_DSN
```

---

## 14. Observability

```typescript
// Sentry — required from day one
// Initialize in both Next.js and Fastify
// Capture all unhandled exceptions
// Tag errors with orgId and integrationId where available

// PostHog — product analytics
// Events to track:
posthog.capture("dashboard_viewed", { orgId, blockCount });
posthog.capture("block_added", { orgId, metricType });
posthog.capture("block_removed", { orgId, metricType });
posthog.capture("manual_refresh_clicked", { orgId, metricType });
posthog.capture("integration_connected", { orgId, provider });
posthog.capture("onboarding_completed", { orgId });
posthog.capture("digest_opened", { orgId });

// Pino structured logs — every sync job must log:
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
// TanStack Query config for dashboard:

const { data: metrics } = useQuery({
  queryKey: ['metrics', orgId],
  queryFn: () => fetch('/api/metrics/summary').then(r => r.json()),
  refetchInterval: 60_000,           // poll every 60 seconds while tab open
  refetchIntervalInBackground: false, // stop polling when tab not focused
  staleTime: 30_000,                 // consider data stale after 30 seconds
})

// Manual refresh button:
const { refetch } = useQuery(...)
const handleManualRefresh = async () => {
  await fetch('/api/metrics/refresh', { method: 'POST' })
  await refetch()
}

// No WebSockets in v0.1
// No SSE in v0.1
// Simple polling is enough — small business owners check in the morning, not every second
```

---

## 16. Do Not Build in v0.1

```
❌ Freeform canvas engine — use react-grid-layout presets
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
❌ Middleware abstraction (Apideck/Merge) — build Shopify and Akahu direct
```

---

## 17. Build Order — Follow This Exactly

```
── WEEK 1 ──────────────────────────────────────────────

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
  □ Sign up → create org → intake form
  □ Calendly embed on step 4

── WEEK 2 ──────────────────────────────────────────────

Day 6–7: Shopify OAuth
  □ /api/integrations/shopify/connect
  □ /api/integrations/shopify/callback
  □ Token encryption + storage
  □ Webhook subscription on connect

Day 8–9: Raw data sync
  □ Fastify backend + BullMQ setup
  □ Upstash Redis connection
  □ sync.shopify.orders job (90 day historical)
  □ sync.shopify.customers job
  □ SyncJobLog records

Day 10: Metrics computation layer
  □ All 8 metric computation functions
  □ MetricSnapshot records with full trust metadata
  □ /api/metrics/summary endpoint

── WEEK 3 ──────────────────────────────────────────────

Day 11–12: Live dashboard
  □ TanStack Query fetching real metrics
  □ Blocks rendering real Shopify data
  □ 60-second polling active
  □ Manual refresh button working

Day 13: Shopify webhooks
  □ POST /api/webhooks/shopify handler
  □ HMAC signature verification
  □ Idempotency check
  □ Enqueue sync job on receive

Day 14–15: Akahu bank feed
  □ /api/integrations/akahu/connect + callback
  □ sync.akahu.transactions job
  □ cash_in_bank metric computing from real data

── WEEK 4 ──────────────────────────────────────────────

Day 16–17: Canvas interactions
  □ Drag to rearrange — layout saves to DB on dragStop
  □ Add block from sidebar — drag or click
  □ Remove block from canvas — hover X + confirm

Day 18: Alert engine
  □ alerts.evaluate job
  □ Alert rules: cash_low, revenue_drop, no_sales_today
  □ GET /api/alerts endpoint
  □ Alert display on dashboard

Day 19: Morning digest
  □ digest.send_morning cron job
  □ Plain English email template
  □ Resend integration
  □ DigestLog record on send

Day 20: Polish + pilot prep
  □ Error states on all blocks
  □ Stale state detection (> 2 hours)
  □ Onboarding steps 5–7 complete
  □ PostHog events firing

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

*This is the complete spec for v0.1. Do not deviate from the build order. Do not add features not listed here. Ship this, get pilots, then decide what comes next.*