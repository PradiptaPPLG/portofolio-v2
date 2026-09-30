import React, { useState, useEffect, useRef } from 'react';

const Magnet = ({ children, padding = 50, disabled = false, magnetStrength = 2, isHovered = false }) => {
    const [isActive, setIsActive] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const magnetRef = useRef(null);

    useEffect(() => {
        // Only engage the magnet logic if the wrapper component is hovered
        if (disabled || !isHovered) {
            setIsActive(false);
            setPosition({ x: 0, y: 0 });
            return;
        }

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const boundingBox = magnetRef.current?.getBoundingClientRect();
            if (!boundingBox) return;

            const centerX = boundingBox.left + boundingBox.width / 2;
            const centerY = boundingBox.top + boundingBox.height / 2;

            const distX = Math.abs(clientX - centerX);
            const distY = Math.abs(clientY - centerY);

            if (distX < boundingBox.width / 2 + padding && distY < boundingBox.height / 2 + padding) {
                setIsActive(true);
                const offsetX = (clientX - centerX) / magnetStrength;
                const offsetY = (clientY - centerY) / magnetStrength;
                setPosition({ x: offsetX, y: offsetY });
            } else {
                setIsActive(false);
                setPosition({ x: 0, y: 0 });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [padding, disabled, magnetStrength, isHovered]);

    const transitionStyle = isActive ? 'transform 0.1s ease-out' : 'transform 0.5s ease-in-out';

    return (
        <div
            ref={magnetRef}
            style={{
                transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
                transition: transitionStyle,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem 2rem',
                background: 'rgba(204, 255, 0, 0.1)',
                color: '#ccff00',
                borderRadius: '8px',
                border: '1px solid rgba(204, 255, 0, 0.2)',
                fontSize: '1.2rem',
                fontWeight: 600,
                cursor: 'pointer'
            }}
        >
            {children}
        </div>
    );
};

export default Magnet;
