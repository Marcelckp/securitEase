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
import "@testing-library/jest-dom";

// --- Component Import ---
import { SnowWeatherVisual } from "../..";
import { Canvas } from "@react-three/fiber";

describe("SnowWeatherVisual", () => {
  it("renders without crashing", () => {
    render(
      <Canvas>
        <SnowWeatherVisual />
      </Canvas>
    );
    // No assertion needed, just ensure it mounts
  });
});
