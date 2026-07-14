import React from "react";
import ProductFeaturePage from "@/components/ProductFeaturePage";
import { Monitor, Clock, ChefHat, CheckSquare, Bell, Flame } from "lucide-react";

export const metadata = {
  title: "Kitchen Display System (KDS) | Ordrji",
  description: "Digital KDS to streamline back-of-house restaurant operations."
};

export default function KitchenDisplayPage() {
  const features = [
    {
      icon: <Monitor size={24} />,
      title: "Paperless Kitchen",
      description: "Replace messy paper KOTs with clear, digital screens that never get lost or stained."
    },
    {
      icon: <Clock size={24} />,
      title: "Real-time Prep Tracking",
      description: "Track exact preparation times for every dish to identify bottlenecks in your kitchen workflow."
    },
    {
      icon: <Flame size={24} />,
      title: "Station Routing",
      description: "Send appetizers to the pantry, mains to the hot line, and drinks to the bar automatically."
    },
    {
      icon: <CheckSquare size={24} />,
      title: "Bump & Fulfill",
      description: "Chefs can bump items as they are prepped, automatically updating the front-of-house staff."
    },
    {
      icon: <Bell size={24} />,
      title: "Delayed Order Alerts",
      description: "Tickets turn yellow then red if they exceed target prep times, ensuring no table is kept waiting."
    }
  ];

  const benefits = [
    "Dramatically reduce missing orders and mistakes",
    "Improve communication between FOH and BOH staff",
    "Track average ticket times and chef performance",
    "Environmentally friendly paperless operations",
    "Clear visibility into current kitchen load"
  ];

  return (
    <ProductFeaturePage 
      title="Kitchen Display System"
      subtitle="Bring calm to the chaos. Synchronize your front-of-house and kitchen staff with real-time digital ticket management."
      heroIcon={<ChefHat size={40} />}
      heroColor="var(--accent-green)"
      features={features}
      benefits={benefits}
    />
  );
}
