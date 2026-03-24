import './SpeechBubble.css';

const IDLE = [
  'たのしいね！',
  'だいすきだよ！',
  'きもちいい〜！',
  'もっとあそぼうよ！',
  'どこいくの？',
  'えへへ〜',
];

const HUNGRY_PHRASES  = ['おなかすいた〜！', 'ごはんたべたい！'];
const BORED_PHRASES   = ['あそぼ！', 'たいくつ〜', 'なにかしたい！'];

function pickFrom(arr, seed, intervalSec) {
  const i = Math.floor(seed / (intervalSec * 1000)) % arr.length;
  return arr[Math.abs(i)];
}

function getSpeech(state) {
  const { hunger, happiness, health, tired = 0, overfed = 0, lastTickTime } = state;

  // ── Critical danger ─────────────────────────────────────────────────────────
  if (tired  >= 0.8)   return 'もう…うごけない...';
  if (overfed >= 0.7)  return 'おなかいたい...';
  if (hunger  < 0.1)   return 'おなかすいて…しぬ〜';
  if (happiness < 0.1) return 'かなしいよ…';
  if (health  < 0.2)   return 'きぶんわるい…';

  // ── Warnings ────────────────────────────────────────────────────────────────
  if (tired  >= 0.5)   return 'ちょっとつかれた...';
  if (overfed >= 0.4)  return 'もうたべれない！';
  if (hunger  < 0.3)   return pickFrom(HUNGRY_PHRASES, lastTickTime, 7);
  if (happiness < 0.35) return pickFrom(BORED_PHRASES, lastTickTime, 7);

  // ── Happy idle ───────────────────────────────────────────────────────────────
  return pickFrom(IDLE, lastTickTime, 8);
}

export default function SpeechBubble({ state }) {
  const text = getSpeech(state);

  return (
    <div className="speech-bubble" key={text}>
      <span className="speech-text">{text}</span>
    </div>
  );
}
