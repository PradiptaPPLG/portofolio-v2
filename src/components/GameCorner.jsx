import React from 'react';
import { Gamepad2, Play, ExternalLink, GitBranch, Sparkles, Cpu, Flame, Monitor, Smartphone } from 'lucide-react';
import AnimatedList from './AnimatedList';
import './GameCorner.css';

const GAMES = [
  {
    id: 'desert-rally-drift-3d',
    num: '01',
    title: 'DESERT RALLY DRIFT 3D',
    subtitle: 'WebGL Off-Road Racing Game',
    description:
      'A lightweight, browser-based 3D racing simulator featuring custom vehicle drift physics, procedural desert environments, and real-time checkpoint scoring powered by Three.js and modern WebGL rendering.',
    genre: '3D Arcade Racing',
    platform: 'PC / Desktop Only',
    image: '/assets/projects/gc1-desert-rally.webp',
    demoUrl: 'https://desert-rally-two.vercel.app/',
    githubUrl: 'https://github.com/PradiptaPPLG/desert-rally.git',
    technologies: ['Three.js', 'WebGL', 'JavaScript', 'Physics Engine', 'Vite'],
    features: [
      'Custom vehicle drift physics & tire friction',
      'Procedural desert terrain & low-poly town assets',
      'Real-time checkpoint scoring & timer system',
      'Direct browser execution (Zero installation, 60 FPS)'
    ],
    controls: 'WASD / Arrow Keys',
    status: 'Live Demo',
    fps: '60 FPS Native'
  },
  {
    id: 'delivery-pizza-3d',
    num: '02',
    title: 'DELIVERY PIZZA 3D',
    subtitle: 'WebGL Courier & Drift Simulator',
    description:
      'A fast-paced, browser-based 3D driving simulator combining arcade pizza delivery missions with custom vehicle drift physics, Japanese mountain touge passes, and procedural Web Audio engine sounds powered by Three.js and modern WebGL rendering.',
    genre: '3D Courier & Drift',
    platform: 'PC / Desktop Only',
    image: '/assets/projects/gc2-delivery-pizza.webp',
    demoUrl: 'https://delivery-pizza-roan.vercel.app/',
    githubUrl: 'https://github.com/PradiptaPPLG/delivery-pizza.git',
    technologies: ['Three.js', 'WebGL', 'Web Audio API', 'JavaScript', 'Physics Engine', 'Vite'],
    features: [
      'Interactive pizza courier delivery missions & wage system',
      'Custom touge drift physics & combo multiplier scoring',
      'Procedural Web Audio engine sounds & nitro turbo boost',
      'Mini-map navigation from factory to residential checkpoints'
    ],
    controls: 'WASD / Arrows • [E] Interact • [P] Engine',
    status: 'Live Demo',
    fps: '80 FPS High Refresh'
  },
  {
    id: 'meowzzle-cat-puzzle',
    num: '03',
    title: 'MEOWZZLE',
    subtitle: 'HTML5 Canvas Polyomino Puzzle',
    description:
      'A cozy, tactile browser-based cat polyomino puzzle game combining spatial grid mechanics with procedural feline animations, dual dynamic environments (Sunny Beach & Cozy Living Room), and a zero-dependency procedural Web Audio vocal synthesis engine.',
    genre: 'Cozy Spatial Puzzle',
    platform: 'Cross-Platform (Mobile & PC)',
    image: '/assets/projects/gc3-meowzzle.webp',
    demoUrl: 'https://meowzzle.vercel.app/',
    githubUrl: 'https://github.com/PradiptaPPLG/meowzzle.git',
    technologies: ['HTML5 Canvas', 'JavaScript', 'Web Audio API', 'CSS3', 'Spring Physics', 'Vercel'],
    features: [
      '8 handcrafted progressive levels featuring unique feline mechanics & liquid cat morphing',
      'Zero-dependency procedural Web Audio vocal synthesizer (purrs, meows, squishes, & chimes)',
      'Dual dynamic environments: Sunny Beach (animated waves & crabs) & Cozy Living Room',
      'Smooth spring physics & mobile-first touch-lift controls for seamless cross-device play'
    ],
    controls: 'Drag & Drop • Tap / [R] Rotate • Double-Tap Morph',
    status: 'Live Demo',
    fps: '60 FPS Smooth'
  }
];

