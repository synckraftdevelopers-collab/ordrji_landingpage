# Ordrji Landing Page — Data Guide

A complete map of every piece of data collected, stored, and processed across this website.

---

## Quick Summary

| Data Source | What's Collected | Where It Goes |
|---|---|---|
| Book Demo form | Name, email, phone, location, restaurant name, message | Email to `grow@synckraft.in` |
| Register Restaurant form | Full restaurant profile (20+ fields) | ⚠️ Currently discarded (stub) |
| Blog comments | Name + comment text | Browser `localStorage` only |
| Admin login | Email + password | Sets 4 browser cookies |
| Blog system | Full blog posts, revisions, media, logs | JSON files on disk |
| Hero location picker | City/state selection | `sessionStorage` (one-time use) |

---

## 1. Book Demo Form

**File:** `src/components/BookDemoModal.tsx`  
**API:** `src/app/api/book-demo/route.ts`

### Fields Collected

| Field | Type | Required | Validation |
|---|---|---|---|
| `fullName` | string | ✅ | Non-empty |
| `email` | string | ✅ | Valid email format |
| `phone` | string | ✅ | Non-empty |
| `location` | string | ✅ | Non-empty (city/state autocomplete) |
| `restaurantName` | string | ❌ optional | — |
| `message` | string | ❌ optional | — |

### What Happens to the Data

```
User submits → POST /api/book-demo
  ├── Sends notification email to grow@synckraft.in
  └── Sends thank-you email to the user's email address
```

Email is sent via (in priority order):
1. **Resend API** — if `RESEND_API_KEY` environment variable is set
2. **SMTP / Nodemailer** — if `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` are set
3. **Console log only** — development fallback when no credentials are configured

> ⚠️ **No database storage.** Lead data is only emailed — nothing is saved to disk or any database.

### Required Environment Variables

```env
# Option A — Resend
RESEND_API_KEY=re_xxxxxxxxxxxx

# Option B — SMTP
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=you@example.com
SMTP_PASS=yourpassword
```

---

## 2. Register Restaurant Form

**File:** `src/components/restaurant/RegistrationForm.tsx`  
**Validation:** `src/components/restaurant/FormValidation.ts`

### Fields Collected

#### Section 1 — Restaurant Info
| Field | Type | Required | Validation |
|---|---|---|---|
| `restaurantName` | string | ✅ | Min 2 characters |
| `ownerName` | string | ✅ | Min 2 characters |
| `email` | string | ✅ | Valid email address |
| `phone` | string | ✅ | Indian mobile: `[6-9]\d{9}` |
| `address` | string | ✅ | Min 5 characters |
| `city` | string | ✅ | Min 2 characters |
| `district` | string | ✅ | Min 2 characters |
| `state` | string | ✅ | Min 2 characters |
| `pincode` | string | ✅ | Exactly 6 digits |

#### Section 2 — Cuisine & Menu
| Field | Type | Required | Notes |
|---|---|---|---|
| `cuisineType` | string | ✅ | Searchable dropdown (20 options) |
| `restaurantType` | `"veg" \| "nonveg" \| "both"` | ✅ | Radio pills |
| `selectedDishes` | string[] | ❌ optional | Multi-select tags (not in Zod schema) |

#### Section 3 — Branding
| Field | Type | Notes |
|---|---|---|
| `logo` | base64 image string | Client state only |
| `cover` | base64 image string | Client state only |

#### Section 4 — Online Ordering
| Field | Type | Required | Validation |
|---|---|---|---|
| `swiggyUrl` | string | ❌ optional | Must start with `https://` |
| `zomatoUrl` | string | ❌ optional | Must start with `https://` |

#### Section 5 — Business Details
| Field | Type | Required | Validation |
|---|---|---|---|
| `openingTime` | time string | ✅ | — |
| `closingTime` | time string | ✅ | — |
| `avgCostForTwo` | string | ✅ | Numeric (₹) |
| `gstNumber` | string | ❌ optional | — |
| `fssaiNumber` | string | ❌ optional | Max 14 characters |
| `website` | string | ❌ optional | Must start with `https://` |

#### Section 6 — Terms
| Field | Type | Required |
|---|---|---|
| `confirmAccuracy` | `true` (literal) | ✅ Must be checked |
| `agreeTerms` | `true` (literal) | ✅ Must be checked |

