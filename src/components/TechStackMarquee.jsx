import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import './TechStackMarquee.css';

const TECH_ITEMS = [
  { name: 'PHP', url: 'https://cdn.simpleicons.org/php/white' },
  { name: 'JavaScript', url: 'https://cdn.simpleicons.org/javascript/white' },
  { name: 'TypeScript', url: 'https://cdn.simpleicons.org/typescript/white' },
  { name: 'Python', url: 'https://cdn.simpleicons.org/python/white' },
  { name: 'C', url: 'https://cdn.simpleicons.org/c/white' },
  { name: 'C++', url: 'https://cdn.simpleicons.org/cplusplus/white' },
  { name: 'Kotlin', url: 'https://cdn.simpleicons.org/kotlin/white' },
  { name: 'Dart', url: 'https://cdn.simpleicons.org/dart/white' },
  { name: 'SQL', url: 'https://cdn.simpleicons.org/mysql/white' },
  { name: 'HTML5', url: 'https://cdn.simpleicons.org/html5/white' },
  { name: 'CSS3', url: 'https://cdn.simpleicons.org/css/white' },
  { name: 'React.js', url: 'https://cdn.simpleicons.org/react/white' },
  { name: 'Next.js', url: 'https://cdn.simpleicons.org/nextdotjs/white' },
  { name: 'Tailwind CSS', url: 'https://cdn.simpleicons.org/tailwindcss/white' },
  { name: 'Bootstrap', url: 'https://cdn.simpleicons.org/bootstrap/white' },
  { name: 'Laravel', url: 'https://cdn.simpleicons.org/laravel/white' },
  { name: 'Node.js', url: 'https://cdn.simpleicons.org/nodedotjs/white' },
  { name: 'Git', url: 'https://cdn.simpleicons.org/git/white' },
  { name: 'GitHub', url: 'https://cdn.simpleicons.org/github/white' },
  { name: 'GitLab', url: 'https://cdn.simpleicons.org/gitlab/white' },
  { name: 'Figma', url: 'https://cdn.simpleicons.org/figma/white' },
];

export default function TechStackMarquee() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 22,
    restDelta: 0.001
  });

  const x = useTransform(smoothProgress, [0, 1], ["calc(0% + 100vw)", "calc(-100% + 0vw)"]);

  return (
    <section className="tech-marquee-section" ref={containerRef}>
      <div className="tech-marquee-sticky-wrap">
        <div className="tech-marquee-center-glow">
          <motion.h2 
            className="tech-flicker-text"
            initial={{ opacity: 0 }}
            whileInView={{ 
              opacity: [
                0, 0, 
                1, 1, 
                0, 0, 
                1, 1, 
                0, 0, 
                1, 1,
                0, 0,
                1
              ]
            }}
            transition={{
              duration: 1.5,
              times: [
                0, 0.3,      // Invisible initially
                0.31, 0.33,  // Blink 1 (very fast)
                0.34, 0.37,  // Off
                0.38, 0.40,  // Blink 2 (very fast)
                0.41, 0.44,  // Off
                0.45, 0.48,  // Blink 3 (very fast)
                0.49, 0.53,  // Off
                0.54, 1      // Solid On
              ],
              ease: "linear"
            }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Tech Stack & Skills
          </motion.h2>
        </div>
        
        <div className="tech-marquee-container mask-reveal">
          <motion.div 
            className="tech-marquee-row"
            style={{ x }}
          >
            {TECH_ITEMS.map((item, i) => (
              <div className="tech-marquee-card" key={`tech-${i}`}>
                <img src={item.url} alt={item.name} className="tech-marquee-img" />
                <span className="tech-marquee-name">{item.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
