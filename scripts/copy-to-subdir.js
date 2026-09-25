const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'build');
const destDir = path.join(__dirname, '..', 'build', 'index.js');

// Create destination directory
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Copy all files from build to build/index.js
const files = fs.readdirSync(srcDir);
files.forEach(file => {
  if (file !== 'index.js') {
    const srcPath = path.join(srcDir, file);
    const destPath = path.join(destDir, file);
    const stat = fs.statSync(srcPath);
    
    if (stat.isDirectory()) {
      fs.cpSync(srcPath, destPath, { recursive: true });
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
});

console.log('Files copied to build/index.js/');