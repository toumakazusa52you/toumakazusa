import React from 'react';

interface LanternProps {
  size?: number;
  opacity?: number;
  className?: string;
}

const Lantern: React.FC<LanternProps> = ({ size = 100, opacity = 1, className }) => {
  const scale = size / 100;
  
  return (
    <svg
      width={size}
      height={size * 1.2}
      viewBox="0 0 100 120"
      className={className}
      style={{ opacity }}
    >
      <defs>
        <linearGradient id="lanternGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff4d4d" />
          <stop offset="100%" stopColor="#cc0000" />
        </linearGradient>
        <linearGradient id="tasselGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#cc0000" />
          <stop offset="100%" stopColor="#8b0000" />
        </linearGradient>
      </defs>
      
      <g transform={`scale(${scale})`}>
        <g transform="translate(50, 40)">
          <ellipse cx="0" cy="0" rx="35" ry="42" fill="url(#lanternGradient)" />
          
          <ellipse cx="0" cy="0" rx="30" ry="36" fill="none" stroke="rgba(255, 204, 0, 0.6)" strokeWidth="2" />
          
          <circle cx="0" cy="0" r="12" fill="rgba(255, 204, 0, 0.2)" />
          <rect x="-4" y="-4" width="8" height="8" fill="none" stroke="rgba(255, 204, 0, 0.6)" strokeWidth="1.5" rx="1" />
          
          <text x="0" y="5" textAnchor="middle" fill="#ffcc00" fontSize="16" fontWeight="bold" style={{ textShadow: '0 0 10px rgba(255, 204, 0, 0.5)' }}>
            福
          </text>
          
          <line x1="0" y1="-42" x2="0" y2="-55" stroke="#cc0000" strokeWidth="2" />
          
          <circle cx="0" cy="-55" r="8" fill="#ffffff" />
          <circle cx="0" cy="-55" r="3" fill="#cc0000" />
          
          <line x1="0" y1="42" x2="0" y2="100" stroke="url(#tasselGradient)" strokeWidth="2" />
          <line x1="-2" y1="42" x2="-2" y2="100" stroke="url(#tasselGradient)" strokeWidth="1" />
          <line x1="2" y1="42" x2="2" y2="100" stroke="url(#tasselGradient)" strokeWidth="1" />
        </g>
      </g>
    </svg>
  );
};

export default Lantern;
