"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckCircle2, Loader2, ArrowRight, Eye, TrendingUp, Star,
  Share2, ThumbsUp, Zap, Search, X, ChevronDown, Utensils,
  Users, Clock, MapPin, Building2
} from "lucide-react";

import { registrationSchema, RegistrationFormData } from "./FormValidation";
import RestaurantInfo     from "./RestaurantInfo";
import BrandingSection    from "./BrandingSection";
import IntegrationSection from "./IntegrationSection";
import BusinessSection    from "./BusinessSection";
import SuccessModal       from "./SuccessModal";

/* ─── Data ──────────────────────────────────────────────────────── */
const CUISINE_LIST = [
  "Indian","North Indian","South Indian","Chinese","Continental",
  "Fast Food","Street Food","Cafe","Bakery","Pizza","Biryani",
  "Mughlai","Thai","Italian","Mexican","Japanese","Mediterranean",
  "Multi Cuisine","Seafood","Desserts & Ice Cream",
];

const DISH_SUGGESTIONS = [
  "Butter Chicken","Dal Makhani","Paneer Tikka","Biryani","Chole Bhature",
  "Masala Dosa","Idli Sambhar","Vada Pav","Pav Bhaji","Rajma Chawal",
  "Aloo Paratha","Kadai Paneer","Tandoori Roti","Naan","Lassi",
  "Gulab Jamun","Rasgulla","Kheer","Jalebi","Samosa",
  "Momos","Fried Rice","Hakka Noodles","Manchurian","Spring Roll",
  "Margherita Pizza","Pasta","Burger","Sandwich","French Fries",
  "Grilled Chicken","Fish Curry","Prawn Masala","Mutton Rogan Josh",
  "Cold Coffee","Mango Lassi","Masala Chai","Fresh Lime Soda",
];

const BENEFITS = [
  { icon: <Eye size={18}/>,        title: "Increase Visibility",        desc: "Appear in local restaurant searches instantly" },
  { icon: <Zap size={18}/>,        title: "Get Discovered Faster",      desc: "AI-powered recommendations for your outlet" },
  { icon: <Share2 size={18}/>,     title: "Connect Swiggy & Zomato",    desc: "Redirect customers to your delivery pages" },
  { icon: <TrendingUp size={18}/>, title: "Improve Online Presence",    desc: "Build a strong brand for your restaurant" },
  { icon: <Star size={18}/>,       title: "Verified Reviews",           desc: "Collect reviews from real diners" },
  { icon: <ThumbsUp size={18}/>,   title: "Zero Commission",            desc: "Keep 100% of your revenue — no cuts" },
];

