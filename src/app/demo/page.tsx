"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2, Send, Building2, User, Mail, Phone, MapPin, Briefcase, Clock, ShieldCheck, Star, Sparkles } from "lucide-react";
import LocationAutocomplete from "@/components/LocationAutocomplete";

export default function BookDemoPage() {
  const [formData, setFormData] = useState(() => {
    let initialLocation = "";
    if (typeof window !== "undefined") {
      initialLocation = sessionStorage.getItem("prefilled_location") ?? "";
      if (initialLocation) sessionStorage.removeItem("prefilled_location");
    }
    return {
      fullName: "",
      email: "",
      phone: "",
      location: initialLocation,
      restaurantName: "",
      restaurantType: "",
      currentPos: "",
      preferredTime: "",
    };
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const compiledMessage = `Restaurant Format: ${formData.restaurantType} | Current POS: ${formData.currentPos} | Preferred Time: ${formData.preferredTime}`;
      
      const response = await fetch("/api/book-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          location: formData.location, // maps to location
          restaurantName: formData.restaurantName,
          message: compiledMessage
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Failed to book demo. Please try again.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      setStatus("error");
      setErrorMessage("Network error. Please check your internet connection.");
    }
  };

  return (
    <>
      <Navbar onBookDemo={() => {}} onRegister={() => {}} />

      <main style={{ minHeight: "100vh", background: "var(--bg-primary)", paddingTop: "6rem" }}>
        <div className="container" style={{ maxWidth: 1100, padding: "3rem 1.5rem 6rem" }}>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3.5rem" }} className="booking-grid">
            
            {/* Left Pane: Value props and trust badges */}
            <div style={{ display: "flex", flexDirection: "column", justifySelf: "center" }}>
              <span className="booking-badge font-semibold">
                <Sparkles size={11} style={{ color: "#da0404" }} /> Personalized Walkthrough
              </span>
              <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, letterSpacing: "-2px", marginTop: "0.5rem", marginBottom: "1.25rem" }}>
                Experience the Future of Restaurant Work.
              </h1>
              <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: "1.6", marginBottom: "2rem" }}>
                See how Ordrji connects your floor billing, mobile QR orders, kitchen screens, and warehouse recipes in one real-time cloud terminal.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2.5rem" }}>
                {[
                  { icon: <ShieldCheck size={20} />, title: "Tailored to Your Format", desc: "Whether you run a QSR chain, fine dining, cafe, or cloud kitchen, we customize the demo data for you." },
                  { icon: <Clock size={20} />, title: "Zero Pressure, 20-Min Session", desc: "A quick, concise product walk-through focusing only on features that resolve your immediate bottlenecks." },
                  { icon: <Star size={20} />, title: "Free Migration Blueprint", desc: "Our specialists will map out how we can migrate your menus and loyalty profiles from legacy POS apps." }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <div style={{ color: "var(--accent-orange)", background: "rgba(227,6,19,0.06)", padding: "0.5rem", borderRadius: 8, flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 style={{ fontSize: "0.95rem", fontWeight: 700, margin: 0, color: "var(--text-primary)" }}>{item.title}</h4>
                      <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "0.15rem", lineHeight: 1.4 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust Badge Bar */}
              <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1.5rem", display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)" }}>3,500+</div>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Outlets Active</div>
                </div>
                <div>
                  <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)" }}>99.99%</div>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Uptime SLA</div>
                </div>
                <div>
                  <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)" }}>0%</div>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Order Commission</div>
                </div>
              </div>
            </div>

            {/* Right Pane: Interactive Form Card */}
            <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: 24, padding: "2.5rem", boxShadow: "0 20px 50px rgba(90,80,70,0.04)" }} className="glass-card">
              
              {status === "success" ? (
                <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
                  <CheckCircle2 size={56} color="#059669" style={{ margin: "0 auto 1.25rem", filter: "drop-shadow(0 4px 10px rgba(5,150,105,0.25))" }} />
                  <h3 style={{ fontSize: "1.8rem", fontWeight: 800, letterSpacing: "-1px", marginBottom: "0.5rem" }}>Demo Booked!</h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6, maxWidth: "320px", margin: "0 auto 1.5rem" }}>
                    Thank you! Our onboarding specialist will reach out to you within 24 hours to schedule your custom session.
                  </p>
                  <Link href="/" className="btn-secondary" style={{ padding: "0.6rem 2rem", borderRadius: "9999px", display: "inline-flex", textDecoration: "none" }}>
                    Back to Homepage
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.1rem" }} className="form-row">
                    <div className="field-wrap">
                      <label className="field-label">Full Name *</label>
                      <div className="input-box">
                        <User size={15} className="input-icon" />
                        <input className="field-input" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Arjun Sharma" />
                      </div>
                    </div>

                    <div className="field-wrap">
                      <label className="field-label">Email Address *</label>
                      <div className="input-box">
                        <Mail size={15} className="input-icon" />
                        <input className="field-input" type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="arjun@restaurant.com" />
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.1rem" }} className="form-row">
                    <div className="field-wrap">
                      <label className="field-label">Phone Number *</label>
                      <div className="input-box">
                        <Phone size={15} className="input-icon" />
                        <input className="field-input" type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+91 98677 99655" />
                      </div>
                    </div>

                    <div className="field-wrap">
                      <label className="field-label">Restaurant Name *</label>
                      <div className="input-box">
                        <Building2 size={15} className="input-icon" />
                        <input className="field-input" name="restaurantName" value={formData.restaurantName} onChange={handleChange} required placeholder="Spice Kitchen" />
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.1rem" }} className="form-row">
                    <div className="field-wrap">
                      <label className="field-label">Restaurant Format *</label>
                      <div className="input-box">
                        <Briefcase size={15} className="input-icon" />
                        <select className="field-input select-input" name="restaurantType" value={formData.restaurantType} onChange={handleChange} required>
                          <option value="">Select Format</option>
                          <option value="Fine Dining">Fine Dining</option>
                          <option value="Quick Service (QSR)">Quick Service (QSR)</option>
                          <option value="Cafe & Bistro">Cafe &amp; Bistro</option>
                          <option value="Cloud Kitchen">Cloud Kitchen</option>
                          <option value="Franchise Chain">Franchise Chain</option>
                        </select>
                      </div>
                    </div>

                    <div className="field-wrap">
                      <label className="field-label">City *</label>
                      <div className="input-box">
                        <MapPin size={15} className="input-icon" />
                        <LocationAutocomplete
                          value={formData.location}
                          onChange={(val) => setFormData((prev) => ({ ...prev, location: val }))}
                          placeholder="Search State, District or City..."
                          name="location"
                          required
                          inputClassName="field-input"
                        />
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.1rem" }} className="form-row">
                    <div className="field-wrap">
                      <label className="field-label">Current POS System *</label>
                      <div className="input-box">
                        <Briefcase size={15} className="input-icon" />
                        <select className="field-input select-input" name="currentPos" value={formData.currentPos} onChange={handleChange} required>
                          <option value="">Select POS</option>
                          <option value="None">None (Excel / Paper billing)</option>
                          <option value="Petpooja">Petpooja</option>
                          <option value="Posist">Posist</option>
                          <option value="Vyapar">Vyapar</option>
                          <option value="Toast">Toast POS</option>
                          <option value="Other">Other Legacy POS</option>
                        </select>
                      </div>
                    </div>

                    <div className="field-wrap">
                      <label className="field-label">Preferred Demo Time *</label>
                      <div className="input-box">
                        <Clock size={15} className="input-icon" />
                        <select className="field-input select-input" name="preferredTime" value={formData.preferredTime} onChange={handleChange} required>
                          <option value="">Select Preferred Slot</option>
                          <option value="Morning (10 AM - 12 PM)">Morning (10 AM - 12 PM)</option>
                          <option value="Afternoon (2 PM - 5 PM)">Afternoon (2 PM - 5 PM)</option>
                          <option value="Evening (5 PM - 7 PM)">Evening (5 PM - 7 PM)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {errorMessage && (
                    <div style={{ background: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.2)", borderRadius: 8, padding: "0.7rem", fontSize: "0.82rem", color: "#b91c1c" }}>
                      {errorMessage}
                    </div>
                  )}

                  <button type="submit" disabled={status === "submitting"} className="btn-primary btn-orange" style={{ justifyContent: "center", padding: "0.85rem", fontSize: "0.95rem", marginTop: "0.5rem" }}>
                    {status === "submitting" ? "Booking Demo..." : <><Send size={15} /> Book Free Demo</>}
                  </button>

                </form>
              )}

            </div>

          </div>
        </div>
      </main>

      <Footer />

      <style jsx global>{`
        .booking-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          background: rgba(227, 6, 19, 0.06);
          border: 1px solid rgba(227, 6, 19, 0.18);
          color: #E30613;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.7rem;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 1rem;
          align-self: flex-start;
        }

        .field-wrap {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .field-label {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-secondary);
          letter-spacing: 0.2px;
        }
        
        .input-box {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
        }

        .input-icon {
          position: absolute;
          left: 0.85rem;
          color: var(--text-muted);
          pointer-events: none;
          display: flex;
          align-items: center;
        }

        .input-box:focus-within .input-icon {
          color: #E30613;
        }

        .field-input {
          padding: 0.7rem 0.9rem 0.7rem 2.4rem;
          border-radius: 10px;
          border: 1px solid var(--border-color);
          background: var(--bg-primary);
          color: var(--text-primary);
          font-size: 0.9rem;
          font-family: var(--font-sans);
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          width: 100%;
        }

        .field-input:focus {
          border-color: #E30613;
          box-shadow: 0 0 0 3px rgba(227,6,19,0.08);
          background: #fff;
        }

        .select-input {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%238c7d6e'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.85rem center;
          background-size: 1rem;
          padding-right: 2.2rem;
        }

        @media (min-width: 768px) {
          .booking-grid {
            grid-template-columns: 0.95fr 1.05fr !important;
          }
        }
        
        @media (max-width: 600px) {
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }

        .btn-orange {
          background: #E30613 !important;
          color: #fff !important;
          border: 1px solid transparent !important;
        }
        .btn-orange:hover {
          background: #be0303 !important;
          box-shadow: 0 8px 20px -6px rgba(227, 6, 19, 0.45);
        }
      `}</style>
    </>
  );
}
