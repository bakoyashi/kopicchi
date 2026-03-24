// Dog bark & DQ-style fanfare — Web Audio API synthesis, no external files.

let _ctx = null;

function getCtx() {
  if (!_ctx) _ctx = new (window.AudioContext || window.webkitAudioContext)();
  if (_ctx.state === 'suspended') _ctx.resume();
  return _ctx;
}

// ── Noise buffer helper ───────────────────────────────────────────────────────
function makeNoise(ctx, dur) {
  const len = Math.ceil(ctx.sampleRate * dur);
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d   = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource();
  src.buffer = buf;
  return src;
}

// ── Better "WOOF" synthesis ───────────────────────────────────────────────────
// A dog bark has two main components:
//   1. Tonal pitch body  – triangle wave that sweeps up then quickly drops
//      (simulates the "w-oo" onset)
//   2. Breathiness       – white noise shaped by two bandpass filters
//      (formants at ~350 Hz and ~900 Hz, like a real vocal tract)
function synthBark(ctx, t, baseFreq, vol = 0.55) {
  const DUR = 0.22; // total bark duration (s)

  // ── 1. Tonal body ────────────────────────────────────────────────────────
  const osc = ctx.createOscillator();
  osc.type = 'triangle';
  // "W" glide: start low → peak → fall (gives "woof" not "oooo")
  osc.frequency.setValueAtTime(baseFreq * 0.55, t);
  osc.frequency.linearRampToValueAtTime(baseFreq * 1.1,  t + 0.022); // up
  osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.5, t + DUR); // down

  const oscEnv = ctx.createGain();
  oscEnv.gain.setValueAtTime(0, t);
  oscEnv.gain.linearRampToValueAtTime(vol * 0.65, t + 0.008);
  oscEnv.gain.exponentialRampToValueAtTime(0.0001, t + DUR * 0.7);
  osc.connect(oscEnv);
  oscEnv.connect(ctx.destination);
  osc.start(t); osc.stop(t + DUR + 0.05);

  // ── 2. Breathiness – low formant (~350 Hz body) ──────────────────────────
  const ns1 = makeNoise(ctx, DUR + 0.05);
  const bp1 = ctx.createBiquadFilter();
  bp1.type = 'bandpass';
  bp1.frequency.setValueAtTime(baseFreq * 1.4, t);
  bp1.frequency.exponentialRampToValueAtTime(baseFreq * 0.8, t + DUR);
  bp1.Q.value = 2.8;
  const g1 = ctx.createGain();
  g1.gain.setValueAtTime(0, t);
  g1.gain.linearRampToValueAtTime(vol * 0.55, t + 0.006);
  g1.gain.exponentialRampToValueAtTime(0.0001, t + DUR);
  ns1.connect(bp1); bp1.connect(g1); g1.connect(ctx.destination);
  ns1.start(t); ns1.stop(t + DUR + 0.05);

  // ── 3. Breathiness – upper formant (~900 Hz "oo") ────────────────────────
  const ns2 = makeNoise(ctx, DUR + 0.05);
  const bp2 = ctx.createBiquadFilter();
  bp2.type = 'bandpass';
  bp2.frequency.value = baseFreq * 3.8;
  bp2.Q.value = 1.6;
  const g2 = ctx.createGain();
  g2.gain.setValueAtTime(0, t);
  g2.gain.linearRampToValueAtTime(vol * 0.22, t + 0.01);
  g2.gain.exponentialRampToValueAtTime(0.0001, t + DUR * 0.5);
  ns2.connect(bp2); bp2.connect(g2); g2.connect(ctx.destination);
  ns2.start(t); ns2.stop(t + DUR + 0.05);
}

// ── Dragon Quest–style chiptune fanfare ──────────────────────────────────────
// NES / Famicom had two square-wave channels + one triangle bass channel.
// We recreate that here:  melody (square) + harmony (square) + bass (triangle)
// + snare/kick.
//
// Melody: E major arpeggio → triumphant landing (inspired by DQ victory jingle)
//   E5  G#5  B5  → E6 (held) → D#6 E6 (tag)
//
// BPM ≈ 168  →  16th note ≈ 89 ms

const S16 = 0.089; // 16th note duration (s)

// Note frequencies (Hz)
const N = {
  E3:165, B3:247, E4:330, G4:392, B4:494,
  E5:659, Fs5:740, Gs5:831, B5:988, Ds6:1245, E6:1319,
};

function squareNote(ctx, freq, t, dur, vol) {
  const osc = ctx.createOscillator();
  osc.type = 'square';
  osc.frequency.value = freq;
  const env = ctx.createGain();
  env.gain.setValueAtTime(0,   t);
  env.gain.linearRampToValueAtTime(vol, t + 0.006);  // crisp attack
  env.gain.setValueAtTime(vol, t + dur * 0.75);
  env.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(env); env.connect(ctx.destination);
  osc.start(t); osc.stop(t + dur + 0.02);
}

