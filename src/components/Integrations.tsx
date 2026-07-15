"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";

type Category = "software" | "hardware" | "payment";

interface Partner {
  name: string;
  short: string;
  color: string;
  logo: string;
  ring: 0 | 1;
  startAngle: number;
}

const PARTNERS: Record<Category, Partner[]> = {
  software: [
    { name: "Swiggy",      short: "SW", color: "#e95505", logo: "swiggy.com",         ring: 0, startAngle: 0   },
    { name: "Zomato",      short: "ZO", color: "#e23744", logo: "zomato.com",         ring: 0, startAngle: 60  },
    { name: "Paytm",       short: "PT", color: "#00b9f1", logo: "paytm.com",          ring: 0, startAngle: 120 },
    { name: "Shopify",     short: "SH", color: "#96bf48", logo: "shopify.com",        ring: 0, startAngle: 180 },
    { name: "Tally",       short: "TL", color: "#059669", logo: "tallysolutions.com", ring: 0, startAngle: 240 },
    { name: "Zoho",        short: "ZH", color: "#e32f27", logo: "zoho.com",           ring: 0, startAngle: 300 },
    { name: "Microsoft",   short: "MS", color: "#0078d4", logo: "microsoft.com",      ring: 1, startAngle: 0   },
    { name: "SAP",         short: "SP", color: "#008fd3", logo: "sap.com",            ring: 1, startAngle: 30  },
    { name: "Oracle",      short: "OR", color: "#f80000", logo: "oracle.com",         ring: 1, startAngle: 60  },
    { name: "Unicommerce", short: "UC", color: "#004b93", logo: "unicommerce.com",    ring: 1, startAngle: 90  },
    { name: "EasyEcom",    short: "EE", color: "#1e3a8a", logo: "easyecom.io",        ring: 1, startAngle: 120 },
    { name: "EasyRewardz", short: "ER", color: "#eab308", logo: "easyrewardz.com",    ring: 1, startAngle: 150 },
    { name: "GrayMatter",  short: "GM", color: "#2563eb", logo: "graymatter.co",      ring: 1, startAngle: 180 },
    { name: "Gyftr",       short: "GF", color: "#10b981", logo: "gyftr.com",          ring: 1, startAngle: 210 },
    { name: "Nector",      short: "NC", color: "#7c3aed", logo: "nector.io",          ring: 1, startAngle: 240 },
    { name: "Pathfinder",  short: "PF", color: "#14b8a6", logo: "pathfinder.com",     ring: 1, startAngle: 270 },
    { name: "ADSR",        short: "AD", color: "#4f46e5", logo: "adsr.com",           ring: 1, startAngle: 300 },
    { name: "GSP",         short: "GS", color: "#ec4899", logo: "gsp.com",            ring: 1, startAngle: 330 },
  ],
  hardware: [
    { name: "Epson",     short: "EP", color: "#555555", logo: "epson.com",      ring: 0, startAngle: 0   },
    { name: "Samsung",   short: "SA", color: "#1428a0", logo: "samsung.com",    ring: 0, startAngle: 90  },
    { name: "Pine Labs", short: "PL", color: "#c2410c", logo: "pinelabs.com",   ring: 0, startAngle: 180 },
    { name: "Ingenico",  short: "IN", color: "#0284c7", logo: "ingenico.com",   ring: 0, startAngle: 270 },
    { name: "Verifone",  short: "VF", color: "#d97706", logo: "verifone.com",   ring: 1, startAngle: 0   },
    { name: "iMin",      short: "IM", color: "#059669", logo: "imin.co",        ring: 1, startAngle: 51  },
    { name: "Sunmi",     short: "SU", color: "#e95505", logo: "sunmi.com",      ring: 1, startAngle: 102 },
    { name: "PAX",       short: "PX", color: "#7c3aed", logo: "pax.com",        ring: 1, startAngle: 154 },
    { name: "TVS",       short: "TV", color: "#dc2626", logo: "tvs-e.com",      ring: 1, startAngle: 205 },
    { name: "HP",        short: "HP", color: "#0096d6", logo: "hp.com",         ring: 1, startAngle: 257 },
    { name: "Newland",   short: "NL", color: "#635bff", logo: "newland-id.com", ring: 1, startAngle: 308 },
  ],
  payment: [
    { name: "Razorpay",  short: "RP", color: "#2d4df8", logo: "razorpay.com",  ring: 0, startAngle: 0   },
    { name: "PayPal",    short: "PP", color: "#003087", logo: "paypal.com",    ring: 0, startAngle: 90  },
    { name: "Paytm",     short: "PT", color: "#00b9f1", logo: "paytm.com",     ring: 0, startAngle: 180 },
    { name: "PhonePe",   short: "PH", color: "#5f259f", logo: "phonepe.com",   ring: 0, startAngle: 270 },
    { name: "GPay",      short: "GP", color: "#fbbc04", logo: "pay.google.com",ring: 1, startAngle: 0   },
    { name: "Stripe",    short: "ST", color: "#635bff", logo: "stripe.com",    ring: 1, startAngle: 51  },
    { name: "UPI",       short: "UP", color: "#6b21a8", logo: "npci.org.in",   ring: 1, startAngle: 102 },
    { name: "Pine Labs", short: "PL", color: "#c2410c", logo: "pinelabs.com",  ring: 1, startAngle: 154 },
    { name: "mSwipe",    short: "MS", color: "#059669", logo: "mswipe.com",    ring: 1, startAngle: 205 },
    { name: "PayU",      short: "PU", color: "#e95505", logo: "payu.in",       ring: 1, startAngle: 257 },
    { name: "Cashfree",  short: "CF", color: "#0284c7", logo: "cashfree.com",  ring: 1, startAngle: 308 },
  ],
};

