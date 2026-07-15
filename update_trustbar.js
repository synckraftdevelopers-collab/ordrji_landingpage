const fs = require('fs');

let content = fs.readFileSync('src/components/TrustBar.tsx', 'utf8');

const brandsStart = content.indexOf('const BRANDS = [');
const statsStart = content.indexOf('/* ─── stats (Restroworks-style');

if (brandsStart > -1 && statsStart > -1) {
  const newBrands = `const BRANDS = [
  { name: "McDonald's", domain: "mcdonalds.com" },
  { name: "Starbucks", domain: "starbucks.com" },
  { name: "Subway", domain: "subway.com" },
  { name: "Domino's", domain: "dominos.com" },
  { name: "Pizza Hut", domain: "pizzahut.com" },
  { name: "Burger King", domain: "bk.com" },
  { name: "KFC", domain: "kfc.com" },
  { name: "Taco Bell", domain: "tacobell.com" },
  { name: "Dunkin'", domain: "dunkindonuts.com" },
  { name: "Chipotle", domain: "chipotle.com" },
  { name: "Shake Shack", domain: "shakeshack.com" },
  { name: "Baskin Robbins", domain: "baskinrobbins.com" },
  { name: "Pizza Express", domain: "pizzaexpress.com" },
  { name: "Costa Coffee", domain: "costacoffee.com" },
  { name: "Wendy's", domain: "wendys.com" },
  { name: "Nando's", domain: "nandos.com" }
];

`;
  content = content.substring(0, brandsStart) + newBrands + content.substring(statsStart);
}

const marqueeStart = content.indexOf('function MarqueeRow({ reverse = false }: { reverse?: boolean }) {');
const mainStart = content.indexOf('/* ─── main component ──────────────────────────────────────────────────────── */');

if (marqueeStart > -1 && mainStart > -1) {
  const newMarquee = `function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  // quadruple items so the loop is seamless at any screen width
  const items = [...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS];
  return (
    <div className="tb-marquee-viewport">
      <div className={\`tb-marquee-track \${reverse ? "tb-rev" : ""}\`}>
        {items.map((item, i) => {
          return (
            <div
              key={i}
              className="tb-icon-item"
              title={item.name}
              aria-label={item.name}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", minWidth: "80px" }}
            >
              <img src={\`https://www.google.com/s2/favicons?domain=\${item.domain}&sz=64\`} alt={item.name} width={44} height={44} loading="lazy" style={{ objectFit: "contain", borderRadius: "8px" }} />
              <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)", whiteSpace: "nowrap" }}>{item.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

`;
  content = content.substring(0, marqueeStart) + newMarquee + content.substring(mainStart);
}

fs.writeFileSync('src/components/TrustBar.tsx', content, 'utf8');
console.log('Update complete');
