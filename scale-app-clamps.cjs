const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf-8');

code = code.replace(/clamp\([^,]+,\s*0\.9vw,\s*[^)]+\)/g, "clamp(0.5rem, 0.81vw, 1.1rem)");
code = code.replace(/clamp\([^,]+,\s*6vw,\s*[^)]+\)/g, "clamp(2.5rem, 5.4vw, 5rem)");
code = code.replace(/clamp\([^,]+,\s*4vw,\s*[^)]+\)/g, "clamp(1.5rem, 3.6vw, 3rem)");

fs.writeFileSync('src/App.jsx', code);
console.log('App.jsx inline clamps scaled!');
