import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Ordrji | Modern Restaurant Operating System',
  description: 'Learn about Ordrji, a modern Restaurant Operating System for Indian restaurants, cafés, QSRs, bakeries and cloud kitchens, built for fast billing, kitchen operations, inventory, customer growth and multi-outlet management.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
