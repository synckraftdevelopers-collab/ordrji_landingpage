"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Sparkles, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";

/* ─── data ────────────────────────────────────────────────────────────────── */
interface InventoryItem {
  name: string; category: string; qty: string;
  level: number; image: string; prediction: string;
  status: "Normal" | "Medium" | "Critical";
}

const INVENTORY_ITEMS: InventoryItem[] = [
  {
    name: "Paneer (Cottage Cheese)", category: "Dairy Products", qty: "18.5 kg left", level: 85,
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=600",
    prediction: "High dinner demand expected. Paneer likely to finish tomorrow by 10 PM.",
    status: "Normal",
  },
  {
    name: "Mozzarella Cheese Blend", category: "Dairy Products", qty: "12.0 kg left", level: 60,
    image: "https://images.unsplash.com/photo-1589476993333-f55b84301219?auto=format&fit=crop&q=80&w=600",
    prediction: "Stock level stable. Reorder threshold will be crossed in 3 days.",
    status: "Medium",
  },
  {
    name: "Refined Sunflower Oil", category: "Consumables", qty: "4.5 Liters left", level: 18,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=600",
    prediction: "CRITICAL: Depletion expected in 4 hours. Auto-replenishment order triggered.",
    status: "Critical",
  },
  {
    name: "Organic Season Vegetables", category: "Fresh Produce", qty: "32.0 kg left", level: 80,
    image: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&q=80&w=600",
    prediction: "Scheduled delivery of 50 kg fresh greens arriving tomorrow at 6:00 AM.",
    status: "Normal",
  },
];

const LEVEL_COLORS: Record<string, string> = {
  Normal: "var(--accent-green)",
  Medium: "var(--accent-amber)",
  Critical: "var(--accent-rose)",
};

/* ─── pulsing dot ─────────────────────────────────────────────────────────── */
function PulseDot() {
  return (
    <span className="inv-pulse-wrap" aria-hidden>
      <span className="inv-pulse-ring" />
      <span className="inv-pulse-core" />
    </span>
  );
}

