"use client";

import React, { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookDemoModal from "@/components/BookDemoModal";
import RegisterRestaurantModal from "@/components/RegisterRestaurantModal";
import FinalCTA from "@/components/FinalCTA";
import { 
  Heart, Shield, Users, Trophy, Sparkles, Target, Zap, 
  ChefHat, BarChart3, TrendingUp, Store, Lock, LifeBuoy,
  CheckCircle2, Clock
} from "lucide-react";

const PILLARS = [
  {
    icon: <Zap size={24} />,
    title: "Sell",
    desc: "POS billing, dine-in, takeaway, delivery, QR ordering, UPI, cash, split payments, refunds, and WhatsApp bills to make checkout quick and accurate."
  },
  {
    icon: <ChefHat size={24} />,
    title: "Serve",
    desc: "KOT generation, Kitchen Display Systems, table management, preparation timers, and delayed-order alerts to smooth kitchen operations."
  },
  {
    icon: <BarChart3 size={24} />,
    title: "Control",
    desc: "Raw-material inventory, automatic stock deduction, purchase management, expiry alerts, food-cost calculations, and wastage tracking."
  },
  {
    icon: <Heart size={24} />,
    title: "Grow",
    desc: "Customer profiles, loyalty points, birthday campaigns, WhatsApp communication, Google review journeys, and inactive-customer win-backs."
  },
  {
    icon: <Store size={24} />,
    title: "Scale",
    desc: "Multi-outlet dashboards, central menu control, central inventory, franchise controls, audit logs, and integration-ready APIs for growth."
  }
];

const DIFFERENCES = [
  { title: "Simplicity", desc: "Clean workflows, clear actions and less training.", icon: <CheckCircle2 size={18} /> },
  { title: "Speed", desc: "Fast billing, ordering and kitchen communication.", icon: <Zap size={18} /> },
  { title: "Reliability", desc: "Operations designed to continue through internet or system interruptions.", icon: <Shield size={18} /> },
  { title: "Restaurant focus", desc: "Workflows created for food businesses rather than generic retail operations.", icon: <ChefHat size={18} /> },
  { title: "Owner visibility", desc: "Reports that provide answers and actions, not only spreadsheets.", icon: <BarChart3 size={18} /> },
  { title: "Customer growth", desc: "Direct ordering, CRM, loyalty and repeat-customer tools.", icon: <TrendingUp size={18} /> },
  { title: "Accessible scale", desc: "A system that supports both independent outlets and growing chains.", icon: <Store size={18} /> },
  { title: "Human support", desc: "Onboarding, training and operational assistance from people who understand restaurant pressure.", icon: <LifeBuoy size={18} /> }
];

export default function AboutPage() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  return (
    <>
      <Navbar onBookDemo={() => setIsDemoModalOpen(true)} onRegister={() => setIsRegisterModalOpen(true)} />

      <main style={{ minHeight: "100vh", background: "var(--bg-primary)", paddingTop: "6rem" }}>
        
        {/* Hero Section */}
        <section style={{ padding: "6rem 1.5rem 5rem", position: "relative", overflow: "hidden", borderBottom: "1px solid var(--border-color)", background: "var(--bg-secondary)" }}>
          <div className="glow-spot glow-rose" style={{ top: "-50px", right: "20%", width: "400px", height: "400px" }} />
          <div className="container" style={{ maxWidth: 900, textAlign: "center" }}>
            <span className="about-badge font-semibold">
              <Sparkles size={11} style={{ color: "#da0404" }} /> About Ordrji
            </span>
            <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, letterSpacing: "-2px", marginTop: "1rem", marginBottom: "1.5rem", lineHeight: 1.1 }}>
              Built for the real world <br /> of restaurants.
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.15rem", lineHeight: "1.7", maxWidth: "720px", margin: "0 auto", marginBottom: "2rem" }}>
              Ordrji is building a modern Restaurant Operating System for India's food businesses. We help restaurants, cafés, bakeries, cake and dessert shops, QSRs, cloud kitchens, food courts and growing chains manage their daily operations from one connected platform.
            </p>
            <p style={{ color: "var(--text-primary)", fontSize: "1.25rem", fontWeight: 600, maxWidth: "680px", margin: "0 auto" }}>
              Our goal is straightforward: Help food businesses run faster, smarter and more profitably.
            </p>
            <div style={{ marginTop: "3rem", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
              Ordrji is a brand operated by SYNCKRAFT TECHNOLOGIES PVT. LTD., based in Amravati, Maharashtra.
            </div>
          </div>
        </section>

        {/* Why We Started */}
        <section style={{ padding: "6rem 0" }}>
          <div className="container" style={{ maxWidth: 900 }}>
            <div style={{ marginBottom: "3rem" }}>
              <h2 style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-1px", marginBottom: "1.25rem" }}>
                Why we started Ordrji
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.7 }}>
                <p>
                  Restaurants operate in one of the most demanding business environments. During busy hours, every second matters. A slow billing counter creates queues. A missed KOT delays the kitchen. A printer failure creates confusion. An incorrect discount affects margins. Poor inventory visibility causes wastage. Missing customer data makes repeat business harder.
                </p>
                <p>
                  Yet many restaurant owners still depend on disconnected software systems, complicated interfaces, manual order-taking, paper-based kitchen communication, difficult inventory processes, reports that show numbers but provide no clear answers, slow onboarding, costly add-on modules, and support that may not be available when the restaurant needs it most.
                </p>
                <p style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: "1.15rem", marginTop: "1rem" }}>
                  We created Ordrji because restaurant software should reduce operational pressure—not add to it.
                </p>
                <p>
                  Our belief is that a restaurant owner should not need to become a software expert to understand the business. A cashier should not need weeks of training to create a bill. A waiter should not struggle to place an order. A kitchen team should not have to interpret confusing information. An owner should be able to understand sales, costs, stock and staff activity without searching through dozens of reports.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* More than a POS system */}
        <section style={{ padding: "6rem 0", background: "var(--bg-secondary)", borderTop: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)" }}>
          <div className="container" style={{ maxWidth: 1100 }}>
            <div style={{ textAlign: "center", marginBottom: "4rem", maxWidth: "800px", margin: "0 auto 4rem auto" }}>
              <span className="about-badge font-semibold">ECOSYSTEM</span>
              <h2 style={{ fontSize: "2.2rem", fontWeight: 800, letterSpacing: "-1px", marginTop: "0.5rem" }}>
                More than a POS system
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", marginTop: "1rem" }}>
                Ordrji is not being built as another billing application. It is being built as a complete Restaurant Operating System that helps food businesses manage five essential areas.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }} className="pillars-grid">
              {PILLARS.map((val, idx) => (
                <div key={idx} style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: 16, padding: "2rem", transition: "transform 0.2s, box-shadow 0.2s" }} className="value-card shadow-sm hover-card">
                  <div style={{ color: "var(--accent-orange)", background: "rgba(227,6,19,0.06)", width: 48, height: 48, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                    {val.icon}
                  </div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "0.75rem" }}>{val.title}</h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6 }}>{val.desc}</p>
                </div>
              ))}
            </div>
            
            <div style={{ textAlign: "center", marginTop: "4rem" }}>
              <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", fontStyle: "italic" }}>
                "Simple enough for one café. Powerful enough for a national chain."
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section style={{ padding: "6rem 0" }}>
          <div className="container" style={{ maxWidth: 1100 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem" }} className="mission-grid">
              
              <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", padding: "3rem", borderRadius: 24 }} className="glass-card shadow-sm hover-card">
                <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 56, height: 56, borderRadius: 14, background: "rgba(227, 6, 19, 0.08)", color: "var(--accent-orange)", marginBottom: "1.5rem" }}>
                  <Target size={28} />
                </div>
                <h3 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "1rem" }}>Our Mission</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                  To make restaurant management simpler, faster and more dependable for Indian food businesses. We are building Ordrji to help restaurants reduce mistakes, improve kitchen communication, train staff easily, understand performance, reduce wastage, build customer relationships, manage from anywhere, and grow with confidence.
                </p>
                <p style={{ color: "var(--text-primary)", fontSize: "1rem", lineHeight: 1.6, fontWeight: 500 }}>
                  We do not measure a feature only by how advanced it appears. Every feature should save time, reduce mistakes, improve control, reduce costs, increase revenue, or improve the experience. If it doesn't, it doesn't belong.
                </p>
              </div>

              <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", padding: "3rem", borderRadius: 24 }} className="glass-card shadow-sm hover-card">
                <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 56, height: 56, borderRadius: 14, background: "rgba(2, 132, 199, 0.08)", color: "#0284c7", marginBottom: "1.5rem" }}>
                  <Users size={28} />
                </div>
                <h3 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "1rem" }}>Our Vision</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                  To make Ordrji one of India's most trusted operating platforms for restaurants. We want to combine the speed of a billing system, the simplicity of a consumer app, the reliability of critical software, the intelligence of analytics, and the support of a local tech partner.
                </p>
                <p style={{ color: "var(--text-primary)", fontSize: "1rem", lineHeight: 1.6, fontWeight: 500 }}>
                  We build for real Indian operating conditions: normal computers, commonly available printers, different staff skill levels, inconsistent internet, and intense rushes.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Key Focus Areas */}
        <section style={{ padding: "6rem 0", background: "var(--bg-secondary)", borderTop: "1px solid var(--border-color)" }}>
          <div className="container" style={{ maxWidth: 900 }}>
            
            {/* Design & People */}
            <div style={{ marginBottom: "5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                <Users size={32} color="var(--accent-orange)" />
                <h2 style={{ fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.5px", margin: 0 }}>Designed around people, not screens</h2>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                Restaurant software is used by people with different responsibilities. An owner wants visibility, a manager wants control, a cashier wants fast billing, a waiter wants simple ordering, and a kitchen team wants clear priority.
              </p>
              <p style={{ color: "var(--text-primary)", fontSize: "1.05rem", lineHeight: 1.7, fontWeight: 500 }}>
                That is why Ordrji is designed around role-based experiences. The interface should feel clear and familiar, not like complicated accounting software.
              </p>
            </div>

            {/* Reliability */}
            <div style={{ marginBottom: "5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                <Shield size={32} color="var(--accent-orange)" />
                <h2 style={{ fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.5px", margin: 0 }}>Reliability is part of the product</h2>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                Restaurants depend on software while customers wait, phones ring, printers run, and kitchens scramble. That is why reliability is our most important principle.
              </p>
              <p style={{ color: "var(--text-primary)", fontSize: "1.05rem", lineHeight: 1.7, fontWeight: 500 }}>
                Restaurant software must perform at its best when the restaurant is at its busiest. Offline-capable operations, local saving, dependable printing, and recovery safeguards are non-negotiable foundations.
              </p>
            </div>

            {/* Support */}
            <div style={{ marginBottom: "5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                <LifeBuoy size={32} color="var(--accent-orange)" />
                <h2 style={{ fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.5px", margin: 0 }}>Support is not an afterthought</h2>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                Owners should not feel abandoned after purchasing software. Successful implementation requires guided onboarding, menu setup, staff training, and post-installation handholding.
              </p>
              <p style={{ color: "var(--text-primary)", fontSize: "1.05rem", lineHeight: 1.7, fontWeight: 500 }}>
                We want restaurant owners to see Ordrji as a dependable operating partner—not merely a software vendor.
              </p>
            </div>

            {/* Business Types */}
            <div style={{ marginBottom: "5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                <Store size={32} color="var(--accent-orange)" />
                <h2 style={{ fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.5px", margin: 0 }}>Built for different food businesses</h2>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                A fine-dining restaurant does not work like a bakery. A cloud kitchen does not work like a café. Ordrji is being developed for restaurants, cafés, QSRs, cloud kitchens, bakeries, food courts, and franchise groups.
              </p>
              <p style={{ color: "var(--text-primary)", fontSize: "1.05rem", lineHeight: 1.7, fontWeight: 500 }}>
                Our aim is to understand these differences and build deeper workflows for specific categories instead of forcing every business into the same generic workflow.
              </p>
            </div>

            {/* Responsible Tech */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                <Lock size={32} color="var(--accent-orange)" />
                <h2 style={{ fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.5px", margin: 0 }}>Responsible technology</h2>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                Restaurant systems process important data. Ordrji is committed to responsible practices around access control, secure authentication, backups, privacy, and transparent communication.
              </p>
              <p style={{ color: "var(--text-primary)", fontSize: "1.05rem", lineHeight: 1.7, fontWeight: 500 }}>
                We believe AI and insights should provide practical help—not unnecessary complexity. Insights should support the owner’s judgement, not replace it.
              </p>
            </div>

          </div>
        </section>

        {/* What Makes Us Different */}
        <section style={{ padding: "6rem 0" }}>
          <div className="container" style={{ maxWidth: 1100 }}>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <span className="about-badge font-semibold">DIFFERENTIATORS</span>
              <h2 style={{ fontSize: "2.2rem", fontWeight: 800, letterSpacing: "-1px", marginTop: "0.5rem" }}>
                What makes Ordrji different
              </h2>
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem" }} className="diff-grid">
              {DIFFERENCES.map((diff, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "1rem", background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: 12, padding: "1.5rem", transition: "transform 0.2s" }} className="hover-card">
                  <div style={{ marginTop: "3px", color: "var(--accent-orange)" }}>
                    {diff.icon}
                  </div>
                  <div>
                    <h4 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.25rem" }}>{diff.title}</h4>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.5, margin: 0 }}>{diff.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Promise & Short About */}
        <section style={{ padding: "6rem 0", background: "var(--bg-secondary)", borderTop: "1px solid var(--border-color)" }}>
          <div className="container" style={{ maxWidth: 800, textAlign: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 64, height: 64, borderRadius: 16, background: "rgba(227, 6, 19, 0.08)", color: "var(--accent-orange)", marginBottom: "2rem" }}>
              <Clock size={32} />
            </div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 900, letterSpacing: "-1px", marginBottom: "1.5rem" }}>
              Our promise
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.15rem", lineHeight: 1.7, marginBottom: "2rem" }}>
              We are not building software screens for the sake of building software. We are building daily operating confidence for food-business owners. Every bill created, every KOT sent, every payment recorded, every stock movement tracked and every report viewed represents a real business operation. We take that responsibility seriously.
            </p>
            <div style={{ background: "var(--bg-primary)", padding: "2rem", borderRadius: 16, border: "1px solid var(--border-color)", marginBottom: "3rem" }}>
              <p style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)", margin: 0 }}>
                Ordrji stands for:<br/>
                Faster operations. Clearer control. Stronger customer relationships. Smarter growth.
              </p>
              <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px dashed var(--border-color)" }}>
                <p style={{ color: "var(--accent-orange)", fontWeight: 700, fontSize: "1.1rem", margin: 0 }}>
                  Run your restaurant faster, smarter and more profitably with Ordrji.
                </p>
              </div>
            </div>

            {/* Short About Text block */}
            <div style={{ textAlign: "left", background: "rgba(0,0,0,0.02)", padding: "1.5rem", borderRadius: 12, border: "1px solid var(--border-color)" }}>
              <h4 style={{ fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "0.75rem" }}>About Us in Short</h4>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
                Ordrji is a modern Restaurant Operating System developed by SYNCKRAFT TECHNOLOGIES PVT. LTD. for restaurants, cafés, QSRs, bakeries, cloud kitchens and growing food brands. Our platform is designed to bring billing, KOT, QR ordering, inventory, customer engagement, reporting and multi-outlet management together in one simple system. We focus on fast operations, easy staff training, dependable support and clear owner-level insights—helping food businesses run faster, smarter and more profitably.
              </p>
            </div>
          </div>
        </section>

        {/* Reusable Final CTA Section */}
        <section style={{ padding: "6rem 0", background: "var(--bg-primary)" }}>
          <div className="container" style={{ maxWidth: 800, textAlign: "center" }}>
            <h2 style={{ fontSize: "2.5rem", fontWeight: 900, letterSpacing: "-1px", marginBottom: "1rem" }}>
              Let us build a better restaurant operation together
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.15rem", lineHeight: 1.6, marginBottom: "3rem" }}>
              Whether you run one café, a busy restaurant, a bakery, a cloud kitchen or a growing food brand, Ordrji is being built to give you greater speed, visibility and control—without unnecessary complexity.
            </p>
            
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem", marginBottom: "3rem" }}>
              <button 
                onClick={() => setIsDemoModalOpen(true)}
                style={{ padding: "0.85rem 2rem", background: "var(--accent-orange)", color: "#fff", border: "none", borderRadius: "9999px", fontWeight: 700, fontSize: "1.05rem", cursor: "pointer", transition: "transform 0.2s, background 0.2s" }}
                className="hover-scale"
              >
                Book a free demo
              </button>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "2rem", color: "var(--text-secondary)", fontSize: "1rem", fontWeight: 500 }}>
              <a href="mailto:hello@ordrji.com" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span>Email: hello@ordrji.com</span>
              </a>
              <a href="tel:+919004402006" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span>Call or WhatsApp: +91 90044 02006</span>
              </a>
            </div>
          </div>
        </section>
        
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

        .hover-scale:hover {
          transform: scale(1.05);
          background: #c50505 !important;
        }

        @media (min-width: 768px) {
          .pillars-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          .mission-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .diff-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (min-width: 1024px) {
          .diff-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
      `}</style>
    </>
  );
}
