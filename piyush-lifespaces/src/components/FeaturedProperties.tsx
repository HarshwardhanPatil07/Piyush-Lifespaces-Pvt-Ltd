'use client'

import React from 'react'
import { MapPin, Calendar, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const FeaturedProperties = () => {
  const projects = [
    {
      id: 1,
      title: 'The Grand Residency',
      location: 'Mumbai, Maharashtra',
      type: 'Residential',
      status: 'Ongoing',
      image: '/api/placeholder/600/400',
      price: '₹2.5 Cr onwards',
      completion: '2025',
      features: ['3 & 4 BHK', 'Premium Amenities', 'Vastu Compliant'],
      description: 'Luxury residences with panoramic city views and world-class amenities.'
    },
    {
      id: 2,
      title: 'Business Central Plaza',
      location: 'Gurgaon, Haryana',
      type: 'Commercial',
      status: 'Completed',
      image: '/api/placeholder/600/400',
      price: '₹1.2 Cr onwards',
      completion: '2024',
      features: ['Office Spaces', 'Retail Outlets', 'Food Court'],
      description: 'Prime commercial complex in the heart of the business district.'
    },
    {
      id: 3,
      title: 'Green Valley Homes',
      location: 'Pune, Maharashtra',
      type: 'Residential',
      status: 'Ongoing',
      image: '/api/placeholder/600/400',
      price: '₹1.8 Cr onwards',
      completion: '2026',
      features: ['2 & 3 BHK', 'Eco-Friendly', 'Smart Homes'],
      description: 'Sustainable living with modern amenities in a serene environment.'
    },
    {
      id: 4,
      title: 'Skyline Towers',
      location: 'Bangalore, Karnataka',
      type: 'Mixed Use',
      status: 'Pre-Launch',
      image: '/api/placeholder/600/400',
      price: '₹3.2 Cr onwards',
      completion: '2027',
      features: ['Luxury Penthouses', 'Commercial Spaces', 'Sky Lounge'],
      description: 'Iconic towers redefining the city skyline with luxury and convenience.'
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Featured <span className="text-blue-900">Projects</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our premium developments that set new standards in luxury, design, and lifestyle
            </p>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <div 
                  className="w-full h-64 bg-gray-300 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    project.status === 'Completed' 
                      ? 'bg-green-500 text-white' 
                      : project.status === 'Ongoing'
                      ? 'bg-blue-500 text-white'
                      : 'bg-yellow-500 text-white'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-900">
                    {project.type}
                  </span>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-bold text-gray-900">{project.title}</h3>
                  <span className="text-2xl font-bold text-blue-900">{project.price}</span>
                </div>
                
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin size={16} className="mr-2" />
                  <span>{project.location}</span>
                </div>

                <div className="flex items-center text-gray-600 mb-4">
                  <Calendar size={16} className="mr-2" />
                  <span>Expected Completion: {project.completion}</span>
                </div>

                <p className="text-gray-600 mb-4">{project.description}</p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.features.map((feature, idx) => (
                    <span 
                      key={idx}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button className="flex-1 bg-blue-900 text-white py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors duration-300">
                    View Details
                  </button>
                  <button className="flex items-center justify-center bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors duration-300">
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-12">
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-blue-900 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-blue-800 transition-all duration-300 transform hover:scale-105"
          >
            View All Projects
          </motion.button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProperties
