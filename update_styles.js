const fs = require('fs');

// Task 1: Update Integrations.tsx center circle
let integrations = fs.readFileSync('src/components/Integrations.tsx', 'utf8');

integrations = integrations.replace(
  'width: 110, height: 110, borderRadius: "50%", background: "#fff",',
  'width: 110, height: 110, borderRadius: "50%", background: "#e30613",'
);
integrations = integrations.replace(
  'boxShadow: "0 8px 24px rgba(233,85,5,0.15)", border: "2px solid #e95505"',
  'boxShadow: "0 8px 24px rgba(227,6,19,0.3)"'
);
integrations = integrations.replace(
  '<span style={{ fontSize: "1.25rem", fontWeight: 800, color: "#e95505", letterSpacing: "1px" }}>ORDRJI</span>',
  '<span style={{ fontSize: "1.25rem", fontWeight: 800, color: "#fff", letterSpacing: "1px" }}>ORDRJI</span>'
);

fs.writeFileSync('src/components/Integrations.tsx', integrations, 'utf8');


// Task 2: Update Navbar.tsx logo size
let navbar = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

// Update Placeholder size
navbar = navbar.replace(
  /width: "64px",\s*height: "64px",/g,
  'width: "90px",\n                height: "90px",'
);

// Update CSS for .pf-logo-img in move/done phase
navbar = navbar.replace(
  /width: 64px; height: 64px;/g,
  'width: 90px; height: 90px;'
);

// We should also increase the 'center' phase logo size to make it look prominent when starting
navbar = navbar.replace(
  /width: 120px; height: 120px;/g,
  'width: 160px; height: 160px;'
);
navbar = navbar.replace(
  /width=\{120\}\s*height=\{120\}/g,
  'width={160}\n              height={160}'
);

fs.writeFileSync('src/components/Navbar.tsx', navbar, 'utf8');

console.log('Update successful!');
