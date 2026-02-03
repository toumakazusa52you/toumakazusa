import React from 'react';

interface GoldCoinProps {
  size?: number;
  className?: string;
}

const GoldCoin: React.FC<GoldCoinProps> = ({ size = 40, className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      className={className}
    >
      <defs>
        <radialGradient id="coinGradient">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#FFA500" />
          <stop offset="100%" stopColor="#FF8C00" />
        </radialGradient>
      </defs>

      <circle cx="20" cy="20" r="18" fill="url(#coinGradient)" stroke="#8B4513" strokeWidth="1" />
      <circle cx="20" cy="20" r="14" fill="none" stroke="#FFD700" strokeWidth="1.5" />
      <rect x="16" y="16" width="8" height="8" fill="none" stroke="#FFD700" strokeWidth="1.5" rx="1" />
    </svg>
  );
};

export default GoldCoin;
