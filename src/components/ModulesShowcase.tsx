"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChefHat, Receipt, Users, TrendingUp, QrCode, Package, Sparkles, ArrowUpRight,
} from "lucide-react";
import type { LucideProps } from "lucide-react";

interface Module {
  id: number;
  badge: string;
  title: string;
  line1: string;
  line2: string;
  image: string;
  accent: string;
  accentRgb: string;
  bg: string;
  icon: React.ComponentType<LucideProps>;
}

const MODULES: Module[] = [
  {
    id: 0,
    badge: "AI Auto-Tagging",
    title: "QR Ordering",
    line1: "Guests scan, browse & order from their phone.",
    line2: "AI routes every ticket to the right prep station instantly.",
    image: "https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&w=720&q=80",
    accent: "#e30613",
    accentRgb: "227,6,19",
    bg: "linear-gradient(160deg,#fff7ed,#ffe9d0)",
    icon: QrCode,
  },
  {
    id: 1,
    badge: "AI SLA Guard",
    title: "Kitchen Display",
    line1: "Every order hits the KDS screen the second it's placed.",
    line2: "AI predicts prep delays and re-routes tasks automatically.",
    image: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?auto=format&fit=crop&w=720&q=80",
    accent: "#059669",
    accentRgb: "5,150,105",
    bg: "linear-gradient(160deg,#f0fdf4,#d1fae5)",
    icon: ChefHat,
  },
  {
    id: 2,
    badge: "AI Smart Splits",
    title: "POS & Billing",
    line1: "Generate bills and split checks in one tap.",
    line2: "AI reconciles cashier shifts and flags discrepancies.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=720&q=80",
    accent: "#0284c7",
    accentRgb: "2,132,199",
    bg: "linear-gradient(160deg,#e0f2fe,#bae6fd)",
    icon: Receipt,
  },
  {
    id: 3,
    badge: "AI Autopilot CRM",
    title: "Guest CRM",
    line1: "Build deep guest profiles automatically on every visit.",
    line2: "Trigger personalised email & SMS campaigns on autopilot.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=720&q=80",
    accent: "#7c3aed",
    accentRgb: "124,58,237",
    bg: "linear-gradient(160deg,#faf5ff,#ede9fe)",
    icon: Users,
  },
  {
    id: 4,
    badge: "AI Stock Forecast",
    title: "Inventory",
    line1: "Track every ingredient down to grams in real time.",
    line2: "AI predicts run-out and sends supplier orders automatically.",
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=720&q=80",
    accent: "#dc2626",
    accentRgb: "220,38,38",
    bg: "linear-gradient(160deg,#fff1f2,#fecdd3)",
    icon: Package,
  },
  {
    id: 5,
    badge: "AI Predictions",
    title: "Analytics",
    line1: "Executive insights on sales, wastage & table turnover.",
    line2: "AI forecasts peak hours so you staff and stock perfectly.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=720&q=80",
    accent: "#d97706",
    accentRgb: "217,119,6",
    bg: "linear-gradient(160deg,#fffbeb,#fef3c7)",
    icon: TrendingUp,
  },
];

