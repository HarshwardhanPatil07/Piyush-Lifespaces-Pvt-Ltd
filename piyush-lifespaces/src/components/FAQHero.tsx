'use client'

import { motion } from 'framer-motion'
import { HelpCircle, MessageCircle, Phone } from 'lucide-react'

export default function FAQHero() {
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
            Frequently Asked Questions
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-12"
          >
            Find answers to common questions about our projects, processes, and services.
          </motion.p>

          {/* Quick Help Options */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6">
              <HelpCircle className="h-8 w-8 text-white mx-auto mb-3" />
              <div className="text-white font-semibold">Browse FAQs</div>
              <div className="text-blue-100 text-sm">Find instant answers</div>
            </div>
            
            <a
              href="#contact-support"
              className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 hover:bg-opacity-30 transition-all duration-300 group"
            >
              <MessageCircle className="h-8 w-8 text-white mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
              <div className="text-white font-semibold">Chat Support</div>
              <div className="text-blue-100 text-sm">Get live help</div>
            </a>
            
            <a
              href="tel:+919876543210"
              className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 hover:bg-opacity-30 transition-all duration-300 group"
            >
              <Phone className="h-8 w-8 text-white mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
              <div className="text-white font-semibold">Call Us</div>
              <div className="text-blue-100 text-sm">+91 98765 43210</div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
