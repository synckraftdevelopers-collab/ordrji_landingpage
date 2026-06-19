"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Smartphone, 
  ChefHat, 
  Receipt, 
  Users, 
  TrendingUp, 
  QrCode, 
  CheckCircle2, 
  Clock, 
  CreditCard, 
  UserCheck, 
  Award, 
  ChevronRight, 
  Check, 
  AlertCircle,
  Sparkles 
} from "lucide-react";

interface PanelData {
  id: number;
  title: string;
  headline: string;
  description: string;
  icon: React.ComponentType<any>;
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
    gradient: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)", // soft orange peach
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
    gradient: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)", // soft mint green
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
    gradient: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)", // soft sky blue
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
    gradient: "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)", // soft lavender
    accentColor: "var(--accent-purple)",
    badge: "AI Autopilot Marketing",
    ctaText: "View CRM funnels"
  },
  {
    id: 4,
    title: "Analytics",
    headline: "Know Your Business Instantly",
    description: "Forget tedious spreadsheets. Access actionable executive AI insights. Spot stock wastage trends and forecast your next weekend's sales curve.",
    icon: TrendingUp,
    gradient: "linear-gradient(135deg, #fefce8 0%, #fef9c3 100%)", // soft gold yellow
    accentColor: "var(--accent-amber)",
    badge: "AI Predictive Analytics",
    ctaText: "Open analytics suite"
  }
];

