"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

const IG_HANDLE = "ordrji";
const IG_PROFILE_URL = "https://www.instagram.com/ordrji/";

/* ── Post data — swap src + date for real IG posts when available ─────────── */
const POSTS = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=720&q=80",
    alt: "Restaurant ambience with Ordrji POS",
    date: "6/2/2026",
    postUrl: IG_PROFILE_URL,
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=720&q=80",
    alt: "Chef using KDS kitchen display",
    date: "6/2/2026",
    postUrl: IG_PROFILE_URL,
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=720&q=80",
    alt: "Guests scanning QR code at table",
    date: "5/28/2026",
    postUrl: IG_PROFILE_URL,
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=720&q=80",
    alt: "Fine dining restaurant setup",
    date: "5/25/2026",
    postUrl: IG_PROFILE_URL,
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1581349485608-9469926a8e5e?auto=format&fit=crop&w=720&q=80",
    alt: "Waiter using Ordrji handheld device",
    date: "5/22/2026",
    postUrl: IG_PROFILE_URL,
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1460306855393-0410f61241c7?auto=format&fit=crop&w=720&q=80",
    alt: "Restaurant analytics dashboard",
    date: "5/18/2026",
    postUrl: IG_PROFILE_URL,
  },
];

/* ── Inline Instagram SVG (lucide-react v1.20 has no Instagram icon) ─────── */
function IgIcon({ size = 20, gradient = false }: { size?: number; gradient?: boolean }) {
  const id = gradient ? "ig-g1" : "ig-g2";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      {gradient && (
        <defs>
          <linearGradient id={id} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#f09433" />
            <stop offset="50%"  stopColor="#dc2743" />
            <stop offset="100%" stopColor="#bc1888" />
          </linearGradient>
        </defs>
      )}
      <rect
        x="2" y="2" width="20" height="20" rx="5" ry="5"
        stroke={gradient ? `url(#${id})` : "currentColor"}
        strokeWidth="2" fill="none"
      />
      <circle
        cx="12" cy="12" r="4"
        stroke={gradient ? `url(#${id})` : "currentColor"}
        strokeWidth="2" fill="none"
      />
      <circle cx="17.5" cy="6.5" r="1.2" fill={gradient ? `url(#${id})` : "currentColor"} />
    </svg>
  );
}

interface InstagramPostItem {
  id: string | number;
  src: string;
  alt: string;
  date: string;
  postUrl: string;
}

interface SupabaseInstagramPost {
  id: string;
  media_url: string;
  caption?: string | null;
  published_at?: string | null;
  permalink: string;
}

import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";

