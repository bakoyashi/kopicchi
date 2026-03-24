import './StatBar.css';

export default function StatBar({ icon, value, color, label, danger }) {
  // value: 0.0‒1.0. For danger bars high value is bad; for normal bars low is bad.
  const pct   = Math.round(value * 100);
  const isLow  = !danger && value < 0.25;
  const isHigh =  danger && value > 0.6;

  return (
    <div
      className={`stat-bar-row ${isLow ? 'stat-low' : ''} ${isHigh ? 'stat-high' : ''}`}
      aria-label={label}
    >
      <span className="stat-icon">{icon}</span>
      <div className={`stat-track ${danger ? 'stat-track-danger' : ''}`}>
        <div
          className="stat-fill"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  );
}
