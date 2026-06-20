"use client";

import React, { useState } from "react";
import { Sparkles, Check, ArrowRight } from "lucide-react";

interface PricingPlan {
  name: string;
  desc: string;
  monthlyPrice: number;
  yearlyPrice: number;
  popular: boolean;
  features: string[];
  cta: string;
  color: string;
}

const PLANS: PricingPlan[] = [
  {
    name: "Starter",
    desc: "Perfect for single-location cafes, sweet shops, or bistros starting out.",
    monthlyPrice: 2499,
    yearlyPrice: 1999,
    popular: false,
    cta: "Start Starter Free",
    color: "var(--border-color)",
    features: [
      "Dynamic QR Menu Ordering",
      "Core Cloud billing POS terminal",
      "UPI & Card payment gateways integration",
      "Standard Loyalty & CRM profiles",
      "Email operations support"
    ]
  },
  {
    name: "Growth",
    desc: "For high-volume restaurants requiring kitchen coordination and stock tracking.",
    monthlyPrice: 4999,
    yearlyPrice: 3999,
    popular: true,
    cta: "Start Growth Free",
    color: "var(--accent-orange)",
    features: [
      "Everything in Starter",
      "Kitchen Display System (KDS) Node",
      "Visual Inventory & Stock predictions",
      "Automated WhatsApp Birthday & Loyalty SMS",
      "Standard Analytics Bento Reports",
      "24/7 Telephone support"
    ]
  },
  {
    name: "Scale",
    desc: "For multi-outlet culinary brands and growing franchise networks.",
    monthlyPrice: 9999,
    yearlyPrice: 7999,
    popular: false,
    cta: "Start Scale Free",
    color: "var(--accent-blue)",
    features: [
      "Everything in Growth",
      "Multi-outlet Central Inventory hub",
      "OrderJi AI Restaurant Manager terminal",
      "Advanced Custom Bento SVG analytics",
      "Custom role dashboard permissions",
      "Priority Account Manager"
    ]
  },
  {
    name: "Enterprise",
    desc: "Custom operational needs, legacy POS migration, and heavy ERP pipelines.",
    monthlyPrice: 0, // Custom
    yearlyPrice: 0, // Custom
    popular: false,
    cta: "Contact Enterprise Sales",
    color: "var(--accent-green)",
    features: [
      "Everything in Scale",
      "Unlimited store terminals & KDS displays",
      "Legacy POS migrations (Petpooja, Posist etc)",
      "99.99% Uptime service level SLA",
      "Custom reporting APIs & Webhooks",
      "Dedicated deployment engineers"
    ]
  }
];

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");

  return (
    <section className="pricing-section" id="pricing">
      <div className="glow-spot glow-rose" style={{ top: "30%", right: "10%", width: "400px", height: "400px" }} />
      <div className="glow-spot glow-green" style={{ bottom: "10%", left: "10%", width: "400px", height: "400px" }} />

      <div className="container">
        {/* Title Block */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div className="badge animate-float">
            <Sparkles size={12} style={{ color: "var(--accent-orange)", marginRight: "4px" }} /> Predictable Pricing
          </div>
          <h2 className="gradient-text" style={{ fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-1.5px", marginBottom: "1rem" }}>
            Transparent Plans for Every Format
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}>
            Choose the plan that matches your operations. No hidden installation fees or terminal lookup commissions.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="billing-toggle-container">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`toggle-cycle-btn ${billingCycle === "monthly" ? "active" : ""}`}
            >
              Billed Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`toggle-cycle-btn ${billingCycle === "yearly" ? "active" : ""}`}
            >
              Billed Yearly <span className="discount-pill">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="pricing-grid">
          {PLANS.map((plan) => {
            const isYearly = billingCycle === "yearly";
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
            const isCustom = plan.monthlyPrice === 0;

            return (
              <div 
                key={plan.name} 
                className={`pricing-card glass-card ${plan.popular ? "popular-plan-card" : ""}`}
                style={{ borderColor: plan.popular ? plan.color : "var(--border-color)" }}
              >
                {plan.popular && (
                  <span className="popular-badge-label">
                    MOST POPULAR
                  </span>
                )}

                <div className="card-top-content">
                  <h3 className="plan-name">{plan.name}</h3>
                  <p className="plan-desc">{plan.desc}</p>
                  
                  <div className="price-tag-wrapper">
                    {isCustom ? (
                      <h4 className="price-txt" style={{ fontSize: "2.2rem" }}>Custom</h4>
                    ) : (
                      <>
                        <h4 className="price-txt">
                          ₹{price.toLocaleString()}
                          <span style={{ fontSize: "1rem", color: "var(--text-muted)", fontWeight: 400 }}>/mo</span>
                        </h4>
                      </>
                    )}
                    {!isCustom && (
                      <span className="billing-meta">
                        {isYearly ? `₹${(price * 12).toLocaleString()} billed annually` : "Billed month-to-month"}
                      </span>
                    )}
                  </div>

                  <a 
                    href="https://pos.ordrji.com/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary plan-cta-btn"
                    style={{ 
                      backgroundColor: plan.popular ? "var(--accent-orange)" : "rgba(0,0,0,0.02)",
                      color: plan.popular ? "#ffffff" : "var(--text-primary)",
                      border: plan.popular ? "1px solid transparent" : "1px solid var(--border-color)"
                    }}
                  >
                    {plan.cta} <ArrowRight size={14} />
                  </a>
                </div>

                <div className="divider" style={{ margin: "1.5rem 0" }} />

                <div className="features-list-wrapper">
                  <span className="features-header-lbl">INCLUDED FEATURES:</span>
                  <ul className="features-checklist">
                    {plan.features.map((feat) => (
                      <li key={feat} className="feature-li">
                        <Check size={14} color="var(--accent-green)" style={{ flexShrink: 0 }} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        .pricing-section {
          padding: 8rem 0;
          background-color: var(--bg-primary);
          position: relative;
          z-index: 10;
        }

        .billing-toggle-container {
          display: inline-flex;
          background: rgba(0, 0, 0, 0.03);
          border: 1px solid var(--border-color);
          padding: 0.35rem;
          border-radius: 9999px;
          margin-top: 2rem;
          position: relative;
        }

        .toggle-cycle-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          padding: 0.5rem 1.25rem;
          border-radius: 9999px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition-fast);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .toggle-cycle-btn.active {
          background: #ffffff;
          color: var(--text-primary);
          box-shadow: 0 2px 8px rgba(90, 80, 70, 0.08);
        }

        .discount-pill {
          background: rgba(5, 150, 105, 0.1);
          color: var(--accent-green);
          font-size: 0.7rem;
          padding: 0.1rem 0.4rem;
          border-radius: 9999px;
          font-weight: 700;
        }

        /* Pricing Grid */
        .pricing-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          margin-top: 4rem;
          align-items: stretch;
        }

        @media (min-width: 768px) {
          .pricing-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1280px) {
          .pricing-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .pricing-card {
          padding: 2.25rem 2rem;
          display: flex;
          flex-direction: column;
          position: relative;
          background: var(--bg-card);
          box-shadow: 0 20px 40px -10px rgba(90, 80, 70, 0.06), 0 0 1px rgba(90, 80, 70, 0.08);
        }

        .popular-plan-card {
          box-shadow: 0 30px 60px -15px rgba(227, 6, 19, 0.15), 0 0 1px rgba(227, 6, 19, 0.3) !important;
          transform: scale(1.02);
        }

        @media (max-width: 1279px) {
          .popular-plan-card {
            transform: scale(1);
          }
        }

        .popular-badge-label {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--accent-orange);
          color: white;
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 1.5px;
          padding: 0.35rem 0.85rem;
          border-radius: 9999px;
          box-shadow: 0 4px 12px rgba(227, 6, 19, 0.3);
        }

        .plan-name {
          font-size: 1.4rem;
          font-weight: 800;
          letter-spacing: -0.5px;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        .plan-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 1.75rem;
          min-height: 52px;
        }

        .price-tag-wrapper {
          display: flex;
          flex-direction: column;
          margin-bottom: 1.75rem;
        }

        .price-txt {
          font-size: 2.5rem;
          font-weight: 800;
          letter-spacing: -1.5px;
          color: var(--text-primary);
        }

        .billing-meta {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-top: 0.15rem;
        }

        .plan-cta-btn {
          width: 100%;
          justify-content: center;
          padding: 0.75rem;
        }

        .plan-cta-btn:hover {
          transform: translateY(-2px);
        }

        .features-list-wrapper {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          flex-grow: 1;
        }

        .features-header-lbl {
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 1px;
        }

        .features-checklist {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .feature-li {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }
      `}</style>
    </section>
  );
}
