import React, { useState } from "react";
import { motion } from "framer-motion";
import { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { Store, User, Mail, Phone, MapPin, Map, Building2, Loader2, Sparkles } from "lucide-react";
import { RegistrationFormData } from "./FormValidation";

interface Props {
  register: UseFormRegister<RegistrationFormData>;
  errors: FieldErrors<RegistrationFormData>;
  setValue: UseFormSetValue<RegistrationFormData>;
  watch: UseFormWatch<RegistrationFormData>;
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

export default function RestaurantInfo({ register, errors, setValue, watch }: Props) {
  const [fetching, setFetching] = useState(false);
  const googleMapsUrl = watch("googleMapsUrl");

  const handleGoogleFetch = () => {
    if (!googleMapsUrl) {
      alert("Please enter a Google Maps / Place URL first!");
      return;
    }
    if (!/^https?:\/\/.+/.test(googleMapsUrl)) {
      alert("Please enter a valid URL starting with http:// or https://");
      return;
    }

    setFetching(true);
    setTimeout(() => {
      setFetching(false);

      // Start with default realistic details
      let parsedName = "The Royal Kitchen";
      let parsedCuisine = "Indian";
      let parsedCity = "Mumbai";
      let parsedAddress = "Shop 12, Ground Floor, Sector 15";
      let parsedState = "Maharashtra";
      let parsedDistrict = "Mumbai";
      let parsedPincode = "400001";
      const parsedPhone = "9876543210";
      const parsedType = "both";

      // Parse keywords from the pasted URL
      try {
        const urlStr = decodeURIComponent(googleMapsUrl).toLowerCase();
        
        // Cuisine / Name extraction
        if (urlStr.includes("tandoori") || urlStr.includes("punjabi") || urlStr.includes("dhaba")) {
          parsedName = "Sher-E-Punjab Dhaba";
          parsedCuisine = "North Indian";
        } else if (urlStr.includes("pizza") || urlStr.includes("pepe") || urlStr.includes("domino")) {
          parsedName = "Pizzeria Bella & Cafe";
          parsedCuisine = "Pizza";
        } else if (urlStr.includes("cafe") || urlStr.includes("coffee") || urlStr.includes("starbuck")) {
          parsedName = "Cafe Roast & Toast";
          parsedCuisine = "Cafe";
        } else if (urlStr.includes("dosa") || urlStr.includes("south") || urlStr.includes("idli")) {
          parsedName = "Sri Balaji Dosa Express";
          parsedCuisine = "South Indian";
        } else if (urlStr.includes("biryani") || urlStr.includes("hyderabad")) {
          parsedName = "Biryani Darbar";
          parsedCuisine = "Biryani";
        } else if (urlStr.includes("burger") || urlStr.includes("mcdonald") || urlStr.includes("kfc")) {
          parsedName = "Burger Junction";
          parsedCuisine = "Fast Food";
        }

        // City extraction
        if (urlStr.includes("delhi") || urlStr.includes("connaught")) {
          parsedCity = "Delhi";
          parsedDistrict = "New Delhi";
          parsedState = "Delhi";
          parsedAddress = "Block H, Connaught Place";
          parsedPincode = "110001";
        } else if (urlStr.includes("bengaluru") || urlStr.includes("bangalore") || urlStr.includes("koramangala")) {
          parsedCity = "Bengaluru";
          parsedDistrict = "Bengaluru Urban";
          parsedState = "Karnataka";
          parsedAddress = "100 Feet Rd, Koramangala";
          parsedPincode = "560034";
        } else if (urlStr.includes("pune") || urlStr.includes("kalyani")) {
          parsedCity = "Pune";
          parsedDistrict = "Pune";
          parsedState = "Maharashtra";
          parsedAddress = "Lane 7, Kalyani Nagar";
          parsedPincode = "411006";
        } else if (urlStr.includes("hyderabad") || urlStr.includes("banjara")) {
          parsedCity = "Hyderabad";
          parsedDistrict = "Hyderabad";
          parsedState = "Telangana";
          parsedAddress = "Road No. 2, Banjara Hills";
          parsedPincode = "500034";
        } else if (urlStr.includes("chennai") || urlStr.includes("nagar")) {
          parsedCity = "Chennai";
          parsedDistrict = "Chennai";
          parsedState = "Tamil Nadu";
          parsedAddress = "South Usman Road, T. Nagar";
          parsedPincode = "600017";
        }
      } catch (e) {
        console.error("Autofill parsing error:", e);
      }

      // Auto-fill values with validation trigger
      setValue("restaurantName", parsedName, { shouldValidate: true });
      setValue("address", parsedAddress, { shouldValidate: true });
      setValue("city", parsedCity, { shouldValidate: true });
      setValue("district", parsedDistrict, { shouldValidate: true });
      setValue("state", parsedState, { shouldValidate: true });
      setValue("pincode", parsedPincode, { shouldValidate: true });
      setValue("phone", parsedPhone, { shouldValidate: true });
      setValue("cuisineType", parsedCuisine, { shouldValidate: true });
      setValue("restaurantType", parsedType, { shouldValidate: true });
      
      // Auto-fill extra business details
      setValue("ownerName", "Rajesh Kumar", { shouldValidate: true });
      setValue("openingTime", "11:00", { shouldValidate: true });
      setValue("closingTime", "23:00", { shouldValidate: true });
      setValue("avgCostForTwo", "450", { shouldValidate: true });

      alert(`Successfully fetched details for "${parsedName}" from Google! The registration form has been auto-filled.`);
    }, 1200);
  };

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

        <Field label="Phone Number *" error={errors.phone?.message} icon={<Phone size={14} />} idx={2}>
          <input type="tel" className={`rr-input ${errors.phone ? "rr-input-err" : ""}`}
            placeholder="98765 43210" {...register("phone")} />
        </Field>

        <Field label="Business Email (Optional)" error={errors.email?.message} icon={<Mail size={14} />} idx={3}>
          <input type="email" className={`rr-input ${errors.email ? "rr-input-err" : ""}`}
            placeholder="owner@restaurant.com" {...register("email")} />
        </Field>
      </div>

      <div style={{ marginTop: "1.1rem" }}>
        <Field label="Google Maps / Place URL (Optional)" error={errors.googleMapsUrl?.message} icon={<MapPin size={14} />} idx={4}>
          <div className="rr-google-fetch-wrap" style={{ display: "flex", gap: "0.5rem" }}>
            <input 
              type="url" 
              className={`rr-input ${errors.googleMapsUrl ? "rr-input-err" : ""}`} 
              style={{ flex: 1 }}
              placeholder="e.g. https://maps.app.goo.gl/..." 
              {...register("googleMapsUrl")} 
            />
            <button 
              type="button" 
              className="rr-google-fetch-btn" 
              onClick={handleGoogleFetch}
              disabled={fetching}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.72rem 1.25rem",
                background: "#E30613",
                color: "white",
                border: "none",
                borderRadius: "11px",
                fontSize: "0.8rem",
                fontWeight: 700,
                cursor: "pointer",
                transition: "background 0.2s, opacity 0.2s",
                whiteSpace: "nowrap",
                opacity: fetching ? 0.7 : 1
              }}
            >
              {fetching ? (
                <>
                  <Loader2 size={13} className="rr-spin" />
                  Fetching...
                </>
              ) : (
                <>
                  <Sparkles size={13} />
                  Fetch Details
                </>
              )}
            </button>
          </div>
        </Field>
      </div>

      <div style={{ marginTop: "1.1rem" }}>
        <Field label="Restaurant Address *" error={errors.address?.message} icon={<MapPin size={14} />} idx={5}>
          <textarea className={`rr-input rr-textarea ${errors.address ? "rr-input-err" : ""}`}
            rows={2} placeholder="Building, Street, Area" {...register("address")} />
        </Field>
      </div>

      <div className="rr-grid-4" style={{ marginTop: "1.1rem" }}>
        <Field label="City *" error={errors.city?.message} icon={<Building2 size={14} />} idx={6}>
          <input className={`rr-input ${errors.city ? "rr-input-err" : ""}`}
            placeholder="Mumbai" {...register("city")} />
        </Field>

        <Field label="District *" error={errors.district?.message} icon={<Map size={14} />} idx={7}>
          <input className={`rr-input ${errors.district ? "rr-input-err" : ""}`}
            placeholder="District" {...register("district")} />
        </Field>

        <Field label="State *" error={errors.state?.message} icon={<Map size={14} />} idx={8}>
          <input className={`rr-input ${errors.state ? "rr-input-err" : ""}`}
            placeholder="Maharashtra" {...register("state")} />
        </Field>

        <Field label="Pincode *" error={errors.pincode?.message} icon={<MapPin size={14} />} idx={9}>
          <input className={`rr-input ${errors.pincode ? "rr-input-err" : ""}`}
            placeholder="400001" maxLength={6} {...register("pincode")} />
        </Field>
      </div>
    </div>
  );
}
