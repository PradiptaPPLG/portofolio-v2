const fs = require('fs');

const fix = `
@media (max-width: 768px) {
  /* Make HIRE ME button smaller */
  .floating-cosmic-btn {
    padding: 0.5rem 1rem !important;
    font-size: 0.8rem !important;
  }
  
  /* Make Search button smaller to match */
  .floating-cmd-trigger {
    width: 38px !important;
    height: 38px !important;
  }

  /* Make Loader Logo much smaller and perfectly centered */
  .ln-loader-logo-video {
    max-width: 200px !important;
    transform: none !important;
    margin: 0 auto;
  }
}
`;

fs.appendFileSync('src/index.css', fix);
console.log('Final mobile sizing fixes applied.');
