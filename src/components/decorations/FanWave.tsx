import React from 'react';

interface FanWaveProps {
  className?: string;
}

const FanWave: React.FC<FanWaveProps> = ({ className }) => {
  return (
    <svg
      width="100%"
      height="150"
      viewBox="0 0 800 150"
      className={className}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="fanGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#cc0000" />
          <stop offset="100%" stopColor="#990000" />
        </linearGradient>
        <linearGradient id="fanGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#b30000" />
          <stop offset="100%" stopColor="#800000" />
        </linearGradient>
        <linearGradient id="fanGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#990000" />
          <stop offset="100%" stopColor="#660000" />
        </linearGradient>
      </defs>
      
      {Array.from({ length: 20 }).map((_, i) => {
        const x = i * 40 + 20;
        const y = 150;
        const radius = 35 + (i % 3) * 5;
        const gradientIndex = i % 3;
        const gradientId = `fanGradient${gradientIndex + 1}`;
        
        return (
          <g key={i}>
            <path
              d={`M ${x} ${y} 
                  Q ${x - radius * 0.7} ${y - radius * 0.7} ${x} ${y - radius}
                  Q ${x + radius * 0.7} ${y - radius * 0.7} ${x} ${y}`}
              fill={`url(#${gradientId})`}
              opacity="0.9"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="1"
            />
            
            <line
              x1={x}
              y1={y}
              x2={x}
              y2={y - radius}
              stroke="rgba(0, 0, 0, 0.2)"
              strokeWidth="1"
            />
            
            <path
              d={`M ${x - radius * 0.7} ${y - radius * 0.7} 
                  Q ${x} ${y - radius * 0.85} ${x + radius * 0.7} ${y - radius * 0.7}`}
              fill="none"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="1"
            />
          </g>
        );
      })}
    </svg>
  );
};

export default FanWave;
