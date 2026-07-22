"use client";

import React from "react";
import { motion } from "framer-motion";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Link2 } from "lucide-react";
import { RegistrationFormData } from "./FormValidation";

interface Props {
  register: UseFormRegister<RegistrationFormData>;
  errors: FieldErrors<RegistrationFormData>;
}

function PlatformField({ label, logo, placeholder, fieldName, register, error }: {
  label: string; logo: React.ReactNode; placeholder: string;
  fieldName: "swiggyUrl" | "zomatoUrl";
  register: UseFormRegister<RegistrationFormData>;
  error?: string;
}) {
  return (
    <motion.div className="rr-field" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <label className="rr-label">
        <span className="rr-platform-logo">{logo}</span>
        {label} <span className="rr-optional">(Optional)</span>
      </label>
      <div className="rr-input-prefix-wrap">
        <span className="rr-input-prefix" style={{ display: "flex", alignItems: "center" }}>{logo}</span>
        <input
          type="url"
          className={`rr-input rr-input-prefixed ${error ? "rr-input-err" : ""}`}
          placeholder={placeholder}
          {...register(fieldName)}
          style={{ paddingLeft: "2.5rem" }}
        />
      </div>
      {error && <span className="rr-error">{error}</span>}
    </motion.div>
  );
}

export default function IntegrationSection({ register, errors }: Props) {
  return (
    <div className="rr-section">
      <div className="rr-section-header">
        <span className="rr-section-num">04</span>
        <div>
          <h3 className="rr-section-title">Connect Your Ordering Platforms</h3>
          <p className="rr-section-sub">
            Paste your public restaurant URL from Swiggy or Zomato so customers can order directly.
          </p>
        </div>
      </div>

      <div className="rr-integration-banner">
        <span className="rr-integration-icon">🔗</span>
        <p>
          Ordrji will automatically redirect customers to your Swiggy / Zomato page for ordering.
          These links are optional but highly recommended for maximum visibility.
        </p>
      </div>

      <div className="rr-grid-2">
        <PlatformField
          label="Swiggy Restaurant URL"
          logo={
            <img
              src="https://www.google.com/s2/favicons?domain=swiggy.com&sz=64"
              alt="Swiggy"
              width={18}
              height={18}
              style={{ display: "inline-block", verticalAlign: "middle", borderRadius: "4px", marginRight: "4px" }}
            />
          }
          placeholder="https://www.swiggy.com/restaurants/your-restaurant-name"
          fieldName="swiggyUrl"
          register={register}
          error={errors.swiggyUrl?.message}
        />
        <PlatformField
          label="Zomato Restaurant URL"
          logo={
            <img
              src="https://www.google.com/s2/favicons?domain=zomato.com&sz=64"
              alt="Zomato"
              width={18}
              height={18}
              style={{ display: "inline-block", verticalAlign: "middle", borderRadius: "4px", marginRight: "4px" }}
            />
          }
          placeholder="https://www.zomato.com/city/restaurant-name"
          fieldName="zomatoUrl"
          register={register}
          error={errors.zomatoUrl?.message}
        />
      </div>
    </div>
  );
}
