"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function Particles() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 1800;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 28;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 28;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.025;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.018) * 0.08;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#0047AB"
        size={0.028}
        sizeAttenuation
        depthWrite={false}
        opacity={0.65}
      />
    </Points>
  );
}

function GeometricShapes() {
  const octaRef = useRef<THREE.Mesh>(null);
  const icoRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (octaRef.current) {
      octaRef.current.rotation.x = t * 0.18;
      octaRef.current.rotation.y = t * 0.26;
    }
    if (icoRef.current) {
      icoRef.current.rotation.x = -t * 0.14;
      icoRef.current.rotation.z = t * 0.18;
    }
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.1;
      torusRef.current.rotation.y = t * 0.22;
    }
  });

  return (
    <>
      <mesh ref={octaRef} position={[4.5, 1.5, -3]}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#0047AB" transparent opacity={0.15} wireframe />
      </mesh>
      <mesh ref={icoRef} position={[-5, -2, -4]}>
        <icosahedronGeometry args={[1.4, 0]} />
        <meshStandardMaterial color="#06b6d4" transparent opacity={0.12} wireframe />
      </mesh>
      <mesh ref={torusRef} position={[2, -3.5, -2]}>
        <torusGeometry args={[0.8, 0.25, 8, 24]} />
        <meshStandardMaterial color="#0047AB" transparent opacity={0.1} wireframe />
      </mesh>
    </>
  );
}

export default function ParticleField() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ alpha: true, antialias: false }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.5} />
        <Particles />
        <GeometricShapes />
      </Canvas>
    </div>
  );
}
