"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Comparison from "@/components/Comparison";
import BookDemoModal from "@/components/BookDemoModal";
import RegisterRestaurantModal from "@/components/RegisterRestaurantModal";
import FinalCTA from "@/components/FinalCTA";

export default function CompareLegacyPosPage() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  return (
    <>
      <Navbar 
        onBookDemo={() => setIsDemoModalOpen(true)}
        onRegister={() => setIsRegisterModalOpen(true)}
      />

      <main style={{ minHeight: "100vh", background: "var(--bg-primary)", paddingTop: "8rem", paddingBottom: "5rem" }}>
        <Comparison />
        
        <div style={{ marginTop: "5rem" }}>
          <FinalCTA onBookDemo={() => setIsDemoModalOpen(true)} />
        </div>
      </main>

      <Footer />

      <BookDemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
      <RegisterRestaurantModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
    </>
  );
}