const CATS: { key: Category; label: string; desc: string }[] = [
  {
    key: "software",
    label: "Software Partners & Integrations",
    desc: "Comprehensive software solutions designed to meet the needs of businesses of every size.",
  },
  {
    key: "hardware",
    label: "Hardware Partners & Integrations",
    desc: "With easy setup, businesses can leverage their preferred Android hardware for optimal performance.",
  },
  {
    key: "payment",
    label: "Payment Partners & Integrations",
    desc: "Integrated payment solutions from leading fintech partners, tailored to suit your business needs.",
  },
];

/* ── orbital constants ─────────────────────────────────────────────────── */
const SIZE   = 580;
const CX     = SIZE / 2;
const CY     = SIZE / 2;
const RADII  = [135, 235];
const NODE_R = 24;
const SPEED  = 35;

/* ── chip logo ─────────────────────────────────────────────────────────── */
function ChipLogo({ domain, name, color }: { domain: string; name: string; color: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <span style={{ width: 14, height: 14, borderRadius: "50%", background: color, flexShrink: 0, display: "inline-block" }} />;
  return (
    <Image
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=32`}
      alt={name} width={14} height={14} unoptimized
      style={{ objectFit: "contain", flexShrink: 0, borderRadius: "2px" }}
      onError={() => setFailed(true)}
    />
  );
}

/* ── single orbital node ───────────────────────────────────────────────── */
function OrbNode({ p, rot }: { p: Partner; rot: number }) {
  const [imgFailed, setImgFailed] = useState(false);
  const radius   = RADII[p.ring];
  const angleRad = ((p.startAngle + rot) * Math.PI) / 180;
  const nx       = CX + radius * Math.cos(angleRad);
  const ny       = CY + radius * Math.sin(angleRad);

  return (
    <div
      title={p.name}
      className="ig-orbital-node"
      style={{
        position: "absolute",
        left: nx, top: ny,
        transform: "translate(-50%, -50%)",
        display: "flex", 
        alignItems: "center", 
        gap: "6px",
        padding: "5px 10px 5px 6px",
        borderRadius: "99px",
        background: "rgba(255, 255, 255, 0.96)",
        border: "1px solid rgba(0, 0, 0, 0.08)",
        boxShadow: "0 3px 8px rgba(0, 0, 0, 0.04)",
        whiteSpace: "nowrap",
        zIndex: 5,
        transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease, border-color 0.2s ease",
      }}
    >
      <div style={{
        width: 18, 
        height: 18, 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        flexShrink: 0
      }}>
        {!imgFailed ? (
          <img
            src={`https://www.google.com/s2/favicons?domain=${p.logo}&sz=32`}
            alt={p.name} width={16} height={16}
            loading="lazy"
            style={{ objectFit: "contain", borderRadius: "2px" }}
            onError={() => setImgFailed(true)}
          />
        ) : (
          <span style={{ fontSize: "9px", fontWeight: 800, color: p.color }}>{p.short}</span>
        )}
      </div>
      <span style={{ 
        fontSize: "11.5px", 
        fontWeight: 700, 
        color: "#1e293b", 
        fontFamily: "var(--font-sans, sans-serif)",
        letterSpacing: "0.1px"
      }}>
        {p.name}
      </span>
    </div>
  );
}

