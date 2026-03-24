import './EvolveOverlay.css';

export default function EvolveOverlay({ visible }) {
  if (!visible) return null;
  return (
    <div className="evolve-overlay">
      <div className="evolve-stars">
        {['⭐','🌟','✨','💫','⭐','🌟','✨','💫'].map((s, i) => (
          <span key={i} className="evolve-star" style={{ '--i': i }}>{s}</span>
        ))}
      </div>
      <div className="evolve-text">せいちょうした！</div>
    </div>
  );
}
