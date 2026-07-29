import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';

// --- Cute Face Component ---
function KawaiiFace({ position = [0, 0, 0.16], scale = 1, color = "#1e293b", rotation = [0, 0, 0], interactive = false, isHovered = false }: any) {
  const groupRef = useRef<THREE.Group>(null);
  const eyesRef = useRef<THREE.Group>(null);
  const smileRef = useRef<THREE.Mesh>(null);
  const surprisedRef = useRef<THREE.Mesh>(null);
  const happyEyesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    // Blinking logic
    if (eyesRef.current) {
      const time = state.clock.elapsedTime;
      const blink = Math.sin(time * 3) > 0.98 ? 0.05 : 1;
      eyesRef.current.scale.y = THREE.MathUtils.lerp(eyesRef.current.scale.y, blink, 0.4);
    }

    // Mouse Tracking & Expression
    if (interactive && groupRef.current) {
      // SLIDE the face instead of rotating it to prevent it from clipping/floating off the 3D surface
      const targetX = state.pointer.x * 0.1;
      const targetY = state.pointer.y * 0.1;
      
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.15);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.15);

      if (smileRef.current && surprisedRef.current) {
        smileRef.current.visible = true;
        surprisedRef.current.visible = false;
      }
      
      if (eyesRef.current && happyEyesRef.current) {
        eyesRef.current.visible = !isHovered;
        happyEyesRef.current.visible = isHovered;
      }
    }
  });

  return (
    <group position={position} scale={scale} rotation={rotation} ref={groupRef}>
      {/* Eyebrows */}
      <group position={[0, 0.19, 0]}>
        {/* Left Eyebrow: Horizontal and slightly tilted for a cute expression */}
        <mesh position={[-0.23, 0, 0]} rotation={[0, 0, Math.PI / 2 + 0.15]}>
          <capsuleGeometry args={[0.02, 0.06, 8, 8]} />
          <meshBasicMaterial color={color} />
        </mesh>
        {/* Right Eyebrow */}
        <mesh position={[0.23, 0, 0]} rotation={[0, 0, Math.PI / 2 - 0.15]}>
          <capsuleGeometry args={[0.02, 0.06, 8, 8]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </group>

      {/* Normal Eyes */}
      <group ref={eyesRef}>
        <mesh position={[-0.25, 0.1, 0]}>
          <capsuleGeometry args={[0.05, 0.08, 16, 16]} />
          <meshBasicMaterial color={color} />
        </mesh>
        <mesh position={[0.25, 0.1, 0]}>
          <capsuleGeometry args={[0.05, 0.08, 16, 16]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </group>
      {/* Happy ^ ^ Eyes (visible on hover) */}
      <group ref={happyEyesRef} visible={false}>
        <mesh position={[-0.25, 0.1, 0]} rotation={[0, 0, Math.PI / 4]}>
          <capsuleGeometry args={[0.03, 0.08, 16, 16]} />
          <meshBasicMaterial color={color} />
        </mesh>
        <mesh position={[-0.25, 0.1, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <capsuleGeometry args={[0.03, 0.08, 16, 16]} />
          <meshBasicMaterial color={color} />
        </mesh>
        <mesh position={[0.25, 0.1, 0]} rotation={[0, 0, Math.PI / 4]}>
          <capsuleGeometry args={[0.03, 0.08, 16, 16]} />
          <meshBasicMaterial color={color} />
        </mesh>
        <mesh position={[0.25, 0.1, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <capsuleGeometry args={[0.03, 0.08, 16, 16]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </group>

      {/* Open Smile (D-shape) */}
      <mesh ref={smileRef} position={[0, -0.02, 0]} rotation={[0, 0, Math.PI]}>
        {/* radius, segments, thetaStart, thetaLength */}
        <circleGeometry args={[0.09, 32, 0, Math.PI]} />
        <meshBasicMaterial color={color} />
      </mesh>
      
      {/* Surprised / Oval Mouth */}
      <mesh ref={surprisedRef} position={[0, -0.06, 0]} visible={false} scale={[0.8, 1.2, 1]}>
        <circleGeometry args={[0.06, 32]} />
        <meshBasicMaterial color={color} />
      </mesh>
      
      {/* Rosy Cheeks */}
      <mesh position={[-0.4, -0.02, -0.01]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color="#f43f5e" transparent opacity={0.6} />
      </mesh>
      <mesh position={[0.4, -0.02, -0.01]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color="#f43f5e" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

// --- Cartoon Star ---
export function CartoonStar({ position, color = "#FFD700", scale = 1, rotation = [0, 0, 0], hopSpeed = 2 }: any) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = React.useState(false);
  const [bounceOffset, setBounceOffset] = React.useState(0);
  
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const innerRadius = 0.4;
    const outerRadius = 1;
    const points = 5;

    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i / (points * 2)) * Math.PI * 2 + Math.PI / 2;
      if (i === 0) {
        shape.moveTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
      } else {
        shape.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
      }
    }
    shape.closePath();

    const extrudeSettings = {
      depth: 0.3,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.1,
      bevelThickness: 0.15,
    };
    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geo.center(); 
    return geo;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      const targetScale = hovered ? scale * 1.2 : scale;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);

      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2 + rotation[1];
      groupRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.3) * 0.1 + rotation[2];
      // Cute bobbing/hopping motion + bounce offset
      if (bounceOffset > 0) {
        setBounceOffset(prev => Math.max(0, prev - 0.05));
      }
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * hopSpeed) * 0.15 + bounceOffset;
      // Extra spin on click
      if (bounceOffset > 0) groupRef.current.rotation.y += bounceOffset * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1} position={[position[0], 0, position[2]]}>
      <group 
        ref={groupRef} 
        position={[0, position[1], 0]} 
        scale={scale} 
        rotation={rotation}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e) => { setHovered(false); document.body.style.cursor = 'auto'; }}
        onClick={(e) => { e.stopPropagation(); setBounceOffset(1); }}
      >
        <mesh geometry={geometry} castShadow receiveShadow>
          <meshStandardMaterial color={color} roughness={0.2} metalness={0.1} />
        </mesh>
        <KawaiiFace position={[0, -0.05, 0.155]} interactive={true} isHovered={hovered} />
      </group>
    </Float>
  );
}

