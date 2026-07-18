"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
/* ─── brand logos (real culinary brands - colorful original colors) ──────── */
const BRANDS = [
  { name: "Virsa Restro", localImg: "/images/logos/virsa.jpg" },
  { name: "Mirabel", localImg: "/images/logos/mirabel.jpg" },
  { name: "Kitchen 365", localImg: "/images/logos/kitchen365.jpg" },
  { name: "Point Mansarovar", localImg: "/images/logos/mansarovar.jpg" },
  { name: "Up & Above", localImg: "/images/logos/upabove.jpg" },
  { name: "Shivai Misal House", localImg: "/images/logos/shivai.jpg" },
  { name: "New Eagle Restaurant", localImg: "/images/logos/eagle.jpg" },
  { name: "Gulmohar Fine Dine", localImg: "/images/logos/gulmohar.jpg" }
];

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
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", minWidth: "80px" }}
            >
              <Image src={item.localImg} alt={item.name} width={44} height={44} className="tb-brand-logo" />
              <span className="tb-brand-name">{item.name}</span>
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
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section className="tb-section" ref={sectionRef}>

      {/* ambient glow behind stats */}
      <div className="tb-bg-glow" />

      <div className="container">

        {/* ── eyebrow label ──────────────────────── */}
        <div className="tb-eyebrow-clip">
          <motion.p 
            className="tb-eyebrow"
            initial={{ opacity: 0, y: "100%" }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.1 }}
          >
            TRUSTED BY MODERN CULINARY BRAND FORMATS NATIONWIDE
          </motion.p>
        </div>

      </div>

      {/* ── Dual marquee belt with LARGE icons ─────────────────────────── */}
      <motion.div 
        className="tb-belt"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ type: "spring", stiffness: 180, damping: 25, delay: 0.5 }}
      >
        <MarqueeRow reverse={true} />
        <MarqueeRow reverse={false} />
      </motion.div>

      {/* ── all styles ──────────────────────────────────────────────────── */}
      <style jsx global>{`

        /* ── section ─────────────────────────────────────────────────── */
        .tb-section {
          padding: 3rem 0 0;
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
        .tb-eyebrow-clip { overflow: hidden; text-align: center; margin-bottom: 1.5rem; position: relative; z-index: 1; }

        .tb-eyebrow {
          font-size: clamp(1.1rem, 2.8vw, 1.8rem);
          font-weight: 900;
          letter-spacing: 2px; color: var(--text-muted);
          text-transform: uppercase;
          opacity: 0; transform: translateY(100%);
          transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1);
          display: inline-block;
          line-height: 1.3;
          padding: 0.2rem 0;
        }
        .tb-eyebrow.tb-reveal { opacity: 1; transform: translateY(0); }

        /* ── Restroworks stat row ────────────────────────────────────── */
        /*   Numbers start invisible, slide up + count up when in view    */
        .tb-stats-row {
          display: flex; flex-wrap: wrap; justify-content: center;
          align-items: center; gap: 0;
          margin-bottom: 1rem; position: relative; z-index: 1;
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
          position: relative; padding: 0.5rem 0 1rem;
          background: transparent;
          overflow: hidden;
          opacity: 0; transform: translateY(16px);
          transition: opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s;
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
        .tb-belt.tb-belt-in { opacity: 1; transform: translateY(0); }

        /* ── marquee viewport + track ────────────────────────────────── */
        .tb-marquee-viewport {
          overflow: hidden; margin-bottom: 0.5rem;
        }
        .tb-marquee-viewport:last-child { margin-bottom: 0; }

        .tb-marquee-track {
          display: flex; width: max-content; gap: 0;
          animation: tbScroll 40s linear infinite;
        }
        .tb-marquee-track.tb-rev {
          animation: tbScrollRev 40s linear infinite;
        }
        .tb-belt:hover .tb-marquee-track { animation-play-state: paused; }

        @keyframes tbScroll    { from { transform: translate3d(0, 0, 0);     } to { transform: translate3d(-50%, 0, 0); } }
        @keyframes tbScrollRev { from { transform: translate3d(-50%, 0, 0);  } to { transform: translate3d(0, 0, 0);    } }

        .tb-icon-item {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem 3.5rem;
          cursor: default;
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          opacity: 0.75;
        }
        .tb-icon-item:hover {
          transform: scale(1.15);
          opacity: 1;
        }

        .tb-brand-logo {
          width: 64px; height: 64px;
          object-fit: contain; border-radius: 8px;
        }
        .tb-brand-name {
          font-size: 14px; font-weight: 600; color: var(--text-secondary); white-space: nowrap;
        }

        @media (max-width: 768px) {
          .tb-icon-item { padding: 0.5rem 2.5rem; }
          .tb-brand-logo { width: 48px; height: 48px; }
          .tb-brand-name { font-size: 12px; }
          .tb-edge { width: 80px; }
        }

      `}</style>
    </section>
  );
}
