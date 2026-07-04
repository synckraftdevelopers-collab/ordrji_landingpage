"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookDemoModal from "@/components/BookDemoModal";
import RegisterRestaurantModal from "@/components/RegisterRestaurantModal";
import RegistrationForm from "@/components/restaurant/RegistrationForm";
import { RestaurantPrefill } from "@/components/restaurant/RegistrationForm";
import {
  Search, Star, MapPin, Utensils, Clock, X,
  PlusCircle, Leaf, Flame, Zap, ArrowRight,
} from "lucide-react";
import { getStoredRestaurants, StoredRestaurant } from "@/lib/restaurantStore";

/* ─── Demo seed data (same as /restaurants page) ──────────────── */
const SEED: StoredRestaurant[] = [
  {
    id: "seed-1", name: "Spice Garden", cuisine: "North Indian", type: "both",
    city: "Mumbai", area: "Andheri West", dishes: ["Biryani","Butter Chicken","Dal Makhani","Naan","Lassi"],
    avgCost: 450, openingTime: "11:00", closingTime: "23:00",
    ownerName: "Arjun Sharma", phone: "9876543210", email: "spicegarden@example.com",
    swiggyUrl: "https://swiggy.com", zomatoUrl: "https://zomato.com",
    registeredAt: "2026-06-01T10:00:00Z", badge: "Popular", badgeColor: "#f97316",
  },
  {
    id: "seed-2", name: "The Dosa House", cuisine: "South Indian", type: "veg",
    city: "Bengaluru", area: "Koramangala", dishes: ["Masala Dosa","Idli Sambhar","Vada","Filter Coffee"],
    avgCost: 200, openingTime: "07:00", closingTime: "22:00",
    ownerName: "Priya Nair", phone: "9876543211", email: "dosahouse@example.com",
    swiggyUrl: "https://swiggy.com",
    registeredAt: "2026-06-05T09:00:00Z", badge: "Top Rated", badgeColor: "#16a34a",
  },
  {
    id: "seed-3", name: "Biryani Brothers", cuisine: "Biryani", type: "nonveg",
    city: "Hyderabad", area: "Banjara Hills", dishes: ["Chicken Biryani","Mutton Biryani","Kebab","Raita"],
    avgCost: 380, openingTime: "12:00", closingTime: "23:30",
    ownerName: "Rahim Khan", phone: "9876543212", email: "biryanibrothers@example.com",
    swiggyUrl: "https://swiggy.com", zomatoUrl: "https://zomato.com",
    registeredAt: "2026-06-10T11:00:00Z", badge: "Trending", badgeColor: "#dc2626",
  },
  {
    id: "seed-4", name: "Chai & Bites Cafe", cuisine: "Cafe", type: "veg",
    city: "Pune", area: "Kalyani Nagar", dishes: ["Masala Chai","Sandwich","Cold Coffee","Waffles"],
    avgCost: 300, openingTime: "08:00", closingTime: "21:00",
    ownerName: "Sneha Joshi", phone: "9876543213", email: "chaibites@example.com",
    swiggyUrl: "https://swiggy.com", zomatoUrl: "https://zomato.com",
    registeredAt: "2026-06-15T08:30:00Z", badge: "New", badgeColor: "#7c3aed",
  },
];

