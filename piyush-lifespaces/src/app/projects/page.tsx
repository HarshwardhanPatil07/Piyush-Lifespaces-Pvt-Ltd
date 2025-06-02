import { Metadata } from 'next'
import ProjectsHero from '@/components/ProjectsHero'
import ProjectsFilter from '@/components/ProjectsFilter'
import ProjectsGrid from '@/components/ProjectsGrid'

export const metadata: Metadata = {
  title: 'Our Projects - Piyush Lifespaces',
  description: 'Explore our portfolio of premium residential and commercial real estate projects. Find your perfect property from our extensive range of developments.',
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen">
      <ProjectsHero />
      <ProjectsFilter />
      <ProjectsGrid />
    </main>
  )
}