### What Happens to the Data

> ⚠️ **Currently a demo stub.** The `onSubmit` handler simulates a 1.8s delay then shows a success modal. No API call is made — all collected data is discarded.

**To implement real storage**, replace the stub in `RegistrationForm.tsx`:

```ts
// Current stub (lines ~230–238)
const onSubmit = async (data: RegistrationFormData) => {
  setSubmitting(true);
  await new Promise(r => setTimeout(r, 1800)); // ← replace this
  setSubmittedName(data.restaurantName);
  setSubmitting(false);
  setSuccess(true);
};

// Replace with a real API call:
const onSubmit = async (data: RegistrationFormData) => {
  setSubmitting(true);
  const res = await fetch("/api/register-restaurant", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  setSubmitting(false);
  if (result.success) {
    setSubmittedName(data.restaurantName);
    setSuccess(true);
  }
};
```

---

## 3. Blog Comment System

**File:** `src/components/CommentsSection.tsx`

### Fields Collected

| Field | Type | Source |
|---|---|---|
| `name` | string | User input |
| `comment` | string | User input |
| `date` | string | Auto-generated (browser date) |
| `id` | string | `"comment-" + Date.now()` |

### Storage

```
localStorage key: ordrji_comments_${blogId}
Value: JSON array of Comment objects
```

```ts
interface Comment {
  id: string;
  name: string;
  comment: string;
  date: string;  // e.g. "June 29, 2026"
}
```

> ⚠️ **Client-side only.** Comments are stored in the visitor's browser `localStorage`. They are lost when the user clears browser data, and are invisible to other users or the server.

---

## 4. Admin Authentication

**Login API:** `src/app/api/auth/login/route.ts`  
**Logout API:** `src/app/api/auth/logout/route.ts`  
**Middleware:** `src/middleware.ts`

### Login Request

```json
{ "email": "admin@ordrji.com", "password": "Admin@123" }
```

### Cookies Set on Login

| Cookie Name | Value | Purpose |
|---|---|---|
| `ordrji_logged_in` | `"true"` | Auth gate flag |
| `ordrji_role` | e.g. `"Admin"` | Role-based access control |
| `ordrji_username` | display name | Used in activity logs |
| `ordrji_user_email` | email address | Stored in cookie |

All cookies use `path: "/"`. **No `httpOnly`, `secure`, or `sameSite` flags are set.**

### User Roles

| Role | Access Level |
|---|---|
| `Super Admin` | Full access — create, edit, delete, purge, manage users |
| `Admin` | Create/edit blogs, manage media, view logs |
| `Restaurant Owner` | Read-only (redirected to `/dashboard/denied`) |
| `Manager` | Read-only (redirected to `/dashboard/denied`) |
| `Cashier` | Read-only (redirected to `/dashboard/denied`) |
| `Waiter` | Read-only (redirected to `/dashboard/denied`) |
| `Visitor` | Unauthenticated — redirected to `/blog` |

### Middleware Protection

Routes under `/dashboard/admin/*` are protected:
- Not logged in → redirected to `/blog`
- Wrong role → redirected to `/dashboard/denied?role=<role>`

---

## 5. Blog CMS — File-Based Database

**Utility:** `src/utils/db.ts`  
**Storage:** `src/data/db/*.json` (flat JSON files on disk)

### Database Tables

#### `users.json` — Admin Accounts

```ts
{
  id: string;           // e.g. "user-super"
  email: string;        // login email
  password: string;     // ⚠️ PLAIN TEXT — no hashing
  name: string;
  role: string;         // one of the 8 roles above
  avatar: string;       // image URL
  designation: string;
  bio: string;
}
```

**Seeded accounts:**

| Email | Password | Role |
|---|---|---|
| `superadmin@ordrji.com` | `Super@123` | Super Admin |
| `admin@ordrji.com` | `Admin@123` | Admin |
| `owner@ordrji.com` | `Owner@123` | Restaurant Owner |
| `manager@ordrji.com` | `Manager@123` | Manager |
| `cashier@ordrji.com` | `Cashier@123` | Cashier |
| `waiter@ordrji.com` | `Waiter@123` | Waiter |

---

#### `blogs.json` — Blog Posts

