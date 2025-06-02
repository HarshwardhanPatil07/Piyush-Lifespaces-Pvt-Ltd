import { Metadata } from 'next'
import AboutHero from '@/components/AboutHero'
import AboutCompany from '@/components/AboutCompany'
import AboutTeam from '@/components/AboutTeam'
import AboutValues from '@/components/AboutValues'

export const metadata: Metadata = {
  title: 'About Us - Piyush Lifespaces',
  description: 'Learn about Piyush Lifespaces - our story, mission, values, and the team behind premium real estate development since 2009.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <AboutHero />
      <AboutCompany />
      <AboutValues />
      <AboutTeam />
    </main>
  )
}
