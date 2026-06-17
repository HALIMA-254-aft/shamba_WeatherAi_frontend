
// Talks to OUR backend, which fetches Open-Meteo and returns a clean shape.
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export async function fetchWeather({ lat, lon, days = 7 }) {
  const url = `${API_BASE}/api/weather?lat=${lat}&lon=${lon}&days=${days}`;
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error || "Failed to load weather data.");
  }
  return data;
}

// The backend already returns a normalized shape, so this just guards
// against any missing fields before the UI reads them.
export function normalizeWeather(raw) {
  return {
    aiSummary: raw?.aiSummary ?? null,
    current: {
      temp: numOrNull(raw?.current?.temp),
      condition: raw?.current?.condition ?? "—",
      humidity: numOrNull(raw?.current?.humidity),
      windSpeed: numOrNull(raw?.current?.windSpeed),
    },
    daily: Array.isArray(raw?.daily)
      ? raw.daily.map((d) => ({
          date: d.date ?? null,
          tempMax: numOrNull(d.tempMax),
          tempMin: numOrNull(d.tempMin),
          condition: d.condition ?? "—",
          precipMm: numOrNull(d.precipMm),
          precipChance: numOrNull(d.precipChance),
          windSpeed: numOrNull(d.windSpeed),
        }))
      : [],
  };
}

function numOrNull(v) {
  return typeof v === "number" && !Number.isNaN(v) ? v : null;
}
