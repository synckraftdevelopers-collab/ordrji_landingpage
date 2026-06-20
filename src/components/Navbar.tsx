"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Menu, X, Sparkles } from "lucide-react";

interface NavbarProps {
  onBookDemo: () => void;
}

export default function Navbar({ onBookDemo }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "var(--transition-smooth)",
        background: isScrolled ? "rgba(253, 250, 244, 0.85)" : "transparent",
        backdropFilter: isScrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: isScrolled ? "blur(20px)" : "none",
        borderBottom: isScrolled ? "1px solid var(--border-color)" : "1px solid transparent",
        padding: isScrolled ? "1rem 0" : "1.5rem 0",
      }}
    >
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <a href="#" style={{ display: "flex", alignItems: "center" }}>
          <img 
            src="/logo-icon.jpg" 
            alt="ordrji Logo" 
            style={{ 
              height: "72px", 
              width: "72px",
              objectFit: "contain",
              borderRadius: "10px"
            }} 
          />
        </a>

        {/* Desktop Navigation Links */}
        <nav style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="desktop-nav">
          <a href="#features" className="nav-link">OS Platform</a>
          <a href="#journey" className="nav-link">Order Journey</a>
          <a href="#floor" className="nav-link">Live Floor</a>
          <a href="#crm" className="nav-link">Growth Engine</a>
          <a href="#roi" className="nav-link">ROI Calculator</a>
          <a href="#pricing" className="nav-link">Pricing</a>
        </nav>

        {/* Action Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }} className="desktop-actions">
          <button onClick={onBookDemo} className="btn-secondary" style={{ padding: "0.5rem 1.25rem", fontSize: "0.85rem" }}>
            Book Demo
          </button>
          <a href="https://pos.ordrji.com/login" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: "0.5rem 1.25rem", fontSize: "0.85rem" }}>
            Start Free Trial <ArrowRight size={14} />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            background: "none",
            border: "none",
            color: "var(--text-primary)",
            cursor: "pointer",
            display: "none"
          }}
          className="mobile-menu-btn"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "var(--bg-secondary)",
            borderBottom: "1px solid var(--border-color)",
            padding: "2rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            backdropFilter: "blur(20px)"
          }}
        >
          <a href="#features" onClick={() => setIsMobileMenuOpen(false)}>OS Platform</a>
          <a href="#journey" onClick={() => setIsMobileMenuOpen(false)}>Order Journey</a>
          <a href="#floor" onClick={() => setIsMobileMenuOpen(false)}>Live Floor</a>
          <a href="#crm" onClick={() => setIsMobileMenuOpen(false)}>Growth Engine</a>
          <a href="#roi" onClick={() => setIsMobileMenuOpen(false)}>ROI Calculator</a>
          <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)}>Pricing</a>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onBookDemo();
              }}
              className="btn-secondary"
              style={{ justifyContent: "center" }}
            >
              Book Demo
            </button>
            <a href="https://pos.ordrji.com/login" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ justifyContent: "center" }} onClick={() => setIsMobileMenuOpen(false)}>
              Start Free Trial <ArrowRight size={14} />
            </a>
          </div>
        </div>
      )}

      {/* Embedded styles for desktop vs mobile */}
      <style jsx global>{`
        .nav-link {
          color: var(--text-secondary);
          font-size: 0.9rem;
          font-weight: 500;
          transition: var(--transition-fast);
        }
        .nav-link:hover {
          color: var(--accent-orange);
        }
        @media (max-width: 768px) {
          .desktop-nav, .desktop-actions {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}
