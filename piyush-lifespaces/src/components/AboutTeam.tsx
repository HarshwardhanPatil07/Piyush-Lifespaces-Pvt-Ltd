'use client'

import { motion } from 'framer-motion'
import { Linkedin, Mail, Phone } from 'lucide-react'

const teamMembers = [
  {
    name: 'Piyush Sharma',
    role: 'Founder & CEO',
    description: 'Visionary leader with 20+ years in real estate development. Passionate about creating sustainable communities.',
    image: '/api/placeholder/300/300',
    linkedin: '#',
    email: 'piyush@piyushlifespaces.com'
  },
  {
    name: 'Priya Patel',
    role: 'Chief Operating Officer',
    description: 'Expert in operations management with a focus on project delivery and quality assurance.',
    image: '/api/placeholder/300/300',
    linkedin: '#',
    email: 'priya@piyushlifespaces.com'
  },
  {
    name: 'Rajesh Kumar',
    role: 'Head of Sales & Marketing',
    description: 'Strategic marketing professional driving brand growth and customer engagement.',
    image: '/api/placeholder/300/300',
    linkedin: '#',
    email: 'rajesh@piyushlifespaces.com'
  },
  {
    name: 'Anita Singh',
    role: 'Chief Financial Officer',
    description: 'Financial strategist ensuring sustainable growth and investment optimization.',
    image: '/api/placeholder/300/300',
    linkedin: '#',
    email: 'anita@piyushlifespaces.com'
  },
  {
    name: 'Vikram Agarwal',
    role: 'Head of Design & Architecture',
    description: 'Creative architect designing innovative spaces that blend aesthetics with functionality.',
    image: '/api/placeholder/300/300',
    linkedin: '#',
    email: 'vikram@piyushlifespaces.com'
  },
  {
    name: 'Sneha Desai',
    role: 'Customer Relations Manager',
    description: 'Dedicated to ensuring exceptional customer experience throughout the buying journey.',
    image: '/api/placeholder/300/300',
    linkedin: '#',
    email: 'sneha@piyushlifespaces.com'
  }
]

export default function AboutTeam() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Meet Our Leadership Team
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our success is driven by a passionate team of professionals who bring decades of combined experience in real estate, design, finance, and customer service.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {member.description}
                </p>

                {/* Contact Icons */}
                <div className="flex space-x-3">
                  <a
                    href={member.linkedin}
                    className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-300"
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-600 hover:text-white transition-colors duration-300"
                    aria-label={`Email ${member.name}`}
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white"
        >
          <h3 className="text-2xl font-bold mb-4">
            Join Our Growing Team
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            We're always looking for talented individuals who share our passion for excellence and innovation in real estate development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/careers"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300"
            >
              View Open Positions
            </a>
            <a
              href="mailto:careers@piyushlifespaces.com"
              className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors duration-300"
            >
              Send Your Resume
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
