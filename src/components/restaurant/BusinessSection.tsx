


"use client";

import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Clock, DollarSign, FileText, Shield, Globe } from "lucide-react";
import { RegistrationFormData } from "./FormValidation";

interface Props {
  register: UseFormRegister<RegistrationFormData>;
  errors: FieldErrors<RegistrationFormData>;
}

function Field({ label, error, icon, children, optional = false }: {
  label: string; error?: string; icon: React.ReactNode;
  children: React.ReactNode; optional?: boolean;
}) {
  return (
    <div className="rr-field">
      <label className="rr-label">
        <span className="rr-label-icon">{icon}</span>
        {label}
        {optional && <span className="rr-optional">(Optional)</span>}
      </label>
      {children}
      {error && <span className="rr-error">{error}</span>}
    </div>
  );
}

export default function BusinessSection({ register, errors }: Props) {
  return (
    <div className="rr-section">
      <div className="rr-section-header">
        <span className="rr-section-num">05</span>
        <div>
          <h3 className="rr-section-title">Business Details</h3>
          <p className="rr-section-sub">Operational info to display on your profile</p>
        </div>
      </div>

      <div className="rr-grid-2">
        <Field label="Opening Time *" error={errors.openingTime?.message} icon={<Clock size={14} />}>
          <input type="time" className={`rr-input ${errors.openingTime ? "rr-input-err" : ""}`}
            {...register("openingTime")} />
        </Field>

        <Field label="Closing Time *" error={errors.closingTime?.message} icon={<Clock size={14} />}>
          <input type="time" className={`rr-input ${errors.closingTime ? "rr-input-err" : ""}`}
            {...register("closingTime")} />
        </Field>

        <Field label="Average Cost for Two *" error={errors.avgCostForTwo?.message} icon={<DollarSign size={14} />}>
          <div className="rr-input-prefix-wrap">
            <span className="rr-input-prefix rr-prefix-text">₹</span>
            <input type="number" min={0}
              className={`rr-input rr-input-prefixed ${errors.avgCostForTwo ? "rr-input-err" : ""}`}
              placeholder="500" {...register("avgCostForTwo")} />
          </div>
        </Field>

        <Field label="Website" error={errors.website?.message} icon={<Globe size={14} />}>
          <input type="url" className={`rr-input ${errors.website ? "rr-input-err" : ""}`}
            placeholder="https://yourrestaurant.com" {...register("website")} />
        </Field>

        <Field label="GST Number" optional error={errors.gstNumber?.message} icon={<FileText size={14} />}>
          <input className="rr-input" placeholder="27AAPFU0939F1ZV" {...register("gstNumber")} />
        </Field>

        <Field label="FSSAI Number" optional error={errors.fssaiNumber?.message} icon={<Shield size={14} />}>
          <input className="rr-input" placeholder="11224870001048" maxLength={14}
            {...register("fssaiNumber")} />
        </Field>
      </div>
    </div>
  );
}
