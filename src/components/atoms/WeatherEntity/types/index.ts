// --- Type Imports ---
import type { Forecast } from "../../../../repository/WeatherRepository";

// and to avoid potential issues with circular references
export type WeatherEntityProps = {
  label: string;
  weather: Forecast | undefined;
  selected: string;
  onSelect: (date: string) => void;
};
