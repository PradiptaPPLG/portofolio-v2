const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf-8');

// Add desktop-only overflow-x: hidden to prevent horizontal scrollbars on Windows
const desktopFix = `
/* Desktop only horizontal scrollbar prevention */
@media (min-width: 769px) {
  html, body, #root {
    overflow-x: clip !important;
    max-width: 100vw !important;
  }
}
`;

css += desktopFix;

fs.writeFileSync('src/index.css', css);
console.log('Added desktop-only overflow-x fix');
