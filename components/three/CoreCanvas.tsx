"use client";

import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { Suspense, memo } from "react";
import DataCenterBackground from "./DataCenterBackground";

function Fallback() {
  return null;
}

function CoreCanvas() {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        alpha: true
      }}
      shadows={false}
    >
      <Suspense fallback={<Fallback />}>
        {/* slight tilted top-down angle */}
        <PerspectiveCamera
          makeDefault
          fov={44}
          position={[2.65, 2.25, 6.9] as [number, number, number]}
          rotation={[-0.22, 0.22, 0.02] as [number, number, number]}
        />

        <ambientLight intensity={0.35} />
        <directionalLight position={[4.2, 6.0, 3.5]} intensity={0.95} color="#ffffff" />
        <directionalLight position={[-5.5, 1.4, -3.6]} intensity={0.35} color="#b8d4ff" />
        <pointLight position={[1.2, 1.0, 1.2]} intensity={0.65} color="#22D3EE" distance={8} />
        <pointLight position={[1.0, 0.8, -2.4]} intensity={0.55} color="#8B5CF6" distance={9} />

        <DataCenterBackground />
      </Suspense>
    </Canvas>
  );
}

export default memo(CoreCanvas);