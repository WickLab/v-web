"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Center,
  Environment,
  Float,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";

function Model() {
  const { scene } = useGLTF("/models/thumbs-up.glb");

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <Center>
        <primitive object={scene} scale={1.5} />
      </Center>
    </Float>
  );
}

const cameraPosition: [number, number, number] = [0, 0, 6];

function ModelFallback() {
  return (
    <Canvas camera={{ position: cameraPosition, fov: 50 }}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <mesh>
        <boxGeometry />
        <meshStandardMaterial color="#60a5fa" />
      </mesh>
    </Canvas>
  );
}

export default function ThreeLogo({ size = 300 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size }}>
      <Suspense fallback={<ModelFallback />}>
        <Canvas
          dpr={[1, 2]}
          camera={{ position: cameraPosition, fov: 50 }}
          gl={{ antialias: true, powerPreference: "high-performance" }}
        >
          <ambientLight intensity={1.2} />
          <directionalLight position={[5, 5, 5]} intensity={1.8} />
          <Environment preset="city" />
          <Model />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={1.2}
          />
        </Canvas>
      </Suspense>
    </div>
  );
}

useGLTF.preload("/models/thumbs-up.glb");