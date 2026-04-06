"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Environment,
  MeshTransmissionMaterial,
  Preload,
} from "@react-three/drei";
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
    meshRef.current.rotation.x = t * 0.05;
    meshRef.current.rotation.y = t * 0.08;

    // Subtle mouse parallax
    const x = (state.pointer.x * Math.PI) / 12;
    const y = (state.pointer.y * Math.PI) / 12;
    meshRef.current.rotation.x += y * 0.1;
    meshRef.current.rotation.y += x * 0.1;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1.2}>
      <group>
        {/* Main icosahedron — glass */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.8, 12]} />
          <MeshTransmissionMaterial
            backside
            backsideThickness={0.3}
            thickness={0.35}
            chromaticAberration={0.5}
            anisotropy={0.1}
            distortion={0.15}
            distortionScale={0.2}
            temporalDistortion={0.05}
            roughness={0}
            transmission={1}
            ior={1.5}
            color={"#ffffff"}
            resolution={512}
            samples={10}
          />
        </mesh>

        {/* Thin wireframe overlay for "technical" feel */}
        <mesh>
          <icosahedronGeometry args={[1.82, 2]} />
          <meshBasicMaterial
            color="#c8f135"
            wireframe
            transparent
            opacity={0.06}
          />
        </mesh>
      </group>
    </Float>
  );
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-5, -3, -5]} intensity={0.8} color="#c8f135" />
      <pointLight position={[0, -4, 2]} intensity={1.2} color="#c8f135" distance={8} />
    </>
  );
}

export default function HeroCanvas() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      {/* Radial vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 70% at 70% 50%, transparent 30%, #080808 100%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      <Canvas
        camera={{ position: [0, 0, 5], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <SceneLights />
          <Environment preset="studio" />
          <GlassOrb />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
