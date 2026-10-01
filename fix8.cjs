const fs = require('fs');

const fix = `
@media (max-width: 768px) {
  /* Fix loader subtitle being hidden by mobile browser bottom bar */
  .ln-loader-bottom {
    bottom: 12vh !important;
  }
  
  /* Center the loader video vertically and make it smaller */
  .ln-loader-logo-video {
    max-width: 250px !important;
    transform: translateY(-5vh) !important;
  }

  /* Make doubly sure nothing overflows the body */
  html, body {
    overflow-x: hidden !important;
  }
  
  /* Make sure the hero container isn't pushing bounds */
  .hero-scroll-outer {
    max-width: 100vw !important;
    overflow-x: hidden !important;
  }
}
`;

fs.appendFileSync('src/index.css', fix);
console.log('Mobile loader and body bounds fixes applied.');
