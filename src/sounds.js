// Synthesised dog bark sounds via Web Audio API — no external files needed.

let _ctx = null;

function getCtx() {
  if (!_ctx) _ctx = new (window.AudioContext || window.webkitAudioContext)();
  if (_ctx.state === 'suspended') _ctx.resume();
  return _ctx;
}

/**
 * Synthesise one "woof" burst.
 * @param {AudioContext} ctx
 * @param {number} t     – AudioContext timestamp to start at
 * @param {number} freq  – fundamental frequency (Hz)
 * @param {number} dur   – duration in seconds
 * @param {number} vol   – master gain (0–1)
 */
function synthBark(ctx, t, freq, dur, vol = 0.5) {
  const master = ctx.createGain();
  master.gain.setValueAtTime(vol, t);
  master.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  master.connect(ctx.destination);

  // ── Tonal body (sawtooth sweep down) ────────────────────────────────────
  const osc = ctx.createOscillator();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(freq, t);
  osc.frequency.exponentialRampToValueAtTime(freq * 0.55, t + dur);
  const oscGain = ctx.createGain();
  oscGain.gain.value = 0.6;
  osc.connect(oscGain);
  oscGain.connect(master);
  osc.start(t);
  osc.stop(t + dur + 0.02);

  // ── Breathiness (band-passed white noise) ────────────────────────────────
  const bufLen = Math.ceil(ctx.sampleRate * (dur + 0.05));
  const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < bufLen; i++) data[i] = Math.random() * 2 - 1;

  const noise = ctx.createBufferSource();
  noise.buffer = buf;

  const bpf = ctx.createBiquadFilter();
  bpf.type = 'bandpass';
  bpf.frequency.value = freq * 2.5;
  bpf.Q.value = 0.7;

  const noiseGain = ctx.createGain();
  noiseGain.gain.value = 0.4;

  noise.connect(bpf);
  bpf.connect(noiseGain);
  noiseGain.connect(master);
  noise.start(t);
  noise.stop(t + dur + 0.05);
}

// ── Public API ───────────────────────────────────────────────────────────────

/** Single happy "woof!" played when feeding */
export function playFeedSound() {
  try {
    const ctx = getCtx();
    const t = ctx.currentTime + 0.02;
    synthBark(ctx, t, 220, 0.18, 0.45);
  } catch (_) { /* audio not available */ }
}

/** Single "woof!" played when playing */
export function playPlaySound() {
  try {
    const ctx = getCtx();
    const t = ctx.currentTime + 0.02;
    synthBark(ctx, t, 260, 0.14, 0.38);
  } catch (_) {}
}

/** Single "woof!" played when walking */
export function playWalkSound() {
  try {
    const ctx = getCtx();
    const t = ctx.currentTime + 0.02;
    synthBark(ctx, t, 200, 0.16, 0.38);
  } catch (_) {}
}

/** Excited triple bark for level-up 🎉 */
export function playLevelUpSound() {
  try {
    const ctx = getCtx();
    const t = ctx.currentTime + 0.05;
    synthBark(ctx, t,        240, 0.15, 0.5);
    synthBark(ctx, t + 0.24, 270, 0.15, 0.55);
    synthBark(ctx, t + 0.48, 310, 0.20, 0.65);
  } catch (_) {}
}