function triangleNote(ctx, freq, t, dur, vol) {
  const osc = ctx.createOscillator();
  osc.type = 'triangle';
  osc.frequency.value = freq;
  const env = ctx.createGain();
  env.gain.setValueAtTime(vol, t);
  env.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(env); env.connect(ctx.destination);
  osc.start(t); osc.stop(t + dur + 0.02);
}

function kick(ctx, t, vol = 0.35) {
  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(160, t);
  osc.frequency.exponentialRampToValueAtTime(40, t + 0.12);
  const env = ctx.createGain();
  env.gain.setValueAtTime(vol, t);
  env.gain.exponentialRampToValueAtTime(0.0001, t + 0.15);
  osc.connect(env); env.connect(ctx.destination);
  osc.start(t); osc.stop(t + 0.16);
}

function snare(ctx, t, vol = 0.18) {
  const ns = makeNoise(ctx, 0.1);
  const bp = ctx.createBiquadFilter();
  bp.type = 'bandpass'; bp.frequency.value = 2800; bp.Q.value = 0.9;
  const env = ctx.createGain();
  env.gain.setValueAtTime(vol, t);
  env.gain.exponentialRampToValueAtTime(0.0001, t + 0.1);
  ns.connect(bp); bp.connect(env); env.connect(ctx.destination);
  ns.start(t); ns.stop(t + 0.12);
}

function synthFanfare(ctx, t) {
  // ── Melody (square, channel 1) ─────────────────────────────────────────
  squareNote(ctx, N.E5,  t,              S16 * 1.7, 0.20); // E5
  squareNote(ctx, N.Gs5, t + S16 * 2,   S16 * 1.7, 0.22); // G#5
  squareNote(ctx, N.B5,  t + S16 * 4,   S16 * 1.7, 0.24); // B5  — arpeggio up
  squareNote(ctx, N.E6,  t + S16 * 6,   S16 * 5.5, 0.28); // E6  — triumphant!
  squareNote(ctx, N.Ds6, t + S16 * 13,  S16 * 1.2, 0.22); // D#6 — chromatic tag
  squareNote(ctx, N.E6,  t + S16 * 15,  S16 * 7,   0.30); // E6  — final hold

  // ── Harmony (square, channel 2, softer) ───────────────────────────────
  squareNote(ctx, N.B4,  t,              S16 * 1.7, 0.10);
  squareNote(ctx, N.E5,  t + S16 * 6,   S16 * 5.5, 0.12);
  squareNote(ctx, N.Gs5, t + S16 * 13,  S16 * 1.2, 0.10);
  squareNote(ctx, N.B5,  t + S16 * 15,  S16 * 7,   0.13);

  // ── Bass (triangle, channel 3) ─────────────────────────────────────────
  triangleNote(ctx, N.E3,  t,             S16 * 3,   0.18);
  triangleNote(ctx, N.B3,  t + S16 * 6,  S16 * 5.5, 0.18);
  triangleNote(ctx, N.E4,  t + S16 * 15, S16 * 7,   0.20);

  // ── Rhythm ─────────────────────────────────────────────────────────────
  kick (ctx, t,             0.32); // downbeat
  snare(ctx, t + S16 * 4,  0.18); // before high note
  kick (ctx, t + S16 * 6,  0.35); // triumphant landing
  snare(ctx, t + S16 * 11, 0.16);
  kick (ctx, t + S16 * 15, 0.38); // final note
}

// ── Public API ───────────────────────────────────────────────────────────────

/** Single "Woof!" on feed */
export function playFeedSound() {
  try {
    const ctx = getCtx();
    synthBark(ctx, ctx.currentTime + 0.02, 240, 0.55);
  } catch (_) {}
}

/** Quick bark on play */
export function playPlaySound() {
  try {
    const ctx = getCtx();
    const t = ctx.currentTime + 0.02;
    synthBark(ctx, t, 280, 0.48);
  } catch (_) {}
}

/** Double bark on walk */
export function playWalkSound() {
  try {
    const ctx = getCtx();
    const t = ctx.currentTime + 0.02;
    synthBark(ctx, t,        220, 0.48);
    synthBark(ctx, t + 0.30, 220, 0.42);
  } catch (_) {}
}

/** DQ-style 8-bit fanfare on level-up 🎉 */
export function playLevelUpSound() {
  try {
    const ctx = getCtx();
    synthFanfare(ctx, ctx.currentTime + 0.05);
  } catch (_) {}
}
