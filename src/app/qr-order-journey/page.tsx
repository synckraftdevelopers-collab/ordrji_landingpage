import React from "react";
import ProductFeaturePage from "@/components/ProductFeaturePage";
import { QrCode, Smartphone, CreditCard, BellRing, Paintbrush, TrendingUp } from "lucide-react";

export const metadata = {
  title: "QR Code Ordering | Ordrji",
  description: "Digital menus and table-side QR ordering for modern restaurants."
};

export default function QrOrderJourneyPage() {
  const features = [
    {
      icon: <Smartphone size={24} />,
      title: "No App Download Required",
      description: "Guests scan the QR code and order instantly from their browser via a beautiful, app-like interface."
    },
    {
      icon: <CreditCard size={24} />,
      title: "Integrated Payments",
      description: "Let guests pay at the table using UPI, cards, or net banking directly from the digital menu."
    },
    {
      icon: <Paintbrush size={24} />,
      title: "Customizable Branding",
      description: "Match the digital menu to your restaurant's brand colors, typography, and logo."
    },
    {
      icon: <BellRing size={24} />,
      title: "Waiter Call Button",
      description: "Guests can request water, cutlery, or call for the waiter with a single tap on their phone."
    },
    {
      icon: <TrendingUp size={24} />,
      title: "Smart Upselling",
      description: "Automatically recommend sides, beverages, and desserts based on what the guest adds to their cart."
    }
  ];

  const benefits = [
    "Increase average order value by 12-18% via smart upselling",
    "Reduce waiter workload and table wait times",
    "Eliminate printing costs for physical menus",
    "Update items and prices in real-time, instantly",
    "Capture valuable customer data for marketing"
  ];

  return (
    <ProductFeaturePage 
      title="Table-side QR Ordering"
      subtitle="Transform the dining experience by giving your guests the power to view rich digital menus, order, and pay directly from their phones."
      heroIcon={<QrCode size={40} />}
      heroColor="var(--accent-orange)"
      features={features}
      benefits={benefits}
    />
  );
}
