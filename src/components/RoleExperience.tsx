"use client";

import React, { useState } from "react";
import { Sparkles, TrendingUp, BarChart2, Shield, Calendar, Users, AlertTriangle, Printer, CreditCard, ChevronRight, Play, CheckCircle } from "lucide-react";

type RoleName = "Owner" | "Manager" | "Cashier" | "Kitchen" | "Waiter";

interface RoleConfig {
  title: string;
  role: RoleName;
  tagline: string;
  color: string;
  widgets: React.ReactNode;
}

export default function RoleExperience() {
  const [activeRole, setActiveRole] = useState<RoleName>("Owner");

  const roles: RoleConfig[] = [
    {
      role: "Owner",
      title: "Executive Director",
      tagline: "Track net margins, brand performance, customer retention, and high-level marketing campaigns.",
      color: "var(--accent-orange)",
      widgets: (
        <div className="role-widgets-grid">
          {/* Widget 1 */}
          <div className="role-widget glass-card hover-glow-orange">
            <div className="widget-header">
              <TrendingUp size={16} color="var(--accent-orange)" />
              <span>NET REVENUE TODAY</span>
            </div>
            <h3 style={{ fontSize: "1.8rem", fontWeight: 800, margin: "0.5rem 0" }}>₹1,48,250</h3>
            <div className="widget-chart">
              {/* Mini SVG area chart */}
              <svg viewBox="0 0 100 30" width="100%" height="40">
                <defs>
                  <linearGradient id="orangeGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent-orange)" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="var(--accent-orange)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 25 C 20 20, 40 28, 60 10, 80 15, 100 2 M100 30 L0 30 Z" fill="url(#orangeGlow)" />
                <path d="M0 25 C 20 20, 40 28, 60 10, 80 15, 100 2" fill="none" stroke="var(--accent-orange)" strokeWidth="2" />
              </svg>
            </div>
            <span className="widget-meta" style={{ color: "var(--accent-green)" }}>+18.4% compared to last Wednesday</span>
          </div>

          {/* Widget 2 */}
          <div className="role-widget glass-card hover-glow-orange">
            <div className="widget-header">
              <BarChart2 size={16} color="var(--accent-orange)" />
              <span>ACQUISITION & CRM</span>
            </div>
            <h3 style={{ fontSize: "1.8rem", fontWeight: 800, margin: "0.5rem 0" }}>142 <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)", fontWeight: 400 }}>new profiles</span></h3>
            <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: "1.4" }}>
              Gold loyalty registrations increased by 22% after implementing automated post-bill SMS reminders.
            </p>
          </div>

          {/* Widget 3 */}
          <div className="role-widget glass-card hover-glow-orange">
            <div className="widget-header">
              <Shield size={16} color="var(--accent-orange)" />
              <span>P&L INDEX</span>
            </div>
            <h3 style={{ fontSize: "1.8rem", fontWeight: 800, margin: "0.5rem 0" }}>32.4%</h3>
            <span className="widget-meta">Net Operating Margin (optimal)</span>
          </div>
        </div>
      )
    },
    {
      role: "Manager",
      title: "Store General Manager",
      tagline: "Oversee live floor occupancy, monitor kitchen preparation delays, and optimize team scheduling.",
      color: "var(--accent-blue)",
      widgets: (
        <div className="role-widgets-grid">
          {/* Widget 1 */}
          <div className="role-widget glass-card hover-glow-blue">
            <div className="widget-header">
              <Calendar size={16} color="var(--accent-blue)" />
              <span>STAFF SHIFTS ACTIVE</span>
            </div>
            <h3 style={{ fontSize: "1.8rem", fontWeight: 800, margin: "0.5rem 0" }}>8 On Duty</h3>
            <span className="widget-meta">2 kitchen prep | 4 front-of-house | 2 bar</span>
          </div>

          {/* Widget 2 */}
          <div className="role-widget glass-card hover-glow-blue">
            <div className="widget-header">
              <Users size={16} color="var(--accent-blue)" />
              <span>FLOOR COVERAGE</span>
            </div>
            <h3 style={{ fontSize: "1.8rem", fontWeight: 800, margin: "0.5rem 0" }}>18 / 24 <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)", fontWeight: 400 }}>tables occupied</span></h3>
            <span className="widget-meta" style={{ color: "var(--accent-amber)" }}>Peak hours loading: 75% capacity</span>
          </div>

          {/* Widget 3 */}
          <div className="role-widget glass-card hover-glow-blue">
            <div className="widget-header">
              <AlertTriangle size={16} color="var(--accent-blue)" />
              <span>CRITICAL ALERTS</span>
            </div>
            <h3 style={{ fontSize: "1.8rem", fontWeight: 800, margin: "0.5rem 0", color: "var(--accent-amber)" }}>1 Delay</h3>
            <span className="widget-meta">Table 12 preparation exceeds 18 mins.</span>
          </div>
        </div>
      )
    },
    {
      role: "Cashier",
      title: "Billing Executive",
      tagline: "Track open invoices, split tables, print receipts, and monitor split payment gateway statuses.",
      color: "var(--accent-green)",
      widgets: (
        <div className="role-widgets-grid">
          {/* Widget 1 */}
          <div className="role-widget glass-card hover-glow-green">
            <div className="widget-header">
              <Printer size={16} color="var(--accent-green)" />
              <span>PRINT QUEUE (LIVE)</span>
            </div>
            <div className="billing-log">
              <div className="log-row"><span>Table 07</span> <span className="p-success">PRINTED</span></div>
              <div className="log-row"><span>Table 12</span> <span className="p-pending">QUEUED</span></div>
            </div>
          </div>

          {/* Widget 2 */}
          <div className="role-widget glass-card hover-glow-green">
            <div className="widget-header">
              <CreditCard size={16} color="var(--accent-green)" />
              <span>RECONCILIATION RATE</span>
            </div>
            <h3 style={{ fontSize: "1.8rem", fontWeight: 800, margin: "0.5rem 0" }}>100%</h3>
            <span className="widget-meta">UPI, cash, and card gateways matched</span>
          </div>

          {/* Widget 3 */}
          <div className="role-widget glass-card hover-glow-green">
            <div className="widget-header">
              <CheckCircle size={16} color="var(--accent-green)" />
              <span>COMPLETED TRANSACTIONS</span>
            </div>
            <h3 style={{ fontSize: "1.8rem", fontWeight: 800, margin: "0.5rem 0" }}>₹84,120 <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)", fontWeight: 400 }}>settled</span></h3>
            <span className="widget-meta" style={{ color: "var(--accent-green)" }}>42 digital receipts pushed</span>
          </div>
        </div>
      )
    },
    {
      role: "Kitchen",
      title: "Head Chef / KDS Terminal",
      tagline: "Manage food prep timers, monitor tickets by station, and alert waiters when items are ready.",
      color: "var(--accent-amber)",
      widgets: (
        <div className="role-widgets-grid">
          {/* Widget 1 */}
          <div className="role-widget glass-card hover-glow-amber">
            <div className="widget-header">
              <Sparkles size={16} color="var(--accent-amber)" />
              <span>ACTIVE PREPARATIONS</span>
            </div>
            <h3 style={{ fontSize: "1.8rem", fontWeight: 800, margin: "0.5rem 0" }}>4 tickets</h3>
            <span className="widget-meta">Avg cooking timer: 11.2 mins</span>
          </div>

          {/* Widget 2 */}
          <div className="role-widget glass-card hover-glow-amber">
            <div className="widget-header">
              <AlertTriangle size={16} color="var(--accent-amber)" />
              <span>KITCHEN LOAD</span>
            </div>
            <h3 style={{ fontSize: "1.8rem", fontWeight: 800, margin: "0.5rem 0", color: "var(--accent-green)" }}>NORMAL</h3>
            <span className="widget-meta">Fryer and Main stations balanced</span>
          </div>

          {/* Widget 3 */}
          <div className="role-widget glass-card hover-glow-amber" style={{ display: "flex", flexDirection: "column" }}>
            <div className="widget-header">
              <span>UPCOMING ITEM</span>
            </div>
            <div style={{ marginTop: "0.5rem", fontSize: "0.85rem" }}>
              <strong>Table 14:</strong> 1x Roasted Sea Bass
            </div>
            <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>Note: Gluten-free request</span>
          </div>
        </div>
      )
    },
    {
      role: "Waiter",
      title: "Server / Captain App",
      tagline: "Receive instant service call notifications, view table orders, and send orders from table-side.",
      color: "var(--accent-blue)",
      widgets: (
        <div className="role-widgets-grid">
          {/* Widget 1 */}
          <div className="role-widget glass-card hover-glow-blue">
            <div className="widget-header">
              <Users size={16} color="var(--accent-blue)" />
              <span>ASSIGNED TABLES</span>
            </div>
            <h3 style={{ fontSize: "1.8rem", fontWeight: 800, margin: "0.5rem 0" }}>T-04, T-08, T-12</h3>
            <span className="widget-meta">Serving 8 active diners</span>
          </div>

          {/* Widget 2 */}
          <div className="role-widget glass-card hover-glow-blue">
            <div className="widget-header">
              <AlertTriangle size={16} color="var(--accent-blue)" />
              <span>LIVE GUEST CALLS</span>
            </div>
            <div className="billing-log">
              <div className="log-row"><span>T-04: Water</span> <span className="p-pending" style={{ color: "var(--accent-amber)" }}>CALLING</span></div>
              <div className="log-row"><span>T-12: Bill request</span> <span className="p-pending" style={{ color: "var(--accent-rose)" }}>ALERT</span></div>
            </div>
          </div>

          {/* Widget 3 */}
          <div className="role-widget glass-card hover-glow-blue">
            <div className="widget-header">
              <span>SERVICE TICKETS</span>
            </div>
            <h3 style={{ fontSize: "1.8rem", fontWeight: 800, margin: "0.5rem 0" }}>14 closed</h3>
            <span className="widget-meta">Avg response: 1.4 mins</span>
          </div>
        </div>
      )
    }
  ];

  const currentRoleConfig = roles.find((r) => r.role === activeRole)!;

  return (
    <section className="roles-section" id="roles">
      <div className="glow-spot glow-rose" style={{ top: "10%", left: "10%", width: "400px", height: "400px" }} />
      <div className="glow-spot glow-blue" style={{ bottom: "10%", right: "10%", width: "400px", height: "400px" }} />

      <div className="container">
        {/* Title Block */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div className="badge animate-float" style={{ background: "rgba(227, 6, 19, 0.08)", borderColor: "rgba(227, 6, 19, 0.2)" }}>
            <Sparkles size={12} style={{ color: "var(--accent-orange)", marginRight: "4px" }} /> Multi-Role Architecture
          </div>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-1.5px", marginBottom: "1rem" }}>
            Tailored Experiences for Every Role
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}>
            OrderJi acts as a multi-headed operating system, changing its entire interface layout and data tools based on who is using it.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="role-tabs-bar glass-card">
          {roles.map((r) => (
            <button
              key={r.role}
              onClick={() => setActiveRole(r.role)}
              className={`role-tab-btn ${activeRole === r.role ? "active" : ""}`}
              style={{
                borderColor: activeRole === r.role ? r.color : "transparent",
                color: activeRole === r.role ? "var(--accent-orange)" : "var(--text-secondary)"
              }}
            >
              {r.role}
            </button>
          ))}
        </div>

        {/* Role Content Details */}
        <div className="role-content-display glass-card" style={{ borderTopColor: currentRoleConfig.color }}>
          <div className="role-info-sidebar">
            <span className="role-tag" style={{ color: currentRoleConfig.color }}>{currentRoleConfig.role} INTERFACE</span>
            <h2>{currentRoleConfig.title}</h2>
            <p>{currentRoleConfig.tagline}</p>
            <div className="divider" style={{ margin: "2rem 0" }} />
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <span className="dot pulse-green" style={{ backgroundColor: currentRoleConfig.color, boxShadow: `0 0 8px ${currentRoleConfig.color}` }} />
              <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Active Live Sync (0.2s delay)</span>
            </div>
          </div>

          <div className="role-preview-window">
            {/* Window Topbar */}
            <div className="role-window-bar">
              <div className="window-dots">
                <span className="window-dot red" />
                <span className="window-dot yellow" />
                <span className="window-dot green" />
              </div>
              <span className="window-address">orderji_os_{currentRoleConfig.role.toLowerCase()}.app</span>
            </div>
            {/* Widget layout render */}
            <div className="role-workspace-view">
              {currentRoleConfig.widgets}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .roles-section {
          padding: 8rem 0;
          background-color: var(--bg-primary);
          position: relative;
        }

        .role-tabs-bar {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0.5rem;
          padding: 0.5rem;
          max-width: 600px;
          margin: 0 auto 3rem auto;
          border-radius: 9999px;
          background: var(--bg-card);
        }

        .role-tab-btn {
          background: transparent;
          border: 1px solid transparent;
          color: var(--text-secondary);
          padding: 0.6rem 1.5rem;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .role-tab-btn:hover, .role-tab-btn.active {
          background: rgba(0, 0, 0, 0.02);
        }

        .role-tab-btn.active {
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.02);
          background: rgba(227, 6, 19, 0.05);
        }

        /* Displays layout */
        .role-content-display {
          display: grid;
          grid-template-columns: 1fr;
          box-shadow: 0 30px 60px -25px rgba(0,0,0,0.05);
          overflow: hidden;
          min-height: 480px;
          border-top: 3px solid;
          transition: border-color 0.4s ease;
          background: var(--bg-card);
        }

        @media (min-width: 1024px) {
          .role-content-display {
            grid-template-columns: 350px 1fr;
          }
        }

        .role-info-sidebar {
          padding: 3rem 2rem;
          background: rgba(0, 0, 0, 0.005);
          border-bottom: 1px solid var(--border-color);
        }

        @media (min-width: 1024px) {
          .role-info-sidebar {
            border-bottom: none;
            border-right: 1px solid var(--border-color);
          }
        }

        .role-tag {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          margin-bottom: 0.75rem;
          display: block;
        }

        .role-info-sidebar h2 {
          font-size: 1.8rem;
          font-weight: 800;
          letter-spacing: -0.5px;
          margin-bottom: 1rem;
        }

        .role-info-sidebar p {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .role-preview-window {
          display: flex;
          flex-direction: column;
          background: rgba(0,0,0,0.005);
        }

        .role-window-bar {
          background: rgba(0, 0, 0, 0.015);
          border-bottom: 1px solid var(--border-color);
          padding: 0.75rem 1.25rem;
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .window-address {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-family: monospace;
        }

        .role-workspace-view {
          padding: 2.5rem;
          flex-grow: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .role-widgets-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          width: 100%;
        }

        .role-widget {
          padding: 1.5rem;
          background: rgba(255,255,255,0.7);
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          min-height: 160px;
        }

        .widget-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--text-secondary);
          letter-spacing: 0.5px;
        }

        .widget-meta {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-top: auto;
        }

        .widget-chart {
          margin: 0.5rem 0;
        }

        /* Cashier layout log style */
        .billing-log {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }

        .log-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          padding: 0.4rem;
          background: rgba(0,0,0,0.01);
          border: 1px solid var(--border-color);
          border-radius: 4px;
        }

        .p-success { color: var(--accent-green); font-weight: 700; }
        .p-pending { color: var(--accent-blue); font-weight: 700; }

        /* Hover glows based on role */
        .hover-glow-orange:hover { border-color: var(--accent-orange); box-shadow: 0 0 10px rgba(227, 6, 19, 0.1); }
        .hover-glow-blue:hover { border-color: var(--accent-blue); box-shadow: 0 0 10px rgba(2, 132, 199, 0.1); }
        .hover-glow-green:hover { border-color: var(--accent-green); box-shadow: 0 0 10px rgba(5, 150, 105, 0.1); }
        .hover-glow-amber:hover { border-color: var(--accent-amber); box-shadow: 0 0 10px rgba(217, 119, 6, 0.1); }
      `}</style>
    </section>
  );
}
