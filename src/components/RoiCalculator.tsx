"use client";

import React, { useState } from "react";
import { Sparkles, Calculator, IndianRupee, Clock, CheckCircle, ShieldAlert } from "lucide-react";

export default function RoiCalculator() {
  // Slider inputs
  const [ordersPerDay, setOrdersPerDay] = useState(150);
  const [tables, setTables] = useState(20);
  const [outlets, setOutlets] = useState(1);
  const [staffCount, setStaffCount] = useState(8);

  // Formulas
  // 1. Extra Revenue = Outlets * Orders/Day * 30 days * ₹25 (avg upsell increase per order via QR AI recommendations)
  const extraRevenue = outlets * ordersPerDay * 30 * 25;

  // 2. Monthly Savings = Outlets * (Staff * ₹2,000 labor optimization + Orders * ₹3 paper/digital billing save + ₹6,000 inventory leakage save)
  const monthlySavings = outlets * (staffCount * 2000 + ordersPerDay * 3 + 6000);

  // 3. Reduced Errors = Orders/Day * 30 days * 0.05 error rate * ₹200 average correction waste
  const reducedErrors = outlets * ordersPerDay * 30 * 0.05 * 200;

  // 4. Time Saved (Hours/Month) = Outlets * (Staff * 12 hours table service optimization + 25 hours inventory auditing optimization)
  const timeSaved = outlets * (staffCount * 12 + 25);

  return (
    <section className="roi-section" id="roi">
      <div className="glow-spot glow-rose" style={{ top: "20%", left: "10%", width: "400px", height: "400px" }} />
      <div className="glow-spot glow-green" style={{ bottom: "20%", right: "10%", width: "400px", height: "400px" }} />

      <div className="container">
        {/* Title Block */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div className="badge animate-float">
            <Sparkles size={12} style={{ color: "var(--accent-orange)", marginRight: "4px" }} /> ROI Calculator
          </div>
          <h2 className="gradient-text" style={{ fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-1.5px", marginBottom: "1rem" }}>
            Calculate Your Operating Leverage
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}>
            See how much manual labor, table turnaround delay, order errors, and ingredient wastage you can save with OrderJi.
          </p>
        </div>

        {/* Calculator Widget */}
        <div className="roi-calculator-box glass-card">
          <div className="roi-layout">
            {/* Left side: Inputs */}
            <div className="roi-inputs-panel">
              <div className="panel-header">
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Calculator size={16} color="var(--accent-orange)" />
                  <span>RESTAURANT DIMENSIONS</span>
                </div>
              </div>

              {/* Slider 1: Orders per day */}
              <div className="slider-group">
                <div className="slider-lbl">
                  <span>Orders per Day</span>
                  <strong className="slider-val">{ordersPerDay}</strong>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1000"
                  step="10"
                  value={ordersPerDay}
                  onChange={(e) => setOrdersPerDay(parseInt(e.target.value))}
                  className="custom-range"
                />
                <div className="slider-limits"><span>50</span> <span>1000+</span></div>
              </div>

              {/* Slider 2: Tables */}
              <div className="slider-group">
                <div className="slider-lbl">
                  <span>Dine-In Tables</span>
                  <strong className="slider-val">{tables}</strong>
                </div>
                <input
                  type="range"
                  min="5"
                  max="120"
                  step="5"
                  value={tables}
                  onChange={(e) => setTables(parseInt(e.target.value))}
                  className="custom-range"
                />
                <div className="slider-limits"><span>5</span> <span>120+</span></div>
              </div>

              {/* Slider 3: Outlets */}
              <div className="slider-group">
                <div className="slider-lbl">
                  <span>Active Outlets</span>
                  <strong className="slider-val">{outlets}</strong>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={outlets}
                  onChange={(e) => setOutlets(parseInt(e.target.value))}
                  className="custom-range"
                />
                <div className="slider-limits"><span>1</span> <span>20+</span></div>
              </div>

              {/* Slider 4: Staff count */}
              <div className="slider-group">
                <div className="slider-lbl">
                  <span>Total Staff Members</span>
                  <strong className="slider-val">{staffCount}</strong>
                </div>
                <input
                  type="range"
                  min="2"
                  max="60"
                  step="1"
                  value={staffCount}
                  onChange={(e) => setStaffCount(parseInt(e.target.value))}
                  className="custom-range"
                />
                <div className="slider-limits"><span>2</span> <span>60+</span></div>
              </div>
            </div>

            {/* Right side: Outputs */}
            <div className="roi-outputs-panel">
              <div className="panel-header">
                <span>ESTIMATED MONTHLY GAINS</span>
                <span className="live-pill">LIVE PROJECTION</span>
              </div>

              <div className="outputs-grid">
                {/* Output 1: Extra Revenue */}
                <div className="output-card glass-card border-rose">
                  <div className="output-title">
                    <IndianRupee size={14} color="var(--accent-orange)" /> EXTRA REVENUE
                  </div>
                  <h3>₹{extraRevenue.toLocaleString()}</h3>
                  <p>Generated via automated upsells and smart recommendations on QR menus.</p>
                </div>

                {/* Output 2: Savings */}
                <div className="output-card glass-card border-green">
                  <div className="output-title">
                    <CheckCircle size={14} color="var(--accent-green)" /> MONTHLY SAVINGS
                  </div>
                  <h3>₹{monthlySavings.toLocaleString()}</h3>
                  <p>Saved in paper, audit administration, and ingredient wastage alerts.</p>
                </div>

                {/* Output 3: Reduced Errors */}
                <div className="output-card glass-card border-amber">
                  <div className="output-title">
                    <ShieldAlert size={14} color="var(--accent-amber)" /> ERRORS AVOIDED
                  </div>
                  <h3>₹{reducedErrors.toLocaleString()}</h3>
                  <p>Losses stopped by syncing checkouts directly with kitchen displays.</p>
                </div>

                {/* Output 4: Time Saved */}
                <div className="output-card glass-card border-blue">
                  <div className="output-title">
                    <Clock size={14} color="var(--accent-blue)" /> TIME SAVED
                  </div>
                  <h3>{timeSaved} <span style={{ fontSize: "1rem", color: "var(--text-secondary)", fontWeight: 400 }}>hours</span></h3>
                  <p>Reclaimed each month from manual inventory logs and table order taking.</p>
                </div>
              </div>

              {/* Total Summary */}
              <div className="roi-total-banner glass-card">
                <div>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 700 }}>COMBINED MONTHLY VALUE</span>
                  <h3 style={{ fontSize: "2.2rem", fontWeight: 800, color: "var(--accent-orange)" }}>
                    ₹{(extraRevenue + monthlySavings + reducedErrors).toLocaleString()}
                  </h3>
                </div>
                <div style={{ maxWidth: "250px", fontSize: "0.75rem", color: "var(--text-secondary)", lineHeight: "1.4" }}>
                  OrderJi typically pays for itself within the first 6 days of store deployment.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .roi-section {
          padding: 8rem 0;
          background-color: var(--bg-secondary);
          position: relative;
          z-index: 10;
        }

        .roi-calculator-box {
          max-width: 1100px;
          margin: 0 auto;
          box-shadow: 0 30px 60px -15px rgba(90, 80, 70, 0.08), 0 0 1px rgba(90, 80, 70, 0.1);
          overflow: hidden;
          background: var(--bg-card);
        }

        .roi-layout {
          display: grid;
          grid-template-columns: 1fr;
        }

        @media (min-width: 1024px) {
          .roi-layout {
            grid-template-columns: 420px 1fr;
          }
        }

        .roi-inputs-panel {
          padding: 2.5rem;
          background: rgba(255, 255, 255, 0.4);
          border-bottom: 1px solid var(--border-color);
        }

        @media (min-width: 1024px) {
          .roi-inputs-panel {
            border-bottom: none;
            border-right: 1px solid var(--border-color);
          }
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 1px;
          margin-bottom: 2.5rem;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(227, 6, 19, 0.08);
          border: 1px solid rgba(227, 6, 19, 0.2);
          color: var(--text-primary);
          padding: 0.4rem 1rem;
          border-radius: 9999px;
          font-size: 0.85rem;
          font-weight: 500;
          margin-bottom: 1.5rem;
        }

        .slider-group {
          margin-bottom: 2rem;
        }

        .slider-lbl {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        .slider-val {
          color: var(--accent-orange);
        }

        .custom-range {
          width: 100%;
          -webkit-appearance: none;
          background: var(--bg-tertiary);
          height: 6px;
          border-radius: 9999px;
          outline: none;
        }

        .custom-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          border: 3px solid var(--accent-orange);
          box-shadow: 0 2px 6px rgba(227, 6, 19, 0.3);
          transition: transform 0.1s ease;
        }

        .custom-range::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }

        .slider-limits {
          display: flex;
          justify-content: space-between;
          font-size: 0.7rem;
          color: var(--text-muted);
          margin-top: 0.25rem;
        }

        /* Outputs Panel */
        .roi-outputs-panel {
          padding: 2.5rem;
          background: rgba(255, 255, 255, 0.15);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .live-pill {
          background: rgba(227, 6, 19, 0.08);
          color: var(--accent-orange);
          padding: 0.25rem 0.6rem;
          border-radius: 9999px;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .outputs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.25rem;
        }

        .output-card {
          padding: 1.25rem;
          background: rgba(255, 255, 255, 0.5);
          transition: var(--transition-smooth);
        }

        .output-card:hover {
          background: rgba(255, 255, 255, 0.95);
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(90, 80, 70, 0.04);
        }

        .border-rose {
          border-color: rgba(227, 6, 19, 0.15) !important;
        }
        .border-rose:hover {
          border-color: rgba(227, 6, 19, 0.4) !important;
        }

        .border-green {
          border-color: rgba(5, 150, 105, 0.15) !important;
        }
        .border-green:hover {
          border-color: rgba(5, 150, 105, 0.4) !important;
        }

        .border-amber {
          border-color: rgba(217, 119, 6, 0.15) !important;
        }
        .border-amber:hover {
          border-color: rgba(217, 119, 6, 0.4) !important;
        }

        .border-blue {
          border-color: rgba(2, 132, 199, 0.15) !important;
        }
        .border-blue:hover {
          border-color: rgba(2, 132, 199, 0.4) !important;
        }

        .output-title {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--text-secondary);
          letter-spacing: 1px;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          margin-bottom: 0.5rem;
        }

        .output-card h3 {
          font-size: 1.6rem;
          font-weight: 800;
          margin-bottom: 0.25rem;
          color: var(--text-primary);
        }

        .output-card p {
          font-size: 0.75rem;
          line-height: 1.4;
          color: var(--text-muted);
        }

        /* Total Banner */
        .roi-total-banner {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          background: rgba(227, 6, 19, 0.03);
          border-color: rgba(227, 6, 19, 0.15) !important;
          gap: 1.5rem;
          margin-top: auto;
        }
      `}</style>
    </section>
  );
}
