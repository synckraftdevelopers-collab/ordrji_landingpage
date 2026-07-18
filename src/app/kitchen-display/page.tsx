import React from "react";
import ProductFeaturePage from "@/components/ProductFeaturePage";
import { Monitor, Clock, CheckSquare, Bell, Flame } from "lucide-react";

export const metadata = {
  title: "Kitchen Display System (KDS) | Ordrji",
  description: "Digital KDS to streamline back-of-house restaurant operations."
};

export default function KitchenDisplayPage() {
  const features = [
    {
      icon: <Monitor size={24} />,
      title: "Paperless Kitchen",
      description: "Replace messy paper KOTs with clear, digital screens that never get lost or stained."
    },
    {
      icon: <Clock size={24} />,
      title: "Real-time Prep Tracking",
      description: "Track exact preparation times for every dish to identify bottlenecks in your kitchen workflow."
    },
    {
      icon: <Flame size={24} />,
      title: "Station Routing",
      description: "Send appetizers to the pantry, mains to the hot line, and drinks to the bar automatically."
    },
    {
      icon: <CheckSquare size={24} />,
      title: "Bump & Fulfill",
      description: "Chefs can bump items as they are prepped, automatically updating the front-of-house staff."
    },
    {
      icon: <Bell size={24} />,
      title: "Delayed Order Alerts",
      description: "Tickets turn yellow then red if they exceed target prep times, ensuring no table is kept waiting."
    }
  ];

  const benefits = [
    "Dramatically reduce missing orders and mistakes",
    "Improve communication between FOH and BOH staff",
    "Track average ticket times and chef performance",
    "Environmentally friendly paperless operations",
    "Clear visibility into current kitchen load"
  ];

  return (
    <ProductFeaturePage 
      title="Kitchen Display System"
      subtitle="Bring calm to the chaos. Synchronize your front-of-house and kitchen staff with real-time digital ticket management."
      heroColor="var(--accent-green)"
      features={features}
      benefits={benefits}
      heroVisual={
        <div style={{
          background: "#1c1c1e",
          borderRadius: "16px",
          padding: "1.5rem",
          boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
          border: "1px solid #333",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
          transform: "perspective(1000px) rotateY(-5deg)",
          transformOrigin: "center right",
          transition: "transform 0.5s ease"
        }}>
          {/* Ticket 1 */}
          <div style={{ background: "#2c2c2e", borderRadius: "12px", overflow: "hidden", border: "1px solid #444" }}>
            <div style={{ background: "#d9534f", color: "#fff", padding: "0.5rem 1rem", fontWeight: 700, display: "flex", justifyContent: "space-between" }}>
              <span>Table 4 (Dine-in)</span>
              <span>12m</span>
            </div>
            <div style={{ padding: "1rem", color: "#eee", fontSize: "0.95rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", borderBottom: "1px solid #444", paddingBottom: "0.5rem" }}>
                <span>1x Paneer Tikka</span>
                <span style={{ color: "#d9534f", fontWeight: 600 }}>Spicy</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", borderBottom: "1px solid #444", paddingBottom: "0.5rem" }}>
                <span>2x Garlic Naan</span>
                <span></span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>1x Dal Makhani</span>
                <span style={{ color: "#f0ad4e", fontSize: "0.8rem" }}>No butter</span>
              </div>
            </div>
            <div style={{ padding: "0.8rem 1rem", background: "#333", textAlign: "center", color: "#888", fontSize: "0.85rem", fontWeight: 600 }}>
              BUMP TICKET
            </div>
          </div>
          {/* Ticket 2 */}
          <div style={{ background: "#2c2c2e", borderRadius: "12px", overflow: "hidden", border: "1px solid #444" }}>
            <div style={{ background: "#5cb85c", color: "#fff", padding: "0.5rem 1rem", fontWeight: 700, display: "flex", justifyContent: "space-between" }}>
              <span>Zomato #9822</span>
              <span>2m</span>
            </div>
            <div style={{ padding: "1rem", color: "#eee", fontSize: "0.95rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", borderBottom: "1px solid #444", paddingBottom: "0.5rem" }}>
                <span>1x Veg Biryani</span>
                <span></span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>1x Raita</span>
                <span></span>
              </div>
            </div>
            <div style={{ padding: "0.8rem 1rem", background: "#5cb85c", textAlign: "center", color: "#fff", fontSize: "0.85rem", fontWeight: 700, cursor: "pointer" }}>
              MARK READY
            </div>
          </div>
        </div>
      }
    />
  );
}
