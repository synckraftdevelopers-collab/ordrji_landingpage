"use client";

import React from "react";

export default function BlogPostStyles() {
  return (
    <style jsx global>{`
      .blog-post-page-root {
        background-color: var(--bg-primary);
        min-height: 100vh;
      }

      .admin-preview-banner {
        background: #c2410c;
        color: #ffffff;
        padding: 0.65rem 1rem;
        font-size: 0.8rem;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        text-align: center;
        position: sticky;
        top: 0;
        z-index: 1000;
      }

      .post-hero {
        padding-top: 8rem;
      }

      .back-link {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        font-size: 0.8rem;
        font-weight: 700;
        color: var(--text-muted);
        transition: color 0.2s;
      }
      .back-link:hover {
        color: var(--accent-orange);
      }

      .post-category-tag {
        font-size: 0.7rem;
        font-weight: 800;
        text-transform: uppercase;
        background: rgba(227,6,19,0.06);
        color: var(--accent-orange);
        padding: 0.25rem 0.6rem;
        border-radius: 6px;
        letter-spacing: 0.5px;
        border: 1px solid rgba(227,6,19,0.15);
      }

      .featured-badge {
        font-size: 0.7rem;
        font-weight: 800;
        text-transform: uppercase;
        background: #1e1b18;
        color: #ffffff;
        padding: 0.25rem 0.6rem;
        border-radius: 6px;
        letter-spacing: 0.5px;
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
      }

      .post-title {
        font-size: clamp(2rem, 5vw, 2.75rem);
        font-weight: 900;
        line-height: 1.15;
        letter-spacing: -1.5px;
        margin-bottom: 0.75rem;
        color: var(--text-primary);
      }

      .post-subtitle {
        font-size: clamp(1.05rem, 2vw, 1.25rem);
        line-height: 1.6;
        color: var(--text-secondary);
        margin-bottom: 2rem;
      }

      .post-meta-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid var(--border-color);
        padding-bottom: 1.5rem;
        flex-wrap: wrap;
        gap: 1.5rem;
      }

      .meta-author-img {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        object-fit: cover;
      }

      .meta-author-name {
        font-size: 0.88rem;
        font-weight: 700;
        color: var(--text-primary);
        display: block;
      }

      .meta-author-title {
        font-size: 0.72rem;
        color: var(--text-muted);
        display: block;
      }

      .meta-stats {
        display: flex;
        gap: 1.5rem;
        font-size: 0.8rem;
        color: var(--text-muted);
        font-weight: 600;
      }

      .stat-item {
        display: flex;
        align-items: center;
        gap: 0.35rem;
      }

      .cover-img-wrapper {
        border-radius: 24px;
        overflow: hidden;
        aspect-ratio: 2;
        background: #000;
        border: 1px solid var(--border-color);
      }

      .post-cover-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      /* ── Post Content Grid Layout ── */
      .post-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 3rem;
        margin-top: 3rem;
      }

      @media (min-width: 900px) {
        .post-grid {
          grid-template-columns: 240px 1fr;
        }
      }

      .sticky-sidebar-wrap {
        position: sticky;
        top: 100px;
      }

      /* ── Post Typography ── */
      .blog-post-content {
        font-size: 1.05rem;
        line-height: 1.8;
        color: var(--text-secondary);
      }

      .blog-post-content p {
        margin-bottom: 1.5rem;
      }

      .blog-post-content h3 {
        font-size: 1.4rem;
        font-weight: 800;
        color: var(--text-primary);
        letter-spacing: -0.8px;
        margin: 2.25rem 0 1rem;
      }

      .blog-post-content ul, .blog-post-content ol {
        margin: 1rem 0 1.5rem;
        padding-left: 1.5rem;
      }

      .blog-post-content li {
        margin-bottom: 0.5rem;
      }

      .blog-post-content strong {
        color: var(--text-primary);
      }

      .post-tags-row {
        display: flex;
        gap: 0.75rem;
        margin: 2.5rem 0;
        padding-top: 1.5rem;
        border-top: 1px dashed var(--border-color);
      }

      .post-tag-badge {
        font-size: 0.75rem;
        font-weight: 700;
        color: var(--text-muted);
        background: var(--bg-secondary);
        padding: 0.25rem 0.65rem;
        border-radius: 9999px;
        border: 1px solid var(--border-color);
      }

      /* Gallery / Video elements */
      .gallery-section, .videos-section {
        margin: 2.5rem 0;
      }

      .gallery-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
      }

      .gallery-item-wrap {
        border-radius: 12px;
        overflow: hidden;
        aspect-ratio: 1.5;
        border: 1px solid var(--border-color);
      }

      .gallery-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .videos-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      .video-item-wrap {
        border-radius: 16px;
        overflow: hidden;
        aspect-ratio: 1.77;
        border: 1px solid var(--border-color);
        background: #000;
      }

      .video-player {
        width: 100%;
        height: 100%;
      }

      /* ── Detailed Author Card Panel ── */
      .author-card-panel {
        background: #ffffff;
        border: 1px solid var(--border-color);
        border-radius: 20px;
        padding: 2rem;
        margin: 3.5rem 0;
      }

      .author-card-layout {
        display: flex;
        gap: 1.5rem;
        align-items: flex-start;
        flex-wrap: wrap;
      }

      @media (min-width: 600px) {
        .author-card-layout {
          flex-wrap: nowrap;
        }
      }

      .author-card-img {
        width: 72px;
        height: 72px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid var(--bg-secondary);
      }

      .author-card-role-title {
        font-size: 0.72rem;
        font-weight: 800;
        color: var(--text-muted);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        display: block;
      }

      .author-card-name {
        font-size: 1.2rem;
        font-weight: 850;
        color: var(--text-primary);
        letter-spacing: -0.5px;
        margin: 0.15rem 0 0;
      }

      .author-card-designation {
        font-size: 0.8rem;
        font-weight: 600;
        color: var(--accent-orange);
        margin-bottom: 0.75rem;
      }

      .author-card-bio {
        font-size: 0.88rem;
        color: var(--text-secondary);
        line-height: 1.55;
        margin: 0;
      }

      .audit-flow-table {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 1rem;
        margin-top: 1.5rem;
        border-top: 1px solid var(--border-color);
        padding-top: 1.5rem;
      }

      .audit-cell {
        display: flex;
        flex-direction: column;
        gap: 0.15rem;
      }

      .audit-lbl {
        font-size: 0.65rem;
        font-weight: 800;
        text-transform: uppercase;
        color: var(--text-muted);
        letter-spacing: 0.5px;
      }

      .audit-val {
        font-size: 0.78rem;
        font-weight: 700;
        color: var(--text-secondary);
      }

      /* ── Related Blogs section ── */
      .related-blogs-section {
        margin-top: 4rem;
        border-top: 1px solid var(--border-color);
        padding-top: 3rem;
      }

      .related-heading {
        font-size: 1.25rem;
        font-weight: 900;
        letter-spacing: -0.6px;
        margin-bottom: 1.5rem;
      }

      .related-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      @media (min-width: 600px) {
        .related-grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }

      .related-card {
        background: #ffffff;
        border: 1px solid var(--border-color);
        border-radius: 12px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        transition: transform 0.2s, border-color 0.2s;
      }

      .related-card:hover {
        transform: translateY(-2px);
        border-color: rgba(227,6,19,0.15);
      }

      .related-img {
        aspect-ratio: 1.8;
        object-fit: cover;
        width: 100%;
      }

      .related-body {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        flex: 1;
      }

      .related-title {
        font-size: 0.88rem;
        font-weight: 800;
        line-height: 1.35;
        margin: 0;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      /* Demo cta box */
      .demo-cta-box {
        text-align: center;
        padding: 4rem 2rem;
      }

      .cta-content h2 {
        font-size: 1.8rem;
        font-weight: 900;
        letter-spacing: -1px;
        margin-top: 0.5rem;
      }

      .cta-content p {
        color: var(--text-secondary);
        font-size: 0.95rem;
        max-width: 580px;
        margin: 0.5rem auto 1.5rem;
        line-height: 1.6;
      }
    `}</style>
  );
}
