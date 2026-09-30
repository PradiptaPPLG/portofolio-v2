const fs = require('fs');
// Update index.css
let css = fs.readFileSync('src/index.css', 'utf-8');
css = css.replace(/font-size:\s*14\.4px;/, 'font-size: 13.6px;'); // 85% of 16px
css = css.replace(/clamp\(([^,]+),\s*([\d.]+)vw,\s*([^)]+)\)/g, (match, min, vwStr, max) => {
  const vwVal = parseFloat(vwStr);
  const newVw = (vwVal * 0.944).toFixed(2).replace(/\.?0+$/, ''); // 0.85/0.90 = 0.944
  return `clamp(${min}, ${newVw}vw, ${max})`;
});
fs.writeFileSync('src/index.css', css);

// Update App.jsx inline clamps
let app = fs.readFileSync('src/App.jsx', 'utf-8');
app = app.replace(/clamp\([^,]+,\s*([\d.]+)vw,\s*[^)]+\)/g, (match, min, vwStr, max) => {
  const vwVal = parseFloat(match.split(',')[1].replace('vw', '').trim());
  const newVw = (vwVal * 0.944).toFixed(2).replace(/\.?0+$/, '');
  const parts = match.split(',');
  return `${parts[0]}, ${newVw}vw, ${parts[2]}`;
});
fs.writeFileSync('src/App.jsx', app);
console.log('Scaled down by another 5.5% to reach 85% total!');
