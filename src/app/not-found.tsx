"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookDemoModal from "@/components/BookDemoModal";
import { Home, PhoneCall, Sparkles } from "lucide-react";

export default function NotFound() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <>
      <Navbar onBookDemo={() => setIsDemoModalOpen(true)} />

      <main style={{ minHeight: "85vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-primary)", padding: "8rem 1.5rem 4rem" }}>
        
        <div style={{ textAlign: "center", maxWidth: 540 }} className="notfound-container">
          {/* visual badge */}
          <span className="notfound-badge">
            <Sparkles size={11} style={{ color: "#e30613" }} /> Error 404
          </span>

          {/* giant title */}
          <h1 style={{ fontSize: "clamp(4.5rem, 10vw, 7.5rem)", fontWeight: 900, lineHeight: 1, letterSpacing: "-5px", margin: "0.5rem 0", color: "var(--text-primary)" }}>
            404
          </h1>

          <h2 style={{ fontSize: "1.45rem", fontWeight: 800, letterSpacing: "-0.5px", marginBottom: "0.75rem", color: "var(--text-primary)" }}>
            This Page Went Off-Menu
          </h2>

          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "2rem" }}>
            The link you clicked might be broken, or the page has been moved. Let&apos;s get your restaurant operations back on track.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", justifyContent: "center" }} className="notfound-actions">
            <Link href="/" className="btn-primary btn-orange" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", padding: "0.75rem 2rem", fontSize: "0.95rem" }}>
              <Home size={15} /> Go to Homepage
            </Link>
            
            <button onClick={() => setIsDemoModalOpen(true)} className="btn-secondary" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", padding: "0.75rem 2rem", fontSize: "0.95rem" }}>
              <PhoneCall size={15} /> Book Free Demo
            </button>
          </div>
        </div>

      </main>

      <Footer />

      <BookDemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />

      <style jsx global>{`
        .notfound-badge {
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

        .btn-orange {
          background: var(--accent-orange) !important;
          color: #fff !important;
          border: 1px solid transparent !important;
        }
        .btn-orange:hover {
          background: #c4040f !important;
          box-shadow: 0 8px 20px -6px rgba(227, 6, 19, 0.45);
        }

        @media (min-width: 520px) {
          .notfound-actions {
            flex-direction: row !important;
          }
        }
      `}</style>
    </>
  );
}
