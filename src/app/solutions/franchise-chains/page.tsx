import React from "react";
import SolutionFeaturePage from "@/components/SolutionFeaturePage";
import { Network, LineChart, FileJson, Link, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Enterprise POS for Franchise Chains | Ordrji",
  description: "Centralized HQ controls, multi-outlet reporting, and role-based permissions."
};

export default function FranchiseChainsPage() {
  const features = [
    {
      icon: <Network size={24} />,
      title: "Master Menu Management",
      description: "Push new menus, promotional combos, and price updates to 10 or 10,000 outlets simultaneously from the HQ dashboard."
    },
    {
      icon: <LineChart size={24} />,
      title: "Consolidated Analytics",
      description: "View aggregate revenue across the entire brand, or drill down to compare top-performing outlets vs underperforming ones."
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Role-Based Access Control",
      description: "Ensure that local outlet managers can only see their store's data, while area managers and HQ executives see the full picture."
    },
    {
      icon: <FileJson size={24} />,
      title: "Automated Royalty Reports",
      description: "Automatically calculate franchise royalty fees based on daily outlet sales and generate invoices instantly."
    },
    {
      icon: <Link size={24} />,
      title: "Open API & Integrations",
      description: "Seamlessly pipe your multi-outlet data into your existing enterprise ERPs like SAP, Oracle, or Microsoft Dynamics."
    }
  ];

  const benefits = [
    "Maintain strict brand consistency across all franchise locations",
    "Onboard new outlets in minutes instead of weeks",
    "Prevent local managers from making unauthorized menu or price changes",
    "Identify systemic brand-wide trends vs localized store issues",
    "Reduce the IT overhead required to run a massive F&B operation"
  ];

  return (
    <SolutionFeaturePage 
      title="Scale with Absolute Control"
      subtitle="Running a chain requires discipline, standardization, and visibility. Ordrji gives your HQ the master controls to scale your franchise globally."
      heroImage="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200"
      heroColor="var(--accent-blue)"
      features={features}
      benefits={benefits}
    />
  );
}
