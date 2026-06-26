"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";

type Category = "software" | "hardware" | "payment";

interface Partner {
  name: string;
  short: string;
  color: string;
  logo: string;   // favicon domain
  ring: 0 | 1;
  startAngle: number;
}

const PARTNERS: Record<Category, Partner[]> = {
  software: [
    { name: "Swiggy",   short: "SW", color: "#e95505", logo: "swiggy.com",         ring: 0, startAngle: 0   },
    { name: "Zomato",   short: "ZO", color: "#e23744", logo: "zomato.com",         ring: 0, startAngle: 90  },
    { name: "WhatsApp", short: "WA", color: "#25d366", logo: "whatsapp.com",       ring: 0, startAngle: 180 },
    { name: "Shopify",  short: "SH", color: "#96bf48", logo: "shopify.com",        ring: 0, startAngle: 270 },
    { name: "Tally",    short: "TL", color: "#059669", logo: "tallysolutions.com", ring: 1, startAngle: 0   },
    { name: "Razorpay", short: "RP", color: "#2d4df8", logo: "razorpay.com",       ring: 1, startAngle: 51  },
    { name: "Stripe",   short: "ST", color: "#635bff", logo: "stripe.com",         ring: 1, startAngle: 102 },
    { name: "Paytm",    short: "PT", color: "#00b9f1", logo: "paytm.com",          ring: 1, startAngle: 154 },
    { name: "PhonePe",  short: "PP", color: "#5f259f", logo: "phonepe.com",        ring: 1, startAngle: 205 },
    { name: "UPI",      short: "UP", color: "#6b21a8", logo: "npci.org.in",        ring: 1, startAngle: 257 },
    { name: "GPay",     short: "GP", color: "#fbbc04", logo: "pay.google.com",     ring: 1, startAngle: 308 },
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
    label: "Hardware partners & Integrations",
    desc: "With easy setup, businesses can leverage their preferred Android hardware for optimal performance.",
  },
  {
    key: "payment",
    label: "Payment Partners & Integrations",
    desc: "Integrated payment solutions from leading fintech partners, tailored to suit your business needs.",
  },
];

/* ── orbital layout constants ─────────────────────────────────────────── */
const SIZE    = 480;          // container px (square)
const CX      = SIZE / 2;     // 240
const CY      = SIZE / 2;     // 240
const RADII   = [105, 185];   // inner / outer ring radius
const NODE_R  = 18;           // node icon radius px (smaller icons)
const SPEED   = 35;           // seconds per full revolution

/* ── tiny favicon used inside chips ───────────────────────────────────── */
function ChipLogo({ domain, name, color }: { domain: string; name: string; color: string }) {
  const [failed, setFailed] = useState(false);
  const src = `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
  if (failed) {
    return <span style={{ width: 14, height: 14, borderRadius: "50%", background: color, flexShrink: 0, display: "inline-block" }} />;
  }
  return (
    <img
      src={src}
      alt={name}
      width={14}
      height={14}
      style={{ objectFit: "contain", flexShrink: 0, borderRadius: "2px" }}
      onError={() => setFailed(true)}
    />
  );
}

/* ── single HTML node (positioned absolutely) ─────────────────────────── */
interface NodeProps {
  p: Partner;
  rot: number;
  tabKey: string;
}

function OrbNode({ p, rot, tabKey }: NodeProps) {
  const [imgFailed, setImgFailed] = useState(false);

  // reset on tab change
  useEffect(() => { setImgFailed(false); }, [tabKey]);

  const radius   = RADII[p.ring];
  const angleDeg = p.startAngle + rot;
  const angleRad = (angleDeg * Math.PI) / 180;
  const nx       = CX + radius * Math.cos(angleRad);
  const ny       = CY + radius * Math.sin(angleRad);

  const diameter    = NODE_R * 2;
  const faviconUrl  = `https://www.google.com/s2/favicons?domain=${p.logo}&sz=64`;

  return (
    <div
      title={p.name}
      style={{
        position:        "absolute",
        left:            nx - NODE_R,
        top:             ny - NODE_R,
        width:           diameter,
        height:          diameter,
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "center",
        /* no circle, no border, no background — logo floats on dark bg */
        filter:          `drop-shadow(0 0 6px ${p.color}88)`,
      }}
    >
      {!imgFailed ? (
        <img
          src={faviconUrl}
          alt={p.name}
          width={diameter - 6}
          height={diameter - 6}
          style={{
            objectFit:  "contain",
            /* invert makes dark logos visible on dark bg;
               brightness boosts washed-out ones */
            filter: "brightness(1.15) saturate(1.1)",
          }}
          onError={() => setImgFailed(true)}
        />
      ) : (
        <span
          style={{
            fontSize:    "9px",
            fontWeight:  800,
            color:       p.color,
            fontFamily:  "Inter, sans-serif",
            letterSpacing: "0.5px",
            userSelect:  "none",
            textShadow:  `0 0 8px ${p.color}`,
          }}
        >
          {p.short}
        </span>
      )}
    </div>
  );
}

