"use client";

import React, { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookDemoModal from "@/components/BookDemoModal";
import RegisterRestaurantModal from "@/components/RegisterRestaurantModal";
import FinalCTA from "@/components/FinalCTA";
import { Compass, Eye, Heart, Shield, Users, Trophy, Sparkles } from "lucide-react";

const CORE_VALUES = [
  {
    icon: <Shield size={24} />,
    title: "Uncompromising Reliability",
    desc: "A restaurant billing system cannot crash during peak rush. We build local-offline safeguards and core redundancies into every module."
  },
  {
    icon: <Users size={24} />,
    title: "Customer First, Always",
    desc: "We build for the chef who preps at 5 AM and the owner managing cashflows at midnight. Our 24/7 telephone support is a promise, not a sales line."
  },
  {
    icon: <Trophy size={24} />,
    title: "Empowering Independence",
    desc: "No order commissions. Restaurants should keep the margins they work so hard to make. We succeed when our partners run independently."
  },
  {
    icon: <Heart size={24} />,
    title: "Radical Transparency",
    desc: "Predictable monthly pricing with zero lookup fees or hardware lockout loops. We believe in clear, open business relationships."
  }
];

const TIMELINE_EVENTS = [
  { year: "2022", title: "The Spark", desc: "OrderJi was founded by restaurant operators and developers frustrated with legacy, disconnected cash registers that crashed during lunch rushes." },
  { year: "2023", title: "First 100 Outlets", desc: "Launched our cloud billing engine and standard Dine-In QR menus. Grew to support 100 busy cafes across Bengaluru." },
  { year: "2024", title: "Unified OS Launch", desc: "Integrated the Kitchen Display System (KDS) and predictive raw materials inventory tracking to create the first unified Restaurant OS." },
  { year: "2025", title: "3,500+ Outlets & Multi-City Sync", desc: "Expanded across 15 cities in India, supporting multi-chain franchise groups, QSRs, cloud kitchens, and fine dining formats." }
];

const TEAM_MEMBERS = [
  { name: "Vikram R.", role: "Co-Founder & CEO", desc: "Former culinary director and franchise owner with 15+ years of F&B operational experience.", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300" },
  { name: "Priya Sharma", role: "Co-Founder & CTO", desc: "Ex-SaaS architect specialized in real-time database sync loops and high-throughput offline cashiers.", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300" },
  { name: "Arjun Mehta", role: "Head of Operations & Support", desc: "Directs customer onboarding, legacy POS migrations, and 24/7 support engineer teams.", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300" }
];

const GALLERY_PHOTOS = [
  { url: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600", caption: "Premium kitchen sync and prep display systems" },
  { url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600", caption: "Collaborative development and support headquarters" },
  { url: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&q=80&w=600", caption: "Live testing of offline local printer spools" },
  { url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=600", caption: "Ensuring customer checkouts are fast and smooth" }
];

export default function AboutPage() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  return (
    <>
      <Navbar onBookDemo={() => setIsDemoModalOpen(true)} onRegister={() => setIsRegisterModalOpen(true)} />

      <main style={{ minHeight: "100vh", background: "var(--bg-primary)", paddingTop: "6rem" }}>
        
        {/* Hero Band */}
        <section style={{ padding: "5rem 1.5rem 4rem", position: "relative", overflow: "hidden", borderBottom: "1px solid var(--border-color)", background: "var(--bg-secondary)" }}>
          <div className="glow-spot glow-rose" style={{ top: "-50px", right: "20%", width: "400px", height: "400px" }} />
          <div className="container" style={{ maxWidth: 900, textAlign: "center" }}>
            <span className="about-badge font-semibold">
              <Sparkles size={11} style={{ color: "#e30613" }} /> Our Story
            </span>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 900, letterSpacing: "-2px", marginTop: "0.5rem", marginBottom: "1.25rem" }}>
              Rebuilding the Operating Workspace <br />
              of Modern Restaurants.
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", lineHeight: "1.65", maxWidth: "680px", margin: "0 auto" }}>
              We believe that restaurants deserve the same world-class software infrastructure as tech companies. OrderJi is designed to simplify kitchen workflows, eliminate channel fragmentation, and let staff focus on hospitality.
            </p>
          </div>
        </section>

        {/* Company Story & Mission/Vision */}
        <section style={{ padding: "6rem 0" }}>
          <div className="container" style={{ maxWidth: 1100 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "4rem" }} className="about-grid">
              
              {/* Detailed Story block */}
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <h2 style={{ fontSize: "1.85rem", fontWeight: 800, letterSpacing: "-0.8px", marginBottom: "1.25rem" }}>
                  Born on the Kitchen Floor
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.7 }}>
                  <p>
                    A restaurant workspace is one of the most intense, high-speed environments in the service industry. Yet, for years, restaurant managers have had to fight with legacy cash boxes, unstable print buffers, and disconnected tablets beep-beeping at them from Swiggy and Zomato.
                  </p>
                  <p>
                    We set out to change that. We believed that POS billing, kitchen coordinators (KDS), menu management, and inventory forecasts shouldn&apos;t live in isolated silos. They should live inside a single, unified database.
                  </p>
                  <p>
                    Today, OrderJi supports over 3,500 outlets across India, from cozy cafe bistros to massive franchise brands, pushing millions of transactions daily with an uptime of 99.99%.
                  </p>
                </div>
              </div>

              {/* Mission / Vision Cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", padding: "2.25rem", borderRadius: 18 }} className="glass-card shadow-sm">
                  <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: 10, background: "rgba(227, 6, 19, 0.07)", color: "var(--accent-orange)", marginBottom: "1.25rem" }}>
                    <Compass size={20} />
                  </div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "0.5rem" }}>Our Mission</h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                    To provide restaurant teams with commission-free, fast, and resilient operating tools that reduce kitchen delay, prevent raw material wastage, and improve checkout margins.
                  </p>
                </div>

                <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", padding: "2.25rem", borderRadius: 18 }} className="glass-card shadow-sm">
                  <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: 10, background: "rgba(2, 132, 199, 0.07)", color: "#0284c7", marginBottom: "1.25rem" }}>
                    <Eye size={20} />
                  </div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "0.5rem" }}>Our Vision</h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                    To build the global benchmark platform for food and beverage retail, ensuring that single cafes and multi-national franchises alike can automate workflows instantly.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Core Values */}
        <section style={{ padding: "6rem 0", background: "var(--bg-secondary)", borderTop: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)" }}>
          <div className="container" style={{ maxWidth: 1100 }}>
            
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <span className="about-badge font-semibold">BELIEFS</span>
              <h2 style={{ fontSize: "1.85rem", fontWeight: 800, letterSpacing: "-1px", marginTop: "0.5rem" }}>
                Our Core Values
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                The principles driving our technology, operations, and customer support channels.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }} className="values-grid">
              {CORE_VALUES.map((val, idx) => (
                <div key={idx} style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: 16, padding: "2rem", transition: "transform 0.2s, box-shadow 0.2s" }} className="value-card shadow-sm hover-card">
                  <div style={{ color: "var(--accent-orange)", background: "rgba(227,6,19,0.06)", width: 44, height: 44, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                    {val.icon}
                  </div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "0.5rem" }}>{val.title}</h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: 1.6 }}>{val.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Interactive Milestones Timeline */}
        <section style={{ padding: "6rem 0" }}>
          <div className="container" style={{ maxWidth: 800 }}>
            
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <span className="about-badge font-semibold">ROADMAP</span>
              <h2 style={{ fontSize: "1.85rem", fontWeight: 800, letterSpacing: "-1px", marginTop: "0.5rem" }}>
                Our Milestones
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                How we went from a dining table prototype to a national restaurant operations platform.
              </p>
            </div>

            <div className="vertical-timeline" style={{ position: "relative", paddingLeft: "2.5rem", borderLeft: "2px solid var(--border-color)" }}>
              {TIMELINE_EVENTS.map((evt, idx) => (
                <div key={idx} className="timeline-node" style={{ position: "relative", marginBottom: "3rem" }}>
                  {/* node dot */}
                  <div style={{ position: "absolute", left: "calc(-2.5rem - 7px)", top: "4px", width: "12px", height: "12px", borderRadius: "50%", background: "var(--accent-orange)", border: "3px solid var(--bg-primary)" }} />
                  
                  <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--accent-orange)", textTransform: "uppercase" }}>{evt.year}</span>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 800, marginTop: "0.15rem", marginBottom: "0.4rem" }}>{evt.title}</h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.6 }}>{evt.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Team Members */}
        <section style={{ padding: "6rem 0", background: "var(--bg-secondary)", borderTop: "1px solid var(--border-color)" }}>
          <div className="container" style={{ maxWidth: 1100 }}>
            
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <span className="about-badge font-semibold">LEADERSHIP</span>
              <h2 style={{ fontSize: "1.85rem", fontWeight: 800, letterSpacing: "-1px", marginTop: "0.5rem" }}>
                Meet the Founders &amp; Team
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                Restaurateurs and engineers dedicated to improving the food retail workspace.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }} className="team-grid">
              {TEAM_MEMBERS.map((m, idx) => (
                <div key={idx} style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: 18, overflow: "hidden", display: "flex", flexDirection: "column", transition: "transform 0.2s" }} className="team-card hover-card">
                  <div style={{ height: "260px", overflow: "hidden", position: "relative" }}>
                    <Image src={m.img} alt={m.name} fill style={{ objectFit: "cover" }} />
                  </div>
                  <div style={{ padding: "1.5rem" }}>
                    <h3 style={{ fontSize: "1.15rem", fontWeight: 800, marginBottom: "0.2rem" }}>{m.name}</h3>
                    <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--accent-orange)", textTransform: "uppercase", letterSpacing: "0.5px" }}>{m.role}</span>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginTop: "0.75rem", lineHeight: 1.5 }}>{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Visual Office/Kitchen Gallery */}
        <section style={{ padding: "6rem 0" }}>
          <div className="container" style={{ maxWidth: 1100 }}>
            
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <span className="about-badge font-semibold">WORKSPACE</span>
              <h2 style={{ fontSize: "1.85rem", fontWeight: 800, letterSpacing: "-1px", marginTop: "0.5rem" }}>
                Our Operations Gallery
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                Behind the scenes testing offline spools, supporting outlets, and building software.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }} className="gallery-grid">
              {GALLERY_PHOTOS.map((p, idx) => (
                <div key={idx} style={{ position: "relative", borderRadius: 16, overflow: "hidden", height: 280, boxShadow: "0 8px 25px rgba(0,0,0,0.02)" }} className="gallery-card hover-card">
                  <Image src={p.url} alt={p.caption} fill style={{ objectFit: "cover", transition: "transform 0.5s" }} className="gallery-img" />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)", padding: "1.5rem 1.25rem", color: "#fff" }}>
                    <p style={{ fontSize: "0.88rem", fontWeight: 600, margin: 0 }}>{p.caption}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Reusable Final CTA Section */}
        <FinalCTA onBookDemo={() => setIsDemoModalOpen(true)} />
      </main>

      <Footer />

      <BookDemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
      <RegisterRestaurantModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />

      <style jsx global>{`
        .about-badge {
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

        .hover-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(90, 80, 70, 0.08) !important;
        }

        .gallery-card:hover .gallery-img {
          transform: scale(1.04);
        }

        @media (min-width: 768px) {
          .about-grid {
            grid-template-columns: 1.1fr 0.9fr !important;
          }
          .values-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .team-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </>
  );
}
