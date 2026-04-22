export default function MetricCard({ title, value, sub, color }) {
  return (
    <div className={`metric-card ${color}`}>
      <p>{title}</p>
      <h2>{value}</h2>
      <small>{sub}</small>
    </div>
  );
}