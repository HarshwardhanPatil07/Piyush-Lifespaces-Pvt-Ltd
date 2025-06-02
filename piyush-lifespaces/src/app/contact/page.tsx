import { Metadata } from 'next'
import ContactHero from '@/components/ContactHero'
import ContactForm from '@/components/ContactForm'
import ContactInfo from '@/components/ContactInfo'
import ContactMap from '@/components/ContactMap'

export const metadata: Metadata = {
  title: 'Contact Us - Piyush Lifespaces',
  description: 'Get in touch with Piyush Lifespaces. Contact us for inquiries about our real estate projects, investment opportunities, or any other questions.',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <ContactHero />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        <ContactForm />
        <ContactInfo />
      </div>
      <ContactMap />
    </main>
  )
}
