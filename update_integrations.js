const fs = require('fs');

let content = fs.readFileSync('src/components/Integrations.tsx', 'utf8');

// Replace the right column content
const rightColStart = content.indexOf('{/* ── RIGHT: content ────────────────────────────────────────── */}');
const rightColEndPattern = /<\/div>\s*<\/div>\s*<\/div>\s*<style jsx global>/;
const match = content.match(rightColEndPattern);

if (rightColStart > -1 && match) {
  const newRightCol = `{/* ── RIGHT: content ────────────────────────────────────────── */}
          <div className={\`ig-right \${show ? "ig-right-in" : ""}\`}>
            <div className="ig-tabs-accordion">
              {CATS.map(c => {
                const isActive = tab === c.key;
                let activeBg = "transparent";
                let activeColor = "#333";
                
                if (c.key === "software") {
                  activeBg = "#f3f4f6";
                  activeColor = "#4b5563";
                } else if (c.key === "hardware") {
                  activeBg = "#e0f2fe";
                  activeColor = "#0284c7";
                } else if (c.key === "payment") {
                  activeBg = "#ffedd5";
                  activeColor = "#c2410c";
                }

                return (
                  <div
                    key={c.key}
                    className={\`ig-acc-panel \${isActive ? "active" : ""}\`}
                    onClick={() => setTab(c.key)}
                    style={{ background: isActive ? activeBg : "transparent" }}
                  >
                    <h3 className="ig-acc-title" style={{ color: isActive ? "#111" : "#666" }}>{c.label}</h3>
                    
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="ig-acc-content-wrapper"
                          style={{ overflow: "hidden" }}
                        >
                          <div className="ig-acc-content">
                            <p>{c.desc}</p>
                            <div className="ig-acc-arrow" style={{ background: activeColor }}>
                              <ArrowRight size={14} color="#fff" />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>`;
  
  content = content.substring(0, rightColStart) + newRightCol + content.substring(match.index + match[0].length);
}

// Replace Orbital Center
content = content.replace(
  /\{\/\* hub disc \*\/\}[\s\S]*?<text[\s\S]*?<\/text>/,
  `{/* center html hub will be added outside SVG */}`
);

// Add HTML center hub
content = content.replace(
  /\{\/\* HTML nodes — on top \*\/\}/,
  `{/* HTML center hub */}
      <div style={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", zIndex: 10
      }}>
        <div style={{
          width: 220, height: 220, borderRadius: "50%", background: "#f8ebe3", 
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
        }}>
          <span style={{ fontSize: "1.1rem", fontWeight: 600, color: "#333" }}>We&apos;re</span>
          <span style={{ 
            background: "#e95505", color: "#fff", padding: "0.4rem 1.2rem", borderRadius: "99px",
            fontSize: "1rem", fontWeight: 700, margin: "0.6rem 0", boxShadow: "0 4px 12px rgba(233,85,5,0.3)"
          }}>
            a great fit
          </span>
          <span style={{ fontSize: "0.95rem", fontWeight: 500, color: "#555" }}>and we add some more.</span>
        </div>
      </div>

      {/* HTML nodes — on top */}`
);

// Add CSS styles for the accordion just before `}</style>`
const cssStyles = `
        /* ── accordion ───────────────────────────────────────── */
        .ig-tabs-accordion {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          width: 100%;
          max-width: 500px;
        }

        .ig-acc-panel {
          border-radius: 16px;
          padding: 1.5rem;
          cursor: pointer;
          transition: background 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
          border: 1px solid transparent;
        }
        
        .ig-acc-panel:not(.active):hover {
          background: rgba(0,0,0,0.02) !important;
          transform: translateX(4px);
        }

        .ig-acc-panel.active {
          border-color: rgba(0,0,0,0.05);
          box-shadow: 0 10px 30px rgba(0,0,0,0.03);
          cursor: default;
        }

        .ig-acc-title {
          font-size: 1.3rem;
          font-weight: 700;
          margin: 0;
          transition: color 0.3s;
        }

        .ig-acc-content {
          margin-top: 1rem;
          color: var(--text-secondary);
          font-size: 1rem;
          line-height: 1.6;
          position: relative;
          padding-bottom: 2rem;
        }

        .ig-acc-arrow {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
      `;

content = content.replace(/\s*`\}\s*<\/style>/, cssStyles + '\n      `}</style>');

// Add framer-motion import
if (!content.includes('framer-motion')) {
  content = content.replace('import { ArrowRight', 'import { motion, AnimatePresence } from "framer-motion";\nimport { ArrowRight');
}

// Add eslint-disable
content = content.replace('useEffect(() => { setMounted(true); }, []);', '// eslint-disable-next-line react-hooks/exhaustive-deps\n  // eslint-disable-next-line react-hooks/set-state-in-effect\n  useEffect(() => { setMounted(true); }, []);');

fs.writeFileSync('src/components/Integrations.tsx', content, 'utf8');
console.log('Done!');
