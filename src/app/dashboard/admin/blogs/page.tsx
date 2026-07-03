"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Shield, 
  BookOpen, 
  FileText, 
  Plus, 
  Edit, 
  Check, 
  Calendar, 
  User, 
  Image as ImageIcon, 
  LogOut, 
  ArrowLeft,
  Eye,
  Clock
} from "lucide-react";
import RoleSwitcher from "@/components/RoleSwitcher";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  coverImage: string;
  categoryId: string;
  tags: string[];
  isFeatured: boolean;
  status: "Draft" | "Published" | "Deleted" | "Scheduled" | "Archived";
  createdBy: string;
  createdDate: string;
  readingTime: string;
}

interface Category {
  id: string;
  name: string;
}

const PRESET_IMAGES = [
  "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1581349485608-9469926a8e5e?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1560624052-449f5ddf0c31?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800"
];

export default function AdminBlogsPage() {
  const [activeRole, setActiveRole] = useState<string>("Visitor");
  const [activeUser, setActiveUser] = useState<string>("Guest Visitor");
  const [loading, setLoading] = useState(true);
  
  // Data lists
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  // Form states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formCoverImage, setFormCoverImage] = useState(PRESET_IMAGES[0]);
  const [formCategoryId, setFormCategoryId] = useState("tech");
  const [formTags, setFormTags] = useState("");
  const [formStatus, setFormStatus] = useState<"Draft" | "Published">("Published");
  const [formAuthor, setFormAuthor] = useState("");
  const [formDate, setFormDate] = useState("");

  useEffect(() => {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
      return null;
    };

    setActiveRole(getCookie("ordrji_role") || "Visitor");
    setActiveUser(getCookie("ordrji_username") || "Guest Visitor");

    // Default Date to today
    const today = new Date().toISOString().split("T")[0];
    setFormDate(today);

    loadCMSData();
  }, []);

  const loadCMSData = async () => {
    try {
      setLoading(true);
      const [blogsRes, catsRes] = await Promise.all([
        fetch("/api/blogs?status=all"),
        fetch("/api/categories")
      ]);

      if (blogsRes.ok) {
        const blogsData = await blogsRes.json();
        // Exclude soft-deleted in this simplified form
        setBlogs(blogsData.filter((b: BlogPost) => b.status !== "Deleted"));
      }
      if (catsRes.ok) {
        setCategories(await catsRes.json());
      }
    } catch (err) {
      console.error("Failed to load CMS tables:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleTitleChange = (val: string) => {
    setFormTitle(val);
    if (!editingId) {
      const generated = val
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
      setFormSlug(generated);
    }
  };

  const triggerNewBlog = () => {
    setEditingId(null);
    setFormTitle("");
    setFormSlug("");
    setFormDescription("");
    setFormContent("");
    setFormCoverImage(PRESET_IMAGES[0]);
    setFormCategoryId("tech");
    setFormTags("");
    setFormStatus("Published");
    setFormAuthor(activeUser);
    const today = new Date().toISOString().split("T")[0];
    setFormDate(today);
  };

  const loadBlogToForm = (post: BlogPost) => {
    setEditingId(post.id);
    setFormTitle(post.title);
    setFormSlug(post.slug);
    setFormDescription(post.description);
    setFormContent(post.content);
    setFormCoverImage(post.coverImage);
    setFormCategoryId(post.categoryId);
    setFormTags(post.tags?.join(", ") || "");
    setFormStatus(post.status === "Published" ? "Published" : "Draft");
    setFormAuthor(post.createdBy || activeUser);
    
    // Parse date if present
    if (post.createdDate) {
      try {
        const parsed = new Date(post.createdDate);
        if (!isNaN(parsed.getTime())) {
          setFormDate(parsed.toISOString().split("T")[0]);
        }
      } catch (e) {
        // fallback
      }
    }
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formTitle.trim() || !formDescription.trim()) {
      alert("Please fill in the title and description.");
      return;
    }

    // Convert date input (YYYY-MM-DD) to friendly format
    const friendlyDate = new Date(formDate).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    const payload = {
      title: formTitle,
      slug: formSlug,
      description: formDescription,
      content: formContent,
      coverImage: formCoverImage,
      categoryId: formCategoryId,
      tags: formTags.split(",").map(t => t.trim()).filter(Boolean),
      status: formStatus,
      createdBy: formAuthor,
      createdDate: friendlyDate,
      summaryOfChanges: editingId ? "Updated via Simplified Editor" : "Created via Simplified Editor"
    };

    const method = editingId ? "PUT" : "POST";
    const endpoint = editingId ? `/api/blogs/${editingId}` : "/api/blogs";

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert(editingId ? "Blog updated successfully!" : "Blog created successfully!");
        loadCMSData();
        triggerNewBlog();
      } else {
        const err = await res.json();
        alert(`Error: ${err.error || "Failed to save article"}`);
      }
    } catch (err) {
      alert("An unexpected network error occurred.");
    }
  };

  const handleLogout = async () => {
    if (confirm("Are you sure you want to log out?")) {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        window.location.href = "/blog";
      }
    }
  };

  // Textarea HTML Insertion Helpers
  const insertHTMLTag = (tag: string, endTag: string = "") => {
    const textarea = document.getElementById("content-editor") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);
    
    let replacement = "";
    if (tag === "ul" || tag === "ol") {
      replacement = `<${tag}>\n  <li>${selected || "Item"}</li>\n</${tag}>`;
    } else if (tag === "a") {
      replacement = `<a href="https://example.com" style="color:var(--accent-orange); font-weight:700;">${selected || "Link Text"}</a>`;
    } else {
      replacement = `<${tag}>${selected}${endTag || `</${tag}>`}`;
    }

    setFormContent(text.substring(0, start) + replacement + text.substring(end));
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + tag.length + 2, start + tag.length + 2 + selected.length);
    }, 50);
  };

  if (loading && blogs.length === 0) {
    return (
      <div className="cms-loading-wrapper">
        <div className="cms-spinner" />
        <p>Loading database and credentials...</p>
      </div>
    );
  }

  return (
    <div className="cms-root-layout">
      {/* Dynamic Header */}
      <header className="cms-header-bar">
        <div className="header-brand-wrap">
          <BookOpen size={20} style={{ color: "var(--accent-orange)" }} />
          <div>
            <h1>Ordrji Resource Manager</h1>
            <span>Active Session: <strong>{activeUser}</strong> ({activeRole})</span>
          </div>
        </div>

        <div className="header-actions">
          <Link href="/blog" className="btn-secondary flex-btn">
            <ArrowLeft size={14} />
            <span>Public Blog</span>
          </Link>
          <button onClick={handleLogout} className="btn-secondary flex-btn sign-out-btn">
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Workspace split */}
      <div className="cms-workspace-grid">
        
        {/* Left Side: Recent Articles Directory */}
        <aside className="cms-directory-sidebar">
          <div className="directory-header-row">
            <h3>Directory</h3>
            <button onClick={triggerNewBlog} className="btn-primary flex-btn write-btn">
              <Plus size={14} />
              <span>Write Post</span>
            </button>
          </div>

          <div className="directory-posts-list">
            {blogs.map((post) => (
              <div key={post.id} className={`directory-card ${editingId === post.id ? "active-editing" : ""}`}>
                <div className="dir-card-body">
                  <h4>{post.title}</h4>
                  <span className="dir-card-meta">
                    By {post.createdBy || "Admin"} • {post.createdDate || "Today"}
                  </span>
                  <div className="dir-card-tags">
                    <span className={`status-badge ${post.status.toLowerCase()}`}>
                      {post.status}
                    </span>
                    <span className="cat-badge">
                      {categories.find(c => c.id === post.categoryId)?.name || "Technology"}
                    </span>
                  </div>
                </div>

                <div className="dir-card-actions">
                  <button 
                    onClick={() => loadBlogToForm(post)} 
                    className="dir-edit-btn"
                    title="Load into Editor"
                  >
                    <Edit size={13} />
                    <span>Edit</span>
                  </button>
                </div>
              </div>
            ))}
            {blogs.length === 0 && (
              <p className="no-posts-text">No articles found in the database. Click "Write Post" to seed your first post.</p>
            )}
          </div>
        </aside>

        {/* Right Side: Simple Creator/Editor Form */}
        <main className="cms-editor-panel">
          <form onSubmit={handleSaveBlog} className="editor-card">
            <div className="editor-card-header">
              <h2>{editingId ? "Modify Blog Article" : "Compose New Blog Article"}</h2>
              <p>Fill out the fields to publish an insights article directly to the public resources portal.</p>
            </div>

            <div className="editor-form-grid">
              
              {/* Row 1: Title & Slug */}
              <div className="form-group span-2">
                <label className="form-label" htmlFor="title-field">Article Title</label>
                <input
                  id="title-field"
                  type="text"
                  className="form-input"
                  placeholder="e.g. How QR Code Ordering Increases Average Bill Value"
                  value={formTitle}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  required
                />
              </div>

              <div className="form-group span-2">
                <label className="form-label" htmlFor="slug-field">URL Slug (Auto Generated)</label>
                <input
                  id="slug-field"
                  type="text"
                  className="form-input slug-input"
                  placeholder="e.g. qr-ordering-increases-sales"
                  value={formSlug}
                  onChange={(e) => setFormSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                  required
                />
              </div>

              {/* Row 2: Author name & Publish Date */}
              <div className="form-group">
                <label className="form-label" htmlFor="author-field">Author Name</label>
                <input
                  id="author-field"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Rohan Mehta"
                  value={formAuthor}
                  onChange={(e) => setFormAuthor(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="date-field">Publish Date</label>
                <input
                  id="date-field"
                  type="date"
                  className="form-input"
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                  required
                />
              </div>

              {/* Row 3: Category & Comma Tags */}
              <div className="form-group">
                <label className="form-label" htmlFor="category-field">Category Classification</label>
                <select
                  id="category-field"
                  className="form-select"
                  value={formCategoryId}
                  onChange={(e) => setFormCategoryId(e.target.value)}
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="tags-field">Search Tags (Comma separated)</label>
                <input
                  id="tags-field"
                  type="text"
                  className="form-input"
                  placeholder="pos, billing, qr-ordering"
                  value={formTags}
                  onChange={(e) => setFormTags(e.target.value)}
                />
              </div>

              {/* Cover image url + presets selector */}
              <div className="form-group span-2">
                <label className="form-label">Cover Photo Link</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Paste cover photo URL link"
                  value={formCoverImage}
                  onChange={(e) => setFormCoverImage(e.target.value)}
                  required
                />
                
                <div className="preset-images-picker">
                  <span>Or select a preset:</span>
                  <div className="preset-grid">
                    {PRESET_IMAGES.map((img, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setFormCoverImage(img)}
                        className={`preset-img-btn ${formCoverImage === img ? "selected" : ""}`}
                        style={{ backgroundImage: `url(${img})` }}
                        title="Pick Image"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Short Description */}
              <div className="form-group span-2">
                <label className="form-label" htmlFor="desc-field">Short Description (SEO Card summary)</label>
                <textarea
                  id="desc-field"
                  className="form-textarea"
                  placeholder="Summarize the article briefly for the search card preview..."
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  required
                />
              </div>

              {/* Content editor */}
              <div className="form-group span-2">
                <div className="editor-toolbar-header">
                  <label className="form-label" htmlFor="content-editor">Article Content (HTML allowed)</label>
                  
                  <div className="html-toolbar">
                    <button type="button" onClick={() => insertHTMLTag("b")} title="Bold text">B</button>
                    <button type="button" onClick={() => insertHTMLTag("i")} title="Italic text">I</button>
                    <button type="button" onClick={() => insertHTMLTag("h3")} title="Section Heading">H3</button>
                    <button type="button" onClick={() => insertHTMLTag("ul")} title="Bullet List">List</button>
                    <button type="button" onClick={() => insertHTMLTag("a")} title="Insert Link">Link</button>
                  </div>
                </div>

                <textarea
                  id="content-editor"
                  className="form-textarea content-area"
                  placeholder="Write paragraph HTML codes here..."
                  rows={14}
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  required
                />
              </div>

              {/* Status and Submission Actions */}
              <div className="form-group">
                <label className="form-label" htmlFor="status-field">Status</label>
                <select
                  id="status-field"
                  className="form-select"
                  value={formStatus}
                  onChange={(e) => setFormStatus(e.target.value as "Draft" | "Published")}
                >
                  <option value="Published">Publish (Visible to visitors)</option>
                  <option value="Draft">Draft (Save privately)</option>
                </select>
              </div>

              <div className="form-actions-row">
                {editingId && (
                  <button type="button" onClick={triggerNewBlog} className="btn-secondary cancel-btn">
                    Discard Changes
                  </button>
                )}
                <button type="submit" className="btn-primary btn-red save-btn">
                  <Check size={14} style={{ marginRight: "4px" }} />
                  <span>{editingId ? "Save Changes" : "Create & Publish"}</span>
                </button>
              </div>

            </div>
          </form>
        </main>

      </div>

      <RoleSwitcher />

      <style jsx global>{`
        .cms-root-layout {
          background-color: #f8fafc;
          min-height: 100vh;
          color: #0f172a;
          font-family: var(--font-sans), sans-serif;
          display: flex;
          flex-direction: column;
        }

        .cms-loading-wrapper {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #f8fafc;
          gap: 1rem;
        }

        .cms-spinner {
          width: 32px;
          height: 32px;
          border: 3px solid rgba(227, 6, 19, 0.1);
          border-top-color: var(--accent-orange);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        /* Header block */
        .cms-header-bar {
          background: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          sticky: top;
          z-index: 10;
        }

        .header-brand-wrap {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .header-brand-wrap h1 {
          font-size: 1.15rem;
          font-weight: 850;
          letter-spacing: -0.5px;
          margin: 0;
        }

        .header-brand-wrap span {
          font-size: 0.75rem;
          color: #64748b;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .flex-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-weight: 700;
        }

        .sign-out-btn:hover {
          color: #ef4444 !important;
          border-color: rgba(239, 68, 68, 0.2) !important;
        }

        /* Workspace Grid split layout */
        .cms-workspace-grid {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
          min-height: calc(100vh - 65px);
        }

        @media (min-width: 900px) {
          .cms-workspace-grid {
            grid-template-columns: 320px 1fr;
          }
        }

        /* Left Side: Directory Sidebar */
        .cms-directory-sidebar {
          background: #ffffff;
          border-right: 1px solid #e2e8f0;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          height: 100%;
          overflow-y: auto;
        }

        .directory-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #f1f5f9;
          padding-bottom: 0.75rem;
        }

        .directory-header-row h3 {
          font-size: 0.95rem;
          font-weight: 850;
          letter-spacing: -0.3px;
          margin: 0;
        }

        .write-btn {
          font-size: 0.75rem !important;
          padding: 0.4rem 0.75rem !important;
        }

        .directory-posts-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .directory-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 0.85rem 1rem;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          transition: all 0.2s;
        }

        .directory-card:hover {
          border-color: #cbd5e1;
          background: #f1f5f9;
        }

        .directory-card.active-editing {
          border-color: var(--accent-orange);
          background: rgba(227, 6, 19, 0.02);
          box-shadow: 0 4px 12px rgba(227, 6, 19, 0.04);
        }

        .dir-card-body {
          flex: 1;
          min-width: 0;
        }

        .dir-card-body h4 {
          font-size: 0.82rem;
          font-weight: 800;
          line-height: 1.3;
          margin: 0 0 0.25rem;
          color: #0f172a;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .dir-card-meta {
          font-size: 0.65rem;
          color: #64748b;
          display: block;
          margin-bottom: 0.4rem;
        }

        .dir-card-tags {
          display: flex;
          gap: 0.35rem;
          align-items: center;
        }

        .status-badge {
          font-size: 0.58rem;
          font-weight: 800;
          text-transform: uppercase;
          padding: 0.1rem 0.35rem;
          border-radius: 4px;
        }

        .status-badge.published { background: rgba(5, 150, 105, 0.08); color: #059669; }
        .status-badge.draft { background: rgba(100, 116, 139, 0.08); color: #64748b; }

        .cat-badge {
          font-size: 0.58rem;
          font-weight: 700;
          color: #64748b;
          background: #e2e8f0;
          padding: 0.1rem 0.35rem;
          border-radius: 4px;
        }

        .dir-card-actions {
          margin-left: 0.5rem;
        }

        .dir-edit-btn {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          padding: 0.3rem 0.5rem;
          font-size: 0.68rem;
          font-weight: 800;
          color: #0f172a;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.2rem;
          transition: all 0.15s;
        }

        .dir-edit-btn:hover {
          border-color: var(--accent-orange);
          color: var(--accent-orange);
        }

        .no-posts-text {
          font-size: 0.75rem;
          color: #64748b;
          text-align: center;
          line-height: 1.4;
          padding: 1.5rem 0;
        }

        /* Right Side: Creator Form */
        .cms-editor-panel {
          padding: 2rem;
          overflow-y: auto;
        }

        .editor-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 2.25rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
          max-width: 860px;
          margin: 0 auto;
        }

        .editor-card-header {
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 1.25rem;
          margin-bottom: 1.75rem;
        }

        .editor-card-header h2 {
          font-size: 1.4rem;
          font-weight: 900;
          letter-spacing: -0.6px;
          margin: 0 0 0.25rem;
        }

        .editor-card-header p {
          font-size: 0.88rem;
          color: #64748b;
          margin: 0;
        }

        .editor-form-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }

        @media (min-width: 600px) {
          .editor-form-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .span-2 {
          grid-column: span 1;
        }

        @media (min-width: 600px) {
          .span-2 {
            grid-column: span 2;
          }
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .form-label {
          font-size: 0.75rem;
          font-weight: 750;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #475569;
        }

        .form-input, .form-select, .form-textarea {
          width: 100%;
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          padding: 0.65rem 0.85rem;
          font-size: 0.88rem;
          color: #0f172a;
          transition: all 0.2s;
          font-family: inherit;
        }

        .form-input:focus, .form-select:focus, .form-textarea:focus {
          outline: none;
          background: #ffffff;
          border-color: var(--accent-orange);
          box-shadow: 0 0 0 3px rgba(227, 6, 19, 0.08);
        }

        .slug-input {
          font-family: monospace;
          color: #475569;
        }

        /* Preset cover images */
        .preset-images-picker {
          margin-top: 0.5rem;
        }

        .preset-images-picker span {
          font-size: 0.7rem;
          font-weight: 600;
          color: #64748b;
          display: block;
          margin-bottom: 0.35rem;
        }

        .preset-grid {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .preset-img-btn {
          width: 56px;
          height: 40px;
          border-radius: 6px;
          background-size: cover;
          background-position: center;
          border: 2px solid transparent;
          cursor: pointer;
          transition: transform 0.15s, border-color 0.15s;
        }

        .preset-img-btn:hover {
          transform: scale(1.05);
        }

        .preset-img-btn.selected {
          border-color: var(--accent-orange);
          box-shadow: 0 4px 8px rgba(227, 6, 19, 0.15);
        }

        /* HTML content editor elements */
        .editor-toolbar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.25rem;
        }

        .html-toolbar {
          display: flex;
          gap: 0.25rem;
        }

        .html-toolbar button {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 4px;
          padding: 0.2rem 0.5rem;
          font-size: 0.68rem;
          font-weight: 800;
          cursor: pointer;
          color: #475569;
          transition: all 0.15s;
        }

        .html-toolbar button:hover {
          border-color: var(--accent-orange);
          color: var(--accent-orange);
          background: rgba(227, 6, 19, 0.02);
        }

        .content-area {
          font-family: monospace;
          line-height: 1.5;
          font-size: 0.85rem;
        }

        .form-actions-row {
          display: flex;
          gap: 0.5rem;
          justify-content: flex-end;
          align-items: center;
          margin-top: 1rem;
        }

        @media (min-width: 600px) {
          .form-actions-row {
            grid-column: span 2;
          }
        }

        .save-btn {
          padding: 0.65rem 1.25rem !important;
          border-radius: 8px !important;
          font-size: 0.85rem !important;
        }

        .cancel-btn {
          padding: 0.65rem 1.25rem !important;
          border-radius: 8px !important;
          font-size: 0.85rem !important;
        }

        .cancel-btn:hover {
          color: #ef4444 !important;
          border-color: rgba(239, 68, 68, 0.2) !important;
        }
      `}</style>
    </div>
  );
}