export default function ModulesShowcase() {
  const [activePanel, setActivePanel] = useState<number>(0);
  
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
          let nextTimer = order.timer + 5;
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
          let nextStage = (guest.stage + 1) % 4;
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
          <div className="badge animate-float">
            <Sparkles size={12} style={{ color: "var(--accent-orange)", marginRight: "4px" }} /> AI-Powered Modules OS
          </div>
          <h2>One Single OS. Five Modules.</h2>
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
                onHoverStart={() => setActivePanel(panel.id)}
                onClick={() => setActivePanel(panel.id)}
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
                      <div className="collapsed-number">0{panel.id + 1}</div>
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
                onClick={() => setActivePanel(panel.id)}
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
                      <span className="collapsed-num-sub">Step 0{panel.id + 1}</span>
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
                onClick={() => setActivePanel(panel.id)}
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
                        <span className="collapsed-num-sub">Module 0{panel.id + 1}</span>
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
          border-color: rgba(0, 0, 0, 0.08);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
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
          border: 1px solid rgba(255, 255, 255, 0.6);
          background: rgba(255, 255, 255, 0.65);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.04),
                      0 0 1px 1px rgba(255, 255, 255, 0.8) inset;
          padding: 1.5rem;
          position: relative;
          color: var(--text-primary);
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

        .order-row-num {
          font-size: 0.8rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .order-row-table {
          font-size: 0.65rem;
          background: rgba(0, 0, 0, 0.04);
          padding: 0.15rem 0.35rem;
          border-radius: 4px;
          font-family: monospace;
          color: var(--text-secondary);
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
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .payment-method-btn {
          width: 100%;
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(0, 0, 0, 0.04);
          color: var(--text-secondary);
          padding: 0.5rem;
          border-radius: 6px;
          font-size: 0.65rem;
          font-weight: 800;
          text-align: left;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
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
      `}</style>
    </section>
  );
}

// Active Visual Sub-Component Router
function renderActiveVisual(panelId: number, state: any) {
  switch (panelId) {
    case 0:
      return (
        <div className="orders-stream-wrapper">
          <div className="stream-headline">
            <h4>
              <span className="live-pulse-dot" />
              Incoming Live Order Feed
            </h4>
            <span className="stream-counter-text">Orders Today: {state.liveOrdersCount}</span>
          </div>

          <div className="orders-list-scroll">
            <AnimatePresence initial={false}>
              {state.ordersList.map((order: any, idx: number) => (
                <motion.div
                  key={order.id}
                  layout
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 120, damping: 15 }}
                  className={`order-card-row ${idx === 0 ? "row-new" : ""}`}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span className="order-row-num">#{order.id}</span>
                    <span className="order-row-table">{order.table}</span>
                    <span className="order-row-items">{order.items}</span>
                  </div>
                  <div className="order-row-status-wrap">
                    <span className={`order-row-badge ${order.status}`}>{order.status}</span>
                    <span className="order-row-time">{order.time}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="ai-copilot-indicator-bar" style={{ borderColor: "rgba(227, 6, 19, 0.15)" }}>
            <Sparkles size={10} style={{ color: "var(--accent-orange)" }} />
            <span className="ai-copilot-text">AI Agent: Cross-selling active (12.4% conversion)</span>
          </div>
        </div>
      );
    
    case 1:
      return (
        <div className="kds-board-wrapper">
          <div className="kds-board-columns">
            {/* Lane 1: Preparing */}
            <div className="kds-board-column">
              <div className="kds-column-header">
                <h5>Preparing</h5>
                <span className="kds-count">2</span>
              </div>
              {state.kdsOrders.filter((o: any) => o.status === "Preparing").map((order: any) => (
                <div key={order.id} className="kds-ticket-card preparing">
                  <div className="kds-ticket-top">
                    <span>#{order.id}</span>
                    <span>{order.table}</span>
                  </div>
                  <div className="kds-ticket-items">{order.items}</div>
                  <div className="kds-ticket-bottom">
                    <span className="kds-ticket-timer preparing">
                      <Clock size={10} />
                      {state.formatTimer(order.timer)}
                    </span>
                    <div className="kds-activity-bar" style={{ color: "var(--accent-orange)" }}>
                      <div className="kds-activity-fill" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Lane 2: Ready */}
            <div className="kds-board-column">
              <div className="kds-column-header">
                <h5>Ready</h5>
                <span className="kds-count">
                  {state.kdsOrders.filter((o: any) => o.status === "Ready").length}
                </span>
              </div>
              {state.kdsOrders.filter((o: any) => o.status === "Ready").map((order: any) => (
                <div key={order.id} className="kds-ticket-card ready">
                  <div className="kds-ticket-top">
                    <span>#{order.id}</span>
                    <span>{order.table}</span>
                  </div>
                  <div className="kds-ticket-items">{order.items}</div>
                  <div className="kds-ticket-bottom">
                    <span className="kds-ticket-timer ready">
                      <CheckCircle2 size={10} />
                      Ready
                    </span>
                    <span style={{ fontSize: "0.55rem", color: "var(--accent-green)", fontWeight: 800 }}>Service Counter</span>
                  </div>
                </div>
              ))}
              {state.kdsOrders.filter((o: any) => o.status === "Ready").length === 0 && (
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", border: "1px dashed rgba(0,0,0,0.06)", borderRadius: "8px", opacity: 0.3, fontSize: "0.6rem" }}>
                  Empty Lane
                </div>
              )}
            </div>

            {/* Lane 3: Delayed */}
            <div className="kds-board-column">
              <div className="kds-column-header">
                <h5>Delayed</h5>
                <span className="kds-count">1</span>
              </div>
              {state.kdsOrders.filter((o: any) => o.status === "Delayed").map((order: any) => (
                <div key={order.id} className="kds-ticket-card delayed">
                  <div className="kds-ticket-top">
                    <span>#{order.id}</span>
                    <span>{order.table}</span>
                  </div>
                  <div className="kds-ticket-items">{order.items}</div>
                  <div className="kds-ticket-bottom">
                    <span className="kds-ticket-timer delayed">
                      <AlertCircle size={10} />
                      {state.formatTimer(order.timer)}
                    </span>
                    <span style={{ fontSize: "0.55rem", color: "var(--accent-rose)", fontWeight: 700 }}>Over SLA</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="ai-copilot-indicator-bar" style={{ borderColor: "rgba(5, 150, 105, 0.15)", bottom: "-0.5rem" }}>
            <Sparkles size={10} style={{ color: "var(--accent-green)" }} />
            <span className="ai-copilot-text">AI Prediction: Burger prep delay forecasted (78% SLA safety)</span>
          </div>
        </div>
      );

    case 2:
      return (
        <div className="billing-invoice-wrapper">
          <div className="invoice-card">
            <div className="invoice-header-block">
              <h5>OrderJi Invoice</h5>
              <span>No: #INV-2026-928 | Table 14</span>
            </div>
            
            <div className="invoice-items-block">
              <div className="invoice-item-row">
                <span>1x Crispy Salmon</span>
                <span>₹850.00</span>
              </div>
              <div className="invoice-item-row">
                <span>2x Truffle Fries</span>
                <span>₹900.00</span>
              </div>
              <div className="invoice-item-row">
                <span>1x Cold Brew Coffee</span>
                <span>₹180.00</span>
              </div>
              <div className="invoice-item-row bold-row">
                <span>Total Invoice</span>
                <span>₹1,930.00</span>
              </div>
            </div>

            <div style={{ fontSize: "0.55rem", textAlign: "center", color: "#8c7d6e", marginTop: "0.5rem" }}>
              Reconciliation status: pending card/UPI tap
            </div>

            {/* Payment success overlay */}
            <AnimatePresence>
              {state.billingState === "success" && (
                <motion.div 
                  className="invoice-success-overlay"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="invoice-success-check">
                    <Check size={24} strokeWidth={3} />
                  </div>
                  <h6>Payment Completed!</h6>
                  <p>POS Register Reconciled</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="billing-controls-card">
            <div className="revenue-metric-tile">
              <span>Gross Sales Today</span>
              <h4>₹{(state.revenueCount).toLocaleString("en-IN")}</h4>
            </div>

            <div className="payment-methods-grid">
              {(["UPI", "Card", "Cash"] as const).map((method) => (
                <button
                  key={method}
                  onClick={() => state.setSelectedPaymentMethod(method)}
                  className={`payment-method-btn ${state.selectedPaymentMethod === method ? "selected-btn" : ""}`}
                >
                  <span>{method} Payment</span>
                  <div 
                    style={{ 
                      width: "8px", 
                      height: "8px", 
                      borderRadius: "50%", 
                      background: state.selectedPaymentMethod === method ? "var(--accent-blue)" : "rgba(0,0,0,0.06)" 
                    }} 
                  />
                </button>
              ))}
            </div>

            <button 
              onClick={() => state.setBillingState("processing")}
              disabled={state.billingState !== "pending"}
              className="payment-trigger-btn"
              style={{ background: "var(--accent-blue)" }}
            >
              {state.billingState === "pending" && (
                <>
                  <CreditCard size={12} />
                  <span>Tap to Pay (₹1,930)</span>
                </>
              )}
              {state.billingState === "processing" && (
                <div style={{ display: "flex", gap: "0.25rem", alignItems: "center" }}>
                  <div className="kds-activity-bar" style={{ width: "16px", color: "#ffffff" }}>
                    <div className="kds-activity-fill" />
                  </div>
                  <span>Reconciling...</span>
                </div>
              )}
              {state.billingState === "success" && (
                <span>Done!</span>
              )}
            </button>
          </div>

          <div className="ai-copilot-indicator-bar" style={{ borderColor: "rgba(2, 132, 199, 0.15)", bottom: "-0.5rem" }}>
            <Sparkles size={10} style={{ color: "var(--accent-blue)" }} />
            <span className="ai-copilot-text">AI Smart Suggest: Splitting check 3-ways is optimal</span>
          </div>
        </div>
      );

    case 3:
      return (
        <div className="crm-funnel-wrapper">
          <div className="funnel-lanes">
            {/* VIP Customer */}
            <div className="funnel-lane lane-vip">
              <span className="funnel-lane-label">VIP Regular</span>
              <div className="funnel-avatars-track">
                {state.crmGuests.filter((g: any) => g.stage === 3).map((guest: any) => (
                  <motion.div 
                    key={guest.name}
                    layoutId={`crm-guest-${guest.name}`}
                    transition={{ type: "spring", stiffness: 80, damping: 15 }}
                    className="funnel-avatar-pill"
                  >
                    <div className="avatar-circle-mini" style={{ background: "var(--accent-purple)" }}>
                      {guest.avatar}
                    </div>
                    <span className="avatar-name-mini">{guest.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Repeat Customer */}
            <div className="funnel-lane lane-repeat">
              <span className="funnel-lane-label">Repeat Guest</span>
              <div className="funnel-avatars-track">
                {state.crmGuests.filter((g: any) => g.stage === 2).map((guest: any) => (
                  <motion.div 
                    key={guest.name}
                    layoutId={`crm-guest-${guest.name}`}
                    transition={{ type: "spring", stiffness: 80, damping: 15 }}
                    className="funnel-avatar-pill"
                  >
                    <div className="avatar-circle-mini" style={{ background: "var(--accent-blue)" }}>
                      {guest.avatar}
                    </div>
                    <span className="avatar-name-mini">{guest.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* First Customer */}
            <div className="funnel-lane lane-first">
              <span className="funnel-lane-label">First Customer</span>
              <div className="funnel-avatars-track">
                {state.crmGuests.filter((g: any) => g.stage === 1).map((guest: any) => (
                  <motion.div 
                    key={guest.name}
                    layoutId={`crm-guest-${guest.name}`}
                    transition={{ type: "spring", stiffness: 80, damping: 15 }}
                    className="funnel-avatar-pill"
                  >
                    <div className="avatar-circle-mini" style={{ background: "var(--accent-green)" }}>
                      {guest.avatar}
                    </div>
                    <span className="avatar-name-mini">{guest.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Walk-In Diner */}
            <div className="funnel-lane lane-walkin">
              <span className="funnel-lane-label">Walk-In</span>
              <div className="funnel-avatars-track">
                {state.crmGuests.filter((g: any) => g.stage === 0).map((guest: any) => (
                  <motion.div 
                    key={guest.name}
                    layoutId={`crm-guest-${guest.name}`}
                    transition={{ type: "spring", stiffness: 80, damping: 15 }}
                    className="funnel-avatar-pill"
                  >
                    <div className="avatar-circle-mini" style={{ background: "var(--text-muted)" }}>
                      {guest.avatar}
                    </div>
                    <span className="avatar-name-mini">{guest.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="ai-copilot-indicator-bar" style={{ borderColor: "rgba(124, 58, 237, 0.15)", bottom: "-0.5rem" }}>
            <Sparkles size={10} style={{ color: "var(--accent-purple)" }} />
            <span className="ai-copilot-text">AI Autopilot: Campaign trigger sent to Neha K. (Repeat Guest)</span>
          </div>
        </div>
      );

    case 4:
      return (
        <div className="analytics-visual-wrapper">
          <div className="analytics-metrics-grid">
            <div className="analytics-mini-tile">
              <span>Repeat Rate</span>
              <h5>68.4%</h5>
            </div>
            <div className="analytics-mini-tile">
              <span>Table Turnover</span>
              <h5>42m</h5>
            </div>
            <div className="analytics-mini-tile">
              <span>Avg Order Value</span>
              <h5>₹784</h5>
            </div>
          </div>

          <div className="analytics-chart-container">
            <div className="chart-grid-line" />
            <div className="chart-grid-line" />
            <div className="chart-grid-line" />
            
            <div className="chart-svg-wrap">
              <svg 
                viewBox="0 0 300 100" 
                style={{ width: "100%", height: "100%", overflow: "visible" }}
              >
                <defs>
                  <linearGradient id="gradient-chart" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent-amber)" stopOpacity="0.4" stopColor-rgb="217,119,6" />
                    <stop offset="100%" stopColor="var(--accent-amber)" stopOpacity="0.0" stopColor-rgb="217,119,6" />
                  </linearGradient>
                </defs>

                {/* Shaded Area */}
                <motion.path
                  d="M 0 80 Q 50 30 100 60 T 200 20 T 300 40 L 300 100 L 0 100 Z"
                  fill="url(#gradient-chart)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                />

                {/* Chart Line */}
                <motion.path
                  d="M 0 80 Q 50 30 100 60 T 200 20 T 300 40"
                  fill="none"
                  stroke="var(--accent-amber)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />

                {/* Animated Pulsing Dot at End */}
                <motion.circle
                  cx="300"
                  cy="40"
                  r="5"
                  fill="#ffffff"
                  stroke="var(--accent-amber)"
                  strokeWidth="2.5"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.0 }}
                />
              </svg>
            </div>
          </div>

          <div className="ai-copilot-indicator-bar" style={{ borderColor: "rgba(217, 119, 6, 0.15)", bottom: "-0.5rem" }}>
            <Sparkles size={10} style={{ color: "var(--accent-amber)" }} />
            <span className="ai-copilot-text">AI Prediction: Peak dynamic traffic forecast for 7:30 PM today</span>
          </div>
        </div>
      );

    default:
      return null;
  }
}
