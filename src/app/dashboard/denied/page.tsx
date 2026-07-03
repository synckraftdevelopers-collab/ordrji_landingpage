"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ShieldAlert, ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

function AccessDeniedContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "Visitor";
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown <= 0) {
      router.push("/");
    }
  }, [countdown, router]);

  return (
    <div className="denied-card">
      <div className="denied-icon-wrap">
        <ShieldAlert size={48} />
      </div>

      <h1 className="denied-title">403 – Access Denied</h1>
      <p className="denied-subtitle">Unauthorized Blog Management Access</p>

      <div className="denied-alert-info">
        <p>
          Your current authenticated profile is signed in with the role of <strong>{role}</strong>.
        </p>
        <p className="subtext">
          Only authenticated <strong>Admin</strong> or <strong>Super Admin</strong> credentials can manage blog content, categories, tags, or publishing workflows.
        </p>
      </div>

      <div className="denied-countdown">
        Redirecting you to the corporate homepage in <span>{countdown}s</span>...
      </div>

      <div className="denied-actions">
        <Link href="/" className="denied-btn home-btn">
          <Home size={16} />
          <span>Go Home Now</span>
        </Link>
        
        <button onClick={() => router.back()} className="denied-btn back-btn">
          <ArrowLeft size={16} />
          <span>Go Back</span>
        </button>
      </div>
    </div>
  );
}

export default function AccessDeniedPage() {
  return (
    <div className="denied-root">
      <div className="denied-bg-glow" />
      <Suspense fallback={<div className="denied-card">Loading security verification...</div>}>
        <AccessDeniedContent />
      </Suspense>

      <style jsx global>{`
        .denied-root {
          min-height: 100vh;
          background-color: var(--bg-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: 2rem 1.5rem;
          color: var(--text-primary);
        }

        .denied-bg-glow {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          filter: blur(140px);
          opacity: 0.08;
          background: var(--accent-orange);
          pointer-events: none;
          z-index: 1;
        }

        .denied-card {
          width: 100%;
          max-width: 500px;
          background: #ffffff;
          border: 1px solid var(--border-color);
          border-radius: 24px;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.04);
          padding: 3rem 2.5rem;
          text-align: center;
          position: relative;
          z-index: 5;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .denied-icon-wrap {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(227, 6, 19, 0.08);
          color: var(--accent-orange);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          border: 1px solid rgba(227, 6, 19, 0.15);
        }

        .denied-title {
          font-size: 1.8rem;
          font-weight: 900;
          letter-spacing: -1px;
          margin-bottom: 0.25rem;
          color: var(--text-primary);
        }

        .denied-subtitle {
          font-size: 0.95rem;
          color: var(--text-secondary);
          font-weight: 600;
          margin-bottom: 2rem;
        }

        .denied-alert-info {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 1.25rem;
          font-size: 0.88rem;
          line-height: 1.5;
          color: var(--text-secondary);
          margin-bottom: 2rem;
          width: 100%;
        }

        .denied-alert-info strong {
          color: var(--text-primary);
        }

        .denied-alert-info .subtext {
          font-size: 0.78rem;
          color: var(--text-muted);
          margin-top: 0.5rem;
          border-top: 1px dashed var(--border-color);
          padding-top: 0.5rem;
        }

        .denied-countdown {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-muted);
          margin-bottom: 2.25rem;
        }

        .denied-countdown span {
          color: var(--accent-orange);
          font-weight: 750;
          font-family: monospace;
        }

        .denied-actions {
          display: flex;
          gap: 0.75rem;
          width: 100%;
        }

        .denied-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem;
          border-radius: 10px;
          font-size: 0.85rem;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
        }

        .home-btn {
          background: var(--accent-orange);
          color: #ffffff;
          border: none;
        }
        .home-btn:hover {
          background: #c2410c;
          box-shadow: 0 8px 16px rgba(227, 6, 19, 0.2);
        }

        .back-btn {
          background: #ffffff;
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
        }
        .back-btn:hover {
          background: var(--bg-secondary);
          border-color: var(--border-color-hover);
        }
      `}</style>
    </div>
  );
}
