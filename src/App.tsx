// --- Third Party Imports ---
import { useEffect, useMemo, useState } from "react";
import { useAtom } from "jotai";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Canvas } from "@react-three/fiber";

// --- CSS Imports ---
import styles from "./App.module.css";

// --- Component Imports ---
import { HotKeyDialog, WeatherDisplay, WeatherEntity } from "./components";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import {
  CloudWeatherVisual,
  RainWeatherVisual,
  SunWeatherVisual,
} from "./components/meshes";

// --- State Imports ---
import { selectedDayAtom } from "./globalState/atoms";

// --- Helper Imports ---
import { getWeatherBgClass } from "./helpers";

// --- Hook Imports ---
import { useUserLocation } from "./hooks/useUserLocation";
import { useHistoricalWeather } from "./hooks/useHistoricalWeather";
import { useFutureWeather } from "./hooks/useFutureWeather";

function App() {
  // --- State Variables ---
  const [selectedDay, setSelectedDay] = useAtom(selectedDayAtom);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  // --- Custom Hooks ---
  const {
    location,
    loading: locationLoading,
    error: locationError,
  } = useUserLocation();
  const latLon = location ? `${location.lat},${location.lon}` : null;
  const {
    history,
    loading: historyLoading,
    error: historyError,
  } = useHistoricalWeather(latLon);
  const {
    future,
    loading: futureLoading,
    error: futureError,
  } = useFutureWeather(latLon);

  // --- UI States ---
  // Only remove loading overlay when both history and future are loaded (not just location)
  const loading =
    locationLoading || historyLoading || futureLoading || !history || !future;
  const error = locationError || historyError || futureError;

  // --- Handlers ---
  const days = useMemo(
    () =>
      loading && !history && !future
        ? []
        : [
            { label: "3 Days Ago", weather: history?.forecast?.forecastday[0] },
            { label: "2 Days Ago", weather: history?.forecast?.forecastday[1] },
            { label: "Yesterday", weather: history?.forecast?.forecastday[2] },
            { label: "Today", weather: history?.forecast?.forecastday[3] },
            { label: "Tomorrow", weather: future?.forecast?.forecastday[0] },
            {
              label: "2 Days Later",
              weather: future?.forecast?.forecastday[2],
            },
            {
              label: "3 Days Later",
              weather: future?.forecast?.forecastday[3],
            },
          ],
    [loading, history, future]
  );

  // --- UI Variables ---
  const selectedWeather = days.find(
    (day) => day.label === selectedDay
  )?.weather;

  // Determine if the weather is cloudy
  const isCloudy =
    selectedWeather?.day?.condition?.text?.toLowerCase().includes("cloud") ||
    selectedWeather?.day?.condition?.text?.toLowerCase().includes("overcast");

  const isRainy = selectedWeather?.day?.condition?.text
    ?.toLowerCase()
    .includes("rain");
  // De scoping snowy for now due to time
  // const isSnowy = selectedWeather?.day?.condition?.text
  //   ?.toLowerCase()
  //   .includes("snow");
  const isSunny = selectedWeather?.day?.condition?.text
    ?.toLowerCase()
    .includes("sun");

  // Set dynamic background class on #root
  useEffect(() => {
    const root = document.getElementById("root");
    if (!root || !location) return;
    const bgClass = getWeatherBgClass(selectedWeather, loading);
    // Remove all possible background classes
    root.classList.remove(
      styles["bg-loading"],
      styles["bg-sunny"],
      styles["bg-cloudy"],
      styles["bg-rainy"],
      styles["bg-snow"],
      styles["bg-thunder"],
      styles["bg-default"]
    );
    // Add the new background class as a plain string (not from CSS module)
    root.classList.add(bgClass);
  }, [selectedWeather, loading, location]);

  // --- Error Handling ---
  useEffect(() => {
    if (error) {
      setSnackbarOpen(true);
      let tries = 0;
      const interval = setInterval(() => {
        tries += 1;
        if (tries >= 3) {
          setSnackbarOpen(false);
          clearInterval(interval);
        }
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [error]);

  return (
    <div className={styles.App} style={{ position: "relative", zIndex: 1 }}>
      {/* Cloudy 3D Visual Canvas - full page, behind content */}
      <Canvas
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -10,
          pointerEvents: "none",
          background: "transparent",
        }}
        camera={{ position: [0, 0, 5], fov: 75 }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        {isCloudy && <CloudWeatherVisual />}
        {isRainy && <RainWeatherVisual />}
        {isSunny && <SunWeatherVisual />}
        {/* {isSnowy && <SnowWeatherVisual />} */}
      </Canvas>
      {loading && (
        <div className={styles["app-loading-overlay"]} data-testid="app-loading-overlay">
          <DotLottieReact
            aria-label="Loading animation"
            src="/clouds.lottie"
            loop
            autoplay
            style={{ width: "200px" }}
          />
        </div>
      )}
      <header className={styles["app-header"]}>
        <h1 style={{ fontSize: "1rem" }}>
          {location &&
            [location.city, location.region].filter(Boolean).join(", ")}
        </h1>
      </header>
      <main
        style={{ filter: loading ? "blur(2px) grayscale(0.2)" : undefined }}
      >
        <label htmlFor="location-input" className={styles["sr-only"]}>
          Location
        </label>
        <WeatherDisplay weather={selectedWeather} isRainy={isRainy} />
        {!loading && (
          <div className={styles["weather-grid"]}>
            {days &&
              days.map((day) => (
                <div
                  key={`${day.label}-${day.weather?.date_epoch}`}
                  className={styles["fade-in"]}
                >
                  <WeatherEntity
                    key={day.label}
                    label={day.label}
                    weather={day.weather}
                    selected={selectedDay}
                    onSelect={setSelectedDay}
                  />
                </div>
              ))}
          </div>
        )}
      </main>
      <Snackbar
        open={snackbarOpen && !!error}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
          <br />
          Please refresh your browser or contact support if the problem
          persists.
        </Alert>
      </Snackbar>
      <HotKeyDialog />
    </div>
  );
}

export default App;
