import { useState, useEffect, useRef, useCallback } from 'react';
import { STORAGE_KEY, TICK_INTERVAL_MS } from './constants';
import { defaultState, applyDecay, applyFeed, applyPlay, applyWalk } from './gameLogic';

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaultState(), ...JSON.parse(raw) };
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

  function triggerAnimation(name) {
    clearTimeout(animTimerRef.current);
    setAnimation(name);
    animTimerRef.current = setTimeout(() => setAnimation(null), 900);
  }

  const feedDog = useCallback(() => {
    const now = Date.now();
    setState(s => {
      const prevStage = s.stage;
      const next = applyFeed(s, now);
      if (!next) return s; // on cooldown
      if (next.stage > prevStage) triggerAnimation('evolve');
      else triggerAnimation('feed');
      return next;
    });
  }, [setState]);

  const playWithDog = useCallback(() => {
    const now = Date.now();
    setState(s => {
      const prevStage = s.stage;
      const next = applyPlay(s, now);
      if (!next) return s;
      if (next.stage > prevStage) triggerAnimation('evolve');
      else triggerAnimation('play');
      return next;
    });
  }, [setState]);

  const walkDog = useCallback(() => {
    const now = Date.now();
    setState(s => {
      const prevStage = s.stage;
      const next = applyWalk(s, now);
      if (!next) return s;
      if (next.stage > prevStage) triggerAnimation('evolve');
      else triggerAnimation('walk');
      return next;
    });
  }, [setState]);

  return { state, animation, feedDog, playWithDog, walkDog };
}
