"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  ArrowLeft, Star, MapPin, Utensils, Clock, 
  IndianRupee, MessageSquare, Send, User, Calendar,
  ExternalLink, Leaf, Flame, Zap, Phone, Mail
} from "lucide-react";
import { 
  RestaurantReview, getStoredReviews, saveReview, getRestaurantRating 
} from "@/lib/restaurantStore";

interface RestaurantProfileViewProps {
  restaurant: {
    id: string | number;
    name: string;
    cuisine: string;
    type: "veg" | "nonveg" | "both";
    city: string;
    area: string;
    dishes: string[];
    image: string;
    badge?: string;
    badgeColor?: string;
    avgCost: number;
    openingTime?: string;
    closingTime?: string;
    deliveryTime?: string;
    swiggy?: boolean;
    zomato?: boolean;
    swiggyUrl?: string;
    zomatoUrl?: string;
    phone?: string;
    email?: string;
    address?: string;
    baseRating?: number;
    baseReviewsCount?: number;
  };
  onBack: () => void;
  onReviewAdded?: () => void;
}

export default function RestaurantProfileView({ restaurant, onBack, onReviewAdded }: RestaurantProfileViewProps) {
  // Base values for reviews calculation
  const baseRating = restaurant.baseRating ?? (typeof restaurant.id === "number" ? [4.5, 4.7, 4.2, 4.6, 4.8, 4.3, 4.4, 4.6][(restaurant.id - 1) % 8] : 0);
  const baseReviewsCount = restaurant.baseReviewsCount ?? (typeof restaurant.id === "number" ? [312, 528, 184, 401, 762, 256, 190, 334][(restaurant.id - 1) % 8] : 0);

  // Dynamic rating and reviews list
  const [reviews, setReviews] = useState<RestaurantReview[]>([]);
  const [ratingInfo, setRatingInfo] = useState({ rating: baseRating, reviewsCount: baseReviewsCount });

  // Review Form State
  const [reviewerName, setReviewerName] = useState("");
  const [formRating, setFormRating] = useState(5);
  const [comment, setComment] = useState("");
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // Load reviews
    const stored = getStoredReviews(String(restaurant.id));
    // eslint-disable-next-line
    setReviews(stored);
    
    // Calculate live rating
    const info = getRestaurantRating(String(restaurant.id), baseRating, baseReviewsCount);
    setRatingInfo(info);
  }, [restaurant.id, baseRating, baseReviewsCount]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSubmitSuccess(false);

    if (!reviewerName.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }
    if (!comment.trim()) {
      setErrorMsg("Please write a comment.");
      return;
    }

    const newReview: RestaurantReview = {
      id: `rev-${Date.now()}`,
      restaurantId: String(restaurant.id),
      rating: formRating,
      reviewerName: reviewerName.trim(),
      comment: comment.trim(),
      createdAt: new Date().toISOString()
    };

    saveReview(newReview);
    
    // Update local state
    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    
    const info = getRestaurantRating(String(restaurant.id), baseRating, baseReviewsCount);
    setRatingInfo(info);

    // Reset Form
    setReviewerName("");
    setComment("");
    setFormRating(5);
    setSubmitSuccess(true);

    if (onReviewAdded) {
      onReviewAdded();
    }
  };

  const formattedCost = restaurant.avgCost 
    ? `₹${restaurant.avgCost} for two` 
    : "Cost not specified";

  const formattedTimings = restaurant.openingTime && restaurant.closingTime
    ? `${restaurant.openingTime} - ${restaurant.closingTime}`
    : restaurant.deliveryTime || "Timings not specified";

  // Safe fallback URLs
  const swiggyLink = restaurant.swiggyUrl || `https://www.swiggy.com/search?query=${encodeURIComponent(restaurant.name)}`;
  const zomatoLink = restaurant.zomatoUrl || `https://www.zomato.com/directory`;

  return (
    <div className="rp-view">
      {/* Navigation Header */}
      <button onClick={onBack} className="rp-back-btn">
        <ArrowLeft size={16} /> Back to Search results
      </button>

      {/* Hero Section */}
      <div className="rp-hero-banner">
        <Image 
          src={restaurant.image || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200"}
          alt={restaurant.name}
          fill
          priority
          className="rp-hero-img"
        />
        <div className="rp-hero-overlay" />
        
        {/* Badges on Hero */}
        <div className="rp-hero-badges">
          {restaurant.badge && (
            <span className="rp-hero-badge" style={{ backgroundColor: restaurant.badgeColor || "#7c3aed" }}>
              {restaurant.badge}
            </span>
          )}
          <span className="rp-type-badge">
            {restaurant.type === "veg" ? (
              <span className="flex-center gap-1"><Leaf size={12} color="#16a34a" /> Pure Veg</span>
            ) : restaurant.type === "nonveg" ? (
              <span className="flex-center gap-1"><Flame size={12} color="#dc2626" /> Non-Veg</span>
            ) : (
              <span className="flex-center gap-1"><Zap size={12} color="#b45309" /> Veg & Non-Veg</span>
            )}
          </span>
        </div>
      </div>

      {/* Restaurant Overview Body */}
      <div className="rp-container">
        
        {/* Details Grid */}
        <div className="rp-grid">
          
          {/* Main Info Column */}
          <div className="rp-info-col">
            <h1 className="rp-title">{restaurant.name}</h1>
            <p className="rp-cuisine-row">
              <Utensils size={14} className="icon-orange" />
              <span>{restaurant.cuisine} Cuisine</span>
            </p>
            
            <p className="rp-location-row">
              <MapPin size={14} className="icon-orange" />
              <span>{restaurant.area}, {restaurant.city}</span>
            </p>

            <div className="rp-meta-info-grid">
              <div className="rp-meta-card">
                <Clock size={16} />
                <div>
                  <p className="meta-label">Timing</p>
                  <p className="meta-value">{formattedTimings}</p>
                </div>
              </div>

              <div className="rp-meta-card">
                <IndianRupee size={16} />
                <div>
                  <p className="meta-label">Average Cost</p>
                  <p className="meta-value">{formattedCost}</p>
                </div>
              </div>

              <div className="rp-meta-card">
                <Star size={16} className="star-fill" />
                <div>
                  <p className="meta-label">Rating</p>
                  <p className="meta-value">
                    <strong>{ratingInfo.rating > 0 ? ratingInfo.rating : "N/A"}</strong>
                    {ratingInfo.reviewsCount > 0 && <span className="meta-sub"> ({ratingInfo.reviewsCount} Reviews)</span>}
                  </p>
                </div>
              </div>
            </div>

            {/* Address & Contact Info (For registered partners) */}
            {(restaurant.address || restaurant.phone || restaurant.email) && (
              <div className="rp-contact-section">
                <h3 className="section-title-small">Contact & Address Details</h3>
                <div className="contact-details">
                  {restaurant.address && (
                    <div className="contact-item">
                      <span className="contact-label">Address:</span>
                      <span className="contact-val">{restaurant.address}</span>
                    </div>
                  )}
                  {restaurant.phone && (
                    <div className="contact-item">
                      <Phone size={12} />
                      <span className="contact-val">{restaurant.phone}</span>
                    </div>
                  )}
                  {restaurant.email && (
                    <div className="contact-item">
                      <Mail size={12} />
                      <span className="contact-val">{restaurant.email}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Dishes Showcase */}
            <div className="rp-dishes-section">
              <h3 className="section-title-small">Dishes Served</h3>
              <div className="rp-dishes-tags">
                {restaurant.dishes.length > 0 ? (
                  restaurant.dishes.map(dish => (
                    <span key={dish} className="rp-dish-pill">
                      🍽️ {dish}
                    </span>
                  ))
                ) : (
                  <p className="no-items-text">No dishes registered yet.</p>
                )}
              </div>
            </div>
          </div>

          {/* Delivery & Integrations Sidebar */}
          <div className="rp-sidebar-col">
            <div className="rp-sidebar-card">
              <h3 className="sidebar-title">Order Online</h3>
              <p className="sidebar-subtitle">Get direct redirection to partner delivery applications</p>

              <div className="sidebar-links-stack">
                <a 
                  href={swiggyLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="delivery-link swiggy-btn"
                >
                  <span className="btn-brand">🟠 Swiggy</span>
                  <span className="btn-action">Order Now <ExternalLink size={12} /></span>
                </a>

                <a 
                  href={zomatoLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="delivery-link zomato-btn"
                >
                  <span className="btn-brand">🔴 Zomato</span>
                  <span className="btn-action">Order Now <ExternalLink size={12} /></span>
                </a>
              </div>

              <div className="sidebar-footer-note">
                ⚡ Redirection works instantly based on filled partner registry information.
              </div>
            </div>
          </div>
        </div>

        {/* ── REVIEWS & RATINGS SECTION ── */}
        <div className="rp-reviews-section">
          <h2 className="reviews-main-title">Diner Ratings & Reviews</h2>
          
          <div className="reviews-split-grid">
            
            {/* Reviews list */}
            <div className="reviews-list-pane">
              <h3 className="section-title-small">Reviews ({reviews.length})</h3>
              <div className="reviews-stack">
                {reviews.length > 0 ? (
                  reviews.map(rev => (
                    <div key={rev.id} className="review-comment-card">
                      <div className="review-comment-header">
                        <div className="reviewer-avatar">
                          <User size={14} />
                        </div>
                        <div className="reviewer-meta">
                          <h4 className="reviewer-name">{rev.reviewerName}</h4>
                          <div className="review-stars-static">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={12} 
                                className={i < rev.rating ? "star-fill" : "star-empty"}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="review-date">
                          <Calendar size={10} />
                          {new Date(rev.createdAt).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            year: "numeric"
                          })}
                        </span>
                      </div>
                      <p className="review-text">{rev.comment}</p>
                    </div>
                  ))
                ) : (
                  <div className="no-reviews-placeholder">
                    <MessageSquare size={32} />
                    <p>No reviews added yet.</p>
                    <span>Be the first to rate your experience at {restaurant.name}!</span>
                  </div>
                )}
              </div>
            </div>

            {/* Review form */}
            <div className="review-form-pane">
              <div className="review-form-card">
                <h3 className="form-card-title">Share Your Experience</h3>
                <form onSubmit={handleSubmitReview} className="reviews-form">
                  <div className="form-group">
                    <label className="form-label">Your Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. John Doe"
                      value={reviewerName}
                      onChange={e => setReviewerName(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label font-bold">Your Rating</label>
                    <div className="star-rating-selector">
                      {[1, 2, 3, 4, 5].map(starNum => (
                        <button
                          key={starNum}
                          type="button"
                          onClick={() => setFormRating(starNum)}
                          onMouseEnter={() => setHoverRating(starNum)}
                          onMouseLeave={() => setHoverRating(null)}
                          className="star-btn"
                        >
                          <Star 
                            size={24}
                            className={
                              starNum <= (hoverRating ?? formRating) 
                                ? "star-fill animate-pulse" 
                                : "star-empty"
                            }
                          />
                        </button>
                      ))}
                      <span className="rating-helper-text">
                        {[
                          "Terrible", 
                          "Bad", 
                          "Average", 
                          "Good", 
                          "Outstanding"
                        ][(hoverRating ?? formRating) - 1]}
                      </span>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Your Review</label>
                    <textarea 
                      placeholder="Tell us what you liked, your favorite dishes, or feedback for the kitchen..."
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                      rows={4}
                      className="form-textarea"
                    />
                  </div>

                  {errorMsg && (
                    <div className="form-error-msg">
                      ⚠️ {errorMsg}
                    </div>
                  )}

                  {submitSuccess && (
                    <div className="form-success-msg">
                      🎉 Review submitted successfully! Thank you.
                    </div>
                  )}

                  <button type="submit" className="form-submit-btn">
                    <Send size={14} /> Submit Review
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .rp-view {
          padding: 1.5rem 2rem;
          color: #0f172a;
          background: #fff;
          font-family: inherit;
        }
        
        .rp-back-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: none;
          color: #64748b;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          padding: 0;
          margin-bottom: 1.5rem;
          transition: color 0.15s;
        }
        .rp-back-btn:hover {
          color: #E30613;
        }

        .rp-hero-banner {
          position: relative;
          width: 100%;
          height: 260px;
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 2rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
        }
        .rp-hero-img {
          object-fit: cover;
        }
        .rp-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%);
        }
        .rp-hero-badges {
          position: absolute;
          bottom: 1.25rem;
          left: 1.25rem;
          display: flex;
          gap: 0.5rem;
          align-items: center;
          z-index: 2;
        }
        .rp-hero-badge {
          color: #fff;
          font-size: 0.72rem;
          font-weight: 800;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          text-transform: uppercase;
          letter-spacing: 0.4px;
        }
        .rp-type-badge {
          background: rgba(255,255,255,0.92);
          border-radius: 9999px;
          padding: 0.25rem 0.75rem;
          font-size: 0.75rem;
          font-weight: 700;
          color: #374151;
        }
        
        .rp-container {
          max-width: 100%;
        }

        .rp-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          margin-bottom: 3.5rem;
        }
        @media(min-width: 860px) {
          .rp-grid {
            grid-template-columns: 1fr 280px;
          }
        }

        .rp-info-col {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .rp-title {
          font-size: clamp(1.8rem, 4vw, 2.5rem);
          font-weight: 900;
          color: #0f172a;
          margin: 0;
          letter-spacing: -0.8px;
          line-height: 1.1;
        }

        .rp-cuisine-row, .rp-location-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.95rem;
          color: #475569;
          margin: 0;
        }
        .icon-orange {
          color: #f97316;
        }

        .rp-meta-info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1rem;
          margin-top: 1.25rem;
          margin-bottom: 1.25rem;
        }
        .rp-meta-card {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 1rem;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          color: #475569;
        }
        .rp-meta-card svg {
          color: #E30613;
          flex-shrink: 0;
        }
        .meta-label {
          font-size: 0.72rem;
          font-weight: 700;
          color: #94a3b8;
          text-transform: uppercase;
          margin: 0 0 0.15rem;
          letter-spacing: 0.3px;
        }
        .meta-value {
          font-size: 0.88rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0;
        }
        .meta-sub {
          font-weight: 500;
          color: #64748b;
          font-size: 0.8rem;
        }

        .rp-contact-section {
          padding: 1rem;
          background: #fffbeb;
          border: 1px solid #fde68a;
          border-radius: 12px;
          margin-bottom: 1.25rem;
        }
        .section-title-small {
          font-size: 0.9rem;
          font-weight: 800;
          color: #1e293b;
          text-transform: uppercase;
          margin: 0 0 0.75rem;
          letter-spacing: 0.5px;
        }
        .contact-details {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          font-size: 0.82rem;
          color: #475569;
        }
        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .contact-label {
          font-weight: 700;
          color: #78350f;
        }
        .contact-val {
          color: #451a03;
        }

        .rp-dishes-section {
          margin-top: 1rem;
        }
        .rp-dishes-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .rp-dish-pill {
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          color: #475569;
          font-size: 0.8rem;
          font-weight: 600;
          padding: 0.35rem 0.8rem;
          border-radius: 9999px;
          transition: background 0.15s;
        }
        .rp-dish-pill:hover {
          background: #e2e8f0;
        }
        .no-items-text {
          font-size: 0.82rem;
          color: #94a3b8;
          font-style: italic;
          margin: 0;
        }

        /* Sidebar Column */
        .rp-sidebar-col {
          display: flex;
          flex-direction: column;
        }
        .rp-sidebar-card {
          position: sticky;
          top: 1.5rem;
          background: #fff;
          border: 2px solid #E30613;
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 10px 25px -5px rgba(227,6,19,0.1);
        }
        .sidebar-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 0.25rem;
        }
        .sidebar-subtitle {
          font-size: 0.76rem;
          color: #64748b;
          line-height: 1.4;
          margin: 0 0 1.25rem;
        }
        .sidebar-links-stack {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }
        .delivery-link {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.85rem 1.1rem;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 700;
          font-size: 0.88rem;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .delivery-link:hover {
          transform: translateY(-2px);
        }
        .swiggy-btn {
          background: #fff7ed;
          border: 1.5px solid #fed7aa;
          color: #c2410c;
        }
        .swiggy-btn:hover {
          background: #ffedd5;
          box-shadow: 0 4px 12px rgba(249,115,22,0.15);
        }
        .zomato-btn {
          background: #fff5f5;
          border: 1.5px solid #fecaca;
          color: #dc2626;
        }
        .zomato-btn:hover {
          background: #fee2e2;
          box-shadow: 0 4px 12px rgba(220,38,38,0.15);
        }
        .btn-brand {
          font-size: 0.9rem;
        }
        .btn-action {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.4px;
        }
        .sidebar-footer-note {
          margin-top: 1.25rem;
          font-size: 0.68rem;
          color: #94a3b8;
          text-align: center;
          line-height: 1.4;
        }

        /* Reviews Section */
        .rp-reviews-section {
          border-top: 1px solid #f1f5f9;
          padding-top: 2.5rem;
          margin-top: 1.5rem;
        }
        .reviews-main-title {
          font-size: 1.5rem;
          font-weight: 900;
          color: #0f172a;
          margin: 0 0 2rem;
          letter-spacing: -0.4px;
        }
        .reviews-split-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          align-items: start;
        }
        @media(min-width: 860px) {
          .reviews-split-grid {
            grid-template-columns: 1fr 340px;
          }
        }

        /* Reviews stack */
        .reviews-stack {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-height: 480px;
          overflow-y: auto;
          padding-right: 0.5rem;
        }
        .review-comment-card {
          padding: 1.2rem;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          background: #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.02);
        }
        .review-comment-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.6rem;
        }
        .reviewer-avatar {
          width: 32px;
          height: 32px;
          background: #f1f5f9;
          border-radius: 50%;
          color: #64748b;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #e2e8f0;
        }
        .reviewer-meta {
          flex: 1;
        }
        .reviewer-name {
          font-size: 0.88rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 0.15rem;
        }
        .review-stars-static {
          display: flex;
          gap: 0.1rem;
        }
        .review-date {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.7rem;
          color: #94a3b8;
        }
        .review-text {
          font-size: 0.86rem;
          color: #475569;
          line-height: 1.5;
          margin: 0;
          padding-left: 2.5rem;
        }
        .no-reviews-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 3rem 1.5rem;
          color: #94a3b8;
          background: #f8fafc;
          border: 1.5px dashed #e2e8f0;
          border-radius: 14px;
        }
        .no-reviews-placeholder svg {
          color: #cbd5e1;
          margin-bottom: 0.75rem;
        }
        .no-reviews-placeholder p {
          font-size: 0.9rem;
          font-weight: 700;
          color: #64748b;
          margin: 0 0 0.2rem;
        }
        .no-reviews-placeholder span {
          font-size: 0.76rem;
          color: #94a3b8;
        }

        /* Review Form Panel */
        .review-form-card {
          background: #fafafa;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 1.5rem;
        }
        .form-card-title {
          font-size: 1rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 1.1rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .reviews-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .form-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: #475569;
          text-transform: uppercase;
        }
        .form-input {
          width: 100%;
          padding: 0.6rem 0.8rem;
          border: 1.5px solid #cbd5e1;
          border-radius: 8px;
          font-size: 0.85rem;
          outline: none;
          font-family: inherit;
          background: #fff;
          transition: border-color 0.15s;
        }
        .form-input:focus {
          border-color: #E30613;
        }
        .form-textarea {
          width: 100%;
          padding: 0.6rem 0.8rem;
          border: 1.5px solid #cbd5e1;
          border-radius: 8px;
          font-size: 0.85rem;
          outline: none;
          font-family: inherit;
          resize: vertical;
          background: #fff;
          transition: border-color 0.15s;
        }
        .form-textarea:focus {
          border-color: #E30613;
        }
        .star-rating-selector {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          margin: 0.2rem 0;
        }
        .star-btn {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
        }
        .star-fill {
          fill: #f59e0b;
          color: #f59e0b;
        }
        .star-empty {
          color: #cbd5e1;
          fill: transparent;
        }
        .rating-helper-text {
          font-size: 0.72rem;
          font-weight: 700;
          color: #E30613;
          margin-left: 0.5rem;
          text-transform: uppercase;
        }
        .form-error-msg {
          font-size: 0.76rem;
          color: #dc2626;
          font-weight: 600;
          background: #fef2f2;
          padding: 0.4rem 0.75rem;
          border-radius: 6px;
          border: 1px solid #fecaca;
        }
        .form-success-msg {
          font-size: 0.76rem;
          color: #16a34a;
          font-weight: 600;
          background: #f0fdf4;
          padding: 0.4rem 0.75rem;
          border-radius: 6px;
          border: 1px solid #bbf7d0;
        }
        .form-submit-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          padding: 0.7rem 1.2rem;
          background: #E30613;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.15s;
        }
        .form-submit-btn:hover {
          background: #bd040f;
        }

        .flex-center {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .gap-1 {
          gap: 0.25rem;
        }
      `}</style>
    </div>
  );
}
