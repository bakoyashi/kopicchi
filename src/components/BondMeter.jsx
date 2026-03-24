import { BOND_PER_LEVEL } from '../constants';
import './BondMeter.css';

export default function BondMeter({ bond, bondGain }) {
  const level    = Math.floor(bond / BOND_PER_LEVEL) + 1;
  const progress = bond % BOND_PER_LEVEL;
  const pct      = Math.round((progress / BOND_PER_LEVEL) * 100);

  return (
    <div className="bond-meter">
      <div className="bond-header">
        <span className="bond-icon">💕</span>
        <span className="bond-label">きずな</span>
        <span className="bond-level">Lv.{level}</span>
        <span className="bond-total">❤️ × {bond}</span>
        {bondGain && (
          <span className="bond-gain" key={bond}>+{bondGain} 💕</span>
        )}
      </div>
      <div className="bond-track">
        <div
          className="bond-fill"
          style={{ width: `${pct}%` }}
        />
        <span className="bond-next-hint">{progress}/{BOND_PER_LEVEL}</span>
      </div>
    </div>
  );
}
