// Stage 0 — Egg (blue)
// 16×16 pixel grid
export const PALETTE = {
  '.': null,
  'B': '#5b9bd5', // blue body
  'D': '#3a78b5', // dark blue outline
  'H': '#82bcec', // highlight
  'E': '#1a1a2e', // eyes
};

// Frame 0 (normal)
export const FRAMES = [
  [
    '................',
    '................',
    '.....DDDDDD.....',
    '....DBBBBBBD....',
    '...DBBHBBBBD....',   // H = highlight dot
    '...DBBBBBBD.....',   // (6 wide body)
    '...DBBBBBBBD....',
    '..DBBBBBBBBBD...',
    '..DBBBBBBBBBD...',
    '..DBBEEBBBBD....',   // E = eyes
    '..DBBBBBBBD.....',
    '..DBBBBBBD......',
    '...DBBBBBD......',
    '....DDDDDD......',
    '................',
    '................',
  ],
  // Frame 1 (slight bob — same sprite, animation done in CSS)
  [
    '................',
    '................',
    '.....DDDDDD.....',
    '....DBBBBBBD....',
    '...DBBHBBBBD....',
    '...DBBBBBBD.....',
    '...DBBBBBBBD....',
    '..DBBBBBBBBBD...',
    '..DBBBBBBBBBD...',
    '..DBBEEBBBBD....',
    '..DBBBBBBBD.....',
    '..DBBBBBBD......',
    '...DBBBBBD......',
    '....DDDDDD......',
    '................',
    '................',
  ],
];
