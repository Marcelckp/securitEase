// --- Third Party Imports ---
import { useRef } from "react";
import { extend, useFrame } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

// Lighter, soft blue-grey color
const CloudShaderMaterial = shaderMaterial(
  { uTime: 0, uColor: new THREE.Color("#e0e6ef"), uSeed: 0 },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float uTime;
    uniform vec3 uColor;
    uniform float uSeed;
    varying vec2 vUv;

    // Simple 2D noise
    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }
    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) +
             (c - a) * u.y * (1.0 - u.x) +
             (d - b) * u.x * u.y;
    }

    void main() {
      vec2 centerUv = vUv - 0.5;
      float dist = length(centerUv * vec2(1.2, 1.0)); // less circular
      float base = smoothstep(0.7, 0.3, dist);

      // Layered noise for softness
      float n = noise(vUv * 3.0 + uTime * 0.05 + uSeed);
      float n2 = noise(vUv * 6.0 + uTime * 0.1 + uSeed * 2.0);
      float n3 = noise(vUv * 12.0 + uTime * 0.2 + uSeed * 3.0);

      float cloud = base * (0.7 + 0.3 * n) * (0.8 + 0.2 * n2) * (0.7 + 0.3 * n3);

      float alpha = smoothstep(0.2, 0.7, cloud);

      gl_FragColor = vec4(uColor, alpha * 0.7); // softer, more transparent
    }
  `
);

extend({ CloudShaderMaterial });

// Tightly coupling volumetric cloud properties with the shader as it follow the has as composition principle
type VolumetricCloudProps = {
  position?: [number, number, number];
  scale?: number;
  phase?: number;
  amplitude?: number;
  speed?: number;
  layers?: number;
};

const VolumetricCloud = ({
  position = [0, 0, 0],
  scale = 1,
  phase = 0,
  amplitude = 0.5,
  speed = 0.5,
  layers = 5,
}: VolumetricCloudProps) => {
  const groupRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime();
      groupRef.current.position.x =
        position[0] + Math.sin(t * speed + phase) * amplitude;
    }
  });

  // Layer several planes with slight offsets and different seeds
  return (
    <group ref={groupRef} position={position} scale={[scale * 2, scale, scale]}>
      {Array.from({ length: layers }).map((_, i) => (
        <mesh key={i} position={[0, 0, i * 0.08 - layers * 0.04]}>
          <planeGeometry args={[2, 1, 32, 16]} />
          {/* @ts-expect-error cloudShaderMaterial is not recognized by TypeScript */}
          <cloudShaderMaterial transparent uSeed={i * 10} attach="material" />
        </mesh>
      ))}
    </group>
  );
};

type PositionCoords = [number, number, number];
const cloudConfigs: Omit<
  VolumetricCloudProps,
  "amplitude" | "speed" | "layers"
>[] = [
  { position: [-8, 2.2, -2] as PositionCoords, scale: 1.5, phase: 0 },
  { position: [-6, 3.5, 1] as PositionCoords, scale: 1.2, phase: 1 },
  { position: [-4, 2, 0] as PositionCoords, scale: 1.4, phase: 2 },
  { position: [-2, 4, -3] as PositionCoords, scale: 1.1, phase: 3 },
  { position: [0, 2.8, 2] as PositionCoords, scale: 1.3, phase: 4 },
  { position: [2, 3, -2] as PositionCoords, scale: 1.2, phase: 5 },
  { position: [4, 4.2, -1] as PositionCoords, scale: 1.4, phase: 6 },
  { position: [6, 2.5, 1] as PositionCoords, scale: 1.2, phase: 7 },
  { position: [8, 3.8, 2] as PositionCoords, scale: 1.5, phase: 8 },
  { position: [-7, 5, 0] as PositionCoords, scale: 1.0, phase: 9 },
  { position: [-5, 3.2, 2] as PositionCoords, scale: 1.3, phase: 10 },
  { position: [-1, 5.5, -2] as PositionCoords, scale: 1.1, phase: 11 },
  { position: [1, 4.7, 1] as PositionCoords, scale: 1.2, phase: 12 },
  { position: [3, 5.2, -1] as PositionCoords, scale: 1.3, phase: 13 },
  { position: [5, 3.5, 2] as PositionCoords, scale: 1.1, phase: 14 },
  { position: [7, 4.8, -2] as PositionCoords, scale: 1.2, phase: 15 },
];

export const CloudWeatherVisual = () => (
  <>
    <ambientLight intensity={0.8} />
    <directionalLight position={[10, 10, 5]} intensity={0.6} />
    {cloudConfigs.map((cfg, i) => (
      <VolumetricCloud
        key={i}
        {...cfg}
        amplitude={0.7}
        speed={0.3 + 0.1 * i}
        layers={6}
      />
    ))}
    {/* <color attach="background" args={["#b0c4de"]} /> */}
  </>
);
