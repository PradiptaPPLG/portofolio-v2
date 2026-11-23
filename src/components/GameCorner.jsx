import React from 'react';
import { Gamepad2, Play, ExternalLink, GitBranch, Sparkles, Trophy, Cpu, Flame, Monitor } from 'lucide-react';
import './GameCorner.css';

const GAMES = [
  {
    id: 'desert-rally-drift-3d',
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
  }
];

export default function GameCorner() {
  return (
    <section className="section section-alt game-corner-section" id="games">
      <div className="container">
        {/* Section Header */}
        <div className="section-tag" data-reveal>
          <Gamepad2 size={15} style={{ color: 'var(--accent-bright)' }} />
          <span>Interactive 3D Arcade</span>
        </div>

        <div className="game-corner-header" data-reveal>
          <div>
            <h2 className="section-title" style={{ marginBottom: '1rem' }}>
              Game<br />
              <em>Corner</em>
            </h2>
            <p
              className="section-subtitle"
              style={{ maxWidth: '640px', margin: 0, color: 'var(--text-muted)' }}
            >
              Step inside my interactive browser arcade. High-performance 3D games and WebGL simulations built with Three.js and custom physics — zero install needed, play directly in your browser.
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

        {/* Games Grid / Cards */}
        <div className="game-corner-grid" data-reveal>
          {GAMES.map((game) => (
            <div key={game.id} className="game-card">
              <div className="game-card-body">
                {/* Left: Media Column */}
                <div className="game-media-col">
                  <div className="game-media-frame">
                    <img
                      src={game.image}
                      alt={game.title}
                      className="game-media-img"
                      loading="lazy"
                    />

                    {/* Overlay Badges */}
                    <div className="game-media-badges">
                      <span className="game-badge game-badge-genre">
                        <Flame size={12} />
                        {game.genre}
                      </span>
                      <span className="game-badge game-badge-status">
                        <span className="game-status-dot" />
                        {game.status}
                      </span>
                      {game.platform && (
                        <span className="game-badge game-badge-platform">
                          <Monitor size={12} />
                          {game.platform}
                        </span>
                      )}
                    </div>

                    {/* Controls indicator */}
                    {game.controls && (
                      <div className="game-controls-pill">
                        <span>🎮 Controls:</span>
                        <strong>{game.controls}</strong>
                      </div>
                    )}
                  </div>

                  {/* Media metadata footer */}
                  <div className="game-media-meta">
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Cpu size={13} style={{ color: 'var(--accent-bright)' }} />
                      Hardware Accelerated WebGL
                    </span>
                    <span style={{ color: '#fbbf24', fontWeight: 600 }}>{game.fps || '60 FPS Native'}</span>
                  </div>
                </div>

                {/* Right: Info Column */}
                <div className="game-info-col">
                  <div>
                    <span className="game-tagline">{game.subtitle}</span>
                    <h3 className="game-title">{game.title}</h3>
                    <p className="game-desc">{game.description}</p>

                    {/* Features Grid */}
                    {game.features && (
                      <div className="game-features-wrap">
                        <div className="game-features-label">
                          <Trophy size={13} style={{ color: 'var(--accent-bright)' }} />
                          Key Highlights
                        </div>
                        <div className="game-features-grid">
                          {game.features.map((feat, i) => (
                            <div key={i} className="game-feature-item">
                              <Sparkles
                                size={13}
                                style={{ color: 'var(--accent-bright)', flexShrink: 0, marginTop: '2px' }}
                              />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tech Pills */}
                    <div className="game-tech-wrap">
                      <div className="game-features-label">Built With</div>
                      <div className="game-tech-pills">
                        {game.technologies.map((t) => (
                          <span key={t} className="game-tech-pill">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="game-actions-row">
                    <a
                      href={game.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-grad game-btn-play"
                    >
                      <Play size={16} fill="currentColor" />
                      <span>Play Game Live</span>
                      <ExternalLink size={14} />
                    </a>

                    {game.githubUrl && (
                      <a
                        href={game.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline game-btn-code"
                      >
                        <GitBranch size={16} />
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Teaser for Next Games */}
          <div className="game-teaser-card">
            <div className="game-teaser-icon">
              <Gamepad2 size={26} />
            </div>
            <h4>More 3D Web Games in Development</h4>
            <p>
              New interactive simulations and browser arcade experiments are currently being engineered using Three.js and WebGL. Have an exciting game concept? Let's connect!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
