import Hero from '@/components/Hero'
import FeaturedProperties from '@/components/FeaturedProperties'
import AboutSection from '@/components/AboutSection'
import VideoSection from '@/components/VideoSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import QuickInquiry from '@/components/QuickInquiry'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturedProperties />
      <AboutSection />
      <VideoSection />
      <QuickInquiry />
      <TestimonialsSection />
    </main>
  )
}
