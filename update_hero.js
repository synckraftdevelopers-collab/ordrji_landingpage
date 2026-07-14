const fs = require('fs');

let content = fs.readFileSync('src/components/Hero.tsx', 'utf8');

// 1. Add framer-motion import
if (!content.includes('framer-motion')) {
  content = content.replace(
    'import Image from "next/image";',
    'import Image from "next/image";\nimport { motion } from "framer-motion";\nimport { FileText, QrCode, TrendingUp } from "lucide-react";'
  );
}

// 2. Replace hero-text-block
const textBlockStart = content.indexOf('<div className="hero-text-block">');
const visualBlockStart = content.indexOf('{/* Floating hero representation */}');

if (textBlockStart !== -1 && visualBlockStart !== -1) {
  const newTextBlock = `
          <motion.div 
            className="hero-text-block"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, staggerChildren: 0.15 }}
          >
            <motion.h1 
              className="hero-title" 
              style={{ fontSize: "clamp(1.9rem, 4.2vw, 3.1rem)", lineHeight: "1.2", letterSpacing: "-1.5px" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Restaurant POS, Billing, KOT &amp; <br className="hide-mobile" />
              QR Ordering Software <br className="hide-mobile" />
              <span className="gradient-text">for Indian Restaurants</span>
            </motion.h1>

            <motion.p 
              className="hero-subtitle" 
              style={{ fontSize: "1.05rem", lineHeight: "1.6" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Ordrji helps restaurants, cafes, QSRs, cloud kitchens and bakeries manage billing, kitchen orders, QR ordering, inventory, customer data and reports from one simple system.
            </motion.p>

            <motion.div 
              className="hero-ctas"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <button onClick={onBookDemo} className="btn-primary btn-red" style={{ padding: "1rem 2.25rem", fontSize: "1.05rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                Book Free Demo <ArrowRight size={18} />
              </button>
              <a href="#features" className="btn-secondary" style={{ padding: "1rem 2.25rem", fontSize: "1.05rem", display: "inline-flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
                <Play size={16} fill="currentColor" /> Watch Product Tour
              </a>
            </motion.div>

            {/* Location Selector Widget */}
            <motion.div 
              className="hero-location-widget"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="location-widget-label">
              </span>
              <div className="location-search-bar">
                <LocationAutocomplete
                  value={selectedLocName}
                  onChange={async (val, details) => {
                    setSelectedLocName(val);
                    setLocationDetails(details || null);
                    if (details) {
                      try {
                        await fetch("/api/coverage-search", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            query: details.name,
                            type: details.type,
                            stateCode: details.stateCode,
                            result: "covered"
                          })
                        });
                      } catch (err) {
                        console.error("Error logging coverage search:", err);
                      }
                    }
                  }}
                  placeholder="Type your State, District or City to check coverage..."
                />
              </div>

              {locationDetails && (
                <motion.div 
                  className={\`location-info-card \${locationDetails.type}\`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start" }}>
                    <div className={\`info-card-icon-wrap \${locationDetails.type}\`}>
                      {locationDetails.type === "city" ? (
                        <MapPin size={16} />
                      ) : locationDetails.type === "district" ? (
                        <Compass size={16} />
                      ) : (
                        <Layers size={16} />
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 className="info-card-header">
                        Ordrji is fully active in {locationDetails.name}!
                      </h4>
                      <p className="info-card-text">
                        {locationDetails.type === "city" 
                          ? \`Complete local POS setup, physical KOT printer routing, and offline billing cache sync are fully supported in \${locationDetails.name} (\${locationDetails.stateCode}).\`
                          : locationDetails.type === "district"
                          ? \`Local field onboarding, training sessions, and 24/7 technical hardware coverage are active across all of \${locationDetails.name} District.\`
                          : \`Fully compliant with tax guidelines and local GST schemas for the State/UT of \${locationDetails.name}. Remote and local setup partners are active.\`
                        }
                      </p>
                      <button
                        onClick={() => {
                          if (typeof window !== "undefined") {
                            sessionStorage.setItem("prefilled_location", \`\${locationDetails.name}, \${locationDetails.stateCode}\`);
                          }
                          onBookDemo();
                        }}
                        className={\`location-action-btn \${
                          locationDetails.type === "city" 
                            ? "btn-red" 
                            : locationDetails.type === "district" 
                            ? "btn-blue" 
                            : "btn-purple"
                        }\`}
                      >
                        <span>Book {locationDetails.name} Demo</span>
                        <ArrowRight size={13} className="btn-arrow" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>

            <motion.div 
              className="hero-metrics-summary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="metric-dot">
                <span className="dot pulse-green" /> <span>3,500+ Restaurants Active</span>
              </div>
              <div className="metric-dot">
                <span className="dot pulse-purple" /> <span>99.99% Core Uptime</span>
              </div>
            </motion.div>
          </motion.div>

          `;
  
  content = content.substring(0, textBlockStart) + newTextBlock + content.substring(visualBlockStart);
}

