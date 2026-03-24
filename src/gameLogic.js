import {
  HUNGER_DECAY_RATE, HAPPY_DECAY_RATE, HEALTH_DECAY_RATE, HEALTH_REGEN_RATE,
  FEED_HUNGER_RESTORE, FEED_HAPPY_RESTORE, FEED_XP, FEED_COOLDOWN_MS,
  PLAY_HAPPY_RESTORE, PLAY_HUNGER_COST, PLAY_XP, PLAY_COOLDOWN_MS,
  WALK_HAPPY_RESTORE, WALK_HUNGER_COST, WALK_XP, WALK_COOLDOWN_MS,
  XP_PER_STAGE, MAX_STAGE, MAX_CATCHUP_MINUTES,
} from './constants';

export function defaultState() {
  const now = Date.now();
  return {
    stage: 0,
    growthXP: 0,
    hunger: 1.0,
    happiness: 1.0,
    health: 1.0,
    lastTickTime: now,
    lastFedTime: 0,
    lastPlayTime: 0,
    lastWalkTime: 0,
  };
}

export function applyDecay(state, nowMs) {
  const elapsedMin = Math.min(
    (nowMs - state.lastTickTime) / 60_000,
    MAX_CATCHUP_MINUTES,
  );

  const hunger    = Math.max(0, state.hunger    - HUNGER_DECAY_RATE * elapsedMin);
  const happiness = Math.max(0, state.happiness - HAPPY_DECAY_RATE  * elapsedMin);

  const distressed = hunger < 0.2 || happiness < 0.2;
  const health = distressed
    ? Math.max(0,   state.health - HEALTH_DECAY_RATE * elapsedMin)
    : Math.min(1.0, state.health + HEALTH_REGEN_RATE * elapsedMin);

  return { ...state, hunger, happiness, health, lastTickTime: nowMs };
}

function evolve(state) {
  if (state.growthXP >= XP_PER_STAGE && state.stage < MAX_STAGE) {
    return { ...state, stage: state.stage + 1, growthXP: 0 };
  }
  return state;
}

export function applyFeed(state, nowMs) {
  if (nowMs - state.lastFedTime < FEED_COOLDOWN_MS) return null; // on cooldown
  const next = {
    ...state,
    hunger:    Math.min(1.0, state.hunger    + FEED_HUNGER_RESTORE),
    happiness: Math.min(1.0, state.happiness + FEED_HAPPY_RESTORE),
    growthXP:  Math.min(XP_PER_STAGE, state.growthXP + FEED_XP),
    lastFedTime: nowMs,
  };
  return evolve(next);
}

export function applyPlay(state, nowMs) {
  if (nowMs - state.lastPlayTime < PLAY_COOLDOWN_MS) return null;
  const next = {
    ...state,
    happiness: Math.min(1.0, state.happiness + PLAY_HAPPY_RESTORE),
    hunger:    Math.max(0,   state.hunger    - PLAY_HUNGER_COST),
    growthXP:  Math.min(XP_PER_STAGE, state.growthXP + PLAY_XP),
    lastPlayTime: nowMs,
  };
  return evolve(next);
}

export function applyWalk(state, nowMs) {
  if (nowMs - state.lastWalkTime < WALK_COOLDOWN_MS) return null;
  const next = {
    ...state,
    happiness: Math.min(1.0, state.happiness + WALK_HAPPY_RESTORE),
    hunger:    Math.max(0,   state.hunger    - WALK_HUNGER_COST),
    growthXP:  Math.min(XP_PER_STAGE, state.growthXP + WALK_XP),
    lastWalkTime: nowMs,
  };
  return evolve(next);
}

export const COOLDOWNS = {
  feed: FEED_COOLDOWN_MS,
  play: PLAY_COOLDOWN_MS,
  walk: WALK_COOLDOWN_MS,
};
