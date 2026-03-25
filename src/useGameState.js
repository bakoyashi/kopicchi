import { useState, useEffect, useRef, useCallback } from 'react';
import { STORAGE_KEY, TICK_INTERVAL_MS, MAX_STAGE, FEED_BOND, PLAY_BOND, WALK_BOND } from './constants';
import { defaultState, applyDecay, applyFeed, applyPlay, applyWalk } from './gameLogic';
import { playFeedSound, playPlaySound, playWalkSound, playLevelUpSound } from './sounds';

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const saved = JSON.parse(raw);
      // Clamp stage in case an older save has a higher stage count
      if (saved.stage > MAX_STAGE) saved.stage = MAX_STAGE;
      return { ...defaultState(), ...saved };
    }
  } catch (_) { /* ignore */ }
  return defaultState();
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (_) { /* ignore */ }
}

export function useGameState() {
  const [state, setStateRaw] = useState(() => {
    const loaded = loadState();
    return applyDecay(loaded, Date.now());
  });

  // animation: null | 'feed' | 'play' | 'walk' | 'evolve'
  const [animation, setAnimation] = useState(null);
  const animTimerRef = useRef(null);

  // bondGain: null | number — shows floating "+N 💕" for 1.5 s
  const [bondGain, setBondGain] = useState(null);
  const bondTimerRef = useRef(null);

  const setState = useCallback((updater) => {
    setStateRaw(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      saveState(next);
      return next;
    });
  }, []);

  // Live decay tick
  useEffect(() => {
    const id = setInterval(() => {
      setState(s => applyDecay(s, Date.now()));
    }, TICK_INTERVAL_MS);
    return () => clearInterval(id);
  }, [setState]);

  function triggerAnimation(name, bond = 0) {
    clearTimeout(animTimerRef.current);
    setAnimation(name);
    animTimerRef.current = setTimeout(() => setAnimation(null), 1100);
    // Floating bond gain popup
    if (bond > 0) {
      clearTimeout(bondTimerRef.current);
      setBondGain(bond);
      bondTimerRef.current = setTimeout(() => setBondGain(null), 1400);
    }
    // Play matching bark sound
    if      (name === 'evolve') playLevelUpSound();
    else if (name === 'feed')   playFeedSound();
    else if (name === 'play')   playPlaySound();
    else if (name === 'walk')   playWalkSound();
  }

  const feedDog = useCallback(() => {
    const now = Date.now();
    setState(s => {
      const prevStage = s.stage;
      const next = applyFeed(s, now);
      if (!next) return s; // on cooldown
      if (next.stage > prevStage) triggerAnimation('evolve', FEED_BOND);
      else triggerAnimation('feed', FEED_BOND);
      return next;
    });
  }, [setState]);

  const playWithDog = useCallback(() => {
    const now = Date.now();
    setState(s => {
      const prevStage = s.stage;
      const next = applyPlay(s, now);
      if (!next) return s;
      if (next.stage > prevStage) triggerAnimation('evolve', PLAY_BOND);
      else triggerAnimation('play', PLAY_BOND);
      return next;
    });
  }, [setState]);

  const walkDog = useCallback(() => {
    const now = Date.now();
    setState(s => {
      const prevStage = s.stage;
      const next = applyWalk(s, now);
      if (!next) return s;
      if (next.stage > prevStage) triggerAnimation('evolve', WALK_BOND);
      else triggerAnimation('walk', WALK_BOND);
      return next;
    });
  }, [setState]);

  const resetGame = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setStateRaw(defaultState());
    setAnimation(null);
  }, []);

  return { state, animation, bondGain, feedDog, playWithDog, walkDog, resetGame };
}
