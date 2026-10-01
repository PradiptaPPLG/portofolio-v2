const fs = require('fs');

const fix = `
@media (max-width: 768px) {
  /* Fix CV Buttons text cut off (Image 5) */
  .cv-buttons-wrap {
    flex-wrap: wrap !important;
  }
  
  /* Fix HIRE ME button overlapping (Image 2) by moving back to right and aligning text left */
  .floating-header-group {
    left: auto !important;
    right: 1.5rem !important;
  }
  
  /* Prevent Biodata text from overlapping HIRE ME on the right */
  .biodata-manifesto-col.align-right, .biodata-item-wrap.align-right {
    align-items: flex-start !important;
    text-align: left !important;
  }

  /* Make the Loader Video larger to fill empty space (Image 1) */
  .ln-loader-logo-video {
    transform: scale(1.4) !important;
  }
  
  /* Reduce excessive padding in Social Links section */
  .social-links-section {
    padding: 4rem 1.5rem !important;
  }
}
`;

fs.appendFileSync('src/index.css', fix);
console.log('Mobile layout refinements applied.');
