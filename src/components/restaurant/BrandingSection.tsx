"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Upload, ImageIcon, X } from "lucide-react";
import Image from "next/image";

interface UploadZoneProps {
  label: string;
  hint: string;
  value: string | null;
  onChange: (file: File | null, url: string | null) => void;
}

function UploadZone({ label, hint, value, onChange }: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (file: File) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      alert("Invalid file format. Allowed formats: JPG, JPEG, PNG, WEBP.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB limit.");
      return;
    }
    const previewUrl = URL.createObjectURL(file);
    onChange(file, previewUrl);
  };

  return (
    <div className="rr-field">
      <label className="rr-label"><ImageIcon size={14} /> {label}</label>
      {value ? (
        <motion.div className="rr-upload-preview" initial={{ opacity: 0, scale: .95 }} animate={{ opacity: 1, scale: 1 }}>
          <Image src={value} alt={label} fill style={{ objectFit: "cover", borderRadius: "12px" }} />
          <button className="rr-upload-remove" onClick={() => onChange(null, null)} type="button" aria-label="Remove image">
            <X size={14} />
          </button>
        </motion.div>
      ) : (
        <motion.div
          className={`rr-upload-zone ${dragging ? "rr-upload-drag" : ""}`}
          whileHover={{ borderColor: "#E30613", background: "#fff5f5" }}
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={e => {
            e.preventDefault(); setDragging(false);
            const file = e.dataTransfer.files[0];
            if (file) handleFile(file);
          }}
          onClick={() => inputRef.current?.click()}
        >
          <Upload size={28} color="#E30613" />
          <p className="rr-upload-text">Drag & drop or <span>click to upload</span></p>
          <p className="rr-upload-hint">{hint}</p>
          <input ref={inputRef} type="file" accept="image/*" style={{ display: "none" }}
            onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
        </motion.div>
      )}
    </div>
  );
}

interface Props {
  logo: string | null;
  cover: string | null;
  image1: string | null;
  image2: string | null;
  onLogoChange: (file: File | null, v: string | null) => void;
  onCoverChange: (file: File | null, v: string | null) => void;
  onImage1Change: (file: File | null, v: string | null) => void;
  onImage2Change: (file: File | null, v: string | null) => void;
}

export default function BrandingSection({ 
  logo, 
  cover, 
  image1,
  image2,
  onLogoChange, 
  onCoverChange,
  onImage1Change,
  onImage2Change
}: Props) {
  return (
    <div className="rr-section">
      <div className="rr-section-header">
        <span className="rr-section-num">03</span>
        <div>
          <h3 className="rr-section-title">Restaurant Branding</h3>
          <p className="rr-section-sub">Upload your logo, cover image, and two restaurant showcase images</p>
        </div>
      </div>

      <div className="rr-grid-2">
        <UploadZone
          label="Restaurant Logo"
          hint="PNG, JPG up to 2MB · Recommended 200×200px"
          value={logo}
          onChange={onLogoChange}
        />
        <UploadZone
          label="Cover Image"
          hint="PNG, JPG up to 5MB · Recommended 1200×400px"
          value={cover}
          onChange={onCoverChange}
        />
      </div>

      <div className="rr-grid-2" style={{ marginTop: "1.5rem" }}>
        <UploadZone
          label="Restaurant Image 1"
          hint="PNG, JPG up to 5MB · Recommended 800×600px"
          value={image1}
          onChange={onImage1Change}
        />
        <UploadZone
          label="Restaurant Image 2"
          hint="PNG, JPG up to 5MB · Recommended 800×600px"
          value={image2}
          onChange={onImage2Change}
        />
      </div>
    </div>
  );
}
