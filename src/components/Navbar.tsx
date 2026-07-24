"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Menu, X, ChevronDown, Search } from "lucide-react";
import SearchRestaurantModal from "./SearchRestaurantModal";

interface NavbarProps {
  onBookDemo?: () => void;
  onRegister?: () => void;
}

export default function Navbar({ onBookDemo }: NavbarProps) {
  const pathname = usePathname();
  const [isScrolled,        setIsScrolled]        = useState(false);
  const [isMobileMenuOpen,  setIsMobileMenuOpen]  = useState(false);
  const [isMobileResourcesOpen, setIsMobileResourcesOpen] = useState(false);
  const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  useEffect(() => {
    const handleClose = () => setIsDesktopDropdownOpen(false);
    window.addEventListener("click", handleClose);
    return () => window.removeEventListener("click", handleClose);
  }, []);

  /* ── Posiflex intro: logo starts centered, flies to top-left ── */
  const [introPhase, setIntroPhase] = useState<"center" | "move" | "done">("done");

  useEffect(() => {
    if (pathname !== "/") {
      const raf = requestAnimationFrame(() => setIntroPhase("done"));
      return () => cancelAnimationFrame(raf);
    }
    const raf = requestAnimationFrame(() => setIntroPhase("center"));
    // phase 1: logo sits centered for 900ms
    const t1 = setTimeout(() => setIntroPhase("move"),  900);
    // phase 2: after transition completes, lock to normal navbar
    const t2 = setTimeout(() => setIntroPhase("done"), 1700);
    return () => { cancelAnimationFrame(raf); clearTimeout(t1); clearTimeout(t2); };
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navBg    = isScrolled ? "rgba(253, 250, 244, 0.95)" : "transparent";
  const navBlur  = isScrolled ? "blur(20px)" : "none";
  const navBorder= isScrolled ? "1px solid var(--border-color)" : "1px solid transparent";
  const navPad   = isScrolled ? "0.4rem 0" : "0.75rem 0";

  /* nav links hidden during intro center phase */
  const linksVisible = introPhase !== "center";

  return (
    <>
      {/* ── INTRO OVERLAY — full-screen centered logo ───────────────────
          Visible only during "center" phase on homepage. Fades out once logo moves. */}
      {pathname === "/" && introPhase !== "done" && (
        <div
          className={`pf-intro-overlay ${introPhase === "move" ? "pf-overlay-out" : ""}`}
          aria-hidden
        />
      )}

      <header
        className={`pf-header ${introPhase === "done" ? "pf-header-settled" : ""}`}
        style={{
          background:     navBg,
          backdropFilter: navBlur,
          WebkitBackdropFilter: navBlur,
          borderBottom:   navBorder,
          padding:        navPad,
        }}
      >
        <div className="container pf-nav-inner">

          {/* ── LOGO ──────────────────────────────────────────────────── */}
          {/* During "center" phase it renders in normal flow but is made
              invisible; the ::before pseudo-overlay shows the centered logo.
              We use a separate absolutely-positioned element for the animation. */}
          {/* Logo Placeholder to reserve space and prevent layout shifts during intro animation */}
          {introPhase !== "done" && (
            <div
              className="pf-logo-placeholder"
              style={{
                width: "120px",
                height: "120px",
                flexShrink: 0,
                visibility: "hidden"
              }}
            />
          )}

          <Link
            href="/"
            className={`pf-logo-link ${introPhase}`}
            aria-label="Ordrji Home"
          >
            <Image
              src="/logo-icon.jpg"
              alt="Ordrji"
              width={384}
              height={384}
              className="pf-logo-img"
              priority
            />
          </Link>

          {/* ── DESKTOP NAV ───────────────────────────────────────────── */}
          <nav
            className={`pf-nav ${linksVisible ? "pf-nav-visible" : "pf-nav-hidden"}`}
            aria-label="Main navigation"
          >
            <Link href="/#features" className="pf-nav-link">Solutions</Link>
            <Link href="/pricing" className="pf-nav-link">Pricing</Link>
            <Link href="/how-to-use" className="pf-nav-link">How to Use</Link>
            <div className={`pf-nav-item-dropdown ${isDesktopDropdownOpen ? "dropdown-open" : ""}`}>
              <Link 
                href="/restaurants"
                className="pf-nav-link dropdown-trigger" 
                style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}
                onClick={() => {
                  // Keep desktop navigation on click, dropdown will toggle on hover/focus depending on CSS,
                  // but we also allow toggling dropdown with state if needed.
                  setIsDesktopDropdownOpen(v => !v);
                }}
              >
                Resources <ChevronDown size={12} />
              </Link>
              <div className="pf-dropdown-menu">
                <div className="pf-dropdown-col">
                  <span className="pf-dropdown-heading">Resources</span>
                  <Link href="/restaurants" className="pf-dropdown-link" style={{ fontWeight: 800, color: "#E30613", background: "rgba(227,6,19,0.05)" }}>
                    🍴 Restaurant Directory
                  </Link>
                  <Link href="/faq" className="pf-dropdown-link">FAQs</Link>
                  <Link href="/blog" className="pf-dropdown-link">Blog</Link>
                  <Link href="/restaurant-pos-software-india" className="pf-dropdown-link">POS Software</Link>
                  <Link href="/restaurant-billing-software" className="pf-dropdown-link">Billing Engine</Link>
                </div>
                <div className="pf-dropdown-divider" />
                <div className="pf-dropdown-col">
                  <span className="pf-dropdown-heading">Platform</span>
                  <Link href="/qr-ordering-system-for-restaurants" className="pf-dropdown-link">QR Ordering</Link>
                  <Link href="/restaurant-inventory-management-software" className="pf-dropdown-link">Inventory Intelligence & Predictions</Link>
                  <Link href="/how-ordrji-compares-to-legacy-pos-systems" className="pf-dropdown-link">Ordrji vs Legacy POS</Link>
                </div>
              </div>
            </div>
          </nav>

          {/* ── CTA BUTTONS ───────────────────────────────────────────── */}
          <div className={`pf-actions ${linksVisible ? "pf-nav-visible" : "pf-nav-hidden"}`}>
            <motion.button
              whileHover={{ scale: 1.02, y: -2, boxShadow: "0 10px 25px rgba(0,0,0,0.05)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsSearchModalOpen(true)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1.1rem",
                border: "1px solid rgba(148, 163, 184, 0.2)",
                borderRadius: "999px",
                background: "rgba(248, 250, 252, 0.65)",
                color: "#64748b",
                fontSize: "0.82rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
              className="pf-search-trigger"
            >
              <Search size={13} style={{ opacity: 0.8 }} /> Search Restaurants
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, y: -2, boxShadow: "0 10px 25px rgba(227,6,19,0.3)" }}
              whileTap={{ scale: 0.97 }}
              onClick={onBookDemo}
              className="btn-primary btn-red pf-btn"
            >
              Book a Demo
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.02, y: -2, boxShadow: "0 10px 25px rgba(227,6,19,0.3)" }}
              whileTap={{ scale: 0.97 }}
              href="https://pos.ordrji.com/login"
              target="_blank" rel="noopener noreferrer"
              className="btn-primary btn-red pf-btn"
            >
              Start Free Trial <ArrowRight size={14} />
            </motion.a>
          </div>

          {/* ── MOBILE HAMBURGER ──────────────────────────────────────── */}
          <button
            className="pf-hamburger"
            onClick={() => {
              setIsMobileMenuOpen(v => {
                if (v) setIsMobileResourcesOpen(false);
                return !v;
              });
            }}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* ── MOBILE DRAWER ─────────────────────────────────────────────── */}
        {isMobileMenuOpen && (
          <div className="pf-mobile-drawer">
            <Link href="/#features" className="pf-mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Solutions</Link>
            <Link href="/pricing" className="pf-mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Pricing</Link>
            <Link href="/how-to-use" className="pf-mobile-link" onClick={() => setIsMobileMenuOpen(false)}>How to Use</Link>
            <div className="pf-mobile-collapsible" style={{ display: "flex", flexDirection: "column" }}>
              <button 
                onClick={() => setIsMobileResourcesOpen(v => !v)}
                className="pf-mobile-link pf-mobile-dropdown-trigger"
                style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", padding: 0, textAlign: "left", cursor: "pointer", minHeight: "44px" }}
              >
                <span>Resources</span>
                <ChevronDown size={16} style={{ transition: "transform 0.2s", transform: isMobileResourcesOpen ? "rotate(180deg)" : "none", color: "var(--text-secondary)" }} />
              </button>
              {isMobileResourcesOpen && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", paddingLeft: "1rem", marginTop: "0.85rem" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.8px", marginTop: "0.25rem" }}>Resources</span>
                  <Link href="/restaurants" className="pf-mobile-link" style={{ fontWeight: 800, color: "#E30613" }} onClick={() => setIsMobileMenuOpen(false)}>🍴 Restaurant Directory</Link>
                  <Link href="/faq" className="pf-mobile-link" onClick={() => setIsMobileMenuOpen(false)}>FAQs</Link>
                  <Link href="/blog" className="pf-mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
                  <Link href="/restaurant-pos-software-india" className="pf-mobile-link" onClick={() => setIsMobileMenuOpen(false)}>POS Software</Link>
                  <Link href="/restaurant-billing-software" className="pf-mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Billing Engine</Link>
                  
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.8px", marginTop: "0.75rem" }}>Platform</span>
                  <Link href="/qr-ordering-system-for-restaurants" className="pf-mobile-link" onClick={() => setIsMobileMenuOpen(false)}>QR Ordering</Link>
                  <Link href="/restaurant-inventory-management-software" className="pf-mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Inventory Intelligence & Predictions</Link>
                  <Link href="/how-ordrji-compares-to-legacy-pos-systems" className="pf-mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Ordrji vs Legacy POS</Link>
                </div>
              )}
            </div>
            <Link href="/terms"             className="pf-mobile-link pf-mobile-muted" onClick={() => setIsMobileMenuOpen(false)}>Terms & Conditions</Link>
            <Link href="/privacy"           className="pf-mobile-link pf-mobile-muted" onClick={() => setIsMobileMenuOpen(false)}>Privacy Policy</Link>
            <div className="pf-mobile-ctas">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchModalOpen(true);
                }}
                className="pf-search-trigger"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  width: "100%",
                  padding: "0.75rem 1rem",
                  border: "1px solid rgba(148, 163, 184, 0.2)",
                  borderRadius: "999px",
                  background: "rgba(248, 250, 252, 0.65)",
                  color: "#64748b",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                <Search size={14} style={{ opacity: 0.8 }} /> Search Restaurants
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onBookDemo?.();
                }}
                className="btn-primary btn-red" style={{ justifyContent: "center" }}
              >
                Book a Demo
              </button>
              <a href="https://pos.ordrji.com/login" target="_blank" rel="noopener noreferrer"
                className="btn-primary btn-red" style={{ justifyContent: "center" }}
                onClick={() => setIsMobileMenuOpen(false)}>
                Start Free Trial <ArrowRight size={14} />
              </a>
            </div>
          </div>
        )}
      </header>

      <SearchRestaurantModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} />

      {/* ── ALL STYLES ────────────────────────────────────────────────── */}
      <style jsx global>{`

        /* ── header shell ───────────────────────────────────────────── */
        .pf-header {
          position: fixed; top: 0; left: 0; right: 0;
          z-index: 50;
          transition: background 0.5s cubic-bezier(0.22, 1, 0.36, 1), padding 0.5s cubic-bezier(0.22, 1, 0.36, 1),
                      border-color 0.5s cubic-bezier(0.22, 1, 0.36, 1), backdrop-filter 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .pf-nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        /* ── INTRO OVERLAY — dark wash behind centered logo ─────────── */
        .pf-intro-overlay {
          position: fixed; inset: 0; z-index: 60;
          background: var(--bg-primary);
          display: flex; align-items: center; justify-content: center;
          transition: opacity 0.6s ease;
          pointer-events: none;
        }
        .pf-overlay-out { opacity: 0; }

        /* ── LOGO animation ─────────────────────────────────────────── */
        /*
          Phase "center": logo is absolutely centered in viewport (large)
          Phase "move":   logo transitions to top-left navbar position (small)
          Phase "done":   logo is in normal flow, no positioning override
        */
        .pf-logo-link {
          display: flex; align-items: center; gap: 0.5rem;
          text-decoration: none; flex-shrink: 0;
          z-index: 70;
          transition: transform 0.75s cubic-bezier(0.16,1,0.3,1),
                      top 0.75s cubic-bezier(0.16,1,0.3,1),
                      left 0.75s cubic-bezier(0.16,1,0.3,1),
                      font-size 0.75s cubic-bezier(0.16,1,0.3,1);
        }

        /* CENTER phase — fixed, centered, large */
        .pf-logo-link.center {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(1);
        }
        /* MOVE phase — animate to top-left but shifted slightly right */
        .pf-logo-link.move {
          position: fixed;
          top: 0.6rem;
          left: max(3rem, calc((100vw - 1280px) / 2 + 3rem));
          transform: translate(0, 0) scale(1);
        }
        /* DONE phase — back in normal flow but shifted slightly right */
        .pf-logo-link.done {
          position: relative;
          top: auto; left: auto;
          transform: none;
          margin-left: 1.5rem;
        }
        .pf-logo-placeholder {
          margin-left: 1.5rem;
        }

        /* logo image */
        .pf-logo-img {
          object-fit: contain; border-radius: 8px;
          transition: width 0.75s cubic-bezier(0.16,1,0.3,1),
                      height 0.75s cubic-bezier(0.16,1,0.3,1);
          /* center phase: large */
          width: 180px; height: 180px;
        }
        .pf-logo-link.move  .pf-logo-img,
        .pf-logo-link.done  .pf-logo-img {
          width: 120px; height: 120px;
        }
        @media (max-width: 768px) {
          .pf-logo-link.move  .pf-logo-img,
          .pf-logo-link.done  .pf-logo-img {
            width: 120px; height: 120px;
          }
        }

        /* wordmark hidden */
        .pf-logo-wordmark { display: none; }

        /* ── NAV LINKS (Posiflex style: spaced, uppercase, tracked) ─── */
        .pf-nav {
          display: flex;
          align-items: center;
          gap: 2.5rem;
        }
        @media (max-width: 1024px) {
          .pf-nav { gap: 1.5rem; }
        }

        .pf-nav-link {
          font-size: 0.88rem;
          font-weight: 600;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          color: var(--text-secondary);
          text-decoration: none;
          position: relative;
          transition: color 0.2s ease;
        }
        /* underline grow on hover — premium style */
        .pf-nav-link::after {
          content: "";
          position: absolute;
          bottom: -4px; left: 0; right: 100%;
          height: 2px;
          border-radius: 2px;
          background: var(--accent-orange);
          transition: right 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .pf-nav-link:hover { color: var(--accent-orange); }
        .pf-nav-link:hover::after { right: 0; }

        /* ── dropdown panel ── */
        .pf-nav-item-dropdown {
          position: relative;
          display: inline-block;
        }
        .pf-dropdown-menu {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(8px);
          background: #ffffff;
          border: 1px solid rgba(229, 231, 235, 0.5);
          border-radius: 16px;
          box-shadow: 0 16px 40px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04);
          padding: 28px 32px;
          display: flex;
          flex-direction: row;
          gap: 48px;
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transition: opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1), transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), visibility 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 100;
        }
        .pf-dropdown-col {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          min-width: 240px;
        }
        .pf-dropdown-heading {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin-bottom: 0.75rem;
          padding-left: 0.85rem;
        }
        .pf-dropdown-divider {
          width: 1px;
          background: #E5E7EB;
          opacity: 0.8;
          flex-shrink: 0;
        }
        .pf-nav-item-dropdown:hover .pf-dropdown-menu,
        .pf-nav-item-dropdown.dropdown-open .pf-dropdown-menu {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          transform: translateX(-50%) translateY(4px);
        }
        .pf-dropdown-link {
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.3px;
          color: var(--text-secondary);
          text-decoration: none;
          padding: 0.6rem 0.85rem;
          border-radius: 8px;
          transition: all 0.2s ease;
          white-space: nowrap;
          display: block;
        }
        .pf-dropdown-link:hover {
          background: rgba(227,6,19,0.06);
          color: #E30613;
        }
        .pf-nav-item-dropdown:hover .dropdown-trigger {
          color: var(--accent-orange);
        }
        /* remove underline bar on the dropdown trigger on hover */
        .dropdown-trigger::after {
          display: none !important;
        }

        /* ── CTA buttons ────────────────────────────────────────────── */
        .pf-actions {
          display: flex; align-items: center; gap: 0.75rem;
        }
        .pf-btn {
          padding: 0.5rem 1.1rem;
          font-size: 0.82rem;
          letter-spacing: 0.3px;
        }

        /* fade nav items in after intro */
        .pf-nav-hidden { opacity: 0; pointer-events: none; transform: translateY(-6px); transition: opacity 0.4s ease, transform 0.4s ease; }
        .pf-nav-visible { opacity: 1; pointer-events: auto; transform: translateY(0); transition: opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s; }

        /* ── MOBILE ─────────────────────────────────────────────────── */
        .pf-hamburger {
          display: none;
          background: none; border: none;
          color: var(--text-primary); cursor: pointer;
          padding: 0.25rem;
        }

        .pf-mobile-drawer {
          position: absolute; top: 100%; left: 0; right: 0;
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border-color);
          padding: 1.75rem 1.5rem;
          display: flex; flex-direction: column; gap: 1.25rem;
          backdrop-filter: blur(20px);
          animation: pfDrawerSlide 0.35s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes pfDrawerSlide {
          from { opacity:0; transform: translateY(-8px); }
          to   { opacity:1; transform: translateY(0); }
        }

        .pf-mobile-link {
          font-size: 1rem; font-weight: 600;
          color: var(--text-secondary); text-decoration: none;
          letter-spacing: 0.3px;
          transition: color 0.2s;
          display: flex;
          align-items: center;
          min-height: 44px;
        }
        .pf-mobile-link:hover { color: var(--accent-orange); }
        .pf-mobile-muted { font-size: 0.85rem; color: var(--text-muted); font-weight: 500; }

        .pf-mobile-ctas {
          display: flex; flex-direction: column;
          gap: 0.75rem; margin-top: 0.5rem;
        }

        @media (max-width: 900px) {
          .pf-nav, .pf-actions { display: none !important; }
          .pf-hamburger { display: block !important; }
        }
        @media (min-width: 901px) {
          .pf-hamburger { display: none !important; }
        }

        /* keep old .nav-link for any other components that use it */
        .nav-link {
          color: var(--text-secondary);
          font-size: 0.9rem; font-weight: 500;
          transition: var(--transition-fast);
          text-decoration: none;
        }
        .nav-link:hover { color: var(--accent-orange); }

        .pf-search-trigger:hover {
          border-color: rgba(148, 163, 184, 0.45) !important;
          background: rgba(248, 250, 252, 0.95) !important;
          color: #0f172a !important;
        }
      `}</style>
    </>
  );
}
