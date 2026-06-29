import React from 'react';

interface WaveDividerProps {
  color?: string;
  flip?: boolean;
  className?: string;
  height?: number;
}

export default function WaveDivider({ color = '#ffffff', flip = false, className = '', height = 60 }: WaveDividerProps) {
  return (
    <div
      className={`w-full overflow-hidden leading-[0] pointer-events-none ${className}`}
      style={{ transform: flip ? 'scaleY(-1)' : 'none', height }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 60"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: '100%' }}
      >
        <path
          d="M0,32 C180,80 360,-10 540,32 C720,74 900,-10 1080,28 C1200,48 1320,12 1440,32 L1440,60 L0,60 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
