import { STAGES, MAX_STAGE } from '../constants';
import './GrowthMeter.css';

export default function GrowthMeter({ stage, growthXP }) {
  const stageInfo = STAGES[stage];
  const isMaxStage = stage >= MAX_STAGE;
  const pct = isMaxStage ? 100 : Math.round(growthXP);

  return (
    <div className="growth-meter">
      <div className="stage-badge">
        <span className="stage-emoji">{stageInfo.emoji}</span>
        <span className="stage-name">{stageInfo.name}</span>
      </div>
      <div className="growth-track">
        <div
          className="growth-fill"
          style={{
            width: `${pct}%`,
            background: stageInfo.primaryColor,
          }}
        />
      </div>
      {isMaxStage && <span className="max-label">✨ MAX ✨</span>}
    </div>
  );
}
