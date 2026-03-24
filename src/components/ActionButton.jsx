import { COOLDOWNS } from '../gameLogic';
import './ActionButton.css';

const ACTION_META = {
  feed: { emoji: '🍖', label: 'たべる',   bgColor: '#ff9f43', glowColor: 'rgba(255,159,67,0.5)' },
  play: { emoji: '⚽', label: 'あそぶ',   bgColor: '#a29bfe', glowColor: 'rgba(162,155,254,0.5)' },
  walk: { emoji: '🦮', label: 'さんぽ',   bgColor: '#00cec9', glowColor: 'rgba(0,206,201,0.5)' },
};

export default function ActionButton({ action, lastActionTime, onPress }) {
  const now = Date.now();
  const cooldown = COOLDOWNS[action];
  const remaining = cooldown - (now - lastActionTime);
  const onCooldown = remaining > 0;

  const { emoji, label, bgColor, glowColor } = ACTION_META[action];

  return (
    <button
      className={`action-btn ${onCooldown ? 'on-cooldown' : 'available'}`}
      style={{
        '--btn-color': bgColor,
        '--btn-glow':  glowColor,
      }}
      onClick={onPress}
      disabled={onCooldown}
      aria-label={label}
    >
      <span className="action-emoji">{emoji}</span>
      <span className="action-label">{label}</span>
      {onCooldown && (
        <span className="cooldown-overlay">⏱</span>
      )}
    </button>
  );
}
