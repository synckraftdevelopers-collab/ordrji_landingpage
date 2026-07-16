/* eslint-disable @typescript-eslint/no-explicit-any, react/no-unescaped-entities, @next/next/no-html-link-for-pages, react-hooks/set-state-in-effect */
"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookDemoModal from "@/components/BookDemoModal";
import RegisterRestaurantModal from "@/components/RegisterRestaurantModal";
import { RestaurantPrefill } from "@/components/restaurant/RegistrationForm";
import {
  Search, MapPin, Star, Clock, Utensils, Filter, X,
  ArrowRight, Leaf, Flame, Zap, PlusCircle, ChevronRight
} from "lucide-react";
import { 
  getStoredRestaurants, StoredRestaurant, SEED_IDS, getRestaurantRating 
} from "@/lib/restaurantStore";
import RestaurantProfileView from "@/components/restaurant/RestaurantProfileView";

/* ─── Demo Data ──────────────────────────────────────────────────── */
const RESTAURANTS = [
  {
    id: 1, name: "Spice Garden", cuisine: "North Indian", type: "both" as const,
    city: "Mumbai", area: "Andheri West", rating: 4.5, reviews: 312,
    deliveryTime: "25–35 min", avgCost: 450,
    dishes: ["Biryani", "Butter Chicken", "Dal Makhani", "Naan", "Lassi"],
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=600",
    badge: "Popular", badgeColor: "#E30613", open: true, swiggy: true, zomato: true,
  },
  {
    id: 2, name: "The Dosa House", cuisine: "South Indian", type: "veg" as const,
    city: "Bengaluru", area: "Koramangala", rating: 4.7, reviews: 528,
    deliveryTime: "20–30 min", avgCost: 200,
    dishes: ["Masala Dosa", "Idli Sambhar", "Vada", "Filter Coffee", "Rava Upma"],
    image: "https://images.unsplash.com/photo-1567337710282-00832b415979?auto=format&fit=crop&q=80&w=600",
    badge: "Top Rated", badgeColor: "#16a34a", open: true, swiggy: true, zomato: false,
  },
  {
    id: 3, name: "Dragon Palace", cuisine: "Chinese", type: "both" as const,
    city: "Delhi", area: "Connaught Place", rating: 4.2, reviews: 184,
    deliveryTime: "30–40 min", avgCost: 550,
    dishes: ["Hakka Noodles", "Manchurian", "Spring Roll", "Fried Rice", "Momos"],
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=600",
    badge: "", badgeColor: "", open: true, swiggy: false, zomato: true,
  },
  {
    id: 4, name: "Chai & Bites Cafe", cuisine: "Cafe", type: "veg" as const,
    city: "Pune", area: "Kalyani Nagar", rating: 4.6, reviews: 401,
    deliveryTime: "15–25 min", avgCost: 300,
    dishes: ["Masala Chai", "Sandwich", "Croissant", "Cold Coffee", "Waffles"],
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=600",
    badge: "New", badgeColor: "#7c3aed", open: true, swiggy: true, zomato: true,
  },
  {
    id: 5, name: "Biryani Brothers", cuisine: "Biryani", type: "nonveg" as const,
    city: "Hyderabad", area: "Banjara Hills", rating: 4.8, reviews: 762,
    deliveryTime: "35–45 min", avgCost: 380,
    dishes: ["Chicken Biryani", "Mutton Biryani", "Prawn Biryani", "Raita", "Kebab"],
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=600",
    badge: "Trending", badgeColor: "#dc2626", open: true, swiggy: true, zomato: true,
  },
  {
    id: 6, name: "Pizza Peak", cuisine: "Pizza", type: "both" as const,
    city: "Chennai", area: "T. Nagar", rating: 4.3, reviews: 256,
    deliveryTime: "25–35 min", avgCost: 600,
    dishes: ["Margherita", "Pepperoni", "BBQ Chicken", "Garlic Bread", "Pasta"],
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600",
    badge: "", badgeColor: "", open: false, swiggy: false, zomato: true,
  },
  {
    id: 7, name: "Street Bites", cuisine: "Street Food", type: "veg" as const,
    city: "Jaipur", area: "MI Road", rating: 4.4, reviews: 190,
    deliveryTime: "20–30 min", avgCost: 150,
    dishes: ["Pav Bhaji", "Vada Pav", "Samosa", "Chole Bhature", "Jalebi"],
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=600",
    badge: "Budget Friendly", badgeColor: "#0284c7", open: true, swiggy: true, zomato: false,
  },
  {
    id: 8, name: "The Mughal Table", cuisine: "Mughlai", type: "nonveg" as const,
    city: "Lucknow", area: "Hazratganj", rating: 4.6, reviews: 334,
    deliveryTime: "40–50 min", avgCost: 700,
    dishes: ["Nihari", "Galouti Kebab", "Sheermal", "Korma", "Phirni"],
    image: "https://images.unsplash.com/photo-1567337710282-00832b415979?auto=format&fit=crop&q=80&w=600",
    badge: "Premium", badgeColor: "#b45309", open: true, swiggy: false, zomato: true,
  },
];

