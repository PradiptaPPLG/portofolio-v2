const fs = require('fs');

const fix = `
@media (max-width: 768px) {
  /* Fix horizontal scroll / empty side spaces without breaking sticky! */
  html, body, #root {
    width: 100%;
    max-width: 100%;
    overflow-x: clip !important;
  }

  /* Move HIRE ME button to the left so it doesn't overlap right-aligned text */
  .floating-header-group {
    right: auto !important;
    left: 1.5rem !important;
    top: 1.5rem !important;
  }

  /* Fix Marquee overflowing */
  .marquee-section {
    width: 100% !important;
    left: 0 !important;
    right: 0 !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  /* Fix showcase items animating out of screen due to Framer Motion x */
  .showcase-track {
    transform: none !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
  }
  
  .showcase-item {
    width: 100% !important;
    margin-bottom: 2rem !important;
  }

  /* Ensure long text breaks properly instead of pushing layout */
  .hero-title-bg, .section-title, .biodata-manifesto-text, .footer-big-brand {
    white-space: normal !important;
    word-break: break-word !important;
    overflow-wrap: break-word !important;
    max-width: 100% !important;
  }
}
`;

fs.appendFileSync('src/index.css', fix);
console.log('Mobile fixes applied.');
