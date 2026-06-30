"use client";

import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, QrCode, Smartphone, Wifi, ChefHat, Receipt, CheckCircle, Gift, UserCheck, MessageSquare } from "lucide-react";

import type { LucideProps } from "lucide-react";

interface JourneyStep {
  number: number;
  title: string;
  desc: string;
  image: string;
  icon: React.ComponentType<LucideProps>;
  badgeColor: string;
  mockUiTitle: string;
  mockUiLines: string[];
}

const JOURNEY_STEPS: JourneyStep[] = [
  {
    number: 1,
    title: "Customer Scans QR",
    desc: "Guests scan the dynamic table QR code using their own smartphone camera. No app download required.",
    image: "/journey-1-qr-scan-female.png",
    icon: QrCode,
    badgeColor: "var(--accent-purple)",
    mockUiTitle: "ORDERJI WEB MENU",
    mockUiLines: ["📍 Table 14 - Active Session", "✨ Personalized Recommendations Loaded", "🔥 Bestseller: Truffle Fries added to cart"]
  },
  {
    number: 2,
    title: "Places Order",
    desc: "Orders are submitted directly from their phone screen. Guests can customize modifiers and request preferences.",
    image: "/journey-2-qr-scan-male.png",
    icon: Smartphone,
    badgeColor: "var(--accent-blue)",
    mockUiTitle: "SECURE CHECKOUT",
    mockUiLines: ["🛒 Cart Subtotal: ₹1,450", "👨‍🍳 Cook Note: Make it medium spicy", "🚀 Tap 'Send to Kitchen'"]
  },
  {
    number: 3,
    title: "Staff Assist Sync",
    desc: "Waiters can seamlessly take orders or add items at the table, syncing instantly with the guest's session.",
    image: "/journey-3-waiter-order.jpg",
    icon: Wifi,
    badgeColor: "var(--accent-amber)",
    mockUiTitle: "STAFF TERMINAL",
    mockUiLines: ["🎟️ Ticket #1094 - Table 14", "🤵 Staff: Arjun Singh", "🍽️ 1x Crispy Salmon | 2x Truffle Fries"]
  },
  {
    number: 4,
    title: "Kitchen Display System",
    desc: "Orders flow directly to the Kitchen Display System (KDS), organizing tickets by prep station for the chefs.",
    image: "/journey-4-chef-kds.jpg",
    icon: ChefHat,
    badgeColor: "var(--accent-green)",
    mockUiTitle: "KDS SCREEN",
    mockUiLines: ["✅ Order #1094 Marked READY", "🔔 Notification sent to Waiter Arjun", "🍽️ Route: Service Counter"]
  },
  {
    number: 5,
    title: "Bill Generated",
    desc: "Cashier prints or pushes the digital bill. Group dining tables can opt for split billing automatically.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800",
    icon: Receipt,
    badgeColor: "var(--accent-purple)",
    mockUiTitle: "E-BILL RECEIPT",
    mockUiLines: ["📝 Invoice: INV-2026-928", "🍕 Items: ₹1,450 + 5% GST", "👥 Billing Split: 2 guests (₹761 each)"]
  },
  {
    number: 6,
    title: "Payment Completed",
    desc: "Customers pay using card, wallet, or UPI directly. The POS terminal reconciles the status instantly.",
    image: "/journey-5-pos-payment.png",
    icon: CheckCircle,
    badgeColor: "var(--accent-green)",
    mockUiTitle: "PAYMENT VERIFIED",
    mockUiLines: ["💳 Txn Ref: #UPI-9182379", "💰 Paid Amount: ₹1,522.50", "🌟 POS Status: RECONCILED & CLOSED"]
  },
  {
    number: 7,
    title: "Loyalty Awarded",
    desc: "OrderJi loyalty engine awards points based on bill value, tracking real-time loyalty analytics on the dashboard.",
    image: "/journey-7-loyalty.png",
    icon: Gift,
    badgeColor: "var(--accent-blue)",
    mockUiTitle: "POINTS BALANCE",
    mockUiLines: ["🎉 Points Earned: +152 pts", "👑 Total Balance: 1,450 pts", "🎖️ Status Tier: Gold Loyalty Level"]
  },
  {
    number: 8,
    title: "Added To CRM",
    desc: "Guest details, order history, and preferences are consolidated into a central, desktop-accessible CRM profile.",
    image: "/journey-8-crm.jpg",
    icon: UserCheck,
    badgeColor: "var(--accent-amber)",
    mockUiTitle: "CRM PROFILE CREATED",
    mockUiLines: ["👤 Rohit Sharma | Gold Member", "💖 Preference: Medium Spicy Curry", "📅 Total Visits: 12 | Spend: ₹18,400"]
  },
  {
    number: 9,
    title: "Campaign Triggered",
    desc: "Automated campaign engines trigger targeted birthday special or abandoned cart campaigns on mobile screens.",
    image: "/journey-9-campaign.png",
    icon: MessageSquare,
    badgeColor: "var(--accent-rose)",
    mockUiTitle: "MARKETING TRIGGER",
    mockUiLines: ["💬 Channel: WhatsApp Business", "📩 Sent: 'Enjoy 15% off this Sunday!'", "📈 Est. Conversion Rate: 11.2%"]
  }
];

