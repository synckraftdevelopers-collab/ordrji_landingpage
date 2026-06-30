"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Pricing from "@/components/Pricing";
import BookDemoModal from "@/components/BookDemoModal";
import FinalCTA from "@/components/FinalCTA";
import { Check, X, ChevronDown, Sparkles } from "lucide-react";

// Feature groups for the Comparison Table
const COMPARISON_GROUPS = [
  {
    category: "POS & Core Billing",
    features: [
      { name: "Cloud POS Billing Terminal", starter: "1 Terminal", growth: "3 Terminals", scale: "Unlimited", enterprise: "Custom Layouts" },
      { name: "Offline Safety Cache Loop", starter: true, growth: true, scale: true, enterprise: true },
      { name: "UPI & Card Payments Integration", starter: true, growth: true, scale: true, enterprise: true },
      { name: "Multi-register Sync", starter: false, growth: true, scale: true, enterprise: true },
      { name: "Custom Receipt Designer", starter: false, growth: "Standard", scale: "Advanced", enterprise: "Bespoke" },
    ],
  },
  {
    category: "Digital Ordering",
    features: [
      { name: "Dynamic Table QR Menu", starter: "Standard", growth: "Self-Checkout", scale: "AI Recommendations", enterprise: "Whitelabel Web" },
      { name: "Contactless UPI Payments", starter: true, growth: true, scale: true, enterprise: true },
      { name: "Digital Waiter App Licenses", starter: false, growth: "Up to 5", scale: "Unlimited", enterprise: "Unlimited" },
      { name: "Self-Service Ordering Kiosk", starter: false, growth: false, scale: "1 License", enterprise: "Unlimited" },
    ],
  },
  {
    category: "Kitchen & Operations",
    features: [
      { name: "Kitchen Display System (KDS)", starter: false, growth: "1 Screen", scale: "Up to 5 Screens", enterprise: "Unlimited Stations" },
      { name: "Item-Wise Kitchen Routing", starter: false, growth: true, scale: true, enterprise: true },
      { name: "Order Prep-Time Analytics", starter: false, growth: false, scale: true, enterprise: true },
    ],
  },
  {
    category: "Inventory & Supply Chain",
    features: [
      { name: "Real-time Ingredient Stock Tracker", starter: "Basic", growth: "Advanced", scale: "Predictive", enterprise: "Central Hub" },
      { name: "Recipe & Menu Ingredient Deductions", starter: false, growth: true, scale: true, enterprise: true },
      { name: "Multi-outlet Warehouse & Transfers", starter: false, growth: false, scale: true, enterprise: true },
      { name: "Purchase Order Automation", starter: false, growth: false, scale: true, enterprise: true },
    ],
  },
  {
    category: "CRM & Marketing",
    features: [
      { name: "Customer Profiles & History", starter: "Standard", growth: "Advanced", scale: "Unified Hub", enterprise: "Custom API Sync" },
      { name: "WhatsApp & SMS Campaigns", starter: false, growth: "Standard", scale: "AI Automated", enterprise: "Enterprise SLA" },
      { name: "Cashbacks & Loyalty System", starter: false, growth: true, scale: true, enterprise: true },
    ],
  },
  {
    category: "Services & Support",
    features: [
      { name: "Support Channels", starter: "Email only", growth: "24/7 Telephone", scale: "Priority Manager", enterprise: "Dedicated Eng Team" },
      { name: "Legacy POS Migration (Petpooja, Posist etc)", starter: "Paid Add-on", growth: "Free Setup", scale: "Free Setup", enterprise: "Custom API & Sync" },
      { name: "Uptime Service Level SLA", starter: "Standard", growth: "99.9% Uptime", scale: "99.95% Uptime", enterprise: "99.99% Custom SLA" },
    ],
  },
];

