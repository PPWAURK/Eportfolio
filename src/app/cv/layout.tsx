import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '履历 | CV — 王世洪 Eric Wang',
  description: 'Resume / CV of Eric Wang. Full-stack developer & photographer. 王世洪的简历。',
};

export default function CVLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
