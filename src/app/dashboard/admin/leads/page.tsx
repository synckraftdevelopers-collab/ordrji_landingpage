/* eslint-disable @typescript-eslint/no-explicit-any, react/no-unescaped-entities, @next/next/no-html-link-for-pages, react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Bell, RefreshCw, Phone, Mail, MapPin, Building2,
  MessageSquare, Clock, CheckCircle2, XCircle,
  CalendarClock, ArrowLeft, Inbox,
  ChevronDown, Circle,
} from "lucide-react";

interface Lead {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  location: string;
  restaurant_name: string | null;
  message: string | null;
  status: "new" | "contacted" | "demo_scheduled" | "converted" | "lost";
  notes: string | null;
  created_at: string;
  updated_at: string;
}

const STATUS_CONFIG: Record<Lead["status"], { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  new:            { label: "New",            color: "#2563eb", bg: "#eff6ff", icon: <Circle    size={13} fill="#2563eb" color="#2563eb" /> },
  contacted:      { label: "Contacted",      color: "#d97706", bg: "#fffbeb", icon: <Phone     size={13} /> },
  demo_scheduled: { label: "Demo Scheduled", color: "#7c3aed", bg: "#faf5ff", icon: <CalendarClock size={13} /> },
  converted:      { label: "Converted",      color: "#16a34a", bg: "#f0fdf4", icon: <CheckCircle2 size={13} /> },
  lost:           { label: "Lost",           color: "#dc2626", bg: "#fff5f5", icon: <XCircle   size={13} /> },
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days  = Math.floor(diff / 86400000);
  if (mins  < 1)  return "just now";
  if (mins  < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

export default function LeadsDashboardPage() {
  const [leads,       setLeads]       = useState<Lead[]>([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [filter,      setFilter]      = useState<Lead["status"] | "all">("all");
  const [expandedId,  setExpandedId]  = useState<string | null>(null);
  const [updatingId,  setUpdatingId]  = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/leads");
      const data = await res.json() as { success: boolean; leads: Lead[]; error?: string };
      if (data.success) {
        setLeads(data.leads);
        setLastRefresh(new Date());
      } else {
        setError(data.error ?? "Failed to fetch leads");
      }
    } catch {
      setError("Network error. Is Supabase configured?");
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch + auto-refresh every 30s
  useEffect(() => {
    fetchLeads();
    const interval = setInterval(fetchLeads, 30000);
    return () => clearInterval(interval);
  }, [fetchLeads]);

  const updateStatus = async (id: string, status: Lead["status"]) => {
    setUpdatingId(id);
    try {
      await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = filter === "all" ? leads : leads.filter(l => l.status === filter);
  const newCount  = leads.filter(l => l.status === "new").length;
  const counts    = Object.fromEntries(
    (["all","new","contacted","demo_scheduled","converted","lost"] as const).map(s => [
      s,
      s === "all" ? leads.length : leads.filter(l => l.status === s).length,
    ])
  );

  return (
    <>
      <div className="ld-page">
        {/* ── Header ─────────────────────────────────────────────── */}
        <header className="ld-header">
          <div className="ld-header-left">
            <Link href="/dashboard/admin/blogs" className="ld-back-btn">
              <ArrowLeft size={15} /> Admin
            </Link>
            <div className="ld-title-wrap">
              <h1 className="ld-title">
                <Bell size={20} /> Demo Leads
                {newCount > 0 && <span className="ld-new-badge">{newCount} new</span>}
              </h1>
              <p className="ld-subtitle">
                Auto-refreshes every 30s · Last: {lastRefresh.toLocaleTimeString()}
              </p>
            </div>
          </div>
          <button className="ld-refresh-btn" onClick={fetchLeads} disabled={loading}>
            <RefreshCw size={15} className={loading ? "ld-spin" : ""} />
            {loading ? "Loading…" : "Refresh"}
          </button>
        </header>

        {/* ── Stats row ──────────────────────────────────────────── */}
        <div className="ld-stats">
          {[
            { label: "Total",     value: leads.length,                              color: "#374151" },
            { label: "New",       value: counts.new,                                color: "#2563eb" },
            { label: "Contacted", value: counts.contacted,                          color: "#d97706" },
            { label: "Scheduled", value: counts.demo_scheduled,                     color: "#7c3aed" },
            { label: "Converted", value: counts.converted,                          color: "#16a34a" },
          ].map(s => (
            <div key={s.label} className="ld-stat-card">
              <span className="ld-stat-num" style={{ color: s.color }}>{s.value}</span>
              <span className="ld-stat-lbl">{s.label}</span>
            </div>
          ))}
        </div>

        {/* ── Filter tabs ────────────────────────────────────────── */}
        <div className="ld-filters">
          {(["all","new","contacted","demo_scheduled","converted","lost"] as const).map(s => (
            <button
              key={s}
              className={`ld-filter-btn ${filter === s ? "ld-filter-active" : ""}`}
              onClick={() => setFilter(s)}
              style={filter === s && s !== "all" ? {
                color: STATUS_CONFIG[s as Lead["status"]]?.color,
                borderColor: STATUS_CONFIG[s as Lead["status"]]?.color,
                background: STATUS_CONFIG[s as Lead["status"]]?.bg,
              } : {}}
            >
              {s === "all" ? "All" : STATUS_CONFIG[s as Lead["status"]].label}
              <span className="ld-filter-count">{counts[s]}</span>
            </button>
          ))}
        </div>

        {/* ── Error ──────────────────────────────────────────────── */}
        {error && (
          <div className="ld-error">
            <XCircle size={16} /> {error}
          </div>
        )}

        {/* ── Empty state ────────────────────────────────────────── */}
        {!loading && !error && filtered.length === 0 && (
          <div className="ld-empty">
            <Inbox size={48} color="#cbd5e1" />
            <p>{filter === "all" ? "No demo leads yet." : `No leads with status "${STATUS_CONFIG[filter as Lead["status"]]?.label}".`}</p>
          </div>
        )}

        {/* ── Leads list ─────────────────────────────────────────── */}
        <div className="ld-list">
          {filtered.map(lead => {
            const sc  = STATUS_CONFIG[lead.status];
            const exp = expandedId === lead.id;
            return (
              <div key={lead.id} className={`ld-card ${lead.status === "new" ? "ld-card-new" : ""}`}>

                {/* Card top row */}
                <div className="ld-card-top" onClick={() => setExpandedId(exp ? null : lead.id)}>
                  <div className="ld-card-avatar">
                    {lead.full_name.charAt(0).toUpperCase()}
                  </div>

                  <div className="ld-card-info">
                    <div className="ld-card-name-row">
                      <span className="ld-card-name">{lead.full_name}</span>
                      {lead.status === "new" && <span className="ld-card-new-dot">NEW</span>}
                    </div>
                    {lead.restaurant_name && (
                      <span className="ld-card-restaurant">
                        <Building2 size={12} /> {lead.restaurant_name}
                      </span>
                    )}
                    <span className="ld-card-time">
                      <Clock size={11} /> {timeAgo(lead.created_at)}
                    </span>
                  </div>

                  <div className="ld-card-right">
                    <span className="ld-status-pill" style={{ color: sc.color, background: sc.bg }}>
                      {sc.icon} {sc.label}
                    </span>
                    <ChevronDown
                      size={16}
                      className="ld-chevron"
                      style={{ transform: exp ? "rotate(180deg)" : "none" }}
                    />
                  </div>
                </div>

                {/* Expanded details */}
                {exp && (
                  <div className="ld-card-details">
                    <div className="ld-detail-grid">
                      <div className="ld-detail-item">
                        <Mail size={13} /> <a href={`mailto:${lead.email}`}>{lead.email}</a>
                      </div>
                      <div className="ld-detail-item">
                        <Phone size={13} /> <a href={`tel:${lead.phone}`}>{lead.phone}</a>
                      </div>
                      <div className="ld-detail-item">
                        <MapPin size={13} /> {lead.location}
                      </div>
                      {lead.message && (
                        <div className="ld-detail-item ld-detail-full">
                          <MessageSquare size={13} />
                          <span className="ld-message">{lead.message}</span>
                        </div>
                      )}
                    </div>

                    {/* Status actions */}
                    <div className="ld-actions">
                      <span className="ld-actions-label">Update status:</span>
                      {(["new","contacted","demo_scheduled","converted","lost"] as const).map(s => (
                        <button
                          key={s}
                          className={`ld-action-btn ${lead.status === s ? "ld-action-active" : ""}`}
                          style={lead.status === s ? { background: STATUS_CONFIG[s].bg, color: STATUS_CONFIG[s].color, borderColor: STATUS_CONFIG[s].color } : {}}
                          onClick={() => updateStatus(lead.id, s)}
                          disabled={updatingId === lead.id || lead.status === s}
                        >
                          {STATUS_CONFIG[s].icon} {STATUS_CONFIG[s].label}
                        </button>
                      ))}
                    </div>

                    <p className="ld-detail-date">
                      Submitted: {new Date(lead.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        .ld-page {
          min-height: 100vh; background: #f8fafc;
          font-family: var(--font-sans, system-ui);
          padding: 2rem 1.25rem 4rem;
          max-width: 900px; margin: 0 auto;
        }

        /* Header */
        .ld-header { display:flex;align-items:flex-start;justify-content:space-between;gap:1rem;margin-bottom:2rem;flex-wrap:wrap; }
        .ld-header-left { display:flex;align-items:flex-start;gap:1rem; }
        .ld-back-btn { display:inline-flex;align-items:center;gap:.35rem;font-size:.8rem;font-weight:600;color:#64748b;text-decoration:none;background:#fff;border:1px solid #e2e8f0;padding:.45rem .9rem;border-radius:8px;transition:all .2s;margin-top:.2rem; }
        .ld-back-btn:hover { color:#0f172a;border-color:#cbd5e1; }
        .ld-title-wrap { display:flex;flex-direction:column;gap:.25rem; }
        .ld-title { display:flex;align-items:center;gap:.6rem;font-size:1.5rem;font-weight:900;color:#0f172a;margin:0;letter-spacing:-.5px; }
        .ld-new-badge { font-size:.65rem;font-weight:800;background:#2563eb;color:#fff;padding:.2rem .6rem;border-radius:9999px;letter-spacing:.4px;text-transform:uppercase; }
        .ld-subtitle { font-size:.75rem;color:#94a3b8;margin:0; }
         .ld-refresh-btn { display:inline-flex;align-items:center;gap:.4rem;background:#fff;border:1px solid #e2e8f0;padding:.55rem 1rem;border-radius:10px;font-family:inherit;font-size:.82rem;font-weight:600;color:#374151;cursor:pointer;transition:all .2s; }
         .ld-refresh-btn:hover { border-color:#E30613;color:#E30613; }
         .ld-refresh-btn:disabled { opacity:.6;cursor:not-allowed; }
         .ld-spin { animation:ldSpin .7s linear infinite; }
         @keyframes ldSpin { to { transform:rotate(360deg); } }
 
         /* Stats */
         .ld-stats { display:flex;gap:.75rem;flex-wrap:wrap;margin-bottom:1.5rem; }
         .ld-stat-card { flex:1;min-width:90px;background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:.9rem 1rem;text-align:center;display:flex;flex-direction:column;gap:.2rem;box-shadow:0 2px 8px rgba(0,0,0,.03); }
         .ld-stat-num { font-size:1.6rem;font-weight:900;letter-spacing:-1px;line-height:1; }
         .ld-stat-lbl { font-size:.68rem;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.5px; }
 
         /* Filters */
         .ld-filters { display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:1.5rem; }
         .ld-filter-btn { display:inline-flex;align-items:center;gap:.4rem;padding:.4rem .85rem;border-radius:9999px;border:1.5px solid #e2e8f0;background:#fff;font-family:inherit;font-size:.78rem;font-weight:600;color:#374151;cursor:pointer;transition:all .15s; }
         .ld-filter-btn:hover { border-color:#cbd5e1; }
         .ld-filter-active { font-weight:700; }
         .ld-filter-count { font-size:.7rem;background:#f1f5f9;color:#64748b;padding:.1rem .4rem;border-radius:9999px;font-weight:700; }
 
         /* Error / empty */
         .ld-error { display:flex;align-items:center;gap:.5rem;background:#fff5f5;border:1px solid #fecaca;color:#dc2626;padding:1rem 1.25rem;border-radius:12px;font-size:.875rem;margin-bottom:1rem; }
         .ld-empty { display:flex;flex-direction:column;align-items:center;gap:.75rem;padding:4rem 1.5rem;text-align:center; }
         .ld-empty p { font-size:.9rem;color:#94a3b8;margin:0; }
 
         /* Lead cards */
         .ld-list { display:flex;flex-direction:column;gap:.75rem; }
         .ld-card { background:#fff;border:1.5px solid #e2e8f0;border-radius:16px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,.04);transition:box-shadow .2s,border-color .2s; }
         .ld-card:hover { box-shadow:0 6px 20px rgba(0,0,0,.07); }
         .ld-card-new { border-color:#bfdbfe; }
 
         .ld-card-top { display:flex;align-items:center;gap:1rem;padding:1.1rem 1.25rem;cursor:pointer;user-select:none; }
         .ld-card-avatar { width:40px;height:40px;border-radius:12px;background:linear-gradient(135deg,#E30613,#bd040f);color:#fff;font-size:1.1rem;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
         .ld-card-info { flex:1;min-width:0;display:flex;flex-direction:column;gap:.2rem; }
         .ld-card-name-row { display:flex;align-items:center;gap:.5rem; }
         .ld-card-name { font-size:.975rem;font-weight:800;color:#0f172a; }
         .ld-card-new-dot { font-size:.6rem;font-weight:800;background:#2563eb;color:#fff;padding:.15rem .5rem;border-radius:9999px;text-transform:uppercase;letter-spacing:.4px; }
         .ld-card-restaurant { display:flex;align-items:center;gap:.3rem;font-size:.78rem;color:#64748b;font-weight:600; }
         .ld-card-time { display:flex;align-items:center;gap:.3rem;font-size:.72rem;color:#94a3b8; }
         .ld-card-right { display:flex;align-items:center;gap:.75rem;flex-shrink:0; }
         .ld-status-pill { display:inline-flex;align-items:center;gap:.3rem;font-size:.72rem;font-weight:700;padding:.3rem .7rem;border-radius:9999px; }
         .ld-chevron { color:#94a3b8;transition:transform .2s;flex-shrink:0; }
 
         /* Expanded */
         .ld-card-details { padding:0 1.25rem 1.25rem;border-top:1px solid #f1f5f9; }
         .ld-detail-grid { display:grid;grid-template-columns:1fr 1fr;gap:.65rem;margin-bottom:1rem;padding-top:.85rem; }
         @media(max-width:560px){ .ld-detail-grid { grid-template-columns:1fr; } }
         .ld-detail-item { display:flex;align-items:flex-start;gap:.4rem;font-size:.82rem;color:#374151; }
         .ld-detail-item a { color:#E30613;font-weight:600;text-decoration:none; }
        .ld-detail-item a:hover { text-decoration:underline; }
        .ld-detail-full { grid-column:1/-1; }
        .ld-message { color:#64748b;line-height:1.5; }

        /* Actions */
        .ld-actions { display:flex;align-items:center;gap:.5rem;flex-wrap:wrap;padding:.85rem 0;border-top:1px solid #f1f5f9;border-bottom:1px solid #f1f5f9;margin-bottom:.75rem; }
        .ld-actions-label { font-size:.72rem;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.5px;margin-right:.25rem; }
        .ld-action-btn { display:inline-flex;align-items:center;gap:.3rem;padding:.35rem .8rem;border-radius:9999px;border:1.5px solid #e2e8f0;background:#f8fafc;font-family:inherit;font-size:.72rem;font-weight:600;color:#374151;cursor:pointer;transition:all .15s; }
        .ld-action-btn:hover:not(:disabled) { border-color:#94a3b8; }
        .ld-action-btn:disabled { opacity:.5;cursor:not-allowed; }
        .ld-action-active { font-weight:800; }

        .ld-detail-date { font-size:.72rem;color:#94a3b8;margin:0; }
      `}</style>
    </>
  );
}
