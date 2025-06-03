'use client'

import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { motion } from 'framer-motion'

interface Slide {
  _id: string
  title: string
  subtitle: string
  description: string
  image?: string
  imageId?: string
  ctaText: string
  ctaLink: string
  order: number
}

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slides, setSlides] = useState<Slide[]>([])
  const [loading, setLoading] = useState(true)

  // Fallback slides if API fails
  const fallbackSlides = [
    {
      _id: 'fallback-1',
      image: '/api/placeholder/1920/800',
      title: 'Luxury Living Redefined',
      subtitle: 'Premium Residential Developments',
      description: 'Experience the pinnacle of modern living with our carefully crafted residential projects that blend luxury, comfort, and innovation.',
      ctaText: 'Explore Projects',
      ctaLink: '/projects',
      order: 1
    },
    {
      _id: 'fallback-2',
      image: '/api/placeholder/1920/800',
      title: 'Commercial Excellence',
      subtitle: 'Strategic Business Locations',
      description: 'Discover premium commercial spaces designed to elevate your business in prime locations with world-class amenities.',
      ctaText: 'View Commercial',
      ctaLink: '/projects',
      order: 2
    },
    {
      _id: 'fallback-3',
      image: '/api/placeholder/1920/800',
      title: 'Sustainable Development',
      subtitle: 'Building for the Future',
      description: 'Our commitment to sustainable development ensures every project contributes to a greener, more sustainable future.',
      ctaText: 'Learn More',
      ctaLink: '/about',
      order: 3
    }
  ]

  // Fetch slides from API
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch('/api/home/slides')
        const data = await response.json()
        
        if (data.success && data.data && data.data.length > 0) {
          setSlides(data.data)
        } else {
          setSlides(fallbackSlides)
        }
      } catch (error) {
        console.error('Error fetching slides:', error)
        setSlides(fallbackSlides)
      } finally {
        setLoading(false)
      }
    }

    fetchSlides()
  }, [])
  useEffect(() => {
    if (slides.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, 5000)
      return () => clearInterval(timer)
    }
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  if (loading) {
    return (
      <section className="relative h-screen overflow-hidden bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </section>
    )
  }

  if (slides.length === 0) {
    return (
      <section className="relative h-screen overflow-hidden bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Piyush Lifespaces</h1>
          <p className="text-xl">Premium Real Estate Development</p>
        </div>
      </section>
    )
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >          <div 
            className="w-full h-full bg-cover bg-center bg-gray-300"
            style={{ backgroundImage: `url(${slide.imageId ? `/api/images/${slide.imageId}` : slide.image})` }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-gold-400 text-lg mb-4 font-medium">
                {slides[currentSlide].subtitle}
              </p>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                {slides[currentSlide].title}
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl">
                {slides[currentSlide].description}
              </p>              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => window.location.href = slides[currentSlide].ctaLink}
                  className="bg-blue-900 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-blue-800 transition-all duration-300 transform hover:scale-105"
                >
                  {slides[currentSlide].ctaText}
                </button>
                <button className="flex items-center space-x-2 text-white border-2 border-white px-8 py-4 rounded-full text-lg font-medium hover:bg-white hover:text-blue-900 transition-all duration-300">
                  <Play size={20} />
                  <span>Watch Video</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-20">
        <div className="flex flex-col items-center text-white">
          <span className="text-sm mb-2 rotate-90 origin-center">Scroll</span>
          <div className="w-px h-16 bg-white/50" />
        </div>
      </div>
    </section>
  )
}

export default Hero
