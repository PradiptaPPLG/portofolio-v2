import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './StrokeText.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const DEFAULT_TEXT = 'Draw Attention';

const StrokeText = ({
  text = DEFAULT_TEXT,
  strokeColor = '#A78BFA',
  fillColor = '#F8FAFC',
  strokeWidth = 1.4,
  drawDuration = 1.6,
  fillDelay = 0.2,
  stagger = 0.05,
  ease = 'power2.out',
  trigger = 'mount',
  fillMode = 'wipe',
  fontSize = 128,
  fontWeight = 800,
  letterSpacing = -4,
  reverse = false,
  className = '',
  style = {}
}) => {
  const rootRef = useRef(null);
  const wipeRectRef = useRef(null);
  const [rawId] = useState(() => Math.random().toString(36).substring(2, 9));
  const wipeId = `stroke-text-wipe-${rawId}`;

  const characters = useMemo(() => Array.from(String(text ?? '')), [text]);
  const dash = 1000; // Large enough dash for any font size

  useEffect(() => {
    const root = rootRef.current;
    if (typeof window === 'undefined' || !root) return undefined;

    const strokes = gsap.utils.toArray(root.querySelectorAll('[data-stroke-char]'));
    const fills = gsap.utils.toArray(root.querySelectorAll('[data-fill-char]'));
    const wipe = wipeRectRef.current;
    if (!strokes.length) return undefined;

    const fillEnabled = fillMode !== 'none';
    const useWipe = fillEnabled && fillMode === 'wipe';
    const fillDuration = Math.max(0.4, drawDuration * 0.5);
    const staggerConfig = reverse ? { each: stagger, from: 'end' } : stagger;
    const targets = [...strokes, ...fills, wipe].filter(Boolean);

    const setStart = () => {
      gsap.killTweensOf(targets);
      gsap.set(strokes, { strokeDasharray: dash, strokeDashoffset: dash });
      gsap.set(fills, { opacity: useWipe ? 1 : 0 });
      if (wipe) gsap.set(wipe, { attr: { width: 0 } });
    };

    const setEnd = () => {
      gsap.killTweensOf(targets);
      gsap.set(strokes, { strokeDasharray: dash, strokeDashoffset: 0 });
      gsap.set(fills, { opacity: fillEnabled ? 1 : 0 });
      if (wipe) gsap.set(wipe, { attr: { width: 1 } }); // objectBoundingBox max is 1
    };

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setEnd();
      return () => gsap.killTweensOf(targets);
    }

    const build = () => {
      setStart();
      const tl = gsap.timeline({
        paused: true,
        repeat: trigger === 'loop' ? -1 : 0,
        repeatDelay: trigger === 'loop' ? 0.9 : 0,
        defaults: { overwrite: 'auto' }
      });

      tl.to(strokes, { strokeDashoffset: 0, duration: drawDuration, ease, stagger: staggerConfig }, 0);

      if (useWipe && wipe) {
        tl.to(
          wipe,
          { attr: { width: 1 }, duration: fillDuration, ease: 'power2.inOut' },
          drawDuration + fillDelay
        );
      } else if (fillEnabled) {
        tl.to(
          fills,
          { opacity: 1, duration: fillDuration, ease: 'power2.out', stagger: staggerConfig },
          drawDuration + fillDelay
        );
      }

      return tl;
    };

    let timeline = null;
    let scrollTrigger = null;
    let removeHover = null;

    if (trigger === 'hover') {
      setEnd();
      const play = () => {
        timeline?.kill();
        timeline = build();
        timeline.play(0);
      };
      root.addEventListener('pointerenter', play);
      removeHover = () => root.removeEventListener('pointerenter', play);
    } else {
      timeline = build();
      if (trigger === 'scroll') {
        scrollTrigger = ScrollTrigger.create({
          trigger: root,
          start: 'top 82%',
          once: true,
          onEnter: () => timeline?.play(0)
        });
      } else {
        timeline.play(0);
      }
    }

    return () => {
      removeHover?.();
      scrollTrigger?.kill();
      timeline?.kill();
      gsap.killTweensOf(targets);
    };
  }, [dash, drawDuration, fillDelay, stagger, ease, trigger, fillMode, reverse]);

  return (
    <span
      ref={rootRef}
      className={`stroke-text ${trigger === 'hover' ? 'stroke-text--hover' : ''} ${className}`.trim()}
      style={{ 
        ...style,
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        whiteSpace: 'nowrap',
        lineHeight: 1
      }}
      role="img"
      aria-label={String(text ?? '')}
    >
      {/* Invisible HTML text to force the container to the EXACT correct size without JS measurement */}
      <span style={{
        opacity: 0,
        pointerEvents: 'none',
        fontSize: fontSize ? `${fontSize}px` : undefined,
        fontWeight,
        letterSpacing: letterSpacing ? `${letterSpacing}px` : undefined
      }}>
        {text}
      </span>

      <svg 
        className="stroke-text__svg" 
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          overflow: 'visible'
        }}
        aria-hidden="true"
      >
        {fillMode === 'wipe' && (
          <defs>
            <clipPath id={wipeId} clipPathUnits="objectBoundingBox">
              <rect ref={wipeRectRef} x="0" y="-0.5" width="0" height="2" />
            </clipPath>
          </defs>
        )}

        <text
          className="stroke-text__stroke"
          x="50%"
          y="50%"
          dominantBaseline="central"
          textAnchor="middle"
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          strokeLinecap="round"
          style={{
            fontSize: fontSize ? `${fontSize}px` : undefined,
            fontWeight,
            letterSpacing: letterSpacing ? `${letterSpacing}px` : undefined
          }}
        >
          {characters.map((char, index) => (
            <tspan data-stroke-char key={`s-${index}`}>
              {char}
            </tspan>
          ))}
        </text>

        <text
          className="stroke-text__fill"
          x="50%"
          y="50%"
          dominantBaseline="central"
          textAnchor="middle"
          fill={fillColor}
          stroke="none"
          style={{
            fontSize: fontSize ? `${fontSize}px` : undefined,
            fontWeight,
            letterSpacing: letterSpacing ? `${letterSpacing}px` : undefined
          }}
          clipPath={fillMode === 'wipe' ? `url(#${wipeId})` : undefined}
        >
          {characters.map((char, index) => (
            <tspan data-fill-char key={`f-${index}`}>
              {char}
            </tspan>
          ))}
        </text>
      </svg>
    </span>
  );
};

export default StrokeText;
