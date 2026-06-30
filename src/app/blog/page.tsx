"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookDemoModal from "@/components/BookDemoModal";
import { Plus, Edit, Trash2, X, BookOpen, User, Calendar, Clock, Sparkles, Image as ImageIcon, CheckCircle, ArrowLeft } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  avatar: string;
  date: string;
  readTime: string;
  image: string;
  content: string;
}

const DEFAULT_POSTS: BlogPost[] = [
  {
    id: "qr-ordering-increases-sales",
    title: "How QR Code Ordering Increases Average Bill Value by 22%",
    description: "Discover why dine-in customers order more when they scan to order, and how cafes are streamlining service.",
    category: "Technology",
    author: "Rohan Mehta",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150",
    date: "June 28, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600",
    content: `
      <p>Over the last two years, quick-scan table QR codes have shifted from a safety-first contactless precaution to a high-yielding sales tool. Indian restaurants, cafes, and bakeries are seeing average order values jump by 18% to 25% after migrating from waiter-only billing systems.</p>
      
      <h3 style="font-size:1.3rem; font-weight:800; margin:1.5rem 0 0.75rem; color:var(--text-primary);">Why Bill Values Rise</h3>
      <p>When customers have continuous, zero-pressure access to the menu via their own phone screen, several micro-interactions occur:</p>
      <ul style="margin:1rem 0; padding-left:1.5rem; display:flex; flex-direction:column; gap:0.5rem;">
        <li><strong>Frictionless Re-ordering:</strong> Deciding to order a second round of mocktails or a side of garlic bread takes exactly three taps. No trying to catch a busy waiter's eye.</li>
        <li><strong>Rich Visual Presentation:</strong> Digital menus showcase high-resolution photos of desserts and chef-specials, which trigger impulse orders.</li>
        <li><strong>Automated Upselling:</strong> The system automatically suggests pairings (e.g. "Add cheese crust for ₹50").</li>
      </ul>
      
      <h3 style="font-size:1.3rem; font-weight:800; margin:1.5rem 0 0.75rem; color:var(--text-primary);">Streamlined Kitchen Operations</h3>
      <p>Because QR orders flow directly into the Ordrji POS and digital KDS (Kitchen Display System), there are zero translation or transcription errors. Invoices are generated automatically, and split bills are handled instantly, saving cashiers hours of manual reconciliation.</p>
    `
  },
  {
    id: "inventory-practices-stop-waste",
    title: "5 Inventory Best Practices to Prevent Food Waste and Protect Margins",
    description: "Food cost is the single biggest bottleneck in restaurant scaling. Learn how recipe-based depletion stops raw material waste.",
    category: "Operations",
    author: "Priya Sharma",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    date: "June 22, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1581349485608-9469926a8e5e?auto=format&fit=crop&q=80&w=600",
    content: `
      <p>Food cost is the single biggest bottleneck in restaurant scaling. Raw ingredient price swings, staff over-portioning, and unchecked inventory spoilage directly erode net profits. Here are ways to secure your margins:</p>
      
      <h3 style="font-size:1.3rem; font-weight:800; margin:1.5rem 0 0.75rem; color:var(--text-primary);">1. Automated Recipe-Based Depletion</h3>
      <p>Stop doing weekly manual audits. Connect your billing register to your raw inventory stock. When a customer buys a dish, the exact raw grams (e.g. 100g Paneer, 15ml Cream) should immediately deduct from stock. This highlights raw variance gaps instantly.</p>
      
      <h3 style="font-size:1.3rem; font-weight:800; margin:1.5rem 0 0.75rem; color:var(--text-primary);">2. Implement FIFO Rigorously</h3>
      <p>First-In, First-Out (FIFO) ensures older stock is consumed first. Keep storage rooms organized and use custom shelf labels with expiry dates clearly visible.</p>
      
      <h3 style="font-size:1.3rem; font-weight:800; margin:1.5rem 0 0.75rem; color:var(--text-primary);">3. Set Automated Low-Stock Alert Thresholds</h3>
      <p>Instead of discovering you're out of milk during a busy morning rush, configure your POS dashboard to trigger automated alerts when crucial raw items drop below custom safety levels.</p>
      
      <h3 style="font-size:1.3rem; font-weight:800; margin:1.5rem 0 0.75rem; color:var(--text-primary);">4. Log Wastage Separately</h3>
      <p>Kitchen drops, burnt items, and customer returns must be logged as waste, not just left off the books. This ensures your margins reconcile correctly at the end of the month.</p>
    `
  },
  {
    id: "legacy-vs-cloud-pos",
    title: "Legacy vs. Cloud POS: Why Modern Restaurant Chains are Upgrading",
    description: "Comparing desktop servers vs. cloud-based terminal operating systems for scaling restaurant franchises.",
    category: "Management",
    author: "Vikram Dev",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
    date: "June 15, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1560624052-449f5ddf0c31?auto=format&fit=crop&q=80&w=600",
    content: `
      <p>For decades, restaurant chains relied on on-premise desktop computer servers sitting in back rooms. They were slow, expensive, and locked down local data. If a hard drive failed during a Friday rush, the restaurant went blind.</p>
      
      <h3 style="font-size:1.3rem; font-weight:800; margin:1.5rem 0 0.75rem; color:var(--text-primary);">The Cloud-Native Transition</h3>
      <p>Modern restaurant groups are migrating to lightweight, cloud-based terminal architectures like Ordrji for several key reasons:</p>
      <ul style="margin:1rem 0; padding-left:1.5rem; display:flex; flex-direction:column; gap:0.5rem;">
        <li><strong>Real-time Central Control:</strong> Update menu prices, launch seasonal combos, or change staff access rights across 50 outlets instantly from your mobile phone.</li>
        <li><strong>Offline-First Resilience:</strong> True cloud apps maintain local SQLite database cache safety in the browser, allowing you to print receipt bills and route kitchen orders even if local Wi-Fi drops.</li>
        <li><strong>Consolidated Dashboard Analytics:</strong> Compare outlet performances, top menu items, and labor costs in a unified command center.</li>
      </ul>
    `
  }
];

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  
  // Modal states
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // Editor form state
  const [editId, setEditId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Technology");
  const [author, setAuthor] = useState("Ordrji Contributor");
  const [readTime, setReadTime] = useState("5 min read");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");

  // Load from local storage or set defaults
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("ordrji_blog_posts");
      if (stored) {
        setPosts(JSON.parse(stored));
      } else {
        setPosts(DEFAULT_POSTS);
        localStorage.setItem("ordrji_blog_posts", JSON.stringify(DEFAULT_POSTS));
      }
    }
  }, []);

  const saveToLocalStorage = (updated: BlogPost[]) => {
    setPosts(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("ordrji_blog_posts", JSON.stringify(updated));
    }
  };

  const openAddForm = () => {
    setEditId(null);
    setTitle("");
    setDescription("");
    setCategory("Technology");
    setAuthor("Ordrji Contributor");
    setReadTime("5 min read");
    setImageUrl("");
    setContent("");
    setIsFormOpen(true);
  };

  const openEditForm = (post: BlogPost, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering open card reading modal
    setEditId(post.id);
    setTitle(post.title);
    setDescription(post.description);
    setCategory(post.category);
    setAuthor(post.author);
    setReadTime(post.readTime);
    setImageUrl(post.image);
    setContent(post.content);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this article?")) {
      const updated = posts.filter(p => p.id !== id);
      saveToLocalStorage(updated);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Please fill out Title and Description fields.");
      return;
    }

    let updatedPosts = [...posts];

    if (editId) {
      // Edit mode
      updatedPosts = posts.map(p => {
        if (p.id === editId) {
          return {
            ...p,
            title,
            description,
            category,
            author,
            readTime,
            image: imageUrl,
            content: content || `<p>${description}</p>`
          };
        }
        return p;
      });
    } else {
      // Create mode
      const newSlug = title.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .substring(0, 40);
        
      const newPost: BlogPost = {
        id: `${newSlug}-${Date.now()}`,
        title,
        description,
        category,
        author,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150",
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        readTime,
        image: imageUrl,
        content: content || `<p>${description}</p>`
      };
      updatedPosts = [newPost, ...posts];
    }

    saveToLocalStorage(updatedPosts);
    setIsFormOpen(false);
  };

  return (
    <>
      <Navbar onBookDemo={() => setIsDemoOpen(true)} />

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

              {/* Create Blog button */}
              <div>
                <button 
                  onClick={openAddForm}
                  className="btn-primary btn-red"
                  style={{ padding: "0.65rem 1.35rem", fontSize: "0.85rem", display: "inline-flex", alignItems: "center", gap: "0.4rem", borderRadius: 10 }}
                >
                  <Plus size={16} /> Create Blog
                </button>
              </div>
            </div>
          </div>

          {/* Blog posts Grid */}
          <div className="blog-grid">
            {posts.map((post) => (
              <div key={post.id} className="blog-card" onClick={() => setSelectedPost(post)}>
                {/* Cover image wrapper */}
                <div className="blog-card-image-wrap">
                  <img src={post.image} alt={post.title} className="blog-card-img" />
                  <span className="blog-card-category">{post.category}</span>
                </div>

                {/* Content Area */}
                <div className="blog-card-body">
                  <h3 className="blog-card-title">{post.title}</h3>
                  <p className="blog-card-desc">{post.description}</p>
                  
                  {/* Meta details */}
                  <div className="blog-card-meta">
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <img src={post.avatar} alt={post.author} className="author-avatar" />
                      <span className="author-name">{post.author}</span>
                    </div>
                    <div className="meta-read">
                      <Clock size={12} style={{ color: "var(--text-muted)" }} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Admin Controls */}
                  <div className="admin-actions" onClick={e => e.stopPropagation()}>
                    <button onClick={(e) => openEditForm(post, e)} className="admin-edit-btn">
                      <Edit size={14} /> Edit
                    </button>
                    <button onClick={(e) => handleDelete(post.id, e)} className="admin-del-btn">
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* ── ARTICLE READER MODAL ──────────────────────────────────────── */}
      {selectedPost && (
        <div className="modal-overlay" onClick={() => setSelectedPost(null)}>
          <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedPost(null)}>
              <X size={20} />
            </button>
            <div className="reader-hero">
              <img src={selectedPost.image} alt={selectedPost.title} className="reader-hero-img" />
              <div className="reader-hero-overlay" />
              <div className="reader-header-text">
                <span className="reader-category">{selectedPost.category}</span>
                <h1 className="reader-title">{selectedPost.title}</h1>
                <div className="reader-meta">
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <img src={selectedPost.avatar} alt={selectedPost.author} className="author-avatar-large" />
                    <div>
                      <h5 style={{ margin: 0, fontWeight: 700, fontSize: "0.9rem" }}>{selectedPost.author}</h5>
                      <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.7)" }}>{selectedPost.date}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.85rem", color: "rgba(255,255,255,0.8)" }}>
                    <Clock size={14} /> <span>{selectedPost.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="reader-body">
              <div dangerouslySetInnerHTML={{ __html: selectedPost.content }} style={{ lineHeight: 1.75, color: "var(--text-secondary)" }} />
              
              <div style={{ borderTop: "1px solid var(--border-color)", marginTop: "2.5rem", paddingTop: "2rem", textAlign: "center" }}>
                <h4 style={{ fontWeight: 800, fontSize: "1.1rem", marginBottom: "0.5rem" }}>Need POS or QR ordering setups in your outlet?</h4>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", maxWidth: "440px", margin: "0 auto 1.25rem" }}>
                  Join over 3,500+ Indian restaurants using Ordrji to manage tables, billing printers, and warehouse stock.
                </p>
                <button 
                  onClick={() => {
                    setSelectedPost(null);
                    setIsDemoOpen(true);
                  }}
                  className="btn-primary btn-red"
                  style={{ padding: "0.65rem 1.5rem", fontSize: "0.9rem" }}
                >
                  Book Free Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── CREATE / EDIT ARTICLE FORM DRAWER ────────────────────────── */}
      {isFormOpen && (
        <div className="modal-overlay" onClick={() => setIsFormOpen(false)}>
          <div className="modal-content-card editor-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setIsFormOpen(false)}>
              <X size={20} />
            </button>
            <div style={{ padding: "2rem" }}>
              <div style={{ marginBottom: "1.5rem" }}>
                <span className="blog-eyebrow"><Sparkles size={11} /> Article Creator</span>
                <h2 style={{ fontSize: "1.6rem", fontWeight: 900, letterSpacing: "-1px", margin: "0.35rem 0 0" }}>
                  {editId ? "Edit Article Details" : "Create New Article"}
                </h2>
              </div>

              <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div className="field-wrap">
                  <label className="field-label">Article Title *</label>
                  <input 
                    type="text"
                    required
                    placeholder="Enter catching title..." 
                    className="field-input" 
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                  />
                </div>
                
                <div className="field-wrap">
                  <label className="field-label">Short Description *</label>
                  <input 
                    type="text"
                    required
                    placeholder="A brief summary for the grid card..." 
                    className="field-input" 
                    value={description} 
                    onChange={e => setDescription(e.target.value)} 
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }} className="form-row">
                  <div className="field-wrap">
                    <label className="field-label">Category *</label>
                    <select className="field-input" value={category} onChange={e => setCategory(e.target.value)}>
                      <option>Technology</option>
                      <option>Operations</option>
                      <option>Management</option>
                      <option>Marketing</option>
                    </select>
                  </div>
                  <div className="field-wrap">
                    <label className="field-label">Author Name</label>
                    <input 
                      type="text" 
                      className="field-input" 
                      value={author} 
                      onChange={e => setAuthor(e.target.value)} 
                    />
                  </div>
                  <div className="field-wrap">
                    <label className="field-label">Read Time</label>
                    <input 
                      type="text" 
                      className="field-input" 
                      value={readTime} 
                      onChange={e => setReadTime(e.target.value)} 
                    />
                  </div>
                </div>

                {/* Image Upload from File Explorer */}
                <div className="field-wrap">
                  <label className="field-label">Cover Image *</label>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.4rem" }}>
                    Upload an image from your device:
                  </span>
                  <div 
                    style={{
                      border: "2px dashed var(--border-color)",
                      borderRadius: "12px",
                      padding: "1.5rem",
                      textAlign: "center",
                      background: "rgba(255,255,255,0.4)",
                      cursor: "pointer",
                      transition: "border-color 0.2s, background 0.2s",
                      position: "relative"
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                        const file = e.dataTransfer.files[0];
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          if (event.target?.result) {
                            setImageUrl(event.target.result as string);
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="image-upload-zone"
                  >
                    <input 
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          const file = e.target.files[0];
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            if (event.target?.result) {
                              setImageUrl(event.target.result as string);
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      style={{
                        position: "absolute",
                        inset: 0,
                        opacity: 0,
                        cursor: "pointer",
                        width: "100%",
                        height: "100%"
                      }}
                      id="image-file-input"
                    />
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                      <ImageIcon size={28} style={{ color: "var(--accent-orange)" }} />
                      <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>
                        Click to select or drag & drop photo
                      </span>
                      <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                        Supports PNG, JPG, JPEG, WEBP
                      </span>
                    </div>
                  </div>
                  {imageUrl && (
                    <div style={{ marginTop: "0.75rem", borderRadius: "10px", overflow: "hidden", border: "1px solid var(--border-color)", position: "relative", height: "140px" }}>
                      <img src={imageUrl} alt="Uploaded cover preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      <span style={{ position: "absolute", top: "0.5rem", right: "0.5rem", background: "rgba(0,0,0,0.6)", color: "#fff", fontSize: "0.65rem", padding: "0.2rem 0.5rem", borderRadius: "6px", fontWeight: 800 }}>
                        PREVIEW
                      </span>
                    </div>
                  )}
                </div>

                <div className="field-wrap">
                  <label className="field-label">Article Body Content (HTML allowed) *</label>
                  <textarea 
                    rows={8} 
                    required
                    className="field-input" 
                    placeholder="Write your paragraphs here. You can use standard <p>, <h3>, <strong> tags for styling..." 
                    value={content} 
                    onChange={e => setContent(e.target.value)}
                    style={{ resize: "vertical", fontFamily: "monospace", fontSize: "0.85rem" }}
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn-primary btn-red" 
                  style={{ padding: "0.85rem", justifyContent: "center", fontSize: "0.95rem", marginTop: "0.5rem" }}
                >
                  <CheckCircle size={16} /> Save Article
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <BookDemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />

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
          margin-bottom: 4rem;
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

        .admin-active {
          background: rgba(227,6,19,0.08) !important;
          border-color: rgba(227,6,19,0.3) !important;
          color: var(--accent-orange) !important;
        }

        /* ── Grid ── */
        .blog-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
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
          /* Clamp text to 2 lines */
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

        .author-avatar {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          object-fit: cover;
        }
        .author-name {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .meta-read {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.78rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        /* ── Admin overlay actions ── */
        .admin-actions {
          display: flex;
          gap: 0.5rem;
          margin-top: 1rem;
          border-top: 1px dashed var(--border-color);
          padding-top: 0.85rem;
        }
        .admin-edit-btn, .admin-del-btn {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.3rem;
          font-size: 0.78rem;
          font-weight: 700;
          padding: 0.45rem;
          border-radius: 8px;
          border: 1px solid transparent;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s;
        }
        .admin-edit-btn {
          background: var(--bg-primary);
          color: var(--text-primary);
          border-color: var(--border-color);
        }
        .admin-edit-btn:hover {
          background: #fff;
          border-color: var(--accent-orange);
          color: var(--accent-orange);
        }
        .admin-del-btn {
          background: rgba(227,6,19,0.06);
          color: #e30613;
        }
        .admin-del-btn:hover {
          background: #e30613;
          color: #fff;
        }

        /* ── Modal overlay and cards ── */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15,12,10,0.65);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }

        .modal-content-card {
          background: #fdfaf4;
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 24px;
          max-width: 720px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 32px 72px -16px rgba(0, 0, 0, 0.28);
        }
        .editor-card {
          max-width: 600px !important;
        }

        .modal-close-btn {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,0.25);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.15);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: background-color 0.18s, color 0.18s;
        }
        .modal-close-btn:hover {
          background: #fff;
          color: var(--text-primary);
        }
        .editor-card .modal-close-btn {
          background: #f0ebe0;
          color: #8c7d6e;
          border-color: rgba(0,0,0,0.06);
        }
        .editor-card .modal-close-btn:hover {
          background: #e8e0d0;
          color: #1e1b18;
        }

        /* ── Reader Elements ── */
        .reader-hero {
          position: relative;
          aspect-ratio: 1.8;
          overflow: hidden;
          background: #000;
        }
        .reader-hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .reader-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(15,12,10,0.92) 0%, rgba(15,12,10,0.4) 60%, rgba(15,12,10,0.1) 100%);
        }
        .reader-header-text {
          position: absolute;
          bottom: 2rem;
          left: 2.25rem;
          right: 2.25rem;
          color: #fff;
        }
        .reader-category {
          font-size: 0.72rem;
          font-weight: 800;
          text-transform: uppercase;
          color: #fdfaf4;
          background: var(--accent-orange);
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
          letter-spacing: 0.5px;
          display: inline-block;
          margin-bottom: 0.85rem;
        }
        .reader-title {
          font-size: clamp(1.4rem, 4vw, 2.1rem);
          font-weight: 900;
          line-height: 1.25;
          letter-spacing: -1.2px;
          margin: 0 0 1rem;
        }
        .reader-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid rgba(255,255,255,0.15);
          padding-top: 0.85rem;
        }
        .author-avatar-large {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          object-fit: cover;
        }

        .reader-body {
          padding: 2.5rem 2.25rem;
        }

        /* ── Image templates selector pills ── */
        .img-template-pill {
          aspect-ratio: 1.8;
          border-radius: 8px;
          background-size: cover;
          background-position: center;
          position: relative;
          cursor: pointer;
          overflow: hidden;
          border: 2px solid transparent;
          transition: border-color 0.2s;
        }
        .img-template-pill::before {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.45);
        }
        .img-template-pill:hover::before {
          background: rgba(0,0,0,0.3);
        }
        .img-template-pill.selected {
          border-color: var(--accent-orange);
        }
        .img-template-pill.selected::before {
          background: rgba(227,6,19,0.3) !important;
        }
        .pill-label {
          position: absolute;
          bottom: 0.35rem;
          left: 0.5rem;
          right: 0.5rem;
          font-size: 0.65rem;
          font-weight: 800;
          color: #fff;
          text-align: center;
          text-shadow: 0 1px 2px rgba(0,0,0,0.6);
        }

        /* ── Editor Form CSS ── */
        .field-wrap {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .field-label {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: 0.3px;
        }
        .field-input {
          padding: 0.75rem 1rem;
          border-radius: 10px;
          border: 1px solid var(--border-color);
          background: rgba(255, 255, 255, 0.9);
          font-family: inherit;
          font-size: 0.9rem;
          color: var(--text-primary);
          transition: border-color 0.2s, box-shadow 0.2s, background-color 0.2s;
          outline: none;
        }
        .field-input:focus {
          border-color: var(--accent-orange);
          box-shadow: 0 0 0 3px rgba(194, 65, 12, 0.08);
          background-color: #fff;
        }
        .field-input::placeholder {
          color: var(--text-muted);
        }
        select.field-input {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%238c7d6e'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          background-size: 1rem;
          padding-right: 2.5rem;
        }
        .image-upload-zone:hover {
          border-color: var(--accent-orange) !important;
          background: rgba(194, 65, 12, 0.03) !important;
        }
        
        @media (max-width: 640px) {
          .form-row {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
        }
      `}</style>
    </>
  );
}
