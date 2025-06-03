'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

const FAQContact = () => {
  const router = useRouter();
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [brochureFormData, setBrochureFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // WhatsApp business number - replace with actual number
  const whatsappNumber = "+919876543210";
  const whatsappMessage = "Hello! I need assistance with your properties.";

  const handleScheduleCall = () => {
    router.push('/contact');
  };

  const handleRequestBrochure = () => {
    setShowBrochureModal(true);
  };

  const handleBrochureFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrochureFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleBrochureSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!brochureFormData.name || !brochureFormData.email || !brochureFormData.phone) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: brochureFormData.name,
          email: brochureFormData.email,
          phone: brochureFormData.phone,
          subject: 'Brochure Request',
          message: 'Please send me the company brochure with latest property details.',
          source: 'faq-brochure-request'
        }),
      });

      if (response.ok) {
        alert('Brochure request submitted! We will email you the brochure shortly.');
        setShowBrochureModal(false);
        setBrochureFormData({ name: '', email: '', phone: '' });
      } else {
        alert('Thank you for your interest! Please contact us at +91 98765 43210 to request our brochure.');
      }
    } catch (error) {
      alert('Thank you for your interest! Please contact us at +91 98765 43210 to request our brochure.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartChat = () => {
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };
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
              <p className="font-semibold text-orange-600">24/7 Support</p>              <button 
                className="mt-3 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors duration-300 text-sm font-medium"
                onClick={handleStartChat}
              >
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
            </p>            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
                onClick={handleScheduleCall}
              >
                Schedule a Call
              </button>
              <button 
                className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-300 font-medium"
                onClick={handleRequestBrochure}
              >
                Request Brochure
              </button>
            </div>          </div>
        </motion.div>
      </div>

      {/* Brochure Request Modal */}
      <AnimatePresence>
        {showBrochureModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowBrochureModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Request Brochure</h3>
                <button
                  onClick={() => setShowBrochureModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <form onSubmit={handleBrochureSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={brochureFormData.name}
                    onChange={handleBrochureFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={brochureFormData.email}
                    onChange={handleBrochureFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={brochureFormData.phone}
                    onChange={handleBrochureFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors duration-300 font-medium"
                  >
                    {isSubmitting ? 'Submitting...' : 'Send Brochure'}
                  </button>
                </div>
                
                <p className="text-xs text-gray-500 text-center">
                  We'll email you our latest property brochure with all the details.
                </p>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FAQContact;
