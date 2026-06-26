"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sparkles, TrendingUp, BarChart2, Shield, Calendar, Users, AlertTriangle, Printer, CreditCard, ChevronRight, Play, CheckCircle, User, Monitor } from "lucide-react";

// ── Count-up hook (quartic ease-out, rAF) ──────────────────────────────────
function useCountUp(target: number, duration = 1800, started = false): number {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!started) { setValue(0); return; }
    let startTime: number | null = null;
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setValue(Math.floor(easeOutQuart(progress) * target));
      if (progress < 1) requestAnimationFrame(step);
      else setValue(target);
    };
    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, started]);
  return value;
}

// ── Stat badge sub-component ───────────────────────────────────────────────
interface ReStatBadgeProps {
  icon: React.ReactNode;
  displayValue: string;
  label: string;
  color: string;
  started: boolean;
  delay: number;
}

function ReStatBadge({ icon, displayValue, label, color, started, delay }: ReStatBadgeProps) {
  return (
    <div
      className="re-stat-badge"
      style={{
        borderTopColor: color,
        animationDelay: `${delay}ms`,
        animationPlayState: started ? "running" : "paused",
      }}
    >
      <div className="re-stat-icon" style={{ background: `${color}18` }}>
        {React.cloneElement(icon as React.ReactElement<{ size: number; color: string }>, { size: 20, color })}
      </div>
      <div className="re-stat-num" style={{ background: `linear-gradient(135deg, var(--text-primary) 0%, ${color} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
        {displayValue}
      </div>
      <div className="re-stat-label">{label}</div>
    </div>
  );
}

// ── Count-up stat badge (uses hook internally) ─────────────────────────────
interface ReCountStatBadgeProps {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
  color: string;
  started: boolean;
  delay: number;
}

function ReCountStatBadge({ icon, value, suffix, label, color, started, delay }: ReCountStatBadgeProps) {
  const count = useCountUp(value, 1800, started);
  return (
    <ReStatBadge
      icon={icon}
      displayValue={`${count}${suffix}`}
      label={label}
      color={color}
      started={started}
      delay={delay}
    />
  );
}

type RoleName = "Owner" | "Manager" | "Cashier" | "Kitchen" | "Waiter";

interface RoleConfig {
  title: string;
  role: RoleName;
  tagline: string;
  color: string;
  widgets: React.ReactNode;
}

export default function RoleExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [statsStarted, setStatsStarted] = useState(false);
  const [tabsVisible, setTabsVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [activeRole, setActiveRole] = useState<RoleName>("Owner");

  // IntersectionObserver
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !inView) {
          setInView(true);
          setTimeout(() => setHeaderVisible(true), 80);
          setTimeout(() => setStatsStarted(true), 200);
          setTimeout(() => setTabsVisible(true), 350);
          setTimeout(() => setContentVisible(true), 500);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [inView]);

  const roles: RoleConfig[] = [
    {
      role: "Owner",
      title: "Executive Director",
      tagline: "Track net margins, brand performance, customer retention, and high-level marketing campaigns.",
      color: "var(--accent-orange)",
      widgets: (
        <div className="role-widgets-grid">
          <div className="role-widget glass-card hover-glow-orange">
            <div className="widget-header">
              <TrendingUp size={16} color="var(--accent-orange)" />
              <span>NET REVENUE TODAY</span>
            </div>
            <h3 style={{ fontSize: "1.8rem", fontWeight: 800, margin: "0.5rem 0" }}>₹1,48,250</h3>
            <div className="widget-chart">
              <svg viewBox="0 0 100 30" width="100%" height="40">
                <defs>
                  <linearGradient id="orangeGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent-orange)" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="var(--accent-orange)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 25 C 20 20, 40 28, 60 10 S 80 15, 100 2 M100 30 L0 30 Z" fill="url(#orangeGlow)" />
                <path d="M0 25 C 20 20, 40 28, 60 10 S 80 15, 100 2" fill="none" stroke="var(--accent-orange)" strokeWidth="2" />
              </svg>
            </div>
            <span className="widget-meta" style={{ color: "var(--accent-green)" }}>+18.4% compared to last Wednesday</span>
          </div>

          <div className="role-widget glass-card hover-glow-orange">
            <div className="widget-header">
              <BarChart2 size={16} color="var(--accent-orange)" />
              <span>ACQUISITION &amp; CRM</span>
            </div>
            <h3 style={{ fontSize: "1.8rem", fontWeight: 800, margin: "0.5rem 0" }}>142 <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)", fontWeight: 400 }}>new profiles</span></h3>
            <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: "1.4" }}>
              Gold loyalty registrations increased by 22% after implementing automated post-bill SMS reminders.
            </p>
          </div>

          <div className="role-widget glass-card hover-glow-orange">
            <div className="widget-header">
              <Shield size={16} color="var(--accent-orange)" />
              <span>P&amp;L INDEX</span>
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
          <div className="role-widget glass-card hover-glow-blue">
            <div className="widget-header">
              <Calendar size={16} color="var(--accent-blue)" />
              <span>STAFF SHIFTS ACTIVE</span>
            </div>
            <h3 style={{ fontSize: "1.8rem", fontWeight: 800, margin: "0.5rem 0" }}>8 On Duty</h3>
            <span className="widget-meta">2 kitchen prep | 4 front-of-house | 2 bar</span>
          </div>

          <div className="role-widget glass-card hover-glow-blue">
            <div className="widget-header">
              <Users size={16} color="var(--accent-blue)" />
              <span>FLOOR COVERAGE</span>
            </div>
            <h3 style={{ fontSize: "1.8rem", fontWeight: 800, margin: "0.5rem 0" }}>18 / 24 <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)", fontWeight: 400 }}>tables occupied</span></h3>
            <span className="widget-meta" style={{ color: "var(--accent-amber)" }}>Peak hours loading: 75% capacity</span>
          </div>

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

          <div className="role-widget glass-card hover-glow-green">
            <div className="widget-header">
              <CreditCard size={16} color="var(--accent-green)" />
              <span>RECONCILIATION RATE</span>
            </div>
            <h3 style={{ fontSize: "1.8rem", fontWeight: 800, margin: "0.5rem 0" }}>100%</h3>
            <span className="widget-meta">UPI, cash, and card gateways matched</span>
          </div>

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
          <div className="role-widget glass-card hover-glow-amber">
            <div className="widget-header">
              <Sparkles size={16} color="var(--accent-amber)" />
              <span>ACTIVE PREPARATIONS</span>
            </div>
            <h3 style={{ fontSize: "1.8rem", fontWeight: 800, margin: "0.5rem 0" }}>4 tickets</h3>
            <span className="widget-meta">Avg cooking timer: 11.2 mins</span>
          </div>

          <div className="role-widget glass-card hover-glow-amber">
            <div className="widget-header">
              <AlertTriangle size={16} color="var(--accent-amber)" />
              <span>KITCHEN LOAD</span>
            </div>
            <h3 style={{ fontSize: "1.8rem", fontWeight: 800, margin: "0.5rem 0", color: "var(--accent-green)" }}>NORMAL</h3>
            <span className="widget-meta">Fryer and Main stations balanced</span>
          </div>

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
          <div className="role-widget glass-card hover-glow-blue">
            <div className="widget-header">
              <Users size={16} color="var(--accent-blue)" />
              <span>ASSIGNED TABLES</span>
            </div>
            <h3 style={{ fontSize: "1.8rem", fontWeight: 800, margin: "0.5rem 0" }}>T-04, T-08, T-12</h3>
            <span className="widget-meta">Serving 8 active diners</span>
          </div>

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
    <section className="roles-section" id="roles" ref={sectionRef}>
      <div className="glow-spot glow-rose" style={{ top: "10%", left: "10%", width: "400px", height: "400px" }} />
      <div className="glow-spot glow-blue" style={{ bottom: "10%", right: "10%", width: "400px", height: "400px" }} />

      <div className="container">
        {/* Title Block */}
        <div className={`re-header${headerVisible ? " re-header-in" : ""}`} style={{ textAlign: "center", marginBottom: "4rem" }}>

          <h2 style={{ fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-1.5px", marginBottom: "1rem" }}>
            Tailored Experiences for Every Role
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}>
            OrderJi acts as a multi-headed operating system, changing its entire interface layout and data tools based on who is using it.
          </p>
        </div>

        {/* Count-up stat row */}
        <div className={`re-stats-row${statsStarted ? " re-stats-started" : ""}`}>
          <ReCountStatBadge icon={<User />} value={5} suffix=" roles" label="Dedicated interfaces" color="#e30613" started={statsStarted} delay={0} />
          {/* "0.2s" — hardcoded, no count-up */}
          <ReStatBadge displayValue="0.2s" icon={<Sparkles />} label="Live sync delay" color="#059669" started={statsStarted} delay={120} />
          <ReCountStatBadge icon={<Monitor />} value={100} suffix="%" label="Real-time data" color="#0284c7" started={statsStarted} delay={240} />
          <ReCountStatBadge icon={<Shield />} value={99} suffix=".99%" label="Session uptime" color="#7c3aed" started={statsStarted} delay={360} />
        </div>

        {/* Tab Buttons */}
        <div className={`role-tabs-bar glass-card re-tabs-slide${tabsVisible ? " re-tabs-in" : ""}`}>
          {roles.map((r, idx) => (
            <button
              key={r.role}
              onClick={() => setActiveRole(r.role)}
              className={`role-tab-btn re-tab-pop${activeRole === r.role ? " active" : ""}`}
              style={{
                borderColor: activeRole === r.role ? r.color : "transparent",
                color: activeRole === r.role ? "var(--accent-orange)" : "var(--text-secondary)",
                animationDelay: tabsVisible ? `${idx * 60}ms` : "0ms",
                animationPlayState: tabsVisible ? "running" : "paused",
              }}
            >
              {r.role}
            </button>
          ))}
        </div>

        {/* Role Content Details */}
        <div className={`role-content-display glass-card re-content-slide${contentVisible ? " re-content-in" : ""}`} style={{ borderTopColor: currentRoleConfig.color }}>
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
            <div className="role-window-bar">
              <div className="window-dots">
                <span className="window-dot red" />
                <span className="window-dot yellow" />
                <span className="window-dot green" />
              </div>
              <span className="window-address">orderji_os_{currentRoleConfig.role.toLowerCase()}.app</span>
            </div>
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

        /* ── Header animation ── */
        .re-header {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .re-header-in {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Stat row ── */
        .re-stats-row {
          display: flex;
          flex-wrap: wrap;
          gap: 1.25rem;
          justify-content: center;
          margin-bottom: 3rem;
        }

        .re-stat-badge {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1.5rem 2rem;
          border-radius: 14px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-top: 3px solid;
          min-width: 160px;
          opacity: 0;
          transform: translateY(28px);
          animation: reStatUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-play-state: paused;
        }

        .re-stats-started .re-stat-badge {
          animation-play-state: running;
        }

        @keyframes reStatUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .re-stat-icon {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .re-stat-num {
          font-size: 2rem;
          font-weight: 800;
          letter-spacing: -1px;
          line-height: 1;
        }

        .re-stat-label {
          font-size: 0.75rem;
          color: var(--text-secondary);
          text-align: center;
          line-height: 1.3;
        }

        /* ── Tabs slide-up ── */
        .re-tabs-slide {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .re-tabs-in {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Tab button staggered pop ── */
        .re-tab-pop {
          opacity: 0;
          animation: reTabPop 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-play-state: paused;
        }
        .re-tabs-in .re-tab-pop {
          animation-play-state: running;
        }
        @keyframes reTabPop {
          from { opacity: 0; transform: translateY(8px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* ── Role content slide-up ── */
        .re-content-slide {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .re-content-in {
          opacity: 1;
          transform: translateY(0);
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

        .hover-glow-orange:hover { border-color: var(--accent-orange); box-shadow: 0 0 10px rgba(227, 6, 19, 0.1); }
        .hover-glow-blue:hover { border-color: var(--accent-blue); box-shadow: 0 0 10px rgba(2, 132, 199, 0.1); }
        .hover-glow-green:hover { border-color: var(--accent-green); box-shadow: 0 0 10px rgba(5, 150, 105, 0.1); }
        .hover-glow-amber:hover { border-color: var(--accent-amber); box-shadow: 0 0 10px rgba(217, 119, 6, 0.1); }
      `}</style>
    </section>
  );
}
