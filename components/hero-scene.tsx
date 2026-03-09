"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Icosahedron, MeshDistortMaterial, OrbitControls, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function CoreOrb() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.25;
    meshRef.current.rotation.x += delta * 0.08;
  });

  return (
    <Float speed={1.9} rotationIntensity={0.4} floatIntensity={1.2}>
      <Icosahedron ref={meshRef} args={[1.25, 18]}>
        <MeshDistortMaterial
          color="#d9b167"
          roughness={0.1}
          metalness={0.8}
          emissive="#34230c"
          emissiveIntensity={0.35}
          distort={0.45}
          speed={2.2}
        />
      </Icosahedron>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0.2, 4.8], fov: 45 }} dpr={[1, 1.5]}>
        <color attach="background" args={["#060a07"]} />
        <fog attach="fog" args={["#060a07", 5, 11]} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 3, 4]} intensity={1.2} color="#ffd48d" />
        <Sparkles count={120} scale={6} size={2.1} speed={0.6} color="#d9b167" />
        <CoreOrb />
        <Environment preset="sunset" />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
      </Canvas>
    </div>
  );
}
