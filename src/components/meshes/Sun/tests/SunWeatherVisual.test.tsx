// Polyfill ResizeObserver for test environment
global.ResizeObserver =
  global.ResizeObserver ||
  class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };

// --- Third Party Imports ---
import React from "react";
import { render } from "@testing-library/react";
import { Canvas } from "@react-three/fiber";

// --- Component Import ---
import { SunWeatherVisual } from "../..";

describe("SunWeatherVisual", () => {
  it("renders without crashing", () => {
    render(
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        <SunWeatherVisual />
      </Canvas>
    );
    // No assertion needed, just ensure it mounts
  });
});
