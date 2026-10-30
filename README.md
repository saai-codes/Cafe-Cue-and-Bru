# Cafe Cue & Brew (कैफे क्यू & ब्रेव) — Premium Rooftop Cafe & Snooker Lounge Website

A client-presentation demo built specifically for **Cafe Cue & Brew**, a 7th-floor rooftop cafe and snooker lounge in Pune (above Amigos Gym, opposite Sinhgad Campus, Vadgaon Budruk).

Designed with a midnight navy, espresso, warm cream, and gold accent aesthetic, tailored for sunset-to-night rooftop dining and tournament cue sports.

---

## 🌟 Highlights & Key Features

### 1. Brand Identity & Visual Language
- **Brand Name**: Cafe Cue & Brew (कैफे क्यू & ब्रेव)
- **Tagline**: *Great Food. Good View. Better Company.*
- **Custom Brand Mark**: Hand-crafted SVG combining the snooker 8-ball & cue stick with steaming coffee aroma, rimmed in radiant gold.
- **Color Palette**: Midnight Navy (`#0B111E`), Deep Espresso (`#1A120C`), Warm Cream (`#FAF6F0`), and Metallic Gold (`#D4AF37`, `#FCE08B`).
- **Typography**: Google Fonts (*Cinzel* & *Playfair Display* for luxury titles; *Plus Jakarta Sans* for clean, modern readability).

### 2. Premium Navbar Redesign
- **Desktop Navbar**:
  - Refined brand identity with circular emblem, bilingual branding (`Cafe Cue & Brew` / `कैफे क्यू & ब्रेव`), and location tag (`7th Floor Sinhgad Campus, Pune`).
  - Balanced pill navigation links: `Home`, `Menu`, `Experience`, `Snooker`, `About`, `Contact`.
  - Dynamic scroll state: subtle floating glass when over the hero; switches smoothly to an obsidian backdrop blur (`bg-[#0B111E]/92 backdrop-blur-xl border-b border-amber-500/20`) when scrolling.
  - Quick desk phone button (`Call: 0788 774 5344`) and primary gold `Book a Table` CTA.
- **Mobile Navbar**:
  - Compact header with brand logo & toggle button.
  - Slide-in drawer with body-scroll locking and `Escape` key support.
  - Accessible close button, clean list of links, primary reservation button, and direct call action.

### 3. Unified Button & Interactive Control System (`src/components/ui/Button.tsx`)
- **Primary**: Sophisticated warm gold gradient (`#F0C961` to `#B68C1F`) with dark navy text, subtle ambient gold glow, and tactile press feedback.
- **Secondary**: Deep dark surface (`#121927`) with stone border that illuminates amber on hover.
- **Outline**: Transparent glass with golden border (`border-amber-500/40`) and amber text.
- **Ghost**: Minimalist hover background for tertiary actions.
- **Danger**: Dark red accent for destructive/clear actions.
- **Consistency**: All buttons across Navbar, Hero, Digital Menu, Quick View, Order Drawer, Snooker, Table Booking, Contact, and Footer use consistent heights, padding, focus rings, and loading indicators.

### 4. Real Reservation Email Backend & Notification Pipeline
- **Backend Architecture**:
  - Node/Express endpoint (`/api/reservations`) and Vite dev server middleware so it works seamlessly during both `npm run dev` and in production.
  - Server-side rate limiting (max 6 requests per IP per 10 minutes) & duplicate prevention / idempotency.
  - Input validation (name, 10-digit mobile number, valid upcoming date, party size, optional email).
  - Persistent storage in `data/reservations.json` with unique booking reference code (`CCB-XXXXXX`).
  - Transactional email dispatch via **Resend**:
    - Dispatches to `BOOKING_TO_EMAIL=shivsaai2010@gmail.com` (configurable in `.env`).
    - Beautiful branded HTML email with guest details, party size, seating preference, special notes, and pre-selected demo dishes.
    - Honest status handling: distinguishes `REQUEST_RECEIVED`, `EMAIL_SENT`, `EMAIL_PENDING_CONFIG`, and `PENDING_REVIEW`.

### 5. High-Quality, Relevant Food Photography (100% Locally Stored)
- **70+ curated, high-resolution food & ambience photographs** downloaded and organized locally in `public/images/`.
- Every single milkshake (11 flavors), mojito (5 flavors), burger (5 variations), momo (5 styles), pizza, and maggie has its own dedicated, honest image match.
- Includes smoking hot **Sizzling Brownie** and the multi-tiered **FREYO Tower**.

### 6. Interactive Digital Menu (15 Categories)
- **Categories**: Starters, Hot Beverages, Cold Beverages, Sandwiches, Fries, Mojitos, Burger Menu, Chocolate Fun, Milkshakes, Momos, Pizza, Maggie, Sizzling Brownie, Sizzling Burger, and FREYO Tower.
- **Interactive Search**: Real-time fuzzy filtering across dish names, ingredients, and categories.
- **Dietary Filter Badges**: All, Pure Veg, Non-Veg, Beverages, and Desserts.
- **Quick View Modal**: Click any card for high-resolution photography, ingredients breakdown, and variant selection.
- **Table Order Estimator Tray**: Interactive demo tray allowing guests to estimate their meal total and transfer the items directly into their table booking request.

---

## 🔧 Environment Variables Configuration

Create or modify `.env` in the root directory:

```env
# Destination inbox for table reservation notifications
# (Currently set for development/demo testing; can be switched to cafe owner's email)
BOOKING_TO_EMAIL=shivsaai2010@gmail.com

# Transactional Email Provider API Key (Resend: https://resend.com)
# When provided, notifications are automatically dispatched live to BOOKING_TO_EMAIL
RESEND_API_KEY=

# Verified sender email address in Resend
# Default "onboarding@resend.dev" works for testing with Resend accounts
BOOKING_FROM_EMAIL=onboarding@resend.dev

# Standalone Server Port
PORT=3001
```

---

## 🚀 How to Run the Project

### 1. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser. Both frontend and `/api/reservations` are live.

### 2. Build for Production
```bash
npm run build
```

### 3. Run Production Preview
```bash
npm run preview
```
Open [http://localhost:4173](http://localhost:4173).

### 4. Run Standalone Node/Express Server
```bash
npm run start:server
```
Runs the standalone backend server on [http://localhost:3001](http://localhost:3001).

---

## 🧪 How to Test an Actual Booking Request
1. Scroll down to the **Reserve Your Rooftop Table** section (or click **Book a Table** in the navbar).
2. Select your desired date, time slot, party size, and seating area.
3. Fill in your name, mobile number (10 digits), and optional notes.
4. Click **Submit Table Reservation Request**.
5. The request is processed by the server:
   - A unique reference code (`CCB-XXXXXX`) is generated.
   - The booking is stored in `data/reservations.json`.
   - If `RESEND_API_KEY` is present in `.env`, a live notification email is sent to `shivsaai2010@gmail.com`.
   - If `RESEND_API_KEY` is not yet configured, the server records the reservation and reports `EMAIL_PENDING_CONFIG` with full setup instructions.
   - The confirmation screen explicitly reminds the guest: *"Your table is not confirmed yet. The cafe will contact you after reviewing your request."*
