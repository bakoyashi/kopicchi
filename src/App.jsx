import { useGameState } from './useGameState';
import DogSprite     from './components/DogSprite';
import StatsPanel    from './components/StatsPanel';
import ActionsPanel  from './components/ActionsPanel';
import GrowthMeter   from './components/GrowthMeter';
import EvolveOverlay from './components/EvolveOverlay';
import { STAGES }    from './constants';
import './styles/App.css';

export default function App() {
  const { state, animation, feedDog, playWithDog, walkDog } = useGameState();
  const stageInfo = STAGES[state.stage];

  return (
    <div
      className="app-shell"
      style={{ '--stage-bg': stageInfo.bgColor, '--stage-color': stageInfo.primaryColor }}
    >
      <EvolveOverlay visible={animation === 'evolve'} />

      <header className="app-header">
        <h1 className="app-title">コピっち</h1>
      </header>

      <section className="growth-section">
        <GrowthMeter stage={state.stage} growthXP={state.growthXP} />
      </section>

      <section className="sprite-section">
        <DogSprite stage={state.stage} animation={animation} />
      </section>

      <section className="stats-section">
        <StatsPanel
          hunger={state.hunger}
          happiness={state.happiness}
          health={state.health}
        />
      </section>

      <section className="actions-section">
        <ActionsPanel
          state={state}
          feedDog={feedDog}
          playWithDog={playWithDog}
          walkDog={walkDog}
        />
      </section>
    </div>
  );
}
