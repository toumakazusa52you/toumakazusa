import React from 'react';

interface BrocadeTextureProps {
  className?: string;
}

const BrocadeTexture: React.FC<BrocadeTextureProps> = ({ className }) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 200 400"
      className={className}
      preserveAspectRatio="none"
    >
      <defs>
        <pattern id="brocadePattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
          <g opacity="0.15">
            <path
              d="M 25 25 Q 35 15 45 25 Q 35 35 25 25"
              fill="none"
              stroke="#8b0000"
              strokeWidth="1"
            />
            <path
              d="M 25 25 Q 15 35 5 25 Q 15 15 25 25"
              fill="none"
              stroke="#8b0000"
              strokeWidth="1"
            />
            <path
              d="M 25 25 Q 35 35 25 45 Q 15 35 25 25"
              fill="none"
              stroke="#8b0000"
              strokeWidth="1"
            />
            <path
              d="M 25 25 Q 15 15 25 5 Q 35 15 25 25"
              fill="none"
              stroke="#8b0000"
              strokeWidth="1"
            />
            
            <circle cx="25" cy="25" r="8" fill="none" stroke="#8b0000" strokeWidth="1" />
            <circle cx="25" cy="25" r="4" fill="#8b0000" opacity="0.3" />
          </g>
        </pattern>
      </defs>
      
      <rect width="100%" height="100%" fill="url(#brocadePattern)" />
      
      <g opacity="0.1">
        <path
          d="M 100 50 Q 120 100 100 150 Q 80 100 100 50"
          fill="none"
          stroke="#8b0000"
          strokeWidth="1"
        />
        <path
          d="M 100 150 Q 120 200 100 250 Q 80 200 100 150"
          fill="none"
          stroke="#8b0000"
          strokeWidth="1"
        />
        <path
          d="M 100 250 Q 120 300 100 350 Q 80 300 100 250"
          fill="none"
          stroke="#8b0000"
          strokeWidth="1"
        />
      </g>
    </svg>
  );
};

export default BrocadeTexture;
