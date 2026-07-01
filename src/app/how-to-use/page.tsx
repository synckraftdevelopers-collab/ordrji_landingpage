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

      <style jsx global>{`
        /* ── HTU CSS STYLES ── */
        .htu-page {
          background-color: var(--bg-primary);
          min-height: 100vh;
          padding-top: 4rem;
        }

        /* ── Hero ── */
        .htu-hero {
          position: relative;
          padding: 6rem 0 4rem;
          text-align: center;
          overflow: hidden;
        }
        .htu-hero-glow {
          position: absolute;
          top: -200px;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 400px;
          background: radial-gradient(circle, rgba(227,6,19,0.08) 0%, rgba(227,6,19,0) 70%);
          pointer-events: none;
          z-index: 0;
        }
        .htu-hero-inner {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .htu-eyebrow {
          display: inline-flex;
          align-items: center;
          background: rgba(227, 6, 19, 0.08);
          border: 1px solid rgba(227, 6, 19, 0.2);
          color: var(--text-primary);
          padding: 0.35rem 0.9rem;
          border-radius: 9999px;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
        }
        .htu-hero-title {
          font-size: clamp(2.2rem, 5vw, 3.8rem);
          font-weight: 900;
          letter-spacing: -2px;
          line-height: 1.15;
          margin-bottom: 1.25rem;
          color: var(--text-primary);
        }
        .htu-hero-sub {
          font-size: 1.1rem;
          line-height: 1.6;
          color: var(--text-secondary);
          max-width: 600px;
          margin-bottom: 2.25rem;
        }
        .htu-hero-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 3.5rem;
          flex-wrap: wrap;
        }
        .htu-badges {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        .htu-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          color: var(--text-secondary);
          font-weight: 600;
        }

        /* ── Progress Track ── */
        .htu-progress-section {
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
          background: rgba(255, 255, 255, 0.3);
          padding: 2.5rem 0;
          display: none; /* Hide on mobile by default */
        }
        @media (min-width: 1024px) {
          .htu-progress-section {
            display: block;
          }
        }
        .htu-progress-track {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .htu-progress-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          flex: 1;
          text-align: center;
        }
        .htu-progress-dot {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.6rem;
          z-index: 2;
        }
        .htu-progress-label {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--text-secondary);
          max-width: 90px;
          line-height: 1.3;
        }
        .htu-progress-line {
          position: absolute;
          top: 16px;
          left: 50%;
          width: 100%;
          height: 2px;
          background: var(--border-color);
          z-index: 1;
        }

        /* ── Steps Section ── */
        .htu-steps-section {
          padding: 5rem 0;
        }
        .htu-steps-inner {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
        }
        @media (min-width: 1024px) {
          .htu-steps-inner {
            grid-template-columns: 240px 1fr;
          }
        }
        .htu-side-label {
          display: none;
          position: sticky;
          top: 7rem;
          height: fit-content;
          flex-direction: column;
          gap: 0.25rem;
        }
        @media (min-width: 1024px) {
          .htu-side-label {
            display: flex;
          }
        }
        .htu-side-label span:first-child {
          font-size: 0.72rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--accent-orange);
        }
        .htu-side-label span:last-child {
          font-size: 1.80rem;
          font-weight: 900;
          letter-spacing: -1px;
          color: var(--text-primary);
        }

        .htu-steps-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        
        /* ── Step Card ── */
        .htu-step-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.01);
          overflow: hidden;
          opacity: 0;
          transform: translateY(18px);
          transition: opacity .5s ease calc(var(--htu-delay, 0s)),
                      transform .5s cubic-bezier(.16,1,.3,1) calc(var(--htu-delay, 0s)),
                      border-color 0.2s, box-shadow 0.2s;
        }
        .htu-step-card.htu-step-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .htu-step-card:hover {
          border-color: rgba(227,6,19,0.15);
          box-shadow: 0 8px 30px rgba(90,80,70,0.04);
        }
        .htu-step-open {
          border-color: rgba(227,6,19,0.22) !important;
          box-shadow: 0 12px 40px rgba(90,80,70,0.06) !important;
        }
        .htu-step-header {
          display: flex;
          width: 100%;
          align-items: center;
          padding: 1.5rem;
          background: none;
          border: none;
          text-align: left;
          cursor: pointer;
          gap: 1.25rem;
          outline: none;
        }
        .htu-step-num-wrap {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          flex-shrink: 0;
        }
        .htu-step-num {
          font-size: 1.1rem;
          font-weight: 900;
          font-family: monospace;
          letter-spacing: -0.5px;
        }
        .htu-step-icon-wrap {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          border: 1px solid transparent;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .htu-step-title-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex: 1;
          flex-wrap: wrap;
        }
        .htu-step-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.5px;
        }
        .htu-step-time {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--text-muted);
          background: var(--bg-primary);
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          text-transform: uppercase;
        }
        .htu-chevron {
          color: var(--text-muted);
          transition: transform 0.2s;
          display: flex;
          align-items: center;
        }
        .htu-chevron-open {
          transform: rotate(180deg);
          color: var(--accent-orange);
        }

        .htu-step-body {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s cubic-bezier(0, 1, 0, 1), padding 0.3s ease;
          padding: 0 1.5rem;
          border-top: 1px solid transparent;
        }
        .htu-body-open {
          max-height: 1000px; /* high value for content height flex */
          padding: 0.5rem 1.5rem 1.75rem;
          border-top: 1px solid var(--border-color);
          transition: max-height 0.3s ease-in, padding 0.3s ease;
        }
        .htu-step-desc {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-secondary);
          margin-bottom: 1.25rem;
        }
        .htu-bullets {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .htu-bullet {
          display: flex;
          align-items: flex-start;
          gap: 0.7rem;
          font-size: 0.9rem;
          color: var(--text-primary);
          line-height: 1.45;
        }
        .htu-bullet-icon {
          flex-shrink: 0;
          margin-top: 0.15rem;
        }

        /* ── Video Section ── */
        .htu-video-section {
          background: var(--bg-card);
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
          padding: 5rem 0;
        }
        .htu-video-inner {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3.5rem;
          align-items: center;
        }
        @media (min-width: 1024px) {
          .htu-video-inner {
            grid-template-columns: 1fr 1.2fr;
          }
        }
        .htu-video-text {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .htu-video-title {
          font-size: clamp(1.8rem, 4vw, 2.5rem);
          font-weight: 800;
          letter-spacing: -1.5px;
          line-height: 1.2;
          margin: 0;
        }
        .htu-video-sub {
          font-size: 1.02rem;
          line-height: 1.6;
          color: var(--text-secondary);
          margin: 0;
        }
        .htu-video-card {
          border-radius: 20px;
          overflow: hidden;
          background: #fff;
          border: 1px solid var(--border-color);
          box-shadow: 0 20px 40px rgba(0,0,0,0.03);
        }
        .htu-video-thumb {
          position: relative;
          aspect-ratio: 16/9;
          background: #000;
          cursor: pointer;
        }
        .htu-play-overlay {
          position: absolute;
          inset: 0;
          background: rgba(15,12,10,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s;
        }
        .htu-video-thumb:hover .htu-play-overlay {
          background: rgba(15,12,10,0.4);
        }
        .htu-play-btn {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: var(--accent-orange);
          display: flex;
          align-items: center;
          justify-content: center;
          padding-left: 4px;
          box-shadow: 0 8px 24px rgba(227,6,19,0.3);
          transition: transform 0.2s, background-color 0.2s;
        }
        .htu-video-thumb:hover .htu-play-btn {
          transform: scale(1.08);
          background: #e30613;
        }
        .htu-video-meta {
          padding: 1.25rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #ffffff;
        }
        .htu-video-label {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .htu-video-dur {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-muted);
          background: var(--bg-primary);
          padding: 0.15rem 0.4rem;
          border-radius: 4px;
        }

        /* ── FAQ Section ── */
        .htu-faq-section {
          padding: 5rem 0;
        }
        .htu-faq-inner {
          max-width: 800px !important;
          margin: 0 auto;
        }
        .htu-faq-header-block {
          text-align: center;
          margin-bottom: 3.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .htu-section-title {
          font-size: clamp(1.8rem, 4vw, 2.5rem);
          font-weight: 800;
          letter-spacing: -1.5px;
          line-height: 1.2;
          margin: 0.5rem 0;
        }
        .htu-section-sub {
          font-size: 1.02rem;
          color: var(--text-secondary);
          margin: 0;
        }
        .htu-faq-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .htu-faq-item {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          overflow: hidden;
          transition: border-color 0.2s;
        }
        .htu-faq-item:hover {
          border-color: rgba(227,6,19,0.15);
        }
        .htu-faq-open {
          border-color: rgba(227,6,19,0.22) !important;
        }
        .htu-faq-header {
          display: flex;
          width: 100%;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 1.5rem;
          background: none;
          border: none;
          cursor: pointer;
          gap: 1.5rem;
          text-align: left;
          outline: none;
        }
        .htu-faq-q {
          font-size: 1.02rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .htu-faq-body {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s cubic-bezier(0, 1, 0, 1), padding 0.3s ease;
          padding: 0 1.5rem;
        }
        .htu-faq-open .htu-faq-body {
          max-height: 300px;
          padding: 0 1.5rem 1.25rem;
          transition: max-height 0.3s ease-in, padding 0.3s ease;
          border-top: 1px solid var(--border-color);
          padding-top: 0.75rem;
        }
        .htu-faq-a {
          font-size: 0.92rem;
          line-height: 1.55;
          color: var(--text-secondary);
          margin: 0;
        }

        /* ── CTA Banner ── */
        .htu-cta-section {
          position: relative;
          background: var(--bg-dark, #0f0e0c);
          color: #fff;
          padding: 6rem 0;
          text-align: center;
          overflow: hidden;
        }
        .htu-cta-glow {
          position: absolute;
          top: -150px;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 300px;
          background: radial-gradient(circle, rgba(227,6,19,0.25) 0%, rgba(227,6,19,0) 70%);
          pointer-events: none;
        }
        .htu-cta-inner {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .htu-cta-title {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 800;
          letter-spacing: -1.5px;
          margin: 0 0 1rem;
        }
        .htu-cta-sub {
          font-size: 1.05rem;
          color: rgba(255,255,255,0.7);
          max-width: 500px;
          line-height: 1.6;
          margin: 0 0 2.5rem;
        }
        .htu-cta-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        .htu-cta-actions .btn-secondary {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.15);
          color: #fff;
        }
        .htu-cta-actions .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.15);
          color: #fff;
        }
      `}</style>
    </>
  );
}