// Pricing specific FAQs
const PRICING_FAQS = [
  { q: "Are there any hidden setup or installation fees?", a: "No. All our standard subscription setups are fully guided with no hidden installation fees. Setup and onboarding are included for free in the Growth, Scale, and Enterprise plans." },
  { q: "Can I upgrade or downgrade my plan at any time?", a: "Yes. You can upgrade, downgrade, or cancel your subscription at any time. If you choose an annual plan, you lock in a 20% discount. Downgrades or cancellations will take effect at the start of your next billing cycle." },
  { q: "Do you charge order commissions on QR and table checkouts?", a: "Absolutely not. OrderJi believes that your restaurant revenue belongs entirely to you. We operate on a flat subscription pricing model. We never charge commission percentages or lookup fees on QR ordering, table reservations, or self-service kiosks." },
  { q: "What hardware is compatible with OrderJi?", a: "OrderJi is built as a cloud platform that runs on any modern iPad, Android tablet, POS terminal, Windows PC, or macOS computer. It connects seamlessly with standard thermal receipt printers via Bluetooth, Wi-Fi, USB, or LAN." },
  { q: "What is your legacy POS migration process?", a: "We make migrating painless. Our specialists export your menu structure, price lists, customer databases, and historical recipes from systems like Petpooja, Posist, Vyapar, or Toast and import them into OrderJi, usually completing the setup in less than 24 hours." }
];

