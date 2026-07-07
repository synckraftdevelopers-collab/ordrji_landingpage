"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problems from "@/components/Problems";
import TrustBar from "@/components/TrustBar";
import OrderJourney from "@/components/OrderJourney";
import Ecosystem from "@/components/Ecosystem";
import ModulesShowcase from "@/components/ModulesShowcase";
import RoleExperience from "@/components/RoleExperience";
import SuccessStories from "@/components/SuccessStories";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import Integrations from "@/components/Integrations";
import BookDemoModal from "@/components/BookDemoModal";
import RegisterRestaurantModal from "@/components/RegisterRestaurantModal";
import FinalCTA from "@/components/FinalCTA";
import InstagramSection from "@/components/InstagramSection";

export default function Home() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  return (
    <>
      {/* Global Navigation */}
      <Navbar 
        onBookDemo={() => setIsDemoModalOpen(true)}
        onRegister={() => setIsRegisterModalOpen(true)}
      />

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
        <InstagramSection />
        <div className="divider" />
        <ModulesShowcase />
        <div className="divider" />
        <Integrations />
        <div className="divider" />

        {/* 4. Restaurant Types & Formats */}
        <Ecosystem />
        <div className="divider" />
        <RoleExperience />
        <div className="divider" />

        {/* 5. Screenshots / Interactive Dashboard Preview — removed */}

        {/* 6. Pricing Preview */}
        <Pricing />
        <div className="divider" />


        {/* 8. Testimonials / Success Stories */}
        <SuccessStories />
        <div className="divider" />

        {/* 11. Book Demo Final CTA */}
        <FinalCTA onBookDemo={() => setIsDemoModalOpen(true)} />

      </main>

      {/* Global Footer */}
      <Footer />

      {/* Book Demo Lead Capture Form Modal */}
      <BookDemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />

      {/* Register Restaurant Modal */}
      <RegisterRestaurantModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
    </>
  );
}
