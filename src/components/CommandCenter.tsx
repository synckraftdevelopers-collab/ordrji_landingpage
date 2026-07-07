"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Clock, ShoppingCart, Layers, Users, Smartphone, ClipboardList, Bike } from "lucide-react";

// ── Count-up hook (quartic ease-out, rAF) ──────────────────────────────────
function useCountUp(target: number, duration = 1800, started = false): number {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!started) return;
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
  return started ? value : 0;
}

// Types
interface Order {
  id: string;
  table: string;
  items: string;
  createdAt: number;
  amount: number;
  status: "Ordering" | "Preparing" | "Ready" | "Paid";
  source: "QR" | "Waiter" | "Zomato" | "Swiggy";
}

interface SyncLog {
  id: string;
  time: string;
  message: string;
  type: "success" | "info" | "warning";
}

function getRelativeTime(createdAt: number, now: number): string {
  if (!now || !createdAt) return "Just now";
  const diffSec = Math.floor((now - createdAt) / 1000);
  if (diffSec < 1) return "Just now";
  if (diffSec < 45) return `${diffSec}s ago`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHour = Math.floor(diffMin / 60);
  return `${diffHour}h ago`;
}

// ── Stat badge sub-component ───────────────────────────────────────────────
interface StatBadgeProps {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
  color: string;
  started: boolean;
  delay: number;
}

