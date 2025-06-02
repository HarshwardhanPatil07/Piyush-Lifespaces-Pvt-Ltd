'use client'

import { motion } from 'framer-motion'
import { Shield, Heart, Award, Users, Lightbulb, Handshake } from 'lucide-react'

const values = [
  {
    icon: Shield,
    title: 'Integrity',
    description: 'We conduct business with honesty, transparency, and ethical practices in all our dealings.',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We strive for perfection in every aspect of our work, from design to delivery.',
    color: 'bg-yellow-100 text-yellow-600'
  },
  {
    icon: Heart,
    title: 'Customer First',
    description: 'Our customers are at the heart of everything we do. Their satisfaction is our success.',
    color: 'bg-red-100 text-red-600'
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We embrace new technologies and creative solutions to build better spaces.',
    color: 'bg-purple-100 text-purple-600'
  },
  {
    icon: Users,
    title: 'Community',
    description: 'We build not just structures, but thriving communities where people love to live.',
    color: 'bg-green-100 text-green-600'
  },
  {
    icon: Handshake,
    title: 'Trust',
    description: 'We build lasting relationships based on trust, reliability, and mutual respect.',
    color: 'bg-indigo-100 text-indigo-600'
  }
]

export default function AboutValues() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Core Values
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            These fundamental principles guide our decisions, shape our culture, and define who we are as a company.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className={`w-16 h-16 rounded-full ${value.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center bg-white rounded-xl p-8 shadow-lg"
        >
          <blockquote className="text-2xl font-medium text-gray-900 mb-6">
            "Our values are not just words on a wall. They are the foundation upon which we build every relationship, every project, and every dream."
          </blockquote>
          <div className="flex items-center justify-center">
            <img
              src="/api/placeholder/60/60"
              alt="CEO"
              className="w-12 h-12 rounded-full mr-4"
            />
            <div className="text-left">
              <div className="font-semibold text-gray-900">Piyush Sharma</div>
              <div className="text-gray-600">Founder & CEO</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
