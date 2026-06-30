"use client";

import React from "react";
import { Check, X, Shield, Sparkles } from "lucide-react";

const COMPARISON_ROWS = [
  {
    feature: "Checkout Commission Rate",
    ordrji: "0% (Flat Subscription Only)",
    legacy: "1% to 3% cut per checkout or digital order",
    status: true
  },
  {
    feature: "Offline Cache Safety Loop",
    ordrji: "Yes (Queues bills locally inside browser database)",
    legacy: "No (Freezes or logs cashier out if Wi-Fi drops)",
    status: true
  },
  {
    feature: "Billing Terminals License",
    ordrji: "Unlimited terminals & waiter devices",
    legacy: "Charges extra license fees per cashier counter",
    status: true
  },
  {
    feature: "Delivery Integrations",
    ordrji: "Built-in direct sync (Zomato & Swiggy)",
    legacy: "Requires paid third-party channel tools",
    status: true
  },
  {
    feature: "Raw Recipe Inventory",
    ordrji: "Live deductions and automatic purchase orders",
    legacy: "Excel spreadsheets or manual logs",
    status: true
  },
  {
    feature: "Customer Growth Engine",
    ordrji: "Automated WhatsApp birthday/loyalty messages",
    legacy: "Manual SMS panels with expensive recharge packs",
    status: true
  }
];

export default function Comparison() {
  return (
    <section className="comparison-section" id="comparison">
      <div className="container" style={{ maxWidth: 900 }}>
        
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span className="comparison-badge">
            <Shield size={11} style={{ color: "#e30613" }} /> Direct Comparison
          </span>
          <h2 style={{ fontSize: "clamp(2rem, 4.5vw, 2.5rem)", fontWeight: 800, letterSpacing: "-1.2px", marginTop: "0.5rem" }}>
            How Ordrji Compares <br />
            to Legacy POS Systems
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", maxWidth: "580px", margin: "1rem auto 0", lineHeight: "1.6" }}>
            We position ourselves as a growth and control system, not just simple cash box billing registers.
          </p>
        </div>

        {/* Comparison Grid */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          
          {/* Header Row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.5rem", padding: "0.5rem 1.5rem", borderBottom: "2px solid var(--border-color)", fontWeight: 800, fontSize: "0.85rem", color: "var(--text-muted)", letterSpacing: "1px", textTransform: "uppercase" }} className="comp-grid-row-header">
            <div>OPERATIONS</div>
            <div style={{ color: "var(--accent-orange)" }}>ORDRJI SYSTEM</div>
            <div>TRADITIONAL POS</div>
          </div>

          {/* Body Rows */}
          {COMPARISON_ROWS.map((row, idx) => (
            <div key={idx} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.5rem", background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: 12, padding: "1.25rem 1.5rem", alignItems: "center", transition: "border-color 0.2s" }} className="comp-row shadow-sm">
              
              {/* Feature Title */}
              <div style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "0.95rem" }}>
                {row.feature}
              </div>

              {/* Ordrji Advantage */}
              <div style={{ fontSize: "0.88rem", color: "var(--text-primary)", fontWeight: 600, display: "flex", alignItems: "flex-start", gap: "0.4rem" }}>
                <Check size={16} color="var(--accent-green)" style={{ flexShrink: 0, marginTop: "2px" }} />
                <span>{row.ordrji}</span>
              </div>

              {/* LegacyPOS Drawback */}
              <div style={{ fontSize: "0.88rem", color: "var(--text-secondary)", display: "flex", alignItems: "flex-start", gap: "0.4rem" }}>
                <X size={16} color="#dc2626" style={{ flexShrink: 0, marginTop: "2px", opacity: 0.7 }} />
                <span>{row.legacy}</span>
              </div>

            </div>
          ))}

        </div>

      </div>

      <style jsx global>{`
        .comparison-section {
          padding: 6rem 0;
          background: var(--bg-secondary);
          position: relative;
          z-index: 10;
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
        }

        .comparison-badge {
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

        .comp-row:hover {
          border-color: rgba(227, 6, 19, 0.25);
        }

        @media (max-width: 768px) {
          .comp-grid-row-header {
            display: none !important;
          }
          .comp-row {
            grid-template-columns: 1fr !important;
            gap: 0.75rem !important;
            padding: 1.5rem !important;
          }
          .comp-row > div:first-child {
            font-size: 1.05rem !important;
            border-bottom: 1px solid var(--border-color);
            padding-bottom: 0.5rem;
            margin-bottom: 0.25rem;
          }
          .comp-row > div:nth-child(2)::before {
            content: "ORDRJI: ";
            font-weight: 800;
            color: var(--accent-orange);
            font-size: 0.75rem;
            display: block;
            margin-bottom: 0.1rem;
          }
          .comp-row > div:nth-child(3)::before {
            content: "LEGACY POS: ";
            font-weight: 800;
            color: var(--text-muted);
            font-size: 0.75rem;
            display: block;
            margin-bottom: 0.1rem;
          }
        }
      `}</style>
    </section>
  );
}
