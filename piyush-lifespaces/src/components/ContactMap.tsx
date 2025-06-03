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
        >          {/* Map Container */}
          <div className="bg-gray-200 rounded-xl overflow-hidden shadow-lg h-96 relative">
            {/* Embedded Google Map for the exact location */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3727.283284724905!2d74.7496568757474!3d20.900919480716688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdec5c0a7047533%3A0xab3dbc6813784d6!2sPiyush%20Lifespaces%20Pvt.Ltd.Dhule!5e0!3m2!1sen!2sin!4v1748926535505!5m2!1sen!2sin"
              className="w-full h-full border-0"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Piyush Lifespaces Pvt.Ltd.Dhule Map"
            ></iframe>
            {/* Overlay with address and button - positioned in bottom-left corner */}
            <div className="absolute bottom-4 left-4 bg-white bg-opacity-95 rounded-lg p-4 shadow-lg max-w-xs">
              <div className="text-left">
                <div className="flex items-center mb-2">
                  <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    Piyush Lifespaces Office
                  </h3>
                </div>
                <p className="text-xs text-gray-600 mb-3">
                  Dhule, Maharashtra, India
                </p>
                <a
                  href="https://maps.app.goo.gl/rRY6BdArFsgsZALN8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors duration-300 inline-block"
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
