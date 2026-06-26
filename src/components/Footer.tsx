"use client";

import React from "react";
import Link from "next/link";
import { Heart, Globe, Mail, MessageSquare, ArrowRight } from "lucide-react";

/* ─── nav columns ─────────────────────────────────────────────────────────── */
const NAV_COLS = [
  {
    heading: "Product",
    links: [
      { label: "Billing Engine",        href: "#features" },
      { label: "QR Order Journey",      href: "#journey"  },
      { label: "Kitchen Display (KDS)", href: "#features" },
      { label: "Inventory Control",     href: "#features" },
      { label: "Marketing Automation",  href: "#crm"      },
      { label: "Analytics Suite",       href: "#features" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { label: "Fine Dining",         href: "#" },
      { label: "Cafes & Bistros",     href: "#" },
      { label: "Cloud Kitchens",      href: "#" },
      { label: "Quick Service (QSR)", href: "#" },
      { label: "Franchise Chains",    href: "#" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us",              href: "#",                   isLink: false },
      { label: "Success Stories",       href: "#",                   isLink: false },
      { label: "Contact Us",            href: "/contact",            isLink: true  },
      { label: "Privacy Policy",        href: "/privacy-policy",     isLink: true  },
      { label: "Terms & Conditions",    href: "/terms",              isLink: true  },
      { label: "Refund & Cancellation", href: "/refund-cancellation",isLink: true  },
    ],
  },
];

const SOCIALS = [
  { label: "Instagram", icon: Globe,         href: "#" },
  { label: "LinkedIn",  icon: MessageSquare, href: "#" },
  { label: "Twitter",   icon: Mail,          href: "#" },
  { label: "YouTube",   icon: Globe,         href: "#" },
];

/* ─── component ───────────────────────────────────────────────────────────── */
export default function Footer() {
  return (
    <footer className="ft-footer">
      {/* top glow accent */}
      <div className="ft-top-glow" aria-hidden />

      <div className="container">

        {/* ── main grid ──────────────────────────────────────────────── */}
        <div className="ft-grid">

          {/* brand column */}
          <div className="ft-brand-col">
            <a href="/" className="ft-logo-wrap" aria-label="OrderJi Home">
              <img src="/logo.jpg" alt="OrderJi" className="ft-logo" />
            </a>

            <p className="ft-tagline">
              The complete restaurant operating system — billing, QR ordering,
              KDS, inventory, CRM, and analytics unified in one command center.
            </p>

            {/* social icons */}
            <div className="ft-socials">
              {SOCIALS.map(s => {
                const Icon = s.icon;
                return (
                  <a key={s.label} href={s.href} className="ft-social-btn" aria-label={s.label}>
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>

            {/* trust badges */}
            <div className="ft-trust-row">
              <span className="ft-trust-badge">⭐ 4.8 / 5 Rating</span>
              <span className="ft-trust-badge">🏆 3,500+ Restaurants</span>
            </div>
          </div>

          {/* nav columns */}
          {NAV_COLS.map(col => (
            <div key={col.heading} className="ft-nav-col">
              <h4 className="ft-col-heading">{col.heading}</h4>
              <ul className="ft-link-list">
                {col.links.map(l => (
                  <li key={l.label}>
                    {"isLink" in l && l.isLink
                      ? <Link href={l.href} className="ft-link">{l.label}</Link>
                      : <a    href={l.href} className="ft-link">{l.label}</a>
                    }
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* newsletter column */}
          <div className="ft-newsletter-col">
            <h4 className="ft-col-heading">Stay in the loop</h4>
            <p className="ft-newsletter-sub">
              Product updates, restaurant industry insights, and new features —
              direct to your inbox. No spam.
            </p>
            <form className="ft-email-form" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@restaurant.com"
                className="ft-email-input"
                aria-label="Email address"
                required
              />
              <button type="submit" className="ft-email-btn" aria-label="Subscribe">
                <ArrowRight size={15} />
              </button>
            </form>

            <a
              href="https://pos.ordrji.com/login"
              target="_blank" rel="noopener noreferrer"
              className="btn-primary btn-red ft-cta-btn"
            >
              Start Free Trial <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* ── bottom bar ─────────────────────────────────────────────── */}
        <div className="ft-bottom">
          <span className="ft-copy">
            &copy; {new Date().getFullYear()} OrderJi. All rights reserved.
          </span>
          <span className="ft-made-with">
            Engineered with <Heart size={11} style={{ color: "#e30613", fill: "#e30613" }} /> for modern dining
          </span>
          <div className="ft-bottom-links">
            <Link href="/privacy-policy"      className="ft-bottom-link">Privacy</Link>
            <Link href="/terms"               className="ft-bottom-link">Terms</Link>
            <Link href="/refund-cancellation" className="ft-bottom-link">Refunds</Link>
          </div>
        </div>
      </div>

      <style jsx global>{`

        /* ── dark footer shell ─────────────────────────────────────── */
        .ft-footer {
          background: var(--bg-dark, #0f0e0c);
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 5rem 0 2.5rem;
          position: relative;
          overflow: hidden;
          z-index: 10;
        }

        /* subtle red top-edge glow — Toast-style */
        .ft-top-glow {
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 600px; height: 1px;
          box-shadow: 0 0 80px 20px rgba(227,6,19,0.25);
          pointer-events: none;
        }

        /* ── main grid ───────────────────────────────────────────────── */
        .ft-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          margin-bottom: 4rem;
        }
        @media (min-width: 640px)  { .ft-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .ft-grid { grid-template-columns: 2fr 1fr 1fr 1fr 1.5fr; gap: 2.5rem; } }

        /* ── brand column ────────────────────────────────────────────── */
        .ft-brand-col { display: flex; flex-direction: column; gap: 1.25rem; }

        .ft-logo-wrap { display: inline-flex; }
        .ft-logo {
          height: 48px; width: auto;
          object-fit: contain;
          /* brighten on dark bg */
          filter: brightness(0) invert(1);
          opacity: 0.92;
          transition: opacity 0.2s;
        }
        .ft-logo:hover { opacity: 1; }

        .ft-tagline {
          font-size: 0.85rem;
          color: var(--text-dark-secondary, rgba(255,255,255,0.55));
          line-height: 1.65;
          max-width: 280px;
        }

        .ft-socials {
          display: flex; gap: 0.6rem; flex-wrap: wrap;
        }
        .ft-social-btn {
          width: 36px; height: 36px; border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.05);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.55);
          transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.2s;
        }
        .ft-social-btn:hover {
          background: rgba(227,6,19,0.2);
          border-color: rgba(227,6,19,0.4);
          color: #fff;
          transform: translateY(-2px);
        }

        .ft-trust-row { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .ft-trust-badge {
          font-size: 0.72rem; font-weight: 600;
          padding: 0.25rem 0.65rem; border-radius: 6px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.55);
          white-space: nowrap;
        }

        /* ── nav columns ─────────────────────────────────────────────── */
        .ft-nav-col { display: flex; flex-direction: column; gap: 0; }

        .ft-col-heading {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin-bottom: 1.25rem;
        }

        .ft-link-list {
          list-style: none;
          display: flex; flex-direction: column; gap: 0.7rem;
        }

        .ft-link {
          font-size: 0.88rem;
          color: rgba(255,255,255,0.55);
          transition: color 0.2s, padding-left 0.2s;
          display: inline-block;
        }
        .ft-link:hover { color: #fff; padding-left: 3px; }

        /* ── newsletter column ───────────────────────────────────────── */
        .ft-newsletter-col { display: flex; flex-direction: column; gap: 1rem; }

        .ft-newsletter-sub {
          font-size: 0.82rem;
          color: rgba(255,255,255,0.45);
          line-height: 1.6;
        }

        .ft-email-form {
          display: flex; align-items: center; gap: 0;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 10px;
          overflow: hidden;
          transition: border-color 0.2s;
        }
        .ft-email-form:focus-within { border-color: rgba(227,6,19,0.5); }

        .ft-email-input {
          flex: 1;
          background: transparent;
          border: none; outline: none;
          padding: 0.65rem 0.85rem;
          font-size: 0.82rem;
          color: rgba(255,255,255,0.85);
          font-family: var(--font-sans);
        }
        .ft-email-input::placeholder { color: rgba(255,255,255,0.3); }

        .ft-email-btn {
          width: 38px; height: 38px; flex-shrink: 0;
          background: var(--accent-orange);
          border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: #fff;
          transition: background 0.2s;
        }
        .ft-email-btn:hover { background: #c4040f; }

        .ft-cta-btn {
          width: 100%;
          justify-content: center;
          font-size: 0.85rem;
          padding: 0.65rem 1.25rem;
          margin-top: 0.25rem;
        }

        /* ── bottom bar ──────────────────────────────────────────────── */
        .ft-bottom {
          border-top: 1px solid rgba(255,255,255,0.07);
          padding-top: 1.75rem;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .ft-copy, .ft-made-with {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.3);
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .ft-bottom-links {
          display: flex; gap: 1.5rem;
        }
        .ft-bottom-link {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.3);
          transition: color 0.2s;
        }
        .ft-bottom-link:hover { color: rgba(255,255,255,0.7); }

      `}</style>
    </footer>
  );
}
