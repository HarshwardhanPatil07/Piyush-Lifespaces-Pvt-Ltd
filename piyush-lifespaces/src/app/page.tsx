import Hero from '@/components/Hero'
import FeaturedProperties from '@/components/FeaturedProperties'
import AboutSection from '@/components/AboutSection'
import TestimonialsSection from '@/components/TestimonialsSection'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturedProperties />
      <AboutSection />
      <TestimonialsSection />
    </main>
  )
}
