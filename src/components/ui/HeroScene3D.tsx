"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  mouseX: number;
  mouseY: number;
}

function Scene({ mouseX, mouseY }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const dotGroupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth mouse tilt
    groupRef.current.rotation.x +=
      (mouseY * 0.25 - groupRef.current.rotation.x) * 0.05;
    groupRef.current.rotation.y += delta * 0.45;

    // Ring orbits at different speeds/axes
    if (ring1Ref.current) ring1Ref.current.rotation.z += delta * 0.5;
    if (ring2Ref.current) ring2Ref.current.rotation.x += delta * 0.35;
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y += delta * 0.6;
      ring3Ref.current.rotation.z += delta * 0.2;
    }
    if (dotGroupRef.current) {
      dotGroupRef.current.rotation.y += delta * 0.8;
    }
  });

  // Orbiting small spheres
  const dotCount = 8;
  const dots = Array.from({ length: dotCount }, (_, i) => {
    const angle = (i / dotCount) * Math.PI * 2;
    return {
      position: [
        Math.cos(angle) * 1.65,
        Math.sin(angle * 0.4) * 0.4,
        Math.sin(angle) * 1.65,
      ] as [number, number, number],
      color: i % 3 === 0 ? "#06b6d4" : "#4d8fe0",
    };
  });

  return (
    <group ref={groupRef}>
      {/* Inner glowing core */}
      <mesh>
        <sphereGeometry args={[0.6, 64, 64]} />
        <meshStandardMaterial
          color="#0047AB"
          emissive="#0047AB"
          emissiveIntensity={0.6}
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Main wireframe shell */}
      <mesh>
        <sphereGeometry args={[0.88, 22, 22]} />
        <meshStandardMaterial
          color="#4d8fe0"
          transparent
          opacity={0.45}
          wireframe
        />
      </mesh>

      {/* Outer subtle shell */}
      <mesh>
        <sphereGeometry args={[0.95, 10, 10]} />
        <meshStandardMaterial
          color="#0047AB"
          transparent
          opacity={0.08}
          wireframe
        />
      </mesh>

      {/* Orbit ring 1 — equatorial cyan */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.45, 0.012, 8, 120]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={1.2}
        />
      </mesh>

      {/* Orbit ring 2 — tilted cobalt */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3.5, 0, 0]}>
        <torusGeometry args={[1.3, 0.008, 8, 100]} />
        <meshStandardMaterial
          color="#0047AB"
          emissive="#0047AB"
          emissiveIntensity={1.5}
        />
      </mesh>

      {/* Orbit ring 3 — diagonal */}
      <mesh ref={ring3Ref} rotation={[Math.PI / 6, Math.PI / 4, 0]}>
        <torusGeometry args={[1.6, 0.006, 8, 80]} />
        <meshStandardMaterial
          color="#7ab0e8"
          emissive="#7ab0e8"
          emissiveIntensity={0.8}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Orbiting dot cluster */}
      <group ref={dotGroupRef}>
        {dots.map((dot, i) => (
          <mesh key={i} position={dot.position}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial
              color={dot.color}
              emissive={dot.color}
              emissiveIntensity={2}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export default function HeroScene3D({ mouseX, mouseY }: Props) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.8], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 2, 3]} intensity={2} color="#0047AB" />
      <pointLight position={[-3, -1, -2]} intensity={1} color="#06b6d4" />
      <pointLight position={[0, 3, 0]} intensity={0.5} color="#ffffff" />
      <Scene mouseX={mouseX} mouseY={mouseY} />
    </Canvas>
  );
}
