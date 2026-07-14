import React from "react";
import ProductFeaturePage from "@/components/ProductFeaturePage";
import { Receipt, WifiOff, FileText, SplitSquareHorizontal, Zap, Printer } from "lucide-react";

export const metadata = {
  title: "Restaurant Billing Engine | Ordrji",
  description: "Lightning fast restaurant POS and billing software that works offline."
};

export default function BillingEnginePage() {
  const features = [
    {
      icon: <Zap size={24} />,
      title: "Lightning Fast Checkout",
      description: "Settle bills in under 3 seconds. Handle complex orders and heavy weekend traffic without UI lag."
    },
    {
      icon: <WifiOff size={24} />,
      title: "100% Offline Capable",
      description: "Internet goes down? Your billing doesn't. Keep taking orders and syncing automatically when connection restores."
    },
    {
      icon: <SplitSquareHorizontal size={24} />,
      title: "Advanced Bill Splitting",
      description: "Split by items, split equally, or split by custom amounts. Make group checkouts completely painless."
    },
    {
      icon: <Printer size={24} />,
      title: "Smart KOT Routing",
      description: "Automatically route specific items to different kitchen stations and bar printers instantly."
    },
    {
      icon: <FileText size={24} />,
      title: "GST Compliant Invoicing",
      description: "Generate beautiful, fully compliant tax invoices with proper HSN codes and cess breakdowns."
    }
  ];

  const benefits = [
    "Reduce table turnaround time by up to 15%",
    "Eliminate manual calculation errors and pilferage",
    "Works seamlessly on desktop, tablet, or mobile",
    "Integrates directly with your accounting software",
    "Cashier shift tracking and discrepancy alerts"
  ];

  return (
    <ProductFeaturePage 
      title="Next-Gen Billing Engine"
      subtitle="The fastest, most reliable point-of-sale system built specifically for the demands of high-volume Indian restaurants."
      heroIcon={<Receipt size={40} />}
      heroColor="var(--accent-rose)"
      features={features}
      benefits={benefits}
    />
  );
}
