'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, Search } from 'lucide-react'

interface FAQ {
  id: number
  category: string
  question: string
  answer: string
}

const faqs: FAQ[] = [
  // General Questions
  {
    id: 1,
    category: 'General',
    question: 'What types of properties does Piyush Lifespaces develop?',
    answer: 'We develop a wide range of properties including residential apartments, luxury villas, commercial spaces, and mixed-use developments. Our portfolio includes 1BHK to 5BHK apartments, independent villas, office spaces, and retail properties across prime locations.'
  },
  {
    id: 2,
    category: 'General',
    question: 'In which cities does Piyush Lifespaces operate?',
    answer: 'We have projects across major Indian cities including Pune, Mumbai, Bangalore, Hyderabad, Chennai, and Delhi NCR. We focus on prime locations with excellent connectivity and growth potential.'
  },
  {
    id: 3,
    category: 'General',
    question: 'How long has Piyush Lifespaces been in business?',
    answer: 'Piyush Lifespaces has been in the real estate development business for over 15 years since 2009. We have successfully completed 50+ projects and delivered homes to 1000+ satisfied families.'
  },

  // Buying Process
  {
    id: 4,
    category: 'Buying Process',
    question: 'What is the typical buying process for a property?',
    answer: 'Our buying process includes: 1) Site visit and property selection, 2) Documentation and agreement signing, 3) Payment schedule setup, 4) Construction updates, 5) Pre-delivery inspection, 6) Final handover with all documents. We provide dedicated relationship managers to guide you through each step.'
  },
  {
    id: 5,
    category: 'Buying Process',
    question: 'What documents are required for property purchase?',
    answer: 'Required documents include: Identity proof (Aadhar/PAN), Address proof, Income proof (salary slips/ITR), Bank statements, and passport-size photographs. For loan cases, additional documents may be required by the bank.'
  },
  {
    id: 6,
    category: 'Buying Process',
    question: 'Can I visit the site before booking?',
    answer: 'Absolutely! We encourage site visits. Our sales team can arrange guided tours of our sample flats, ongoing projects, and completed properties. You can also explore virtual tours on our website for initial viewing.'
  },

  // Financing
  {
    id: 7,
    category: 'Financing',
    question: 'Do you assist with home loan processing?',
    answer: 'Yes, we have tie-ups with leading banks and financial institutions. Our dedicated loan assistance team helps with documentation, application processing, and getting competitive interest rates. We support you throughout the loan approval process.'
  },
  {
    id: 8,
    category: 'Financing',
    question: 'What are the payment options available?',
    answer: 'We offer flexible payment plans including: Construction-linked payment plan, Time-linked payment plan, Down payment + EMI options, and Special payment schemes during festival seasons. Payment can be made through cheques, NEFT, RTGS, or demand drafts.'
  },
  {
    id: 9,
    category: 'Financing',
    question: 'Is there any discount for early payment?',
    answer: 'Yes, we offer attractive discounts for upfront payments and early settlement of dues. The discount percentage varies by project and payment amount. Contact our sales team for current offers and schemes.'
  },

  // Construction & Delivery
  {
    id: 10,
    category: 'Construction',
    question: 'What is the typical construction timeline?',
    answer: 'Construction timelines vary by project size and type. Typically, apartments take 2-3 years, villas take 1.5-2 years, and commercial projects take 2-4 years. We provide regular construction updates and maintain transparency in timelines.'
  },
  {
    id: 11,
    category: 'Construction',
    question: 'Can I track the construction progress?',
    answer: 'Yes, we provide regular construction updates through photos, videos, and site visit opportunities. Customers receive monthly progress reports and can schedule site visits to monitor construction quality and progress.'
  },
  {
    id: 12,
    category: 'Construction',
    question: 'What quality standards do you follow?',
    answer: 'We follow strict quality standards with premium materials and fittings. All projects are ISO certified and RERA approved. We conduct regular quality audits and provide warranties on construction and fittings.'
  }
]

const categories = ['All', 'General', 'Buying Process', 'Financing', 'Construction']

export default function FAQSection() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <div>
                  <span className="text-xs text-blue-600 font-medium mb-1 block">
                    {faq.category}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {faq.question}
                  </h3>
                </div>
                {openFAQ === faq.id ? (
                  <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              
              <AnimatePresence>
                {openFAQ === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-gray-700 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredFAQs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-500 mb-4">
              No FAQs found matching your search criteria.
            </div>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('All')
              }}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
