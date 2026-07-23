"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Play, MapPin, Compass, Layers } from "lucide-react";
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
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => {
      window.removeEventListener("resize", checkDesktop);
    };
  }, []);

  // Global subtle camera movement
  const globalMouseX = useMotionValue(0.5);
  const globalMouseY = useMotionValue(0.5);
  const smoothGlobalX = useSpring(globalMouseX, { stiffness: 50, damping: 50, mass: 1 });
  const smoothGlobalY = useSpring(globalMouseY, { stiffness: 50, damping: 50, mass: 1 });
  
  const globalRotateY = useTransform(smoothGlobalX, [0, 1], [-2, 2]);
  const globalRotateX = useTransform(smoothGlobalY, [0, 1], [2, -2]);

  const handleGlobalMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!isDesktop) return;
    const x = e.clientX / (typeof window !== "undefined" ? window.innerWidth : 1000);
    const y = e.clientY / (typeof window !== "undefined" ? window.innerHeight : 1000);
    globalMouseX.set(x);
    globalMouseY.set(y);
  };

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
    <section className="hero-section" onMouseMove={handleGlobalMove} style={{ perspective: isDesktop ? "2000px" : "none" }}>
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

      <motion.div 
        className="container hero-content"
        style={{
          rotateX: isDesktop ? globalRotateX : 0,
          rotateY: isDesktop ? globalRotateY : 0,
          transformStyle: isDesktop ? "preserve-3d" : "flat"
        }}
      >
        <div className="hero-grid" style={{ transformStyle: isDesktop ? "preserve-3d" : "flat" }}>
          {/* Headline and CTAs */}
          
          <motion.div 
            className="hero-text-block"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "none" }}
            transition={{ duration: 0.8, staggerChildren: 0.15 }}
          >
            <motion.h1 
              className="hero-title" 
              style={{ fontSize: "clamp(1.9rem, 4.2vw, 3.1rem)", lineHeight: "1.2", letterSpacing: "-1.5px" }}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "none" }}
              transition={{ type: "spring", stiffness: 200, damping: 25, mass: 0.8 }}
            >
              Restaurant POS, Billing, KOT &amp; <br className="hide-mobile" />
              QR Ordering Software <br className="hide-mobile" />
              <span className="gradient-text">for Indian Restaurants</span>
            </motion.h1>

            <motion.p 
              className="hero-subtitle" 
              style={{ fontSize: "1.05rem", lineHeight: "1.6" }}
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "none" }}
              transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.1 }}
            >
              Ordrji helps restaurants, cafes, QSRs, cloud kitchens and bakeries manage billing, kitchen orders, QR ordering, inventory, customer data and reports from one simple system.
            </motion.p>

            <motion.div 
              className="hero-ctas"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.2 }}
            >
              <motion.button 
                whileHover={{ scale: 1.02, y: -2, boxShadow: "0 15px 35px rgba(227,6,19,0.3)" }}
                whileTap={{ scale: 0.97 }}
                onClick={onBookDemo} 
                className="btn-primary btn-red" 
                style={{ padding: "1rem 2.25rem", fontSize: "1.05rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
              >
                Book Free Demo <ArrowRight size={18} />
              </motion.button>
              <motion.a 
                whileHover={{ scale: 1.02, y: -2, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.97 }}
                href="#features" 
                className="btn-secondary" 
                style={{ padding: "1rem 2.25rem", fontSize: "1.05rem", display: "inline-flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}
              >
                <Play size={16} fill="currentColor" /> Watch Product Tour
              </motion.a>
            </motion.div>

            {/* Location Selector Widget */}
            <motion.div 
              className="hero-location-widget"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.3 }}
            >
              <span className="location-widget-label">
              </span>
              <div className="location-search-bar">
                <LocationAutocomplete
                  value={selectedLocName}
                  onChange={async (val, details) => {
                    setSelectedLocName(val);
                    setLocationDetails(details || null);
                    if (details) {
                      try {
                        await fetch("/api/coverage-search", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            query: details.name,
                            type: details.type,
                            stateCode: details.stateCode,
                            result: "covered"
                          })
                        });
                      } catch (err) {
                        console.error("Error logging coverage search:", err);
                      }
                    }
                  }}
                  placeholder="Type your State, District or City to check coverage..."
                />
              </div>

              {locationDetails && (
                <motion.div 
                  className={`location-info-card ${locationDetails.type}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
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
                </motion.div>
              )}
            </motion.div>

            <motion.div 
              className="hero-metrics-summary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="metric-dot">
                <span className="dot pulse-green" /> <span>3,500+ Restaurants Active</span>
              </div>
              <div className="metric-dot">
                <span className="dot pulse-purple" /> <span>99.99% Core Uptime</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Floating hero representation */}
          <motion.div 
            className="hero-visual-block"
            initial={{ opacity: 0, scale: 0.92, filter: "blur(12px)", y: 20 }}
            animate={{ opacity: 1, scale: 1, filter: "none", y: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 22, delay: 0.35 }}
          >
            <motion.div 
              className="chef-image-wrapper"
              whileHover={isDesktop ? { rotateX: 4, rotateY: -4, scale: 1.02 } : { scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              style={{ perspective: isDesktop ? 1000 : undefined, cursor: "pointer" }}
            >
              <Image src="/hero.png?v=2" alt="Ordrji OS Hero" width={480} height={480} className="chef-hero-img" style={{ width: "100%", height: "auto" }} priority unoptimized />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <style jsx global>{`
        .hero-section {
          position: relative;
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          padding: 10.5rem 0 5rem 0;
          overflow: hidden;
          background-color: var(--bg-primary);
        }
        @media (max-width: 768px) {
          .hero-section {
            padding: 8.5rem 0 4rem 0;
          }
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
          position: relative;
          z-index: 20;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .hero-visual-block {
          position: relative;
          z-index: 10;
        }

        @media (max-width: 1023px) {
          .hero-content, .hero-grid {
            transform-style: flat !important;
          }
        }

        @media (max-width: 768px) {
          .hero-text-block {
            align-items: center;
            text-align: center;
          }
          .hero-ctas {
            flex-direction: column !important;
          }
          .hero-ctas > * {
            width: 100%;
            justify-content: center;
          }
          .hero-location-widget {
            text-align: center;
            align-items: center;
            display: flex;
            flex-direction: column;
          }
          .hero-metrics-summary {
            justify-content: center;
          }
          .hide-mobile {
            display: none;
          }
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
        .location-search-bar .autocomplete-input {
          width: 100%;
          background: transparent !important;
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
          padding: 0.5rem 0.8rem;
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--text-primary) !important;
          font-family: inherit;
        }
        .location-search-bar .autocomplete-input::placeholder {
          color: var(--text-muted);
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
        .location-search-bar .autocomplete-input {
          width: 100%;
          background: transparent !important;
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
          padding: 0.5rem 0.8rem;
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--text-primary) !important;
          font-family: inherit;
        }
        .location-search-bar .autocomplete-input::placeholder {
          color: var(--text-muted);
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

        .glass-widget {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 0.6rem 0.8rem;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          z-index: 10;
        }

        .widget-tl {
          top: 10%;
          left: -10%;
        }

        .widget-bl {
          bottom: 15%;
          left: -5%;
        }

        .widget-tr {
          top: 25%;
          right: -15%;
        }

        @media (max-width: 768px) {
          .widget-tl { left: 0; top: 0; }
          .widget-bl { left: 0; bottom: 0; }
          .widget-tr { right: 0; top: 15%; }
          .glass-widget {
            transform: scale(0.85);
          }
        }

        .widget-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          color: white;
        }

        .bg-orange { background-color: var(--accent-orange, #e95505); }
        .bg-green { background-color: var(--accent-green, #10b981); }
        .bg-purple { background-color: var(--accent-purple, #8b5cf6); }

        .widget-text {
          display: flex;
          flex-direction: column;
        }

        .widget-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .widget-sub {
          font-size: 0.7rem;
          color: var(--text-secondary);
        }

      `}</style>
    </section>
  );
}
