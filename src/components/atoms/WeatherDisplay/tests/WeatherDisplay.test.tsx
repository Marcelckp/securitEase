// --- Third Party Imports ---
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// --- Component Imports ---
import { WeatherDisplay } from "..";

// --- Data Imports ---
import { mockForecast } from "../../../../data/";

describe("WeatherDisplay", () => {
  it("renders weather details", () => {
    render(<WeatherDisplay weather={mockForecast} />);
    expect(screen.getByText("15°C")).toBeInTheDocument();
    expect(screen.getByText(/Humidity:/)).toBeInTheDocument();
    expect(screen.getByText(/60%/)).toBeInTheDocument();
    expect(screen.getByText(/Precip:/)).toBeInTheDocument();
    expect(screen.getByText(/2 mm/)).toBeInTheDocument();
    expect(screen.getByText(/Wind:/)).toBeInTheDocument();
    expect(screen.getByText(/16 km\/h/)).toBeInTheDocument();
    expect(screen.getByText(/UV index:/)).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("applies inverted-text class when not rainy", () => {
    render(<WeatherDisplay weather={mockForecast} isRainy={false} />);
    const temp = screen.getByText("15°C");
    expect(temp).toBeInTheDocument();
    expect(temp.className).toContain("");
  });

  it("does not apply inverted-text class when rainy", () => {
    render(<WeatherDisplay weather={mockForecast} isRainy={true} />);
    const temp = screen.getByText("15°C");
    expect(temp).toBeInTheDocument();
    expect(temp.className).not.toContain("inverted-text");
  });
});
