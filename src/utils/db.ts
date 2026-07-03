import fs from "fs";
import path from "path";

// ── Types ──────────────────────────────────────────────────────────────────

export interface UserAccount {
  id: string;
  email: string;
  name: string;
  role: "Visitor" | "Restaurant Owner" | "Manager" | "Cashier" | "Kitchen" | "Waiter" | "Admin" | "Super Admin";
  avatar: string;
  designation: string;
  bio: string;
}

export interface Author {
  id: string;
  name: string;
  avatar: string;
  designation: string;
  bio: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  isEnabled: boolean;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  coverImage: string;
  galleryImages: string[];
  videos: string[];
  categoryId: string;
  tags: string[]; // tag IDs
  isFeatured: boolean;
  status: "Draft" | "Pending Review" | "Approved" | "Scheduled" | "Published" | "Archived" | "Deleted";
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
  ogImage: string;
  keywords: string[];
  robots: string;
  articleSchema: string;
  breadcrumbSchema: string;
  faqSchema: { q: string; a: string }[];
  createdBy: string;
  lastEditedBy: string;
  approvedBy?: string;
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

export interface BlogRevision {
  id: string;
  blogId: string;
  versionNumber: number;
  editedBy: string;
  editedOnDate: string;
  editedOnTime: string;
  summaryOfChanges: string;
  data: BlogPost;
}

export interface BlogActivityLog {
  id: string;
  user: string;
  role: string;
  action: string;
  date: string;
  time: string;
  ipAddress?: string;
  device?: string;
  browser?: string;
}

export interface MediaAsset {
  id: string;
  url: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
}

// ── Path resolution ────────────────────────────────────────────────────────

const DB_DIR = path.join(process.cwd(), "src", "data", "db");

const FILES = {
  users: path.join(DB_DIR, "users.json"),
  authors: path.join(DB_DIR, "authors.json"),
  categories: path.join(DB_DIR, "categories.json"),
  tags: path.join(DB_DIR, "tags.json"),
  blogs: path.join(DB_DIR, "blogs.json"),
  revisions: path.join(DB_DIR, "revisions.json"),
  logs: path.join(DB_DIR, "logs.json"),
  media: path.join(DB_DIR, "media.json"),
};

// ── Default Seeding Data ───────────────────────────────────────────────────

// Seed database users with matching roles and passwords
const DEFAULT_USERS = [
  {
    id: "user-super",
    email: "superadmin@ordrji.com",
    password: "Super@123",
    name: "Rahul Sharma",
    role: "Super Admin",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150",
    designation: "Executive Editor & Partner",
    bio: "Rahul is a senior digital publisher overseeing operations at Ordrji's global channel."
  },
  {
    id: "user-admin",
    email: "admin@ordrji.com",
    password: "Admin@123",
    name: "Ananya Gupta",
    role: "Admin",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    designation: "Content Coordinator Manager",
    bio: "Ananya organizes direct guest marketing layouts and POS features copy guides."
  },
  {
    id: "user-owner",
    email: "owner@ordrji.com",
    password: "Owner@123",
    name: "Vikram Dev",
    role: "Restaurant Owner",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
    designation: "Franchise Owner",
    bio: "Vikram operates multi-unit cloud restaurant hubs."
  },
  {
    id: "user-manager",
    email: "manager@ordrji.com",
    password: "Manager@123",
    name: "Priya Sharma",
    role: "Manager",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150",
    designation: "Store General Manager",
    bio: "Priya manages shifts scheduling, registers billing cash flows, and daily raw stock variances."
  },
  {
    id: "user-cashier",
    email: "cashier@ordrji.com",
    password: "Cashier@123",
    name: "Aarav Singh",
    role: "Cashier",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    designation: "Front Desk Cashier",
    bio: "Aarav settles checkout checks, prints receipt slips, and processes card/UPI transactions."
  },
  {
    id: "user-waiter",
    email: "waiter@ordrji.com",
    password: "Waiter@123",
    name: "Neha Kapoor",
    role: "Waiter",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
    designation: "Dine-In Steward",
    bio: "Neha guides restaurant dining guests and routes orders to prep tables."
  }
];

const DEFAULT_AUTHORS: Author[] = [
  {
    id: "rohan-mehta",
    name: "Rohan Mehta",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150",
    designation: "Product Marketing Manager",
    bio: "Rohan is a dining technology advocate focusing on cloud integrations and customer acquisition paradigms."
  },
  {
    id: "priya-sharma",
    name: "Priya Sharma",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    designation: "Operations Director",
    bio: "Priya handles restaurant supply chain and food production planning, optimizing menu layout systems."
  },
  {
    id: "vikram-dev",
    name: "Vikram Dev",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
    designation: "Solutions Architect",
    bio: "Vikram advises multi-unit restaurants on billing printer topologies, POS database structures, and offline recovery."
  }
];

const DEFAULT_CATEGORIES: Category[] = [
  { id: "tech", name: "Technology", slug: "technology", description: "Restaurant billing hardware, POS, and digital tableside QR codes.", isEnabled: true },
  { id: "ops", name: "Operations", slug: "operations", description: "Kitchen operations, raw material consumption, and waste tracking.", isEnabled: true },
  { id: "mgmt", name: "Management", slug: "management", description: "Menu modeling, staff rosters, and financial audit controls.", isEnabled: true },
  { id: "mktg", name: "Marketing", slug: "marketing", description: "Direct SMS marketing, CRM loyalty cohorts, and brand awareness.", isEnabled: true }
];

const DEFAULT_TAGS: Tag[] = [
  { id: "pos", name: "POS Systems", slug: "pos-systems" },
  { id: "inventory", name: "Inventory", slug: "inventory" },
  { id: "billing", name: "Billing", slug: "billing" },
  { id: "ops-tag", name: "Restaurant Operations", slug: "restaurant-operations" },
  { id: "qr", name: "QR Ordering", slug: "qr-ordering" }
];

const DEFAULT_POSTS: BlogPost[] = [
  {
    id: "qr-ordering-increases-sales",
    title: "How QR Code Ordering Increases Average Bill Value by 22%",
    slug: "qr-ordering-increases-sales",
    description: "Discover why dine-in customers order more when they scan to order, and how cafes are streamlining service.",
    coverImage: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800",
    galleryImages: [
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600"
    ],
    videos: ["https://www.w3schools.com/html/mov_bbb.mp4"],
    categoryId: "tech",
    tags: ["pos", "qr", "billing"],
    isFeatured: true,
    status: "Published",
    seoTitle: "How QR Code Ordering Increases Average Bill Value by 22% | Ordrji Blog",
    seoDescription: "Unlock up to 22% higher average ticket values with contactless QR dining operations. Read real-world restaurant case studies.",
    canonicalUrl: "https://ordrji.com/blog/qr-ordering-increases-sales",
    ogImage: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800",
    keywords: ["QR Ordering", "POS", "Restaurant growth", "Ordrji"],
    robots: "index, follow",
    articleSchema: "{}",
    breadcrumbSchema: "{}",
    faqSchema: [
      { q: "Do customers need an app to scan?", a: "No, they scan using their stock iOS or Android camera app, launching a browser." },
      { q: "Does it support online payments?", a: "Yes, customers can pay directly via UPI, cards, or digital wallets at checkout." }
    ],
    createdBy: "Rohan Mehta",
    lastEditedBy: "Rohan Mehta",
    approvedBy: "Super Admin",
    createdDate: "28 June 2026",
    createdTime: "09:45 AM",
    lastUpdatedDate: "28 June 2026",
    lastUpdatedTime: "09:45 AM",
    publishedDate: "28 June 2026",
    publishedTime: "10:00 AM",
    timezone: "Asia/Kolkata",
    readingTime: "5 min read",
    content: `
      <p>Over the last two years, quick-scan table QR codes have shifted from a safety-first contactless precaution to a high-yielding sales tool. Indian restaurants, cafes, and bakeries are seeing average order values jump by 18% to 25% after migrating from waiter-only billing systems.</p>
      
      <h3 style="font-size:1.3rem; font-weight:800; margin:1.5rem 0 0.75rem; color:var(--text-primary);">Why Bill Values Rise</h3>
      <p>When customers have continuous, zero-pressure access to the menu via their own phone screen, several micro-interactions occur:</p>
      <ul style="margin:1rem 0; padding-left:1.5rem; display:flex; flex-direction:column; gap:0.5rem;">
        <li><strong>Frictionless Re-ordering:</strong> Deciding to order a second round of mocktails or a side of garlic bread takes exactly three taps. No trying to catch a busy waiter's eye.</li>
        <li><strong>Rich Visual Presentation:</strong> Digital menus showcase high-resolution photos of desserts and chef-specials, which trigger impulse orders.</li>
        <li><strong>Automated Upselling:</strong> The system automatically suggests pairings (e.g. "Add cheese crust for ₹50").</li>
      </ul>
      
      <h3 style="font-size:1.3rem; font-weight:800; margin:1.5rem 0 0.75rem; color:var(--text-primary);">Streamlined Kitchen Operations</h3>
      <p>Because QR orders flow directly into the Ordrji POS and digital KDS (Kitchen Display System), there are zero translation or transcription errors. Invoices are generated automatically, and split bills are handled instantly, saving cashiers hours of manual reconciliation.</p>
    `
  },
  {
    id: "inventory-practices-stop-waste",
    title: "5 Inventory Best Practices to Prevent Food Waste and Protect Margins",
    slug: "inventory-practices-stop-waste",
    description: "Food cost is the single biggest bottleneck in restaurant scaling. Learn how recipe-based depletion stops raw material waste.",
    coverImage: "https://images.unsplash.com/photo-1581349485608-9469926a8e5e?auto=format&fit=crop&q=80&w=800",
    galleryImages: [],
    videos: [],
    categoryId: "ops",
    tags: ["inventory", "ops-tag"],
    isFeatured: false,
    status: "Published",
    seoTitle: "5 Restaurant Inventory Management Best Practices to Protect Margins",
    seoDescription: "Food costs erode restaurant profitability. Implement automated ingredient depletion and low-stock triggers with our layout guide.",
    canonicalUrl: "https://ordrji.com/blog/inventory-practices-stop-waste",
    ogImage: "https://images.unsplash.com/photo-1581349485608-9469926a8e5e?auto=format&fit=crop&q=80&w=800",
    keywords: ["Inventory Control", "Wastage", "Food Cost", "Recipe depletion"],
    robots: "index, follow",
    articleSchema: "{}",
    breadcrumbSchema: "{}",
    faqSchema: [],
    createdBy: "Priya Sharma",
    lastEditedBy: "Priya Sharma",
    approvedBy: "Super Admin",
    createdDate: "22 June 2026",
    createdTime: "11:15 AM",
    lastUpdatedDate: "22 June 2026",
    lastUpdatedTime: "11:15 AM",
    publishedDate: "22 June 2026",
    publishedTime: "12:00 PM",
    timezone: "Asia/Kolkata",
    readingTime: "8 min read",
    content: `
      <p>Food cost is the single biggest bottleneck in restaurant scaling. Raw ingredient price swings, staff over-portioning, and unchecked inventory spoilage directly erode net profits. Here are ways to secure your margins:</p>
      
      <h3 style="font-size:1.3rem; font-weight:800; margin:1.5rem 0 0.75rem; color:var(--text-primary);">1. Automated Recipe-Based Depletion</h3>
      <p>Stop doing weekly manual audits. Connect your billing register to your raw inventory stock. When a customer buys a dish, the exact raw grams (e.g. 100g Paneer, 15ml Cream) should immediately deduct from stock. This highlights raw variance gaps instantly.</p>
      
      <h3 style="font-size:1.3rem; font-weight:800; margin:1.5rem 0 0.75rem; color:var(--text-primary);">2. Implement FIFO Rigorously</h3>
      <p>First-In, First-Out (FIFO) ensures older stock is consumed first. Keep storage rooms organized and use custom shelf labels with expiry dates clearly visible.</p>
      
      <h3 style="font-size:1.3rem; font-weight:800; margin:1.5rem 0 0.75rem; color:var(--text-primary);">3. Set Automated Low-Stock Alert Thresholds</h3>
      <p>Instead of discovering you're out of milk during a busy morning rush, configure your POS dashboard to trigger automated alerts when crucial raw items drop below custom safety levels.</p>
      
      <h3 style="font-size:1.3rem; font-weight:800; margin:1.5rem 0 0.75rem; color:var(--text-primary);">4. Log Wastage Separately</h3>
      <p>Kitchen drops, burnt items, and customer returns must be logged as waste, not just left off the books. This ensures your margins reconcile correctly at the end of the month.</p>
    `
  },
  {
    id: "legacy-vs-cloud-pos",
    title: "Legacy vs. Cloud POS: Why Modern Restaurant Chains are Upgrading",
    slug: "legacy-vs-cloud-pos",
    description: "Comparing desktop servers vs. cloud-based terminal operating systems for scaling restaurant franchises.",
    coverImage: "https://images.unsplash.com/photo-1560624052-449f5ddf0c31?auto=format&fit=crop&q=80&w=800",
    galleryImages: [],
    videos: [],
    categoryId: "tech",
    tags: ["pos", "billing"],
    isFeatured: false,
    status: "Published",
    seoTitle: "Legacy Desktop POS vs Cloud-Native Systems: 2026 Comparison",
    seoDescription: "Why are Indian restaurant chains migrating to cloud-native platforms like Ordrji? Review pricing, reliability, offline databases, and analytics.",
    canonicalUrl: "https://ordrji.com/blog/legacy-vs-cloud-pos",
    ogImage: "https://images.unsplash.com/photo-1560624052-449f5ddf0c31?auto=format&fit=crop&q=80&w=800",
    keywords: ["Cloud POS", "Legacy systems", "Multi-store management"],
    robots: "index, follow",
    articleSchema: "{}",
    breadcrumbSchema: "{}",
    faqSchema: [],
    createdBy: "Vikram Dev",
    lastEditedBy: "Vikram Dev",
    approvedBy: "Super Admin",
    createdDate: "15 June 2026",
    createdTime: "04:30 PM",
    lastUpdatedDate: "15 June 2026",
    lastUpdatedTime: "04:30 PM",
    publishedDate: "16 June 2026",
    publishedTime: "08:00 AM",
    timezone: "Asia/Kolkata",
    readingTime: "6 min read",
    content: `
      <p>For decades, restaurant chains relied on on-premise desktop computer servers sitting in back rooms. They were slow, expensive, and locked down local data. If a hard drive failed during a Friday rush, the restaurant went blind.</p>
      
      <h3 style="font-size:1.3rem; font-weight:800; margin:1.5rem 0 0.75rem; color:var(--text-primary);">The Cloud-Native Transition</h3>
      <p>Modern restaurant groups are migrating to lightweight, cloud-based terminal architectures like Ordrji for several key reasons:</p>
      <ul style="margin:1rem 0; padding-left:1.5rem; display:flex; flex-direction:column; gap:0.5rem;">
        <li><strong>Real-time Central Control:</strong> Update menu prices, launch seasonal combos, or change staff access rights across 50 outlets instantly from your mobile phone.</li>
        <li><strong>Offline-First Resilience:</strong> True cloud apps maintain local SQLite database cache safety in the browser, allowing you to print receipt bills and route kitchen orders even if local Wi-Fi drops.</li>
        <li><strong>Consolidated Dashboard Analytics:</strong> Compare outlet performances, top menu items, and labor costs in a unified command center.</li>
      </ul>
    `
  }
];

const DEFAULT_REVISIONS: BlogRevision[] = DEFAULT_POSTS.map(p => ({
  id: `rev-${p.id}-1`,
  blogId: p.id,
  versionNumber: 1,
  editedBy: p.createdBy,
  editedOnDate: p.createdDate,
  editedOnTime: p.createdTime,
  summaryOfChanges: "Initial baseline creation of the article.",
  data: p
}));

const DEFAULT_LOGS: BlogActivityLog[] = [
  { id: "log-1", user: "Rohan Mehta", role: "Admin", action: "Created blog 'How QR Code Ordering Increases Average Bill Value by 22%'", date: "28 June 2026", time: "09:45 AM", ipAddress: "127.0.0.1", device: "Desktop (Windows)", browser: "Chrome" },
  { id: "log-2", user: "Super Admin", role: "Super Admin", action: "Approved and published 'How QR Code Ordering Increases Average Bill Value by 22%'", date: "28 June 2026", time: "10:00 AM", ipAddress: "127.0.0.1", device: "Desktop (macOS)", browser: "Safari" },
  { id: "log-3", user: "Priya Sharma", role: "Admin", action: "Created blog '5 Inventory Best Practices to Prevent Food Waste and Protect Margins'", date: "22 June 2026", time: "11:15 AM", ipAddress: "127.0.0.1", device: "Desktop (Windows)", browser: "Firefox" },
  { id: "log-4", user: "Super Admin", role: "Super Admin", action: "Approved and published '5 Inventory Best Practices to Prevent Food Waste and Protect Margins'", date: "22 June 2026", time: "12:00 PM", ipAddress: "127.0.0.1", device: "Desktop (macOS)", browser: "Safari" },
  { id: "log-5", user: "Vikram Dev", role: "Admin", action: "Created blog 'Legacy vs. Cloud POS: Why Modern Restaurant Chains are Upgrading'", date: "15 June 2026", time: "04:30 PM", ipAddress: "127.0.0.1", device: "iPad", browser: "Chrome iOS" },
  { id: "log-6", user: "Super Admin", role: "Super Admin", action: "Approved and published 'Legacy vs. Cloud POS: Why Modern Restaurant Chains are Upgrading'", date: "16 June 2026", time: "08:00 AM", ipAddress: "127.0.0.1", device: "Desktop (macOS)", browser: "Safari" }
];

const DEFAULT_MEDIA: MediaAsset[] = [
  { id: "img-1", url: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800", name: "qr_ordering_cover.jpg", type: "image/jpeg", size: 1048576, uploadedAt: "28 June 2026" },
  { id: "img-2", url: "https://images.unsplash.com/photo-1581349485608-9469926a8e5e?auto=format&fit=crop&q=80&w=800", name: "inventory_waste.jpg", type: "image/jpeg", size: 845612, uploadedAt: "22 June 2026" },
  { id: "img-3", url: "https://images.unsplash.com/photo-1560624052-449f5ddf0c31?auto=format&fit=crop&q=80&w=800", name: "pos_terminal.jpg", type: "image/jpeg", size: 954120, uploadedAt: "15 June 2026" }
];

// ── Database Initializer Helper ────────────────────────────────────────────

function initDatabase() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  const checkAndWrite = (filepath: string, defaultData: any) => {
    if (!fs.existsSync(filepath)) {
      fs.writeFileSync(filepath, JSON.stringify(defaultData, null, 2), "utf8");
    }
  };

  checkAndWrite(FILES.users, DEFAULT_USERS);
  checkAndWrite(FILES.authors, DEFAULT_AUTHORS);
  checkAndWrite(FILES.categories, DEFAULT_CATEGORIES);
  checkAndWrite(FILES.tags, DEFAULT_TAGS);
  checkAndWrite(FILES.blogs, DEFAULT_POSTS);
  checkAndWrite(FILES.revisions, DEFAULT_REVISIONS);
  checkAndWrite(FILES.logs, DEFAULT_LOGS);
  checkAndWrite(FILES.media, DEFAULT_MEDIA);
}

// ── Read/Write Logic ───────────────────────────────────────────────────────

export function readTable<T>(tableName: keyof typeof FILES): T[] {
  initDatabase();
  const filePath = FILES[tableName];
  try {
    const content = fs.readFileSync(filePath, "utf8");
    return JSON.parse(content);
  } catch (err) {
    console.error(`Failed reading table ${tableName}:`, err);
    return [];
  }
}

export function writeTable<T>(tableName: keyof typeof FILES, data: T[]): boolean {
  initDatabase();
  const filePath = FILES[tableName];
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error(`Failed writing table ${tableName}:`, err);
    return false;
  }
}

// ── Audit Logging Helper ────────────────────────────────────────────────────

export function logActivity(user: string, role: string, action: string, req?: Request) {
  const logs = readTable<BlogActivityLog>("logs");
  
  let userAgent = "Desktop Browser";
  if (req) {
    userAgent = req.headers.get("user-agent") || "Desktop Browser";
  }

  let browser = "Chrome";
  if (userAgent.includes("Firefox")) browser = "Firefox";
  else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) browser = "Safari";
  else if (userAgent.includes("Edge")) browser = "Edge";

  let device = "Desktop";
  if (userAgent.includes("Mobi")) device = "Mobile";
  if (userAgent.includes("iPad") || userAgent.includes("Tablet")) device = "Tablet";

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
  const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  const newLog: BlogActivityLog = {
    id: `log-${Date.now()}`,
    user,
    role,
    action,
    date: dateStr,
    time: timeStr,
    ipAddress: "127.0.0.1",
    device,
    browser
  };

  logs.unshift(newLog);
  writeTable("logs", logs);
}
