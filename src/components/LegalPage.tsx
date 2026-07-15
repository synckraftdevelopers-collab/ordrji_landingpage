"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";

interface Section { title: string; body: React.ReactNode; }

interface LegalPageProps {
  badge:       string;
  title:       string;
  subtitle:    string;
  lastUpdated: string;
  sections:    Section[];
}

export default function LegalPage({ badge, title, subtitle, lastUpdated, sections }: LegalPageProps) {
  const [activeId, setActiveId] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // highlight the nav item whose section is currently in view
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = parseInt((e.target as HTMLElement).dataset.idx || "0");
            setActiveId(idx);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    const nodes = contentRef.current?.querySelectorAll("[data-idx]");
    nodes?.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (idx: number) => {
    const el = contentRef.current?.querySelector(`[data-idx="${idx}"]`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", paddingTop: "6rem" }}>

      {/* hero band */}
      <div style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border-color)", padding: "3rem 0 2.5rem" }}>
        <div className="container" style={{ maxWidth: 1100 }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "var(--text-muted)", fontSize: "0.82rem", fontWeight: 600, textDecoration: "none", marginBottom: "1.5rem" }}>
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <span style={{ display: "block", fontSize: "0.68rem", fontWeight: 800, letterSpacing: "2px", color: "var(--accent-orange)", textTransform: "uppercase", marginBottom: "0.5rem" }}>{badge}</span>
          <h1 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, letterSpacing: "-1.5px", marginBottom: "0.75rem" }}>{title}</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem", maxWidth: 560, lineHeight: 1.6, marginBottom: "1rem" }}>{subtitle}</p>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>
            <Calendar size={13} /> Last updated: {lastUpdated}
          </span>
        </div>
      </div>

      {/* body: sticky TOC + content */}
      <div className="container legal-body" style={{ maxWidth: 1100, padding: "3rem 1.5rem 6rem" }}>

        {/* sticky sidebar TOC */}
        <nav className="legal-toc">
          <p style={{ fontSize: "0.68rem", fontWeight: 800, letterSpacing: "1.5px", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "0.75rem" }}>Contents</p>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.2rem" }}>
            {sections.map((s, i) => (
              <li key={i}>
                <button
                  onClick={() => scrollTo(i)}
                  className={`legal-toc-btn ${activeId === i ? "legal-toc-active" : ""}`}
                >
                  {s.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* main content */}
        <div ref={contentRef} className="legal-content">
          {sections.map((s, i) => (
            <div key={i} data-idx={i} className="legal-section">
              <h2 className="legal-section-title">{s.title}</h2>
              <div className="legal-section-body">{s.body}</div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .legal-body {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: start;
        }
        @media (min-width: 1024px) {
          .legal-body { grid-template-columns: 240px 1fr; }
        }

        /* sticky TOC */
        .legal-toc {
          position: sticky; top: 5rem;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 14px;
          padding: 1.5rem;
          display: none;
        }
        @media (min-width: 1024px) { .legal-toc { display: block; } }

        .legal-toc-btn {
          display: block; width: 100%; text-align: left;
          background: none; border: none; cursor: pointer;
          font-size: 0.78rem; font-weight: 500;
          color: var(--text-muted);
          padding: 0.35rem 0.6rem;
          border-radius: 6px;
          transition: color 0.2s, background 0.2s;
          line-height: 1.4;
        }
        .legal-toc-btn:hover { color: var(--text-primary); background: rgba(0,0,0,0.03); }
        .legal-toc-active {
          color: var(--accent-orange) !important;
          background: rgba(227,6,19,0.06) !important;
          font-weight: 700 !important;
        }

        /* sections */
        .legal-content { display: flex; flex-direction: column; gap: 2.5rem; }

        .legal-section {
          padding-bottom: 2.5rem;
          border-bottom: 1px solid var(--border-color);
          scroll-margin-top: 6rem;
        }
        .legal-section:last-child { border-bottom: none; }

        .legal-section-title {
          font-size: 1.15rem; font-weight: 800;
          letter-spacing: -0.3px; margin-bottom: 0.85rem;
          color: var(--text-primary);
        }
        .legal-section-body {
          font-size: 0.95rem; line-height: 1.75;
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  );
}
