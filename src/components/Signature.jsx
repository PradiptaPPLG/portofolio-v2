import React from 'react';
import { motion, useTransform, useSpring } from 'framer-motion';

export default function Signature({ color = '#d2ff00', className = '', strokeWidth = 5, progress }) {
  // 1st stroke: from 0.15 to 0.35
  const path1 = useTransform(progress, [0.15, 0.35], [0, 1]);
  // 2nd stroke: from 0.35 to 0.55
  const path2 = useTransform(progress, [0.35, 0.55], [0, 1]);
  // 3rd stroke: from 0.55 to 0.65
  const path3 = useTransform(progress, [0.55, 0.65], [0, 1]);

  const springConfig = { stiffness: 100, damping: 20, bounce: 0 };
  const smooth1 = useSpring(path1, springConfig);
  const smooth2 = useSpring(path2, springConfig);
  const smooth3 = useSpring(path3, springConfig);

  const svgOpacity = useTransform(progress, [0.14, 0.15], [0, 1]);

  return (
    <motion.svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 500 500"
      className={className}
      style={{ width: '100%', height: 'auto', overflow: 'visible', opacity: svgOpacity }}
    >
      <defs>
        <linearGradient id="cosmicGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="50%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#d946ef" />
        </linearGradient>
      </defs>
      <motion.path
        d="M204.12,94.69c-17.94,49-34.4,90.38-47.57,122.33-16.59,40.26-39.65,95.9-74.56,166.38-10.89,21.97-20.27,40.04-26.85,52.49"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ pathLength: smooth1 }}
      />
      <motion.path
        d="M78.39,257.8c8.35-17.3,36.37-69.6,96.5-93.15,47.06-18.43,115.34-19.87,127.78,6.5,14.22,30.14-44.65,96.32-100.25,118.94,0,0-39.22,19.97-112.52,20.39-.31,0-.47,0-.47,0,0,.01,26.63-3.22,125.73-15.29-14.16,7.08-28.32,14.16-42.48,21.24,20.67-6.51,41.34-13.03,62.02-19.54-9.91,7.08-19.82,14.16-29.73,21.24,16.14-6.23,32.28-12.46,48.42-18.69-4.53,6.23-9.06,12.46-13.59,18.69,26.91-15.44,34.09-18.1,34.83-16.99,1.28,1.91-16.35,15.57-15.29,16.99,1.34,1.8,30.41-19.32,33.13-16.14,2.32,2.72-16.37,21.03-14.44,23.15,2.47,2.73,35.79-24.96,38.23-22.3,1.9,2.07-17.19,20.15-15.29,22.59,2.79,3.58,49.74-27.86,112.99-72.71-58.34,31.43-116.67,62.87-175.01,94.3,38.23-13.03,76.46-26.05,114.69-39.08-17.84,11.04-35.68,22.09-53.52,33.13,11.25-4.28,22.49-8.57,33.74-12.85,12.54-4.78,25.08-9.56,37.62-14.33-10.48,8.5-20.96,16.99-31.43,25.49-.09-7.62-.18-15.23-.27-22.85,9.72,4.22,19.44,8.44,29.15,12.66"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ pathLength: smooth2 }}
      />
      <motion.path
        d="M1.08,409.02c62.99-19.44,131.93-37.8,206.44-53.52,105.44-22.24,203.41-35.28,291.39-42.48"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ pathLength: smooth3 }}
      />
    </motion.svg>
  );
}
