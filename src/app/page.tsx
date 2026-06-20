"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import CommandCenter from "@/components/CommandCenter";
import OrderJourney from "@/components/OrderJourney";
import Ecosystem from "@/components/Ecosystem";
import ModulesShowcase from "@/components/ModulesShowcase";
import RoleExperience from "@/components/RoleExperience";
import Inventory from "@/components/Inventory";
import SuccessStories from "@/components/SuccessStories";
import RoiCalculator from "@/components/RoiCalculator";
import Pricing from "@/components/Pricing";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import BookDemoModal from "@/components/BookDemoModal";

export default function Home() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <>
      {/* Global Navigation */}
      <Navbar onBookDemo={() => setIsDemoModalOpen(true)} />

      {/* Main Sections Stack */}
      <main style={{ minHeight: "100vh" }}>
        {/* Section 1: Hero Visual Center */}
        <Hero onBookDemo={() => setIsDemoModalOpen(true)} />

        {/* Section 2: Format Trust Bar Carousel */}
        <TrustBar />
        <div className="divider" />

        {/* Section 3: Large Centerpiece CommandCenter */}
        <CommandCenter />
        <div className="divider" />

        {/* Section 4: Horizontal Order Journey Storyteller */}
        <OrderJourney />
        <div className="divider" />

        {/* Section 5: Glowing Ecosystem Nodes grid */}
        <Ecosystem />
        <div className="divider" />

        {/* Section 6: Modules Showcase Accordion Panels */}
        <ModulesShowcase />
        <div className="divider" />

        {/* Section 7: Swappable Role Experience preview */}
        <RoleExperience />
        <div className="divider" />

        {/* Section 8: Ingredient Visual stock tracker */}
        <Inventory />
        <div className="divider" />

        {/* Section 12: Mini Restaurant Case Studies */}
        <SuccessStories />
        <div className="divider" />

        {/* Section 13: Adjustable Sliders ROI Calculator */}
        <RoiCalculator />
        <div className="divider" />

        {/* Section 14: SaaS plans yearly/monthly toggle card table */}
        <Pricing />
        <div className="divider" />

        {/* Section 15: Accordion question boards */}
        <Faq />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Book Demo Lead Capture Form Modal */}
      <BookDemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </>
  );
}