export default function OrderJourney() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
      setScrollProgress(progress);

      // Calculate current active index based on scroll position
      const card = scrollContainerRef.current.querySelector(".journey-card-wrapper");
      if (card) {
        const cardWidth = card.getBoundingClientRect().width;
        const gap = 24; // 1.5rem gap
        const step = cardWidth + gap;
        const index = Math.round(scrollLeft / step);
        setActiveIndex(Math.max(0, Math.min(index, JOURNEY_STEPS.length - 1)));
      }
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const card = container.querySelector(".journey-card-wrapper");
      if (card) {
        const cardWidth = card.getBoundingClientRect().width;
        const gap = 24;
        container.scrollBy({ left: -(cardWidth + gap), behavior: "smooth" });
      } else {
        container.scrollBy({ left: -350, behavior: "smooth" });
      }
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const card = container.querySelector(".journey-card-wrapper");
      if (card) {
        const cardWidth = card.getBoundingClientRect().width;
        const gap = 24;
        container.scrollBy({ left: cardWidth + gap, behavior: "smooth" });
      } else {
        container.scrollBy({ left: 350, behavior: "smooth" });
      }
    }
  };

  // Auto scroll effect
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const card = container.querySelector(".journey-card-wrapper");
        if (!card) return;

        const cardWidth = card.getBoundingClientRect().width;
        const gap = 24; // 1.5rem gap
        const step = cardWidth + gap;

        let nextIndex = activeIndex + 1;
        const maxScrollLeft = container.scrollWidth - container.clientWidth;

        // If we are at the end, wrap around to index 0
        if (nextIndex >= JOURNEY_STEPS.length || container.scrollLeft >= maxScrollLeft - 5) {
          nextIndex = 0;
        }

        container.scrollTo({
          left: nextIndex * step,
          behavior: "smooth"
        });
      }
    }, 2000); // changes every 2.0 seconds

    return () => clearInterval(interval);
  }, [activeIndex, isPaused]);

  return (
    <section className="journey-section" id="journey">
      <div className="container">
        {/* Header Block */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", gap: "2rem" }}>
          <div>
            <h2 style={{ fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-1.5px", margin: "0.5rem 0" }}>
              One Seamless Order Journey
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", maxWidth: "550px" }}>
              Watch how guest order events trigger kitchen alerts, checkout reconciliation, CRM logging, and automated marketing flows.
            </p>
          </div>

          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button className="nav-arrow-btn" onClick={scrollLeft} aria-label="Scroll left">
              <ChevronLeft size={20} />
            </button>
            <button className="nav-arrow-btn" onClick={scrollRight} aria-label="Scroll right">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Cards Track */}
      <div 
        className="journey-track" 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {JOURNEY_STEPS.map((step) => {
          return (
            <div key={step.number} className="journey-card-wrapper">
              <div className="journey-card glass-card">
                {/* Image and product UI overlays */}
                <div className="card-visual-wrapper" style={{ backgroundImage: `url(${step.image})` }}>
                  <div className="card-visual-overlay" />
                </div>

                {/* Content info */}
                <div className="card-info">
                  <div className="step-counter" style={{ color: step.badgeColor, backgroundColor: `rgba(0,0,0,0.03)`, borderColor: step.badgeColor }}>
                    Step 0{step.number}
                  </div>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-desc">{step.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Track Indicator */}
      <div className="container" style={{ marginTop: "2rem" }}>
        <div className="progress-bar-track">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>

      <style jsx global>{`
        .journey-section {
          padding: 8rem 0;
          background-color: var(--bg-secondary);
          position: relative;
        }

        .nav-arrow-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid var(--border-color);
          background: var(--bg-card);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .nav-arrow-btn:hover {
          background: rgba(0, 0, 0, 0.05);
          border-color: var(--border-color-hover);
          color: var(--accent-orange);
          transform: scale(1.05);
        }

        .journey-track {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          padding: 1rem 1.5rem;
          gap: 1.5rem;
          scroll-behavior: smooth;
        }

        /* Hide scrollbars but keep functionality */
        .journey-track::-webkit-scrollbar {
          display: none;
        }
        .journey-track {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .journey-card-wrapper {
          scroll-snap-align: start;
          flex: 0 0 350px;
        }

        @media (min-width: 640px) {
          .journey-card-wrapper {
            flex: 0 0 380px;
          }
        }

        .journey-card {
          width: 100%;
          height: 480px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.05);
        }

        .card-visual-wrapper {
          height: 55%;
          position: relative;
          background-size: cover;
          background-position: center;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card-visual-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 20%, rgba(253, 250, 244, 0.8) 100%);
          z-index: 1;
        }

        .floating-ui-card {
          position: relative;
          z-index: 5;
          width: 80%;
          padding: 0.8rem;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(0, 0, 0, 0.08);
          background: var(--bg-card);
        }

        .ui-header {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--text-secondary);
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 0.4rem;
          margin-bottom: 0.4rem;
          text-transform: uppercase;
        }

        .ui-body {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .ui-line {
          font-size: 0.7rem;
          color: var(--text-primary);
          font-family: monospace;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .card-info {
          height: 45%;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          background: var(--bg-card);
        }

        .step-counter {
          align-self: flex-start;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.2rem 0.6rem;
          border-radius: 9999px;
          border: 1px solid transparent;
          margin-bottom: 0.75rem;
        }

        .step-title {
          font-size: 1.2rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          letter-spacing: -0.5px;
        }

        .step-desc {
          font-size: 0.85rem;
          line-height: 1.5;
          color: var(--text-secondary);
        }

        .progress-bar-track {
          width: 100%;
          height: 4px;
          background: var(--border-color);
          border-radius: 9999px;
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--accent-orange), var(--bg-tertiary));
          transition: width 0.1s ease-out;
        }
      `}</style>
    </section>
  );
}
