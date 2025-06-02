'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Filter, Grid, List } from 'lucide-react'

export default function ProjectsFilter() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'residential', name: 'Residential' },
    { id: 'commercial', name: 'Commercial' },
    { id: 'villa', name: 'Villas' },
    { id: 'apartment', name: 'Apartments' }
  ]

  const statuses = [
    { id: 'all', name: 'All Status' },
    { id: 'ongoing', name: 'Ongoing' },
    { id: 'completed', name: 'Completed' },
    { id: 'upcoming', name: 'Upcoming' }
  ]

  return (
    <section className="py-8 bg-gray-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row items-center justify-between gap-6"
        >
          {/* Filter Options */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Filters:</span>
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <div className="flex flex-wrap gap-2">
              {statuses.map((status) => (
                <button
                  key={status.id}
                  onClick={() => setSelectedStatus(status.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedStatus === status.id
                      ? 'bg-green-600 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {status.name}
                </button>
              ))}
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">View:</span>
            <div className="bg-white rounded-lg border border-gray-200 p-1 flex">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-all duration-300 ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-all duration-300 ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-sm text-gray-600"
        >
          Showing 12 of 50+ projects
        </motion.div>
      </div>
    </section>
  )
}
