'use client'

import { motion } from 'framer-motion'
import { Building2, Users, Award, Calendar } from 'lucide-react'

export default function AboutHero() {
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
            About Piyush Lifespaces
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-12"
          >
            Building dreams, creating communities, and shaping skylines with passion and excellence since 2009.
          </motion.p>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
          >
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">15+</div>
              <div className="text-blue-100">Years of Excellence</div>
            </div>
            
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-blue-100">Projects Completed</div>
            </div>
            
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">1000+</div>
              <div className="text-blue-100">Happy Families</div>
            </div>
            
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">25+</div>
              <div className="text-blue-100">Awards Won</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
