"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { TrendingUp, Users, AlertCircle, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const CASES = [
  {
    brand: "The Copper Chimney",
    location: "Mumbai // Fine Dining Format",
    owner: "Chef Kabir Sen",
    role: "Founding Partner & Chef",
    quote:
      "We were losing margins on manual table delays. Implementing Ordrji connected our QR menus directly to the line chefs. Table turn time dropped from 52 to 34 minutes, and order inaccuracies literally disappeared overnight.",
    brandImage:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800",
    ownerImage:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300",
    metrics: [
      { label: "Gross Revenue Growth", value: "+35%", icon: TrendingUp, color: "var(--accent-orange)" },
      { label: "Repeat Guest Rates",   value: "+52%", icon: Users,       color: "var(--accent-blue)"   },
      { label: "Manual Ticket Errors", value: "-60%", icon: AlertCircle, color: "var(--accent-rose)"   },
    ],
  },
  {
    brand: "Nectar Artisan Roasters",
    location: "Bangalore // Multi-Outlet Cafes",
    owner: "Meera Nair",
    role: "Director of Operations",
    quote:
      "With five outlets, keeping tabs on dairy and roast wastage was a logistical nightmare. Ordrji's predictive inventory warnings tell us exactly what supplies to order, preventing stock leakage and saving us lakhs every month.",
    brandImage:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800",
    ownerImage:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300",
    metrics: [
      { label: "Average Order Value",  value: "+28%", icon: TrendingUp, color: "var(--accent-green)" },
      { label: "Raw Ingredient Waste", value: "-45%", icon: AlertCircle, color: "var(--accent-rose)"  },
      { label: "Table Seat Turn Time", value: "-18m", icon: Users,       color: "var(--accent-blue)"  },
    ],
  },
  {
    brand: "The Grand Spice Route",
    location: "Delhi // Banquet & Buffet Format",
    owner: "Arjun Malhotra",
    role: "General Manager",
    quote:
      "Running a 300-cover banquet hall means coordinating dozens of servers and kitchen stations simultaneously. Ordrji's floor layout and KDS combination gave us real-time control we never had before. Guest satisfaction scores jumped by 40%.",
    brandImage:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800",
    ownerImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300",
    metrics: [
      { label: "Guest Satisfaction",   value: "+40%", icon: TrendingUp, color: "var(--accent-green)" },
      { label: "Service Time",         value: "-22m", icon: Users,       color: "var(--accent-blue)"  },
      { label: "Reconciliation Errors",value: "-78%", icon: AlertCircle, color: "var(--accent-rose)"  },
    ],
  },
];

const AUTO_INTERVAL = 5000; // ms per slide