const CUISINES = ["All","North Indian","South Indian","Chinese","Cafe","Biryani","Pizza","Street Food","Mughlai"];
const TYPES = [
  { label: "All",          value: "all"    },
  { label: "🟢 Veg",       value: "veg"    },
  { label: "🔴 Non-Veg",   value: "nonveg" },
  { label: "🟡 Both",      value: "both"   },
];

export default function RestaurantsPage() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [prefill, setPrefill] = useState<RestaurantPrefill | undefined>(undefined);
  const [query, setQuery] = useState("");
  const [cuisine, setCuisine] = useState("All");
  const [type, setType] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  
  const [extraRestaurants, setExtraRestaurants] = useState<StoredRestaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Load registered restaurants on mount and refresh triggers
  useEffect(() => {
    setExtraRestaurants(getStoredRestaurants().filter(r => !SEED_IDS.includes(r.id)));
  }, [refreshKey]);

  // Build combined list: user-registered first, then demo seed, with dynamically calculated ratings
  const allRestaurants = useMemo(() => {
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
        reviews: reviewsCount,
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

    const demoMapped = RESTAURANTS.map(r => {
      const baseRating = [4.5, 4.7, 4.2, 4.6, 4.8, 4.3, 4.4, 4.6][(r.id - 1) % 8];
      const baseReviewsCount = [312, 528, 184, 401, 762, 256, 190, 334][(r.id - 1) % 8];
      const { rating, reviewsCount } = getRestaurantRating(String(r.id), baseRating, baseReviewsCount);
      return {
        ...r,
        rating,
        reviews: reviewsCount,
        baseRating,
        baseReviewsCount,
      };
    });

    return [...extraMapped, ...demoMapped];
  }, [extraRestaurants, refreshKey]);

  const openRegister = (p?: RestaurantPrefill) => {
    setPrefill(p);
    setRegisterOpen(true);
  };

  // Filter restaurants based on queries and filters
  const filtered = useMemo(() =>
    allRestaurants.filter(r => {
      const q = query.toLowerCase();
      const matchQ = !q ||
        r.name.toLowerCase().includes(q) ||
        r.city.toLowerCase().includes(q) ||
        r.area.toLowerCase().includes(q) ||
        r.dishes.some(d => d.toLowerCase().includes(q));
      const matchC = cuisine === "All" || r.cuisine === cuisine;
      const matchT = type === "all" || r.type === type;
      return matchQ && matchC && matchT;
    }),
  [query, cuisine, type, allRestaurants]);

  // Group into two sections, sorted by rating descending
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

  const clearAll = () => { setQuery(""); setCuisine("All"); setType("all"); };

  return (
    <>
      <Navbar onBookDemo={() => setIsDemoOpen(true)} onRegister={() => openRegister()} />

      <main style={{ background: "#f8fafc", minHeight: "100vh", paddingTop: "4.5rem" }}>

        {/* ── Hero + Search ─────────────────────────────────────────── */}
        <section className="rl-hero">
          <div className="rl-hero-glow" aria-hidden />
          <div className="container rl-hero-inner">

            <div className="rl-hero-text">
              <span className="rl-badge">🍽️ Restaurant Directory</span>
              <h1 className="rl-hero-title">
                Discover Amazing<br />
                <span className="rl-accent">Restaurants Near You</span>
              </h1>
              <p className="rl-hero-sub">
                Browse {allRestaurants.length}+ restaurants · Search by dish or cuisine · Order on Swiggy & Zomato
              </p>
            </div>

            {/* Search row */}
            <div className="rl-search-row">
              <div className="rl-search-box">
                <Search size={18} className="rl-search-icon" />
                <input
                  className="rl-search-input"
                  placeholder="Search restaurants, dishes, city… e.g. 'Biryani', 'Dosa', 'Mumbai'"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                />
                {query && (
                  <button className="rl-search-clear" onClick={() => setQuery("")}>
                    <X size={15} />
                  </button>
                )}
              </div>
              <button className="rl-filter-btn" onClick={() => setShowFilters(v => !v)}>
                <Filter size={15} /> Filters {showFilters ? "▲" : "▼"}
              </button>
            </div>

            {/* Filter panel */}
            {showFilters && (
              <div className="rl-filters-panel">
                <div className="rl-filter-group">
                  <span className="rl-filter-label">Cuisine</span>
                  <div className="rl-chips">
                    {CUISINES.map(c => (
                      <button key={c} className={`rl-chip ${cuisine === c ? "rl-chip-on" : ""}`} onClick={() => setCuisine(c)}>{c}</button>
                    ))}
                  </div>
                </div>
                <div className="rl-filter-group">
                  <span className="rl-filter-label">Type</span>
                  <div className="rl-chips">
                    {TYPES.map(t => (
                      <button key={t.value} className={`rl-chip ${type === t.value ? "rl-chip-on" : ""}`} onClick={() => setType(t.value)}>{t.label}</button>
                    ))}
                  </div>
                </div>
                {(query || cuisine !== "All" || type !== "all") && (
                  <button className="rl-clear-btn" onClick={clearAll}><X size={13} /> Clear all</button>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ── Grid ────────────────────────────────────────────────────── */}
        <section className="container rl-body">
          <div className="rl-grid-header">
            <p className="rl-count">
              <strong>{filtered.length}</strong> restaurant{filtered.length !== 1 ? "s" : ""} found
              {query && <> for &ldquo;<em>{query}</em>&rdquo;</>}
            </p>
            <Link href="/register-restaurant" className="rl-add-btn">
              <PlusCircle size={16} /> Add Your Restaurant
            </Link>
          </div>

          {filtered.length === 0 ? (
            <div className="rl-empty">
              <Utensils size={44} color="#94a3b8" />
              <h3>No restaurants found</h3>
              <p>Try a different search or clear filters</p>
              <button className="rl-chip rl-chip-on" onClick={clearAll}>Clear filters</button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "4rem", width: "100%" }}>
              
              {/* SECTION 1: REGISTERED PARTNERS */}
              <div className="rl-section-block">
                <h2 className="rl-section-title">
                  Registered Partners <span className="rl-section-count">{registeredPartners.length}</span>
                </h2>
                {registeredPartners.length === 0 ? (
                  <div className="rl-empty-section">
                    <p>No registered partners match your filters</p>
                    <span>Click &ldquo;Add Your Restaurant&rdquo; to add your store!</span>
                  </div>
                ) : (
                  <div className="rl-grid">
                    {registeredPartners.map(r => (
                      <div key={r.id} className="rl-card" onClick={() => setSelectedRestaurant(r)}>

                        {/* Image */}
                        <div className="rl-card-img-wrap">
                          <Image src={r.image} alt={r.name} className="rl-card-img" width={600} height={185} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                          {r.badge && (
                            <span className="rl-card-badge" style={{ background: r.badgeColor }}>{r.badge}</span>
                          )}
                          {!r.open && <div className="rl-closed"><span>Closed</span></div>}
                          <span className="rl-type-dot">
                            {r.type === "veg"    ? <Leaf  size={12} color="#16a34a" /> :
                             r.type === "nonveg" ? <Flame size={12} color="#dc2626" /> :
                                                   <Zap   size={12} color="#b45309" />}
                          </span>
                        </div>

                        {/* Body */}
                        <div className="rl-card-body">
                          <div className="rl-card-row">
                            <h3 className="rl-card-name">{r.name}</h3>
                            <div className="rl-card-rating">
                              <Star size={12} fill="#ffc107" color="#ffc107" />
                              <span>{r.rating > 0 ? r.rating : "New"}</span>
                              {r.reviews > 0 && <span className="rl-rating-count">({r.reviews})</span>}
                            </div>
                          </div>

                          <p className="rl-card-meta">
                            <Utensils size={12} color="#E30613" />
                            {r.cuisine}
                            <span className="rl-dot">·</span>
                            <MapPin size={12} color="#E30613" />
                            {r.area}, {r.city}
                          </p>

                          <p className="rl-card-meta">
                            <Clock size={12} color="#94a3b8" />
                            {r.deliveryTime}
                            <span className="rl-dot">·</span>
                            ₹{r.avgCost} for two
                          </p>

                          {/* Dish tags */}
                          <div className="rl-card-tags">
                            {r.dishes.slice(0, 3).map(d => {
                              const hit = query && d.toLowerCase().includes(query.toLowerCase());
                              return (
                                <span key={d} className={`rl-tag ${hit ? "rl-tag-hit" : ""}`}>{d}</span>
                              );
                            })}
                            {r.dishes.length > 3 && <span className="rl-tag rl-tag-more">+{r.dishes.length - 3}</span>}
                          </div>

                          {/* Order links */}
                          <div className="rl-card-links" onClick={e => e.stopPropagation()}>
                            {r.swiggy && <a href={r.swiggyUrl || "https://swiggy.com"} target="_blank" rel="noopener noreferrer" className="rl-order-btn rl-swiggy">🟠 Swiggy</a>}
                            {r.zomato && <a href={r.zomatoUrl || "https://zomato.com"} target="_blank" rel="noopener noreferrer" className="rl-order-btn rl-zomato">🔴 Zomato</a>}
                            {!r.swiggy && !r.zomato && <span className="rl-no-delivery">No delivery links</span>}
                          </div>

                          <div className="rl-view-profile-cta">
                            View Profile &amp; Reviews <ChevronRight size={13} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* SECTION 2: FEATURED OUTLETS */}
              <div className="rl-section-block">
                <h2 className="rl-section-title">
                  Featured Outlets <span className="rl-section-count">{featuredOutlets.length}</span>
                </h2>
                {featuredOutlets.length === 0 ? (
                  <div className="rl-empty-section">
                    <p>No featured outlets match your filters</p>
                  </div>
                ) : (
                  <div className="rl-grid">
                    {featuredOutlets.map(r => (
                      <div key={r.id} className="rl-card" onClick={() => setSelectedRestaurant(r)}>

                        {/* Image */}
                        <div className="rl-card-img-wrap">
                          <Image src={r.image} alt={r.name} className="rl-card-img" width={600} height={185} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                          {r.badge && (
                            <span className="rl-card-badge" style={{ background: r.badgeColor }}>{r.badge}</span>
                          )}
                          {!r.open && <div className="rl-closed"><span>Closed</span></div>}
                          <span className="rl-type-dot">
                            {r.type === "veg"    ? <Leaf  size={12} color="#16a34a" /> :
                             r.type === "nonveg" ? <Flame size={12} color="#dc2626" /> :
                                                   <Zap   size={12} color="#b45309" />}
                          </span>
                        </div>

                        {/* Body */}
                        <div className="rl-card-body">
                          <div className="rl-card-row">
                            <h3 className="rl-card-name">{r.name}</h3>
                            <div className="rl-card-rating">
                              <Star size={12} fill="#ffc107" color="#ffc107" />
                              <span>{r.rating > 0 ? r.rating : "New"}</span>
                              {r.reviews > 0 && <span className="rl-rating-count">({r.reviews})</span>}
                            </div>
                          </div>

                          <p className="rl-card-meta">
                            <Utensils size={12} color="#E30613" />
                            {r.cuisine}
                            <span className="rl-dot">·</span>
                            <MapPin size={12} color="#E30613" />
                            {r.area}, {r.city}
                          </p>

                          <p className="rl-card-meta">
                            <Clock size={12} color="#94a3b8" />
                            {r.deliveryTime}
                            <span className="rl-dot">·</span>
                            ₹{r.avgCost} for two
                          </p>

                          {/* Dish tags */}
                          <div className="rl-card-tags">
                            {r.dishes.slice(0, 3).map(d => {
                              const hit = query && d.toLowerCase().includes(query.toLowerCase());
                              return (
                                <span key={d} className={`rl-tag ${hit ? "rl-tag-hit" : ""}`}>{d}</span>
                              );
                            })}
                            {r.dishes.length > 3 && <span className="rl-tag rl-tag-more">+{r.dishes.length - 3}</span>}
                          </div>

                          {/* Order links */}
                          <div className="rl-card-links" onClick={e => e.stopPropagation()}>
                            {r.swiggy && <a href={r.swiggyUrl || "https://swiggy.com"} target="_blank" rel="noopener noreferrer" className="rl-order-btn rl-swiggy">🟠 Swiggy</a>}
                            {r.zomato && <a href={r.zomatoUrl || "https://zomato.com"} target="_blank" rel="noopener noreferrer" className="rl-order-btn rl-zomato">🔴 Zomato</a>}
                            {!r.swiggy && !r.zomato && <span className="rl-no-delivery">No delivery</span>}
                          </div>

                          <div className="rl-view-profile-cta">
                            View Profile &amp; Reviews <ChevronRight size={13} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* Bottom CTA */}
          <div className="rl-cta">
            <div className="rl-cta-text">
              <h3>Own a Restaurant?</h3>
              <p>Join Ordrji for free and start getting discovered by thousands of customers.</p>
            </div>
            <Link href="/register-restaurant" className="rl-cta-btn">
              Register for Free <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>

      {/* ─── Restaurant Profile Modal Overlay ─── */}
      {selectedRestaurant && (
        <div className="rl-profile-modal-root">
          <div className="rl-profile-modal-overlay" onClick={() => setSelectedRestaurant(null)} />
          <div className="rl-profile-modal-card">
            <button 
              className="rl-profile-modal-close" 
              onClick={() => setSelectedRestaurant(null)}
              aria-label="Close"
            >
              <X size={17} />
            </button>
            <RestaurantProfileView 
              restaurant={selectedRestaurant} 
              onBack={() => setSelectedRestaurant(null)}
              onReviewAdded={() => {
                setRefreshKey(k => k + 1);
              }}
            />
          </div>
        </div>
      )}

      <Footer />
      <BookDemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
      <RegisterRestaurantModal isOpen={registerOpen} onClose={() => setRegisterOpen(false)} prefill={prefill} />

      <style jsx global>{`
        /* Hero */
        .rl-hero { position:relative; overflow:hidden; padding:5rem 0 3.5rem; background:linear-gradient(135deg,#fff7ed 0%,#fafafa 55%,#f0fdf4 100%); border-bottom:1px solid #e2e8f0; }
        .rl-hero-glow { position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 55% 60% at 80% 50%,rgba(227,6,19,.1) 0%,transparent 70%),radial-gradient(ellipse 40% 50% at 10% 30%,rgba(22,163,74,.06) 0%,transparent 70%); }
        .rl-hero-inner { position:relative;z-index:1;display:flex;flex-direction:column;gap:2rem; }
        .rl-hero-text { display:flex;flex-direction:column;gap:.9rem; }
        .rl-badge { display:inline-flex;align-items:center;gap:.4rem;background:rgba(227,6,19,.1);border:1px solid rgba(227,6,19,.25);color:#E30613;padding:.3rem .9rem;border-radius:9999px;font-size:.72rem;font-weight:700;letter-spacing:.6px;text-transform:uppercase;width:fit-content; }
        .rl-hero-title { font-size:clamp(2rem,5vw,3rem);font-weight:900;letter-spacing:-1.5px;line-height:1.12;color:#0f172a;margin:0; }
        .rl-accent { background:linear-gradient(120deg,#E30613,#bd040f);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
        .rl-hero-sub { font-size:.975rem;color:#64748b;margin:0; }

        /* Search */
        .rl-search-row { display:flex;gap:.75rem;align-items:center;flex-wrap:wrap; }
        .rl-search-box { flex:1;min-width:240px;position:relative;display:flex;align-items:center;background:#fff;border:2px solid #e2e8f0;border-radius:14px;box-shadow:0 4px 16px rgba(0,0,0,.04);transition:border-color .2s,box-shadow .2s; }
        .rl-search-box:focus-within { border-color:#E30613;box-shadow:0 0 0 4px rgba(227,6,19,.1); }
        .rl-search-icon { position:absolute;left:1rem;color:#94a3b8;pointer-events:none;flex-shrink:0; }
        .rl-search-input { flex:1;padding:.85rem 2.8rem;border:none;outline:none;background:transparent;font-family:inherit;font-size:.95rem;color:#0f172a; }
        .rl-search-input::placeholder { color:#94a3b8; }
        .rl-search-clear { position:absolute;right:.9rem;background:#f1f5f9;border:none;border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#64748b;transition:background .15s; }
        .rl-search-clear:hover { background:#e2e8f0; }
        .rl-filter-btn { display:inline-flex;align-items:center;gap:.45rem;padding:.85rem 1.25rem;border-radius:14px;border:2px solid #e2e8f0;background:#fff;font-family:inherit;font-size:.875rem;font-weight:700;color:#374151;cursor:pointer;transition:all .2s;box-shadow:0 4px 16px rgba(0,0,0,.04); }
        .rl-filter-btn:hover { border-color:#E30613;color:#E30613; }

        /* Filter panel */
        .rl-filters-panel { background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:1.25rem 1.5rem;display:flex;flex-direction:column;gap:1rem;box-shadow:0 4px 16px rgba(0,0,0,.04); }
        .rl-filter-group { display:flex;flex-direction:column;gap:.55rem; }
        .rl-filter-label { font-size:.7rem;font-weight:800;color:#94a3b8;text-transform:uppercase;letter-spacing:.8px; }
        .rl-chips { display:flex;flex-wrap:wrap;gap:.4rem; }
        .rl-chip { padding:.38rem .9rem;border-radius:9999px;border:1.5px solid #e2e8f0;background:#f8fafc;font-size:.78rem;font-weight:600;color:#374151;cursor:pointer;font-family:inherit;transition:all .15s; }
        .rl-chip:hover { border-color:#E30613;color:#E30613;background:#fff5f5; }
        .rl-chip-on { background:#fff5f5;border-color:#E30613;color:#b91c1c;font-weight:700; }
        .rl-clear-btn { display:inline-flex;align-items:center;gap:.35rem;font-size:.78rem;font-weight:600;color:#94a3b8;background:none;border:none;cursor:pointer;font-family:inherit;padding:0;width:fit-content;transition:color .15s; }
        .rl-clear-btn:hover { color:#dc2626; }

        /* Body */
        .rl-body { padding:2.5rem 0 5rem; }
        .rl-grid-header { display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem;flex-wrap:wrap;gap:.75rem; }
        .rl-count { font-size:.9rem;color:#64748b;margin:0; }
        .rl-count strong { color:#0f172a; }
        .rl-count em { color:#E30613; }
        .rl-add-btn { display:inline-flex;align-items:center;gap:.45rem;background:#fff5f5;border:1.5px solid #fca5a5;color:#b91c1c;padding:.5rem 1.1rem;border-radius:9999px;font-size:.82rem;font-weight:700;cursor:pointer;font-family:inherit;transition:all .2s; }
        .rl-add-btn:hover { background:#fee2e2;transform:translateY(-1px); }

        /* Sections and Headings */
        .rl-section-title {
          font-size: 1.35rem;
          font-weight: 900;
          color: #0f172a;
          margin: 0 0 1.5rem;
          letter-spacing: -0.5px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border-bottom: 2px solid #e2e8f0;
          padding-bottom: 0.6rem;
        }
        .rl-section-count {
          font-size: 0.78rem;
          font-weight: 800;
          color: #E30613;
          background: #fff5f5;
          padding: 0.2rem 0.65rem;
          border-radius: 9999px;
          letter-spacing: 0.2px;
        }
        .rl-empty-section {
          background: #fff;
          border: 1.5px dashed #e2e8f0;
          border-radius: 20px;
          padding: 3rem 1.5rem;
          text-align: center;
          color: #94a3b8;
          font-size: 0.88rem;
        }
        .rl-empty-section p {
          margin: 0 0 0.25rem;
          font-weight: 700;
          color: #64748b;
        }
        .rl-empty-section span {
          font-size: 0.8rem;
          color: #94a3b8;
        }

        /* Grid */
        .rl-grid { display:grid;grid-template-columns:1fr;gap:1.75rem; }
        @media(min-width: 640px)  { .rl-grid { grid-template-columns:repeat(2,1fr); } }
        @media(min-width: 1024px) { .rl-grid { grid-template-columns:repeat(3,1fr);gap:2rem; } }

        /* Card */
        .rl-card { background:#fff;border:1px solid #e2e8f0;border-radius:20px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,.04);transition:transform .25s,box-shadow .25s,border-color .25s;display:flex;flex-direction:column;cursor:pointer; }
        .rl-card:hover { transform:translateY(-5px);box-shadow:0 16px 40px rgba(0,0,0,.08);border-color:rgba(227,6,19,.25); }
        .rl-card-img-wrap { position:relative;height:185px;overflow:hidden;background:#0f172a;flex-shrink:0; }
        .rl-card-img { width:100%;height:100%;object-fit:cover;transition:transform .4s; }
        .rl-card:hover .rl-card-img { transform:scale(1.05); }
        .rl-card-badge { position:absolute;top:.7rem;left:.7rem;color:#fff;padding:.22rem .65rem;border-radius:9999px;font-size:.66rem;font-weight:800;letter-spacing:.4px;text-transform:uppercase; }
        .rl-closed { position:absolute;inset:0;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center; }
        .rl-closed span { background:rgba(239,68,68,.9);color:#fff;padding:.35rem 1.1rem;border-radius:9999px;font-size:.78rem;font-weight:800; }
        .rl-type-dot { position:absolute;bottom:.7rem;right:.7rem;width:26px;height:26px;background:rgba(255,255,255,.92);border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,.1); }

        /* Card body */
        .rl-card-body { padding:1.2rem;display:flex;flex-direction:column;gap:.6rem;flex:1; }
        .rl-card-row { display:flex;align-items:flex-start;justify-content:space-between;gap:.5rem; }
        .rl-card-name { font-size:1.05rem;font-weight:800;color:#0f172a;margin:0;letter-spacing:-.3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis; }
        .rl-card-rating { display:flex;align-items:center;gap:.25rem;background:#fef3c7;border:1px solid #fde68a;padding:.2rem .5rem;border-radius:8px;font-size:.78rem;font-weight:800;color:#92400e;flex-shrink:0; }
        .rl-rating-count { font-weight:400;color:#b45309;font-size:.72rem; }
        .rl-card-meta { display:flex;align-items:center;gap:.35rem;font-size:.8rem;color:#64748b;margin:0;flex-wrap:wrap; }
        .rl-dot { color:#cbd5e1; }

        /* Tags */
        .rl-card-tags { display:flex;flex-wrap:wrap;gap:.35rem; }
        .rl-tag { padding:.22rem .62rem;border-radius:9999px;background:#f8fafc;border:1px solid #e2e8f0;font-size:.7rem;font-weight:600;color:#64748b;transition:background .15s; }
        .rl-tag-hit { background:#fff5f5;border-color:#fca5a5;color:#b91c1c;font-weight:700; }
        .rl-tag-more { color:#E30613;border-color:#fca5a5;background:#fff5f5; }

        /* Order links */
        .rl-card-links { display:flex;gap:.55rem;flex-wrap:wrap;padding-top:.4rem;border-top:1px solid #f1f5f9; }
        .rl-order-btn { flex:1;display:flex;align-items:center;justify-content:center;padding:.5rem .6rem;border-radius:10px;font-size:.74rem;font-weight:700;text-decoration:none;transition:transform .2s,box-shadow .2s; }
        .rl-swiggy { background:#fff5f5;border:1.5px solid #fca5a5;color:#b91c1c; }
        .rl-swiggy:hover { background:#fee2e2;transform:translateY(-1px);box-shadow:0 4px 10px rgba(227,6,19,.2); }
        .rl-zomato { background:#fff5f5;border:1.5px solid #fecaca;color:#dc2626; }
        .rl-zomato:hover { background:#fee2e2;transform:translateY(-1px);box-shadow:0 4px 10px rgba(220,38,38,.2); }
        .rl-no-delivery { font-size:.72rem;color:#94a3b8;font-style:italic;padding:.5rem 0; }

        .rl-view-profile-cta {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.2rem;
          font-size: 0.78rem;
          font-weight: 700;
          color: #E30613;
          padding-top: 0.4rem;
          border-top: 1px solid #f1f5f9;
          transition: gap 0.15s;
        }
        .rl-card:hover .rl-view-profile-cta {
          gap: 0.4rem;
        }

        /* Empty */
        .rl-empty { display:flex;flex-direction:column;align-items:center;gap:1rem;padding:5rem 1.5rem;text-align:center;background:#fff;border:1px solid #e2e8f0;border-radius:20px;grid-column:1/-1; }
        .rl-empty h3 { font-size:1.25rem;font-weight:800;color:#0f172a;margin:0; }
        .rl-empty p { font-size:.9rem;color:#94a3b8;margin:0; }

        /* CTA Banner */
        .rl-cta { margin-top:3.5rem;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1.5rem;background:linear-gradient(135deg,#fff5f5 0%,#fee2e2 100%);border:1.5px solid #fca5a5;border-radius:20px;padding:2rem 2.5rem;width: 100%; }
        .rl-cta-text h3 { font-size:1.15rem;font-weight:800;color:#0f172a;margin:0 0 .25rem; }
        .rl-cta-text p { font-size:.875rem;color:#64748b;margin:0; }
        .rl-cta-btn { display:inline-flex;align-items:center;gap:.5rem;background:linear-gradient(135deg,#E30613,#bd040f);color:#fff;padding:.85rem 2rem;border-radius:9999px;font-weight:700;font-size:.95rem;border:none;cursor:pointer;box-shadow:0 6px 20px rgba(227,6,19,.35);transition:transform .2s,box-shadow .2s;font-family:inherit; }
        .rl-cta-btn:hover { transform:translateY(-2px);box-shadow:0 10px 28px rgba(227,6,19,.45); }

        /* Profile Modal Overlay */
        .rl-profile-modal-root {
          position: fixed; inset: 0; z-index: 9999;
          display: flex; align-items: flex-start; justify-content: center;
          overflow-y: auto;
        }
        .rl-profile-modal-overlay {
          position: fixed; inset: 0;
          background: rgba(10,8,6,.75);
          backdrop-filter: blur(7px); -webkit-backdrop-filter: blur(7px);
        }
        .rl-profile-modal-card {
          position: relative; z-index: 10000;
          width: 100%; max-width: 960px;
          margin: 2.5rem auto 3rem;
          background: #fff; border-radius: 24px;
          box-shadow: 0 32px 80px -16px rgba(0,0,0,.28);
          overflow: hidden;
        }
        .rl-profile-modal-close {
          position: absolute; top: 1.1rem; right: 1.1rem; z-index: 10001;
          width: 38px; height: 38px; background: #fff;
          border: 1px solid rgba(0,0,0,.12); border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #5a5046;
          box-shadow: 0 4px 12px rgba(0,0,0,.14);
          transition: background .18s, color .18s, transform .18s;
        }
        .rl-profile-modal-close:hover { background: #f0ebe0; color: #1e1b18; transform: scale(1.08); }
      `}</style>
    </>
  );
}
