// --- Third Party Imports ---
import { Fade } from "@mui/material";

// --- Type Imports ---
import { WeatherDisplayProps } from "./types";

// --- Style Imports ---
import styles from "./styles/index.module.css";

export const WeatherDisplay = ({
  weather,
  isRainy,
}: WeatherDisplayProps & { isRainy?: boolean }) => {
  // Determine the class to use for text: invert unless rainy
  const textClass = isRainy ? undefined : styles["inverted-text"];
  return (
    <Fade in={true} mountOnEnter unmountOnExit timeout={1000}>
      <div
        className={styles["weather-display"]}
        tabIndex={0}
        aria-live="polite"
      >
        <div style={{ fontSize: "4rem" }} className={textClass}>
          <p>{weather?.day.avgtemp_c}°C</p>
        </div>
        <div
          style={{ fontSize: ".8rem", textAlign: "left" }}
          className={textClass}
        >
          <p>
            Humidity:{" "}
            <span className={styles["weather-detail"]}>
              {weather?.day.avghumidity}%
            </span>
          </p>
          <p>
            Precip:{" "}
            <span className={styles["weather-detail"]}>
              {weather?.day.totalprecip_mm} mm
            </span>
          </p>
          <p>
            Wind:{" "}
            <span className={styles["weather-detail"]}>
              {weather?.day.maxwind_kph} km/h
            </span>
          </p>
          <p>
            UV index:{" "}
            <span className={styles["weather-detail"]}>{weather?.day.uv}</span>
          </p>
        </div>
      </div>
    </Fade>
  );
};
