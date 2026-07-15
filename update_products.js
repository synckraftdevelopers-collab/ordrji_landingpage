const fs = require('fs');

const pages = {
  'src/app/billing-engine/page.tsx': `import React from "react";
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
`,

  'src/app/qr-order-journey/page.tsx': `import React from "react";
import ProductFeaturePage from "@/components/ProductFeaturePage";
import { QrCode, Smartphone, CreditCard, BellRing, Paintbrush, TrendingUp } from "lucide-react";

export const metadata = {
  title: "QR Code Ordering | Ordrji",
  description: "Digital menus and table-side QR ordering for modern restaurants."
};

export default function QrOrderJourneyPage() {
  const features = [
    {
      icon: <Smartphone size={24} />,
      title: "No App Download Required",
      description: "Guests scan the QR code and order instantly from their browser via a beautiful, app-like interface."
    },
    {
      icon: <CreditCard size={24} />,
      title: "Integrated Payments",
      description: "Let guests pay at the table using UPI, cards, or net banking directly from the digital menu."
    },
    {
      icon: <Paintbrush size={24} />,
      title: "Customizable Branding",
      description: "Match the digital menu to your restaurant's brand colors, typography, and logo."
    },
    {
      icon: <BellRing size={24} />,
      title: "Waiter Call Button",
      description: "Guests can request water, cutlery, or call for the waiter with a single tap on their phone."
    },
    {
      icon: <TrendingUp size={24} />,
      title: "Smart Upselling",
      description: "Automatically recommend sides, beverages, and desserts based on what the guest adds to their cart."
    }
  ];

  const benefits = [
    "Increase average order value by 12-18% via smart upselling",
    "Reduce waiter workload and table wait times",
    "Eliminate printing costs for physical menus",
    "Update items and prices in real-time, instantly",
    "Capture valuable customer data for marketing"
  ];

  return (
    <ProductFeaturePage 
      title="Table-side QR Ordering"
      subtitle="Transform the dining experience by giving your guests the power to view rich digital menus, order, and pay directly from their phones."
      heroIcon={<QrCode size={40} />}
      heroColor="var(--accent-orange)"
      features={features}
      benefits={benefits}
    />
  );
}
`,

  'src/app/kitchen-display/page.tsx': `import React from "react";
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
`,

  'src/app/inventory-control/page.tsx': `import React from "react";
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
`,

  'src/app/marketing-automation/page.tsx': `import React from "react";
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
`,

  'src/app/analytics-suite/page.tsx': `import React from "react";
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
`
};

for (const [filePath, content] of Object.entries(pages)) {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated: ' + filePath);
}
