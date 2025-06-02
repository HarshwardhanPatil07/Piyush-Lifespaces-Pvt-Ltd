'use client'

import { motion } from 'framer-motion'

export default function ContactMap() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Find Us on the Map
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Visit our office or explore our project locations. We're strategically located in the heart of the business district.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          {/* Map Container */}
          <div className="bg-gray-200 rounded-xl overflow-hidden shadow-lg h-96 relative">
            {/* Placeholder for actual map integration */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="text-center">
                <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Piyush Lifespaces Office
                </h3>
                <p className="text-gray-600 mb-4">
                  123 Real Estate Avenue<br />
                  Business District, Pune - 411001
                </p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 inline-block"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* Map Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow-lg p-6 text-center"
            >
              <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Easy Parking</h3>
              <p className="text-gray-600 text-sm">
                Complimentary parking available for all visitors
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-lg shadow-lg p-6 text-center"
            >
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Public Transport</h3>
              <p className="text-gray-600 text-sm">
                Metro station and bus stops within walking distance
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-lg shadow-lg p-6 text-center"
            >
              <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Flexible Hours</h3>
              <p className="text-gray-600 text-sm">
                Extended hours and weekend appointments available
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Directions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-gray-50 rounded-xl p-8"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
            How to Reach Us
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">By Car</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Take NH-4 and exit at Business District</li>
                <li>• Follow signs to Real Estate Avenue</li>
                <li>• Free parking available in our building</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">By Public Transport</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Metro: Business District Station (Line 2)</li>
                <li>• Bus: Routes 45, 67, 89 stop nearby</li>
                <li>• Auto/Taxi: Easily available from all areas</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
