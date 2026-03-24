// ── Decay rates (per minute, 0‒1 scale) ──────────────────────────────────────
export const HUNGER_DECAY_RATE  = 0.05;  // empty in ~20 min
export const HAPPY_DECAY_RATE   = 0.04;  // empty in ~25 min
export const HEALTH_DECAY_RATE  = 0.02;  // when distressed
export const HEALTH_REGEN_RATE  = 0.025; // when well-cared for

// ── Action effects ────────────────────────────────────────────────────────────
export const FEED_HUNGER_RESTORE  = 0.40;
export const FEED_HAPPY_RESTORE   = 0.10;
export const FEED_XP              = 8;
export const FEED_COOLDOWN_MS     = 5_000;  // 5 sec

export const PLAY_HAPPY_RESTORE   = 0.35;
export const PLAY_HUNGER_COST     = 0.05;
export const PLAY_XP              = 7;
export const PLAY_COOLDOWN_MS     = 5_000;  // 5 sec

export const WALK_HAPPY_RESTORE   = 0.40;
export const WALK_HUNGER_COST     = 0.10;
export const WALK_XP              = 10;
export const WALK_COOLDOWN_MS     = 10_000; // 10 sec

// ── Growth ────────────────────────────────────────────────────────────────────
export const XP_PER_STAGE         = 20;
export const MAX_STAGE            = 3;

// ── Catch-up cap ──────────────────────────────────────────────────────────────
export const MAX_CATCHUP_MINUTES  = 30; // 30 min

// ── Tick interval ─────────────────────────────────────────────────────────────
export const TICK_INTERVAL_MS     = 5_000; // 5 seconds

// ── localStorage key ──────────────────────────────────────────────────────────
export const STORAGE_KEY          = 'kopicchi_state';

// ── Stage names & colors (for UI labels) ─────────────────────────────────────
export const STAGES = [
  { name: 'たまご',      emoji: '🥚', primaryColor: '#d4873e', bgColor: '#fdf3e7' },
  { name: 'あかちゃん',   emoji: '🐾', primaryColor: '#c8956a', bgColor: '#fdf0e8' },
  { name: 'こいぬ',      emoji: '🐶', primaryColor: '#e87ab0', bgColor: '#fde8f3' },
  { name: 'おとなのいぬ', emoji: '🦮', primaryColor: '#d03030', bgColor: '#fde8e8' },
];
