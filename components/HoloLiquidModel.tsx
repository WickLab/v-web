"use client";

import React, { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Center,
  Environment,
  Float,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";

type HoloLiquidModelProps = {
  modelPath: string;
  scale?: number;
};

function HoloLiquidModelInner({ modelPath, scale = 1.5 }: HoloLiquidModelProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const pointerRef = useRef(new THREE.Vector2(0, 0));
  const pointerSmooth = useRef(new THREE.Vector2(0, 0));

  const { scene } = useGLTF(modelPath);

  // Create a single reusable holographic liquid-glass material instance
  const holoGlassMat = useMemo(() => {
    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#eaf6ff"),
      metalness: 0.0,
      roughness: 0.06,
      transmission: 1.0, // glass
      thickness: 1.4, // “liquid depth”
      ior: 1.35, // glass-like refraction
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
      envMapIntensity: 1.35,

      // holographic / iridescent shimmer
      iridescence: 1.0,
      iridescenceIOR: 1.35,
      iridescenceThicknessRange: [200, 900],

      // subtle glow tint
      emissive: new THREE.Color("#0bd8ff"),
      emissiveIntensity: 0.06,
    });

    mat.transparent = true;
    return mat;
  }, []);

  // Clone scene so we can safely modify materials
  const cloned = useMemo(() => scene.clone(true), [scene]);

  // Apply the material to all meshes once
  useEffect(() => {
    cloned.traverse((obj: THREE.Object3D) => {
      const mesh = obj as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        // Important for transmission look
        if ((mesh.geometry as any).computeVertexNormals) {
          mesh.geometry.computeVertexNormals();
        }

        mesh.material = holoGlassMat;
      }
    });
  }, [cloned, holoGlassMat]);

  // Mouse interaction handlers (attach to group)
  const onPointerMove = (e: any) => {
    // normalized pointer coords: -1..1
    // e.pointer is already normalized in R3F events
    pointerRef.current.set(e.pointer.x, e.pointer.y);
  };

  const onPointerOut = () => {
    pointerRef.current.set(0, 0);
  };

  // Liquid wobble + interactive distortion feel
  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Smooth pointer
    pointerSmooth.current.lerp(pointerRef.current, 0.08);

    const px = pointerSmooth.current.x;
    const py = pointerSmooth.current.y;

    if (groupRef.current) {
      // Base float + “liquid” wobble
      groupRef.current.position.y = Math.sin(t * 1.2) * 0.08 + py * 0.12;

      // Interactive rotation: follows pointer a bit
      groupRef.current.rotation.y = t * 0.22 + px * 0.55;
      groupRef.current.rotation.x = Math.sin(t * 0.7) * 0.12 + py * 0.35;
      groupRef.current.rotation.z = Math.sin(t * 0.9) * 0.06 - px * 0.12;

      // Scale breathing (subtle)
      const s = 1 + Math.sin(t * 1.1) * 0.015;
      groupRef.current.scale.setScalar(s);
    }

    // “Liquid” response: drive roughness + emissive with pointer & time
    // (feels like distortion without heavy custom shaders)
    const energy = Math.min(1, Math.abs(px) + Math.abs(py));
    holoGlassMat.roughness = THREE.MathUtils.lerp(0.06, 0.14, energy);
    holoGlassMat.emissiveIntensity = 0.06 + energy * 0.14 + Math.sin(t * 2.0) * 0.01;

    // Holo shimmer: oscillate iridescence thickness slightly
    const baseMin = 200;
    const baseMax = 900;
    const wobble = Math.sin(t * 1.8) * 90 + energy * 180;
    holoGlassMat.iridescenceThicknessRange = [baseMin + wobble, baseMax + wobble];
  });

  return (
    <Float speed={1.8} rotationIntensity={0.35} floatIntensity={0.8}>
      <group ref={groupRef} scale={scale} onPointerMove={onPointerMove} onPointerOut={onPointerOut}>
        <Center>
          <primitive object={cloned} />
        </Center>

        {/* Neon core glow (helps holographic vibe) */}
        <pointLight position={[0, 0, 0]} intensity={3.8} color="#00f2ff" />
        <pointLight position={[0.6, 0.2, 0.8]} intensity={2.2} color="#a855f7" />
      </group>
    </Float>
  );
}

function FallbackShape() {
  return (
    <mesh castShadow receiveShadow>
      <icosahedronGeometry args={[1, 2]} />
      <meshStandardMaterial metalness={0.2} roughness={0.35} />
    </mesh>
  );
}

export default function HoloLiquidModel({
  modelPath = "/models/thumbs-up.glb",
  size = 360,
  scale = 1.6,
}: {
  modelPath?: string;
  size?: number;
  scale?: number;
}) {
  return (
    <div style={{ width: size, height: size }} className="rounded-xl bg-white/5">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        shadows
      >
        {/* Lighting tuned for glass + holo */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 6, 4]} intensity={1.6} castShadow />
        <directionalLight position={[-4, 2, -3]} intensity={0.7} />

        {/* Environment reflections make glass look real */}
        <Environment preset="city" />

        <Suspense fallback={<FallbackShape />}>
          <HoloLiquidModelInner modelPath={modelPath} scale={scale} />
        </Suspense>

        {/* Controls: keep your auto-rotate vibe */}
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.15} />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/thumbs-up.glb");