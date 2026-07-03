"use client";

import React from "react";
import { motion } from "framer-motion";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Store, User, Mail, Phone, MapPin, Map, Building2 } from "lucide-react";
import { RegistrationFormData } from "./FormValidation";

interface Props {
  register: UseFormRegister<RegistrationFormData>;
  errors: FieldErrors<RegistrationFormData>;
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.4 } }),
};

function Field({ label, error, icon, children, idx }: {
  label: string; error?: string; icon: React.ReactNode;
  children: React.ReactNode; idx: number;
}) {
  return (
    <motion.div className="rr-field" custom={idx} initial="hidden" animate="visible" variants={fadeUp}>
      <label className="rr-label">
        <span className="rr-label-icon">{icon}</span>
        {label}
      </label>
      {children}
      {error && <span className="rr-error">{error}</span>}
    </motion.div>
  );
}

export default function RestaurantInfo({ register, errors }: Props) {
  return (
    <div className="rr-section">
      <div className="rr-section-header">
        <span className="rr-section-num">01</span>
        <div>
          <h3 className="rr-section-title">Restaurant Information</h3>
          <p className="rr-section-sub">Basic details about your restaurant</p>
        </div>
      </div>

      <div className="rr-grid-2">
        <Field label="Restaurant Name *" error={errors.restaurantName?.message} icon={<Store size={14} />} idx={0}>
          <input className={`rr-input ${errors.restaurantName ? "rr-input-err" : ""}`}
            placeholder="e.g. Spice Garden" {...register("restaurantName")} />
        </Field>

        <Field label="Owner / Manager Name *" error={errors.ownerName?.message} icon={<User size={14} />} idx={1}>
          <input className={`rr-input ${errors.ownerName ? "rr-input-err" : ""}`}
            placeholder="e.g. Arjun Sharma" {...register("ownerName")} />
        </Field>

        <Field label="Business Email *" error={errors.email?.message} icon={<Mail size={14} />} idx={2}>
          <input type="email" className={`rr-input ${errors.email ? "rr-input-err" : ""}`}
            placeholder="owner@restaurant.com" {...register("email")} />
        </Field>

        <Field label="Phone Number *" error={errors.phone?.message} icon={<Phone size={14} />} idx={3}>
          <input type="tel" className={`rr-input ${errors.phone ? "rr-input-err" : ""}`}
            placeholder="98765 43210" {...register("phone")} />
        </Field>
      </div>

      <Field label="Restaurant Address *" error={errors.address?.message} icon={<MapPin size={14} />} idx={4}>
        <textarea className={`rr-input rr-textarea ${errors.address ? "rr-input-err" : ""}`}
          rows={2} placeholder="Building, Street, Area" {...register("address")} />
      </Field>

      <div className="rr-grid-4" style={{ marginTop: "1.1rem" }}>
        <Field label="City *" error={errors.city?.message} icon={<Building2 size={14} />} idx={5}>
          <input className={`rr-input ${errors.city ? "rr-input-err" : ""}`}
            placeholder="Mumbai" {...register("city")} />
        </Field>

        <Field label="District *" error={errors.district?.message} icon={<Map size={14} />} idx={6}>
          <input className={`rr-input ${errors.district ? "rr-input-err" : ""}`}
            placeholder="District" {...register("district")} />
        </Field>

        <Field label="State *" error={errors.state?.message} icon={<Map size={14} />} idx={7}>
          <input className={`rr-input ${errors.state ? "rr-input-err" : ""}`}
            placeholder="Maharashtra" {...register("state")} />
        </Field>

        <Field label="Pincode *" error={errors.pincode?.message} icon={<MapPin size={14} />} idx={8}>
          <input className={`rr-input ${errors.pincode ? "rr-input-err" : ""}`}
            placeholder="400001" maxLength={6} {...register("pincode")} />
        </Field>
      </div>
    </div>
  );
}
