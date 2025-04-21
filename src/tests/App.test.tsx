// Polyfill ResizeObserver for test environment
global.ResizeObserver =
  global.ResizeObserver ||
  class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };

// Add jest-dom for custom matchers like toBeInTheDocument
import "@testing-library/jest-dom";

// --- Third Party Imports ---
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// --- Component Imports ---
import App from "../App";

describe("App", () => {
  it("renders loading overlay initially", () => {
    render(<App />);
    expect(screen.getByTestId("app-loading-overlay")).toBeInTheDocument();
  });

  it("renders header", () => {
    render(<App />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("opens hot key menu when Control+K is pressed", async () => {
    render(<App />);
    const user = userEvent.setup();
    // Simulate pressing Control+K
    await user.keyboard("{Control>}{KeyK}{/Control}");
    // Check if the hot key dialog is open (assuming it has role="dialog" or similar)
    // Adjust selector as needed based on your HotKeyDialog implementation
    expect(screen.getByTestId("location-dialog")).toBeInTheDocument();
  });
});
