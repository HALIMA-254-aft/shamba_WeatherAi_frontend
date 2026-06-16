// Talks to OUR backend (never directly to WeatherAI — the key lives on the server).
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

// ---------------------------------------------------------------------------
// Response normalization
// ---------------------------------------------------------------------------
// The WeatherAI docs don't publish the exact JSON shape of /v1/weather, so this
// function maps the raw response into a predictable shape the UI uses. If a
// field shows up blank in the app, flip on "Show raw API response" in the UI,
// look at the real key names, and adjust the paths below. Everything the rest
// of the app reads goes through here, so this is the ONLY place you edit.
export function normalizeWeather(raw) {
  const current = raw?.current ?? raw?.now ?? {};
  const daily = raw?.daily ?? raw?.forecast ?? raw?.days ?? [];

  return {
    aiSummary: raw?.ai_summary ?? raw?.summary ?? raw?.ai ?? null,
    current: {
      temp: pickNumber(current.temp, current.temperature),
      condition: current.condition ?? current.description ?? current.summary ?? "—",
      humidity: pickNumber(current.humidity),
      windSpeed: pickNumber(current.wind_speed, current.windSpeed, current.wind),
      icon: current.icon ?? null,
    },
    daily: (Array.isArray(daily) ? daily : []).map((d) => ({
      date: d.date ?? d.day ?? d.dt ?? null,
      tempMax: pickNumber(d.temp_max, d.tempMax, d.max, d.high),
      tempMin: pickNumber(d.temp_min, d.tempMin, d.min, d.low),
      condition: d.condition ?? d.description ?? d.summary ?? "—",
      precipMm: pickNumber(d.precip_mm, d.precipMm, d.rain, d.precipitation),
      precipChance: pickNumber(d.precip_chance, d.pop, d.chance_of_rain),
      windSpeed: pickNumber(d.wind_speed, d.windSpeed, d.wind),
    })),
  };
}

function pickNumber(...candidates) {
  for (const c of candidates) {
    if (typeof c === "number" && !Number.isNaN(c)) return c;
    if (typeof c === "string" && c.trim() !== "" && !Number.isNaN(Number(c))) {
      return Number(c);
    }
  }
  return null;
}