/* ─── Searchable Dropdown ───────────────────────────────────────── */
function SearchableSelect({
  options, value, onChange, placeholder, error,
}: {
  options: string[]; value: string; onChange: (v: string) => void;
  placeholder: string; error?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const filtered = options.filter(o => o.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="rr-sselect-wrap">
      <button
        type="button"
        className={`rr-sselect-trigger ${error ? "rr-input-err" : ""} ${open ? "rr-sselect-open" : ""}`}
        onClick={() => setOpen(v => !v)}
      >
        <span className={value ? "rr-sselect-value" : "rr-sselect-placeholder"}>
          {value || placeholder}
        </span>
        <ChevronDown size={15} className={`rr-sselect-arrow ${open ? "rotated" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="rr-sselect-menu"
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }}
          >
            <div className="rr-sselect-search-wrap">
              <Search size={13} className="rr-sselect-search-icon" />
              <input
                className="rr-sselect-search"
                placeholder="Search..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                onClick={e => e.stopPropagation()}
                autoFocus
              />
            </div>
            <div className="rr-sselect-options">
              {filtered.length === 0 && <p className="rr-sselect-empty">No results</p>}
              {filtered.map(o => (
                <button
                  key={o} type="button"
                  className={`rr-sselect-option ${value === o ? "rr-sselect-selected" : ""}`}
                  onClick={() => { onChange(o); setQuery(""); setOpen(false); }}
                >
                  {o}
                  {value === o && <CheckCircle2 size={13} />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Multi-Select Dishes ───────────────────────────────────────── */
function DishesMultiSelect({
  value, onChange, error,
}: {
  value: string[]; onChange: (v: string[]) => void; error?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const filtered = DISH_SUGGESTIONS.filter(d =>
    !value.includes(d) && d.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const addDish = (dish: string) => {
    onChange([...value, dish]);
    setQuery("");
  };

  const removeDish = (dish: string) => {
    onChange(value.filter(d => d !== dish));
  };

  return (
    <div ref={ref} className="rr-dishes-wrap">
      <button
        type="button"
        className={`rr-dishes-trigger ${error ? "rr-input-err" : ""}`}
        onClick={() => setOpen(v => !v)}
      >
        <Utensils size={14} className="rr-dishes-icon" />
        <span className={value.length ? "rr-dishes-placeholder-hidden" : "rr-dishes-placeholder"}>
          Select popular dishes
        </span>
      </button>

      {/* Selected dish pills */}
      {value.length > 0 && (
        <div className="rr-dishes-tags">
          {value.map(d => (
            <span key={d} className="rr-dish-tag">
              {d}
              <button type="button" onClick={() => removeDish(d)} className="rr-dish-tag-remove">
                <X size={11} />
              </button>
            </span>
          ))}
        </div>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            className="rr-dishes-menu"
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }}
          >
            <div className="rr-sselect-search-wrap">
              <Search size={13} className="rr-sselect-search-icon" />
              <input
                className="rr-sselect-search"
                placeholder="Search dishes..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                onClick={e => e.stopPropagation()}
                autoFocus
              />
            </div>
            <div className="rr-dishes-options">
              {filtered.length === 0 && <p className="rr-sselect-empty">No dishes found</p>}
              {filtered.slice(0, 12).map(d => (
                <button key={d} type="button" className="rr-dishes-option" onClick={() => addDish(d)}>
                  {d}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Prefill type ───────────────────────────────────────────────── */
export interface RestaurantPrefill {
  restaurantName?: string;
  cuisineType?: string;
  restaurantType?: "veg" | "nonveg" | "both";
  city?: string;
  dishes?: string[];
}

/* ─── Main Component ─────────────────────────────────────────────── */
export default function RegistrationForm({
  prefill,
  onSuccess,
}: {
  prefill?: RestaurantPrefill;
  onSuccess?: (name: string) => void;
}) {
  const [logo,        setLogo]        = useState<string | null>(null);
  const [cover,       setCover]       = useState<string | null>(null);
  const [submitting,  setSubmitting]  = useState(false);
  const [success,     setSuccess]     = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [formStarted, setFormStarted] = useState(false);
  const [selectedDishes, setSelectedDishes] = useState<string[]>(prefill?.dishes ?? []);

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  // Pre-fill form when prefill prop is provided
  useEffect(() => {
    if (prefill) {
      reset({
        restaurantName: prefill.restaurantName ?? "",
        cuisineType:    prefill.cuisineType    ?? "",
        restaurantType: prefill.restaurantType ?? undefined,
        city:           prefill.city           ?? "",
      });
      setSelectedDishes(prefill.dishes ?? []);
      // Auto-open the form when prefill is provided
      setFormStarted(true);
    }
  }, [prefill, reset]);

  const onSubmit = async (data: RegistrationFormData) => {
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 900));

    // Save to localStorage so it shows up immediately on /register-restaurant
    const { saveRestaurant } = await import("@/lib/restaurantStore");
    saveRestaurant({
      id:           `user-${Date.now()}`,
      name:         data.restaurantName,
      cuisine:      data.cuisineType,
      type:         data.restaurantType,
      city:         data.city,
      area:         data.district || data.city,
      dishes:       selectedDishes,
      swiggyUrl:    data.swiggyUrl || undefined,
      zomatoUrl:    data.zomatoUrl || undefined,
      avgCost:      parseInt(data.avgCostForTwo) || 300,
      openingTime:  data.openingTime,
      closingTime:  data.closingTime,
      ownerName:    data.ownerName,
      phone:        data.phone,
      email:        data.email,
      registeredAt: new Date().toISOString(),
      badge:        "New",
      badgeColor:   "#7c3aed",
    });

    setSubmittedName(data.restaurantName);
    setSubmitting(false);
    setSuccess(true);
    onSuccess?.(data.restaurantName);
  };

  const handleStart = () => {
    setFormStarted(true);
    setTimeout(() => {
      document.getElementById("rr-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <>
      <div className="rr-page">
        {/* ── HERO ──────────────────────────────────────────────────── */}
        <section className="rr-hero">
          <div className="rr-hero-bg" aria-hidden />
          <div className="rr-hero-inner container">
            <motion.div className="rr-hero-text"
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}>
              <span className="rr-hero-badge">🍴 Restaurant Partner Portal</span>
              <h1 className="rr-hero-title">
                Register Your Restaurant<br />
                <span className="rr-hero-accent">on Ordrji</span>
              </h1>
              <p className="rr-hero-sub">
                Join thousands of restaurants helping customers discover your business.
                Connect your Swiggy and Zomato ordering pages in minutes.
              </p>
              <button onClick={handleStart} className="rr-hero-cta">
                Start Registration <ArrowRight size={16} />
              </button>
            </motion.div>

            <motion.div className="rr-hero-card glass-card"
              initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}>
              <div className="rr-hero-stat-grid">
                {[
                  { n: "5,000+", l: "Restaurants" },
                  { n: "35+",    l: "Cities"       },
                  { n: "20M+",   l: "Orders"       },
                  { n: "Free",   l: "to Join"      },
                ].map(s => (
                  <div key={s.l} className="rr-hero-stat">
                    <span className="rr-hero-stat-n">{s.n}</span>
                    <span className="rr-hero-stat-l">{s.l}</span>
                  </div>
                ))}
              </div>
              <p className="rr-hero-card-note">🟢 Free to join. Reviewed within 24 hrs.</p>
            </motion.div>
          </div>
        </section>

        {/* ── FORM (only shown after "Start Registration") ───────────── */}
        <AnimatePresence>
          {formStarted && (
            <motion.section
              className="rr-body container" id="rr-form"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* form column */}
              <div className="rr-form-col">
                <form onSubmit={handleSubmit(onSubmit)} noValidate>

                  <RestaurantInfo register={register} errors={errors} />

                  {/* Cuisine & Dishes section with custom components */}
                  <div className="rr-section">
                    <div className="rr-section-header">
                      <span className="rr-section-num">02</span>
                      <div>
                        <h3 className="rr-section-title">Cuisine & Menu</h3>
                        <p className="rr-section-sub">Help customers find what you serve</p>
                      </div>
                    </div>
                    <div className="rr-grid-2">
                      <div className="rr-field">
                        <label className="rr-label">
                          <Utensils size={14} className="rr-label-icon" />
                          Cuisine Type *
                        </label>
                        <Controller
                          name="cuisineType"
                          control={control}
                          render={({ field }) => (
                            <SearchableSelect
                              options={CUISINE_LIST}
                              value={field.value || ""}
                              onChange={field.onChange}
                              placeholder="Search cuisine..."
                              error={errors.cuisineType?.message}
                            />
                          )}
                        />
                        {errors.cuisineType && <span className="rr-error">{errors.cuisineType.message}</span>}
                      </div>

                      <div className="rr-field">
                        <label className="rr-label">
                          <Users size={14} className="rr-label-icon" />
                          Restaurant Type *
                        </label>
                        <div className="rr-radio-group">
                          {(["veg", "nonveg", "both"] as const).map(v => (
                            <label key={v} className="rr-radio-label">
                              <input type="radio" value={v} {...register("restaurantType")} />
                              <span className={`rr-radio-pill ${v==="veg"?"rr-pill-veg":v==="nonveg"?"rr-pill-nveg":"rr-pill-both"}`}>
                                {v==="veg"?"🟢 Veg":v==="nonveg"?"🔴 Non-Veg":"🟡 Both"}
                              </span>
                            </label>
                          ))}
                        </div>
                        {errors.restaurantType && <span className="rr-error">{errors.restaurantType.message}</span>}
                      </div>
                    </div>

                    <div className="rr-field">
                      <label className="rr-label">
                        <Utensils size={14} className="rr-label-icon" />
                        Popular Dishes <span className="rr-optional">(Optional)</span>
                      </label>
                      <DishesMultiSelect value={selectedDishes} onChange={setSelectedDishes} />
                    </div>
                  </div>

                  <BrandingSection logo={logo} cover={cover} onLogoChange={setLogo} onCoverChange={setCover} />
                  <IntegrationSection register={register} errors={errors} />
                  <BusinessSection register={register} errors={errors} />

                  {/* Section: Terms */}
                  <div className="rr-section">
                    <div className="rr-section-header">
                      <span className="rr-section-num">06</span>
                      <div>
                        <h3 className="rr-section-title">Terms & Confirmation</h3>
                        <p className="rr-section-sub">Please read and agree before submitting</p>
                      </div>
                    </div>
                    <div className="rr-terms-list">
                      <label className="rr-check-label">
                        <input type="checkbox" {...register("confirmAccuracy")} />
                        <span>I confirm that all the information provided is accurate and up to date.</span>
                      </label>
                      {errors.confirmAccuracy && <span className="rr-error">{errors.confirmAccuracy.message}</span>}
                      <label className="rr-check-label">
                        <input type="checkbox" {...register("agreeTerms")} />
                        <span>
                          I agree to Ordrji&apos;s{" "}
                          <a href="/terms" target="_blank" className="rr-link">Terms of Service</a>
                          {" "}and{" "}
                          <a href="/privacy" target="_blank" className="rr-link">Privacy Policy</a>.
                        </span>
                      </label>
                      {errors.agreeTerms && <span className="rr-error">{errors.agreeTerms.message}</span>}
                    </div>
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    className="rr-submit"
                    disabled={submitting}
                    whileHover={{ scale: submitting ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {submitting ? (
                      <><Loader2 size={18} className="rr-spin" /> Creating Restaurant...</>
                    ) : (
                      <><CheckCircle2 size={18} /> Register Restaurant</>
                    )}
                  </motion.button>
                </form>
              </div>

              {/* sidebar */}
              <aside className="rr-sidebar">
                <div className="rr-sidebar-card">
                  <h3 className="rr-sidebar-title">Benefits of Joining Ordrji</h3>
                  <p className="rr-sidebar-sub">Everything you get for free</p>
                  <div className="rr-benefits-list">
                    {BENEFITS.map((b, i) => (
                      <motion.div key={i} className="rr-benefit"
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.07 }}>
                        <span className="rr-benefit-icon">{b.icon}</span>
                        <div>
                          <p className="rr-benefit-title">{b.title}</p>
                          <p className="rr-benefit-desc">{b.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="rr-sidebar-badge">
                    <CheckCircle2 size={14} color="#16a34a" />
                    <span>100% Free · No commission charges</span>
                  </div>
                </div>
              </aside>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      <SuccessModal isOpen={success} restaurantName={submittedName} onClose={() => setSuccess(false)} />

      <style jsx global>{`
        .rr-page { background: #f8fafc; min-height: 100vh; font-family: var(--font-sans); }

        /* ── Hero ─────────────────────────────────────────────── */
        .rr-hero {
          position: relative; overflow: hidden;
          padding: 5.5rem 0 4.5rem;
          background: linear-gradient(135deg, #fff7ed 0%, #fff 55%, #f0fdf4 100%);
          border-bottom: 1px solid #ffe4c4;
        }
        .rr-hero-bg {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 60% 50% at 80% 50%, rgba(249,115,22,.12) 0%, transparent 70%),
            radial-gradient(ellipse 40% 60% at 10% 30%, rgba(249,115,22,.07) 0%, transparent 70%);
        }
        .rr-hero-inner {
          position: relative; z-index: 1;
          display: grid; grid-template-columns: 1fr;
          gap: 3rem; align-items: center;
        }
        @media (min-width: 900px) { .rr-hero-inner { grid-template-columns: 1fr 360px; } }
        .rr-hero-text { display: flex; flex-direction: column; gap: 1.25rem; }
        .rr-hero-badge {
          display: inline-flex; align-items: center; gap: .4rem;
          background: rgba(249,115,22,.12); border: 1px solid rgba(249,115,22,.3);
          color: #c2410c; padding: .35rem .9rem; border-radius: 9999px;
          font-size: .72rem; font-weight: 700; letter-spacing: .8px;
          text-transform: uppercase; width: fit-content;
        }
        .rr-hero-title {
          font-size: clamp(2.2rem,5vw,3.4rem); font-weight: 900;
          letter-spacing: -1.5px; line-height: 1.12; color: #0f172a; margin: 0;
        }
        .rr-hero-accent {
          background: linear-gradient(120deg, #f97316, #ea580c);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .rr-hero-sub { font-size: 1.05rem; color: #475569; line-height: 1.72; max-width: 520px; margin: 0; }
        .rr-hero-cta {
          display: inline-flex; align-items: center; gap: .6rem;
          background: linear-gradient(135deg, #f97316, #ea580c); color: #fff;
          padding: .9rem 2.25rem; border-radius: 9999px;
          font-weight: 700; font-size: 1rem; border: none; cursor: pointer; width: fit-content;
          box-shadow: 0 8px 24px rgba(249,115,22,.38);
          transition: transform .2s, box-shadow .2s;
        }
        .rr-hero-cta:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(249,115,22,.48); }
        .rr-hero-card {
          padding: 2rem; border-radius: 22px;
          background: rgba(255,255,255,.92); backdrop-filter: blur(16px);
          border: 1px solid rgba(249,115,22,.18);
          box-shadow: 0 24px 56px -12px rgba(0,0,0,.1);
        }
        .rr-hero-stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.25rem; }
        .rr-hero-stat {
          display: flex; flex-direction: column; gap: .15rem;
          padding: 1rem; background: #fff7ed; border-radius: 14px;
          border: 1px solid #ffe4c4; text-align: center;
        }
        .rr-hero-stat-n { font-size: 1.4rem; font-weight: 900; color: #f97316; letter-spacing: -.5px; }
        .rr-hero-stat-l { font-size: .7rem; color: #64748b; font-weight: 600; text-transform: uppercase; letter-spacing: .5px; }
        .rr-hero-card-note { font-size: .78rem; color: #64748b; text-align: center; margin: 0; }
      `}</style>

      <style jsx global>{`
        /* ── Body layout ─────────────────────────────────────── */
        .rr-body {
          display: grid; grid-template-columns: 1fr;
          gap: 2.5rem; padding-top: 3.5rem; padding-bottom: 5rem; align-items: start;
        }
        @media (min-width: 1024px) { .rr-body { grid-template-columns: 1fr 340px; gap: 3rem; } }

        .rr-form-col {
          background: #fff; border: 1px solid #e2e8f0;
          border-radius: 24px; overflow: hidden;
          box-shadow: 0 8px 40px -8px rgba(0,0,0,.08);
        }
        .rr-section { padding: 2rem 2.25rem; border-bottom: 1px solid #f1f5f9; }
        .rr-section:last-of-type { border-bottom: none; }
        .rr-section-header { display: flex; align-items: flex-start; gap: .9rem; margin-bottom: 1.75rem; }
        .rr-section-num {
          width: 36px; height: 36px; border-radius: 10px;
          background: linear-gradient(135deg, #fff7ed, #ffedd5); border: 1.5px solid #fed7aa;
          color: #f97316; font-size: .7rem; font-weight: 900;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0; letter-spacing: .5px;
        }
        .rr-section-title { font-size: 1.05rem; font-weight: 800; color: #0f172a; margin: 0 0 .2rem; letter-spacing: -.2px; }
        .rr-section-sub { font-size: .8rem; color: #64748b; margin: 0; }

        /* ── Field ──────────────────────────────────────────── */
        .rr-grid-2 { display: grid; grid-template-columns: 1fr; gap: 1.1rem; margin-bottom: 1.1rem; }
        @media (min-width: 600px) { .rr-grid-2 { grid-template-columns: 1fr 1fr; } }
        .rr-grid-4 { display: grid; grid-template-columns: 1fr 1fr; gap: 1.1rem; margin-bottom: 1.1rem; }
        @media (min-width: 768px) { .rr-grid-4 { grid-template-columns: repeat(4,1fr); } }
        .rr-field { display: flex; flex-direction: column; gap: .4rem; }
        .rr-label { display: inline-flex; align-items: center; gap: .35rem; font-size: .78rem; font-weight: 700; color: #374151; letter-spacing: .1px; }
        .rr-label-icon { color: #f97316; }
        .rr-optional { font-weight: 400; color: #94a3b8; margin-left: .2rem; }
        .rr-input {
          width: 100%; padding: .72rem .95rem;
          border: 1.5px solid #e2e8f0; border-radius: 11px;
          font-size: .875rem; color: #0f172a; font-family: inherit;
          background: #fafafa; outline: none;
          transition: border-color .2s, box-shadow .2s, background .2s;
        }
        .rr-input:focus { border-color: #f97316; background: #fff; box-shadow: 0 0 0 3px rgba(249,115,22,.1); }
        .rr-input-err { border-color: #ef4444 !important; background: #fff5f5 !important; }
        .rr-input::placeholder { color: #94a3b8; }
        .rr-textarea { resize: vertical; min-height: 70px; }
        .rr-error { font-size: .72rem; color: #ef4444; font-weight: 600; }
        .rr-input-prefix-wrap { position: relative; display: flex; align-items: center; }
        .rr-input-prefix { position: absolute; left: .85rem; color: #94a3b8; display: flex; align-items: center; pointer-events: none; }
        .rr-prefix-text { font-size: .9rem; font-weight: 700; color: #64748b; }
        .rr-input-prefixed { padding-left: 2.25rem; }

        /* ── Radio pills ──────────────────────────────────── */
        .rr-radio-group { display: flex; gap: .5rem; flex-wrap: wrap; margin-top: .15rem; }
        .rr-radio-label { display: flex; align-items: center; cursor: pointer; }
        .rr-radio-label input[type="radio"] { display: none; }
        .rr-radio-pill { padding: .45rem 1rem; border-radius: 9999px; border: 1.5px solid; font-size: .8rem; font-weight: 700; cursor: pointer; transition: all .2s; }
        .rr-pill-veg  { border-color: #86efac; color: #16a34a; background: #f0fdf4; }
        .rr-pill-nveg { border-color: #fca5a5; color: #dc2626; background: #fff5f5; }
        .rr-pill-both { border-color: #fde68a; color: #b45309; background: #fffbeb; }
        .rr-radio-label input:checked + .rr-pill-veg  { background: #dcfce7; box-shadow: 0 0 0 2px #16a34a; }
        .rr-radio-label input:checked + .rr-pill-nveg { background: #fee2e2; box-shadow: 0 0 0 2px #dc2626; }
        .rr-radio-label input:checked + .rr-pill-both { background: #fef3c7; box-shadow: 0 0 0 2px #b45309; }
      `}</style>

      <style jsx global>{`
        /* ── Searchable Select ──────────────────────────────── */
        .rr-sselect-wrap { position: relative; width: 100%; }
        .rr-sselect-trigger {
          width: 100%; padding: .72rem .95rem; display: flex; align-items: center; justify-content: space-between;
          border: 1.5px solid #e2e8f0; border-radius: 11px; background: #fafafa;
          font-family: inherit; cursor: pointer; transition: border-color .2s, box-shadow .2s, background .2s;
        }
        .rr-sselect-trigger:hover { border-color: #cbd5e1; }
        .rr-sselect-open { border-color: #f97316 !important; background: #fff !important; box-shadow: 0 0 0 3px rgba(249,115,22,.1); }
        .rr-sselect-placeholder { font-size: .875rem; color: #94a3b8; }
        .rr-sselect-value { font-size: .875rem; color: #0f172a; font-weight: 600; }
        .rr-sselect-arrow { color: #94a3b8; transition: transform .2s; flex-shrink: 0; }
        .rr-sselect-arrow.rotated { transform: rotate(180deg); color: #f97316; }
        .rr-sselect-menu {
          position: absolute; top: calc(100% + 6px); left: 0; right: 0; z-index: 200;
          background: #fff; border: 1.5px solid #e2e8f0; border-radius: 14px;
          box-shadow: 0 16px 40px -8px rgba(0,0,0,.14); overflow: hidden;
        }
        .rr-sselect-search-wrap {
          display: flex; align-items: center; gap: .5rem; padding: .7rem .9rem;
          border-bottom: 1px solid #f1f5f9;
        }
        .rr-sselect-search-icon { color: #94a3b8; flex-shrink: 0; }
        .rr-sselect-search {
          flex: 1; border: none; outline: none; font-size: .875rem; color: #0f172a;
          background: transparent; font-family: inherit;
        }
        .rr-sselect-options { max-height: 200px; overflow-y: auto; padding: .4rem; }
        .rr-sselect-option {
          width: 100%; padding: .55rem .8rem; border-radius: 8px; border: none; background: transparent;
          font-size: .875rem; color: #374151; font-family: inherit; cursor: pointer; text-align: left;
          display: flex; align-items: center; justify-content: space-between;
          transition: background .15s, color .15s;
        }
        .rr-sselect-option:hover { background: #fff7ed; color: #f97316; }
        .rr-sselect-selected { background: #fff7ed; color: #f97316; font-weight: 700; }
        .rr-sselect-empty { font-size: .8rem; color: #94a3b8; text-align: center; padding: 1rem; margin: 0; }

        /* ── Dishes Multi-Select ────────────────────────────── */
        .rr-dishes-wrap { position: relative; width: 100%; display: flex; flex-direction: column; gap: .6rem; }
        .rr-dishes-trigger {
          width: 100%; padding: .72rem .95rem; display: flex; align-items: center; gap: .5rem;
          border: 1.5px solid #e2e8f0; border-radius: 11px; background: #fafafa;
          font-family: inherit; cursor: pointer; text-align: left;
          transition: border-color .2s, box-shadow .2s, background .2s;
        }
        .rr-dishes-trigger:hover { border-color: #cbd5e1; background: #fff; }
        .rr-dishes-icon { color: #f97316; flex-shrink: 0; }
        .rr-dishes-placeholder { font-size: .875rem; color: #94a3b8; }
        .rr-dishes-placeholder-hidden { display: none; }
        .rr-dishes-tags { display: flex; flex-wrap: wrap; gap: .45rem; }
        .rr-dish-tag {
          display: inline-flex; align-items: center; gap: .35rem;
          background: linear-gradient(135deg, #fff7ed, #ffedd5); border: 1px solid #fed7aa;
          color: #c2410c; padding: .3rem .7rem; border-radius: 9999px;
          font-size: .75rem; font-weight: 700;
        }
        .rr-dish-tag-remove {
          background: none; border: none; cursor: pointer; color: #f97316; padding: 0;
          display: flex; align-items: center; transition: color .15s;
        }
        .rr-dish-tag-remove:hover { color: #dc2626; }
        .rr-dishes-menu {
          position: absolute; top: calc(100% + 6px); left: 0; right: 0; z-index: 200;
          background: #fff; border: 1.5px solid #e2e8f0; border-radius: 14px;
          box-shadow: 0 16px 40px -8px rgba(0,0,0,.14); overflow: hidden;
        }
        .rr-dishes-options { max-height: 200px; overflow-y: auto; padding: .4rem; display: flex; flex-wrap: wrap; gap: .4rem; padding: .75rem; }
        .rr-dishes-option {
          padding: .4rem .85rem; border-radius: 9999px; border: 1.5px solid #e2e8f0;
          font-size: .78rem; font-weight: 600; color: #374151; background: #f8fafc;
          cursor: pointer; font-family: inherit; transition: all .15s;
        }
        .rr-dishes-option:hover { background: #fff7ed; border-color: #fed7aa; color: #c2410c; }
      `}</style>

      <style jsx global>{`
        /* ── Upload ──────────────────────────────────────────── */
        .rr-upload-zone {
          border: 2px dashed #e2e8f0; border-radius: 14px;
          padding: 2.25rem 1.5rem; cursor: pointer;
          display: flex; flex-direction: column; align-items: center; gap: .6rem;
          background: #fafafa; transition: all .2s;
        }
        .rr-upload-drag { border-color: #f97316 !important; background: #fff7ed !important; }
        .rr-upload-text { font-size: .85rem; color: #64748b; text-align: center; margin: 0; }
        .rr-upload-text span { color: #f97316; font-weight: 700; }
        .rr-upload-hint { font-size: .7rem; color: #94a3b8; margin: 0; }
        .rr-upload-preview { position: relative; width: 100%; height: 160px; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; }
        .rr-upload-remove {
          position: absolute; top: .5rem; right: .5rem; width: 26px; height: 26px; border-radius: 50%;
          background: rgba(0,0,0,.55); border: none; color: #fff; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
        }
        /* ── Integration banner ─────────────────────────────── */
        .rr-integration-banner {
          display: flex; align-items: flex-start; gap: .75rem;
          background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px;
          padding: 1rem 1.1rem; margin-bottom: 1.25rem;
          font-size: .82rem; color: #1e40af; line-height: 1.55;
        }
        .rr-integration-icon { font-size: 1.1rem; flex-shrink: 0; margin-top: .05rem; }
        .rr-platform-logo { font-size: 1rem; }
        /* ── Terms ──────────────────────────────────────────── */
        .rr-terms-list { display: flex; flex-direction: column; gap: .85rem; }
        .rr-check-label { display: flex; align-items: flex-start; gap: .65rem; font-size: .875rem; color: #374151; cursor: pointer; line-height: 1.5; }
        .rr-check-label input[type="checkbox"] { width: 17px; height: 17px; border-radius: 5px; border: 1.5px solid #cbd5e1; flex-shrink: 0; margin-top: 2px; accent-color: #f97316; cursor: pointer; }
        .rr-link { color: #f97316; font-weight: 600; text-decoration: underline; }
        /* ── Submit ─────────────────────────────────────────── */
        .rr-submit {
          padding: 1rem; border-radius: 12px;
          background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
          color: #fff; font-size: 1rem; font-weight: 700; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: .55rem;
          box-shadow: 0 8px 24px rgba(249,115,22,.35);
          transition: background .2s, box-shadow .2s, transform .2s;
          margin: 1.5rem 2.25rem 2.25rem;
          width: calc(100% - 4.5rem);
        }
        .rr-submit:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 12px 32px rgba(249,115,22,.45); }
        .rr-submit:disabled { opacity: .7; cursor: not-allowed; }
        .rr-spin { animation: rrSpin .7s linear infinite; }
        @keyframes rrSpin { to { transform: rotate(360deg); } }
        /* ── Sidebar ─────────────────────────────────────────── */
        .rr-sidebar { display: none; }
        @media (min-width: 1024px) { .rr-sidebar { display: block; position: sticky; top: 100px; } }
        .rr-sidebar-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 22px; padding: 1.75rem; box-shadow: 0 4px 24px -6px rgba(0,0,0,.07); }
        .rr-sidebar-title { font-size: 1rem; font-weight: 800; color: #0f172a; margin: 0 0 .2rem; }
        .rr-sidebar-sub { font-size: .78rem; color: #94a3b8; margin: 0 0 1.25rem; }
        .rr-benefits-list { display: flex; flex-direction: column; gap: .75rem; }
        .rr-benefit { display: flex; align-items: flex-start; gap: .75rem; padding: .8rem; background: #fafafa; border: 1px solid #f1f5f9; border-radius: 12px; transition: border-color .2s, background .2s; }
        .rr-benefit:hover { border-color: #fed7aa; background: #fff7ed; }
        .rr-benefit-icon { width: 34px; height: 34px; border-radius: 9px; background: #fff7ed; border: 1px solid #fed7aa; color: #f97316; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .rr-benefit-title { font-size: .82rem; font-weight: 700; color: #0f172a; margin: 0 0 .15rem; }
        .rr-benefit-desc { font-size: .72rem; color: #64748b; margin: 0; line-height: 1.45; }
        .rr-sidebar-badge { display: flex; align-items: center; gap: .5rem; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 9999px; padding: .5rem 1rem; font-size: .75rem; font-weight: 600; color: #166534; margin-top: 1.25rem; justify-content: center; }
      `}</style>
    </>
  );
}
