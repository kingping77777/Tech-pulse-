'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import { useTheme } from 'next-themes';
import * as THREE from 'three';

export type BackgroundVariant = 'sphere' | 'torus' | 'icosahedron';

function AnimatedGeometry({ variant = 'sphere', isDark }: { variant?: BackgroundVariant; isDark: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    // Smooth auto-rotation
    meshRef.current.rotation.x = t * 0.15;
    meshRef.current.rotation.y = t * 0.22;
    // Mouse parallax
    const mx = (state.pointer.x * Math.PI) / 5;
    const my = (state.pointer.y * Math.PI) / 5;
    meshRef.current.rotation.y += (mx - meshRef.current.rotation.y) * 0.06;
    meshRef.current.rotation.x += (-my - meshRef.current.rotation.x) * 0.06;
  });

  // In light mode use deeper teal/blue so it's visible against warm bg
  const color = isDark ? '#00f2ff' : '#0070c0';
  const opacity = isDark
    ? variant === 'torus' ? 0.45 : 0.35
    : variant === 'torus' ? 0.55 : 0.45;

  const baseScale = variant === 'sphere' ? 2.4 : variant === 'torus' ? 1.6 : 2.0;

  return (
    <mesh ref={meshRef} scale={baseScale}>
      {variant === 'sphere'      && <sphereGeometry args={[1, 24, 24]} />}
      {variant === 'torus'       && <torusKnotGeometry args={[1, 0.3, 64, 12]} />}
      {variant === 'icosahedron' && <icosahedronGeometry args={[1, 1]} />}
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={variant === 'icosahedron' ? 0.1 : 0.35}
        speed={1.8}
        wireframe={true}
        transparent={true}
        opacity={opacity}
      />
    </mesh>
  );
}

interface ThreeBackgroundProps {
  variant?: BackgroundVariant;
  className?: string;
}

export function ThreeBackground({ variant = 'sphere', className = '' }: ThreeBackgroundProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`absolute inset-0 z-0 pointer-events-none select-none ${className}`}
        aria-hidden="true"
        style={{ opacity: 0 }}
      />
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <div
      className={`absolute inset-0 z-0 pointer-events-none select-none ${className}`}
      aria-hidden="true"
      style={{
        // In dark mode: screen blends bright cyan against dark
        // In light mode: multiply blends dark blue against light bg — both visible
        mixBlendMode: isDark ? 'screen' : 'multiply',
        opacity: isDark ? 0.7 : 0.6,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        className="w-full h-full"
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: 'low-power', alpha: true }}
      >
        <ambientLight intensity={isDark ? 0.5 : 0.8} />
        <directionalLight position={[8, 8, 5]} intensity={isDark ? 0.8 : 1.2} />
        <pointLight position={[-5, -5, -5]} intensity={isDark ? 0.3 : 0.5} color={isDark ? '#00f2ff' : '#0070c0'} />
        <AnimatedGeometry variant={variant} isDark={isDark} />
      </Canvas>
    </div>
  );
}
