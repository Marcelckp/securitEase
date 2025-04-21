// --- Type Imports ---
import type { Forecast } from "../../../../repository/WeatherRepository";

export type WeatherDisplayProps = {
  weather: Forecast | undefined;
};
