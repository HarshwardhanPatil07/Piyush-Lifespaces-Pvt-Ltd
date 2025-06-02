'use client'

import React from 'react'
import { Award, Users, Building, Target } from 'lucide-react'
import { motion } from 'framer-motion'

const AboutSection = () => {
  const stats = [
    {
      icon: <Building size={32} />,
      number: '50+',
      label: 'Projects Completed',
      description: 'Successful developments across multiple cities'
    },
    {
      icon: <Users size={32} />,
      number: '10K+',
      label: 'Happy Families',
      description: 'Satisfied customers living in our properties'
    },
    {
      icon: <Award size={32} />,
      number: '15+',
      label: 'Years Experience',
      description: 'Proven track record in real estate development'
    },
    {
      icon: <Target size={32} />,
      number: '25+',
      label: 'Ongoing Projects',
      description: 'Current developments in progress'
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Building Dreams,<br />
                Creating <span className="text-blue-900">Lifespaces</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                For over 15 years, Piyush Lifespaces has been at the forefront of real estate 
                development, creating exceptional residential and commercial properties that 
                redefine modern living and working experiences.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our commitment to quality, innovation, and customer satisfaction has made us 
                one of the most trusted names in the industry. We don't just build structures; 
                we create communities where life flourishes.
              </p>
            </div>

            {/* Key Features */}
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-900 rounded-full mt-3"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Premium Quality Construction</h4>
                  <p className="text-gray-600">Using only the finest materials and latest construction technologies</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-900 rounded-full mt-3"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Sustainable Development</h4>
                  <p className="text-gray-600">Eco-friendly practices and green building certifications</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-900 rounded-full mt-3"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Customer-Centric Approach</h4>
                  <p className="text-gray-600">Personalized service and transparent communication throughout</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button className="bg-blue-900 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-blue-800 transition-all duration-300 transform hover:scale-105">
                Learn More About Us
              </button>
            </div>
          </motion.div>

          {/* Right Content - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Background Image */}
            <div className="relative">
              <div 
                className="w-full h-96 bg-gray-300 rounded-2xl bg-cover bg-center"
                style={{ backgroundImage: 'url(/api/placeholder/600/400)' }}
              >
                <div className="absolute inset-0 bg-blue-900/20 rounded-2xl" />
              </div>
              
              {/* Stats Cards */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white/95 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white transition-all duration-300"
                    >
                      <div className="text-blue-900 mb-2 flex justify-center">
                        {stat.icon}
                      </div>
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        {stat.number}
                      </div>
                      <div className="text-sm font-semibold text-gray-900 mb-1">
                        {stat.label}
                      </div>
                      <div className="text-xs text-gray-600">
                        {stat.description}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Vision & Mission */}
        <div className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-blue-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-blue-900 mb-4">Our Vision</h3>
                <p className="text-gray-700 leading-relaxed">
                  To be the leading real estate developer in India, known for creating 
                  sustainable, innovative, and customer-centric developments that enhance 
                  the quality of life for communities.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-700 leading-relaxed">
                  To deliver exceptional real estate experiences through innovative design, 
                  quality construction, and unparalleled customer service while maintaining 
                  our commitment to sustainability and community development.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
