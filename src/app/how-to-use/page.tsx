"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  QrCode, Monitor, ChefHat, CreditCard, BarChart3, Users,
  Package, Megaphone, ChevronDown, ArrowRight, CheckCircle2,
  Smartphone, Wifi, ShieldCheck, Headphones, Play, BookOpen,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookDemoModal from "@/components/BookDemoModal";

/* ─── STEPS DATA ─────────────────────────────────────────────────────────── */
const STEPS = [
  {
    num: "01",
    icon: QrCode,
    color: "#7c3aed",
    title: "Set Up Your QR Menu",
    time: "~10 min",
    desc: "Create your digital menu and generate a unique QR code for every table. Customers scan and order directly — no app download needed.",
    bullets: [
      "Log in to your Ordrji dashboard at pos.ordrji.com",
      "Go to Menu Manager → Add categories, items, prices & photos",
      "Navigate to QR Setup → assign QR codes to each table number",
      "Print or display the QR codes at each table",
      "Test by scanning the QR from your own phone",
    ],
  },
  {
    num: "02",
    icon: Monitor,
    color: "#0284c7",
    title: "Configure Your POS Terminal",
    time: "~15 min",
    desc: "Install the Ordrji POS on any Windows, Android, or iOS device. Connect your receipt printer and configure payment methods.",
    bullets: [
      "Download Ordrji POS from the App Store / Play Store / Windows installer",
      "Sign in with your restaurant credentials",
      "Add your billing profile — GST details, outlet name, address",
      "Connect your receipt printer via USB or Bluetooth",
      "Enable payment gateways (UPI, card, cash) from Settings → Payments",
    ],
  },
  {
    num: "03",
    icon: ChefHat,
    color: "#059669",
    title: "Activate the Kitchen Display (KDS)",
    time: "~5 min",
    desc: "Mount a tablet or monitor in your kitchen. Every order placed from the POS or QR menu appears instantly on the KDS — no more paper tickets.",
    bullets: [
      "Open the Ordrji KDS app on a kitchen-facing tablet or monitor",
      "Log in using your KDS station credentials",
      "Orders appear in real-time with table number, items, and modifiers",
      "Tap each item as it's prepared; tap the order card to mark it complete",
      "Kitchen gets an audio alert for every new order",
    ],
  },
  {
    num: "04",
    icon: CreditCard,
    color: "#e30613",
    title: "Process Billing & Payments",
    time: "~2 min per bill",
    desc: "Split bills, apply discounts, run loyalty redemptions, and print GST-compliant invoices — all from one screen.",
    bullets: [
      "Select the open table from the POS floor plan",
      "Review the order summary, apply discounts or promo codes",
      "Choose payment method: UPI / card / cash / split",
      "Print or SMS the GST invoice to the customer",
      "Settlement syncs to your daily sales report automatically",
    ],
  },
  {
    num: "05",
    icon: Package,
    color: "#d97706",
    title: "Manage Inventory & Stock",
    time: "Daily 5 min",
    desc: "Track raw material consumption automatically as orders are placed. Get low-stock alerts before you run out.",
    bullets: [
      "Go to Inventory → Stock Items and add all ingredients with units",
      "Link ingredients to menu items via Recipe Manager",
      "Stock deducts automatically on every order placed",
      "Set reorder levels; Ordrji alerts you when stock runs low",
      "Run the Daily Consumption Report to review wastage",
    ],
  },
  {
    num: "06",
    icon: Users,
    color: "#7c3aed",
    title: "Build Your Customer CRM",
    time: "Ongoing",
    desc: "Every customer who orders becomes a profile in your CRM. Track visits, preferences, lifetime spend, and trigger loyalty rewards automatically.",
    bullets: [
      "CRM auto-captures customer phone/email at billing",
      "View each customer's visit history, favourite dishes, and total spend",
      "Set up a loyalty program: points per ₹100 spent, redeemable on next visit",
      "Segment customers — high-value, lapsed, birthday month — for targeted offers",
      "Export your customer list for WhatsApp or SMS campaigns",
    ],
  },
  {
    num: "07",
    icon: Megaphone,
    color: "#0284c7",
    title: "Run Marketing Campaigns",
    time: "~20 min per campaign",
    desc: "Send targeted WhatsApp messages, SMS blasts, or push notifications to segmented customer lists right from the Ordrji dashboard.",
    bullets: [
      "Go to Marketing → Campaigns → New Campaign",
      "Choose your audience: all customers, lapsed (60+ days), birthday this week, etc.",
      "Select channel: WhatsApp, SMS, or Email",
      "Compose your message using ready-made templates",
      "Schedule or send immediately; track delivery and redemption rates",
    ],
  },
  {
    num: "08",
    icon: BarChart3,
    color: "#059669",
    title: "Read Your Analytics Dashboard",
    time: "Daily 10 min",
    desc: "Your command center for business intelligence. Check live sales, hourly revenue trends, best-selling dishes, staff performance, and more.",
    bullets: [
      "Dashboard → Overview shows today's revenue vs yesterday at a glance",
      "Sales by Category reveals which sections drive the most revenue",
      "Item Performance sorts every menu item by quantity sold and margin",
      "Peak Hours heatmap shows your busiest time slots",
      "Export any report to Excel/PDF for accountants or investors",
    ],
  },
];

