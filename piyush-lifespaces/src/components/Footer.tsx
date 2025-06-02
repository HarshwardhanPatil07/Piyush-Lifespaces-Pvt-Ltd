'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Youtube,
  Clock,
  Award,
  Home,
  Building2
} from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'Contact', href: '/contact' }
  ]

  const services = [
    { name: 'Residential Projects', href: '/projects?type=residential' },
    { name: 'Commercial Properties', href: '/projects?type=commercial' },
    { name: 'Luxury Villas', href: '/projects?type=villa' },
    { name: 'Investment Properties', href: '/investment' },
    { name: 'Property Management', href: '/services/management' },
    { name: 'Interior Design', href: '/services/interior' }
  ]

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-600' },
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-blue-400' },
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-600' },
    { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'hover:text-blue-700' },
    { name: 'YouTube', icon: Youtube, href: '#', color: 'hover:text-red-600' }
  ]

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-center mb-4">
              <Building2 className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-2xl font-bold">Piyush Lifespaces</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Creating dream homes and commercial spaces with excellence, innovation, and integrity. Your trusted partner in real estate development since 2009.
            </p>
            
            {/* Awards & Certifications */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center">
                <Award className="h-5 w-5 text-yellow-500 mr-1" />
                <span className="text-sm text-gray-300">ISO Certified</span>
              </div>
              <div className="flex items-center">
                <Home className="h-5 w-5 text-green-500 mr-1" />
                <span className="text-sm text-gray-300">RERA Approved</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className={`text-gray-400 ${social.color} transition-colors duration-300`}
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-white">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {service.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Info</h3>
            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">
                    123 Real Estate Avenue,<br />
                    Business District, Pune - 411001<br />
                    Maharashtra, India
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
                <div>
                  <a
                    href="tel:+919876543210"
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                  >
                    +91 98765 43210
                  </a>
                  <br />
                  <a
                    href="tel:+912012345678"
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                  >
                    +91 20 1234 5678
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
                <div>
                  <a
                    href="mailto:info@piyushlifespaces.com"
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                  >
                    info@piyushlifespaces.com
                  </a>
                  <br />
                  <a
                    href="mailto:sales@piyushlifespaces.com"
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                  >
                    sales@piyushlifespaces.com
                  </a>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">
                    Mon - Sat: 9:00 AM - 7:00 PM<br />
                    Sunday: 10:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between"
          >
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold text-white mb-2">
                Stay Updated with Our Latest Projects
              </h3>
              <p className="text-gray-300">
                Subscribe to get exclusive updates on new launches and offers.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent min-w-[250px]"
              />
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Piyush Lifespaces Pvt. Ltd. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link
                href="/privacy-policy"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-conditions"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              >
                Terms & Conditions
              </Link>
              <Link
                href="/sitemap"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
