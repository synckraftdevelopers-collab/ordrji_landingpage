"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Search, Star, MapPin, Utensils, ArrowRight,
  Leaf, Flame, Zap, PlusCircle, ChevronLeft,
} from "lucide-react";
import RegistrationForm, { RestaurantPrefill } from "./restaurant/RegistrationForm";

/* ─── Demo Restaurant Data ─────────────────────────────────────── */
const DEMO_RESTAURANTS = [
  {
    id: 1, name: "Spice Garden", cuisine: "North Indian", type: "both" as const,
    city: "Mumbai", area: "Andheri West", rating: 4.5,
    dishes: ["Biryani", "Butter Chicken", "Dal Makhani", "Naan", "Lassi"],
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=400",
    badge: "Popular", badgeColor: "#f97316",
  },
  {
    id: 2, name: "The Dosa House", cuisine: "South Indian", type: "veg" as const,
    city: "Bengaluru", area: "Koramangala", rating: 4.7,
    dishes: ["Masala Dosa", "Idli Sambhar", "Vada", "Filter Coffee", "Rava Upma"],
    image: "https://images.unsplash.com/photo-1567337710282-00832b415979?auto=format&fit=crop&q=80&w=400",
    badge: "Top Rated", badgeColor: "#16a34a",
  },
  {
    id: 3, name: "Dragon Palace", cuisine: "Chinese", type: "both" as const,
    city: "Delhi", area: "Connaught Place", rating: 4.2,
    dishes: ["Hakka Noodles", "Manchurian", "Spring Roll", "Fried Rice", "Momos"],
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=400",
    badge: "", badgeColor: "",
  },
  {
    id: 4, name: "Chai & Bites Cafe", cuisine: "Cafe", type: "veg" as const,
    city: "Pune", area: "Kalyani Nagar", rating: 4.6,
    dishes: ["Masala Chai", "Sandwich", "Croissant", "Cold Coffee", "Waffles"],
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=400",
    badge: "New", badgeColor: "#7c3aed",
  },
  {
    id: 5, name: "Biryani Brothers", cuisine: "Biryani", type: "nonveg" as const,
    city: "Hyderabad", area: "Banjara Hills", rating: 4.8,
    dishes: ["Chicken Biryani", "Mutton Biryani", "Prawn Biryani", "Raita", "Kebab"],
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=400",
    badge: "Trending", badgeColor: "#dc2626",
  },
  {
    id: 6, name: "Pizza Peak", cuisine: "Pizza", type: "both" as const,
    city: "Chennai", area: "T. Nagar", rating: 4.3,
    dishes: ["Margherita", "Pepperoni", "BBQ Chicken", "Garlic Bread", "Pasta"],
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=400",
    badge: "", badgeColor: "",
  },
  {
    id: 7, name: "Street Bites", cuisine: "Street Food", type: "veg" as const,
    city: "Jaipur", area: "MI Road", rating: 4.4,
    dishes: ["Pav Bhaji", "Vada Pav", "Samosa", "Chole Bhature", "Jalebi"],
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=400",
    badge: "Budget Friendly", badgeColor: "#0284c7",
  },
  {
    id: 8, name: "The Mughal Table", cuisine: "Mughlai", type: "nonveg" as const,
    city: "Lucknow", area: "Hazratganj", rating: 4.6,
    dishes: ["Nihari", "Galouti Kebab", "Sheermal", "Korma", "Phirni"],
    image: "https://images.unsplash.com/photo-1567337710282-00832b415979?auto=format&fit=crop&q=80&w=400",
    badge: "Premium", badgeColor: "#b45309",
  },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  prefill?: RestaurantPrefill;
}

