"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChefHat, 
  Receipt, 
  Users, 
  TrendingUp, 
  QrCode, 
  CheckCircle2, 
  Clock, 
  CreditCard, 
  ChevronRight, 
  Check, 
  AlertCircle,
  Sparkles,
  Package,
  RefreshCw
} from "lucide-react";

import type { LucideProps } from "lucide-react";

interface PanelData {
  id: number;
  title: string;
  headline: string;
  description: string;
  icon: React.ComponentType<LucideProps>;
  gradient: string;
  accentColor: string;
  badge: string;
  ctaText: string;
}

const PANELS: PanelData[] = [
  {
    id: 0,
    title: "Orders",
    headline: "Orders Flow In Automatically",
    description: "Guests scan table QRs and order instantly. The AI operating system continuously tags item modifiers and routes tickets instantly to the prep station queue.",
    icon: QrCode,
    gradient: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)",
    accentColor: "var(--accent-orange)",
    badge: "AI Auto-Tagging",
    ctaText: "Launch QR ordering"
  },
  {
    id: 1,
    title: "Kitchen",
    headline: "Kitchen Works In Real Time",
    description: "Every order instantly reaches the KDS screen. The built-in AI assistant predicts preparation delays and automatically re-allocates kitchen tasks to prevent bottlenecks.",
    icon: ChefHat,
    gradient: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
    accentColor: "var(--accent-green)",
    badge: "AI SLA Prediction",
    ctaText: "Configure KDS lanes"
  },
  {
    id: 2,
    title: "Billing",
    headline: "Faster Billing, Zero Chaos",
    description: "Generate bills, split checks, and collect payments. The AI POS engine handles multi-way checkouts and reconciles cashier shift reports in one click.",
    icon: Receipt,
    gradient: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)",
    accentColor: "var(--accent-blue)",
    badge: "AI Smart Splits",
    ctaText: "Explore POS registers"
  },
  {
    id: 3,
    title: "CRM",
    headline: "Turn Guests Into Regulars",
    description: "Build deep customer profiles automatically. The CRM engine tracks individual diner preferences and triggers personalized email/SMS campaigns.",
    icon: Users,
    gradient: "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)",
    accentColor: "var(--accent-purple)",
    badge: "AI Autopilot Marketing",
    ctaText: "View CRM funnels"
  },
  {
    id: 4,
    title: "Inventory",
    headline: "Inventory Intelligence & Predictions",
    description: "Stop wasting ingredients. OrderJi tracks raw items down to grams, predicts run-out times, and automatically triggers supplier purchases.",
    icon: Package,
    gradient: "linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)",
    accentColor: "var(--accent-rose)",
    badge: "AI Stock Forecasting",
    ctaText: "Manage Inventory"
  },
  {
    id: 5,
    title: "Analytics",
    headline: "Know Your Business Instantly",
    description: "Forget tedious spreadsheets. Access actionable executive AI insights. Spot stock wastage trends and forecast your next weekend's sales curve.",
    icon: TrendingUp,
    gradient: "linear-gradient(135deg, #fefce8 0%, #fef9c3 100%)",
    accentColor: "var(--accent-amber)",
    badge: "AI Predictive Analytics",
    ctaText: "Open analytics suite"
  }
];

