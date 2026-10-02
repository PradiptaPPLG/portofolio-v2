const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf-8');

// Replace marquee-section 100vw hack
css = css.replace(/\.marquee-section\s*\{\s*position:\s*relative;\s*width:\s*100vw;\s*left:\s*50%;\s*right:\s*50%;\s*margin-left:\s*-50vw;\s*margin-right:\s*-50vw;/g, 
  '.marquee-section {\n  position: relative;\n  width: 100%;\n  left: 0;\n  right: 0;');

fs.writeFileSync('src/index.css', css);

let app = fs.readFileSync('src/App.jsx', 'utf-8');
// Replace inline 100vw on fixed background
app = app.replace(/width:\s*'100vw'/g, "width: '100%'");
fs.writeFileSync('src/App.jsx', app);

console.log('Fixed 100vw issues causing horizontal scroll');
