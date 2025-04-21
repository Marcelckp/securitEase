// --- Third Party Imports ---
import { useState, useEffect } from "react";
import { useAtom } from "jotai";

// --- API Imports ---
import { WeatherAPI } from "../../service/weatherApi";

// --- Helper Imports ---
import { globalErrorHandler } from "../../helpers";

// --- State Imports ---
import { historicalWeatherAtom } from "../../globalState/atoms";

export function useHistoricalWeather(latLon: string | null) {
  // --- State Variables ---
  const [history, setHistory] = useAtom(historicalWeatherAtom);

  // ---- UI States ----
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!latLon) return;
    (async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await globalErrorHandler(() =>
        WeatherAPI.getHistoricalWeather(latLon)
      );
      if (error) {
        setError(error.message);
      } else if (data) {
        setHistory(data);
        setLoading(false);
      }
    })();
  }, [latLon, setHistory]);

  return { history, loading, error };
}