/* ─── FAQ DATA ───────────────────────────────────────────────────────────── */
const FAQS = [
  {
    q: "Do I need any special hardware to run Ordrji?",
    a: "No special hardware needed. Ordrji works on any Android tablet, iPad, Windows PC, or even a smartphone. Your existing devices are enough to get started.",
  },
  {
    q: "How long does the initial setup take?",
    a: "Most restaurants are fully live within 2–4 hours. Our onboarding team will walk you through menu setup, POS configuration, and KDS activation on a call.",
  },
  {
    q: "Can I use Ordrji for multiple outlets?",
    a: "Yes. The Ordrji Command Center dashboard gives you a consolidated view across all outlets. Each outlet has its own POS, KDS, and menu — all managed from one login.",
  },
  {
    q: "Is my data safe? What if the internet goes down?",
    a: "Ordrji operates in offline-first mode. If your internet drops, billing and KDS continue to work locally. Data syncs automatically once connectivity is restored. All data is encrypted and backed up to the cloud.",
  },
  {
    q: "Does Ordrji integrate with Zomato and Swiggy?",
    a: "Yes. Orders from Zomato, Swiggy, and other aggregators flow directly into your Ordrji POS and KDS without any manual entry. No extra tablet or middleware required.",
  },
  {
    q: "How do I get support if I'm stuck?",
    a: "We provide 24/7 support via WhatsApp, phone, and in-app chat. Most issues are resolved within 15 minutes. You also get access to video tutorials and a searchable help centre.",
  },
];