/* ── spoke SVG overlay (drawn behind the HTML nodes) ─────────────────── */
function Spokes({ partners, rot }: { partners: Partner[]; rot: number }) {
  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      width={SIZE}
      height={SIZE}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      aria-hidden="true"
    >
      <defs>
        <clipPath id="igHubClip2">
          <circle cx={CX} cy={CY} r="32" />
        </clipPath>
        <filter id="igHubShadow2" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#c2410c" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* center glow — REMOVED */}

      {/* orbit track rings */}
      {RADII.map((r, i) => (
        <circle key={i} cx={CX} cy={CY} r={r}
          fill="none" stroke="rgba(0,0,0,0.07)"
          strokeWidth="1" strokeDasharray="4 7"
        />
      ))}

      {/* spokes */}
      {partners.map((p, i) => {
        const radius = RADII[p.ring];
        const a      = ((p.startAngle + rot) * Math.PI) / 180;
        const nx     = CX + radius * Math.cos(a);
        const ny     = CY + radius * Math.sin(a);
        return (
          <line key={i}
            x1={CX} y1={CY} x2={nx} y2={ny}
            stroke={p.color} strokeWidth="0.7"
            strokeDasharray="3 6" opacity="0.35"
          />
        );
      })}

      {/* hub pulse */}
      <circle cx={CX} cy={CY} r="48"
        fill="rgba(227,6,19,0.05)" className="ig-breath" />

      {/* hub disc — solid border only, no dotted ring */}
      <circle cx={CX} cy={CY} r="38"
        fill="#f7f2e6"
        stroke="rgba(227,6,19,0.3)" strokeWidth="1.5"
        filter="url(#igHubShadow2)"
      />

      {/* Ordrji logo in hub */}
      <image
        href="/logo-icon.jpg"
        x={CX - 24} y={CY - 24}
        width="48" height="48"
        clipPath="url(#igHubClip2)"
        preserveAspectRatio="xMidYMid meet"
      />

      {/* ORDRJI OS label */}
      <text x={CX} y={CY + 50}
        textAnchor="middle" fontSize="6.5" fontWeight="800"
        letterSpacing="1.6" fill="#c2410c"
        fontFamily="Inter, sans-serif"
      >
        ORDRJI OS
      </text>
    </svg>
  );
}

