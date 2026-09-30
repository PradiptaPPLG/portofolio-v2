const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf-8');

// Replace overflow-x: hidden on body and html with overflow-x: clip to fix position: sticky
css = css.replace(/overflow-x:\s*hidden;/g, 'overflow-x: clip;');
css = css.replace(/overflow-x:\s*hidden\s*!important;/g, 'overflow-x: clip !important;');

fs.writeFileSync('src/index.css', css);
console.log('Replaced all overflow-x: hidden with overflow-x: clip');
