const fs = require('fs');

let app = fs.readFileSync('src/App.jsx', 'utf-8');

app = app.replace(
`          {/* Animated Catch Me On Signature Overlay */}
          <motion.div 
            style={{
              position: 'absolute',
              top: '35px',
              left: '30%',
              y: parallaxY,
              width: '130%',
              minWidth: '400px',
              zIndex: 50,
              pointerEvents: 'none',
              rotate: -5
            }}
          >`,
`          {/* Animated Catch Me On Signature Overlay */}
          <motion.div 
            className="catch-me-signature-overlay"
            style={{ y: parallaxY }}
          >`
);

fs.writeFileSync('src/App.jsx', app);
console.log('Updated signature in App.jsx');
