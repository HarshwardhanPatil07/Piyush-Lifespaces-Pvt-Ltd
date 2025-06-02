'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Building2, Users, Award } from 'lucide-react'

export default function ContactInfo() {
  const contactDetails = [
    {
      icon: MapPin,
      title: 'Office Address',
      details: [
        '123 Real Estate Avenue',
        'Business District, Pune - 411001',
        'Maharashtra, India'
      ],
      color: 'text-blue-600'
    },
    {
      icon: Phone,
      title: 'Phone Numbers',
      details: [
        '+91 98765 43210',
        '+91 20 1234 5678',
        'Toll Free: 1800-123-4567'
      ],
      color: 'text-green-600'
    },
    {
      icon: Mail,
      title: 'Email Addresses',
      details: [
        'info@piyushlifespaces.com',
        'sales@piyushlifespaces.com',
        'support@piyushlifespaces.com'
      ],
      color: 'text-purple-600'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: [
        'Monday - Saturday: 9:00 AM - 7:00 PM',
        'Sunday: 10:00 AM - 6:00 PM',
        'Public Holidays: Closed'
      ],
      color: 'text-orange-600'
    }
  ]

  const stats = [
    { icon: Building2, number: '50+', label: 'Projects Completed' },
    { icon: Users, number: '1000+', label: 'Happy Families' },
    { icon: Award, number: '25+', label: 'Awards Won' }
  ]

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Contact Information
          </h2>
          <p className="text-gray-600">
            Multiple ways to reach us. We're here to help you find your perfect property.
          </p>
        </motion.div>

        {/* Contact Details */}
        <div className="space-y-6 mb-12">
          {contactDetails.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start">
                  <div className={`${item.color} bg-gray-50 rounded-full p-3 mr-4 flex-shrink-0`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    {item.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-gray-600 mb-1">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl p-8 shadow-lg"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Why Choose Piyush Lifespaces?
          </h3>
          <div className="grid grid-cols-3 gap-6 text-center">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="group">
                  <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-100 transition-colors duration-300">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.label}
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Emergency Contact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white text-center"
        >
          <h3 className="text-lg font-semibold mb-2">
            24/7 Emergency Support
          </h3>
          <p className="text-red-100 mb-4">
            For urgent property-related emergencies
          </p>
          <a
            href="tel:+919876543210"
            className="bg-white text-red-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300 inline-block"
          >
            Call Emergency Line
          </a>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-gray-600 mb-4">
            Join thousands of satisfied customers who trust Piyush Lifespaces
          </p>
          <div className="flex justify-center space-x-4">
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
              ⭐ 4.9/5 Customer Rating
            </div>
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
              🏆 ISO Certified
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
