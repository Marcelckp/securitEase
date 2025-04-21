// --- Third Party Imports ---
import { useState } from "react";
import { useAtom } from "jotai";

// --- API Imports ---
import { WeatherAPI } from "../../../service/weatherApi";

// --- Helper Imports ---
import { globalErrorHandler } from "../../../helpers";

// --- State Imports ---
import { locationAtom } from "../../../globalState/atoms";

// --- Hook Imports ---
import { useHotKey } from "../../../hooks/useHotKey";

export const HotKeyDialog = () => {
  // --- State Variables ---
  const [, setCurrLocationData] = useAtom(locationAtom);
  const [location, setLocation] = useState<string>("");

  // ---- UI States ----
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);

  // Hotkey listener in React
  useHotKey();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    (document.getElementById("location-dialog") as HTMLDialogElement)?.close();
    if (location.trim() !== "") {
      console.log(location.trim());

      // setLoading(true);
      const { data, error } = await globalErrorHandler(
        WeatherAPI.getUserLocation
      );
      if (error) {
        // setError(error.message);
        return;
      }
      if (data) setCurrLocationData(data);
      // setLoading(false);
    }
  };

  return (
    <dialog
      id="location-dialog"
      data-testid="location-dialog"
      style={{ padding: 0 }}
    >
      <form
        method="dialog"
        style={{
          margin: 0,
          padding: 24,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
        onSubmit={handleSubmit}
      >
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 10,
          }}
          onClick={() =>
            (
              document.getElementById("location-dialog") as HTMLDialogElement
            )?.close()
          }
        />
        <p>Not implemented</p>
        {/* <input
          id="location-input"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
          aria-label="Enter location"
          autoComplete="off"
          autoFocus
          style={{
            zIndex: 11,
            position: "relative",
            padding: "12px",
            fontSize: "1rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            outline: "none",
            width: "100%",
            boxSizing: "border-box",
            margin: "24px 0",
          }}
        />
        {location && location.trim() !== "" && (
          <button
            type="submit"
            style={{
              zIndex: 11,
              position: "relative",
              padding: "10px 16px",
              fontSize: "1rem",
              borderRadius: "6px",
              border: "none",
              background: "#1976d2",
              color: "#fff",
              cursor: "pointer",
              alignSelf: "flex-end",
            }}
          >
            Set Location
          </button>
        )} */}
      </form>
    </dialog>
  );
};
