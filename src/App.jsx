import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useMotionTemplate, useMotionValueEvent } from 'framer-motion';
import { ArrowUpRight, ArrowRight, GitBranch, Link2, Mail, Code2, Server, Database, Cpu, Sparkles, CheckCircle2, Command, Search, User, Folder, Award, Briefcase, Phone, X, Download, Eye, FileText, ExternalLink, Copy, MapPin } from 'lucide-react';
import StrokeText from './components/StrokeText';
import SplitText from './components/SplitText';
import TextType from './components/TextType';
import Shuffle from './components/Shuffle';
import Topography from './components/Topography';
import ScrollVelocity from './components/ScrollVelocity';
import Signature from './components/Signature';
import CatchMeOnSignature from './components/CatchMeOnSignature';
import RotatingText from './components/RotatingText';
import { SiReact, SiNextdotjs, SiNodedotjs, SiExpress, SiPostgresql, SiPrisma, SiDocker, SiKubernetes } from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import GlideSelect from './components/GlideSelect';
import ScrollExpand from './components/ScrollExpand';
import AnimatedList from './components/AnimatedList';
import PlaygroundCard from './components/PlaygroundCard';
import TechText from './components/TechText';
import PaperCrumple from './components/PaperCrumple';
import BellToggle from './components/BellToggle';
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
  }, []);

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
              preload="auto"
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

/* ============================================================
   COMMAND PALETTE
   ============================================================ */
