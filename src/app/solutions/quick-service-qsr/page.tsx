import React from "react";
import SolutionFeaturePage from "@/components/SolutionFeaturePage";
import { Zap, MonitorSmartphone, Receipt, MonitorUp, ListOrdered } from "lucide-react";

export const metadata = {
  title: "QSR POS & Management System | Ordrji",
  description: "High-speed billing, self-order kiosks, and token displays for Quick Service Restaurants."
};

export default function QSRPage() {
  const features = [
    {
      icon: <Zap size={24} />,
      title: "Sub-second Billing",
      description: "Process orders and payments in under 3 seconds. The interface is optimized for minimal clicks to bust long queues during rush hours."
    },
    {
      icon: <MonitorSmartphone size={24} />,
      title: "Self-Order Kiosks",
      description: "Let customers order and pay at digital touchscreens, automatically upselling combos and sides while freeing up counter staff."
    },
    {
      icon: <MonitorUp size={24} />,
      title: "Customer Facing Display",
      description: "Show a digital screen to the customer highlighting their order details, QR code for payment, and promotional videos."
    },
    {
      icon: <ListOrdered size={24} />,
      title: "Token Number Screens",
      description: "Automatically push ready orders to a digital TV screen so customers know exactly when to collect their food."
    },
    {
      icon: <Receipt size={24} />,
      title: "Combo & Meal Deal Engines",
      description: "Automatically suggest or trigger meal deals when a customer orders a burger and a drink, improving customer satisfaction and speed."
    }
  ];

  const benefits = [
    "Dramatically reduce customer wait times during peak hours",
    "Increase average order value by 15% through kiosk upselling",
    "Eliminate order-taking errors in noisy environments",
    "Optimize staff utilization by shifting ordering to kiosks",
    "Maintain strict portion and inventory control for fast food items"
  ];

  return (
    <SolutionFeaturePage 
      title="High Speed QSR Operations"
      subtitle="In fast food, seconds translate directly to revenue. Ordrji provides the ultra-fast billing and automated displays you need to serve more people in less time."
      heroImage="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=1200"
      heroColor="var(--accent-green)"
      features={features}
      benefits={benefits}
    />
  );
}
