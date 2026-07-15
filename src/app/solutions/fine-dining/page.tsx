import React from "react";
import SolutionFeaturePage from "@/components/SolutionFeaturePage";
import { Sparkles, Users, Wine, Clock, ClipboardList } from "lucide-react";

export const metadata = {
  title: "Fine Dining POS & Management | Ordrji",
  description: "Elevate your guest experience with precision billing, table management, and VIP CRM."
};

export default function FineDiningPage() {
  const features = [
    {
      icon: <Users size={24} />,
      title: "Interactive Table Management",
      description: "Visualize your entire floor plan. Track table statuses (seated, dining, paying) to optimize seating and reduce wait times."
    },
    {
      icon: <Sparkles size={24} />,
      title: "VIP Guest CRM",
      description: "Instantly recognize returning guests. Track their favorite wine, dietary restrictions, and preferred seating arrangements."
    },
    {
      icon: <Wine size={24} />,
      title: "Course & Pacing Control",
      description: "Communicate seamlessly with the kitchen. Fire courses precisely when the guest is ready, directly from the tableside tablet."
    },
    {
      icon: <ClipboardList size={24} />,
      title: "Complex Tab Splitting",
      description: "Split bills by seat, by item, or evenly across the table without holding up the line. Deliver a flawless final touch."
    },
    {
      icon: <Clock size={24} />,
      title: "Reservation Sync",
      description: "Integrate with top reservation platforms to manage walk-ins and bookings from a single master screen."
    }
  ];

  const benefits = [
    "Deliver flawless, personalized service to every guest",
    "Turn tables faster without rushing the dining experience",
    "Empower sommeliers and captains with instant menu knowledge",
    "Reduce front-of-house to back-of-house friction",
    "Maintain complete control over your premium brand standard"
  ];

  return (
    <SolutionFeaturePage 
      title="Precision for Fine Dining"
      subtitle="When every detail matters, you need software that works as flawlessly as your service. Ordrji helps you elevate the guest experience from reservation to the final check."
      heroImage="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=1200"
      heroColor="var(--accent-red)"
      features={features}
      benefits={benefits}
    />
  );
}
