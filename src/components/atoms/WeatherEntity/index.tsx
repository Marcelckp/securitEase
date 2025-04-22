// --- Type Imports ---
import { WeatherEntityProps } from "./types";

// --- Style Imports ---
import styles from "./styles/index.module.css";

export const WeatherEntity = ({
  label,
  weather,
  selected,
  onSelect,
}: WeatherEntityProps) => {
  const formattedDate = weather?.date
    ? new Date(weather.date).toLocaleDateString(undefined, {
        day: "numeric",
        month: "long",
      })
    : "";

  return (
    <div className={styles["weather-grid"]} role="list">
      <button
        className={`${styles["weather-tile"]}${
          selected === label ? ` ${styles.selected}` : ""
        }`}
        aria-pressed={selected === label}
        aria-label={`Show weather for ${label}`}
        onClick={() => onSelect(label)}
        tabIndex={0}
      >
        <img src={weather?.day.condition.icon} />
        <div className="blend-text">{formattedDate}</div>
        <div className="blend-text">{weather && weather.day.avgtemp_c}°C</div>
      </button>
    </div>
  );
};
