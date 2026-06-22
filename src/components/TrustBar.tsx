"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Utensils, Coffee, Cloud, Candy, Croissant, Network,
} from "lucide-react";

/* ─── format data (text unchanged, icons now large) ──────────────────────── */
const FORMATS = [
  { name: "Fine Dining & Restaurants",      icon: Utensils,  color: "#7c3aed" },
  { name: "Sleek Cafes & Bistros",          icon: Coffee,    color: "#0284c7" },
  { name: "High-Volume Cloud Kitchens",     icon: Cloud,     color: "#059669" },
  { name: "Sweet Shop & Patisseries",       icon: Candy,     color: "#dc2626" },
  { name: "Artisanal Bakeries",             icon: Croissant, color: "#d97706" },
  { name: "Multi-Outlet Enterprise Chains", icon: Network,   color: "#7c3aed" },
];

/* ─── stats (Restroworks-style — large hero number + label) ──────────────── */
interface Stat { prefix: string; base: number; suffix: string; label: string; }
const STATS: Stat[] = [
  { prefix: "",   base: 3500, suffix: "+",    label: "Restaurants Active"   },
  { prefix: "₹",  base: 120,  suffix: " Cr+", label: "Monthly Order Value"  },
  { prefix: "",   base: 99,   suffix: ".99%", label: "Platform Uptime"      },
  { prefix: "",   base: 22,   suffix: "+",    label: "Cities Covered"       },
];

/* ─── count-up hook ───────────────────────────────────────────────────────── */
function useCountUp(target: number, duration = 2000, started = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!started) return;
    let startTs: number | null = null;
    let raf: number;
    const tick = (ts: number) => {
      if (!startTs) startTs = ts;
      const pct   = Math.min((ts - startTs) / duration, 1);
      const eased = 1 - Math.pow(1 - pct, 4);   // quartic ease-out
      setVal(Math.floor(eased * target));
      if (pct < 1) raf = requestAnimationFrame(tick);
      else setVal(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, started]);
  return val;
}

/* ─── single stat number block ───────────────────────────────────────────── */
function StatBlock({ s, started, delay }: { s: Stat; started: boolean; delay: number }) {
  const v = useCountUp(s.base, 2000, started);
  return (
    <div className="tb-stat-block" style={{ animationDelay: `${delay}ms` }}>
      <span className="tb-stat-num">
        {s.prefix}{started ? v : 0}{s.suffix}
      </span>
      <span className="tb-stat-label">{s.label}</span>
    </div>
  );
}

