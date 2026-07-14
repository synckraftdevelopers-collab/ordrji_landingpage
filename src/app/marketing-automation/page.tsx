import React from "react";
import ProductFeaturePage from "@/components/ProductFeaturePage";
import { Megaphone, Users, Gift, MessageSquare, Target, Sparkles } from "lucide-react";

export const metadata = {
  title: "Marketing Automation | Ordrji",
  description: "CRM, loyalty programs, and automated SMS campaigns for restaurants."
};

export default function MarketingAutomationPage() {
  const features = [
    {
      icon: <Users size={24} />,
      title: "Centralized CRM",
      description: "Build a rich database of your customers including their visit history, favorite items, and lifetime value."
    },
    {
      icon: <MessageSquare size={24} />,
      title: "Automated SMS/WhatsApp",
      description: "Send automated birthday wishes, anniversary offers, or 'we miss you' messages to inactive guests."
    },
    {
      icon: <Gift size={24} />,
      title: "Custom Loyalty Programs",
      description: "Create points-based or tier-based loyalty programs to incentivize repeat visits and reward your best patrons."
    },
    {
      icon: <Target size={24} />,
      title: "Targeted Campaigns",
      description: "Filter your audience to send promotions only to people who love specific dishes or visit on specific days."
    },
    {
      icon: <Sparkles size={24} />,
      title: "Feedback Engine",
      description: "Automatically send SMS feedback links after checkout. Catch negative reviews privately before they hit Google."
    }
  ];

  const benefits = [
    "Turn one-time walk-ins into regular loyal customers",
    "Increase customer lifetime value significantly",
    "Protect your online reputation with private feedback loops",
    "Fill empty tables on slow days with targeted flash offers",
    "Build a brand that guests feel personally connected to"
  ];

  return (
    <ProductFeaturePage 
      title="Marketing & Loyalty"
      subtitle="Don't just wait for customers to return. Actively build relationships, drive repeat visits, and grow your revenue on autopilot."
      heroIcon={<Megaphone size={40} />}
      heroColor="var(--accent-purple)"
      features={features}
      benefits={benefits}
    />
  );
}
