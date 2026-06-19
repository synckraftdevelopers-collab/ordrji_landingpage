"use client";

import React from "react";
import { Sparkles, AlertTriangle, CheckCircle, TrendingDown, RefreshCw } from "lucide-react";

interface InventoryItem {
  name: string;
  category: string;
  qty: string;
  level: number; // percentage
  image: string;
  prediction: string;
  status: "Normal" | "Medium" | "Critical";
}

const INVENTORY_ITEMS: InventoryItem[] = [
  {
    name: "Paneer (Cottage Cheese)",
    category: "Dairy Products",
    qty: "18.5 kg left",
    level: 85,
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400",
    prediction: "High dinner demand expected. Paneer likely to finish tomorrow by 10 PM.",
    status: "Normal"
  },
  {
    name: "Mozzarella Cheese Blend",
    category: "Dairy Products",
    qty: "12.0 kg left",
    level: 60,
    image: "https://images.unsplash.com/photo-1589476993333-f55b84301219?auto=format&fit=crop&q=80&w=400",
    prediction: "Stock level stable. Reorder threshold will be crossed in 3 days.",
    status: "Medium"
  },
  {
    name: "Refined Sunflower Oil",
    category: "Consumables",
    qty: "4.5 Liters left",
    level: 18,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=400",
    prediction: "CRITICAL: Depletion expected in 4 hours. Auto-replenishment order triggered.",
    status: "Critical"
  },
  {
    name: "Organic Season Vegetables",
    category: "Fresh Produce",
    qty: "32.0 kg left",
    level: 80,
    image: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&q=80&w=400",
    prediction: "Scheduled delivery of 50 kg fresh greens arriving tomorrow at 6:00 AM.",
    status: "Normal"
  }
];

