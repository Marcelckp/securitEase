// --- Third Party Imports ---
import { useState, useEffect } from "react";
import { useAtom } from "jotai";

// --- API Imports ---
import { WeatherAPI } from "../../service/weatherApi";

// --- Helper Imports ---
import { globalErrorHandler } from "../../helpers";

// --- State Variables ---
import { futureWeatherAtom } from "../../globalState/atoms";

export const useFutureWeather = (latLon: string | null) => {
  // --- State Variables ---
  const [future, setFuture] = useAtom(futureWeatherAtom);

  // ---- UI States ----
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!latLon) return;
    (async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await globalErrorHandler(() =>
        WeatherAPI.getFutureWeather(latLon)
      );
      if (error) {
        setError(error.message);
      } else if (data) {
        setFuture(data);
        setLoading(false);
      }
    })();
  }, [latLon, setFuture]);

  return { future, loading, error };
};
