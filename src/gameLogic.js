import {
  HUNGER_DECAY_RATE, HAPPY_DECAY_RATE, HEALTH_DECAY_RATE, HEALTH_REGEN_RATE,
  FEED_HUNGER_RESTORE, FEED_HAPPY_RESTORE, FEED_XP, FEED_COOLDOWN_MS,
  PLAY_HAPPY_RESTORE, PLAY_HUNGER_COST, PLAY_XP, PLAY_COOLDOWN_MS,
  WALK_HAPPY_RESTORE, WALK_HUNGER_COST, WALK_XP, WALK_COOLDOWN_MS,
  XP_PER_STAGE, MAX_STAGE, MAX_CATCHUP_MINUTES,
  FEED_BOND, PLAY_BOND, WALK_BOND,
  PLAY_TIRED_GAIN, WALK_TIRED_GAIN, TIRED_DECAY_RATE, TIRED_BLOCK_THRESHOLD,
  OVERFED_GAIN, OVERFED_DECAY_RATE, OVERFED_BLOCK_THRESHOLD, OVERFED_HUNGER_TRIGGER,
} from './constants';

export function defaultState() {
  const now = Date.now();
  return {
    stage: 0,
    growthXP: 0,
    bond: 0,
    hunger: 1.0,
    happiness: 1.0,
    health: 1.0,
    tired: 0.0,
    overfed: 0.0,
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

  // Tired and overfed naturally recover over time (rest / digestion)
  const tired   = Math.max(0, (state.tired   ?? 0) - TIRED_DECAY_RATE   * elapsedMin);
  const overfed = Math.max(0, (state.overfed ?? 0) - OVERFED_DECAY_RATE * elapsedMin);

  const distressed =
    hunger < 0.2 || happiness < 0.2 ||
    tired  >= TIRED_BLOCK_THRESHOLD  ||
    overfed >= OVERFED_BLOCK_THRESHOLD;

  const health = distressed
    ? Math.max(0,   state.health - HEALTH_DECAY_RATE * elapsedMin)
    : Math.min(1.0, state.health + HEALTH_REGEN_RATE * elapsedMin);

  return { ...state, hunger, happiness, health, tired, overfed, lastTickTime: nowMs };
}

function evolve(state) {
  if (state.growthXP >= XP_PER_STAGE && state.stage < MAX_STAGE) {
    return { ...state, stage: state.stage + 1, growthXP: 0 };
  }
  return state;
}

export function applyFeed(state, nowMs) {
  if (nowMs - state.lastFedTime < FEED_COOLDOWN_MS) return null; // on cooldown
  const overfed = state.overfed ?? 0;
  if (overfed >= OVERFED_BLOCK_THRESHOLD) return null; // too stuffed to eat
  const nextOverfed = state.hunger > OVERFED_HUNGER_TRIGGER
    ? Math.min(1.0, overfed + OVERFED_GAIN)
    : overfed;
  const next = {
    ...state,
    hunger:    Math.min(1.0, state.hunger    + FEED_HUNGER_RESTORE),
    happiness: Math.min(1.0, state.happiness + FEED_HAPPY_RESTORE),
    growthXP:  Math.min(XP_PER_STAGE, state.growthXP + FEED_XP),
    bond:      state.bond + FEED_BOND,
    overfed:   nextOverfed,
    lastFedTime: nowMs,
  };
  return evolve(next);
}

export function applyPlay(state, nowMs) {
  if (nowMs - state.lastPlayTime < PLAY_COOLDOWN_MS) return null;
  const tired = state.tired ?? 0;
  if (tired >= TIRED_BLOCK_THRESHOLD) return null; // too tired to play
  const next = {
    ...state,
    happiness: Math.min(1.0, state.happiness + PLAY_HAPPY_RESTORE),
    hunger:    Math.max(0,   state.hunger    - PLAY_HUNGER_COST),
    growthXP:  Math.min(XP_PER_STAGE, state.growthXP + PLAY_XP),
    bond:      state.bond + PLAY_BOND,
    tired:     Math.min(1.0, tired + PLAY_TIRED_GAIN),
    lastPlayTime: nowMs,
  };
  return evolve(next);
}

export function applyWalk(state, nowMs) {
  if (nowMs - state.lastWalkTime < WALK_COOLDOWN_MS) return null;
  const tired = state.tired ?? 0;
  if (tired >= TIRED_BLOCK_THRESHOLD) return null; // too tired to walk
  const next = {
    ...state,
    happiness: Math.min(1.0, state.happiness + WALK_HAPPY_RESTORE),
    hunger:    Math.max(0,   state.hunger    - WALK_HUNGER_COST),
    growthXP:  Math.min(XP_PER_STAGE, state.growthXP + WALK_XP),
    bond:      state.bond + WALK_BOND,
    tired:     Math.min(1.0, tired + WALK_TIRED_GAIN),
    lastWalkTime: nowMs,
  };
  return evolve(next);
}

export const COOLDOWNS = {
  feed: FEED_COOLDOWN_MS,
  play: PLAY_COOLDOWN_MS,
  walk: WALK_COOLDOWN_MS,
};
