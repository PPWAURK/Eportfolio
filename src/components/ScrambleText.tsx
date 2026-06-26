'use client';

import { useScramble } from '@/hooks/useScramble';

interface ScrambleTextProps {
  text: string;
  onHover?: boolean;
}

export default function ScrambleText({ text, onHover = false }: ScrambleTextProps) {
  const { displayText, runScramble } = useScramble(text);

  return (
    <span
      onMouseEnter={onHover ? runScramble : undefined}
      style={{ cursor: onHover ? 'pointer' : undefined }}
    >
      {displayText}
    </span>
  );
}
