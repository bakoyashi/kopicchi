import './DogSprite.css';

// ── Stage 0: Dog Egg ────────────────────────────────────────────────────────
function EggDog() {
  return (
    <svg viewBox="0 0 128 128" width="200" height="200" aria-label="dog egg">
      {/* Egg body */}
      <ellipse cx="64" cy="73" rx="36" ry="46" fill="#d4873e"/>
      {/* Egg top highlight */}
      <ellipse cx="50" cy="50" rx="12" ry="18" fill="#e8a85a" opacity="0.45"/>
      {/* Bottom shading */}
      <ellipse cx="64" cy="102" rx="28" ry="14" fill="#b36820" opacity="0.35"/>
      {/* Left ear */}
      <ellipse cx="42" cy="31" rx="10" ry="15" fill="#c07030" transform="rotate(-15,42,31)"/>
      {/* Right ear */}
      <ellipse cx="86" cy="31" rx="10" ry="15" fill="#c07030" transform="rotate(15,86,31)"/>
      {/* Left ear inner */}
      <ellipse cx="42" cy="32" rx="5" ry="8" fill="#e8a870" transform="rotate(-15,42,32)"/>
      {/* Right ear inner */}
      <ellipse cx="86" cy="32" rx="5" ry="8" fill="#e8a870" transform="rotate(15,86,32)"/>
      {/* Eyes */}
      <circle cx="52" cy="67" r="6" fill="#1a0d00"/>
      <circle cx="76" cy="67" r="6" fill="#1a0d00"/>
      {/* Eye shines */}
      <circle cx="54" cy="65" r="2.2" fill="white"/>
      <circle cx="78" cy="65" r="2.2" fill="white"/>
      {/* Nose */}
      <ellipse cx="64" cy="77" rx="6" ry="5" fill="#1a0d00"/>
      <ellipse cx="62" cy="75" rx="2" ry="1.5" fill="#503030" opacity="0.6"/>
      {/* Smile */}
      <path d="M57 83 Q64 90 71 83" stroke="#1a0d00" fill="none" strokeWidth="2" strokeLinecap="round"/>
      {/* Cheek blush */}
      <ellipse cx="43" cy="75" rx="7" ry="4.5" fill="#e87878" opacity="0.35"/>
      <ellipse cx="85" cy="75" rx="7" ry="4.5" fill="#e87878" opacity="0.35"/>
    </svg>
  );
}

// ── Stage 1: Newborn Puppy ──────────────────────────────────────────────────
function NewbornPuppy() {
  return (
    <svg viewBox="0 0 128 128" width="200" height="200" aria-label="newborn puppy">
      {/* Shadow */}
      <ellipse cx="64" cy="120" rx="32" ry="5" fill="#e0d0c0" opacity="0.45"/>
      {/* Body blob */}
      <ellipse cx="64" cy="86" rx="35" ry="30" fill="#f5ede0"/>
      {/* Head */}
      <circle cx="64" cy="54" r="30" fill="#f5ede0"/>
      {/* Left ear */}
      <ellipse cx="41" cy="32" rx="11" ry="14" fill="#f5ede0" transform="rotate(-10,41,32)"/>
      {/* Right ear */}
      <ellipse cx="87" cy="32" rx="11" ry="14" fill="#f5ede0" transform="rotate(10,87,32)"/>
      {/* Ear inner pink */}
      <ellipse cx="41" cy="32" rx="5" ry="8" fill="#f0c0b0" transform="rotate(-10,41,32)"/>
      <ellipse cx="87" cy="32" rx="5" ry="8" fill="#f0c0b0" transform="rotate(10,87,32)"/>
      {/* Squinting sleepy eyes */}
      <path d="M50 52 Q57 47 64 52" stroke="#2d1a0e" fill="none" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M64 52 Q71 47 78 52" stroke="#2d1a0e" fill="none" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M51 53 Q57 57 63 53" stroke="#2d1a0e" fill="none" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
      <path d="M65 53 Q71 57 77 53" stroke="#2d1a0e" fill="none" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
      {/* Tiny nose */}
      <ellipse cx="64" cy="62" rx="6" ry="5" fill="#c06060"/>
      <ellipse cx="62" cy="60" rx="2" ry="1.5" fill="#e08080" opacity="0.55"/>
      {/* Tiny mouth */}
      <path d="M59 68 Q64 73 69 68" stroke="#c06060" fill="none" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Tiny paws */}
      <ellipse cx="42" cy="108" rx="15" ry="10" fill="#f5ede0"/>
      <ellipse cx="86" cy="108" rx="15" ry="10" fill="#f5ede0"/>
      {/* Paw pads */}
      <ellipse cx="42" cy="111" rx="9" ry="5.5" fill="#f0cfc0"/>
      <ellipse cx="86" cy="111" rx="9" ry="5.5" fill="#f0cfc0"/>
      {/* Cheek blush */}
      <ellipse cx="46" cy="63" rx="8" ry="5" fill="#f4a0a0" opacity="0.3"/>
      <ellipse cx="82" cy="63" rx="8" ry="5" fill="#f4a0a0" opacity="0.3"/>
    </svg>
  );
}

