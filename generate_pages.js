const fs = require('fs');
const path = require('path');

const placeholderTemplate = (title) => `"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookDemoModal from "@/components/BookDemoModal";
import RegisterRestaurantModal from "@/components/RegisterRestaurantModal";
import FinalCTA from "@/components/FinalCTA";
import { HardHat } from "lucide-react";

export default function ${title.replace(/[^a-zA-Z]/g, '')}Page() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  return (
    <>
      <Navbar 
        onBookDemo={() => setIsDemoModalOpen(true)}
        onRegister={() => setIsRegisterModalOpen(true)}
      />

      <main style={{ minHeight: "60vh", paddingTop: "140px", paddingBottom: "80px", backgroundColor: "var(--bg-primary)" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem", color: "var(--accent-orange)" }}>
            <HardHat size={64} />
          </div>
          <h1 style={{ fontSize: "3rem", fontWeight: "800", marginBottom: "1.5rem", letterSpacing: "-1px" }}>
            ${title}
          </h1>
          <p style={{ fontSize: "1.2rem", color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: "3rem" }}>
            We are currently building this dedicated page to showcase our powerful ${title} capabilities. 
            Check back soon for comprehensive details, features, and success stories!
          </p>
          <div style={{ padding: "2rem", backgroundColor: "var(--bg-card)", borderRadius: "16px", border: "1px dashed var(--border-color)" }}>
            <h3 style={{ marginBottom: "1rem", fontSize: "1.3rem" }}>In the meantime...</h3>
            <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
              You can explore our core features on the homepage or book a personalized demo to see ${title} in action.
            </p>
            <button 
              onClick={() => setIsDemoModalOpen(true)}
              className="btn-primary btn-red"
              style={{ padding: "0.8rem 2rem", fontSize: "1rem" }}
            >
              Book a Live Demo
            </button>
          </div>
        </div>
      </main>

      <FinalCTA 
        onBookDemo={() => setIsDemoModalOpen(true)}
      />
      <Footer />

      <BookDemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />
      <RegisterRestaurantModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />
    </>
  );
}
`;

const pages = [
  { p: 'src/app/billing-engine', t: 'Billing Engine' },
  { p: 'src/app/qr-order-journey', t: 'QR Order Journey' },
  { p: 'src/app/kitchen-display', t: 'Kitchen Display (KDS)' },
  { p: 'src/app/inventory-control', t: 'Inventory Control' },
  { p: 'src/app/marketing-automation', t: 'Marketing Automation' },
  { p: 'src/app/analytics-suite', t: 'Analytics Suite' },
  { p: 'src/app/solutions/fine-dining', t: 'Fine Dining' },
  { p: 'src/app/solutions/cafes-and-bistros', t: 'Cafes & Bistros' },
  { p: 'src/app/solutions/cloud-kitchens', t: 'Cloud Kitchens' },
  { p: 'src/app/solutions/quick-service-qsr', t: 'Quick Service (QSR)' },
  { p: 'src/app/solutions/franchise-chains', t: 'Franchise Chains' },
  { p: 'src/app/customers', t: 'Customers' }
];

pages.forEach(page => {
  if (!fs.existsSync(page.p)) {
    fs.mkdirSync(page.p, { recursive: true });
  }
  const filePath = path.join(page.p, 'page.tsx');
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, placeholderTemplate(page.t), 'utf8');
    console.log("Created: " + filePath);
  }
});
