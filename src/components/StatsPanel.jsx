import StatBar from './StatBar';
import './StatsPanel.css';

export default function StatsPanel({ hunger, happiness, health }) {
  return (
    <div className="stats-panel">
      <StatBar icon="🍖" value={hunger}    color="#ff9f43" label="おなか" />
      <StatBar icon="⭐" value={happiness} color="#ffd166" label="きぶん" />
      <StatBar icon="❤️" value={health}   color="#ef476f" label="けんこう" />
    </div>
  );
}
