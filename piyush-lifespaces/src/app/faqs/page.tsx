import { Metadata } from 'next'
import FAQHero from '@/components/FAQHero'
import FAQSection from '@/components/FAQSection'
import FAQContact from '@/components/FAQContact'

export const metadata: Metadata = {
  title: 'FAQs - Piyush Lifespaces',
  description: 'Find answers to frequently asked questions about our real estate projects, buying process, financing options, and more.',
}

export default function FAQPage() {
  return (
    <main className="min-h-screen">
      <FAQHero />
      <FAQSection />
      <FAQContact />
    </main>
  )
}
