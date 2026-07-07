"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookDemoModal from "@/components/BookDemoModal";
import RegisterRestaurantModal from "@/components/RegisterRestaurantModal";
import RoleSwitcher from "@/components/RoleSwitcher";
import { Clock, Sparkles, Search, BookOpen, ChevronRight, Shield, X, AlertTriangle, CheckCircle2 } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  categoryId: string;
  tags: string[];
  isFeatured: boolean;
  status: string;
  createdBy: string;
  createdDate: string;
  createdTime?: string;
  readingTime: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  isEnabled: boolean;
}

interface Tag {
  id: string;
  name: string;
  slug: string;
}

export default function BlogLandingPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState<boolean>(false);

  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isAdminPromptOpen, setIsAdminPromptOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [promptError, setPromptError] = useState("");
  const [promptSuccess, setPromptSuccess] = useState(false);
  const [promptLoading, setPromptLoading] = useState(false);

  const handleAdminVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminPassword) return;

    setPromptLoading(true);
    setPromptError("");

    try {
      let emailToTry = "admin@ordrji.com";
      if (adminPassword === "Super@123") {
        emailToTry = "superadmin@ordrji.com";
      }

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailToTry, password: adminPassword })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Incorrect admin password.");
      }

      setPromptSuccess(true);
      setTimeout(() => {
        setIsAdminPromptOpen(false);
        setAdminPassword("");
        setPromptSuccess(false);
        window.location.href = "/dashboard/admin/blogs";
      }, 1000);
    } catch (err: unknown) {
      setPromptError(err instanceof Error ? err.message : "Invalid password.");
    } finally {
      setPromptLoading(false);
    }
  };

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        // Fetch categories, tags, and published blogs
        const [catsRes, tagsRes, blogsRes] = await Promise.all([
          fetch("/api/categories"),
          fetch("/api/tags"),
          fetch("/api/blogs?status=Published")
        ]);

        if (catsRes.ok) {
          const catsData = await catsRes.json();
          setCategories(catsData.filter((c: Category) => c.isEnabled));
        }
        if (tagsRes.ok) setTags(await tagsRes.json());
        if (blogsRes.ok) setPosts(await blogsRes.json());
      } catch (err) {
        console.error("Failed to load blog data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filter posts client-side based on criteria
  const filteredPosts = posts.filter((post) => {
    const matchCategory = selectedCategory === "all" || post.categoryId === selectedCategory;
    const matchTag = selectedTag === "all" || post.tags.includes(selectedTag);
    const matchFeatured = !showFeaturedOnly || post.isFeatured;
    const matchSearch =
      searchQuery.trim() === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.createdBy.toLowerCase().includes(searchQuery.toLowerCase());

    return matchCategory && matchTag && matchFeatured && matchSearch;
  });

  const featuredPost = posts.find(p => p.isFeatured && p.status === "Published");

  return (
    <>
      <Navbar onBookDemo={() => setIsDemoOpen(true)} onRegister={() => setIsRegisterOpen(true)} />

      <main className="blog-page-root">
        {/* Background Radial Glow */}
        <div className="blog-glow" aria-hidden />

        <div className="container" style={{ padding: "8rem 1.5rem 6rem" }}>
          
          {/* Header Block */}
          <div className="blog-header-block">
            <span className="blog-eyebrow">
              <Sparkles size={13} style={{ marginRight: 6 }} /> Insights & Guides
            </span>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", width: "100%", flexWrap: "wrap", gap: "1.5rem" }}>
              <div>
                <h1 className="blog-title">Ordrji Resource Center</h1>
                <p className="blog-subtitle">
                  Expert advice on restaurant POS billing, commission-free QR systems, recipe inventory cost margins, and direct guest marketing.
                </p>
              </div>
              <button 
                onClick={() => setIsAdminPromptOpen(true)}
                className="btn-secondary"
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "0.5rem", 
                  fontWeight: 700, 
                  fontSize: "0.85rem",
                  padding: "0.6rem 1.1rem",
                  borderColor: "var(--border-color)",
                  borderRadius: "8px",
                  cursor: "pointer",
                  background: "#ffffff"
                }}
              >
                <Shield size={14} style={{ color: "var(--accent-orange)" }} />
                <span>Admin Login</span>
              </button>
            </div>
          </div>

          {/* Featured Post Banner (if available and no filters active) */}
          {featuredPost && selectedCategory === "all" && selectedTag === "all" && searchQuery === "" && !showFeaturedOnly && (
            <div className="featured-banner-card">
              <div className="featured-banner-img-wrap">
                <img src={featuredPost.coverImage} alt={featuredPost.title} className="featured-banner-img" />
              </div>
              <div className="featured-banner-content">
                <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
                  <span className="featured-badge-pill">FEATURED</span>
                  <span className="featured-category-pill">
                    {categories.find(c => c.id === featuredPost.categoryId)?.name || "Technology"}
                  </span>
                </div>
                <h2 className="featured-banner-title">{featuredPost.title}</h2>
                <p className="featured-banner-desc">{featuredPost.description}</p>
                
                <div className="featured-banner-meta">
                  <div className="meta-item">
                    <span className="meta-author">By {featuredPost.createdBy}</span>
                  </div>
                  <div className="meta-item">
                    <Clock size={13} />
                    <span>{featuredPost.readingTime}</span>
                  </div>
                </div>

                <Link href={`/blog/${featuredPost.slug}`} className="featured-banner-btn btn-primary btn-red">
                  Read Article <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          )}

          {/* Search & Filters Controls */}
          <div className="filter-controls-card shadow-sm">
            <div className="filters-header">
              <div className="search-box-wrap">
                <Search size={16} className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Search articles by title, content, or author..." 
                  className="search-input-field" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <button 
                onClick={() => setShowFeaturedOnly(!showFeaturedOnly)} 
                className={`featured-filter-btn ${showFeaturedOnly ? "active" : ""}`}
              >
                <Sparkles size={14} /> <span>Featured Only</span>
              </button>
            </div>

            <div className="filters-selectors-row">
              <div className="filter-group">
                <label className="filter-label">Category</label>
                <div className="pills-container">
                  <button 
                    onClick={() => setSelectedCategory("all")} 
                    className={`pill-btn ${selectedCategory === "all" ? "active" : ""}`}
                  >
                    All Categories
                  </button>
                  {categories.map((cat) => (
                    <button 
                      key={cat.id} 
                      onClick={() => setSelectedCategory(cat.id)} 
                      className={`pill-btn ${selectedCategory === cat.id ? "active" : ""}`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group" style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1rem", marginTop: "1rem" }}>
                <label className="filter-label">Tags</label>
                <div className="pills-container">
                  <button 
                    onClick={() => setSelectedTag("all")} 
                    className={`pill-btn tag-pill ${selectedTag === "all" ? "active" : ""}`}
                  >
                    All Tags
                  </button>
                  {tags.map((tag) => (
                    <button 
                      key={tag.id} 
                      onClick={() => setSelectedTag(tag.id)} 
                      className={`pill-btn tag-pill ${selectedTag === tag.id ? "active" : ""}`}
                    >
                      #{tag.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Blog posts Grid */}
          {loading ? (
            <div className="loading-state">
              <div className="spinner" />
              <p>Loading published articles...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="empty-state">
              <BookOpen size={48} style={{ color: "var(--text-muted)", opacity: 0.5, marginBottom: "1rem" }} />
              <h3>No Articles Found</h3>
              <p>Try adjusting your search terms or filters to find published posts.</p>
              <button 
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedTag("all");
                  setSearchQuery("");
                  setShowFeaturedOnly(false);
                }}
                className="btn-secondary"
                style={{ marginTop: "1rem", padding: "0.5rem 1.25rem", borderRadius: 8 }}
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="blog-grid">
              {filteredPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="blog-card">
                  {/* Cover image wrapper */}
                  <div className="blog-card-image-wrap">
                    <img src={post.coverImage} alt={post.title} className="blog-card-img" />
                    <span className="blog-card-category">
                      {categories.find(c => c.id === post.categoryId)?.name || "Technology"}
                    </span>
                  </div>

                  {/* Content Area */}
                  <div className="blog-card-body">
                    <h3 className="blog-card-title">{post.title}</h3>
                    <p className="blog-card-desc">{post.description}</p>
                    
                    {/* Meta details */}
                    <div className="blog-card-meta">
                      <div className="author-info-wrap">
                        <span className="author-name">By {post.createdBy}</span>
                        <span className="post-date-sub">{post.createdDate}{post.createdTime ? ` at ${post.createdTime}` : ""}</span>
                      </div>
                      <div className="meta-read">
                        <Clock size={12} style={{ color: "var(--text-muted)" }} />
                        <span>{post.readingTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Newsletter Segment */}
          <section className="newsletter-box glass-card">
            <div className="newsletter-content">
              <h3>Subscribe to Ordrji Insights</h3>
              <p>Get bi-weekly case studies, feature updates, and cost optimization spreadsheets directly in your inbox.</p>
              <form onSubmit={(e) => { e.preventDefault(); alert("Subscription successful!"); }} className="newsletter-form">
                <input type="email" placeholder="Enter your business email" required className="newsletter-input" />
                <button type="submit" className="btn-primary btn-red newsletter-btn">Subscribe</button>
              </form>
            </div>
          </section>

        </div>
      </main>

      <Footer />
      <BookDemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
      <RegisterRestaurantModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
      <RoleSwitcher />

      {/* Admin Verification Modal */}
      {isAdminPromptOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card">
            <button 
              className="admin-modal-close"
              onClick={() => {
                setIsAdminPromptOpen(false);
                setAdminPassword("");
                setPromptError("");
              }}
              type="button"
            >
              <X size={18} />
            </button>

            <div className="admin-modal-header">
              <Shield size={36} style={{ color: "var(--accent-orange)", marginBottom: "0.75rem" }} />
              <h3>Admin Verification</h3>
              <p>Enter the administrator password to access the CMS editor.</p>
            </div>

            {promptError && (
              <div className="admin-modal-alert alert-error">
                <AlertTriangle size={14} />
                <span>{promptError}</span>
              </div>
            )}

            {promptSuccess && (
              <div className="admin-modal-alert alert-success">
                <CheckCircle2 size={14} />
                <span>Authorized! Redirecting to CMS...</span>
              </div>
            )}

            <form onSubmit={handleAdminVerify} className="admin-modal-form">
              <div className="admin-form-group">
                <label className="admin-form-label" htmlFor="admin-pass-input">Password</label>
                <input
                  id="admin-pass-input"
                  type="password"
                  className="admin-form-input"
                  placeholder="Enter admin password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  disabled={promptLoading || promptSuccess}
                  autoFocus
                  required
                />
              </div>

              <button
                type="submit"
                className="admin-submit-btn"
                disabled={promptLoading || promptSuccess}
              >
                {promptLoading ? (
                  <span className="spinner-loader" />
                ) : (
                  <span>Verify Password</span>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Scoped CSS Styles */}
      <style jsx global>{`
        .blog-page-root {
          background-color: var(--bg-primary);
          min-height: 100vh;
          position: relative;
          overflow: hidden;
        }

        .blog-glow {
          position: absolute;
          top: -200px;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 400px;
          background: radial-gradient(circle, rgba(227,6,19,0.06) 0%, rgba(227,6,19,0) 70%);
          pointer-events: none;
          z-index: 0;
        }

        .blog-header-block {
          position: relative;
          z-index: 1;
          margin-bottom: 3rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 2.5rem;
        }

        .blog-eyebrow {
          display: inline-flex;
          align-items: center;
          background: rgba(227, 6, 19, 0.08);
          border: 1px solid rgba(227, 6, 19, 0.2);
          color: var(--text-primary);
          padding: 0.35rem 0.9rem;
          border-radius: 9999px;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin-bottom: 1.25rem;
        }

        .blog-title {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 900;
          letter-spacing: -1.5px;
          line-height: 1.15;
          margin-bottom: 0.75rem;
          color: var(--text-primary);
        }

        .blog-subtitle {
          font-size: 1.05rem;
          line-height: 1.6;
          color: var(--text-secondary);
          max-width: 700px;
          margin: 0;
        }

        /* ── Featured Banner ── */
        .featured-banner-card {
          display: grid;
          grid-template-columns: 1fr;
          background: #ffffff;
          border: 1px solid var(--border-color);
          border-radius: 24px;
          overflow: hidden;
          margin-bottom: 3rem;
          box-shadow: var(--shadow-card);
        }

        @media (min-width: 768px) {
          .featured-banner-card {
            grid-template-columns: 1.2fr 1fr;
          }
        }

        .featured-banner-img-wrap {
          height: 100%;
          min-height: 250px;
          background: #000;
          overflow: hidden;
        }

        .featured-banner-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .featured-banner-card:hover .featured-banner-img {
          transform: scale(1.02);
        }

        .featured-banner-content {
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
        }

        .featured-badge-pill {
          background: rgba(227,6,19,0.08);
          border: 1px solid rgba(227,6,19,0.2);
          color: #da0404;
          font-size: 0.65rem;
          font-weight: 800;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          letter-spacing: 0.5px;
        }

        .featured-category-pill {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          font-size: 0.65rem;
          font-weight: 800;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          letter-spacing: 0.5px;
        }

        .featured-banner-title {
          font-size: clamp(1.4rem, 3vw, 1.8rem);
          font-weight: 900;
          letter-spacing: -0.8px;
          line-height: 1.25;
          margin-bottom: 0.85rem;
          color: var(--text-primary);
        }

        .featured-banner-desc {
          color: var(--text-secondary);
          font-size: 0.92rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .featured-banner-meta {
          display: flex;
          gap: 1.5rem;
          align-items: center;
          margin-bottom: 1.75rem;
          font-size: 0.82rem;
          color: var(--text-muted);
          border-top: 1px solid var(--border-color);
          width: 100%;
          padding-top: 1rem;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .meta-author {
          font-weight: 700;
          color: var(--text-primary);
        }

        .featured-banner-btn {
          border-radius: 12px !important;
          padding: 0.75rem 1.75rem !important;
          font-size: 0.88rem !important;
        }

        /* ── Filter Controls Card ── */
        .filter-controls-card {
          background: #ffffff;
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 1.5rem;
          margin-bottom: 3rem;
        }

        .filters-header {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
        }

        .search-box-wrap {
          flex: 1;
          min-width: 280px;
          position: relative;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }

        .search-input-field {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.75rem;
          border-radius: 12px;
          border: 1px solid var(--border-color);
          outline: none;
          font-size: 0.88rem;
          font-family: inherit;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .search-input-field:focus {
          border-color: var(--accent-orange);
          box-shadow: 0 0 0 3px rgba(194, 65, 12, 0.08);
        }

        .featured-filter-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.75rem 1.25rem;
          border-radius: 12px;
          border: 1px solid var(--border-color);
          background: #ffffff;
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s;
        }

        .featured-filter-btn:hover {
          border-color: var(--accent-orange);
          color: var(--accent-orange);
        }

        .featured-filter-btn.active {
          background: rgba(194, 65, 12, 0.08);
          border-color: var(--accent-orange);
          color: var(--accent-orange);
        }

        .filters-selectors-row {
          display: flex;
          flex-direction: column;
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .filter-label {
          font-size: 0.72rem;
          font-weight: 800;
          text-transform: uppercase;
          color: var(--text-muted);
          letter-spacing: 0.5px;
        }

        .pills-container {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .pill-btn {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          padding: 0.4rem 0.95rem;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .pill-btn:hover {
          background: var(--bg-secondary);
          border-color: var(--border-color-hover);
        }

        .pill-btn.active {
          background: #c2410c;
          border-color: #c2410c;
          color: #ffffff;
        }

        .pill-btn.tag-pill {
          background: #ffffff;
          border-radius: 9999px;
          font-size: 0.75rem;
        }
        
        .pill-btn.tag-pill.active {
          background: var(--text-primary);
          border-color: var(--text-primary);
          color: #ffffff;
        }

        /* ── Grid ── */
        .blog-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          margin-bottom: 4rem;
        }
        @media (min-width: 640px) {
          .blog-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .blog-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem 2.5rem;
          }
        }

        /* ── Card ── */
        .blog-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 18px;
          overflow: hidden;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 20px rgba(0,0,0,0.01);
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .blog-card:hover {
          transform: translateY(-4px);
          border-color: rgba(227,6,19,0.18);
          box-shadow: 0 12px 30px rgba(90,80,70,0.05);
        }

        .blog-card-image-wrap {
          position: relative;
          aspect-ratio: 1.6;
          overflow: hidden;
          background: #000;
        }
        .blog-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        .blog-card:hover .blog-card-img {
          transform: scale(1.03);
        }

        .blog-card-category {
          position: absolute;
          bottom: 0.85rem;
          left: 0.85rem;
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
          background: #fdfaf4;
          color: var(--accent-orange);
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
          letter-spacing: 0.3px;
          border: 1px solid rgba(227,6,19,0.15);
        }

        .blog-card-body {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .blog-card-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.35;
          margin: 0 0 0.6rem;
          letter-spacing: -0.3px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .blog-card-desc {
          font-size: 0.88rem;
          line-height: 1.5;
          color: var(--text-secondary);
          margin: 0 0 1.25rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .blog-card-meta {
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--border-color);
          padding-top: 1rem;
        }

        .author-info-wrap {
          display: flex;
          flex-direction: column;
        }

        .author-name {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .post-date-sub {
          font-size: 0.72rem;
          color: var(--text-muted);
        }

        .meta-read {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.78rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        /* ── Newsletter Box ── */
        .newsletter-box {
          padding: 3rem 2.5rem;
          text-align: center;
          margin-bottom: 2rem;
        }

        .newsletter-content h3 {
          font-size: 1.6rem;
          font-weight: 900;
          letter-spacing: -0.8px;
          margin-bottom: 0.5rem;
        }

        .newsletter-content p {
          color: var(--text-secondary);
          font-size: 0.95rem;
          max-width: 520px;
          margin: 0 auto 1.5rem;
        }

        .newsletter-form {
          display: flex;
          gap: 0.75rem;
          max-width: 500px;
          margin: 0 auto;
          flex-wrap: wrap;
        }

        .newsletter-input {
          flex: 1;
          min-width: 240px;
          padding: 0.75rem 1.25rem;
          border-radius: 10px;
          border: 1px solid var(--border-color);
          outline: none;
          font-size: 0.9rem;
          font-family: inherit;
        }

        .newsletter-input:focus {
          border-color: var(--accent-orange);
        }

        .newsletter-btn {
          border-radius: 10px !important;
          padding: 0.75rem 1.5rem !important;
          font-size: 0.9rem !important;
        }

        /* Loading & Empty States */
        .loading-state, .empty-state {
          text-align: center;
          padding: 4rem 2rem;
        }

        .spinner {
          width: 32px;
          height: 32px;
          border: 3px solid rgba(194, 65, 12, 0.1);
          border-top-color: #c2410c;
          border-radius: 50%;
          margin: 0 auto 1rem;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .empty-state h3 {
          font-size: 1.3rem;
          font-weight: 800;
          margin-bottom: 0.35rem;
        }

        .empty-state p {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        /* ── Admin Modal Overlay CSS Styles ── */
        .admin-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          animation: modalFadeIn 0.2s ease-out;
        }

        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .admin-modal-card {
          width: 90%;
          max-width: 380px;
          background: #ffffff;
          border: 1px solid var(--border-color);
          border-radius: 20px;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.08);
          padding: 2rem;
          position: relative;
          text-align: center;
          animation: cardSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes cardSlideUp {
          from { transform: translateY(12px) scale(0.96); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }

        .admin-modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 0.25rem;
          transition: color 0.15s;
        }
        .admin-modal-close:hover {
          color: var(--text-primary);
        }

        .admin-modal-header h3 {
          font-size: 1.15rem;
          font-weight: 850;
          letter-spacing: -0.5px;
          margin-bottom: 0.25rem;
        }

        .admin-modal-header p {
          font-size: 0.78rem;
          color: var(--text-secondary);
          line-height: 1.4;
          margin: 0 0 1.25rem;
        }

        .admin-modal-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          text-align: left;
        }

        .admin-form-group {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .admin-form-label {
          font-size: 0.7rem;
          font-weight: 750;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-secondary);
        }

        .admin-form-input {
          width: 100%;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 0.65rem 0.85rem;
          font-size: 0.88rem;
          color: var(--text-primary);
          transition: all 0.2s;
        }

        .admin-form-input:focus {
          outline: none;
          background: #ffffff;
          border-color: var(--accent-orange);
          box-shadow: 0 0 0 3px rgba(227, 6, 19, 0.08);
        }

        .admin-submit-btn {
          width: 100%;
          background: var(--accent-orange);
          border: none;
          border-radius: 8px;
          color: #ffffff;
          padding: 0.75rem;
          font-size: 0.85rem;
          font-weight: 800;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .admin-submit-btn:hover {
          background: #c2410c;
        }

        .admin-submit-btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .admin-modal-alert {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 0.85rem;
          border-radius: 8px;
          font-size: 0.78rem;
          font-weight: 600;
          margin-bottom: 1rem;
          border: 1px solid transparent;
          text-align: left;
        }

        .admin-modal-alert.alert-error {
          background: rgba(227, 6, 19, 0.04);
          border-color: rgba(227, 6, 19, 0.12);
          color: var(--accent-orange);
        }

        .admin-modal-alert.alert-success {
          background: rgba(5, 150, 105, 0.04);
          border-color: rgba(5, 150, 105, 0.12);
          color: var(--accent-green);
        }

        .spinner-loader {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
      `}</style>
    </>
  );
}
