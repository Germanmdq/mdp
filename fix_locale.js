const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('.toLocaleString()')) {
        content = content.replace(/\.toLocaleString\(\)/g, '.toLocaleString("es-AR")');
        fs.writeFileSync(fullPath, content);
        console.log('Fixed locale in', fullPath);
      }
    }
  }
}

replaceInDir('/Users/germangonzalez/Downloads/Market/src');
