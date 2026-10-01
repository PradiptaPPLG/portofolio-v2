const fs = require('fs');

const fix = `
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
}
`;

fs.appendFileSync('src/index.css', fix);
console.log('Applied clip-path emulation styles');
