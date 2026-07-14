const fs = require('fs');

let content = fs.readFileSync('src/components/Integrations.tsx', 'utf8');

// 1. Change the orbit rings to be dark and visible
content = content.replace(
  /stroke="#cbd5e1" strokeWidth="1\.5" strokeDasharray="5 5"/g,
  'stroke="rgba(0,0,0,0.25)" strokeWidth="1.5" strokeDasharray="6 6"'
);

// 2. Replace the HTML center hub
const oldHubRegex = /\{\/\* HTML center hub \*\/\}[\s\S]*?\{\/\* HTML nodes — on top \*\/\}/;
const newHub = `{/* HTML center hub */}
      <div style={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", zIndex: 10
      }}>
        <div style={{
          width: 110, height: 110, borderRadius: "50%", background: "#fff", 
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          boxShadow: "0 8px 24px rgba(233,85,5,0.15)", border: "2px solid #e95505"
        }}>
          <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "#e95505", letterSpacing: "1px" }}>ORDRJI</span>
        </div>
      </div>

      {/* HTML nodes — on top */}`;

content = content.replace(oldHubRegex, newHub);

fs.writeFileSync('src/components/Integrations.tsx', content, 'utf8');
console.log('Update successful!');
