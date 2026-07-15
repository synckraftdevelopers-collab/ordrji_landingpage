"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

/* ─── nav columns ─────────────────────────────────────────────────────────── */
const NAV_COLS = [
  {
    heading: "Product",
    links: [
      { label: "Billing Engine",        href: "/billing-engine",       isLink: true },
      { label: "QR Order Journey",      href: "/qr-order-journey",     isLink: true },
      { label: "Kitchen Display (KDS)", href: "/kitchen-display",      isLink: true },
      { label: "Inventory Control",     href: "/inventory-control",    isLink: true },
      { label: "Marketing Automation",  href: "/marketing-automation", isLink: true },
      { label: "Analytics Suite",       href: "/analytics-suite",      isLink: true },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { label: "Fine Dining",         href: "/solutions/fine-dining",         isLink: true },
      { label: "Cafes & Bistros",     href: "/solutions/cafes-and-bistros",   isLink: true },
      { label: "Cloud Kitchens",      href: "/solutions/cloud-kitchens",      isLink: true },
      { label: "Quick Service (QSR)", href: "/solutions/quick-service-qsr",   isLink: true },
      { label: "Franchise Chains",    href: "/solutions/franchise-chains",    isLink: true },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us",              href: "/about",              isLink: true  },
      { label: "Restaurants",           href: "/restaurants",        isLink: true  },
      { label: "Customers",             href: "/customers",          isLink: true  },
      { label: "User Guides",           href: "/how-to-use",         isLink: true  },
      { label: "Blog",                  href: "/blog",               isLink: true  },
      { label: "Contact Us",            href: "/contact",            isLink: true  },
      { label: "Privacy Policy",        href: "/privacy",            isLink: true  },
      { label: "Terms & Conditions",    href: "/terms",              isLink: true  },
    ],
  },
];

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/ordrji/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/135195205/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: "Pinterest",
    href: "https://in.pinterest.com/ordrji26/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.853 0 1.267.641 1.267 1.408 0 .858-.546 2.140-.828 3.330-.236.995.499 1.806 1.476 1.806 1.771 0 3.132-1.867 3.132-4.562 0-2.387-1.716-4.055-4.165-4.055-2.837 0-4.501 2.127-4.501 4.326 0 .856.330 1.774.741 2.276a.3.3 0 0 1 .069.286c-.076.315-.244.995-.277 1.134-.044.183-.145.221-.335.133-1.249-.581-2.030-2.407-2.030-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.220-5.190 6.220-1.013 0-1.966-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446C17.523 22 22 17.523 22 12S17.523 2 12 2z"/>
      </svg>
    ),
  },
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
            <Link href="/" className="ft-logo-wrap" aria-label="Ordrji Home">
              <Image src="/logo.jpg" alt="Ordrji" width={120} height={48} style={{ height: "48px", width: "auto", objectFit: "contain", filter: "brightness(0) invert(1)", opacity: 0.92 }} />
            </Link>

            <p className="ft-tagline">
              The complete restaurant operating system — billing, QR ordering,
              KDS, inventory, CRM, and analytics unified in one command center.
            </p>

            <div className="ft-socials">
              {SOCIALS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ft-social-btn"
                  aria-label={`Follow Ordrji on ${s.label}`}
                >
                  {s.icon}
                </a>
              ))}
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

            <Link
              href="/register-restaurant"
              className="btn-primary btn-register ft-cta-btn"
              style={{ display: "inline-flex", justifyContent: "center", alignItems: "center" }}
            >
              Register Restaurant <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* ── bottom bar ─────────────────────────────────────────────── */}
        <div className="ft-bottom">
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <span className="ft-copy">
              &copy; {new Date().getFullYear()} Ordrji. All rights reserved.
            </span>
            <span style={{ fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.25)", fontWeight: 500 }}>
              Powered by Synckraft Technologies Pvt. Ltd.
            </span>
          </div>
          <div className="ft-bottom-links">
            <Link href="/privacy" className="ft-bottom-link">Privacy</Link>
            <Link href="/terms"   className="ft-bottom-link">Terms</Link>
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
        .ft-email-btn:hover { background: #be0303; }

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
