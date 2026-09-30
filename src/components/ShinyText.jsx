import React from 'react';
import './ShinyText.css';

const ShinyText = ({ text, disabled = false, speed = 3, className = '', isHovered = false }) => {
  // Use isHovered to control the animation. If disabled, it never animates.
  const shouldAnimate = !disabled && isHovered;

  return (
    <div
      className={`shiny-text ${shouldAnimate ? 'animating' : ''} ${className}`}
      style={{ '--shiny-speed': `${speed}s`, fontSize: '4rem', fontWeight: 800, textAlign: 'center' }}
    >
      {text}
    </div>
  );
};

export default ShinyText;