```ts
{
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;            // HTML string
  coverImage: string;         // image URL
  galleryImages: string[];
  videos: string[];
  categoryId: string;
  tags: string[];             // array of tag IDs
  isFeatured: boolean;
  status: "Draft" | "Pending Review" | "Approved" | "Scheduled"
        | "Published" | "Archived" | "Deleted";

  // SEO
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
  ogImage: string;
  keywords: string[];
  robots: string;
  articleSchema: string;      // JSON-LD string
  breadcrumbSchema: string;   // JSON-LD string
  faqSchema: { q: string; a: string }[];

  // Authorship
  createdBy: string;
  lastEditedBy: string;
  approvedBy?: string;

  // Timestamps
  createdDate: string;
  createdTime: string;
  lastUpdatedDate: string;
  lastUpdatedTime: string;
  publishedDate?: string;
  publishedTime?: string;
  scheduledPublishDate?: string;
  archivedDate?: string;
  deletedDate?: string;
  timezone: string;
  readingTime: string;
}
```

---

#### `authors.json` — Blog Authors

```ts
{
  id: string;
  name: string;
  avatar: string;       // image URL
  designation: string;
  bio: string;
}
```

---

#### `categories.json` — Blog Categories

```ts
{
  id: string;
  name: string;
  slug: string;
  description: string;
  isEnabled: boolean;
}
```

Default categories: `Technology`, `Operations`, `Management`, `Marketing`

---

#### `tags.json` — Blog Tags

```ts
{
  id: string;
  name: string;
  slug: string;
}
```

Default tags: `POS Systems`, `Inventory`, `Billing`, `Restaurant Operations`, `QR Ordering`

---

#### `revisions.json` — Blog Version History

```ts
{
  id: string;
  blogId: string;
  versionNumber: number;
  editedBy: string;
  editedOnDate: string;
  editedOnTime: string;
  summaryOfChanges: string;
  data: BlogPost;   // full snapshot of the blog at that version
}
```

---

#### `logs.json` — Admin Activity Audit Log

```ts
{
  id: string;
  user: string;
  role: string;
  action: string;     // e.g. "Created blog 'How QR Code Ordering...'"
  date: string;
  time: string;
  ipAddress: string;  // ⚠️ hardcoded "127.0.0.1" — not real client IP
  device: string;     // parsed from User-Agent
  browser: string;    // parsed from User-Agent
}
```

---

#### `media.json` — Uploaded Media Assets

```ts
{
  id: string;
  url: string;        // image URL
  name: string;       // filename
  type: string;       // MIME type e.g. "image/jpeg"
  size: number;       // file size in bytes
  uploadedAt: string; // date string
}
```

---

## 6. Session & Browser Storage

### `sessionStorage`

| Key | Set By | Read By | Purpose |
|---|---|---|---|
| `prefilled_location` | `Hero.tsx` (on CTA click with location selected) | `BookDemoModal.tsx`, `demo/page.tsx` | Pre-fills location field in the Book Demo form. Auto-cleared after first read. |

### `localStorage`

| Key Pattern | Set By | Value Type | Purpose |
|---|---|---|---|
| `ordrji_comments_${blogId}` | `CommentsSection.tsx` | `Comment[]` JSON | Stores blog comments per blog post. Client-side only. |

---

## 7. Blog CMS API Routes Summary

| Route | Method | Who Can Access | What It Does |
|---|---|---|---|
| `/api/auth/login` | POST | Anyone | Validates credentials, sets auth cookies |
| `/api/auth/logout` | POST | Anyone | Clears all auth cookies |
| `/api/blogs` | GET | Anyone | Lists blogs with filters |
| `/api/blogs` | POST | Admin, Super Admin | Creates a new blog post |
| `/api/blogs/[id]` | GET | Anyone | Gets a single blog |
| `/api/blogs/[id]` | PUT | Admin, Super Admin | Updates a blog, saves revision |
| `/api/blogs/[id]` | DELETE | Super Admin | Soft-deletes or purges a blog |
| `/api/blogs/[id]` | POST (restore) | Super Admin | Restores deleted blog to Draft |
| `/api/authors` | GET | Anyone | Lists all authors |
| `/api/categories` | GET | Anyone | Lists all categories |
| `/api/categories` | POST/PUT/DELETE | Super Admin | Manages categories |
| `/api/tags` | GET | Anyone | Lists all tags |
| `/api/tags` | POST/PUT/DELETE | Super Admin | Manages tags |
| `/api/media` | GET | Admin, Super Admin | Lists media assets |
| `/api/media` | POST | Admin, Super Admin | Adds a media asset record |
| `/api/logs` | GET | Admin, Super Admin | Views activity audit log |
| `/api/revisions` | GET | Admin, Super Admin | Views version history for a blog |
| `/api/revisions` | POST | Admin, Super Admin | Restores a blog to a saved revision |
| `/api/book-demo` | POST | Anyone | Sends lead email, no DB storage |

---

## 8. Known Issues & Recommendations

### 🔴 Critical

| Issue | Location | Fix |
|---|---|---|
| Passwords stored in plain text | `src/data/db/users.json`, `src/utils/db.ts` | Hash passwords with `bcrypt` before storage |
| Auth cookies lack security flags | `src/app/api/auth/login/route.ts` | Add `httpOnly: true, secure: true, sameSite: "strict"` |
| Registration form data is discarded | `src/components/restaurant/RegistrationForm.tsx` | Implement a real API route to save restaurant registrations |

### 🟡 Important

| Issue | Location | Fix |
|---|---|---|
| IP address hardcoded as `127.0.0.1` | `src/utils/db.ts` (`logActivity`) | Read real IP from `x-forwarded-for` header |
| File-based DB has no write locking | `src/utils/db.ts` | Use a real database (SQLite, PostgreSQL) or add a mutex |
| Blog comments only in localStorage | `src/components/CommentsSection.tsx` | Send comments to a server API for persistence |

### 🟢 To Implement

| Feature | Details |
|---|---|
| Restaurant registration API | Create `POST /api/register-restaurant` to persist form data |
| Lead database | Store Book Demo leads in `leads.json` or a real DB alongside emailing |
| Password reset | No password reset flow exists |
| Email verification | No email verification for registration |

---

## 9. Coverage & Compliance Widget

**File:** `src/components/Hero.tsx`

### What It Does

A location search bar in the Hero section. Users type their city, district, or state to check if Ordrji covers their area. When a location is selected, a contextual message appears:

- **City** → "Complete local POS setup, KOT printer routing, and offline billing cache are fully supported in `{city}`"
- **District** → "Local field onboarding, training sessions, and 24/7 technical hardware coverage are active across `{district}` District"
- **State/UT** → "Fully compliant with tax guidelines and local GST schemas for the State/UT of `{state}`"

### Current Data Storage

> ❌ **None.** The location lookup is purely client-side UI. No data is sent to any API, logged, or stored anywhere.

### Should This Data Be Stored?

**Yes — it should.** Every location a user searches is high-value product intelligence showing where demand exists, even in uncovered regions. Here's what to capture:

#### Recommended Storage Schema

```json
// src/data/db/coverage_searches.json
[
  {
    "id": "search-1751234567890",
    "query": "Bengaluru",
    "type": "city",
    "stateCode": "KA",
    "timestamp": "2026-07-04T10:30:00Z",
    "resultShown": "covered"
  }
]
```

| Field | Type | Notes |
|---|---|---|
| `id` | string | `"search-" + Date.now()` |
| `query` | string | Location name user selected |
| `type` | `"state" \| "district" \| "city"` | Level of the location |
| `stateCode` | string | e.g. `"KA"`, `"MH"` |
| `timestamp` | ISO string | When the search happened |
| `resultShown` | `"covered" \| "partial" \| "uncovered"` | What message was shown |

#### To Implement

Create `POST /api/coverage-search` and call it from `Hero.tsx` when a location is selected:

```ts
// In Hero.tsx — after locationDetails is set
fetch("/api/coverage-search", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    query: locationDetails.name,
    type: locationDetails.type,
    stateCode: locationDetails.stateCode,
  }),
});
```

> No user identifier is needed — this is anonymous aggregate data, not PII.

---

## 10. Instagram Feed

**File:** `src/components/InstagramSection.tsx`

### Current State

> ⚠️ **Fully hardcoded demo data.** The feed shows 6 stock photos from Unsplash. All `postUrl` links point to the generic Instagram profile `https://www.instagram.com/ordrji/` — not individual posts.

