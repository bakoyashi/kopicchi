import StatBar from './StatBar';
import './StatsPanel.css';

export default function StatsPanel({ hunger, happiness, health, tired, overfed }) {
  return (
    <div className="stats-panel">
      <StatBar icon="🍖" value={hunger}    color="#ff9f43" label="おなか" />
      <StatBar icon="⭐" value={happiness} color="#ffd166" label="きぶん" />
      <StatBar icon="❤️" value={health}   color="#ef476f" label="けんこう" />
      {tired   > 0.05 && <StatBar icon="💤" value={tired}   color="#9b8ec4" label="つかれ"   danger />}
      {overfed > 0.05 && <StatBar icon="🤢" value={overfed} color="#e8a030" label="たべすぎ" danger />}
    </div>
  );
}
