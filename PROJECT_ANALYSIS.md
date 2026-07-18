# Ordrji Landing Page — Full Project Analysis

> **Generated:** July 2026  
> **Project:** `ordrji-landing-page` — Next.js 16 · React 19 · TypeScript

---

## Table of Contents

1. [Tech Stack](#1-tech-stack)
2. [Project Structure Overview](#2-project-structure-overview)
3. [Homepage Sections (page.tsx render order)](#3-homepage-sections-pagetsx-render-order)
4. [All Components — Status Table](#4-all-components--status-table)
5. [Pages / Routes — Complete Audit](#5-pages--routes--complete-audit)
6. [✅ Pages Created (Full Content)](#6--pages-created-full-content)
7. [⚠️ Pages Created (Stub / Placeholder)](#7-️-pages-created-stub--placeholder)
8. [❌ Pages Missing (Linked but 404)](#8--pages-missing-linked-but-404)
9. [API Routes](#9-api-routes)
10. [Public Assets](#10-public-assets)
11. [Footer & Navbar Link Audit](#11-footer--navbar-link-audit)
12. [Priority Fix List](#12-priority-fix-list)

---

## 1. Tech Stack

| Item | Version |
|---|---|
| Next.js | 16.2.9 |
| React | 19.2.4 |
| TypeScript | ^5 |
| Framer Motion | ^12.40.0 |
| Lucide React | ^1.20.0 |
| Nodemailer | ^9.0.1 |
| Styling | Global CSS (`globals.css`) + inline `<style>` tags |
| Email delivery | Resend API (primary) → SMTP Nodemailer (fallback) → console log (dev) |

---

## 2. Project Structure Overview

```
ordrji landingpage/
├── public/                        ← Static assets
│   ├── logo.jpg / logo-icon.jpg
│   ├── hero.png
│   ├── chef.png
│   ├── command_center.png
│   ├── eco-*.jpg/png              ← Ecosystem section images
│   └── journey-*.jpg/png         ← Order journey step images
│
├── src/
│   ├── app/
│   │   ├── page.tsx               ← Homepage (main landing page)
│   │   ├── layout.tsx             ← Root layout (Inter font, metadata)
│   │   ├── globals.css            ← Global design tokens & base styles
│   │   └── api/
│   │       └── book-demo/
│   │           └── route.ts       ← POST /api/book-demo
│   │
│   └── components/                ← All 15 UI components
│       ├── Navbar.tsx
│       ├── Hero.tsx
│       ├── BookDemoModal.tsx
│       ├── TrustBar.tsx
│       ├── CommandCenter.tsx
│       ├── OrderJourney.tsx
│       ├── Ecosystem.tsx
│       ├── ModulesShowcase.tsx
│       ├── RoleExperience.tsx
│       ├── Inventory.tsx
│       ├── SuccessStories.tsx
│       ├── RoiCalculator.tsx
│       ├── Pricing.tsx
│       ├── Comparison.tsx
│       ├── Faq.tsx
│       ├── Footer.tsx
│       ├── InstagramSection.tsx
│       └── FinalCTA.tsx
```

---

## 3. Homepage Sections (page.tsx render order)

These are the sections actually rendered on the `/` homepage, in order:

| # | Component | Section Description | Status |
|---|---|---|---|
| 1 | `Navbar` | Fixed top nav — logo, links, Book Demo, Start Free Trial | ✅ Done |
| 2 | `Hero` | Cinematic image slider background, headline, CTA buttons, metrics | ✅ Done |
| 3 | `Problems` | 4 pain-point cards (why legacy POS fails) | ✅ Done |
| 4 | `TrustBar` | "Trusted By" marquee belt with restaurant logos | ✅ Done |
| 5 | `OrderJourney` | 9-step horizontal scrolling order journey cards | ✅ Done |
| 6 | `ModulesShowcase` | 6-module card grid — QR, KDS, Billing, CRM, Inventory, Analytics | ✅ Done |
| 7 | `Integrations` | Animated orbital diagram of integrations | ✅ Done |
| 8 | `Ecosystem` | Restaurant ecosystem SVG orbital + stat counters | ✅ Done |
| 9 | `RoleExperience` | 5-role tabbed experience preview | ✅ Done |
| 10 | `CommandCenter` | Live dashboard / command center mockup | ✅ Done |
| 11 | `Pricing` | Pricing plans with billing toggle | ✅ Done |
| 12 | `Comparison` | Ordrji vs Legacy POS comparison table | ✅ Done |
| 13 | `SuccessStories` | Auto-cycling testimonial carousel | ✅ Done |
| 14 | `Faq` | Accordion FAQ section | ✅ Done |
| 15 | `InstagramSection` | Instagram post feed strip with Follow button | ✅ Done |
| 16 | `FinalCTA` | Final call-to-action — Book Demo / Start Trial | ✅ Done |
| 17 | `Footer` | Full site footer with nav, newsletter, socials | ✅ Done |
| — | `BookDemoModal` | Lead capture form modal (triggered by nav + CTA buttons) | ✅ Done |

**Components built but NOT on homepage:**
- `RoiCalculator` — built, not currently rendered anywhere on page
- `Inventory` — standalone component, not on main page

---

## 4. All Components — Status Table

| Component File | Purpose | On Homepage | Has Real Content |
|---|---|---|---|
| `Navbar.tsx` | Top navigation bar | ✅ Yes | ✅ Yes |
| `Hero.tsx` | Hero section | ✅ Yes | ✅ Yes |
| `BookDemoModal.tsx` | Lead capture form modal | ✅ Yes | ✅ Yes |
| `TrustBar.tsx` | Trust / logos marquee | ✅ Yes | ✅ Yes |
| `CommandCenter.tsx` | Dashboard command center | ✅ Yes | ✅ Yes |
| `OrderJourney.tsx` | 9-step order flow | ✅ Yes | ✅ Yes |
| `Ecosystem.tsx` | Restaurant ecosystem orbital | ✅ Yes | ✅ Yes |
| `ModulesShowcase.tsx` | 6-module feature grid | ✅ Yes | ✅ Yes |
| `RoleExperience.tsx` | 5-role tabbed preview | ✅ Yes | ✅ Yes |
| `Integrations.tsx` | Integration partners orbital | ✅ Yes | ✅ Yes |
| `Pricing.tsx` | Pricing plans | ✅ Yes | ✅ Yes |
| `Comparison.tsx` | Ordrji vs Legacy POS table | ✅ Yes | ✅ Yes |
| `SuccessStories.tsx` | Testimonial carousel | ✅ Yes | ✅ Yes |
| `Faq.tsx` | FAQ accordion | ✅ Yes | ✅ Yes |
| `InstagramSection.tsx` | Instagram feed section | ✅ Yes | ✅ Yes (placeholder posts) |
| `FinalCTA.tsx` | Final CTA section | ✅ Yes | ✅ Yes |
| `Footer.tsx` | Site footer | ✅ Yes | ✅ Yes |
| `Inventory.tsx` | Inventory showcase | ❌ Not rendered | ✅ Built |
| `RoiCalculator.tsx` | ROI calculator sliders | ❌ Not rendered | ✅ Built |

---

## 5. Pages / Routes — Complete Audit

This is the master list of every internal route linked anywhere in the project (navbar, footer, buttons, CTAs) and whether a page actually exists.

---

## 6. ✅ Pages Created (Full Content)

These routes have a real `page.tsx` with full built content:

| Route | Page Description | Linked From |
|---|---|---|
| `/` | Full landing page (17 sections) | Everywhere |
| `/api/book-demo` | POST API — sends demo booking email | BookDemoModal form |

> **Note:** This project is a **single-page landing site**. As of analysis, only the homepage `/` and the API route `/api/book-demo` exist under `src/app/`. All other routes listed in the footer and navbar point to external URLs or are placeholder `href="#"` anchors.

---

## 7. ⚠️ Pages Created (Stub / Placeholder)

These are links that exist in the navigation or footer that currently go nowhere or point to `#`:

| Route / Link | Where It's Linked | Current Behavior |
|---|---|---|
| `/about` | Footer "Company" column | ❌ Placeholder `href="#"` — no page |
| `/how-to-use` | Footer "Company" column | ❌ Placeholder `href="#"` — no page |
| `/blog` | Footer "Company" column | ❌ Placeholder `href="#"` — no page |
| `/contact` | Footer "Company" column | ❌ Placeholder `href="#"` — no page |
| `/privacy` | Footer bottom bar, Footer "Company" | ❌ Placeholder `href="#"` — no page |
| `/terms` | Footer bottom bar, Footer "Company" | ❌ Placeholder `href="#"` — no page |
| `https://pos.ordrji.com/login` | Navbar "Start Free Trial", Hero CTA | ✅ External link (fine) |
| `https://www.instagram.com/ordrji/` | Instagram section | ✅ External link (fine) |

### Navbar anchor links (scroll to section)

These are `href="#section-id"` links — they work if the section has the matching `id` attribute:

| Link | Target ID | Status |
|---|---|---|
| `#features` | OS Platform section | ⚠️ Check if `id="features"` exists on target section |
| `#journey` | Order Journey section | ⚠️ Check if `id="journey"` exists |
| `#floor` | Live Floor section | ⚠️ Check if `id="floor"` exists |
| `#crm` | Growth Engine section | ⚠️ Check if `id="crm"` exists |
| `#roi` | ROI Calculator (not on page!) | ❌ Section removed from homepage |
| `#pricing` | Pricing section | ⚠️ Check if `id="pricing"` exists |

---

## 8. ❌ Pages Missing (Linked but 404)

These routes are **actively linked** from the footer or navbar but have **zero page files** under `src/app/`:

| Route | Linked From | Priority | Notes |
|---|---|---|---|
| `/about` | Footer — Company column | 🔴 High | Core trust page for a B2B SaaS |
| `/contact` | Footer — Company column | 🔴 High | Sales contact essential |
| `/blog` | Footer — Company column | 🟡 Medium | Content marketing / SEO |
| `/privacy` | Footer bottom bar | 🔴 High | Legal requirement |
| `/terms` | Footer bottom bar | 🔴 High | Legal requirement |
| `/how-to-use` | Footer — Company column | 🟡 Medium | Customer success / onboarding |
| `/pricing` | Navbar | 🟡 Medium | Has section on homepage but no standalone page |

### Footer nav columns — full link audit

#### Product column
| Label | href | Status |
|---|---|---|
| Billing Engine | `#features` | ⚠️ Anchor only |
| QR Order Journey | `#journey` | ⚠️ Anchor only |
| Kitchen Display (KDS) | `#features` | ⚠️ Anchor only |
| Inventory Control | `#features` | ⚠️ Anchor only |
| Marketing Automation | `#crm` | ⚠️ Anchor only |
| Analytics Suite | `#features` | ⚠️ Anchor only |

#### Solutions column
| Label | href | Status |
|---|---|---|
| Fine Dining | `#` | ❌ Dead link |
| Cafes & Bistros | `#` | ❌ Dead link |
| Cloud Kitchens | `#` | ❌ Dead link |
| Quick Service (QSR) | `#` | ❌ Dead link |
| Franchise Chains | `#` | ❌ Dead link |

#### Company column
| Label | href | Is Next.js `<Link>`? | Status |
|---|---|---|---|
| About Us | `/about` | ✅ Yes | ❌ No page exists |
| User Guides | `/how-to-use` | ✅ Yes | ❌ No page exists |
| Blog | `/blog` | ✅ Yes | ❌ No page exists |
| Contact Us | `/contact` | ✅ Yes | ❌ No page exists |
| Privacy Policy | `/privacy` | ✅ Yes | ❌ No page exists |
| Terms & Conditions | `/terms` | ✅ Yes | ❌ No page exists |

---

## 9. API Routes

| Route | Method | Purpose | Status |
|---|---|---|---|
| `/api/book-demo` | `POST` | Receives form data, sends email via Resend or SMTP | ✅ Built |

### Email delivery chain (route.ts):
```
1. RESEND_API_KEY env var set?  → Send via Resend API  (resend.com)
2. SMTP_HOST + SMTP_USER + SMTP_PASS set? → Send via Nodemailer SMTP
3. Neither set (dev)? → Log to console, return success:true
```

### Required environment variables
| Variable | Required For | Set? |
|---|---|---|
| `RESEND_API_KEY` | Resend email delivery | ⚠️ Unknown — check `.env.local` |
| `SMTP_HOST` | SMTP email delivery | ⚠️ Unknown — check `.env.local` |
| `SMTP_PORT` | SMTP email delivery | ⚠️ Unknown |
| `SMTP_USER` | SMTP auth | ⚠️ Unknown |
| `SMTP_PASS` | SMTP auth | ⚠️ Unknown |

---

## 10. Public Assets

| File | Used In | Status |
|---|---|---|
| `logo.jpg` | Footer | ✅ |
| `logo-icon.jpg` | Navbar, favicon | ✅ |
| `hero.png` | Hero section | ✅ |
| `chef.png` | (available, usage check needed) | ⚠️ |
| `command_center.png` | CommandCenter component | ✅ |
| `eco-billing.jpg` | Ecosystem section | ✅ |
| `eco-kitchen.jpg` | Ecosystem section | ✅ |
| `eco-marketing.png` | Ecosystem section | ✅ |
| `eco-staff.jpg` | Ecosystem section | ✅ |
| `journey-1-qr-scan-female.png` | OrderJourney | ✅ |
| `journey-2-qr-scan-male.png` | OrderJourney | ✅ |
| `journey-3-waiter-order.jpg` | OrderJourney | ✅ |
| `journey-4-chef-kds.jpg` | OrderJourney | ✅ |
| `journey-5-pos-payment.png` | OrderJourney | ✅ |
| `journey-7-crm-dashboard.png` | OrderJourney | ✅ |
| `journey-7-loyalty.png` | OrderJourney | ✅ |
| `journey-8-admin-pc.jpg` | OrderJourney | ✅ |
| `journey-8-crm.jpg` | OrderJourney | ✅ |
| `journey-9-campaign.png` | OrderJourney | ✅ |
| `journey-9-campaigns.png` | OrderJourney | ✅ |

**Instagram posts:** Currently using Unsplash placeholder images. Real posts need to be swapped in the `POSTS` array in `InstagramSection.tsx`.

---

## 11. Footer & Navbar Link Audit

### Navbar links
| Label | href | Type | Status |
|---|---|---|---|
| OS Platform | `#features` | Anchor | ⚠️ Needs `id="features"` on section |
| Order Journey | `#journey` | Anchor | ⚠️ Needs `id="journey"` on section |
| Live Floor | `#floor` | Anchor | ⚠️ Needs `id="floor"` on section |
| Growth Engine | `#crm` | Anchor | ⚠️ Needs `id="crm"` on section |
| ROI Calculator | `#roi` | Anchor | ❌ Section not on homepage |
| Pricing | `#pricing` | Anchor | ⚠️ Needs `id="pricing"` on section |
| Book Demo (btn) | Opens modal | Modal trigger | ✅ Works |
| Start Free Trial (btn) | `https://pos.ordrji.com/login` | External | ✅ Works |

### Social links (Footer)
| Platform | href | Status |
|---|---|---|
| Instagram | `#` | ❌ Not set — should be `https://www.instagram.com/ordrji/` |
| LinkedIn | `#` | ❌ Not set |
| Twitter/X | `#` | ❌ Not set |
| YouTube | `#` | ❌ Not set |

---

## 12. Priority Fix List

### 🔴 Critical (broken / legal)

| # | Task | File to edit |
|---|---|---|
| 1 | Create `/privacy` page | `src/app/privacy/page.tsx` |
| 2 | Create `/terms` page | `src/app/terms/page.tsx` |
| 3 | Create `/contact` page | `src/app/contact/page.tsx` |
| 4 | Fix social media links in footer (all are `#`) | `src/components/Footer.tsx` |
| 5 | Set up `RESEND_API_KEY` or SMTP env vars so demo form emails actually send | `.env.local` |

### 🟡 Important (trust & SEO)

| # | Task | File to edit |
|---|---|---|
| 6 | Create `/about` page | `src/app/about/page.tsx` |
| 7 | Fix `#roi` navbar link (RoiCalculator not on homepage) | `src/components/Navbar.tsx` |
| 8 | Fix Solutions footer links (all `href="#"`) | `src/components/Footer.tsx` |
| 9 | Create `/blog` page or remove link | `src/app/blog/page.tsx` |
| 10 | Add `id="features"`, `id="journey"`, `id="floor"`, `id="crm"`, `id="pricing"` to correct sections | `src/app/page.tsx` |

### 🟢 Nice to have

| # | Task | File to edit |
|---|---|---|
| 11 | Create `/how-to-use` page | `src/app/how-to-use/page.tsx` |
| 12 | Add `RoiCalculator` back to homepage or create `/roi` page | `src/app/page.tsx` |
| 13 | Swap Instagram placeholder images with real `@ordrji` posts | `src/components/InstagramSection.tsx` |
| 14 | Set real Instagram profile URL in `InstagramSection.tsx` `IG_PROFILE_URL` | `src/components/InstagramSection.tsx` |
| 15 | Create individual solution pages (`/solutions/fine-dining`, etc.) | `src/app/solutions/*/page.tsx` |
| 16 | Decide what to do with `Inventory.tsx` and `RoiCalculator.tsx` (add to page or remove builds) | `src/app/page.tsx` |

---

## Summary Scorecard

| Category | Count |
|---|---|
| ✅ Homepage sections built & rendered | 17 |
| ✅ Components built (total) | 19 |
| ✅ Components not yet rendered on page | 2 |
| ✅ API routes working | 1 |
| ❌ Internal pages linked but missing | 6 |
| ❌ Dead `href="#"` footer links | 5 (Solutions) + 4 (Social) |
| ⚠️ Anchor links that may not scroll correctly | 6 |
| ⚠️ Env variables to configure for production | 5 |

---

*This document was auto-generated by full project analysis. Update after each sprint.*