function RestaurantCard({ r, query }: { r: StoredRestaurant; query: string }) {
  const isNew = Date.now() - new Date(r.registeredAt).getTime() < 1000 * 60 * 60 * 24; // < 24h
  return (
    <div className="rr-pg-card">
      <div className="rr-pg-card-top">
        <div className="rr-pg-card-icon" style={{
          background: r.type === "veg" ? "#f0fdf4" : r.type === "nonveg" ? "#fff5f5" : "#fffbeb",
        }}>
          {r.type === "veg"    ? <Leaf  size={20} color="#16a34a" /> :
           r.type === "nonveg" ? <Flame size={20} color="#dc2626" /> :
                                 <Zap   size={20} color="#b45309" />}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="rr-pg-card-name-row">
            <h3 className="rr-pg-card-name">{r.name}</h3>
            {isNew && <span className="rr-pg-card-new">Just Added</span>}
            {r.badge && !isNew && (
              <span className="rr-pg-card-badge" style={{ background: r.badgeColor }}>{r.badge}</span>
            )}
          </div>
          <p className="rr-pg-card-meta">
            <Utensils size={12} /> {r.cuisine}
            <span className="rr-pg-dot">·</span>
            <MapPin size={12} /> {r.area}, {r.city}
          </p>
        </div>
        <div className="rr-pg-card-cost">₹{r.avgCost}<span>/two</span></div>
      </div>

      <div className="rr-pg-card-dishes">
        {r.dishes.slice(0, 4).map(d => {
          const hit = query && d.toLowerCase().includes(query.toLowerCase());
          return <span key={d} className={`rr-pg-dish ${hit ? "rr-pg-dish-hit" : ""}`}>{d}</span>;
        })}
        {r.dishes.length > 4 && <span className="rr-pg-dish rr-pg-dish-more">+{r.dishes.length - 4}</span>}
      </div>

      <div className="rr-pg-card-links">
        <span className="rr-pg-card-hours">
          <Clock size={12} /> {r.openingTime} – {r.closingTime}
        </span>
        <div style={{ display: "flex", gap: ".5rem" }}>
          {r.swiggyUrl && <a href={r.swiggyUrl} target="_blank" rel="noopener noreferrer" className="rr-pg-order-btn rr-pg-swiggy">🟠 Swiggy</a>}
          {r.zomatoUrl && <a href={r.zomatoUrl} target="_blank" rel="noopener noreferrer" className="rr-pg-order-btn rr-pg-zomato">🔴 Zomato</a>}
        </div>
      </div>
    </div>
  );
}

