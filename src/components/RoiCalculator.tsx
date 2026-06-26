"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Sparkles, Calculator, IndianRupee, Clock,
  CheckCircle, ShieldAlert, TrendingUp, Monitor, Smartphone,
  LayoutGrid, Move, FileImage, Table2,
} from "lucide-react";

// ─── feature chips (mirrors ChefDesk Signage "Easy Layouts / Drag & Drop…") ──
const FEATURE_CHIPS = [
  { icon: <LayoutGrid size={13} />,  label: "Live Projection"  },
  { icon: <Move        size={13} />, label: "Drag Sliders"     },
  { icon: <FileImage   size={13} />, label: "Export Report"    },
  { icon: <Table2      size={13} />, label: "4 KPI Views"      },
];

// ─── output "template" slides — each is a result card shown in the screen ───
interface OutputSlide {
  title: string;
  colorClass: string;
  accentColor: string;
  icon: React.ReactNode;
  description: string;
  getValue: (extra: number, savings: number, errors: number, time: number) => string;
}

const OUTPUT_SLIDES: OutputSlide[] = [
  {
    title: "Extra Revenue",
    colorClass: "border-rose",
    accentColor: "#e30613",
    icon: <IndianRupee size={18} />,
    description: "Via automated upsells & smart QR recommendations",
    getValue: (extra) => `₹${extra.toLocaleString("en-IN")}`,
  },
  {
    title: "Monthly Savings",
    colorClass: "border-green",
    accentColor: "#059669",
    icon: <CheckCircle size={18} />,
    description: "Paper, audit admin & ingredient wastage alerts",
    getValue: (_e, savings) => `₹${savings.toLocaleString("en-IN")}`,
  },
  {
    title: "Errors Avoided",
    colorClass: "border-amber",
    accentColor: "#d97706",
    icon: <ShieldAlert size={18} />,
    description: "Losses stopped by KDS–checkout sync",
    getValue: (_e, _s, errors) => `₹${errors.toLocaleString("en-IN")}`,
  },
  {
    title: "Time Reclaimed",
    colorClass: "border-blue",
    accentColor: "#0284c7",
    icon: <Clock size={18} />,
    description: "Hours freed from manual logs each month",
    getValue: (_e, _s, _er, time) => `${time} hrs`,
  },
];

// ─── count-up hook ────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1400, started = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!started) return;
    if (target === 0) { setValue(0); return; }
    let startTs: number | null = null;
    let frame: number;
    const step = (ts: number) => {
      if (!startTs) startTs = ts;
      const pct   = Math.min((ts - startTs) / duration, 1);
      const eased = 1 - Math.pow(1 - pct, 3);
      setValue(Math.floor(eased * target));
      if (pct < 1) frame = requestAnimationFrame(step);
      else setValue(target);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, started]);
  return value;
}

// ─── top stat bar items ───────────────────────────────────────────────────────
const TOP_STATS = [
  { icon: <IndianRupee size={15} />, value: 6,  suffix: "x ROI",       label: "First-month return",    color: "#e30613" },
  { icon: <TrendingUp  size={15} />, value: 35, suffix: "% revenue↑",  label: "Avg lift reported",     color: "#059669" },
  { icon: <Clock       size={15} />, value: 28, suffix: "% time back",  label: "Manual hours saved",    color: "#0284c7" },
  { icon: <ShieldAlert size={15} />, value: 60, suffix: "% errors↓",   label: "Order mistake drop",    color: "#d97706" },
];

function StatBadge({ s, started, delay }: { s: typeof TOP_STATS[0]; started: boolean; delay: number }) {
  const count = useCountUp(s.value, 1400, started);
  return (
    <div className="roi-stat-badge"
      style={{ borderTopColor: s.color, animationDelay: `${delay}ms`, animationPlayState: started ? "running" : "paused" }}>
      <div className="roi-stat-icon" style={{ color: s.color, background: `${s.color}18` }}>{s.icon}</div>
      <div className="roi-stat-num"  style={{ color: s.color }}>{count}{s.suffix}</div>
      <div className="roi-stat-lbl">{s.label}</div>
    </div>
  );
}

