const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      callback(dirPath);
    }
  });
}

const targetExtensions = ['.tsx', '.ts', '.js', '.jsx', '.css'];

walkDir('./src', (filePath) => {
  if (targetExtensions.includes(path.extname(filePath))) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // We do exact replacements for various casings to be safe
    content = content.replace(/OrderJi/g, 'Ordrji');
    content = content.replace(/orderji/g, 'ordrji');
    content = content.replace(/ORDERJI/g, 'ORDRJI');
    content = content.replace(/Orderji/g, 'Ordrji');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${filePath}`);
    }
  }
});
console.log('Replacement complete!');
