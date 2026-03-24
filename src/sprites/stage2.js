// Stage 2 — Puppy (teal, floppy ears, stub legs, tail)
export const PALETTE = {
  '.': null,
  'B': '#4dd0c4', // teal body
  'D': '#2a9d8f', // darker teal outline
  'H': '#7eeae2', // highlight
  'E': '#1a1a2e', // eyes
  'N': '#e07070', // nose/tongue
  'T': '#d4956a', // inner ear / belly
  'W': '#f8f8f8', // white chest patch
};

export const FRAMES = [
  [
    '.....DD..DD.....',  // floppy ears
    '....DTBD.DTBD...',
    '....DBBBBBD.....',
    '...DBBHBBBD.....',
    '..DBBWWBBBBD....',  // W = white chest
    '..DBBEEBBBBD....',  // eyes
    '..DBBBNBBBD.....',  // N = nose
    '..DBBBBBBBD.....',
    '...DBBBBBD......',
    '..DBBBBBBD.....D',  // tail stub far right
    '..DBBBBBBD....DB',
    '..DB.DB.BD......',  // stub legs
    '..DB.DB.BD......',
    '................',
    '................',
    '................',
  ],
  [
    '.....DD..DD.....',
    '....DTBD.DTBD...',
    '....DBBBBBD.....',
    '...DBBHBBBD.....',
    '..DBBWWBBBBD....',
    '..DBBEEBBBBD....',
    '..DBBBNBBBD.....',
    '..DBBBBBBBD.....',
    '...DBBBBBD......',
    '..DBBBBBBD....DB',  // tail wag frame
    '..DBBBBBBD...D..',
    '..DB.DB.BD......',
    '...DB..DB.......',
    '................',
    '................',
    '................',
  ],
];
