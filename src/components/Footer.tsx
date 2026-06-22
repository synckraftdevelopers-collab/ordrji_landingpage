"use client";

import React from "react";
import Link from "next/link";
import { Globe, Mail, MessageSquare, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border-color)",
        padding: "5rem 0 3rem 0",
        position: "relative",
        overflow: "hidden",
        zIndex: 10
      }}
    >
      {/* Background glow */}
      <div className="glow-spot glow-rose" style={{ bottom: "-100px", left: "10%", width: "300px", height: "300px" }} />

      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "3rem",
            marginBottom: "4rem",
          }}
        >
          {/* Brand Info */}
          <div style={{ gridColumn: "span 2" }}>
            <a href="#" style={{ display: "flex", alignItems: "center", gap: "0.25rem", marginBottom: "1.5rem" }}>
              <img 
                src="/logo.jpg" 
                alt="ordrji Logo" 
                style={{ 
                  height: "54px", 
                  width: "54px",
                  objectFit: "contain",
                  mixBlendMode: "multiply"
                }} 
              />
              <span style={{ fontSize: "0.6rem", padding: "0.15rem 0.4rem", background: "rgba(227, 6, 19, 0.08)", border: "1px solid rgba(227, 6, 19, 0.2)", borderRadius: "4px", color: "var(--accent-orange)", fontWeight: 600, marginLeft: "0.25rem" }}>
                OS
              </span>
            </a>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.6", maxWidth: "320px", marginBottom: "1.5rem" }}>
              The complete restaurant operating system designed to manage billing, operations, CRM, KDS, inventory, and analytics from a unified command center.
            </p>
            <div style={{ display: "flex", gap: "1rem" }}>
              <a href="#" className="social-icon" aria-label="Website"><Globe size={18} /></a>
              <a href="#" className="social-icon" aria-label="Contact"><Mail size={18} /></a>
              <a href="#" className="social-icon" aria-label="Support"><MessageSquare size={18} /></a>
            </div>
          </div>

          {/* Column 1 - Modules */}
          <div>
            <h4 style={{ fontSize: "0.9rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-primary)", marginBottom: "1.25rem" }}>Modules</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <li><a href="#features" className="footer-link">Billing Engine</a></li>
              <li><a href="#journey" className="footer-link">QR Order Journey</a></li>
              <li><a href="#floor" className="footer-link">Kitchen Display (KDS)</a></li>
              <li><a href="#features" className="footer-link">Inventory Control</a></li>
              <li><a href="#crm" className="footer-link">Marketing Automation</a></li>
            </ul>
          </div>

          {/* Column 2 - Roles */}
          <div>
            <h4 style={{ fontSize: "0.9rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-primary)", marginBottom: "1.25rem" }}>Roles</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <li><a href="#roles" className="footer-link">For Restaurant Owners</a></li>
              <li><a href="#roles" className="footer-link">For Managers</a></li>
              <li><a href="#roles" className="footer-link">For Chefs & Kitchens</a></li>
              <li><a href="#roles" className="footer-link">For Waiters</a></li>
              <li><a href="#roles" className="footer-link">For Cashiers</a></li>
            </ul>
          </div>

          {/* Column 3 - Enterprise */}
          <div>
            <h4 style={{ fontSize: "0.9rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-primary)", marginBottom: "1.25rem" }}>Company</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <li><a href="#" className="footer-link">About Us</a></li>
              <li><a href="#" className="footer-link">Success Stories</a></li>
              <li><Link href="/contact" className="footer-link">Contact Us</Link></li>
              <li><Link href="/privacy-policy" className="footer-link">Privacy Policy</Link></li>
              <li><Link href="/terms" className="footer-link">Terms & Conditions</Link></li>
              <li><Link href="/refund-cancellation" className="footer-link">Refund & Cancellation</Link></li>
            </ul>
          </div>
        </div>

        <div className="divider" style={{ margin: "2rem 0" }} />

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            color: "var(--text-muted)",
            fontSize: "0.85rem",
            gap: "1.5rem",
          }}
        >
          <span>&copy; {new Date().getFullYear()} OrderJi. All rights reserved.</span>
          <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
            Engineered with <Heart size={12} color="var(--accent-rose)" fill="var(--accent-rose)" /> for modern dining experiences.
          </span>
        </div>
      </div>

      <style jsx global>{`
        .footer-link {
          color: var(--text-secondary);
          font-size: 0.9rem;
          transition: var(--transition-fast);
        }
        .footer-link:hover {
          color: var(--text-primary);
          padding-left: 2px;
        }
        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.02);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          transition: var(--transition-fast);
        }
        .social-icon:hover {
          background: rgba(0, 0, 0, 0.05);
          border-color: var(--border-color-hover);
          color: var(--text-primary);
          transform: translateY(-2px);
        }
      `}</style>
    </footer>
  );
}
