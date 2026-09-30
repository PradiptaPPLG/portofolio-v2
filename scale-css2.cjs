const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf-8');

// 1. Remove zoom: 0.9 if it exists
css = css.replace(/\s*zoom:\s*0\.9;/g, '');

// 2. Change font-size: 16px to 14.4px
css = css.replace(/font-size:\s*16px;/, 'font-size: 14.4px;');

// 3. Reduce all vw inside clamp() by 10%
css = css.replace(/clamp\(([^,]+),\s*([\d.]+)vw,\s*([^)]+)\)/g, (match, min, vwStr, max) => {
  const vwVal = parseFloat(vwStr);
  const newVw = (vwVal * 0.90).toFixed(2).replace(/\.?0+$/, '');
  return `clamp(${min}, ${newVw}vw, ${max})`;
});

fs.writeFileSync('src/index.css', css);
console.log('Applied strict 10% scale down to rem and vw without using zoom!');
