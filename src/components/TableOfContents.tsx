"use client";

import React, { useEffect, useState } from "react";
import { List } from "lucide-react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ content }: { content: string }) {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Parse the HTML content and look for h2, h3, h4 headings
    const parser = new DOMParser();
    parser.parseFromString(content, "text/html");
    
    const items: TocItem[] = [];
    
    // We also need to add IDs to the headings in the actual DOM if they don't have them
    // To keep it simple, we look at headings in the rendered DOM on the page
    const actualElements = document.querySelectorAll(".blog-post-content h2, .blog-post-content h3, .blog-post-content h4");
    
    actualElements.forEach((el, idx) => {
      const text = el.textContent || "";
      const id = el.id || `heading-${idx}`;
      el.id = id; // ensure ID is set in DOM
      
      let level = 3;
      if (el.tagName === "H2") level = 2;
      if (el.tagName === "H4") level = 4;
      
      items.push({ id, text, level });
    });
    // eslint-disable-next-line
    setHeadings(items);

    // Scroll spy logic
    const handleScroll = () => {
      let currentActive = "";
      actualElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < 150) {
          currentActive = el.id;
        }
      });
      setActiveId(currentActive || (items[0]?.id || ""));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initialize

    return () => window.removeEventListener("scroll", handleScroll);
  }, [content]);

  if (headings.length === 0) return null;

  return (
    <div className="toc-widget">
      <div className="toc-title">
        <List size={16} />
        <span>Table of Contents</span>
      </div>
      <nav className="toc-list">
        {headings.map((h) => (
          <a
            key={h.id}
            href={`#${h.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className={`toc-link level-${h.level} ${activeId === h.id ? "active" : ""}`}
          >
            {h.text}
          </a>
        ))}
      </nav>

      <style jsx global>{`
        .toc-widget {
          position: sticky;
          top: 100px;
          border-left: 2px solid var(--border-color);
          padding-left: 1.25rem;
          margin-bottom: 2rem;
          max-height: 70vh;
          overflow-y: auto;
        }
        .toc-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.72rem;
          font-weight: 800;
          text-transform: uppercase;
          color: var(--text-muted);
          letter-spacing: 0.8px;
          margin-bottom: 0.85rem;
        }
        .toc-list {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }
        .toc-link {
          font-size: 0.82rem;
          color: var(--text-secondary);
          transition: all 0.2s;
          display: block;
          line-height: 1.4;
        }
        .toc-link:hover {
          color: var(--accent-orange);
          padding-left: 2px;
        }
        .toc-link.active {
          color: #c2410c;
          font-weight: 700;
        }
        .toc-link.level-2 { font-weight: 700; font-size: 0.85rem; }
        .toc-link.level-3 { padding-left: 0.5rem; }
        .toc-link.level-3.active { padding-left: 0.5rem; }
        .toc-link.level-4 { padding-left: 1rem; font-size: 0.78rem; }
        .toc-link.level-4.active { padding-left: 1rem; }
      `}</style>
    </div>
  );
}
