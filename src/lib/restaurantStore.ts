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
}

const KEY = "ordrji_registered_restaurants";

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
