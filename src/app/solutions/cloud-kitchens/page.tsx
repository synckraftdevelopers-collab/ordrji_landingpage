import React from "react";
import SolutionFeaturePage from "@/components/SolutionFeaturePage";
import { Laptop, ChefHat, Truck, Database, PackageOpen } from "lucide-react";

export const metadata = {
  title: "Cloud Kitchen POS System | Ordrji",
  description: "Centralized aggregator sync, unified KDS, and multi-brand routing for dark kitchens."
};

export default function CloudKitchensPage() {
  const features = [
    {
      icon: <Laptop size={24} />,
      title: "Unified Aggregator Dashboard",
      description: "Manage Swiggy, Zomato, and direct orders from one single screen. Say goodbye to the wall of tablets."
    },
    {
      icon: <ChefHat size={24} />,
      title: "Multi-Brand KDS Routing",
      description: "Running 5 virtual brands from one kitchen? Route orders automatically to the correct prep station with clear brand tags."
    },
    {
      icon: <Truck size={24} />,
      title: "Rider Dispatch Sync",
      description: "Track delivery partner arrival times and automatically bump tickets to packaging exactly when the rider is nearby."
    },
    {
      icon: <Database size={24} />,
      title: "Centralized Menu Management",
      description: "Update prices, mark items out of stock, or launch new combos across all delivery platforms simultaneously with one click."
    },
    {
      icon: <PackageOpen size={24} />,
      title: "Recipe & Variance Tracking",
      description: "Track theoretical food costs across all virtual brands to ensure your high volume isn't leaking profits through waste."
    }
  ];

  const benefits = [
    "Never miss an aggregator order during peak weekend rushes",
    "Reduce dispatch errors and wrong items sent to customers",
    "Scale to multiple virtual brands without adding management overhead",
    "Identify which virtual brands are truly profitable vs money pits",
    "Save hours daily by avoiding manual menu updates across apps"
  ];

  return (
    <SolutionFeaturePage 
      title="Dominance in the Dark Kitchen"
      subtitle="Volume is the name of the game. Ordrji consolidates your delivery chaos into a streamlined, high-throughput digital assembly line."
      heroImage="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&q=80&w=1200"
      heroColor="#8b5cf6" // violet
      features={features}
      benefits={benefits}
    />
  );
}