export default function SuccessStories() {
  const [current, setCurrent]     = useState(0);
  const [animDir, setAnimDir]     = useState<"left" | "right">("left");
  const [isAnimating, setIsAnimating] = useState(false);
  const [progress, setProgress]   = useState(0);
  const [inView, setInView]       = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const timerRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // scroll-in observer
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const goTo = useCallback(
    (next: number, dir: "left" | "right") => {
      if (isAnimating) return;
      setAnimDir(dir);
      setIsAnimating(true);
      setProgress(0);
      setTimeout(() => {
        setCurrent(next);
        setIsAnimating(false);
      }, 450);
    },
    [isAnimating]
  );

  const next = useCallback(() => goTo((current + 1) % CASES.length, "left"),  [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + CASES.length) % CASES.length, "right"), [current, goTo]);

  // auto-advance + progress bar
  useEffect(() => {
    if (!inView) return;

    // reset progress via RAF to avoid synchronous setState-in-effect
    const rafReset = requestAnimationFrame(() => setProgress(0));

    // progress tick every 50ms → reaches 100 in AUTO_INTERVAL
    progressRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + (50 / AUTO_INTERVAL) * 100, 100));
    }, 50);

    timerRef.current = setInterval(() => {
      next();
    }, AUTO_INTERVAL);

    return () => {
      cancelAnimationFrame(rafReset);
      if (timerRef.current)    clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [inView, current, next]);

  const cs = CASES[current];

  return (
    <section className="stories-section" id="testimonials" ref={sectionRef}>
      <div className="glow-spot glow-purple" style={{ top: "30%", left: "5%",  width: "400px", height: "400px" }} />
      <div className="glow-spot glow-rose"   style={{ bottom: "20%", right: "5%", width: "400px", height: "400px" }} />

      <div className="container">

        {/* ── header ─────────────────────────────────────────────────── */}
        <div
          className={`ss-header ${inView ? "ss-fadein" : ""}`}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <h2 style={{ fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-1.5px", marginBottom: "1rem" }}>
            Proven Operational Yield
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}>
            Don&apos;t take our word for it. Read how top-tier restaurant groups use Ordrji OS to automate management.
          </p>
        </div>

        {/* ── ChefDesk-style full-card slider ────────────────────────── */}
        <div className={`ss-slider-wrap ${inView ? "ss-fadein" : ""}`} style={{ transitionDelay: "0.15s" }}>

          {/* main card */}
          <div className={`ss-card glass-card ${isAnimating ? `ss-exit-${animDir}` : "ss-enter"}`}>

            {/* LEFT — brand photo with owner badge overlay */}
            <div className="ss-photo-panel" style={{ backgroundImage: `url(${cs.brandImage})` }}>
              <div className="ss-photo-overlay" />

              {/* quote icon — top left */}
              <div className="ss-quote-icon">
                <Quote size={22} color="#fff" />
              </div>

              {/* owner badge — bottom */}
              <div className="ss-owner-badge glass-card">
                <div className="ss-owner-avatar" style={{ backgroundImage: `url(${cs.ownerImage})` }} />
                <div>
                  <span className="ss-owner-name">{cs.owner}</span>
                  <span className="ss-owner-role">{cs.role}</span>
                </div>
              </div>

              {/* location pill — top right */}
              <div className="ss-location-pill">{cs.location}</div>
            </div>

            {/* RIGHT — content */}
            <div className="ss-content-panel">
              <span className="ss-brand-label">{cs.brand}</span>
              <blockquote className="ss-quote-text">
                &ldquo;{cs.quote}&rdquo;
              </blockquote>

              {/* KPI cards — stagger in with the slide */}
              <div className="ss-kpis">
                {cs.metrics.map((m, i) => {
                  const Icon = m.icon;
                  return (
                    <div
                      key={m.label}
                      className="ss-kpi-card glass-card"
                      style={{
                        borderTopColor: m.color,
                        animationDelay: `${i * 100 + 200}ms`,
                      }}
                    >
                      <div className="ss-kpi-icon" style={{ color: m.color, background: `${m.color.replace("var(", "").replace(")", "")}1a` }}>
                        <Icon size={13} />
                      </div>
                      <div className="ss-kpi-value" style={{ color: m.color }}>{m.value}</div>
                      <div className="ss-kpi-label">{m.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── controls row ──────────────────────────────────────────── */}
          <div className="ss-controls">

            {/* prev / next arrows */}
            <button className="ss-arrow" onClick={prev} aria-label="Previous testimonial">
              <ChevronLeft size={18} />
            </button>

            {/* progress dots — active dot expands + fills like ChefDesk */}
            <div className="ss-dots">
              {CASES.map((_, i) => (
                <button
                  key={i}
                  className={`ss-dot ${i === current ? "ss-dot-active" : ""}`}
                  onClick={() => goTo(i, i > current ? "left" : "right")}
                  aria-label={`Go to slide ${i + 1}`}
                >
                  {i === current && (
                    <span
                      className="ss-dot-fill"
                      style={{ width: `${progress}%` }}
                    />
                  )}
                </button>
              ))}
            </div>

            <button className="ss-arrow" onClick={next} aria-label="Next testimonial">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* ── all styles ───────────────────────────────────────────────── */}
      <style jsx global>{`
        /* ── section shell ─────────────────────────────────────────────── */
        .stories-section {
          background-color: var(--bg-primary);
          padding: 8rem 0;
          position: relative;
        }

        /* ── header + wrapper scroll-in ────────────────────────────────── */
        .ss-header,
        .ss-slider-wrap {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ss-header.ss-fadein,
        .ss-slider-wrap.ss-fadein {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── slider wrapper ────────────────────────────────────────────── */
        .ss-slider-wrap {
          max-width: 1100px;
          margin: 0 auto;
        }

        /* ── main card ─────────────────────────────────────────────────── */
        .ss-card {
          display: grid;
          grid-template-columns: 1fr;
          min-height: 480px;
          overflow: hidden;
          box-shadow: 0 24px 48px rgba(0, 0, 0, 0.07);
          will-change: transform, opacity;
        }

        @media (min-width: 1024px) {
          .ss-card {
            grid-template-columns: 0.9fr 1.1fr;
          }
        }

        /* slide-in / slide-out — mirrors ChefDesk testimonial carousel */
        .ss-enter {
          animation: ssSlideIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .ss-exit-left {
          animation: ssExitLeft 0.45s cubic-bezier(0.4, 0, 1, 1) both;
        }
        .ss-exit-right {
          animation: ssExitRight 0.45s cubic-bezier(0.4, 0, 1, 1) both;
        }

        @keyframes ssSlideIn {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes ssExitLeft {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(-40px); }
        }
        @keyframes ssExitRight {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(40px); }
        }

        /* ── left photo panel ──────────────────────────────────────────── */
        .ss-photo-panel {
          position: relative;
          background-size: cover;
          background-position: center;
          min-height: 320px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 1.75rem;
        }

        .ss-photo-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(30, 27, 24, 0.55) 0%,
            rgba(30, 27, 24, 0.15) 60%,
            rgba(30, 27, 24, 0.45) 100%
          );
        }

        .ss-quote-icon {
          position: relative;
          z-index: 2;
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: rgba(227, 6, 19, 0.75);
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(6px);
          box-shadow: 0 4px 16px rgba(227, 6, 19, 0.3);
          animation: ssIconFloat 3s ease-in-out infinite;
        }
        @keyframes ssIconFloat {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-5px); }
        }

        .ss-location-pill {
          position: absolute;
          top: 1.75rem;
          right: 1.75rem;
          z-index: 2;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: #fff;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.8px;
          padding: 0.3rem 0.7rem;
          border-radius: 999px;
        }

        /* owner badge floats up from bottom of photo */
        .ss-owner-badge {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(255, 255, 255, 0.12) !important;
          backdrop-filter: blur(12px);
          border-color: rgba(255, 255, 255, 0.2) !important;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          animation: ssBadgeFloat 4s ease-in-out infinite;
        }
        @keyframes ssBadgeFloat {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-4px); }
        }

        .ss-owner-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-size: cover;
          background-position: center;
          border: 2px solid rgba(255,255,255,0.4);
          flex-shrink: 0;
        }

        .ss-owner-name {
          display: block;
          font-size: 0.9rem;
          font-weight: 700;
          color: #fff;
        }
        .ss-owner-role {
          display: block;
          font-size: 0.72rem;
          color: rgba(255,255,255,0.65);
          margin-top: 1px;
        }

        /* ── right content panel ───────────────────────────────────────── */
        .ss-content-panel {
          padding: 3rem 2.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: var(--bg-card);
        }

        .ss-brand-label {
          color: var(--accent-orange);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          display: block;
          margin-bottom: 1rem;
        }

        .ss-quote-text {
          font-size: 1.1rem;
          font-style: italic;
          line-height: 1.75;
          color: var(--text-secondary);
          border-left: 3px solid var(--accent-orange);
          padding-left: 1.25rem;
          margin: 0 0 2rem 0;
          animation: ssTextFade 0.5s ease both;
        }
        @keyframes ssTextFade {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── KPI cards inside right panel ─────────────────────────────── */
        .ss-kpis {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.85rem;
        }
        @media (max-width: 640px) {
          .ss-kpis { grid-template-columns: 1fr 1fr; }
        }

        .ss-kpi-card {
          padding: 0.9rem 0.75rem;
          border-top: 3px solid;
          background: rgba(255,255,255,0.6);
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          animation: ssKpiPop 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes ssKpiPop {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .ss-kpi-icon {
          width: 26px;
          height: 26px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.1rem;
        }

        .ss-kpi-value {
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: -0.5px;
          line-height: 1;
        }

        .ss-kpi-label {
          font-size: 0.68rem;
          color: var(--text-muted);
          font-weight: 600;
          line-height: 1.3;
        }

        /* ── controls row ──────────────────────────────────────────────── */
        .ss-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.25rem;
          margin-top: 1.75rem;
        }

        /* arrow buttons */
        .ss-arrow {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid var(--border-color);
          background: var(--bg-card);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--text-secondary);
          transition: var(--transition-fast);
          flex-shrink: 0;
        }
        .ss-arrow:hover {
          border-color: var(--accent-orange);
          color: var(--accent-orange);
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(227, 6, 19, 0.15);
        }

        /* dots — active pill expands + shows fill progress like ChefDesk */
        .ss-dots {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .ss-dot {
          position: relative;
          height: 8px;
          border-radius: 9999px;
          border: none;
          background: var(--bg-tertiary);
          cursor: pointer;
          overflow: hidden;
          transition: width 0.35s cubic-bezier(0.16, 1, 0.3, 1), background 0.2s;
          width: 8px;
          padding: 0;
        }

        .ss-dot-active {
          width: 40px;
          background: rgba(227, 6, 19, 0.15);
        }

        /* progress fill inside active dot */
        .ss-dot-fill {
          position: absolute;
          left: 0; top: 0; bottom: 0;
          background: var(--accent-orange);
          border-radius: 9999px;
          transition: width 0.05s linear;
        }
      `}</style>
    </section>
  );
}