// ─── main component ───────────────────────────────────────────────────────────
export default function RoiCalculator() {
  const [ordersPerDay, setOrdersPerDay] = useState(150);
  const [tables,       setTables]       = useState(20);
  const [outlets,      setOutlets]      = useState(1);
  const [staffCount,   setStaffCount]   = useState(8);

  // view mode toggle — mirrors ChefDesk Landscape / Portrait toggle
  const [viewMode, setViewMode] = useState<"summary" | "breakdown">("summary");

  // active slide in the screen panel (auto-cycles like Signage templates)
  const [activeSlide,   setActiveSlide]   = useState(0);
  const [slideExiting,  setSlideExiting]  = useState(false);
  const [slideDir,      setSlideDir]      = useState<"up"|"down">("up");
  const AUTO_SLIDE = 3200;

  // scroll-in
  const sectionRef = useRef<HTMLElement>(null);
  const [inView,           setInView]           = useState(false);
  const [statsStarted,     setStatsStarted]     = useState(false);
  const [headerVisible,    setHeaderVisible]    = useState(false);
  const [chipsVisible,     setChipsVisible]     = useState(false);
  const [leftVisible,      setLeftVisible]      = useState(false);
  const [rightVisible,     setRightVisible]     = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        setTimeout(() => setHeaderVisible(true), 80);
        setTimeout(() => setStatsStarted(true),  200);
        setTimeout(() => setChipsVisible(true),  320);
        setTimeout(() => setLeftVisible(true),   450);
        setTimeout(() => setRightVisible(true),  600);
        obs.disconnect();
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // auto-cycle the screen slide (ChefDesk template auto-scroll)
  const goSlide = useCallback((next: number, dir: "up"|"down") => {
    setSlideDir(dir);
    setSlideExiting(true);
    setTimeout(() => {
      setActiveSlide(next);
      setSlideExiting(false);
    }, 350);
  }, []);

  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => {
      goSlide((activeSlide + 1) % OUTPUT_SLIDES.length, "up");
    }, AUTO_SLIDE);
    return () => clearInterval(t);
  }, [inView, activeSlide, goSlide]);

  // formulas
  const extraRevenue   = outlets * ordersPerDay * 30 * 25;
  const monthlySavings = outlets * (staffCount * 2000 + ordersPerDay * 3 + 6000);
  const reducedErrors  = outlets * ordersPerDay * 30 * 0.05 * 200;
  const timeSaved      = outlets * (staffCount * 12 + 25);
  const totalValue     = extraRevenue + monthlySavings + reducedErrors;

  const slide      = OUTPUT_SLIDES[activeSlide];
  const slideValue = slide.getValue(extraRevenue, monthlySavings, reducedErrors, timeSaved);

  return (
    <section className="roi-section" id="roi" ref={sectionRef}>
      <div className="glow-spot glow-rose"  style={{ top: "20%",    left: "10%",  width: "420px", height: "420px" }} />
      <div className="glow-spot glow-green" style={{ bottom: "20%", right: "10%", width: "420px", height: "420px" }} />

      <div className="container">

        {/* ── header ───────────────────────────────────────────────────── */}
        <div className={`roi-header ${headerVisible ? "roi-fadein" : ""}`} style={{ textAlign: "center", marginBottom: "2.5rem" }}>

          <h2 className="gradient-text" style={{ fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-1.5px", marginBottom: "1rem" }}>
            Calculate Your Operating Leverage
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto", lineHeight: 1.6 }}>
            See how much manual labor, table turnaround delay, order errors, and ingredient wastage you can save with OrderJi.
          </p>
        </div>

        {/* ── feature chips row (ChefDesk "Easy Layouts / Drag & Drop" row) ── */}
        <div className="roi-chips-row" style={{ marginBottom: "2.5rem" }}>
          {FEATURE_CHIPS.map((c, i) => (
            <div key={c.label} className={`roi-chip ${chipsVisible ? "roi-chip-visible" : ""}`}
              style={{ transitionDelay: `${i * 90}ms` }}>
              {c.icon}{c.label}
            </div>
          ))}
        </div>

        {/* ── stat badges bar (count-up on scroll) ─────────────────────── */}
        <div className="roi-stats-bar" style={{ marginBottom: "3rem" }}>
          {TOP_STATS.map((s, i) => (
            <StatBadge key={s.label} s={s} started={statsStarted} delay={i * 110} />
          ))}
        </div>

        {/* ── main two-column layout ────────────────────────────────────── */}
        <div className="roi-main-grid">

          {/* LEFT — slider inputs panel (the "designer controls") */}
          <div className={`roi-inputs-card glass-card roi-slide-left ${leftVisible ? "roi-visible" : ""}`}>
            <div className="roi-panel-header">
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Calculator size={15} color="var(--accent-orange)" />
                <span>RESTAURANT DIMENSIONS</span>
              </div>
            </div>

            {([
              { label: "Orders per Day",     val: ordersPerDay, min: 50,  max: 1000, step: 10, set: setOrdersPerDay },
              { label: "Dine-In Tables",     val: tables,       min: 5,   max: 120,  step: 5,  set: setTables       },
              { label: "Active Outlets",     val: outlets,      min: 1,   max: 20,   step: 1,  set: setOutlets      },
              { label: "Total Staff Members",val: staffCount,   min: 2,   max: 60,   step: 1,  set: setStaffCount   },
            ] as const).map((s) => (
              <div className="slider-group" key={s.label}>
                <div className="slider-lbl">
                  <span>{s.label}</span>
                  <strong className="slider-val">{s.val}</strong>
                </div>
                <input type="range" min={s.min} max={s.max} step={s.step} value={s.val}
                  onChange={(e) => s.set(parseInt(e.target.value))} className="custom-range" />
                <div className="slider-limits"><span>{s.min}</span><span>{s.max}+</span></div>
              </div>
            ))}

            {/* total value pill at bottom of inputs */}
            <div className="roi-input-total">
              <span className="roi-input-total-label">COMBINED MONTHLY VALUE</span>
              <span className="roi-input-total-value">₹{totalValue.toLocaleString("en-IN")}</span>
            </div>
          </div>

          {/* RIGHT — Screen display panel (ChefDesk Signage template viewer) */}
          <div className={`roi-screen-side roi-slide-right ${rightVisible ? "roi-visible" : ""}`}>

            {/* view-mode toggle — mirrors Landscape / Portrait tab */}
            <div className="roi-viewmode-tabs">
              <button className={`roi-tab ${viewMode === "summary"   ? "roi-tab-active" : ""}`}
                onClick={() => setViewMode("summary")}>
                <Monitor size={14} /> Summary View
              </button>
              <button className={`roi-tab ${viewMode === "breakdown" ? "roi-tab-active" : ""}`}
                onClick={() => setViewMode("breakdown")}>
                <Smartphone size={14} /> Breakdown View
              </button>
            </div>

            {/* screen bezel — contains the auto-cycling output card */}
            <div className={`roi-screen-bezel ${viewMode === "breakdown" ? "roi-bezel-tall" : ""}`}>
              <div className="roi-screen-inner">

                {viewMode === "summary" ? (
                  /* SUMMARY: cycling highlighted single KPI */
                  <div className={`roi-slide-card ${slideExiting ? `roi-slide-exit-${slideDir}` : "roi-slide-enter"}`}
                    style={{ borderColor: slide.accentColor + "55" }}>
                    <div className="roi-slide-icon" style={{ color: slide.accentColor, background: slide.accentColor + "18" }}>
                      {slide.icon}
                    </div>
                    <div className="roi-slide-label" style={{ color: slide.accentColor }}>{slide.title.toUpperCase()}</div>
                    <div className="roi-slide-value" style={{ color: slide.accentColor }}>{slideValue}</div>
                    <div className="roi-slide-desc">{slide.description}</div>
                    {/* progress dots */}
                    <div className="roi-slide-dots">
                      {OUTPUT_SLIDES.map((_, i) => (
                        <button key={i}
                          className={`roi-slide-dot ${i === activeSlide ? "roi-slide-dot-active" : ""}`}
                          style={{ background: i === activeSlide ? slide.accentColor : undefined }}
                          onClick={() => goSlide(i, i > activeSlide ? "up" : "down")}
                          aria-label={`View ${OUTPUT_SLIDES[i].title}`}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  /* BREAKDOWN: all 4 KPIs in a grid */
                  <div className="roi-breakdown-grid">
                    {OUTPUT_SLIDES.map((s) => (
                      <div key={s.title} className="roi-breakdown-card" style={{ borderTopColor: s.accentColor }}>
                        <div className="roi-breakdown-icon" style={{ color: s.accentColor }}>{s.icon}</div>
                        <div className="roi-breakdown-val" style={{ color: s.accentColor }}>
                          {s.getValue(extraRevenue, monthlySavings, reducedErrors, timeSaved)}
                        </div>
                        <div className="roi-breakdown-title">{s.title}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* bottom bezel bar — like a screen brand strip */}
              <div className="roi-bezel-bar">
                <span className="roi-bezel-label">ORDERJI LIVE PROJECTION</span>
                <span className="roi-bezel-dot" />
              </div>
            </div>

            {/* template-strip thumbnails below the screen (ChefDesk scrolling template strip) */}
            <div className="roi-template-strip">
              {OUTPUT_SLIDES.map((s, i) => (
                <button key={s.title}
                  className={`roi-thumb ${i === activeSlide && viewMode === "summary" ? "roi-thumb-active" : ""}`}
                  style={{ borderColor: i === activeSlide && viewMode === "summary" ? s.accentColor : undefined }}
                  onClick={() => { setViewMode("summary"); goSlide(i, i > activeSlide ? "up" : "down"); }}>
                  <div className="roi-thumb-icon" style={{ color: s.accentColor, background: s.accentColor + "18" }}>
                    {s.icon}
                  </div>
                  <span className="roi-thumb-label">{s.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── all scoped styles ────────────────────────────────────────── */}
      <style jsx global>{`
        .roi-section {
          padding: 8rem 0;
          background-color: var(--bg-secondary);
          position: relative;
          z-index: 10;
        }

        /* header */
        .roi-header {
          opacity: 0; transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .roi-header.roi-fadein { opacity: 1; transform: translateY(0); }

        /* ── feature chips row — mirrors ChefDesk "Easy Layouts / Drag & Drop" ── */
        .roi-chips-row {
          display: flex; flex-wrap: wrap; gap: 0.6rem; justify-content: center;
        }
        .roi-chip {
          display: inline-flex; align-items: center; gap: 0.4rem;
          padding: 0.4rem 0.85rem; border-radius: 9999px;
          background: var(--bg-card); border: 1px solid var(--border-color);
          font-size: 0.8rem; font-weight: 600; color: var(--text-secondary);
          opacity: 0; transform: translateY(14px);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1),
                      border-color 0.2s, color 0.2s;
        }
        .roi-chip.roi-chip-visible { opacity: 1; transform: translateY(0); }
        .roi-chip:hover { border-color: var(--accent-orange); color: var(--accent-orange); }

        /* ── count-up stat badges ──────────────────────────────────────── */
        .roi-stats-bar {
          display: flex; flex-wrap: wrap; gap: 1.25rem; justify-content: center;
        }
        .roi-stat-badge {
          flex: 1 1 160px; max-width: 210px;
          background: var(--bg-card); border: 1px solid var(--border-color);
          border-top: 3px solid; border-radius: 14px;
          padding: 1.1rem 1.4rem;
          display: flex; flex-direction: column; gap: 0.3rem;
          box-shadow: 0 4px 18px rgba(0,0,0,0.04);
          animation: roiStatUp 0.6s cubic-bezier(0.16,1,0.3,1) both;
          animation-play-state: paused;
        }
        @keyframes roiStatUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .roi-stat-icon {
          width: 30px; height: 30px; border-radius: 7px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 0.15rem;
        }
        .roi-stat-num  { font-size: 1.35rem; font-weight: 800; letter-spacing: -0.5px; line-height: 1; }
        .roi-stat-lbl  { font-size: 0.68rem; color: var(--text-muted); font-weight: 600; }

        /* ── main two-column grid ──────────────────────────────────────── */
        .roi-main-grid {
          display: grid; grid-template-columns: 1fr;
          gap: 3rem; align-items: start; max-width: 1100px; margin: 0 auto;
        }
        @media (min-width: 1024px) {
          .roi-main-grid { grid-template-columns: 400px 1fr; }
        }

        /* slide-in animations */
        .roi-slide-left  { opacity: 0; transform: translateX(-36px); transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1); }
        .roi-slide-right { opacity: 0; transform: translateX(36px);  transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1); }
        .roi-slide-left.roi-visible, .roi-slide-right.roi-visible { opacity: 1; transform: translateX(0); }

        /* ── left inputs card ──────────────────────────────────────────── */
        .roi-inputs-card {
          padding: 2.25rem; background: var(--bg-card);
          display: flex; flex-direction: column; gap: 0;
        }
        .roi-panel-header {
          font-size: 0.72rem; font-weight: 700; color: var(--text-muted);
          letter-spacing: 1px; margin-bottom: 2rem;
          display: flex; align-items: center;
        }
        .slider-group { margin-bottom: 1.75rem; }
        .slider-lbl {
          display: flex; justify-content: space-between;
          font-size: 0.88rem; margin-bottom: 0.45rem; color: var(--text-primary);
        }
        .slider-val { color: var(--accent-orange); font-weight: 700; }
        .custom-range {
          width: 100%; -webkit-appearance: none;
          background: var(--bg-tertiary); height: 6px;
          border-radius: 9999px; outline: none;
        }
        .custom-range::-webkit-slider-thumb {
          -webkit-appearance: none; width: 16px; height: 16px;
          border-radius: 50%; background: #fff; cursor: pointer;
          border: 3px solid var(--accent-orange);
          box-shadow: 0 2px 6px rgba(227,6,19,0.3);
          transition: transform 0.1s ease;
        }
        .custom-range::-webkit-slider-thumb:hover { transform: scale(1.2); }
        .slider-limits {
          display: flex; justify-content: space-between;
          font-size: 0.68rem; color: var(--text-muted); margin-top: 0.2rem;
        }
        .roi-input-total {
          margin-top: auto; padding-top: 1.5rem;
          border-top: 1px solid var(--border-color);
          display: flex; flex-direction: column; gap: 0.2rem;
        }
        .roi-input-total-label {
          font-size: 0.65rem; font-weight: 700;
          color: var(--text-muted); letter-spacing: 1px;
        }
        .roi-input-total-value {
          font-size: 1.8rem; font-weight: 800;
          color: var(--accent-orange); letter-spacing: -0.5px;
        }

        /* ── right screen side ─────────────────────────────────────────── */
        .roi-screen-side { display: flex; flex-direction: column; gap: 1rem; }

        /* view-mode toggle — ChefDesk Landscape/Portrait tab */
        .roi-viewmode-tabs {
          display: flex; gap: 0.5rem; align-self: flex-start;
          background: var(--bg-card); border: 1px solid var(--border-color);
          border-radius: 12px; padding: 4px;
        }
        .roi-tab {
          display: flex; align-items: center; gap: 0.4rem;
          padding: 0.45rem 1rem; border-radius: 9px; border: none;
          background: transparent; font-size: 0.8rem; font-weight: 600;
          color: var(--text-muted); cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .roi-tab-active {
          background: var(--accent-orange); color: #fff;
          box-shadow: 0 2px 8px rgba(227,6,19,0.3);
        }

        /* screen bezel — the monitor frame */
        .roi-screen-bezel {
          background: #1a1714; border-radius: 16px;
          padding: 1.5rem 1.5rem 0;
          box-shadow: 0 8px 40px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,255,255,0.04);
          display: flex; flex-direction: column;
          min-height: 320px;
          transition: min-height 0.4s cubic-bezier(0.16,1,0.3,1);
          overflow: hidden;
        }
        .roi-bezel-tall { min-height: 380px; }

        .roi-screen-inner {
          flex: 1; background: var(--bg-card);
          border-radius: 10px 10px 0 0;
          overflow: hidden; display: flex;
          align-items: center; justify-content: center;
          min-height: 250px; padding: 1.5rem;
        }
        .roi-bezel-bar {
          display: flex; align-items: center; justify-content: center;
          gap: 0.5rem; padding: 0.6rem 0;
        }
        .roi-bezel-label {
          font-size: 0.55rem; font-weight: 700; letter-spacing: 2px;
          color: rgba(255,255,255,0.25);
        }
        .roi-bezel-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: rgba(227,6,19,0.6);
          animation: roiDotPulse 2s ease-in-out infinite;
        }
        @keyframes roiDotPulse {
          0%,100% { opacity: 0.5; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.3); }
        }

        /* ── cycling slide card (Summary view) ─────────────────────────── */
        .roi-slide-card {
          width: 100%; padding: 2rem 1.5rem;
          border: 1.5px solid; border-radius: 14px;
          background: rgba(255,255,255,0.85);
          display: flex; flex-direction: column; align-items: center;
          text-align: center; gap: 0.6rem;
        }
        /* slide enter/exit — ChefDesk template swap animation */
        .roi-slide-enter    { animation: roiSlideEnter 0.4s cubic-bezier(0.16,1,0.3,1) both; }
        .roi-slide-exit-up  { animation: roiSlideExitUp   0.35s ease both; }
        .roi-slide-exit-down{ animation: roiSlideExitDown 0.35s ease both; }
        @keyframes roiSlideEnter    { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes roiSlideExitUp   { from { opacity:1; transform:translateY(0);    } to { opacity:0; transform:translateY(-20px); } }
        @keyframes roiSlideExitDown { from { opacity:1; transform:translateY(0);    } to { opacity:0; transform:translateY(20px);  } }

        .roi-slide-icon {
          width: 48px; height: 48px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          animation: roiIconFloat 3s ease-in-out infinite;
        }
        @keyframes roiIconFloat {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-5px); }
        }
        .roi-slide-label {
          font-size: 0.65rem; font-weight: 800; letter-spacing: 1.5px;
        }
        .roi-slide-value {
          font-size: 2.6rem; font-weight: 800; letter-spacing: -1px; line-height: 1;
        }
        .roi-slide-desc {
          font-size: 0.78rem; color: var(--text-muted); line-height: 1.4; max-width: 220px;
        }
        .roi-slide-dots {
          display: flex; gap: 0.4rem; margin-top: 0.5rem;
        }
        .roi-slide-dot {
          width: 7px; height: 7px; border-radius: 50%;
          border: none; background: var(--border-color);
          cursor: pointer; padding: 0;
          transition: background 0.2s, transform 0.2s;
        }
        .roi-slide-dot-active { transform: scale(1.4); }

        /* ── breakdown grid (Breakdown view) ────────────────────────────── */
        .roi-breakdown-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 0.75rem; width: 100%;
        }
        .roi-breakdown-card {
          background: rgba(255,255,255,0.9);
          border-top: 3px solid; border-radius: 10px;
          padding: 0.9rem 0.8rem;
          display: flex; flex-direction: column; gap: 0.25rem;
          animation: roiCardPop 0.4s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes roiCardPop {
          from { opacity:0; transform:scale(0.93); }
          to   { opacity:1; transform:scale(1);    }
        }
        .roi-breakdown-icon { width: 22px; height: 22px; margin-bottom: 0.1rem; }
        .roi-breakdown-val   { font-size: 1.2rem; font-weight: 800; letter-spacing: -0.3px; line-height:1; }
        .roi-breakdown-title { font-size: 0.68rem; color: var(--text-muted); font-weight: 600; }

        /* ── template strip (ChefDesk template thumbnail row) ────────────── */
        .roi-template-strip {
          display: flex; gap: 0.6rem; overflow-x: auto;
          padding-bottom: 0.25rem;
        }
        .roi-template-strip::-webkit-scrollbar { height: 3px; }
        .roi-template-strip::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 2px; }

        .roi-thumb {
          flex-shrink: 0; display: flex; flex-direction: column; align-items: center;
          gap: 0.35rem; padding: 0.6rem 0.9rem;
          background: var(--bg-card); border: 1.5px solid var(--border-color);
          border-radius: 10px; cursor: pointer;
          transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .roi-thumb:hover { transform: translateY(-2px); box-shadow: 0 4px 14px rgba(0,0,0,0.07); }
        .roi-thumb-active { box-shadow: 0 4px 16px rgba(0,0,0,0.1); }
        .roi-thumb-icon {
          width: 32px; height: 32px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
        }
        .roi-thumb-label { font-size: 0.65rem; font-weight: 600; color: var(--text-secondary); white-space: nowrap; }

        /* badge global (used in header) */
        .badge {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: rgba(227,6,19,0.08); border: 1px solid rgba(227,6,19,0.2);
          color: var(--text-primary); padding: 0.4rem 1rem;
          border-radius: 9999px; font-size: 0.85rem; font-weight: 500;
          margin-bottom: 1.5rem;
        }
      `}</style>
    </section>
  );
}