export default function RegisterRestaurantModal({ isOpen, onClose, prefill }: Props) {
  // "pick" = restaurant picker step, "form" = registration form step
  const [step, setStep] = useState<"pick" | "form">(prefill ? "form" : "pick");
  const [activePrefill, setActivePrefill] = useState<RestaurantPrefill | undefined>(prefill);
  const [query, setQuery] = useState("");

  // Reset step when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      if (prefill) {
        setActivePrefill(prefill);
        setStep("form");
      } else {
        setStep("pick");
        setActivePrefill(undefined);
        setQuery("");
      }
    }
  }, [isOpen, prefill]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (step === "form" && !prefill) setStep("pick");
        else onClose();
      }
    };
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose, step, prefill]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return DEMO_RESTAURANTS;
    return DEMO_RESTAURANTS.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.cuisine.toLowerCase().includes(q) ||
      r.city.toLowerCase().includes(q) ||
      r.dishes.some(d => d.toLowerCase().includes(q))
    );
  }, [query]);

  const selectRestaurant = (r: typeof DEMO_RESTAURANTS[0]) => {
    setActivePrefill({
      restaurantName: r.name,
      cuisineType:    r.cuisine,
      restaurantType: r.type,
      city:           r.city,
      dishes:         r.dishes,
    });
    setStep("form");
  };

  const startFresh = () => {
    setActivePrefill(undefined);
    setStep("form");
  };

  return (
    <>
      <style>{`
        .rrm-root {
          position: fixed; inset: 0; z-index: 9999;
          display: flex; align-items: flex-start; justify-content: center;
          overflow-y: auto;
        }
        .rrm-overlay {
          position: fixed; inset: 0;
          background: rgba(10,8,6,.75);
          backdrop-filter: blur(7px); -webkit-backdrop-filter: blur(7px);
        }
        .rrm-close-btn {
          position: fixed; top: 1.1rem; right: 1.1rem; z-index: 10001;
          width: 38px; height: 38px; background: #fff;
          border: 1px solid rgba(0,0,0,.12); border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #5a5046;
          box-shadow: 0 4px 12px rgba(0,0,0,.14);
          transition: background .18s, color .18s, transform .18s;
        }
        .rrm-close-btn:hover { background: #f0ebe0; color: #1e1b18; transform: scale(1.08); }

        /* ── Picker sheet ─────────────────────────────────── */
        .rrm-picker {
          position: relative; z-index: 1;
          width: 100%; max-width: 860px;
          margin: 2.5rem auto 3rem;
          padding: 0 1rem;
        }
        .rrm-picker-card {
          background: #fff; border-radius: 24px;
          box-shadow: 0 32px 80px -16px rgba(0,0,0,.28);
          overflow: hidden;
        }
        .rrm-picker-head {
          padding: 2rem 2rem 1.25rem;
          border-bottom: 1px solid #f1f5f9;
          display: flex; flex-direction: column; gap: 1.1rem;
        }
        .rrm-picker-title {
          font-size: 1.45rem; font-weight: 900; color: #0f172a;
          letter-spacing: -.6px; margin: 0;
        }
        .rrm-picker-sub { font-size: .875rem; color: #64748b; margin: 0; }

        /* Search inside picker */
        .rrm-search-wrap {
          display: flex; align-items: center;
          background: #f8fafc; border: 1.5px solid #e2e8f0;
          border-radius: 12px; padding: 0 .9rem;
          transition: border-color .2s, box-shadow .2s;
        }
        .rrm-search-wrap:focus-within {
          border-color: #f97316; background: #fff;
          box-shadow: 0 0 0 3px rgba(249,115,22,.1);
        }
        .rrm-search-icon { color: #94a3b8; flex-shrink: 0; }
        .rrm-search-input {
          flex: 1; padding: .72rem .65rem; border: none; outline: none;
          background: transparent; font-family: inherit; font-size: .9rem; color: #0f172a;
        }
        .rrm-search-input::placeholder { color: #94a3b8; }
        .rrm-search-clear {
          background: none; border: none; cursor: pointer; color: #94a3b8;
          padding: 0; display: flex; align-items: center; transition: color .15s;
        }
        .rrm-search-clear:hover { color: #dc2626; }

        /* Grid */
        .rrm-picker-grid {
          display: grid; grid-template-columns: 1fr;
          gap: 1px; background: #f1f5f9;
          max-height: 420px; overflow-y: auto;
        }
        @media(min-width:600px) { .rrm-picker-grid { grid-template-columns: 1fr 1fr; } }

        /* Row card */
        .rrm-rest-row {
          display: flex; align-items: center; gap: 1rem;
          padding: 1rem 1.5rem; background: #fff; cursor: pointer;
          transition: background .15s;
        }
        .rrm-rest-row:hover { background: #fff7ed; }
        .rrm-rest-img {
          width: 56px; height: 56px; border-radius: 12px;
          object-fit: cover; flex-shrink: 0; border: 1px solid #e2e8f0;
        }
        .rrm-rest-info { flex: 1; min-width: 0; }
        .rrm-rest-name { font-size: .95rem; font-weight: 800; color: #0f172a; margin: 0 0 .18rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .rrm-rest-meta { display: flex; align-items: center; gap: .4rem; font-size: .75rem; color: #64748b; margin: 0; flex-wrap: wrap; }
        .rrm-rest-dot { color: #cbd5e1; }
        .rrm-rest-badge { font-size: .65rem; font-weight: 800; color: #fff; padding: .18rem .55rem; border-radius: 9999px; letter-spacing: .3px; }
        .rrm-rest-dishes { display: flex; gap: .3rem; flex-wrap: wrap; margin-top: .3rem; }
        .rrm-rest-dish { font-size: .68rem; color: #64748b; background: #f1f5f9; padding: .15rem .5rem; border-radius: 9999px; border: 1px solid #e2e8f0; }
        .rrm-rest-arrow { color: #cbd5e1; flex-shrink: 0; transition: color .15s, transform .15s; }
        .rrm-rest-row:hover .rrm-rest-arrow { color: #f97316; transform: translateX(3px); }

        /* Footer */
        .rrm-picker-foot {
          padding: 1.1rem 2rem; border-top: 1px solid #f1f5f9;
          display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: .75rem;
        }
        .rrm-picker-foot-note { font-size: .8rem; color: #94a3b8; margin: 0; }
        .rrm-fresh-btn {
          display: inline-flex; align-items: center; gap: .4rem;
          background: linear-gradient(135deg,#f97316,#ea580c); color: #fff;
          padding: .65rem 1.5rem; border-radius: 9999px; border: none;
          font-family: inherit; font-size: .85rem; font-weight: 700;
          cursor: pointer; box-shadow: 0 6px 18px rgba(249,115,22,.3);
          transition: transform .2s, box-shadow .2s;
        }
        .rrm-fresh-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(249,115,22,.4); }

        /* No results */
        .rrm-no-results {
          grid-column: 1/-1; display: flex; flex-direction: column;
          align-items: center; gap: .75rem; padding: 3rem 1.5rem; text-align: center;
        }
        .rrm-no-results p { font-size: .9rem; color: #94a3b8; margin: 0; }

        /* ── Form sheet ───────────────────────────────────── */
        .rrm-form-sheet {
          position: relative; z-index: 1;
          width: 100%; max-width: 1100px;
          margin: 2rem auto 3rem; padding: 0 1rem;
        }
        .rrm-back-btn {
          display: inline-flex; align-items: center; gap: .4rem;
          background: rgba(255,255,255,.9); border: 1px solid rgba(0,0,0,.1);
          border-radius: 9999px; padding: .5rem 1.1rem;
          font-family: inherit; font-size: .82rem; font-weight: 700;
          color: #374151; cursor: pointer; margin-bottom: 1rem;
          box-shadow: 0 2px 8px rgba(0,0,0,.08);
          transition: background .15s;
        }
        .rrm-back-btn:hover { background: #fff; }

        /* Pre-fill notice banner */
        .rrm-prefill-banner {
          display: flex; align-items: center; gap: .75rem;
          background: #f0fdf4; border: 1.5px solid #bbf7d0;
          border-radius: 14px; padding: .9rem 1.25rem; margin-bottom: 1.25rem;
          font-size: .85rem; color: #166534; font-weight: 600;
        }
        .rrm-prefill-banner svg { flex-shrink: 0; }
      `}</style>

      <AnimatePresence>
        {isOpen && (
          <div className="rrm-root">
            {/* Backdrop */}
            <motion.div
              className="rrm-overlay"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
            />

            {/* Close */}
            <button className="rrm-close-btn" onClick={onClose} aria-label="Close">
              <X size={17} />
            </button>

            <AnimatePresence mode="wait">

              {/* ── STEP 1: Restaurant Picker ─────────────────── */}
              {step === "pick" && (
                <motion.div
                  key="picker"
                  className="rrm-picker"
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ type: "spring", duration: 0.38, bounce: 0.1 }}
                  onClick={e => e.stopPropagation()}
                >
                  <div className="rrm-picker-card">
                    <div className="rrm-picker-head">
                      <div>
                        <h2 className="rrm-picker-title">Register Your Restaurant</h2>
                        <p className="rrm-picker-sub">
                          Select a demo restaurant below to auto-fill the form, or start fresh with your own details.
                        </p>
                      </div>
                      {/* Search */}
                      <div className="rrm-search-wrap">
                        <Search size={16} className="rrm-search-icon" />
                        <input
                          className="rrm-search-input"
                          placeholder="Search by name, cuisine, city or dish…"
                          value={query}
                          onChange={e => setQuery(e.target.value)}
                        />
                        {query && (
                          <button className="rrm-search-clear" onClick={() => setQuery("")}>
                            <X size={14} />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Restaurant list */}
                    <div className="rrm-picker-grid">
                      {filtered.length === 0 ? (
                        <div className="rrm-no-results">
                          <Utensils size={36} color="#cbd5e1" />
                          <p>No restaurants match &ldquo;{query}&rdquo;</p>
                        </div>
                      ) : (
                        filtered.map(r => (
                          <button
                            key={r.id}
                            className="rrm-rest-row"
                            onClick={() => selectRestaurant(r)}
                          >
                            <img src={r.image} alt={r.name} className="rrm-rest-img" />
                            <div className="rrm-rest-info">
                              <p className="rrm-rest-name">
                                {r.name}
                                {r.badge && (
                                  <span className="rrm-rest-badge" style={{ background: r.badgeColor, marginLeft: ".5rem" }}>
                                    {r.badge}
                                  </span>
                                )}
                              </p>
                              <p className="rrm-rest-meta">
                                {r.type === "veg"
                                  ? <Leaf size={11} color="#16a34a" />
                                  : r.type === "nonveg"
                                  ? <Flame size={11} color="#dc2626" />
                                  : <Zap size={11} color="#b45309" />
                                }
                                {r.cuisine}
                                <span className="rrm-rest-dot">·</span>
                                <MapPin size={11} />
                                {r.area}, {r.city}
                                <span className="rrm-rest-dot">·</span>
                                <Star size={11} fill="#f97316" color="#f97316" />
                                {r.rating}
                              </p>
                              <div className="rrm-rest-dishes">
                                {r.dishes.slice(0, 3).map(d => (
                                  <span key={d} className="rrm-rest-dish">{d}</span>
                                ))}
                              </div>
                            </div>
                            <ArrowRight size={16} className="rrm-rest-arrow" />
                          </button>
                        ))
                      )}
                    </div>

                    <div className="rrm-picker-foot">
                      <p className="rrm-picker-foot-note">
                        {filtered.length} restaurant{filtered.length !== 1 ? "s" : ""} · Click one to pre-fill the form
                      </p>
                      <button className="rrm-fresh-btn" onClick={startFresh}>
                        <PlusCircle size={15} /> Register New Restaurant
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── STEP 2: Registration Form ─────────────────── */}
              {step === "form" && (
                <motion.div
                  key="form"
                  className="rrm-form-sheet"
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ type: "spring", duration: 0.38, bounce: 0.1 }}
                  onClick={e => e.stopPropagation()}
                >
                  {/* Back button */}
                  <button className="rrm-back-btn" onClick={() => setStep("pick")}>
                    <ChevronLeft size={15} /> Back to restaurants
                  </button>

                  {/* Pre-fill notice */}
                  {activePrefill?.restaurantName && (
                    <div className="rrm-prefill-banner">
                      <Utensils size={16} color="#16a34a" />
                      Pre-filled with data from <strong>&nbsp;{activePrefill.restaurantName}</strong> — edit any field before submitting.
                    </div>
                  )}

                  <RegistrationForm prefill={activePrefill} />
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
