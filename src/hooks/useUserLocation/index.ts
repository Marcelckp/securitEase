// --- Third Party Imports ---
import { useState, useEffect } from "react";
import { useAtom } from "jotai";

// --- API Imports ---
import { WeatherAPI } from "../../service/weatherApi";

// --- Helper Imports ---
import { globalErrorHandler } from "../../helpers";

// --- State Imports ---
import { locationAtom } from "../../globalState/atoms";

export function useUserLocation() {
  // --- State Variables ---
  const [location, setLocation] = useAtom(locationAtom);

  // ---- UI States ----
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await globalErrorHandler(
        WeatherAPI.getUserLocation
      );
      if (error) {
        setError(error.message);
      } else if (data) {
        setLocation(data);
      }
      setLoading(false);
    })();
  }, [setLocation]);

  return { location, loading, error };
}
