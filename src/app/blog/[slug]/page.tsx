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
  const blog = blogs.find(b => b.slug === slug);

  if (!blog) {
    notFound();
  }

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
