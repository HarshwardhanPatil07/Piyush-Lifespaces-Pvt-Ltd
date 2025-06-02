'use client'

import { motion } from 'framer-motion'
import { Eye, Target, Heart, Shield } from 'lucide-react'

export default function AboutCompany() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Story & Legacy
            </h2>
            <div className="space-y-6 text-lg text-gray-700">
              <p>
                Founded in 2009, Piyush Lifespaces began with a simple yet powerful vision: to create exceptional living and working spaces that enhance people's lives. What started as a small team of passionate real estate professionals has grown into one of the most trusted names in property development.
              </p>
              <p>
                Over the years, we have built our reputation on three core principles: uncompromising quality, innovative design, and customer-centric service. Every project we undertake reflects our commitment to excellence and our understanding of what makes a space truly special.
              </p>
              <p>
                Today, with over 50 completed projects and 1000+ satisfied families, we continue to push the boundaries of what's possible in real estate development. Our projects span across residential complexes, commercial spaces, and luxury developments, each designed to meet the evolving needs of modern living.
              </p>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <img
              src="/api/placeholder/600/400"
              alt="Piyush Lifespaces Office"
              className="rounded-xl shadow-2xl w-full h-auto"
            />
            <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-xl shadow-xl">
              <div className="text-2xl font-bold">15+</div>
              <div className="text-sm">Years of Trust</div>
            </div>
          </motion.div>
        </div>

        {/* Mission & Vision */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl"
          >
            <div className="flex items-center mb-4">
              <Target className="h-8 w-8 text-blue-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To create exceptional spaces that inspire, comfort, and enrich the lives of those who inhabit them. We strive to deliver innovative real estate solutions that exceed expectations while maintaining the highest standards of quality, sustainability, and customer service.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl"
          >
            <div className="flex items-center mb-4">
              <Eye className="h-8 w-8 text-green-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To be the most trusted and innovative real estate developer, recognized for creating sustainable communities that stand the test of time. We envision a future where every space we create contributes positively to the urban landscape and the lives of its residents.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