export default function InstagramSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [posts, setPosts] = useState<InstagramPostItem[]>(POSTS);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data, error } = await supabase
          .from("instagram_posts")
          .select("*")
          .eq("is_active", true)
          .order("published_at", { ascending: false });

        if (error) {
          console.error("Supabase error fetching Instagram posts:", error);
          return;
        }

        if (data && data.length > 0) {
          setPosts(
            (data as SupabaseInstagramPost[]).map((p) => ({
              id: p.id,
              src: p.media_url,
              alt: p.caption || "Instagram post",
              date: p.published_at ? new Date(p.published_at).toLocaleDateString("en-US", { year: "numeric", month: "numeric", day: "numeric" }) : "Recent",
              postUrl: p.permalink,
            }))
          );
        }
      } catch (err) {
        console.error("Exception fetching Instagram posts:", err);
      }
    }
    fetchPosts();
  }, []);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({ left: dir === "right" ? amount : -amount, behavior: "smooth" });
  };

  return (
    <section className="igs-section">
      <div className="container">

        {/* ── Header row ── */}
        <motion.div
          className="igs-header"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {/* Left: title + count */}
          <div className="igs-title-group">
            <IgIcon size={22} gradient />
            <h2 className="igs-title">Instagram Feed</h2>
            <span className="igs-count">{posts.length} posts</span>
          </div>

          {/* Right: Follow button */}
          <a
            href={IG_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="igs-follow-btn"
            aria-label={`Follow @${IG_HANDLE} on Instagram`}
          >
            <IgIcon size={15} />
            Follow
          </a>
        </motion.div>

        {/* ── Scroll strip wrapper ── */}
        <div className="igs-strip-outer">
          {/* Arrow: left */}
          <button
            className="igs-arrow igs-arrow-left"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Scrollable row */}
          <div className="igs-strip" ref={scrollRef}>
            {posts.map((post, i) => (
              <motion.div
                key={post.id}
                className="igs-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.38, delay: i * 0.06 }}
              >
                {/* Image */}
                <a
                  href={post.postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="igs-img-link"
                  aria-label={post.alt}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.src}
                    alt={post.alt}
                    className="igs-img"
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div className="igs-img-overlay">
                    <ExternalLink size={22} color="#fff" />
                  </div>
                </a>

                {/* Card footer */}
                <div className="igs-card-footer">
                  <div className="igs-card-left">
                    <span className="igs-card-ig-icon"><IgIcon size={16} /></span>
                    <a
                      href={post.postUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="igs-view-link"
                    >
                      View on Instagram
                    </a>
                  </div>
                  <span className="igs-date">{post.date}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Arrow: right */}
          <button
            className="igs-arrow igs-arrow-right"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        </div>

      </div>

      {/* ── Styles ── */}
      <style>{`
        /* ── Section shell ──────────────────────────────────────────── */
        .igs-section {
          padding: 4rem 0 4.5rem;
          background: var(--bg-primary);
        }

        /* ── Header ─────────────────────────────────────────────────── */
        .igs-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .igs-title-group {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .igs-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
          letter-spacing: -0.3px;
        }

        .igs-count {
          display: inline-flex;
          align-items: center;
          background: #da0404;
          color: #fff;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 0.2rem 0.6rem;
          border-radius: 9999px;
          letter-spacing: 0.2px;
        }

        /* ── Follow button ─────────────────────────────────────────── */
        .igs-follow-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.5rem 1.25rem;
          border-radius: 9999px;
          background: #da0404;
          color: #fff;
          font-size: 0.85rem;
          font-weight: 700;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: background 0.18s, box-shadow 0.18s, transform 0.18s;
          box-shadow: 0 4px 14px -4px rgba(227,6,19,0.5);
        }
        .igs-follow-btn:hover {
          background: #bd040f;
          transform: translateY(-1px);
          box-shadow: 0 6px 18px -4px rgba(227,6,19,0.55);
        }

        /* ── Strip outer (positions arrows) ─────────────────────────── */
        .igs-strip-outer {
          position: relative;
        }

        /* ── Arrow buttons ─────────────────────────────────────────── */
        .igs-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-60%);
          z-index: 5;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #fff;
          border: 1.5px solid rgba(0,0,0,0.1);
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          cursor: pointer;
          transition: background 0.18s, box-shadow 0.18s;
        }
        .igs-arrow:hover {
          background: #f5f5f5;
          box-shadow: 0 4px 14px rgba(0,0,0,0.14);
        }
        .igs-arrow-left  { left: -18px; }
        .igs-arrow-right { right: -18px; }

        @media (max-width: 640px) {
          .igs-arrow-left  { left: 4px; }
          .igs-arrow-right { right: 4px; }
        }

        /* ── Scrollable strip ─────────────────────────────────────── */
        .igs-strip {
          display: flex;
          gap: 1rem;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          padding-bottom: 0.5rem;
          /* hide scrollbar */
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .igs-strip::-webkit-scrollbar { display: none; }

        /* ── Card ─────────────────────────────────────────────────── */
        .igs-card {
          flex: 0 0 260px;
          scroll-snap-align: start;
          background: #ffffff;
          border-radius: 12px;
          border: 1px solid rgba(0,0,0,0.08);
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .igs-card:hover {
          box-shadow: 0 6px 24px rgba(0,0,0,0.11);
          transform: translateY(-3px);
        }

        @media (min-width: 768px)  { .igs-card { flex: 0 0 280px; } }
        @media (min-width: 1024px) { .igs-card { flex: 0 0 300px; } }

        /* ── Card image ───────────────────────────────────────────── */
        .igs-img-link {
          display: block;
          position: relative;
          overflow: hidden;
          aspect-ratio: 4 / 3;
          background: #f0ebe0;
          flex-shrink: 0;
        }

        .igs-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }

        .igs-card:hover .igs-img {
          transform: scale(1.05);
        }

        /* Hover overlay */
        .igs-img-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.28);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.22s ease;
        }
        .igs-img-link:hover .igs-img-overlay {
          opacity: 1;
        }

        /* ── Card footer ──────────────────────────────────────────── */
        .igs-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.65rem 0.875rem;
          border-top: 1px solid rgba(0,0,0,0.07);
          gap: 0.5rem;
          flex-shrink: 0;
        }

        .igs-card-left {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          min-width: 0;
        }

        .igs-card-ig-icon {
          flex-shrink: 0;
          color: var(--text-muted);
          display: flex;
          align-items: center;
        }

        .igs-view-link {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-decoration: none;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: color 0.18s;
        }
        .igs-view-link:hover {
          color: #da0404;
        }

        .igs-date {
          font-size: 0.72rem;
          color: var(--text-muted);
          white-space: nowrap;
          flex-shrink: 0;
        }
      `}</style>
    </section>
  );
}
