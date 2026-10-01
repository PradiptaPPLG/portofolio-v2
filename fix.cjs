const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf-8');
if (!html.includes('ResizeObserver loop')) {
  html = html.replace('</head>', `  <script>
    window.addEventListener('error', function(e) {
      if (e.message && (e.message.includes('ResizeObserver loop limit') || e.message.includes('ResizeObserver loop completed'))) {
        e.stopImmediatePropagation();
      }
    });
  </script>
</head>`);
  fs.writeFileSync('index.html', html);
}

let css = fs.readFileSync('src/index.css', 'utf-8');
const mobileFixes = `
@media (max-width: 768px) {
  .hero-title-bg {
    font-size: clamp(2rem, 8vw, 3.5rem) !important;
    white-space: normal !important;
    word-break: break-word !important;
    padding: 0 1rem !important;
  }
  
  .biodata-manifesto-section {
    padding: 10vh 20px !important;
  }
  .biodata-manifesto-col.align-right {
    align-items: flex-start !important;
    text-align: left !important;
  }
  .biodata-item-wrap.align-right {
    align-items: flex-start !important;
  }
  
  .showcase-track {
    box-sizing: border-box !important;
    overflow: hidden !important;
    padding: 0 20px !important;
    max-width: 100vw !important;
  }
  .showcase-item {
    box-sizing: border-box !important;
    overflow: hidden !important;
    max-width: 100% !important;
  }
  .showcase-item-inner {
    max-width: 100% !important;
  }
  .showcase-img-wrap {
    max-width: 100% !important;
    box-sizing: border-box !important;
  }
}
`;
fs.appendFileSync('src/index.css', mobileFixes);
console.log('Done!');
