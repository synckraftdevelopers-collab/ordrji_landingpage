"use client";

import React from "react";
import { Utensils, Coffee, Cloud, Candy, Croissant, Network } from "lucide-react";

const FORMATS = [
  { name: "Fine Dining & Restaurants", icon: Utensils, color: "var(--accent-purple)" },
  { name: "Sleek Cafes & Bistros", icon: Coffee, color: "var(--accent-blue)" },
  { name: "High-Volume Cloud Kitchens", icon: Cloud, color: "var(--accent-green)" },
  { name: "Sweet Shops & Patisseries", icon: Candy, color: "var(--accent-rose)" },
  { name: "Artisanal Bakeries", icon: Croissant, color: "var(--accent-amber)" },
  { name: "Multi-Outlet Enterprise Chains", icon: Network, color: "#a5b4fc" }
];

export default function TrustBar() {
  // Double the list to create a seamless looping marquee
  const marqueeItems = [...FORMATS, ...FORMATS, ...FORMATS];

  return (
    <section className="trustbar-section">
      <div className="container">
        <p className="trustbar-title">TRUSTED BY MODERN CULINARY BRAND FORMATS NATIONWIDE</p>
      </div>

      <div className="marquee-container">
        <div className="marquee-fade-left" />
        <div className="animate-marquee">
          {marqueeItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={`${item.name}-${index}`} className="marquee-card glass-card">
                <div 
                  className="icon-wrapper" 
                  style={{ 
                    backgroundColor: `rgba(255,255,255,0.03)`, 
                    borderColor: item.color,
                    color: item.color
                  }}
                >
                  <Icon size={18} />
                </div>
                <span>{item.name}</span>
              </div>
            );
          })}
        </div>
        <div className="marquee-fade-right" />
      </div>

      <style jsx global>{`
        .trustbar-section {
          padding: 4rem 0;
          background-color: var(--bg-primary);
          overflow: hidden;
          position: relative;
        }

        .trustbar-title {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 2px;
          color: var(--text-muted);
          text-align: center;
          margin-bottom: 2rem;
          text-transform: uppercase;
        }

        .marquee-container {
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: 1rem 0;
        }

        .marquee-fade-left {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 15%;
          background: linear-gradient(to right, var(--bg-primary) 0%, transparent 100%);
          z-index: 2;
          pointer-events: none;
        }

        .marquee-fade-right {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 15%;
          background: linear-gradient(to left, var(--bg-primary) 0%, transparent 100%);
          z-index: 2;
          pointer-events: none;
        }

        .marquee-card {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1.5rem;
          margin-right: 1.5rem;
          border-radius: 9999px;
          white-space: nowrap;
          cursor: pointer;
        }

        .marquee-card span {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid transparent;
          transition: var(--transition-fast);
        }

        .marquee-card:hover {
          transform: translateY(-2px);
          border-color: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </section>
  );
}
