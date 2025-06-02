'use client';

import React from 'react';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const FAQContact = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Still Have Questions?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Our friendly team is here to help you with any queries about our properties and services.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Phone Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Call Us</h3>
            <p className="text-gray-600 mb-4">Speak with our experts</p>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Sales Enquiry</p>
              <p className="font-semibold text-blue-600">+91 98765 43210</p>
              <p className="text-sm text-gray-500 mt-2">Customer Support</p>
              <p className="font-semibold text-blue-600">+91 98765 43211</p>
            </div>
          </motion.div>

          {/* Email Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Us</h3>
            <p className="text-gray-600 mb-4">Get detailed responses</p>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">General Inquiries</p>
              <p className="font-semibold text-green-600">info@piyushlifespaces.com</p>
              <p className="text-sm text-gray-500 mt-2">Sales Team</p>
              <p className="font-semibold text-green-600">sales@piyushlifespaces.com</p>
            </div>
          </motion.div>

          {/* Office Visit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
          >
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Visit Us</h3>
            <p className="text-gray-600 mb-4">Meet us in person</p>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Head Office</p>
              <p className="font-semibold text-purple-600 text-sm">123 Business District, Mumbai, Maharashtra 400001</p>
              <p className="text-sm text-gray-500 mt-2">Open: Mon-Sat 9AM-7PM</p>
            </div>
          </motion.div>

          {/* Live Chat */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
          >
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Live Chat</h3>
            <p className="text-gray-600 mb-4">Instant assistance</p>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Available</p>
              <p className="font-semibold text-orange-600">24/7 Support</p>
              <button className="mt-3 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors duration-300 text-sm font-medium">
                Start Chat
              </button>
            </div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need Immediate Assistance?
            </h3>
            <p className="text-gray-600 mb-6">
              Our property consultants are ready to help you find your dream home or answer any questions about our projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium">
                Schedule a Call
              </button>
              <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-300 font-medium">
                Request Brochure
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQContact;
