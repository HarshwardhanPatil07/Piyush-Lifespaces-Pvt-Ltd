'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MapPin, Calendar, Home, Bath, Car, ArrowRight, Star } from 'lucide-react'

interface Project {
  id: number
  name: string
  location: string
  type: string
  status: 'ongoing' | 'completed' | 'upcoming'
  price: string
  image: string
  features: {
    bedrooms?: string
    bathrooms?: string
    parking?: string
    area: string
  }
  completion: string
  rating?: number
  description: string
}

const projects: Project[] = [
  {
    id: 1,
    name: "Piyush Heights",
    location: "Pune, Maharashtra",
    type: "Residential",
    status: "ongoing",
    price: "₹85 Lakhs - ₹1.2 Cr",
    image: "/api/placeholder/400/300",
    features: {
      bedrooms: "2-3 BHK",
      bathrooms: "2-3",
      parking: "1-2",
      area: "1200-1800 sq ft"
    },
    completion: "Dec 2025",
    rating: 4.8,
    description: "Modern residential complex with premium amenities and excellent connectivity."
  },
  {
    id: 2,
    name: "Piyush Commercial Plaza",
    location: "Mumbai, Maharashtra",
    type: "Commercial",
    status: "completed",
    price: "₹2.5 Cr - ₹5 Cr",
    image: "/api/placeholder/400/300",
    features: {
      area: "500-2000 sq ft"
    },
    completion: "Completed",
    rating: 4.9,
    description: "Prime commercial spaces in the heart of business district with modern facilities."
  },
  {
    id: 3,
    name: "Piyush Luxury Villas",
    location: "Bangalore, Karnataka",
    type: "Villa",
    status: "upcoming",
    price: "₹3.5 Cr - ₹6 Cr",
    image: "/api/placeholder/400/300",
    features: {
      bedrooms: "4-5 BHK",
      bathrooms: "4-6",
      parking: "3-4",
      area: "3000-4500 sq ft"
    },
    completion: "Mar 2026",
    description: "Exclusive luxury villas with private gardens and premium finishes."
  },
  {
    id: 4,
    name: "Piyush Residency",
    location: "Hyderabad, Telangana",
    type: "Residential",
    status: "ongoing",
    price: "₹65 Lakhs - ₹95 Lakhs",
    image: "/api/placeholder/400/300",
    features: {
      bedrooms: "1-2 BHK",
      bathrooms: "1-2",
      parking: "1",
      area: "800-1200 sq ft"
    },
    completion: "Aug 2025",
    rating: 4.7,
    description: "Affordable luxury apartments with modern amenities and great location."
  },
  {
    id: 5,
    name: "Piyush Garden Homes",
    location: "Chennai, Tamil Nadu",
    type: "Residential",
    status: "completed",
    price: "₹1.2 Cr - ₹1.8 Cr",
    image: "/api/placeholder/400/300",
    features: {
      bedrooms: "3-4 BHK",
      bathrooms: "3-4",
      parking: "2",
      area: "1800-2400 sq ft"
    },
    completion: "Completed",
    rating: 4.9,
    description: "Spacious homes with beautiful gardens and family-friendly amenities."
  },
  {
    id: 6,
    name: "Piyush Business Hub",
    location: "Delhi NCR",
    type: "Commercial",
    status: "ongoing",
    price: "₹1.5 Cr - ₹3 Cr",
    image: "/api/placeholder/400/300",
    features: {
      area: "300-1500 sq ft"
    },
    completion: "Nov 2025",
    rating: 4.6,
    description: "Modern office spaces with state-of-the-art infrastructure and amenities."
  }
]

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
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  {getStatusBadge(project.status)}
                </div>
                {project.rating && (
                  <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full px-2 py-1 flex items-center">
                    <Star className="h-3 w-3 text-yellow-500 fill-current mr-1" />
                    <span className="text-xs font-medium">{project.rating}</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {project.name}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{project.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="text-sm">{project.completion}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-4">
                  {project.features.bedrooms && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Home className="h-4 w-4 mr-2" />
                      <span>{project.features.bedrooms}</span>
                    </div>
                  )}
                  {project.features.bathrooms && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Bath className="h-4 w-4 mr-2" />
                      <span>{project.features.bathrooms} Bathrooms</span>
                    </div>
                  )}
                  {project.features.parking && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Car className="h-4 w-4 mr-2" />
                      <span>{project.features.parking} Parking</span>
                    </div>
                  )}
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium">Area: {project.features.area}</span>
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
                    href={`/projects/${project.id}`}
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
      </div>
    </section>
  )
}
