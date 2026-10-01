const fs = require('fs');

const extraMobileFixes = `
@media (max-width: 768px) {
  /* Bulletproof body containment */
  html, body, #root {
    width: 100% !important;
    max-width: 100vw !important;
    overflow-x: hidden !important;
    position: relative;
  }

  /* Ensure all sections never exceed screen width */
  section, .section, .manifesto-section, .contact-section, .showcase-section, .ide-section {
    width: 100% !important;
    max-width: 100vw !important;
    box-sizing: border-box !important;
    overflow-x: hidden !important;
  }

  /* Text wrappers that might push width */
  .manifesto-line-wrap {
    max-width: 100% !important;
    display: inline-flex !important;
    flex-wrap: wrap !important;
  }

  .manifesto-line, .biodata-manifesto-text, .section-title, .hero-title-bg, .showcase-main-title {
    max-width: 100% !important;
    white-space: normal !important;
    word-break: break-word !important;
    overflow-wrap: break-word !important;
    text-overflow: clip !important;
  }

  /* Biodata Grid specifically */
  .biodata-manifesto-grid {
    display: flex !important;
    flex-direction: column !important;
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
    gap: 1.5rem !important;
  }

  .biodata-manifesto-col {
    width: 100% !important;
    max-width: 100% !important;
    align-items: flex-start !important;
    text-align: left !important;
  }

  .biodata-item-wrap {
    width: 100% !important;
    max-width: 100% !important;
    align-items: flex-start !important;
    text-align: left !important;
  }
  
  .biodata-item-wrap.align-right {
    align-items: flex-start !important;
  }

  /* IDE Window Fix */
  .ide-window {
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
    margin: 0 !important;
  }
  
  .cmd-body {
    max-width: 100% !important;
    overflow-x: hidden !important;
    word-break: break-all !important;
  }

  /* Certificate / Showcase Fix */
  .showcase-track {
    width: 100% !important;
    max-width: 100% !important;
    padding: 0 10px !important;
    margin: 0 !important;
    box-sizing: border-box !important;
    transform: none !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
  }

  .showcase-item {
    width: 100% !important;
    max-width: 100% !important;
    margin: 0 0 3rem 0 !important;
    box-sizing: border-box !important;
  }

  .showcase-item-inner {
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
  }
  
  .showcase-img-wrap {
    width: 100% !important;
    max-width: 100% !important;
    height: auto !important;
  }

  .showcase-img-wrap img {
    width: 100% !important;
    height: auto !important;
    object-fit: contain !important;
  }
  
  /* Fix marquee overflowing */
  .marquee-section {
    width: 100% !important;
    left: 0 !important;
    right: 0 !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
}
`;

fs.appendFileSync('src/index.css', extraMobileFixes);
console.log('Extra mobile fixes appended.');
