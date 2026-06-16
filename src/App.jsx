import { useState } from "react";
import { fetchWeather, normalizeWeather } from "./api.js";
import { deriveAlerts } from "./alerts.js";
import LocationPicker from "./components/LocationPicker.jsx";
import CurrentConditions from "./components/CurrentConditions.jsx";
import AiSummary from "./components/AiSummary.jsx";
import ForecastList from "./components/ForecastList.jsx";
import AlertPreview from "./components/AlertPreview.jsx";
import WelcomePanel from "./components/WelcomePanel.jsx";

export default function App() {
  const [location, setLocation] = useState(null);
  const [data, setData] = useState(null);
  const [raw, setRaw] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showRaw, setShowRaw] = useState(false);

  async function loadForecast(loc) {
    setLocation(loc);
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const rawData = await fetchWeather({ lat: loc.lat, lon: loc.lon });
      setRaw(rawData);
      setData(normalizeWeather(rawData));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const alerts = data ? deriveAlerts(data.daily, location?.label || "your area") : [];

  return (
    <div className="page">
      <header className="masthead">
        <span className="eyebrow">WeatherAI · last-mile forecast</span>
        <h1>Shamba Weather</h1>
        <p className="lede">
          Hyperlocal forecasts with a preview of the SMS alerts that would reach
          a phone — internet or not.
        </p>
      </header>

      <LocationPicker onSelect={loadForecast} activeLat={location?.lat} />
      {!data && !loading && !error && <WelcomePanel />}

      {loading && <p className="status">Loading forecast for {location?.label}…</p>}
      {error && (
        <div className="status status--error">
          Couldn’t load the forecast: {error}
          <span className="status__hint">
            Check that the server is running and your API key is set.
          </span>
        </div>
      )}

      {data && !loading && (
        <main className="grid">
          <section className="col col--main">
            <CurrentConditions
              current={data.current}
              label={location?.label}
            />
            {data.aiSummary && <AiSummary text={data.aiSummary} />}
            <ForecastList daily={data.daily} />
          </section>

          <aside className="col col--side">
            <AlertPreview alerts={alerts} label={location?.label} />
          </aside>
        </main>
      )}

      {raw && (
        <section className="debug">
          <button className="debug__toggle" onClick={() => setShowRaw((s) => !s)}>
            {showRaw ? "Hide" : "Show"} raw API response
          </button>
          {showRaw && (
            <pre className="debug__json">{JSON.stringify(raw, null, 2)}</pre>
          )}
        </section>
      )}

      <footer className="footer">
        Built on the WeatherAI API · free tier · key kept server-side
      </footer>
    </div>
  );
}
