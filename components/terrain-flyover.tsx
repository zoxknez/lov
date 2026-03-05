"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function TerrainMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const base = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(16, 10, 96, 72);
    const position = geometry.attributes.position as THREE.BufferAttribute;
    const arr = new Float32Array(position.array.length);
    arr.set(position.array);
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const geometry = meshRef.current.geometry as THREE.PlaneGeometry;
    const pos = geometry.attributes.position as THREE.BufferAttribute;
    const t = clock.elapsedTime * 0.55;

    for (let i = 0; i < pos.count; i += 1) {
      const x = base[i * 3];
      const y = base[i * 3 + 1];
      const waveA = Math.sin(x * 0.8 + t * 1.2);
      const waveB = Math.cos(y * 1.1 + t * 0.9);
      pos.array[i * 3 + 2] = (waveA + waveB) * 0.22;
    }

    pos.needsUpdate = true;
    meshRef.current.rotation.z = Math.sin(t * 0.3) * 0.03;
  });

  return (
    <mesh ref={meshRef} rotation={[-1.1, 0, 0]}>
      <planeGeometry args={[16, 10, 96, 72]} />
      <meshBasicMaterial color="#d2b07a" wireframe transparent opacity={0.18} />
    </mesh>
  );
}

export default function TerrainFlyover() {
  return (
    <div className="terrain-layer" aria-hidden>
      <Canvas camera={{ position: [0, 3.6, 6.2], fov: 50 }}>
        <fog attach="fog" args={["#050806", 4, 16]} />
        <TerrainMesh />
      </Canvas>
    </div>
  );
}
