const fs = require('fs');
const data = fs.readFileSync('eslint_report2.json', 'utf16le');
const cleanData = data.charCodeAt(0) === 0xFEFF ? data.slice(1) : data;
const parsed = JSON.parse(cleanData);
parsed.filter(f => f.errorCount > 0).forEach(f => {
  console.log(f.filePath);
  f.messages.filter(m => m.severity === 2).forEach(m => console.log(`  ${m.line}:${m.column} ${m.ruleId}`));
});
