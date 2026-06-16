export default function CurrentConditions({ current, label }) {
  return (
    <section className="card current">
      <div className="current__head">
        <span className="card__label">Now in {label}</span>
        <span className="current__condition">{current.condition}</span>
      </div>
      <div className="current__temp">
        {current.temp != null ? Math.round(current.temp) : "—"}
        <span className="current__unit">°C</span>
      </div>
      <dl className="current__stats">
        <div>
          <dt>Humidity</dt>
          <dd>{current.humidity != null ? `${current.humidity}%` : "—"}</dd>
        </div>
        <div>
          <dt>Wind</dt>
          <dd>
            {current.windSpeed != null ? `${Math.round(current.windSpeed)} km/h` : "—"}
          </dd>
        </div>
      </dl>
    </section>
  );
}