export default function PricingPage() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const renderValue = (val: string | boolean) => {
    if (typeof val === "boolean") {
      return val ? (
        <Check size={18} color="var(--accent-green)" style={{ margin: "0 auto" }} />
      ) : (
        <X size={18} color="var(--text-muted)" style={{ margin: "0 auto", opacity: 0.3 }} />
      );
    }
    return <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)" }}>{val}</span>;
  };

  return (
    <>
      <Navbar onBookDemo={() => setIsDemoModalOpen(true)} />
      
      <main style={{ minHeight: "100vh", background: "var(--bg-primary)", paddingTop: "6rem" }}>
        
        {/* Banner Hero */}
        <div style={{ textAlign: "center", padding: "4rem 1.5rem 2rem", position: "relative" }}>
          <div className="glow-spot glow-rose" style={{ top: "0", left: "20%", width: "400px", height: "400px", opacity: 0.1 }} />
          <span className="pricing-tag font-semibold">
            <Sparkles size={11} style={{ color: "#e30613" }} /> Fair, Predictable Pricing
          </span>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, letterSpacing: "-2.5px", marginTop: "0.5rem" }}>
            The Complete OS. <br />
            Simple Subscription Plans.
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", maxWidth: "600px", margin: "1rem auto 0", lineHeight: "1.6" }}>
            Unleash the full potential of your kitchen. Pick a package tailored to your restaurant size and operations.
          </p>
        </div>

        {/* Core Pricing Flip Cards Grid Component */}
        <Pricing />

        {/* Detailed Feature Comparison Grid Section */}
        <section style={{ padding: "6rem 0", background: "var(--bg-secondary)", borderTop: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)" }}>
          <div className="container" style={{ maxWidth: 1100 }}>
            
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <span className="pricing-tag font-semibold">FEATURES</span>
              <h2 style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-1.2px", marginTop: "0.5rem" }}>
                Compare Plans in Detail
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", maxWidth: "500px", margin: "0.5rem auto 0" }}>
                Every module mapped out so you can choose exactly what fits your floor and kitchen.
              </p>
            </div>

            {/* Comparison Table */}
            <div style={{ overflowX: "auto", background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: 18, boxShadow: "0 10px 30px rgba(0,0,0,0.02)" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border-color)", background: "rgba(0,0,0,0.015)" }}>
                    <th style={{ padding: "1.5rem 1.25rem", textAlign: "left", width: "35%", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>Feature Overview</th>
                    <th style={{ padding: "1.5rem 1.25rem", textAlign: "center", width: "16.25%", fontSize: "0.85rem", fontWeight: 800, color: "#8b5cf6" }}>Starter</th>
                    <th style={{ padding: "1.5rem 1.25rem", textAlign: "center", width: "16.25%", fontSize: "0.85rem", fontWeight: 800, color: "#e30613" }}>Growth</th>
                    <th style={{ padding: "1.5rem 1.25rem", textAlign: "center", width: "16.25%", fontSize: "0.85rem", fontWeight: 800, color: "#0284c7" }}>Scale</th>
                    <th style={{ padding: "1.5rem 1.25rem", textAlign: "center", width: "16.25%", fontSize: "0.85rem", fontWeight: 800, color: "#059669" }}>Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_GROUPS.map((group, groupIdx) => (
                    <React.Fragment key={groupIdx}>
                      {/* Category Header Row */}
                      <tr style={{ background: "rgba(0,0,0,0.01)" }}>
                        <td colSpan={5} style={{ padding: "0.85rem 1.25rem", fontSize: "0.72rem", fontWeight: 800, color: "var(--text-muted)", letterSpacing: "1px", textTransform: "uppercase", borderBottom: "1px solid var(--border-color)" }}>
                          {group.category}
                        </td>
                      </tr>
                      {group.features.map((f, idx) => (
                        <tr key={idx} style={{ borderBottom: "1px solid var(--border-color)", transition: "background 0.2s" }} className="compare-row">
                          <td style={{ padding: "1.1rem 1.25rem", fontSize: "0.88rem", fontWeight: 600, color: "var(--text-primary)" }}>{f.name}</td>
                          <td style={{ padding: "1.1rem 1.25rem", textAlign: "center" }}>{renderValue(f.starter)}</td>
                          <td style={{ padding: "1.1rem 1.25rem", textAlign: "center" }}>{renderValue(f.growth)}</td>
                          <td style={{ padding: "1.1rem 1.25rem", textAlign: "center" }}>{renderValue(f.scale)}</td>
                          <td style={{ padding: "1.1rem 1.25rem", textAlign: "center" }}>{renderValue(f.enterprise)}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Pricing FAQ Section */}
        <section style={{ padding: "6rem 0", background: "var(--bg-primary)" }}>
          <div className="container" style={{ maxWidth: 800 }}>
            
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <span className="pricing-tag font-semibold">QUESTIONS</span>
              <h2 style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-1.2px", marginTop: "0.5rem" }}>
                Pricing FAQ
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                Clear answers to billing, setup, and service inquiries.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {PRICING_FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: 14, overflow: "hidden", padding: "0 1.5rem" }} className="faq-box">
                    <button 
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      style={{ width: "100%", background: "transparent", border: "none", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.4rem 0", cursor: "pointer", textAlign: "left", color: "var(--text-primary)" }}
                    >
                      <span style={{ fontSize: "1rem", fontWeight: 700, letterSpacing: "-0.1px" }}>{faq.q}</span>
                      <ChevronDown 
                        size={18} 
                        style={{ 
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", 
                          transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
                          color: isOpen ? "var(--accent-orange)" : "var(--text-muted)" 
                        }} 
                      />
                    </button>
                    <div 
                      style={{ 
                        maxHeight: isOpen ? "200px" : "0", 
                        opacity: isOpen ? 1 : 0, 
                        overflow: "hidden",
                        transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease, padding 0.4s ease",
                        paddingBottom: isOpen ? "1.4rem" : "0"
                      }}
                    >
                      <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{faq.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Book Demo & WhatsApp CTA */}
        <FinalCTA onBookDemo={() => setIsDemoModalOpen(true)} />
      </main>

      <Footer />
      
      <BookDemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />

      <style jsx global>{`
        .pricing-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          background: rgba(227, 6, 19, 0.06);
          border: 1px solid rgba(227, 6, 19, 0.18);
          color: var(--accent-orange);
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.7rem;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .compare-row:hover {
          background: rgba(0, 0, 0, 0.007);
        }

        .faq-box {
          box-shadow: 0 4px 15px rgba(90, 80, 70, 0.01), 0 0 1px rgba(90, 80, 70, 0.03);
          transition: border-color 0.2s;
        }
        .faq-box:hover {
          border-color: rgba(227, 6, 19, 0.2);
        }
      `}</style>
    </>
  );
}
