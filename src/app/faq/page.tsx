"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookDemoModal from "@/components/BookDemoModal";
import { Search, ChevronDown, MessageSquare, Phone, Mail, Sparkles, AlertCircle } from "lucide-react";

const CATEGORIES = ["All", "POS & Billing", "QR Ordering", "Kitchen (KDS)", "Inventory & Stock", "Pricing & Setup"];

const FAQS = [
  {
    q: "Is OrderJi another POS billing software?",
    a: "No. Traditional POS systems only act as legacy cash registers and receipt printers. OrderJi is a complete Restaurant Operating System (OS). It connects and synchronizes table QR menus, chef kitchen displays (KDS), automated WhatsApp/SMS marketing campaigns, live raw inventory tracking, and centralized accounting into a single unified cloud workspace.",
    category: "POS & Billing"
  },
  {
    q: "Do you charge order commissions on QR and table checkouts?",
    a: "Absolutely not. OrderJi believes that your restaurant revenue belongs entirely to you. We operate on a flat subscription pricing model. We never charge commission percentages or lookup fees on QR ordering, table reservations, or self-service kiosks.",
    category: "Pricing & Setup"
  },
  {
    q: "Can we integrate food delivery aggregators like Swiggy and Zomato?",
    a: "Yes. OrderJi is built to consolidate channel fragmentation. All incoming orders from Zomato, Swiggy, and your own custom web ordering stores flow directly into the central Live Feed console, printing automatically and dispatching directly to chef station displays.",
    category: "POS & Billing"
  },
  {
    q: "What happens if our restaurant internet goes down?",
    a: "OrderJi features local-cache offline safety loops. The billing terminal queues transaction invoices locally inside the browser. As soon as the network connection is restored, the queue syncs with the cloud database. Customers can continue QR scanning as long as their mobile data is active.",
    category: "POS & Billing"
  },
  {
    q: "Does OrderJi support multi-outlet franchises and warehouses?",
    a: "Yes. Our Scale and Enterprise plans feature centralized multi-outlet inventory dashboards. You can manage central supply warehouses, handle internal stock transfer requests, monitor recipe usage, and track material depletion forecasts across all branches.",
    category: "Inventory & Stock"
  },
  {
    q: "How many kitchen display screens can I connect?",
    a: "Under the Starter plan, KDS is not supported. The Growth plan supports 1 screen, Scale supports up to 5 screens, and the Enterprise plan supports unlimited kitchen display screens. Screens can be partitioned for different stations like Grill, Bar, Main Course, and Desserts.",
    category: "Kitchen (KDS)"
  },
  {
    q: "Does the table QR menu support multiple languages?",
    a: "Yes. The QR ordering menu can translate items, descriptions, and categories dynamically to English, Hindi, Arabic, or regional languages, improving order velocity for tourist-heavy and multi-cultural dining rooms.",
    category: "QR Ordering"
  },
  {
    q: "How long does it take to migrate from Petpooja or Posist?",
    a: "We usually complete standard migrations within 24 hours. Our technical team takes your menu sheet, recipe logs, and customer contacts, cleans the formatting, maps it into your OrderJi database, and tests printer connectivity so you don't face any downtime.",
    category: "Pricing & Setup"
  }
];

