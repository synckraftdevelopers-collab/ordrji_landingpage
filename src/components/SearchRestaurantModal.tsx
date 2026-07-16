"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Star, Utensils, ChevronRight } from "lucide-react";
import { 
  getStoredRestaurants, getRestaurantRating, SEED_IDS, StoredRestaurant 
} from "@/lib/restaurantStore";
import RestaurantProfileView from "./restaurant/RestaurantProfileView";

/* ─── Demo Seed Restaurants Data ─────────────────────────────────── */
const DEMO_RESTAURANTS = [
  {
    id: 1, name: "Spice Garden", cuisine: "North Indian", type: "both" as const,
    city: "Mumbai", area: "Andheri West", rating: 4.5,
    dishes: ["Biryani", "Butter Chicken", "Dal Makhani", "Naan", "Lassi"],
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=400",
    badge: "Popular", badgeColor: "#E30613",
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
}

export default function SearchRestaurantModal({ isOpen, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setSelectedRestaurant(null);
    }
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !selectedRestaurant) onClose();
      else if (e.key === "Escape" && selectedRestaurant) setSelectedRestaurant(null);
    };
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose, selectedRestaurant]);

  // Combined list with dynamically computed live ratings
  const allRestaurants = useMemo(() => {
    const extraRestaurants = getStoredRestaurants().filter(r => !SEED_IDS.includes(r.id));
    
    const extraMapped = extraRestaurants.map(r => {
      const { rating, reviewsCount } = getRestaurantRating(String(r.id), 0, 0);
      return {
        id: r.id,
        name: r.name,
        cuisine: r.cuisine,
        type: r.type as "veg" | "nonveg" | "both",
        city: r.city,
        area: r.area,
        rating,
        reviewsCount,
        deliveryTime: `${r.openingTime}–${r.closingTime}`,
        avgCost: r.avgCost,
        dishes: r.dishes,
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600",
        badge: "New",
        badgeColor: "#7c3aed",
        open: true,
        swiggy: !!r.swiggyUrl,
        zomato: !!r.zomatoUrl,
        swiggyUrl: r.swiggyUrl,
        zomatoUrl: r.zomatoUrl,
        phone: r.phone,
        email: r.email,
        address: r.address,
        baseRating: 0,
        baseReviewsCount: 0
      };
    });

    const demoMapped = DEMO_RESTAURANTS.map(r => {
      const baseRating = [4.5, 4.7, 4.2, 4.6, 4.8, 4.3, 4.4, 4.6][(r.id - 1) % 8];
      const baseReviewsCount = [312, 528, 184, 401, 762, 256, 190, 334][(r.id - 1) % 8];
      const { rating, reviewsCount } = getRestaurantRating(String(r.id), baseRating, baseReviewsCount);
      return {
        ...r,
        rating,
        reviewsCount,
        baseRating,
        baseReviewsCount,
        avgCost: [450, 200, 550, 300, 380, 600, 150, 700][(r.id - 1) % 8],
        deliveryTime: ["25–35 min", "20–30 min", "30–40 min", "15–25 min", "35–45 min", "25–35 min", "20–30 min", "40–50 min"][(r.id - 1) % 8],
        swiggy: [true, true, false, true, true, false, true, false][(r.id - 1) % 8],
        zomato: [true, false, true, true, true, true, false, true][(r.id - 1) % 8]
      };
    });

    return [...extraMapped, ...demoMapped];
  }, [isOpen, refreshKey]);

  // Filter list by query
  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return allRestaurants;
    return allRestaurants.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.cuisine.toLowerCase().includes(q) ||
      r.city.toLowerCase().includes(q) ||
      r.area.toLowerCase().includes(q) ||
      r.dishes.some(d => d.toLowerCase().includes(q))
    );
  }, [query, allRestaurants]);

  // Group into two sections: Registered vs Featured, sorted by rating descending
  const registeredPartners = useMemo(() => {
    return filtered
      .filter(r => !SEED_IDS.includes(String(r.id)))
      .sort((a, b) => b.rating - a.rating);
  }, [filtered]);

  const featuredOutlets = useMemo(() => {
    return filtered
      .filter(r => SEED_IDS.includes(String(r.id)))
      .sort((a, b) => b.rating - a.rating);
  }, [filtered]);

  const totalResultsCount = filtered.length;

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

        .rrm-picker {
          position: relative; z-index: 1;
          width: 100%; max-width: 1100px;
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

        /* Search input */
        .rrm-search-wrap {
          display: flex; align-items: center;
          background: #f8fafc; border: 1.5px solid #e2e8f0;
          border-radius: 12px; padding: 0 .9rem;
          transition: border-color .2s, box-shadow .2s;
        }
        .rrm-search-wrap:focus-within {
          border-color: #E30613; background: #fff;
          box-shadow: 0 0 0 3px rgba(227,6,19,.1);
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

        /* Listing Container */
        .rrm-picker-list-container {
          padding: 2rem;
          max-height: 620px;
          overflow-y: auto;
          background: #f8fafc;
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        .rrm-section-title {
          font-size: 1.15rem;
          font-weight: 850;
          color: #0f172a;
          margin: 0 0 1rem;
          letter-spacing: -0.4px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border-bottom: 1.5px solid #e2e8f0;
          padding-bottom: 0.5rem;
        }
        .rrm-section-title span {
          font-size: 0.76rem;
          font-weight: 700;
          color: #E30613;
          background: #fff5f5;
          padding: 0.15rem 0.55rem;
          border-radius: 9999px;
        }

        /* 3-Column Card Grid */
        .rrm-cards-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        @media(min-width: 600px) {
          .rrm-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media(min-width: 900px) {
          .rrm-cards-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* Premium Restaurant Card */
        .rrm-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,.03);
          cursor: pointer;
          transition: transform .2s, box-shadow .2s, border-color .2s;
          display: flex;
          flex-direction: column;
          text-align: left;
        }
        .rrm-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(0,0,0,.07);
          border-color: rgba(234,88,12,0.2);
        }
        .rrm-card-img-wrap {
          position: relative;
          height: 145px;
          background: #e2e8f0;
          overflow: hidden;
        }
        .rrm-card-badge {
          position: absolute;
          top: 0.6rem;
          left: 0.6rem;
          color: #fff;
          padding: 0.2rem 0.6rem;
          border-radius: 9999px;
          font-size: 0.65rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }
        .rrm-type-dot {
          position: absolute;
          bottom: 0.6rem;
          right: 0.6rem;
          width: 24px;
          height: 24px;
          background: rgba(255,255,255,0.92);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 6px rgba(0,0,0,0.08);
          font-size: 0.72rem;
        }
        .rrm-card-body {
          padding: 1.1rem;
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          flex: 1;
        }
        .rrm-card-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 0.5rem;
        }
        .rrm-card-name {
          font-size: 0.95rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .rrm-card-rating {
          display: flex;
          align-items: center;
          gap: 0.2rem;
          background: #fef3c7;
          border: 1px solid #fde68a;
          padding: 0.15rem 0.45rem;
          border-radius: 6px;
          font-size: 0.72rem;
          font-weight: 800;
          color: #92400e;
          flex-shrink: 0;
        }
        .rrm-card-cuisine {
          font-size: 0.78rem;
          color: #E30613;
          font-weight: 600;
          margin: 0;
        }
        .rrm-card-meta {
          font-size: 0.76rem;
          color: #64748b;
          margin: 0;
        }
        .rrm-card-dishes {
          display: flex;
          gap: 0.3rem;
          flex-wrap: wrap;
          margin-top: 0.3rem;
        }
        .rrm-card-dish {
          font-size: 0.65rem;
          color: #64748b;
          background: #f1f5f9;
          padding: 0.15rem 0.5rem;
          border-radius: 9999px;
          border: 1px solid #e2e8f0;
        }
        .rrm-card-view-btn {
          margin-top: auto;
          padding-top: 0.6rem;
          border-top: 1px solid #f1f5f9;
          font-size: 0.78rem;
          font-weight: 700;
          color: #E30613;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.2rem;
          transition: gap 0.15s;
        }
        .rrm-card:hover .rrm-card-view-btn {
          gap: 0.4rem;
        }

        .rrm-section-empty {
          background: #fff;
          border: 1.5px dashed #e2e8f0;
          border-radius: 16px;
          padding: 2rem 1rem;
          text-align: center;
          color: #94a3b8;
          font-size: 0.82rem;
        }
        .rrm-section-empty p {
          margin: 0 0 0.25rem;
          font-weight: 700;
          color: #64748b;
        }

        /* Footer */
        .rrm-picker-foot {
          padding: 1.1rem 2rem; border-top: 1px solid #f1f5f9;
          display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: .75rem;
        }
        .rrm-picker-foot-note { font-size: .8rem; color: #94a3b8; margin: 0; }

        /* No results */
        .rrm-no-results {
          display: flex; flex-direction: column;
          align-items: center; gap: .75rem; padding: 4rem 1.5rem; text-align: center;
          background: #fff; border-radius: 16px; border: 1.5px dashed #e2e8f0;
        }
        .rrm-no-results p { font-size: .9rem; color: #64748b; font-weight: 700; margin: 0; }
        .rrm-no-results span { font-size: .8rem; color: #94a3b8; }
      `}</style>

      <AnimatePresence>
        {isOpen && (
          <div className="rrm-root">
            <motion.div
              className="rrm-overlay"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
            />

            <button className="rrm-close-btn" onClick={onClose} aria-label="Close">
              <X size={17} />
            </button>

            <motion.div
              className="rrm-picker"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ type: "spring", duration: 0.38, bounce: 0.1 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="rrm-picker-card">
                
                {/* ─── Profile Sub-view Mode ─── */}
                {selectedRestaurant ? (
                  <RestaurantProfileView 
                    restaurant={selectedRestaurant} 
                    onBack={() => setSelectedRestaurant(null)} 
                    onReviewAdded={() => {
                      setRefreshKey(k => k + 1);
                    }}
                  />
                ) : (
                  /* ─── Search List Mode ─── */
                  <>
                    <div className="rrm-picker-head">
                      <div>
                        <h2 className="rrm-picker-title">Search Restaurants</h2>
                        <p className="rrm-picker-sub">
                          Discover registered partner outlets and featured dining locations.
                        </p>
                      </div>
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

                    <div className="rrm-picker-list-container">
                      {totalResultsCount === 0 ? (
                        <div className="rrm-no-results">
                          <Utensils size={36} color="#cbd5e1" />
                          <p>No restaurants match &ldquo;{query}&rdquo;</p>
                          <span>Try adjusting your spelling or searching for another cuisine type.</span>
                        </div>
                      ) : (
                        <>
                          {/* 1. REGISTERED PARTNERS SECTION */}
                          <div className="rrm-section-block">
                            <h3 className="rrm-section-title">
                              Registered Partners <span>{registeredPartners.length}</span>
                            </h3>
                            {registeredPartners.length === 0 ? (
                              <div className="rrm-section-empty">
                                <p>No registered partners match this search</p>
                                <span>Be the first to register a new restaurant in this category!</span>
                              </div>
                            ) : (
                              <div className="rrm-cards-grid">
                                {registeredPartners.map(r => (
                                  <div 
                                    key={r.id} 
                                    className="rrm-card"
                                    onClick={() => setSelectedRestaurant(r)}
                                  >
                                    <div className="rrm-card-img-wrap">
                                      <Image 
                                        src={r.image} 
                                        alt={r.name} 
                                        width={400} 
                                        height={145} 
                                        style={{ objectFit: "cover", width: "100%", height: "100%" }} 
                                      />
                                      {r.badge && (
                                        <span className="rrm-card-badge" style={{ background: r.badgeColor }}>
                                          {r.badge}
                                        </span>
                                      )}
                                      <span className="rrm-type-dot">
                                        {r.type === "veg" ? "🟢" : r.type === "nonveg" ? "🔴" : "🟡"}
                                      </span>
                                    </div>
                                    <div className="rrm-card-body">
                                      <div className="rrm-card-row">
                                        <h3 className="rrm-card-name">{r.name}</h3>
                                        <div className="rrm-card-rating">
                                          <Star size={11} fill="#ffc107" color="#ffc107" />
                                          <span>{r.rating > 0 ? r.rating : "New"}</span>
                                        </div>
                                      </div>
                                      <p className="rrm-card-cuisine">{r.cuisine}</p>
                                      <p className="rrm-card-meta">📍 {r.area}, {r.city}</p>
                                      <div className="rrm-card-dishes">
                                        {r.dishes.slice(0, 3).map(d => (
                                          <span key={d} className="rrm-card-dish">{d}</span>
                                        ))}
                                      </div>
                                      <div className="rrm-card-view-btn">
                                        View Profile <ChevronRight size={12} />
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* 2. FEATURED OUTLETS SECTION */}
                          <div className="rrm-section-block">
                            <h3 className="rrm-section-title">
                              Featured Outlets <span>{featuredOutlets.length}</span>
                            </h3>
                            {featuredOutlets.length === 0 ? (
                              <div className="rrm-section-empty">
                                <p>No featured outlets match this search</p>
                              </div>
                            ) : (
                              <div className="rrm-cards-grid">
                                {featuredOutlets.map(r => (
                                  <div 
                                    key={r.id} 
                                    className="rrm-card"
                                    onClick={() => setSelectedRestaurant(r)}
                                  >
                                    <div className="rrm-card-img-wrap">
                                      <Image 
                                        src={r.image} 
                                        alt={r.name} 
                                        width={400} 
                                        height={145} 
                                        style={{ objectFit: "cover", width: "100%", height: "100%" }} 
                                      />
                                      {r.badge && (
                                        <span className="rrm-card-badge" style={{ background: r.badgeColor }}>
                                          {r.badge}
                                        </span>
                                      )}
                                      <span className="rrm-type-dot">
                                        {r.type === "veg" ? "🟢" : r.type === "nonveg" ? "🔴" : "🟡"}
                                      </span>
                                    </div>
                                    <div className="rrm-card-body">
                                      <div className="rrm-card-row">
                                        <h3 className="rrm-card-name">{r.name}</h3>
                                        <div className="rrm-card-rating">
                                          <Star size={11} fill="#ffc107" color="#ffc107" />
                                          <span>{r.rating > 0 ? r.rating : "New"}</span>
                                        </div>
                                      </div>
                                      <p className="rrm-card-cuisine">{r.cuisine}</p>
                                      <p className="rrm-card-meta">📍 {r.area}, {r.city}</p>
                                      <div className="rrm-card-dishes">
                                        {r.dishes.slice(0, 3).map(d => (
                                          <span key={d} className="rrm-card-dish">{d}</span>
                                        ))}
                                      </div>
                                      <div className="rrm-card-view-btn">
                                        View Profile <ChevronRight size={12} />
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>

                    <div className="rrm-picker-foot">
                      <p className="rrm-picker-foot-note">
                        {totalResultsCount} restaurant{totalResultsCount !== 1 ? "s" : ""} found
                      </p>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
