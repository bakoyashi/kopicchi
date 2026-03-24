import { useEffect, useRef, useState } from 'react';
import { SPRITES } from '../sprites/index';
import './DogSprite.css';

const PIXEL_SIZE = 12; // px per dot on canvas (192×192 canvas)
const GRID_SIZE  = 16;

function drawSprite(ctx, frame, palette) {
  ctx.clearRect(0, 0, GRID_SIZE * PIXEL_SIZE, GRID_SIZE * PIXEL_SIZE);
  for (let row = 0; row < GRID_SIZE; row++) {
    const line = frame[row] ?? '';
    for (let col = 0; col < GRID_SIZE; col++) {
      const ch = line[col] ?? '.';
      const color = palette[ch];
      if (!color) continue;
      ctx.fillStyle = color;
      ctx.fillRect(col * PIXEL_SIZE, row * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
    }
  }
}

export default function DogSprite({ stage, animation }) {
  const canvasRef = useRef(null);
  const [frameIdx, setFrameIdx] = useState(0);

  // Idle frame toggle (bob animation)
  useEffect(() => {
    const id = setInterval(() => setFrameIdx(f => 1 - f), 800);
    return () => clearInterval(id);
  }, []);

  // Draw on canvas whenever stage or frame changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const sprite = SPRITES[stage] ?? SPRITES[0];
    const frame  = sprite.FRAMES[frameIdx] ?? sprite.FRAMES[0];
    drawSprite(ctx, frame, sprite.PALETTE);
  }, [stage, frameIdx]);

  const animClass = animation ? `dog-anim-${animation}` : '';

  return (
    <div className={`dog-sprite-wrapper ${animClass}`}>
      <canvas
        ref={canvasRef}
        width={GRID_SIZE * PIXEL_SIZE}
        height={GRID_SIZE * PIXEL_SIZE}
        className="dog-canvas"
      />
    </div>
  );
}
