"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Home, ClipboardList, X } from "lucide-react";
import Link from "next/link";

interface SuccessModalProps {
  isOpen: boolean;
  restaurantName: string;
  onClose: () => void;
}

export default function SuccessModal({ isOpen, restaurantName, onClose }: SuccessModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="rr-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="rr-modal-card"
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ type: "spring", duration: 0.45, bounce: 0.18 }}
            onClick={e => e.stopPropagation()}
          >
            <button className="rr-modal-close" onClick={onClose} aria-label="Close">
              <X size={18} />
            </button>

            {/* Success icon */}
            <motion.div
              className="rr-modal-icon"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, delay: 0.15 }}
            >
              <CheckCircle2 size={52} color="#E30613" />
            </motion.div>

            <h2 className="rr-modal-title">Thank You!</h2>
            <h3 className="rr-modal-subtitle">Restaurant Registered Successfully</h3>
            <p className="rr-modal-sub">
              <strong>{restaurantName}</strong> has been submitted for review.
            </p>
            <p className="rr-modal-body">
              Our team will review your restaurant details. Once approved, your restaurant will become
              searchable on Ordrji and customers can discover you instantly.
            </p>

            {/* Timeline */}
            <div className="rr-modal-timeline">
              {[
                { dot: "#f97316", label: "Submitted",       sub: "Just now" },
                { dot: "#3b82f6", label: "Under Review",    sub: "Within 24 hrs" },
                { dot: "#16a34a", label: "Live on Ordrji",  sub: "After approval" },
              ].map((s, i) => (
                <div key={i} className="rr-modal-step">
                  <span className="rr-modal-dot" style={{ background: s.dot }} />
                  <span className="rr-modal-step-label">{s.label}</span>
                  <span className="rr-modal-step-sub">{s.sub}</span>
                </div>
              ))}
            </div>

            <div className="rr-modal-actions">
              <Link href="/" className="rr-modal-btn-primary">
                <Home size={16} /> Go to Home
              </Link>
              <button className="rr-modal-btn-secondary" onClick={onClose}>
                <ClipboardList size={16} /> Track Status
              </button>
            </div>
          </motion.div>

          <style jsx global>{`
            .rr-modal-overlay {
              position: fixed; inset: 0; z-index: 9999;
              background: rgba(0,0,0,.55); backdrop-filter: blur(6px);
              display: flex; align-items: center; justify-content: center; padding: 1rem;
            }
            .rr-modal-card {
              background: #fff; border-radius: 24px;
              padding: 3rem 2.5rem; max-width: 520px; width: 100%;
              display: flex; flex-direction: column; align-items: center;
              text-align: center; gap: 1rem; position: relative;
              box-shadow: 0 32px 72px -16px rgba(0,0,0,.28);
            }
            .rr-modal-close {
              position: absolute; top: 1rem; right: 1rem;
              background: #f1f5f9; border: none; border-radius: 50%;
              width: 34px; height: 34px; cursor: pointer; color: #64748b;
              display: flex; align-items: center; justify-content: center;
              transition: background .2s;
            }
            .rr-modal-close:hover { background: #e2e8f0; }
            .rr-modal-icon { margin-bottom: .25rem; filter: drop-shadow(0 4px 12px rgba(227,6,19,.25)); }
            .rr-modal-title {
              font-size: 1.75rem; font-weight: 800; letter-spacing: -.5px;
              color: #0f172a; margin: 0;
            }
            .rr-modal-subtitle {
              font-size: 1.1rem; font-weight: 700; color: #16a34a; margin: -0.25rem 0 0;
            }
            .rr-modal-sub { font-size: .95rem; color: #475569; margin: 0; }
            .rr-modal-body {
              font-size: .875rem; color: #64748b; line-height: 1.65; margin: 0;
              max-width: 380px;
            }
            .rr-modal-timeline {
              display: flex; gap: .5rem; justify-content: center; margin: .5rem 0;
              flex-wrap: wrap;
            }
            .rr-modal-step {
              display: flex; flex-direction: column; align-items: center; gap: .25rem;
              padding: .6rem .9rem;
              background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px;
              min-width: 110px;
            }
            .rr-modal-dot {
              width: 10px; height: 10px; border-radius: 50%;
            }
            .rr-modal-step-label { font-size: .78rem; font-weight: 700; color: #0f172a; }
            .rr-modal-step-sub   { font-size: .68rem; color: #94a3b8; }
            .rr-modal-actions { display: flex; gap: .75rem; flex-wrap: wrap; justify-content: center; margin-top: .5rem; }
            .rr-modal-btn-primary {
              display: inline-flex; align-items: center; gap: .4rem;
              background: #f97316; color: #fff;
              padding: .7rem 1.5rem; border-radius: 9999px;
              font-weight: 700; font-size: .875rem; text-decoration: none;
              transition: background .2s, transform .2s;
            }
            .rr-modal-btn-primary:hover { background: #ea6a0a; transform: translateY(-1px); }
            .rr-modal-btn-secondary {
              display: inline-flex; align-items: center; gap: .4rem;
              background: #f1f5f9; color: #0f172a; border: 1px solid #e2e8f0;
              padding: .7rem 1.5rem; border-radius: 9999px;
              font-weight: 600; font-size: .875rem; cursor: pointer;
              transition: background .2s;
            }
            .rr-modal-btn-secondary:hover { background: #e2e8f0; }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