/* ─── marquee row ─────────────────────────────────────────────────────────── */
function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  // quadruple items so the loop is seamless at any screen width
  const items = [...FORMATS, ...FORMATS, ...FORMATS, ...FORMATS];
  return (
    <div className="tb-marquee-viewport">
      <div className={`tb-marquee-track ${reverse ? "tb-rev" : ""}`}>
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="tb-pill"
              style={{ "--pc": item.color } as React.CSSProperties}
            >
              {/* Large icon container — Restroworks uses big prominent icons */}
              <span className="tb-pill-icon-wrap" style={{ background: `${item.color}15`, borderColor: `${item.color}28` }}>
                <Icon size={32} color={item.color} strokeWidth={1.5} />
              </span>
              <span className="tb-pill-name">{item.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── main component ──────────────────────────────────────────────────────── */
export default function TrustBar() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView,   setInView]   = useState(false);
  const [counting, setCounting] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          setTimeout(() => setCounting(true), 300);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="tb-section" ref={sectionRef}>

      {/* ambient glow behind stats — Restroworks has a subtle radial wash */}
      <div className="tb-bg-glow" />

      <div className="container">

        {/* ── eyebrow label — clips up on enter ──────────────────────── */}
        <div className="tb-eyebrow-clip">
          <p className={`tb-eyebrow ${inView ? "tb-reveal" : ""}`}>
            TRUSTED BY MODERN CULINARY BRAND FORMATS NATIONWIDE
          </p>
        </div>

        {/* ── Restroworks-style hero stat row ────────────────────────── */}
        {/* Large isolated numbers that count up — exact Restroworks treatment */}
        <div className={`tb-stats-row ${inView ? "tb-stats-in" : ""}`}>
          {STATS.map((s, i) => (
            <React.Fragment key={s.label}>
              <StatBlock s={s} started={counting} delay={i * 120} />
              {i < STATS.length - 1 && <div className="tb-stat-divider" />}
            </React.Fragment>
          ))}
        </div>

        {/* thin rule below stats */}
        <div className={`tb-divider-line ${inView ? "tb-line-in" : ""}`} />
      </div>

      {/* ── Dual marquee belt with LARGE icons ─────────────────────────── */}
      <div className={`tb-belt ${inView ? "tb-belt-in" : ""}`}>
        {/* edge fade masks */}
        <div className="tb-edge tb-edge-l" />
        <div className="tb-edge tb-edge-r" />
        <MarqueeRow reverse={false} />
        <MarqueeRow reverse={true} />
      </div>

      {/* ── all styles ──────────────────────────────────────────────────── */}
      <style jsx global>{`

        /* ── section ─────────────────────────────────────────────────── */
        .tb-section {
          padding: 5rem 0 0;
          background-color: var(--bg-secondary);
          position: relative;
          overflow: hidden;
        }

        /* Restroworks ambient glow under the numbers */
        .tb-bg-glow {
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 800px; height: 300px;
          background: radial-gradient(ellipse 60% 100% at 50% 0%,
            rgba(227,6,19,0.07) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }

        /* ── eyebrow ─────────────────────────────────────────────────── */
        .tb-eyebrow-clip { overflow: hidden; text-align: center; margin-bottom: 2.5rem; position: relative; z-index: 1; }

        .tb-eyebrow {
          font-size: 0.7rem; font-weight: 800;
          letter-spacing: 3px; color: var(--text-muted);
          text-transform: uppercase;
          opacity: 0; transform: translateY(100%);
          transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1);
          display: inline-block;
        }
        .tb-eyebrow.tb-reveal { opacity: 1; transform: translateY(0); }

        /* ── Restroworks stat row ────────────────────────────────────── */
        /*   Numbers start invisible, slide up + count up when in view    */
        .tb-stats-row {
          display: flex; flex-wrap: wrap; justify-content: center;
          align-items: center; gap: 0;
          margin-bottom: 2.5rem; position: relative; z-index: 1;
          opacity: 0; transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1);
          transition-delay: 0.1s;
        }
        .tb-stats-row.tb-stats-in { opacity: 1; transform: translateY(0); }

        .tb-stat-block {
          display: flex; flex-direction: column; align-items: center;
          gap: 0.3rem; padding: 0 2.5rem;
          /* each block pops in with its own delay via JS inline style */
          animation: tbStatPop 0.55s cubic-bezier(0.16,1,0.3,1) both;
          animation-play-state: paused;
        }
        /* play the pop animation only once stats are in view */
        .tb-stats-in .tb-stat-block { animation-play-state: running; }

        @keyframes tbStatPop {
          from { opacity: 0; transform: translateY(20px) scale(0.94); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }

        /* Restroworks-style: very large bold number */
        .tb-stat-num {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 900; letter-spacing: -2px;
          color: var(--text-primary); line-height: 1;
          font-variant-numeric: tabular-nums;
          /* subtle gradient lift on the number */
          background: linear-gradient(135deg, var(--text-primary) 40%, var(--accent-orange) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .tb-stat-label {
          font-size: 0.72rem; font-weight: 700;
          color: var(--text-muted); letter-spacing: 0.5px;
          text-transform: uppercase; text-align: center;
        }

        /* vertical divider between stats */
        .tb-stat-divider {
          width: 1px; height: 48px;
          background: var(--border-color);
          flex-shrink: 0;
        }
        @media (max-width: 640px) {
          .tb-stat-divider { display: none; }
          .tb-stat-block   { padding: 0.75rem 1.5rem; }
          .tb-stats-row    { gap: 0.5rem; }
        }

        /* thin rule */
        .tb-divider-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border-color) 20%, var(--border-color) 80%, transparent);
          margin-bottom: 0;
          opacity: 0; transform: scaleX(0.3);
          transform-origin: center;
          transition: opacity 0.6s ease 0.3s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.3s;
        }
        .tb-divider-line.tb-line-in { opacity: 1; transform: scaleX(1); }

        /* ── belt wrapper ────────────────────────────────────────────── */
        .tb-belt {
          position: relative; padding: 2rem 0;
          background: var(--bg-secondary);
          overflow: hidden;
          opacity: 0; transform: translateY(16px);
          transition: opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s;
        }
        .tb-belt.tb-belt-in { opacity: 1; transform: translateY(0); }

        /* edge fade masks */
        .tb-edge {
          position: absolute; top: 0; bottom: 0; width: 140px;
          z-index: 5; pointer-events: none;
        }
        .tb-edge-l { left:  0; background: linear-gradient(to right,  var(--bg-secondary), transparent); }
        .tb-edge-r { right: 0; background: linear-gradient(to left,   var(--bg-secondary), transparent); }

        /* ── marquee viewport + track ────────────────────────────────── */
        .tb-marquee-viewport {
          overflow: hidden; margin-bottom: 1rem;
        }
        .tb-marquee-viewport:last-child { margin-bottom: 0; }

        .tb-marquee-track {
          display: flex; width: max-content; gap: 0;
          animation: tbScroll 40s linear infinite;
        }
        .tb-marquee-track.tb-rev {
          animation: tbScrollRev 40s linear infinite;
        }
        .tb-marquee-track:hover { animation-play-state: paused; }

        @keyframes tbScroll    { from { transform: translateX(0);     } to { transform: translateX(-50%); } }
        @keyframes tbScrollRev { from { transform: translateX(-50%);  } to { transform: translateX(0);    } }

        /* ── pill cards ──────────────────────────────────────────────── */
        /*   Restroworks style: clean card with large icon + label       */
        .tb-pill {
          display: flex; align-items: center; gap: 1rem;
          padding: 0.9rem 1.6rem;
          margin: 0 0.5rem;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          white-space: nowrap;
          cursor: default;
          transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
          /* subtle hover lift — Restroworks card hover */
        }
        .tb-pill:hover {
          border-color: var(--pc, var(--accent-orange));
          box-shadow: 0 6px 22px rgba(0,0,0,0.07);
          transform: translateY(-3px);
        }

        /* large icon box */
        .tb-pill-icon-wrap {
          width: 56px; height: 56px;
          border-radius: 14px;
          border: 1px solid;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        .tb-pill:hover .tb-pill-icon-wrap {
          transform: scale(1.12) rotate(-4deg);
        }

        /* label text */
        .tb-pill-name {
          font-size: 0.88rem; font-weight: 700;
          color: var(--text-primary); letter-spacing: -0.2px;
        }

      `}</style>
    </section>
  );
}
