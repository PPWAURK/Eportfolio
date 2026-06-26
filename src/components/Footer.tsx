'use client';

import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div>
          <div className={styles.ctaLabel}>
            有项目想聊聊? · On en parle?
          </div>
          <Link href="/contact" className={styles.ctaTitle}>
            勾搭一下 ↗
          </Link>
        </div>
        <div className={styles.social}>
          <a
            href="https://www.instagram.com/wsh.photo/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            Instagram
          </a>
          <a
            href="https://github.com/Paneed"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            GitHub
          </a>
        </div>
      </div>
      <div className={styles.bottom}>
        <span>© 2026 王世洪 · Tous droits réservés</span>
        <button onClick={scrollToTop} className={styles.backToTop}>
          ↑ 回到顶部
        </button>
      </div>
    </footer>
  );
}
