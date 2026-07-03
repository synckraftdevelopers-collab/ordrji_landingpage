"use client";

import React, { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookDemoModal from "@/components/BookDemoModal";
import RegisterRestaurantModal from "@/components/RegisterRestaurantModal";
import { RestaurantPrefill } from "@/components/restaurant/RegistrationForm";
import {
  Search, MapPin, Star, Clock, Utensils, Filter, X,
  ArrowRight, Leaf, Flame, Zap, PlusCircle,
} from "lucide-react";

/* ─── Demo Data ──────────────────────────────────────────────────── */
const RESTAURANTS = [
  {
    id: 1, name: "Spice Garden", cuisine: "North Indian", type: "both" as const,
    city: "Mumbai", area: "Andheri West", rating: 4.5, reviews: 312,
    deliveryTime: "25–35 min", avgCost: 450,
    dishes: ["Biryani", "Butter Chicken", "Dal Makhani", "Naan", "Lassi"],
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=600",
    badge: "Popular", badgeColor: "#f97316", open: true, swiggy: true, zomato: true,
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

  const openRegister = (p?: RestaurantPrefill) => {
    setPrefill(p);
    setRegisterOpen(true);
  };

  const filtered = useMemo(() =>
    RESTAURANTS.filter(r => {
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
  [query, cuisine, type]);

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
                Browse {RESTAURANTS.length}+ restaurants · Search by dish or cuisine · Order on Swiggy & Zomato
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
            <button className="rl-add-btn" onClick={() => openRegister()}>
              <PlusCircle size={16} /> Add Your Restaurant
            </button>
          </div>

          {filtered.length === 0 ? (
            <div className="rl-empty">
              <Utensils size={44} color="#94a3b8" />
              <h3>No restaurants found</h3>
              <p>Try a different search or clear filters</p>
              <button className="rl-chip rl-chip-on" onClick={clearAll}>Clear filters</button>
            </div>
          ) : (
            <div className="rl-grid">
              {filtered.map(r => (
                <div key={r.id} className="rl-card">

                  {/* Image */}
                  <div className="rl-card-img-wrap">
                    <img src={r.image} alt={r.name} className="rl-card-img" />
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
                        <Star size={12} fill="#f97316" color="#f97316" />
                        <span>{r.rating}</span>
                        <span className="rl-rating-count">({r.reviews})</span>
                      </div>
                    </div>

                    <p className="rl-card-meta">
                      <Utensils size={12} color="#f97316" />
                      {r.cuisine}
                      <span className="rl-dot">·</span>
                      <MapPin size={12} color="#f97316" />
                      {r.area}, {r.city}
                    </p>

                    <p className="rl-card-meta">
                      <Clock size={12} color="#94a3b8" />
                      {r.deliveryTime}
                      <span className="rl-dot">·</span>
                      ₹{r.avgCost} for two
                    </p>

                    {/* Dish tags — highlight matches */}
                    <div className="rl-card-tags">
                      {r.dishes.slice(0, 4).map(d => {
                        const hit = query && d.toLowerCase().includes(query.toLowerCase());
                        return (
                          <span key={d} className={`rl-tag ${hit ? "rl-tag-hit" : ""}`}>{d}</span>
                        );
                      })}
                      {r.dishes.length > 4 && <span className="rl-tag rl-tag-more">+{r.dishes.length - 4}</span>}
                    </div>

                    {/* Order links */}
                    <div className="rl-card-links">
                      {r.swiggy && <a href="https://swiggy.com" target="_blank" rel="noopener noreferrer" className="rl-order-btn rl-swiggy">🟠 Swiggy</a>}
                      {r.zomato && <a href="https://zomato.com" target="_blank" rel="noopener noreferrer" className="rl-order-btn rl-zomato">🔴 Zomato</a>}
                      {!r.swiggy && !r.zomato && <span className="rl-no-delivery">No delivery</span>}
                    </div>

                    {/* Register with this restaurant's data pre-filled */}
                    <button
                      className="rl-register-btn"
                      onClick={() => openRegister({
                        restaurantName: r.name,
                        cuisineType:    r.cuisine,
                        restaurantType: r.type,
                        city:           r.city,
                        dishes:         r.dishes,
                      })}
                    >
                      <PlusCircle size={14} /> Register This Restaurant
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom CTA */}
          <div className="rl-cta">
            <div className="rl-cta-text">
              <h3>Own a Restaurant?</h3>
              <p>Join Ordrji for free and start getting discovered by thousands of customers.</p>
            </div>
            <button className="rl-cta-btn" onClick={() => openRegister()}>
              Register for Free <ArrowRight size={16} />
            </button>
          </div>
        </section>
      </main>

      <Footer />
      <BookDemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
      <RegisterRestaurantModal isOpen={registerOpen} onClose={() => setRegisterOpen(false)} prefill={prefill} />

      <style jsx global>{`
        /* Hero */
        .rl-hero { position:relative; overflow:hidden; padding:5rem 0 3.5rem; background:linear-gradient(135deg,#fff7ed 0%,#fafafa 55%,#f0fdf4 100%); border-bottom:1px solid #e2e8f0; }
        .rl-hero-glow { position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 55% 60% at 80% 50%,rgba(249,115,22,.1) 0%,transparent 70%),radial-gradient(ellipse 40% 50% at 10% 30%,rgba(22,163,74,.06) 0%,transparent 70%); }
        .rl-hero-inner { position:relative;z-index:1;display:flex;flex-direction:column;gap:2rem; }
        .rl-hero-text { display:flex;flex-direction:column;gap:.9rem; }
        .rl-badge { display:inline-flex;align-items:center;gap:.4rem;background:rgba(249,115,22,.1);border:1px solid rgba(249,115,22,.25);color:#c2410c;padding:.3rem .9rem;border-radius:9999px;font-size:.72rem;font-weight:700;letter-spacing:.6px;text-transform:uppercase;width:fit-content; }
        .rl-hero-title { font-size:clamp(2rem,5vw,3rem);font-weight:900;letter-spacing:-1.5px;line-height:1.12;color:#0f172a;margin:0; }
        .rl-accent { background:linear-gradient(120deg,#f97316,#ea580c);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
        .rl-hero-sub { font-size:.975rem;color:#64748b;margin:0; }

        /* Search */
        .rl-search-row { display:flex;gap:.75rem;align-items:center;flex-wrap:wrap; }
        .rl-search-box { flex:1;min-width:240px;position:relative;display:flex;align-items:center;background:#fff;border:2px solid #e2e8f0;border-radius:14px;box-shadow:0 4px 16px rgba(0,0,0,.04);transition:border-color .2s,box-shadow .2s; }
        .rl-search-box:focus-within { border-color:#f97316;box-shadow:0 0 0 4px rgba(249,115,22,.1); }
        .rl-search-icon { position:absolute;left:1rem;color:#94a3b8;pointer-events:none;flex-shrink:0; }
        .rl-search-input { flex:1;padding:.85rem 2.8rem;border:none;outline:none;background:transparent;font-family:inherit;font-size:.95rem;color:#0f172a; }
        .rl-search-input::placeholder { color:#94a3b8; }
        .rl-search-clear { position:absolute;right:.9rem;background:#f1f5f9;border:none;border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#64748b;transition:background .15s; }
        .rl-search-clear:hover { background:#e2e8f0; }
        .rl-filter-btn { display:inline-flex;align-items:center;gap:.45rem;padding:.85rem 1.25rem;border-radius:14px;border:2px solid #e2e8f0;background:#fff;font-family:inherit;font-size:.875rem;font-weight:700;color:#374151;cursor:pointer;transition:all .2s;box-shadow:0 4px 16px rgba(0,0,0,.04); }
        .rl-filter-btn:hover { border-color:#f97316;color:#f97316; }

        /* Filter panel */
        .rl-filters-panel { background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:1.25rem 1.5rem;display:flex;flex-direction:column;gap:1rem;box-shadow:0 4px 16px rgba(0,0,0,.04); }
        .rl-filter-group { display:flex;flex-direction:column;gap:.55rem; }
        .rl-filter-label { font-size:.7rem;font-weight:800;color:#94a3b8;text-transform:uppercase;letter-spacing:.8px; }
        .rl-chips { display:flex;flex-wrap:wrap;gap:.4rem; }
        .rl-chip { padding:.38rem .9rem;border-radius:9999px;border:1.5px solid #e2e8f0;background:#f8fafc;font-size:.78rem;font-weight:600;color:#374151;cursor:pointer;font-family:inherit;transition:all .15s; }
        .rl-chip:hover { border-color:#f97316;color:#f97316;background:#fff7ed; }
        .rl-chip-on { background:#fff7ed;border-color:#f97316;color:#c2410c;font-weight:700; }
        .rl-clear-btn { display:inline-flex;align-items:center;gap:.35rem;font-size:.78rem;font-weight:600;color:#94a3b8;background:none;border:none;cursor:pointer;font-family:inherit;padding:0;width:fit-content;transition:color .15s; }
        .rl-clear-btn:hover { color:#dc2626; }

        /* Body */
        .rl-body { padding:2.5rem 0 5rem; }
        .rl-grid-header { display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem;flex-wrap:wrap;gap:.75rem; }
        .rl-count { font-size:.9rem;color:#64748b;margin:0; }
        .rl-count strong { color:#0f172a; }
        .rl-count em { color:#f97316; }
        .rl-add-btn { display:inline-flex;align-items:center;gap:.45rem;background:#fff7ed;border:1.5px solid #fed7aa;color:#c2410c;padding:.5rem 1.1rem;border-radius:9999px;font-size:.82rem;font-weight:700;cursor:pointer;font-family:inherit;transition:all .2s; }
        .rl-add-btn:hover { background:#ffedd5;transform:translateY(-1px); }

        /* Grid */
        .rl-grid { display:grid;grid-template-columns:1fr;gap:1.75rem; }
        @media(min-width:640px)  { .rl-grid { grid-template-columns:repeat(2,1fr); } }
        @media(min-width:1024px) { .rl-grid { grid-template-columns:repeat(3,1fr);gap:2rem; } }

        /* Card */
        .rl-card { background:#fff;border:1px solid #e2e8f0;border-radius:20px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,.04);transition:transform .25s,box-shadow .25s,border-color .25s;display:flex;flex-direction:column; }
        .rl-card:hover { transform:translateY(-5px);box-shadow:0 16px 40px rgba(0,0,0,.08);border-color:rgba(249,115,22,.25); }
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
        .rl-card-name { font-size:1.05rem;font-weight:800;color:#0f172a;margin:0;letter-spacing:-.3px; }
        .rl-card-rating { display:flex;align-items:center;gap:.25rem;background:#fef3c7;border:1px solid #fde68a;padding:.2rem .5rem;border-radius:8px;font-size:.78rem;font-weight:800;color:#92400e;flex-shrink:0; }
        .rl-rating-count { font-weight:400;color:#b45309;font-size:.72rem; }
        .rl-card-meta { display:flex;align-items:center;gap:.35rem;font-size:.8rem;color:#64748b;margin:0;flex-wrap:wrap; }
        .rl-dot { color:#cbd5e1; }

        /* Tags */
        .rl-card-tags { display:flex;flex-wrap:wrap;gap:.35rem; }
        .rl-tag { padding:.22rem .62rem;border-radius:9999px;background:#f8fafc;border:1px solid #e2e8f0;font-size:.7rem;font-weight:600;color:#64748b;transition:background .15s; }
        .rl-tag-hit { background:#fff7ed;border-color:#fed7aa;color:#c2410c;font-weight:700; }
        .rl-tag-more { color:#f97316;border-color:#fed7aa;background:#fff7ed; }

        /* Order links */
        .rl-card-links { display:flex;gap:.55rem;flex-wrap:wrap;padding-top:.4rem;border-top:1px solid #f1f5f9; }
        .rl-order-btn { flex:1;display:flex;align-items:center;justify-content:center;padding:.5rem .6rem;border-radius:10px;font-size:.74rem;font-weight:700;text-decoration:none;transition:transform .2s,box-shadow .2s; }
        .rl-swiggy { background:#fff7ed;border:1.5px solid #fed7aa;color:#c2410c; }
        .rl-swiggy:hover { background:#ffedd5;transform:translateY(-1px);box-shadow:0 4px 10px rgba(249,115,22,.2); }
        .rl-zomato { background:#fff5f5;border:1.5px solid #fecaca;color:#dc2626; }
        .rl-zomato:hover { background:#fee2e2;transform:translateY(-1px);box-shadow:0 4px 10px rgba(220,38,38,.2); }
        .rl-no-delivery { font-size:.72rem;color:#94a3b8;font-style:italic;padding:.5rem 0; }

        /* Register button on card */
        .rl-register-btn { width:100%;margin-top:.3rem;display:flex;align-items:center;justify-content:center;gap:.4rem;padding:.6rem;border-radius:10px;border:1.5px solid #bbf7d0;background:#f0fdf4;color:#166534;font-family:inherit;font-size:.78rem;font-weight:700;cursor:pointer;transition:all .2s; }
        .rl-register-btn:hover { background:#dcfce7;border-color:#86efac;transform:translateY(-1px); }

        /* Empty */
        .rl-empty { display:flex;flex-direction:column;align-items:center;gap:1rem;padding:5rem 1.5rem;text-align:center;background:#fff;border:1px solid #e2e8f0;border-radius:20px;grid-column:1/-1; }
        .rl-empty h3 { font-size:1.25rem;font-weight:800;color:#0f172a;margin:0; }
        .rl-empty p { font-size:.9rem;color:#94a3b8;margin:0; }

        /* CTA Banner */
        .rl-cta { margin-top:3.5rem;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1.5rem;background:linear-gradient(135deg,#fff7ed 0%,#ffedd5 100%);border:1.5px solid #fed7aa;border-radius:20px;padding:2rem 2.5rem; }
        .rl-cta-text h3 { font-size:1.15rem;font-weight:800;color:#0f172a;margin:0 0 .25rem; }
        .rl-cta-text p { font-size:.875rem;color:#64748b;margin:0; }
        .rl-cta-btn { display:inline-flex;align-items:center;gap:.5rem;background:linear-gradient(135deg,#f97316,#ea580c);color:#fff;padding:.85rem 2rem;border-radius:9999px;font-weight:700;font-size:.95rem;border:none;cursor:pointer;box-shadow:0 6px 20px rgba(249,115,22,.35);transition:transform .2s,box-shadow .2s;font-family:inherit; }
        .rl-cta-btn:hover { transform:translateY(-2px);box-shadow:0 10px 28px rgba(249,115,22,.45); }
      `}</style>
    </>
  );
}
