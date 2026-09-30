const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf-8');

const newCSS = `
/* Signature Wrapper */
.hero-signature-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 55vw;
  max-width: 800px;
  height: 90vh;
  display: flex;
  justifyContent: center;
  align-items: center;
  pointer-events: none;
  z-index: 50;
}

@media (max-width: 768px) {
  /* Make signature much bigger on mobile */
  .hero-signature-wrapper {
    width: 90vw !important;
  }
  
  /* Move running text to the bottom below the portrait on mobile (Lando Norris style) */
  .hero-velocity-bg {
    top: auto !important;
    bottom: 5% !important;
    transform: none !important;
    z-index: 60 !important; /* Bring to front so it sits on top of the background nicely */
  }
  
  /* Optionally adjust font size of running text so it fits better at the bottom */
  .hero-velocity-text {
    font-size: clamp(3rem, 15vw, 5rem) !important;
  }
}
`;

css += newCSS;

fs.writeFileSync('src/index.css', css);
console.log('Added responsive styles for signature and velocity text');
