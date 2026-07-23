"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, Zap, BarChart2, CheckCircle } from "lucide-react";

interface EcosystemNode {
  id: string;
  name: string;
  desc: string;
  color: string;
  angle: number;
  stat: string;
  image: string;
}

const NODES: EcosystemNode[] = [
  { id: "orders",    name: "Orders Engine",          desc: "Consolidate QR ordering, walk-ins, and aggregate delivery apps in one place.",        color: "#da0404", angle: 0,   stat: "3k+ orders/sec reconciled",    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=120" },
  { id: "kitchen",   name: "Kitchen Displays (KDS)", desc: "Transmit direct table orders to preparation queues without lag.",                      color: "#d97706", angle: 40,  stat: "Prep times reduced by 22%",     image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=120" },
  { id: "billing",   name: "Billing & Split",        desc: "Accept payments, print receipts, and split checks instantly.",                         color: "#059669", angle: 80,  stat: "Instant UPI reconciliation",    image: "/eco-billing.jpg" },
  { id: "inventory", name: "Inventory Intel",        desc: "Live recipe tracing, automated alerts, and raw materials stock indicators.",           color: "#dc2626", angle: 120, stat: "Zero manual inventory audits",  image: "https://images.unsplash.com/photo-1543083115-638c32cd3d58?auto=format&fit=crop&q=80&w=120" },
  { id: "crm",       name: "CRM Engines",            desc: "Collect customer profiles, dietary flags, and loyalty tiers.",                         color: "#0284c7", angle: 160, stat: "60k+ profiles managed",         image: "https://images.unsplash.com/photo-1581349485608-9469926a8e5e?auto=format&fit=crop&q=80&w=120" },
  { id: "marketing", name: "Marketing Flows",        desc: "Trigger SMS/WhatsApp campaigns based on historical dining actions.",                   color: "#da0404", angle: 200, stat: "+14.8% customer retention",    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=120" },
  { id: "analytics", name: "Bento Analytics",        desc: "Track sales curves, top items, and net profits on single charts.",                    color: "#059669", angle: 240, stat: "Real-time P&L mapping",         image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=120" },
  { id: "staff",     name: "Staff Management",       desc: "Monitor waiter performance, shift schedules, and checkouts.",                         color: "#0284c7", angle: 280, stat: "Automatic tips distribution",   image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&q=80&w=120" },
  { id: "tables",    name: "Floor Layouts",          desc: "Visual restaurant grids with live table occupancy indicators.",                        color: "#d97706", angle: 320, stat: "Table turn times minimized",    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=120" },
];

// Metric counters — same pattern as ChefDesk "Master Your Food Costs" stats bar
interface MetricConfig {
  icon: React.ReactNode;
  prefix: string;
  target: number;
  suffix: string;
  label: string;
  color: string;
}

const METRICS: MetricConfig[] = [
  { icon: <Zap size={18} />,       prefix: "",   target: 9,   suffix: "+ modules",  label: "Fully connected",      color: "#da0404" },
  { icon: <Users size={18} />,     prefix: "60", target: 0,   suffix: "k+ profiles",label: "CRM records live",     color: "#0284c7" },
  { icon: <TrendingUp size={18} />,prefix: "+",  target: 14,  suffix: ".8% retention",label: "Customer return rate", color: "#059669" },
  { icon: <BarChart2 size={18} />, prefix: "",   target: 22,  suffix: "% faster prep", label: "Kitchen throughput",  color: "#d97706" },
];

// SVG coordinate constants — center is always exactly (250, 250)
const CX = 250;
const CY = 250;
const R  = 175;
const NODE_R = 36;

// ─── animated counter hook ────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1800, started = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!started) return;
    if (target === 0) return;
    let start: number | null = null;
    let frame: number;
    const step = (ts: number) => {
      if (!start) start = ts;
      const pct = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - pct, 3);
      setValue(Math.floor(eased * target));
      if (pct < 1) frame = requestAnimationFrame(step);
      else setValue(target);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, started]);
  return started ? value : 0;
}

// ─── single metric counter card ──────────────────────────────────────────────
function MetricCard({ metric, started, delay }: { metric: MetricConfig; started: boolean; delay: number }) {
  const count = useCountUp(metric.target, 1800, started);
  return (
    <div
      className="eco-metric-card"
      style={{
        animationDelay: `${delay}ms`,
        animationPlayState: started ? "running" : "paused",
        borderTopColor: metric.color,
      }}
    >
      <div className="eco-metric-icon" style={{ color: metric.color, background: `${metric.color}14` }}>
        {metric.icon}
      </div>
      <div className="eco-metric-number" style={{ color: metric.color }}>
        {metric.prefix}{count}{metric.suffix}
      </div>
      <div className="eco-metric-label">{metric.label}</div>
    </div>
  );
}

// ─── main component ───────────────────────────────────────────────────────────
export default function Ecosystem() {
  const [activeIndex, setActiveIndex]     = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [hoveredIndex, setHoveredIndex]   = useState<number | null>(null);
  const [rotation, setRotation]           = useState(0);

  // scroll-in state
  const sectionRef   = useRef<HTMLElement>(null);
  const [detailVisible, setDetailVisible] = useState(false);
  const [countersStarted, setCountersStarted] = useState(false);

  // Intersection Observer — triggers all animations
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setDetailVisible(true), 100);
          setTimeout(() => setCountersStarted(true), 200);
          obs.disconnect();
        }
      },
      { threshold: 0.01 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // auto-rotate orbital
  useEffect(() => {
    if (!isAutoRotating) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % NODES.length;
        setRotation((r) => r - 40);
        return next;
      });
    }, 3500);
    return () => clearInterval(interval);
  }, [isAutoRotating]);

  const activeNode = NODES[activeIndex];

  return (
    <section className="ecosystem-section" ref={sectionRef}>
      {/* ambient glow */}
      <div className="glow-spot glow-rose" style={{ top: "30%", left: "50%", transform: "translate(-50%, -50%)", width: "600px", height: "600px" }} />

      <div className="container">

        {/* ── header ───────────────────────────────────────────────────── */}
        <motion.div
          className="eco-header"
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "none" }}
          viewport={{ once: true, amount: "some" }}
          transition={{ type: "spring", stiffness: 200, damping: 25, mass: 0.8 }}
        >

          <h2 className="gradient-text" style={{ fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-1.5px", marginBottom: "1rem" }}>
            The Connected Restaurant Ecosystem
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}>
            No more fragmented modules. Ordrji links every aspect of restaurant management into a single, cohesive engine.
          </p>
        </motion.div>

        {/* ── metric counters bar  (ChefDesk-style count-up) ───────────── */}
        <div className="eco-metrics-bar">
          {METRICS.map((m, i) => (
            <MetricCard key={m.label} metric={m} started={countersStarted} delay={i * 120} />
          ))}
        </div>

        {/* ── main two-column layout ────────────────────────────────────── */}
        <div className="ecosystem-grid-layout" style={{ marginTop: "3rem" }}>

          {/* Left detail panel — slides in from left */}
          <motion.div
            className="node-detail-panel glass-card"
            initial={{ opacity: 0, x: -40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "none" }}
            viewport={{ once: true, amount: "some" }}
            transition={{ type: "spring", stiffness: 180, damping: 25, delay: 0.2 }}
          >
            {activeNode && (
              <div className="node-detail-content">
                {/* image thumb with animated border glow */}
                <div
                  className="detail-icon-img eco-thumb-pulse"
                  style={{
                    backgroundImage: `url(${activeNode.image})`,
                    borderColor: activeNode.color,
                    boxShadow: `0 0 20px ${activeNode.color}44`,
                  }}
                />

                <h3 key={`h-${activeNode.id}`} className="eco-node-title-appear">{activeNode.name}</h3>
                <p className="detail-desc eco-desc-appear" key={`d-${activeNode.id}`}>{activeNode.desc}</p>

                <div className="divider" style={{ margin: "1.5rem 0" }} />

                {/* Live metric pill — floats like ChefDesk stat badges */}
                <div className="stat-pill eco-stat-float" key={`s-${activeNode.id}`}>
                  <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 700, letterSpacing: "0.5px" }}>
                    LIVE METRIC:
                  </span>
                  <span className="stat-value" style={{ color: activeNode.color }}>
                    {activeNode.stat}
                  </span>
                </div>

                {/* Feature check-list — staggered appear */}
                <ul className="eco-feature-list">
                  {["Real-time sync", "Zero config setup", "Auto-failover"].map((f, i) => (
                    <li
                      key={f}
                      className={`eco-feature-item ${detailVisible ? "eco-feature-visible" : ""}`}
                      style={{ transitionDelay: `${400 + i * 100}ms` }}
                    >
                      <CheckCircle size={14} style={{ color: activeNode.color, flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>

          {/* SVG orbital — slides in from right */}
          <motion.div
            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            initial={{ opacity: 0, x: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "none" }}
            viewport={{ once: true, amount: "some" }}
            transition={{ type: "spring", stiffness: 180, damping: 25, delay: 0.3 }}
          >
            <svg
              viewBox="0 0 500 500"
              width="500"
              height="500"
              style={{ maxWidth: "100%", display: "block" }}
            >
              <defs>
                {NODES.map((node) => (
                  <clipPath key={`clip-${node.id}`} id={`clip-${node.id}`}>
                    <circle cx="0" cy="0" r={NODE_R - 3} />
                  </clipPath>
                ))}
                {/* clip path for center hub logo */}
                <clipPath id="hubClip">
                  <circle cx="0" cy="0" r="56" />
                </clipPath>
                {/* animated dash-orbit ring gradient */}
                <radialGradient id="orbitGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%"   stopColor="#da0404" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#da0404" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Orbit ring */}
              <circle
                cx={CX} cy={CY} r={R}
                fill="none"
                stroke="rgba(227,6,19,0.18)"
                strokeWidth="1.5"
                strokeDasharray="6 4"
                className="eco-orbit-dash"
              />
              {/* subtle glow ring behind orbit */}
              <circle cx={CX} cy={CY} r={R + 12} fill="none" stroke="rgba(227,6,19,0.04)" strokeWidth="22" />

              {/* Spoke lines */}
              {NODES.map((node, idx) => {
                const rad = ((node.angle + rotation) * Math.PI) / 180;
                const nx = parseFloat((CX + R * Math.cos(rad)).toFixed(4));
                const ny = parseFloat((CY + R * Math.sin(rad)).toFixed(4));
                return (
                  <line
                    key={`spoke-${node.id}`}
                    x1={CX} y1={CY} x2={nx} y2={ny}
                    stroke={idx === activeIndex ? node.color : "rgba(227,6,19,0.08)"}
                    strokeWidth={idx === activeIndex ? "1.5" : "0.8"}
                    strokeDasharray={idx === activeIndex ? "none" : "3 3"}
                    style={{ transition: "stroke 0.4s, stroke-width 0.3s" }}
                  />
                );
              })}

              {/* Center hub */}
              <g transform={`translate(${CX}, ${CY})`}>
                {/* outer pulse ring */}
                <circle cx="0" cy="0" r="70" fill="rgba(227,6,19,0.04)" className="eco-hub-pulse" />
                <circle cx="0" cy="0" r="58" fill="var(--bg-card)" stroke="#da0404" strokeWidth="2" />
                <image
                  href="/logo-icon.jpg"
                  x="-56"
                  y="-56"
                  width="112"
                  height="112"
                  clipPath="url(#hubClip)"
                  preserveAspectRatio="xMidYMid slice"
                />
              </g>

              {/* Orbital nodes */}
              {NODES.map((node, idx) => {
                const rad = ((node.angle + rotation) * Math.PI) / 180;
                const nx = parseFloat((CX + R * Math.cos(rad)).toFixed(4));
                const ny = parseFloat((CY + R * Math.sin(rad)).toFixed(4));
                const isActive = idx === activeIndex;
                const isHov    = hoveredIndex === idx;

                return (
                  <g
                    key={node.id}
                    transform={`translate(${nx}, ${ny}) scale(${isActive || isHov ? 1.2 : 1})`}
                    style={{ cursor: "pointer", transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)" }}
                    onClick={() => { setActiveIndex(idx); setIsAutoRotating(false); }}
                    onMouseEnter={() => { setHoveredIndex(idx); setActiveIndex(idx); setIsAutoRotating(false); }}
                    onMouseLeave={() => { setHoveredIndex(null); setIsAutoRotating(true); }}
                  >
                    {/* outer glow halo when active */}
                    {(isActive || isHov) && (
                      <circle cx="0" cy="0" r={NODE_R + 9} fill="none" stroke={node.color} strokeWidth="2" opacity="0.35" className="eco-node-halo" />
                    )}
                    <circle cx="0" cy="0" r={NODE_R} fill={isActive || isHov ? node.color : "#e8e4dc"} style={{ transition: "fill 0.3s" }} />
                    <image
                      href={node.image}
                      x={-(NODE_R - 3)} y={-(NODE_R - 3)}
                      width={(NODE_R - 3) * 2} height={(NODE_R - 3) * 2}
                      clipPath={`url(#clip-${node.id})`}
                      preserveAspectRatio="xMidYMid slice"
                      style={{ opacity: isActive || isHov ? 0.9 : 0.55, transition: "opacity 0.3s" }}
                    />
                    {(isActive || isHov) && (
                      <text x="0" y={NODE_R + 15} textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--text-primary)" fontFamily="inherit">
                        {node.name}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </motion.div>
        </div>
      </div>

      {/* ── all scoped styles ──────────────────────────────────────────── */}
      <style jsx global>{`
        /* ── section shell ──────────────────────────────────────────────── */
        .ecosystem-section {
          padding: 8rem 0;
          background-color: var(--bg-primary);
          position: relative;
          overflow: hidden;
          z-index: 10;
        }

        /* ── header fade-in ────────────────────────────────────────────── */
        .eco-header {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .eco-header.eco-fadein {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── metric counters bar ─────────────────────────────────────────
           Mirrors ChefDesk's "Master Your Food Costs" stats row:
           numbers count up, cards slide up when scrolled into view.
        ─────────────────────────────────────────────────────────────────── */
        .eco-metrics-bar {
          display: flex;
          gap: 1.25rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 0.5rem;
        }

        .eco-metric-card {
          flex: 1 1 160px;
          max-width: 220px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-top: 3px solid;
          border-radius: 14px;
          padding: 1.25rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          box-shadow: 0 4px 18px rgba(0,0,0,0.04);
          animation: ecoCardSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-play-state: paused;
        }

        @keyframes ecoCardSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .eco-metric-icon {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.25rem;
        }

        .eco-metric-number {
          font-size: 1.4rem;
          font-weight: 800;
          letter-spacing: -0.5px;
          line-height: 1;
        }

        .eco-metric-label {
          font-size: 0.72rem;
          color: var(--text-muted);
          font-weight: 600;
          letter-spacing: 0.3px;
        }

        /* ── two-column grid ────────────────────────────────────────────── */
        .ecosystem-grid-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
          align-items: center;
        }

        @media (min-width: 1024px) {
          .ecosystem-grid-layout {
            grid-template-columns: 0.8fr 1.2fr;
          }
        }

        /* ── slide-in animations (like ChefDesk feature panels) ─────────── */
        .eco-slide-left {
          opacity: 0;
          transform: translateX(-40px);
          transition: opacity 0.75s ease, transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .eco-slide-right {
          opacity: 0;
          transform: translateX(40px);
          transition: opacity 0.75s ease, transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .eco-slide-left.eco-visible,
        .eco-slide-right.eco-visible {
          opacity: 1;
          transform: translateX(0);
        }

        /* ── left detail panel ──────────────────────────────────────────── */
        .node-detail-panel {
          padding: 2.5rem;
          min-height: 360px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          background: var(--bg-card);
        }

        .node-detail-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 100%;
        }

        /* image thumb with glowing border + subtle continuous pulse */
        .detail-icon-img {
          width: 64px;
          height: 64px;
          border-radius: 14px;
          border: 3px solid;
          background-size: cover;
          background-position: center;
          margin-bottom: 1.5rem;
          transition: border-color 0.4s, box-shadow 0.4s;
        }

        /* continuous thumb border glow — like ChefDesk floating image badges */
        .eco-thumb-pulse {
          animation: ecoPulse 2.5s ease-in-out infinite;
        }
        @keyframes ecoPulse {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.04); }
        }

        /* node name appears with quick fade+slide */
        .eco-node-title-appear {
          font-size: 1.6rem;
          font-weight: 800;
          letter-spacing: -0.5px;
          margin-bottom: 0.75rem;
          color: var(--text-primary);
          animation: ecoTextPop 0.4s ease both;
        }
        .eco-desc-appear {
          color: var(--text-secondary);
          font-size: 1rem;
          line-height: 1.6;
          animation: ecoTextPop 0.4s ease 0.07s both;
        }
        @keyframes ecoTextPop {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* stat pill — mimics ChefDesk floating metric badge with bobbing float */
        .stat-pill {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          background: rgba(0, 0, 0, 0.02);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 0.75rem 1rem;
          width: 100%;
          transition: border-color 0.4s;
        }

        .eco-stat-float {
          animation: ecoStatFloat 3s ease-in-out infinite;
        }
        @keyframes ecoStatFloat {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-4px); }
        }

        .stat-value {
          font-size: 1rem;
          font-weight: 700;
          transition: color 0.4s;
        }

        /* feature checklist — staggered slide-in like ChefDesk feature rows */
        .eco-feature-list {
          list-style: none;
          margin-top: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          width: 100%;
        }
        .eco-feature-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
          opacity: 0;
          transform: translateX(-12px);
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .eco-feature-item.eco-feature-visible {
          opacity: 1;
          transform: translateX(0);
        }

        /* ── SVG orbital enhancements ──────────────────────────────────── */

        /* dashed orbit ring slowly rotates */
        .eco-orbit-dash {
          animation: ecoOrbitSpin 40s linear infinite;
          transform-origin: 250px 250px;
        }
        @keyframes ecoOrbitSpin {
          to { stroke-dashoffset: -200; }
        }

        /* center hub outer ring breathes */
        .eco-hub-pulse {
          animation: ecoHubBreath 2.8s ease-in-out infinite;
          transform-origin: 0 0;
        }
        @keyframes ecoHubBreath {
          0%, 100% { r: 68; opacity: 0.3; }
          50%       { r: 80; opacity: 0.08; }
        }

        /* active node halo spins */
        .eco-node-halo {
          animation: ecoHaloSpin 3s linear infinite;
        }
        @keyframes ecoHaloSpin {
          to { stroke-dashoffset: -100; }
        }
      `}</style>
    </section>
  );
}
