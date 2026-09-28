import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useMotionTemplate, useMotionValueEvent } from 'framer-motion';
import { ArrowUpRight, ArrowRight, GitBranch, Link2, Mail, Code2, Server, Database, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';
import StrokeText from './components/StrokeText';
import SplitText from './components/SplitText';
import TextType from './components/TextType';
import Shuffle from './components/Shuffle';
import Topography from './components/Topography';
import ScrollVelocity from './components/ScrollVelocity';
import Signature from './components/Signature';
import { SiReact, SiNextdotjs, SiNodedotjs, SiExpress, SiPostgresql, SiPrisma, SiDocker, SiKubernetes } from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import './index.css';

/* ============================================================
   BACKGROUND CANVAS STARFIELD
   ============================================================ */
function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const stars = Array.from({ length: 160 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.3 + 0.3,
      o: Math.random() * 0.7 + 0.1,
      s: (Math.random() * 0.4 + 0.1) * (Math.random() > 0.5 ? 1 : -1),
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      stars.forEach((s) => {
        s.o += s.s * 0.01;
        if (s.o > 0.8 || s.o < 0.1) s.s = -s.s;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(192, 132, 252, ${s.o})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} id="starfield" />;
}

/* ============================================================
   CUSTOM CURSOR
   ============================================================ */
function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', move);

    const over = () => setHovered(true);
    const out = () => setHovered(false);

    const attach = () => {
      document.querySelectorAll('a, button, .table-row-item, .gear-card, .float-stat-card, .hero-morph-canvas-wrap').forEach((el) => {
        el.addEventListener('mouseenter', over);
        el.addEventListener('mouseleave', out);
      });
    };
    attach();
    const interval = setInterval(attach, 2000);

    let raf;
    const animate = () => {
      const d = dotRef.current;
      const r = ringRef.current;
      if (d) {
        d.style.left = `${pos.current.x}px`;
        d.style.top = `${pos.current.y}px`;
      }
      if (r) {
        ring.current.x += (pos.current.x - ring.current.x) * 0.12;
        ring.current.y += (pos.current.y - ring.current.y) * 0.12;
        r.style.left = `${ring.current.x}px`;
        r.style.top = `${ring.current.y}px`;
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', move);
      clearInterval(interval);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className={`cursor-ring ${hovered ? 'hovered' : ''}`} />
    </>
  );
}

/* ============================================================
   SCROLL PROGRESS BAR
   ============================================================ */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 400, damping: 50 });
  return <motion.div className="scroll-progress" style={{ scaleX, width: '100%' }} />;
}

/* ============================================================
   CLEAN LANDO-STYLE INTRO (solid bg + monogram + name → slides UP)
   ============================================================ */
