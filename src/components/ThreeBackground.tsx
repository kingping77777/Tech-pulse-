'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export type BackgroundVariant = 'sphere' | 'torus' | 'icosahedron';

function AnimatedGeometry({ variant = 'sphere' }: { variant?: BackgroundVariant }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Base Rotation
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;

      // Mouse interaction (react to mouse movement)
      const mouseX = (state.pointer.x * Math.PI) / 4;
      const mouseY = (state.pointer.y * Math.PI) / 4;
      
      // Smooth interpolation for rotation based on pointer
      meshRef.current.rotation.y += (mouseX - meshRef.current.rotation.y) * 0.1;
      meshRef.current.rotation.x += (-mouseY - meshRef.current.rotation.x) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} scale={variant === 'sphere' ? 2.5 : variant === 'torus' ? 1.5 : 1.8}>
      {variant === 'sphere' && <sphereGeometry args={[1, 64, 64]} />}
      {variant === 'torus' && <torusKnotGeometry args={[1, 0.3, 128, 16]} />}
      {variant === 'icosahedron' && <icosahedronGeometry args={[1, 0]} />}
      
      <MeshDistortMaterial
        color="#00f2ff" // Primary cyan/neon color
        attach="material"
        distort={variant === 'icosahedron' ? 0.0 : 0.4} // Sharp corners for Icosahedron
        speed={2}
        wireframe={true}
        transparent={true}
        opacity={variant === 'torus' ? 0.4 : 0.3}
      />
    </mesh>
  );
}

export function ThreeBackground({ variant = 'sphere' }: { variant?: BackgroundVariant }) {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-60 flex items-center justify-center -translate-y-10 lg:-translate-y-0 text-center mx-auto" style={{ height: '600px', width: '100%' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} className="w-full h-full">
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <AnimatedGeometry variant={variant} />
      </Canvas>
    </div>
  );
}
