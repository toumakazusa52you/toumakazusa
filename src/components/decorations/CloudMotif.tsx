import React from 'react';

interface CloudMotifProps {
  size?: number;
  className?: string;
}

const CloudMotif: React.FC<CloudMotifProps> = ({ size = 60, className }) => {
  const scale = size / 60;
  
  return (
    <svg
      width={size}
      height={size * 0.5}
      viewBox="0 0 60 30"
      className={className}
    >
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffd700" />
          <stop offset="100%" stopColor="#daa520" />
        </linearGradient>
      </defs>
      
      <g transform={`scale(${scale})`}>
        <path
          d="M 10 20 Q 5 15 10 10 Q 15 5 25 10 Q 30 5 35 10 Q 40 5 45 10 Q 50 5 50 15 Q 55 20 50 25 Q 45 30 35 25 Q 30 30 25 25 Q 20 30 15 25 Q 10 30 5 25 Q 0 20 5 15 Q 0 10 10 10"
          fill="none"
          stroke="url(#goldGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        <circle cx="20" cy="12" r="8" fill="none" stroke="url(#goldGradient)" strokeWidth="2" />
        <circle cx="40" cy="12" r="6" fill="none" stroke="url(#goldGradient)" strokeWidth="2" />
      </g>
    </svg>
  );
};

export default CloudMotif;
