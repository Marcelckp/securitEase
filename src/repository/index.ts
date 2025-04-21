import type {
  GetCurrentWeatherResponse,
  GetFutureWeatherResponse,
  GetUserLocationResponse,
  GetHistoricalWeatherResponse,
} from "./WeatherRepository";

export type WeatherApiRepository = {
    getCurrentWeather: (co_ords: string) => Promise<GetCurrentWeatherResponse>;
    getHistoricalWeather: (co_ords: string) => Promise<GetHistoricalWeatherResponse>;
    getFutureWeather: (co_ords: string) => Promise<GetFutureWeatherResponse>;
    getUserLocation: () => Promise<GetUserLocationResponse>;
};
