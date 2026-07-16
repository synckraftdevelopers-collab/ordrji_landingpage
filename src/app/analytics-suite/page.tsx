/* eslint-disable @typescript-eslint/no-explicit-any, react/no-unescaped-entities, @next/next/no-html-link-for-pages, react-hooks/set-state-in-effect */
import React from "react";
import ProductFeaturePage from "@/components/ProductFeaturePage";
import { LineChart, BarChart3, Activity, PieChart, ArrowUpRight, FileJson } from "lucide-react";

export const metadata = {
  title: "Restaurant Analytics Suite | Ordrji",
  description: "Real-time reports, sales data, and business intelligence."
};

export default function AnalyticsSuitePage() {
  const features = [
    {
      icon: <Activity size={24} />,
      title: "Live Command Center",
      description: "View real-time sales, live tables, and current discounts from anywhere in the world on your mobile phone."
    },
    {
      icon: <BarChart3 size={24} />,
      title: "Item-Level Insights",
      description: "Identify your star items (high profit, high sales) vs your dogs (low profit, low sales) to optimize your menu."
    },
    {
      icon: <LineChart size={24} />,
      title: "Trend Forecasting",
      description: "Compare current performance against historical data to accurately forecast busy periods and staff accordingly."
    },
    {
      icon: <FileJson size={24} />,
      title: "Automated End-of-Day",
      description: "Receive comprehensive shift reports, cash tally, and tax summaries directly via email every night."
    },
    {
      icon: <PieChart size={24} />,
      title: "Multi-Outlet Rollups",
      description: "If you run a chain, view aggregate data across all your locations or drill down into individual store performance."
    }
  ];

  const benefits = [
    "Make data-driven menu pricing and engineering decisions",
    "Eliminate time spent manually tallying Excel sheets",
    "Identify and prevent staff discounting fraud",
    "Optimize staff scheduling based on hourly sales trends",
    "Access your restaurant's pulse 24/7 without being on-site"
  ];

  return (
    <ProductFeaturePage 
      title="Analytics & Reporting"
      subtitle="Stop guessing. Get crystal clear, real-time insights into your sales, staff performance, and profitability from anywhere."
      heroColor="#0284c7" // light blue
      features={features}
      benefits={benefits}
      heroVisual={
        <div style={{
          background: "var(--bg-card)",
          borderRadius: "16px",
          padding: "1.5rem",
          boxShadow: "0 25px 50px rgba(2, 132, 199, 0.15)",
          border: "1px solid var(--border-color)",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          transform: "perspective(1000px) rotateY(-5deg)",
          transformOrigin: "center right",
          transition: "transform 0.5s ease"
        }}>
          {/* Top KPI Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div style={{ background: "var(--bg-secondary)", padding: "1rem", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
              <div style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginBottom: "0.5rem" }}>Today's Revenue</div>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                $4,892 <span style={{ fontSize: "0.8rem", color: "#2ecc71", background: "rgba(46, 204, 113, 0.1)", padding: "0.2rem 0.5rem", borderRadius: "100px" }}>+12%</span>
              </div>
            </div>
            <div style={{ background: "var(--bg-secondary)", padding: "1rem", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
              <div style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginBottom: "0.5rem" }}>Total Orders</div>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                314 <span style={{ fontSize: "0.8rem", color: "#2ecc71", background: "rgba(46, 204, 113, 0.1)", padding: "0.2rem 0.5rem", borderRadius: "100px" }}>+8%</span>
              </div>
            </div>
          </div>

          {/* Chart Mockup */}
          <div style={{ background: "var(--bg-secondary)", borderRadius: "12px", padding: "1.5rem", border: "1px solid var(--border-color)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <div style={{ fontWeight: 600 }}>Hourly Sales</div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <span style={{ fontSize: "0.75rem", padding: "0.2rem 0.6rem", background: "var(--bg-primary)", borderRadius: "100px", border: "1px solid var(--border-color)" }}>Dine-in</span>
                <span style={{ fontSize: "0.75rem", padding: "0.2rem 0.6rem", background: "#0284c7", color: "white", borderRadius: "100px" }}>Delivery</span>
              </div>
            </div>
            {/* Fake CSS Bar Chart */}
            <div style={{ display: "flex", alignItems: "flex-end", height: "120px", gap: "0.5rem", paddingBottom: "0.5rem", borderBottom: "1px dashed var(--border-color)" }}>
              <div style={{ width: "100%", height: "40%", background: "color-mix(in srgb, #0284c7 40%, transparent)", borderRadius: "4px 4px 0 0" }} />
              <div style={{ width: "100%", height: "70%", background: "color-mix(in srgb, #0284c7 60%, transparent)", borderRadius: "4px 4px 0 0" }} />
              <div style={{ width: "100%", height: "90%", background: "color-mix(in srgb, #0284c7 80%, transparent)", borderRadius: "4px 4px 0 0" }} />
              <div style={{ width: "100%", height: "100%", background: "#0284c7", borderRadius: "4px 4px 0 0" }} />
              <div style={{ width: "100%", height: "85%", background: "color-mix(in srgb, #0284c7 80%, transparent)", borderRadius: "4px 4px 0 0" }} />
              <div style={{ width: "100%", height: "50%", background: "color-mix(in srgb, #0284c7 50%, transparent)", borderRadius: "4px 4px 0 0" }} />
              <div style={{ width: "100%", height: "30%", background: "color-mix(in srgb, #0284c7 30%, transparent)", borderRadius: "4px 4px 0 0" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem", color: "var(--text-secondary)", fontSize: "0.75rem" }}>
              <span>6 PM</span>
              <span>7 PM</span>
              <span>8 PM</span>
              <span>9 PM</span>
              <span>10 PM</span>
              <span>11 PM</span>
              <span>12 AM</span>
            </div>
          </div>
        </div>
      }
    />
  );
}
