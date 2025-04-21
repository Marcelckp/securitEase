// --- HELPER IMPORTS ---
import { formatDate } from "../helpers";

// --- REPOSITORY IMPORTS ---
import { WeatherApiRepository } from "../repository";

// --- ENV VARIABLES ---
const API_KEY = import.meta.env.VITE_WEATHERAPI_KEY;
const BASE_URL = import.meta.env.VITE_WEATHERAPI_BASE_URL;

// WEATHER API SERVICE ENDPOINTS
const getCurrentWeather = async (co_ords: string) => {
  try {
    const res = await fetch(
      `${BASE_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(co_ords)}`
    );
    if (!res.ok) {
      return {
        message: "Failed to fetch current weather",
        status: res.status,
        error: true,
      };
    }
    return await res.json();
  } catch {
    return {
      message: "Failed to fetch current weather",
      status: 500,
      error: true,
    };
  }
};

const getHistoricalWeather = async (co_ords: string) => {
  try {
    const today = formatDate(new Date());
    const endDate = formatDate(new Date(new Date(today).setDate(new Date(today).getDate() - 3)));
    const res = await fetch(
      `${BASE_URL}/history.json?key=${API_KEY}&q=${encodeURIComponent(
      co_ords
      )}&dt=${endDate}&end_dt=${today}`
    );
    if (!res.ok) {
      return {
        message: "Failed to fetch historical weather",
        status: res.status,
        error: true,
      };
    }
    return await res.json();
  } catch {
    return {
      message: "Failed to fetch historical weather",
      status: 500,
      error: true,
    };
  }
};

const getFutureWeather = async (co_ords: string) => {
  try {
    const res = await fetch(
      `${BASE_URL}/forecast.json?key=${API_KEY}&days=4&q=${encodeURIComponent(
        co_ords
      )}`
    );
    if (!res.ok) {
      return {
        message: "Failed to fetch forecast weather",
        status: res.status,
        error: true,
      };
    }
    return await res.json();
  } catch {
    return {
      message: "Failed to fetch forecast weather",
      status: 500,
      error: true,
    };
  }
};

const getUserLocation = async () => {
  try {
    const res = await fetch(`${BASE_URL}/ip.json?key=${API_KEY}&q=auto:ip`);
    if (!res.ok) {
      return {
        message: "Failed to fetch user location based weather data",
        status: res.status,
        error: true,
      };
    }
    return await res.json();
  } catch {
    return {
      message: "Failed to fetch user location based weather data",
      status: 500,
      error: true,
    };
  }
};


export const WeatherAPI: WeatherApiRepository = {
  getCurrentWeather,
  getHistoricalWeather,
  getFutureWeather,
  getUserLocation,
};