function RegisterRestaurantContent() {
  const searchParams = useSearchParams();
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [userRestaurants, setUserRestaurants] = useState<StoredRestaurant[]>([]);
  const [showForm, setShowForm] = useState(false);

  // Build prefill from URL query params (e.g. from /restaurants "Register This Restaurant" button)
  const urlPrefill: RestaurantPrefill | undefined = useMemo(() => {
    const name = searchParams.get("name");
    if (!name) return undefined;
    return {
      restaurantName: name,
      cuisineType:    searchParams.get("cuisine") ?? undefined,
      restaurantType: (searchParams.get("type") as RestaurantPrefill["restaurantType"]) ?? undefined,
      city:           searchParams.get("city") ?? undefined,
    };
  }, [searchParams]);

  // Auto-open form if URL has prefill params
  useEffect(() => {
    if (urlPrefill) {
      setShowForm(true);
      setTimeout(() => {
        document.getElementById("registration-form")?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  }, [urlPrefill]);

  useEffect(() => {
    setUserRestaurants(getStoredRestaurants());
  }, []);

  const allRestaurants = useMemo(() => {
    const stored = userRestaurants.filter(r => !SEED.find(s => s.id === r.id));
    return [...stored, ...SEED];
  }, [userRestaurants]);

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

  return (
    <>
      <Navbar
        onBookDemo={() => setIsDemoOpen(true)}
        onRegister={() => setShowForm(true)}
      />

      <main style={{ background: "#f8fafc", minHeight: "100vh", paddingTop: "4.5rem" }}>

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section className="rr-pg-hero">
          <div className="rr-pg-hero-glow" aria-hidden />
          <div className="container rr-pg-hero-inner">
            <div>
              <span className="rr-pg-badge">🍴 Restaurant Portal</span>
              <h1 className="rr-pg-title">
                Register Your Restaurant<br />
                <span className="rr-pg-accent">on Ordrji — Free</span>
              </h1>
              <p className="rr-pg-sub">
                Join {allRestaurants.length}+ restaurants. Get discovered, connect Swiggy & Zomato, grow your online presence.
              </p>
              <button className="rr-pg-cta" onClick={() => setShowForm(true)}>
                <PlusCircle size={18} /> Register Your Restaurant
              </button>
            </div>

            <div className="rr-pg-stats">
              {[
                { n: `${allRestaurants.length}+`, l: "Registered" },
                { n: "8+",    l: "Cities" },
                { n: "Free",  l: "to Join" },
                { n: "24hr",  l: "Review" },
              ].map(s => (
                <div key={s.l} className="rr-pg-stat">
                  <span className="rr-pg-stat-n">{s.n}</span>
                  <span className="rr-pg-stat-l">{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Registered Restaurants with Search ───────────────────── */}
        <section className="container rr-pg-body">

          <div className="rr-pg-section-head">
            <div>
              <h2 className="rr-pg-section-title">Restaurants on Ordrji</h2>
              <p className="rr-pg-section-sub">Search by name, cuisine, city or dish</p>
            </div>
            <button className="rr-pg-add-btn" onClick={() => setShowForm(true)}>
              <PlusCircle size={15} /> Add Yours
            </button>
          </div>

          {/* Search bar */}
          <div className="rr-pg-search-wrap">
            <Search size={18} className="rr-pg-search-icon" />
            <input
              className="rr-pg-search-input"
              placeholder="Search restaurants, dishes, city… e.g. 'Biryani', 'Cafe', 'Mumbai'"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            {query && (
              <button className="rr-pg-search-clear" onClick={() => setQuery("")}>
                <X size={15} />
              </button>
            )}
          </div>

          <p className="rr-pg-results-count">
            <strong>{filtered.length}</strong> restaurant{filtered.length !== 1 ? "s" : ""}
            {query && <> matching <em>&ldquo;{query}&rdquo;</em></>}
          </p>

          {filtered.length === 0 ? (
            <div className="rr-pg-empty">
              <Utensils size={40} color="#94a3b8" />
              <p>No restaurants found. <button onClick={() => setQuery("")} className="rr-pg-link">Clear search</button></p>
            </div>
          ) : (
            <div className="rr-pg-list">
              {filtered.map(r => <RestaurantCard key={r.id} r={r} query={query} />)}
            </div>
          )}
        </section>

        {/* ── Registration Form ─────────────────────────────────────── */}
        {showForm && (
          <section className="container rr-pg-form-section" id="registration-form">
            <div className="rr-pg-form-header">
              <h2 className="rr-pg-section-title">Register Your Restaurant</h2>
              <button className="rr-pg-collapse-btn" onClick={() => setShowForm(false)}>
                <X size={16} /> Close form
              </button>
            </div>
            <RegistrationForm
              prefill={urlPrefill}
              onSuccess={(name) => {
                setUserRestaurants(getStoredRestaurants());
                setShowForm(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </section>
        )}

      </main>

      <Footer />
      <BookDemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
      <RegisterRestaurantModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />

      <style jsx global>{`
        /* Hero */
        .rr-pg-hero { position:relative;overflow:hidden;padding:4.5rem 0 3.5rem;background:linear-gradient(135deg,#fff7ed 0%,#fff 55%,#f0fdf4 100%);border-bottom:1px solid #e2e8f0; }
        .rr-pg-hero-glow { position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 55% 60% at 80% 50%,rgba(249,115,22,.1) 0%,transparent 70%); }
        .rr-pg-hero-inner { position:relative;z-index:1;display:grid;grid-template-columns:1fr;gap:2.5rem;align-items:center; }
        @media(min-width:900px){ .rr-pg-hero-inner { grid-template-columns:1fr 340px; } }
        .rr-pg-badge { display:inline-flex;align-items:center;gap:.4rem;background:rgba(249,115,22,.1);border:1px solid rgba(249,115,22,.25);color:#c2410c;padding:.3rem .9rem;border-radius:9999px;font-size:.72rem;font-weight:700;letter-spacing:.6px;text-transform:uppercase; }
        .rr-pg-title { font-size:clamp(2rem,5vw,3rem);font-weight:900;letter-spacing:-1.5px;line-height:1.12;color:#0f172a;margin:.75rem 0 .9rem; }
        .rr-pg-accent { background:linear-gradient(120deg,#f97316,#ea580c);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
        .rr-pg-sub { font-size:1rem;color:#64748b;margin:0 0 1.5rem; }
        .rr-pg-cta { display:inline-flex;align-items:center;gap:.55rem;background:linear-gradient(135deg,#f97316,#ea580c);color:#fff;padding:.9rem 2rem;border-radius:9999px;border:none;font-family:inherit;font-size:.975rem;font-weight:700;cursor:pointer;box-shadow:0 8px 24px rgba(249,115,22,.35);transition:transform .2s,box-shadow .2s; }
        .rr-pg-cta:hover { transform:translateY(-2px);box-shadow:0 12px 32px rgba(249,115,22,.45); }
        .rr-pg-stats { display:grid;grid-template-columns:1fr 1fr;gap:1rem; }
        .rr-pg-stat { display:flex;flex-direction:column;gap:.15rem;padding:1rem;background:rgba(255,255,255,.85);border:1px solid rgba(249,115,22,.15);border-radius:14px;backdrop-filter:blur(12px);text-align:center; }
        .rr-pg-stat-n { font-size:1.5rem;font-weight:900;color:#f97316;letter-spacing:-.5px; }
        .rr-pg-stat-l { font-size:.7rem;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:.5px; }

        /* Body */
        .rr-pg-body { padding:3rem 0 2rem; }
        .rr-pg-section-head { display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem;flex-wrap:wrap;gap:.75rem; }
        .rr-pg-section-title { font-size:1.5rem;font-weight:800;color:#0f172a;margin:0;letter-spacing:-.5px; }
        .rr-pg-section-sub { font-size:.85rem;color:#64748b;margin:.2rem 0 0; }
        .rr-pg-add-btn { display:inline-flex;align-items:center;gap:.4rem;background:#f0fdf4;border:1.5px solid #bbf7d0;color:#166534;padding:.55rem 1.1rem;border-radius:9999px;font-size:.82rem;font-weight:700;cursor:pointer;font-family:inherit;transition:all .2s; }
        .rr-pg-add-btn:hover { background:#dcfce7;transform:translateY(-1px); }

        /* Search */
        .rr-pg-search-wrap { position:relative;display:flex;align-items:center;background:#fff;border:2px solid #e2e8f0;border-radius:14px;box-shadow:0 4px 16px rgba(0,0,0,.04);transition:border-color .2s,box-shadow .2s;margin-bottom:1rem; }
        .rr-pg-search-wrap:focus-within { border-color:#f97316;box-shadow:0 0 0 4px rgba(249,115,22,.1); }
        .rr-pg-search-icon { position:absolute;left:1rem;color:#94a3b8;pointer-events:none;flex-shrink:0; }
        .rr-pg-search-input { flex:1;padding:.9rem 3rem;border:none;outline:none;background:transparent;font-family:inherit;font-size:.95rem;color:#0f172a; }
        .rr-pg-search-input::placeholder { color:#94a3b8; }
        .rr-pg-search-clear { position:absolute;right:.9rem;background:#f1f5f9;border:none;border-radius:50%;width:26px;height:26px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#64748b;transition:background .15s; }
        .rr-pg-search-clear:hover { background:#e2e8f0; }
        .rr-pg-results-count { font-size:.85rem;color:#64748b;margin:0 0 1.25rem; }
        .rr-pg-results-count strong { color:#0f172a; }
        .rr-pg-results-count em { color:#f97316; }

        /* Card list */
        .rr-pg-list { display:flex;flex-direction:column;gap:1rem;margin-bottom:3rem; }
        .rr-pg-card { background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:1.25rem;box-shadow:0 4px 14px rgba(0,0,0,.04);transition:border-color .2s,box-shadow .2s; }
        .rr-pg-card:hover { border-color:rgba(249,115,22,.25);box-shadow:0 8px 24px rgba(0,0,0,.07); }
        .rr-pg-card-top { display:flex;align-items:flex-start;gap:1rem;margin-bottom:.75rem; }
        .rr-pg-card-icon { width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
        .rr-pg-card-name-row { display:flex;align-items:center;gap:.5rem;flex-wrap:wrap;margin-bottom:.2rem; }
        .rr-pg-card-name { font-size:1rem;font-weight:800;color:#0f172a;margin:0;letter-spacing:-.3px; }
        .rr-pg-card-new { font-size:.65rem;font-weight:800;background:#dcfce7;color:#166534;border:1px solid #bbf7d0;padding:.18rem .55rem;border-radius:9999px;text-transform:uppercase;letter-spacing:.4px; }
        .rr-pg-card-badge { font-size:.65rem;font-weight:800;color:#fff;padding:.18rem .55rem;border-radius:9999px;text-transform:uppercase;letter-spacing:.3px; }
        .rr-pg-card-meta { display:flex;align-items:center;gap:.35rem;font-size:.78rem;color:#64748b;margin:0;flex-wrap:wrap; }
        .rr-pg-dot { color:#cbd5e1; }
        .rr-pg-card-cost { font-size:.95rem;font-weight:800;color:#f97316;white-space:nowrap;flex-shrink:0; }
        .rr-pg-card-cost span { font-size:.7rem;font-weight:500;color:#94a3b8; }
        .rr-pg-card-dishes { display:flex;flex-wrap:wrap;gap:.35rem;margin-bottom:.85rem; }
        .rr-pg-dish { padding:.22rem .62rem;border-radius:9999px;background:#f8fafc;border:1px solid #e2e8f0;font-size:.7rem;font-weight:600;color:#64748b; }
        .rr-pg-dish-hit { background:#fff7ed;border-color:#fed7aa;color:#c2410c;font-weight:700; }
        .rr-pg-dish-more { color:#f97316;border-color:#fed7aa;background:#fff7ed; }
        .rr-pg-card-links { display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.5rem;padding-top:.75rem;border-top:1px solid #f1f5f9; }
        .rr-pg-card-hours { display:flex;align-items:center;gap:.3rem;font-size:.75rem;color:#94a3b8;font-weight:600; }
        .rr-pg-order-btn { padding:.4rem .85rem;border-radius:9px;font-size:.72rem;font-weight:700;text-decoration:none;transition:transform .2s; }
        .rr-pg-swiggy { background:#fff7ed;border:1.5px solid #fed7aa;color:#c2410c; }
        .rr-pg-swiggy:hover { background:#ffedd5;transform:translateY(-1px); }
        .rr-pg-zomato { background:#fff5f5;border:1.5px solid #fecaca;color:#dc2626; }
        .rr-pg-zomato:hover { background:#fee2e2;transform:translateY(-1px); }

        /* Empty */
        .rr-pg-empty { display:flex;flex-direction:column;align-items:center;gap:.75rem;padding:4rem 1.5rem;text-align:center;background:#fff;border:1px solid #e2e8f0;border-radius:16px;margin-bottom:2rem; }
        .rr-pg-empty p { font-size:.9rem;color:#94a3b8;margin:0; }
        .rr-pg-link { background:none;border:none;color:#f97316;font-weight:700;cursor:pointer;font-size:inherit;padding:0; }

        /* Form section */
        .rr-pg-form-section { padding:2rem 0 4rem; }
        .rr-pg-form-header { display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem;flex-wrap:wrap;gap:.75rem; }
        .rr-pg-collapse-btn { display:inline-flex;align-items:center;gap:.4rem;background:#fff;border:1px solid #e2e8f0;color:#64748b;padding:.5rem 1rem;border-radius:9999px;font-size:.82rem;font-weight:600;cursor:pointer;font-family:inherit;transition:all .2s; }
        .rr-pg-collapse-btn:hover { border-color:#f97316;color:#f97316; }
      `}</style>
    </>
  );
}

export default function RegisterRestaurantPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc" }}>
        <div style={{ textAlign: "center", color: "#94a3b8" }}>Loading…</div>
      </div>
    }>
      <RegisterRestaurantContent />
    </Suspense>
  );
}
