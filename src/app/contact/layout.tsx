import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '联系 | Contact — 王世洪 Eric Wang',
  description: 'Get in touch for freelance projects. 联系合作，通常 24h 内回复。',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
