'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&@$/<>*';

export function useScramble(finalText: string) {
  const [displayText, setDisplayText] = useState(finalText);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const runScramble = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    let frame = 0;
    intervalRef.current = setInterval(() => {
      let out = '';
      for (let i = 0; i < finalText.length; i++) {
        const c = finalText[i];
        if (i < frame * 0.5) {
          out += c;
        } else if (!/[A-Za-z0-9]/.test(c)) {
          out += c;
        } else {
          out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }
      setDisplayText(out);
      frame++;
      if (frame * 0.5 > finalText.length) {
        setDisplayText(finalText);
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, 45);
  }, [finalText]);

  useEffect(() => {
    runScramble();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [runScramble]);

  return { displayText, runScramble };
}
