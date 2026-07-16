/* eslint-disable @typescript-eslint/no-explicit-any, react/no-unescaped-entities, @next/next/no-html-link-for-pages, react-hooks/set-state-in-effect */
import React from "react";
import ProductFeaturePage from "@/components/ProductFeaturePage";
import { Megaphone, Users, Gift, MessageSquare, Target, Sparkles, Trophy } from "lucide-react";

export const metadata = {
  title: "Marketing Automation | Ordrji",
  description: "CRM, loyalty programs, and automated SMS campaigns for restaurants."
};

export default function MarketingAutomationPage() {
  const features = [
    {
      icon: <Users size={24} />,
      title: "Centralized CRM",
      description: "Build a rich database of your customers including their visit history, favorite items, and lifetime value."
    },
    {
      icon: <MessageSquare size={24} />,
      title: "Automated SMS/WhatsApp",
      description: "Send automated birthday wishes, anniversary offers, or 'we miss you' messages to inactive guests."
    },
    {
      icon: <Gift size={24} />,
      title: "Custom Loyalty Programs",
      description: "Create points-based or tier-based loyalty programs to incentivize repeat visits and reward your best patrons."
    },
    {
      icon: <Target size={24} />,
      title: "Targeted Campaigns",
      description: "Filter your audience to send promotions only to people who love specific dishes or visit on specific days."
    },
    {
      icon: <Sparkles size={24} />,
      title: "Feedback Engine",
      description: "Automatically send SMS feedback links after checkout. Catch negative reviews privately before they hit Google."
    }
  ];

  const benefits = [
    "Turn one-time walk-ins into regular loyal customers",
    "Increase customer lifetime value significantly",
    "Protect your online reputation with private feedback loops",
    "Fill empty tables on slow days with targeted flash offers",
    "Build a brand that guests feel personally connected to"
  ];

  return (
    <ProductFeaturePage 
      title="Marketing & Loyalty"
      subtitle="Don't just wait for customers to return. Actively build relationships, drive repeat visits, and grow your revenue on autopilot."
      heroColor="var(--accent-purple)"
      features={features}
      benefits={benefits}
      heroVisual={
        <div style={{
          background: "var(--bg-card)",
          borderRadius: "16px",
          padding: "1.5rem",
          boxShadow: "0 25px 50px rgba(108, 92, 231, 0.15)",
          border: "1px solid var(--border-color)",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          transform: "perspective(1000px) rotateY(-5deg)",
          transformOrigin: "center right",
          transition: "transform 0.5s ease"
        }}>
          {/* Active Campaign Card */}
          <div style={{ border: "1px solid var(--border-color)", borderRadius: "12px", overflow: "hidden" }}>
            <div style={{ background: "var(--bg-secondary)", padding: "1rem", borderBottom: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                <div style={{ background: "var(--accent-purple)", color: "white", width: "32px", height: "32px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <MessageSquare size={16} />
                </div>
                <div style={{ fontWeight: 600 }}>We Miss You SMS</div>
              </div>
              <span style={{ background: "rgba(46, 204, 113, 0.1)", color: "#2ecc71", padding: "0.2rem 0.6rem", borderRadius: "100px", fontSize: "0.75rem", fontWeight: 700 }}>ACTIVE</span>
            </div>
            <div style={{ padding: "1rem", fontSize: "0.95rem", color: "var(--text-secondary)" }}>
              <p style={{ background: "var(--bg-primary)", padding: "0.8rem", borderRadius: "8px", border: "1px dashed var(--border-color)", marginBottom: "1rem" }}>
                "Hey &lt;Name&gt;! We haven't seen you in 30 days. Enjoy a free dessert on us this weekend at Ordrji Cafe! Use code MISSYOU."
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <div style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.3rem" }}>Sent To</div>
                  <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--text-primary)" }}>452 Guests</div>
                </div>
                <div>
                  <div style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.3rem" }}>Converted</div>
                  <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--accent-purple)" }}>18% (81 visits)</div>
                </div>
              </div>
            </div>
          </div>

          {/* CRM Segment */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", background: "var(--bg-secondary)", padding: "1rem", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
            <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", width: "48px", height: "48px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Trophy size={20} color="var(--accent-orange)" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, display: "flex", justifyContent: "space-between" }}>
                <span>VIP Segment</span>
                <span style={{ color: "var(--accent-purple)", fontWeight: 700 }}>245 users</span>
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Spent &gt; $500 in last 6 months</div>
            </div>
          </div>
        </div>
      }
    />
  );
}
