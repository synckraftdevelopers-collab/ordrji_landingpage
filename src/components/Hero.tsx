"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Play, MapPin, Compass, Layers, Sparkles } from "lucide-react";
import LocationAutocomplete from "./LocationAutocomplete";
import { SearchResult } from "@/data/locations";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1600", // Chef cooking
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1600", // Customer scanning QR / dining
  "https://images.unsplash.com/photo-1581349485608-9469926a8e5e?auto=format&fit=crop&q=80&w=1600", // Waiter serving
  "https://images.unsplash.com/photo-1560624052-449f5ddf0c31?auto=format&fit=crop&q=80&w=1600", // Billing / Bar area
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1600"  // Restaurant owner viewing analytics
];

interface HeroProps {
  onBookDemo: () => void;
}

export default function Hero({ onBookDemo }: HeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedLocName, setSelectedLocName] = useState("");
  const [locationDetails, setLocationDetails] = useState<SearchResult | null>(null);

  useEffect(() => {
    // Cinematic background slider interval
    const bgInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);

    return () => {
      clearInterval(bgInterval);
    };
  }, []);

  return (
    <section className="hero-section">
      {/* Cinematic Image Slider with Ken Burns Effect */}
      <div className="hero-slider">
        {HERO_IMAGES.map((img, index) => (
          <div
            key={img}
            className={`hero-slide ${index === currentImageIndex ? "active" : ""}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        <div className="hero-overlay" />
      </div>

      <div className="container hero-content">
        <div className="hero-grid">
          {/* Headline and CTAs */}
          <div className="hero-text-block">

            <h1 className="hero-title" style={{ fontSize: "clamp(1.9rem, 4.2vw, 3.1rem)", lineHeight: "1.2", letterSpacing: "-1.5px" }}>
              Restaurant POS, Billing, KOT &amp; <br className="hide-mobile" />
              QR Ordering Software <br className="hide-mobile" />
              <span className="gradient-text">for Indian Restaurants</span>
            </h1>
            <p className="hero-subtitle" style={{ fontSize: "1.05rem", lineHeight: "1.6" }}>
              Ordrji helps restaurants, cafes, QSRs, cloud kitchens and bakeries manage billing, kitchen orders, QR ordering, inventory, customer data and reports from one simple system.
            </p>

            <div className="hero-ctas">
              <button onClick={onBookDemo} className="btn-primary btn-red" style={{ padding: "1rem 2.25rem", fontSize: "1.05rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                Book Free Demo <ArrowRight size={18} />
              </button>
              <a href="#features" className="btn-secondary" style={{ padding: "1rem 2.25rem", fontSize: "1.05rem", display: "inline-flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
                <Play size={16} fill="currentColor" /> Watch Product Tour
              </a>
            </div>

            {/* Location Selector Widget */}
            <div className="hero-location-widget">
              <span className="location-widget-label">
                <Sparkles size={11} style={{ marginRight: 4 }} /> Coverage & Compliance
              </span>
              <div className="location-search-bar">
                <LocationAutocomplete
                  value={selectedLocName}
                  onChange={(val, details) => {
                    setSelectedLocName(val);
                    setLocationDetails(details || null);
                  }}
                  placeholder="Type your State, District or City to check coverage..."
                />
              </div>

              {locationDetails && (
                <div className={`location-info-card ${locationDetails.type}`}>
                  <div style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start" }}>
                    <div className={`info-card-icon-wrap ${locationDetails.type}`}>
                      {locationDetails.type === "city" ? (
                        <MapPin size={16} />
                      ) : locationDetails.type === "district" ? (
                        <Compass size={16} />
                      ) : (
                        <Layers size={16} />
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 className="info-card-header">
                        Ordrji is fully active in {locationDetails.name}!
                      </h4>
                      <p className="info-card-text">
                        {locationDetails.type === "city" 
                          ? `Complete local POS setup, physical KOT printer routing, and offline billing cache sync are fully supported in ${locationDetails.name} (${locationDetails.stateCode}).`
                          : locationDetails.type === "district"
                          ? `Local field onboarding, training sessions, and 24/7 technical hardware coverage are active across all of ${locationDetails.name} District.`
                          : `Fully compliant with tax guidelines and local GST schemas for the State/UT of ${locationDetails.name}. Remote and local setup partners are active.`
                        }
                      </p>
                      <button
                        onClick={() => {
                          if (typeof window !== "undefined") {
                            sessionStorage.setItem("prefilled_location", `${locationDetails.name}, ${locationDetails.stateCode}`);
                          }
                          onBookDemo();
                        }}
                        className={`location-action-btn ${
                          locationDetails.type === "city" 
                            ? "btn-red" 
                            : locationDetails.type === "district" 
                            ? "btn-blue" 
                            : "btn-purple"
                        }`}
                      >
                        <span>Book {locationDetails.name} Demo</span>
                        <ArrowRight size={13} className="btn-arrow" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="hero-metrics-summary">
              <div className="metric-dot">
                <span className="dot pulse-green" /> <span>3,500+ Restaurants Active</span>
              </div>
              <div className="metric-dot">
                <span className="dot pulse-purple" /> <span>99.99% Core Uptime</span>
              </div>
            </div>
          </div>

          {/* Floating hero representation */}
          <div className="hero-visual-block">
            <div className="chef-image-wrapper">
              <Image src="/hero.png" alt="OrderJi OS Hero" width={480} height={480} className="chef-hero-img" style={{ width: "100%", height: "auto" }} priority />
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .hero-section {
          position: relative;
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          padding: 8rem 0 5rem 0;
          overflow: hidden;
          background-color: var(--bg-primary);
        }

        .hero-slider {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }

        .hero-slide {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          opacity: 0;
          transition: opacity 1.5s ease-in-out;
          transform: scale(1.08);
        }

        .hero-slide.active {
          opacity: 0.35;
          animation: kenburns 7s ease-in-out forwards;
        }

        @keyframes kenburns {
          0% { transform: scale(1.08) translate(0, 0); }
          100% { transform: scale(1.01) translate(-1%, -0.5%); }
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(253, 250, 244, 0.55) 0%,
            rgba(253, 250, 244, 0.75) 60%,
            var(--bg-primary) 100%
          );
          z-index: 1;
        }

        .hero-content {
          position: relative;
          z-index: 10;
          width: 100%;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
        }

        @media (min-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1.1fr 0.9fr;
            gap: 2rem;
          }
        }

        .hero-text-block {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(227, 6, 19, 0.08);
          border: 1px solid rgba(227, 6, 19, 0.2);
          color: var(--text-primary);
          padding: 0.4rem 1rem;
          border-radius: 9999px;
          font-size: 0.85rem;
          font-weight: 500;
          margin-bottom: 1.5rem;
        }

        .hero-title {
          font-size: 2.8rem;
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -2px;
          margin-bottom: 1.5rem;
        }

        @media (min-width: 768px) {
          .hero-title {
            font-size: 4rem;
          }
        }

        .hero-subtitle {
          font-size: 1.1rem;
          line-height: 1.6;
          color: var(--text-secondary);
          max-width: 540px;
          margin-bottom: 2.5rem;
        }

        .hero-ctas {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 3rem;
          width: 100%;
        }

        .hero-metrics-summary {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
        }

        .metric-dot {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: var(--text-secondary);
          font-weight: 600;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
        }

        .pulse-green {
          background-color: var(--accent-green);
          box-shadow: 0 0 8px var(--accent-green);
        }

        .pulse-purple {
          background-color: var(--accent-orange);
          box-shadow: 0 0 8px var(--accent-orange);
        }

        /* Chef Image Wrapper styling */
        .chef-image-wrapper {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          max-width: 480px;
          margin: 0 auto;
        }

        .chef-hero-img {
          width: 100%;
          height: auto;
          border-radius: 20px;
          filter: drop-shadow(0 20px 40px rgba(227, 6, 19, 0.18));
          animation: float 6s ease-in-out infinite;
        }

        /* ── Location Checker Widget Styles ── */
        .hero-location-widget {
          margin-top: 0.5rem;
          margin-bottom: 2rem;
          width: 100%;
          max-width: 540px;
          text-align: left;
        }

        .location-widget-label {
          display: inline-flex;
          align-items: center;
          font-size: 0.74rem;
          font-weight: 800;
          color: var(--accent-orange);
          text-transform: uppercase;
          letter-spacing: 0.8px;
          background: rgba(227, 6, 19, 0.05);
          border: 1px solid rgba(227, 6, 19, 0.12);
          padding: 0.3rem 0.7rem;
          border-radius: 999px;
          margin-bottom: 0.75rem;
        }

        .location-search-bar {
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 0.4rem;
          border-radius: 16px;
          border: 1px solid var(--border-color);
          box-shadow: 0 4px 18px rgba(0,0,0,0.02);
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .location-search-bar:focus-within {
          border-color: rgba(227, 6, 19, 0.22);
          box-shadow: 0 8px 24px rgba(227, 6, 19, 0.06);
        }

        .location-info-card {
          margin-top: 1rem;
          background: var(--bg-card) !important;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 16px;
          padding: 1.5rem;
          animation: widgetSlideDown 0.35s cubic-bezier(0.16, 1, 0.3, 1) both;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid var(--border-color) !important;
          border-left-width: 4px !important;
        }

        .location-info-card.city {
          border-left-color: var(--accent-rose, #dc2626) !important;
          box-shadow: 0 10px 30px -10px rgba(220, 38, 38, 0.08), var(--shadow-card) !important;
        }
        .location-info-card.city:hover {
          box-shadow: 0 12px 36px -8px rgba(220, 38, 38, 0.12), var(--shadow-card) !important;
          border-color: rgba(220, 38, 38, 0.2) !important;
          border-left-color: var(--accent-rose, #dc2626) !important;
        }

        .location-info-card.district {
          border-left-color: var(--accent-blue) !important;
          box-shadow: 0 10px 30px -10px rgba(2, 132, 199, 0.08), var(--shadow-card) !important;
        }
        .location-info-card.district:hover {
          box-shadow: 0 12px 36px -8px rgba(2, 132, 199, 0.12), var(--shadow-card) !important;
          border-color: rgba(2, 132, 199, 0.2) !important;
          border-left-color: var(--accent-blue) !important;
        }

        .location-info-card.state {
          border-left-color: var(--accent-purple) !important;
          box-shadow: 0 10px 30px -10px rgba(124, 58, 237, 0.08), var(--shadow-card) !important;
        }
        .location-info-card.state:hover {
          box-shadow: 0 12px 36px -8px rgba(124, 58, 237, 0.12), var(--shadow-card) !important;
          border-color: rgba(124, 58, 237, 0.2) !important;
          border-left-color: var(--accent-purple) !important;
        }

        @keyframes widgetSlideDown {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .info-card-icon-wrap {
          padding: 0.65rem;
          border-radius: 12px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease;
        }
        .info-card-icon-wrap.city {
          color: var(--accent-rose, #dc2626);
          background: rgba(220, 38, 38, 0.08);
          box-shadow: 0 4px 10px rgba(220, 38, 38, 0.08);
        }
        .info-card-icon-wrap.district {
          color: var(--accent-blue);
          background: rgba(2, 132, 199, 0.08);
          box-shadow: 0 4px 10px rgba(2, 132, 199, 0.08);
        }
        .info-card-icon-wrap.state {
          color: var(--accent-purple);
          background: rgba(124, 58, 237, 0.08);
          box-shadow: 0 4px 10px rgba(124, 58, 237, 0.08);
        }

        .info-card-header {
          font-size: 0.98rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0;
          letter-spacing: -0.2px;
        }

        .info-card-text {
          font-size: 0.85rem;
          line-height: 1.6;
          color: var(--text-secondary);
          margin-top: 0.35rem;
          margin-bottom: 1rem;
        }

        .location-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.55rem 1.35rem;
          font-size: 0.8rem;
          font-weight: 700;
          border-radius: 9999px;
          border: 1px solid transparent;
          cursor: pointer;
          transition: var(--transition-fast);
          color: #ffffff;
        }
        
        .location-action-btn .btn-arrow {
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .location-action-btn:hover .btn-arrow {
          transform: translateX(3px);
        }

        .location-action-btn:hover {
          transform: translateY(-1.5px);
        }

        .location-action-btn.btn-red {
          background-color: var(--accent-rose, #dc2626) !important;
          box-shadow: 0 4px 12px rgba(220, 38, 38, 0.16) !important;
        }
        .location-action-btn.btn-red:hover {
          background-color: #bd040f !important;
          box-shadow: 0 6px 18px rgba(220, 38, 38, 0.28) !important;
        }

        .location-action-btn.btn-blue {
          background-color: var(--accent-blue) !important;
          box-shadow: 0 4px 12px rgba(2, 132, 199, 0.16) !important;
        }
        .location-action-btn.btn-blue:hover {
          background-color: #0274b0 !important;
          box-shadow: 0 6px 18px rgba(2, 132, 199, 0.28) !important;
        }

        .location-action-btn.btn-purple {
          background-color: var(--accent-purple) !important;
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.16) !important;
        }
        .location-action-btn.btn-purple:hover {
          background-color: #6d28d9 !important;
          box-shadow: 0 6px 18px rgba(124, 58, 237, 0.28) !important;
        }
      `}</style>
    </section>
  );
}