```ts
// Current hardcoded data (not real Instagram posts)
const POSTS = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
    alt: "Restaurant ambience with Ordrji POS",
    date: "6/2/2026",
    postUrl: "https://www.instagram.com/ordrji/",   // ← not a real post URL
  },
  // ... 5 more
];
```

### Should This Data Be Stored?

**Yes — Instagram post data should be fetched from the real API and cached locally.**

Instagram's API has rate limits. Hitting it on every page load would be slow and could get the app rate-limited. The correct approach is to fetch periodically (e.g. daily via a cron job or on-demand) and cache results in a JSON file.

#### Recommended Storage Schema

```json
// src/data/db/instagram.json
{
  "lastFetched": "2026-07-04T00:00:00Z",
  "posts": [
    {
      "id": "17854360229135492",
      "mediaUrl": "https://scontent.cdninstagram.com/v/...",
      "thumbnailUrl": "https://scontent.cdninstagram.com/v/...",
      "caption": "Ordrji QR ordering live at Chai & Bites Cafe 🍴",
      "permalink": "https://www.instagram.com/p/ABC123/",
      "timestamp": "2026-06-28T09:00:00Z",
      "mediaType": "IMAGE"
    }
  ]
}
```

| Field | Type | Source |
|---|---|---|
| `id` | string | Instagram Media ID |
| `mediaUrl` | string | Direct CDN image URL |
| `thumbnailUrl` | string | Thumbnail (for carousels/videos) |
| `caption` | string | Post caption text |
| `permalink` | string | Direct URL to the individual post |
| `timestamp` | ISO string | When the post was published |
| `mediaType` | `"IMAGE" \| "VIDEO" \| "CAROUSEL_ALBUM"` | Instagram media type |

#### To Connect the Real Instagram API

1. **Create a Facebook Developer App** at [developers.facebook.com](https://developers.facebook.com)
2. **Add Instagram Basic Display API** product
3. **Get a long-lived User Access Token** for the `@ordrji` account
4. **Add the token to `.env`:**

```env
INSTAGRAM_ACCESS_TOKEN=IGQVJXxxxxxxxxxxxxxxxx
```

5. **Create an API route** `src/app/api/instagram/route.ts` to fetch and cache posts:

```ts
// Fetch from Instagram Graph API
const res = await fetch(
  `https://graph.instagram.com/me/media?fields=id,caption,media_url,thumbnail_url,permalink,timestamp,media_type&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`
);
const data = await res.json();

// Cache to instagram.json
writeTable("instagram", { lastFetched: new Date().toISOString(), posts: data.data });
```

6. **Update `InstagramSection.tsx`** to fetch from `/api/instagram` instead of using the hardcoded `POSTS` array.

#### Quick Comparison

| | Current | Recommended |
|---|---|---|
| Data source | Hardcoded Unsplash images | Real Instagram Graph API |
| Post URLs | Generic profile link | Individual post permalinks |
| Updates | Never (manual code change) | Auto-cached daily |
| Storage | None | `src/data/db/instagram.json` |
| API rate limits | N/A | Protected by local cache |

---

## Summary: What Needs Storage vs What Has It

| Section | Collects Data | Currently Stored | Should Store | Priority |
|---|---|---|---|---|
| Book Demo form | Name, email, phone, location, message | ❌ Email only | ✅ Also save to DB | 🔴 High |
| Register Restaurant form | Full restaurant profile (20+ fields) | ❌ Discarded | ✅ Save to DB | 🔴 High |
| Coverage & Compliance search | City/state search queries | ❌ Nothing | ✅ Anonymous analytics | 🟡 Medium |
| Instagram Feed | Post images, captions, dates | ❌ Hardcoded | ✅ Cache real API data | 🟡 Medium |
| Blog comments | Name + comment text | ✅ localStorage only | ✅ Move to server DB | 🟡 Medium |
| Blog posts / CMS | Full blog content + metadata | ✅ JSON files | ✅ Already done | ✅ Done |
| Admin auth sessions | Login state + role | ✅ Cookies | — | ✅ Done |
| Activity logs | Admin actions | ✅ logs.json | — | ✅ Done |
| TrustBar stats | Static numbers | ❌ Hardcoded | ❌ No need (marketing copy) | — |
| Brand logos (TrustBar) | SVG icons | ❌ Hardcoded | ❌ No need | — |


---

*Last updated: July 2026*
