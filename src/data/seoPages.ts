export interface SeoPageConfig {
  slug: string;
  keyword: string;
  title: string;
  description: string;
  headline: string;
  subheadline: string;
  type: "commercial" | "local" | "competitor" | "service";
  features: string[];
  faqs: { q: string; a: string }[];
  localData?: {
    city: string;
    painPoints: string[];
    areas: string[];
    supportPromise: string;
  };
  competitorData?: {
    name: string;
    advantageTitle: string;
    advantageDesc: string;
    points: { label: string; ordrji: string; competitor: string }[];
  };
  serviceData?: {
    formatName: string;
    highlightTitle: string;
    highlightDesc: string;
  };
}

export const SEO_PAGES_DATA: Record<string, SeoPageConfig> = {
  // ── COMMERCIAL MONEY PAGES ────────────────────────────────────────────────
  "restaurant-pos-software-india": {
    slug: "restaurant-pos-software-india",
    keyword: "restaurant POS software India",
    title: "Best Restaurant POS Software in India — Ordrji",
    description: "Looking for the best restaurant POS software in India? Ordrji provides GST billing, table QR ordering, inventory, and KDS with zero order commissions.",
    headline: "The Leading Restaurant POS Software in India",
    subheadline: "Sync your billing counter, table orders, kitchen display stations, and raw material inventory under a single, fast cloud dashboard.",
    type: "commercial",
    features: [
      "GST-ready billing terminal with split bills",
      "Dynamic table QR codes with instant self-checkout",
      "Multi-station Kitchen Display Systems (KDS)",
      "Real-time recipe-based raw material stock deductions",
      "Aggregator integrations with Swiggy and Zomato direct sync"
    ],
    faqs: [
      { q: "Is Ordrji a GST-ready POS?", a: "Yes. Ordrji generates GST-compliant invoices automatically, handles multiple tax slabs, and formats financial files ready for monthly returns." },
      { q: "Can I manage multiple outlets across India?", a: "Yes. Ordrji Scale and Enterprise plans provide a unified central dashboard to control menus, staff permissions, and central warehouse transfers." }
    ]
  },
  "restaurant-billing-software": {
    slug: "restaurant-billing-software",
    keyword: "restaurant billing software",
    title: "Fast Restaurant Billing Software with KOT — Ordrji",
    description: "Get the fastest billing software for restaurants. Print KOTs instantly, sync offline billing registers, and handle splits and UPI checkouts.",
    headline: "Fast, Resilient Restaurant Billing Software",
    subheadline: "Speed up your checkout counter. Handle peaks with split payments, custom discounts, offline caching, and instant KOT print queues.",
    type: "commercial",
    features: [
      "Offline cache safety loop (never stop billing during internet drops)",
      "One-click split bills by seat, item, or percentage",
      "Instant kitchen order ticket (KOT) routing to printers",
      "Contactless UPI dynamic QR codes on checkout screens",
      "Custom thermal receipt templates with logo branding"
    ],
    faqs: [
      { q: "Does the billing software work offline?", a: "Yes. In case of network failure, Ordrji queues cash invoices inside the local browser storage and automatically syncs to the cloud once restored." }
    ]
  },
  "kot-billing-software": {
    slug: "kot-billing-software",
    keyword: "KOT billing software",
    title: "Resilient KOT Billing Software for Kitchen Operations — Ordrji",
    description: "Accelerate order routing with Ordrji KOT billing software. Prevent order mistakes, connect KDS screens, and sync table checkouts.",
    headline: "Kitchen Order Ticket (KOT) Billing Software",
    subheadline: "Connect checkouts to the kitchen. Print physical KOTs instantly or route orders directly to digital KDS screens without communication lag.",
    type: "commercial",
    features: [
      "Instant KOT printing to multiple kitchen departments",
      "Digital kitchen display screen (KDS) prep-time tracking",
      "Color-coded kitchen delay warning triggers",
      "Direct modifications notes (e.g., 'eggless', 'extra spicy')",
      "Unified waiter tablet ordering flow"
    ],
    faqs: [
      { q: "Can we route KOTs to different prep stations?", a: "Yes. You can route mocktail orders to the bar printer, mains to the kitchen hot station, and desserts to the pastry counter automatically." }
    ]
  },
  "qr-ordering-system-for-restaurants": {
    slug: "qr-ordering-system-for-restaurants",
    keyword: "QR ordering system for restaurants",
    title: "Commission-Free Table QR Ordering System — Ordrji",
    description: "Install dynamic table QR ordering menus for your dine-in guests. Reduce waiter load, speed up checkouts, and increase orders by 20%.",
    headline: "Dynamic QR Menu Ordering System",
    subheadline: "Give dine-in customers the power to scan, browse menu details, customize dishes, and pay from their own mobile phones with zero order commissions.",
    type: "commercial",
    features: [
      "Dynamic digital menus with live price and item controls",
      "Direct checkout using UPI, net banking, or debit cards",
      "AI-driven menu upsells (suggesting beverages/desserts)",
      "Multi-lingual menu support (English, Hindi, regional)",
      "Zero commission percentages on QR transactions"
    ],
    faqs: [
      { q: "Does this require users to download an app?", a: "No. Customers scan the QR code and the menu opens instantly on any standard mobile browser (Safari, Chrome, etc.)." }
    ]
  },
  "restaurant-inventory-management-software": {
    slug: "restaurant-inventory-management-software",
    keyword: "restaurant inventory software",
    title: "Predictive Restaurant Inventory Management Software — Ordrji",
    description: "Stop raw material leakages. Ordrji inventory software tracks ingredient consumption, handles central supplies, and automates purchase orders.",
    headline: "Smart Restaurant Inventory Management",
    subheadline: "Control your food costs. Manage raw ingredients, track recipe variances, automate supplier indent approvals, and calculate real food cost margins.",
    type: "commercial",
    features: [
      "Automatic recipe-level ingredient stock depletion",
      "Central warehouse transfer and internal indent loops",
      "Wastage logging and raw material variance reports",
      "Low-stock email and dashboard alert triggers",
      "Purchase order automation direct to supply vendors"
    ],
    faqs: [
      { q: "How does recipe-level deduction work?", a: "When a customer orders a 'Paneer Butter Masala', Ordrji automatically deducts 150g of Paneer, 20g of Butter, and spices from your raw inventory records." }
    ]
  },

  // ── COMPETITOR COMPARISONS (Alternatives) ─────────────────────────────────
  "petpooja-alternative": {
    slug: "petpooja-alternative",
    keyword: "Petpooja alternative",
    title: "Best Petpooja Alternative with Transparent Billing — Ordrji",
    description: "Comparing Ordrji vs Petpooja? See why restaurant owners switch to Ordrji for faster 24/7 telephone support and clean growth-focused dashboards.",
    headline: "The Premium Alternative to Petpooja",
    subheadline: "Petpooja is a widely used POS software. Ordrji is built for restaurateurs who want simpler onboarding, faster support channels, transparent flat pricing, and commission-free tools.",
    type: "competitor",
    features: [
      "Flat subscription rates with zero hidden transaction lookups",
      "24/7 Telephone priority support (no ticket queues or lag)",
      "Modern, fast UI matching global SaaS tools (Stripe, Linear)",
      "Automatic offline local cache (never locks register cashiers)",
      "Zero commission dynamic QR ordering systems"
    ],
    competitorData: {
      name: "Petpooja",
      advantageTitle: "Why restaurateurs are upgrading to Ordrji",
      advantageDesc: "We believe a restaurant OS should be lightweight, fast, and supported instantly when things go wrong during dinner rush hours. We provide priority telephone assistance and simple flat pricing.",
      points: [
        { label: "Commission Fee", ordrji: "0% Flat Subscription", competitor: "1% to 1.5% checkout fees on QR tools" },
        { label: "Priority Support", ordrji: "24/7 Phone (Under 10s wait)", competitor: "Support ticketing system" },
        { label: "Offline Cache", ordrji: "Browser SQLite (Autosyncs)", competitor: "Manual offline mode recovery" },
        { label: "User Interface", ordrji: "Premium, responsive SaaS style", competitor: "Traditional complex grids" }
      ]
    },
    faqs: [
      { q: "How does Ordrji migrate my data from Petpooja?", a: "Our support engineers export your menu sheets and customer list from Petpooja and import them into Ordrji in under 24 hours, ensuring zero downtime." }
    ]
  },
  "dotpe-alternative": {
    slug: "dotpe-alternative",
    keyword: "DotPe alternative",
    title: "Best DotPe Alternative with Zero Commissions — Ordrji",
    description: "Looking for a commission-free DotPe alternative? Ordrji provides dynamic QR ordering, billing registers, and CRM without locking in your margins.",
    headline: "The Commission-Free Alternative to DotPe",
    subheadline: "DotPe is an established ordering platform. Ordrji is built for restaurants that want to protect their checkout margins, avoid lookup fees, and get direct local offline POS billing.",
    type: "competitor",
    features: [
      "Zero order commissions on table and web checkouts",
      "Built-in offline billing registers and printer drivers",
      "Recipe inventory control (lacking in simple digital menus)",
      "Unified Swiggy & Zomato channel consolidation",
      "Own data ownership (no customer locking loops)"
    ],
    competitorData: {
      name: "DotPe",
      advantageTitle: "Protect your food margins and own your customer data",
      advantageDesc: "Why pay checkout commission cuts on every single dine-in order? Ordrji operates on a predictable monthly model, giving you the software and POS billing cashier unified.",
      points: [
        { label: "QR Order Cut", ordrji: "0% Commission", competitor: "Takes commission cuts per checkout" },
        { label: "POS Billing", ordrji: "Unified local cache POS", competitor: "Secondary dashboard integration" },
        { label: "Ingredient Tracking", ordrji: "Advanced recipes inventory", competitor: "Basic catalog only" },
        { label: "Customer Data", ordrji: "Owned completely by you", competitor: "Shared portal catalog marketing" }
      ]
    },
    faqs: [
      { q: "Do you charge anything per QR checkout?", a: "No. You pay a simple flat monthly subscription. Whether you do 100 orders or 10,000 orders, you keep 100% of your checkout totals." }
    ]
  },
  "restroworks-alternative": {
    slug: "restroworks-alternative",
    keyword: "Restroworks alternative",
    title: "Best Restroworks Alternative for Indian Restaurants — Ordrji",
    description: "Ordrji vs Restroworks: See why modern multi-outlet chains, QSRs, and cloud kitchens choose Ordrji for faster deployments and clear flat rates.",
    headline: "The Lean Alternative to Restroworks",
    subheadline: "Restroworks is a powerful enterprise POS. Ordrji provides cloud-native multi-outlet operations, central supply chains, and recipe tracking with simpler onboarding.",
    type: "competitor",
    features: [
      "Rapid deployment (fully operational in 48 hours)",
      "Modern cloud sync loops (lacks heavy legacy lag)",
      "Flat transparent monthly tiers (no enterprise lockouts)",
      "Integrated waiter app and KDS screens",
      "Unified API hooks and central warehouse tracking"
    ],
    competitorData: {
      name: "Restroworks",
      advantageTitle: "Enterprise command center, without the heavy onboarding",
      advantageDesc: "Ordrji Scale gives multi-branch chains central menu, stock, and staff permission controls using a responsive, modern browser workspace.",
      points: [
        { label: "Deployment Time", ordrji: "48 Hours Onboarding", competitor: "Weeks of enterprise setup" },
        { label: "Pricing Model", ordrji: "Flat transparent plans", competitor: "Custom custom quotes only" },
        { label: "UI Flow", ordrji: "Linear-style SaaS console", competitor: "Traditional complex dashboard" }
      ]
    },
    faqs: [
      { q: "Can Ordrji support multiple franchises?", a: "Yes. Our Scale and Enterprise plans provide central menu management, warehouse dispatches, and role-based cash flow tracking across outlets." }
    ]
  },

  // ── LOCAL SEO CITY PAGES ──────────────────────────────────────────────────
  "restaurant-pos-software-mumbai": {
    slug: "restaurant-pos-software-mumbai",
    keyword: "restaurant POS software Mumbai",
    title: "Best Restaurant POS Software in Mumbai — Ordrji",
    description: "Get the leading restaurant POS software in Mumbai. Trusted by cafes, QSRs, and bars across Bandra, Andheri, and Thane with onsite local support.",
    headline: "Restaurant POS Software in Mumbai",
    subheadline: "Empower your Mumbai outlet. Fast GST billing, dynamic QR checkout menus, and local setup engineers across Bandra, Andheri, Thane, and Navi Mumbai.",
    type: "local",
    features: [
      "Onsite installation and staff training in Mumbai",
      "GST-ready invoicing matching Maharashtra tax codes",
      "Offline cashier sync (handles network fluctuations)",
      "Real-time Swiggy and Zomato channel consolidation",
      "Dynamic QR ordering for busy fast-paced Mumbai diners"
    ],
    localData: {
      city: "Mumbai",
      painPoints: [
        "Unreliable WiFi in dense pockets (solved by offline cache billing)",
        "High staff turnover (solved by simple 10-min waiter app onboarding)",
        "Aggregator commission squeeze (solved by flat subscription models)"
      ],
      areas: ["Colaba", "Bandra", "Andheri", "Juhu", "Powai", "Thane", "Navi Mumbai", "Dadar"],
      supportPromise: "We have dedicated local onboarding engineers stationed in Mumbai. If your printer spool or register breaks, our local support team will resolve it onsite."
    },
    faqs: [
      { q: "Do you provide onsite demo support in Mumbai?", a: "Yes. You can book a free demo and our Mumbai representative will visit your outlet with test printers and billing tablets." }
    ]
  },
  "restaurant-pos-software-pune": {
    slug: "restaurant-pos-software-pune",
    keyword: "restaurant POS software Pune",
    title: "Best Cafe & Restaurant POS Software in Pune — Ordrji",
    description: "Upgrade your Pune restaurant. Trusted billing, KOT, and QR ordering software with onsite installation in Koregaon Park, Kothrud, and Viman Nagar.",
    headline: "Restaurant & Cafe POS Software in Pune",
    subheadline: "Run your Pune cafe or dining room smoothly. Connect waiters, kitchen display nodes, and checkouts with localized onboarding support.",
    type: "local",
    features: [
      "Onsite hardware setup across Kothrud, Baner, and Camp",
      "Fast billing terminal with offline safety registers",
      "UPI payment scans showing directly on checkout counters",
      "Automated WhatsApp loyalty campaigns for Pune students",
      "Multi-outlet recipe and raw inventory tracking"
    ],
    localData: {
      city: "Pune",
      painPoints: [
        "Busy student crowds at cafe counters (solved by fast split bills)",
        "Manual order taking mistakes (solved by waiter tablets and QR menus)",
        "Ingredient variance and leaks (solved by recipe-level depletion)"
      ],
      areas: ["Koregaon Park", "Kothrud", "Baner", "Viman Nagar", "Hinjawadi", "Deccan Gymkhana", "Pimple Saudagar"],
      supportPromise: "Our Pune deployments team provides complete hardware installation, thermal printer networking, and on-site staff training."
    },
    faqs: [
      { q: "Can Ordrji integrate with my existing thermal printers in Pune?", a: "Yes. We support standard EPSON, TSC, and Indian thermal receipt printers via LAN, Wi-Fi, USB, or Bluetooth." }
    ]
  },
  "restaurant-pos-software-nashik": {
    slug: "restaurant-pos-software-nashik",
    keyword: "restaurant POS software Nashik",
    title: "Restaurant & Cloud Kitchen POS Software in Nashik — Ordrji",
    description: "Get the best restaurant POS and billing software in Nashik. Perfect for local cafes, multi-outlet food chains, and cloud kitchens with local support.",
    headline: "Restaurant Billing & POS Software in Nashik",
    subheadline: "Bring control to your Nashik food outlet. Automate KOT printing, manage ingredients, and get localized support engineers at your doorstep.",
    type: "local",
    features: [
      "Local setup support across College Road, Gangapur Road, and Pathardi",
      "Resilient offline local billing registers",
      "WhatsApp loyalty automated CRM database",
      "Central warehouse tracking for multi-outlet Nashik chains",
      "0% transaction commission dynamic QR table menus"
    ],
    localData: {
      city: "Nashik",
      painPoints: [
        "Untracked recipe ingredient usage (solved by recipe deduction guides)",
        "Aggregator delivery delays (solved by KDS prep timers)",
        "Disconnect between waiters and cashier (solved by digital KOTs)"
      ],
      areas: ["College Road", "Gangapur Road", "Indira Nagar", "Pathardi Phata", "Nashik Road", "Panchavati"],
      supportPromise: "We provide local sales agents and hardware specialists in Nashik to help migrate your menus from Petpooja, Vyapar, or Posist instantly."
    },
    faqs: [
      { q: "Do you charge setup commissions in Nashik?", a: "No. All Nashik restaurant plans are simple monthly subscriptions with zero checkout lookup fees." }
    ]
  },
  "restaurant-billing-software-navi-mumbai": {
    slug: "restaurant-billing-software-navi-mumbai",
    keyword: "restaurant billing software Navi Mumbai",
    title: "Best Restaurant Billing Software in Navi Mumbai — Ordrji",
    description: "Looking for restaurant billing software in Navi Mumbai? Ordrji provides fast billing registers, waiter apps, and QR menu checkouts with local support.",
    headline: "Restaurant Billing Software in Navi Mumbai",
    subheadline: "Speed up your cashier counters across Vashi, Belapur, and Kharghar. Connect floor waiters and kitchen printer spools with offline caching registers.",
    type: "local",
    features: [
      "Onsite POS installation in Vashi, Kharghar, Nerul and Belapur",
      "Offline local cache cashier bill queues",
      "Unified Swiggy & Zomato console integrations",
      "GST-ready invoice printer configs",
      "WhatsApp customer loyalty broadcasts"
    ],
    localData: {
      city: "Navi Mumbai",
      painPoints: [
        "Counter crowd bottlenecks (solved by dynamic table QR checkouts)",
        "Manual bill splitting delays (solved by one-click bill splitter)",
        "Printer connectivity drops (solved by automated print buffer queues)"
      ],
      areas: ["Vashi", "Belapur", "Kharghar", "Nerul", "Koparkhairane", "Sanpada", "Airoli"],
      supportPromise: "Our Vashi-based support engineers provide priority onsite support within Navi Mumbai outlets."
    },
    faqs: [
      { q: "Does Ordrji support local thermal receipt printing?", a: "Yes. Ordrji connects with standard LAN, WiFi, and USB thermal billing printers instantly." }
    ]
  },
  "bakery-billing-software-indore": {
    slug: "bakery-billing-software-indore",
    keyword: "bakery billing software Indore",
    title: "Best Bakery Billing & POS Software in Indore — Ordrji",
    description: "Get the leading bakery billing software in Indore. Manage custom cake orders, advance bookings, delivery dates, and ingredient stock in Indore.",
    headline: "Bakery & Cake Shop Billing Software in Indore",
    subheadline: "Specialized bakery workflows for Indore sweet shops and cake outlets. Track advance bookings, delivery dates, and custom design instructions.",
    type: "local",
    features: [
      "Advance booking calendar and customized cake notes",
      "Partial payments and deposit reconciliation tracking",
      "Raw materials inventory (flour, cream, butter tracking)",
      "Expiry alerts for raw ingredients and baked items",
      "WhatsApp birthday discount automations"
    ],
    localData: {
      city: "Indore",
      painPoints: [
        "Forgetting custom cake delivery dates (solved by automated visual calendar)",
        "Tracking partial payments on advance orders (solved by payment tracking)",
        "Short shelf-life raw materials wastage (solved by inventory expiry logs)"
      ],
      areas: ["Vijay Nagar", "Palasia", "C21 Mall Area", "Chapan Dukan", "Rajwada", "Annapurna Road"],
      supportPromise: "We provide local sales specialists in Indore to onboard your bakery staff and set up barcode scanners."
    },
    faqs: [
      { q: "Can Ordrji handle barcode scanning for pre-packed items?", a: "Yes. Ordrji POS billing integrates with standard barcode scanners for fast checkout of packaged cookies, sweets, and breads." }
    ]
  },

  // ── SERVICE PAGES BY RESTAURANT TYPE ──────────────────────────────────────
  "pos-for-cafes": {
    slug: "pos-for-cafes",
    keyword: "cafe billing software",
    title: "Premium Cafe POS & Billing Software — Ordrji",
    description: "Accelerate cafe checkouts. Ordrji cafe billing software provides fast split bills, table QR menus, student loyalty, and offline billing cache.",
    headline: "Sleek Billing & POS for Modern Cafes",
    subheadline: "Designed for fast checkouts and student-friendly operations. Splitting bills, barcode cookies, and automated WhatsApp broadcasts in one clean dashboard.",
    type: "service",
    features: [
      "One-click bill splitting (by item, seat, or count)",
      "Contactless UPI checkout QR codes",
      "Dynamic QR menus for self-serve cafe tables",
      "Recipe costing tracking (for coffee beans, milk, syrups)",
      "WhatsApp customer loyalty and discounts engine"
    ],
    serviceData: {
      formatName: "Cafes & Bistros",
      highlightTitle: "Built for high-volume coffee and chat spots",
      highlightDesc: "Cafes run on fast, repeat checkouts and student groups. Ordrji makes splitting tabs, taking counter cash, and offering UPI scans instant and simple."
    },
    faqs: [
      { q: "Can we track coffee bean consumption?", a: "Yes. You can map raw coffee beans in your recipe files, and each cup sold will automatically deduct the precise gram weight." }
    ]
  },
  "pos-for-bakeries": {
    slug: "pos-for-bakeries",
    keyword: "bakery billing software",
    title: "Best Bakery POS & Cake Order Booking Software — Ordrji",
    description: "Manage advance cake orders, delivery calendar dates, partial deposits, recipe inventory, and barcode registers with Ordrji bakery POS.",
    headline: "Bakery & Cake Shop POS Software",
    subheadline: "Beyond standard billing. Ordrji helps bakeries manage customized cake designs, delivery dispatch timelines, partial advances, and ingredient stocks.",
    type: "service",
    features: [
      "Custom cake order manager with design details notes",
      "Advance booking calendar panel showing delivery statuses",
      "Split advances (payment tracking for deposit + balance)",
      "Pre-packed items barcode checkout integration",
      "Ingredient shelf-life expiry alert trackers"
    ],
    serviceData: {
      formatName: "Bakeries & Confectioneries",
      highlightTitle: "Never miss a birthday cake or custom order timeline",
      highlightDesc: "Bakeries require tracking customized messages, delivery dates, and deposit margins. Ordrji's visual cake portal organizes all orders in one calendar dashboard."
    },
    faqs: [
      { q: "Does the system send birthday notifications?", a: "Yes. Ordrji's CRM matches guest records and automatically sends personalized WhatsApp birthday messages with discount coupon codes." }
    ]
  },
  "pos-for-cake-shops": {
    slug: "pos-for-cake-shops",
    keyword: "bakery billing software",
    title: "POS Software for Cake Shops & Confectioneries — Ordrji",
    description: "Organise cake bookings, customized order details, partial deposits, and visual calendar dispatches with Ordrji's cake shop POS billing.",
    headline: "Cake Shop Order Booking & POS Billing",
    subheadline: "Specialized workflows built for cake shops. Track eggless variants, flavor notes, custom designs, pickup dates, and deposit ledger history.",
    type: "service",
    features: [
      "Custom design photo and note attachment uploads",
      "Delivery calendar showing pending, in-progress, and dispatched items",
      "Advance deposit reconciliation billing",
      "Raw materials stock tracking (cream, butter, cake base)",
      "WhatsApp birthday campaign triggers"
    ],
    serviceData: {
      formatName: "Cake Shops",
      highlightTitle: "Streamline cake bookings and kitchen notifications",
      highlightDesc: "Ensure the pastry chef receives the exact customized instructions (e.g. 'eggless', 'write Happy Birthday Arjun') directly on KOT tickets instantly."
    },
    faqs: [
      { q: "Can we track deposits for cake stands?", a: "Yes. You can register refundable deposits for stands or trays inside Ordrji's payment ledger flow." }
    ]
  },
  "pos-for-cloud-kitchens": {
    slug: "pos-for-cloud-kitchens",
    keyword: "cloud kitchen POS software",
    title: "Central Cloud Kitchen POS & Aggregator Sync Software — Ordrji",
    description: "Manage multiple virtual brands from one console. Ordrji consolidates Swiggy, Zomato, KDS routing, and centralized warehouse inventory.",
    headline: "Multi-Brand Cloud Kitchen POS Software",
    subheadline: "Consolidate your virtual brands. Ordrji merges Swiggy, Zomato, and custom web orders into a unified live feed console routing to KDS stations.",
    type: "service",
    features: [
      "Unified multi-brand orders console (Swiggy, Zomato, Direct)",
      "Digital kitchen display system (KDS) department routing",
      "Prep-timer warning alerts to prevent delivery SLA delays",
      "Centralized multi-brand menu and price catalog editors",
      "Recipe depletion and raw ingredient stock tracking"
    ],
    serviceData: {
      formatName: "Cloud Kitchens",
      highlightTitle: "Manage 5 virtual brands on a single billing terminal",
      highlightDesc: "Stop swapping between multiple Swiggy and Zomato tablets. Ordrji pulls all incoming orders into one feed, printing or routing KOTs to kitchen screens automatically."
    },
    faqs: [
      { q: "Does Ordrji sync menu updates to Swiggy instantly?", a: "Yes. You can edit items or mark dishes 'out of stock' inside Ordrji and it pushes the changes to Zomato & Swiggy instantly." }
    ]
  },
  "pos-for-qsrs": {
    slug: "pos-for-qsrs",
    keyword: "QSR POS software",
    title: "High-Speed QSR POS & Self-Service Billing Software — Ordrji",
    description: "Speed up quick-service checkout counters. Ordrji QSR POS provides fast touch registers, barcode scans, KDS sync, and customer UPI displays.",
    headline: "High-Speed QSR POS & Billing Software",
    subheadline: "Built for speed and zero bottlenecks. Power QSR counters with touch registers, automated printer spools, customer displays, and KDS queues.",
    type: "service",
    features: [
      "Sub-2s touch billing register interface",
      "Instant KDS sync (order appears in kitchen immediately)",
      "Direct aggregator integrations (Zomato, Swiggy, Web)",
      "Customer-facing checkout display scans",
      "Central recipe depletion and raw stocks control"
    ],
    serviceData: {
      formatName: "Quick Service Restaurants (QSR)",
      highlightTitle: "Minimize checkout queues and speed up kitchen dispatch",
      highlightDesc: "Quick Service outlets run on speed. Ordrji's layout is optimized for minimum clicks, ensuring the cashier processes orders under 5 seconds."
    },
    faqs: [
      { q: "Does the QSR system connect with token display screens?", a: "Yes. Ordrji integrates with external token display screens to notify customers when their order number is ready." }
    ]
  },
  "pos-for-fine-dine": {
    slug: "pos-for-fine-dine",
    keyword: "restaurant POS software India",
    title: "Fine Dining Restaurant POS & Table Management — Ordrji",
    description: "Premium table management, captain ordering, split payments, raw ingredient costings, and dynamic QR ordering for fine dining rooms.",
    headline: "Fine Dining POS & Table Management OS",
    subheadline: "Hospitality at its finest. Ordrji provides guest profiles history, visual table layout billing, Captain waiter ordering, and split ledgers.",
    type: "service",
    features: [
      "Visual floor layouts showing active tables and occupancy timers",
      "Captain waiter app licenses for instant table-side order entry",
      "Guest profiles tracking allergen notes and dining history",
      "Advanced billing splits (by seat, item, or manual cuts)",
      "Dynamic table QR ordering for optional self-checkouts"
    ],
    serviceData: {
      formatName: "Fine Dining Restaurants",
      highlightTitle: "Deliver seamless guest hospitality and floor operations",
      highlightDesc: "Fine dining requires precise coordination. Captains enter KOTs table-side which instantly route to the kitchen, while guest logs remember their favorite table."
    },
    faqs: [
      { q: "Can waitstaff merge tables or transfer orders?", a: "Yes. Captains can merge active tables or transfer items between tables from their tablets in one click." }
    ]
  },
  "pos-for-food-courts": {
    slug: "pos-for-food-courts",
    keyword: "restaurant POS software India",
    title: "Multi-Vendor Food Court POS & Card Billing System — Ordrji",
    description: "Manage multi-vendor food courts. Ordrji food court POS provides central card recharge registers, multi-stall routing, and central settlements.",
    headline: "Multi-Vendor Food Court POS Systems",
    subheadline: "Unified billing for food courts and multi-vendor plazas. Centralized card recharge desks, stall KOT routing, and direct settlement reporting.",
    type: "service",
    features: [
      "Central cash register desks for card loading and refunding",
      "Multi-vendor KOT split routing (order prints only at matching stall)",
      "Live stall sales tracking and automated revenue splits",
      "Dynamic QR ordering for plaza-wide seat checkouts",
      "Tenant reporting portals for stall owners"
    ],
    serviceData: {
      formatName: "Food Courts & Plazas",
      highlightTitle: "Simplify multi-vendor transactions and payouts",
      highlightDesc: "Avoid vendor settlement confusions. Ordrji reconciles food court transactions and partitions settlements for tenant billing automatically."
    },
    faqs: [
      { q: "Does the card loading system work offline?", a: "Yes. The central register cashier can check card balances and record transactions locally even during internet drops." }
    ]
  },
  "pos-for-dessert-chains": {
    slug: "pos-for-dessert-chains",
    keyword: "cafe billing software",
    title: "POS Software for Dessert Chains & Sweet Shops — Ordrji",
    description: "Manage ice-cream outlets, dessert chains, and sweet shops. Track batch expiries, barcode checkouts, multi-location inventory, and cash drawers.",
    headline: "Dessert Chain & Sweet Shop POS Software",
    subheadline: "Built for dessert chains, ice cream franchises, and sweet counters. Specialized registers with shelf-life trackers and multi-outlet supply controls.",
    type: "service",
    features: [
      "High-speed POS billing registers for sweets and packaging items",
      "Multi-outlet central inventory hub with transfer indents",
      "Batch tracking with shelf-life expiry warning prompts",
      "Automated WhatsApp loyalty broadcast campaigns",
      "Barcode scale scanning integrations for weighed items"
    ],
    serviceData: {
      formatName: "Dessert Chains & Sweet Shops",
      highlightTitle: "Control multi-branch menus and expiry timelines",
      highlightDesc: "Dessert counters require quick weighing and packaging checkout workflows. Ordrji handles scales, scanner inputs, and central store transfer indents smoothly."
    },
    faqs: [
      { q: "Can we manage recipe batches at central base-kitchens?", a: "Yes. You can log base-kitchen batches and track their transfer dispatches to franchise branches automatically." }
    ]
  }
};
