export default function AiSummary({ text }) {
  return (
    <section className="card ai">
      <span className="card__label">AI summary</span>
      <p className="ai__text">{text}</p>
    </section>
  );
}