export default function Inventory() {
  const getLevelColor = (status: string) => {
    switch (status) {
      case "Normal": return "var(--accent-green)";
      case "Medium": return "var(--accent-amber)";
      case "Critical": return "var(--accent-rose)";
      default: return "var(--text-secondary)";
    }
  };

  return (
    <section className="inventory-section">
      <div className="glow-spot glow-rose" style={{ top: "30%", right: "5%", width: "400px", height: "400px" }} />
      <div className="glow-spot glow-purple" style={{ bottom: "10%", left: "5%", width: "400px", height: "400px" }} />

      <div className="container">
        {/* Title Block */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div className="badge animate-float" style={{ background: "rgba(227, 6, 19, 0.08)", borderColor: "rgba(227, 6, 19, 0.2)" }}>
            <Sparkles size={12} style={{ color: "var(--accent-orange)", marginRight: "4px" }} /> Predictive Intelligence
          </div>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-1.5px", marginBottom: "1rem" }}>
            Inventory Intelligence & Predictions
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}>
            Stop wasting ingredients. OrderJi tracks raw items down to grams, predicts run-out times, and automatically triggers supplier purchases.
          </p>
        </div>

        {/* Inventory Cards Grid */}
        <div className="inventory-grid">
          {INVENTORY_ITEMS.map((item) => {
            const levelColor = getLevelColor(item.status);
            const isCritical = item.status === "Critical";

            return (
              <div 
                key={item.name} 
                className={`inventory-card glass-card ${isCritical ? "critical-card-glow" : ""}`}
              >
                {/* Visual Frame */}
                <div 
                  className="inventory-image-frame" 
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  <div className="image-overlay" />
                  <span className="category-pill">{item.category}</span>
                  {isCritical && (
                    <span className="warning-pulse-tag">
                      <AlertCirclePulse /> LOW STOCK
                    </span>
                  )}
                </div>

                {/* Progress metrics */}
                <div className="inventory-body-details">
                  <div className="body-header">
                    <h4>{item.name}</h4>
                    <span className="qty-tag">{item.qty}</span>
                  </div>

                  {/* Level Slider Bar */}
                  <div className="level-container">
                    <div className="level-bar-label">
                      <span>Stock Volume</span>
                      <span style={{ color: levelColor, fontWeight: 700 }}>{item.level}%</span>
                    </div>
                    <div className="progress-track-bg">
                      <div 
                        className={`progress-fill-bar ${isCritical ? "animate-pulse" : ""}`}
                        style={{ 
                          width: `${item.level}%`, 
                          backgroundColor: levelColor,
                          boxShadow: `0 0 10px ${levelColor}`
                        }}
                      />
                    </div>
                  </div>

                  {/* Prediction box */}
                  <div 
                    className="prediction-message-box"
                    style={{ 
                      borderColor: isCritical ? "rgba(220, 38, 38, 0.2)" : "var(--border-color)",
                      backgroundColor: isCritical ? "rgba(220, 38, 38, 0.02)" : "rgba(0, 0, 0, 0.01)"
                    }}
                  >
                    <div className="prediction-title" style={{ color: isCritical ? "var(--accent-rose)" : "var(--accent-orange)" }}>
                      <RefreshCw size={12} className="rotate-icon" /> AI DEPLETION FORECAST
                    </div>
                    <p style={{ color: isCritical ? "var(--text-primary)" : "var(--text-secondary)" }}>
                      {item.prediction}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        .inventory-section {
          padding: 8rem 0;
          background-color: var(--bg-secondary);
          position: relative;
        }

        .inventory-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .inventory-card {
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 15px 30px rgba(0,0,0,0.05);
        }

        .critical-card-glow {
          border-color: rgba(220, 38, 38, 0.4) !important;
          box-shadow: 0 0 25px rgba(220, 38, 38, 0.12) !important;
        }

        .inventory-image-frame {
          height: 160px;
          background-size: cover;
          background-position: center;
          position: relative;
          display: flex;
          align-items: flex-end;
          padding: 1rem;
        }

        .image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 20%, rgba(253, 250, 244, 0.9) 100%);
        }

        .category-pill {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          font-size: 0.65rem;
          font-weight: 700;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          letter-spacing: 0.5px;
          z-index: 5;
        }

        .warning-pulse-tag {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(220, 38, 38, 0.1);
          border: 1px solid rgba(220, 38, 38, 0.2);
          color: var(--accent-rose);
          font-size: 0.65rem;
          font-weight: 800;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          z-index: 5;
        }

        .inventory-body-details {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          background: var(--bg-card);
          flex-grow: 1;
        }

        .body-header h4 {
          font-size: 1.05rem;
          font-weight: 800;
          letter-spacing: -0.3px;
          margin-bottom: 0.25rem;
        }

        .qty-tag {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        /* Stock bar */
        .level-container {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .level-bar-label {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .progress-track-bg {
          width: 100%;
          height: 6px;
          background: var(--border-color);
          border-radius: 9999px;
          overflow: hidden;
        }

        .progress-fill-bar {
          height: 100%;
          border-radius: 9999px;
          transition: width 1s ease-in-out;
        }

        /* Depletion Forecast details */
        .prediction-message-box {
          border: 1px solid;
          border-radius: 8px;
          padding: 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          margin-top: auto;
        }

        .prediction-title {
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 1px;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .prediction-message-box p {
          font-size: 0.75rem;
          line-height: 1.4;
        }

        .rotate-icon {
          animation: spinIcon 10s linear infinite;
        }

        @keyframes spinIcon {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}

// Tiny inline pulse indicator to make low stock stand out
function AlertCirclePulse() {
  return (
    <span style={{ position: "relative", display: "inline-flex", width: "6px", height: "6px" }}>
      <span className="absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75 animate-ping"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
      <style jsx>{`
        .absolute { position: absolute; }
        .inline-flex { display: inline-flex; }
        .h-full { height: 100%; }
        .w-full { width: 100%; }
        .rounded-full { border-radius: 50%; }
        .bg-rose-400 { background-color: #f87171; }
        .bg-rose-500 { background-color: #ef4444; }
        .opacity-75 { opacity: 0.75; }
        @keyframes ping {
          75%, 100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }
        .animate-ping {
          animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </span>
  );
}
