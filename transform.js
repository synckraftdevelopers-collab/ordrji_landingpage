const fs = require('fs');

let content = fs.readFileSync('showcase_af1797a.tsx', 'utf8');

// 1. Add image to PanelData
content = content.replace(
  /interface PanelData \{[\s\S]*?\}/,
  `interface PanelData {
  id: number;
  title: string;
  headline: string;
  description: string;
  image: string;
  icon: React.ComponentType<LucideProps>;
  gradient: string;
  accentColor: string;
  badge: string;
  ctaText: string;
}`
);

// 2. Replace PANELS
const newPanels = `const PANELS: PanelData[] = [
  {
    id: 0,
    title: "Orders",
    headline: "Orders Flow In Automatically",
    description: "Guests scan table QRs and order instantly. The AI operating system continuously tags item modifiers and routes tickets instantly to the prep station queue.",
    image: "https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&w=720&q=80",
    icon: QrCode,
    gradient: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)",
    accentColor: "var(--accent-orange)",
    badge: "AI Auto-Tagging",
    ctaText: "Launch QR ordering"
  },
  {
    id: 1,
    title: "Kitchen",
    headline: "Kitchen Works In Real Time",
    description: "Every order instantly reaches the KDS screen. The built-in AI assistant predicts preparation delays and automatically re-allocates kitchen tasks to prevent bottlenecks.",
    image: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?auto=format&fit=crop&w=720&q=80",
    icon: ChefHat,
    gradient: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
    accentColor: "var(--accent-green)",
    badge: "AI SLA Prediction",
    ctaText: "Configure KDS lanes"
  },
  {
    id: 2,
    title: "Billing",
    headline: "Faster Billing, Zero Chaos",
    description: "Generate bills, split checks, and collect payments. The AI POS engine handles multi-way checkouts and reconciles cashier shift reports in one click.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=720&q=80",
    icon: Receipt,
    gradient: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)",
    accentColor: "var(--accent-blue)",
    badge: "AI Smart Splits",
    ctaText: "Explore POS registers"
  },
  {
    id: 3,
    title: "CRM",
    headline: "Turn Guests Into Regulars",
    description: "Build deep customer profiles automatically. The CRM engine tracks individual diner preferences and triggers personalized email/SMS campaigns.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=720&q=80",
    icon: Users,
    gradient: "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)",
    accentColor: "var(--accent-purple)",
    badge: "AI Autopilot Marketing",
    ctaText: "View CRM funnels"
  },
  {
    id: 4,
    title: "Inventory",
    headline: "Inventory Intelligence & Predictions",
    description: "Stop wasting ingredients. OrderJi tracks raw items down to grams, predicts run-out times, and automatically triggers supplier purchases.",
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=720&q=80",
    icon: Package,
    gradient: "linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)",
    accentColor: "var(--accent-rose)",
    badge: "AI Stock Forecasting",
    ctaText: "Manage Inventory"
  },
  {
    id: 5,
    title: "Analytics",
    headline: "Know Your Business Instantly",
    description: "Forget tedious spreadsheets. Access actionable executive AI insights. Spot stock wastage trends and forecast your next weekend's sales curve.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=720&q=80",
    icon: TrendingUp,
    gradient: "linear-gradient(135deg, #fefce8 0%, #fef9c3 100%)",
    accentColor: "var(--accent-amber)",
    badge: "AI Predictive Analytics",
    ctaText: "Open analytics suite"
  }
];`;

content = content.replace(/const PANELS: PanelData\[\] = \[[\s\S]*?\];/m, newPanels);

// 3. Remove all the state variables and useEffects inside ModulesShowcase
const activePanelIdx = content.indexOf('const [activePanel, setActivePanel] = useState<number | null>(null);');
if (activePanelIdx > -1) {
  const returnIdx = content.indexOf('<section className="showcase-section" id="modules-showcase">');
  if (returnIdx > -1) {
    const preamble = content.slice(0, activePanelIdx + 'const [activePanel, setActivePanel] = useState<number | null>(null);'.length);
    const postamble = content.slice(returnIdx);
    content = preamble + '\n\n  return (\n    ' + postamble;
  }
}

// 4. Replace Desktop expanded-content
const newDesktopExpanded = `
                      <div className="expanded-info" style={{ flex: 1, maxWidth: "100%", padding: "0" }}>
                        <motion.h3 
                          className="expanded-headline"
                          style={{ marginBottom: "1.5rem", textAlign: "left", fontSize: "1.8rem" }}
                          variants={{
                            hidden: { opacity: 0, y: 25 },
                            visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
                          }}
                        >
                          {panel.headline}
                        </motion.h3>

                        <motion.img
                          src={panel.image}
                          alt={panel.title}
                          style={{ width: "100%", borderRadius: "16px", aspectRatio: "16/9", objectFit: "cover", marginBottom: "1.5rem" }}
                          variants={{
                            hidden: { opacity: 0, scale: 0.95 },
                            visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } }
                          }}
                        />

                        <motion.p 
                          className="expanded-desc"
                          style={{ textAlign: "left", margin: "0", maxWidth: "100%", fontSize: "1.1rem" }}
                          variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1 }
                          }}
                        >
                          {panel.description}
                        </motion.p>
                      </div>
`;

content = content.replace(
  /\{\/\* Left Info Panel \*\/\}[\s\S]*?\{\/\* Right Visual Workstation \(Light Translucent Glass\) \*\/\}[\s\S]*?<\/motion\.div>/,
  newDesktopExpanded
);

// 5. Replace Tablet expanded-content
const newTabletExpanded = `
                    <div className="expanded-info" style={{ flex: 1, maxWidth: "100%", padding: "0" }}>
                      <h3 className="expanded-headline" style={{ marginBottom: "1.5rem", textAlign: "left", fontSize: "1.6rem" }}>{panel.headline}</h3>
                      <img src={panel.image} alt={panel.title} style={{ width: "100%", borderRadius: "12px", aspectRatio: "16/9", objectFit: "cover", marginBottom: "1.5rem" }} />
                      <p className="expanded-desc" style={{ textAlign: "left", margin: "0", maxWidth: "100%", fontSize: "1rem" }}>{panel.description}</p>
                    </div>
`;
content = content.replace(
  /<div className="expanded-content">\s*<div className="expanded-info">[\s\S]*?<\/div>\s*<div className="expanded-visual-container">[\s\S]*?<\/div>\s*<\/div>/g,
  '<div className="expanded-content">' + newTabletExpanded + '</div>'
);

// 6. Remove renderActiveVisual function entirely
// We can find where it starts and where `<style>` starts, then remove everything between them.
const renderIdx = content.indexOf('function renderActiveVisual(');
if (renderIdx > -1) {
  const styleIdx = content.indexOf('<style', renderIdx);
  if (styleIdx > -1) {
    content = content.slice(0, renderIdx) + content.slice(styleIdx);
  }
}

fs.writeFileSync('src/components/ModulesShowcase.tsx', content, 'utf8');
console.log("Successfully transformed ModulesShowcase");