function CommandPalette({ open, onClose }) {
  const [search, setSearch] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setSearch('');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && open) onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  const [hoverRect, setHoverRect] = useState(null);

  if (!open) return null;

  const commands = [
    { section: 'NAVIGATE', label: 'Go to Hero', icon: <User size={16} />, action: () => { window.scrollTo({ top: 0, behavior: 'smooth' }); onClose(); } },
    { section: 'NAVIGATE', label: 'Go to Projects', icon: <Folder size={16} />, action: () => { document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); onClose(); } },
    { section: 'NAVIGATE', label: 'Go to Tech Stack', icon: <Cpu size={16} />, action: () => { document.getElementById('stack')?.scrollIntoView({ behavior: 'smooth' }); onClose(); } },
    { section: 'NAVIGATE', label: 'Go to Experience', icon: <Briefcase size={16} />, action: () => { document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }); onClose(); } },
    { section: 'CONTACT', label: 'Copy Email — pradipta@maulana.dev', icon: <Mail size={16} />, action: () => { navigator.clipboard.writeText('pradipta@maulana.dev'); alert('Email copied!'); onClose(); } },
    { section: 'CONTACT', label: 'Copy Phone — +62 838 4055 9238', icon: <Phone size={16} />, action: () => { navigator.clipboard.writeText('+62 838 4055 9238'); alert('Phone copied!'); onClose(); } },
    { section: 'SOCIAL', label: 'GitHub', icon: <GitBranch size={16} />, action: () => { window.open('https://github.com', '_blank'); onClose(); } },
    { section: 'SOCIAL', label: 'LinkedIn', icon: <Link2 size={16} />, action: () => { window.open('https://linkedin.com', '_blank'); onClose(); } }
  ];

  const filtered = commands.filter(c => c.label.toLowerCase().includes(search.toLowerCase()));

  const grouped = filtered.reduce((acc, curr) => {
    if (!acc[curr.section]) acc[curr.section] = [];
    acc[curr.section].push(curr);
    return acc;
  }, {});

  const handlePointerMove = (e) => {
    const btn = e.target.closest('.cmd-item');
    if (btn) {
      setHoverRect({
        top: btn.offsetTop,
        height: btn.offsetHeight,
        opacity: 1
      });
    } else {
      setHoverRect(prev => prev ? { ...prev, opacity: 0 } : null);
    }
  };

  const handlePointerLeave = () => {
    setHoverRect(prev => prev ? { ...prev, opacity: 0 } : null);
  };

  return (
    <div className="cmd-backdrop" onClick={onClose}>
      <motion.div 
        className="cmd-modal"
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cmd-header">
          <Search size={18} className="cmd-search-icon" />
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Search commands, projects, contacts..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="cmd-input"
          />
          <button className="cmd-close" onClick={onClose}><X size={18} /></button>
        </div>
        
        <div className="cmd-body" onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
          <div 
            className="cmd-glide-pill"
            style={{
              opacity: hoverRect ? hoverRect.opacity : 0,
              transform: hoverRect ? `translateY(${hoverRect.top}px)` : 'translateY(0)',
              height: hoverRect ? `${hoverRect.height}px` : '40px',
            }}
          />
          {Object.entries(grouped).length === 0 && (
            <div className="cmd-empty">No results found.</div>
          )}
          {Object.entries(grouped).map(([section, items]) => (
            <div key={section} className="cmd-group">
              <div className="cmd-group-label">{section}</div>
              {items.map(item => (
                <button key={item.label} className="cmd-item" onClick={item.action}>
                  <div className="cmd-item-left">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                </button>
              ))}
            </div>
          ))}
        </div>
        
        <div className="cmd-footer">
          <div className="cmd-footer-hints">
            <span><kbd>↑↓</kbd> navigate</span>
            <span><kbd>↵</kbd> select</span>
            <span><kbd>esc</kbd> close</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

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

  // Removed responsiveFontSize hook since it's inherited from CSS now
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
                    fillColor="transparent"
                    strokeWidth={1.2}
                    drawDuration={1.8}
                    fillDelay={0.3}
                    stagger={0.1}
                    ease="power2.out"
                    trigger="mount"
                    fillMode="wipe"
                    fontWeight={900}
                  />
                </div>
                <div className="hero-name-word">
                  <StrokeText
                    text="ENDRA"
                    strokeColor="#c084fc"
                    fillColor="transparent"
                    strokeWidth={1.2}
                    drawDuration={1.8}
                    fillDelay={0.3}
                    stagger={0.1}
                    ease="power2.out"
                    trigger="mount"
                    fillMode="wipe"
                    fontWeight={900}
                  />
                </div>
                <div className="hero-name-word">
                  <StrokeText
                    text="MAULANA"
                    strokeColor="#a855f7"
                    fillColor="transparent"
                    strokeWidth={1.2}
                    drawDuration={1.8}
                    fillDelay={0.3}
                    stagger={0.1}
                    ease="power2.out"
                    trigger="mount"
                    fillMode="wipe"
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
   MANIFESTO SECTION
   ============================================================ */
function BiodataSection({ showRecruiterModal, setShowRecruiterModal }) {
  const [showCvModal, setShowCvModal] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };
  const biodataLines = [
    { label: 'FULL NAME', text: 'Pradipta Endra Maulana', highlight: true },
    { label: 'BIO INTEL', text: '17 y.o. Systems & Web Architect building high-throughput apps & interactive tools.', highlight: true },
    { label: 'BORN', text: 'Ciamis, March 2, 2009', highlight: false },
    { label: 'INTERESTS', text: 'Fullstack Web, UI/UX, Data Science', highlight: false },
  ];

  const skillLines = [
    { text: 'Fullstack Web Development', highlight: true },
    { text: 'UI/UX & Graphic Design', highlight: false },
    { text: 'Game Development', highlight: false },
    { text: 'Mobile Development', highlight: true },
    { text: 'Data Science & Architecture', highlight: false },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { delayChildren: 0.1 }
    }
  };

  const boxVariantsLTR = {
    hidden: { left: 0, width: '0%', right: 'auto' },
    visible: { 
      left: ['0%', '0%', '100%'],
      width: ['0%', '100%', '0%'],
      transition: { duration: 0.9, ease: [0.65, 0, 0.35, 1], times: [0, 0.5, 1] }
    }
  };

  const boxVariantsRTL = {
    hidden: { right: 0, width: '0%', left: 'auto' },
    visible: { 
      right: ['0%', '0%', '100%'],
      width: ['0%', '100%', '0%'],
      transition: { duration: 0.9, ease: [0.65, 0, 0.35, 1], times: [0, 0.5, 1] }
    }
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { delay: 0.45, duration: 0.01 } 
    }
  };

  const labelVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 0.9, 
      transition: { delay: 0.45, duration: 0.4 } 
    }
  };

  return (
    <motion.section 
      className="biodata-manifesto-section"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="biodata-manifesto-grid">
        
        {/* Left Column: Biodata (Right-Aligned, slides Right-To-Left) */}
        <div className="biodata-manifesto-col align-right">
          <motion.h3 className="biodata-manifesto-title" variants={labelVariants}>PERSONAL INTEL</motion.h3>
          {biodataLines.map((line, i) => (
            <motion.div key={i} className="biodata-item-wrap align-right" variants={{}}>
              <motion.span className="biodata-manifesto-label" variants={labelVariants}>{line.label}</motion.span>
              <motion.div className="manifesto-line-wrap" variants={{}}>
                <motion.div className="manifesto-reveal-box" variants={boxVariantsRTL} />
                <motion.div
                  className={`manifesto-line biodata-manifesto-text ${line.highlight ? 'is-highlight-text' : ''}`}
                  variants={textVariants}
                >
                  {line.text}
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
          
          <motion.div className="cv-buttons-wrap" variants={textVariants}>
            <a href="/assets/Pradipta_Endra_Maulana_CV.pdf" download="Pradipta_Endra_Maulana_CV.pdf" className="cv-btn">
              <Download size={18} /> Download CV
            </a>
            <button onClick={() => setShowCvModal(true)} className="cv-btn icon-only">
              <Eye size={18} />
            </button>
            <button onClick={() => setShowRecruiterModal(true)} className="cv-btn recruiter-btn">
              For recruiters &rarr;
            </button>
          </motion.div>
        </div>

        {/* Right Column: Skills (Left-Aligned, slides Left-To-Right) */}
        <div className="biodata-manifesto-col">
          <motion.h3 className="biodata-manifesto-title" variants={labelVariants}>CORE COMPETENCIES</motion.h3>
          <div className="biodata-skills-wrap">
            {skillLines.map((line, i) => (
              <motion.div key={i} className="manifesto-line-wrap" variants={{}}>
                <motion.div className="manifesto-reveal-box" variants={boxVariantsLTR} />
                <motion.div
                  className={`manifesto-line biodata-manifesto-text ${line.highlight ? 'is-highlight-text' : ''}`}
                  variants={textVariants}
                >
                  {line.text}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {showCvModal && (
            <motion.div 
              className="cv-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCvModal(false)}
            >
              <motion.div 
                className="cv-modal"
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="cv-modal-header">
                  <div className="cv-modal-title">
                    <FileText size={20} style={{ color: 'var(--accent-bright)' }} />
                    Curriculum Vitae
                  </div>
                  <div className="cv-modal-actions">
                    <a href="/assets/Pradipta_Endra_Maulana_CV.pdf" download="Pradipta_Endra_Maulana_CV.pdf" className="cv-modal-download">
                      <Download size={16} /> Download
                    </a>
                    <a href="/assets/Pradipta_Endra_Maulana_CV.pdf" target="_blank" rel="noopener noreferrer" className="cv-modal-icon-btn">
                      <ExternalLink size={20} />
                    </a>
                    <button onClick={() => setShowCvModal(false)} className="cv-modal-icon-btn">
                      <X size={20} />
                    </button>
                  </div>
                </div>
                <div className="cv-modal-body">
                  <iframe src="/assets/Pradipta_Endra_Maulana_CV.pdf#toolbar=0" title="CV Preview"></iframe>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {showRecruiterModal && (
            <motion.div 
              className="recruiter-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowRecruiterModal(false)}
            >
              <motion.div 
                className="recruiter-modal"
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="recruiter-header">
                  <div className="rm-subtitle">RECRUITER SUMMARY</div>
                  <div className="rm-title-row">
                    <h2>60-second overview</h2>
                    <button onClick={() => setShowRecruiterModal(false)} className="rm-close-btn">
                      <X size={20} />
                    </button>
                  </div>
                </div>

                <div className="recruiter-body">
                  <div className="rm-profile">
                    <h3>Pradipta Endra Maulana</h3>
                    <p className="rm-role">Systems & Web Architect | High-Impact Builder</p>
                    <div className="rm-status-badge">
                      <div className="rm-status-dot"></div>
                      Open for Industrial Internship / Full-time roles
                    </div>
                  </div>

                  <div className="rm-contact-grid">
                    <div className="rm-contact-card" onClick={() => handleCopy('pradipta02032009@gmail.com', 'email')}>
                      <Mail size={18} className="rm-c-icon" />
                      <div className="rm-c-info">
                        <span className="rm-c-label">Email</span>
                        <span className="rm-c-value">pradipta02032009@gmail.com</span>
                      </div>
                      {copiedField === 'email' ? <CheckCircle2 size={16} className="rm-copy-icon success" /> : <Copy size={16} className="rm-copy-icon" />}
                    </div>

                    <div className="rm-contact-card" onClick={() => handleCopy('+62 852 1958 3336', 'phone')}>
                      <Phone size={18} className="rm-c-icon" />
                      <div className="rm-c-info">
                        <span className="rm-c-label">WhatsApp</span>
                        <span className="rm-c-value">+62 852 1958 3336</span>
                      </div>
                      {copiedField === 'phone' ? <CheckCircle2 size={16} className="rm-copy-icon success" /> : <Copy size={16} className="rm-copy-icon" />}
                    </div>

                    <div className="rm-contact-card">
                      <MapPin size={18} className="rm-c-icon" />
                      <div className="rm-c-info">
                        <span className="rm-c-label">Location</span>
                        <span className="rm-c-value">Ciamis, West Java, Indonesia</span>
                      </div>
                    </div>

                    <a href="https://instagram.com/massdiipp" target="_blank" rel="noopener noreferrer" className="rm-contact-card link">
                      <User size={18} className="rm-c-icon" />
                      <div className="rm-c-info">
                        <span className="rm-c-label">Instagram</span>
                        <span className="rm-c-value">@massdiipp</span>
                      </div>
                      <ExternalLink size={16} className="rm-copy-icon" />
                    </a>
                  </div>

                  <div className="rm-stats-grid">
                    <div className="rm-stat-card">
                      <div className="rm-s-val">15+</div>
                      <div className="rm-s-label">Projects</div>
                    </div>
                    <div className="rm-stat-card">
                      <div className="rm-s-val">2+</div>
                      <div className="rm-s-label">Years Exp.</div>
                    </div>
                    <div className="rm-stat-card">
                      <div className="rm-s-val">WEB</div>
                      <div className="rm-s-label">Fullstack</div>
                    </div>
                    <div className="rm-stat-card">
                      <div className="rm-s-val">UI/UX</div>
                      <div className="rm-s-label">Design</div>
                    </div>
                  </div>

                  <div className="rm-tech-stack">
                    <h4>Technical stack</h4>
                    <div className="rm-tech-row">
                      <span className="rm-t-cat">Programming Language</span>
                      <div className="rm-t-tags">
                        <span>HTML</span><span>JavaScript</span><span>Python</span><span>Java</span>
                      </div>
                    </div>
                    <div className="rm-tech-row">
                      <span className="rm-t-cat">Backend</span>
                      <div className="rm-t-tags">
                        <span>NodeJS</span><span>Express</span>
                      </div>
                    </div>
                    <div className="rm-tech-row">
                      <span className="rm-t-cat">Frontend</span>
                      <div className="rm-t-tags">
                        <span>React</span><span>Next.js</span><span>Tailwind CSS</span>
                      </div>
                    </div>
                    <div className="rm-tech-row">
                      <span className="rm-t-cat">Database</span>
                      <div className="rm-t-tags">
                        <span>PostgreSQL</span><span>MySQL</span>
                      </div>
                    </div>
                    <div className="rm-tech-row">
                      <span className="rm-t-cat">Tools</span>
                      <div className="rm-t-tags">
                        <span>Figma</span><span>Git</span><span>Github</span><span>VS Code</span>
                      </div>
                    </div>
                  </div>

                  <div className="rm-cards-row">
                    <div className="rm-edu-card">
                      <Briefcase size={16} className="rm-ec-icon" />
                      <div className="rm-ec-content">
                        <h5>Education</h5>
                        <p className="rm-ec-title">SMK Negeri 1 Ciamis</p>
                        <p className="rm-ec-sub">Software Engineering (PPLG)</p>
                        <p className="rm-ec-date">2024 - 2027</p>
                      </div>
                    </div>
                    <div className="rm-edu-card">
                      <User size={16} className="rm-ec-icon" />
                      <div className="rm-ec-content">
                        <h5>Current Role</h5>
                        <p className="rm-ec-title">Freelance Developer</p>
                        <p className="rm-ec-sub">Fullstack & Design</p>
                        <p className="rm-ec-date">2023 - Present</p>
                      </div>
                    </div>
                  </div>

                  <div className="rm-actions">
                    <a href="/assets/Pradipta_Endra_Maulana_CV.pdf" download="Pradipta_Endra_Maulana_CV.pdf" className="rm-btn-primary">
                      <Download size={18} /> Download CV (PDF)
                    </a>
                    <button onClick={() => { setShowRecruiterModal(false); setShowCvModal(true); }} className="rm-btn-icon">
                      <Eye size={18} />
                    </button>
                    <a href="https://wa.me/6285219583336" target="_blank" rel="noopener noreferrer" className="rm-btn-secondary">
                      <Phone size={18} /> WhatsApp Chat
                    </a>
                  </div>

                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
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
          'SYSTEMS & WEB ARCHITECT • HIGH-THROUGHPUT APPS • REACT & NEXT.JS 14 • NODE.JS & EXPRESS • POSTGRESQL & PRISMA • DOCKER & KUBERNETES • AWS CLOUD INFRASTRUCTURE • ',
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
  const x = useTransform(smoothProgress, [0, 0.25, 1], ['calc(0% + 30vw)', 'calc(0% + 0vw)', 'calc(-100% + 100vw)']);

  // Expanded to 10 items for a richer, denser layout
  const showcaseItems = [
    { title: "AI Ready ASEAN", year: "Certification", img: "/assets/licenses-&-certifications/ai-ready-asean.jpg" },
    { title: "Data Science & Analytics", year: "Certification", img: "/assets/licenses-&-certifications/data-science-&-analytics.jpg" },
    { title: "Data Science Methodology", year: "Certification", img: "/assets/licenses-&-certifications/data-science-methodology.jpg" },
    { title: "Digital Marketing", year: "Certification", img: "/assets/licenses-&-certifications/digital-marketing.jpg" },
    { title: "Frontend Dev", year: "Certification", img: "/assets/licenses-&-certifications/introduction-to-frontend-dev.jpg" },
    { title: "MS Excel", year: "Certification", img: "/assets/licenses-&-certifications/introduction-to-ms-excel.jpg" },
    { title: "Cybersecurity", year: "Certification", img: "/assets/licenses-&-certifications/professional-cybersecurity.jpg" },
    { title: "Python 101", year: "Certification", img: "/assets/licenses-&-certifications/python-101-for-data-science.jpg" },
    { title: "SQL Database", year: "Certification", img: "/assets/licenses-&-certifications/sql-and-relational-database.jpg" },
    { title: "KREAI Finalist", year: "Award", img: "/assets/licenses-&-certifications/top-10-finalist-kreai.jpg" },
  ];

  return (
    <motion.section 
      ref={containerRef} 
      className="showcase-section"
      style={{ color: textColor }}
    >
      <div className="showcase-sticky">
        <div className="showcase-title-wrap">
          <SplitText
            text="LICENSES & CERTIFICATIONS"
            className="showcase-main-title"
            delay={30}
            duration={0.8}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
          />
        </div>
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
    title: 'MAS-PKL — Student Administration Monitoring System for PKL',
    desc: 'A web-based application to help schools monitor student activities during Field Work Practice (PKL), from attendance to activity journals and PKL location information.',
    tech: ['Laravel', 'PHP', 'MySQL', 'JavaScript', 'Bootstrap/Tailwind CSS'],
    year: '2024',
    image: '/assets/projects/mas-pkl.png',
  },
  {
    num: '02',
    title: 'ASIGN — Teacher Attendance & Morning Roll Call System',
    desc: 'An application to assist in recording and monitoring teacher attendance during morning roll calls. The system is designed to simplify attendance administration and provide monitoring data for schools.',
    tech: ['Laravel', 'PHP', 'MySQL', 'JavaScript'],
    year: '2024',
    image: '/assets/projects/asign.png',
  },
  {
    num: '03',
    title: 'KOPDES — Village Cooperative ERP',
    desc: 'A web-based ERP system to integrate the operational management of Village Cooperatives, particularly HR management, attendance, work schedules, permits, as well as monitoring.',
    tech: ['Laravel', 'PHP', 'MySQL', 'JavaScript'],
    year: '2023',
    image: '/assets/projects/kopdes.png',
  },
  {
    num: '04',
    title: 'PIXELCAM — Interactive Web Photobooth',
    desc: 'A web-based photobooth application that allows users to take photos directly through a browser with various templates, effects, and photo strip concepts that can be selected according to needs.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Web Camera API'],
    year: '2023',
    image: '/assets/projects/pixelcam.png',
  },
  {
    num: '05',
    title: 'BLUD SMKN 1 Ciamis — Teaching Factory Service Platform',
    desc: 'This website serves as the central information and service hub for the Teaching Factory (TEFA) for all departments at SMKN 1 Ciamis. Visitors can learn about available services.',
    tech: ['HTML', 'CSS', 'JavaScript', 'PHP/Laravel'],
    year: '2023',
    image: '/assets/projects/bludsmkn1ciamis.png',
  },
  {
    num: '06',
    title: 'NexaPOS – Point of Sale Management System',
    desc: 'NexaPOS is a web-based Point of Sale (POS) application designed to help process transactions and product management simply and efficiently.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    year: '2023',
    image: '/assets/projects/nexapos-drivethru.png',
  },
  {
    num: '07',
    title: 'Stayora – Hotel Reservation & Booking Platform',
    desc: 'Stayora is a web-based hotel reservation app designed to help users find and select accommodations more easily. Users can search for hotels by location, specify check-in and check-out dates.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    year: '2023',
    image: '/assets/projects/stayora-staycation.png',
  },
  {
    num: '08',
    title: 'Garasi Rental – Vehicle Rental & Reservation Platform',
    desc: 'Garasi Rental is a web-based car rental application designed to help users search, select, and reserve vehicles more practically.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    year: '2022',
    image: '/assets/projects/garasirentalcms.png',
  },
  {
    num: '09',
    title: 'Our Screen – Cinema Ticket Reservation Platform',
    desc: 'Layar Kita is a web-based application designed to help users find currently showing films and conveniently book cinema tickets. Users can select the cinema, viewing date, film format, and film title.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    year: '2022',
    image: '/assets/projects/layarkita.png',
  },
  {
    num: '10',
    title: 'HEXAPY – MUSIC STREAMING DASHBOARD',
    desc: 'Hexapy is a web-based music streaming app with a modern, dark design. It\'s designed as a platform for discovering songs.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    year: '2022',
    image: '/assets/projects/hexamusicpy.png',
  },
  {
    num: '11',
    title: 'LIBRAZE – Library Management & Book Lending System',
    desc: 'A web-based library management application designed to simplify book collection management, borrowing and returning activities, and member administration through a clean and centralized dashboard.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    year: '2022',
    image: '/assets/projects/libraze.png',
  },
  {
    num: '12',
    title: 'VOLTRIX – Laptop Marketplace & Product Discovery',
    desc: 'A web-based laptop marketplace designed to help users discover and compare laptops based on specifications, performance, and price through a clean and organized shopping experience.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    year: '2022',
    image: '/assets/projects/voltrix-tech.png',
  },
  {
    num: '13',
    title: 'EDUTRACK – Teacher Academic Management Platform',
    desc: 'A web-based platform designed to help teachers manage their daily academic activities, monitor student progress, organize assignments, record attendance, and review class performance through a centralized dashboard.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    year: '2021',
    image: '/assets/projects/edutrack-edu.png',
  },
  {
    num: '14',
    title: 'WILDORA – Animal Collection & Minigames Platform',
    desc: 'An interactive application platform that allows users to collect various types of animals through minigames.',
    tech: ['HTML', 'CSS', 'JavaScript', 'React', 'Backend API', 'Database'],
    year: '2021',
    image: '/assets/projects/wildora.png',
  },
  {
    num: '15',
    title: 'EcoVision AI – Smart Waste Classification Platform',
    desc: 'A web-based platform developed using React to help users identify and classify waste types through a scanning process. The system will analyze the scanned waste.',
    tech: ['React', 'JavaScript', 'AI / Machine Learning', 'API', 'CSS'],
    year: '2021',
    image: '/assets/projects/ecovision-ai.png',
  },
  {
    num: '16',
    title: 'DieTrack – Diecast Collection Management Platform',
    desc: 'A web-based platform designed to help diecast collectors manage and monitor their collections in a more organized manner.',
    tech: ['React', 'JavaScript', 'CSS', 'API', 'Database'],
    year: '2021',
    image: '/assets/projects/dietrack.png',
  }
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

  const handleCodeComplete1 = () => {
    setTermPhase(0.5); // Start typing second line
  };

  const handleCodeComplete2 = () => {
    setTermPhase((prev) => {
      setShowTerminal(true);
      return 1; // Terminal slides up
    });
  };

  const handleTermCommandComplete = () => {
    setTermPhase(3); // Finished typing, wait for enter
    setTimeout(() => {
      setTermPhase(4); // Show outputs
    }, 600); // 600ms delay for "Enter" key feeling
  };

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const texts = [
    "Coding",
    "UI/UX",
    "Database",
    "Mobile App",
    "Data Science",
    "Editing Video",
    "Design Canva",
    "ALL!"
  ];

  const rotatingRef = useRef();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // 8 items, clamp index to texts array bounds
    const index = Math.min(texts.length - 1, Math.floor(latest * texts.length));
    if (rotatingRef.current) {
      rotatingRef.current.jumpTo(index);
    }
  });

  return (
    <section ref={containerRef} className="section ide-section" id="ide" style={{ height: '400vh' }}>
      <div className="container" style={{ position: 'sticky', top: '25vh', display: 'flex', flexWrap: 'nowrap', gap: '2rem', maxWidth: '1600px', width: '95vw', margin: '0 auto', alignItems: 'stretch' }}>
        
        {/* LEFT: IDE Window */}
        <div className="ide-window" style={{ flex: '1 1 45%', minWidth: '400px', height: 'auto', margin: 0 }}>
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
                <div className="code-line">
                  <TextType 
                    text="print('Hello World!')" 
                    typingSpeed={40}
                    startOnVisible={true}
                    onSentenceComplete={handleCodeComplete1}
                    className="code-typing"
                    loop={false}
                    showCursor={termPhase === 0} // Hide cursor after typing finishes
                    cursorCharacter="|"
                  />
                </div>
                {termPhase >= 0.5 && (
                  <div className="code-line">
                    <TextType 
                      text="print('I love coding')" 
                      typingSpeed={40}
                      startOnVisible={true}
                      onSentenceComplete={handleCodeComplete2}
                      className="code-typing"
                      loop={false}
                      showCursor={termPhase === 0.5}
                      cursorCharacter="|"
                    />
                  </div>
                )}
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
                        <div className="term-output">I love coding</div>
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

        {/* RIGHT: Adobe Canvas text-rotate */}
        <div className="canvas-window" style={{ flex: '1 1 55%', minWidth: '500px', position: 'relative', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <img src="/assets/adobecanvas.png" alt="Adobe Canvas" style={{ width: '100%', height: 'auto', borderRadius: '12px', display: 'block' }} />
              <div style={{
                position: 'absolute',
                top: '35%',
                left: '34%',
                transform: 'translateY(-50%)',
                fontSize: 'clamp(0.5rem, 0.9vw, 1.1rem)',
                fontFamily: 'var(--font-display)',
                fontWeight: '900',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                whiteSpace: 'nowrap'
              }}>
                <RotatingText
                  ref={rotatingRef}
                  texts={texts}
                  style={{
                    backgroundColor: '#ccff00',
                    color: '#000',
                    padding: '0.4rem 1.2rem',
                    borderRadius: '12px',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
                    border: '3px solid #1a1236',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  staggerFrom={"last"}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-120%", opacity: 0 }}
                  staggerDuration={0.025}
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2000}
                  auto={false}
                  loop={false}
                />
              </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function SocialLinks() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  const leftX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [-200, 0, 0, -200]);
  const leftOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  
  const rightX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [200, 0, 0, 200]);
  const rightOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

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
    <section ref={containerRef} className="section social-links-section" style={{ position: 'relative' }}>

      <div className="social-split-container">
        
        {/* LINKEDIN (Slides from Left, Rata Kiri) */}
        <motion.div 
          className="social-block left"
          style={{ position: 'relative', x: leftX, opacity: leftOpacity }}
        >
          {/* Animated Catch Me On Signature Overlay */}
          <motion.div 
            style={{
              position: 'absolute',
              top: '-10px',
              left: '-20px',
              y: parallaxY,
              width: '110%',
              minWidth: '350px',
              zIndex: 50,
              pointerEvents: 'none',
              rotate: -5
            }}
          >
            <CatchMeOnSignature color="#ccff00" strokeWidth={5} progress={scrollYProgress} />
          </motion.div>

          <h2 className="social-title">
            <span style={{ fontSize: '0.45em', display: 'block', marginBottom: '-0.3em', opacity: 0.8 }}>MY</span>
            LINKEDIN
          </h2>
          <div className="social-desc">
            <SplitText 
              text="All achievements, certificates, and professional information about my career journey."
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
          style={{ x: rightX, opacity: rightOpacity }}
        >
          <h2 className="social-title">
            <span style={{ fontSize: '0.45em', display: 'block', marginBottom: '-0.3em', opacity: 0.8 }}>MY</span>
            GITHUB
          </h2>
          <div className="social-desc">
            <SplitText 
              text="All my repositories, ranging from assignments and personal projects to code experiments."
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

function Achievements() {
  return (
    <section className="section" id="achievements" style={{ padding: 0 }}>
      <ScrollExpand
        src="/assets/pencapaian.png"
        alt="Pradipta's Achievements"
        title="Achievements & Rewards"
        scrollHint="Scroll to Expand"
        useWindowScroll
        mediaZoom={1.35}
        startWidth={42}
        startHeight={58}
        startRadius={24}
        endRadius={0}
        scrollDistance={1.2}
        holdDistance={0.35}
        smoothing={0.1}
        overlayScrim={0.6}
        enabled
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', textAlign: 'center', width: '100%', alignItems: 'center', padding: '2rem' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', margin: 0, fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.1, color: '#ffffff', textShadow: '0 4px 24px rgba(0,0,0,0.8), 0 2px 10px rgba(0,0,0,1)', letterSpacing: '-0.02em', fontFamily: 'var(--font-sans)' }}>
            LKS AI Jabar Exhibition
          </h2>
          <h3 style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)', margin: 0, color: '#ffffff', fontWeight: 800, textShadow: '0 4px 24px rgba(0,0,0,0.8), 0 2px 10px rgba(0,0,0,1)', fontFamily: 'var(--font-sans)' }}>
            <span style={{ color: 'var(--accent-bright)' }}>1st Place</span> Code & Share UBSI
          </h3>
        </div>
      </ScrollExpand>
    </section>
  );
}

function UiCraftSection() {
  return (
    <section className="section" id="uicraft">
      <div className="section-content">
        <div className="section-tag" data-reveal>Lab</div>
        <h2 className="section-title" data-reveal>
          UI CRAFT <span style={{ color: 'var(--accent-bright)' }}>& EXPERIMENTS</span>
        </h2>
        <p className="section-subtitle" data-reveal style={{ marginBottom: '3rem' }}>
          An interactive showcase of experimental UI components and high-performance animations. Hover to trigger.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          
          <PlaygroundCard title="Interactive Tech Text" category="Text Animations">
              <TechText
                text="PRODIGY"
                fontWeight={700}
                fontSize={90}
                reveal="letter"
                dashLength={4}
                dashGap={2}
                specks={15}
                color="#f4f0ff"
                accentColor="#ccff00"
                softness={0.7}
                strokeWidth={1.5}
                speed={1}
                lineStyle="dashed"
                selection
                labels
                draggable
                sweep
                style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
              />
          </PlaygroundCard>

          <PlaygroundCard title="Paper Crumple" category="3D Interactions">
                <PaperCrumple 
                  src="/assets/paper.png" 
                  alt="Hero Image" 
                  paperColor="#1f1f1f" 
                  shadow={true}
                  shadowOpacity={0.5}
                />
          </PlaygroundCard>

          <PlaygroundCard title="Bell Toggle" category="Microinteractions">
               <BellToggle 
                 onBackground="#ccff00" 
                 onColor="#120c27" 
                 background="#27272a" 
                 color="#f5f5f5" 
                 count={3}
               />
          </PlaygroundCard>

        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="section section-alt" id="projects">
      <div className="container">
        <div className="projects-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div className="section-tag" data-reveal>Portfolio</div>
            <h2 className="section-title" data-reveal>
              Featured<br />
              <em>Projects</em>
            </h2>
          </div>
          <div data-reveal style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <GlideSelect
              options={[
                { value: 'all', label: 'All Projects', tag: '8' },
                { value: 'web', label: 'Web Apps', tag: '6' },
                { value: 'mobile', label: 'Mobile Apps', tag: '2' },
                { value: 'ui', label: 'UI/UX', tag: 'New' }
              ]}
              defaultValue="all"
              onChange={(value, option) => console.log('Selected category:', value)}
              ariaLabel="Filter category"
              showTags
              accentColor="#a855f7"
              surfaceColor="var(--surface-2)"
              highlightColor="var(--border)"
              textColor="var(--text)"
              size="md"
              radius={8}
              menuWidth={180}
              placement="bottom"
              align="right"
              popDuration={180}
              glideDuration={220}
              rememberPosition
            />
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="btn-outline"
            >
              All Repositories <ArrowUpRight size={16} />
            </a>
          </div>
        </div>

        <div className="race-table-container" data-reveal>
          <div className="table-row-head">
            <div>No</div>
            <div>Project & Specs</div>
            <div>Technologies</div>
            <div>Year</div>
            <div>Photo</div>
          </div>

          <AnimatedList displayScrollbar={false} showGradients={false}>
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
                  <img src={p.image} alt={p.title} className="proj-action-photo" />
                </div>
              </div>
            ))}
          </AnimatedList>
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
    desc: 'Designing fast and reactive interfaces using React 19, Next.js App Router, TypeScript, and TailwindCSS.',
    tags: ['React 19', 'Next.js 14', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
    wide: true,
    bgImage: '/assets/tech-stack-gear/ui-modern.png'
  },
  {
    icon: <Database size={26} />,
    tag: 'DATA ANALYTICS',
    title: 'Data Science & Analytics',
    desc: 'Analyzing data, building predictive models, and visualizing insights interactively.',
    tags: ['Python', 'Pandas', 'Jupyter', 'Tableau', 'Scikit-Learn'],
    wide: false,
    bgImage: '/assets/tech-stack-gear/data-analytics.png'
  },
  {
    icon: <Database size={26} />,
    tag: 'DATABASE & CACHE',
    title: 'Data Management',
    desc: 'Optimizing relational and NoSQL database queries with high-speed caching layers.',
    tags: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma ORM'],
    wide: false,
    bgImage: '/assets/tech-stack-gear/database-management.png'
  },
  {
    icon: <Cpu size={26} />,
    tag: 'DEVOPS & CLOUD',
    title: 'Deployment & Infrastructure',
    desc: 'Automating deployments with Docker containerization and cloud service management on AWS & Vercel.',
    tags: ['Docker', 'Kubernetes', 'AWS', 'Vercel', 'CI/CD Pipelines'],
    wide: true,
    bgImage: '/assets/tech-stack-gear/deployemnt-vercel.png'
  },
];

function TechStack() {
  return (
    <section className="section" id="stack">
      <div className="container">
        <div className="section-tag" data-reveal>Technical Expertise</div>
        <h2 className="section-title" data-reveal>
          Tech<br />
          <em>Stack & Gear</em>
        </h2>

        <div className="masonry-grid" data-reveal>
          {GEAR_STACK.map((item) => (
            <div 
              key={item.title} 
              className={`gear-card ${item.wide ? 'wide' : ''} gear-card-img-bg`}
              style={{ backgroundImage: `url(${item.bgImage})` }}
            >
              <div className="gear-card-content">
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
    role: 'Founding Engineer / Systems Architect',
    company: 'TechStartup Indonesia',
    desc: 'Architected a scalable Next.js & Microservices platform from the ground up. Spearheaded technical direction, optimized complex database schemas, and achieved a 45% improvement in core rendering speeds.',
    tags: ['Next.js 14', 'TypeScript', 'AWS', 'PostgreSQL'],
  },
  {
    date: '2022 — 2024',
    role: 'Lead Developer / Core Contributor',
    company: 'Digital Creative Agency',
    desc: 'Led the development of 15+ custom, high-performance web applications and interactive tools for various global agencies utilizing a modern React and Node.js ecosystem.',
    tags: ['React', 'Node.js', 'MongoDB', 'TailwindCSS'],
  },
  {
    date: '2021 — 2022',
    role: 'Independent Frontend Developer',
    company: 'Freelance & Open Source',
    desc: 'Built deep expertise in UI/UX and motion design by creating advanced reusable component libraries and integrating REST APIs for interactive web experiences.',
    tags: ['React', 'JavaScript ES6+', 'Framer Motion'],
  },
];

function Experience() {
  return (
    <section className="section section-alt" id="experience">
      <div className="container">
        <div className="section-tag" data-reveal>Career & Experience</div>
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

if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [showRecruiterModal, setShowRecruiterModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCmdOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
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
          <div className="floating-header-group">
            <button onClick={() => setShowRecruiterModal(true)} className="floating-cosmic-btn" style={{ background: 'transparent', border: '2px solid var(--purple)' }}>
              <Shuffle 
                text="HIRE ME" 
                loop={true} 
                loopDelay={3} 
                tag="span" 
                shuffleDirection="down"
                animationMode="evenodd"
                duration={0.3}
                stagger={0.05}
              />
            </button>
            <button className="floating-cmd-trigger" onClick={() => setCmdOpen(true)} title="Search commands (Cmd+K)">
              <Search size={18} />
            </button>
          </div>
          <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />

          <main>
            <Hero loaded={loaded} />
            <BiodataSection showRecruiterModal={showRecruiterModal} setShowRecruiterModal={setShowRecruiterModal} />
            <Marquee />
            <Showcase />
            <IdeSection />
            <SocialLinks />
            <Projects />
            <UiCraftSection />
            <Achievements />
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
// Trigger Vercel Deploy
