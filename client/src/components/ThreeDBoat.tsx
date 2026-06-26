import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

function BoatModel() {
  const groupRef = useRef<THREE.Group>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      // Gentle rotation
      groupRef.current.rotation.y += 0.003;
      
      // Mouse-reactive tilt
      groupRef.current.rotation.x = mousePosition.y * 0.3;
      groupRef.current.rotation.z = mousePosition.x * 0.3;
      
      // Floating animation
      groupRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Water Base */}
      <mesh position={[0, -2, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[3, 3, 0.5, 64]} />
        <meshStandardMaterial color="#4A90E2" metalness={0.3} roughness={0.4} />
      </mesh>

      {/* Boat Hull */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[2, 1, 4]} />
        <meshStandardMaterial color="#8B4513" metalness={0.1} roughness={0.7} />
      </mesh>

      {/* Boat Cabin */}
      <mesh position={[0, 0.8, -0.5]}>
        <boxGeometry args={[1.5, 1, 1.5]} />
        <meshStandardMaterial color="#A0522D" metalness={0.1} roughness={0.7} />
      </mesh>

      {/* Mast */}
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 4, 16]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Sail */}
      <mesh position={[0.8, 1.5, -0.5]} rotation={[0, 0.3, 0]}>
        <planeGeometry args={[1.5, 2.5]} />
        <meshStandardMaterial color="#FFFFFF" side={THREE.DoubleSide} />
      </mesh>

      {/* Flag */}
      <mesh position={[0, 3.5, 0]} rotation={[0, 0.2, 0]}>
        <planeGeometry args={[0.8, 0.6]} />
        <meshStandardMaterial color="#E63946" side={THREE.DoubleSide} />
      </mesh>

      {/* Golden Anchor */}
      <mesh position={[0, -0.3, 1.8]}>
        <boxGeometry args={[0.3, 1.2, 0.3]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Anchor Flukes */}
      <mesh position={[-0.4, -0.8, 1.8]} rotation={[0, 0, 0.5]}>
        <boxGeometry args={[0.2, 0.6, 0.2]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0.4, -0.8, 1.8]} rotation={[0, 0, -0.5]}>
        <boxGeometry args={[0.2, 0.6, 0.2]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Cross on Sail */}
      <mesh position={[0.8, 1.5, 0.01]}>
        <boxGeometry args={[0.15, 0.8, 0.05]} />
        <meshStandardMaterial color="#D4AF37" />
      </mesh>
      <mesh position={[0.8, 1.5, 0.01]}>
        <boxGeometry args={[0.5, 0.15, 0.05]} />
        <meshStandardMaterial color="#D4AF37" />
      </mesh>

      {/* Lighting */}
      <pointLight position={[5, 5, 5]} intensity={1} color="#FFFFFF" />
      <pointLight position={[-5, 3, -5]} intensity={0.5} color="#D4AF37" />
      <ambientLight intensity={0.6} />
    </group>
  );
}

export default function ThreeDBoat() {
  return (
    <div className="w-full h-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} />
        <BoatModel />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
        <color attach="background" args={['#E8F4F8']} />
      </Canvas>
    </div>
  );
}
