// Shared localStorage store for registered restaurants
// Used by both /register-restaurant and /restaurants pages

export interface StoredRestaurant {
  id: string;
  name: string;
  cuisine: string;
  type: "veg" | "nonveg" | "both";
  city: string;
  area: string;
  dishes: string[];
  swiggyUrl?: string;
  zomatoUrl?: string;
  avgCost: number;
  openingTime: string;
  closingTime: string;
  ownerName: string;
  phone: string;
  email: string;
  registeredAt: string;
  badge: string;
  badgeColor: string;
  address?: string;
  logoUrl?: string;
  coverImageUrl?: string;
}

export interface RestaurantReview {
  id: string;
  restaurantId: string;
  rating: number;
  reviewerName: string;
  comment: string;
  createdAt: string;
}

const KEY = "ordrji_registered_restaurants";
const REVIEWS_KEY = "ordrji_restaurant_reviews";

export const SEED_IDS = [
  "seed-1","seed-2","seed-3","seed-4","seed-5","seed-6","seed-7","seed-8"
];

export function getStoredRestaurants(): StoredRestaurant[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveRestaurant(r: StoredRestaurant): void {
  if (typeof window === "undefined") return;
  const existing = getStoredRestaurants();
  localStorage.setItem(KEY, JSON.stringify([r, ...existing]));
}

export function getStoredReviews(restaurantId?: string): RestaurantReview[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(REVIEWS_KEY);
    const reviews: RestaurantReview[] = raw ? JSON.parse(raw) : [];
    if (restaurantId) {
      const stringId = String(restaurantId);
      return reviews.filter(rev => String(rev.restaurantId) === stringId);
    }
    return reviews;
  } catch {
    return [];
  }
}

export function saveReview(rev: RestaurantReview): void {
  if (typeof window === "undefined") return;
  try {
    const existing = getStoredReviews();
    localStorage.setItem(REVIEWS_KEY, JSON.stringify([rev, ...existing]));
  } catch (e) {
    console.error("Error saving review:", e);
  }
}

export function getRestaurantRating(
  restaurantId: string | number,
  baseRating: number,
  baseReviewsCount: number
): { rating: number; reviewsCount: number } {
  const stringId = String(restaurantId);
  const reviews = getStoredReviews(stringId);
  if (reviews.length === 0) {
    return { rating: baseRating, reviewsCount: baseReviewsCount };
  }
  const totalBaseRating = baseRating * baseReviewsCount;
  const totalUserRating = reviews.reduce((sum, r) => sum + r.rating, 0);
  const totalCount = baseReviewsCount + reviews.length;
  const average = totalCount > 0 ? Math.round(((totalBaseRating + totalUserRating) / totalCount) * 10) / 10 : 0;
  return { rating: average, reviewsCount: totalCount };
}

export const RESTAURANTS = [
  {
    id: 1, name: "Spice Garden", cuisine: "North Indian", type: "both" as const,
    city: "Mumbai", area: "Andheri West", rating: 4.5, reviews: 312,
    deliveryTime: "25–35 min", avgCost: 450,
    dishes: ["Biryani", "Butter Chicken", "Dal Makhani", "Naan", "Lassi"],
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=600",
    badge: "Popular", badgeColor: "#E30613", open: true, swiggy: true, zomato: true,
  },
  {
    id: 2, name: "The Dosa House", cuisine: "South Indian", type: "veg" as const,
    city: "Bengaluru", area: "Koramangala", rating: 4.7, reviews: 528,
    deliveryTime: "20–30 min", avgCost: 200,
    dishes: ["Masala Dosa", "Idli Sambhar", "Vada", "Filter Coffee", "Rava Upma"],
    image: "https://images.unsplash.com/photo-1567337710282-00832b415979?auto=format&fit=crop&q=80&w=600",
    badge: "Top Rated", badgeColor: "#16a34a", open: true, swiggy: true, zomato: false,
  },
  {
    id: 3, name: "Dragon Palace", cuisine: "Chinese", type: "both" as const,
    city: "Delhi", area: "Connaught Place", rating: 4.2, reviews: 184,
    deliveryTime: "30–40 min", avgCost: 550,
    dishes: ["Hakka Noodles", "Manchurian", "Spring Roll", "Fried Rice", "Momos"],
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=600",
    badge: "", badgeColor: "", open: true, swiggy: false, zomato: true,
  },
  {
    id: 4, name: "Chai & Bites Cafe", cuisine: "Cafe", type: "veg" as const,
    city: "Pune", area: "Kalyani Nagar", rating: 4.6, reviews: 401,
    deliveryTime: "15–25 min", avgCost: 300,
    dishes: ["Masala Chai", "Sandwich", "Croissant", "Cold Coffee", "Waffles"],
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=600",
    badge: "New", badgeColor: "#7c3aed", open: true, swiggy: true, zomato: true,
  },
  {
    id: 5, name: "Biryani Brothers", cuisine: "Biryani", type: "nonveg" as const,
    city: "Hyderabad", area: "Banjara Hills", rating: 4.8, reviews: 762,
    deliveryTime: "35–45 min", avgCost: 380,
    dishes: ["Chicken Biryani", "Mutton Biryani", "Prawn Biryani", "Raita", "Kebab"],
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=600",
    badge: "Trending", badgeColor: "#dc2626", open: true, swiggy: true, zomato: true,
  },
  {
    id: 6, name: "Pizza Peak", cuisine: "Pizza", type: "both" as const,
    city: "Chennai", area: "T. Nagar", rating: 4.3, reviews: 256,
    deliveryTime: "25–35 min", avgCost: 600,
    dishes: ["Margherita", "Pepperoni", "BBQ Chicken", "Garlic Bread", "Pasta"],
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600",
    badge: "", badgeColor: "", open: false, swiggy: false, zomato: true,
  },
  {
    id: 7, name: "Street Bites", cuisine: "Street Food", type: "veg" as const,
    city: "Jaipur", area: "MI Road", rating: 4.4, reviews: 190,
    deliveryTime: "20–30 min", avgCost: 150,
    dishes: ["Pav Bhaji", "Vada Pav", "Samosa", "Chole Bhature", "Jalebi"],
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=600",
    badge: "Budget Friendly", badgeColor: "#0284c7", open: true, swiggy: true, zomato: false,
  },
  {
    id: 8, name: "The Mughal Table", cuisine: "Mughlai", type: "nonveg" as const,
    city: "Lucknow", area: "Hazratganj", rating: 4.6, reviews: 334,
    deliveryTime: "40–50 min", avgCost: 700,
    dishes: ["Nihari", "Galouti Kebab", "Sheermal", "Korma", "Phirni"],
    image: "https://images.unsplash.com/photo-1567337710282-00832b415979?auto=format&fit=crop&q=80&w=600",
    badge: "Premium", badgeColor: "#b45309", open: true, swiggy: false, zomato: true,
  },
];

