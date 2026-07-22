/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { AlertOctagon, RefreshCw, ZapOff, TrendingDown } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.15, delayChildren: 0.1 } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 200, damping: 25, mass: 0.8 } 
  }
};

const PAIN_POINTS = [
  {
    icon: <TrendingDown size={22} />,
    title: "The Commission Drain",
    desc: "Standard POS providers and checkout tools clip 1% to 3% of every transaction, eating directly into your restaurant's thin margins.",
    color: "#da0404"
  },
  {
    icon: <RefreshCw size={22} />,
    title: "Fragmented Counter Mess",
    desc: "Running Swiggy, Zomato, floor waiter apps, and billing on five disconnected tablets leads to manual entry delays and billing errors.",
    color: "#0284c7"
  },
  {
    icon: <ZapOff size={22} />,
    title: "Dinner Rush POS Crashes",
    desc: "Legacy cloud software without local caching locks up or logs cashiers out when the internet slows down right during peak hours.",
    color: "#d97706"
  },
  {
    icon: <AlertOctagon size={22} />,
    title: "Invisible Stock Leakage",
    desc: "Paper inventory trackers make it impossible to track recipe wastage, leading to raw material variance and uncontrolled costs.",
    color: "#8b5cf6"
  }
];

function ProblemCard({ item, variants }: { item: any, variants: any }) {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateY = useTransform(smoothMouseX, [0, 1], [-10, 10]);
  const rotateX = useTransform(smoothMouseY, [0, 1], [10, -10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const background = useMotionTemplate`radial-gradient(
    400px circle at ${useTransform(smoothMouseX, v => v * 100)}% ${useTransform(smoothMouseY, v => v * 100)}%,
    rgba(255,255,255,0.08),
    transparent 40%
  )`;

  return (
    <motion.div 
      variants={variants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05, z: 40, boxShadow: "0 25px 50px rgba(0,0,0,0.12)" }}
      style={{ 
        background: "var(--bg-card)", 
        border: "1px solid var(--border-color)", 
        borderRadius: 16, 
        padding: "2.25rem", 
        borderLeft: `4px solid ${item.color}`, 
        cursor: "default",
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
        position: "relative"
      }} 
      className="problem-card shadow-sm"
    >
      <motion.div
        className="panel-light-reflection"
        style={{
          position: "absolute", inset: 0,
          background, pointerEvents: "none", zIndex: 10,
          mixBlendMode: "overlay", borderRadius: "inherit"
        }}
      />
      <div style={{ transformStyle: "preserve-3d" }}>
        <div style={{ color: item.color, background: item.color + "12", width: 44, height: 44, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem", transform: "translateZ(30px)" }}>
          {item.icon}
        </div>
        <h3 style={{ fontSize: "1.15rem", fontWeight: 800, marginBottom: "0.5rem", color: "var(--text-primary)", transform: "translateZ(20px)" }}>{item.title}</h3>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.5, margin: 0, transform: "translateZ(10px)" }}>{item.desc}</p>
      </div>
    </motion.div>
  );
}

export default function Problems() {
  return (
    <section className="problems-section" id="problems">
      <div className="container">
        
        {/* Section Header */}
        <motion.div 
          style={{ textAlign: "center", marginBottom: "4rem" }}
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: "some" }}
          transition={{ type: "spring", stiffness: 200, damping: 25, mass: 0.8 }}
        >
          <h2 style={{ fontSize: "clamp(2rem, 4.5vw, 2.5rem)", fontWeight: 800, letterSpacing: "-1.2px", marginTop: "0.5rem" }}>
            Why Traditional POS Software <br />
            Slows Down Your Restaurant
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", maxWidth: "580px", margin: "1rem auto 0", lineHeight: "1.6" }}>
            Connecting front-of-house operations to the kitchen shouldn&apos;t involve five different systems, offline cash register failures, or transaction commissions.
          </p>
        </motion.div>

        {/* Pain Points Grid */}
        <motion.div 
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem", perspective: "1600px" }} 
          className="problems-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: "some" }}
        >
          {PAIN_POINTS.map((item, idx) => (
            <ProblemCard key={idx} item={item} variants={itemVariants} />
          ))}
        </motion.div>

      </div>

      <style jsx global>{`
        .problems-section {
          padding: 6rem 0;
          background: var(--bg-primary);
          position: relative;
          z-index: 10;
        }

        .problems-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          background: rgba(227, 6, 19, 0.06);
          border: 1px solid rgba(227, 6, 19, 0.18);
          color: var(--accent-orange);
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.7rem;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .hover-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(90, 80, 70, 0.06) !important;
        }

        @media (min-width: 640px) {
          .problems-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        
        @media (min-width: 1024px) {
          .problems-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
