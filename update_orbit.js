const fs = require('fs');

let content = fs.readFileSync('src/components/Integrations.tsx', 'utf8');

// 1. Replace OrbNode
const orbNodeStart = content.indexOf('function OrbNode({ p, rot }: { p: Partner; rot: number }) {');
const orbNodeEnd = content.indexOf('/* ── SVG rings + spokes + hub ──────────────────────────────────────────── */');

if (orbNodeStart > -1 && orbNodeEnd > -1) {
  const newOrbNode = `function OrbNode({ p, rot }: { p: Partner; rot: number }) {
  const [imgFailed, setImgFailed] = useState(false);
  const radius   = RADII[p.ring];
  const angleRad = ((p.startAngle + rot) * Math.PI) / 180;
  const nx       = CX + radius * Math.cos(angleRad);
  const ny       = CY + radius * Math.sin(angleRad);

  return (
    <div
      title={p.name}
      style={{
        position: "absolute",
        left: nx, top: ny,
        transform: "translate(-50%, -50%)",
        display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
        whiteSpace: "nowrap"
      }}
    >
      {!imgFailed ? (
        <img
          src={\`https://www.google.com/s2/favicons?domain=\${p.logo}&sz=32\`}
          alt={p.name} width={18} height={18}
          loading="lazy"
          style={{ objectFit: "contain", flexShrink: 0 }}
          onError={() => setImgFailed(true)}
        />
      ) : (
        <span style={{ fontSize: "10px", fontWeight: 800, color: p.color }}>{p.short}</span>
      )}
      <span style={{ 
        fontSize: "14px", fontWeight: 700, color: "#444", 
        fontFamily: "Inter, sans-serif",
        textShadow: "0 0 4px #fff, 0 0 8px #fff"
      }}>
        {p.name}
      </span>
    </div>
  );
}

`;
  
  content = content.substring(0, orbNodeStart) + newOrbNode + content.substring(orbNodeEnd);
}

// 2. Replace the rings and remove spokes
// First, replace the orbit rings
const ringsRegex = /\{\/\* orbit rings \*\/\}([\s\S]*?)\]\)\)\}/;
content = content.replace(ringsRegex, `{/* orbit rings */}
        {RADII.map((r, i) => (
          <circle key={i} cx={CX} cy={CY} r={r}
            fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="5 5" />
        ))}`);

// Then remove the spokes
const spokesRegex = /\{\/\* spokes \*\/\}[\s\S]*?\}\)\)\}/;
content = content.replace(spokesRegex, '');

fs.writeFileSync('src/components/Integrations.tsx', content, 'utf8');
console.log('OrbNode and rings updated successfully!');
