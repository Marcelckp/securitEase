// --- Type Imports ---
import { Forecast } from "../../repository/WeatherRepository";

// --- Style Imports ---
import styles from "../../App.module.css";

export const getWeatherBgClass = (
  weather: Forecast | undefined,
  loading: boolean
): string => {
  if (loading) return "bg-loading";
  if (!weather) return "bg-default";
  const text = weather.day?.condition?.text?.toLowerCase() || "";
  if (text.includes("sun") || text.includes("clear")) return styles["bg-sunny"];
  if (text.includes("overcast")) return styles["bg-cloudy"];
  if (text.includes("rain") || text.includes("drizzle"))
    return styles["bg-rainy"];
  if (
    text.includes("snow") ||
    text.includes("sleet") ||
    text.includes("blizzard")
  )
    return styles["bg-snow"];
  if (text.includes("thunder")) return styles["bg-thunder"];
  return styles["bg-default"];
};
