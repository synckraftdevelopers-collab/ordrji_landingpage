"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Mail, Phone, MapPin, Building2, Send, CheckCircle2, Sparkles } from "lucide-react";

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
      setStatus("idle");
      setErrorMessage("");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        location: "",
        restaurantName: "",
        message: "",
      });
    }
  }, [isOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Escape key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          location: "",
          restaurantName: "",
          message: "",
        });
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
    <AnimatePresence>
      {isOpen && (
        <div className="modal-root">
          {/* Backdrop Overlay */}
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <div className="modal-container-wrapper">
            <motion.div
              className="modal-card glass-card"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button className="close-btn" onClick={onClose} aria-label="Close modal">
                <X size={20} />
              </button>

              {status !== "success" ? (
                <>
                  {/* Header */}
                  <div className="modal-header">
                    <div className="badge animate-float" style={{ marginBottom: "0.75rem" }}>
                      <Sparkles size={12} style={{ color: "var(--accent-orange)" }} /> Book a Live Demo
                    </div>
                    <h3 className="modal-title gradient-text">See Ordrji in Action</h3>
                    <p className="modal-subtitle">
                      Fill out the form below. Our operations team will walk you through a tailored workspace demo.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-grid">
                      {/* Full Name */}
                      <div className="input-group">
                        <label htmlFor="fullName">Full Name *</label>
                        <div className="input-wrapper">
                          <User size={16} className="input-icon" />
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            required
                            placeholder="John Doe"
                            value={formData.fullName}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      {/* Email Address */}
                      <div className="input-group">
                        <label htmlFor="email">Email Address *</label>
                        <div className="input-wrapper">
                          <Mail size={16} className="input-icon" />
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      {/* Phone Number */}
                      <div className="input-group">
                        <label htmlFor="phone">Phone Number *</label>
                        <div className="input-wrapper">
                          <Phone size={16} className="input-icon" />
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      {/* Restaurant Name */}
                      <div className="input-group">
                        <label htmlFor="restaurantName">Restaurant Name</label>
                        <div className="input-wrapper">
                          <Building2 size={16} className="input-icon" />
                          <input
                            type="text"
                            id="restaurantName"
                            name="restaurantName"
                            placeholder="Spice Kitchen Cafe"
                            value={formData.restaurantName}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      {/* Location */}
                      <div className="input-group full-width">
                        <label htmlFor="location">Restaurant Location / City *</label>
                        <div className="input-wrapper">
                          <MapPin size={16} className="input-icon" />
                          <input
                            type="text"
                            id="location"
                            name="location"
                            required
                            placeholder="Mumbai, Maharashtra"
                            value={formData.location}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      {/* Message */}
                      <div className="input-group full-width">
                        <label htmlFor="message">How can we help? (Optional)</label>
                        <textarea
                          id="message"
                          name="message"
                          rows={3}
                          placeholder="Tell us about your outlets, current POS, or custom operational requirements..."
                          value={formData.message}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Error display */}
                    {status === "error" && <div className="error-banner">{errorMessage}</div>}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="btn-primary submit-button"
                    >
                      {status === "submitting" ? (
                        <>
                          <span className="spinner" /> Booking Demo...
                        </>
                      ) : (
                        <>
                          Request Live Demo <Send size={15} />
                        </>
                      )}
                    </button>
                  </form>
                </>
              ) : (
                /* Success State Screen */
                <motion.div
                  className="success-container"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                    style={{ display: "inline-block" }}
                  >
                    <CheckCircle2 size={64} className="success-icon" />
                  </motion.div>
                  <h3 className="success-title">Thank you!</h3>
                  <p className="success-message">We will connect with you soon.</p>
                  <button className="btn-secondary close-success-btn" onClick={onClose}>
                    Close Window
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Styled CSS */}
          <style jsx>{`
            .modal-root {
              position: fixed;
              inset: 0;
              z-index: 100;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 1rem;
            }

            .modal-overlay {
              position: absolute;
              inset: 0;
              background: rgba(30, 27, 24, 0.55);
              backdrop-filter: blur(8px);
              -webkit-backdrop-filter: blur(8px);
            }

            .modal-container-wrapper {
              position: relative;
              z-index: 10;
              width: 100%;
              max-width: 700px;
              max-height: 90vh;
              display: flex;
              flex-direction: column;
            }

            .modal-card {
              position: relative;
              width: 100%;
              background: var(--bg-primary);
              border: 1px solid var(--border-color);
              box-shadow: 0 40px 80px -20px rgba(30, 27, 24, 0.3),
                          0 0 1px rgba(30, 27, 24, 0.1);
              border-radius: 24px;
              overflow-y: auto;
              max-height: 90vh;
              padding: 2.5rem 2rem;
            }

            /* Override global glass-card hover so the modal card stays stable */
            .modal-card:hover {
              border-color: var(--border-color) !important;
              background: var(--bg-primary) !important;
              box-shadow: 0 40px 80px -20px rgba(30, 27, 24, 0.3),
                          0 0 1px rgba(30, 27, 24, 0.1) !important;
            }

            @media (min-width: 640px) {
              .modal-card {
                padding: 3rem 3.5rem;
              }
            }

            .close-btn {
              position: absolute;
              top: 1.25rem;
              right: 1.25rem;
              background: var(--bg-secondary);
              border: 1px solid var(--border-color);
              color: var(--text-muted);
              cursor: pointer;
              padding: 0.5rem;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              transition: var(--transition-fast);
              z-index: 2;
            }

            .close-btn:hover {
              background: var(--bg-tertiary);
              color: var(--text-primary);
            }

            .modal-header {
              margin-bottom: 2rem;
              padding-right: 2rem;
            }

            .badge {
              display: inline-flex;
              align-items: center;
              gap: 0.5rem;
              background: rgba(227, 6, 19, 0.08);
              border: 1px solid rgba(227, 6, 19, 0.2);
              color: var(--text-primary);
              padding: 0.4rem 1rem;
              border-radius: 9999px;
              font-size: 0.8rem;
              font-weight: 600;
              margin-bottom: 1rem;
            }

            .modal-title {
              font-size: 2rem;
              font-weight: 800;
              letter-spacing: -1.5px;
              margin-bottom: 0.6rem;
              line-height: 1.2;
            }

            @media (min-width: 640px) {
              .modal-title {
                font-size: 2.4rem;
              }
            }

            .modal-subtitle {
              color: var(--text-secondary);
              font-size: 0.95rem;
              line-height: 1.65;
              max-width: 480px;
            }

            .modal-form {
              display: flex;
              flex-direction: column;
              gap: 1.5rem;
            }

            .form-grid {
              display: grid;
              grid-template-columns: 1fr;
              gap: 1.25rem;
            }

            @media (min-width: 540px) {
              .form-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 1.25rem 1.5rem;
              }
              .full-width {
                grid-column: span 2;
              }
            }

            .input-group {
              display: flex;
              flex-direction: column;
              gap: 0.5rem;
            }

            .input-group label {
              font-size: 0.82rem;
              font-weight: 600;
              color: var(--text-primary);
              letter-spacing: 0.2px;
            }

            .input-wrapper {
              position: relative;
              display: flex;
              align-items: center;
            }

            .input-icon {
              position: absolute;
              left: 1rem;
              color: var(--text-muted);
              pointer-events: none;
              flex-shrink: 0;
              transition: color 0.2s;
            }

            .input-wrapper input {
              width: 100%;
              padding: 0.8rem 1rem 0.8rem 2.65rem;
              border-radius: 10px;
              border: 1.5px solid var(--border-color);
              background: var(--bg-secondary);
              color: var(--text-primary);
              font-family: var(--font-sans);
              font-size: 0.92rem;
              transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
              line-height: 1.4;
            }

            .input-wrapper input::placeholder {
              color: var(--text-muted);
            }

            .input-wrapper input:focus {
              outline: none;
              border-color: var(--accent-orange);
              background: #ffffff;
              box-shadow: 0 0 0 3px rgba(227, 6, 19, 0.1);
            }

            .input-wrapper:focus-within .input-icon {
              color: var(--accent-orange);
            }

            .input-group textarea {
              width: 100%;
              padding: 0.9rem 1rem;
              border-radius: 10px;
              border: 1.5px solid var(--border-color);
              background: var(--bg-secondary);
              color: var(--text-primary);
              font-family: var(--font-sans);
              font-size: 0.92rem;
              min-height: 100px;
              resize: vertical;
              transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
              line-height: 1.6;
            }

            .input-group textarea::placeholder {
              color: var(--text-muted);
            }

            .input-group textarea:focus {
              outline: none;
              border-color: var(--accent-orange);
              background: #ffffff;
              box-shadow: 0 0 0 3px rgba(227, 6, 19, 0.1);
            }

            .error-banner {
              background: rgba(220, 38, 38, 0.07);
              border: 1px solid rgba(220, 38, 38, 0.25);
              color: #dc2626;
              padding: 0.75rem 1rem;
              border-radius: 8px;
              font-size: 0.85rem;
            }

            .submit-button {
              width: 100%;
              justify-content: center;
              padding: 0.95rem 1.5rem;
              font-size: 1rem;
              border-radius: 12px;
              margin-top: 0.25rem;
            }

            .submit-button:disabled {
              opacity: 0.65;
              cursor: not-allowed;
              transform: none !important;
              box-shadow: none !important;
            }

            .spinner {
              width: 16px;
              height: 16px;
              border: 2px solid rgba(255, 255, 255, 0.35);
              border-radius: 50%;
              border-top-color: #ffffff;
              animation: spin 0.8s linear infinite;
              display: inline-block;
              flex-shrink: 0;
            }

            @keyframes spin {
              to { transform: rotate(360deg); }
            }

            .success-container {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              padding: 3rem 1rem;
              text-align: center;
              min-height: 320px;
            }

            .success-icon {
              color: var(--accent-green);
              filter: drop-shadow(0 4px 10px rgba(5, 150, 105, 0.25));
              margin-bottom: 1.5rem;
            }

            .success-title {
              font-size: 2rem;
              font-weight: 800;
              color: var(--text-primary);
              margin-bottom: 0.75rem;
            }

            .success-message {
              color: var(--text-secondary);
              font-size: 1rem;
              margin-bottom: 2rem;
              line-height: 1.6;
            }

            .close-success-btn {
              padding: 0.75rem 2.5rem;
              font-size: 0.95rem;
            }
          `}</style>
        </div>
      )}
    </AnimatePresence>
  );
}
