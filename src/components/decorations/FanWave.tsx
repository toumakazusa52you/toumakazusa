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
          <stop offset="0%" stopColor="#8B0000" />
          <stop offset="100%" stopColor="#5B0000" />
        </linearGradient>
        <linearGradient id="fanGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7B0000" />
          <stop offset="100%" stopColor="#4B0000" />
        </linearGradient>
        <linearGradient id="fanGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6B0000" />
          <stop offset="100%" stopColor="#3B0000" />
        </linearGradient>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#FFA500" />
          <stop offset="100%" stopColor="#FFD700" />
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
              opacity="0.95"
              stroke="url(#goldGradient)"
              strokeWidth="2"
            />

            <line
              x1={x}
              y1={y}
              x2={x}
              y2={y - radius}
              stroke="url(#goldGradient)"
              strokeWidth="1.5"
              opacity="0.6"
            />

            <path
              d={`M ${x - radius * 0.7} ${y - radius * 0.7}
                  Q ${x} ${y - radius * 0.85} ${x + radius * 0.7} ${y - radius * 0.7}`}
              fill="none"
              stroke="url(#goldGradient)"
              strokeWidth="1"
              opacity="0.8"
            />
          </g>
        );
      })}
    </svg>
  );
};

export default FanWave;
