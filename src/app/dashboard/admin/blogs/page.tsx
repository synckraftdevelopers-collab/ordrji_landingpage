/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Plus,
  Edit,
  Check,
  LogOut,
  ArrowLeft,
  Trash2,
  Bell,
  Image as ImageIcon,
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
  createdTime?: string;
  readingTime: string;
  facebookUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
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

const RICH_COLORS = [
  { name: "Slate", value: "#0f172a" },
  { name: "Red", value: "#dc2626" },
  { name: "Orange", value: "#ea580c" },
  { name: "Amber", value: "#d97706" },
  { name: "Green", value: "#16a34a" },
  { name: "Blue", value: "#2563eb" },
  { name: "Indigo", value: "#4f46e5" },
  { name: "Purple", value: "#9333ea" },
  { name: "Pink", value: "#db2777" },
  { name: "Grey", value: "#64748b" }
];

function getCookieValue(name: string): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() ?? null;
  return null;
}

export default function AdminBlogsPage() {
  const [activeRole] = useState<string>(() => getCookieValue("ordrji_role") ?? "Visitor");
  const [activeUser] = useState<string>(() => getCookieValue("ordrji_username") ?? "Guest Visitor");
  const [loading, setLoading] = useState(true);
  const [newLeadsCount, setNewLeadsCount] = useState(0);
  
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
  const [uploading, setUploading] = useState(false);

  // Premium Editor states
  const [speechActive, setSpeechActive] = useState(false);
  const [fontSizeValue, setFontSizeValue] = useState(3);
  const [showColorPopover, setShowColorPopover] = useState(false);
  const [showEmojiPopover, setShowEmojiPopover] = useState(false);
  const [showSymbolPopover, setShowSymbolPopover] = useState(false);
  const [showTablePopover, setShowTablePopover] = useState(false);
  const [showAiPopover, setShowAiPopover] = useState(false);
  const [showAddBlockPopover, setShowAddBlockPopover] = useState(false);
  const [tableHoveredRow, setTableHoveredRow] = useState(0);
  const [tableHoveredCol, setTableHoveredCol] = useState(0);

  // Social Links
  const [formFacebookUrl, setFormFacebookUrl] = useState("");
  const [formTwitterUrl, setFormTwitterUrl] = useState("");
  const [formLinkedinUrl, setFormLinkedinUrl] = useState("");
  const [formInstagramUrl, setFormInstagramUrl] = useState("");

  // Admins management states
  const [currentTab, setCurrentTab] = useState<"blogs" | "admins">("blogs");
  const [users, setUsers] = useState<any[]>([]);
  const [adminRows, setAdminRows] = useState([
    { email: "", password: "", name: "", designation: "Admin Contributor", role: "Admin" }
  ]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/auth/users");
      if (res.ok) {
        setUsers(await res.json());
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (currentTab === "admins") {
      fetchUsers();
    }
  }, [currentTab]);

  const handleDeleteUser = async (userId: string, name: string) => {
    if (userId === "user-super") {
      alert("The primary Super Admin account cannot be deleted.");
      return;
    }
    if (confirm(`Are you sure you want to delete the administrator account for "${name}"?`)) {
      try {
        const res = await fetch(`/api/auth/users?id=${userId}`, { method: "DELETE" });
        if (res.ok) {
          alert("Administrator account deleted successfully!");
          fetchUsers();
        } else {
          const err = await res.json();
          alert(`Error: ${err.error || "Failed to delete account"}`);
        }
      } catch {
        alert("An error occurred while deleting the account.");
      }
    }
  };

  const handleSaveAdmins = async (e: React.FormEvent) => {
    e.preventDefault();
    
    for (let i = 0; i < adminRows.length; i++) {
      const row = adminRows[i];
      if (!row.email.trim() || !row.password.trim() || !row.name.trim()) {
        alert(`Please fill in the Name, Email, and Password for all rows. Row ${i + 1} is incomplete.`);
        return;
      }
    }

    try {
      const res = await fetch("/api/auth/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adminRows)
      });

      if (res.ok) {
        alert("Administrators added successfully!");
        setAdminRows([{ email: "", password: "", name: "", designation: "Admin Contributor", role: "Admin" }]);
        fetchUsers();
      } else {
        const err = await res.json();
        alert(`Error: ${err.error || "Failed to add administrators"}`);
      }
    } catch {
      alert("An error occurred while saving the administrator accounts.");
    }
  };

  const handleAddRow = () => {
    setAdminRows([...adminRows, { email: "", password: "", name: "", designation: "Admin Contributor", role: "Admin" }]);
  };

  const handleRemoveRow = (index: number) => {
    if (adminRows.length === 1) return;
    setAdminRows(adminRows.filter((_, idx) => idx !== index));
  };

  const handleRowChange = (index: number, field: string, value: string) => {
    const updated = adminRows.map((row, idx) => {
      if (idx === index) {
        return { ...row, [field]: value };
      }
      return row;
    });
    setAdminRows(updated);
  };
  const editorRef = useRef<HTMLDivElement>(null);

  const execRichCommand = (command: string, value: string = "") => {
    if (typeof document === "undefined") return;
    document.execCommand(command, false, value);
    if (editorRef.current) {
      setFormContent(editorRef.current.innerHTML);
    }
  };

  const insertLink = () => {
    let url = prompt("Enter link URL:");
    if (!url) return;
    
    // Normalize URL
    if (!/^https?:\/\//i.test(url) && !url.startsWith("/")) {
      url = "https://" + url;
    }

    if (typeof window !== "undefined") {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        // If selection is empty, insert the URL itself as the text link
        if (range.collapsed) {
          const anchor = document.createElement("a");
          anchor.href = url;
          anchor.textContent = url;
          anchor.style.color = "var(--accent-orange)";
          anchor.style.textDecoration = "underline";
          range.insertNode(anchor);
          
          // Move cursor directly after the inserted link
          range.setStartAfter(anchor);
          range.setEndAfter(anchor);
          selection.removeAllRanges();
          selection.addRange(range);
          
          if (editorRef.current) {
            setFormContent(editorRef.current.innerHTML);
          }
          return;
        }
      }
    }
    execRichCommand("createLink", url);
  };

  const insertHtmlAtCursor = (html: string) => {
    if (typeof window === "undefined") return;
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      const el = document.createElement("div");
      el.innerHTML = html;
      const frag = document.createDocumentFragment();
      let node: ChildNode | null = null;
      let lastNode: ChildNode | null = null;
      while ((node = el.firstChild)) {
        lastNode = frag.appendChild(node);
      }
      range.insertNode(frag);
      if (lastNode) {
        range.setStartAfter(lastNode);
        range.setEndAfter(lastNode);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
    if (editorRef.current) {
      setFormContent(editorRef.current.innerHTML);
    }
  };

  const insertTextAtCursor = (text: string) => {
    if (typeof window === "undefined") return;
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const range = selection.getRangeAt(0);
    range.deleteContents();
    const textNode = document.createTextNode(text);
    range.insertNode(textNode);
    range.setStartAfter(textNode);
    range.setEndAfter(textNode);
    selection.removeAllRanges();
    selection.addRange(range);
    if (editorRef.current) {
      setFormContent(editorRef.current.innerHTML);
    }
  };

  const changeSize = (direction: "up" | "down") => {
    let next = fontSizeValue;
    if (direction === "up" && fontSizeValue < 7) {
      next += 1;
    } else if (direction === "down" && fontSizeValue > 1) {
      next -= 1;
    }
    setFontSizeValue(next);
    execRichCommand("fontSize", next.toString());
  };

  const startSpeechRecognition = () => {
    if (typeof window === "undefined") return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please use Chrome or Safari.");
      return;
    }
    
    const rec = new SpeechRecognition();
    rec.lang = "en-US";
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    
    rec.onstart = () => {
      setSpeechActive(true);
    };
    
    rec.onerror = () => {
      setSpeechActive(false);
    };
    
    rec.onend = () => {
      setSpeechActive(false);
    };
    
    rec.onresult = (e: any) => {
      const text = e.results[0][0].transcript;
      insertTextAtCursor(text);
    };
    
    rec.start();
  };

  const insertTable = (rows: number, cols: number) => {
    let html = `<table style="width: 100%; border-collapse: collapse; margin: 1rem 0; border: 1px solid #e2e8f0;">`;
    html += `<thead><tr style="background: #f8fafc;">`;
    for (let c = 0; c < cols; c++) {
      html += `<th style="border: 1px solid #e2e8f0; padding: 10px; font-weight: 700; text-align: left; color: #1e293b;">Header ${c + 1}</th>`;
    }
    html += `</tr></thead><tbody>`;
    for (let r = 0; r < rows; r++) {
      html += `<tr>`;
      for (let c = 0; c < cols; c++) {
        html += `<td style="border: 1px solid #e2e8f0; padding: 10px; color: #334155;">Cell Data</td>`;
      }
      html += `</tr>`;
    }
    html += `</tbody></table><p></p>`;
    insertHtmlAtCursor(html);
    setShowTablePopover(false);
  };

  const insertChartMock = () => {
    const html = `
      <div style="margin: 1.5rem 0; padding: 1.25rem; border: 2px solid #e2e8f0; border-radius: 12px; background: #f8fafc;" contenteditable="false">
        <h4 style="margin: 0 0 1rem 0; font-size: 1.1rem; color: #1e293b; font-weight: 700;">Operational Performance Analytics</h4>
        <div style="display: flex; gap: 8px; align-items: flex-end; height: 120px; border-bottom: 2px solid #cbd5e1; padding-bottom: 8px;">
          <div style="flex: 1; background: #4f46e5; height: 40%; border-radius: 4px 4px 0 0;" title="Q1: 40%"></div>
          <div style="flex: 1; background: #4f46e5; height: 65%; border-radius: 4px 4px 0 0;" title="Q2: 65%"></div>
          <div style="flex: 1; background: #4f46e5; height: 85%; border-radius: 4px 4px 0 0;" title="Q3: 85%"></div>
          <div style="flex: 1; background: #3b82f6; height: 95%; border-radius: 4px 4px 0 0;" title="Q4 (Target): 95%"></div>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #64748b; margin-top: 6px; font-weight: 600;">
          <span>Q1</span><span>Q2</span><span>Q3</span><span>Q4 (Target)</span>
        </div>
      </div>
      <p></p>
    `;
    insertHtmlAtCursor(html);
  };

  const triggerImageUpload = () => {
    if (typeof document === "undefined") return;
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      
      const formData = new FormData();
      formData.append("file", file);
      try {
        const res = await fetch("/api/media", { method: "POST", body: formData });
        const data = await res.json();
        if (res.ok && data.url) {
          insertHtmlAtCursor(`<img src="${data.url}" alt="Uploaded image" style="max-width: 100%; border-radius: 12px; margin: 1rem 0;" /><p></p>`);
        } else {
          // base64 fallback
          const reader = new FileReader();
          reader.onload = (e) => {
            insertHtmlAtCursor(`<img src="${e.target?.result}" alt="Base64 image" style="max-width: 100%; border-radius: 12px; margin: 1rem 0;" /><p></p>`);
          };
          reader.readAsDataURL(file);
        }
      } catch {
        const reader = new FileReader();
        reader.onload = (e) => {
          insertHtmlAtCursor(`<img src="${e.target?.result}" alt="Base64 image" style="max-width: 100%; border-radius: 12px; margin: 1rem 0;" /><p></p>`);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const insertAttachmentBadge = () => {
    const fileName = prompt("Enter attachment name (e.g. menu-catalog.pdf):", "attachment.pdf");
    if (!fileName) return;
    const fileUrl = prompt("Enter attachment file URL:", "#");
    if (!fileUrl) return;
    const html = `<a href="${fileUrl}" download style="display: inline-flex; align-items: center; gap: 8px; padding: 6px 12px; background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 6px; text-decoration: none; color: #334155; font-size: 0.85rem; font-weight: 600; margin: 0.5rem 0;" contenteditable="false">📎 Download ${fileName}</a> `;
    insertHtmlAtCursor(html);
    setShowAddBlockPopover(false);
  };

  const runAiHelper = (action: string) => {
    let generatedText = "";
    
    if (action === "autocomplete") {
      generatedText = `\n\nIntegrating advanced features like this in modern restaurant frameworks enables dining operations to scale effortlessly. By leveraging real-time telemetry, automated kitchen workflows, and streamlined CRM profiling, modern brands are reducing prep times while driving visual customer engagement across all checkout points.`;
    } else if (action === "summarize") {
      generatedText = `\n\n### Executive Summary\n* **Primary Goal**: Elevate digital operational efficiency.\n* **Key Metrics**: 22% faster prep times, 14.8% user return rate.\n* **Integration Scope**: Seamless sync across POS, KDS, and checkout terminals.`;
    } else if (action === "polish") {
      generatedText = ` Optimized blog content generated with state-of-the-art visual enhancements for the modern digital dining experience.`;
    } else if (action === "actionItems") {
      generatedText = `\n\n### Next Steps:\n1. Audit active kitchen display screens.\n2. Configure payment gateway webhooks.\n3. Launch customer loyalty campaigns.`;
    }
    
    insertTextAtCursor(generatedText);
    setShowAiPopover(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/media", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to upload image");
      }

      setFormCoverImage(data.url);
    } catch (err: any) {
      alert(err.message || "An error occurred during file upload.");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setFormDate(today);
    loadCMSData();
    fetch("/api/leads").then(r => r.json()).then(d => {
      if (d.success) setNewLeadsCount(d.leads.filter((l: {status:string}) => l.status === "new").length);
    }).catch(() => {});
  }, []);

  async function loadCMSData() {
    try {
      setLoading(true);
      const [blogsRes, catsRes] = await Promise.all([
        fetch("/api/blogs?status=all"),
        fetch("/api/categories")
      ]);
      if (blogsRes.ok) {
        const blogsData = await blogsRes.json();
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
  }

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
    if (editorRef.current) {
      editorRef.current.innerHTML = "";
    }

    setFormCoverImage(PRESET_IMAGES[0]);
    setFormCategoryId("tech");
    setFormTags("");
    setFormStatus("Published");
    setFormAuthor(activeUser);
    setFormFacebookUrl("");
    setFormTwitterUrl("");
    setFormLinkedinUrl("");
    setFormInstagramUrl("");
    const today = new Date().toISOString().split("T")[0];
    setFormDate(today);
  };

  const loadBlogToForm = (post: BlogPost) => {
    setEditingId(post.id);
    setFormTitle(post.title);
    setFormSlug(post.slug);
    setFormDescription(post.description);
    setFormContent(post.content);
    if (editorRef.current) {
      editorRef.current.innerHTML = post.content || "";
    }

    setFormCoverImage(post.coverImage);
    setFormCategoryId(post.categoryId);
    setFormTags(post.tags?.join(", ") || "");
    setFormStatus(post.status === "Published" ? "Published" : "Draft");
    setFormAuthor(post.createdBy || activeUser);
    setFormFacebookUrl(post.facebookUrl || "");
    setFormTwitterUrl(post.twitterUrl || "");
    setFormLinkedinUrl(post.linkedinUrl || "");
    setFormInstagramUrl(post.instagramUrl || "");
    
    // Parse date if present
    if (post.createdDate) {
      try {
        const parsed = new Date(post.createdDate);
        if (!isNaN(parsed.getTime())) {
          setFormDate(parsed.toISOString().split("T")[0]);
        }
      } catch {
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
      facebookUrl: formFacebookUrl,
      twitterUrl: formTwitterUrl,
      linkedinUrl: formLinkedinUrl,
      instagramUrl: formInstagramUrl,
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
    } catch {
      alert("An unexpected network error occurred.");
    }
  };

  const handleDeleteBlog = async (post: BlogPost) => {
    const isSuperAdmin = activeRole === "Super Admin";
    
    let confirmMsg = `Are you sure you want to delete "${post.title}"?`;
    if (isSuperAdmin) {
      confirmMsg += "\n\nPress OK to Soft Delete (hide from public, keep in database).\nPress Cancel to skip or choose Permanent Purge.";
    }

    if (confirm(confirmMsg)) {
      // Perform Soft Delete
      try {
        const res = await fetch(`/api/blogs/${post.id}`, {
          method: "DELETE"
        });
        if (res.ok) {
          alert("Blog post soft-deleted successfully!");
          loadCMSData();
          if (editingId === post.id) {
            triggerNewBlog();
          }
        } else {
          const data = await res.json();
          alert(`Error: ${data.error || "Failed to delete blog post"}`);
        }
      } catch {
        alert("An unexpected network error occurred.");
      }
    } else if (isSuperAdmin && confirm(`Do you want to PERMANENTLY PURGE "${post.title}"? This cannot be undone!`)) {
      // Perform Hard Delete (purge=true)
      try {
        const res = await fetch(`/api/blogs/${post.id}?purge=true`, {
          method: "DELETE"
        });
        if (res.ok) {
          alert("Blog post permanently purged from database!");
          loadCMSData();
          if (editingId === post.id) {
            triggerNewBlog();
          }
        } else {
          const data = await res.json();
          alert(`Error: ${data.error || "Failed to purge blog post"}`);
        }
      } catch {
        alert("An unexpected network error occurred.");
      }
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
          <button 
            type="button"
            onClick={() => setCurrentTab(currentTab === "blogs" ? "admins" : "blogs")} 
            className="btn-secondary flex-btn"
            style={{ fontWeight: 800, borderColor: "var(--accent-orange)", background: "rgba(227,6,19,0.04)", color: "var(--accent-orange)" }}
          >
            {currentTab === "blogs" ? "Manage Admins 👥" : "Blogs Manager 📝"}
          </button>
          <Link href="/dashboard/admin/leads" className="btn-secondary flex-btn" style={{ position: "relative" }}>
            <Bell size={14} />
            <span>Demo Leads</span>
            {newLeadsCount > 0 && (
              <span style={{
                position: "absolute", top: "-6px", right: "-6px",
                background: "#da0404", color: "#fff",
                fontSize: "0.6rem", fontWeight: 800,
                width: "18px", height: "18px", borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                border: "2px solid #fff",
              }}>{newLeadsCount}</span>
            )}
          </Link>
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
      {currentTab === "blogs" ? (
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
                      By {post.createdBy || "Admin"} • {post.createdDate || "Today"}{post.createdTime ? ` at ${post.createdTime}` : ""}
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

                  <div className="dir-card-actions" style={{ display: "flex", gap: "0.35rem" }}>
                    <button 
                      onClick={() => loadBlogToForm(post)} 
                      className="dir-edit-btn"
                      title="Load into Editor"
                    >
                      <Edit size={13} />
                      <span>Edit</span>
                    </button>
                    <button 
                      type="button"
                      onClick={() => handleDeleteBlog(post)} 
                      className="dir-delete-btn"
                      title="Delete Post"
                    >
                      <Trash2 size={13} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
              {blogs.length === 0 && (
                <p className="no-posts-text">No articles found in the database. Click &ldquo;Write Post&rdquo; to seed your first post.</p>
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
                  <label className="form-label">Cover Photo</label>
                  <div style={{ display: "flex", gap: "0.75rem", marginBottom: "0.5rem" }}>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Paste cover photo URL or upload a file"
                      value={formCoverImage}
                      onChange={(e) => setFormCoverImage(e.target.value)}
                      required
                      style={{ flex: 1 }}
                    />
                    <label 
                      className="btn-secondary flex-btn" 
                      style={{ 
                        padding: "0.6rem 1rem", 
                        fontSize: "0.85rem", 
                        cursor: "pointer", 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "0.35rem",
                        whiteSpace: "nowrap",
                        border: "1px solid #cbd5e1",
                        borderRadius: "6px",
                        background: "#fff"
                      }}
                    >
                      {uploading ? (
                        <>
                          <span className="cms-spinner" style={{ width: "12px", height: "12px", borderWidth: "2px" }} />
                          <span>Uploading...</span>
                        </>
                      ) : (
                        <>
                          <ImageIcon size={14} />
                          <span>Upload File</span>
                        </>
                      )}
                      <input 
                        type="file" 
                        accept="image/*" 
                        style={{ display: "none" }} 
                        onChange={handleFileUpload} 
                        disabled={uploading}
                      />
                    </label>
                  </div>
                  
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
                  <div className="editor-toolbar-header" style={{ marginBottom: "0.50rem", position: "relative" }}>
                    <label className="form-label" style={{ color: "#475569" }}>Article Content (Premium Visual WYSIWYG Editor)</label>
                    
                    <div className="rich-editor-toolbar" style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.35rem",
                      alignItems: "center",
                      background: "#f8fafc",
                      padding: "0.5rem 0.75rem",
                      borderRadius: "12px 12px 0 0",
                      borderTop: "2px solid #e2e8f0",
                      borderLeft: "2px solid #e2e8f0",
                      borderRight: "2px solid #e2e8f0"
                    }}>
                      {/* Paragraph Style Dropdown */}
                      <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                        <select
                          className="rich-dark-select"
                          onChange={(e) => execRichCommand("formatBlock", e.target.value)}
                          defaultValue="p"
                          title="Text Format"
                          style={{
                            padding: "0.35rem 0.4rem",
                            borderRadius: "6px",
                            border: "1px solid #cbd5e1",
                            background: "#ffffff",
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            color: "#334155",
                            cursor: "pointer",
                            outline: "none"
                          }}
                        >
                          <option value="p">¶ Paragraph</option>
                          <option value="h1">Heading 1</option>
                          <option value="h2">Heading 2</option>
                          <option value="h3">Heading 3</option>
                          <option value="blockquote">Quote Block</option>
                          <option value="pre">Code Block</option>
                        </select>
                      </div>

                      {/* Font Family Dropdown */}
                      <select
                        className="rich-dark-select"
                        onChange={(e) => execRichCommand("fontName", e.target.value)}
                        defaultValue="Geist"
                        title="Font Family"
                        style={{
                          padding: "0.35rem 0.4rem",
                          borderRadius: "6px",
                          border: "1px solid #cbd5e1",
                          background: "#ffffff",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          color: "#334155",
                          cursor: "pointer",
                          outline: "none"
                        }}
                      >
                        <option value="Geist">Geist</option>
                        <option value="Inter">Inter</option>
                        <option value="Arial">Arial</option>
                        <option value="Courier New">Courier</option>
                        <option value="Times New Roman">Times</option>
                        <option value="Georgia">Georgia</option>
                      </select>

                      {/* Font Size Selector (- 16 +) */}
                      <div style={{ display: "flex", alignItems: "center", background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "6px", overflow: "hidden" }}>
                        <button type="button" onClick={() => changeSize("down")} style={{ padding: "0.25rem 0.5rem", background: "transparent", border: "none", color: "#475569", cursor: "pointer", fontSize: "0.8rem" }}>-</button>
                        <span style={{ padding: "0 0.4rem", color: "#334155", fontSize: "0.8rem", fontWeight: 700, minWidth: "18px", textAlign: "center" }}>
                          {fontSizeValue === 1 ? "12" : fontSizeValue === 2 ? "14" : fontSizeValue === 3 ? "16" : fontSizeValue === 4 ? "18" : fontSizeValue === 5 ? "24" : fontSizeValue === 6 ? "32" : "48"}
                        </span>
                        <button type="button" onClick={() => changeSize("up")} style={{ padding: "0.25rem 0.5rem", background: "transparent", border: "none", color: "#475569", cursor: "pointer", fontSize: "0.8rem" }}>+</button>
                      </div>

                      {/* Text Alignments Dropdown */}
                      <select
                        className="rich-dark-select"
                        onChange={(e) => execRichCommand(e.target.value)}
                        defaultValue="justifyLeft"
                        title="Alignments"
                        style={{
                          padding: "0.35rem 0.4rem",
                          borderRadius: "6px",
                          border: "1px solid #cbd5e1",
                          background: "#ffffff",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          color: "#334155",
                          cursor: "pointer",
                          outline: "none"
                        }}
                      >
                        <option value="justifyLeft">≡ Left</option>
                        <option value="justifyCenter">≡ Center</option>
                        <option value="justifyRight">≡ Right</option>
                        <option value="justifyFull">≡ Justify</option>
                      </select>

                      {/* Language Selection */}
                      <select
                        className="rich-dark-select"
                        title="Translation Language"
                        style={{
                          padding: "0.35rem 0.4rem",
                          borderRadius: "6px",
                          border: "1px solid #cbd5e1",
                          background: "#ffffff",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          color: "#334155",
                          cursor: "pointer",
                          outline: "none"
                        }}
                      >
                        <option value="en">EN</option>
                        <option value="hi">HI</option>
                        <option value="es">ES</option>
                        <option value="fr">FR</option>
                      </select>

                      {/* Dictation / Microphone */}
                      <button
                        type="button"
                        onClick={startSpeechRecognition}
                        title="Speech Dictation"
                        style={{
                          padding: "0.35rem 0.5rem",
                          borderRadius: "6px",
                          background: speechActive ? "#ef4444" : "#ffffff",
                          border: "1px solid #cbd5e1",
                          color: speechActive ? "#fff" : "#475569",
                          cursor: "pointer",
                          fontSize: "0.8rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        🎙️
                      </button>

                      <div style={{ width: "1px", height: "18px", background: "#cbd5e1", margin: "0 2px" }} />

                      {/* Format modifiers */}
                      <button type="button" onClick={() => execRichCommand("bold")} style={{ padding: "0.35rem 0.5rem", borderRadius: "6px", background: "#ffffff", border: "1px solid #cbd5e1", color: "#334155", fontWeight: 800, cursor: "pointer", fontSize: "0.8rem" }} title="Bold">B</button>
                      <button type="button" onClick={() => execRichCommand("italic")} style={{ padding: "0.35rem 0.5rem", borderRadius: "6px", background: "#ffffff", border: "1px solid #cbd5e1", color: "#334155", fontStyle: "italic", cursor: "pointer", fontSize: "0.8rem" }} title="Italic">I</button>
                      <button type="button" onClick={() => execRichCommand("underline")} style={{ padding: "0.35rem 0.5rem", borderRadius: "6px", background: "#ffffff", border: "1px solid #cbd5e1", color: "#334155", textDecoration: "underline", cursor: "pointer", fontSize: "0.8rem" }} title="Underline">U</button>
                      <button type="button" onClick={() => execRichCommand("strikeThrough")} style={{ padding: "0.35rem 0.5rem", borderRadius: "6px", background: "#ffffff", border: "1px solid #cbd5e1", color: "#334155", textDecoration: "line-through", cursor: "pointer", fontSize: "0.8rem" }} title="Strikethrough">S</button>
                      <button type="button" onClick={() => execRichCommand("formatBlock", "pre")} style={{ padding: "0.35rem 0.5rem", borderRadius: "6px", background: "#ffffff", border: "1px solid #cbd5e1", color: "#334155", fontFamily: "monospace", cursor: "pointer", fontSize: "0.8rem" }} title="Code Block">&lt;/&gt;</button>

                      <div style={{ width: "1px", height: "18px", background: "#cbd5e1", margin: "0 2px" }} />

                      {/* Image uploader */}
                      <button type="button" onClick={triggerImageUpload} style={{ padding: "0.35rem 0.5rem", borderRadius: "6px", background: "#ffffff", border: "1px solid #cbd5e1", color: "#334155", cursor: "pointer", fontSize: "0.8rem" }} title="Insert Image">🖼️</button>

                      {/* Table insertion toggler */}
                      <div style={{ position: "relative" }}>
                        <button type="button" onClick={() => { setShowTablePopover(!showTablePopover); setShowColorPopover(false); setShowEmojiPopover(false); setShowSymbolPopover(false); setShowAiPopover(false); setShowAddBlockPopover(false); }} style={{ padding: "0.35rem 0.5rem", borderRadius: "6px", background: "#ffffff", border: "1px solid #cbd5e1", color: "#334155", cursor: "pointer", fontSize: "0.8rem" }} title="Insert Table">田</button>
                        {showTablePopover && (
                          <div style={{ position: "absolute", top: "100%", left: 0, marginTop: "8px", background: "#ffffff", border: "1px solid #cbd5e1", padding: "10px", borderRadius: "8px", zIndex: 100, boxShadow: "0 10px 25px rgba(0,0,0,0.08)" }}>
                            <div style={{ fontSize: "0.75rem", color: "#475569", marginBottom: "8px", fontWeight: 700 }}>Table Grid: {tableHoveredRow + 1} x {tableHoveredCol + 1}</div>
                            <div style={{ display: "grid", gridTemplateRows: "repeat(5, 1fr)", gap: "4px" }}>
                              {[0, 1, 2, 3, 4].map(r => (
                                <div key={r} style={{ display: "flex", gap: "4px" }}>
                                  {[0, 1, 2, 3, 4].map(c => {
                                    const isHighlighted = r <= tableHoveredRow && c <= tableHoveredCol;
                                    return (
                                      <div
                                        key={c}
                                        onMouseEnter={() => { setTableHoveredRow(r); setTableHoveredCol(c); }}
                                        onClick={() => insertTable(r + 1, c + 1)}
                                        style={{
                                          width: "16px",
                                          height: "16px",
                                          background: isHighlighted ? "#3b82f6" : "#f1f5f9",
                                          border: "1px solid #cbd5e1",
                                          borderRadius: "2px",
                                          cursor: "pointer"
                                        }}
                                      />
                                    );
                                  })}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Chart Insertion */}
                      <button type="button" onClick={insertChartMock} style={{ padding: "0.35rem 0.5rem", borderRadius: "6px", background: "#ffffff", border: "1px solid #cbd5e1", color: "#334155", cursor: "pointer", fontSize: "0.8rem" }} title="Insert Analytics Chart">📊</button>

                      {/* Link insertion */}
                      <button type="button" onClick={insertLink} style={{ padding: "0.35rem 0.5rem", borderRadius: "6px", background: "#ffffff", border: "1px solid #cbd5e1", color: "#334155", cursor: "pointer", fontSize: "0.8rem" }} title="Insert Hyperlink">🔗</button>

                      {/* Text highlighting / Color Popover */}
                      <div style={{ position: "relative" }}>
                        <button type="button" onClick={() => { setShowColorPopover(!showColorPopover); setShowTablePopover(false); setShowEmojiPopover(false); setShowSymbolPopover(false); setShowAiPopover(false); setShowAddBlockPopover(false); }} style={{ padding: "0.35rem 0.5rem", borderRadius: "6px", background: "#ffffff", border: "1px solid #cbd5e1", color: "#334155", cursor: "pointer", fontSize: "0.8rem", display: "flex", flexDirection: "column", alignItems: "center" }} title="Colors & Highlights">
                          <span style={{ fontWeight: 800 }}>A</span>
                          <div style={{ width: "12px", height: "2px", background: "#ef4444" }} />
                        </button>
                        {showColorPopover && (
                          <div style={{ position: "absolute", top: "100%", left: 0, marginTop: "8px", background: "#ffffff", border: "1px solid #cbd5e1", padding: "10px", borderRadius: "8px", zIndex: 100, width: "180px", boxShadow: "0 10px 25px rgba(0,0,0,0.08)" }}>
                            <div style={{ fontSize: "0.75rem", color: "#475569", marginBottom: "6px", fontWeight: 700 }}>Text Color:</div>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "4px", marginBottom: "10px" }}>
                              {RICH_COLORS.map(col => (
                                <button
                                  key={col.value}
                                  type="button"
                                  onClick={() => { execRichCommand("foreColor", col.value); setShowColorPopover(false); }}
                                  style={{ width: "24px", height: "24px", borderRadius: "50%", background: col.value, border: "1px solid #cbd5e1", cursor: "pointer" }}
                                  title={col.name}
                                />
                              ))}
                            </div>
                            <div style={{ fontSize: "0.75rem", color: "#475569", marginBottom: "6px", fontWeight: 700 }}>Highlight Color:</div>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "4px" }}>
                              {["#fef08a", "#bbf7d0", "#bfdbfe", "#fbcfe8", "#fed7aa", "#c7d2fe", "#a5f3fc", "#e9d5ff", "#fca5a5", "#cbd5e1"].map((bgCol, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => { execRichCommand("hiliteColor", bgCol); setShowColorPopover(false); }}
                                  style={{ width: "24px", height: "24px", borderRadius: "4px", background: bgCol, border: "1px solid #cbd5e1", cursor: "pointer" }}
                                  title={`Highlight ${idx + 1}`}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Emoji Picker Popover */}
                      <div style={{ position: "relative" }}>
                        <button type="button" onClick={() => { setShowEmojiPopover(!showEmojiPopover); setShowTablePopover(false); setShowColorPopover(false); setShowSymbolPopover(false); setShowAiPopover(false); setShowAddBlockPopover(false); }} style={{ padding: "0.35rem 0.5rem", borderRadius: "6px", background: "#ffffff", border: "1px solid #cbd5e1", color: "#334155", cursor: "pointer", fontSize: "0.8rem" }} title="Emojis">😊</button>
                        {showEmojiPopover && (
                          <div style={{ position: "absolute", top: "100%", left: 0, marginTop: "8px", background: "#ffffff", border: "1px solid #cbd5e1", padding: "10px", borderRadius: "8px", zIndex: 100, width: "160px", boxShadow: "0 10px 25px rgba(0,0,0,0.08)" }}>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "6px" }}>
                              {["😀", "😂", "😍", "👍", "🎉", "🔥", "🚀", "💡", "🍔", "🍕", "🥗", "☕", "📱", "💻", "📈", "💬", "🔒", "🔔", "❤️", "✨"].map(em => (
                                <button
                                  key={em}
                                  type="button"
                                  onClick={() => { insertTextAtCursor(em); setShowEmojiPopover(false); }}
                                  style={{ width: "24px", height: "24px", background: "transparent", border: "none", fontSize: "1.1rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                                >
                                  {em}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Special Symbols Picker */}
                      <div style={{ position: "relative" }}>
                        <button type="button" onClick={() => { setShowSymbolPopover(!showSymbolPopover); setShowTablePopover(false); setShowColorPopover(false); setShowEmojiPopover(false); setShowAiPopover(false); setShowAddBlockPopover(false); }} style={{ padding: "0.35rem 0.5rem", borderRadius: "6px", background: "#ffffff", border: "1px solid #cbd5e1", color: "#334155", cursor: "pointer", fontSize: "0.8rem", fontWeight: 700 }} title="Special Symbols">Ω</button>
                        {showSymbolPopover && (
                          <div style={{ position: "absolute", top: "100%", left: 0, marginTop: "8px", background: "#ffffff", border: "1px solid #cbd5e1", padding: "10px", borderRadius: "8px", zIndex: 100, width: "160px", boxShadow: "0 10px 25px rgba(0,0,0,0.08)" }}>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "6px" }}>
                              {["Ω", "©", "™", "®", "•", "←", "→", "↑", "↓", "±", "÷", "×", "€", "£", "¥", "§"].map(sy => (
                                <button
                                  key={sy}
                                  type="button"
                                  onClick={() => { insertTextAtCursor(sy); setShowSymbolPopover(false); }}
                                  style={{ width: "28px", height: "28px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "4px", color: "#334155", cursor: "pointer", fontSize: "0.9rem", display: "flex", alignItems: "center", justifyContent: "center" }}
                                >
                                  {sy}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div style={{ width: "1px", height: "18px", background: "#cbd5e1", margin: "0 2px" }} />

                      {/* Lists */}
                      <button type="button" onClick={() => execRichCommand("insertUnorderedList")} style={{ padding: "0.35rem 0.5rem", borderRadius: "6px", background: "#ffffff", border: "1px solid #cbd5e1", color: "#334155", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600 }} title="Bullet List">• List</button>
                      <button type="button" onClick={() => execRichCommand("insertOrderedList")} style={{ padding: "0.35rem 0.5rem", borderRadius: "6px", background: "#ffffff", border: "1px solid #cbd5e1", color: "#334155", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600 }} title="Ordered List">1. List</button>

                      {/* Attachment / Pin */}
                      <button type="button" onClick={insertAttachmentBadge} style={{ padding: "0.35rem 0.5rem", borderRadius: "6px", background: "#ffffff", border: "1px solid #cbd5e1", color: "#334155", cursor: "pointer", fontSize: "0.8rem" }} title="Insert File Attachment">📌</button>

                      <div style={{ width: "1px", height: "18px", background: "#cbd5e1", margin: "0 2px" }} />

                      {/* AI Assistant helper */}
                      <div style={{ position: "relative" }}>
                        <button
                          type="button"
                          onClick={() => { setShowAiPopover(!showAiPopover); setShowTablePopover(false); setShowColorPopover(false); setShowEmojiPopover(false); setShowSymbolPopover(false); setShowAddBlockPopover(false); }}
                          style={{
                            padding: "0.35rem 0.6rem",
                            borderRadius: "6px",
                            background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                            border: "none",
                            color: "#fff",
                            fontWeight: 700,
                            cursor: "pointer",
                            fontSize: "0.8rem",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            boxShadow: "0 2px 8px rgba(124, 58, 237, 0.4)"
                          }}
                          title="AI Writer Assistant"
                        >
                          <span>✦ AI</span>
                          <span style={{ fontSize: "0.6rem" }}>▼</span>
                        </button>
                        {showAiPopover && (
                          <div style={{ position: "absolute", top: "100%", right: 0, marginTop: "8px", background: "#ffffff", border: "1px solid #cbd5e1", padding: "8px", borderRadius: "8px", zIndex: 100, width: "220px", boxShadow: "0 10px 25px rgba(0,0,0,0.08)" }}>
                            <div style={{ fontSize: "0.75rem", color: "#475569", marginBottom: "8px", paddingLeft: "4px", fontWeight: 700 }}>✦ Smart AI Writer Tools</div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                              <button type="button" onClick={() => runAiHelper("autocomplete")} style={{ textAlign: "left", width: "100%", background: "#f8fafc", border: "1px solid #cbd5e1", color: "#334155", fontSize: "0.75rem", padding: "6px 8px", borderRadius: "4px", cursor: "pointer" }}>✍️ Autocomplete Paragraph</button>
                              <button type="button" onClick={() => runAiHelper("summarize")} style={{ textAlign: "left", width: "100%", background: "#f8fafc", border: "1px solid #cbd5e1", color: "#334155", fontSize: "0.75rem", padding: "6px 8px", borderRadius: "4px", cursor: "pointer" }}>📝 Insert Exec Summary</button>
                              <button type="button" onClick={() => runAiHelper("actionItems")} style={{ textAlign: "left", width: "100%", background: "#f8fafc", border: "1px solid #cbd5e1", color: "#334155", fontSize: "0.75rem", padding: "6px 8px", borderRadius: "4px", cursor: "pointer" }}>📋 Generate Action Items</button>
                              <button type="button" onClick={() => runAiHelper("polish")} style={{ textAlign: "left", width: "100%", background: "#f8fafc", border: "1px solid #cbd5e1", color: "#334155", fontSize: "0.75rem", padding: "6px 8px", borderRadius: "4px", cursor: "pointer" }}>✨ Polish & Improve style</button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Clear Formatting */}
                      <button type="button" onClick={() => execRichCommand("removeFormat")} style={{ padding: "0.35rem 0.5rem", borderRadius: "6px", background: "#ffffff", border: "1px solid #cbd5e1", color: "#334155", cursor: "pointer", fontSize: "0.8rem", fontWeight: 700 }} title="Clear Formatting">Tx</button>

                      {/* Delete Selection */}
                      <button type="button" onClick={() => insertTextAtCursor("")} style={{ padding: "0.35rem 0.5rem", borderRadius: "6px", background: "#ffffff", border: "1px solid #cbd5e1", color: "#ff6b6b", cursor: "pointer", fontSize: "0.8rem", fontWeight: 700 }} title="Delete Selection">X</button>

                      <div style={{ width: "1px", height: "18px", background: "#cbd5e1", margin: "0 2px" }} />

                      {/* Undo / Redo */}
                      <button type="button" onClick={() => execRichCommand("undo")} style={{ padding: "0.35rem 0.5rem", borderRadius: "6px", background: "#ffffff", border: "1px solid #cbd5e1", color: "#334155", cursor: "pointer", fontSize: "0.8rem" }} title="Undo Selection">↩️</button>
                      <button type="button" onClick={() => execRichCommand("redo")} style={{ padding: "0.35rem 0.5rem", borderRadius: "6px", background: "#ffffff", border: "1px solid #cbd5e1", color: "#334155", cursor: "pointer", fontSize: "0.8rem" }} title="Redo Selection">↪️</button>

                      {/* Add block dropdown (+ v) */}
                      <div style={{ position: "relative" }}>
                        <button type="button" onClick={() => { setShowAddBlockPopover(!showAddBlockPopover); setShowTablePopover(false); setShowColorPopover(false); setShowEmojiPopover(false); setShowSymbolPopover(false); setShowAiPopover(false); }} style={{ padding: "0.35rem 0.5rem", borderRadius: "6px", background: "#ffffff", border: "1px solid #cbd5e1", color: "#334155", cursor: "pointer", fontSize: "0.8rem", fontWeight: 800 }} title="Add Element Block">+</button>
                        {showAddBlockPopover && (
                          <div style={{ position: "absolute", top: "100%", right: 0, marginTop: "8px", background: "#ffffff", border: "1px solid #cbd5e1", padding: "6px", borderRadius: "8px", zIndex: 100, width: "180px", boxShadow: "0 10px 25px rgba(0,0,0,0.08)" }}>
                            <button type="button" onClick={() => { insertHtmlAtCursor(`<hr style="border: 0; border-top: 1px solid #cbd5e1; margin: 1.5rem 0;" />`); setShowAddBlockPopover(false); }} style={{ textAlign: "left", width: "100%", background: "#f8fafc", border: "1px solid #cbd5e1", color: "#334155", fontSize: "0.75rem", padding: "6px 8px", borderRadius: "4px", cursor: "pointer", marginBottom: "4px" }}>➖ Horizontal Line</button>
                            <button type="button" onClick={() => { insertHtmlAtCursor(`<div style="padding: 1rem; background: #eff6ff; border-left: 4px solid #3b82f6; border-radius: 4px; margin: 1rem 0; color: #1e3a8a;">💡 Info Callout Box...</div>`); setShowAddBlockPopover(false); }} style={{ textAlign: "left", width: "100%", background: "#f8fafc", border: "1px solid #cbd5e1", color: "#334155", fontSize: "0.75rem", padding: "6px 8px", borderRadius: "4px", cursor: "pointer", marginBottom: "4px" }}>💡 Styled Info Callout</button>
                            <button type="button" onClick={() => { insertHtmlAtCursor(`<pre style="background: #0f172a; color: #f8fafc; padding: 1rem; border-radius: 8px; font-family: monospace;"><code>Code code code</code></pre>`); setShowAddBlockPopover(false); }} style={{ textAlign: "left", width: "100%", background: "#f8fafc", border: "1px solid #cbd5e1", color: "#334155", fontSize: "0.75rem", padding: "6px 8px", borderRadius: "4px", cursor: "pointer" }}>💻 Preformatted code</button>
                          </div>
                        )}
                      </div>

                      {/* Comments Indicator */}
                      <button type="button" onClick={() => { insertHtmlAtCursor(`<!-- Comment placeholder -->`); alert("Comment tag placeholder inserted at cursor."); }} style={{ padding: "0.35rem 0.5rem", borderRadius: "6px", background: "#ffffff", border: "1px solid #cbd5e1", color: "#334155", cursor: "pointer", fontSize: "0.8rem" }} title="Insert Editor Comment">💬</button>
                    </div>
                  </div>

                  <div 
                    ref={editorRef}
                    id="rich-content-editor"
                    className="rich-editor-content-area"
                    contentEditable
                    onInput={(e) => setFormContent(e.currentTarget.innerHTML)}
                    onBlur={(e) => setFormContent(e.currentTarget.innerHTML)}
                    onClick={(e) => {
                      const target = e.target as HTMLElement;
                      if (target.tagName === "A") {
                        e.preventDefault();
                      }
                    }}
                    style={{
                      minHeight: "400px",
                      border: "2px solid #e2e8f0",
                      borderRadius: "0 0 14px 14px",
                      padding: "1.25rem",
                      outline: "none",
                      background: "#ffffff",
                      overflowY: "auto",
                      color: "#0f172a",
                      fontSize: "15px",
                      lineHeight: "1.7",
                      fontFamily: "Geist, var(--font-sans, sans-serif)"
                    }}
                  />
                  <div style={{ fontSize: "0.7rem", color: "#64748b", marginTop: "4px", display: "flex", gap: "8px", fontWeight: 700 }}>
                    <span>💡 Dictation requires browser micro permission.</span>
                    <span>• Press / inside text (simulate Notion popup).</span>
                  </div>
                </div>

                {/* Social Media Links */}
                <div className="form-group span-2" style={{ borderTop: "1px solid #e2e8f0", paddingTop: "1.5rem", marginTop: "1rem" }}>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", marginBottom: "1rem" }}>Author Social Media Links</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="fb-link">Facebook Profile URL</label>
                      <input
                        id="fb-link"
                        type="url"
                        className="form-input"
                        placeholder="e.g. https://facebook.com/author"
                        value={formFacebookUrl}
                        onChange={(e) => setFormFacebookUrl(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="tw-link">Twitter/X Profile URL</label>
                      <input
                        id="tw-link"
                        type="url"
                        className="form-input"
                        placeholder="e.g. https://twitter.com/author"
                        value={formTwitterUrl}
                        onChange={(e) => setFormTwitterUrl(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="li-link">LinkedIn Profile URL</label>
                      <input
                        id="li-link"
                        type="url"
                        className="form-input"
                        placeholder="e.g. https://linkedin.com/in/author"
                        value={formLinkedinUrl}
                        onChange={(e) => setFormLinkedinUrl(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="ig-link">Instagram Profile URL</label>
                      <input
                        id="ig-link"
                        type="url"
                        className="form-input"
                        placeholder="e.g. https://instagram.com/author"
                        value={formInstagramUrl}
                        onChange={(e) => setFormInstagramUrl(e.target.value)}
                      />
                    </div>
                  </div>
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
                    <>
                      <button 
                        type="button" 
                        onClick={() => {
                          const post = blogs.find(b => b.id === editingId);
                          if (post) handleDeleteBlog(post);
                        }} 
                        className="btn-secondary delete-form-btn flex-btn"
                      >
                        <Trash2 size={14} />
                        <span>Delete Article</span>
                      </button>
                      <button type="button" onClick={triggerNewBlog} className="btn-secondary cancel-btn">
                        Discard Changes
                      </button>
                    </>
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
      ) : (
        <div className="cms-workspace-grid">
          {/* Left Side: Admins List */}
          <aside className="cms-directory-sidebar">
            <div className="directory-header-row">
              <h3>Administrator List</h3>
            </div>
            <div className="directory-posts-list">
              {users.filter(u => u.role === "Admin" || u.role === "Super Admin").map((userItem) => (
                <div key={userItem.id} className="directory-card" style={{ display: "block" }}>
                  <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "0.5rem" }}>
                    <Image src={userItem.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150"} alt={userItem.name} width={32} height={32} style={{ borderRadius: "50%", objectFit: "cover" }} />
                    <div style={{ minWidth: 0 }}>
                      <h4 style={{ margin: 0, fontSize: "0.82rem", fontWeight: 800 }}>{userItem.name}</h4>
                      <span style={{ fontSize: "0.68rem", color: "#64748b" }}>{userItem.email}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.5rem" }}>
                    <span className="status-badge published" style={{ fontSize: "0.58rem" }}>{userItem.role}</span>
                    {userItem.id !== "user-super" && (
                      <button 
                        type="button" 
                        onClick={() => handleDeleteUser(userItem.id, userItem.name)} 
                        className="dir-delete-btn"
                        style={{ padding: "0.2rem 0.4rem" }}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* Right Side: Add Administrators Form */}
          <main className="cms-editor-panel">
            
            {/* Table of Registered Administrators */}
            <div className="editor-card" style={{ maxWidth: "1000px", marginBottom: "2rem" }}>
              <div className="editor-card-header" style={{ marginBottom: "1rem" }}>
                <h2>Registered Administrators</h2>
                <p>Overview of active administrator accounts and their credentials.</p>
              </div>

              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem", textAlign: "left" }}>
                  <thead>
                    <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
                      <th style={{ padding: "0.75rem 1rem", fontWeight: 700, color: "#475569" }}>Name</th>
                      <th style={{ padding: "0.75rem 1rem", fontWeight: 700, color: "#475569" }}>User ID / Email</th>
                      <th style={{ padding: "0.75rem 1rem", fontWeight: 700, color: "#475569" }}>Password</th>
                      <th style={{ padding: "0.75rem 1rem", fontWeight: 700, color: "#475569" }}>Role</th>
                      <th style={{ padding: "0.75rem 1rem", fontWeight: 700, color: "#475569" }}>Designation</th>
                      <th style={{ padding: "0.75rem 1rem", fontWeight: 700, color: "#475569", textAlign: "right" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.filter(u => u.role === "Admin" || u.role === "Super Admin").map((userItem) => (
                      <tr key={userItem.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "#0f172a" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <Image src={userItem.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150"} alt="" width={24} height={24} style={{ borderRadius: "50%", objectFit: "cover" }} />
                            <span>{userItem.name}</span>
                          </div>
                        </td>
                        <td style={{ padding: "0.75rem 1rem", color: "#475569" }}>{userItem.email}</td>
                        <td style={{ padding: "0.75rem 1rem", fontFamily: "monospace", color: "var(--accent-orange)", fontWeight: 700 }}>
                          {userItem.password || "••••••••"}
                        </td>
                        <td style={{ padding: "0.75rem 1rem" }}>
                          <span className={`status-badge ${userItem.role === "Super Admin" ? "published" : "draft"}`} style={{ fontSize: "0.65rem", padding: "0.15rem 0.4rem" }}>
                            {userItem.role}
                          </span>
                        </td>
                        <td style={{ padding: "0.75rem 1rem", color: "#64748b" }}>{userItem.designation}</td>
                        <td style={{ padding: "0.75rem 1rem", textAlign: "right" }}>
                          {userItem.id !== "user-super" ? (
                            <button
                              type="button"
                              onClick={() => handleDeleteUser(userItem.id, userItem.name)}
                              className="dir-delete-btn"
                              style={{ padding: "0.25rem 0.5rem", fontSize: "0.72rem" }}
                            >
                              Delete
                            </button>
                          ) : (
                            <span style={{ fontSize: "0.72rem", color: "#94a3b8", fontStyle: "italic" }}>System Protected</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="editor-card" style={{ maxWidth: "1000px" }}>
              <div className="editor-card-header">
                <h2>Manage System Administrators</h2>
                <p>Register new single or multiple administrator accounts with credentials for CMS logins.</p>
              </div>

              <form onSubmit={handleSaveAdmins}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  {adminRows.map((row, idx) => (
                    <div key={idx} style={{ padding: "1.25rem", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "12px", position: "relative" }}>
                      {adminRows.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveRow(idx)}
                          style={{ position: "absolute", top: "10px", right: "10px", background: "none", border: "none", color: "#ef4444", fontSize: "0.78rem", fontWeight: 700, cursor: "pointer" }}
                        >
                          ✕ Remove Row
                        </button>
                      )}
                      <h4 style={{ fontSize: "0.82rem", fontWeight: 800, color: "#475569", marginBottom: "1rem" }}>Administrator #{idx + 1}</h4>
                      
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                        <div className="form-group">
                          <label className="form-label">Full Name</label>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="e.g. Rohan Mehta"
                            value={row.name}
                            onChange={(e) => handleRowChange(idx, "name", e.target.value)}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">User Email / ID</label>
                          <input
                            type="email"
                            className="form-input"
                            placeholder="e.g. rohan@ordrji.com"
                            value={row.email}
                            onChange={(e) => handleRowChange(idx, "email", e.target.value)}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">Password</label>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="Set secure password"
                            value={row.password}
                            onChange={(e) => handleRowChange(idx, "password", e.target.value)}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">Designation</label>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="e.g. Content Lead"
                            value={row.designation}
                            onChange={(e) => handleRowChange(idx, "designation", e.target.value)}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">Role</label>
                          <select
                            className="form-select"
                            value={row.role}
                            onChange={(e) => handleRowChange(idx, "role", e.target.value)}
                          >
                            <option value="Admin">Admin</option>
                            <option value="Super Admin">Super Admin</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <button
                      type="button"
                      onClick={handleAddRow}
                      className="btn-secondary"
                      style={{ padding: "0.6rem 1.25rem", borderRadius: "8px", fontSize: "0.85rem", fontWeight: 700 }}
                    >
                      ➕ Add Another Row
                    </button>
                    
                    <button
                      type="submit"
                      className="btn-primary save-btn"
                      style={{ padding: "0.6rem 1.5rem", borderRadius: "8px", fontSize: "0.85rem", fontWeight: 700 }}
                    >
                      Save Administrators
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </main>
        </div>
      )}

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
          flex-direction: column;
          align-items: flex-start;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .rich-editor-toolbar {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          padding: 0.5rem;
          align-items: center;
          width: 100%;
        }

        .rich-select {
          background: #fff;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          padding: 0.3rem 0.5rem;
          font-size: 0.78rem;
          font-weight: 600;
          color: #334155;
          cursor: pointer;
          outline: none;
        }

        .rich-color-picker-container {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          background: #fff;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          padding: 0.2rem 0.4rem;
          height: 30px;
        }

        .rich-color-picker {
          border: none;
          width: 20px;
          height: 20px;
          padding: 0;
          background: none;
          cursor: pointer;
        }

        .rich-toolbar-divider {
          width: 1px;
          height: 20px;
          background: #cbd5e1;
          margin: 0 0.25rem;
        }

        .rich-btn {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          min-width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          color: #334155;
          transition: all 0.15s;
          padding: 0 0.4rem;
        }

        .rich-btn:hover {
          border-color: var(--accent-orange);
          color: var(--accent-orange);
          background: rgba(227, 6, 19, 0.02);
        }

        .rich-editor-content-area {
          line-height: 1.6;
          font-size: 0.95rem;
          color: #0f172a;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.02);
        }

        .rich-editor-content-area h1 { font-size: 1.8rem; font-weight: 800; margin: 1.5rem 0 0.75rem; }
        .rich-editor-content-area h2 { font-size: 1.5rem; font-weight: 800; margin: 1.25rem 0 0.5rem; }
        .rich-editor-content-area h3 { font-size: 1.25rem; font-weight: 800; margin: 1rem 0 0.5rem; }
        .rich-editor-content-area p { margin-bottom: 1rem; }
        .rich-editor-content-area ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem; }
        .rich-editor-content-area ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1rem; }
        .rich-editor-content-area blockquote { border-left: 4px solid var(--accent-orange); padding-left: 1rem; color: #475569; font-style: italic; margin: 1rem 0; }
        .rich-editor-content-area a { color: var(--accent-orange); text-decoration: underline; font-weight: 600; }

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

        .dir-delete-btn {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          padding: 0.3rem 0.5rem;
          font-size: 0.68rem;
          font-weight: 800;
          color: #ef4444;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.2rem;
          transition: all 0.15s;
        }

        .dir-delete-btn:hover {
          border-color: #ef4444;
          background: rgba(239, 68, 68, 0.05);
        }

        .delete-form-btn {
          padding: 0.65rem 1.25rem !important;
          border-radius: 8px !important;
          font-size: 0.85rem !important;
          color: #ef4444 !important;
          border: 1px solid rgba(239, 68, 68, 0.2) !important;
          background: #ffffff !important;
          cursor: pointer;
        }

        .delete-form-btn:hover {
          background: #fef2f2 !important;
          border-color: #ef4444 !important;
        }
      `}</style>
    </div>
  );
}
