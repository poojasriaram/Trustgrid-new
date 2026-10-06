import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { MedicalSuppliesCaseStudyContent } from '@/components/case-studies/medical-supplies-case-study-content'

export const metadata: Metadata = {
  title: 'Medical Supplies & Manufacturing AI Case Study | TRUSTGRID.AI',
  description: 'Explore how TRUSTGRID.AI uses Generative AI, RAG, Edge Computer Vision, dynamic regulatory labeling, and agentic warranty automation to transform medical supplies manufacturing, compliance, inspection, and claims processing.',
  keywords: [
    'medical supplies AI',
    'medical manufacturing AI',
    'AI regulatory compliance',
    'AI packaging inspection',
    'computer vision manufacturing',
    'RAG compliance',
    'AI warranty automation',
    'medical supply chain AI',
    'agentic AI claims',
    'TRUSTGRID.AI case study'
  ],
  openGraph: {
    title: 'Medical Supplies & Manufacturing AI Case Study | TRUSTGRID.AI',
    description: 'Explore how TRUSTGRID.AI uses Generative AI, RAG, Edge Computer Vision, dynamic regulatory labeling, and agentic warranty automation to transform medical supplies manufacturing, compliance, inspection, and claims processing.',
    images: ['/images/case-study-medical-packaging.jpg'],
    type: 'article'
  }
}

export default function MedicalSuppliesCaseStudyPage() {
  return (
    <div className="page-shell">
      <SiteHeader />
      <main className="main-content">
        <MedicalSuppliesCaseStudyContent />
      </main>
      <SiteFooter />
    </div>
  )
}
