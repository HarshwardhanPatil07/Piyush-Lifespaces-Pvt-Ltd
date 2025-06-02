'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MapPin, Calendar, Home, Bath, Car, ArrowRight, Star } from 'lucide-react'
import { useState, useEffect } from 'react'

interface Project {
  _id: string
  title: string
  location: string
  type: string
  status: 'ongoing' | 'completed' | 'upcoming'
  price: string
  images: string[]
  bedrooms?: number
  bathrooms?: number
  area: string
  possession?: string
  isFeatured?: boolean
  description: string
  amenities?: string[]
}

const getStatusBadge = (status: string) => {
  const styles = {
    ongoing: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    upcoming: 'bg-blue-100 text-blue-800'
  }
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

export default function ProjectsGrid() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/properties')
        const data = await response.json()
        
        if (data.success) {
          setProjects(data.data)
        } else {
          setError('Failed to load projects')
        }
      } catch (err) {
        setError('Failed to load projects')
        console.error('Error fetching projects:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-600">{error}</div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.images && project.images.length > 0 ? project.images[0] : '/api/placeholder/400/300'}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  {getStatusBadge(project.status)}
                </div>
                {project.isFeatured && (
                  <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full px-2 py-1 flex items-center">
                    <Star className="h-3 w-3 text-yellow-500 fill-current mr-1" />
                    <span className="text-xs font-medium">Featured</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{project.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="text-sm">{project.possession || 'Contact for details'}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-4">
                  {project.bedrooms && project.bedrooms > 0 && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Home className="h-4 w-4 mr-2" />
                      <span>{project.bedrooms} BHK</span>
                    </div>
                  )}
                  {project.bathrooms && project.bathrooms > 0 && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Bath className="h-4 w-4 mr-2" />
                      <span>{project.bathrooms} Bathrooms</span>
                    </div>
                  )}
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium">Area: {project.area}</span>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-bold text-blue-600">
                      {project.price}
                    </div>
                    <div className="text-xs text-gray-500">Starting Price</div>
                  </div>
                  <Link
                    href={`/projects/${project._id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center text-sm font-medium"
                  >
                    View Details
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        {projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium">
              Load More Projects
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
