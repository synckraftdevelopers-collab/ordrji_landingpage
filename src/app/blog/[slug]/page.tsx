import React from "react";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import type { Metadata } from "next";
import NavbarWrapper from "@/app/[slug]/NavbarWrapper";
import TableOfContents from "@/components/TableOfContents";
import SocialShare from "@/components/SocialShare";
import CommentsSection from "@/components/CommentsSection";
import RoleSwitcher from "@/components/RoleSwitcher";
import { readTable, BlogPost, Category, Tag, Author } from "@/utils/db";
import { Clock, Calendar, Tag as TagIcon, ArrowLeft, User, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import BlogPostStyles from "./BlogPostStyles";

interface Props {
  params: Promise<{ slug: string }>;
}

// ── Next.js Dynamic SEO Metadata Generation ──────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blogs = readTable<BlogPost>("blogs");
  const blog = blogs.find(b => b.slug === slug);

  if (!blog) return {};

  return {
    title: `${blog.seoTitle || blog.title} | Ordrji Blog`,
    description: blog.seoDescription || blog.description,
    alternates: {
      canonical: blog.canonicalUrl || `https://ordrji.com/blog/${slug}`,
    },
    openGraph: {
      title: blog.seoTitle || blog.title,
      description: blog.seoDescription || blog.description,
      type: "article",
      url: blog.canonicalUrl || `https://ordrji.com/blog/${slug}`,
      images: [
        {
          url: blog.ogImage || blog.coverImage,
          width: 800,
          height: 600,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.seoTitle || blog.title,
      description: blog.seoDescription || blog.description,
      images: [blog.ogImage || blog.coverImage],
    },
    robots: blog.robots || "index, follow",
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  // Retrieve auth role from cookies to allow admins to preview draft/scheduled posts
  const cookieStore = await cookies();
  const role = cookieStore.get("ordrji_role")?.value || "Visitor";

  const blogs = readTable<BlogPost>("blogs");
  const blog = blogs.find(b => b.id === slug || b.slug === slug);

  if (!blog) {
    notFound();
  }

  const publishedBlogs = blogs.filter(b => b.status === "Published");
  const recentlyAdded = publishedBlogs.slice(0, 5);
  const popularPosts = publishedBlogs.filter(b => b.isFeatured).slice(0, 5);

  // Security Access Check:
  // If blog is not Published, only allow Admin & Super Admin to see it
  const isAuthorized = role === "Admin" || role === "Super Admin";
  if (blog.status !== "Published" && !isAuthorized) {
    notFound();
  }

  const categories = readTable<Category>("categories");
  const tags = readTable<Tag>("tags");
  const authors = readTable<Author>("authors");

  // Map category & tags details
  const category = categories.find(c => c.id === blog.categoryId);
  const matchedTags = tags.filter(t => blog.tags.includes(t.id));

  // Find author
  const author = authors.find(a => a.name === blog.createdBy || a.id === blog.createdBy) || {
    id: "contributor",
    name: blog.createdBy || "Ordrji Contributor",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150",
    designation: "Staff Contributor",
    bio: "Writer and researcher at the Ordrji restaurant optimization think-tank."
  };

  // Find related posts (overlapping category or tags, exclude current)
  const relatedPosts = blogs
    .filter(
      p =>
        p.status === "Published" &&
        p.id !== blog.id &&
        (p.categoryId === blog.categoryId || p.tags.some(t => blog.tags.includes(t)))
    )
    .slice(0, 3);

  // ── JSON-LD Schema Markups ──────────────────────────────────────────────
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "description": blog.description,
    "image": blog.coverImage,
    "datePublished": blog.publishedDate ? new Date(blog.publishedDate).toISOString() : undefined,
    "dateModified": new Date(blog.lastUpdatedDate).toISOString(),
    "author": {
      "@type": "Person",
      "name": author.name,
      "jobTitle": author.designation
    },
    "publisher": {
      "@type": "Organization",
      "name": "Ordrji",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ordrji.com/logo-icon.jpg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": blog.canonicalUrl || `https://ordrji.com/blog/${slug}`
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://ordrji.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://ordrji.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": blog.title,
        "item": blog.canonicalUrl || `https://ordrji.com/blog/${slug}`
      }
    ]
  };

  const faqSchemaData = blog.faqSchema && blog.faqSchema.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": blog.faqSchema.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  } : null;

  return (
    <>
      {/* Injecting SEO Schema Markups */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchemaData && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }} />
      )}

      <NavbarWrapper>
        <div className="blog-post-page-root">
          
          {/* Admin Preview Header if not Published */}
          {blog.status !== "Published" && (
            <div className="admin-preview-banner">
              <Sparkles size={16} />
              <span>Preview Mode: Viewing <strong>{blog.status}</strong> article (Visible to Admin/Super Admin only)</span>
            </div>
          )}

          {/* Hero Header Area */}
          <header className="post-hero">
            <div className="container" style={{ maxWidth: 960 }}>
              <Link href="/blog" className="back-link">
                <ArrowLeft size={16} /> Back to Resource Center
              </Link>
              
              <div style={{ display: "flex", gap: "0.50rem", margin: "1.5rem 0 1rem" }}>
                <span className="post-category-tag">{category?.name || "Technology"}</span>
                {blog.isFeatured && <span className="featured-badge"><Sparkles size={11} /> Featured</span>}
              </div>

              <h1 className="post-title">{blog.title}</h1>
              <p className="post-subtitle">{blog.description}</p>
              
              {/* Meta row */}
              <div className="post-meta-row">
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <img src={author.avatar} alt={author.name} className="meta-author-img" />
                  <div>
                    <span className="meta-author-name">By {author.name}</span>
                    <span className="meta-author-title">{author.designation}</span>
                  </div>
                </div>

                <div className="meta-stats">
                  <div className="stat-item">
                    <Calendar size={13} />
                    <span>Created: {blog.createdDate}{blog.createdTime ? ` at ${blog.createdTime}` : ""}</span>
                  </div>
                  <div className="stat-item">
                    <Clock size={13} />
                    <span>{blog.readingTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Cover Image */}
          <div className="container" style={{ maxWidth: 1000, margin: "2rem auto" }}>
            <div className="cover-img-wrapper">
              <img src={blog.coverImage} alt={blog.title} className="post-cover-img" />
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="container" style={{ maxWidth: 1000, paddingBottom: "6rem" }}>
            <div className="post-grid">
              
              {/* Left Column - Sticky Widgets */}
              <aside className="post-sidebar-left">
                <div className="sticky-sidebar-wrap">
                  <SocialShare title={blog.title} url={blog.canonicalUrl || `https://ordrji.com/blog/${slug}`} />
                  <TableOfContents content={blog.content} />

                  {/* Recently Added Widget */}
                  <div className="sidebar-widget" style={{ marginTop: "2rem", borderTop: "1px solid var(--border-color)", paddingTop: "1.5rem" }}>
                    <h4 style={{ fontSize: "0.78rem", fontWeight: 800, textTransform: "uppercase", color: "var(--text-muted)", letterSpacing: "0.5px", marginBottom: "1rem" }}>
                      Recently Added
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      {recentlyAdded.map(rp => (
                        <Link key={rp.id} href={`/blog/${rp.slug}`} style={{ display: "flex", gap: "0.6rem", alignItems: "center", textDecoration: "none", color: "inherit" }} className="widget-post-link">
                          <img src={rp.coverImage} alt={rp.title} style={{ width: "40px", height: "40px", borderRadius: "6px", objectFit: "cover", flexShrink: 0 }} />
                          <div style={{ minWidth: 0 }}>
                            <h5 style={{ fontSize: "0.74rem", fontWeight: 700, margin: 0, color: "var(--text-primary)", lineHeight: 1.35, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                              {rp.title}
                            </h5>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Popular Posts Widget */}
                  <div className="sidebar-widget" style={{ marginTop: "2rem", borderTop: "1px solid var(--border-color)", paddingTop: "1.5rem" }}>
                    <h4 style={{ fontSize: "0.78rem", fontWeight: 800, textTransform: "uppercase", color: "var(--text-muted)", letterSpacing: "0.5px", marginBottom: "1rem" }}>
                      Popular Posts
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      {popularPosts.map(pp => (
                        <Link key={pp.id} href={`/blog/${pp.slug}`} style={{ display: "flex", gap: "0.6rem", alignItems: "center", textDecoration: "none", color: "inherit" }} className="widget-post-link">
                          <img src={pp.coverImage} alt={pp.title} style={{ width: "40px", height: "40px", borderRadius: "6px", objectFit: "cover", flexShrink: 0 }} />
                          <div style={{ minWidth: 0 }}>
                            <h5 style={{ fontSize: "0.74rem", fontWeight: 700, margin: 0, color: "var(--text-primary)", lineHeight: 1.35, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                              {pp.title}
                            </h5>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>

              {/* Center Column - Article Content */}
              <article className="post-main-content">
                <div 
                  className="blog-post-content"
                  dangerouslySetInnerHTML={{ __html: blog.content }} 
                />

                {/* Display Gallery Images if any */}
                {blog.galleryImages && blog.galleryImages.length > 0 && (
                  <div className="gallery-section">
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "1rem" }}>Article Gallery</h3>
                    <div className="gallery-grid">
                      {blog.galleryImages.map((img, i) => (
                        <div key={i} className="gallery-item-wrap">
                          <img src={img} alt={`Gallery ${i}`} className="gallery-img" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Display Videos if any */}
                {blog.videos && blog.videos.length > 0 && (
                  <div className="videos-section">
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "1rem" }}>Article Videos</h3>
                    <div className="videos-grid">
                      {blog.videos.map((vid, i) => (
                        <div key={i} className="video-item-wrap">
                          <video src={vid} controls className="video-player" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags row */}
                {matchedTags.length > 0 && (
                  <div className="post-tags-row">
                    <TagIcon size={14} style={{ color: "var(--text-muted)", marginTop: "0.2rem" }} />
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                      {matchedTags.map(t => (
                        <span key={t.id} className="post-tag-badge">#{t.name}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Social media follow links button stack */}
                {(blog.facebookUrl || blog.twitterUrl || blog.linkedinUrl || blog.instagramUrl) && (
                  <div className="post-author-socials-box" style={{ margin: "2rem 0", padding: "1.25rem", background: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                    <h4 style={{ fontSize: "0.85rem", fontWeight: 800, color: "#0f172a", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "0.75rem" }}>
                      🔗 Connect with the Author
                    </h4>
                    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                      {blog.facebookUrl && (
                        <a href={blog.facebookUrl} target="_blank" rel="noopener noreferrer" className="author-social-btn fb-btn" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#1877f2", color: "#fff", textDecoration: "none", fontSize: "0.82rem", fontWeight: 700, padding: "0.5rem 1rem", borderRadius: "8px", transition: "transform 0.15s" }}>
                          <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                          <span>Facebook</span>
                        </a>
                      )}
                      {blog.twitterUrl && (
                        <a href={blog.twitterUrl} target="_blank" rel="noopener noreferrer" className="author-social-btn tw-btn" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#000", color: "#fff", textDecoration: "none", fontSize: "0.82rem", fontWeight: 700, padding: "0.5rem 1rem", borderRadius: "8px", transition: "transform 0.15s" }}>
                          <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                          <span>Twitter/X</span>
                        </a>
                      )}
                      {blog.linkedinUrl && (
                        <a href={blog.linkedinUrl} target="_blank" rel="noopener noreferrer" className="author-social-btn li-btn" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#0a66c2", color: "#fff", textDecoration: "none", fontSize: "0.82rem", fontWeight: 700, padding: "0.5rem 1rem", borderRadius: "8px", transition: "transform 0.15s" }}>
                          <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                          <span>LinkedIn</span>
                        </a>
                      )}
                      {blog.instagramUrl && (
                        <a href={blog.instagramUrl} target="_blank" rel="noopener noreferrer" className="author-social-btn ig-btn" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)", color: "#fff", textDecoration: "none", fontSize: "0.82rem", fontWeight: 700, padding: "0.5rem 1rem", borderRadius: "8px", transition: "transform 0.15s" }}>
                          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/></svg>
                          <span>Instagram</span>
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* FAQ Interactive Accordion if faqs exist */}
                {blog.faqSchema && blog.faqSchema.length > 0 && (
                  <div className="faq-section">
                    <h3 style={{ fontSize: "1.25rem", fontWeight: 800, margin: "2.5rem 0 1.25rem" }}>Frequently Asked Questions</h3>
                    <div className="faq-accordion-list">
                      {blog.faqSchema.map((faq, idx) => (
                        <details key={idx} className="faq-details" style={{ borderBottom: "1px solid var(--border-color)", padding: "1rem 0" }}>
                          <summary style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontWeight: 700, fontSize: "0.95rem" }}>
                            <span>{faq.q}</span>
                            <span className="faq-details-arrow">▼</span>
                          </summary>
                          <p style={{ marginTop: "0.5rem", color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.6 }}>{faq.a}</p>
                        </details>
                      ))}
                    </div>
                  </div>
                )}

                {/* Detailed Author Card */}
                <div className="author-card-panel shadow-sm">
                  <div className="author-card-layout">
                    <img src={author.avatar} alt={author.name} className="author-card-img" />
                    <div>
                      <span className="author-card-role-title">Written by</span>
                      <h4 className="author-card-name">{author.name}</h4>
                      <p className="author-card-designation">{author.designation}</p>
                      <p className="author-card-bio">{author.bio}</p>
                    </div>
                  </div>

                  <div className="audit-flow-table">
                    <div className="audit-cell">
                      <span className="audit-lbl">Published Date</span>
                      <span className="audit-val">{blog.publishedDate ? `${blog.publishedDate} at ${blog.publishedTime}` : "Pending"}</span>
                    </div>
                    <div className="audit-cell">
                      <span className="audit-lbl">Last Updated</span>
                      <span className="audit-val">{blog.lastUpdatedDate} at {blog.lastUpdatedTime}</span>
                    </div>
                    <div className="audit-cell">
                      <span className="audit-lbl">Edited By</span>
                      <span className="audit-val">{blog.lastEditedBy}</span>
                    </div>
                    {blog.approvedBy && (
                      <div className="audit-cell">
                        <span className="audit-lbl">Approved By</span>
                        <span className="audit-val" style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", color: "var(--accent-green)", fontWeight: 700 }}>
                          <CheckCircle2 size={12} /> {blog.approvedBy}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Persistent Comments Section */}
                <CommentsSection blogId={blog.id} blogSlug={blog.slug} />
              </article>
            </div>

            {/* Related Blogs Section */}
            {relatedPosts.length > 0 && (
              <section className="related-blogs-section">
                <h3 className="related-heading">Related Articles</h3>
                <div className="related-grid">
                  {relatedPosts.map(post => (
                    <Link key={post.id} href={`/blog/${post.slug}`} className="related-card shadow-sm">
                      <img src={post.coverImage} alt={post.title} className="related-img" />
                      <div className="related-body">
                        <h4 className="related-title">{post.title}</h4>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
                          <span>{post.createdDate}</span>
                          <span>{post.readingTime}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Book Demo CTA box */}
            <section className="demo-cta-box glass-card" style={{ marginTop: "4rem" }}>
              <div className="cta-content">
                <span className="badge">UPGRADE YOUR BILLING</span>
                <h2>Get Ordrji POS for Your Restaurant Outlet</h2>
                <p>Join over 3,500+ premium dining outlets, bars, and chains running commission-free table billing systems, automated kitchens, and inventory tracking on Ordrji.</p>
                <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginTop: "1.5rem" }}>
                  <button className="btn-primary btn-red open-demo-btn">Book Free Demo</button>
                  <a href="https://wa.me/919867799655?text=Hi%20Ordrji" target="_blank" rel="noopener noreferrer" className="btn-secondary">Contact Sales</a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </NavbarWrapper>

      <RoleSwitcher />

      <BlogPostStyles />
    </>
  );
}
