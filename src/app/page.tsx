"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problems from "@/components/Problems";
import TrustBar from "@/components/TrustBar";
import CommandCenter from "@/components/CommandCenter";
import OrderJourney from "@/components/OrderJourney";
import Ecosystem from "@/components/Ecosystem";
import ModulesShowcase from "@/components/ModulesShowcase";
import RoleExperience from "@/components/RoleExperience";
import Inventory from "@/components/Inventory";
import SuccessStories from "@/components/SuccessStories";
import Pricing from "@/components/Pricing";
import Comparison from "@/components/Comparison";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Integrations from "@/components/Integrations";
import BookDemoModal from "@/components/BookDemoModal";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <>
      {/* Global Navigation */}
      <Navbar onBookDemo={() => setIsDemoModalOpen(true)} />

      {/* Main Sections Stack */}
      <main style={{ minHeight: "100vh" }}>
        
        {/* 1. Hero Visual Center */}
        <Hero onBookDemo={() => setIsDemoModalOpen(true)} />
        <div className="divider" />

        {/* 2. Problems: Why traditional POS fails */}
        <Problems />
        <div className="divider" />

        {/* 3. Features Overview & Operations */}
        <TrustBar />
        <div className="divider" />
        <OrderJourney />
        <div className="divider" />
        <ModulesShowcase />
        <div className="divider" />
        <Inventory />
        <div className="divider" />
        <Integrations />
        <div className="divider" />

        {/* 4. Restaurant Types & Formats */}
        <Ecosystem />
        <div className="divider" />
        <RoleExperience />
        <div className="divider" />

        {/* 5. Screenshots / Interactive Dashboard Preview */}
        <CommandCenter />
        <div className="divider" />

        {/* 6. Pricing Preview */}
        <Pricing />
        <div className="divider" />

        {/* 7. Comparison: Ordrji vs Legacy POS */}
        <Comparison />
        <div className="divider" />

        {/* 8. Testimonials / Success Stories */}
        <SuccessStories />
        <div className="divider" />

        {/* 9. FAQ Accordions */}
        <Faq />
        <div className="divider" />

        {/* 10. Book Demo Final CTA */}
        <FinalCTA onBookDemo={() => setIsDemoModalOpen(true)} />

      </main>

      {/* Global Footer */}
      <Footer />

      {/* Book Demo Lead Capture Form Modal */}
      <BookDemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </>
  );
}
