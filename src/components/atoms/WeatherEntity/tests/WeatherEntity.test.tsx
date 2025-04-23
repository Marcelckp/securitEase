// --- Third Party Imports ---
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import "@testing-library/jest-dom";

// --- Component Imports ---
import { WeatherEntity } from "..";

// --- Data Imports ---
import { mockForecast } from "../../../../data";

describe("WeatherEntity", () => {
  it("renders the label and weather info", () => {
    render(
      <WeatherEntity
        label="Today"
        weather={mockForecast}
        selected="Today"
        onSelect={() => {}}
      />
    );
    expect(
      screen.getByRole("button", { name: /show weather for today/i })
    ).toBeInTheDocument();
    // Check for the correct date, temperature, and icon based on mockForecast
    expect(screen.getByText(`${mockForecast.day.avgtemp_c}°C`)).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", mockForecast.day.condition.icon);
  });

  it("calls onSelect when clicked", () => {
    const onSelect = vi.fn();
    render(
      <WeatherEntity
        label="Today"
        weather={mockForecast}
        selected="Today"
        onSelect={onSelect}
      />
    );
    fireEvent.click(screen.getByRole("button"));
    expect(onSelect).toHaveBeenCalledWith("Today");
  });
});
