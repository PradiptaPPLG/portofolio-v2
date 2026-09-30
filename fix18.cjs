const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf-8');

// Replace the previous mobile scatter layout with a SMALLER, more accurate one
css = css.replace(/\.showcase-item-0\s*\{[^}]+\}/g, '.showcase-item-0 { align-self: flex-start !important; margin-left: 10vw !important; width: 55vw !important; margin-top: 5vh !important; }');
css = css.replace(/\.showcase-item-1\s*\{[^}]+\}/g, '.showcase-item-1 { align-self: flex-end !important; margin-right: 5vw !important; width: 65vw !important; margin-top: 2vh !important; }');
css = css.replace(/\.showcase-item-2\s*\{[^}]+\}/g, '.showcase-item-2 { align-self: flex-start !important; margin-left: 20vw !important; width: 45vw !important; margin-top: 8vh !important; }');
css = css.replace(/\.showcase-item-3\s*\{[^}]+\}/g, '.showcase-item-3 { align-self: flex-end !important; margin-right: 15vw !important; width: 55vw !important; margin-top: 2vh !important; }');
css = css.replace(/\.showcase-item-4\s*\{[^}]+\}/g, '.showcase-item-4 { align-self: center !important; width: 80vw !important; margin-top: 10vh !important; }');
css = css.replace(/\.showcase-item-5\s*\{[^}]+\}/g, '.showcase-item-5 { align-self: flex-start !important; margin-left: 5vw !important; width: 60vw !important; margin-top: 4vh !important; }');
css = css.replace(/\.showcase-item-6\s*\{[^}]+\}/g, '.showcase-item-6 { align-self: flex-end !important; margin-right: 10vw !important; width: 50vw !important; margin-top: 6vh !important; }');
css = css.replace(/\.showcase-item-7\s*\{[^}]+\}/g, '.showcase-item-7 { align-self: flex-start !important; margin-left: 15vw !important; width: 65vw !important; margin-top: 8vh !important; }');
css = css.replace(/\.showcase-item-8\s*\{[^}]+\}/g, '.showcase-item-8 { align-self: center !important; width: 70vw !important; margin-top: 2vh !important; }');
css = css.replace(/\.showcase-item-9\s*\{[^}]+\}/g, '.showcase-item-9 { align-self: flex-end !important; margin-right: 5vw !important; width: 55vw !important; margin-top: 12vh !important; }');

// Add specific showcase-meta overrides for mobile to look more like the Lando Norris labels
const metaOverrides = `
  .showcase-item .showcase-meta {
    justify-content: flex-start !important;
    gap: 1rem !important;
    font-size: 0.6rem !important;
    margin-bottom: 0.5rem !important;
  }
`;

css = css.replace(/(\.showcase-item \.showcase-img-wrap\s*\{[^}]+\})/, '$1\n' + metaOverrides);

fs.writeFileSync('src/index.css', css);
console.log('Fixed mobile scatter layout sizes');
