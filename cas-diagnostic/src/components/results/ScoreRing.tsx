import { useEffect, useRef } from 'react';
import type { BandColor } from '../../types';

const R    = 42;
const CIRC = 2 * Math.PI * R;

interface Props {
  total: number;
  color: BandColor;
}

export default function ScoreRing({ total, color }: Props) {
  const ringRef = useRef<SVGCircleElement>(null);
  const targetOffset = CIRC * (1 - total / 27);

  // Animate from full (hidden) to target after first paint
  useEffect(() => {
    const timer = setTimeout(() => {
      if (ringRef.current) {
        ringRef.current.style.strokeDashoffset = String(targetOffset);
      }
    }, 60);
    return () => clearTimeout(timer);
  }, [targetOffset]);

  return (
    <svg width="96" height="96" viewBox="0 0 96 96" aria-label={`Score ${total} out of 27`}>
      {/* Track */}
      <circle cx="48" cy="48" r={R} fill="none" stroke="#1a2235" strokeWidth="5" />
      {/* Fill — starts at CIRC (invisible), animates to targetOffset */}
      <circle
        ref={ringRef}
        cx="48" cy="48" r={R}
        fill="none"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={CIRC}
        strokeDashoffset={CIRC}
        transform="rotate(-90 48 48)"
        className={`score-ring band-${color}-ring`}
      />
      {/* Score text */}
      <text
        x="48" y="44"
        textAnchor="middle"
        fill="white"
        fontSize="17"
        fontWeight="700"
        fontFamily="monospace"
      >
        {total}
      </text>
      <text
        x="48" y="58"
        textAnchor="middle"
        fill="#475569"
        fontSize="8.5"
        fontFamily="monospace"
      >
        / 27
      </text>
    </svg>
  );
}
