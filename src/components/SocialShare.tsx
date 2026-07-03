"use client";

import React, { useState } from "react";
import { Share2, Link as LinkIcon, Check, MessageCircle } from "lucide-react";

interface SocialShareProps {
  title: string;
  url: string;
}

export default function SocialShare({ title, url }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  return (
    <div className="share-buttons-container">
      <span className="share-label"><Share2 size={13} /> SHARE ARTICLE</span>
      <div className="share-buttons-grid">
        <a
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn twitter"
          title="Share on X (Twitter)"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
            <path d="M4 20l6.768 -6.768m2.46 -2.46l5.772 -5.772" />
          </svg>
        </a>
        
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn facebook"
          title="Share on Facebook"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
        </a>

        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn linkedin"
          title="Share on LinkedIn"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </a>

        <a
          href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn whatsapp"
          title="Share on WhatsApp"
        >
          <MessageCircle size={14} />
        </a>

        <button onClick={handleCopy} className="share-btn copy" title="Copy Link">
          {copied ? <Check size={14} style={{ color: "var(--accent-green)" }} /> : <LinkIcon size={14} />}
        </button>
      </div>

      <style jsx global>{`
        .share-buttons-container {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }

        .share-label {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.7rem;
          font-weight: 800;
          color: var(--text-muted);
          letter-spacing: 0.8px;
        }

        .share-buttons-grid {
          display: flex;
          gap: 0.5rem;
        }

        .share-btn {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .share-btn:hover {
          transform: translateY(-2px);
          color: #ffffff;
        }

        .share-btn.twitter:hover { background: #000000; border-color: #000000; }
        .share-btn.facebook:hover { background: #1877f2; border-color: #1877f2; }
        .share-btn.linkedin:hover { background: #0a66c2; border-color: #0a66c2; }
        .share-btn.whatsapp:hover { background: #25d366; border-color: #25d366; }
        
        .share-btn.copy:hover { 
          background: var(--bg-secondary); 
          border-color: var(--border-color-hover);
          color: var(--text-primary);
        }
      `}</style>
    </div>
  );
}
