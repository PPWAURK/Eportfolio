'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Nav.module.css';

const NAV_LINKS = [
  { href: '/', label: '首页', key: 'home' },
  { href: '/projects', label: '项目', key: 'projects' },
  { href: '/photos', label: '照片', key: 'photos' },
  { href: '/about', label: '关于', key: 'about' },
  { href: '/cv', label: '履历', key: 'cv' },
  { href: '/contact', label: '联系', key: 'contact' },
];

export default function Nav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.brand}>
        王世洪™
      </Link>
      <div className={styles.links}>
        {NAV_LINKS.map((link) => (
          <Link
            key={link.key}
            href={link.href}
            className={`${styles.link} ${isActive(link.href) ? styles.active : ''}`}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div className={styles.right}>
        <span className={styles.available}>● 可接单</span>
        <Link href="/cv.pdf" className={styles.cvButton}>
          下载履历 ↓
        </Link>
      </div>
    </nav>
  );
}
