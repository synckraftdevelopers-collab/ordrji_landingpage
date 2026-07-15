const fs = require('fs');

const fileContent = `"use client";

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
          ) : (
            <div className="turiya-blog-grid">
              {posts.map((post) => {
                const categoryName = categories.find(c => c.id === post.categoryId)?.name || "Technology";
                return (
                  <article key={post.id} className="turiya-post-card">
                    <Link href={"/blog/" + post.slug} className="turiya-post-image-link">
                      <div className="turiya-post-image-wrap">
                        <img src={post.coverImage} alt={post.title} className="turiya-post-image" />
                      </div>
                    </Link>
                    <div className="turiya-post-content">
                      <div className="turiya-post-category">
                        <Link href="#">{categoryName}</Link>
                      </div>
                      <h2 className="turiya-post-title">
                        <Link href={"/blog/" + post.slug}>{post.title}</Link>
                      </h2>
                      <div className="turiya-post-meta">
                        <div className="turiya-post-author">
                          <UserCircle2 size={32} className="author-avatar-icon" />
                          <span className="author-by">by</span>
                          <span className="author-name">{post.createdBy}</span>
                        </div>
                        <div className="turiya-post-date">
                          <time>{post.createdDate}</time>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
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
      <style jsx global>{\`
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
      \`}</style>
    </>
  );
}
`;

fs.writeFileSync('src/app/blog/page.tsx', fileContent, 'utf8');
console.log('src/app/blog/page.tsx updated to match Turiya layout!');
