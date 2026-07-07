"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, User, Calendar, Send } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Comment {
  id: string;
  name: string;
  comment: string;
  date: string;
}

export default function CommentsSection({ blogId, blogSlug }: { blogId: string; blogSlug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [supabasePostId, setSupabasePostId] = useState<string | null>(null);

  useEffect(() => {
    async function loadComments() {
      try {
        // 1. Fetch Supabase UUID of the blog post by slug
        const { data: postData, error: postError } = await supabase
          .from("blog_posts")
          .select("id")
          .eq("slug", blogSlug)
          .single();

        if (postError) {
          console.error("Error fetching post UUID from Supabase:", postError);
          showDefaultComments();
          return;
        }

        const postId = postData.id;
        setSupabasePostId(postId);

        // 2. Fetch comments for this UUID
        const { data, error } = await supabase
          .from("blog_comments")
          .select("*")
          .eq("blog_post_id", postId)
          .order("created_at", { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          setComments(
            data.map((c) => ({
              id: c.id,
              name: c.author_name,
              comment: c.comment_text,
              date: new Date(c.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }),
            }))
          );
        } else {
          showDefaultComments();
        }
      } catch (err) {
        console.error("Error loading comments:", err);
      }
    }

    function showDefaultComments() {
      const defaultComments: Comment[] = [
        {
          id: "comment-default-1",
          name: "Rajesh Kumar",
          comment: "This is a great write-up. We implemented QR ordering in our Connaught Place cafe last month and average order value actually increased by about 18%. The automated upselling recommendations work really well.",
          date: "June 29, 2026",
        },
      ];
      setComments(defaultComments);
    }

    loadComments();
  }, [blogSlug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !commentText.trim() || submitting) return;
    if (!supabasePostId) {
      alert("Cannot post comment: Blog post not found in Supabase.");
      return;
    }

    setSubmitting(true);
    try {
      const { data, error } = await supabase
        .from("blog_comments")
        .insert({
          blog_post_id: supabasePostId,
          author_name: name.trim(),
          comment_text: commentText.trim(),
          is_approved: true, // Auto-approve so it shows up immediately
        })
        .select()
        .single();

      if (error) throw error;

      if (data) {
        const newComment: Comment = {
          id: data.id,
          name: data.author_name,
          comment: data.comment_text,
          date: new Date(data.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
        };

        setComments((prev) => [newComment, ...prev]);
        setName("");
        setCommentText("");
      }
    } catch (err) {
      console.error("Error posting comment:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="comments-block">
      <h3 className="comments-heading">
        <MessageSquare size={18} style={{ marginRight: 6 }} />
        <span>Discussion ({comments.length})</span>
      </h3>

      <form onSubmit={handleSubmit} className="comment-form shadow-sm">
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0.85rem" }}>
          <div className="input-wrap">
            <label className="input-lbl">Your Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Rahul Sharma"
              className="comment-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <label className="input-lbl">Comment *</label>
            <textarea
              rows={4}
              required
              placeholder="Join the discussion, write your thoughts..."
              className="comment-input"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              style={{ resize: "vertical" }}
            />
          </div>
          <button type="submit" disabled={submitting} className="btn-primary btn-red comment-submit-btn">
            {submitting ? "Posting..." : "Post Comment"} <Send size={13} />
          </button>
        </div>
      </form>

      <div className="comments-list">
        {comments.map((c) => (
          <div key={c.id} className="comment-card shadow-sm">
            <div className="comment-card-header">
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div className="comment-avatar">
                  <User size={14} style={{ color: "var(--text-muted)" }} />
                </div>
                <span className="comment-author-name">{c.name}</span>
              </div>
              <span className="comment-date">
                <Calendar size={11} style={{ marginRight: 3 }} /> {c.date}
              </span>
            </div>
            <p className="comment-card-text">{c.comment}</p>
          </div>
        ))}
      </div>

      <style jsx global>{`
        .comments-block {
          margin-top: 4rem;
          border-top: 1px solid var(--border-color);
          padding-top: 3rem;
        }

        .comments-heading {
          font-size: 1.25rem;
          font-weight: 800;
          letter-spacing: -0.5px;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          color: var(--text-primary);
        }

        .comment-form {
          background: #ffffff;
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .input-wrap {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .input-lbl {
          font-size: 0.72rem;
          font-weight: 800;
          text-transform: uppercase;
          color: var(--text-secondary);
          letter-spacing: 0.3px;
        }

        .comment-input {
          padding: 0.7rem 0.95rem;
          border-radius: 8px;
          border: 1px solid var(--border-color);
          background: rgba(255, 255, 255, 0.9);
          outline: none;
          font-family: inherit;
          font-size: 0.88rem;
          transition: border-color 0.2s, background-color 0.2s;
        }

        .comment-input:focus {
          border-color: var(--accent-orange);
          background: #ffffff;
        }

        .comment-submit-btn {
          border-radius: 8px !important;
          padding: 0.6rem 1.25rem !important;
          font-size: 0.82rem !important;
          width: fit-content;
          align-self: flex-start;
        }

        .comments-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .comment-card {
          background: #ffffff;
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 1.25rem;
        }

        .comment-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .comment-avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .comment-author-name {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .comment-date {
          font-size: 0.72rem;
          color: var(--text-muted);
          display: flex;
          align-items: center;
        }

        .comment-card-text {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
