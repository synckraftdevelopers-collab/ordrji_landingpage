import { z } from "zod";

const urlSchema = z
  .string()
  .optional()
  .refine(val => !val || /^https?:\/\/.+/.test(val), {
    message: "Must be a valid URL starting with https://",
  });

export const registrationSchema = z.object({
  /* Section 1 — Restaurant Info */
  restaurantName: z.string().min(2, "Restaurant name must be at least 2 characters"),
  ownerName:      z.string().min(2, "Owner name must be at least 2 characters"),
  email:          z.string().email("Enter a valid email address"),
  phone:          z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  address:        z.string().min(5, "Enter a complete address"),
  city:           z.string().min(2, "City is required"),
  district:       z.string().min(2, "District is required"),
  state:          z.string().min(2, "State is required"),
  pincode:        z.string().regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
  cuisineType:    z.string().min(1, "Select a cuisine type"),
  restaurantType: z.enum(["veg", "nonveg", "both"] as const, {
    message: "Select restaurant type",
  }),

  /* Section 3 — Online Ordering */
  swiggyUrl: urlSchema,
  zomatoUrl: urlSchema,

  /* Section 4 — Business Details */
  openingTime: z.string().min(1, "Opening time is required"),
  closingTime: z.string().min(1, "Closing time is required"),
  avgCostForTwo: z.string().min(1, "Average cost is required"),
  gstNumber:   z.string().optional(),
  fssaiNumber: z.string().optional(),
  website:     urlSchema,

  /* Section 5 — Terms */
  confirmAccuracy: z.literal(true, {
    message: "You must confirm the information is accurate",
  }),
  agreeTerms: z.literal(true, {
    message: "You must agree to the Terms & Privacy Policy",
  }),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;
