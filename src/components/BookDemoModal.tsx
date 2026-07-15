"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Mail, Phone, MapPin, Building2, Send, CheckCircle2, Sparkles } from "lucide-react";
import LocationAutocomplete from "./LocationAutocomplete";

interface BookDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookDemoModal({ isOpen, onClose }: BookDemoModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    restaurantName: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Reset form state every time the modal opens
  useEffect(() => {
    if (isOpen) {
      const reset = () => {
        setStatus("idle");
        setErrorMessage("");
        let initialLocation = "";
        if (typeof window !== "undefined") {
          initialLocation = sessionStorage.getItem("prefilled_location") || "";
          sessionStorage.removeItem("prefilled_location");
        }
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          location: initialLocation,
          restaurantName: "",
          message: "",
        });
      };
      const raf = requestAnimationFrame(reset);
      return () => cancelAnimationFrame(raf);
    }
  }, [isOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/book-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submit error:", error);
      setStatus("error");
      setErrorMessage("Network error. Please check your internet connection.");
    }
  };

  return (
    <>
      {/* Styles injected as a plain <style> tag — works in Next.js App Router */}
      <style>{`
        .bdm-root {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .bdm-overlay {
          position: absolute;
          inset: 0;
          background: rgba(15, 12, 10, 0.65);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }

        .bdm-wrapper {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 680px;
          max-height: 92vh;
          display: flex;
          flex-direction: column;
        }

        .bdm-card {
          position: relative;
          width: 100%;
          background: #fdfaf4;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 24px;
          box-shadow: 0 32px 72px -16px rgba(0, 0, 0, 0.28), 0 0 0 1px rgba(0,0,0,0.04);
          overflow-y: auto;
          max-height: 92vh;
          padding: 2.25rem 1.75rem;
          scrollbar-width: thin;
        }

        @media (min-width: 600px) {
          .bdm-card {
            padding: 2.75rem 3rem;
          }
        }

        .bdm-close-btn {
          position: absolute;
          top: 1.1rem;
          right: 1.1rem;
          width: 36px;
          height: 36px;
          background: #f0ebe0;
          border: 1px solid rgba(0,0,0,0.1);
          color: #8c7d6e;
          cursor: pointer;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.18s, color 0.18s;
          z-index: 2;
          flex-shrink: 0;
        }
        .bdm-close-btn:hover {
          background: #e8e0d0;
          color: #1e1b18;
        }

        /* ── Header ── */
        .bdm-header {
          margin-bottom: 1.75rem;
          padding-right: 2.5rem;
        }

        .bdm-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(227, 6, 19, 0.07);
          border: 1px solid rgba(227, 6, 19, 0.18);
          color: #1e1b18;
          padding: 0.35rem 0.9rem;
          border-radius: 9999px;
          font-size: 0.78rem;
          font-weight: 600;
          margin-bottom: 0.9rem;
          letter-spacing: 0.2px;
        }

        .bdm-title {
          font-size: 1.85rem;
          font-weight: 800;
          letter-spacing: -1.2px;
          line-height: 1.2;
          margin-bottom: 0.55rem;
          background: linear-gradient(135deg, #1e1b18 30%, #da0404 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @media (min-width: 600px) {
          .bdm-title { font-size: 2.2rem; }
        }

        .bdm-subtitle {
          color: #5a5046;
          font-size: 0.9rem;
          line-height: 1.6;
          max-width: 440px;
        }

        /* ── Form ── */
        .bdm-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .bdm-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        @media (min-width: 520px) {
          .bdm-grid {
            grid-template-columns: 1fr 1fr;
            gap: 1rem 1.25rem;
          }
          .bdm-full {
            grid-column: span 2;
          }
        }

        .bdm-field {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .bdm-field label {
          font-size: 0.8rem;
          font-weight: 600;
          color: #1e1b18;
          letter-spacing: 0.15px;
        }

        .bdm-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .bdm-input-icon {
          position: absolute;
          left: 0.875rem;
          color: #8c7d6e;
          pointer-events: none;
          flex-shrink: 0;
          transition: color 0.18s;
          display: flex;
          align-items: center;
        }

        .bdm-input-wrap:focus-within .bdm-input-icon {
          color: #da0404;
        }

        .bdm-input {
          width: 100%;
          padding: 0.75rem 0.875rem 0.75rem 2.5rem;
          border-radius: 10px;
          border: 1.5px solid rgba(0, 0, 0, 0.12);
          background: #f7f2e6;
          color: #1e1b18;
          font-family: inherit;
          font-size: 0.9rem;
          line-height: 1.4;
          transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
          -webkit-appearance: none;
        }

        .bdm-input::placeholder {
          color: #a8998a;
        }

        .bdm-input:focus {
          outline: none;
          border-color: #da0404;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(227, 6, 19, 0.1);
        }

        .bdm-input:hover:not(:focus) {
          border-color: rgba(0, 0, 0, 0.22);
        }

        .bdm-textarea {
          width: 100%;
          padding: 0.75rem 0.875rem;
          border-radius: 10px;
          border: 1.5px solid rgba(0, 0, 0, 0.12);
          background: #f7f2e6;
          color: #1e1b18;
          font-family: inherit;
          font-size: 0.9rem;
          line-height: 1.6;
          min-height: 90px;
          resize: vertical;
          transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
          -webkit-appearance: none;
        }

        .bdm-textarea::placeholder {
          color: #a8998a;
        }

        .bdm-textarea:focus {
          outline: none;
          border-color: #da0404;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(227, 6, 19, 0.1);
        }

        .bdm-textarea:hover:not(:focus) {
          border-color: rgba(0, 0, 0, 0.22);
        }

        /* ── Error ── */
        .bdm-error {
          background: rgba(220, 38, 38, 0.06);
          border: 1px solid rgba(220, 38, 38, 0.22);
          color: #b91c1c;
          padding: 0.7rem 0.875rem;
          border-radius: 8px;
          font-size: 0.83rem;
          line-height: 1.5;
        }

        /* ── Submit button ── */
        .bdm-submit {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: #da0404;
          color: #ffffff;
          padding: 0.9rem 1.5rem;
          border-radius: 12px;
          border: none;
          font-family: inherit;
          font-size: 0.97rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.18s, box-shadow 0.18s, opacity 0.18s;
        }

        .bdm-submit:hover:not(:disabled) {
          background: #bd040f;
          box-shadow: 0 8px 20px -6px rgba(227, 6, 19, 0.45);
        }

        .bdm-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* ── Spinner ── */
        .bdm-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.35);
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: bdm-spin 0.75s linear infinite;
          flex-shrink: 0;
        }

        @keyframes bdm-spin {
          to { transform: rotate(360deg); }
        }

        /* ── Success screen ── */
        .bdm-success {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem 1rem 2.5rem;
          text-align: center;
          min-height: 300px;
          gap: 0;
        }

        .bdm-success-icon {
          color: #059669;
          filter: drop-shadow(0 4px 12px rgba(5, 150, 105, 0.3));
          margin-bottom: 1.25rem;
        }

        .bdm-success-title {
          font-size: 1.9rem;
          font-weight: 800;
          color: #1e1b18;
          margin-bottom: 0.6rem;
          letter-spacing: -1px;
        }

        .bdm-success-msg {
          color: #5a5046;
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 2rem;
          max-width: 320px;
        }

        .bdm-close-success {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: transparent;
          color: #1e1b18;
          padding: 0.7rem 2rem;
          border-radius: 9999px;
          border: 1.5px solid rgba(0, 0, 0, 0.15);
          font-family: inherit;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.18s, border-color 0.18s;
        }

        .bdm-close-success:hover {
          background: rgba(0, 0, 0, 0.04);
          border-color: rgba(0, 0, 0, 0.25);
        }
      `}</style>

      <AnimatePresence>
        {isOpen && (
          <div className="bdm-root">
            {/* Backdrop */}
            <motion.div
              className="bdm-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
            />

            {/* Card wrapper */}
            <div className="bdm-wrapper">
              <motion.div
                className="bdm-card"
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 12 }}
                transition={{ type: "spring", duration: 0.4, bounce: 0.12 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button className="bdm-close-btn" onClick={onClose} aria-label="Close modal">
                  <X size={18} />
                </button>

                {status !== "success" ? (
                  <>
                    {/* Header */}
                    <div className="bdm-header">
                      <div className="bdm-badge">
                        <Sparkles size={11} style={{ color: "#da0404" }} />
                        Book a Live Demo
                      </div>
                      <h2 className="bdm-title">See Ordrji in Action</h2>
                      <p className="bdm-subtitle">
                        Fill out the form and our team will walk you through a tailored demo.
                      </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="bdm-form" noValidate>
                      <div className="bdm-grid">

                        {/* Full Name */}
                        <div className="bdm-field">
                          <label htmlFor="bdm-fullName">Full Name *</label>
                          <div className="bdm-input-wrap">
                            <span className="bdm-input-icon"><User size={15} /></span>
                            <input
                              className="bdm-input"
                              type="text"
                              id="bdm-fullName"
                              name="fullName"
                              required
                              placeholder="John Doe"
                              value={formData.fullName}
                              onChange={handleChange}
                              autoComplete="name"
                            />
                          </div>
                        </div>

                        {/* Email */}
                        <div className="bdm-field">
                          <label htmlFor="bdm-email">Email Address *</label>
                          <div className="bdm-input-wrap">
                            <span className="bdm-input-icon"><Mail size={15} /></span>
                            <input
                              className="bdm-input"
                              type="email"
                              id="bdm-email"
                              name="email"
                              required
                              placeholder="john@example.com"
                              value={formData.email}
                              onChange={handleChange}
                              autoComplete="email"
                            />
                          </div>
                        </div>

                        {/* Phone */}
                        <div className="bdm-field">
                          <label htmlFor="bdm-phone">Phone Number *</label>
                          <div className="bdm-input-wrap">
                            <span className="bdm-input-icon"><Phone size={15} /></span>
                            <input
                              className="bdm-input"
                              type="tel"
                              id="bdm-phone"
                              name="phone"
                              required
                              placeholder="+91 98677 99655"
                              value={formData.phone}
                              onChange={handleChange}
                              autoComplete="tel"
                            />
                          </div>
                        </div>

                        {/* Restaurant Name */}
                        <div className="bdm-field">
                          <label htmlFor="bdm-restaurantName">Restaurant Name</label>
                          <div className="bdm-input-wrap">
                            <span className="bdm-input-icon"><Building2 size={15} /></span>
                            <input
                              className="bdm-input"
                              type="text"
                              id="bdm-restaurantName"
                              name="restaurantName"
                              placeholder="Spice Kitchen Cafe"
                              value={formData.restaurantName}
                              onChange={handleChange}
                              autoComplete="organization"
                            />
                          </div>
                        </div>

                        {/* Location */}
                        <div className="bdm-field bdm-full">
                          <label htmlFor="bdm-location">Restaurant Location / City *</label>
                          <div className="bdm-input-wrap">
                            <span className="bdm-input-icon"><MapPin size={15} /></span>
                            <LocationAutocomplete
                              value={formData.location}
                              onChange={(val) => setFormData((prev) => ({ ...prev, location: val }))}
                              placeholder="Search State, District or City..."
                              name="location"
                              required
                              inputClassName="bdm-input"
                            />
                          </div>
                        </div>

                        {/* Message */}
                        <div className="bdm-field bdm-full">
                          <label htmlFor="bdm-message">How can we help? (Optional)</label>
                          <textarea
                            className="bdm-textarea"
                            id="bdm-message"
                            name="message"
                            rows={3}
                            placeholder="Tell us about your outlets, current POS, or operational requirements..."
                            value={formData.message}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      {/* Error */}
                      {status === "error" && (
                        <div className="bdm-error" role="alert">
                          {errorMessage}
                        </div>
                      )}

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="bdm-submit"
                      >
                        {status === "submitting" ? (
                          <>
                            <span className="bdm-spinner" />
                            Booking Demo...
                          </>
                        ) : (
                          <>
                            Request Live Demo
                            <Send size={15} />
                          </>
                        )}
                      </button>
                    </form>
                  </>
                ) : (
                  /* Success screen */
                  <motion.div
                    className="bdm-success"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.28 }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 220, delay: 0.1 }}
                    >
                      <CheckCircle2 size={60} className="bdm-success-icon" />
                    </motion.div>
                    <h3 className="bdm-success-title">Demo Booked!</h3>
                    <p className="bdm-success-msg">
                      Thanks! Our team will reach out to you shortly to schedule your personalised walkthrough.
                    </p>
                    <button className="bdm-close-success" onClick={onClose}>
                      Close Window
                    </button>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