/* ─── STEP CARD ──────────────────────────────────────────────────────────── */
function StepCard({ step, idx }: { step: typeof STEPS[0]; idx: number }) {
  const [open, setOpen] = useState(idx === 0);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const Icon = step.icon;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`htu-step-card ${open ? "htu-step-open" : ""} ${visible ? "htu-step-visible" : ""}`}
      style={{ "--htu-delay": `${idx * 0.07}s` } as React.CSSProperties}
    >
      {/* header row — always visible, click to expand */}
      <button
        className="htu-step-header"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
      >
        {/* step number + icon */}
        <span className="htu-step-num-wrap">
          <span className="htu-step-num" style={{ color: step.color }}>{step.num}</span>
          <span className="htu-step-icon-wrap" style={{ background: `${step.color}15`, borderColor: `${step.color}30` }}>
            <Icon size={20} color={step.color} strokeWidth={1.8} />
          </span>
        </span>

        {/* title + time badge */}
        <span className="htu-step-title-group">
          <span className="htu-step-title">{step.title}</span>
          <span className="htu-step-time">{step.time}</span>
        </span>

        {/* chevron */}
        <span className={`htu-chevron ${open ? "htu-chevron-open" : ""}`}>
          <ChevronDown size={18} />
        </span>
      </button>

      {/* expandable body */}
      <div className={`htu-step-body ${open ? "htu-body-open" : ""}`}>
        <p className="htu-step-desc">{step.desc}</p>
        <ul className="htu-bullets">
          {step.bullets.map((b, i) => (
            <li key={i} className="htu-bullet">
              <CheckCircle2 size={15} color={step.color} strokeWidth={2} className="htu-bullet-icon" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ─── FAQ ITEM ───────────────────────────────────────────────────────────── */
function FaqItem({ faq }: { faq: typeof FAQS[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`htu-faq-item ${open ? "htu-faq-open" : ""}`}>
      <button className="htu-faq-header" onClick={() => setOpen(v => !v)} aria-expanded={open}>
        <span className="htu-faq-q">{faq.q}</span>
        <span className={`htu-chevron ${open ? "htu-chevron-open" : ""}`}>
          <ChevronDown size={18} />
        </span>
      </button>
      <div className={`htu-faq-body ${open ? "htu-body-open" : ""}`}>
        <p className="htu-faq-a">{faq.a}</p>
      </div>
    </div>
  );
}

/* ─── PAGE ───────────────────────────────────────────────────────────────── */
export default function HowToUsePage() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <>
      <Navbar onBookDemo={() => setIsDemoOpen(true)} />

      <main className="htu-page">

        {/* ── HERO ────────────────────────────────────────────────────── */}
        <section className="htu-hero">
          <div className="htu-hero-glow" aria-hidden />
          <div className="container htu-hero-inner">
            <span className="htu-eyebrow">
              <BookOpen size={13} style={{ marginRight: 6 }} />
              User Guide
            </span>
            <h1 className="htu-hero-title">
              Your Guide to Getting Started<br />
              <span className="gradient-text">with Ordrji</span>
            </h1>
            <p className="htu-hero-sub">
              Follow these 8 simple steps to get your restaurant fully live on Ordrji —
              from your first QR menu to real-time analytics. Most restaurants are operational
              within a single afternoon.
            </p>
            <div className="htu-hero-actions">
              <a
                href="https://pos.ordrji.com/login"
                target="_blank" rel="noopener noreferrer"
                className="btn-primary btn-red"
              >
                Start Free Trial <ArrowRight size={14} />
              </a>
              <button onClick={() => setIsDemoOpen(true)} className="btn-secondary">
                Book a Live Demo
              </button>
            </div>

            {/* quick feature badges */}
            <div className="htu-badges">
              {[
                { icon: Smartphone, text: "Works on any device" },
                { icon: Wifi,       text: "Offline-capable" },
                { icon: ShieldCheck,text: "Bank-grade security" },
                { icon: Headphones, text: "24/7 support" },
              ].map(b => {
                const Icon = b.icon;
                return (
                  <span key={b.text} className="htu-badge">
                    <Icon size={13} /> {b.text}
                  </span>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── PROGRESS INDICATOR ──────────────────────────────────────── */}
        <section className="htu-progress-section">
          <div className="container">
            <div className="htu-progress-track">
              {STEPS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={s.num} className="htu-progress-step">
                    <span className="htu-progress-dot" style={{ background: s.color, boxShadow: `0 0 0 4px ${s.color}20` }}>
                      <Icon size={14} color="#fff" strokeWidth={2} />
                    </span>
                    <span className="htu-progress-label">{s.title}</span>
                    {i < STEPS.length - 1 && <span className="htu-progress-line" />}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── STEPS ───────────────────────────────────────────────────── */}
        <section className="htu-steps-section">
          <div className="container htu-steps-inner">

            {/* left sticky label */}
            <aside className="htu-side-label">
              <span>Step-by-Step</span>
              <span>Setup Guide</span>
            </aside>

            {/* step cards */}
            <div className="htu-steps-list">
              {STEPS.map((step, i) => (
                <StepCard key={step.num} step={step} idx={i} />
              ))}
            </div>

          </div>
        </section>

        {/* ── VIDEO BANNER ─────────────────────────────────────────────── */}
        <section className="htu-video-section">
          <div className="container htu-video-inner">
            <div className="htu-video-text">
              <span className="htu-eyebrow" style={{ justifyContent: "flex-start" }}>
                <Play size={13} style={{ marginRight: 6 }} /> Video Walkthroughs
              </span>
              <h2 className="htu-video-title">Prefer to watch and learn?</h2>
              <p className="htu-video-sub">
                Our YouTube channel has full screen-recorded tutorials for every
                feature — from QR menu setup to advanced analytics. New videos added weekly.
              </p>
              <a
                href="https://pos.ordrji.com/login"
                target="_blank" rel="noopener noreferrer"
                className="btn-primary btn-red"
                style={{ alignSelf: "flex-start", marginTop: "0.5rem" }}
              >
                Watch Tutorials <ArrowRight size={14} />
              </a>
            </div>
            <div className="htu-video-card glass-card">
              <div className="htu-video-thumb">
                <Image src="/hero.png" alt="Ordrji tutorial preview" width={640} height={360} className="htu-video-img" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div className="htu-play-overlay">
                  <span className="htu-play-btn">
                    <Play size={28} color="#fff" fill="#fff" />
                  </span>
                </div>
              </div>
              <div className="htu-video-meta">
                <span className="htu-video-label">Getting Started in 10 Minutes</span>
                <span className="htu-video-dur">10:24</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────────────── */}
        <section className="htu-faq-section">
          <div className="container htu-faq-inner">
            <div className="htu-faq-header-block">
              <span className="htu-eyebrow"><BookOpen size={13} style={{ marginRight: 6 }} />FAQ</span>
              <h2 className="htu-section-title">Common Questions</h2>
              <p className="htu-section-sub">
                Everything you need to know before going live.
              </p>
            </div>
            <div className="htu-faq-list">
              {FAQS.map((faq, i) => (
                <FaqItem key={i} faq={faq} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ──────────────────────────────────────────────── */}
        <section className="htu-cta-section">
          <div className="htu-cta-glow" aria-hidden />
          <div className="container htu-cta-inner">
            <h2 className="htu-cta-title">Ready to go live?</h2>
            <p className="htu-cta-sub">
              Our onboarding team will have your restaurant running on Ordrji within 24 hours.
              No upfront cost. Cancel anytime.
            </p>
            <div className="htu-cta-actions">
              <a
                href="https://pos.ordrji.com/login"
                target="_blank" rel="noopener noreferrer"
                className="btn-primary btn-red"
              >
                Start Free Trial <ArrowRight size={14} />
              </a>
              <button onClick={() => setIsDemoOpen(true)} className="btn-secondary htu-demo-btn">
                Book a Live Demo
              </button>
              <Link href="/contact" className="btn-secondary htu-demo-btn">
                Talk to Sales
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <BookDemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </>
  );
}
