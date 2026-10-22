import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Value Engineering Practice | Section 4 · Division 1 Delivery Practice | TRUSTGRID.AI',
  description:
    'Forward deployment for value delivery across agents, data, robotics, IoT, RPA, DLT, and physical AI. Five stages, four engineers, five proofs, one number Finance signs.',
  keywords: [
    'AI Value Engineering Practice',
    'Division 1 Delivery Practice',
    'Forward Deployment Engineering',
    'AI Value Lifecycle',
    'Five Proofs Standard',
    'Focal Value Creation Model',
    'Autonomous AI POD',
    'Methodology Engine'
  ],
  alternates: {
    canonical: 'https://trustgrid.ai/practice-areas/ai-value-engineering'
  },
  openGraph: {
    title: 'AI Value Engineering Practice | Forward Deployment & Value Delivery',
    description:
      'Forward deployment for value delivery — across agents, data, robotics, IoT, RPA, DLT and physical AI. Five stages, four engineers, five proofs, one number Finance signs.',
    url: 'https://trustgrid.ai/practice-areas/ai-value-engineering',
    type: 'article'
  }
}

export default function AIValueEngineeringLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