// 3. Replace hero-visual-block
const visBlockStart = content.indexOf('{/* Floating hero representation */}');
const endOfVisBlock = content.indexOf('</div>\n      </div>\n\n      <style jsx global>');

if (visBlockStart !== -1 && endOfVisBlock !== -1) {
  const newVisBlock = `{/* Floating hero representation */}
          <motion.div 
            className="hero-visual-block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="chef-image-wrapper">
              <Image src="/hero.png?v=2" alt="Ordrji OS Hero" width={480} height={480} className="chef-hero-img" style={{ width: "100%", height: "auto" }} priority unoptimized />
              
              {/* Floating UI Elements */}
              <motion.div 
                className="glass-widget widget-tl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="widget-icon bg-orange"><FileText size={16} /></div>
                <div className="widget-text">
                  <span className="widget-title">New KOT</span>
                  <span className="widget-sub">Table 4 • 2 mins ago</span>
                </div>
              </motion.div>

              <motion.div 
                className="glass-widget widget-bl"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="widget-icon bg-green"><QrCode size={16} /></div>
                <div className="widget-text">
                  <span className="widget-title">QR Payment</span>
                  <span className="widget-sub">Received ₹1,250</span>
                </div>
              </motion.div>

              <motion.div 
                className="glass-widget widget-tr"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <div className="widget-icon bg-purple"><TrendingUp size={16} /></div>
                <div className="widget-text">
                  <span className="widget-title">Live Analytics</span>
                  <span className="widget-sub">+18% Revenue</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        `;
  content = content.substring(0, visBlockStart) + newVisBlock + content.substring(endOfVisBlock);
}

// 4. Add CSS for floating widgets
if (!content.includes('.glass-widget')) {
  const cssInjection = `
        .glass-widget {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 0.6rem 0.8rem;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          z-index: 10;
        }

        .widget-tl {
          top: 10%;
          left: -10%;
        }

        .widget-bl {
          bottom: 15%;
          left: -5%;
        }

        .widget-tr {
          top: 25%;
          right: -15%;
        }

        @media (max-width: 768px) {
          .widget-tl { left: 0; top: 0; }
          .widget-bl { left: 0; bottom: 0; }
          .widget-tr { right: 0; top: 15%; }
          .glass-widget {
            transform: scale(0.85);
          }
        }

        .widget-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          color: white;
        }

        .bg-orange { background-color: var(--accent-orange, #e95505); }
        .bg-green { background-color: var(--accent-green, #10b981); }
        .bg-purple { background-color: var(--accent-purple, #8b5cf6); }

        .widget-text {
          display: flex;
          flex-direction: column;
        }

        .widget-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .widget-sub {
          font-size: 0.7rem;
          color: var(--text-secondary);
        }
`;
  content = content.replace('</style>', cssInjection + '\n      </style>');
}

fs.writeFileSync('src/components/Hero.tsx', content, 'utf8');
console.log('Update Hero.tsx complete');
