// --- Third Party Imports ---
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// --- Component Import ---
import { HotKeyDialog } from "../..";

describe("HotKeyDialog", () => {
  it("renders correctly", () => {
    render(<HotKeyDialog />);
    expect(screen.getByText(/Not implemented/i)).toBeInTheDocument();
  });
});
