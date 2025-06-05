'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'

interface Testimonial {
  _id: string
  name: string
  location: string
  rating: number
  review: string
  image: string
  property: string
  order: number
}

export default function TestimonialsSection() {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch featured reviews from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        console.log('Fetching testimonials from API...')
        const response = await fetch('/api/home/featured-reviews', {
          cache: 'no-store', // Disable caching
          headers: {
            'Cache-Control': 'no-cache',
          }
        })
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('API Response:', data)
        
        if (data.success && data.data && Array.isArray(data.data)) {
          console.log('Successfully loaded testimonials from admin:', data.data.length)
          setTestimonials(data.data.sort((a: Testimonial, b: Testimonial) => a.order - b.order))
          setError(null)
        } else {
          console.log('No testimonials found in admin system')
          setTestimonials([])
          setError('No testimonials available. Please add some through the admin panel.')
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error)
        setTestimonials([])
        setError('Failed to load testimonials. Please check your connection or contact the administrator.')
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  const itemsPerView = 3
  const maxIndex = Math.max(0, testimonials.length - itemsPerView)

  const handlePrevious = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex(prev => prev === 0 ? maxIndex : prev - 1)
    setTimeout(() => setIsAnimating(false), 300)
  }
  const handleNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex(prev => prev === maxIndex ? 0 : prev + 1)
    setTimeout(() => setIsAnimating(false), 300)
  }

  const handleViewProperties = () => {
    router.push('/projects')
  }

  const handleScheduleVisit = () => {
    router.push('/contact')
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }
  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading testimonials...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error || testimonials.length === 0) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our Clients Say
            </h2>
            <div className="bg-white rounded-xl shadow-lg p-12 max-w-2xl mx-auto">
              <Quote className="h-12 w-12 text-gray-300 mx-auto mb-6" />
              <p className="text-gray-500 text-lg mb-6">
                {error || 'No testimonials are currently available.'}
              </p>
              <p className="text-gray-400 text-sm">
                Testimonials can be managed through the admin panel.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the experiences of families and businesses who chose Piyush Lifespaces 
              for their dream properties. Their stories inspire our commitment to excellence.
            </p>
          </motion.div>
        </div>        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          {testimonials.length > itemsPerView && (
            <div className="flex justify-center items-center mb-8">
              <button
                onClick={handlePrevious}
                disabled={isAnimating}
                className="mr-4 p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-6 w-6 text-blue-600" />
              </button>
              
              <div className="text-sm text-gray-500 px-4">
                {currentIndex + 1} - {Math.min(currentIndex + itemsPerView, testimonials.length)} of {testimonials.length}
              </div>
              
              <button
                onClick={handleNext}
                disabled={isAnimating}
                className="ml-4 p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-6 w-6 text-blue-600" />
              </button>
            </div>
          )}

          {/* Testimonials Grid */}
          <div className="overflow-hidden">
            <motion.div
              className={`flex transition-transform duration-300 ease-in-out ${
                testimonials.length <= itemsPerView ? 'justify-center' : ''
              }`}
              style={{
                transform: testimonials.length > itemsPerView 
                  ? `translateX(-${currentIndex * (100 / itemsPerView)}%)`
                  : 'none'
              }}
            >              {testimonials.map((testimonial) => (
                <div
                  key={testimonial._id}
                  className={`w-full ${
                    testimonials.length <= itemsPerView 
                      ? 'md:w-1/3 max-w-md mx-2' 
                      : 'md:w-1/3'
                  } flex-shrink-0 px-3`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl shadow-lg p-8 h-full hover:shadow-xl transition-shadow duration-300"
                  >
                    {/* Quote Icon */}
                    <div className="mb-6">
                      <Quote className="h-8 w-8 text-blue-600" />
                    </div>

                    {/* Review Text */}
                    <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                      "{testimonial.review}"
                    </p>

                    {/* Rating */}
                    <div className="flex items-center mb-6">
                      {renderStars(testimonial.rating)}
                    </div>                    {/* Customer Info */}
                    <div className="flex items-center">
                      <img
                        src={testimonial.image || "/images/default-avatar.svg"}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          // Prevent infinite re-render by only setting fallback once
                          if (target.src !== "/images/default-avatar.svg") {
                            target.src = "/images/default-avatar.svg";
                          }
                        }}
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {testimonial.name}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {testimonial.location} • {testimonial.property}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>          {/* Dots Indicator */}
          {testimonials.length > itemsPerView && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: maxIndex + 1 }, (_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true)
                      setCurrentIndex(i)
                      setTimeout(() => setIsAnimating(false), 300)
                    }
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Join Our Happy Customers?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience the same level of satisfaction and quality that our customers rave about. 
            Let us help you find your perfect property.
          </p>          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleViewProperties}
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors duration-300"
            >
              View Properties
            </button>
            <button 
              onClick={handleScheduleVisit}
              className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-medium hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              Schedule a Visit
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
