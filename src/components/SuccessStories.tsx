"use client";

import React from "react";
import { Sparkles, TrendingUp, Users, AlertCircle } from "lucide-react";

const CASES = [
  {
    brand: "The Copper Chimney",
    location: "Mumbai // Fine Dining Format",
    owner: "Chef Kabir Sen",
    role: "Founding Partner & Chef",
    quote: "We were losing margins on manual table delays. Implementing OrderJi connected our QR menus directly to the line chefs. Table turn time dropped from 52 to 34 minutes, and order inaccuracies literally disappeared overnight.",
    brandImage: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800",
    ownerImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300",
    metrics: [
      {
        label: "Gross Revenue Growth",
        value: "+35%",
        icon: TrendingUp,
        color: "var(--accent-orange)"
      },
      {
        label: "Repeat Guest Rates",
        value: "+52%",
        icon: Users,
        color: "var(--accent-blue)"
      },
      {
        label: "Manual Ticket Errors",
        value: "-60%",
        icon: AlertCircle,
        color: "var(--accent-rose)"
      }
    ]
  },
  {
    brand: "Nectar Artisan Roasters",
    location: "Bangalore // Multi-Outlet Cafes",
    owner: "Meera Nair",
    role: "Director of Operations",
    quote: "With five outlets, keeping tabs on dairy and roast wastage was a logistical nightmare. OrderJi's predictive inventory warnings tell us exactly what supplies to order, preventing stock leakage and saving us lakhs every month.",
    brandImage: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800",
    ownerImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300",
    metrics: [
      {
        label: "Average Order Value",
        value: "+28%",
        icon: TrendingUp,
        color: "var(--accent-green)"
      },
      {
        label: "Raw Ingredient Waste",
        value: "-45%",
        icon: AlertCircle,
        color: "var(--accent-rose)"
      },
      {
        label: "Table Seat Turn Time",
        value: "-18m",
        icon: Users,
        color: "var(--accent-blue)"
      }
    ]
  }
];

export default function SuccessStories() {
  return (
    <section className="stories-section">
      <div className="glow-spot glow-purple" style={{ top: "30%", left: "5%", width: "400px", height: "400px" }} />
      <div className="glow-spot glow-rose" style={{ bottom: "20%", right: "5%", width: "400px", height: "400px" }} />
      
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div className="badge animate-float" style={{ background: "rgba(227, 6, 19, 0.08)", borderColor: "rgba(227, 6, 19, 0.2)" }}>
            <Sparkles size={12} style={{ color: "var(--accent-orange)", marginRight: "4px" }} /> Success Stories
          </div>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-1.5px", marginBottom: "1rem" }}>
            Proven Operational Yield
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}>
            Don't take our word for it. Read how top-tier restaurant groups use OrderJi OS to automate management.
          </p>
        </div>

        <div className="case-studies-stack">
          {CASES.map((cs, index) => (
            <div key={cs.brand} className="case-study-card glass-card">
              <div className="case-text-content">
                <span className="case-location">{cs.location}</span>
                <h3 className="case-brand-title">{cs.brand}</h3>
                <p className="case-quote">“{cs.quote}”</p>
                
                <div className="owner-profile-meta">
                  <div className="owner-photo" style={{ backgroundImage: `url(${cs.ownerImage})` }} />
                  <div>
                    <span className="owner-name">{cs.owner}</span>
                    <span className="owner-role">{cs.role}</span>
                  </div>
                </div>
              </div>

              <div className="case-graphics-panel" style={{ backgroundImage: `url(${cs.brandImage})` }}>
                <div className="graphics-overlay" />
                <div className="case-kpis-grid">
                  {cs.metrics.map((m) => {
                    const MetricIcon = m.icon;
                    return (
                      <div key={m.label} className="kpi-overlay-card glass-card">
                        <div className="kpi-header" style={{ color: m.color }}>
                          <MetricIcon size={14} style={{ marginRight: "4px" }} />
                          <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "1px" }}>
                            {m.label.toUpperCase()}
                          </span>
                        </div>
                        <h4 className="kpi-val" style={{ textShadow: `0 0 10px ${m.color}15` }}>
                          {m.value}
                        </h4>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .stories-section {
          background-color: var(--bg-primary);
          padding: 8rem 0;
          position: relative;
        }
        .case-studies-stack {
          display: flex;
          flex-direction: column;
          gap: 4rem;
        }
        .case-study-card {
          display: grid;
          grid-template-columns: 1fr;
          min-height: 460px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.04);
        }
        @media (min-width: 1024px) {
          .case-study-card {
            grid-template-columns: 1.1fr 0.9fr;
          }
        }
        .case-text-content {
          background: rgba(255, 255, 255, 0.4);
          display: flex;
          flex-direction: column;
          padding: 3rem 2rem;
        }
        @media (min-width: 640px) {
          .case-text-content {
            padding: 4rem 3rem;
          }
        }
        .case-location {
          color: var(--accent-orange);
          letter-spacing: 1.5px;
          margin-bottom: 0.5rem;
          font-size: 0.7rem;
          font-weight: 700;
        }
        .case-brand-title {
          letter-spacing: -1px;
          margin-bottom: 2rem;
          font-size: 2rem;
          font-weight: 800;
        }
        .case-quote {
          color: var(--text-secondary);
          border-left: 2px solid var(--border-color);
          margin-bottom: 2.5rem;
          padding-left: 1.5rem;
          font-size: 1.15rem;
          font-style: italic;
          line-height: 1.7;
        }
        .owner-profile-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: auto;
        }
        .owner-photo {
          border: 1px solid var(--border-color);
          background-position: center;
          background-size: cover;
          border-radius: 50%;
          width: 48px;
          height: 48px;
        }
        .owner-name {
          font-size: 0.95rem;
          font-weight: 700;
          display: block;
        }
        .owner-role {
          color: var(--text-muted);
          font-size: 0.8rem;
        }
        .case-graphics-panel {
          background-position: center;
          background-size: cover;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 300px;
          padding: 2.5rem 1.5rem;
          position: relative;
        }
        .graphics-overlay {
          background: linear-gradient(90deg, rgba(253, 250, 244, 0.95) 0%, rgba(253, 250, 244, 0.35) 100%);
          position: absolute;
          inset: 0;
        }
        @media (max-width: 1023px) {
          .graphics-overlay {
            background: linear-gradient(rgba(253, 250, 244, 0.9) 0%, rgba(253, 250, 244, 0.45) 100%);
          }
        }
        .case-kpis-grid {
          z-index: 5;
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          width: 100%;
          max-width: 320px;
          position: relative;
        }
        .kpi-overlay-card {
          background: rgba(255, 255, 255, 0.9);
          padding: 1rem 1.25rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.03);
        }
        .kpi-header {
          display: flex;
          align-items: center;
          margin-bottom: 0.25rem;
        }
        .kpi-val {
          font-size: 1.8rem;
          font-weight: 800;
        }
      `}</style>
    </section>
  );
}