export default function FaqPage() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = FAQS.filter(faq => {
    const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
    const matchesSearch = 
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Navbar onBookDemo={() => setIsDemoModalOpen(true)} />

      <main style={{ minHeight: "100vh", background: "var(--bg-primary)", paddingTop: "6rem" }}>
        
        {/* Header Block */}
        <div style={{ textAlign: "center", padding: "4rem 1.5rem 2rem", position: "relative" }}>
          <div className="glow-spot glow-blue" style={{ top: "0", left: "20%", width: "400px", height: "400px", opacity: 0.15 }} />
          <span className="faq-badge font-semibold">
            <AlertCircle size={11} style={{ color: "#e30613" }} /> Help &amp; Resources
          </span>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 900, letterSpacing: "-2px", marginTop: "0.5rem" }}>
            Frequently Asked Questions
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", maxWidth: "580px", margin: "1rem auto 2.5rem", lineHeight: "1.6" }}>
            Find quick solutions regarding hardware sync, multi-outlet pricing, delivery integrations, and menu setup details.
          </p>

          {/* Interactive Search Bar */}
          <div className="search-wrap">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by keywords (e.g. 'printer', 'offline', 'Swiggy')..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Tab categories filter */}
        <div className="container" style={{ maxWidth: 880, marginBottom: "2.5rem" }}>
          <div className="tabs-container">
            {CATEGORIES.map(cat => (
              <button 
                key={cat} 
                onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
                className={`tab-btn ${activeCategory === cat ? "active" : ""}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs list accordion */}
        <div className="container" style={{ maxWidth: 800, paddingBottom: "6rem" }}>
          
          {filteredFaqs.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem 1.5rem", background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: 18 }}>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", fontWeight: 600 }}>No results found for &ldquo;{searchQuery}&rdquo;</p>
              <button onClick={() => { setSearchQuery(""); setActiveCategory("All"); }} className="btn-secondary" style={{ marginTop: "1rem", fontSize: "0.85rem", padding: "0.5rem 1.25rem" }}>
                Clear Filters
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {filteredFaqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div key={idx} style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: 14, overflow: "hidden", padding: "0 1.5rem" }} className="faq-box">
                    <button 
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      style={{ width: "100%", background: "transparent", border: "none", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.4rem 0", cursor: "pointer", textAlign: "left", color: "var(--text-primary)" }}
                    >
                      <span style={{ fontSize: "1.02rem", fontWeight: 700, letterSpacing: "-0.15px" }}>{faq.q}</span>
                      <ChevronDown 
                        size={18} 
                        style={{ 
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", 
                          transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
                          color: isOpen ? "var(--accent-orange)" : "var(--text-muted)" 
                        }} 
                      />
                    </button>
                    <div 
                      style={{ 
                        maxHeight: isOpen ? "240px" : "0", 
                        opacity: isOpen ? 1 : 0, 
                        overflow: "hidden",
                        transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease, padding 0.4s ease",
                        paddingBottom: isOpen ? "1.4rem" : "0"
                      }}
                    >
                      <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>{faq.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Still need help CTA block */}
          <div style={{ marginTop: "5rem", background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: 20, padding: "2.5rem 2rem", display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }} className="support-card shadow-sm">
            <div>
              <span className="faq-badge font-semibold">SUPPORT</span>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 800, marginTop: "0.4rem", marginBottom: "0.5rem" }}>Still have questions?</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.5, margin: 0 }}>
                Can&rsquo;t find what you are looking for? Our operational engineers are online to help guide your setup.
              </p>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", justifyContent: "center" }}>
              <a href="https://wa.me/919876543210?text=Hi%20OrderJi%20team,%20I%20have%20some%20queries%20about%20your%20POS%20system." target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none", color: "#fff", background: "#25d366", padding: "0.75rem 1.25rem", borderRadius: 10, fontSize: "0.9rem", fontWeight: 600 }} className="btn-hover-shift">
                <MessageSquare size={18} /> Chat on WhatsApp
              </a>
              
              <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap", fontSize: "0.85rem", color: "var(--text-secondary)", paddingLeft: "0.5rem" }}>
                <a href="mailto:support@ordrji.com" style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", color: "inherit", textDecoration: "none" }} className="hover-link">
                  <Mail size={14} /> support@ordrji.com
                </a>
                <a href="tel:+919876543210" style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", color: "inherit", textDecoration: "none" }} className="hover-link">
                  <Phone size={14} /> +91 98765 43210
                </a>
              </div>
            </div>
          </div>

        </div>

      </main>

      <Footer />

      <BookDemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />

      <style jsx global>{`
        .faq-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          background: rgba(227, 6, 19, 0.06);
          border: 1px solid rgba(227, 6, 19, 0.18);
          color: var(--accent-orange);
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.7rem;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .search-wrap {
          position: relative;
          max-width: 580px;
          margin: 0 auto;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 1.1rem;
          color: var(--text-muted);
        }

        .search-input {
          width: 100%;
          padding: 0.9rem 1.1rem 0.9rem 2.8rem;
          border-radius: 12px;
          border: 1px solid var(--border-color);
          background: var(--bg-card);
          color: var(--text-primary);
          outline: none;
          font-family: inherit;
          font-size: 0.95rem;
          box-shadow: 0 10px 25px rgba(90,80,70,0.02);
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .search-input:focus {
          border-color: var(--accent-orange);
          box-shadow: 0 0 0 3px rgba(227,6,19,0.08);
          background: #fff;
        }

        .tabs-container {
          display: flex;
          gap: 0.5rem;
          overflow-x: auto;
          padding: 0.25rem;
          scrollbar-width: none;
          justify-content: flex-start;
          border-bottom: 1px solid var(--border-color);
        }
        @media (min-width: 768px) {
          .tabs-container {
            justify-content: center;
          }
        }

        .tab-btn {
          background: transparent;
          border: none;
          padding: 0.5rem 1rem;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-muted);
          cursor: pointer;
          white-space: nowrap;
          border-bottom: 2px solid transparent;
          transition: color 0.2s, border-color 0.2s;
        }
        .tab-btn.active {
          color: var(--accent-orange);
          border-bottom-color: var(--accent-orange);
        }

        .faq-box {
          box-shadow: 0 4px 15px rgba(90,80,70,0.01), 0 0 1px rgba(90,80,70,0.03);
          transition: border-color 0.2s;
        }
        .faq-box:hover {
          border-color: rgba(227, 6, 19, 0.25);
        }

        .btn-hover-shift {
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          justify-content: center;
        }
        .btn-hover-shift:hover {
          background: #20ba5a !important;
          transform: translateY(-1px);
          box-shadow: 0 6px 15px rgba(37,211,102,0.3);
        }

        .hover-link:hover {
          color: var(--accent-orange) !important;
        }

        @media (min-width: 640px) {
          .support-card {
            grid-template-columns: 1fr 240px !important;
          }
        }
      `}</style>
    </>
  );
}
