import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '关于 | À propos — 王世洪 Eric Wang',
  description: 'Full-stack developer & landscape photographer in Paris. M1 Network Engineering at Université Paris Cité. 全栈开发者·风光摄影·巴黎',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
