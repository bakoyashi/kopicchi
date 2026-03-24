// Stage 4 — Adult Dog (green, full body, confident stance, detailed face)
export const PALETTE = {
  '.': null,
  'B': '#52c45c', // green body
  'D': '#2e9e38', // dark green outline
  'H': '#7eed87', // highlight
  'E': '#1a1a2e', // eyes
  'N': '#e07070', // nose/tongue
  'T': '#c4843c', // inner ear / tan markings
  'W': '#f8f8f8', // white chest patch
  'L': '#2a7a30', // leg shadow
  'S': '#1a5a20', // deep shadow detail
};

export const FRAMES = [
  [
    '...DDDD..DDDD...',  // large ears
    '..DTBBBD.DTBBBD.',
    '...DBBBBBBBBD...',
    '..DBBBBHBBBBBD..',
    '..DBBWWWWBBBD...',
    '..DBBBEEBBBBD...',  // eyes with brows above
    '.DDBBBNBBBBBD...',  // N = nose
    '..DBBBBBBBBD....',
    '..DBBBBBBBBD..DB',  // tail
    '..DBBBBBBBBD.D..',
    '..DBBBBBBBBD....',
    '..DLBB.DLBB.BD..',  // stocky legs
    '..DLBB.DLBB.BD..',
    '...DSBB.DSBB....',
    '....D....D......',
    '................',
  ],
  [
    '...DDDD..DDDD...',
    '..DTBBBD.DTBBBD.',
    '...DBBBBBBBBD...',
    '..DBBBBHBBBBBD..',
    '..DBBWWWWBBBD...',
    '..DBBBEEBBBBD...',
    '.DDBBBNBBBBBD...',
    '..DBBBBBBBBD....',
    '..DBBBBBBBBD.D..',  // tail wag up
    '..DBBBBBBBBD..DB',
    '..DBBBBBBBBD....',
    '..DLBB.DLBB.BD..',
    '..DLBB.DLBB.BD..',
    '...DSBB.DSBB....',
    '....D....D......',
    '................',
  ],
];
