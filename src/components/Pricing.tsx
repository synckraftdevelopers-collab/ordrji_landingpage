"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles, Check, ArrowRight, X, Utensils, Wifi,
  BarChart2, Users, Shield, Zap, Star, Globe,
} from "lucide-react";

/* ─── plan data ───────────────────────────────────────────────────────────── */
interface PricingPlan {
  name: string; desc: string;
  monthlyPrice: number; yearlyPrice: number;
  popular: boolean; features: string[]; cta: string; color: string;
  /* back-side extras */
  backHeadline: string;
  backDesc: string;
  highlights: { icon: React.ReactNode; text: string }[];
  idealFor: string;
}

const PLANS: PricingPlan[] = [
  {
    name: "Starter", desc: "Perfect for single-location cafes, sweet shops, or bistros starting out.",
    monthlyPrice: 2499, yearlyPrice: 1999, popular: false,
    cta: "Start Starter Free", color: "#8b5cf6",
    features: [
      "Dynamic QR Menu Ordering",
      "Core Cloud billing POS terminal",
      "UPI & Card payment gateways integration",
      "Standard Loyalty & CRM profiles",
      "Email operations support",
    ],
    backHeadline: "Everything to get your restaurant online",
    backDesc: "Starter gives you a complete digital foundation — QR ordering, cloud POS, and UPI payments — without the complexity of enterprise tools.",
    highlights: [
      { icon: <Wifi size={14} />, text: "Cloud-hosted, zero server setup" },
      { icon: <Utensils size={14} />, text: "Unlimited menu items & categories" },
      { icon: <Users size={14} />, text: "Up to 3 staff accounts" },
      { icon: <BarChart2 size={14} />, text: "30-day sales history reports" },
    ],
    idealFor: "Solo cafes, dessert shops, small bistros",
  },
  {
    name: "Growth", desc: "For high-volume restaurants requiring kitchen coordination and stock tracking.",
    monthlyPrice: 4999, yearlyPrice: 3999, popular: true,
    cta: "Start Growth Free", color: "#e30613",
    features: [
      "Everything in Starter",
      "Kitchen Display System (KDS) Node",
      "Visual Inventory & Stock predictions",
      "Automated WhatsApp Birthday & Loyalty SMS",
      "Standard Analytics Bento Reports",
      "24/7 Telephone support",
    ],
    backHeadline: "Full kitchen-to-table operational sync",
    backDesc: "Growth unlocks real-time kitchen coordination and automated loyalty flows — the toolkit that lets a single location run like a chain.",
    highlights: [
      { icon: <Zap size={14} />, text: "KDS with prep-time tracking" },
      { icon: <BarChart2 size={14} />, text: "Live P&L and inventory analytics" },
      { icon: <Users size={14} />, text: "Up to 10 staff accounts" },
      { icon: <Shield size={14} />, text: "WhatsApp automation engine" },
    ],
    idealFor: "Busy restaurants, QSRs, food courts",
  },
  {
    name: "Scale", desc: "For multi-outlet culinary brands and growing franchise networks.",
    monthlyPrice: 9999, yearlyPrice: 7999, popular: false,
    cta: "Start Scale Free", color: "#0284c7",
    features: [
      "Everything in Growth",
      "Multi-outlet Central Inventory hub",
      "OrderJi AI Restaurant Manager terminal",
      "Advanced Custom Bento SVG analytics",
      "Custom role dashboard permissions",
      "Priority Account Manager",
    ],
    backHeadline: "Multi-outlet intelligence in one command center",
    backDesc: "Scale consolidates every branch into a single view — cross-outlet inventory, AI-powered suggestions, and custom role access for your ops team.",
    highlights: [
      { icon: <Globe size={14} />, text: "Unlimited outlets on one dashboard" },
      { icon: <Star size={14} />, text: "AI menu & pricing recommendations" },
      { icon: <Users size={14} />, text: "Unlimited staff + role controls" },
      { icon: <BarChart2 size={14} />, text: "Custom SVG bento analytics" },
    ],
    idealFor: "Multi-branch brands, cloud kitchen chains",
  },
  {
    name: "Enterprise", desc: "Custom operational needs, legacy POS migration, and heavy ERP pipelines.",
    monthlyPrice: 0, yearlyPrice: 0, popular: false,
    cta: "Contact Enterprise Sales", color: "#059669",
    features: [
      "Everything in Scale",
      "Unlimited store terminals & KDS displays",
      "Legacy POS migrations (Petpooja, Posist etc)",
      "99.99% Uptime service level SLA",
      "Custom reporting APIs & Webhooks",
      "Dedicated deployment engineers",
    ],
    backHeadline: "Bespoke deployment at any scale",
    backDesc: "Enterprise is built for franchise networks and large F&B groups. We migrate your existing POS, build custom integrations, and guarantee uptime.",
    highlights: [
      { icon: <Shield size={14} />, text: "99.99% SLA-backed uptime" },
      { icon: <Zap size={14} />, text: "Legacy POS migration included" },
      { icon: <Globe size={14} />, text: "Custom API & webhook layer" },
      { icon: <Users size={14} />, text: "Dedicated account & eng team" },
    ],
    idealFor: "Hotel chains, franchise groups, large F&B enterprises",
  },
];