// ── Stage 2: Fluffy Puppy ───────────────────────────────────────────────────
function Puppy() {
  return (
    <svg viewBox="0 0 128 128" width="200" height="200" aria-label="puppy">
      {/* Shadow */}
      <ellipse cx="62" cy="123" rx="30" ry="5" fill="#ddd0c0" opacity="0.45"/>
      {/* Body */}
      <ellipse cx="62" cy="89" rx="30" ry="27" fill="#f8f0e3"/>
      {/* Chest fluff */}
      <ellipse cx="62" cy="84" rx="20" ry="15" fill="white"/>
      {/* Head */}
      <circle cx="64" cy="52" r="27" fill="#f8f0e3"/>
      {/* Fluffy cheeks */}
      <ellipse cx="42" cy="59" rx="12" ry="10" fill="white" opacity="0.75"/>
      <ellipse cx="86" cy="59" rx="12" ry="10" fill="white" opacity="0.75"/>
      {/* Left ear */}
      <ellipse cx="41" cy="30" rx="13" ry="19" fill="#f8f0e3" transform="rotate(-8,41,30)"/>
      {/* Right ear */}
      <ellipse cx="87" cy="30" rx="13" ry="19" fill="#f8f0e3" transform="rotate(8,87,30)"/>
      {/* Ear brown tips */}
      <ellipse cx="41" cy="20" rx="8" ry="9" fill="#c8a070" transform="rotate(-8,41,20)"/>
      <ellipse cx="87" cy="20" rx="8" ry="9" fill="#c8a070" transform="rotate(8,87,20)"/>
      {/* Ear inner */}
      <ellipse cx="41" cy="30" rx="6" ry="11" fill="#f0c0b0" transform="rotate(-8,41,30)"/>
      <ellipse cx="87" cy="30" rx="6" ry="11" fill="#f0c0b0" transform="rotate(8,87,30)"/>
      {/* Eyes – big & shiny */}
      <circle cx="52" cy="50" r="8" fill="#1a0d00"/>
      <circle cx="76" cy="50" r="8" fill="#1a0d00"/>
      <circle cx="52" cy="51" r="5" fill="#3d1a00"/>
      <circle cx="76" cy="51" r="5" fill="#3d1a00"/>
      <circle cx="55" cy="47" r="3" fill="white"/>
      <circle cx="79" cy="47" r="3" fill="white"/>
      <circle cx="50" cy="53" r="1.2" fill="white"/>
      <circle cx="74" cy="53" r="1.2" fill="white"/>
      {/* Nose */}
      <ellipse cx="64" cy="61" rx="7" ry="5.5" fill="#1a0d00"/>
      <ellipse cx="62" cy="59" rx="2.5" ry="1.5" fill="#4a2020" opacity="0.55"/>
      {/* Smile */}
      <path d="M57 68 Q64 75 71 68" stroke="#1a0d00" fill="none" strokeWidth="2" strokeLinecap="round"/>
      {/* Pink collar */}
      <rect x="44" y="72" width="40" height="8" rx="4" fill="#e87ab0"/>
      {/* Bell */}
      <circle cx="64" cy="76" r="4.5" fill="#c8c830"/>
      <path d="M62 76 L66 76" stroke="#a0a000" strokeWidth="1.2"/>
      {/* Legs */}
      <ellipse cx="46" cy="109" rx="13" ry="15" fill="#f8f0e3"/>
      <ellipse cx="78" cy="109" rx="13" ry="15" fill="#f8f0e3"/>
      {/* Paws */}
      <ellipse cx="46" cy="119" rx="10" ry="6" fill="#f0d8c8"/>
      <ellipse cx="78" cy="119" rx="10" ry="6" fill="#f0d8c8"/>
      {/* Fluffy tail */}
      <ellipse cx="98" cy="82" rx="13" ry="18" fill="#f8f0e3" transform="rotate(-25,98,82)"/>
      <ellipse cx="96" cy="80" rx="8" ry="11" fill="white" transform="rotate(-25,96,80)"/>
      {/* Cheek blush */}
      <ellipse cx="42" cy="62" rx="8" ry="5" fill="#f4a0a0" opacity="0.28"/>
      <ellipse cx="86" cy="62" rx="8" ry="5" fill="#f4a0a0" opacity="0.28"/>
    </svg>
  );
}