export default function ModulesShowcase() {
  const [activePanel, setActivePanel] = useState<number | null>(null);
  
  // Real-time ticking indicators
  const [liveOrdersCount, setLiveOrdersCount] = useState<number>(241);
  const [revenueCount, setRevenueCount] = useState<number>(184250);
  const [ordersList, setOrdersList] = useState([
    { id: 243, table: "T-04", items: "1x Truffle Burger, 1x IPA", time: "Just now", status: "new" },
    { id: 242, table: "T-12", items: "2x Spicy Ramen, 1x Gyoza", time: "2m ago", status: "preparing" },
    { id: 241, table: "T-09", items: "1x Margherita Pizza", time: "5m ago", status: "ready" }
  ]);

  const [kdsOrders, setKdsOrders] = useState([
    { id: 243, table: "T-04", items: "1x Truffle Burger", timer: 75, status: "Preparing" },
    { id: 242, table: "T-12", items: "2x Spicy Ramen", timer: 280, status: "Preparing" },
    { id: 241, table: "T-09", items: "1x Margherita Pizza", timer: 490, status: "Delayed" }
  ]);

  // Billing interactive simulation state
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<"UPI" | "Card" | "Cash">("UPI");
  const [billingState, setBillingState] = useState<"pending" | "processing" | "success">("pending");

  // CRM funnel state
  const [crmGuests, setCrmGuests] = useState([
    { name: "Aarav S.", level: "VIP Customer", stage: 3, avatar: "AS" },
    { name: "Neha K.", level: "Repeat Customer", stage: 2, avatar: "NK" },
    { name: "Rohit D.", level: "First Customer", stage: 1, avatar: "RD" },
    { name: "Kabir M.", level: "Walk-In Diner", stage: 0, avatar: "KM" }
  ]);

  // Intervals for updates
  useEffect(() => {
    const timer = setInterval(() => {
      // Step 1: Orders flow
      setLiveOrdersCount(prev => prev + 1);
      setOrdersList(prev => {
        const nextId = prev[0].id + 1;
        const tables = ["T-01", "T-05", "T-08", "T-14", "T-03", "T-10"];
        const itemsList = [
          "1x Grilled Salmon, 1x Salad",
          "2x Cold Brew, 1x Croissant",
          "1x Pepperoni Pizza, 2x Soda",
          "1x Crispy Salmon, 1x Mocktail",
          "2x Truffle Fries, 1x Stout"
        ];
        const nextTable = tables[Math.floor(Math.random() * tables.length)];
        const nextItems = itemsList[Math.floor(Math.random() * itemsList.length)];
        return [
          { id: nextId, table: nextTable, items: nextItems, time: "Just now", status: "new" },
          ...prev.slice(0, 2).map(o => ({
            ...o,
            time: o.time === "Just now" ? "1m ago" : o.time === "1m ago" ? "3m ago" : "5m ago"
          }))
        ];
      });

      // Step 2: KDS timer ticking & status moving
      setKdsOrders(prev => {
        return prev.map((order, idx) => {
          const nextTimer = order.timer + 5;
          let nextStatus = order.status;
          if (idx === 0 && nextTimer > 150) {
            nextStatus = "Ready";
          }
          if (idx === 2 && nextStatus !== "Ready") {
            nextStatus = "Delayed";
          }
          return { ...order, timer: nextTimer, status: nextStatus };
        });
      });

      // Step 3: Revenue increments slowly
      setRevenueCount(prev => prev + Math.floor(Math.random() * 250) + 50);

      // Step 4: CRM cycle upward
      setCrmGuests(prev => {
        return prev.map(guest => {
          const nextStage = (guest.stage + 1) % 4;
          const levels = ["Walk-In Diner", "First Customer", "Repeat Customer", "VIP Customer"];
          return {
            ...guest,
            stage: nextStage,
            level: levels[nextStage]
          };
        });
      });
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  // Tick the KDS timers every second for ultra fluid realism
  useEffect(() => {
    const clock = setInterval(() => {
      setKdsOrders(prev => prev.map(o => ({ ...o, timer: o.timer + 1 })));
    }, 1000);
    return () => clearInterval(clock);
  }, []);

  // Simple trigger for billing processing
  useEffect(() => {
    if (billingState === "processing") {
      const duration = setTimeout(() => {
        setBillingState("success");
      }, 1500);
      return () => clearTimeout(duration);
    }
    if (billingState === "success") {
      const duration = setTimeout(() => {
        setBillingState("pending");
      }, 4000);
      return () => clearTimeout(duration);
    }
  }, [billingState]);

  // Format visual helpers
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <section className="showcase-section" id="modules-showcase">
      {/* Background ambient glows - soft light mode */}
      <div className="showcase-glow glow-amber" />
      <div className="showcase-glow glow-blue" />

      <div className="container">
        <div className="showcase-header">

          <h2>One Single OS. Six Modules.</h2>
          <p>
            Replaced disconnected legacy software with a unified, AI-optimized restaurant engine. Visually explore the modules to see the OS interact.
          </p>
        </div>

        {/* Desktop Layout - Horizontal Accordion */}
        <div className="accordion-desktop">
          {PANELS.map((panel) => {
            const Icon = panel.icon;
            const isActive = activePanel === panel.id;
            return (
              <motion.div
                key={panel.id}
                layout
                initial={false}
                animate={{
                  flex: isActive ? 4.2 : 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 90,
                  damping: 17,
                  duration: 0.7
                }}
                onClick={() => setActivePanel(activePanel === panel.id ? null : panel.id)}
                className={`desktop-panel ${isActive ? "active" : "collapsed"}`}
                style={{ background: panel.gradient }}
              >
                {/* Visual Glass Highlights */}
                <div className="panel-highlight" />

                {/* Collapsed Panel Content (Vertical Layout) */}
                <AnimatePresence>
                  {!isActive && (
                    <motion.div
                      className="collapsed-content"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { delay: 0.2 } }}
                      exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    >
                      <div className="collapsed-icon-wrap" style={{ color: panel.accentColor, borderColor: `${panel.accentColor}2a` }}>
                        <Icon size={22} />
                      </div>
                      <h3 className="collapsed-title">{panel.title}</h3>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Expanded Panel Content */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="expanded-content"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={{
                        visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
                        hidden: {}
                      }}
                    >
                      {/* Left Info Panel */}
                      <div className="expanded-info">
                        <motion.div 
                          className="expanded-badge" 
                          style={{ color: panel.accentColor, background: `${panel.accentColor}0e`, borderColor: `${panel.accentColor}24` }}
                          variants={{
                            hidden: { opacity: 0, y: 15 },
                            visible: { opacity: 1, y: 0 }
                          }}
                        >
                          <Sparkles size={11} style={{ marginRight: "4px" }} />
                          {panel.badge}
                        </motion.div>

                        <motion.h3 
                          className="expanded-headline"
                          variants={{
                            hidden: { opacity: 0, y: 25 },
                            visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
                          }}
                        >
                          {panel.headline}
                        </motion.h3>

                        <motion.p 
                          className="expanded-desc"
                          variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1 }
                          }}
                        >
                          {panel.description}
                        </motion.p>

                        <motion.button 
                          className="expanded-cta-btn"
                          style={{ "--hover-accent": panel.accentColor } as React.CSSProperties}
                          variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1 }
                          }}
                        >
                          <span>{panel.ctaText}</span>
                          <ChevronRight size={14} />
                        </motion.button>
                      </div>

                      {/* Right Visual Workstation (Light Translucent Glass) */}
                      <motion.div 
                        className="expanded-visual-container"
                        variants={{
                          hidden: { opacity: 0, scale: 0.94 },
                          visible: { opacity: 1, scale: 1, transition: { ease: "easeOut", duration: 0.4 } }
                        }}
                      >
                        {renderActiveVisual(panel.id, {
                          liveOrdersCount,
                          ordersList,
                          kdsOrders,
                          selectedPaymentMethod,
                          setSelectedPaymentMethod,
                          billingState,
                          setBillingState,
                          revenueCount,
                          crmGuests,
                          formatTimer
                        })}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Tablet Layout - 2-Column Accordion Grid */}
        <div className="accordion-tablet">
          {PANELS.map((panel) => {
            const Icon = panel.icon;
            const isActive = activePanel === panel.id;
            return (
              <motion.div
                key={panel.id}
                layout
                onClick={() => setActivePanel(activePanel === panel.id ? null : panel.id)}
                className={`tablet-panel ${isActive ? "col-span-2 active" : "col-span-1 collapsed"}`}
                style={{ 
                  background: panel.gradient,
                  gridColumn: isActive ? "span 2" : "span 1"
                }}
                transition={{
                  type: "spring",
                  stiffness: 85,
                  damping: 17
                }}
              >
                {/* Visual Glass Highlights */}
                <div className="panel-highlight" />

                {/* Collapsed Panel Content */}
                {!isActive && (
                  <div className="collapsed-tablet-view">
                    <div className="collapsed-icon-wrap" style={{ color: panel.accentColor, borderColor: `${panel.accentColor}2a` }}>
                      <Icon size={20} />
                    </div>
                    <div className="collapsed-info-block">
                      <h4>{panel.title}</h4>
                    </div>
                    <ChevronRight size={16} className="collapsed-arrow-sub" />
                  </div>
                )}

                {/* Expanded Panel Content */}
                {isActive && (
                  <div className="expanded-content">
                    <div className="expanded-info">
                      <div 
                        className="expanded-badge" 
                        style={{ color: panel.accentColor, background: `${panel.accentColor}0e`, borderColor: `${panel.accentColor}24` }}
                      >
                        <Sparkles size={11} style={{ marginRight: "4px" }} />
                        {panel.badge}
                      </div>
                      <h3 className="expanded-headline">{panel.headline}</h3>
                      <p className="expanded-desc">{panel.description}</p>
                      <button className="expanded-cta-btn" style={{ "--hover-accent": panel.accentColor } as React.CSSProperties}>
                        <span>{panel.ctaText}</span>
                        <ChevronRight size={14} />
                      </button>
                    </div>

                    <div className="expanded-visual-container">
                      {renderActiveVisual(panel.id, {
                        liveOrdersCount,
                        ordersList,
                        kdsOrders,
                        selectedPaymentMethod,
                        setSelectedPaymentMethod,
                        billingState,
                        setBillingState,
                        revenueCount,
                        crmGuests,
                        formatTimer
                      })}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Layout - Vertical Stack Accordion */}
        <div className="accordion-mobile">
          {PANELS.map((panel) => {
            const Icon = panel.icon;
            const isActive = activePanel === panel.id;
            return (
              <motion.div
                key={panel.id}
                layout
                onClick={() => setActivePanel(activePanel === panel.id ? null : panel.id)}
                className={`mobile-panel ${isActive ? "active" : "collapsed"}`}
                style={{ background: panel.gradient }}
                animate={{
                  height: isActive ? 600 : 80
                }}
                transition={{
                  type: "spring",
                  stiffness: 90,
                  damping: 17
                }}
              >
                {/* Visual Glass Highlights */}
                <div className="panel-highlight" />

                {/* Collapsed view */}
                {!isActive && (
                  <div className="collapsed-mobile-view">
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <div className="collapsed-icon-wrap" style={{ color: panel.accentColor, borderColor: `${panel.accentColor}2a` }}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <h4>{panel.title}</h4>
                      </div>
                    </div>
                    <ChevronRight size={14} className="collapsed-arrow-sub" />
                  </div>
                )}

                {/* Expanded view */}
                {isActive && (
                  <div className="expanded-content">
                    <div className="expanded-info">
                      <div 
                        className="expanded-badge" 
                        style={{ color: panel.accentColor, background: `${panel.accentColor}0e`, borderColor: `${panel.accentColor}24` }}
                      >
                        <Sparkles size={11} style={{ marginRight: "4px" }} />
                        {panel.badge}
                      </div>
                      <h3 className="expanded-headline">{panel.headline}</h3>
                      <p className="expanded-desc">{panel.description}</p>
                    </div>

                    <div className="expanded-visual-container">
                      {renderActiveVisual(panel.id, {
                        liveOrdersCount,
                        ordersList,
                        kdsOrders,
                        selectedPaymentMethod,
                        setSelectedPaymentMethod,
                        billingState,
                        setBillingState,
                        revenueCount,
                        crmGuests,
                        formatTimer
                      })}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        .showcase-section {
          padding: 8rem 0;
          background-color: var(--bg-primary);
          background-image: radial-gradient(rgba(227, 6, 19, 0.035) 1px, transparent 1px);
          background-size: 20px 20px;
          position: relative;
          overflow: hidden;
          color: var(--text-primary);
        }

        .showcase-glow {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          filter: blur(140px);
          opacity: 0.12;
          z-index: 1;
          pointer-events: none;
        }

        .showcase-glow.glow-amber {
          top: -10%;
          left: 70%;
          background: var(--accent-amber);
        }

        .showcase-glow.glow-blue {
          bottom: -10%;
          left: -10%;
          background: var(--accent-blue);
        }

        .showcase-header {
          text-align: center;
          margin-bottom: 4rem;
          z-index: 5;
          position: relative;
        }

        .showcase-header .badge {
          background: rgba(227, 6, 19, 0.08);
          border: 1px solid rgba(227, 6, 19, 0.2);
          color: var(--accent-orange);
          padding: 0.35rem 0.85rem;
          font-size: 0.75rem;
          font-weight: 700;
          border-radius: 9999px;
          display: inline-flex;
          align-items: center;
          margin-bottom: 1rem;
        }

        .showcase-header h2 {
          font-size: 2.8rem;
          font-weight: 800;
          letter-spacing: -2px;
          line-height: 1.1;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, var(--text-primary) 30%, var(--text-secondary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .showcase-header p {
          color: var(--text-secondary);
          font-size: 1.15rem;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Desktop Layout Styles */
        .accordion-desktop {
          display: none;
          gap: 1rem;
          height: 620px;
          width: 100%;
          z-index: 5;
          position: relative;
        }

        @media (min-width: 1024px) {
          .accordion-desktop {
            display: flex;
          }
        }

        .desktop-panel {
          height: 100%;
          border-radius: 20px;
          border: 1px solid rgba(0, 0, 0, 0.05);
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.03);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .desktop-panel:hover {
          border-color: rgba(0, 0, 0, 0.12);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.06);
        }

        .desktop-panel.active {
          cursor: default;
          border-color: rgba(0, 0, 0, 0.08);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.06);
        }

        .panel-highlight {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at top left, rgba(255, 255, 255, 0.6) 0%, transparent 60%);
          pointer-events: none;
          z-index: 2;
        }

        /* Collapsed Column contents */
        .collapsed-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          height: 85%;
          width: 100%;
          z-index: 3;
          user-select: none;
        }

        .collapsed-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid transparent;
          background: rgba(255, 255, 255, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
        }

        .collapsed-title {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          font-size: 1.35rem;
          font-weight: 800;
          letter-spacing: 1px;
          color: var(--text-secondary);
          text-transform: uppercase;
        }

        .desktop-panel:hover .collapsed-title {
          color: var(--text-primary);
        }

        .collapsed-number {
          font-family: monospace;
          font-size: 0.85rem;
          font-weight: 700;
          color: rgba(0, 0, 0, 0.15);
        }

        /* Expanded Contents */
        .expanded-content {
          width: 100%;
          height: 100%;
          display: flex;
          padding: 3rem;
          gap: 3rem;
          align-items: center;
          z-index: 3;
        }

        .expanded-info {
          flex: 0 0 42%;
          max-width: 42%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          color: var(--text-primary);
        }

        .expanded-badge {
          border-radius: 6px;
          border: 1px solid transparent;
          padding: 0.25rem 0.6rem;
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
          display: inline-flex;
          align-items: center;
        }

        .expanded-headline {
          font-size: 2.1rem;
          font-weight: 900;
          letter-spacing: -1.25px;
          line-height: 1.15;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, var(--text-primary) 70%, var(--text-secondary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .expanded-desc {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .expanded-cta-btn {
          background: rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(0, 0, 0, 0.08);
          color: var(--text-primary);
          border-radius: 8px;
          padding: 0.65rem 1.25rem;
          font-size: 0.85rem;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .expanded-cta-btn:hover {
          background: var(--hover-accent);
          border-color: var(--hover-accent);
          color: #ffffff;
          box-shadow: 0 10px 20px -5px var(--hover-accent);
          transform: translateY(-2px);
        }

        .expanded-visual-container {
          flex: 1;
          height: 100%;
          border-radius: 16px;
          border: 1px solid rgba(0,0,0,0.07);
          background: rgba(255,255,255,0.55);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          overflow: hidden;
          display: flex;
          align-items: stretch;
          justify-content: stretch;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.8), 0 8px 32px rgba(0,0,0,0.06);
          padding: 1.25rem;
          position: relative;
          color: var(--text-primary);
          min-width: 0;
        }

        /* Tablet Layout Styles */
        .accordion-tablet {
          display: none;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
          width: 100%;
        }

        @media (min-width: 640px) and (max-width: 1023px) {
          .accordion-tablet {
            display: grid;
          }
        }

        .tablet-panel {
          border-radius: 16px;
          border: 1px solid rgba(0, 0, 0, 0.05);
          overflow: hidden;
          cursor: pointer;
          position: relative;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.02);
        }

        .tablet-panel.collapsed {
          height: 100px;
          display: flex;
          align-items: center;
        }

        .collapsed-tablet-view {
          display: flex;
          align-items: center;
          width: 100%;
          padding: 1.5rem;
          justify-content: space-between;
        }

        .collapsed-info-block {
          flex-grow: 1;
          margin-left: 1rem;
        }

        .collapsed-info-block h4 {
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .collapsed-num-sub {
          font-size: 0.65rem;
          font-family: monospace;
          color: var(--text-muted);
          display: block;
        }

        .collapsed-arrow-sub {
          color: var(--text-muted);
        }

        .tablet-panel.active {
          height: 580px;
          cursor: default;
        }

        .tablet-panel.active .expanded-content {
          padding: 2rem;
          gap: 2rem;
          flex-direction: column;
        }

        .tablet-panel.active .expanded-info {
          flex: none;
          max-width: 100%;
          width: 100%;
        }

        .tablet-panel.active .expanded-headline {
          font-size: 1.8rem;
        }

        .tablet-panel.active .expanded-desc {
          margin-bottom: 1rem;
        }

        .tablet-panel.active .expanded-visual-container {
          width: 100%;
          height: 280px;
        }

        /* Mobile Layout Styles */
        .accordion-mobile {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          width: 100%;
        }

        @media (min-width: 640px) {
          .accordion-mobile {
            display: none;
          }
        }

        .mobile-panel {
          border-radius: 12px;
          border: 1px solid rgba(0, 0, 0, 0.05);
          overflow: hidden;
          cursor: pointer;
          position: relative;
          width: 100%;
        }

        .collapsed-mobile-view {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem;
          height: 100%;
        }

        .collapsed-mobile-view h4 {
          font-size: 0.95rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .mobile-panel.active {
          cursor: default;
        }

        .mobile-panel.active .expanded-content {
          padding: 1.5rem;
          gap: 1.5rem;
          flex-direction: column;
        }

        .mobile-panel.active .expanded-info {
          flex: none;
          max-width: 100%;
          width: 100%;
        }

        .mobile-panel.active .expanded-headline {
          font-size: 1.5rem;
        }

        .mobile-panel.active .expanded-desc {
          font-size: 0.85rem;
          margin-bottom: 1rem;
        }

        .mobile-panel.active .expanded-visual-container {
          height: 280px;
          padding: 1rem;
        }

        /* Live Visual Sub-Components Styling */
        
        /* Step 1: Orders Stream */
        .orders-stream-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .stream-headline {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        .stream-headline h4 {
          font-size: 0.85rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          color: var(--text-primary);
        }

        .live-pulse-dot {
          width: 6px;
          height: 6px;
          background: var(--accent-green);
          border-radius: 50%;
          box-shadow: 0 0 8px var(--accent-green);
          animation: pulseGlow 1.5s infinite;
        }

        @keyframes pulseGlow {
          0%, 100% { opacity: 0.4; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.1); }
        }

        .stream-counter-text {
          font-size: 0.7rem;
          color: var(--text-secondary);
          font-weight: 700;
        }

        .orders-list-scroll {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          overflow: hidden;
          position: relative;
        }

        .order-card-row {
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(0, 0, 0, 0.04);
          border-radius: 8px;
          padding: 0.7rem 0.9rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.01);
        }

        .order-card-row.row-new {
          border-color: rgba(227, 6, 19, 0.25);
          background: rgba(227, 6, 19, 0.05);
        }

        .order-row-table-bold {
          font-size: 0.8rem;
          font-weight: 800;
          color: var(--text-primary);
          white-space: nowrap;
        }

        .order-row-items {
          font-size: 0.75rem;
          color: var(--text-secondary);
          margin-left: 0.75rem;
          flex-grow: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .order-row-status-wrap {
          text-align: right;
        }

        .order-row-badge {
          font-size: 0.55rem;
          font-weight: 800;
          text-transform: uppercase;
          padding: 0.15rem 0.35rem;
          border-radius: 4px;
        }

        .order-row-badge.new {
          background: rgba(227, 6, 19, 0.12);
          color: var(--accent-orange);
        }

        .order-row-badge.preparing {
          background: rgba(217, 119, 6, 0.12);
          color: var(--accent-amber);
        }

        .order-row-badge.ready {
          background: rgba(5, 150, 105, 0.12);
          color: var(--accent-green);
        }

        .order-row-time {
          font-size: 0.55rem;
          color: var(--text-muted);
          display: block;
          margin-top: 0.1rem;
        }

        /* Step 2: Kitchen KDS Board */
        .kds-board-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .kds-board-columns {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
          flex-grow: 1;
        }

        .kds-board-column {
          background: rgba(255, 255, 255, 0.4);
          border: 1px solid rgba(0, 0, 0, 0.04);
          border-radius: 10px;
          padding: 0.6rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .kds-column-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(0, 0, 0, 0.04);
          padding-bottom: 0.4rem;
        }

        .kds-column-header h5 {
          font-size: 0.65rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-secondary);
        }

        .kds-column-header .kds-count {
          font-size: 0.65rem;
          font-weight: 700;
          background: rgba(0, 0, 0, 0.04);
          padding: 0.05rem 0.25rem;
          border-radius: 4px;
          color: var(--text-secondary);
        }

        .kds-ticket-card {
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(0, 0, 0, 0.04);
          border-radius: 8px;
          padding: 0.6rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          border-left: 3px solid transparent;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.01);
        }

        .kds-ticket-card.preparing { border-left-color: var(--accent-orange); }
        .kds-ticket-card.ready { border-left-color: var(--accent-green); }
        .kds-ticket-card.delayed { border-left-color: var(--accent-rose); }

        .kds-ticket-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.7rem;
          font-weight: 800;
        }

        .kds-ticket-top span {
          font-family: monospace;
          color: var(--text-muted);
        }

        .kds-ticket-items {
          font-size: 0.7rem;
          font-weight: 600;
          line-height: 1.25;
          color: var(--text-primary);
        }

        .kds-ticket-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.6rem;
          border-top: 1px solid rgba(0, 0, 0, 0.03);
          padding-top: 0.35rem;
          margin-top: 0.15rem;
        }

        .kds-ticket-timer {
          font-family: monospace;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.2rem;
        }

        .kds-ticket-timer.preparing { color: var(--accent-orange); }
        .kds-ticket-timer.ready { color: var(--accent-green); }
        .kds-ticket-timer.delayed { color: var(--accent-rose); animation: pulseText 1.5s infinite; }

        @keyframes pulseText {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .kds-activity-bar {
          height: 2px;
          width: 24px;
          background: rgba(0, 0, 0, 0.05);
          border-radius: 99px;
          overflow: hidden;
          position: relative;
        }

        .kds-activity-fill {
          height: 100%;
          width: 50%;
          background: currentColor;
          position: absolute;
          animation: slideLoader 1.5s infinite linear;
        }

        @keyframes slideLoader {
          from { left: -50%; }
          to { left: 100%; }
        }

        /* Step 3: Billing Invoice Receipt Layout */
        .billing-invoice-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          gap: 1rem;
        }

        .invoice-card {
          flex: 1;
          background: #ffffff;
          border-radius: 12px;
          padding: 1rem 1.25rem;
          color: #1e1b18;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(0, 0, 0, 0.04);
        }

        .invoice-header-block {
          text-align: center;
          border-bottom: 1px dashed rgba(0, 0, 0, 0.1);
          padding-bottom: 0.6rem;
          margin-bottom: 0.6rem;
        }

        .invoice-header-block h5 {
          font-size: 0.9rem;
          font-weight: 900;
          color: #ff5a1f;
          text-transform: uppercase;
          letter-spacing: 1.5px;
        }

        .invoice-header-block span {
          font-size: 0.55rem;
          font-family: monospace;
          color: #8c7d6e;
        }

        .invoice-items-block {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          flex-grow: 1;
        }

        .invoice-item-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.65rem;
          font-weight: 700;
          color: #5a5046;
        }

        .invoice-item-row.bold-row {
          font-size: 0.75rem;
          font-weight: 900;
          color: #1e1b18;
          border-top: 1px dashed rgba(0, 0, 0, 0.1);
          padding-top: 0.4rem;
          margin-top: 0.2rem;
        }

        .invoice-success-overlay {
          position: absolute;
          inset: 0;
          background: #059669;
          color: #ffffff;
          z-index: 5;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          animation: scalePopIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes scalePopIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .invoice-success-overlay h6 {
          font-size: 0.95rem;
          font-weight: 800;
          letter-spacing: 0.5px;
        }

        .invoice-success-overlay p {
          font-size: 0.65rem;
          opacity: 0.8;
          font-family: monospace;
        }

        .invoice-success-check {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #ffffff;
        }

        .billing-controls-card {
          flex: 0 0 45%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 0.75rem;
        }

        .revenue-metric-tile {
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(0, 0, 0, 0.04);
          border-radius: 8px;
          padding: 0.75rem;
          box-shadow: 0 2px 6px rgba(0,0,0,0.01);
        }

        .revenue-metric-tile span {
          font-size: 0.6rem;
          color: var(--text-secondary);
          font-weight: 700;
          text-transform: uppercase;
        }

        .revenue-metric-tile h4 {
          font-size: 1.2rem;
          font-weight: 800;
          font-family: monospace;
          margin-top: 0.15rem;
          color: var(--text-primary);
        }

        .payment-methods-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.4rem;
        }

        .payment-method-btn {
          width: 100%;
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(0, 0, 0, 0.04);
          color: var(--text-secondary);
          padding: 0.5rem 0.25rem;
          border-radius: 6px;
          font-size: 0.65rem;
          font-weight: 800;
          text-align: center;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .payment-method-btn.selected-btn {
          background: rgba(2, 132, 199, 0.08);
          border-color: var(--accent-blue);
          color: var(--accent-blue);
        }

        .payment-trigger-btn {
          width: 100%;
          background: var(--accent-blue);
          border: none;
          color: #ffffff;
          padding: 0.6rem;
          border-radius: 6px;
          font-size: 0.7rem;
          font-weight: 800;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          transition: all 0.2s ease;
        }

        .payment-trigger-btn:hover {
          background: #0369a1;
          box-shadow: 0 8px 16px rgba(2, 132, 199, 0.2);
        }

        /* Step 4: CRM Funnel */
        .crm-funnel-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .funnel-lanes {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          flex-grow: 1;
        }

        .funnel-lane {
          background: rgba(255, 255, 255, 0.4);
          border: 1px solid rgba(0, 0, 0, 0.04);
          border-radius: 8px;
          height: 46px;
          display: flex;
          align-items: center;
          padding: 0 1rem;
          position: relative;
          justify-content: space-between;
        }

        .funnel-lane-label {
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: var(--text-secondary);
          width: 110px;
        }

        .funnel-lane.lane-vip { border-left: 3px solid var(--accent-purple); background: rgba(124, 58, 237, 0.04); }
        .funnel-lane.lane-vip .funnel-lane-label { color: var(--accent-purple); }

        .funnel-lane.lane-repeat { border-left: 3px solid var(--accent-blue); background: rgba(2, 132, 199, 0.04); }
        .funnel-lane.lane-repeat .funnel-lane-label { color: var(--accent-blue); }

        .funnel-lane.lane-first { border-left: 3px solid var(--accent-green); background: rgba(5, 150, 105, 0.04); }
        .funnel-lane.lane-first .funnel-lane-label { color: var(--accent-green); }

        .funnel-lane.lane-walkin { border-left: 3px solid var(--text-muted); }

        .funnel-avatars-track {
          flex-grow: 1;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          justify-content: flex-end;
          height: 100%;
        }

        .funnel-avatar-pill {
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(0, 0, 0, 0.04);
          border-radius: 99px;
          padding: 0.2rem 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
        }

        .avatar-circle-mini {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--accent-purple);
          color: #ffffff;
          font-size: 0.5rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .avatar-name-mini {
          font-size: 0.6rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        /* Step 5: Analytics Graphs */
        .analytics-visual-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .analytics-metrics-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
        }

        .analytics-mini-tile {
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(0, 0, 0, 0.04);
          border-radius: 8px;
          padding: 0.5rem 0.75rem;
          box-shadow: 0 2px 6px rgba(0,0,0,0.01);
        }

        .analytics-mini-tile span {
          font-size: 0.55rem;
          color: var(--text-muted);
          font-weight: 700;
          text-transform: uppercase;
          display: block;
        }

        .analytics-mini-tile h5 {
          font-size: 0.95rem;
          font-weight: 800;
          font-family: monospace;
          margin-top: 0.1rem;
          color: var(--text-primary);
        }

        .analytics-chart-container {
          flex-grow: 1;
          position: relative;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 10px;
          border: 1px solid rgba(0, 0, 0, 0.03);
          overflow: hidden;
          padding-top: 1rem;
        }

        .chart-svg-wrap {
          width: 100%;
          height: 80%;
          position: relative;
        }

        .chart-grid-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 1px;
          background: rgba(0, 0, 0, 0.03);
        }

        .chart-grid-line:nth-child(1) { top: 25%; }
        .chart-grid-line:nth-child(2) { top: 50%; }
        .chart-grid-line:nth-child(3) { top: 75%; }

        /* AI Copilot Badge bar */
        .ai-copilot-indicator-bar {
          position: absolute;
          bottom: 0.5rem;
          left: 0.5rem;
          right: 0.5rem;
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(0, 0, 0, 0.04);
          border-radius: 6px;
          padding: 0.35rem 0.6rem;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.6rem;
          font-weight: 800;
          color: var(--text-secondary);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.02);
        }

        .ai-copilot-text {
          font-family: var(--font-sans);
          letter-spacing: -0.1px;
        }

        /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

        /* =================================================================
           VISUAL CARD STYLES (sv-*)
        ================================================================= */
        .sv-card {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          overflow: hidden;
        }
        .sv-mb-md { margin-bottom: 0.1rem; }
        .sv-mt-sm { margin-top: 0.1rem; }

        .sv-label-dot {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.68rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: 0.8px;
          text-transform: uppercase;
          flex-shrink: 0;
        }
        .sv-pulse {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          display: inline-block;
          flex-shrink: 0;
          animation: svPulse 2s ease-in-out infinite;
        }
        @keyframes svPulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.5; }
        }
        .sv-row-between { display: flex; align-items: center; justify-content: space-between; }
        .sv-big-num {
          font-size: 2rem;
          font-weight: 900;
          letter-spacing: -2px;
          line-height: 1;
        }

        /* Orders */
        .sv-list {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          flex: 1;
          min-height: 0;
          overflow: hidden;
        }
        .sv-order-row {
          display: grid;
          grid-template-columns: 2.8rem 1fr auto;
          align-items: center;
          gap: 0.6rem;
          background: rgba(255,255,255,0.88);
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 10px;
          padding: 0.6rem 0.875rem;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        }
        .sv-order-table {
          font-size: 0.78rem;
          font-weight: 800;
          color: var(--text-primary);
          white-space: nowrap;
        }
        .sv-order-items {
          font-size: 0.76rem;
          color: #5a5046;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 500;
        }
        .sv-badge {
          font-size: 0.68rem;
          font-weight: 800;
          padding: 0.2rem 0.55rem;
          border-radius: 9999px;
          white-space: nowrap;
        }
        .sv-badge-new       { background: rgba(220,38,38,0.1);   color: #b91c1c; }
        .sv-badge-preparing { background: rgba(180,83,9,0.1);    color: #92400e; }
        .sv-badge-ready     { background: rgba(5,150,105,0.1);   color: #065f46; }

        /* KDS */
        .sv-kds-rows {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex: 1;
          min-height: 0;
          overflow: hidden;
        }
        .sv-kds-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255,255,255,0.88);
          border: 1px solid rgba(0,0,0,0.08);
          border-left-width: 3px;
          border-radius: 10px;
          padding: 0.65rem 0.875rem;
          gap: 0.5rem;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        }
        .sv-kds-info { display: flex; flex-direction: column; gap: 0.2rem; min-width: 0; }
        .sv-kds-table { font-size: 0.82rem; font-weight: 800; color: var(--text-primary); }
        .sv-kds-items {
          font-size: 0.74rem; color: #5a5046; font-weight: 500;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .sv-kds-right { display: flex; flex-direction: column; align-items: flex-end; gap: 0.2rem; flex-shrink: 0; }
        .sv-kds-timer { display: flex; align-items: center; gap: 0.3rem; font-size: 0.8rem; font-weight: 800; }
        .sv-kds-sla {
          font-size: 0.62rem; font-weight: 700; color: #991b1b;
          background: rgba(220,38,38,0.08); padding: 0.1rem 0.35rem; border-radius: 4px;
        }

        /* Billing */
        .sv-bill {
          background: rgba(255,255,255,0.92);
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        .sv-bill-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 0.6rem 1rem;
          font-size: 0.84rem; font-weight: 500; color: #5a5046;
          border-bottom: 1px solid rgba(0,0,0,0.06);
        }
        .sv-bill-total {
          display: flex; justify-content: space-between; align-items: center;
          padding: 0.7rem 1rem;
          font-size: 0.95rem; font-weight: 900; color: var(--text-primary);
        }
        .sv-pay-btn {
          width: 100%; display: flex; align-items: center; justify-content: center;
          gap: 0.5rem; padding: 0.75rem; border-radius: 10px; border: none;
          color: #fff; font-size: 0.88rem; font-weight: 700;
          cursor: pointer; font-family: var(--font-sans);
          transition: filter 0.18s, transform 0.18s;
          box-shadow: 0 4px 14px -4px rgba(2,132,199,0.45);
        }
        .sv-pay-btn:hover:not(:disabled) { filter: brightness(0.9); transform: translateY(-1px); }
        .sv-pay-btn:disabled { opacity: 0.65; cursor: not-allowed; }
        .sv-paid-badge {
          display: flex; align-items: center; justify-content: center;
          gap: 0.45rem; padding: 0.7rem; border-radius: 10px;
          background: rgba(5,150,105,0.1); border: 1px solid rgba(5,150,105,0.22);
          color: #065f46; font-size: 0.88rem; font-weight: 700;
        }
        .sv-stat-row { display: flex; gap: 0.75rem; }
        .sv-stat { display: flex; flex-direction: column; gap: 0.1rem; }
        .sv-stat span  { font-size: 0.7rem; color: #8c7d6e; font-weight: 600; }
        .sv-stat strong { font-size: 1.1rem; font-weight: 900; letter-spacing: -0.5px; }

        /* CRM */
        .sv-crm-list { display: flex; flex-direction: column; gap: 0.5rem; flex: 1; min-height: 0; overflow: hidden; }
        .sv-crm-row {
          display: flex; align-items: center; gap: 0.7rem;
          background: rgba(255,255,255,0.88);
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 10px; padding: 0.6rem 0.875rem;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        }
        .sv-avatar {
          width: 32px; height: 32px; border-radius: 50%;
          color: #fff; font-size: 0.6rem; font-weight: 900;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; letter-spacing: 0.3px;
        }
        .sv-crm-info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 0.3rem; }
        .sv-crm-name { font-size: 0.82rem; font-weight: 700; color: var(--text-primary); }
        .sv-crm-bar-wrap { height: 4px; background: rgba(0,0,0,0.09); border-radius: 2px; overflow: hidden; }
        .sv-crm-bar { height: 100%; border-radius: 2px; transition: width 0.6s ease; }
        .sv-crm-label { font-size: 0.68rem; font-weight: 800; white-space: nowrap; flex-shrink: 0; }

        /* Inventory */
        .sv-inv-list { display: flex; flex-direction: column; gap: 0.55rem; flex: 1; min-height: 0; overflow: hidden; }
        .sv-inv-row {
          background: rgba(255,255,255,0.88);
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 10px; padding: 0.65rem 0.875rem;
          display: flex; flex-direction: column; gap: 0.35rem;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        }
        .sv-inv-top { display: flex; justify-content: space-between; align-items: center; }
        .sv-inv-name { font-size: 0.82rem; font-weight: 700; color: var(--text-primary); }
        .sv-inv-pct  { font-size: 0.82rem; font-weight: 900; }
        .sv-inv-track { height: 5px; background: rgba(0,0,0,0.09); border-radius: 3px; overflow: hidden; }
        .sv-inv-fill  { height: 100%; border-radius: 3px; }
        .sv-inv-note  { font-size: 0.7rem; color: #5a5046; font-weight: 500; }

        /* Analytics */
        .sv-stats-grid {
          display: grid; grid-template-columns: repeat(3,1fr);
          gap: 0.5rem; flex-shrink: 0;
        }
        .sv-stat-tile {
          background: rgba(255,255,255,0.88);
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 10px; padding: 0.75rem 0.5rem;
          display: flex; flex-direction: column;
          gap: 0.25rem; align-items: center; text-align: center;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        }
        .sv-stat-label { font-size: 0.64rem; color: #8c7d6e; font-weight: 600; line-height: 1.3; }
        .sv-stat-val   { font-size: 1.15rem; font-weight: 900; letter-spacing: -0.5px; line-height: 1.1; }
        .sv-chart {
          flex: 1; min-height: 0;
          border-radius: 10px; overflow: hidden;
          background: rgba(255,255,255,0.7);
          border: 1px solid rgba(0,0,0,0.07);
          padding: 0.5rem;
        }

        /* Shared AI footer bar */
        .sv-ai-bar {
          flex-shrink: 0;
          background: rgba(255,255,255,0.94);
          border: 1px solid;
          border-radius: 8px;
          padding: 0.45rem 0.75rem;
          display: flex; align-items: center; gap: 0.4rem;
          font-size: 0.7rem; font-weight: 700; color: #5a5046;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        /* ── Image strip ── */
        .sv-img-strip {
          position: relative;
          width: 100%;
          height: 90px;
          border-radius: 10px;
          overflow: hidden;
          flex-shrink: 0;
        }
        .sv-strip-img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
          transition: transform 0.6s ease;
        }
        .sv-img-strip:hover .sv-strip-img { transform: scale(1.04); }
        .sv-strip-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 60%);
          display: flex; align-items: flex-end; padding: 0.55rem 0.75rem;
        }
        .sv-strip-tag {
          font-size: 0.68rem; font-weight: 800; color: #fff;
          letter-spacing: 0.3px; text-shadow: 0 1px 3px rgba(0,0,0,0.4);
        }

        /* ── Billing extras ── */
        .sv-bill-header {
          display: flex; flex-direction: column; align-items: center;
          padding: 0.65rem 1rem 0.5rem;
          border-bottom: 1px dashed rgba(0,0,0,0.1);
          background: rgba(2,132,199,0.04);
        }
        .sv-bill-title {
          font-size: 0.78rem; font-weight: 900; color: #0284c7;
          letter-spacing: 1px; text-transform: uppercase;
        }
        .sv-bill-sub {
          font-size: 0.62rem; color: #8c7d6e; font-family: monospace;
        }
        .sv-paid-overlay {
          position: absolute; inset: 0; z-index: 10;
          background: #059669;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 0.35rem;
          border-radius: inherit;
        }
        .sv-paid-overlay strong { font-size: 0.9rem; font-weight: 900; color: #fff; }
        .sv-paid-overlay span   { font-size: 0.65rem; color: rgba(255,255,255,0.75); font-family: monospace; }
        .sv-paid-overlay svg    { color: #fff; }

        .sv-pay-methods {
          display: grid; grid-template-columns: repeat(3,1fr);
          gap: 0.4rem; flex-shrink: 0;
        }
        .sv-pay-method-btn {
          padding: 0.5rem 0.25rem;
          border-radius: 8px; border: 1.5px solid rgba(0,0,0,0.1);
          background: rgba(255,255,255,0.85);
          font-size: 0.72rem; font-weight: 700; color: #5a5046;
          cursor: pointer; transition: all 0.18s;
          font-family: var(--font-sans);
        }
        .sv-pay-method-btn:hover  { border-color: rgba(2,132,199,0.4); color: #0284c7; }
        .sv-pay-method-btn.active {
          border-color: #0284c7; background: rgba(2,132,199,0.08);
          color: #0284c7; box-shadow: 0 0 0 2px rgba(2,132,199,0.12);
        }

        .sv-btn-spinner {
          width: 14px; height: 14px;
          border: 2px solid rgba(255,255,255,0.35);
          border-top-color: #fff; border-radius: 50%;
          animation: sv-spin 0.7s linear infinite; display: inline-block;
        }
        @keyframes sv-spin { to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}


// ─── Types ──────────────────────────────────────────────────────────────────
interface OrderItem { id: number; table: string; items: string; time: string; status: string; }
interface KdsOrder  { id: number; table: string; items: string; timer: number; status: string; }
interface CrmGuest  { name: string; level: string; stage: number; avatar: string; }
interface VisualState {
  liveOrdersCount: number;
  revenueCount: number;
  ordersList: OrderItem[];
  kdsOrders: KdsOrder[];
  crmGuests: CrmGuest[];
  formatTimer: (s: number) => string;
  selectedPaymentMethod: string;
  setSelectedPaymentMethod: (s: "UPI" | "Card" | "Cash") => void;
  billingState: string;
  setBillingState: (s: "pending" | "processing" | "success") => void;
}

// ─── Interactive Visual Panels ───────────────────────────────────────────────
function renderActiveVisual(panelId: number, state: VisualState) {
  switch (panelId) {

    // ── 0: Orders ──────────────────────────────────────────────────────────
    case 0:
      return (
        <div className="sv-card">
          {/* Header row */}
          <div className="sv-row-between" style={{ flexShrink: 0 }}>
            <div className="sv-label-dot">
              <span className="sv-pulse" style={{ background: "#e30613" }} />
              Live Orders Today
            </div>
            <motion.span
              key={state.liveOrdersCount}
              initial={{ scale: 1.3, color: "#e30613" }}
              animate={{ scale: 1, color: "#1e1b18" }}
              className="sv-big-num"
            >
              {state.liveOrdersCount}
            </motion.span>
          </div>

          {/* QR scan image strip */}
          <div className="sv-img-strip">
            <img
              src="https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&w=400&q=75"
              alt="Guest scanning QR code"
              className="sv-strip-img"
            />
            <div className="sv-strip-overlay">
              <span className="sv-strip-tag">Scan → Order → Pay</span>
            </div>
          </div>

          {/* Live order feed */}
          <div className="sv-list">
            <AnimatePresence initial={false}>
              {state.ordersList.map((order: OrderItem, idx: number) => (
                <motion.div
                  key={order.id}
                  layout
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: idx === 0 ? 1 : 0.7, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ type: "spring", stiffness: 200, damping: 22 }}
                  className="sv-order-row"
                  style={{ borderColor: idx === 0 ? "rgba(227,6,19,0.25)" : undefined }}
                >
                  <div className="sv-order-table">{order.table}</div>
                  <div className="sv-order-items">{order.items}</div>
                  <span className={`sv-badge sv-badge-${order.status}`}>{order.status}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="sv-ai-bar" style={{ borderColor: "rgba(227,6,19,0.18)" }}>
            <Sparkles size={10} style={{ color: "#e30613" }} />
            AI cross-sell active · {state.liveOrdersCount > 250 ? "14.1" : "12.4"}% upsell conversion
          </div>
        </div>
      );

    // ── 1: Kitchen KDS ─────────────────────────────────────────────────────
    case 1:
      return (
        <div className="sv-card">
          <div className="sv-row-between" style={{ flexShrink: 0 }}>
            <div className="sv-label-dot">
              <span className="sv-pulse" style={{ background: "#059669" }} />
              Kitchen Display
            </div>
            <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#5a5046" }}>
              {state.kdsOrders.filter(o => o.status === "Ready").length} ready ·{" "}
              {state.kdsOrders.filter(o => o.status === "Delayed").length} delayed
            </span>
          </div>

          {/* KDS photo */}
          <div className="sv-img-strip" style={{ height: "80px" }}>
            <img
              src="https://images.unsplash.com/photo-1556909172-54557c7e4fb7?auto=format&fit=crop&w=600&q=75"
              alt="Kitchen display screen"
              className="sv-strip-img"
              style={{ objectPosition: "center 60%" }}
            />
            <div className="sv-strip-overlay" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.5), transparent)" }}>
              <span className="sv-strip-tag">Ordrji KDS — Live</span>
            </div>
          </div>

          {/* Ticket rows */}
          <div className="sv-kds-rows">
            {state.kdsOrders.map((order: KdsOrder) => {
              const isDelayed = order.status === "Delayed";
              const isReady   = order.status === "Ready";
              const accent = isDelayed ? "#dc2626" : isReady ? "#059669" : "#d97706";
              const bg     = isDelayed ? "rgba(220,38,38,0.06)" : isReady ? "rgba(5,150,105,0.06)" : "rgba(217,119,6,0.05)";
              return (
                <motion.div
                  key={order.id}
                  layout
                  className="sv-kds-row"
                  style={{ borderLeftColor: accent, background: bg }}
                  animate={{ scale: isDelayed ? [1, 1.01, 1] : 1 }}
                  transition={{ duration: 1.5, repeat: isDelayed ? Infinity : 0 }}
                >
                  <div className="sv-kds-info">
                    <span className="sv-kds-table">{order.table}</span>
                    <span className="sv-kds-items">{order.items}</span>
                  </div>
                  <div className="sv-kds-right">
                    <span className="sv-kds-timer" style={{ color: accent }}>
                      {isReady ? <CheckCircle2 size={13} /> : <Clock size={12} />}
                      {isReady ? "Ready" : state.formatTimer(order.timer)}
                    </span>
                    {isDelayed && <span className="sv-kds-sla">Over SLA</span>}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="sv-ai-bar" style={{ borderColor: "rgba(5,150,105,0.2)" }}>
            <Sparkles size={10} style={{ color: "#059669" }} />
            AI SLA guard · auto-reassigning delayed tickets
          </div>
        </div>
      );

    // ── 2: Billing ─────────────────────────────────────────────────────────
    case 2:
      return (
        <div className="sv-card">
          <div className="sv-label-dot sv-mb-md" style={{ flexShrink: 0 }}>
            <span className="sv-pulse" style={{ background: "#0284c7" }} />
            POS Billing Terminal
          </div>

          {/* Invoice card */}
          <div className="sv-bill" style={{ position: "relative", overflow: "hidden" }}>
            <div className="sv-bill-header">
              <span className="sv-bill-title">Ordrji POS</span>
              <span className="sv-bill-sub">Table 12 · #INV-2026-928</span>
            </div>
            {[
              { item: "Crispy Salmon",    qty: "1×", price: "₹850" },
              { item: "Truffle Fries",    qty: "2×", price: "₹450" },
              { item: "Cold Brew Coffee", qty: "1×", price: "₹180" },
            ].map(r => (
              <div key={r.item} className="sv-bill-row">
                <span style={{ color: "#8c7d6e", marginRight: "0.3rem", fontWeight: 600 }}>{r.qty}</span>
                <span style={{ flex: 1 }}>{r.item}</span>
                <span>{r.price}</span>
              </div>
            ))}
            <div className="sv-bill-total">
              <span>Total</span>
              <span>₹1,480</span>
            </div>

            {/* Payment success overlay */}
            <AnimatePresence>
              {state.billingState === "success" && (
                <motion.div
                  className="sv-paid-overlay"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 220, delay: 0.05 }}
                  >
                    <CheckCircle2 size={36} strokeWidth={2} />
                  </motion.div>
                  <strong>Payment Confirmed</strong>
                  <span>Register reconciled automatically</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Payment method selector */}
          <div className="sv-pay-methods">
            {(["UPI", "Card", "Cash"] as const).map(m => (
              <button
                key={m}
                className={`sv-pay-method-btn${state.selectedPaymentMethod === m ? " active" : ""}`}
                onClick={() => state.setSelectedPaymentMethod(m)}
              >
                {m === "UPI" ? "📱 UPI" : m === "Card" ? "💳 Card" : "💵 Cash"}
              </button>
            ))}
          </div>

          {/* Tap to pay */}
          <button
            className="sv-pay-btn"
            onClick={() => { if (state.billingState === "pending") state.setBillingState("processing"); }}
            disabled={state.billingState !== "pending"}
            style={{ background: state.billingState === "success" ? "#059669" : "#0284c7" }}
          >
            {state.billingState === "pending"    && <><CreditCard size={14} /> Tap to Pay ₹1,480</>}
            {state.billingState === "processing" && <><span className="sv-btn-spinner" /> Processing…</>}
            {state.billingState === "success"    && <><CheckCircle2 size={14} /> Paid — Done!</>}
          </button>

          <div className="sv-stat-row" style={{ flexShrink: 0 }}>
            <div className="sv-stat">
              <span>Today&apos;s Revenue</span>
              <strong style={{ color: "#0284c7" }}>₹{state.revenueCount.toLocaleString("en-IN")}</strong>
            </div>
          </div>

          <div className="sv-ai-bar" style={{ borderColor: "rgba(2,132,199,0.2)" }}>
            <Sparkles size={10} style={{ color: "#0284c7" }} />
            AI Smart Split · 3-way split saves 40s vs manual
          </div>
        </div>
      );

    // ── 3: CRM ─────────────────────────────────────────────────────────────
    case 3:
      return (
        <div className="sv-card">
          <div className="sv-label-dot sv-mb-md" style={{ flexShrink: 0 }}>
            <span className="sv-pulse" style={{ background: "#7c3aed" }} />
            Guest Loyalty Engine
          </div>

          {/* Campaign image */}
          <div className="sv-img-strip" style={{ height: "72px" }}>
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=75"
              alt="Restaurant loyalty campaign"
              className="sv-strip-img"
              style={{ objectPosition: "center 40%" }}
            />
            <div className="sv-strip-overlay" style={{ background: "linear-gradient(to right, rgba(124,58,237,0.6), transparent)" }}>
              <span className="sv-strip-tag">AI Campaigns · Auto-pilot</span>
            </div>
          </div>

          {/* Guest pipeline rows */}
          <div className="sv-crm-list">
            {state.crmGuests.map((g: CrmGuest) => {
              const palettes = [
                { bg: "#8c7d6e", label: "Walk-In" },
                { bg: "#059669", label: "First Visit" },
                { bg: "#0284c7", label: "Repeat" },
                { bg: "#7c3aed", label: "VIP" },
              ];
              const p = palettes[g.stage];
              return (
                <motion.div
                  key={g.name}
                  layoutId={`sv-crm-${g.name}`}
                  className="sv-crm-row"
                  transition={{ type: "spring", stiffness: 100, damping: 18 }}
                >
                  <div className="sv-avatar" style={{ background: p.bg }}>{g.avatar}</div>
                  <div className="sv-crm-info">
                    <span className="sv-crm-name">{g.name}</span>
                    <div className="sv-crm-bar-wrap">
                      <motion.div
                        className="sv-crm-bar"
                        animate={{ width: `${(g.stage + 1) * 25}%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        style={{ background: p.bg }}
                      />
                    </div>
                  </div>
                  <span className="sv-crm-label" style={{ color: p.bg }}>{p.label}</span>
                </motion.div>
              );
            })}
          </div>

          <div className="sv-ai-bar" style={{ borderColor: "rgba(124,58,237,0.2)" }}>
            <Sparkles size={10} style={{ color: "#7c3aed" }} />
            AI autopilot · campaign triggered for 3 repeat guests
          </div>
        </div>
      );

    // ── 4: Inventory ───────────────────────────────────────────────────────
    case 4:
      return (
        <div className="sv-card">
          <div className="sv-label-dot sv-mb-md" style={{ flexShrink: 0 }}>
            <span className="sv-pulse" style={{ background: "#dc2626" }} />
            Live Stock Tracker
          </div>

          {/* Warehouse image */}
          <div className="sv-img-strip" style={{ height: "72px" }}>
            <img
              src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=600&q=75"
              alt="Kitchen ingredient stock"
              className="sv-strip-img"
            />
            <div className="sv-strip-overlay" style={{ background: "linear-gradient(to right, rgba(220,38,38,0.5), transparent)" }}>
              <span className="sv-strip-tag">Ingredient Intelligence</span>
            </div>
          </div>

          {/* Stock bars */}
          <div className="sv-inv-list">
            {[
              { name: "Paneer",        pct: 85, color: "#059669", note: "Sufficient · ~2 days left" },
              { name: "Mozzarella",    pct: 58, color: "#d97706", note: "Order in 3 days" },
              { name: "Sunflower Oil", pct: 18, color: "#dc2626", note: "Critical — auto-order sent ✓" },
            ].map((row, i) => (
              <motion.div
                key={row.name}
                className="sv-inv-row"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                style={{ borderLeftColor: row.color, borderLeftWidth: 3, borderLeftStyle: "solid" }}
              >
                <div className="sv-inv-top">
                  <span className="sv-inv-name">{row.name}</span>
                  <span className="sv-inv-pct" style={{ color: row.color }}>{row.pct}%</span>
                </div>
                <div className="sv-inv-track">
                  <motion.div
                    className="sv-inv-fill"
                    style={{ background: row.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${row.pct}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: i * 0.1 }}
                  />
                </div>
                <span className="sv-inv-note">{row.note}</span>
              </motion.div>
            ))}
          </div>

          <div className="sv-ai-bar" style={{ borderColor: "rgba(220,38,38,0.2)" }}>
            <Sparkles size={10} style={{ color: "#dc2626" }} />
            AI auto-purchase sent to supplier · saves 2 hrs
          </div>
        </div>
      );

    // ── 5: Analytics ───────────────────────────────────────────────────────
    case 5:
      return (
        <div className="sv-card">
          <div className="sv-label-dot sv-mb-md" style={{ flexShrink: 0 }}>
            <span className="sv-pulse" style={{ background: "#d97706" }} />
            Today&apos;s Performance
          </div>

          {/* Stat tiles */}
          <div className="sv-stats-grid">
            {[
              { label: "Repeat Rate",    value: "68.4%", color: "#d97706" },
              { label: "Avg Order",      value: "₹784",  color: "#e30613" },
              { label: "Table Turn",     value: "42 min",color: "#0284c7" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                className="sv-stat-tile"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <span className="sv-stat-label">{s.label}</span>
                <strong className="sv-stat-val" style={{ color: s.color }}>{s.value}</strong>
              </motion.div>
            ))}
          </div>

          {/* Revenue chart */}
          <div className="sv-chart">
            <div style={{ fontSize: "0.64rem", fontWeight: 700, color: "#8c7d6e", marginBottom: "0.35rem", paddingLeft: "0.25rem" }}>
              Revenue this week (₹)
            </div>
            <svg viewBox="0 0 280 72" preserveAspectRatio="none" style={{ width: "100%", height: "calc(100% - 1.4rem)", display: "block" }}>
              <defs>
                <linearGradient id="sv-g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#d97706" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Grid lines */}
              {[18, 36, 54].map(y => (
                <line key={y} x1="0" y1={y} x2="280" y2={y} stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
              ))}
              {/* Area */}
              <motion.path
                d="M0 58 C30 48,55 28,90 38 S150 12,200 22 S250 16,280 10 L280 72 L0 72Z"
                fill="url(#sv-g1)"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
              />
              {/* Line */}
              <motion.path
                d="M0 58 C30 48,55 28,90 38 S150 12,200 22 S250 16,280 10"
                fill="none" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.3, ease: "easeOut" }}
              />
              {/* Day labels */}
              {["M","T","W","T","F","S","S"].map((d, i) => (
                <text key={i} x={i * 46 + 2} y="70" fontSize="8" fill="#a8998a" fontFamily="system-ui">{d}</text>
              ))}
              {/* Live dot */}
              <motion.circle cx="280" cy="10" r="4.5" fill="#fff" stroke="#d97706" strokeWidth="2.5"
                initial={{ scale: 0 }} animate={{ scale: [0, 1.3, 1] }} transition={{ delay: 1.2, duration: 0.4 }}
              />
              <circle cx="280" cy="10" r="9" fill="none" stroke="#d97706" strokeWidth="1" opacity="0.3">
                <animate attributeName="r" values="6;14;6" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>

          <div className="sv-ai-bar" style={{ borderColor: "rgba(217,119,6,0.2)" }}>
            <Sparkles size={10} style={{ color: "#d97706" }} />
            AI forecast: peak traffic at 7:30 PM · staff up 2
          </div>
        </div>
      );

    default:
      return null;
  }
}
