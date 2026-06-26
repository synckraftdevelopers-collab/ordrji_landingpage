"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Play, TrendingUp, Users, ClipboardList, AlertTriangle, Layers, ChefHat, Sparkles } from "lucide-react";

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

            <h1 className="hero-title">
              The Restaurant <br />
              <span className="gradient-text">Operating System</span>
            </h1>
            <p className="hero-subtitle">
              A unified dashboard connecting billing, QR ordering, KDS, inventory, and marketing. Blazing fast, commission-free, and built for modern restaurants.
            </p>

            <div className="hero-ctas">
              <a href="https://pos.ordrji.com/login" target="_blank" rel="noopener noreferrer" className="btn-primary btn-red" style={{ padding: "1rem 2.25rem", fontSize: "1.05rem" }}>
                Start Free Trial <ArrowRight size={18} />
              </a>
              <button onClick={onBookDemo} className="btn-secondary" style={{ padding: "1rem 2.25rem", fontSize: "1.05rem" }}>
                <Play size={16} fill="currentColor" /> Book Demo
              </button>
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
              <img src="/hero.png" alt="OrderJi OS Hero" className="chef-hero-img" />
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
