'use client';

/**
 * 3D HERO SCENE — diya + flame + particles.
 * • Loaded ONLY via dynamic(import, { ssr:false }) AFTER window.onload + 500ms.
 * • Disabled on touch / 2g-3g / prefers-reduced-motion.
 * • Capped at 800 particles. PerlinNoise-based flicker. Pointer parallax with lerp.
 *
 * On mobile we ship a static WebP via the parent — never this scene.
 */

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sparkles, Environment } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function FlameDiya() {
  const flameRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  // Cheap pseudo-perlin via sine sums — no extra deps
  const noise = useMemo(() => {
    return (t: number) =>
      0.5 +
      0.25 * Math.sin(t * 1.7) +
      0.15 * Math.sin(t * 3.3 + 1.2) +
      0.1 * Math.sin(t * 6.1 + 2.4);
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const n = noise(t);
    if (flameRef.current) {
      flameRef.current.scale.set(0.85 + n * 0.25, 1.0 + n * 0.4, 0.85 + n * 0.25);
      flameRef.current.position.y = 0.55 + n * 0.04;
    }
    if (lightRef.current) {
      lightRef.current.intensity = 1.6 + n * 1.2;
    }
  });

  return (
    <group>
      {/* Diya bowl */}
      <mesh position={[0, 0.05, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.55, 0.25, 32, 1, true]} />
        <meshStandardMaterial color="#8b5a13" metalness={0.7} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.18, 0]}>
        <torusGeometry args={[0.5, 0.05, 16, 32]} />
        <meshStandardMaterial color="#d4a017" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Wick */}
      <mesh position={[0, 0.32, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.18, 8]} />
        <meshStandardMaterial color="#3b2410" />
      </mesh>

      {/* Flame */}
      <Float speed={2} rotationIntensity={0} floatIntensity={0.05}>
        <mesh ref={flameRef} position={[0, 0.55, 0]}>
          <sphereGeometry args={[0.16, 24, 24]} />
          <meshStandardMaterial
            color="#ffae57"
            emissive="#ff6b1a"
            emissiveIntensity={2.4}
            transparent
            opacity={0.92}
          />
        </mesh>
      </Float>

      {/* Local warm light */}
      <pointLight
        ref={lightRef}
        position={[0, 0.7, 0]}
        intensity={2.2}
        distance={6}
        color="#ffae57"
      />

      {/* Floating embers — capped */}
      <Sparkles
        count={800}
        size={2}
        scale={[6, 4, 6]}
        speed={0.35}
        color="#ffd9a8"
        position={[0, 1.2, 0]}
      />
    </group>
  );
}

function ParallaxRig() {
  const { camera, pointer } = useThree();
  useFrame(() => {
    // Lerp the camera toward pointer — soft, never jarring (0.05 lerp).
    camera.position.x += (pointer.x * 0.5 - camera.position.x) * 0.05;
    camera.position.y += (0.4 + pointer.y * 0.3 - camera.position.y) * 0.05;
    camera.lookAt(0, 0.4, 0);
  });
  return null;
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0.6, 2.6], fov: 45 }}
      style={{ background: 'transparent' }}
      // Cap at 30fps on slower devices via frameloop="demand" if needed.
    >
      <ambientLight intensity={0.18} color="#5a3a8a" />
      <directionalLight position={[3, 4, 2]} intensity={0.5} color="#ffd9a8" />
      <FlameDiya />
      <ParallaxRig />
      <Environment preset="night" />
      <fog attach="fog" args={['#0a0414', 4, 12]} />
    </Canvas>
  );
}
