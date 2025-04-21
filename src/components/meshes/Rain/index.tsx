// --- Third Party Imports ---
import { extend } from "@react-three/fiber";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

// Rain shader material
const RainShaderMaterial = shaderMaterial(
  { uTime: 0, uColor: new THREE.Color("#fff"), uSeed: 0 },
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    uniform float uTime;
    uniform vec3 uColor;
    uniform float uSeed;
    varying vec2 vUv;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123 + uSeed);
    }

    void main() {
      float rain = 0.0;
      float lines = 40.0;
      float speed = 2.0 + uSeed * 0.1;
      for (float i = 0.0; i < 1.0; i += 1.0/lines) {
        float x = fract(vUv.x + i + hash(vec2(i, uSeed)));
        float y = fract(vUv.y + uTime * speed + hash(vec2(i, uSeed)));
        float streak = smoothstep(0.01, 0.0, abs(x - 0.5)) * smoothstep(0.05, 0.0, y);
        rain += streak;
      }
      rain = clamp(rain, 0.0, 1.0);

      float alpha = rain * 0.7;
      gl_FragColor = vec4(uColor, alpha);
    }
  `
);

extend({ RainShaderMaterial });

const Rain = () => {
  const materialRef = useRef<THREE.ShaderMaterial & { uTime: number }>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (materialRef.current) {
      materialRef.current.uTime = t;
    }
  });

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[20, 20, 32, 16]} />
      {/* @ts-expect-error: Custom rainShaderMaterial type is not recognized by TypeScript */}
      <rainShaderMaterial ref={materialRef} transparent uSeed={0} attach="material" />
    </mesh>
  );
};

export const RainWeatherVisual = () => (
  <>
    <ambientLight intensity={0.8} />
    <directionalLight position={[10, 10, 5]} intensity={0.6} />
    <Rain />
    {/* <color attach="background" args={["#b3d4fc"]} /> */}
  </>
);
