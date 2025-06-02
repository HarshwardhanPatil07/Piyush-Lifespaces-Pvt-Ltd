'use client'

import React, { useState, useEffect } from 'react'
import { MapPin, Calendar, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface FeaturedProject {
  _id: string
  title: string
  location: string
  type: string
  status: 'ongoing' | 'completed' | 'upcoming'
  images: string[]
  price: string
  possession?: string
  amenities?: string[]
  description: string
}

const FeaturedProperties = () => {
  const [projects, setProjects] = useState<FeaturedProject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        const response = await fetch('/api/properties?featured=true')
        const data = await response.json()
        
        if (data.success) {
          // Take only first 4 featured projects for homepage
          setProjects(data.data.slice(0, 4))
        } else {
          setError('Failed to load featured projects')
        }
      } catch (err) {
        setError('Failed to load featured projects')
        console.error('Error fetching featured projects:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProjects()
  }, [])

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Featured <span className="text-blue-900">Projects</span>
            </h2>
          </div>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Featured <span className="text-blue-900">Projects</span>
            </h2>
          </div>
          <div className="text-center text-red-600">{error}</div>
        </div>
      </section>
    )
  }

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
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project._id}
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
                    style={{ 
                      backgroundImage: `url(${project.images && project.images.length > 0 ? project.images[0] : '/api/placeholder/600/400'})` 
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      project.status === 'completed' 
                        ? 'bg-green-500 text-white' 
                        : project.status === 'ongoing'
                        ? 'bg-blue-500 text-white'
                        : 'bg-yellow-500 text-white'
                    }`}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
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
                    <span>Expected Completion: {project.possession || 'Contact for details'}</span>
                  </div>

                  <p className="text-gray-600 mb-4">{project.description}</p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.amenities && project.amenities.slice(0, 3).map((amenity, idx) => (
                      <span 
                        key={idx}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Link 
                      href={`/projects/${project._id}`}
                      className="flex-1 bg-blue-900 text-white py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors duration-300 text-center"
                    >
                      View Details
                    </Link>
                    <Link 
                      href={`/projects/${project._id}`}
                      className="flex items-center justify-center bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors duration-300"
                    >
                      <ArrowRight size={20} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No featured projects available at the moment.</p>
            <p className="text-gray-500 text-sm mt-2">Check back soon for exciting new developments!</p>
          </div>
        )}

        {/* View All Projects Button */}
        <div className="text-center mt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Link
              href="/projects"
              className="bg-blue-900 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 inline-block"
            >
              View All Projects
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProperties
