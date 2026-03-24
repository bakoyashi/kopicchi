import ActionButton from './ActionButton';
import './ActionsPanel.css';

export default function ActionsPanel({ state, feedDog, playWithDog, walkDog }) {
  return (
    <div className="actions-panel">
      <ActionButton action="feed" lastActionTime={state.lastFedTime}  onPress={feedDog}     />
      <ActionButton action="play" lastActionTime={state.lastPlayTime} onPress={playWithDog} />
      <ActionButton action="walk" lastActionTime={state.lastWalkTime} onPress={walkDog}     />
    </div>
  );
}
