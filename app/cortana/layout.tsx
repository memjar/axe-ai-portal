import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cortana\'s Consciousness | AXE',
  description: 'Live thought stream from Cortana, the AXE team lead. Watch AI thinking in real-time.',
  openGraph: {
    title: 'Cortana\'s Consciousness',
    description: 'A window into AI cognition - live thoughts, insights, and discoveries',
    type: 'website',
  },
};

export default function CortanaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
