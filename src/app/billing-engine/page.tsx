import React from "react";
import ProductFeaturePage from "@/components/ProductFeaturePage";
import { Zap, Shield, WifiOff, Scissors, Keyboard } from "lucide-react";

export const metadata = {
  title: "Restaurant Billing Engine & POS | Ordrji",
  description: "Enterprise-grade lightning fast restaurant POS and billing software. Handle complex orders, split bills, and generate invoices with ease."
};

export default function BillingEnginePage() {
  const features = [
    {
      icon: <Zap size={24} />,
      title: "Lightning Fast Checkout",
      description: "Optimized for speed. Ring up orders, apply discounts, and process payments with fewer clicks than any other POS system."
    },
    {
      icon: <WifiOff size={24} />,
      title: "Offline Reliability",
      description: "Internet goes down? Your restaurant doesn't stop. Continue billing locally and sync to the cloud automatically when connection returns."
    },
    {
      icon: <Scissors size={24} />,
      title: "Complex Bill Splitting",
      description: "Split by item, split evenly, or split by custom amounts. Handle groups of any size without causing friction at the checkout counter."
    },
    {
      icon: <Keyboard size={24} />,
      title: "Keyboard Shortcuts",
      description: "Power users can navigate the entire billing interface using keyboard shortcuts, allowing cashiers to blaze through lines."
    },
    {
      icon: <Shield size={24} />,
      title: "Fraud Prevention",
      description: "Track every void, discount, and deleted item with manager PIN overrides to prevent staff pilferage and protect your margins."
    }
  ];

  const benefits = [
    "Cut the time it takes to process an order in half",
    "Never turn away customers because 'the system is down'",
    "Eliminate cashier errors during stressful peak hours",
    "Onboard new staff on the intuitive interface in under 15 minutes",
    "Keep complete control over who can apply discounts and voids"
  ];

  return (
    <ProductFeaturePage 
      title="The Ultimate Billing Engine"
      subtitle="Speed is revenue. Empower your cashiers with an enterprise-grade POS designed to crush lines and eliminate errors, even when the internet goes down."
      heroColor="var(--accent-red)"
      features={features}
      benefits={benefits}
      heroVisual={
        <div style={{
          background: "#1c1c1e",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 30px 60px rgba(0,0,0,0.4), 0 0 0 8px #2c2c2e",
          border: "1px solid #444",
          display: "flex",
          width: "100%",
          maxWidth: "600px",
          height: "400px",
          transform: "perspective(1000px) rotateY(-5deg)",
          transformOrigin: "center right",
          transition: "transform 0.5s ease"
        }}>
          {/* Main POS Area */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "1rem" }}>
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
              <div style={{ background: "var(--accent-red)", color: "white", padding: "0.5rem 1rem", borderRadius: "8px", fontWeight: 700, fontSize: "0.85rem" }}>Burgers</div>
              <div style={{ background: "#333", color: "white", padding: "0.5rem 1rem", borderRadius: "8px", fontWeight: 600, fontSize: "0.85rem" }}>Pizzas</div>
              <div style={{ background: "#333", color: "white", padding: "0.5rem 1rem", borderRadius: "8px", fontWeight: 600, fontSize: "0.85rem" }}>Drinks</div>
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.8rem" }}>
              <div style={{ background: "#2c2c2e", border: "1px solid #444", padding: "1rem", borderRadius: "12px", textAlign: "center" }}>
                <div style={{ height: "40px", background: "#444", borderRadius: "8px", marginBottom: "0.8rem" }}></div>
                <div style={{ color: "#fff", fontWeight: 600, fontSize: "0.85rem" }}>Classic Burger</div>
                <div style={{ color: "var(--accent-red)", fontWeight: 700, fontSize: "0.9rem", marginTop: "0.3rem" }}>$8.99</div>
              </div>
              <div style={{ background: "#2c2c2e", border: "1px solid #444", padding: "1rem", borderRadius: "12px", textAlign: "center" }}>
                <div style={{ height: "40px", background: "#444", borderRadius: "8px", marginBottom: "0.8rem" }}></div>
                <div style={{ color: "#fff", fontWeight: 600, fontSize: "0.85rem" }}>Cheese Burger</div>
                <div style={{ color: "var(--accent-red)", fontWeight: 700, fontSize: "0.9rem", marginTop: "0.3rem" }}>$10.50</div>
              </div>
              <div style={{ background: "#2c2c2e", border: "1px solid #444", padding: "1rem", borderRadius: "12px", textAlign: "center" }}>
                <div style={{ height: "40px", background: "#444", borderRadius: "8px", marginBottom: "0.8rem" }}></div>
                <div style={{ color: "#fff", fontWeight: 600, fontSize: "0.85rem" }}>Veggie Burger</div>
                <div style={{ color: "var(--accent-red)", fontWeight: 700, fontSize: "0.9rem", marginTop: "0.3rem" }}>$9.00</div>
              </div>
              <div style={{ background: "#2c2c2e", border: "1px solid #444", padding: "1rem", borderRadius: "12px", textAlign: "center" }}>
                <div style={{ height: "40px", background: "#444", borderRadius: "8px", marginBottom: "0.8rem" }}></div>
                <div style={{ color: "#fff", fontWeight: 600, fontSize: "0.85rem" }}>Double Smash</div>
                <div style={{ color: "var(--accent-red)", fontWeight: 700, fontSize: "0.9rem", marginTop: "0.3rem" }}>$14.00</div>
              </div>
            </div>
          </div>
          
          {/* Checkout Pane */}
          <div style={{ width: "260px", background: "#2c2c2e", borderLeft: "1px solid #444", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "1rem", borderBottom: "1px solid #444", color: "#fff", fontWeight: 700 }}>Order #4092</div>
            <div style={{ flex: 1, padding: "1rem", color: "#eee", fontSize: "0.9rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                <div>2x Classic Burger</div>
                <div>$17.98</div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                <div>1x Cheese Burger</div>
                <div>$10.50</div>
              </div>
            </div>
            <div style={{ padding: "1rem", borderTop: "1px solid #444", background: "#1c1c1e" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#aaa", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
                <span>Subtotal</span>
                <span>$28.48</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#aaa", fontSize: "0.85rem", marginBottom: "1rem" }}>
                <span>Tax (8%)</span>
                <span>$2.28</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#fff", fontSize: "1.2rem", fontWeight: 800, marginBottom: "1rem" }}>
                <span>Total</span>
                <span>$30.76</span>
              </div>
              <button style={{ width: "100%", background: "var(--accent-red)", color: "white", padding: "1rem", border: "none", borderRadius: "8px", fontWeight: 800, fontSize: "1rem" }}>
                PAY NOW
              </button>
            </div>
          </div>
        </div>
      }
    />
  );
}