/* ── SVG rings + spokes + hub ──────────────────────────────────────────── */
function Orbital({ partners, rot }: { partners: Partner[]; rot: number }) {
  return (
    <div style={{ position: "relative", width: SIZE, height: SIZE, maxWidth: "100%" }}>
      {/* SVG — behind nodes */}
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} width={SIZE} height={SIZE}
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }} aria-hidden>
        <defs>
          <clipPath id="igHub"><circle cx={CX} cy={CY} r="42" /></clipPath>
          <filter id="igHubF" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="2" stdDeviation="8" floodColor="#c2410c" floodOpacity="0.2" />
          </filter>
        </defs>

        {/* orbit rings */}
        {RADII.map((r, i) => (
          <circle key={i} cx={CX} cy={CY} r={r}
            fill="none" stroke="rgba(0,0,0,0.14)" strokeWidth="1" strokeDasharray="4 8" />
        ))}

        {/* spokes */}
        {partners.map((p, i) => {
          const r = RADII[p.ring];
          const a = ((p.startAngle + rot) * Math.PI) / 180;
          return (
            <line key={i}
              x1={CX} y1={CY}
              x2={CX + r * Math.cos(a)} y2={CY + r * Math.sin(a)}
              stroke="rgba(0,0,0,0.07)" strokeWidth="0.8" strokeDasharray="3 6"
            />
          );
        })}

        {/* hub glow pulse */}
        <circle cx={CX} cy={CY} r="68" fill="rgba(194,65,12,0.06)" className="igHubPulse" />

        {/* center html hub will be added outside SVG */}
      </svg>

      {/* HTML center hub */}
      <div style={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", zIndex: 10
      }}>
        <div style={{
          width: 110, height: 110, borderRadius: "50%", background: "#fff", 
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          boxShadow: "0 8px 24px rgba(227,6,19,0.3)", overflow: "hidden"
        }}>
          <img src="/logo-icon.jpg" alt="Ordrji Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </div>

      {/* HTML nodes — on top */}
      {partners.map((p, i) => (
        <OrbNode key={`${p.name}-${i}`} p={p} rot={rot} />
      ))}
    </div>
  );
}

