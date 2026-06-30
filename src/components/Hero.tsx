"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Play, MapPin } from "lucide-react";
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
            <div className="hero-location-widget" style={{ marginTop: "0rem", marginBottom: "2rem", width: "100%", maxWidth: "540px" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "0.6rem", display: "block" }}>
                📍 Check compliance & support coverage in your city:
              </label>
              <div style={{ background: "rgba(255, 255, 255, 0.45)", backdropFilter: "blur(8px)", padding: "0.45rem", borderRadius: "14px", border: "1px solid var(--border-color)", display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <LocationAutocomplete
                  value={selectedLocName}
                  onChange={(val, details) => {
                    setSelectedLocName(val);
                    setLocationDetails(details || null);
                  }}
                  placeholder="Select or type your State, District or City..."
                />
              </div>

              {locationDetails && (
                <div
                  className="location-info-card"
                  style={{
                    marginTop: "0.75rem",
                    background: "rgba(253, 250, 244, 0.98)",
                    border: "1px solid rgba(227, 6, 19, 0.2)",
                    borderRadius: "12px",
                    padding: "1rem",
                    boxShadow: "0 8px 24px rgba(227, 6, 19, 0.06)",
                  }}
                >
                  <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                    <div style={{ color: "var(--accent-orange)", background: "rgba(227,6,19,0.06)", padding: "0.45rem", borderRadius: 8, flexShrink: 0 }}>
                      <MapPin size={16} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: "0.92rem", fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
                        Ordrji is fully active in {locationDetails.name}!
                      </h4>
                      <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginTop: "0.25rem", marginBottom: "0.75rem", lineHeight: 1.45 }}>
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
                        className="btn-primary btn-red"
                        style={{ padding: "0.45rem 1rem", fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}
                      >
                        Book {locationDetails.name} Demo <ArrowRight size={13} />
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
      `}</style>
    </section>
  );
}