/* ─── horizontal card — image LEFT, text RIGHT ───────────────────────────── */
function HCard({ item, active }: { item: InventoryItem; active: boolean }) {
  const isCritical = item.status === "Critical";
  const levelColor = LEVEL_COLORS[item.status];

  return (
    <div className={`hcard glass-card ${isCritical ? "hcard-critical" : ""} ${active ? "hcard-active" : ""}`}>

      {/* ── LEFT — IMAGE always first ── */}
      <div className="hcard-img-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.image} alt={item.name} className="hcard-img" />
        <div className="hcard-img-overlay" />

        {/* badges over image */}
        <span className="hcard-cat">{item.category}</span>
        {isCritical && (
          <span className="hcard-low"><PulseDot /> LOW STOCK</span>
        )}
        <span className="hcard-qty">{item.qty}</span>
      </div>

      {/* ── RIGHT — TEXT slides in ── */}
      <div className="hcard-body">
        <h4 className="hcard-name">{item.name}</h4>

        {/* stock bar */}
        <div className="hcard-bar-wrap">
          <div className="hcard-bar-row">
            <span>Stock Volume</span>
            <span style={{ color: levelColor, fontWeight: 700 }}>{item.level}%</span>
          </div>
          <div className="hcard-track">
            <div
              className={`hcard-fill ${isCritical ? "hcard-fill-pulse" : ""}`}
              style={{
                width: active ? `${item.level}%` : "0%",
                background: levelColor,
                boxShadow: `0 0 8px ${levelColor}88`,
              }}
            />
          </div>
        </div>

        {/* AI forecast */}
        <div
          className="hcard-forecast"
          style={{
            borderColor:     isCritical ? "rgba(220,38,38,0.25)" : "var(--border-color)",
            backgroundColor: isCritical ? "rgba(220,38,38,0.03)" : "transparent",
          }}
        >
          <div
            className="hcard-forecast-title"
            style={{ color: isCritical ? "var(--accent-rose)" : "var(--accent-orange)" }}
          >
            <RefreshCw size={11} className="inv-spin" /> AI DEPLETION FORECAST
          </div>
          <p
            className="hcard-forecast-text"
            style={{ color: isCritical ? "var(--text-primary)" : "var(--text-secondary)" }}
          >
            {item.prediction}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── main component ──────────────────────────────────────────────────────── */
export default function Inventory() {
  const sectionRef  = useRef<HTMLElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);

  const [inView,    setInView]    = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef(0);
  const scrollStart = useRef(0);

  const total = INVENTORY_ITEMS.length;
  const AUTO_MS = 4000;

  /* section entrance */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* scroll track to active card */
  const scrollToIdx = useCallback((idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[idx] as HTMLElement;
    if (!card) return;
    track.scrollTo({ left: card.offsetLeft - 24, behavior: "smooth" });
  }, []);

  useEffect(() => { scrollToIdx(activeIdx); }, [activeIdx, scrollToIdx]);

  /* auto-advance */
  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => {
      setActiveIdx(i => (i + 1) % total);
    }, AUTO_MS);
    return () => clearInterval(t);
  }, [inView, total]);

  /* sync active dot when user manually scrolls */
  const onScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cardW = (track.children[0] as HTMLElement)?.offsetWidth ?? 0;
    const idx   = Math.round(track.scrollLeft / (cardW + 24));
    setActiveIdx(Math.max(0, Math.min(idx, total - 1)));
  }, [total]);

  /* drag-to-scroll (mouse) */
  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current  = e.pageX;
    scrollStart.current = trackRef.current?.scrollLeft ?? 0;
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return;
    trackRef.current.scrollLeft = scrollStart.current - (e.pageX - dragStart.current);
  };
  const onMouseUp = () => setIsDragging(false);

  const prev = () => setActiveIdx(i => Math.max(0, i - 1));
  const next = () => setActiveIdx(i => Math.min(total - 1, i + 1));

  return (
    <section className="inv-section" ref={sectionRef}>
      <div className="glow-spot glow-rose"   style={{ top: "20%",    right: "5%", width: "400px", height: "400px" }} />
      <div className="glow-spot glow-purple" style={{ bottom: "10%", left:  "5%", width: "400px", height: "400px" }} />

      <div className="container">

        {/* ── DYNAMIC / STICKY HEADER (stays fixed at top while cards scroll) ── */}
        <div className={`inv-header-wrap ${inView ? "inv-hdr-in" : ""}`}>

          {/* top row: arrows only */}
          <div className="inv-hdr-toprow">
            {/* navigation arrows */}
            <div className="inv-arrows">
              <button className="inv-arrow" onClick={prev} disabled={activeIdx === 0} aria-label="Previous">
                <ChevronLeft size={18} />
              </button>
              <button className="inv-arrow" onClick={next} disabled={activeIdx === total - 1} aria-label="Next">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* headline + subtitle side by side on desktop */}
          <div className="inv-hdr-content">
            <div className="inv-hdr-left">
              <h2 className="inv-title">
                Inventory Intelligence<br className="inv-br" /> & Predictions
              </h2>
            </div>
            <div className="inv-hdr-right">
              <p className="inv-subtitle">
                Stop wasting ingredients. OrderJi tracks raw items down to grams,
                predicts run-out times, and automatically triggers supplier purchases.
              </p>
              {/* progress dots */}
              <div className="inv-dots">
                {INVENTORY_ITEMS.map((_, i) => (
                  <button
                    key={i}
                    className={`inv-dot ${i === activeIdx ? "inv-dot-active" : ""}`}
                    onClick={() => setActiveIdx(i)}
                    aria-label={`Go to item ${i + 1}`}
                  >
                    {i === activeIdx && (
                      <span
                        className="inv-dot-fill"
                        style={{ animationDuration: `${AUTO_MS}ms` }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* thin divider */}
          <div className="inv-hdr-rule" />
        </div>

        {/* ── HORIZONTAL SCROLLING CARDS TRACK ── */}
        <div
          ref={trackRef}
          className={`inv-track ${inView ? "inv-track-in" : ""} ${isDragging ? "inv-dragging" : ""}`}
          onScroll={onScroll}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {INVENTORY_ITEMS.map((item, idx) => (
            <div
              key={item.name}
              className="inv-card-slot"
              style={{ animationDelay: `${idx * 100}ms`, animationPlayState: inView ? "running" : "paused" }}
            >
              <HCard item={item} active={inView} />
            </div>
          ))}
        </div>

      </div>

      {/* ── ALL STYLES ──────────────────────────────────────────────── */}
      <style jsx global>{`

        /* ── section ─────────────────────────────────────────────────── */
        .inv-section {
          padding: 6rem 0 4rem;
          background-color: var(--bg-secondary);
          position: relative;
          overflow: hidden;
        }

        /* ─────────────────────────────────────────────────────────────
           DYNAMIC HEADER
           - Starts invisible, slides down on entry (DotPe style)
           - On desktop stays sticky at top while track scrolls
        ──────────────────────────────────────────────────────────────── */
        .inv-header-wrap {
          position: sticky;
          top: 0;
          z-index: 20;
          background: var(--bg-secondary);
          padding: 1.5rem 0 1rem;
          margin-bottom: 2rem;

          opacity: 0;
          transform: translateY(-20px);
          transition: opacity 0.6s cubic-bezier(0.16,1,0.3,1),
                      transform 0.6s cubic-bezier(0.16,1,0.3,1);
        }
        .inv-hdr-in {
          opacity: 1;
          transform: translateY(0);
        }

        /* top row: badge left, arrows right */
        .inv-hdr-toprow {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
        }

        /* headline + subtitle two-col */
        .inv-hdr-content {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        @media (min-width: 768px) {
          .inv-hdr-content {
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
            align-items: end;
          }
        }

        .inv-title {
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 800;
          letter-spacing: -1.5px;
          line-height: 1.15;
          color: var(--text-primary);
          margin: 0;
        }
        .inv-br { display: none; }
        @media (min-width: 768px) { .inv-br { display: block; } }

        .inv-subtitle {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.65;
          margin: 0 0 1rem;
        }

        /* progress dots row */
        .inv-dots {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }
        .inv-dot {
          position: relative;
          height: 6px;
          border-radius: 9999px;
          border: none;
          background: var(--bg-tertiary);
          cursor: pointer;
          overflow: hidden;
          transition: width 0.35s cubic-bezier(0.16,1,0.3,1);
          width: 6px;
          padding: 0;
        }
        .inv-dot-active {
          width: 36px;
          background: rgba(227,6,19,0.15);
        }
        /* timed fill inside active dot (DotPe progress bar) */
        .inv-dot-fill {
          position: absolute;
          left: 0; top: 0; bottom: 0;
          background: var(--accent-orange);
          border-radius: 9999px;
          animation: invDotFill linear forwards;
          width: 100%;
          transform-origin: left;
          animation-name: invDotFillAnim;
        }
        @keyframes invDotFillAnim {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }

        /* nav arrows */
        .inv-arrows {
          display: flex; gap: 0.5rem;
        }
        .inv-arrow {
          width: 38px; height: 38px; border-radius: 50%;
          border: 1px solid var(--border-color);
          background: var(--bg-card);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: var(--text-secondary);
          transition: var(--transition-fast);
        }
        .inv-arrow:hover:not(:disabled) {
          border-color: var(--accent-orange);
          color: var(--accent-orange);
          transform: scale(1.08);
        }
        .inv-arrow:disabled { opacity: 0.3; cursor: not-allowed; }

        /* thin rule below header */
        .inv-hdr-rule {
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border-color) 20%, var(--border-color) 80%, transparent);
        }

        /* ─────────────────────────────────────────────────────────────
           HORIZONTAL SCROLL TRACK  (DotPe draggable row)
        ──────────────────────────────────────────────────────────────── */
        .inv-track {
          display: flex;
          gap: 1.5rem;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          padding-bottom: 1.5rem;
          cursor: grab;
          /* hide scrollbar */
          scrollbar-width: none;

          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.65s cubic-bezier(0.16,1,0.3,1) 0.15s,
                      transform 0.65s cubic-bezier(0.16,1,0.3,1) 0.15s;
        }
        .inv-track::-webkit-scrollbar { display: none; }
        .inv-track-in {
          opacity: 1;
          transform: translateY(0);
        }
        .inv-dragging { cursor: grabbing; }

        /* card slot — 4 cards in one row on desktop */
        .inv-card-slot {
          scroll-snap-align: start;
          flex: 0 0 min(80vw, 320px);
          animation: invCardSlide 0.55s cubic-bezier(0.16,1,0.3,1) both;
          animation-play-state: paused;
        }
        @media (min-width: 640px) {
          .inv-card-slot { flex: 0 0 calc(50% - 0.75rem); }
        }
        @media (min-width: 1200px) {
          .inv-card-slot { flex: 0 0 calc(25% - 1.125rem); }
        }
        @keyframes invCardSlide {
          from { opacity:0; transform: translateX(30px); }
          to   { opacity:1; transform: translateX(0); }
        }

        /* ─────────────────────────────────────────────────────────────
           HORIZONTAL CARD  — on wide desktop (4-up): stack vertically
           On smaller screens: image LEFT, text RIGHT
        ──────────────────────────────────────────────────────────────── */
        .hcard {
          display: flex;
          flex-direction: row;
          overflow: hidden;
          border-radius: 18px;
          background: var(--bg-card);
          box-shadow: 0 8px 32px rgba(0,0,0,0.06);
          min-height: 200px;
          transition: box-shadow 0.3s ease, transform 0.3s ease;
          height: 100%;
        }
        /* at 4-up width, switch to column so image is on top, text below */
        @media (min-width: 1200px) {
          .hcard {
            flex-direction: column;
            min-height: 380px;
          }
        }
        .hcard:hover {
          box-shadow: 0 18px 48px rgba(0,0,0,0.1);
          transform: translateY(-3px);
        }
        .hcard-critical {
          border-color: rgba(220,38,38,0.35) !important;
          box-shadow: 0 0 28px rgba(220,38,38,0.1) !important;
        }
        .hcard-active .hcard-fill { transition: width 1.1s cubic-bezier(0.16,1,0.3,1) 0.3s; }

        /* ── IMAGE column ── */
        .hcard-img-wrap {
          position: relative;
          flex: 0 0 160px;
          overflow: hidden;
        }
        /* on 4-up: image is full width, fixed height */
        @media (min-width: 1200px) {
          .hcard-img-wrap {
            flex: none;
            width: 100%;
            height: 180px;
          }
        }
        @media (max-width: 600px) {
          .hcard-img-wrap { flex: 0 0 120px; }
        }

        .hcard-img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          transition: transform 0.65s cubic-bezier(0.16,1,0.3,1);
        }
        .hcard:hover .hcard-img { transform: scale(1.05); }

        /* right-edge fade (horizontal) / bottom-edge fade (vertical 4-up) */
        .hcard-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            to right,
            transparent 55%,
            var(--bg-card) 100%
          );
          pointer-events: none;
        }
        @media (min-width: 1200px) {
          .hcard-img-overlay {
            background: linear-gradient(
              to bottom,
              transparent 40%,
              rgba(253,250,244,0.75) 100%
            );
          }
        }

        /* badges over image */
        .hcard-cat {
          position: absolute; top: 1rem; left: 0.85rem; z-index: 5;
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(0,0,0,0.07);
          color: var(--text-secondary);
          font-size: 0.62rem; font-weight: 700;
          padding: 0.2rem 0.55rem; border-radius: 5px; letter-spacing: 0.5px;
        }
        .hcard-low {
          position: absolute; top: 1rem; right: 0.6rem; z-index: 5;
          background: rgba(220,38,38,0.12);
          border: 1px solid rgba(220,38,38,0.25);
          color: var(--accent-rose);
          font-size: 0.62rem; font-weight: 800;
          padding: 0.2rem 0.5rem; border-radius: 5px;
          display: flex; align-items: center; gap: 0.3rem;
          letter-spacing: 0.4px;
          animation: invBadgePop 0.4s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        @keyframes invBadgePop {
          from { opacity:0; transform: scale(0.8); }
          to   { opacity:1; transform: scale(1);   }
        }
        .hcard-qty {
          position: absolute; bottom: 0.85rem; left: 0.85rem; z-index: 5;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(5px);
          color: #fff;
          font-size: 0.7rem; font-weight: 700;
          padding: 0.2rem 0.55rem; border-radius: 5px;
        }

        /* ── TEXT body ── */
        .hcard-body {
          flex: 1;
          padding: 1.25rem 1.25rem 1.25rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          justify-content: center;
          animation: hcardTextIn 0.55s cubic-bezier(0.16,1,0.3,1) 0.15s both;
        }
        @media (min-width: 1200px) {
          .hcard-body {
            padding: 1.25rem 1.25rem 1.5rem;
            justify-content: flex-start;
          }
        }
        @keyframes hcardTextIn {
          from { opacity:0; transform: translateX(16px); }
          to   { opacity:1; transform: translateX(0); }
        }

        .hcard-name {
          font-size: 0.95rem;
          font-weight: 800;
          letter-spacing: -0.2px;
          color: var(--text-primary);
          margin: 0;
          line-height: 1.3;
        }

        /* stock bar */
        .hcard-bar-wrap { display: flex; flex-direction: column; gap: 0.45rem; }
        .hcard-bar-row {
          display: flex; justify-content: space-between;
          font-size: 0.75rem; color: var(--text-secondary); font-weight: 500;
        }
        .hcard-track {
          width: 100%; height: 7px;
          background: var(--bg-tertiary);
          border-radius: 9999px; overflow: hidden;
        }
        .hcard-fill {
          height: 100%; border-radius: 9999px;
          width: 0%;
          transition: width 1.1s cubic-bezier(0.16,1,0.3,1) 0.35s;
        }
        .hcard-fill-pulse {
          animation: hcardFillPulse 2s ease-in-out infinite;
        }
        @keyframes hcardFillPulse {
          0%,100% { opacity:1;   }
          50%      { opacity:0.5; }
        }

        /* AI forecast */
        .hcard-forecast {
          border: 1px solid;
          border-radius: 10px;
          padding: 0.8rem 1rem;
          display: flex; flex-direction: column; gap: 0.35rem;
        }
        .hcard-forecast-title {
          font-size: 0.62rem; font-weight: 800;
          letter-spacing: 1px;
          display: flex; align-items: center; gap: 0.3rem;
        }
        .hcard-forecast-text {
          font-size: 0.78rem; line-height: 1.5;
          margin: 0;
        }

        /* pulse dot */
        .inv-pulse-wrap {
          position: relative; display: inline-flex;
          width: 7px; height: 7px; flex-shrink: 0;
        }
        .inv-pulse-ring {
          position: absolute; inset: 0; border-radius: 50%;
          background: rgba(220,38,38,0.5);
          animation: invPulseRing 1.4s cubic-bezier(0,0,0.2,1) infinite;
        }
        .inv-pulse-core {
          position: relative; z-index: 1;
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--accent-rose);
        }
        @keyframes invPulseRing {
          0%   { transform: scale(1);   opacity: 0.8; }
          100% { transform: scale(2.4); opacity: 0;   }
        }

        /* spin icon */
        .inv-spin { animation: invSpin 10s linear infinite; }
        @keyframes invSpin { to { transform: rotate(360deg); } }

      `}</style>
    </section>
  );
}
