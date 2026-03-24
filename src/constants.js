// ── Decay rates (per minute, 0‒1 scale) ──────────────────────────────────────
export const HUNGER_DECAY_RATE  = 0.008; // empty in ~125 min
export const HAPPY_DECAY_RATE   = 0.006; // empty in ~167 min
export const HEALTH_DECAY_RATE  = 0.003; // when distressed
export const HEALTH_REGEN_RATE  = 0.004; // when well-cared for

// ── Action effects ────────────────────────────────────────────────────────────
export const FEED_HUNGER_RESTORE  = 0.40;
export const FEED_HAPPY_RESTORE   = 0.10;
export const FEED_XP              = 8;
export const FEED_COOLDOWN_MS     = 120_000; // 2 min

export const PLAY_HAPPY_RESTORE   = 0.35;
export const PLAY_HUNGER_COST     = 0.05;
export const PLAY_XP              = 7;
export const PLAY_COOLDOWN_MS     = 90_000;  // 1.5 min

export const WALK_HAPPY_RESTORE   = 0.40;
export const WALK_HUNGER_COST     = 0.10;
export const WALK_XP              = 10;
export const WALK_COOLDOWN_MS     = 180_000; // 3 min

// ── Growth ────────────────────────────────────────────────────────────────────
export const XP_PER_STAGE         = 100;
export const MAX_STAGE            = 4;

// ── Catch-up cap ──────────────────────────────────────────────────────────────
export const MAX_CATCHUP_MINUTES  = 240; // 4 hours

// ── Tick interval ─────────────────────────────────────────────────────────────
export const TICK_INTERVAL_MS     = 30_000; // 30 seconds

// ── localStorage key ──────────────────────────────────────────────────────────
export const STORAGE_KEY          = 'kopicchi_state';

// ── Stage names & colors (for UI labels) ─────────────────────────────────────
export const STAGES = [
  { name: 'たまご',    emoji: '🥚', primaryColor: '#5b9bd5', bgColor: '#e8f4fd' },
  { name: 'あかちゃん', emoji: '🐾', primaryColor: '#5ab8c8', bgColor: '#e4f7f9' },
  { name: 'こいぬ',    emoji: '🐶', primaryColor: '#4dd0c4', bgColor: '#e0f9f7' },
  { name: 'わんこ',    emoji: '🐕', primaryColor: '#4dc47a', bgColor: '#e2f9ec' },
  { name: 'おとなのいぬ', emoji: '🦮', primaryColor: '#52c45c', bgColor: '#e4fae6' },
];
