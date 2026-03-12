import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function Sphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0015;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2.2, 32, 32]} />
      <shaderMaterial
        wireframe
        vertexShader={`
          varying vec3 vPosition;
          void main() {
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
          }
        `}
        fragmentShader={`
          varying vec3 vPosition;
          void main() {
            float mixValue = (vPosition.y + 2.0) / 4.0;
            vec3 topColor = vec3(0.91, 0.90, 0.89);
            vec3 bottomColor = vec3(0.78, 0.65, 0.37);
            vec3 color = mix(bottomColor, topColor, mixValue);
            gl_FragColor = vec4(color, 0.8);
          }
        `}
      />
    </mesh>
  );
}

export default function GradientSphere() {
  return (
    <div className="w-full" style={{ height: 400 }}>
      <Canvas camera={{ position: [0, 0, 6] }}>
        <Sphere />
      </Canvas>
    </div>
  );
}