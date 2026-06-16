function dayName(date) {
  if (!date) return "—";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString(undefined, { weekday: "short" });
}

export default function ForecastList({ daily }) {
  if (!daily.length) return null;
  return (
    <section className="card forecast">
      <span className="card__label">7-day forecast</span>
      <ul className="forecast__list">
        {daily.map((d, i) => (
          <li key={i} className="forecast__day">
            <span className="forecast__name">{dayName(d.date)}</span>
            <span className="forecast__cond">{d.condition}</span>
            <span className="forecast__rain">
              {d.precipMm != null ? `${Math.round(d.precipMm)}mm` : ""}
            </span>
            <span className="forecast__temps">
              <strong>{d.tempMax != null ? Math.round(d.tempMax) : "—"}°</strong>
              <span className="forecast__min">
                {d.tempMin != null ? Math.round(d.tempMin) : "—"}°
              </span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
