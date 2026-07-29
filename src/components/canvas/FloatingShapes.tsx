import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { CartoonStar, CartoonCloud } from './KidsToysScene';
import * as THREE from 'three';

export default function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>

      <CartoonStar position={[5, -1, -3]} scale={0.8} color="#FDE047" rotation={[0.2, 0.5, 0]} />
      <CartoonStar position={[0, -3, 2]} scale={0.5} color="#A78BFA" rotation={[-0.1, 0.2, -0.4]} />
      <CartoonCloud position={[4, 3, -6]} scale={1.5} color="#F8FAFC" />
    </group>
  );
}
