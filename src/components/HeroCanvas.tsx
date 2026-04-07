"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, Preload } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";
import { Suspense } from "react";

/* ── Glowing sphere — no MeshTransmissionMaterial (too expensive) ── */
function GlowOrb() {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const shouldReduce = useReducedMotion();

  useFrame((state) => {
    if (shouldReduce) return;
    const t = state.clock.elapsedTime;
    const px = state.pointer.x;
    const py = state.pointer.y;

    if (outerRef.current) {
      outerRef.current.rotation.y = t * 0.06 + px * 0.3;
      outerRef.current.rotation.x = t * 0.04 + py * 0.2;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.1 + px * 0.2;
      innerRef.current.rotation.x = -t * 0.06 + py * 0.15;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={1.0}>
      <group>
        {/* Core glowing sphere */}
        <mesh>
          <sphereGeometry args={[1.3, 64, 64]} />
          <meshStandardMaterial
            color="#1a0a3a"
            emissive="#3a1a7a"
            emissiveIntensity={0.4}
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>

        {/* Outer icosahedron wireframe — slow rotation */}
        <mesh ref={outerRef}>
          <icosahedronGeometry args={[2.0, 1]} />
          <meshBasicMaterial
            color="#c8f135"
            wireframe
            transparent
            opacity={0.12}
          />
        </mesh>

        {/* Inner icosahedron wireframe — counter-rotate */}
        <mesh ref={innerRef}>
          <icosahedronGeometry args={[1.55, 1]} />
          <meshBasicMaterial
            color="#7c5aff"
            wireframe
            transparent
            opacity={0.15}
          />
        </mesh>

        {/* Glow halo */}
        <mesh>
          <sphereGeometry args={[1.35, 32, 32]} />
          <meshBasicMaterial
            color="#6030d0"
            transparent
            opacity={0.08}
            side={THREE.BackSide}
          />
        </mesh>
      </group>
    </Float>
  );
}

function OrbitRing({
  radius, tiltX, speed, opacity, color,
}: {
  radius: number; tiltX: number; speed: number; opacity: number; color: string;
}) {
  const ringRef = useRef<THREE.Mesh>(null);
  const shouldReduce = useReducedMotion();

  useFrame((state) => {
    if (!ringRef.current || shouldReduce) return;
    ringRef.current.rotation.z = state.clock.elapsedTime * speed;
    ringRef.current.rotation.x = tiltX;
    ringRef.current.rotation.y = state.pointer.x * 0.18;
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[radius, 0.006, 8, 120]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

function FloatingDots() {
  const groupRef = useRef<THREE.Group>(null);
  const shouldReduce = useReducedMotion();

  const dots: [number, number, number][] = [
    [2.9, 1.4, -0.6], [-2.7, 0.8, -0.3],
    [2.2, -1.9, 0.5], [-2.0, 2.3, -0.7],
    [3.5, -0.5, 0.1], [-0.8, 3.1, 0.4],
  ];

  useFrame((state) => {
    if (!groupRef.current || shouldReduce) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.018;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.05;
  });

  return (
    <group ref={groupRef}>
      {dots.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.04, 6, 6]} />
          <meshBasicMaterial color={i % 2 === 0 ? "#c8f135" : "#7c5aff"} transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  );
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[4, 4, 4]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-3, 2, 2]} intensity={2.0} color="#7c5aff" distance={10} />
      <pointLight position={[3, -2, 1]} intensity={1.5} color="#c8f135" distance={8} />
    </>
  );
}

export default function HeroCanvas() {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      {/* Left-side fade so text reads clearly */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 75% 80% at 65% 50%, transparent 25%, #05050f 100%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      <Canvas
        camera={{ position: [0, 0, 6], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[0.9, 1.3]}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <SceneLights />
          <Environment preset="night" />
          <GlowOrb />
          <OrbitRing radius={2.8} tiltX={Math.PI / 3.2} speed={0.1}  opacity={0.25} color="#c8f135" />
          <OrbitRing radius={3.4} tiltX={Math.PI / 6}   speed={-0.06} opacity={0.12} color="#7c5aff" />
          <OrbitRing radius={4.0} tiltX={Math.PI / 2.4} speed={0.04} opacity={0.06} color="#c8f135" />
          <FloatingDots />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
