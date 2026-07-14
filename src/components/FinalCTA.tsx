"use client";

import React from "react";
import { ArrowRight, MessageSquare, Phone } from "lucide-react";

interface FinalCTAProps {
  onBookDemo: () => void;
}

export default function FinalCTA({ onBookDemo }: FinalCTAProps) {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-card glass-card">
          {/* subtle lighting spots */}
          <div className="cta-glow cta-glow-orange" />
          <div className="cta-glow cta-glow-red" />
          
          <div className="cta-content">

            <h2 className="cta-title">
              Take Control of Your <br className="hide-mobile" />
              Restaurant Operations Today
            </h2>
            
            <p className="cta-subtitle">
              Join over 3,500+ restaurants that use Ordrji to sync billing, table QR orders, kitchen workflows, and analytics in one premium dashboard.
            </p>
            
            <div className="cta-actions">
              <button onClick={onBookDemo} className="btn-primary btn-red cta-btn font-semibold">
                Book Free Demo <ArrowRight size={16} />
              </button>
              
              <a 
                href="https://wa.me/919867799655?text=Hi%20Ordrji%20team,%20I%20am%20interested%20in%20a%20demo%20for%20my%20restaurant."
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-secondary cta-btn-wa font-semibold"
              >
                <MessageSquare size={16} /> WhatsApp Sales
              </a>

              <a 
                href="tel:+919867799655"
                className="btn-text-call font-semibold"
              >
                <Phone size={15} /> Talk to Sales: +91 98677 99655
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .cta-section {
          padding: 6rem 0;
          background: var(--bg-primary);
          position: relative;
          z-index: 10;
        }

        .cta-card {
          position: relative;
          background: #fdfaf4;
          border: 1px solid var(--border-color);
          border-radius: 28px;
          padding: 4rem 2rem;
          text-align: center;
          overflow: hidden;
          box-shadow: 0 20px 48px -12px rgba(227, 6, 19, 0.08);
        }

        @media (min-width: 768px) {
          .cta-card {
            padding: 5rem 4rem;
          }
        }

        .cta-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.15;
          pointer-events: none;
          z-index: 0;
        }

        .cta-glow-orange {
          top: -100px;
          left: -100px;
          width: 300px;
          height: 300px;
          background: var(--accent-orange);
        }

        .cta-glow-red {
          bottom: -150px;
          right: -100px;
          width: 400px;
          height: 400px;
          background: #da0404;
        }

        .cta-content {
          position: relative;
          z-index: 2;
          max-width: 680px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .cta-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: rgba(227, 6, 19, 0.06);
          border: 1px solid rgba(227, 6, 19, 0.18);
          color: var(--text-primary);
          padding: 0.35rem 0.95rem;
          border-radius: 9999px;
          font-size: 0.78rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
        }

        .cta-title {
          font-size: clamp(1.8rem, 5vw, 2.8rem);
          font-weight: 900;
          line-height: 1.2;
          letter-spacing: -1.5px;
          color: var(--text-primary);
          margin-bottom: 1.25rem;
        }

        .cta-subtitle {
          font-size: 1.05rem;
          line-height: 1.65;
          color: var(--text-secondary);
          margin-bottom: 2.5rem;
          max-width: 580px;
        }

        .cta-actions {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
          width: 100%;
        }

        @media (min-width: 640px) {
          .cta-actions {
            flex-direction: row;
            justify-content: center;
            gap: 1rem;
          }
        }

        .cta-btn {
          padding: 0.9rem 2.25rem;
          font-size: 1rem;
          box-shadow: 0 8px 20px -6px rgba(227, 6, 19, 0.35);
          width: 100%;
        }

        @media (min-width: 640px) {
          .cta-btn {
            width: auto;
          }
        }


        .cta-btn-wa {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.9rem 2.25rem;
          font-size: 1rem;
          border-radius: 12px;
          background: #25d366;
          border: 1px solid transparent;
          color: #fff;
          transition: background 0.2s, transform 0.2s;
          cursor: pointer;
          width: 100%;
        }

        @media (min-width: 640px) {
          .cta-btn-wa {
            width: auto;
          }
        }

        .cta-btn-wa:hover {
          background: #20ba5a;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px -6px rgba(37, 211, 102, 0.35);
        }

        .btn-text-call {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.2s;
          padding: 0.5rem;
        }

        .btn-text-call:hover {
          color: var(--accent-orange);
        }

        @media (max-width: 640px) {
          .hide-mobile {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
