// --- Third Party Imports ---
import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform float time;

  void main() {
    // Sun center in UV space (top left)
    vec2 sunCenter = vec2(0.0, 1.0);

    // Direction from sun center to current fragment
    vec2 dir = vUv - sunCenter;
    float angle = atan(dir.y, dir.x);

    // Ray effect: modulate brightness based on angle and distance
    float rays = 0.5 + 0.5 * sin(20.0 * angle + time * 0.5);
    float dist = length(dir);

    // Fade rays with distance
    float intensity = smoothstep(0.0, 0.5, 1.0 - dist) * rays;

    // Sun core
    float sun = smoothstep(0.08, 0.0, dist);

    vec3 color = mix(vec3(1.0, 0.9, 0.3), vec3(1.0, 0.8, 0.2), dist);
    color += intensity * 0.5;
    color += sun * 1.0;

    // Alpha: only visible where rays or sun are present
    float alpha = max(intensity, sun);
    if (alpha < 0.01) discard; // Optional: discard fully transparent fragments

    gl_FragColor = vec4(color, alpha);
  }
`;

export const SunWeatherVisual = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh>
      <planeGeometry args={[12, 8, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          time: { value: 0 },
        }}
        transparent
      />
    </mesh>
  );
};
