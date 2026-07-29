import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import FloatingShapes from './FloatingShapes';

export default function Scene() {
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
      {/* Loading Spinner */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-in-out ${isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="w-12 h-12 border-4 border-brand-indigo/20 border-t-brand-indigo rounded-full animate-spin"></div>
      </div>

      {/* 3D Canvas */}
      <div className={`w-full h-full absolute inset-0 transition-opacity duration-1000 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Canvas
          onCreated={() => setIsLoaded(true)}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 10], fov: 45 }}
        style={{ width: '100%', height: '100%' }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#4338CA" />
        
        <Environment preset="city" />

        <FloatingShapes />
        </Canvas>
      </div>
    </div>
  );
}
