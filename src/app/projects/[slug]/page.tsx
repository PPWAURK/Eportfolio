import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import styles from './page.module.css';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return {
    title: project.t,
    description: project.desc[0],
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const images = project.images ?? [];

  return (
    <div className={styles.detail}>
      <div className={styles.breadcrumb}>
        <Link href="/projects" className={styles.breadcrumbLink}>项目 / Projets</Link>
        <span className={styles.breadcrumbSep}> / </span>
        <span className={styles.breadcrumbCurrent}>{project.t}</span>
      </div>
      <div className={styles.catLabel}>
        {project.catLabel} · {project.year}
      </div>
      <h1 className={styles.title}>{project.t}</h1>
      <div className={styles.metaGrid}>
        <div>
          <div className={styles.metaLabel}>角色 / Rôle</div>
          <div className={styles.metaValue}>{project.role}</div>
        </div>
        <div>
          <div className={styles.metaLabel}>客户 / Client</div>
          <div className={styles.metaValue}>{project.client}</div>
        </div>
        <div>
          <div className={styles.metaLabel}>年份 / Année</div>
          <div className={styles.metaValue}>{project.year}</div>
        </div>
        <div>
          <div className={styles.metaLabel}>标签 / Tags</div>
          <div className={styles.metaValue}>{project.tags.join(' · ')}</div>
        </div>
      </div>
      <div className={styles.descGrid}>
        <p className={styles.descZh}>{project.desc[0]}</p>
        <div>
          <p className={styles.descEn}>{project.desc[1]}</p>
          <p className={styles.descFr}>{project.desc[2]}</p>
          {project.link && (
            <div className={styles.links}>
              <span className={styles.linkPrimary}>查看作品 ↗</span>
              {project.repo && (
                <span className={styles.linkSecondary}>GitHub ↗</span>
              )}
            </div>
          )}
        </div>
      </div>
      {project.video && (
        <div className={styles.videoWrap}>
          {/* eslint-disable-next-line @next/next/no-video-element */}
          <video
            src={project.video}
            className={styles.video}
            controls
            playsInline
            preload="metadata"
          >
            <track kind="captions" />
          </video>
        </div>
      )}
      {images.length > 0 && (
        <div className={styles.gallery}>
          {images.map((src, k) => (
            <div
              key={k}
              className={styles.galleryItem}
              style={{
                background: project.g,
                gridColumn: k === 0 ? '1 / -1' : undefined,
                aspectRatio: k === 0 ? '16 / 10' : '4 / 3',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`${project.t} — ${k + 1}`}
                className={styles.galleryImg}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
