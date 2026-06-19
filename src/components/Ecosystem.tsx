"use client";

import React, { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

interface EcosystemNode {
  id: string;
  name: string;
  desc: string;
  color: string;
  angle: number;
  stat: string;
  image: string;
}

const NODES: EcosystemNode[] = [
  { id: "orders",    name: "Orders Engine",          desc: "Consolidate QR ordering, walk-ins, and aggregate delivery apps in one place.",        color: "#e30613", angle: 0,   stat: "3k+ orders/sec reconciled",    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=120" },
  { id: "kitchen",   name: "Kitchen Displays (KDS)", desc: "Transmit direct table orders to preparation queues without lag.",                      color: "#d97706", angle: 40,  stat: "Prep times reduced by 22%",     image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=120" },
  { id: "billing",   name: "Billing & Split",        desc: "Accept payments, print receipts, and split checks instantly.",                         color: "#059669", angle: 80,  stat: "Instant UPI reconciliation",    image: "https://images.unsplash.com/photo-1563013544-824ae1d704d3?auto=format&fit=crop&q=80&w=120" },
  { id: "inventory", name: "Inventory Intel",        desc: "Live recipe tracing, automated alerts, and raw materials stock indicators.",           color: "#dc2626", angle: 120, stat: "Zero manual inventory audits",  image: "https://images.unsplash.com/photo-1543083115-638c32cd3d58?auto=format&fit=crop&q=80&w=120" },
  { id: "crm",       name: "CRM Engines",            desc: "Collect customer profiles, dietary flags, and loyalty tiers.",                         color: "#0284c7", angle: 160, stat: "60k+ profiles managed",         image: "https://images.unsplash.com/photo-1581349485608-9469926a8e5e?auto=format&fit=crop&q=80&w=120" },
  { id: "marketing", name: "Marketing Flows",        desc: "Trigger SMS/WhatsApp campaigns based on historical dining actions.",                   color: "#e30613", angle: 200, stat: "+14.8% customer retention",    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=120" },
  { id: "analytics", name: "Bento Analytics",        desc: "Track sales curves, top items, and net profits on single charts.",                    color: "#059669", angle: 240, stat: "Real-time P&L mapping",         image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=120" },
  { id: "staff",     name: "Staff Management",       desc: "Monitor waiter performance, shift schedules, and checkouts.",                         color: "#0284c7", angle: 280, stat: "Automatic tips distribution",   image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&q=80&w=120" },
  { id: "tables",    name: "Floor Layouts",          desc: "Visual restaurant grids with live table occupancy indicators.",                        color: "#d97706", angle: 320, stat: "Table turn times minimized",    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=120" },
];

// SVG coordinate constants — center is always exactly (250, 250)
const CX = 250;
const CY = 250;
const R = 175;
const NODE_R = 36;

export default function Ecosystem() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (!isAutoRotating) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % NODES.length;
        setRotation((r) => r - 40);
        return next;
      });
    }, 3500);
    return () => clearInterval(interval);
  }, [isAutoRotating]);

  const activeNode = NODES[activeIndex];

  return (
    <section className="ecosystem-section">
      <div className="glow-spot glow-rose" style={{ top: "30%", left: "50%", transform: "translate(-50%, -50%)", width: "600px", height: "600px" }} />

      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <div className="badge animate-float" style={{ background: "rgba(227, 6, 19, 0.08)", borderColor: "rgba(227, 6, 19, 0.2)" }}>
            <Sparkles size={12} style={{ color: "#e30613", marginRight: "4px" }} /> Complete Connected Grid
          </div>
          <h2 className="gradient-text" style={{ fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-1.5px", marginBottom: "1rem" }}>
            The Connected Restaurant Ecosystem
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}>
            No more fragmented modules. OrderJi links every aspect of restaurant management into a single, cohesive engine.
          </p>
        </div>

        <div className="ecosystem-grid-layout">
          {/* Left detail panel */}
          <div className="node-detail-panel glass-card">
            {activeNode && (
              <div className="node-detail-content">
                <div className="detail-icon-img" style={{ backgroundImage: `url(${activeNode.image})`, borderColor: activeNode.color }} />
                <h3>{activeNode.name}</h3>
                <p className="detail-desc">{activeNode.desc}</p>
                <div className="divider" style={{ margin: "1.5rem 0" }} />
                <div className="stat-pill">
                  <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 700, letterSpacing: "0.5px" }}>LIVE METRIC:</span>
                  <span className="stat-value" style={{ color: activeNode.color }}>{activeNode.stat}</span>
                </div>
              </div>
            )}
          </div>

          {/* SVG orbital visualizer — hub is always at (250,250) */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <svg
              viewBox="0 0 500 500"
              width="500"
              height="500"
              style={{ maxWidth: "100%", display: "block" }}
            >
              <defs>
                {NODES.map((node) => (
                  <clipPath key={`clip-${node.id}`} id={`clip-${node.id}`}>
                    <circle cx="0" cy="0" r={NODE_R - 3} />
                  </clipPath>
                ))}
              </defs>

              {/* Orbit ring */}
              <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(227,6,19,0.15)" strokeWidth="1" strokeDasharray="6 4" />

              {/* Spoke lines */}
              {NODES.map((node, idx) => {
                const rad = ((node.angle + rotation) * Math.PI) / 180;
                const nx = CX + R * Math.cos(rad);
                const ny = CY + R * Math.sin(rad);
                return (
                  <line key={`spoke-${node.id}`}
                    x1={CX} y1={CY} x2={nx} y2={ny}
                    stroke={idx === activeIndex ? node.color : "rgba(227,6,19,0.08)"}
                    strokeWidth={idx === activeIndex ? "1.5" : "1"}
                  />
                );
              })}

              {/* Center hub — hardcoded at (250, 250) */}
              <g transform={`translate(${CX}, ${CY})`}>
                <circle cx="0" cy="0" r="58" fill="var(--bg-card)" stroke="#e30613" strokeWidth="2" />
                <text x="0" y="-10" textAnchor="middle" fontSize="7" fontWeight="700" letterSpacing="2" fill="#999" fontFamily="inherit">SYSTEM</text>
                <text x="0" y="7" textAnchor="middle" fontSize="10" fontWeight="800" fill="#e30613" fontFamily="inherit">ORDERJI OS</text>
              </g>

              {/* Orbital nodes */}
              {NODES.map((node, idx) => {
                const rad = ((node.angle + rotation) * Math.PI) / 180;
                const nx = CX + R * Math.cos(rad);
                const ny = CY + R * Math.sin(rad);
                const isActive = idx === activeIndex;
                const isHov = hoveredIndex === idx;

                return (
                  <g
                    key={node.id}
                    transform={`translate(${nx}, ${ny}) scale(${isActive || isHov ? 1.2 : 1})`}
                    style={{ cursor: "pointer" }}
                    onClick={() => { setActiveIndex(idx); setIsAutoRotating(false); }}
                    onMouseEnter={() => { setHoveredIndex(idx); setActiveIndex(idx); setIsAutoRotating(false); }}
                    onMouseLeave={() => { setHoveredIndex(null); setIsAutoRotating(true); }}
                  >
                    {(isActive || isHov) && (
                      <circle cx="0" cy="0" r={NODE_R + 5} fill="none" stroke={node.color} strokeWidth="2" opacity="0.5" />
                    )}
                    <circle cx="0" cy="0" r={NODE_R} fill={isActive || isHov ? node.color : "#e8e4dc"} />
                    <image
                      href={node.image}
                      x={-(NODE_R - 3)} y={-(NODE_R - 3)}
                      width={(NODE_R - 3) * 2} height={(NODE_R - 3) * 2}
                      clipPath={`url(#clip-${node.id})`}
                      preserveAspectRatio="xMidYMid slice"
                    />
                    {(isActive || isHov) && (
                      <text x="0" y={NODE_R + 14} textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--text-primary)" fontFamily="inherit">
                        {node.name}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .ecosystem-section {
          padding: 8rem 0;
          background-color: var(--bg-primary);
          position: relative;
          overflow: hidden;
          z-index: 10;
        }

        .ecosystem-grid-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
          align-items: center;
          margin-top: 2rem;
        }

        @media (min-width: 1024px) {
          .ecosystem-grid-layout {
            grid-template-columns: 0.8fr 1.2fr;
          }
        }

        .node-detail-panel {
          padding: 2.5rem;
          min-height: 320px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          background: var(--bg-card);
        }

        .node-detail-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 100%;
        }

        .detail-icon-img {
          width: 64px;
          height: 64px;
          border-radius: 14px;
          border: 3px solid;
          background-size: cover;
          background-position: center;
          margin-bottom: 1.5rem;
        }

        .node-detail-content h3 {
          font-size: 1.6rem;
          font-weight: 800;
          letter-spacing: -0.5px;
          margin-bottom: 0.75rem;
          color: var(--text-primary);
        }

        .detail-desc {
          color: var(--text-secondary);
          font-size: 1rem;
          line-height: 1.6;
        }

        .stat-pill {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          background: rgba(0, 0, 0, 0.02);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 0.75rem 1rem;
          width: 100%;
        }

        .stat-value {
          font-size: 1rem;
          font-weight: 700;
        }
      `}</style>
    </section>
  );
}