// --- Cartoon Moon ---
export function CartoonMoon({ position, color = "#FEF08A", scale = 1, rotation = [0, 0, 0] }: any) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = React.useState(false);
  const [bounceOffset, setBounceOffset] = React.useState(0);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle rocking motion combined with hover scale
      const targetScale = hovered ? scale * 1.1 : scale;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      
      if (bounceOffset > 0) {
        setBounceOffset(prev => Math.max(0, prev - 0.05));
      }
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.1 + rotation[0] + bounceOffset;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.15;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1.2} position={position}>
      <group 
        ref={groupRef} 
        scale={scale} 
        rotation={rotation}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e) => { setHovered(false); document.body.style.cursor = 'auto'; }}
        onClick={(e) => { e.stopPropagation(); setBounceOffset(1); }}
      >
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color={color} roughness={0.1} metalness={0.2} />
        </mesh>
        {/* Face placed perfectly on the surface of the sphere (radius 1) */}
        <KawaiiFace position={[0, 0, 1.01]} rotation={[0, 0, 0]} interactive={true} isHovered={hovered} />
      </group>
    </Float>
  );
}

// --- Cartoon Cloud ---
export function CartoonCloud({ position, color = "#FFFFFF", scale = 1 }: any) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 1.5) * 0.002;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.5} position={position}>
      <group ref={groupRef} scale={scale}>
        <mesh position={[0, 0, 0]} receiveShadow>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial color={color} roughness={0.8} metalness={0} />
        </mesh>
        <mesh position={[-0.4, -0.1, 0.1]} receiveShadow>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshStandardMaterial color={color} roughness={0.8} metalness={0} />
        </mesh>
        <mesh position={[0.4, -0.15, -0.1]} receiveShadow>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color={color} roughness={0.8} metalness={0} />
        </mesh>
        <mesh position={[-0.2, 0.2, -0.15]} receiveShadow>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshStandardMaterial color={color} roughness={0.8} metalness={0} />
        </mesh>
        <mesh position={[0.2, 0.15, 0.1]} receiveShadow>
          <sphereGeometry args={[0.45, 16, 16]} />
          <meshStandardMaterial color={color} roughness={0.8} metalness={0} />
        </mesh>
      </group>
    </Float>
  );
}

export default function KidsToysScene() {
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <div className="w-full h-full min-h-[400px] lg:min-h-[600px] relative">
      {/* Loading Spinner */}
      <div 
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-in-out ${isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <div className="w-12 h-12 border-4 border-brand-indigo/20 border-t-brand-indigo rounded-full animate-spin drop-shadow-md"></div>
      </div>

      {/* 3D Canvas */}
      <div className={`w-full h-full absolute inset-0 transition-opacity duration-1000 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Canvas 
          onCreated={() => setIsLoaded(true)}
        dpr={[1, 1.5]} 
        shadows 
        camera={{ position: [0, 2, 9], fov: 45 }} 
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow shadow-mapSize={1024} shadow-bias={-0.0001} />
        <directionalLight position={[-5, -10, -5]} intensity={0.4} color="#818CF8" />
        
        <ambientLight intensity={1.5} />

        <PresentationControls 
          global 
          rotation={[0, 0, 0]} 
          polar={[-Math.PI / 4, Math.PI / 4]} 
          azimuth={[-Math.PI / 2, Math.PI / 2]}
        >
          <group position={[0, -0.5, 0]}>
            {/* Center Moon */}
            <CartoonMoon position={[0, 0.2, 0]} color="#FDE047" scale={1.6} rotation={[0, 0.2, 0]} />
            
            {/* Surrounding Stars (Spaced out for better composition) */}
            <CartoonStar position={[-2.4, 1.8, 0.5]} color="#FDBA74" scale={0.45} rotation={[0.1, 0.3, -0.2]} hopSpeed={2.5} />
            <CartoonStar position={[2.6, 1.4, -0.8]} color="#38BDF8" scale={0.35} rotation={[-0.2, -0.4, 0.2]} hopSpeed={3.2} />
            <CartoonStar position={[-2.2, -0.3, -1.2]} color="#F472B6" scale={0.25} rotation={[0, 0.2, 0.4]} hopSpeed={1.8} />

            {/* Fluffy Clouds (Pushed to corners to frame the scene) */}
            <CartoonCloud position={[-2.5, -1.2, 1.2]} scale={1.1} color="#FFFFFF" />
            <CartoonCloud position={[2.4, -0.8, -1.5]} scale={1.4} color="#F8FAFC" />
            <CartoonCloud position={[0, -1.5, 1.8]} scale={0.8} color="#F1F5F9" />
          </group>
        </PresentationControls>
        
        <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={15} blur={2.5} far={4} color="#1E1B4B" resolution={256} frames={1} />
        </Canvas>
      </div>
    </div>
  );
}
