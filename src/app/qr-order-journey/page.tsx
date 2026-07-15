import React from "react";
import ProductFeaturePage from "@/components/ProductFeaturePage";
import { QrCode, Smartphone, Paintbrush, BellRing, Sparkles } from "lucide-react";

export const metadata = {
  title: "QR Code Ordering | Ordrji",
  description: "Seamless contactless dining. Let your guests scan, order, and pay right from their phones without downloading any apps."
};

export default function QrOrderJourneyPage() {
  const features = [
    {
      icon: <QrCode size={24} />,
      title: "No App Required",
      description: "Guests simply point their phone camera at the table QR code and the beautiful digital menu opens instantly in their browser."
    },
    {
      icon: <Paintbrush size={24} />,
      title: "Gorgeous Digital Menus",
      description: "Showcase high-quality photos of your dishes, detailed descriptions, and allergen tags to entice customers to order more."
    },
    {
      icon: <BellRing size={24} />,
      title: "Waiter Calling System",
      description: "Guests can request a waiter, ask for water, or ask for the bill with a single tap on their phone, notifying staff immediately."
    },
    {
      icon: <Sparkles size={24} />,
      title: "Smart Upselling",
      description: "The system automatically suggests complementary items, like 'Add fries for $2' when a burger is selected, boosting average ticket size."
    },
    {
      icon: <Smartphone size={24} />,
      title: "Instant Digital Payments",
      description: "Integrate Apple Pay, Google Pay, and UPI so customers can split the bill and checkout from their seats without waiting for a server."
    }
  ];

  const benefits = [
    "Increase average order value by 20% with mouth-watering photos",
    "Turn tables 15 minutes faster by eliminating waiting for the bill",
    "Run your dining room with fewer front-of-house staff",
    "Never worry about reprinting paper menus when prices change",
    "Collect valuable guest data and feedback automatically"
  ];

  return (
    <ProductFeaturePage 
      title="Contactless Order & Pay"
      subtitle="Scan. Order. Pay. Enjoy. Provide a seamless dining experience where guests can browse rich menus, customize meals, and checkout instantly."
      heroColor="var(--accent-orange)"
      features={features}
      benefits={benefits}
      heroVisual={
        <div style={{
          width: "300px",
          height: "600px",
          background: "var(--bg-card)",
          borderRadius: "40px",
          boxShadow: "0 25px 50px rgba(0,0,0,0.2), inset 0 0 0 8px #111",
          border: "2px solid #333",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
          transform: "perspective(1000px) rotateY(-10deg) rotateX(5deg)",
          transformOrigin: "center right",
          transition: "transform 0.5s ease"
        }}>
          {/* Phone Notch */}
          <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "120px", height: "30px", background: "#111", borderBottomLeftRadius: "16px", borderBottomRightRadius: "16px", zIndex: 10 }} />
          
          {/* Mobile Screen Content */}
          <div style={{ flex: 1, background: "var(--bg-primary)", paddingTop: "40px", display: "flex", flexDirection: "column" }}>
            
            {/* Restaurant Header */}
            <div style={{ padding: "1rem", textAlign: "center", borderBottom: "1px solid var(--border-color)" }}>
              <div style={{ fontWeight: 800, fontSize: "1.2rem", color: "var(--accent-orange)" }}>Ordrji Cafe</div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Table 12</div>
            </div>

            {/* Menu Items */}
            <div style={{ padding: "1rem", flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", gap: "1rem", background: "var(--bg-card)", padding: "0.8rem", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
                <div style={{ width: "70px", height: "70px", background: "var(--bg-secondary)", borderRadius: "8px" }}></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>Truffle Pasta</div>
                  <div style={{ color: "var(--accent-orange)", fontWeight: 700, fontSize: "0.9rem", margin: "0.3rem 0" }}>$18.50</div>
                  <button style={{ background: "var(--bg-secondary)", border: "none", padding: "0.3rem 1rem", borderRadius: "100px", fontSize: "0.8rem", fontWeight: 600 }}>+ Add</button>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem", background: "var(--bg-card)", padding: "0.8rem", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
                <div style={{ width: "70px", height: "70px", background: "var(--bg-secondary)", borderRadius: "8px" }}></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>Burrata Salad</div>
                  <div style={{ color: "var(--accent-orange)", fontWeight: 700, fontSize: "0.9rem", margin: "0.3rem 0" }}>$14.00</div>
                  <button style={{ background: "var(--accent-orange)", color: "white", border: "none", padding: "0.3rem 1rem", borderRadius: "100px", fontSize: "0.8rem", fontWeight: 600 }}>1 added</button>
                </div>
              </div>
            </div>

            {/* Floating Cart Bottom Bar */}
            <div style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border-color)", padding: "1.2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>1 item</div>
                <div style={{ fontWeight: 800, fontSize: "1.1rem" }}>$14.00</div>
              </div>
              <button style={{ background: "var(--accent-orange)", color: "white", padding: "0.8rem 1.5rem", borderRadius: "100px", fontWeight: 700, border: "none", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                View Cart
              </button>
            </div>
          </div>
        </div>
      }
    />
  );
}
