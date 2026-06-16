export default function AlertPreview({ alerts, label }) {
  return (
    <section className="card alerts">
      <span className="card__label">Alert preview</span>
      <p className="alerts__note">
        What WeatherAI’s SMS service would send to a phone in {label}. (Preview
        only — live sending needs a paid plan.)
      </p>

      {alerts.length === 0 ? (
        <div className="alerts__empty">
          No alerts in range. Calm conditions ahead.
        </div>
      ) : (
        <ul className="alerts__list">
          {alerts.map((a, i) => (
            <li key={i} className={`sms sms--${a.severity}`}>
              <div className="sms__head">
                <span className="sms__type">{a.title}</span>
                <span className="sms__badge">SMS</span>
              </div>
              <p className="sms__body">{a.sms}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}