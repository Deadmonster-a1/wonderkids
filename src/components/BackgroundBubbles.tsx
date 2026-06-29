import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export default function BackgroundBubbles() {
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      // Get mouse position relative to window center
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Stronger trailing physics
  const springConfig = { stiffness: 40, damping: 25, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  
  const springConfigSlow = { stiffness: 20, damping: 40, mass: 2 };
  const smoothXSlow = useSpring(mouseX, springConfigSlow);
  const smoothYSlow = useSpring(mouseY, springConfigSlow);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div 
        className="absolute w-[600px] h-[600px] bg-primary/10 rounded-[40%_60%_70%_30%] blur-[80px] mix-blend-multiply top-1/2 left-1/2"
        style={{ x: smoothXSlow, y: smoothYSlow, marginLeft: '-300px', marginTop: '-300px' }}
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      
      <motion.div 
        className="absolute w-[400px] h-[400px] bg-secondary/15 rounded-full blur-[60px] mix-blend-multiply top-1/2 left-1/2"
        style={{ x: smoothX, y: smoothY, marginLeft: '-200px', marginTop: '-200px' }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div 
        className="absolute w-[500px] h-[500px] bg-tertiary/10 rounded-[60%_40%_30%_70%] blur-[100px] mix-blend-multiply top-1/4 left-1/4"
        animate={{ 
          x: [0, 100, -50, 0], 
          y: [0, -100, 50, 0],
          rotate: -360
        }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
