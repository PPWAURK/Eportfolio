'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './WipeTransition.module.css';

const LABELS: Record<string, [string, string]> = {
  '/': ['首页', 'Accueil'],
  '/projects': ['项目', 'Projets'],
  '/photos': ['照片', 'Photos'],
  '/about': ['关于', 'À propos'],
  '/cv': ['履历', 'CV'],
  '/contact': ['联系', 'Contact'],
};

export default function WipeTransition() {
  const pathname = usePathname();
  const prevPath = useRef(pathname);
  const [phase, setPhase] = useState<'idle' | 'enter' | 'exit'>('idle');
  const [label, setLabel] = useState<[string, string]>(['', '']);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (pathname === prevPath.current) return;
    prevPath.current = pathname;

    let matchedLabel: [string, string] = ['', ''];
    for (const [route, lbl] of Object.entries(LABELS)) {
      if (route === '/' ? pathname === '/' : pathname.startsWith(route)) {
        matchedLabel = lbl;
        break;
      }
    }
    setLabel(matchedLabel);

    setPhase('enter');

    timeoutRef.current = setTimeout(() => {
      setPhase('exit');

      timeoutRef.current = setTimeout(() => {
        setPhase('idle');
      }, 440);
    }, 440);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [pathname]);

  if (phase === 'idle') return <div className={styles.overlay} />;

  return (
    <div className={`${styles.overlay} ${styles[phase]}`}>
      <div className={styles.labelContainer}>
        <div className={styles.labelZh}>{label[0]}</div>
        <div className={styles.labelFr}>{label[1]}</div>
      </div>
    </div>
  );
}
