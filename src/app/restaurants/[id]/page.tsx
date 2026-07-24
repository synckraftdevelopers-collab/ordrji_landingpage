"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookDemoModal from "@/components/BookDemoModal";
import RegisterRestaurantModal from "@/components/RegisterRestaurantModal";
import RestaurantProfileView from "@/components/restaurant/RestaurantProfileView";
import { 
  getStoredRestaurants, StoredRestaurant, SEED_IDS, getRestaurantRating, RESTAURANTS 
} from "@/lib/restaurantStore";
import { Loader2, Utensils, ArrowLeft } from "lucide-react";

export default function RestaurantDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [extraRestaurants, setExtraRestaurants] = useState<StoredRestaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  // Load all restaurants to search for the specific one
  useEffect(() => {
    let isMounted = true;
    const fetchRestaurants = async () => {
      await Promise.resolve();
      if (!isMounted) return;
      setLoading(true);
      try {
        const res = await fetch("/api/restaurants");
        const data = await res.json();
        if (isMounted && data.success) {
          setExtraRestaurants(data.restaurants ?? []);
        }
      } catch (err) {
        console.error("Failed to fetch restaurants:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchRestaurants();
    return () => { isMounted = false; };
  }, [refreshKey]);

  // Combine and find the specific restaurant
  const restaurant = useMemo(() => {
    if (!id) return null;

    // Build extra mapped
    const extraMapped = extraRestaurants.map((r: StoredRestaurant, index: number) => {
      const { rating, reviewsCount } = getRestaurantRating(String(r.id), 0, 0);
      const fallbackLogos = [
        "/images/logos/kitchen365.jpg",
        "/images/logos/mirabel.jpg",
        "/images/logos/upabove.jpg",
        "/images/logos/gulmohar.jpg",
        "/images/logos/eagle.jpg",
        "/images/logos/mansarovar.jpg",
        "/images/logos/shivai.jpg",
        "/images/logos/virsa.jpg"
      ];
      const fallbackCovers = [
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=600"
      ];
      const assignedLogo = r.logoUrl && !r.logoUrl.startsWith("blob:")
        ? r.logoUrl
        : fallbackLogos[index % fallbackLogos.length];
      const assignedCover = r.coverImageUrl || fallbackCovers[index % fallbackCovers.length];

      return {
        id: String(r.id), 
        name: r.name, 
        cuisine: r.cuisine,
        type: r.type as "veg" | "nonveg" | "both",
        city: r.city, 
        area: r.area, 
        rating, 
        reviews: reviewsCount,
        deliveryTime: r.openingTime && r.closingTime ? `${r.openingTime}–${r.closingTime}` : "—",
        avgCost: r.avgCost, 
        dishes: r.dishes,
        image: assignedCover,
        badge: "Registered", 
        badgeColor: "#059669",
        open: true, 
        swiggy: !!r.swiggyUrl, 
        zomato: !!r.zomatoUrl,
        swiggyUrl: r.swiggyUrl, 
        zomatoUrl: r.zomatoUrl,
        phone: r.phone,
        email: r.email,
        address: r.address,
        baseRating: 0,
        baseReviewsCount: 0,
        logoUrl: assignedLogo
      };
    });

    // Build demo mapped
    const demoMapped = RESTAURANTS.map((r: typeof RESTAURANTS[0]) => {
      const stringId = "seed-" + r.id;
      const baseRating = [4.5, 4.7, 4.2, 4.6, 4.8, 4.3, 4.4, 4.6][(r.id - 1) % 8];
      const baseReviewsCount = [312, 528, 184, 401, 762, 256, 190, 334][(r.id - 1) % 8];
      const { rating, reviewsCount } = getRestaurantRating(stringId, baseRating, baseReviewsCount);
      return {
        ...r,
        id: stringId,
        rating,
        reviews: reviewsCount,
        baseRating,
        baseReviewsCount,
        swiggyUrl: undefined,
        zomatoUrl: undefined,
        phone: "",
        email: "",
        address: "",
        logoUrl: undefined
      };
    });

    const combined = [...extraMapped, ...demoMapped];
    return combined.find((r) => String(r.id) === String(id)) || null;
  }, [id, extraRestaurants]);

  return (
    <>
      <Navbar onBookDemo={() => setIsDemoOpen(true)} onRegister={() => setRegisterOpen(true)} />

      <main style={{ background: "#f8fafc", minHeight: "100vh", paddingTop: "5.5rem", paddingBottom: "4rem" }}>
        <div style={{ width: "100%", maxWidth: "100%" }}>
          
          {loading ? (
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "400px" }}>
              <Loader2 size={44} style={{ animation: "spin 1s linear infinite" }} color="#E30613" />
              <p style={{ marginTop: "1rem", color: "#64748b", fontWeight: 600 }}>Loading restaurant profile...</p>
            </div>
          ) : !restaurant ? (
            <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "24px", padding: "4rem 2rem", textAlign: "center", boxShadow: "0 10px 30px rgba(0,0,0,0.03)", maxWidth: "600px", margin: "0 auto" }}>
              <Utensils size={48} color="#cbd5e1" style={{ marginBottom: "1rem" }} />
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a", margin: "0 0 0.5rem" }}>Restaurant Not Found</h2>
              <p style={{ color: "#64748b", margin: "0 0 1.5rem" }}>The restaurant you are looking for does not exist or has been removed.</p>
              <button 
                onClick={() => router.push("/restaurants")}
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.5rem", background: "#E30613", color: "#fff", border: "none", borderRadius: "12px", fontSize: "0.9rem", fontWeight: 700, cursor: "pointer" }}
              >
                <ArrowLeft size={16} /> Back to Directory
              </button>
            </div>
          ) : (
            <div style={{ background: "#fff", borderRadius: "24px", overflow: "hidden", border: "1px solid #e2e8f0", boxShadow: "0 20px 50px rgba(0,0,0,0.05)" }}>
              <RestaurantProfileView 
                restaurant={restaurant} 
                onBack={() => router.push("/restaurants")}
                onReviewAdded={() => setRefreshKey(k => k + 1)}
              />
            </div>
          )}

        </div>
      </main>

      <Footer />
      <BookDemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
      <RegisterRestaurantModal isOpen={registerOpen} onClose={() => setRegisterOpen(false)} onSuccess={() => setRefreshKey(k => k + 1)} />

      <style jsx global>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}