function Loader({ onDone }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // 3 seconds intro as requested
    const t1 = setTimeout(() => setExiting(true), 3000);
    const t2 = setTimeout(() => onDone(),          3800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="loader"
          className="ln-loader"
          exit={{ y: '-100%', transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* Radial glow */}
          <div className="ln-loader-glow" />

          {/* Center Video Logo */}
          <motion.div
            className="ln-loader-logo-video"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <video 
              src="/assets/intro-logo.mp4" 
              autoPlay 
              muted 
              loop 
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </motion.div>

          {/* Thin divider line grows outward */}
          <motion.div
            className="ln-loader-line"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Bottom name — like "LANDO NORRIS" */}
          <motion.div
            className="ln-loader-bottom"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            PRADIPTA ENDRA MAULANA
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* Navbar removed as requested. We will use a floating cosmic Hire Me button instead. */

/* ============================================================
   FULLSCREEN MENU OVERLAY
   ============================================================ */
const MENU_ITEMS = ['Home', 'About', 'Projects', 'Stack', 'Experience', 'Contact'];
const STACK_TAGS = ['React 19', 'Next.js 14', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'GraphQL'];

function MenuOverlay({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="menu-overlay"
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="menu-links-col">
            {MENU_ITEMS.map((item, i) => (
              <div key={item} className="menu-link-wrap">
                <motion.a
                  href={`#${item.toLowerCase()}`}
                  className="menu-link-item"
                  onClick={onClose}
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ delay: i * 0.07 + 0.1, duration: 0.6 }}
                >
                  <span className="menu-link-index">0{i + 1}</span>
                  {item}
                </motion.a>
              </div>
            ))}
          </div>

          <div className="menu-info-col">
            <div>
              <div className="menu-tech-label">Primary Stack</div>
              <div className="menu-tech-list">
                {STACK_TAGS.map((tag) => (
                  <div key={tag} className="menu-tech-tag">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
            <div className="menu-socials">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="menu-social-link">
                GitHub
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="menu-social-link">
                LinkedIn
              </a>
              <a href="mailto:pradipta@maulana.dev" className="menu-social-link">
                Email
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ============================================================
   SPOTLIGHT REVEAL (Super Smooth Hover Effect)
   Replaces the old canvas morph for a sleek modern mask
   ============================================================ */
function SpotlightReveal() {
  const [isHovered, setIsHovered] = useState(false);
  
  // Spring physics for smooth trailing cursor
  const springConfig = { damping: 25, stiffness: 150 };
  const mouseX = useSpring(50, springConfig);
  const mouseY = useSpring(50, springConfig);
  
  // Spring for the mask hole radius (0% when not hovered, 35% when hovered)
  const radius = useSpring(0, { damping: 20, stiffness: 120 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    radius.set(35); // Expand hole to 35%
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    radius.set(0);  // Shrink hole to 0%
    mouseX.set(50);
    mouseY.set(50);
  };

  // Calculate inner radius directly to avoid CSS calc() parsing bugs in browsers
  const innerRadius = useTransform(radius, v => Math.max(0, v - 15));

  // Foreground mask: creates a transparent hole where the cursor is.
  const maskStyleForeground = {
    maskImage: useMotionTemplate`radial-gradient(circle at ${mouseX}% ${mouseY}%, transparent 0%, transparent ${innerRadius}%, black ${radius}%)`,
    WebkitMaskImage: useMotionTemplate`radial-gradient(circle at ${mouseX}% ${mouseY}%, transparent 0%, transparent ${innerRadius}%, black ${radius}%)`
  };

  // Background mask: only visible inside the hole.
  const maskStyleBackground = {
    maskImage: useMotionTemplate`radial-gradient(circle at ${mouseX}% ${mouseY}%, black 0%, black ${innerRadius}%, transparent ${radius}%)`,
    WebkitMaskImage: useMotionTemplate`radial-gradient(circle at ${mouseX}% ${mouseY}%, black 0%, black ${innerRadius}%, transparent ${radius}%)`
  };

  return (
    <div 
      className="spotlight-reveal-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Background Image: transisi02.png (Astronaut) - ONLY visible inside the circle */}
      <motion.img 
        src="/assets/transisi02.png" 
        alt="Hover Portrait" 
        className="spotlight-hover-img" 
        style={{ 
          position: 'absolute', 
          inset: 0, 
          zIndex: 1,
          ...maskStyleBackground
        }} 
      />

      {/* Foreground Image: transisi01.png (Suit) - has a hole revealing the astronaut */}
      <motion.img 
        src="/assets/transisi01.png" 
        alt="Base Portrait" 
        className="spotlight-base" 
        style={{
          position: 'relative',
          zIndex: 2,
          ...maskStyleForeground
        }}
      />
    </div>
  );
}

/* ============================================================
   HERO — SCROLL-DRIVEN STAGE
   Initial: Big portrait, giant text behind.
   Scroll: Portrait shrinks, bottom info fades in.
   ============================================================ */
function Hero({ loaded }) {
  const containerRef = useRef(null);
  const [startText, setStartText] = useState(false);

  useEffect(() => {
    if (loaded) {
      // Tunggu sampai layar loader selesai slide up (sekitar 0.8s)
      const timer = setTimeout(() => setStartText(true), 700);
      return () => clearTimeout(timer);
    }
  }, [loaded]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Responsive font size for StrokeText
  const [vw, setVw] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  useEffect(() => {
    const handleResize = () => setVw(window.innerWidth);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const responsiveFontSize = Math.min(Math.max(vw * 0.11, 60), 160);

  // Portrait scale: shrinks to a smaller size continuously until the end of the section
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  
  // Portrait stays centered while scaling
  const portraitY = useTransform(scrollYProgress, [0, 1], ['0%', '0%']);

  // Border radius grows as portrait shrinks
  const portraitBorderRadius = useTransform(scrollYProgress, [0, 1], ['0px', '24px']);

  // Dark overlay fades in gradually until the end
  const portraitOverlayOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.85]);

  // Name text parallax: it moves down and fades out
  const nameY = useTransform(scrollYProgress, [0, 0.8], ['0%', '25%']);
  const nameOpacity = useTransform(scrollYProgress, v => Math.max(0, Math.min(1, 1 - (v - 0.4) / 0.5)));


  return (
    <div ref={containerRef} className="hero-scroll-outer" id="home">
      <div className="hero-sticky">
        {/* Ambient glows */}
        <div className="hero-glow-1" />
        <div className="hero-glow-2" />
        <div className="hero-grid-line" />

        {/* LAYER 0: Scroll Velocity Background Text (Revealed when white layer shrinks) */}
        <div className="hero-velocity-bg">
          <ScrollVelocity
            texts={['CREATIVE DEVELOPER', 'INNOVATIVE EXPERIENCES']} 
            velocity={100}
            className="hero-velocity-text"
            numCopies={4}
            damping={50}
            stiffness={400}
          />
        </div>

        {/* LAYER 2: Front Layer — white background that shrinks on scroll */}
        <motion.div 
          className="hero-front-layer"
          style={{ scale: portraitScale, y: portraitY, borderRadius: portraitBorderRadius }}
        >


          {/* LAYER 1: Giant name text (moved INSIDE the white layer so it scales and stays visible) */}
          <motion.div className="hero-name-behind" style={{ y: nameY, opacity: nameOpacity }}>
            {startText && (
              <>
                <div className="hero-name-word">
                  <StrokeText
                    text="PRADIPTA"
                    strokeColor="#c084fc"
                    fillColor="#f3f4f6"
                    strokeWidth={1.5}
                    drawDuration={1.8}
                    fillDelay={0.3}
                    stagger={0.1}
                    ease="power2.out"
                    trigger="mount"
                    fillMode="wipe"
                    fontSize={responsiveFontSize}
                    fontWeight={900}
                  />
                </div>
                <div className="hero-name-word">
                  <StrokeText
                    text="ENDRA"
                    strokeColor="#c084fc"
                    fillColor="#f3f4f6"
                    strokeWidth={1.5}
                    drawDuration={1.8}
                    fillDelay={0.3}
                    stagger={0.1}
                    ease="power2.out"
                    trigger="mount"
                    fillMode="wipe"
                    fontSize={responsiveFontSize}
                    fontWeight={900}
                  />
                </div>
                <div className="hero-name-word">
                  <StrokeText
                    text="MAULANA"
                    strokeColor="#a855f7"
                    fillColor="#c084fc"
                    strokeWidth={1.5}
                    drawDuration={1.8}
                    fillDelay={0.3}
                    stagger={0.1}
                    ease="power2.out"
                    trigger="mount"
                    fillMode="wipe"
                    fontSize={responsiveFontSize}
                    fontWeight={900}
                  />
                </div>
              </>
            )}
          </motion.div>

          {/* Light topography background for the front layer */}
          <Topography 
            className="hero-front-pattern"
            lowColor="#e2e2e2"
            midColor="#cccccc"
            highColor="#b3b3b3"
            brightness={1.0}
            bands={1.5}
            thickness={0.005}
            colorMode="uniform"
            lightMode={false}
          />

          <div className="hero-portrait-frame">
            <SpotlightReveal />
          </div>

          {/* Dark vignette overlay — increases as the whole layer shrinks */}
          <motion.div
            className="hero-portrait-overlay"
            style={{ opacity: portraitOverlayOpacity }}
          />

        </motion.div>

        {/* LAYER 2.5: Giant Signature Overlay (Outside the shrinking front layer so it doesn't scale down) */}
        <motion.div 
          style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          width: '70vw', 
          maxWidth: '1000px', 
          height: '90vh', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          pointerEvents: 'none', 
          zIndex: 50 
        }}>
          <Signature color="url(#cosmicGradient)" strokeWidth={6} progress={scrollYProgress} />
        </motion.div>

        {/* LAYER 3: Widgets & Info */}
        {/* Available for hire removed as requested */}


      </div>
    </div>
  );
}

/* ============================================================
   MANIFESTO SECTION — scroll-reveal stagger text
   Persis Lando Norris's "REDEFINING LIMITS, FIGHTING FOR WINS"
   but adapted: membangun sistem, merancang pengalaman...
   ============================================================ */
function ManifestoSection() {
  const lines = [
    { text: 'MEMBANGUN SISTEM,',              highlight: false },
    { text: 'MERANCANG',                       highlight: false },
    { text: 'PENGALAMAN DIGITAL',              highlight: true },
    { text: 'YANG LUAR BIASA,',               highlight: false },
    { text: 'ALUMNI RPL',                      highlight: true },
    { text: 'SMKN 1 CIAMIS.',                  highlight: false },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  // The box slides from left to right over the text, then disappears
  const boxVariants = {
    hidden: { left: 0, width: '0%' },
    visible: { 
      left: ['0%', '0%', '100%'],
      width: ['0%', '100%', '0%'],
      transition: { duration: 0.9, ease: [0.65, 0, 0.35, 1], times: [0, 0.5, 1] }
    }
  };

  // Text stays hidden until the box fully covers it, then pops in
  const textVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { delay: 0.45, duration: 0.01 } 
    }
  };

  return (
    <motion.section 
      className="manifesto-section"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="manifesto-text-wrap">
        {lines.map((line, i) => (
          <motion.div key={i} className="manifesto-line-wrap" variants={{}}>
            {/* The sliding reveal box */}
            <motion.div 
              className="manifesto-reveal-box"
              variants={boxVariants}
            />
            {/* The text itself */}
            <motion.div
              className={`manifesto-line ${line.highlight ? 'is-highlight-text' : ''}`}
              variants={textVariants}
            >
              {line.text}
            </motion.div>
          </motion.div>
        ))}
      </div>

      <SplitText
        text="REKAYASA PERANGKAT LUNAK  ·  SMKN 1 CIAMIS  ·  INDONESIA"
        className="manifesto-sub"
        delay={30}
        duration={0.8}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 20 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        textAlign="center"
      />
    </motion.section>
  );
}

/* ============================================================
   INFINITE MARQUEE SECTION (Replaced with ScrollVelocity)
   ============================================================ */
function Marquee() {
  return (
    <div className="marquee-section" style={{ padding: '1.2rem 0', overflow: 'hidden' }}>
      <ScrollVelocity
        texts={[
          'FULLSTACK WEB DEVELOPER • REACT & NEXT.JS 14 • NODE.JS & EXPRESS • POSTGRESQL & PRISMA • DOCKER & KUBERNETES • AWS CLOUD INFRASTRUCTURE • ',
          <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center', padding: '0 1.5rem', fontSize: '2.5rem' }}>
            <SiReact />
            <SiNextdotjs />
            <SiNodedotjs />
            <SiExpress />
            <SiPostgresql />
            <SiPrisma />
            <SiDocker />
            <SiKubernetes />
            <FaAws />
          </div>
        ]} 
        velocity={80}
        className="marquee-velocity-text"
        numCopies={4}
        damping={50}
        stiffness={400}
      />
    </div>
  );
}

/* ============================================================
   HORIZONTAL SCROLL SHOWCASE (LANDO NORRIS STYLE)
   ============================================================ */
function Showcase() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end']  // Start tracking when section first peeks at viewport bottom
  });

  // Spring: lighter/faster for smooth glide feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 22,
    restDelta: 0.001
  });

  // Background: transparent in dark phase (Topography shows through), solid tiramisu in light phase
  const bgColor = useTransform(
    scrollYProgress, 
    [0, 0.2, 0.7, 1], 
    ['rgba(7,4,26,0)', 'rgba(7,4,26,0)', 'rgba(245,234,225,1)', 'rgba(245,234,225,1)']
  );

  const textColor = useTransform(
    scrollYProgress, 
    [0, 0.2, 0.7, 1], 
    ['#ffffff', '#ffffff', '#2C221D', '#2C221D']
  );

  // Propagate the tiramisu theme to the rest of the body so subsequent sections match
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.5) {
      document.body.classList.add('tiramisu-theme');
    } else {
      document.body.classList.remove('tiramisu-theme');
    }
  });

  // Three-phase x:
  // 0 → ~9%: photos slide in from 75vw (3/4 position like reference), not full off-screen
  // ~9% → 100%: horizontal pan (section is now sticky)
  const x = useTransform(smoothProgress, [0, 0.09, 1], ['calc(0% + 75vw)', 'calc(0% + 0vw)', 'calc(-100% + 100vw)']);

  // Expanded to 10 items for a richer, denser layout
  const showcaseItems = [
    { title: "Fintech Dashboard", year: "2024", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop" },
    { title: "Mobile Wallet", year: "2023", img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop" },
    { title: "Brand Identity", year: "2023", img: "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=1200&auto=format&fit=crop" },
    { title: "Web3 Platform", year: "2024", img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200&auto=format&fit=crop" },
    { title: "AI Analytics Suite", year: "2025", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop" },
    { title: "Admin Portal", year: "2024", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop" },
    { title: "Trading App", year: "2025", img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop" },
    { title: "Health Tracker", year: "2026", img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop" },
    { title: "Crypto Exchange", year: "2025", img: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=1200&auto=format&fit=crop" },
    { title: "SaaS CRM", year: "2024", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop" },
  ];

  return (
    <motion.section 
      ref={containerRef} 
      className="showcase-section"
      style={{ color: textColor }}
    >
      <div className="showcase-sticky">
        <motion.div className="showcase-track" style={{ x }}>
          {showcaseItems.map((item, i) => (
            <div key={i} className={`showcase-item showcase-item-${i}`}>
              <div className="showcase-item-inner">
                <div className="showcase-meta">
                  <span>{item.title}</span>
                  <span>{item.year}</span>
                </div>
                <div className="showcase-img-wrap">
                  <img src={item.img} alt={item.title} />
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ============================================================
   PROJECTS SHOWCASE (RACE TABLE STYLE - LANDO NORRIS)
   ============================================================ */
const PROJECTS = [
  {
    num: '01',
    title: 'CosmicShop E-Commerce Platform',
    desc: 'Next.js 14 fullstack platform dengan Stripe, inventory realtime, dan admin dashboard.',
    tech: ['Next.js 14', 'TypeScript', 'PostgreSQL', 'Stripe', 'TailwindCSS'],
    year: '2026',
    link: 'https://github.com',
  },
  {
    num: '02',
    title: 'DevCollab Realtime Hub',
    desc: 'Platform kolaborasi developer dengan instant code sharing, chat WebSockets, dan kanban board.',
    tech: ['React 19', 'Node.js', 'Socket.io', 'MongoDB', 'Redis'],
    year: '2025',
    link: 'https://github.com',
  },
  {
    num: '03',
    title: 'CloudDash Visual Analytics',
    desc: 'Interactive business intelligence dashboard dengan D3.js data visualization dan microservices API.',
    tech: ['React', 'D3.js', 'Python FastAPI', 'Docker', 'AWS'],
    year: '2025',
    link: 'https://github.com',
  },
  {
    num: '04',
    title: 'TaskFlow Microservice Engine',
    desc: 'RESTful API gateway & queue processing engine dengan JWT auth & Swagger docs.',
    tech: ['Node.js', 'Express', 'Redis Queue', 'PostgreSQL', 'Docker'],
    year: '2024',
    link: 'https://github.com',
  },
];

function IdeSection() {
  const [showTerminal, setShowTerminal] = useState(false);
  const [termPhase, setTermPhase] = useState(0);

  // When terminal shows up, wait for slide animation before typing
  useEffect(() => {
    if (termPhase === 1) {
      const t = setTimeout(() => {
        setTermPhase(2);
      }, 700); // Wait 0.7s for terminal to slide up
      return () => clearTimeout(t);
    }
  }, [termPhase]);

  const handleCodeComplete = () => {
    setTermPhase((prev) => {
      if (prev === 0) {
        setShowTerminal(true);
        return 1; // Terminal slides up
      }
      return prev;
    });
  };

  const handleTermCommandComplete = () => {
    setTermPhase(3); // Finished typing, wait for enter
    setTimeout(() => {
      setTermPhase(4); // Show output
    }, 600); // 600ms delay for "Enter" key feeling
  };

  return (
    <section className="section ide-section" id="ide">
      {/* Made max-width much larger (1100px) so the IDE looks big and spacious */}
      <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div className="ide-window">
          {/* Header (Mac UI) */}
          <div className="ide-header">
            <div className="ide-dots">
              <span className="dot" style={{ background: '#ff5f56' }}></span>
              <span className="dot" style={{ background: '#ffbd2e' }}></span>
              <span className="dot" style={{ background: '#27c93f' }}></span>
            </div>
            <div className="ide-title">main.py — VS Code</div>
          </div>
          
          {/* Body */}
          <div className="ide-body">
            <div className="ide-code-area">
              <div className="ide-line-numbers">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
              </div>
              <div className="ide-code">
                <TextType 
                  text="print('Hello World!')" 
                  typingSpeed={40}
                  startOnVisible={true}
                  onSentenceComplete={handleCodeComplete}
                  className="code-typing"
                  loop={false}
                  showCursor={termPhase === 0} // Hide cursor after typing finishes
                  cursorCharacter="|"
                />
              </div>
            </div>

            {/* Terminal Drawer */}
            <AnimatePresence>
              {showTerminal && (
                <motion.div 
                  className="ide-terminal"
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="term-header">TERMINAL</div>
                  <div className="term-content">
                    {/* The Command Line */}
                    <div className="term-line">
                      <span className="term-path">~/Projects/portofolio-v2 $</span>
                      {termPhase >= 2 && (
                        <TextType 
                          text="python main.py" 
                          typingSpeed={35}
                          startOnVisible={false}
                          onSentenceComplete={handleTermCommandComplete}
                          className="term-command"
                          loop={false}
                          showCursor={termPhase === 2 || termPhase === 3}
                          cursorCharacter="_"
                          cursorClassName="term-cursor"
                        />
                      )}
                    </div>
                    
                    {/* The Output and Next Prompt */}
                    {termPhase >= 4 && (
                      <>
                        <div className="term-output">Hello World!</div>
                        <div className="term-line">
                          <span className="term-path">~/Projects/portofolio-v2 $</span> <span className="term-cursor">_</span>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialLinks() {
  const LeftCurvyArrow = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 5v6a6 6 0 0 1-6 6H5" />
      <path d="M9 13l-4 4 4 4" />
    </svg>
  );

  const RightCurvyArrow = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 5v6a6 6 0 0 0 6 6h7" />
      <path d="M15 13l4 4-4 4" />
    </svg>
  );

  return (
    <section className="section social-links-section" style={{ position: 'relative' }}>


      <div className="social-split-container">
        
        {/* LINKEDIN (Slides from Left, Rata Kiri) */}
        <motion.div 
          className="social-block left"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="social-title">
            <span style={{ fontSize: '0.45em', display: 'block', marginBottom: '-0.3em', opacity: 0.8 }}>MY</span>
            LINKEDIN
          </h2>
          <div className="social-desc">
            <SplitText 
              text="Semua pencapaian, sertifikat, dan informasi profesional tentang perjalanan karir saya."
              splitType="words, chars"
              delay={20}
              duration={0.6}
              from={{ opacity: 0, y: 15 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.3}
            />
          </div>
          <a href="https://www.linkedin.com/in/pradipta-endra-maulana-819525350/" target="_blank" rel="noopener noreferrer" className="social-btn">
            <LeftCurvyArrow />
          </a>
        </motion.div>

        {/* GITHUB (Slides from Right, Rata Kanan) */}
        <motion.div 
          className="social-block right"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="social-title">
            <span style={{ fontSize: '0.45em', display: 'block', marginBottom: '-0.3em', opacity: 0.8 }}>MY</span>
            GITHUB
          </h2>
          <div className="social-desc">
            <SplitText 
              text="Semua repository saya, mulai dari tugas, project pribadi, hingga eksperimen kode."
              splitType="words, chars"
              delay={20}
              duration={0.6}
              from={{ opacity: 0, y: 15 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.3}
            />
          </div>
          <a href="https://github.com/PradiptaPPLG" target="_blank" rel="noopener noreferrer" className="social-btn">
            <RightCurvyArrow />
          </a>
        </motion.div>

      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="section section-alt" id="projects">
      <div className="container">
        <div className="projects-header">
          <div>
            <div className="section-tag" data-reveal>Hasil Karya</div>
            <h2 className="section-title" data-reveal>
              Featured<br />
              <em>Projects</em>
            </h2>
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="btn-outline"
            data-reveal
          >
            All Repositories <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="race-table-container" data-reveal>
          <div className="table-row-head">
            <div>No</div>
            <div>Project & Specs</div>
            <div>Technologies</div>
            <div>Year</div>
            <div>Action</div>
          </div>

          {PROJECTS.map((p) => (
            <div key={p.num} className="table-row-item">
              <div className="proj-num">{p.num}</div>
              <div className="proj-title-wrap">
                <div className="proj-main-title">{p.title}</div>
                <div className="proj-sub-desc">{p.desc}</div>
              </div>
              <div className="proj-tech-pills">
                {p.tech.map((t) => (
                  <span key={t} className="tech-pill">
                    {t}
                  </span>
                ))}
              </div>
              <div className="proj-year">{p.year}</div>
              <div>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="proj-action-btn"
                  aria-label="View Project"
                >
                  <ArrowUpRight size={18} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TECH STACK & TOOLING (LANDO MERCH GRID MASONRY)
   ============================================================ */
const GEAR_STACK = [
  {
    icon: <Code2 size={26} />,
    tag: 'FRONTEND ARCHITECTURE',
    title: 'Modern UI & Web Apps',
    desc: 'Merancang antarmuka reaktif dan cepat menggunakan React 19, Next.js App Router, TypeScript, dan TailwindCSS.',
    tags: ['React 19', 'Next.js 14', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
    wide: true,
  },
  {
    icon: <Server size={26} />,
    tag: 'BACKEND SERVICES',
    title: 'Scalable APIs & Services',
    desc: 'Membangun backend microservices & RESTful API dengan Node.js, Express, dan Python FastAPI.',
    tags: ['Node.js', 'Express', 'Python FastAPI', 'REST', 'GraphQL'],
    wide: false,
  },
  {
    icon: <Database size={26} />,
    tag: 'DATABASE & CACHE',
    title: 'Data Management',
    desc: 'Mengoptimalkan query database relasional maupun NoSQL dengan caching layer berkecepatan tinggi.',
    tags: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma ORM'],
    wide: false,
  },
  {
    icon: <Cpu size={26} />,
    tag: 'DEVOPS & CLOUD',
    title: 'Deployment & Infrastructure',
    desc: 'Otomatisasi deployment dengan Docker containerization dan cloud service management AWS & Vercel.',
    tags: ['Docker', 'Kubernetes', 'AWS', 'Vercel', 'CI/CD Pipelines'],
    wide: true,
  },
];

function TechStack() {
  return (
    <section className="section" id="stack">
      <div className="container">
        <div className="section-tag" data-reveal>Keahlian Teknikal</div>
        <h2 className="section-title" data-reveal>
          Tech<br />
          <em>Stack & Gear</em>
        </h2>

        <div className="masonry-grid" data-reveal>
          {GEAR_STACK.map((item) => (
            <div key={item.title} className={`gear-card ${item.wide ? 'wide' : ''}`}>
              <div>
                <div className="gear-card-top">
                  <div className="gear-icon-box">{item.icon}</div>
                  <span className="gear-tag">{item.tag}</span>
                </div>
                <h3 className="gear-title">{item.title}</h3>
                <p className="gear-desc">{item.desc}</p>
              </div>

              <div className="gear-tags-wrap">
                {item.tags.map((t) => (
                  <span key={t} className="tech-pill">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   EXPERIENCE TIMELINE (CAREER MILESTONES)
   ============================================================ */
const EXPERIENCE_ITEMS = [
  {
    date: '2024 — PRESENT',
    role: 'Senior Fullstack Engineer',
    company: 'TechStartup Indonesia',
    desc: 'Memimpin arsitektur platform SaaS berbasis Next.js & Microservices. Mengelola tim 5 developer, mengoptimalkan query database, dan meningkatkan kecepatan muat halaman sebesar 45%.',
    tags: ['Next.js 14', 'TypeScript', 'AWS', 'PostgreSQL'],
  },
  {
    date: '2022 — 2024',
    role: 'Fullstack Web Developer',
    company: 'Digital Creative Agency',
    desc: 'Mengembangkan 15+ aplikasi web custom untuk berbagai instansi & perusahaan global dengan stack React, Node.js, dan MongoDB.',
    tags: ['React', 'Node.js', 'MongoDB', 'TailwindCSS'],
  },
  {
    date: '2021 — 2022',
    role: 'Frontend Engineer',
    company: 'Software House',
    desc: 'Fokus pada UI/UX development, pembuatan reusable component library internal, dan integrasi REST API backend.',
    tags: ['React', 'JavaScript ES6+', 'CSS Modules'],
  },
];

function Experience() {
  return (
    <section className="section section-alt" id="experience">
      <div className="container">
        <div className="section-tag" data-reveal>Karir & Pengalaman</div>
        <h2 className="section-title" data-reveal>
          Career<br />
          <em>Milestones</em>
        </h2>

        <div className="timeline" data-reveal>
          {EXPERIENCE_ITEMS.map((item) => (
            <div key={item.role} className="timeline-item">
              <div className="timeline-dot" />
              <div className="exp-date">{item.date}</div>
              <h3 className="exp-role">{item.role}</h3>
              <div className="exp-company">{item.company}</div>
              <p className="exp-body">{item.desc}</p>
              <div className="gear-tags-wrap">
                {item.tags.map((t) => (
                  <span key={t} className="tech-pill">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CONTACT HERO & FOOTER (LANDO NORRIS FOOTER STYLE)
   ============================================================ */
function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-bg-glow" />
      <div className="contact-inner" data-reveal>
        <div className="section-tag" style={{ justifyContent: 'center' }}>
          Mulai Project
        </div>
        <h2 className="contact-title">
          LET'S WORK<br />
          <em>TOGETHER</em>
        </h2>
        <p className="contact-sub">
          Punya ide project hebat atau ingin memperkuat tim engineering Anda? 
          Saya siap berdiskusi dan merealisasikannya.
        </p>
        <a href="mailto:pradipta@maulana.dev" className="contact-email-btn">
          pradipta@maulana.dev
        </a>
        <div className="social-btns-row">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="btn-outline">
            <GitBranch size={16} /> GitHub
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="btn-outline">
            <Link2 size={16} /> LinkedIn
          </a>
          <a href="mailto:pradipta@maulana.dev" className="btn-outline">
            <Mail size={16} /> Send Mail
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-big-brand">PRADIPTA</div>
        <div className="footer-bottom">
          <div>© 2026 PRADIPTA ENDRA MAULANA. ALL RIGHTS RESERVED.</div>
          <div>BUILT WITH REACT 19 & FRAMER MOTION</div>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   ROOT APP COMPONENT
   ============================================================ */
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Force scroll to top on page load/refresh
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // GUARANTEED SCROLL REVEAL EFFECT (RUNS AFTER LOADED === TRUE)
  useEffect(() => {
    if (!loaded) return;

    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.05, rootMargin: '0px 0px 80px 0px' }
      );

      const elements = document.querySelectorAll('[data-reveal]');
      elements.forEach((el) => observer.observe(el));

      // Force reveal fallback after 1.2s to prevent any black gap
      setTimeout(() => {
        elements.forEach((el) => el.classList.add('revealed'));
      }, 1200);
    }, 100);

    return () => clearTimeout(timer);
  }, [loaded]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  const [topoLightMode, setTopoLightMode] = useState(false);

  // Watch for tiramisu-theme class → toggle Topography light/dark + html base color
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isLight = document.body.classList.contains('tiramisu-theme');
      setTopoLightMode(isLight);
      document.documentElement.style.transition = 'background 1.2s ease';
      document.documentElement.style.background = isLight ? '#F5EAE1' : '#07041a';
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Loader onDone={() => setLoaded(true)} />

      {/* Render main app immediately behind loader to prevent black flash on reveal */}
      <div style={{ opacity: loaded ? 1 : 1 }}>
        <>
          {/* Global Topography background - two layers crossfade smoothly */}
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -5, pointerEvents: 'none' }}>
            {/* Dark layer (purple) */}
            <div style={{
              position: 'absolute', inset: 0,
              opacity: topoLightMode ? 0 : 1,
              transition: 'opacity 1.5s ease'
            }}>
              <Topography
                lowColor="#1e1b4b"
                midColor="#4c1d95"
                highColor="#7c3aed"
                lightMode={false}
                speed={0.25}
                morphAmount={3.0}
                morphSpeed={0.03}
                bands={4.0}
                thickness={0.015}
                scale={2.0}
                pixelSize={1.0}
                glow={0}
                colorMode="uniform"
                contrast={1.5}
                brightness={1.0}
                fillBands={false}
                opacity={0.8}
                grain={true}
                grainIntensity={0.01}
                mouseInteraction={false}
              />
            </div>
            {/* Light layer (cream/brown) */}
            <div style={{
              position: 'absolute', inset: 0,
              opacity: topoLightMode ? 1 : 0,
              transition: 'opacity 1.5s ease'
            }}>
              <Topography
                lowColor="#c8b8a2"
                midColor="#a08060"
                highColor="#7a5c3a"
                lightMode={true}
                speed={0.25}
                morphAmount={3.0}
                morphSpeed={0.03}
                bands={4.0}
                thickness={0.015}
                scale={2.0}
                pixelSize={1.0}
                glow={0}
                colorMode="uniform"
                contrast={1.5}
                brightness={1.0}
                fillBands={false}
                opacity={0.8}
                grain={true}
                grainIntensity={0.01}
                mouseInteraction={false}
              />
            </div>
          </div>
          <Starfield />
          <Cursor />
          <ScrollProgress />
          
          <a href="#contact" className="floating-cosmic-btn">
            <Shuffle 
              text="HIRE ME" 
              loop={true} 
              loopDelay={3} 
              tag="span" 
              shuffleDirection="right"
              animationMode="evenodd"
              duration={0.3}
              stagger={0.05}
            />
          </a>

          <main>
            <Hero loaded={loaded} />
            <ManifestoSection />
            <Marquee />
            <Showcase />
            <IdeSection />
            <SocialLinks />
            <Projects />
            <TechStack />
            <Experience />
            <Contact />
            <Footer />
          </main>
        </>
      </div>
    </>
  );
}