export default function GameCorner() {
  return (
    <section className="section section-alt game-corner-section" id="games">
      <div className="container">
        {/* Section Header */}
        <div className="game-corner-header" data-reveal>
          <div>
            <div className="section-tag" style={{ marginBottom: '0.8rem' }}>
              <Gamepad2 size={15} style={{ color: 'var(--accent-bright)' }} />
              <span>Interactive 3D Arcade</span>
            </div>
            <h2 className="section-title" style={{ marginBottom: '1rem' }}>
              Game<br />
              <em>Corner</em>
            </h2>
            <p
              className="section-subtitle"
              style={{ maxWidth: '640px', margin: 0, color: 'var(--text-muted)' }}
            >
              Step inside my interactive browser arcade. High-performance 3D games, WebGL simulations, and spatial HTML5 puzzles — zero install needed, play directly in your browser.
            </p>
          </div>

          <div className="game-corner-header-actions">
            <a
              href="https://github.com/PradiptaPPLG"
              target="_blank"
              rel="noreferrer"
              className="btn-outline"
            >
              Game Repositories <ExternalLink size={15} />
            </a>
          </div>
        </div>

        {/* Compact Table Container (Matches Commercial Projects Container Style) */}
        <div className="game-table-container" data-reveal>
          <div className="game-table-head">
            <div>No</div>
            <div>Game & Concept</div>
            <div>Technologies</div>
            <div>Platform & Specs</div>
            <div>Photo & Launch</div>
          </div>

          <AnimatedList displayScrollbar={false} showGradients={false}>
            {GAMES.map((game) => (
              <div key={game.id} className="game-table-row">
                {/* 1. Number */}
                <div className="game-row-num">{game.num}</div>

                {/* 2. Game Title & Concept */}
                <div className="game-row-info">
                  <div className="game-row-badges">
                    <span className="game-badge game-badge-genre">
                      <Flame size={11} />
                      {game.genre}
                    </span>
                    <span className="game-badge game-badge-status">
                      <span className="game-status-dot" />
                      {game.status}
                    </span>
                  </div>
                  <div className="game-row-title-wrap">
                    <h3 className="game-row-title">{game.title}</h3>
                    <span className="game-row-subtitle">{game.subtitle}</span>
                  </div>
                  <p className="game-row-desc">{game.description}</p>
                </div>

                {/* 3. Technologies */}
                <div className="game-row-tech">
                  <div className="game-tech-pills">
                    {game.technologies.map((t) => (
                      <span key={t} className="game-tech-pill">
                        {t}
                      </span>
                    ))}
                  </div>
                  {game.features && game.features.length > 0 && (
                    <div className="game-row-feature-preview">
                      <Sparkles size={11} style={{ color: 'var(--accent-bright)', flexShrink: 0, marginTop: '2px' }} />
                      <span>{game.features[0]}</span>
                    </div>
                  )}
                </div>

                {/* 4. Platform & Controls */}
                <div className="game-row-platform">
                  <div
                    className={`game-platform-pill ${
                      game.platform.toLowerCase().includes('cross') || game.platform.toLowerCase().includes('mobile')
                        ? 'is-cross'
                        : 'is-pc'
                    }`}
                  >
                    {game.platform.toLowerCase().includes('cross') || game.platform.toLowerCase().includes('mobile') ? (
                      <Smartphone size={13} />
                    ) : (
                      <Monitor size={13} />
                    )}
                    <span>{game.platform}</span>
                  </div>

                  {game.controls && (
                    <div className="game-row-controls">
                      <span>🎮 Controls:</span>
                      <strong>{game.controls}</strong>
                    </div>
                  )}

                  <div className="game-row-fps">
                    <Cpu size={12} style={{ color: 'var(--accent-bright)' }} />
                    <span>{game.fps || '60 FPS Native'}</span>
                  </div>
                </div>

                {/* 5. Photo & Launch */}
                <div className="game-row-action">
                  <div className="game-row-photo-frame">
                    <img
                      src={game.image}
                      alt={game.title}
                      className="game-row-photo"
                      loading="lazy"
                    />
                  </div>

                  <div className="game-row-btns">
                    <a
                      href={game.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-grad game-row-play-btn"
                    >
                      <Play size={13} fill="currentColor" />
                      <span>Play Live</span>
                      <ExternalLink size={12} />
                    </a>

                    {game.githubUrl && (
                      <a
                        href={game.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline game-row-code-btn"
                        title="Source Code"
                      >
                        <GitBranch size={13} />
                        <span>Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </AnimatedList>
        </div>

        {/* Compact Bottom Teaser Card */}
        <div className="game-table-teaser" data-reveal>
          <Gamepad2 size={18} style={{ color: 'var(--accent-bright)' }} />
          <span>More 3D WebGL and HTML5 Canvas simulations currently in development.</span>
        </div>
      </div>
    </section>
  );
}
