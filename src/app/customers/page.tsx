"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookDemoModal from "@/components/BookDemoModal";
import RegisterRestaurantModal from "@/components/RegisterRestaurantModal";
import FinalCTA from "@/components/FinalCTA";
import { HardHat } from "lucide-react";

export default function CustomersPage() {
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
            Customers
          </h1>
          <p style={{ fontSize: "1.2rem", color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: "3rem" }}>
            We are currently building this dedicated page to showcase our powerful Customers capabilities. 
            Check back soon for comprehensive details, features, and success stories!
          </p>
          <div style={{ padding: "2rem", backgroundColor: "var(--bg-card)", borderRadius: "16px", border: "1px dashed var(--border-color)" }}>
            <h3 style={{ marginBottom: "1rem", fontSize: "1.3rem" }}>In the meantime...</h3>
            <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
              You can explore our core features on the homepage or book a personalized demo to see Customers in action.
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
