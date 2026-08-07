import React from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  stiffness?: number;
  damping?: number;
  maxRotation?: number;
  scale?: number;
}

export default function TiltCard({
  children,
  className = '',
}: TiltCardProps) {
  return (
    <div className={`relative premium-card-hover ${className}`}>
      {children}
    </div>
  );
}
