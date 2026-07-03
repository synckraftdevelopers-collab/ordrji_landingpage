import React from "react";
import type { Metadata } from "next";
import RegistrationForm from "@/components/restaurant/RegistrationForm";

export const metadata: Metadata = {
  title: "Register Your Restaurant | Ordrji",
  description:
    "Join thousands of restaurants on Ordrji. Register your restaurant, connect Swiggy & Zomato, and get discovered by customers near you.",
};

export default function RegisterRestaurantPage() {
  return <RegistrationForm />;
}
