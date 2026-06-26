'use client';

import Link from 'next/link';
import { useState } from 'react';
import ScrambleText from '@/components/ScrambleText';
import { projects } from '@/data/projects';
import styles from './page.module.css';

type FilterKey = 'all' | 'photo' | 'dev' | 'film';

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: '全部 / Tout' },
  { key: 'photo', label: '摄影 / Photo' },
  { key: 'dev', label: '开发 / Dev' },
  { key: 'film', label: '影像 / Film' },
];

export default function ProjectsPage() {
  const [filter, setFilter] = useState<FilterKey>('all');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.cat === filter);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.label}>作品 · Travaux · Selected Work</div>
        <h1 className={styles.title}>
          <ScrambleText text="PROJETS" />
        </h1>
        <div className={styles.filterRow}>
          <div className={styles.filters}>
            {FILTERS.map((f) => (
              <button
                key={f.key}
                className={`${styles.chip} ${filter === f.key ? styles.chipActive : ''}`}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className={styles.count}>
            {String(filtered.length).padStart(2, '0')} 个项目
          </div>
        </div>
      </div>
      <div className={styles.list}>
        {filtered.map((p, i) => {
          const isHovered = hoveredIdx === i;
          return (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className={styles.row}
              style={{
                background: isHovered ? p.fill : '',
                color: isHovered ? '#fff' : '',
                borderTop: '2px solid var(--ink)',
                borderBottom: i === filtered.length - 1 ? '2px solid var(--ink)' : undefined,
              }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <span
                className={styles.idx}
                style={{ color: isHovered ? 'rgba(255,255,255,.7)' : 'var(--accent)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className={styles.rowContent}>
                <div className={styles.rowTitle}>{p.t}</div>
                <div
                  className={styles.rowSub}
                  style={{ color: isHovered ? 'rgba(255,255,255,.8)' : '#8a7f6c' }}
                >
                  {p.sub}
                </div>
              </div>
              <div className={styles.rowMeta}>
                {p.tags.map((t) => (
                  <span key={t} className={styles.tag}>
                    {t}
                  </span>
                ))}
              </div>
              <div className={styles.rowYear}>{p.year}</div>
              <span
                className={styles.arrow}
                style={{
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? 'translateX(0)' : 'translateX(-8px)',
                }}
              >
                ↗
              </span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
