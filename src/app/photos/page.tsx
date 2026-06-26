'use client';

import { useState, useEffect, useCallback } from 'react';
import ScrambleText from '@/components/ScrambleText';
import { photos } from '@/data/photos';
import styles from './page.module.css';

type Location = 'all' | 'italy' | 'nice' | 'spain' | 'strasbourg' | 'paris';

const tabs: { key: Location; label: string }[] = [
  { key: 'all', label: '全部 · Tout' },
  { key: 'italy', label: '意大利 · Italie' },
  { key: 'nice', label: '尼斯 · Nice' },
  { key: 'spain', label: '西班牙 · Espagne' },
  { key: 'strasbourg', label: '斯特拉斯堡 · Strasbourg' },
  { key: 'paris', label: '巴黎 · Paris' },
];

export default function PhotosPage() {
  const [activeTab, setActiveTab] = useState<Location>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeTab === 'all'
    ? photos
    : photos.filter((p) => p.loc === activeTab);

  const filteredIndices = activeTab === 'all'
    ? photos.map((_, i) => i)
    : photos.map((p, i) => p.loc === activeTab ? i : -1).filter((i) => i >= 0);

  const lbPhoto = lightboxIndex !== null ? photos[lightboxIndex] : null;
  const lbPos = lightboxIndex !== null ? filteredIndices.indexOf(lightboxIndex) : -1;

  const openLightbox = (globalIndex: number) => {
    setLightboxIndex(globalIndex);
  };

  const closeLightbox = () => setLightboxIndex(null);

  const goPrev = useCallback(() => {
    if (lbPos < 0) return;
    const newLbPos = (lbPos - 1 + filteredIndices.length) % filteredIndices.length;
    setLightboxIndex(filteredIndices[newLbPos]);
  }, [lbPos, filteredIndices]);

  const goNext = useCallback(() => {
    if (lbPos < 0) return;
    const newLbPos = (lbPos + 1) % filteredIndices.length;
    setLightboxIndex(filteredIndices[newLbPos]);
  }, [lbPos, filteredIndices]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, goPrev, goNext]);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.tag}>影像 · Photographie · Gallery</div>
        <h1 className={styles.title}>
          <ScrambleText text="PHOTOS" />
        </h1>
        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`${styles.tab} ${activeTab === tab.key ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.grid}>
        {filtered.map((photo) => {
          const globalIndex = photos.indexOf(photo);
          return (
            <div
              key={globalIndex}
              className={styles.photoCard}
              onClick={() => openLightbox(globalIndex)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt={photo.cap}
                className={styles.photoImg}
                loading="lazy"
              />
              <div className={styles.photoOverlay}>
                <span className={styles.photoCaption}>{photo.cap}</span>
                <span className={styles.photoLoc}>{photo.locLabel} · {photo.year}</span>
              </div>
            </div>
          );
        })}
      </div>

      {lightboxIndex !== null && lbPhoto && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <div className={styles.lbContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.lbClose} onClick={closeLightbox}>✕</button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lbPhoto.src}
              alt={lbPhoto.cap}
              className={styles.lbImage}
            />
            <div className={styles.lbInfo}>
              <div className={styles.lbMeta}>
                <span className={styles.lbCaption}>{lbPhoto.cap}</span>
                <span className={styles.lbLoc}>{lbPhoto.locLabel} · {lbPhoto.year}</span>
              </div>
              <span className={styles.lbCount}>
                {String(lbPos + 1).padStart(2, '0')} / {String(filteredIndices.length).padStart(2, '0')}
              </span>
            </div>
            <button className={`${styles.lbNav} ${styles.lbPrev}`} onClick={goPrev}>←</button>
            <button className={`${styles.lbNav} ${styles.lbNext}`} onClick={goNext}>→</button>
          </div>
        </div>
      )}
    </>
  );
}
