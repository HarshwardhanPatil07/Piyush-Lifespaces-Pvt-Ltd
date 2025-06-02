'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'

interface Testimonial {
  id: number
  name: string
  location: string
  rating: number
  review: string
  image: string
  property: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Rajesh Kumar",
    location: "Pune",
    rating: 5,
    review: "Piyush Lifespaces delivered exactly what they promised. The quality of construction and attention to detail in our apartment is exceptional. The team was professional throughout the entire process.",
    image: "/api/placeholder/80/80",
    property: "Piyush Heights"
  },
  {
    id: 2,
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    review: "We're absolutely thrilled with our new home! The location is perfect, and the amenities are top-notch. Piyush Lifespaces has truly created a community where we love to live.",
    image: "/api/placeholder/80/80",
    property: "Piyush Residency"
  },
  {
    id: 3,
    name: "Amit Patel",
    location: "Bangalore",
    rating: 5,
    review: "From the initial consultation to the final handover, everything was smooth and transparent. The investment has already shown great returns. Highly recommend Piyush Lifespaces!",
    image: "/api/placeholder/80/80",
    property: "Piyush Commercial Plaza"
  },
  {
    id: 4,
    name: "Sneha Desai",
    location: "Pune",
    rating: 5,
    review: "The luxury finishes and modern design exceeded our expectations. Living here feels like being in a 5-star resort every day. Thank you, Piyush Lifespaces!",
    image: "/api/placeholder/80/80",
    property: "Piyush Luxury Villas"
  },
  {
    id: 5,
    name: "Vikram Singh",
    location: "Delhi",
    rating: 5,
    review: "Outstanding customer service and quality construction. The team was always available to address our concerns. Our family is very happy with our new home.",
    image: "/api/placeholder/80/80",
    property: "Piyush Garden Homes"
  },
  {
    id: 6,
    name: "Kavya Nair",
    location: "Chennai",
    rating: 5,
    review: "The attention to detail and premium amenities make this place special. Great connectivity and peaceful environment. Perfect for our growing family.",
    image: "/api/placeholder/80/80",
    property: "Piyush Heights"
  }
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

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

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            What Our Clients Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Don't just take our word for it. Here's what our satisfied customers have to say about their experience with Piyush Lifespaces.
          </motion.p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrevious}
            disabled={isAnimating}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 border border-gray-200"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>

          <button
            onClick={handleNext}
            disabled={isAnimating}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 border border-gray-200"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>

          {/* Testimonials Grid */}
          <div className="overflow-hidden">
            <motion.div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`
              }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full md:w-1/3 flex-shrink-0 px-3"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full"
                  >
                    {/* Quote Icon */}
                    <div className="mb-4">
                      <Quote className="h-8 w-8 text-blue-600 opacity-50" />
                    </div>

                    {/* Rating */}
                    <div className="flex mb-4">
                      {renderStars(testimonial.rating)}
                    </div>

                    {/* Review Text */}
                    <p className="text-gray-700 mb-6 line-clamp-4">
                      "{testimonial.review}"
                    </p>

                    {/* Client Info */}
                    <div className="flex items-center">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {testimonial.location} • {testimonial.property}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dots Indicator */}
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
                  i === currentIndex
                    ? 'bg-blue-600 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
            <div className="text-gray-600">Happy Families</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">4.9/5</div>
            <div className="text-gray-600">Customer Rating</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
            <div className="text-gray-600">Years Experience</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
            <div className="text-gray-600">Projects Completed</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
