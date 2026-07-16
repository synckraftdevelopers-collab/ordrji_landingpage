"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookDemoModal from "@/components/BookDemoModal";
import RegisterRestaurantModal from "@/components/RegisterRestaurantModal";
import { ArrowLeft, MapPin, Send, CheckCircle, ExternalLink, HelpCircle } from "lucide-react";
import LocationAutocomplete from "@/components/LocationAutocomplete";

export default function ContactClient() {
  const [form, setForm]       = useState({ name: "", email: "", phone: "", location: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        alert(result.error || "Failed to send message. Please try again.");
      } else {
        setSubmitted(true);
      }
    } catch (err) {
      console.error("Error submitting contact form:", err);
      alert("An unexpected error occurred. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar onBookDemo={() => setIsDemoModalOpen(true)} onRegister={() => setIsRegisterModalOpen(true)} />

      <div style={{ minHeight: "100vh", background: "var(--bg-primary)", paddingTop: "6rem" }}>
        <div className="container" style={{ maxWidth: 1100, padding: "3rem 1.5rem 6rem" }}>

          {/* back */}
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "var(--text-muted)", fontSize: "0.85rem", fontWeight: 600, marginBottom: "2.5rem", textDecoration: "none" }}>
            <ArrowLeft size={15} /> Back to Home
          </Link>

          <div style={{ marginBottom: "3rem" }}>
            <h1 style={{ fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 900, letterSpacing: "-2px", marginTop: "0.5rem", marginBottom: "0.75rem" }}>Contact Us</h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", maxWidth: 520, lineHeight: 1.6 }}>
              Have a question, need a demo, or want to talk enterprise? We&apos;re here &mdash; reach out any time.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem" }} className="contact-grid">

            {/* Left Column: Support & Map */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {/* Support Links */}
              <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: 14, padding: "1.5rem" }}>
                <h4 style={{ fontSize: "0.8rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <HelpCircle size={14} /> Quick Support Links
                </h4>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem", padding: 0 }}>
                  <li>
                    <Link href="/faq" style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontSize: "0.9rem", color: "var(--text-secondary)", textDecoration: "none", fontWeight: 600 }} className="hover-link">
                      Frequently Asked Questions <ExternalLink size={12} />
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontSize: "0.9rem", color: "var(--text-secondary)", textDecoration: "none", fontWeight: 600 }} className="hover-link">
                      Terms of Service <ExternalLink size={12} />
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontSize: "0.9rem", color: "var(--text-secondary)", textDecoration: "none", fontWeight: 600 }} className="hover-link">
                      Privacy Policy <ExternalLink size={12} />
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Map location & embed */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-secondary)" }}>
                  <MapPin size={15} color="var(--accent-orange)" />
                  <span>414, 4th Floor, Daga Plazzo Biyani Square, opp. Dmart Camp, Amravati, Maharashtra 444602</span>
                </div>
                <div style={{ border: "1px solid var(--border-color)", borderRadius: 14, overflow: "hidden", height: 220, position: "relative" }}>
                  <iframe
                    title="Ordrji Office Location — Amravati"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.5!2d77.7499!3d20.9340!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd6a9a3a3a3a3a3%3A0x0!2sDaga+Plazzo+Biyani+Square%2C+Amravati%2C+Maharashtra+444602!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <a
                  href="https://maps.app.goo.gl/b9Zyj2N5KVkLDRWG6"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontSize: "0.8rem", fontWeight: 600, color: "var(--accent-orange)", textDecoration: "none" }}
                >
                  <MapPin size={12} /> Open in Google Maps
                </a>
              </div>

            </div>{/* end left column */}

            {/* Right Column: Contact Form */}
            <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: 16, padding: "2.5rem", boxShadow: "0 10px 30px rgba(0,0,0,0.01)" }}>
              {submitted ? (
                <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                  <CheckCircle size={52} color="#059669" style={{ margin: "0 auto 1rem" }} />
                  <h3 style={{ fontWeight: 800, fontSize: "1.4rem", marginBottom: "0.5rem" }}>Message Sent!</h3>
                  <p style={{ color: "var(--text-secondary)" }}>We&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-row">
                    <div className="field-wrap">
                      <label className="field-label">Full Name *</label>
                      <input className="field-input" name="name" value={form.name} onChange={handle} required placeholder="Arjun Sharma" />
                    </div>
                    <div className="field-wrap">
                      <label className="field-label">Email *</label>
                      <input className="field-input" name="email" type="email" value={form.email} onChange={handle} required placeholder="arjun@restaurant.com" />
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-row">
                    <div className="field-wrap">
                      <label className="field-label">Phone</label>
                      <input className="field-input" name="phone" value={form.phone} onChange={handle} placeholder="+91 98677 99655" />
                    </div>
                    <div className="field-wrap">
                      <label className="field-label">Location *</label>
                      <LocationAutocomplete
                        value={form.location}
                        onChange={(val) => setForm((prev) => ({ ...prev, location: val }))}
                        placeholder="Search State, District or City..."
                        name="location"
                        required
                        inputClassName="field-input"
                      />
                    </div>
                  </div>
                  <div className="field-wrap">
                    <label className="field-label">Subject *</label>
                    <select className="field-input" name="subject" value={form.subject} onChange={handle} required style={{ appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%238c7d6e'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 0.85rem center", backgroundSize: "1rem" }}>
                      <option value="">Select a topic</option>
                      <option>Book a Demo</option>
                      <option>Pricing Query</option>
                      <option>Technical Support</option>
                      <option>Enterprise / Franchise</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="field-wrap">
                    <label className="field-label">Message *</label>
                    <textarea className="field-input" name="message" value={form.message} onChange={handle} required rows={5} placeholder="Tell us about your restaurant and what you need..." style={{ resize: "vertical" }} />
                  </div>
                  <button type="submit" className="btn-primary" disabled={loading} style={{ justifyContent: "center", padding: "0.85rem", fontSize: "0.95rem", opacity: loading ? 0.7 : 1, background: "#E30613" }}>
                    {loading ? "Sending…" : <><Send size={16} /> Send Message</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <BookDemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
      <RegisterRestaurantModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />

      <style jsx global>{`
        @media (min-width: 768px) { .contact-grid { grid-template-columns: 380px 1fr !important; } }
        @media (max-width: 640px)  { .form-row { grid-template-columns: 1fr !important; } }
        .field-wrap { display: flex; flex-direction: column; gap: 0.35rem; }
        .field-label { font-size: 0.78rem; font-weight: 700; color: var(--text-secondary); letter-spacing: 0.3px; }
        .field-input {
          padding: 0.7rem 0.9rem; border-radius: 10px;
          border: 1px solid var(--border-color);
          background: var(--bg-primary); color: var(--text-primary);
          font-size: 0.9rem; font-family: var(--font-sans);
          outline: none; transition: border-color 0.2s, box-shadow 0.2s;
          width: 100%;
        }
        .field-input:focus { border-color: #E30613; box-shadow: 0 0 0 3px rgba(227,6,19,0.08); background: #fff; }
        .field-input::placeholder { color: var(--text-muted); }
        
        .hover-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(90,80,70,0.05) !important;
        }

        .hover-link:hover {
          color: #E30613 !important;
        }
      `}</style>
    </>
  );
}
