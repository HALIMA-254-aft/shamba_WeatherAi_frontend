const FEATURES = [
  {
    title: "Hyperlocal forecasts",
    body: "Current conditions and a 7-day outlook for any town, from the WeatherAI API.",
  },
  {
    title: "AI summaries",
    body: "Plain-language summaries that turn raw numbers into what matters today.",
  },
  {
    title: "SMS alert previews",
    body: "See the text warnings that would reach a phone when rain or wind is coming.",
    accent: true,
  },
];

export default function WelcomePanel() {
  return (
    <section className="welcome">
      <div className="welcome__intro">
        <svg className="welcome__art" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <g stroke="#e8a33d" strokeWidth="3" strokeLinecap="round">
            <line x1="42" y1="14" x2="42" y2="6" />
            <line x1="20" y1="24" x2="14" y2="18" />
            <line x1="14" y1="46" x2="6" y2="46" />
            <line x1="64" y1="24" x2="70" y2="18" />
          </g>
          <circle cx="42" cy="46" r="16" fill="#e8a33d" />
          <path d="M44 92 a18 18 0 0 1 2 -35 a24 24 0 0 1 45 5 a15 15 0 0 1 -3 30 z" fill="#1b2733" stroke="#9bafc0" strokeWidth="2.5" />
        </svg>
        <h2>Pick a town to see its weather</h2>
        <p>Choose one of the towns above, or use your location, and the forecast loads instantly.</p>
      </div>
      <ul className="welcome__features">
        {FEATURES.map((f) => (
          <li
            key={f.title}
            className={"welcome__feature" + (f.accent ? " welcome__feature--accent" : "")}
          >
            <h3>{f.title}</h3>
            <p>{f.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
