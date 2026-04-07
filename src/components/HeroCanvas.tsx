"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, MeshTransmissionMaterial, Preload } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";
import { Suspense } from "react";

function GlassOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const shouldReduce = useReducedMotion();

  useFrame((state) => {
    if (!meshRef.current || shouldReduce) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x = t * 0.05 + (state.pointer.y * Math.PI) / 14;
    meshRef.current.rotation.y = t * 0.08 + (state.pointer.x * Math.PI) / 14;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.3} floatIntensity={1.2}>
      <group>
        <mesh ref={meshRef}>
          {/* Detail 4 = visually smooth, much cheaper than 12 */}
          <icosahedronGeometry args={[1.8, 4]} />
          <MeshTransmissionMaterial
            backside={false}
            thickness={0.4}
            chromaticAberration={0.4}
            distortion={0.12}
            distortionScale={0.2}
            temporalDistortion={0}
            roughness={0}
            transmission={1}
            ior={1.45}
            color="#ffffff"
            resolution={128}
            samples={2}
          />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[1.83, 1]} />
          <meshBasicMaterial color="#c8f135" wireframe transparent opacity={0.07} />
        </mesh>
      </group>
    </Float>
  );
}

function OrbitRing({
  radius,
  tiltX,
  speed,
  opacity,
  color,
}: {
  radius: number;
  tiltX: number;
  speed: number;
  opacity: number;
  color: string;
}) {
  const ringRef = useRef<THREE.Mesh>(null);
  const shouldReduce = useReducedMotion();

  useFrame((state) => {
    if (!ringRef.current || shouldReduce) return;
    ringRef.current.rotation.z = state.clock.elapsedTime * speed;
    ringRef.current.rotation.x = tiltX;
    ringRef.current.rotation.y = state.pointer.x * 0.2;
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[radius, 0.007, 8, 128]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

function FloatingParticles() {
  const groupRef = useRef<THREE.Group>(null);
  const shouldReduce = useReducedMotion();

  const positions: [number, number, number][] = [
    [3.1, 1.5, -0.7],
    [-2.9, 0.9, -0.3],
    [2.4, -2.0, 0.5],
    [-2.2, 2.4, -0.8],
    [3.7, -0.5, 0.1],
  ];

  useFrame((state) => {
    if (!groupRef.current || shouldReduce) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.022;
  });

  return (
    <group ref={groupRef}>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.042, 6, 6]} />
          <meshBasicMaterial color="#c8f135" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.12} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-5, -3, -5]} intensity={0.8} color="#c8f135" />
      <pointLight position={[0, -4, 2]} intensity={1.2} color="#c8f135" distance={9} />
    </>
  );
}

export default function HeroCanvas() {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      {/* Vignette so orb fades into the dark bg */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 70% 70% at 70% 50%, transparent 30%, #080808 100%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      <Canvas
        camera={{ position: [0, 0, 6], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[0.9, 1.2]}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <SceneLights />
          <Environment preset="studio" />
          <GlassOrb />
          <OrbitRing radius={2.85} tiltX={Math.PI / 3} speed={0.11} opacity={0.26} color="#c8f135" />
          <OrbitRing radius={3.5} tiltX={Math.PI / 6} speed={-0.06} opacity={0.09} color="#ffffff" />
          <FloatingParticles />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
