'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import styles from './Preloader.module.css';

function shouldShowPreloader(): boolean {
  if (typeof window === 'undefined') return false;
  if (sessionStorage.getItem('pf.booted')) return false;
  sessionStorage.setItem('pf.booted', '1');
  return true;
}

export default function Preloader() {
  const [visible, setVisible] = useState(shouldShowPreloader);
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const finish = useCallback(() => {
    if (done) return;
    setDone(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimeout(() => setVisible(false), 720);
  }, [done]);

  useEffect(() => {
    if (!visible || done) return;

    let n = 0;
    intervalRef.current = setInterval(() => {
      n += Math.floor(8 + Math.random() * 16);
      if (n >= 100) {
        n = 100;
        if (intervalRef.current) clearInterval(intervalRef.current);
        setCount(n);
        setTimeout(finish, 260);
        return;
      }
      setCount(n);
    }, 90);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [visible, done, finish]);

  if (!visible) return null;

  return (
    <div
      className={`${styles.preloader} ${done ? styles.slideUp : ''}`}
      onClick={finish}
    >
      <div className={styles.name}>王世洪</div>
      <div className={styles.subtitle}>
        <span className={styles.label}>Développeur full-stack · Paris</span>
        <span className={styles.counter}>{String(count).padStart(3, '0')}</span>
      </div>
      <span className={styles.skip}>点击跳过 · Cliquez pour passer</span>
    </div>
  );
}
