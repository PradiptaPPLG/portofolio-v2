const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf-8');

// Remove ALL overflow constraints on body/html/root to guarantee position: sticky works
css = css.replace(/overflow-x:\s*clip\s*!important;/g, '');
css = css.replace(/overflow-x:\s*clip;/g, '');
css = css.replace(/overflow-x:\s*hidden\s*!important;/g, '');
css = css.replace(/overflow-x:\s*hidden;/g, '');

fs.writeFileSync('src/index.css', css);

let app = fs.readFileSync('src/App.jsx', 'utf-8');
app = app.replace(/overflowX:\s*'hidden'/g, ''); // Remove inline overflowX
fs.writeFileSync('src/App.jsx', app);

console.log('Removed all overflow-x constraints from global body/html/root and App.jsx');
