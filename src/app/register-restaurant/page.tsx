"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookDemoModal from "@/components/BookDemoModal";
import RegistrationForm from "@/components/restaurant/RegistrationForm";
import { RestaurantPrefill } from "@/components/restaurant/RegistrationForm";

function RegisterRestaurantContent() {
  const searchParams = useSearchParams();
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  // Build prefill from URL query params (e.g. from /restaurants "Register This Restaurant" button)
  const urlPrefill: RestaurantPrefill | undefined = useMemo(() => {
    const name = searchParams.get("name");
    if (!name) return undefined;
    return {
      restaurantName: name,
      cuisineType:    searchParams.get("cuisine") ?? undefined,
      restaurantType: (searchParams.get("type") as RestaurantPrefill["restaurantType"]) ?? undefined,
      city:           searchParams.get("city") ?? undefined,
    };
  }, [searchParams]);

  return (
    <div className="register-restaurant-page">
      <Navbar
        onBookDemo={() => setIsDemoOpen(true)}
      />

      <main style={{ background: "#f8fafc", minHeight: "100vh", paddingTop: "7.5rem", paddingBottom: "5rem" }}>
        <div className="container" style={{ maxWidth: "1200px" }}>
          
          <div className="rr-pg-form-header" style={{ marginBottom: "2.5rem", textAlign: "center" }}>
            <span className="rr-pg-badge" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "rgba(227,6,19,0.1)", border: "1px solid rgba(227,6,19,0.25)", color: "#E30613", padding: "0.3rem 0.9rem", borderRadius: "9999px", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.6px", textTransform: "uppercase" }}>
              🍴 Restaurant Portal
            </span>
            <h1 className="rr-pg-title" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, letterSpacing: "-1.5px", lineHeight: 1.12, color: "#0f172a", marginTop: "0.75rem", marginBottom: "0.9rem" }}>
              Register Your Restaurant on <span style={{ background: "linear-gradient(120deg, #E30613, #bd040f)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Ordrji</span>
            </h1>
            <p className="rr-pg-sub" style={{ fontSize: "1rem", color: "#64748b", margin: "0 auto", maxWidth: "600px" }}>
              Fill in your details below to get discovered, connect Swiggy & Zomato, and grow your online presence — all for free.
            </p>
          </div>

          <RegistrationForm
            prefill={urlPrefill}
            onSuccessModalClose={() => {
              window.location.href = "/";
            }}
          />
        </div>
      </main>

      <Footer />
      <BookDemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </div>
  );
}

export default function RegisterRestaurantPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc" }}>
        <div style={{ textAlign: "center", color: "#94a3b8" }}>Loading…</div>
      </div>
    }>
      <RegisterRestaurantContent />
    </Suspense>
  );
}
