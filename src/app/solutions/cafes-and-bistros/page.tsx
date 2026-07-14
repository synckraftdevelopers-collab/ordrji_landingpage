import React from "react";
import SolutionFeaturePage from "@/components/SolutionFeaturePage";
import { Coffee, QrCode, CreditCard, Sparkles, Smartphone } from "lucide-react";

export const metadata = {
  title: "POS for Cafes & Bistros | Ordrji",
  description: "Fast counter service, QR ordering, and loyalty points for your cafe."
};

export default function CafesBistrosPage() {
  const features = [
    {
      icon: <CreditCard size={24} />,
      title: "Lightning Fast Counter POS",
      description: "Keep the morning coffee line moving. Our intuitive UI lets your baristas punch in complex coffee modifications in seconds."
    },
    {
      icon: <QrCode size={24} />,
      title: "Order & Pay at Table",
      description: "Let guests scan a QR code to view the menu, order, and pay directly from their phone, freeing up your staff."
    },
    {
      icon: <Coffee size={24} />,
      title: "Item Modifiers & Variations",
      description: "Easily handle 'Oat milk, extra hot, half-sweet vanilla latte' with unlimited modifier groups and upcharges."
    },
    {
      icon: <Sparkles size={24} />,
      title: "Digital Loyalty & Rewards",
      description: "Ditch the paper punch cards. Automatically reward points to customers by their phone number to keep them coming back."
    },
    {
      icon: <Smartphone size={24} />,
      title: "Online Ordering Pages",
      description: "Launch your own branded web link for pickup orders, avoiding hefty third-party aggregator commissions."
    }
  ];

  const benefits = [
    "Serve more customers during the critical morning rush",
    "Increase average ticket size through smart digital upsells",
    "Build a loyal community of daily regulars",
    "Reduce front-of-house labor costs with QR ordering",
    "Track which pastries and roasts are actually driving profit"
  ];

  return (
    <SolutionFeaturePage 
      title="Speed & Charm for Cafes"
      subtitle="From the morning rush to the afternoon slump, Ordrji gives your cafe the speed to crush queues and the tools to build a loyal local following."
      heroImage="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1200"
      heroColor="var(--accent-orange)"
      features={features}
      benefits={benefits}
    />
  );
}
