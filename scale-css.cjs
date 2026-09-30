const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf-8');

// 1. Change html font-size to 15.2px (95% of 16px)
css = css.replace(/font-size:\s*16px;/, 'font-size: 15.2px;');

// 2. Reduce all vw inside clamp() by 5%
css = css.replace(/clamp\(([^,]+),\s*([\d.]+)vw,\s*([^)]+)\)/g, (match, min, vwStr, max) => {
  const vwVal = parseFloat(vwStr);
  const newVw = (vwVal * 0.95).toFixed(2).replace(/\.?0+$/, '');
  return `clamp(${min}, ${newVw}vw, ${max})`;
});

// Also reduce any standalone vw values that might be outside of clamp (like width: 100vw doesn't matter, but things like gap: 4vw might). We'll stick to just clamp for safety, and maybe standard font-sizes.
fs.writeFileSync('src/index.css', css);
console.log('Updated index.css scale successfully!');
