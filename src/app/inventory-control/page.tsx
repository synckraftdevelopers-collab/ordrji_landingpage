import React from "react";
import ProductFeaturePage from "@/components/ProductFeaturePage";
import { Package, Scale, AlertTriangle, FileSpreadsheet, PieChart, Truck } from "lucide-react";

export const metadata = {
  title: "Inventory Control | Ordrji",
  description: "Manage recipes, track food costs, and prevent pilferage."
};

export default function InventoryControlPage() {
  const features = [
    {
      icon: <Scale size={24} />,
      title: "Recipe Management",
      description: "Map raw ingredients to menu items to automatically deduct precise quantities when a dish is sold."
    },
    {
      icon: <AlertTriangle size={24} />,
      title: "Low Stock Alerts",
      description: "Get notified via SMS or app notification when critical ingredients fall below par levels."
    },
    {
      icon: <FileSpreadsheet size={24} />,
      title: "Purchase Orders",
      description: "Generate and send purchase orders directly to your vendors from within the dashboard."
    },
    {
      icon: <PieChart size={24} />,
      title: "Food Cost Analytics",
      description: "Track theoretical vs actual food costs to identify exactly where you are losing money."
    },
    {
      icon: <Truck size={24} />,
      title: "Vendor Management",
      description: "Keep track of vendor pricing, delivery histories, and outstanding payables in one place."
    }
  ];

  const benefits = [
    "Reduce food waste and unexplained variance by up to 5%",
    "Stop stockouts before they affect the customer experience",
    "Automate the tedious manual stock-taking process",
    "Protect profit margins with accurate food cost tracking",
    "Maintain centralized control across multiple outlets"
  ];

  return (
    <ProductFeaturePage 
      title="Smart Inventory Control"
      subtitle="Stop leaking profits. Gain complete visibility into your stock, recipes, and vendor purchases to maintain perfect margins."
      heroColor="var(--accent-blue)"
      features={features}
      benefits={benefits}
      heroVisual={
        <div style={{
          background: "var(--bg-card)",
          borderRadius: "16px",
          padding: "1.5rem",
          boxShadow: "0 25px 50px rgba(0,0,0,0.1)",
          border: "1px solid var(--border-color)",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          transform: "perspective(1000px) rotateY(-5deg)",
          transformOrigin: "center right",
          transition: "transform 0.5s ease"
        }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>Stock Alerts</h3>
            <span style={{ background: "#f8d7da", color: "#721c24", padding: "0.3rem 0.8rem", borderRadius: "100px", fontSize: "0.8rem", fontWeight: 700 }}>2 Critical</span>
          </div>

          {/* List items */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", background: "var(--bg-secondary)", borderRadius: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ width: "40px", height: "40px", background: "#f8d7da", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#721c24", fontWeight: 700 }}>TO</div>
              <div>
                <div style={{ fontWeight: 600 }}>Fresh Tomatoes</div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Vendor: FarmFresh Co.</div>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: "#d9534f", fontWeight: 700 }}>2.4 kg</div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Par level: 10 kg</div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem", background: "var(--bg-secondary)", borderRadius: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ width: "40px", height: "40px", background: "#fff3cd", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#856404", fontWeight: 700 }}>MO</div>
              <div>
                <div style={{ fontWeight: 600 }}>Mozzarella Cheese</div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Vendor: Dairy Direct</div>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: "#f0ad4e", fontWeight: 700 }}>5.1 kg</div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Par level: 8 kg</div>
            </div>
          </div>

          <button style={{ width: "100%", padding: "1rem", background: "var(--accent-blue)", color: "#fff", borderRadius: "12px", border: "none", fontWeight: 600, marginTop: "0.5rem" }}>
            Auto-Generate Purchase Orders
          </button>
        </div>
      }
    />
  );
}
