const fs = require('fs');

const fix = `
@media (max-width: 768px) {
  /* Fix the REAL root cause of horizontal scrolling and clipping: Canvas window had 500px min-width! */
  .ide-section .container {
    flex-wrap: wrap !important;
  }
  .ide-window, .ide-content, .canvas-window {
    min-width: 0 !important;
    width: 100% !important;
    flex: 1 1 100% !important;
    box-sizing: border-box !important;
  }

  /* Make Biodata text smaller so it never cuts off */
  .manifesto-line, .biodata-manifesto-text, .biodata-manifesto-title, .biodata-manifesto-label {
    font-size: clamp(0.8rem, 4vw, 1.1rem) !important;
    white-space: normal !important;
    word-break: break-word !important;
    overflow-wrap: break-word !important;
  }

  /* Make Biodata grid single column with smaller gap */
  .biodata-manifesto-grid {
    grid-template-columns: 1fr !important;
    gap: 2rem !important;
  }
}
`;

fs.appendFileSync('src/index.css', fix);
console.log('Mobile layout constraints applied.');
