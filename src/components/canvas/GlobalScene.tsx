import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, ChromaticAberration, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

const OrganicShape = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2.5, 4]} />
        <meshPhysicalMaterial 
          color="#4338CA"
          wireframe={true}
          transparent={true}
          opacity={0.15}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

const Particles = () => {
  const count = 250;
  const mesh = useRef<THREE.InstancedMesh>(null);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 40;
      const y = (Math.random() - 0.5) * 40;
      const z = (Math.random() - 0.5) * 40;
      temp.push({ x, y, z, speed: 0.01 + Math.random() * 0.02 });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      dummy.position.set(
        particle.x + Math.sin(state.clock.elapsedTime * particle.speed + i) * 2, 
        particle.y + Math.cos(state.clock.elapsedTime * particle.speed + i) * 2, 
        particle.z
      );
      dummy.rotation.x += particle.speed * 0.1;
      dummy.rotation.y += particle.speed * 0.1;
      dummy.updateMatrix();
      if (mesh.current) {
        mesh.current.setMatrixAt(i, dummy.matrix);
      }
    });
    if (mesh.current) {
      mesh.current.instanceMatrix.needsUpdate = true;
      mesh.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[0.08, 0]} />
      <meshBasicMaterial color="#38BDF8" transparent opacity={0.6} />
    </instancedMesh>
  );
};

export default function GlobalScene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas 
        camera={{ fov: 45, position: [0, 0, 10] }} 
        gl={{ 
          antialias: false, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={2.5} color="#4338CA" />
        <directionalLight position={[-10, -10, -5]} intensity={2} color="#38BDF8" />
        
        <OrganicShape />
        <Particles />
        
        <EffectComposer multisampling={0}>
          <Bloom 
            luminanceThreshold={0.1} 
            luminanceSmoothing={0.9} 
            intensity={2.0} 
            mipmapBlur 
          />
          <ChromaticAberration 
            offset={new THREE.Vector2(0.0015, 0.0015)} 
          />
          <Vignette offset={0.3} darkness={1.1} />
          <Noise opacity={0.03} blendFunction={BlendFunction.ADD} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