/* ── main component ────────────────────────────────────────────────────── */
export default function Integrations() {
  const [tab,    setTab]    = useState<Category>("software");
  const [rot,    setRot]    = useState(0);
  const [inView, setInView] = useState(false);
  const [show,   setShow]   = useState(false);
  const [mounted, setMounted] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const lastTs     = useRef(0);
  const rafId      = useRef(0);
  const tickRef    = useRef<(ts: number) => void>(undefined);

  const tick = useCallback((ts: number) => {
    if (lastTs.current === 0) lastTs.current = ts;
    const dt = Math.min((ts - lastTs.current) / 1000, 0.05);
    lastTs.current = ts;
    setRot(r => (r + (360 / SPEED) * dt) % 360);
    if (tickRef.current) rafId.current = requestAnimationFrame(tickRef.current);
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true); }, []);

  useEffect(() => { tickRef.current = tick; }, [tick]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setInView(true);
        setTimeout(() => setShow(true), 80);
        obs.disconnect();
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [inView, tick]);

  const partners  = PARTNERS[tab];
  const activeCat = CATS.find(c => c.key === tab)!;

  return (
    <section className="ig-section" ref={sectionRef}>

      <div className="container">
        <div className="ig-grid">

          {/* ── LEFT: orbital ─────────────────────────────────────────── */}
          <div className={`ig-left ${inView ? "ig-left-in" : ""}`}>
            {mounted ? (
              <Orbital partners={partners} rot={rot} />
            ) : (
              <div style={{ width: SIZE, height: SIZE }} />
            )}
          </div>

          {/* ── RIGHT: content ────────────────────────────────────────── */}
          <div className={`ig-right ${show ? "ig-right-in" : ""}`}>
            <div className="ig-tabs-accordion">
              {CATS.map(c => {
                const isActive = tab === c.key;
                let activeBg = "transparent";
                let activeColor = "#333";
                
                if (c.key === "software") {
                  activeBg = "#f3f4f6";
                  activeColor = "#4b5563";
                } else if (c.key === "hardware") {
                  activeBg = "#e0f2fe";
                  activeColor = "#0284c7";
                } else if (c.key === "payment") {
                  activeBg = "#ffedd5";
                  activeColor = "#c2410c";
                }

                return (
                  <div
                    key={c.key}
                    className={`ig-acc-panel ${isActive ? "active" : ""}`}
                    onClick={() => setTab(c.key)}
                    style={{ background: isActive ? activeBg : "transparent" }}
                  >
                    <h3 className="ig-acc-title" style={{ color: isActive ? "#111" : "#666" }}>{c.label}</h3>
                    
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="ig-acc-content-wrapper"
                          style={{ overflow: "hidden" }}
                        >
                          <div className="ig-acc-content">
                            <p>{c.desc}</p>
                            <div className="ig-acc-arrow" style={{ background: activeColor }}>
                              <ArrowRight size={14} color="#fff" />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* ── section ─────────────────────────────────────── */
        .ig-section {
          padding: 8rem 0;
          background: var(--bg-primary);
          position: relative;
          overflow: hidden;
          z-index: 10;
        }

        /* ── two-column grid ─────────────────────────────── */
        .ig-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3.5rem;
          align-items: center;
        }
        @media (min-width: 1024px) {
          .ig-grid { grid-template-columns: ${SIZE}px 1fr; gap: 5rem; }
        }

        /* ── left col (orbital) ──────────────────────────── */
        .ig-left {
          display: flex; justify-content: center; align-items: center;
          opacity: 0; transform: translateX(-24px) scale(0.97);
          transition: opacity .7s ease, transform .7s cubic-bezier(.16,1,.3,1);
        }
        .ig-left.ig-left-in { opacity: 1; transform: translateX(0) scale(1); }

        /* hub pulse animation */
        .igHubPulse {
          animation: igHubPulse 3s ease-in-out infinite;
          transform-origin: ${CX}px ${CY}px;
        }
        @keyframes igHubPulse {
          0%,100% { r: 68; opacity: .3; }
          50%      { r: 84; opacity: .07; }
        }

        /* ── right col (content) ─────────────────────────── */
        .ig-right {
          display: flex; flex-direction: column; gap: 1.4rem;
          opacity: 0; transform: translateX(20px);
          transition: opacity .7s ease .1s, transform .7s cubic-bezier(.16,1,.3,1) .1s;
        }
        .ig-right.ig-right-in { opacity: 1; transform: translateX(0); }

        /* eyebrow */
        .ig-eyebrow {
          font-size: .75rem; font-weight: 700; letter-spacing: .9px;
          text-transform: uppercase; color: var(--accent-orange); margin: 0;
        }

        /* heading */
        .ig-heading {
          font-size: clamp(1.4rem, 2.4vw, 1.95rem);
          font-weight: 800; letter-spacing: -.7px; line-height: 1.25;
          color: var(--text-primary); margin: 0;
        }

        /* description */
        .ig-desc {
          font-size: .93rem; color: var(--text-secondary);
          line-height: 1.7; margin: 0; max-width: 420px;
        }

        /* ── tabs ────────────────────────────────────────── */
        .ig-tabs { display: flex; flex-direction: column; gap: .45rem; }

        .ig-tab {
          display: flex; align-items: center; gap: .7rem;
          padding: .8rem 1rem;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 11px; cursor: pointer; text-align: left;
          font-size: .855rem; font-weight: 600; color: var(--text-secondary);
          transition: border-color .2s, background .2s, color .2s, box-shadow .2s, transform .15s;
        }
        .ig-tab:hover {
          border-color: rgba(194,65,12,.28); color: var(--text-primary);
          background: var(--bg-card-hover); transform: translateX(3px);
        }
        .ig-tab-on {
          border-color: var(--accent-orange) !important;
          background: rgba(194,65,12,.05) !important;
          color: var(--text-primary) !important;
          box-shadow: 0 3px 16px rgba(194,65,12,.12);
          transform: translateX(0) !important;
        }

        .ig-dot {
          width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0;
          background: var(--border-color); transition: background .2s;
        }
        .ig-tab-on .ig-dot { background: var(--accent-orange); }
        .ig-tab-txt { flex: 1; }
        .ig-arrow {
          color: var(--text-muted); flex-shrink: 0;
          transition: transform .2s, color .2s;
        }
        .ig-tab-on .ig-arrow, .ig-tab:hover .ig-arrow {
          transform: translateX(3px); color: var(--accent-orange);
        }

        /* ── chips ───────────────────────────────────────── */
        .ig-chips { display: flex; flex-wrap: wrap; gap: .38rem; }
        .ig-chip {
          display: inline-flex; align-items: center; gap: .32rem;
          padding: .25rem .72rem .25rem .45rem;
          border-radius: 9999px; border: 1.5px solid;
          background: rgba(255,255,255,.8);
          transition: transform .15s, box-shadow .15s;
        }
        .ig-chip:hover { transform: translateY(-1px); box-shadow: 0 3px 8px rgba(0,0,0,.07); }

        /* ── CTA ─────────────────────────────────────────── */
        .ig-cta {
          align-self: flex-start;
          display: inline-flex; align-items: center; gap: .45rem;
          background: var(--accent-orange); color: #fff;
          padding: .72rem 1.75rem; border-radius: 9999px;
          font-weight: 700; font-size: .875rem;
          text-decoration: none;
          box-shadow: 0 5px 18px rgba(194,65,12,.3);
          transition: background .2s, transform .2s, box-shadow .2s;
          white-space: nowrap; margin-top: .1rem;
        }
        .ig-cta:hover {
          background: #9a3412; transform: translateY(-2px);
          box-shadow: 0 10px 26px rgba(194,65,12,.4);
        }

        /* mobile centering */
        @media (max-width: 1023px) {
          .ig-left { max-width: 380px; margin: 0 auto; width: 100%; }
          .ig-desc { max-width: 100%; }
        }
        /* ── accordion ───────────────────────────────────────── */
        .ig-tabs-accordion {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          width: 100%;
          max-width: 500px;
        }

        .ig-acc-panel {
          border-radius: 16px;
          padding: 1.5rem;
          cursor: pointer;
          transition: background 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
          border: 1px solid transparent;
        }
        
        .ig-acc-panel:not(.active):hover {
          background: rgba(0,0,0,0.02) !important;
          transform: translateX(4px);
        }

        .ig-acc-panel.active {
          border-color: rgba(0,0,0,0.05);
          box-shadow: 0 10px 30px rgba(0,0,0,0.03);
          cursor: default;
        }

        .ig-acc-title {
          font-size: 1.3rem;
          font-weight: 700;
          margin: 0;
          transition: color 0.3s;
        }

        .ig-acc-content {
          margin-top: 1rem;
          color: var(--text-secondary);
          font-size: 1rem;
          line-height: 1.6;
          position: relative;
          padding-bottom: 2rem;
        }

        .ig-acc-arrow {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        .ig-orbital-node:hover {
          transform: translate(-50%, -50%) scale(1.08) !important;
          border-color: var(--accent-orange, #f97316) !important;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08) !important;
          z-index: 15 !important;
        }
      
      `}</style>
    </section>
  );
}
