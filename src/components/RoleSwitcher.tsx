/* eslint-disable @next/next/no-html-link-for-pages, react-hooks/set-state-in-effect */
"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Shield, ChevronDown, Check, Eye } from "lucide-react";

interface RoleOption {
  role: string;
  username: string;
  label: string;
  description: string;
}

const ROLES: RoleOption[] = [
  { role: "Visitor", username: "Guest Visitor", label: "Public Visitor", description: "Read-only access to published blogs" },
  { role: "Restaurant Owner", username: "Owner User", label: "Restaurant Owner", description: "Read-only access to published blogs" },
  { role: "Restaurant Staff", username: "Staff User", label: "Restaurant Staff", description: "Read-only access to published blogs" },
  { role: "Admin", username: "Ananya Gupta", label: "Admin Editor", description: "Manage blogs, versions, & logs" },
  { role: "Super Admin", username: "Rahul Sharma", label: "Super Admin", description: "Full access, restore trash, manage tags & cats" }
];

export default function RoleSwitcher() {
  // Helper to read cookies
  const getCookie = (name: string) => {
    if (typeof document === "undefined") return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return null;
  };

  const [activeRole, setActiveRole] = useState<string>("Visitor");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const savedRole = getCookie("ordrji_role");
    if (savedRole) {
      setActiveRole(savedRole);
    }
  }, []);

  const handleRoleChange = useCallback((role: string, username: string) => {
    // Set cookies with a 1-day expiry
    const maxAge = 24 * 60 * 60;
    document.cookie = `ordrji_role=${role}; path=/; max-age=${maxAge}; SameSite=Lax`;
    document.cookie = `ordrji_username=${username}; path=/; max-age=${maxAge}; SameSite=Lax`;

    setActiveRole(role);
    setIsOpen(false);

    // Refresh the page to trigger server component reload
    window.location.reload();
  }, []);

  if (!mounted) {
    return null; // Prevents SSR/hydration mismatch
  }

  return (
    <div className="role-switcher-container">
      {/* Floating Capsule trigger */}
      <button className="role-switcher-capsule" onClick={() => setIsOpen(!isOpen)}>
        <Shield size={14} className="role-icon-glow" />
        <span className="role-text-label">Testing Role: <strong>{activeRole}</strong></span>
        <ChevronDown size={14} style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
      </button>

      {/* Role list popup panel */}
      {isOpen && (
        <>
          <div className="role-switcher-overlay-backdrop" onClick={() => setIsOpen(false)} />
          <div className="role-dropdown-menu shadow-lg">
            <div className="role-dropdown-header">
              <h4>CMS Simulation Center</h4>
              <p>Toggle roles to test specific landing page permissions & admin dashboard widgets.</p>
            </div>
            
            <div className="role-options-list">
              {ROLES.map((r) => {
                const isSelected = r.role === activeRole;
                return (
                  <button
                    key={r.role}
                    className={`role-option-item ${isSelected ? "active" : ""}`}
                    onClick={() => handleRoleChange(r.role, r.username)}
                  >
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem", textAlign: "left", width: "85%" }}>
                      <span className="role-option-title">
                        {r.label} {isSelected && <span className="active-badge">Active</span>}
                      </span>
                      <span className="role-option-desc">{r.description}</span>
                    </div>
                    {isSelected ? (
                      <Check size={16} style={{ color: "var(--accent-orange)" }} />
                    ) : (
                      <Eye size={14} style={{ color: "var(--text-muted)", opacity: 0.5 }} className="eye-hover" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quick links to Dashboard / Landing */}
            <div className="role-dropdown-footer">
              <a href="/blog" className="footer-link">Public Blog</a>
              {(activeRole === "Admin" || activeRole === "Super Admin") ? (
                <a href="/dashboard/admin/blogs" className="footer-link cms-btn">CMS Dashboard</a>
              ) : (
                <span className="footer-link disabled" title="Requires Admin or Super Admin role">CMS Dashboard (Locked)</span>
              )}
            </div>
          </div>
        </>
      )}

      {/* Scoped CSS Styles for the Switcher */}
      <style jsx global>{`
        .role-switcher-container {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 99999;
          font-family: var(--font-sans);
        }

        .role-switcher-capsule {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: rgba(15, 14, 12, 0.95);
          color: #ffffff;
          padding: 0.65rem 1.15rem;
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          cursor: pointer;
          font-size: 0.82rem;
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .role-switcher-capsule:hover {
          transform: translateY(-2px);
          border-color: #c2410c;
          box-shadow: 0 12px 35px -10px rgba(194, 65, 12, 0.4);
        }

        .role-icon-glow {
          color: #c2410c;
          filter: drop-shadow(0 0 4px rgba(194, 65, 12, 0.8));
        }

        .role-text-label {
          letter-spacing: 0.1px;
        }

        .role-switcher-overlay-backdrop {
          position: fixed;
          inset: 0;
          z-index: 99997;
          background: transparent;
        }

        .role-dropdown-menu {
          position: absolute;
          bottom: 50px;
          right: 0;
          width: 320px;
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 18px;
          padding: 1.25rem;
          z-index: 99998;
          box-shadow: var(--shadow-float);
          animation: slideUpFade 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .role-dropdown-header {
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          padding-bottom: 0.85rem;
          margin-bottom: 0.75rem;
        }

        .role-dropdown-header h4 {
          margin: 0;
          font-weight: 800;
          font-size: 0.95rem;
          color: var(--text-primary);
          letter-spacing: -0.5px;
        }

        .role-dropdown-header p {
          margin: 0.2rem 0 0;
          font-size: 0.72rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .role-options-list {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .role-option-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem 0.75rem;
          border-radius: 10px;
          background: rgba(0, 0, 0, 0.015);
          border: 1px solid transparent;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
        }

        .role-option-item:hover {
          background: rgba(194, 65, 12, 0.04);
          border-color: rgba(194, 65, 12, 0.15);
        }

        .role-option-item.active {
          background: rgba(194, 65, 12, 0.07);
          border-color: rgba(194, 65, 12, 0.25);
        }

        .role-option-title {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .active-badge {
          background: #c2410c;
          color: #ffffff;
          font-size: 0.6rem;
          padding: 0.1rem 0.35rem;
          border-radius: 4px;
          font-weight: 800;
          text-transform: uppercase;
        }

        .role-option-desc {
          font-size: 0.68rem;
          color: var(--text-muted);
        }

        .role-dropdown-footer {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
          margin-top: 1rem;
          border-top: 1px solid rgba(0, 0, 0, 0.05);
          padding-top: 0.85rem;
        }

        .footer-link {
          text-align: center;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.45rem;
          border-radius: 8px;
          background: rgba(0, 0, 0, 0.03);
          border: 1px solid rgba(0,0,0,0.05);
          color: var(--text-primary);
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .footer-link:hover {
          background: rgba(0,0,0,0.06);
        }

        .footer-link.cms-btn {
          background: #c2410c;
          color: #ffffff;
          border: 1px solid transparent;
        }

        .footer-link.cms-btn:hover {
          background: #9a3412;
        }

        .footer-link.disabled {
          background: rgba(0, 0, 0, 0.02);
          color: var(--text-muted);
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