/* ─── animated price (flip on billing toggle) ────────────────────────────── */
function AnimatedPrice({ price, isCustom }: { price: number; isCustom: boolean }) {
  const [display, setDisplay] = useState(price);
  const [exiting, setExiting]  = useState(false);
  useEffect(() => {
    if (price === display) return;
    setExiting(true);
    const t = setTimeout(() => { setDisplay(price); setExiting(false); }, 210);
    return () => clearTimeout(t);
  }, [price, display]);
  if (isCustom) return <div className="price-txt">Custom</div>;
  return (
    <div className={`price-txt price-flip ${exiting ? "pf-exit" : "pf-enter"}`}>
      ₹{display.toLocaleString()}
      <span style={{ fontSize: "1rem", color: "var(--text-muted)", fontWeight: 400 }}>/mo</span>
    </div>
  );
}

/* ─── single flippable card ──────────────────────────────────────────────── */
function FlipCard({
  plan, billingCycle, inView, delay,
}: {
  plan: PricingPlan;
  billingCycle: "monthly" | "yearly";
  inView: boolean;
  delay: number;
}) {
  const [flipped, setFlipped] = useState(false);
  const isYearly  = billingCycle === "yearly";
  const price     = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  const isCustom  = plan.monthlyPrice === 0;

  return (
    /* outer wrapper — stagger entrance */
    <div
      className={`flip-outer ${inView ? "flip-outer-in" : ""} ${plan.popular ? "flip-popular" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* flip container */}
      <div
        className={`flip-inner ${flipped ? "flipped" : ""}`}
        onClick={() => setFlipped(f => !f)}
        role="button"
        tabIndex={0}
        aria-label={`${flipped ? "Show front of" : "Show details for"} ${plan.name} plan`}
        onKeyDown={e => (e.key === "Enter" || e.key === " ") && setFlipped(f => !f)}
      >

        {/* ── FRONT FACE ── */}
        <div
          className="flip-face flip-front glass-card"
          style={{ borderColor: plan.popular ? plan.color : "var(--border-color)" }}
        >
          {/* animated sweep glow on popular */}
          {plan.popular && <div className="pc-sweep-border" aria-hidden />}

          {plan.popular && <span className="popular-badge-label">MOST POPULAR</span>}

          {/* flip hint */}
          <div className="flip-hint" style={{ color: plan.color }}>
            <span>Details</span>
            <ArrowRight size={11} />
          </div>

          <div className="card-top-content">
            <h3 className="plan-name">{plan.name}</h3>
            <p className="plan-desc">{plan.desc}</p>

            <div className="price-tag-wrapper">
              <AnimatedPrice price={price} isCustom={isCustom} />
              {!isCustom && (
                <span className="billing-meta">
                  {isYearly ? `₹${(price * 12).toLocaleString()} billed annually` : "Billed month-to-month"}
                </span>
              )}
            </div>

            <a
              href="https://pos.ordrji.com/login"
              target="_blank" rel="noopener noreferrer"
              className="btn-primary plan-cta-btn"
              onClick={e => e.stopPropagation()}
              style={{
                backgroundColor: plan.popular ? plan.color : "rgba(0,0,0,0.02)",
                color:            plan.popular ? "#fff"       : "var(--text-primary)",
                border:           plan.popular ? "1px solid transparent" : "1px solid var(--border-color)",
              }}
            >
              {plan.cta} <ArrowRight size={14} />
            </a>
          </div>

          <div className="divider" style={{ margin: "1.5rem 0" }} />

          <div className="features-list-wrapper">
            <span className="features-header-lbl">INCLUDED FEATURES:</span>
            <ul className="features-checklist">
              {plan.features.map((feat) => (
                <li key={feat} className="feature-li">
                  <Check size={13} color="var(--accent-green)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── BACK FACE ── */}
        <div
          className="flip-face flip-back glass-card"
          style={{ borderColor: plan.color, borderTopWidth: 3 }}
        >
          {/* close hint */}
          <button
            className="flip-close-btn"
            onClick={e => { e.stopPropagation(); setFlipped(false); }}
            aria-label="Close details"
          >
            <X size={14} />
          </button>

          <div className="back-content">
            {/* plan name accent */}
            <span className="back-plan-badge" style={{ background: plan.color + "18", color: plan.color }}>
              {plan.name}
            </span>

            <h3 className="back-headline">{plan.backHeadline}</h3>
            <p className="back-desc">{plan.backDesc}</p>

            <div className="divider" style={{ margin: "1.25rem 0" }} />

            {/* highlights grid */}
            <div className="back-highlights">
              {plan.highlights.map((h, i) => (
                <div key={i} className="back-highlight-item" style={{ borderColor: plan.color + "30" }}>
                  <span className="back-hi-icon" style={{ color: plan.color, background: plan.color + "14" }}>
                    {h.icon}
                  </span>
                  <span className="back-hi-text">{h.text}</span>
                </div>
              ))}
            </div>

            <div className="divider" style={{ margin: "1.25rem 0" }} />

            {/* ideal for */}
            <div className="back-ideal">
              <span className="back-ideal-label">IDEAL FOR</span>
              <span className="back-ideal-value">{plan.idealFor}</span>
            </div>

            {/* CTA */}
            <a
              href="https://pos.ordrji.com/login"
              target="_blank" rel="noopener noreferrer"
              className="btn-primary plan-cta-btn back-cta"
              onClick={e => e.stopPropagation()}
              style={{ backgroundColor: plan.color, borderColor: "transparent", marginTop: "auto" }}
            >
              {plan.cta} <ArrowRight size={14} />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ─── main component ──────────────────────────────────────────────────────── */
export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");

  /* scroll-in for card stagger */
  const sectionRef  = useRef<HTMLElement>(null);
  const headerRef   = useRef<HTMLDivElement>(null);
  const [inView,    setInView]    = useState(false);
  const [hdrSticky, setHdrSticky] = useState(false);
  const [hdrIn,     setHdrIn]     = useState(false);

  /* IntersectionObserver — stagger entrance */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); setTimeout(() => setHdrIn(true), 60); obs.disconnect(); }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Scroll listener — sticky header floats up when user scrolls into the cards */
  useEffect(() => {
    const onScroll = () => {
      const hdr = headerRef.current;
      if (!hdr) return;
      const { bottom } = hdr.getBoundingClientRect();
      /* once header scrolls past the top of viewport, activate sticky mode */
      setHdrSticky(bottom < 64);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="pricing-section" id="pricing" ref={sectionRef}>
      <div className="glow-spot glow-rose"  style={{ top: "30%",    right: "10%", width: "400px", height: "400px" }} />
      <div className="glow-spot glow-green" style={{ bottom: "10%", left:  "10%", width: "400px", height: "400px" }} />
      {/* dot-grid bg */}
      <div className="pc-dot-grid" aria-hidden />

      {/* ── STICKY HEADER PORTAL ──────────────────────────────────────────
          Renders a second copy of the header text that floats fixed at the
          top of the viewport while the user scrolls through the cards.
          The "dynamic / upper-side" behaviour the user asked for.
      ─────────────────────────────────────────────────────────────────── */}
      {hdrSticky && (
        <div className="pricing-sticky-bar">
          <div className="pricing-sticky-inner">
            <span className="pricing-sticky-badge">
              <Sparkles size={10} style={{ color: "var(--accent-orange)" }} /> Predictable Pricing
            </span>
            <span className="pricing-sticky-title">Transparent Plans for Every Format</span>
            {/* billing toggle inline */}
            <div className="pricing-sticky-toggle">
              <div
                className="toggle-slider-thumb"
                style={{ transform: billingCycle === "yearly" ? "translateX(100%)" : "translateX(0%)" }}
              />
              <button onClick={() => setBillingCycle("monthly")} className={`toggle-cycle-btn ${billingCycle === "monthly" ? "active" : ""}`}>Monthly</button>
              <button onClick={() => setBillingCycle("yearly")}  className={`toggle-cycle-btn ${billingCycle === "yearly"  ? "active" : ""}`}>
                Yearly <span className="discount-pill">-20%</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container">
        {/* ── SECTION HEADER (inline, fades in on scroll) ─────────────── */}
        <div
          ref={headerRef}
          className={`pricing-header ${hdrIn ? "pricing-hdr-in" : ""}`}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <div className="badge animate-float" style={{ background: "rgba(227,6,19,0.08)", borderColor: "rgba(227,6,19,0.2)" }}>
            <Sparkles size={12} style={{ color: "var(--accent-orange)", marginRight: "4px" }} /> Predictable Pricing
          </div>
          <h2 className="gradient-text" style={{ fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-1.5px", marginBottom: "1rem" }}>
            Transparent Plans for Every Format
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}>
            Choose the plan that matches your operations. No hidden installation fees or terminal lookup commissions.
          </p>

          {/* billing toggle with sliding pill */}
          <div className="billing-toggle-container">
            <div
              className="toggle-slider-thumb"
              style={{ transform: billingCycle === "yearly" ? "translateX(100%)" : "translateX(0%)" }}
            />
            <button onClick={() => setBillingCycle("monthly")} className={`toggle-cycle-btn ${billingCycle === "monthly" ? "active" : ""}`}>
              Billed Monthly
            </button>
            <button onClick={() => setBillingCycle("yearly")} className={`toggle-cycle-btn ${billingCycle === "yearly" ? "active" : ""}`}>
              Billed Yearly <span className="discount-pill">Save 20%</span>
            </button>
          </div>
        </div>

        {/* click-to-flip hint */}
        <p className={`flip-global-hint ${inView ? "flip-hint-in" : ""}`}>
          Click any card to see full plan details ↓
        </p>

        {/* ── FLIPPABLE CARDS GRID ─────────────────────────────────────── */}
        <div className="pricing-grid">
          {PLANS.map((plan, idx) => (
            <FlipCard
              key={plan.name}
              plan={plan}
              billingCycle={billingCycle}
              inView={inView}
              delay={idx * 90}
            />
          ))}
        </div>
      </div>

      {/* ── ALL STYLES ──────────────────────────────────────────────── */}
      <style jsx global>{`

        /* ── section ─────────────────────────────────────────────────── */
        .pricing-section {
          padding: 8rem 0;
          background-color: var(--bg-primary);
          position: relative;
          z-index: 10;
          overflow: hidden;
        }

        /* dot grid */
        .pc-dot-grid {
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none; z-index: 0;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
        }

        /* ── header scroll-in ────────────────────────────────────────── */
        .pricing-header {
          position: relative; z-index: 2;
          opacity: 0; transform: translateY(26px);
          transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .pricing-hdr-in { opacity: 1; transform: translateY(0); }

        /* ── STICKY FLOATING HEADER BAR ─────────────────────────────── */
        /* Appears at top of viewport when user scrolls past the section header */
        .pricing-sticky-bar {
          position: fixed; top: 0; left: 0; right: 0;
          z-index: 100;
          background: rgba(253,250,244,0.92);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border-color);
          padding: 0.65rem 1.5rem;
          animation: stickySlideDown 0.35s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes stickySlideDown {
          from { opacity:0; transform: translateY(-100%); }
          to   { opacity:1; transform: translateY(0); }
        }

        .pricing-sticky-inner {
          max-width: 1280px; margin: 0 auto;
          display: flex; align-items: center;
          gap: 1.25rem; flex-wrap: wrap;
        }

        .pricing-sticky-badge {
          display: inline-flex; align-items: center; gap: 0.3rem;
          background: rgba(227,6,19,0.08); border: 1px solid rgba(227,6,19,0.2);
          color: var(--accent-orange); padding: 0.2rem 0.7rem;
          border-radius: 9999px; font-size: 0.72rem; font-weight: 700;
          white-space: nowrap;
        }

        .pricing-sticky-title {
          font-size: 0.9rem; font-weight: 800;
          color: var(--text-primary); letter-spacing: -0.3px;
          white-space: nowrap;
        }

        /* sticky toggle is a compact inline version */
        .pricing-sticky-toggle {
          display: inline-flex; position: relative;
          background: rgba(0,0,0,0.04); border: 1px solid var(--border-color);
          padding: 3px; border-radius: 9999px; overflow: hidden;
          margin-left: auto;
        }
        .pricing-sticky-toggle .toggle-slider-thumb {
          height: calc(100% - 6px); width: calc(50% - 3px);
        }
        .pricing-sticky-toggle .toggle-cycle-btn {
          padding: 0.3rem 0.85rem; font-size: 0.78rem;
        }

        /* ── billing toggle ──────────────────────────────────────────── */
        .billing-toggle-container {
          display: inline-flex; position: relative;
          background: rgba(0,0,0,0.04); border: 1px solid var(--border-color);
          padding: 0.35rem; border-radius: 9999px;
          margin-top: 2rem; overflow: hidden;
        }

        .toggle-slider-thumb {
          position: absolute; top: 4px; left: 4px;
          width: calc(50% - 4px); height: calc(100% - 8px);
          background: #fff; border-radius: 9999px;
          box-shadow: 0 2px 8px rgba(90,80,70,0.1);
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
          pointer-events: none; z-index: 0;
        }

        .toggle-cycle-btn {
          position: relative; z-index: 1;
          background: transparent; border: none;
          color: var(--text-secondary);
          padding: 0.5rem 1.25rem; border-radius: 9999px;
          font-size: 0.85rem; font-weight: 600; cursor: pointer;
          transition: color 0.25s;
          display: flex; align-items: center; gap: 0.5rem;
        }
        .toggle-cycle-btn.active { color: var(--text-primary); }

        .discount-pill {
          background: rgba(5,150,105,0.12); color: var(--accent-green);
          font-size: 0.7rem; padding: 0.1rem 0.45rem;
          border-radius: 9999px; font-weight: 700;
        }

        /* ── global flip hint ────────────────────────────────────────── */
        .flip-global-hint {
          text-align: center; margin-bottom: 1.5rem;
          font-size: 0.78rem; color: var(--text-muted);
          font-weight: 600; letter-spacing: 0.3px;
          opacity: 0; transform: translateY(8px);
          transition: opacity 0.5s ease 0.3s, transform 0.5s ease 0.3s;
        }
        .flip-hint-in { opacity: 1; transform: translateY(0); }

        /* ── card grid ───────────────────────────────────────────────── */
        .pricing-grid {
          display: grid; grid-template-columns: 1fr;
          gap: 2rem; position: relative; z-index: 2;
        }
        @media (min-width: 768px)  { .pricing-grid { grid-template-columns: repeat(2,1fr); } }
        @media (min-width: 1280px) { .pricing-grid { grid-template-columns: repeat(4,1fr); } }

        /* ── flip outer wrapper — stagger entrance ───────────────────── */
        .flip-outer {
          perspective: 1200px;
          /* match tallest face so grid rows are consistent */
          min-height: 560px;
          opacity: 0; transform: translateY(40px) rotateX(6deg);
          transition:
            opacity   0.65s cubic-bezier(0.16,1,0.3,1),
            transform 0.65s cubic-bezier(0.16,1,0.3,1);
          position: relative;
        }
        .flip-outer.flip-outer-in {
          opacity: 1; transform: translateY(0) rotateX(0);
        }
        .flip-popular { z-index: 3; }
        @media (min-width: 1280px) {
          .flip-popular { transform: translateY(-6px) !important; }
        }

        /* ── flip inner — rotates on click ──────────────────────────── */
        .flip-inner {
          position: relative; width: 100%; height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.7s cubic-bezier(0.34,1.2,0.64,1);
          cursor: pointer;
          min-height: 560px;
        }
        .flip-inner.flipped { transform: rotateY(180deg); }

        /* ── shared face styles ──────────────────────────────────────── */
        .flip-face {
          position: absolute; inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 16px;
          display: flex; flex-direction: column;
          overflow: hidden;
        }

        /* ── FRONT FACE ──────────────────────────────────────────────── */
        .flip-front {
          padding: 2.25rem 2rem;
          background: var(--bg-card);
          box-shadow: 0 20px 40px -10px rgba(90,80,70,0.06);
          transition: box-shadow 0.3s ease;
        }
        .flip-front:hover {
          box-shadow: 0 28px 50px -12px rgba(90,80,70,0.1);
        }

        /* top-right "Details →" hint chip */
        .flip-hint {
          position: absolute; top: 1rem; right: 1rem;
          display: flex; align-items: center; gap: 0.25rem;
          font-size: 0.65rem; font-weight: 700; letter-spacing: 0.5px;
          opacity: 0.55;
          transition: opacity 0.2s;
        }
        .flip-front:hover .flip-hint { opacity: 1; }

        /* sweep border on popular */
        .pc-sweep-border {
          position: absolute; inset: -2px; border-radius: inherit;
          background: conic-gradient(from var(--a, 0deg), transparent 0deg, rgba(227,6,19,0.65) 60deg, transparent 120deg);
          animation: sweepBorder 3s linear infinite;
          z-index: -1; pointer-events: none;
        }
        @property --a { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
        @keyframes sweepBorder { to { --a: 360deg; } }

        .popular-badge-label {
          position: absolute; top: -12px; left: 50%;
          transform: translateX(-50%);
          background: var(--accent-orange); color: #fff;
          font-size: 0.65rem; font-weight: 800; letter-spacing: 1.5px;
          padding: 0.35rem 0.85rem; border-radius: 9999px;
          box-shadow: 0 4px 12px rgba(227,6,19,0.3);
          animation: badgeBob 3s ease-in-out infinite;
          white-space: nowrap;
        }
        @keyframes badgeBob {
          0%,100% { transform: translateX(-50%) translateY(0); }
          50%      { transform: translateX(-50%) translateY(-3px); }
        }

        /* price flip */
        .price-flip { display: block; transform-style: preserve-3d; }
        .pf-exit { animation: pfOut 0.21s ease both; }
        .pf-enter{ animation: pfIn  0.28s cubic-bezier(0.16,1,0.3,1) both; }
        @keyframes pfOut { from { opacity:1; transform:translateY(0) rotateX(0); } to { opacity:0; transform:translateY(-10px) rotateX(-30deg); } }
        @keyframes pfIn  { from { opacity:0; transform:translateY(10px) rotateX(30deg); } to { opacity:1; transform:translateY(0) rotateX(0); } }

        /* ── BACK FACE ───────────────────────────────────────────────── */
        .flip-back {
          transform: rotateY(180deg);
          padding: 1.75rem;
          background: var(--bg-card);
          display: flex; flex-direction: column;
        }

        .flip-close-btn {
          position: absolute; top: 0.85rem; right: 0.85rem;
          width: 26px; height: 26px; border-radius: 50%;
          border: 1px solid var(--border-color);
          background: var(--bg-card);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: var(--text-muted);
          transition: color 0.2s, background 0.2s;
          z-index: 10;
        }
        .flip-close-btn:hover { color: var(--text-primary); background: var(--bg-secondary); }

        .back-content {
          display: flex; flex-direction: column;
          height: 100%; gap: 0;
        }

        .back-plan-badge {
          display: inline-flex; align-self: flex-start;
          padding: 0.25rem 0.75rem; border-radius: 9999px;
          font-size: 0.7rem; font-weight: 800; letter-spacing: 1px;
          text-transform: uppercase; margin-bottom: 0.85rem;
        }

        .back-headline {
          font-size: 1.1rem; font-weight: 800;
          letter-spacing: -0.3px; color: var(--text-primary);
          margin-bottom: 0.65rem; line-height: 1.3;
        }

        .back-desc {
          font-size: 0.82rem; color: var(--text-secondary);
          line-height: 1.6; margin-bottom: 0;
        }

        /* highlights 2-col grid */
        .back-highlights {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 0.55rem;
        }

        .back-highlight-item {
          display: flex; align-items: flex-start; gap: 0.45rem;
          padding: 0.55rem 0.6rem;
          border: 1px solid; border-radius: 9px;
          background: rgba(0,0,0,0.01);
        }

        .back-hi-icon {
          width: 24px; height: 24px; border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        .back-hi-text {
          font-size: 0.75rem; line-height: 1.35;
          color: var(--text-secondary); font-weight: 500;
        }

        .back-ideal {
          display: flex; flex-direction: column; gap: 0.2rem;
        }
        .back-ideal-label {
          font-size: 0.62rem; font-weight: 800;
          letter-spacing: 1.2px; color: var(--text-muted);
        }
        .back-ideal-value {
          font-size: 0.82rem; font-weight: 700;
          color: var(--text-secondary);
        }

        .back-cta {
          margin-top: auto !important;
          width: 100%; justify-content: center; padding: 0.75rem;
          color: #fff !important;
        }

        /* shared card content styles */
        .plan-name     { font-size:1.4rem; font-weight:800; letter-spacing:-0.5px; margin-bottom:0.5rem; color:var(--text-primary); }
        .plan-desc     { font-size:0.85rem; color:var(--text-secondary); line-height:1.5; margin-bottom:1.75rem; min-height:52px; }
        .price-tag-wrapper { display:flex; flex-direction:column; margin-bottom:1.75rem; }
        .price-txt     { font-size:2.5rem; font-weight:800; letter-spacing:-1.5px; color:var(--text-primary); }
        .billing-meta  { font-size:0.75rem; color:var(--text-muted); margin-top:0.15rem; }
        .plan-cta-btn  { width:100%; justify-content:center; padding:0.75rem; }
        .plan-cta-btn:hover { transform:translateY(-2px); }
        .features-list-wrapper { display:flex; flex-direction:column; gap:1rem; flex-grow:1; }
        .features-header-lbl   { font-size:0.65rem; font-weight:700; color:var(--text-muted); letter-spacing:1px; }
        .features-checklist    { list-style:none; display:flex; flex-direction:column; gap:0.75rem; }
        .feature-li            { display:flex; align-items:flex-start; gap:0.65rem; font-size:0.83rem; color:var(--text-secondary); line-height:1.4; }

        /* badge global */
        .badge {
          display:inline-flex; align-items:center; gap:0.5rem;
          background:rgba(227,6,19,0.08); border:1px solid rgba(227,6,19,0.2);
          color:var(--text-primary); padding:0.4rem 1rem;
          border-radius:9999px; font-size:0.85rem; font-weight:500;
          margin-bottom:1.5rem;
        }
      `}</style>
    </section>
  );
}
