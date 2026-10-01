const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf-8');

// We need to revert overflow-x: hidden on .hero-scroll-outer because it breaks position: sticky on iOS/Safari
css = css.replace(/\.hero-scroll-outer\s*\{[^}]*max-width:\s*100vw[^}]*\}/g, '.hero-scroll-outer { max-width: 100vw !important; /* overflow-x removed to fix sticky bug */ }');

fs.writeFileSync('src/index.css', css);
console.log('Fixed sticky bug by removing overflow-x on outer container');
