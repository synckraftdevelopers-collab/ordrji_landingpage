import React from "react";
import ProductFeaturePage from "@/components/ProductFeaturePage";
import { LineChart, BarChart3, Activity, PieChart, ArrowUpRight, FileJson } from "lucide-react";

export const metadata = {
  title: "Restaurant Analytics Suite | Ordrji",
  description: "Real-time reports, sales data, and business intelligence."
};

export default function AnalyticsSuitePage() {
  const features = [
    {
      icon: <Activity size={24} />,
      title: "Live Command Center",
      description: "View real-time sales, live tables, and current discounts from anywhere in the world on your mobile phone."
    },
    {
      icon: <BarChart3 size={24} />,
      title: "Item-Level Insights",
      description: "Identify your star items (high profit, high sales) vs your dogs (low profit, low sales) to optimize your menu."
    },
    {
      icon: <LineChart size={24} />,
      title: "Trend Forecasting",
      description: "Compare current performance against historical data to accurately forecast busy periods and staff accordingly."
    },
    {
      icon: <FileJson size={24} />,
      title: "Automated End-of-Day",
      description: "Receive comprehensive shift reports, cash tally, and tax summaries directly via email every night."
    },
    {
      icon: <PieChart size={24} />,
      title: "Multi-Outlet Rollups",
      description: "If you run a chain, view aggregate data across all your locations or drill down into individual store performance."
    }
  ];

  const benefits = [
    "Make data-driven menu pricing and engineering decisions",
    "Eliminate time spent manually tallying Excel sheets",
    "Identify and prevent staff discounting fraud",
    "Optimize staff scheduling based on hourly sales trends",
    "Access your restaurant's pulse 24/7 without being on-site"
  ];

  return (
    <ProductFeaturePage 
      title="Analytics & Reporting"
      subtitle="Stop guessing. Get crystal clear, real-time insights into your sales, staff performance, and profitability from anywhere."
      heroIcon={<LineChart size={40} />}
      heroColor="#0284c7" // light blue
      features={features}
      benefits={benefits}
    />
  );
}
