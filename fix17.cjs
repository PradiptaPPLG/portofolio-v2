const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf-8');

// Remove existing mobile overrides for showcase-item
css = css.replace(/\.showcase-item\s*\{\s*align-self:\s*center\s*!important;\s*margin:\s*0\s*!important;\s*width:\s*100%\s*!important;\s*\}/g, '');
css = css.replace(/\.showcase-img-wrap\s*\{\s*width:\s*100%\s*!important;\s*max-width:\s*100%\s*!important;\s*\}/g, '');
css = css.replace(/\.showcase-item\s*\{\s*width:\s*100%\s*!important;\s*margin-bottom:\s*2rem\s*!important;\s*\}/g, '');

const mobileScatterCSS = `
  /* Mobile Scatter Layout for Certificates */
  .showcase-item {
    margin-bottom: 3rem !important;
  }
  .showcase-item-0 { align-self: flex-start !important; margin-left: 5vw !important; width: 75vw !important; margin-top: 2vh !important; }
  .showcase-item-1 { align-self: flex-end !important; margin-right: 5vw !important; width: 85vw !important; margin-top: -3vh !important; }
  .showcase-item-2 { align-self: flex-start !important; margin-left: 10vw !important; width: 70vw !important; margin-top: 4vh !important; }
  .showcase-item-3 { align-self: flex-end !important; margin-right: 8vw !important; width: 80vw !important; margin-top: 2vh !important; }
  .showcase-item-4 { align-self: center !important; width: 90vw !important; margin-top: 5vh !important; }
  .showcase-item-5 { align-self: flex-start !important; margin-left: 5vw !important; width: 75vw !important; margin-top: 4vh !important; }
  .showcase-item-6 { align-self: flex-end !important; margin-right: 5vw !important; width: 85vw !important; margin-top: -2vh !important; }
  .showcase-item-7 { align-self: flex-start !important; margin-left: 12vw !important; width: 75vw !important; margin-top: 6vh !important; }
  .showcase-item-8 { align-self: center !important; width: 85vw !important; margin-top: 2vh !important; }
  .showcase-item-9 { align-self: flex-end !important; margin-right: 8vw !important; width: 80vw !important; margin-top: 5vh !important; }
  
  .showcase-item .showcase-img-wrap {
    width: 100% !important;
    max-width: none !important;
  }
`;

// Insert the new scatter layout inside the first @media (max-width: 768px) we find, or just append it wrapped in a media query
css += '\n@media (max-width: 768px) {\n' + mobileScatterCSS + '\n}\n';

fs.writeFileSync('src/index.css', css);
console.log('Added mobile scatter layout for certificates');