export default function ModulesShowcase() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="ms-section" id="modules-showcase">
      {/* soft ambient glows */}
      <div className="ms-glow ms-glow-a" aria-hidden />
      <div className="ms-glow ms-glow-b" aria-hidden />

      <div className="container">
        {/* ── Section header ── */}
        <motion.div
          className="ms-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="ms-eyebrow">
            <Sparkles size={12} style={{ color: "#e30613" }} />
            One Platform, Six Modules
          </div>
          <h2 className="ms-title">
            One Single OS.{" "}
            <span className="ms-title-accent">Six Modules.</span>
          </h2>
          <p className="ms-subtitle">
            Replace disconnected legacy software with a unified, AI-optimised restaurant engine.
          </p>
        </motion.div>

        {/* ── Module card grid ── */}
        <div className="ms-grid">
          {MODULES.map((mod, i) => {
            const Icon = mod.icon;
            const isHovered = hovered === mod.id;
            return (
              <motion.div
                key={mod.id}
                className="ms-card"
                style={{ background: mod.bg }}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.42, delay: i * 0.07 }}
                onMouseEnter={() => setHovered(mod.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* ── Badge row ── */}
                <div className="ms-card-top">
                  <span
                    className="ms-badge"
                    style={{
                      color: mod.accent,
                      background: `rgba(${mod.accentRgb},0.1)`,
                      borderColor: `rgba(${mod.accentRgb},0.2)`,
                    }}
                  >
                    <Sparkles size={10} />
                    {mod.badge}
                  </span>
                  <div
                    className="ms-icon-wrap"
                    style={{
                      color: mod.accent,
                      background: `rgba(${mod.accentRgb},0.1)`,
                    }}
                  >
                    <Icon size={16} />
                  </div>
                </div>

                {/* ── Module title ── */}
                <h3 className="ms-card-title">{mod.title}</h3>

                {/* ── Image ── */}
                <div className="ms-img-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={mod.image}
                    alt={mod.title}
                    className="ms-img"
                    loading="lazy"
                  />
                  {/* accent tint on hover */}
                  <motion.div
                    className="ms-img-tint"
                    style={{ background: `rgba(${mod.accentRgb},0.18)` }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.22 }}
                  />
                  {/* "Explore" chip on hover */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        className="ms-img-chip"
                        style={{ background: mod.accent }}
                        initial={{ opacity: 0, scale: 0.85, y: 6 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.85, y: 6 }}
                        transition={{ duration: 0.18 }}
                      >
                        Explore module <ArrowUpRight size={11} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* ── Two-line description ── */}
                <div className="ms-card-body">
                  <p className="ms-line1">{mod.line1}</p>
                  <p className="ms-line2">{mod.line2}</p>
                </div>

                {/* ── Bottom accent bar ── */}
                <motion.div
                  className="ms-bar"
                  style={{ background: mod.accent }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        /* ── Section ────────────────────────────────────────────── */
        .ms-section {
          padding: 7rem 0 6rem;
          background: var(--bg-primary);
          position: relative;
          overflow: hidden;
        }

        .ms-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(130px);
          pointer-events: none;
          z-index: 0;
          opacity: 0.1;
        }
        .ms-glow-a {
          width: 480px; height: 480px;
          background: #e30613;
          top: -120px; right: -80px;
        }
        .ms-glow-b {
          width: 400px; height: 400px;
          background: #0284c7;
          bottom: -100px; left: -60px;
        }

        .ms-section .container { position: relative; z-index: 1; }

        /* ── Header ─────────────────────────────────────────────── */
        .ms-header {
          text-align: center;
          margin-bottom: 3.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }

        .ms-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .ms-title {
          font-size: 2.6rem;
          font-weight: 900;
          letter-spacing: -2px;
          line-height: 1.1;
          color: var(--text-primary);
          margin: 0;
        }
        @media (min-width: 640px) { .ms-title { font-size: 3.2rem; } }

        .ms-title-accent {
          background: linear-gradient(135deg, #1e1b18 0%, #e30613 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .ms-subtitle {
          color: var(--text-secondary);
          font-size: 1rem;
          line-height: 1.6;
          max-width: 480px;
          margin: 0;
        }

        /* ── Card grid ──────────────────────────────────────────── */
        .ms-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }

        @media (min-width: 480px) {
          .ms-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (min-width: 900px) {
          .ms-grid { grid-template-columns: repeat(3, 1fr); }
        }

        /* ── Card ───────────────────────────────────────────────── */
        .ms-card {
          border-radius: 20px;
          border: 1px solid rgba(0,0,0,0.07);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 0;
          position: relative;
          transition: box-shadow 0.25s, transform 0.25s;
          cursor: default;
        }
        .ms-card:hover {
          box-shadow: 0 20px 48px rgba(0,0,0,0.1);
          transform: translateY(-4px);
        }

        /* ── Card top row (badge + icon) ─────────────────────────── */
        .ms-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.1rem 1.25rem 0.5rem;
        }

        .ms-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.3px;
          padding: 0.25rem 0.65rem;
          border-radius: 9999px;
          border: 1px solid;
          white-space: nowrap;
        }

        .ms-icon-wrap {
          width: 30px;
          height: 30px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* ── Card title ─────────────────────────────────────────── */
        .ms-card-title {
          font-size: 1.25rem;
          font-weight: 800;
          letter-spacing: -0.5px;
          color: var(--text-primary);
          padding: 0.3rem 1.25rem 0.75rem;
          margin: 0;
          line-height: 1.25;
        }

        /* ── Image ──────────────────────────────────────────────── */
        .ms-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          margin: 0 0 0;
        }

        .ms-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .ms-card:hover .ms-img { transform: scale(1.06); }

        .ms-img-tint {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .ms-img-chip {
          position: absolute;
          bottom: 0.75rem;
          right: 0.75rem;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          color: #fff;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.3rem 0.7rem;
          border-radius: 9999px;
          pointer-events: none;
        }

        /* ── Card body ──────────────────────────────────────────── */
        .ms-card-body {
          padding: 0.9rem 1.25rem 1.2rem;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          flex: 1;
        }

        .ms-line1 {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.45;
          margin: 0;
        }

        .ms-line2 {
          font-size: 0.82rem;
          font-weight: 400;
          color: var(--text-secondary);
          line-height: 1.5;
          margin: 0;
        }

        /* ── Bottom accent bar ──────────────────────────────────── */
        .ms-bar {
          height: 3px;
          width: 100%;
          transform-origin: left;
          flex-shrink: 0;
        }
      `}</style>
    </section>
  );
}