function CcStatBadge({ icon, value, suffix, label, color, started, delay }: StatBadgeProps) {
  const count = useCountUp(value, 1800, started);
  return (
    <div
      className="cc-stat-badge"
      style={{
        borderTopColor: color,
        animationDelay: started ? `${delay}ms` : "0ms",
        animationPlayState: started ? "running" : "paused",
      }}
    >
      <div className="cc-stat-icon" style={{ background: `${color}18` }}>
        {React.cloneElement(icon as React.ReactElement<{ size: number; color: string }>, { size: 20, color })}
      </div>
      <div className="cc-stat-num" style={{ background: `linear-gradient(135deg, var(--text-primary) 0%, ${color} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
        {count}{suffix}
      </div>
      <div className="cc-stat-label">{label}</div>
    </div>
  );
}

export default function CommandCenter() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [statsStarted, setStatsStarted] = useState(false);
  const [dashboardVisible, setDashboardVisible] = useState(false);

  const [orders, setOrders] = useState<Order[]>([]);
  const [revenue, setRevenue] = useState(87420);
  const [kitchenDelay, setKitchenDelay] = useState(2);
  const [activeTab, setActiveTab] = useState<"feed" | "metrics">("feed");
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [logs, setLogs] = useState<SyncLog[]>([]);
  const [now, setNow] = useState(0);

  const ordersRef = useRef<Order[]>([]);
  // sync ref outside render via effect
  useEffect(() => { ordersRef.current = orders; }, [orders]);

  const formatTime = (date: Date) => {
    return date.toTimeString().split(" ")[0];
  };

  // Client-side initialization to prevent hydration issues
  useEffect(() => {
    const baseTime = Date.now();
    const raf = requestAnimationFrame(() => {
      setOrders([
        { id: "#1092", table: "T-04", items: "1x Grilled Salmon, 2x Pinot Noir", createdAt: baseTime - 60000, amount: 4850, status: "Preparing", source: "QR" },
        { id: "#1091", table: "T-12", items: "2x Classic Burgers, 1x Truffle Fries", createdAt: baseTime - 180000, amount: 2450, status: "Preparing", source: "Waiter" },
        { id: "#1090", table: "T-09", items: "1x Margherita Pizza, 2x Coke", createdAt: baseTime - 480000, amount: 1350, status: "Ready", source: "QR" },
        { id: "#1089", table: "T-02", items: "1x Ribeye Steak, 1x Baked Potato", createdAt: baseTime - 840000, amount: 3800, status: "Paid", source: "Waiter" },
        { id: "#1088", table: "Delivery", items: "3x Butter Chicken, 3x Garlic Naan", createdAt: baseTime - 1140000, amount: 2980, status: "Preparing", source: "Swiggy" }
      ]);

      const t1 = new Date(baseTime - 90000);
      const t2 = new Date(baseTime - 60000);
      const t3 = new Date(baseTime - 30000);
      setLogs([
        { id: "1", time: formatTime(t1), message: `[${formatTime(t1)}] KDS sync handshake successful (12ms)`, type: "success" },
        { id: "2", time: formatTime(t2), message: `[${formatTime(t2)}] Swiggy webhook connected (8ms)`, type: "success" },
        { id: "3", time: formatTime(t3), message: `[${formatTime(t3)}] Dine-In QR Order #1092 auto-routed to KDS & Printer (14ms)`, type: "info" }
      ]);

      setNow(Date.now());
    });
    const clockInterval = setInterval(() => { setNow(Date.now()); }, 5000);
    return () => { cancelAnimationFrame(raf); clearInterval(clockInterval); };
  }, []);

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
          setTimeout(() => setDashboardVisible(true), 400);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [inView]);

  // Auto-rotate tabs every 6 seconds unless paused by interaction
  useEffect(() => {
    if (!isAutoRotating) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev === "feed" ? "metrics" : "feed"));
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoRotating]);

  const prevOrdersRef = useRef<Order[]>([]);

  // Log tracking effect
  useEffect(() => {
    if (orders.length === 0) return;
    if (prevOrdersRef.current.length === 0) {
      prevOrdersRef.current = orders;
      return;
    }

    const prevOrders = prevOrdersRef.current;
    prevOrdersRef.current = orders;

    // Check if a new order was prepended
    if (orders[0] && prevOrders[0] && orders[0].id !== prevOrders[0].id) {
      const newOrder = orders[0];
      const timeStr = formatTime(new Date());
      let msg = "";
      if (newOrder.source === "QR") {
        msg = `[${timeStr}] Dine-In QR Order ${newOrder.id} auto-routed to KDS & Printer (14ms)`;
      } else if (newOrder.source === "Waiter") {
        msg = `[${timeStr}] Waiter Order ${newOrder.id} synced to Kitchen & POS (9ms)`;
      } else {
        msg = `[${timeStr}] ${newOrder.source} Order ${newOrder.id} pushed to POS (11ms)`;
      }

      setLogs((prev) => [
        { id: Math.random().toString(), time: timeStr, message: msg, type: "info" },
        ...prev.slice(0, 4)
      ]);
      return;
    }

    // Check if any order status changed
    for (let i = 0; i < orders.length; i++) {
      const current = orders[i];
      const prev = prevOrders.find((o) => o.id === current.id);
      if (prev && prev.status !== current.status) {
        const timeStr = formatTime(new Date());
        const msg = `[${timeStr}] Order ${current.id} status updated to ${current.status} (8ms)`;
        setLogs((prevLogs) => [
          { id: Math.random().toString(), time: timeStr, message: msg, type: "success" },
          ...prevLogs.slice(0, 4)
        ]);
        break;
      }
    }
  }, [orders]);

  const triggerSimulatedOrder = (source: "QR" | "Waiter" | "Zomato" | "Swiggy") => {
    const currentOrders = ordersRef.current;
    const maxId = currentOrders.reduce((max, o) => {
      const num = parseInt(o.id.replace("#", ""), 10);
      return !isNaN(num) && num > max ? num : max;
    }, 1092);
    const newId = `#${maxId + 1}`;

    let table = "T-05";
    let items = "1x Grilled Salmon, 2x Pinot Noir";
    let amount = 4850;

    if (source === "QR") {
      const qrOptions = [
        { table: "T-04", items: "1x Truffle Fries, 2x Margherita Pizza", amount: 1950 },
        { table: "T-08", items: "2x Avocado Toast, 1x Matcha Latte", amount: 1650 },
        { table: "T-15", items: "1x Sushi Special, 1x Hot Sake", amount: 4500 }
      ];
      const opt = qrOptions[Math.floor(Math.random() * qrOptions.length)];
      table = opt.table;
      items = opt.items;
      amount = opt.amount;
    } else if (source === "Waiter") {
      const waiterOptions = [
        { table: "T-12", items: "2x Classic Burgers, 1x Sweet Potato Fries", amount: 2550 },
        { table: "T-02", items: "1x Ribeye Steak, 1x Baked Potato, 1x Merlot", amount: 4800 },
        { table: "T-11", items: "2x Chocolate Souffle, 2x Cappuccino", amount: 1800 }
      ];
      const opt = waiterOptions[Math.floor(Math.random() * waiterOptions.length)];
      table = opt.table;
      items = opt.items;
      amount = opt.amount;
    } else {
      const deliveryOptions = [
        { table: "Delivery", items: "3x Butter Chicken, 3x Garlic Naan", amount: 2980 },
        { table: "Delivery", items: "1x Margherita Pizza, 1x Caesar Salad", amount: 1450 },
        { table: "Delivery", items: "2x Spicy Ramen, 1x Gyoza", amount: 2600 }
      ];
      const opt = deliveryOptions[Math.floor(Math.random() * deliveryOptions.length)];
      table = opt.table;
      items = opt.items;
      amount = opt.amount;
    }

    const newOrder: Order = {
      id: newId,
      table,
      items,
      createdAt: Date.now(),
      amount,
      status: "Ordering",
      source
    };

    setRevenue((prev) => prev + amount);
    setOrders((prev) => [newOrder, ...prev.slice(0, 5)]);
  };

  // Auto-simulation update interval
  useEffect(() => {
    const interval = setInterval(() => {
      const currentOrders = ordersRef.current;
      if (currentOrders.length === 0) return;

      const rand = Math.random();
      if (rand > 0.65) {
        const sources: ("QR" | "Waiter" | "Zomato" | "Swiggy")[] = ["QR", "Waiter", "Zomato", "Swiggy"];
        const chosenSource = sources[Math.floor(Math.random() * sources.length)];
        triggerSimulatedOrder(chosenSource);
      } else {
        setOrders((prev) => {
          const updated = [...prev];
          const indexToAdvance = updated.findIndex((o) => o.status !== "Paid");
          if (indexToAdvance !== -1) {
            const order = updated[indexToAdvance];
            let nextStatus: Order["status"] = "Preparing";
            if (order.status === "Ordering") nextStatus = "Preparing";
            else if (order.status === "Preparing") nextStatus = "Ready";
            else if (order.status === "Ready") nextStatus = "Paid";

            updated[indexToAdvance] = { ...order, status: nextStatus };
          }
          return updated;
        });
      }

      setKitchenDelay((prev) => {
        const delta = Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0;
        const next = prev + delta;
        return next >= 0 && next <= 5 ? next : prev;
      });
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="commandcenter-section" id="features" ref={sectionRef}>
      {/* Decorative glows */}
      <div className="glow-spot glow-blue" style={{ top: "10%", left: "5%", width: "400px", height: "400px" }} />
      <div className="glow-spot glow-rose" style={{ bottom: "10%", right: "5%", width: "500px", height: "500px" }} />

      <div className="container">
        {/* Header Block */}
        <div className={`cc-header${headerVisible ? " cc-header-in" : ""}`} style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-1.5px", marginBottom: "1rem" }}>
            The Mission Control of <br />
            Your Restaurant Operations
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}>
            Ditch multiple disconnected screens. OrderJi connects customer actions, kitchen displays, and checkout terminals in real time.
          </p>
        </div>

        {/* Count-up stat row */}
        <div className={`cc-stats-row${statsStarted ? " cc-stats-started" : ""}`}>
          <CcStatBadge icon={<ShoppingCart />} value={3} suffix="k+" label="Orders reconciled/day" color="#da0404" started={statsStarted} delay={0} />
          <CcStatBadge icon={<Clock />} value={99} suffix=".99%" label="Real-time sync uptime" color="#059669" started={statsStarted} delay={120} />
          <CcStatBadge icon={<Layers />} value={9} suffix=" modules" label="Unified platform" color="#0284c7" started={statsStarted} delay={240} />
          <CcStatBadge icon={<Users />} value={24} suffix="/7" label="Live monitoring" color="#d97706" started={statsStarted} delay={360} />
        </div>

        {/* The Floating Dashboard Mockup */}
        <div className={`dashboard-frame glass-card animate-float-delayed cc-dash-slide${dashboardVisible ? " cc-dash-in" : ""}`}>
          {/* Dashboard Header Bar */}
          <div className="dashboard-topbar">
            <div className="window-dots">
              <span className="window-dot red" />
              <span className="window-dot yellow" />
              <span className="window-dot green" />
            </div>
            <div className="dashboard-title">
              <span>https://admin.orderji.io/dashboard</span>
            </div>
            <div style={{ width: "60px" }} />
          </div>

          <div className="dashboard-content-layout">
            {/* Sidebar Controls */}
            <aside className="dashboard-sidebar">
              <div className="sidebar-section-title">CHANNELS</div>
              <div className="sidebar-item active">
                <span className="channel-indicator online" /> All Channels
              </div>
              <div className="sidebar-item">
                <span className="channel-indicator online" /> Dine-In QR
              </div>
              <div className="sidebar-item">
                <span className="channel-indicator online" /> Kiosk Ordering
              </div>
              <div className="sidebar-item">
                <span className="channel-indicator busy" /> Swiggy &amp; Zomato
              </div>

              <div className="sidebar-section-title" style={{ marginTop: "1.5rem" }}>SYSTEM INTEGRITY</div>
              <div className="sidebar-status-box">
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", marginBottom: "0.5rem" }}>
                  <span>KDS Node</span>
                  <span style={{ color: "var(--accent-green)" }}>ONLINE</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", marginBottom: "0.5rem" }}>
                  <span>Payment Gateway</span>
                  <span style={{ color: "var(--accent-green)" }}>ONLINE</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem" }}>
                  <span>Printer Spooler</span>
                  <span style={{ color: "var(--accent-green)" }}>ONLINE</span>
                </div>
              </div>

              <div className="sidebar-section-title" style={{ marginTop: "1.5rem" }}>REAL-TIME SYNC LOG</div>
              <div className="sidebar-log-console">
                {logs.length === 0 ? (
                  <div className="log-line">Initializing console...</div>
                ) : (
                  logs.map((log) => (
                    <div key={log.id} className="log-line">
                      <span className="log-dot">•</span> {log.message}
                    </div>
                  ))
                )}
              </div>
            </aside>

            {/* Central Dashboard Display */}
            <main className="dashboard-workspace">
              {/* Tabs */}
              <div className="workspace-tabs">
                <button
                  className={`workspace-tab ${activeTab === "feed" ? "active" : ""}`}
                  onClick={() => { setActiveTab("feed"); setIsAutoRotating(false); }}
                >
                  Live Order Feed <span className="counter-badge">{orders.length}</span>
                </button>
                <button
                  className={`workspace-tab ${activeTab === "metrics" ? "active" : ""}`}
                  onClick={() => { setActiveTab("metrics"); setIsAutoRotating(false); }}
                >
                  Operating KPIs
                </button>
              </div>

              {/* Feed Panel */}
              {activeTab === "feed" && (
                <div className="feed-panel">
                  {/* Simulator Controls */}
                  <div className="simulator-controls glass-card">
                    <div className="simulator-header">
                      <Sparkles size={16} style={{ color: "var(--accent-orange)" }} />
                      <h4>Interactive Live-Order Simulator</h4>
                      <p>Click to push an order and watch it sync across POS, KDS &amp; console logs instantly.</p>
                    </div>
                    <div className="simulator-buttons">
                      <button onClick={() => triggerSimulatedOrder("QR")} className="sim-btn qr">
                        <span>📱 Dine-In QR</span>
                      </button>
                      <button onClick={() => triggerSimulatedOrder("Waiter")} className="sim-btn waiter">
                        <span>👤 Waiter App</span>
                      </button>
                      <button onClick={() => triggerSimulatedOrder("Zomato")} className="sim-btn thirdparty">
                        <span>🛵 Zomato/Swiggy</span>
                      </button>
                    </div>
                  </div>

                  {/* Live Stats Bar */}
                  <div className="feed-summary-bar">
                    <div className="summary-stat">
                      <span className="summary-label">LIVE REVENUE (TODAY)</span>
                      <span key={revenue} className="summary-value text-emerald revenue-val-glow">
                        ₹{revenue.toLocaleString()}
                      </span>
                    </div>
                    <div className="summary-stat">
                      <span className="summary-label">ACTIVE ORDERS</span>
                      <span className="summary-value">{orders.length}</span>
                    </div>
                    <div className="summary-stat">
                      <span className="summary-label">KITCHEN SYNC DELAY</span>
                      <span className="summary-value text-rose">{kitchenDelay}s</span>
                    </div>
                  </div>

                  <div className="feed-header">
                    <span>Active Orders</span>
                    <span>Recent Activity</span>
                  </div>
                  <div className="orders-list">
                    {orders.length === 0 ? (
                      <div className="order-row glass-card" style={{ justifyContent: "center" }}>
                        <span style={{ color: "var(--text-secondary)" }}>Waiting for orders...</span>
                      </div>
                    ) : (
                      orders.map((order) => (
                        <div key={order.id} className="order-row glass-card">
                          <div className="order-main-info">
                            <div className="table-badge">{order.table}</div>
                            <div className="order-details">
                              <span className="order-id">
                                {order.id}
                                <span className={`source-badge ${order.source.toLowerCase()}`}>
                                  {order.source === "QR" && <Smartphone size={12} />}
                                  {order.source === "Waiter" && <ClipboardList size={12} />}
                                  {(order.source === "Zomato" || order.source === "Swiggy") && <Bike size={12} />}
                                  <span className="source-text">{order.source}</span>
                                </span>
                              </span>
                              <span className="order-items">{order.items}</span>
                            </div>
                          </div>
                          <div className="order-status-group">
                            <span className="order-time">
                              <Clock size={12} style={{ marginRight: "4px" }} /> {getRelativeTime(order.createdAt, now)}
                            </span>
                            {/* Visual Pipeline */}
                            <div className="status-pipeline">
                              {["Ordering", "Preparing", "Ready", "Paid"].map((step, idx) => {
                                const steps = ["Ordering", "Preparing", "Ready", "Paid"] as const;
                                const statusIndex = steps.indexOf(order.status);
                                const isActive = idx <= statusIndex;
                                const isCurrent = idx === statusIndex;
                                return (
                                  <React.Fragment key={step}>
                                    {idx > 0 && (
                                      <div className={`pipeline-line ${isActive ? "active" : ""}`} />
                                    )}
                                    <div className={`pipeline-step ${isActive ? "active" : ""} ${isCurrent ? "current" : ""}`}>
                                      <span className="step-dot" />
                                      <span className="step-label">{step}</span>
                                    </div>
                                  </React.Fragment>
                                );
                              })}
                            </div>
                            <span className="order-amount">₹{order.amount.toLocaleString()}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Metrics Panel */}
              {activeTab === "metrics" && (
                <div className="metrics-panel">
                  <div className="grid-3">
                    <div className="metric-radial glass-card">
                      <span className="metric-label">KITCHEN DELAYS</span>
                      <div className="radial-visual">
                        <svg width="100" height="100" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--border-color)" strokeWidth="8" />
                          <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--accent-rose)" strokeWidth="8"
                            strokeDasharray="251" strokeDashoffset={251 - (251 * (kitchenDelay / 5))}
                            strokeLinecap="round" transform="rotate(-90 50 50)" />
                        </svg>
                        <div className="radial-inner">
                          <span style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--accent-rose)" }}>{kitchenDelay}</span>
                          <span style={{ fontSize: "0.6rem", color: "var(--text-secondary)" }}>Late Orders</span>
                        </div>
                      </div>
                      <span className="radial-desc">Orders delayed &gt; 15 mins.</span>
                    </div>

                    <div className="metric-radial glass-card">
                      <span className="metric-label">INVENTORY HEALTH</span>
                      <div className="radial-visual">
                        <svg width="100" height="100" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--border-color)" strokeWidth="8" />
                          <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--accent-green)" strokeWidth="8"
                            strokeDasharray="251" strokeDashoffset={251 - (251 * 0.92)}
                            strokeLinecap="round" transform="rotate(-90 50 50)" />
                        </svg>
                        <div className="radial-inner">
                          <span style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--accent-green)" }}>92%</span>
                          <span style={{ fontSize: "0.6rem", color: "var(--text-secondary)" }}>Optimal</span>
                        </div>
                      </div>
                      <span className="radial-desc">4 critical warnings pending.</span>
                    </div>

                    <div className="metric-radial glass-card">
                      <span className="metric-label">MARKETING ROI</span>
                      <div className="radial-visual">
                        <svg width="100" height="100" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--border-color)" strokeWidth="8" />
                          <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--accent-blue)" strokeWidth="8"
                            strokeDasharray="251" strokeDashoffset={251 - (251 * 0.78)}
                            strokeLinecap="round" transform="rotate(-90 50 50)" />
                        </svg>
                        <div className="radial-inner">
                          <span style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--accent-blue)" }}>18.4x</span>
                          <span style={{ fontSize: "0.6rem", color: "var(--text-secondary)" }}>Return</span>
                        </div>
                      </div>
                      <span className="radial-desc">Active Campaign: Birthday SMS</span>
                    </div>
                  </div>

                  <div className="metrics-list-summary glass-card" style={{ marginTop: "1rem", padding: "1rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem", fontSize: "0.85rem" }}>
                      <span style={{ color: "var(--text-secondary)" }}>Customer Loyalty Active Users</span>
                      <span style={{ fontWeight: 600 }}>1,842 Profiles</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem", fontSize: "0.85rem" }}>
                      <span style={{ color: "var(--text-secondary)" }}>Average Ticket Size (Today)</span>
                      <span style={{ fontWeight: 600 }}>₹1,940</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
                      <span style={{ color: "var(--text-secondary)" }}>Active Campaigns ROI</span>
                      <span style={{ fontWeight: 600, color: "var(--accent-green)" }}>+₹14,800 Generated</span>
                    </div>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .commandcenter-section {
          padding: 8rem 0;
          background-color: var(--bg-primary);
          position: relative;
          overflow: hidden;
        }

        /* ── Header animation ── */
        .cc-header {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cc-header-in {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Stat row ── */
        .cc-stats-row {
          display: flex;
          flex-wrap: wrap;
          gap: 1.25rem;
          justify-content: center;
          margin-bottom: 3rem;
        }

        .cc-stat-badge {
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
          animation: ccStatUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-play-state: paused;
        }

        .cc-stats-started .cc-stat-badge {
          animation-play-state: running;
        }

        @keyframes ccStatUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .cc-stat-icon {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cc-stat-num {
          font-size: 2rem;
          font-weight: 800;
          letter-spacing: -1px;
          line-height: 1;
        }

        .cc-stat-label {
          font-size: 0.75rem;
          color: var(--text-secondary);
          text-align: center;
          line-height: 1.3;
        }

        /* ── Dashboard slide-up ── */
        .cc-dash-slide {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cc-dash-in {
          opacity: 1;
          transform: translateY(0);
        }

        .dashboard-frame {
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          overflow: hidden;
          box-shadow: 0 30px 60px -15px rgba(227, 6, 19, 0.08);
          border: 1px solid var(--border-color);
          background: var(--bg-card);
        }

        .dashboard-topbar {
          background: rgba(0, 0, 0, 0.02);
          border-bottom: 1px solid var(--border-color);
          padding: 0.75rem 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .window-dots {
          display: flex;
          gap: 0.5rem;
        }

        .window-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .window-dot.red { background-color: var(--accent-rose); }
        .window-dot.yellow { background-color: var(--accent-amber); }
        .window-dot.green { background-color: var(--accent-green); }

        .dashboard-title {
          background: rgba(0,0,0,0.03);
          border: 1px solid var(--border-color);
          padding: 0.25rem 2rem;
          border-radius: 6px;
          font-size: 0.75rem;
          color: var(--text-secondary);
          font-family: monospace;
        }

        .dashboard-content-layout {
          display: grid;
          grid-template-columns: 1fr;
          min-height: 500px;
        }

        @media (min-width: 768px) {
          .dashboard-content-layout {
            grid-template-columns: 240px 1fr;
          }
        }

        .dashboard-sidebar {
          background: rgba(0, 0, 0, 0.015);
          border-right: 1px solid var(--border-color);
          padding: 1.5rem;
          display: none;
        }

        @media (min-width: 768px) {
          .dashboard-sidebar {
            display: block;
          }
        }

        .sidebar-section-title {
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 1.5px;
          margin-bottom: 0.75rem;
        }

        .sidebar-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: var(--text-secondary);
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
          margin-bottom: 0.25rem;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .sidebar-item:hover, .sidebar-item.active {
          color: var(--accent-orange);
          background: rgba(227, 6, 19, 0.05);
        }

        .channel-indicator {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        .channel-indicator.online { background-color: var(--accent-green); }
        .channel-indicator.busy { background-color: var(--accent-amber); }

        .sidebar-status-box {
          background: rgba(0,0,0,0.01);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 0.8rem;
          color: var(--text-secondary);
        }

        .dashboard-workspace {
          padding: 1.5rem;
          background: rgba(0, 0, 0, 0.005);
          display: flex;
          flex-direction: column;
        }

        .workspace-tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 0.75rem;
        }

        .workspace-tab {
          background: none;
          border: 1px solid transparent;
          color: var(--text-secondary);
          font-size: 0.9rem;
          font-weight: 600;
          padding: 0.5rem 1rem;
          cursor: pointer;
          transition: var(--transition-fast);
          border-radius: 6px;
        }

        .workspace-tab:hover, .workspace-tab.active {
          color: var(--accent-orange);
          background: rgba(227, 6, 19, 0.04);
        }

        .workspace-tab.active {
          border-color: rgba(227, 6, 19, 0.15);
          box-shadow: 0 4px 12px rgba(227, 6, 19, 0.05);
        }

        .counter-badge {
          font-size: 0.7rem;
          background: var(--accent-orange);
          color: white;
          padding: 0.1rem 0.4rem;
          border-radius: 9999px;
          margin-left: 0.25rem;
        }

        .feed-header {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 0.75rem;
        }

        .orders-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .order-row {
          display: flex;
          flex-direction: column;
          padding: 1rem;
          gap: 0.75rem;
          justify-content: space-between;
          background: rgba(255, 255, 255, 0.5);
          transition: var(--transition-fast);
          animation: slideInRow 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes slideInRow {
          from {
            opacity: 0;
            transform: translateY(-15px);
            background: rgba(227, 6, 19, 0.15);
            box-shadow: 0 0 15px rgba(227, 6, 19, 0.2);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            background: rgba(255, 255, 255, 0.5);
            box-shadow: none;
          }
        }

        @media (min-width: 640px) {
          .order-row {
            flex-direction: row;
            align-items: center;
          }
        }

        .order-row:hover {
          background: var(--bg-card-hover);
          border-color: rgba(227, 6, 19, 0.25);
        }

        .order-main-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .table-badge {
          background: rgba(227, 6, 19, 0.08);
          border: 1px solid rgba(227, 6, 19, 0.2);
          color: var(--accent-orange);
          font-weight: 700;
          padding: 0.4rem 0.6rem;
          border-radius: 6px;
          font-size: 0.85rem;
        }

        .order-details {
          display: flex;
          flex-direction: column;
        }

        .order-id {
          font-size: 0.9rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .source-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.65rem;
          font-weight: 600;
          padding: 0.2rem 0.5rem;
          border-radius: 6px;
          text-transform: uppercase;
        }

        .source-badge.qr {
          background: rgba(2, 132, 199, 0.1);
          color: var(--accent-blue);
          border: 1px solid rgba(2, 132, 199, 0.2);
        }

        .source-badge.waiter {
          background: rgba(217, 119, 6, 0.1);
          color: var(--accent-amber);
          border: 1px solid rgba(217, 119, 6, 0.2);
        }

        .source-badge.zomato, .source-badge.swiggy {
          background: rgba(220, 38, 38, 0.1);
          color: var(--accent-rose);
          border: 1px solid rgba(220, 38, 38, 0.2);
        }

        .source-text {
          font-size: 0.65rem;
        }

        .order-items {
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin-top: 0.15rem;
        }

        .order-status-group {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          justify-content: space-between;
        }

        .order-time {
          display: inline-flex;
          align-items: center;
          font-size: 0.75rem;
          color: var(--text-muted);
          min-width: 60px;
        }

        .status-pipeline {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .pipeline-line {
          height: 2px;
          width: 20px;
          background: var(--border-color);
          transition: background 0.3s ease;
        }

        .pipeline-line.active {
          background: var(--accent-green);
        }

        .pipeline-step {
          display: flex;
          align-items: center;
          gap: 6px;
          opacity: 0.3;
          transition: all 0.3s ease;
        }

        .pipeline-step.active {
          opacity: 1;
        }

        .step-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--text-muted);
          transition: all 0.3s ease;
        }

        .pipeline-step.active .step-dot {
          background: var(--accent-green);
          box-shadow: 0 0 6px var(--accent-green);
        }

        .pipeline-step.current .step-dot {
          animation: statusDotPulse 1.2s infinite alternate;
          background: var(--accent-orange);
          box-shadow: 0 0 8px var(--accent-orange);
        }

        @keyframes statusDotPulse {
          from { transform: scale(1); opacity: 0.8; }
          to { transform: scale(1.4); opacity: 1; }
        }

        .step-label {
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--text-secondary);
        }

        .pipeline-step.current .step-label {
          color: var(--text-primary);
          font-weight: 700;
        }

        @media (max-width: 768px) {
          .step-label {
            display: none;
          }
          .pipeline-line {
            width: 12px;
          }
        }

        .order-amount {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
          min-width: 70px;
          text-align: right;
        }

        /* Console Logs */
        .sidebar-log-console {
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 0.6rem;
          font-family: monospace, Courier, monospace;
          font-size: 0.7rem;
          color: #a7f3d0;
          min-height: 140px;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          overflow: hidden;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .log-line {
          line-height: 1.3;
          animation: logFadeIn 0.3s ease-out forwards;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        @keyframes logFadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .log-dot {
          color: var(--accent-green);
          margin-right: 4px;
          display: inline-block;
        }

        /* Simulator Controls */
        .simulator-controls {
          padding: 1.25rem;
          margin-bottom: 1.5rem;
          background: rgba(0, 0, 0, 0.015);
          border: 1px solid var(--border-color);
          border-radius: 12px;
        }

        .simulator-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 0.75rem;
        }

        .simulator-header h4 {
          margin: 0;
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .simulator-header p {
          margin: 0;
          font-size: 0.75rem;
          color: var(--text-secondary);
          width: 100%;
          margin-top: 0.15rem;
        }

        .simulator-buttons {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .sim-btn {
          flex: 1;
          min-width: 120px;
          padding: 0.6rem 0.8rem;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          transition: all 0.2s ease-in-out;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
        }

        .sim-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(227, 6, 19, 0.08);
        }

        .sim-btn.qr:hover {
          border-color: var(--accent-blue);
          background: rgba(2, 132, 199, 0.06);
          color: var(--accent-blue);
        }

        .sim-btn.waiter:hover {
          border-color: var(--accent-amber);
          background: rgba(217, 119, 6, 0.06);
          color: var(--accent-amber);
        }

        .sim-btn.thirdparty:hover {
          border-color: var(--accent-rose);
          background: rgba(220, 38, 38, 0.06);
          color: var(--accent-rose);
        }

        /* Feed Summary Bar */
        .feed-summary-bar {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .summary-stat {
          flex: 1;
          min-width: 140px;
          background: rgba(0, 0, 0, 0.01);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 0.75rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .summary-label {
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 0.5px;
        }

        .summary-value {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-primary);
          display: inline-block;
          transition: all 0.3s ease;
        }

        .revenue-val-glow {
          animation: revenueGlow 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes revenueGlow {
          0% {
            color: var(--accent-green);
            text-shadow: 0 0 12px rgba(5, 150, 105, 0.4);
            transform: scale(1.05);
          }
          100% {
            color: inherit;
            text-shadow: none;
            transform: scale(1);
          }
        }

        .order-amount {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
          min-width: 70px;
          text-align: right;
        }

        .metrics-panel {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .grid-3 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1rem;
        }

        .metric-radial {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          text-align: center;
          background: rgba(255, 255, 255, 0.5);
        }

        .metric-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 1px;
          color: var(--text-secondary);
        }

        .radial-visual {
          position: relative;
          width: 100px;
          height: 100px;
        }

        .radial-inner {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .radial-desc {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
      `}</style>
    </section>
  );
}
