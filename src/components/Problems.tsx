"use client";

import React from "react";
import { AlertOctagon, RefreshCw, ZapOff, TrendingDown, Sparkles } from "lucide-react";

const PAIN_POINTS = [
  {
    icon: <TrendingDown size={22} />,
    title: "The Commission Drain",
    desc: "Standard POS providers and checkout tools clip 1% to 3% of every transaction, eating directly into your restaurant's thin margins.",
    color: "#e30613"
  },
  {
    icon: <RefreshCw size={22} />,
    title: "Fragmented Counter Mess",
    desc: "Running Swiggy, Zomato, floor waiter apps, and billing on five disconnected tablets leads to manual entry delays and billing errors.",
    color: "#0284c7"
  },
  {
    icon: <ZapOff size={22} />,
    title: "Dinner Rush POS Crashes",
    desc: "Legacy cloud software without local caching locks up or logs cashiers out when the internet slows down right during peak hours.",
    color: "#d97706"
  },
  {
    icon: <AlertOctagon size={22} />,
    title: "Invisible Stock Leakage",
    desc: "Paper inventory trackers make it impossible to track recipe wastage, leading to raw material variance and uncontrolled costs.",
    color: "#8b5cf6"
  }
];

export default function Problems() {
  return (
    <section className="problems-section" id="problems">
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h2 style={{ fontSize: "clamp(2rem, 4.5vw, 2.5rem)", fontWeight: 800, letterSpacing: "-1.2px", marginTop: "0.5rem" }}>
            Why Traditional POS Software <br />
            Slows Down Your Restaurant
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", maxWidth: "580px", margin: "1rem auto 0", lineHeight: "1.6" }}>
            Connecting front-of-house operations to the kitchen shouldn&apos;t involve five different systems, offline cash register failures, or transaction commissions.
          </p>
        </div>

        {/* Pain Points Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }} className="problems-grid">
          {PAIN_POINTS.map((item, idx) => (
            <div key={idx} style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: 16, padding: "2.25rem", borderLeft: `4px solid ${item.color}`, transition: "transform 0.2s, box-shadow 0.2s" }} className="problem-card shadow-sm hover-card">
              <div style={{ color: item.color, background: item.color + "12", width: 44, height: 44, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                {item.icon}
              </div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 800, marginBottom: "0.5rem", color: "var(--text-primary)" }}>{item.title}</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>

      </div>

      <style jsx global>{`
        .problems-section {
          padding: 6rem 0;
          background: var(--bg-primary);
          position: relative;
          z-index: 10;
        }

        .problems-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          background: rgba(227, 6, 19, 0.06);
          border: 1px solid rgba(227, 6, 19, 0.18);
          color: var(--accent-orange);
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.7rem;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .hover-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(90, 80, 70, 0.06) !important;
        }

        @media (min-width: 640px) {
          .problems-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        
        @media (min-width: 1024px) {
          .problems-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
