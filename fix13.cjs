const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf-8');

// Remove the global CSS overrides added in fix10.cjs
const fix10CSS = `
/* Lando Norris effect: Keep contents fixed relative to viewport while parent shrinks */
.hero-front-layer .hero-portrait-frame,
.hero-front-layer .hero-name-behind,
.hero-front-layer .hero-front-pattern {
  position: absolute !important;
  width: 100vw !important;
  height: 100vh !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  max-width: none !important;
  aspect-ratio: auto !important;
  margin: 0 !important;
}

/* Ensure images cover the viewport */
.hero-portrait-frame .spotlight-base, 
.hero-portrait-frame .spotlight-hover-img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
}

/* Ensure biodata grid doesn't break */
@media (max-width: 768px) {
  .hero-front-layer {
    /* override small square size on mobile if needed, though Framer Motion sets this */
  }
}`;

css = css.replace(fix10CSS, '');

// Wait, the regex might fail due to whitespace differences. Let's just strip it out via block removal.
// Or even easier, replace it dynamically. Let's just remove the exact string.
fs.writeFileSync('src/index.css', css);

console.log('Reverted fix10.cjs CSS changes');
