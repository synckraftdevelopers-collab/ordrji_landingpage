import React from "react";
import { notFound } from "next/navigation";
import { SEO_PAGES_DATA } from "@/data/seoPages";
import NavbarWrapper from "./NavbarWrapper"; // Client component wrapper for Navbar and Modal
import { Check, X, Sparkles, AlertCircle } from "lucide-react";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return Object.keys(SEO_PAGES_DATA).map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = SEO_PAGES_DATA[slug];
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
  };
}
export default async function DynamicSeoPage({ params }: Props) {
  const { slug } = await params;
  const page = SEO_PAGES_DATA[slug];

  if (!page) {
    notFound();
  }

  // ── Construct dynamic JSON-LD Schema Markup ──────────────────────────────
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Ordrji",
    "operatingSystem": "All (Web-based, iOS, Android, Windows, macOS)",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": "1999",
      "priceCurrency": "INR",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "priceType": "Subscription",
        "referenceQuantity": {
          "@type": "QuantitativeValue",
          "value": "1",
          "unitCode": "MON"
        }
      }
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": page.faqs.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };

  let localBusinessSchema = null;
  if (page.type === "local" && page.localData) {
    localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": `Ordrji ${page.localData.city}`,
      "image": "https://ordrji.com/logo-icon.jpg",
      "telephone": "+919004402006",
      "url": `https://ordrji.com/${page.slug}`,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": page.localData.city,
        "addressRegion": "Maharashtra",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "19.0760",
        "longitude": "72.8777"
      },
      "areaServed": page.localData.areas
    };
  }

  return (
    <>
      {/* Inject JSON-LD metadata schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {localBusinessSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      )}

      {/* Render layout shell using a client wrapper */}
      <NavbarWrapper>
        
        {/* Landing Hero */}
        <section className="seo-hero">
          <div className="glow-spot glow-rose" style={{ top: "10%", left: "15%", width: "400px", height: "400px", opacity: 0.12 }} />
          <div className="container seo-hero-container">
            <span className="seo-badge font-semibold">
              <Sparkles size={11} style={{ color: "#da0404" }} /> Leading OS Solution
            </span>
            <h1 className="seo-title">{page.headline}</h1>
            <p className="seo-subtitle">{page.subheadline}</p>
            
            <div className="seo-hero-ctas">
              <button className="btn-primary btn-orange open-demo-btn">
                Book Free Demo
              </button>
              <a 
                href="https://wa.me/919004402006?text=Hi%20OrderJi%20team,%20I%20want%20to%20know%20more%20about%20your%20POS%20system."
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.9rem 2.25rem", textDecoration: "none" }}
              >
                WhatsApp Sales
              </a>
            </div>
            
            {/* Core features bullet highlights */}
            <div className="seo-features-row">
              {page.features.map((feat, i) => (
                <div key={i} className="seo-feature-chip">
                  <Check size={14} color="var(--accent-green)" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Competitor / Local/ Service Layout Widget */}
        {page.type === "competitor" && page.competitorData && (
          <section className="widget-section">
            <div className="container" style={{ maxWidth: 880 }}>
              <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                <span className="seo-badge">COMPARISON</span>
                <h2 style={{ fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.8px", marginTop: "0.5rem" }}>
                  {page.competitorData.advantageTitle}
                </h2>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginTop: "0.3rem" }}>
                  {page.competitorData.advantageDesc}
                </p>
              </div>

              {/* Comparison table */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {page.competitorData.points.map((p, i) => (
                  <div key={i} className="comp-row shadow-sm">
                    <div className="comp-lbl">{p.label}</div>
                    <div className="comp-val-ordrji">
                      <Check size={15} color="var(--accent-green)" />
                      <span>{p.ordrji}</span>
                    </div>
                    <div className="comp-val-legacy">
                      <X size={15} color="#dc2626" style={{ opacity: 0.7 }} />
                      <span>{p.competitor}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {page.type === "local" && page.localData && (
          <section className="widget-section local-section">
            <div className="container" style={{ maxWidth: 900 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem" }} className="local-grid">
                
                {/* Local support promise */}
                <div>
                  <span className="seo-badge">LOCAL SUPPORT</span>
                  <h2 style={{ fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.8px", marginTop: "0.5rem", marginBottom: "1rem" }}>
                    On-Site POS Support in {page.localData.city}
                  </h2>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                    {page.localData.supportPromise}
                  </p>
                  
                  {/* Areas served list */}
                  <h4 style={{ fontSize: "0.78rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.75rem" }}>
                    Areas We Onboard in {page.localData.city}:
                  </h4>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {page.localData.areas.map((area) => (
                      <span key={area} style={{ background: "rgba(0,0,0,0.03)", padding: "0.3rem 0.7rem", borderRadius: 8, fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)" }}>
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                {/* City specific pain points */}
                <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: 18, padding: "2rem" }}>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <AlertCircle size={18} color="var(--accent-orange)" /> Local Pain Points Solved
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {page.localData.painPoints.map((pt, i) => (
                      <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                        <div style={{ background: "rgba(227,6,19,0.06)", color: "var(--accent-orange)", width: 20, height: 20, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.7rem", fontWeight: 800, marginTop: "2px" }}>
                          {i + 1}
                        </div>
                        <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.4, margin: 0 }}>{pt}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </section>
        )}

        {page.type === "service" && page.serviceData && (
          <section className="widget-section">
            <div className="container" style={{ maxWidth: 900 }}>
              <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: 20, padding: "3rem 2.5rem", display: "grid", gridTemplateColumns: "1fr", gap: "2.5rem" }} className="local-grid">
                <div>
                  <span className="seo-badge">{page.serviceData.formatName} Workflow</span>
                  <h2 style={{ fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.8px", marginTop: "0.5rem", marginBottom: "1rem" }}>
                    {page.serviceData.highlightTitle}
                  </h2>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
                    {page.serviceData.highlightDesc}
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", justifyContent: "center" }}>
                  <div style={{ borderLeft: "3px solid var(--accent-orange)", paddingLeft: "1rem" }}>
                    <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase" }}>Setup Support</div>
                    <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>Free Data Migration &amp; Training</div>
                  </div>
                  <div style={{ borderLeft: "3px solid var(--accent-green)", paddingLeft: "1rem" }}>
                    <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase" }}>Trial Offer</div>
                    <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>First 3 Months Free Launch Offer</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Dynamic Pricing Teaser (Standard conversion requirement) */}
        <section className="pricing-teaser-section">
          <div className="container" style={{ maxWidth: 900 }}>
            <div className="pricing-teaser-card">
              <span className="seo-badge">SUBSCRIPTIONS</span>
              <h2 style={{ fontSize: "1.8rem", fontWeight: 800, letterSpacing: "-1px", marginTop: "0.5rem" }}>
                Predictable Subscription Tiers
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                Keep 100% of your checkout revenue. Pay one simple subscription with zero hidden lookups.
              </p>
              
              <div className="teaser-grid">
                {[
                  { name: "Starter", price: "₹1,999", desc: "Single counter cafes & bakeries" },
                  { name: "Growth", price: "₹3,999", desc: "High-volume restaurants & QSRs" },
                  { name: "Scale", price: "₹7,999", desc: "Multi-branch chains & franchises" }
                ].map((tier) => (
                  <div key={tier.name} className="teaser-item">
                    <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase" }}>{tier.name}</div>
                    <div style={{ fontSize: "1.75rem", fontWeight: 900, color: "var(--text-primary)" }}>{tier.price}<span style={{ fontSize: "0.85rem", fontWeight: 400, color: "var(--text-muted)" }}>/mo</span></div>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginTop: "0.2rem" }}>{tier.desc}</div>
                  </div>
                ))}
              </div>
              
              {/* Highlight list */}
              <div style={{ marginTop: "2.5rem", borderTop: "1px solid var(--border-color)", paddingTop: "1.5rem", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1.5rem", fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 600 }}>
                <span>🛡️ Free On-site Setup &amp; Training</span>
                <span>🎁 3 Months Free Launch Offer</span>
                <span>📱 0% Commission Checkouts</span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs list accordion */}
        <section style={{ padding: "6rem 0", background: "var(--bg-primary)" }}>
          <div className="container" style={{ maxWidth: 800 }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <span className="seo-badge">FAQ</span>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.8px", marginTop: "0.5rem" }}>
                Frequently Asked Questions
              </h2>
            </div>
            
            {/* Server-side static accordions */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {page.faqs.map((faq, idx) => (
                <details key={idx} className="faq-details" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: 14, padding: "1.25rem 1.5rem" }}>
                  <summary style={{ fontSize: "0.98rem", fontWeight: 700, color: "var(--text-primary)", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>{faq.q}</span>
                    <span className="faq-details-arrow">↓</span>
                  </summary>
                  <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginTop: "0.85rem", lineHeight: 1.6, borderTop: "1px solid var(--border-color)", paddingTop: "0.85rem" }}>
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

      </NavbarWrapper>
    </>
  );
}
