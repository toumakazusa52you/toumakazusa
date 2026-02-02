import React from 'react';

interface FireworkProps {
  size?: number;
  rays?: number;
  rayLength?: number;
  className?: string;
}

const Firework: React.FC<FireworkProps> = ({ 
  size = 100, 
  rays = 12, 
  rayLength = 50,
  className 
}) => {
  const scale = size / 100;
  const angleStep = 360 / rays;
  
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
    >
      <defs>
        <radialGradient id="fireworkGlow">
          <stop offset="0%" stopColor="#ffcc00" stopOpacity="1" />
          <stop offset="100%" stopColor="#ffcc00" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="rayGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffcc00" stopOpacity="1" />
          <stop offset="100%" stopColor="#ffcc00" stopOpacity="0" />
        </linearGradient>
      </defs>
      
      <g transform={`scale(${scale}) translate(50, 50)`}>
        <circle cx="0" cy="0" r="6" fill="#ffcc00" style={{ filter: 'drop-shadow(0 0 10px #ffcc00) drop-shadow(0 0 20px #ffcc00)' }} />
        
        {Array.from({ length: rays }).map((_, i) => {
          const angle = (i * angleStep * Math.PI) / 180;
          const x2 = Math.sin(angle) * rayLength;
          const y2 = -Math.cos(angle) * rayLength;
          
          return (
            <line
              key={i}
              x1="0"
              y1="0"
              x2={x2}
              y2={y2}
              stroke="url(#rayGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.8"
            />
          );
        })}
      </g>
    </svg>
  );
};

export default Firework;
