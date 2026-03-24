import './StatBar.css';

export default function StatBar({ icon, value, color, label }) {
  // value: 0.0‒1.0
  const pct = Math.round(value * 100);
  const isLow = value < 0.25;

  return (
    <div className={`stat-bar-row ${isLow ? 'stat-low' : ''}`} aria-label={label}>
      <span className="stat-icon">{icon}</span>
      <div className="stat-track">
        <div
          className="stat-fill"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  );
}
