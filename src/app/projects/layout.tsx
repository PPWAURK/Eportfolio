import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '项目 | Projets — 王世洪 Eric Wang',
  description: 'Full-stack development & photography projects. 全栈开发与摄影项目集。',
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
