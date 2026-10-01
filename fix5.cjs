const fs = require('fs');

const fix = `
@media (max-width: 768px) {
  /* Fix the root cause of horizontal scrolling and clipping: IDE section inline styles! */
  .ide-section .container {
    flex-wrap: wrap !important;
  }
  .ide-window, .ide-content {
    min-width: 0 !important;
    width: 100% !important;
    flex: 1 1 100% !important;
  }

  /* Revert the loader video scale so it doesn't clip on the edges */
  .ln-loader-logo-video {
    transform: none !important;
  }
}
`;

fs.appendFileSync('src/index.css', fix);
console.log('IDE section CSS fixes applied.');
