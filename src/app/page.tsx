'use client';

import Link from 'next/link';
import { useState } from 'react';
import ScrambleText from '@/components/ScrambleText';
import Marquee from '@/components/Marquee';
import MagneticWrapper from '@/components/MagneticWrapper';
import { projects } from '@/data/projects';
import styles from './page.module.css';

export default function Home() {
  const [hoveredProject, setHoveredProject] = useState(0);
  const featured = projects.slice(0, 5);
  const active = projects[hoveredProject];

  return (
    <>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroTag}>
          全栈开发 × 风光摄影 — Développeur &amp; Photographe · Paris 巴黎
        </div>
        <h1 className={styles.heroTitle}>
          <ScrambleText text="CODE" />
        </h1>
        <h1 className={styles.heroTitleRow}>
          <ScrambleText text="PHOTO" />
          <span className={styles.badge}>★ OPEN ★ 2026 ★</span>
        </h1>
        <div className={styles.heroDesc}>
          <p className={styles.descZh}>
            全栈开发者，现于巴黎西岱大学（Université Paris Cité）攻读网络工程硕士。用代码构建应用，也用镜头记录山川的光与地貌。可接开发与风光摄影合作。
          </p>
          <p className={styles.descFr}>
            Développeur full-stack à Paris, en Master d&apos;ingénierie réseau à l&apos;Université Paris Cité. Je construis des applications et photographie les paysages — ouvert aux collaborations.
          </p>
        </div>
        <div className={styles.heroCta}>
          <MagneticWrapper>
            <Link href="/projects" className={styles.ctaPrimary}>
              查看项目 →
            </Link>
          </MagneticWrapper>
          <MagneticWrapper>
            <Link href="/cv.pdf" className={styles.ctaSecondary}>
              下载履历 ↓
            </Link>
          </MagneticWrapper>
        </div>
      </div>

      {/* Marquee */}
      <Marquee />

      {/* Featured Projects */}
      <div className={styles.featured}>
        <div className={styles.featuredHeader}>
          <div>
            <div className={styles.featuredLabel}>
              精选项目 · Travaux sélectionnés
            </div>
            <div className={styles.featuredTitle}>最近在做的</div>
          </div>
          <Link href="/projects" className={styles.featuredAll}>
            全部项目 →
          </Link>
        </div>
        <div className={styles.featuredGrid}>
          {/* Preview panel */}
          <div className={styles.previewWrap}>
            <div
              className={styles.preview}
              style={{ background: active.g }}
            >
              <div className={styles.previewYear}>{active.year}</div>
              <div className={styles.previewPlaceholder}>
                PLACEHOLDER · 替换为你的照片
              </div>
            </div>
            <div className={styles.previewMeta}>
              <div className={styles.previewTitle}>{active.t}</div>
              <div className={styles.previewType}>{active.catLabel}</div>
            </div>
          </div>
          {/* List */}
          <div
            className={styles.projectList}
            onMouseLeave={() => setHoveredProject(0)}
          >
            {featured.map((p, i) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className={styles.projectRow}
                style={{
                  opacity: hoveredProject === i ? 1 : 0.4,
                  paddingLeft: hoveredProject === i ? 14 : 4,
                }}
                onMouseEnter={() => setHoveredProject(i)}
              >
                <span className={styles.projectNum}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={styles.projectName}>{p.t}</span>
                <span className={styles.projectTag}>{p.catLabel}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* About teaser */}
      <div className={styles.aboutTeaser}>
        <div className={styles.aboutLabel}>关于 · À propos</div>
        <p className={styles.aboutText}>
          我相信好照片和好代码都来自同一种注意力 —— 对光、节奏与细节的执着。
          <span className={styles.aboutTextDim}>
            {' '}Je crois que les bonnes photos et le bon code naissent de la même attention.
          </span>
        </p>
        <Link href="/about" className={styles.aboutLink}>
          了解更多 →
        </Link>
      </div>
    </>
  );
}
