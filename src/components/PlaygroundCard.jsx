import React, { useState } from 'react';
import './PlaygroundCard.css';

export default function PlaygroundCard({ title, category, children }) {
  const [isHovered, setIsHovered] = useState(false);

  // We map over the children to inject the isHovered prop so the components 
  // know when to start their animations or interactions.
  const animatedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { isHovered });
    }
    return child;
  });

  return (
    <div 
      className="playground-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="playground-content">
        {animatedChildren}
      </div>
      <div className="playground-info">
        <h3>{title}</h3>
        <p>{category}</p>
      </div>
    </div>
  );
}
