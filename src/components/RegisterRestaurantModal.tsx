"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Utensils } from "lucide-react";
import RegistrationForm, { RestaurantPrefill } from "./restaurant/RegistrationForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  prefill?: RestaurantPrefill;
}

export default function RegisterRestaurantModal({ isOpen, onClose, prefill }: Props) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  return (
    <>
      <style>{`
        .rrm-root {
          position: fixed; inset: 0; z-index: 9999;
          display: flex; align-items: flex-start; justify-content: center;
          overflow-y: auto;
        }
        .rrm-overlay {
          position: fixed; inset: 0;
          background: rgba(10,8,6,.75);
          backdrop-filter: blur(7px); -webkit-backdrop-filter: blur(7px);
        }
        .rrm-close-btn {
          position: fixed; top: 1.1rem; right: 1.1rem; z-index: 10001;
          width: 38px; height: 38px; background: #fff;
          border: 1px solid rgba(0,0,0,.12); border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #5a5046;
          box-shadow: 0 4px 12px rgba(0,0,0,.14);
          transition: background .18s, color .18s, transform .18s;
        }
        .rrm-close-btn:hover { background: #f0ebe0; color: #1e1b18; transform: scale(1.08); }

        /* Form sheet */
        .rrm-form-sheet {
          position: relative; z-index: 1;
          width: 100%; max-width: 1100px;
          margin: 2rem auto 3rem; padding: 0 1rem;
        }

        /* Pre-fill notice banner */
        .rrm-prefill-banner {
          display: flex; align-items: center; gap: .75rem;
          background: #f0fdf4; border: 1.5px solid #bbf7d0;
          border-radius: 14px; padding: .9rem 1.25rem; margin-bottom: 1.25rem;
          font-size: .85rem; color: #166534; font-weight: 600;
        }
        .rrm-prefill-banner svg { flex-shrink: 0; }
      `}</style>

      <AnimatePresence>
        {isOpen && (
          <div className="rrm-root">
            <motion.div
              className="rrm-overlay"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
            />

            <button className="rrm-close-btn" onClick={onClose} aria-label="Close">
              <X size={17} />
            </button>

            <motion.div
              key="form"
              className="rrm-form-sheet"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ type: "spring", duration: 0.38, bounce: 0.1 }}
              onClick={e => e.stopPropagation()}
            >
              {prefill?.restaurantName && (
                <div className="rrm-prefill-banner">
                  <Utensils size={16} color="#16a34a" />
                  Pre-filled with data from <strong>&nbsp;{prefill.restaurantName}</strong> — edit any field before submitting.
                </div>
              )}

              <RegistrationForm
                prefill={prefill}
                onSuccessModalClose={onClose}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
