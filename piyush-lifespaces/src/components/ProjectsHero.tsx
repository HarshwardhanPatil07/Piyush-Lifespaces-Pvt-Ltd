'use client'

import { motion } from 'framer-motion'
import { Building2, MapPin, Calendar } from 'lucide-react'

export default function ProjectsHero() {
  return (
    <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Our Projects
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-12"
          >
            Discover our portfolio of exceptional properties designed to elevate your lifestyle and investment goals.
          </motion.p>

          {/* Project Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6">
              <Building2 className="h-8 w-8 text-white mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-blue-100">Total Projects</div>
            </div>
            
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6">
              <MapPin className="h-8 w-8 text-white mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-2">8+</div>
              <div className="text-blue-100">Prime Locations</div>
            </div>
            
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6">
              <Calendar className="h-8 w-8 text-white mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-2">15+</div>
              <div className="text-blue-100">Years Experience</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
