"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

export default function ContactClient() {
  const [form, setForm]       = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // simulate async submit
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", paddingTop: "6rem" }}>
      <div className="container" style={{ maxWidth: 1100, padding: "3rem 1.5rem 6rem" }}>

        {/* back */}
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "var(--text-muted)", fontSize: "0.85rem", fontWeight: 600, marginBottom: "2.5rem", textDecoration: "none" }}>
          <ArrowLeft size={15} /> Back to Home
        </Link>

        <div style={{ marginBottom: "3rem" }}>
          <span style={{ fontSize: "0.7rem", fontWeight: 800, letterSpacing: "2px", color: "var(--accent-orange)", textTransform: "uppercase" }}>Get In Touch</span>
          <h1 style={{ fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 900, letterSpacing: "-2px", marginTop: "0.5rem", marginBottom: "0.75rem" }}>Contact Us</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", maxWidth: 520, lineHeight: 1.6 }}>
            Have a question, need a demo, or want to talk enterprise? We're here — reach out any time.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem" }} className="contact-grid">

          {/* info cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {[
              { icon: <Mail size={20} />, title: "Email Us", value: "support@ordrji.com", color: "#e30613" },
              { icon: <Phone size={20} />, title: "Call Us", value: "+91 98765 43210", color: "#0284c7" },
              { icon: <MapPin size={20} />, title: "Office", value: "Bengaluru, Karnataka, India", color: "#059669" },
            ].map(c => (
              <div key={c.title} style={{ display: "flex", alignItems: "flex-start", gap: "1rem", padding: "1.4rem 1.5rem", background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: 14, borderLeft: `3px solid ${c.color}` }}>
                <span style={{ color: c.color, background: c.color + "14", width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{c.icon}</span>
                <div>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "0.2rem" }}>{c.title}</div>
                  <div style={{ fontWeight: 700, color: "var(--text-primary)" }}>{c.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* form */}
          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: 16, padding: "2.5rem" }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                <CheckCircle size={52} color="#059669" style={{ margin: "0 auto 1rem" }} />
                <h3 style={{ fontWeight: 800, fontSize: "1.4rem", marginBottom: "0.5rem" }}>Message Sent!</h3>
                <p style={{ color: "var(--text-secondary)" }}>We'll get back to you within 24 hours.</p>
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
                    <input className="field-input" name="phone" value={form.phone} onChange={handle} placeholder="+91 98765 43210" />
                  </div>
                  <div className="field-wrap">
                    <label className="field-label">Subject *</label>
                    <select className="field-input" name="subject" value={form.subject} onChange={handle} required>
                      <option value="">Select a topic</option>
                      <option>Book a Demo</option>
                      <option>Pricing Query</option>
                      <option>Technical Support</option>
                      <option>Enterprise / Franchise</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div className="field-wrap">
                  <label className="field-label">Message *</label>
                  <textarea className="field-input" name="message" value={form.message} onChange={handle} required rows={5} placeholder="Tell us about your restaurant and what you need..." style={{ resize: "vertical" }} />
                </div>
                <button type="submit" className="btn-primary" disabled={loading} style={{ justifyContent: "center", padding: "0.85rem", fontSize: "0.95rem", opacity: loading ? 0.7 : 1 }}>
                  {loading ? "Sending…" : <><Send size={16} /> Send Message</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (min-width: 768px) { .contact-grid { grid-template-columns: 360px 1fr !important; } }
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
        .field-input:focus { border-color: var(--accent-orange); box-shadow: 0 0 0 3px rgba(227,6,19,0.08); }
        .field-input::placeholder { color: var(--text-muted); }
      `}</style>
    </div>
  );
}
