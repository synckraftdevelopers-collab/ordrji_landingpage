"use client";

import React, { useEffect, useRef, useState } from "react";
/* ─── brand logos (real culinary brands - colorful original colors) ──────── */
const BRANDS = [
  {
    name: "McDonald's",
    renderIcon: () => (
      <svg viewBox="0 0 24 24" fill="#FFC72C" width="44" height="44">
        <path d="M5.4 20h-3v-9.2C2.4 7.2 4.9 4 8.7 4c2.8 0 5 1.8 5.9 4.4.9-2.6 3.1-4.4 5.9-4.4 3.8 0 6.3 3.2 6.3 6.8V20h-3v-9.2c0-2-.9-3.8-3.3-3.8-2.6 0-3.9 2-3.9 4.2V20h-3v-8.8c0-2-.9-3.8-3.3-3.8-2.6 0-3.9 2-3.9 4.2V20z" />
      </svg>
    )
  },
  {
    name: "Starbucks",
    renderIcon: () => (
      <svg viewBox="0 0 24 24" fill="#00704A" width="44" height="44">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 4.5l.8 2.2h2.3l-1.9 1.4.7 2.2-1.9-1.4-1.9 1.4.7-2.2-1.9-1.4h2.3z" fill="#FFFFFF" />
        <path d="M12 9c-1.7 0-3 1.3-3 3 0 1.5 1.5 2.5 3 4 1.5-1.5 3-2.5 3-4 0-1.7-1.3-3-3-3z" fill="#FFFFFF" />
      </svg>
    )
  },
  {
    name: "Subway",
    renderIcon: () => (
      <svg viewBox="0 0 24 24" fill="none" width="44" height="44">
        <path d="M7.5 4C4.5 4 2 6.5 2 9.5V13h3V9.5c0-1.4 1.1-2.5 2.5-2.5H11V4H7.5zm9 16c3 0 5.5-2.5 5.5-5.5V11h-3v3.5c0 1.4-1.1 2.5-2.5 2.5H13v3h3.5z" fill="#008C45" />
        <path d="M14.5 8.5L18 5v7l-3.5-3.5zm-5 7L6 19v-7l3.5 3.5z" fill="#FFC20E" />
      </svg>
    )
  },
  {
    name: "Domino's",
    renderIcon: () => (
      <svg viewBox="0 0 24 24" fill="none" width="44" height="44">
        <g transform="rotate(-45 12 12)">
          <rect x="2" y="6" width="10" height="12" fill="#006491" rx="1.5" />
          <rect x="12" y="6" width="10" height="12" fill="#E31B23" rx="1.5" />
          <line x1="12" y1="6" x2="12" y2="18" stroke="#FFFFFF" strokeWidth="1.5" />
          <circle cx="5" cy="12" r="1.5" fill="#FFFFFF" />
          <circle cx="9" cy="12" r="1.5" fill="#FFFFFF" />
          <circle cx="17" cy="12" r="1.5" fill="#FFFFFF" />
        </g>
      </svg>
    )
  },
  {
    name: "Pizza Hut",
    renderIcon: () => (
      <svg viewBox="0 0 24 24" fill="none" width="44" height="44">
        <path d="M12 3C7 3 3 6.5 2 8c1.5-1 4.5-2 10-2s8.5 1 10 2c-1-1.5-5-5-10-5zm-9.5 7c2 0 4.5-1 9.5-1s7.5 1 9.5 1c.5 1-.5 2-2 2.5-2-.5-5-1-7.5-1s-5.5.5-7.5 1c-1.5-.5-2.5-1.5-2-2.5z" fill="#E31837" />
        <path d="M2.5 15.5c4-1 7.5-1.5 9.5-1.5s5.5.5 9.5 1.5c1 1.5-2 2-9.5 2s-10.5-.5-9.5-2z" fill="#FFC20E" />
      </svg>
    )
  },
  {
    name: "Burger King",
    renderIcon: () => (
      <svg viewBox="0 0 24 24" fill="none" width="44" height="44">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c2.5 0 4.8-.9 6.5-2.5l-2-2C15 18.5 13.6 19 12 19c-3.9 0-7-3.1-7-7s3.1-7 7-7c1.6 0 3 .5 4.5 1.5l2-2C16.8 2.9 14.5 2 12 2z" fill="#005A9C" />
        <path d="M6 10c0-2.5 2.5-4.5 6-4.5s6 2 6 4.5H6z" fill="#F2A900" />
        <path d="M6 14c0 2.5 2.5 4.5 6 4.5s6-2 6-4.5H6z" fill="#F2A900" />
      </svg>
    )
  },
  {
    name: "KFC",
    renderIcon: () => (
      <svg viewBox="0 0 24 24" fill="#A30000" width="44" height="44">
        <path d="M12 2L3 5v8c0 5 4.5 8 9 9 4.5-1 9-4 9-9V5l-9-3z" />
        <rect x="7" y="6" width="2" height="10" fill="#FFFFFF" />
        <rect x="11" y="6" width="2" height="10" fill="#FFFFFF" />
        <rect x="15" y="6" width="2" height="10" fill="#FFFFFF" />
      </svg>
    )
  },
  {
    name: "Taco Bell",
    renderIcon: () => (
      <svg viewBox="0 0 24 24" fill="#702082" width="44" height="44">
        <path d="M12 2a7 7 0 0 0-7 7v4a6.5 6.5 0 0 0 .5 2.5l-.5.5v1h14v-1l-.5-.5a6.5 6.5 0 0 0 .5-2.5V9a7 7 0 0 0-7-7zm0 18a2 2 0 1 1-2-2 2 2 0 0 1 2 2z" />
      </svg>
    )
  },
  {
    name: "Dunkin'",
    renderIcon: () => (
      <svg viewBox="0 0 24 24" fill="#FF671F" width="44" height="44">
        <path d="M2 5h6c2.2 0 4 1.8 4 4v6c0 2.2-1.8 4-4 4H2V5zm6 11c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H5v9h3zm8-11h6c2.2 0 4 1.8 4 4v6c0 2.2-1.8 4-4 4h-6V5zm6 11c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2h-3v9h3z" />
      </svg>
    )
  },
  {
    name: "Chipotle",
    renderIcon: () => (
      <svg viewBox="0 0 24 24" fill="#A30000" width="44" height="44">
        <path d="M19.3 5.3c-.6-.7-1.7-.8-2.4-.2l-1.5 1.2c-1.2-.5-2.6-.7-3.9-.2-2.1.8-3.8 2.6-4.5 4.8-.6 1.8-.4 3.7.4 5.3-1.6.4-3.1 1.4-4.1 2.8-1 1.4-1.2 3.3-.6 4.9.4 1 1.4 1.5 2.4 1.1 1-.4 1.5-1.4 1.1-2.4-.3-.8-.2-1.7.3-2.4.6-.9 1.6-1.5 2.7-1.7 1.5 1.2 3.4 1.8 5.4 1.5 2.6-.4 4.8-2.2 5.6-4.8.9-2.8.2-5.7-1.7-7.6l1.2-1.5c.7-.6.6-1.7-.1-2.4z" />
      </svg>
    )
  },
  {
    name: "Shake Shack",
    renderIcon: () => (
      <svg viewBox="0 0 24 24" fill="none" width="44" height="44">
        <path d="M3 11c0-3.5 4-6 9-6s9 2.5 9 6H3z" fill="#E2A03F" />
        <rect x="2" y="12" width="20" height="2" fill="#5C7F1A" />
        <rect x="2" y="15" width="20" height="1.5" fill="#EF4444" />
        <path d="M4 18c0 2 3.5 3 8 3s8-1 8-3H4z" fill="#E2A03F" />
      </svg>
    )
  },
  {
    name: "Baskin Robbins",
    renderIcon: () => (
      <svg viewBox="0 0 24 24" fill="none" width="44" height="44">
        <path d="M12 2C8 2 5 5 5 9c0 1.5.5 3 1.5 4L12 22l5.5-9c1-1 1.5-2.5 1.5-4 0-4-3-7-7-7z" fill="#0067B1" />
        <circle cx="12" cy="9" r="3" fill="#E11A82" />
      </svg>
    )
  },
  {
    name: "Pizza Express",
    renderIcon: () => (
      <svg viewBox="0 0 24 24" fill="none" width="44" height="44">
        <circle cx="12" cy="12" r="10" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" />
        <circle cx="8" cy="9" r="1.5" fill="#EF4444" />
        <circle cx="15" cy="10" r="1.5" fill="#EF4444" />
        <circle cx="11" cy="15" r="1.5" fill="#EF4444" />
        <path d="M12 2v20M2 12h20" stroke="#EF4444" strokeWidth="1" strokeDasharray="2 2" />
      </svg>
    )
  },
  {
    name: "Costa Coffee",
    renderIcon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="#7E1535" strokeWidth="2" width="44" height="44">
        <path d="M17 8h1a4 4 0 1 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" fill="#7E1535" />
        <path d="M6 2v3M10 2v3M14 2v3" stroke="#D97706" strokeLinecap="round" />
      </svg>
    )
  },
  {
    name: "Wendy's",
    renderIcon: () => (
      <svg viewBox="0 0 24 24" fill="none" width="44" height="44">
        <circle cx="12" cy="12" r="10" fill="#005A9C" />
        <circle cx="12" cy="11" r="5" fill="#FFFFFF" />
        <circle cx="8" cy="13" r="2.5" fill="#E31837" />
        <circle cx="16" cy="13" r="2.5" fill="#E31837" />
      </svg>
    )
  },
  {
    name: "Nando's",
    renderIcon: () => (
      <svg viewBox="0 0 24 24" fill="none" width="44" height="44">
        <path d="M12 2c0 0-4 4-4 8 0 3 2 5 4 5s4-2 4-5c0-4-4-8-4-8z" fill="#DC2626" />
        <circle cx="12" cy="11" r="2" fill="#EAB308" />
      </svg>
    )
  }
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
  const items = [...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS];
  return (
    <div className="tb-marquee-viewport">
      <div className={`tb-marquee-track ${reverse ? "tb-rev" : ""}`}>
        {items.map((item, i) => {
          return (
            <div
              key={i}
              className="tb-icon-item"
              title={item.name}
              aria-label={item.name}
            >
              {item.renderIcon()}
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

        /* ── icon items ──────────────────────────────────────────────── */
        .tb-icon-item {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem 3.5rem;
          cursor: default;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease;
          opacity: 0.75;
        }
        .tb-icon-item:hover {
          transform: scale(1.15);
          opacity: 1;
        }

      `}</style>
    </section>
  );
}