// ── Stage 3: Adult Dog (Kishu Inu) ──────────────────────────────────────────
function AdultDog() {
  return (
    <svg viewBox="0 0 128 128" width="200" height="200" aria-label="adult dog">
      {/* Shadow */}
      <ellipse cx="60" cy="125" rx="34" ry="5" fill="#d0c8b8" opacity="0.45"/>
      {/* Body */}
      <ellipse cx="60" cy="85" rx="30" ry="28" fill="#f5f0e8"/>
      {/* Chest white fluff */}
      <ellipse cx="60" cy="82" rx="18" ry="18" fill="white"/>
      {/* Head */}
      <circle cx="64" cy="46" r="28" fill="#f5f0e8"/>
      {/* Pointed left ear */}
      <polygon points="36,30 44,8 54,28" fill="#f5f0e8"/>
      {/* Pointed right ear */}
      <polygon points="74,28 84,8 92,30" fill="#f5f0e8"/>
      {/* Ear inner pink */}
      <polygon points="40,28 44,14 50,27" fill="#f0c0b0"/>
      <polygon points="78,27 84,14 88,28" fill="#f0c0b0"/>
      {/* Muzzle area */}
      <ellipse cx="64" cy="57" rx="16" ry="12" fill="white" opacity="0.55"/>
      {/* Eyes – alert & bright */}
      <ellipse cx="53" cy="44" rx="7" ry="8" fill="#1a0d00"/>
      <ellipse cx="75" cy="44" rx="7" ry="8" fill="#1a0d00"/>
      <ellipse cx="53" cy="45" rx="4.5" ry="5" fill="#4d2000"/>
      <ellipse cx="75" cy="45" rx="4.5" ry="5" fill="#4d2000"/>
      <circle cx="56" cy="42" r="2.5" fill="white"/>
      <circle cx="78" cy="42" r="2.5" fill="white"/>
      <circle cx="51" cy="47" r="1" fill="white"/>
      <circle cx="73" cy="47" r="1" fill="white"/>
      {/* Nose */}
      <ellipse cx="64" cy="56" rx="7" ry="5.5" fill="#1a0d00"/>
      <ellipse cx="62" cy="54" rx="2.5" ry="1.5" fill="#3a1818" opacity="0.65"/>
      {/* Smile */}
      <path d="M57 63 Q64 71 71 63" stroke="#1a0d00" fill="none" strokeWidth="2" strokeLinecap="round"/>
      {/* Red collar */}
      <rect x="44" y="66" width="40" height="9" rx="4.5" fill="#d03030"/>
      {/* Golden bell */}
      <circle cx="64" cy="70.5" r="5" fill="#d4a820"/>
      <ellipse cx="64" cy="73" rx="2" ry="1.5" fill="#a07800"/>
      {/* Front legs */}
      <rect x="38" y="101" width="15" height="22" rx="6" fill="#f5f0e8"/>
      <rect x="68" y="101" width="15" height="22" rx="6" fill="#f5f0e8"/>
      {/* Paws */}
      <ellipse cx="45.5" cy="123" rx="9" ry="5" fill="#ecd8c8"/>
      <ellipse cx="75.5" cy="123" rx="9" ry="5" fill="#ecd8c8"/>
      {/* Curled tail (Kishu Inu style) */}
      <path d="M88 82 Q112 68 108 50 Q104 36 94 44 Q88 50 92 58"
            stroke="#f5f0e8" fill="none" strokeWidth="14" strokeLinecap="round"/>
      <path d="M88 82 Q112 68 108 50 Q104 36 94 44 Q88 50 92 58"
            stroke="white" fill="none" strokeWidth="8" strokeLinecap="round" opacity="0.55"/>
    </svg>
  );
}

// ── Component ────────────────────────────────────────────────────────────────
const STAGE_DOGS = [EggDog, NewbornPuppy, Puppy, AdultDog];

export default function DogSprite({ stage, animation }) {
  const StageComponent = STAGE_DOGS[Math.min(stage, STAGE_DOGS.length - 1)] ?? EggDog;
  const animClass = animation ? `dog-anim-${animation}` : '';

  return (
    <div className={`dog-sprite-wrapper ${animClass}`}>
      <StageComponent />
    </div>
  );
}
