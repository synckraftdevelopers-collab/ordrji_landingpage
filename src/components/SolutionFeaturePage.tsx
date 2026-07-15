"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustBar from "@/components/TrustBar";
import FinalCTA from "@/components/FinalCTA";
import BookDemoModal from "@/components/BookDemoModal";
import RegisterRestaurantModal from "@/components/RegisterRestaurantModal";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Image from "next/image";

export interface SolutionFeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface SolutionFeaturePageProps {
  title: string;
  subtitle: string;
  heroImage: string;
  heroColor?: string;
  features: SolutionFeatureItem[];
  benefits: string[];
}

export default function SolutionFeaturePage({
  title,
  subtitle,
  heroImage,
  heroColor = "var(--accent-orange)",
  features,
  benefits
}: SolutionFeaturePageProps) {
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
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "1fr 1fr", 
            gap: "4rem", 
            alignItems: "center",
            maxWidth: "1200px",
            margin: "0 auto"
          }} className="solution-hero-grid">
            
            <div className="solution-text-col">
              <div style={{ 
                display: "inline-block", 
                padding: "0.4rem 1rem", 
                borderRadius: "100px", 
                background: `color-mix(in srgb, ${heroColor} 12%, transparent)`,
                color: heroColor,
                fontWeight: 600,
                fontSize: "0.9rem",
                marginBottom: "1.5rem",
                border: `1px solid color-mix(in srgb, ${heroColor} 30%, transparent)`
              }}>
                Industry Solutions
              </div>
              
              <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-1px", marginBottom: "1.5rem" }}>
                {title}
              </h1>
              <p style={{ fontSize: "1.2rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "2.5rem" }}>
                {subtitle}
              </p>
              
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }} className="solution-buttons">
                <button 
                  onClick={() => setIsDemoModalOpen(true)} 
                  className="btn-primary"
                  style={{ backgroundColor: heroColor, padding: "1rem 2rem", fontSize: "1.1rem" }}
                >
                  Book a Demo <ArrowRight size={18} style={{ marginLeft: "0.5rem" }} />
                </button>
              </div>
            </div>

            <div className="solution-visual-col" style={{ position: "relative", height: "450px", borderRadius: "24px", overflow: "hidden", border: "1px solid var(--border-color)", boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}>
              <Image 
                src={heroImage} 
                alt={title}
                fill
                style={{ objectFit: "cover" }}
                priority
              />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top right, color-mix(in srgb, ${heroColor} 40%, transparent), transparent)` }} />
            </div>

          </div>
        </div>

        {/* Inline styles for responsive stacking */}
        <style dangerouslySetInnerHTML={{__html: `
          @media (max-width: 900px) {
            .solution-hero-grid { grid-template-columns: 1fr !important; text-align: center; }
            .solution-buttons { justify-content: center; }
            .solution-visual-col { height: 300px !important; margin-top: 2rem; }
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
            <h2 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "1rem" }}>Tailored for your operations</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem" }}>Specific tools built for the way you run your business.</p>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
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
          <div style={{ maxWidth: "900px", margin: "0 auto", background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "24px", padding: "4rem" }} className="benefits-card">
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, marginBottom: "2rem", textAlign: "center" }}>Why choose Ordrji?</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
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
        <style dangerouslySetInnerHTML={{__html: `
          @media (max-width: 600px) {
            .benefits-card { padding: 2rem !important; }
          }
        `}} />
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
