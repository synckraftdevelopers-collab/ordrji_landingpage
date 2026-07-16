"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookDemoModal from "@/components/BookDemoModal";
import RegisterRestaurantModal from "@/components/RegisterRestaurantModal";
import RoleSwitcher from "@/components/RoleSwitcher";
import { Shield, X, AlertTriangle, CheckCircle2, UserCircle2 } from "lucide-react";

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
  const [searchQuery, setSearchQuery] = useState("");

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

  return (
    <>
      <Navbar onBookDemo={() => setIsDemoOpen(true)} onRegister={() => setIsRegisterOpen(true)} />

      <main className="turiya-blog-root">
        {/* Simple Turiya style header */}
        <div className="turiya-blog-header">
          <div className="container">
            <div className="header-inner">
              <h1 className="turiya-blog-title">Blog</h1>
              <button 
                onClick={() => setIsAdminPromptOpen(true)}
                className="turiya-admin-login-btn"
              >
                <Shield size={14} />
                <span>Admin</span>
              </button>
            </div>
          </div>
        </div>

        <div className="container turiya-blog-container">
          {loading ? (
            <div className="loading-state">
              <div className="spinner" />
              <p>Loading posts...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="empty-state">
              <p>No published posts available.</p>
            </div>
          ) : (() => {
            const filteredPosts = posts.filter(post => {
              const query = searchQuery.toLowerCase().trim();
              if (!query) return true;
              return (
                post.title.toLowerCase().includes(query) ||
                post.description.toLowerCase().includes(query) ||
                (post.content || "").toLowerCase().includes(query) ||
                (post.createdBy || "").toLowerCase().includes(query)
              );
            });
            const recentPosts = posts.slice(0, 5);

            return (
              <div className="blog-workspace">
                {/* Left Column: Sidebar - Recently Uploaded */}
                <aside className="blog-recent-sidebar">
                  <h3 className="sidebar-title">Recently Uploaded</h3>
                  <div className="recent-posts-list">
                    {recentPosts.map((rp) => (
                      <Link key={rp.id} href={`/blog/${rp.slug}`} className="recent-post-item">
                        <img src={rp.coverImage} alt={rp.title} className="recent-post-thumb" />
                        <div className="recent-post-info">
                          <h4 className="recent-post-title">{rp.title}</h4>
                          <span className="recent-post-date">{rp.createdDate}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </aside>

                {/* Right Column: Main area with search and grid */}
                <section className="blog-main-area">
                  {/* Premium Search Input */}
                  <div className="blog-search-bar-wrap">
                    <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" style={{ flexShrink: 0 }}>
                      <circle cx="11" cy="11" r="8"/>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                    <input
                      type="text"
                      className="blog-search-input"
                      placeholder="Search blogs by title, keywords or author..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery("")} className="search-clear-btn" title="Clear search">
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Articles Grid */}
                  <div className="blog-articles-grid">
                    {filteredPosts.map((post) => (
                      <article key={post.id} className="turiya-post-card">
                        <Link href={"/blog/" + post.slug} className="turiya-post-image-link">
                          <div className="turiya-post-image-wrap">
                            <img src={post.coverImage} alt={post.title} className="turiya-post-image" />
                          </div>
                        </Link>
                        <div className="turiya-post-content" style={{ padding: "18px 0" }}>
                          <div className="turiya-post-category" style={{ marginBottom: "8px" }}>
                            <span style={{ fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", color: "var(--accent-red, #e30613)", letterSpacing: "0.4px" }}>
                              {categories.find(c => c.id === post.categoryId)?.name || "Technology"}
                            </span>
                          </div>
                          <h2 className="turiya-post-title" style={{ fontSize: "1.25rem", marginBottom: "10px" }}>
                            <Link href={"/blog/" + post.slug}>{post.title}</Link>
                          </h2>
                          <p style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: 1.5, margin: "0 0 1rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                            {post.description}
                          </p>
                          <div className="turiya-post-meta">
                            <div className="turiya-post-author">
                              <UserCircle2 size={24} className="author-avatar-icon" />
                              <span className="author-name" style={{ fontSize: "0.78rem" }}>{post.createdBy}</span>
                            </div>
                            <div className="turiya-post-date">
                              <time style={{ fontSize: "0.78rem" }}>{post.createdDate}</time>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                    {filteredPosts.length === 0 && (
                      <div className="no-search-results" style={{ gridColumn: "1/-1", padding: "4rem 1.5rem", textAlign: "center", border: "1px dashed #cbd5e1", borderRadius: "12px", background: "#f8fafc" }}>
                        <p style={{ color: "#64748b", margin: 0 }}>No articles found matching &ldquo;<strong>{searchQuery}</strong>&rdquo;.</p>
                      </div>
                    )}
                  </div>
                </section>
              </div>
            );
          })()}
        </div>
      </main>

      <Footer />
      <BookDemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
      <RegisterRestaurantModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
      <RoleSwitcher />

      {/* Admin Verification Modal (unchanged) */}
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

      {/* Turiya Replicated Styles */}
      <style jsx global>{`
        /* QueueBuster layout overrides */
        .blog-workspace {
          display: flex;
          gap: 40px;
          margin-top: 2rem;
          width: 100%;
        }

        .blog-recent-sidebar {
          width: 280px;
          flex-shrink: 0;
          position: sticky;
          top: 100px;
          height: fit-content;
        }

        .sidebar-title {
          font-size: 1.05rem;
          font-weight: 850;
          color: #0f172a;
          margin-top: 0;
          margin-bottom: 1.25rem;
          padding-bottom: 0.75rem;
          border-bottom: 2px solid var(--accent-red, #e30613);
          letter-spacing: -0.3px;
        }

        .recent-posts-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .recent-post-item {
          display: flex;
          gap: 0.85rem;
          align-items: center;
          text-decoration: none;
          padding-bottom: 0.85rem;
          border-bottom: 1px solid #f1f5f9;
          transition: transform 0.15s;
        }

        .recent-post-item:hover {
          transform: translateX(3px);
        }

        .recent-post-thumb {
          width: 60px;
          height: 60px;
          object-fit: cover;
          border-radius: 8px;
          background: #f1f5f9;
          flex-shrink: 0;
        }

        .recent-post-info {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          min-width: 0;
        }

        .recent-post-title {
          font-size: 0.78rem;
          font-weight: 750;
          color: #1e293b;
          margin: 0;
          line-height: 1.35;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .recent-post-title:hover {
          color: var(--accent-red, #e30613);
        }

        .recent-post-date {
          font-size: 0.68rem;
          color: #94a3b8;
        }

        .blog-main-area {
          flex: 1;
          min-width: 0;
        }

        .blog-search-bar-wrap {
          display: flex;
          align-items: center;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 0.75rem 1.15rem;
          gap: 0.75rem;
          margin-bottom: 2rem;
          position: relative;
        }

        .blog-search-bar-wrap:focus-within {
          border-color: var(--accent-red, #e30613);
          box-shadow: 0 0 0 3px rgba(227, 6, 19, 0.08);
          background: #ffffff;
        }

        .blog-search-input {
          border: none;
          background: transparent;
          font-family: inherit;
          font-size: 0.9rem;
          color: #0f172a;
          width: 100%;
          outline: none;
        }

        .search-clear-btn {
          background: #e2e8f0;
          border: none;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.65rem;
          cursor: pointer;
          color: #64748b;
          transition: background 0.15s;
        }

        .search-clear-btn:hover {
          background: #cbd5e1;
          color: #0f172a;
        }

        .blog-articles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 30px;
        }

        @media (max-width: 900px) {
          .blog-workspace {
            flex-direction: column;
            gap: 2rem;
          }
          .blog-recent-sidebar {
            width: 100%;
            position: static;
          }
        }

        .turiya-blog-root {
          background-color: #ffffff;
          min-height: 100vh;
          font-family: var(--font-sans), sans-serif;
        }

        .turiya-blog-header {
          padding-top: 130px;
          padding-bottom: 2rem;
          background-color: #ffffff;
        }

        .header-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1140px;
          margin: 0 auto;
        }

        .turiya-blog-title {
          font-size: 40px;
          font-weight: 700;
          color: #111111;
          margin: 0;
        }

        .turiya-admin-login-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #f8f9fa;
          border: 1px solid #e5e5e5;
          padding: 8px 16px;
          border-radius: 4px;
          color: #666;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .turiya-admin-login-btn:hover {
          background: #eeeeee;
          color: #111;
        }

        .turiya-blog-container {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 15px 80px;
        }

        .turiya-blog-category-section {
          margin-bottom: 60px;
        }

        .turiya-section-heading {
          font-size: 32px;
          font-weight: 700;
          color: #111111;
          margin-bottom: 30px;
          padding-bottom: 15px;
          border-bottom: 2px solid #f0f0f0;
          text-transform: capitalize;
        }

        .turiya-blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 30px;
        }

        .turiya-post-card {
          display: flex;
          flex-direction: column;
          background-color: #ffffff;
        }

        .turiya-post-image-wrap {
          width: 100%;
          padding-top: 60%; /* Aspect ratio for the image */
          position: relative;
          overflow: hidden;
          background-color: #f5f5f5;
        }

        .turiya-post-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .turiya-post-image-link:hover .turiya-post-image {
          transform: scale(1.05);
        }

        .turiya-post-content {
          padding: 25px 0;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .turiya-post-category {
          margin-bottom: 12px;
        }

        .turiya-post-category a {
          color: #000000;
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          text-decoration: none;
          letter-spacing: 0.5px;
          transition: color 0.3s ease;
        }

        .turiya-post-category a:hover {
          color: var(--accent-red, #e30613);
        }

        .turiya-post-title {
          font-size: 24px;
          font-weight: 700;
          line-height: 1.3;
          margin: 0 0 20px 0;
        }

        .turiya-post-title a {
          color: #111111;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .turiya-post-title a:hover {
          color: var(--accent-red, #e30613);
        }

        .turiya-post-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
          border-top: 1px solid #eeeeee;
          padding-top: 15px;
        }

        .turiya-post-author {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .author-avatar-icon {
          color: #cccccc;
          stroke-width: 1.5;
        }

        .author-by {
          font-size: 13px;
          color: #777777;
        }

        .author-name {
          font-size: 14px;
          font-weight: 700;
          color: #111111;
        }

        .turiya-post-date {
          font-size: 13px;
          color: #777777;
        }

        /* Loading & Empty States */
        .loading-state, .empty-state {
          padding: 60px 0;
          text-align: center;
          color: #666;
        }

        .spinner {
          width: 30px;
          height: 30px;
          border: 3px solid rgba(0,0,0,0.1);
          border-radius: 50%;
          border-top-color: var(--accent-red, #e30613);
          animation: spin 1s ease-in-out infinite;
          margin: 0 auto 15px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Admin Modal Base Styles (preserved for the login prompt) */
        .admin-modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }
        .admin-modal-card {
          background: #fff;
          padding: 2rem;
          border-radius: 12px;
          width: 100%;
          max-width: 400px;
          position: relative;
        }
        .admin-modal-close {
          position: absolute;
          top: 15px; right: 15px;
          background: none; border: none; cursor: pointer;
        }
        .admin-modal-header h3 { margin: 0 0 5px; }
        .admin-modal-header p { font-size: 14px; color: #666; margin-bottom: 20px; }
        .admin-form-group { margin-bottom: 15px; }
        .admin-form-label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 5px; }
        .admin-form-input { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; }
        .admin-submit-btn { width: 100%; padding: 10px; background: #e30613; color: #fff; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; }
        .admin-modal-alert { padding: 10px; border-radius: 6px; font-size: 13px; display: flex; gap: 8px; margin-bottom: 15px; }
        .alert-error { background: #ffebee; color: #c62828; }
        .alert-success { background: #e8f5e9; color: #2e7d32; }
        .spinner-loader {
          display: inline-block; width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3); border-radius: 50%; border-top-color: #fff;
          animation: spin 1s infinite linear;
        }
      `}</style>
    </>
  );
}