/* ── main component ────────────────────────────────────────────────────── */
export default function Integrations() {
  const [tab,    setTab]    = useState<Category>("software");
  const [rot,    setRot]    = useState(0);
  const [inView, setInView] = useState(false);
  const [show,   setShow]   = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const lastTs     = useRef(0);
  const rafId      = useRef(0);

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

  const tick = useCallback((ts: number) => {
    if (lastTs.current === 0) lastTs.current = ts;
    const dt = Math.min((ts - lastTs.current) / 1000, 0.05);
    lastTs.current = ts;
    setRot(r => (r + (360 / SPEED) * dt) % 360);
    rafId.current = requestAnimationFrame(tick);
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

      <div className="container ig-layout">

        {/* ── LEFT: orbital diagram ───────────────────────────────────── */}
        <div className={`ig-svg-col ${inView ? "ig-in" : ""}`}>
          <div style={{
            position: "relative",
            width:    SIZE,
            height:   SIZE,
            maxWidth: "100%",
          }}>

            {/* SVG layer: rings, spokes, hub (behind the HTML nodes) */}
            <Spokes partners={partners} rot={rot} />

            {/* HTML layer: one div per node with a real <img> tag */}
            {partners.map((p, i) => (
              <OrbNode key={`${tab}-${p.name}-${i}`} p={p} rot={rot} tabKey={tab} />
            ))}
          </div>
        </div>

        {/* ── RIGHT: content ──────────────────────────────────────────── */}
        <div className={`ig-content-col ${show ? "ig-show" : ""}`}>

          <p className="ig-eyebrow">We&apos;re a great fit — and we add some more.</p>
          <h2 className="ig-heading">{activeCat.label}</h2>
          <p className="ig-desc">{activeCat.desc}</p>

          <div className="ig-tabs" role="tablist" aria-label="Integration categories">
            {CATS.map(c => (
              <button
                key={c.key}
                role="tab"
                aria-selected={tab === c.key}
                onClick={() => setTab(c.key)}
                className={`ig-tab ${tab === c.key ? "ig-tab-on" : ""}`}
              >
                <span className="ig-dot" aria-hidden="true" />
                <span className="ig-tab-txt">{c.label}</span>
                <ChevronRight size={14} className="ig-arrow" aria-hidden="true" />
              </button>
            ))}
          </div>

          {/* partner chips — favicon logo + name */}
          <div className="ig-chips" aria-label={`${activeCat.label} partners`}>
            {partners.map(p => (
              <span
                key={p.name + p.ring}
                className="ig-chip"
                style={{
                  borderColor: p.color + "40",
                  background:  p.color + "10",
                }}
              >
                <ChipLogo domain={p.logo} name={p.name} color={p.color} />
                <span style={{ color: p.color, fontWeight: 700, fontSize: "0.72rem" }}>
                  {p.name}
                </span>
              </span>
            ))}
          </div>

          <a href="#pricing" className="ig-cta-btn">
            View All Integrations <ArrowRight size={14} aria-hidden="true" />
          </a>
        </div>
      </div>

      <style jsx global>{`
        /* ── section: warm orange-tinted background ───────────────────── */
        .ig-section {
          padding: 8rem 0;
          background: linear-gradient(160deg, #fff8f2 0%, #fff3ea 40%, #fef6f0 100%);
          position: relative;
          overflow: hidden;
          z-index: 10;
        }

        /* subtle orange watermark circle top-right */
        .ig-section::before {
          content: "";
          position: absolute;
          top: -120px; right: -120px;
          width: 480px; height: 480px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(227,6,19,0.07) 0%, transparent 70%);
          pointer-events: none;
        }
        .ig-section::after {
          content: "";
          position: absolute;
          bottom: -80px; left: -80px;
          width: 360px; height: 360px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(227,6,19,0.05) 0%, transparent 70%);
          pointer-events: none;
        }

        .ig-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
          align-items: center;
        }
        @media (min-width: 1024px) {
          .ig-layout { grid-template-columns: 480px 1fr; gap: 5rem; }
        }

        .ig-svg-col {
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0;
          transform: translateX(-28px) scale(0.96);
          transition: opacity 0.75s ease, transform 0.75s cubic-bezier(0.16,1,0.3,1);
        }
        .ig-svg-col.ig-in { opacity: 1; transform: translateX(0) scale(1); }

        .ig-breath {
          animation: igBreath 3.2s ease-in-out infinite;
          transform-origin: ${CX}px ${CY}px;
        }
        @keyframes igBreath {
          0%,100% { r:70; opacity:.25; }
          50%      { r:82; opacity:.06; }
        }
        .ig-spin {
          animation: igSpin 9s linear infinite;
          transform-origin: ${CX}px ${CY}px;
        }
        @keyframes igSpin { to { transform: rotate(360deg); } }

        /* ── content column ───────────────────────────────────────────── */
        .ig-content-col {
          display: flex; flex-direction: column; gap: 1.5rem;
          opacity: 0; transform: translateX(24px);
          transition: opacity .7s ease .1s, transform .7s cubic-bezier(.16,1,.3,1) .1s;
        }
        .ig-content-col.ig-show { opacity: 1; transform: translateX(0); }

        /* eyebrow */
        .ig-eyebrow {
          font-size: .78rem; font-weight: 700; letter-spacing: 1px;
          text-transform: uppercase; color: #c2410c; margin: 0;
        }

        /* heading — orange gradient */
        .ig-heading {
          font-size: clamp(1.45rem, 2.5vw, 2rem);
          font-weight: 800; letter-spacing: -.8px; line-height: 1.25;
          background: linear-gradient(120deg, #1e1b18 30%, #c2410c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0;
        }

        /* description */
        .ig-desc {
          font-size: .95rem; color: #7a5a4a;
          line-height: 1.7; margin: 0; max-width: 430px;
        }

        /* ── tabs ─────────────────────────────────────────────────────── */
        .ig-tabs { display: flex; flex-direction: column; gap: .5rem; }
        .ig-tab {
          display: flex; align-items: center; gap: .75rem;
          padding: .9rem 1.15rem;
          background: rgba(255,255,255,0.75);
          border: 1px solid rgba(227,6,19,0.15);
          border-radius: 12px; cursor: pointer; text-align: left;
          font-size: .875rem; font-weight: 600; color: #7a5a4a;
          transition: border-color .2s, background .2s, color .2s,
                      box-shadow .2s, transform .15s;
          backdrop-filter: blur(8px);
        }
        .ig-tab:hover {
          border-color: rgba(227,6,19,.4);
          background: rgba(255,255,255,0.95);
          color: #1e1b18; transform: translateX(3px);
        }
        .ig-tab-on {
          border-color: #c2410c !important;
          background: rgba(227,6,19,0.07) !important;
          color: #1e1b18 !important;
          box-shadow: 0 4px 20px rgba(227,6,19,.15), inset 0 0 0 1px rgba(227,6,19,.12);
          transform: translateX(0) !important;
        }

        /* dot */
        .ig-dot {
          width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
          background: rgba(227,6,19,0.2); transition: background .2s;
        }
        .ig-tab-on .ig-dot { background: #c2410c; box-shadow: 0 0 6px #c2410c88; }

        .ig-tab-txt { flex: 1; }

        /* arrow */
        .ig-arrow { color: rgba(227,6,19,.4); flex-shrink: 0; transition: transform .2s, color .2s; }
        .ig-tab-on .ig-arrow, .ig-tab:hover .ig-arrow {
          transform: translateX(3px); color: #c2410c;
        }

        /* ── chips ────────────────────────────────────────────────────── */
        .ig-chips { display: flex; flex-wrap: wrap; gap: .4rem; }
        .ig-chip {
          display: inline-flex; align-items: center; gap: .35rem;
          padding: .3rem .8rem .3rem .5rem;
          border-radius: 9999px;
          border: 1.5px solid rgba(227,6,19,0.25);
          background: rgba(255,255,255,0.8);
          transition: transform .15s, box-shadow .15s, border-color .15s;
        }
        .ig-chip:hover {
          transform: translateY(-1px);
          border-color: rgba(227,6,19,0.5);
          box-shadow: 0 3px 10px rgba(227,6,19,.1);
        }

        /* ── orange CTA button ────────────────────────────────────────── */
        .ig-cta-btn {
          align-self: flex-start;
          margin-top: .25rem;
          display: inline-flex;
          align-items: center;
          gap: .5rem;
          background: #c2410c;
          color: #fff;
          padding: .8rem 2rem;
          border-radius: 9999px;
          font-weight: 700;
          font-size: .9rem;
          letter-spacing: .2px;
          text-decoration: none;
          transition: background .2s, transform .2s, box-shadow .2s;
          border: none;
          cursor: pointer;
          white-space: nowrap;
          box-shadow: 0 6px 20px rgba(227,6,19,.3);
        }
        .ig-cta-btn:hover {
          background: #9a3412;
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(227,6,19,.4);
        }

        @media (max-width: 1023px) {
          .ig-layout { grid-template-columns: 1fr; }
          .ig-svg-col { max-width: 400px; margin: 0 auto; width: 100%; }
          .ig-desc { max-width: 100%; }
        }
      `}</style>
    </section>
  );
}
