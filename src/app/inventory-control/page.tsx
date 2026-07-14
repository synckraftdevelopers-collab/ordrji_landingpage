import React from "react";
import ProductFeaturePage from "@/components/ProductFeaturePage";
import { Package, Scale, AlertTriangle, FileSpreadsheet, PieChart, Truck } from "lucide-react";

export const metadata = {
  title: "Inventory Control | Ordrji",
  description: "Manage recipes, track food costs, and prevent pilferage."
};

export default function InventoryControlPage() {
  const features = [
    {
      icon: <Scale size={24} />,
      title: "Recipe Management",
      description: "Map raw ingredients to menu items to automatically deduct precise quantities when a dish is sold."
    },
    {
      icon: <AlertTriangle size={24} />,
      title: "Low Stock Alerts",
      description: "Get notified via SMS or app notification when critical ingredients fall below par levels."
    },
    {
      icon: <FileSpreadsheet size={24} />,
      title: "Purchase Orders",
      description: "Generate and send purchase orders directly to your vendors from within the dashboard."
    },
    {
      icon: <PieChart size={24} />,
      title: "Food Cost Analytics",
      description: "Track theoretical vs actual food costs to identify exactly where you are losing money."
    },
    {
      icon: <Truck size={24} />,
      title: "Vendor Management",
      description: "Keep track of vendor pricing, delivery histories, and outstanding payables in one place."
    }
  ];

  const benefits = [
    "Reduce food waste and unexplained variance by up to 5%",
    "Stop stockouts before they affect the customer experience",
    "Automate the tedious manual stock-taking process",
    "Protect profit margins with accurate food cost tracking",
    "Maintain centralized control across multiple outlets"
  ];

  return (
    <ProductFeaturePage 
      title="Smart Inventory Control"
      subtitle="Stop leaking profits. Gain complete visibility into your stock, recipes, and vendor purchases to maintain perfect margins."
      heroIcon={<Package size={40} />}
      heroColor="var(--accent-blue)"
      features={features}
      benefits={benefits}
    />
  );
}
