"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookDemoModal from "@/components/BookDemoModal";
import RegisterRestaurantModal from "@/components/RegisterRestaurantModal";

interface NavbarWrapperProps {
  children: React.ReactNode;
}

export default function NavbarWrapper({ children }: NavbarWrapperProps) {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  // Bind clicks on any button with .open-demo-btn class
  useEffect(() => {
    const handleButtonClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.classList.contains("open-demo-btn") || target.closest(".open-demo-btn"))) {
        e.preventDefault();
        setIsDemoModalOpen(true);
      }
    };
    
    document.addEventListener("click", handleButtonClick);
    return () => document.removeEventListener("click", handleButtonClick);
  }, []);

  return (
    <>
      {/* Global sticky header */}
      <Navbar onBookDemo={() => setIsDemoModalOpen(true)} onRegister={() => setIsRegisterModalOpen(true)} />

      {/* Main page content layout */}
      {children}

      {/* Global footer */}
      <Footer />

      {/* Floating Book Demo Lead capture form modal */}
      <BookDemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />

      {/* Register Restaurant Modal */}
      <RegisterRestaurantModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />

      <style jsx global>{`
        .seo-hero {
          position: relative;
          padding: 8rem 0 5rem;
          background: var(--bg-primary);
          overflow: hidden;
          border-bottom: 1px solid var(--border-color);
        }

        .seo-hero-container {
          position: relative;
          z-index: 2;
          max-width: 800px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .seo-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          background: rgba(227, 6, 19, 0.06);
          border: 1px solid rgba(227, 6, 19, 0.18);
          color: var(--accent-orange);
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.7rem;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .seo-title {
          font-size: clamp(2.1rem, 5vw, 3.2rem);
          font-weight: 900;
          line-height: 1.15;
          letter-spacing: -2px;
          margin-top: 0.75rem;
          margin-bottom: 1.25rem;
        }

        .seo-subtitle {
          font-size: 1.1rem;
          line-height: 1.65;
          color: var(--text-secondary);
          max-width: 600px;
          margin-bottom: 2.5rem;
        }

        .seo-hero-ctas {
          display: flex;
          gap: 1rem;
          margin-bottom: 3.5rem;
        }

        .seo-features-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem 1.5rem;
          max-width: 720px;
        }

        .seo-feature-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        /* Widgets styling */
        .widget-section {
          padding: 6rem 0;
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border-color);
        }

        .comp-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 1.5rem;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 1.1rem 1.4rem;
          align-items: center;
        }

        .comp-lbl {
          font-weight: 700;
          font-size: 0.9rem;
          color: var(--text-primary);
        }

        .comp-val-ordrji, .comp-val-legacy {
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .comp-val-ordrji {
          color: var(--text-primary);
          font-weight: 600;
        }

        .comp-val-legacy {
          color: var(--text-secondary);
        }

        @media (max-width: 640px) {
          .comp-row {
            grid-template-columns: 1fr !important;
            gap: 0.5rem !important;
          }
          .comp-val-ordrji::before { content: "Ordrji: "; font-weight: 800; font-size: 0.72rem; color: var(--accent-orange); }
          .comp-val-legacy::before { content: "Legacy: "; font-weight: 800; font-size: 0.72rem; color: var(--text-muted); }
        }

        @media (min-width: 768px) {
          .local-grid {
            grid-template-columns: 1.1fr 0.9fr !important;
            align-items: start;
          }
        }

        /* Pricing teaser card */
        .pricing-teaser-section {
          padding: 6rem 0;
          background: var(--bg-primary);
          border-bottom: 1px solid var(--border-color);
        }

        .pricing-teaser-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 24px;
          padding: 3.5rem 2rem;
          text-align: center;
          box-shadow: 0 10px 30px rgba(90,80,70,0.015);
        }

        .teaser-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          margin-top: 2.5rem;
        }

        @media (min-width: 640px) {
          .teaser-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 1.5rem !important;
          }
        }

        .teaser-item {
          padding: 1.5rem 1rem;
          border: 1px dashed var(--border-color);
          border-radius: 12px;
          background: rgba(0,0,0,0.005);
        }

        /* Accordion summaries style */
        .faq-details summary::-webkit-details-marker {
          display: none;
        }
        .faq-details-arrow {
          transition: transform 0.2s;
          font-weight: 700;
          color: var(--text-muted);
        }
        .faq-details[open] .faq-details-arrow {
          transform: rotate(180deg);
          color: var(--accent-orange);
        }
      `}</style>
    </>
  );
}
