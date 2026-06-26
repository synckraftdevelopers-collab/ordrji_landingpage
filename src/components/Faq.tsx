"use client";

import React, { useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: "Is OrderJi another POS billing software?",
    a: "No. Traditional POS systems only act as legacy cash registers and receipt printers. OrderJi is a complete Restaurant Operating System (OS). It connects and synchronizes table QR menus, chef kitchen displays (KDS), automated WhatsApp/SMS marketing campaigns, live raw inventory tracking, and centralized accounting into a single unified cloud workspace."
  },
  {
    q: "Do you charge order commissions on QR and table checkouts?",
    a: "Absolutely not. OrderJi believes that your restaurant revenue belongs entirely to you. We operate on a flat subscription pricing model. We never charge commission percentages or lookup fees on QR ordering, table reservations, or self-service kiosks."
  },
  {
    q: "Can we integrate food delivery aggregators like Swiggy and Zomato?",
    a: "Yes. OrderJi is built to consolidate channel fragmentation. All incoming orders from Zomato, Swiggy, and your own custom web ordering stores flow directly into the central Live Feed console, printing automatically and dispatching directly to chef station displays."
  },
  {
    q: "What happens if our restaurant internet goes down?",
    a: "OrderJi features local-cache offline safety loops. The billing terminal queues transaction invoices locally inside the browser. As soon as the network connection is restored, the queue syncs with the cloud database. Customers can continue QR scanning as long as their mobile data is active."
  },
  {
    q: "Does OrderJi support multi-outlet franchises and warehouses?",
    a: "Yes. Our Scale and Enterprise plans feature centralized multi-outlet inventory dashboards. You can manage central supply warehouses, handle internal stock transfer requests, monitor recipe usage, and track material depletion forecasts across all branches."
  }
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="glow-spot glow-rose" style={{ top: "40%", left: "5%", width: "350px", height: "350px" }} />

      <div className="container" style={{ maxWidth: "800px" }}>
        {/* Title Block */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>

          <h2 className="gradient-text" style={{ fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-1.5px", marginBottom: "1rem" }}>
            Frequently Asked Questions
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", lineHeight: "1.6" }}>
            Got questions about integrations, hardware compatibility, or pricing setups? We've got answers.
          </p>
        </div>

        {/* Accordions Stack */}
        <div className="faq-stack">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div 
                key={idx} 
                className="faq-item-card glass-card"
                style={{ borderColor: isOpen ? "rgba(227, 6, 19, 0.3)" : "var(--border-color)" }}
              >
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="faq-question-btn"
                >
                  <span className="faq-question">{faq.q}</span>
                  <ChevronDown 
                    size={18} 
                    className="faq-arrow-icon"
                    style={{ 
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      color: isOpen ? "var(--accent-orange)" : "var(--text-secondary)"
                    }} 
                  />
                </button>

                <div 
                  className="faq-answer-wrapper"
                  style={{
                    maxHeight: isOpen ? "200px" : "0",
                    opacity: isOpen ? 1 : 0,
                    paddingBottom: isOpen ? "1.5rem" : "0"
                  }}
                >
                  <p className="faq-answer">{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        .faq-section {
          padding: 8rem 0;
          background-color: var(--bg-primary);
          position: relative;
          z-index: 10;
        }

        .faq-stack {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .faq-item-card {
          padding: 0 1.5rem;
          box-shadow: 0 10px 25px rgba(90, 80, 70, 0.03), 0 0 1px rgba(90, 80, 70, 0.05);
          overflow: hidden;
          background: var(--bg-card);
        }

        .faq-item-card:hover {
          border-color: rgba(227, 6, 19, 0.25);
        }

        .faq-question-btn {
          width: 100%;
          background: transparent;
          border: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 0;
          cursor: pointer;
          text-align: left;
          color: var(--text-primary);
        }

        .faq-question {
          font-size: 1.05rem;
          font-weight: 700;
          letter-spacing: -0.2px;
        }

        .faq-arrow-icon {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s ease;
          flex-shrink: 0;
          margin-left: 1rem;
        }

        .faq-answer-wrapper {
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease, padding 0.4s ease;
        }

        .faq-answer {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }
      `}</style>
    </section>
  );
}
