"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X, ChevronDown } from "lucide-react";

interface NavbarProps {
  onBookDemo: () => void;
  onRegister?: () => void;
}

export default function Navbar({ onBookDemo, onRegister }: NavbarProps) {
  const pathname = usePathname();
  const [isScrolled,        setIsScrolled]        = useState(false);
  const [isMobileMenuOpen,  setIsMobileMenuOpen]  = useState(false);
  const [isMobileResourcesOpen, setIsMobileResourcesOpen] = useState(false);
  const [activeRole, setActiveRole] = useState<string>("Visitor");

  useEffect(() => {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
      return null;
    };
    setActiveRole(getCookie("ordrji_role") || "Visitor");
  }, []);

  const isAdmin = (activeRole === "Admin" || activeRole === "Super Admin") && !pathname?.startsWith("/blog");

  // Close resources sub-tab when mobile menu closes
  useEffect(() => {
    if (!isMobileMenuOpen) {
      setIsMobileResourcesOpen(false);
    }
  }, [isMobileMenuOpen]);

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

  const navBg    = isScrolled ? "rgba(253,250,244,0.92)" : "transparent";
  const navBlur  = isScrolled ? "blur(20px)"             : "none";
  const navBorder= isScrolled ? "1px solid var(--border-color)" : "1px solid transparent";
  const navPad   = isScrolled ? "0.85rem 0" : "1.25rem 0";

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
                width: "64px",
                height: "64px",
                flexShrink: 0,
                visibility: "hidden"
              }}
            />
          )}

          <Link
            href="/"
            className={`pf-logo-link ${introPhase}`}
            aria-label="OrderJi Home"
          >
            <Image
              src="/logo-icon.jpg"
              alt="OrderJi"
              width={120}
              height={120}
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
            <Link href="/blog" className="pf-nav-link">Blog</Link>
            <Link href="/#testimonials" className="pf-nav-link">Customers</Link>
            <div className="pf-nav-item-dropdown">
              <span className="pf-nav-link dropdown-trigger" style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                Resources <ChevronDown size={12} />
              </span>
              <div className="pf-dropdown-menu">
                <Link href="/faq" className="pf-dropdown-link">FAQs</Link>
                <Link href="/restaurant-pos-software-india" className="pf-dropdown-link">POS Software</Link>
                <Link href="/restaurant-billing-software" className="pf-dropdown-link">Billing Engine</Link>
                <Link href="/qr-ordering-system-for-restaurants" className="pf-dropdown-link">QR Ordering</Link>
                <Link href="/restaurant-inventory-management-software" className="pf-dropdown-link">Inventory</Link>
              </div>
            </div>
            {isAdmin && (
              <Link href="/dashboard/admin/blogs" className="pf-nav-link" style={{ color: "var(--accent-orange)", fontWeight: 750 }}>
                Admin Portal
              </Link>
            )}
          </nav>

          {/* ── CTA BUTTONS ───────────────────────────────────────────── */}
          <div className={`pf-actions ${linksVisible ? "pf-nav-visible" : "pf-nav-hidden"}`}>
            <button
              onClick={onBookDemo}
              className="btn-secondary pf-btn"
            >
              Book Demo
            </button>
            <Link
              href="/register-restaurant"
              className="btn-primary btn-register pf-btn"
            >
              Register Restaurant
            </Link>
            <a
              href="https://pos.ordrji.com/login"
              target="_blank" rel="noopener noreferrer"
              className="btn-primary btn-red pf-btn"
            >
              Start Free Trial <ArrowRight size={14} />
            </a>
          </div>

          {/* ── MOBILE HAMBURGER ──────────────────────────────────────── */}
          <button
            className="pf-hamburger"
            onClick={() => setIsMobileMenuOpen(v => !v)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* ── MOBILE DRAWER ─────────────────────────────────────────────── */}
        {isMobileMenuOpen && (
          <div className="pf-mobile-drawer">
            {isAdmin && (
              <Link href="/dashboard/admin/blogs" className="pf-mobile-link" style={{ color: "var(--accent-orange)", fontWeight: 750 }} onClick={() => setIsMobileMenuOpen(false)}>
                ★ Admin Portal
              </Link>
            )}
            <Link href="/#features" className="pf-mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Solutions</Link>
            <Link href="/pricing" className="pf-mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Pricing</Link>
            <Link href="/how-to-use" className="pf-mobile-link" onClick={() => setIsMobileMenuOpen(false)}>How to Use</Link>
            <Link href="/blog" className="pf-mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
            <Link href="/#testimonials" className="pf-mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Customers</Link>
            <div className="pf-mobile-collapsible" style={{ display: "flex", flexDirection: "column" }}>
              <button 
                onClick={() => setIsMobileResourcesOpen(v => !v)}
                className="pf-mobile-link pf-mobile-dropdown-trigger"
                style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", padding: 0, textAlign: "left", cursor: "pointer" }}
              >
                <span>Resources</span>
                <ChevronDown size={16} style={{ transition: "transform 0.2s", transform: isMobileResourcesOpen ? "rotate(180deg)" : "none", color: "var(--text-secondary)" }} />
              </button>
              {isMobileResourcesOpen && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", paddingLeft: "1rem", marginTop: "0.85rem" }}>
                  <Link href="/faq" className="pf-mobile-link" onClick={() => setIsMobileMenuOpen(false)}>FAQs</Link>
                  <Link href="/restaurant-pos-software-india" className="pf-mobile-link" onClick={() => setIsMobileMenuOpen(false)}>POS Software</Link>
                  <Link href="/restaurant-billing-software" className="pf-mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Billing Engine</Link>
                  <Link href="/qr-ordering-system-for-restaurants" className="pf-mobile-link" onClick={() => setIsMobileMenuOpen(false)}>QR Ordering</Link>
                  <Link href="/restaurant-inventory-management-software" className="pf-mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Inventory</Link>
                </div>
              )}
            </div>
            <Link href="/terms"             className="pf-mobile-link pf-mobile-muted" onClick={() => setIsMobileMenuOpen(false)}>Terms & Conditions</Link>
            <Link href="/privacy"           className="pf-mobile-link pf-mobile-muted" onClick={() => setIsMobileMenuOpen(false)}>Privacy Policy</Link>
            <div className="pf-mobile-ctas">
              <button onClick={() => { setIsMobileMenuOpen(false); onBookDemo(); }} className="btn-secondary" style={{ justifyContent: "center" }}>
                Book Demo
              </button>
              <Link
                href="/register-restaurant"
                className="btn-primary btn-register"
                style={{ justifyContent: "center" }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Register Restaurant
              </Link>
              <a href="https://pos.ordrji.com/login" target="_blank" rel="noopener noreferrer"
                className="btn-primary btn-red" style={{ justifyContent: "center" }}
                onClick={() => setIsMobileMenuOpen(false)}>
                Start Free Trial <ArrowRight size={14} />
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ── ALL STYLES ────────────────────────────────────────────────── */}
      <style jsx global>{`

        /* ── header shell ───────────────────────────────────────────── */
        .pf-header {
          position: fixed; top: 0; left: 0; right: 0;
          z-index: 50;
          transition: background 0.4s ease, padding 0.4s ease,
                      border-color 0.4s ease, backdrop-filter 0.4s ease;
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
        /* MOVE phase — animate to top-left */
        .pf-logo-link.move {
          position: fixed;
          top: 1.25rem;
          left: max(1.5rem, calc((100vw - 1280px) / 2 + 1.5rem));
          transform: translate(0, 0) scale(1);
        }
        /* DONE phase — back in normal flow */
        .pf-logo-link.done {
          position: relative;
          top: auto; left: auto;
          transform: none;
        }

        /* logo image */
        .pf-logo-img {
          object-fit: contain; border-radius: 10px;
          transition: width 0.75s cubic-bezier(0.16,1,0.3,1),
                      height 0.75s cubic-bezier(0.16,1,0.3,1);
          /* center phase: large */
          width: 120px; height: 120px;
        }
        .pf-logo-link.move  .pf-logo-img,
        .pf-logo-link.done  .pf-logo-img {
          width: 64px; height: 64px;
        }

        /* wordmark hidden */
        .pf-logo-wordmark { display: none; }

        /* ── NAV LINKS (Posiflex style: spaced, uppercase, tracked) ─── */
        .pf-nav {
          display: flex;
          align-items: center;
          gap: 2.5rem;
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
        /* underline grow on hover — Posiflex-style */
        .pf-nav-link::after {
          content: "";
          position: absolute;
          bottom: -3px; left: 0; right: 100%;
          height: 1.5px;
          background: var(--accent-orange);
          transition: right 0.25s cubic-bezier(0.16,1,0.3,1);
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
          background: var(--bg-card, #fdfaf4);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.06);
          min-width: 220px;
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s ease;
          z-index: 100;
          display: flex;
          flex-direction: column;
          padding: 0.5rem;
          gap: 0.2rem;
        }
        .pf-nav-item-dropdown:hover .pf-dropdown-menu {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          transform: translateX(-50%) translateY(4px);
        }
        .pf-dropdown-link {
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.3px;
          text-transform: uppercase;
          color: var(--text-secondary);
          text-decoration: none;
          padding: 0.5rem 0.85rem;
          border-radius: 8px;
          transition: background 0.15s, color 0.15s;
          white-space: nowrap;
          display: block;
        }
        .pf-dropdown-link:hover {
          background: rgba(227,6,19,0.06);
          color: var(--accent-orange);
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
      `}</style>
    </>
  );
}
