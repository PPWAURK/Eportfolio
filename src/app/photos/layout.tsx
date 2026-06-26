import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '照片 | Photos — 王世洪 Eric Wang',
  description: 'Street, portrait, landscape & travel photography gallery. 街头·人像·风景·旅行摄影作品集。',
};

export default function PhotosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
