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

