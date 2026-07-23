"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustBar from "@/components/TrustBar";
import FinalCTA from "@/components/FinalCTA";
import BookDemoModal from "@/components/BookDemoModal";
import RegisterRestaurantModal from "@/components/RegisterRestaurantModal";
import { CheckCircle2, ArrowRight } from "lucide-react";

export interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface ProductFeaturePageProps {
  title: string;
  subtitle: string;
  heroIcon?: React.ReactNode;
  heroVisual?: React.ReactNode;
  heroColor?: string; // e.g. "var(--accent-red)"
  features: FeatureItem[];
  benefits: string[];
}

export default function ProductFeaturePage({
  title,
  subtitle,
  heroIcon,
  heroVisual,
  heroColor = "var(--accent-rose)",
  features,
  benefits
}: ProductFeaturePageProps) {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <Navbar 
        onBookDemo={() => setIsDemoModalOpen(true)}
        onRegister={() => setIsRegisterModalOpen(true)}
      />

      {/* Hero Section */}
      <main style={{ paddingTop: "140px", paddingBottom: "80px", overflow: "hidden" }}>
        <div className="container">
          <div 
            className={`pf-hero-grid ${!heroVisual ? "no-visual" : ""}`}
            style={{ 
              alignItems: "center",
              margin: "0 auto",
            }}
          >
            <div className="hero-text-col">
              {heroIcon && !heroVisual && (
                <div style={{ 
                  display: "inline-flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  width: "80px", 
                  height: "80px", 
                  borderRadius: "24px", 
                  background: `color-mix(in srgb, ${heroColor} 12%, transparent)`,
                  color: heroColor,
                  marginBottom: "2rem"
                }}>
                  {heroIcon}
                </div>
              )}
              
              <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-1px", marginBottom: "1.5rem" }}>
                {title}
              </h1>
              <p style={{ fontSize: "1.2rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "2.5rem" }}>
                {subtitle}
              </p>
              
              <div style={{ display: "flex", gap: "1rem", justifyContent: heroVisual ? "flex-start" : "center", flexWrap: "wrap" }}>
                <button 
                  onClick={() => setIsDemoModalOpen(true)} 
                  className="btn-primary"
                  style={{ backgroundColor: heroColor, padding: "1rem 2rem", fontSize: "1.1rem" }}
                >
                  Book a Demo <ArrowRight size={18} style={{ marginLeft: "0.5rem" }} />
                </button>
              </div>
            </div>

            {heroVisual && (
              <div className="hero-visual-col" style={{ display: "flex", justifyContent: "center", position: "relative" }}>
                {/* Optional glow behind visual */}
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "120%", height: "120%", background: `radial-gradient(circle, color-mix(in srgb, ${heroColor} 15%, transparent) 0%, transparent 70%)`, zIndex: 0 }} />
                <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
                  {heroVisual}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Inline styles for responsive stacking */}
        <style dangerouslySetInnerHTML={{__html: `
          .pf-hero-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            max-width: 1200px;
            text-align: left;
            transition: all 0.3s ease;
          }
          .pf-hero-grid.no-visual {
            grid-template-columns: 1fr;
            max-width: 800px;
            text-align: center;
          }
          @media (max-width: 900px) {
            .pf-hero-grid {
              grid-template-columns: 1fr !important;
              gap: 2.5rem !important;
              text-align: center !important;
            }
            .hero-text-col { text-align: center; }
            .hero-text-col > div { justify-content: center !important; }
            .hero-visual-col {
              margin-top: 1.5rem;
              width: 100%;
              max-width: 480px;
              margin-left: auto;
              margin-right: auto;
            }
            /* Flatten 3D perspective transforms on mobile to avoid layout clipping */
            .hero-visual-col > div {
              transform: none !important;
              max-width: 100% !important;
              margin: 0 auto !important;
            }
            /* Make double columns inside visual mockups stack vertically on mobile */
            .hero-visual-col div[style*="grid-template-columns: 1fr 1fr"],
            .hero-visual-col div[style*="grid-template-columns:1fr 1fr"] {
              grid-template-columns: 1fr !important;
            }
          }
          @media (max-width: 600px) {
            .hero-visual-col {
              transform: scale(0.9);
              transform-origin: top center;
              margin-bottom: -40px; /* offset scale vertical shift */
            }
            /* Hide the right-side Checkout Pane inside the POS dashboard on small screens */
            .hero-visual-col div[style*="width: 260px"],
            .hero-visual-col div[style*="width:260px"] {
              display: none !important;
            }
            /* Re-grid the POS items from 3 columns to 2 columns on small screens */
            .hero-visual-col div[style*="grid-template-columns: 1fr 1fr 1fr"],
            .hero-visual-col div[style*="grid-template-columns:1fr 1fr 1fr"] {
              grid-template-columns: 1fr 1fr !important;
            }
          }
          @media (max-width: 420px) {
            .hero-visual-col {
              transform: scale(0.8);
              transform-origin: top center;
              margin-bottom: -80px;
            }
            .pf-benefits-card {
              padding: 2rem 1.5rem !important;
            }
            .pf-benefits-card h2 {
              font-size: 1.8rem !important;
              margin-bottom: 1.5rem !important;
            }
          }
          @media (max-width: 350px) {
            .hero-visual-col {
              transform: scale(0.72);
              transform-origin: top center;
              margin-bottom: -110px;
            }
          }
        `}} />
      </main>

      {/* TrustBar Integration */}
      <div style={{ paddingBottom: "4rem" }}>
        <TrustBar />
      </div>

      {/* Core Features Grid */}
      <section style={{ padding: "6rem 0", background: "var(--bg-secondary)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "1rem" }}>Core Capabilities</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem" }}>Everything you need to run your operations smoothly.</p>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
            {features.map((f, i) => (
              <div key={i} style={{ 
                background: "var(--bg-card)", 
                padding: "2.5rem 2rem", 
                borderRadius: "20px", 
                border: "1px solid var(--border-color)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.02)"
              }}>
                <div style={{ 
                  display: "inline-flex", 
                  padding: "0.8rem", 
                  borderRadius: "12px", 
                  background: `color-mix(in srgb, ${heroColor} 10%, transparent)`,
                  color: heroColor,
                  marginBottom: "1.5rem"
                }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "1rem" }}>{f.title}</h3>
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Benefits List */}
      <section style={{ padding: "6rem 0", background: "var(--bg-primary)" }}>
        <div className="container">
          <div className="pf-benefits-card" style={{ maxWidth: "900px", margin: "0 auto", background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "24px", padding: "4rem" }}>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, marginBottom: "2rem", textAlign: "center" }}>Why choose Ordrji for this?</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
              {benefits.map((benefit, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                  <CheckCircle2 color={heroColor} size={24} style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span style={{ fontSize: "1.1rem", color: "var(--text-primary)", fontWeight: 500, lineHeight: 1.5 }}>
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FinalCTA onBookDemo={() => setIsDemoModalOpen(true)} />
      
      <Footer />

      <BookDemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />
      <RegisterRestaurantModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />
    </div>
  );
}
