const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf-8');
css = css.replace(/padding:\s*7rem\s*3rem;/, 'padding: 5rem 2.5rem;');
fs.writeFileSync('src/index.css', css);

let app = fs.readFileSync('src/App.jsx', 'utf-8');
app = app.replace(/left:\s*'10px'/, "left: '20%'");
app = app.replace(/width:\s*'90%'/, "width: '80%'");
fs.writeFileSync('src/App.jsx', app);
console.log('Padding reduced, SVG shifted to 20% and width 80%');
