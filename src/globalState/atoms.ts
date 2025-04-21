import { atom } from "jotai";
import {
  GetUserLocationResponse,
  GetHistoricalWeatherResponse,
  GetFutureWeatherResponse,
} from "../repository/WeatherRepository";

export const locationAtom = atom<GetUserLocationResponse | null>(null);
export const historicalWeatherAtom = atom<GetHistoricalWeatherResponse | null>(
  null
);
export const futureWeatherAtom = atom<GetFutureWeatherResponse | null>(null);
export const selectedDayAtom = atom<string>("Today");
