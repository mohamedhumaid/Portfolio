"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  mouseX: number;
  mouseY: number;
}

// Fibonacci sphere distribution for even dot placement
function fibonacciSphere(count: number) {
  const points: [number, number, number][] = [];
  const phi = Math.PI * (Math.sqrt(5) - 1);
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    points.push([Math.cos(theta) * r, y, Math.sin(theta) * r]);
  }
  return points;
}

function Globe({ mouseY }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  const dots = useMemo(() => fibonacciSphere(80), []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    // Smooth auto-rotation
    groupRef.current.rotation.y += delta * 0.22;
    // Mouse tilt
    groupRef.current.rotation.x +=
      (mouseY * 0.25 - groupRef.current.rotation.x) * 0.04;

    if (ring1Ref.current) ring1Ref.current.rotation.z += delta * 0.18;
    if (ring2Ref.current) ring2Ref.current.rotation.x += delta * 0.12;
  });

  return (
    <group ref={groupRef}>
      {/* Globe wireframe — latitude/longitude grid */}
      <mesh>
        <sphereGeometry args={[1, 28, 28]} />
        <meshStandardMaterial
          color="#0047AB"
          transparent
          opacity={0.18}
          wireframe
        />
      </mesh>

      {/* Solid inner glow core */}
      <mesh>
        <sphereGeometry args={[0.92, 32, 32]} />
        <meshStandardMaterial
          color="#0047AB"
          emissive="#0047AB"
          emissiveIntensity={0.12}
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* Surface dots — like server/city nodes on a world map */}
      {dots.map(([x, y, z], i) => (
        <mesh key={i} position={[x * 1.02, y * 1.02, z * 1.02]}>
          <sphereGeometry args={[i % 7 === 0 ? 0.035 : 0.018, 5, 5]} />
          <meshStandardMaterial
            color={i % 5 === 0 ? "#06b6d4" : "#4d8fe0"}
            emissive={i % 5 === 0 ? "#06b6d4" : "#0047AB"}
            emissiveIntensity={i % 7 === 0 ? 2.5 : 1.2}
          />
        </mesh>
      ))}

      {/* Equatorial orbit ring */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.38, 0.011, 8, 120]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={1.4}
        />
      </mesh>

      {/* Tilted orbit ring */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3.5, Math.PI / 6, 0]}>
        <torusGeometry args={[1.52, 0.007, 8, 90]} />
        <meshStandardMaterial
          color="#0047AB"
          emissive="#0047AB"
          emissiveIntensity={1.8}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}

export default function HeroScene3D({ mouseX, mouseY }: Props) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.6], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 2, 3]} intensity={2.5} color="#0047AB" />
      <pointLight position={[-2, -1, -2]} intensity={1} color="#06b6d4" />
      <Globe mouseX={mouseX} mouseY={mouseY} />
    </Canvas>
  );
}
