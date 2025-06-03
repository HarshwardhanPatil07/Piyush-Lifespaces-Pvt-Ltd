'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Quote, Filter, Search, Calendar, MapPin, Home, Send, ThumbsUp, X } from 'lucide-react'

interface Review {
  id: number | string
  name: string
  email?: string
  location: string
  rating: number
  review: string
  image?: string
  property: string
  propertyType: 'residential' | 'commercial'
  date: string
  verified: boolean
  helpful: number
  category: 'quality' | 'service' | 'location' | 'amenities' | 'value'
  createdAt?: string
}

interface ReviewStats {
  total: number
  average: number
  distribution: { [key: number]: number }
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [selectedProperty, setSelectedProperty] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [showNewReviewForm, setShowNewReviewForm] = useState(false)
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'rating' | 'helpful'>('newest')
  const [loading, setLoading] = useState(true)
  const [properties, setProperties] = useState<string[]>([])
  const [apiStats, setApiStats] = useState<ReviewStats | null>(null)

  // New review form state
  const [newReview, setNewReview] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    property: '',
    propertyType: 'residential' as 'residential' | 'commercial',
    rating: 5,
    category: 'quality' as 'quality' | 'service' | 'location' | 'amenities' | 'value',
    review: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Fetch reviews from API
  const fetchReviews = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        sortBy,
        limit: '50'
      })
      
      const response = await fetch(`/api/reviews?${params}`)
      const data = await response.json()
      
      if (data.success) {
        // Transform the data to match our interface
        const transformedReviews = data.data.reviews.map((review: any) => ({
          ...review,
          id: review._id || review.id,
          image: review.image || "/api/placeholder/80/80",
          date: review.createdAt ? new Date(review.createdAt).toISOString().split('T')[0] : review.date
        }))
        
        setReviews(transformedReviews)
        setProperties(data.data.properties)
        setApiStats(data.data.stats)
      }
    } catch (error) {
      console.error('Error fetching reviews:', error)
      // Set empty array if API fails
      setReviews([])
      setProperties([])
    } finally {
      setLoading(false)
    }
  }

  // Initial load
  useEffect(() => {
    fetchReviews()
  }, [sortBy])

  // Calculate review statistics
  const calculateStats = (): ReviewStats => {
    if (apiStats) return apiStats
    
    const total = reviews.length
    const average = total > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / total : 0
    const distribution = reviews.reduce((acc, review) => {
      acc[review.rating] = (acc[review.rating] || 0) + 1
      return acc
    }, {} as { [key: number]: number })
    
    return { total, average, distribution }
  }
  const stats = calculateStats()

  // Calculate satisfaction rate (percentage of 4+ star reviews)
  const calculateSatisfactionRate = (): number => {
    const reviewsToCalculate = apiStats ? 
      Object.entries(apiStats.distribution) : 
      reviews.map(r => ({ rating: r.rating }))
    
    if (apiStats) {
      const totalReviews = Object.values(apiStats.distribution).reduce((sum, count) => sum + count, 0)
      const satisfiedReviews = Object.entries(apiStats.distribution)
        .filter(([rating]) => parseInt(rating) >= 4)
        .reduce((sum, [, count]) => sum + count, 0)
      return totalReviews > 0 ? (satisfiedReviews / totalReviews) * 100 : 0
    } else {
      const totalReviews = reviews.length
      const satisfiedReviews = reviews.filter(review => review.rating >= 4).length
      return totalReviews > 0 ? (satisfiedReviews / totalReviews) * 100 : 0
    }
  }

  const satisfactionRate = calculateSatisfactionRate()

  // Get unique categories for filters
  const categories = ['quality', 'service', 'location', 'amenities', 'value']

  // Filter and sort reviews
  useEffect(() => {
    let filtered = reviews.filter(review => {
      const matchesSearch = review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          review.review.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          review.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          review.location.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesRating = selectedRating ? review.rating === selectedRating : true
      const matchesProperty = selectedProperty ? review.property === selectedProperty : true
      const matchesCategory = selectedCategory ? review.category === selectedCategory : true
      
      return matchesSearch && matchesRating && matchesProperty && matchesCategory
    })

    // Sort reviews (client-side sorting since we're getting limited data)
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case 'rating':
          return b.rating - a.rating
        case 'helpful':
          return b.helpful - a.helpful
        default:
          return 0
      }
    })

    setFilteredReviews(filtered)
  }, [reviews, searchTerm, selectedRating, selectedProperty, selectedCategory, sortBy])

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const starSize = size === 'sm' ? 'h-4 w-4' : size === 'md' ? 'h-5 w-5' : 'h-6 w-6'
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview)
      })
      
      const data = await response.json()
      
      if (data.success) {
        setNewReview({
          name: '',
          email: '',
          phone: '',
          location: '',
          property: '',
          propertyType: 'residential',
          rating: 5,
          category: 'quality',
          review: ''
        })
        setShowNewReviewForm(false)
        alert('Thank you for your review! It will be published after verification.')
        // Refresh reviews to get updated data
        fetchReviews()
      } else {
        alert(data.message || 'Error submitting review. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting review:', error)
      alert('Error submitting review. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleHelpfulClick = async (reviewId: string | number) => {
    try {
      const response = await fetch('/api/reviews', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reviewId: reviewId.toString(),
          action: 'helpful'
        })
      })
      
      if (response.ok) {
        setReviews(prev => prev.map(review => 
          review.id.toString() === reviewId.toString()
            ? { ...review, helpful: review.helpful + 1 }
            : review
        ))
      }
    } catch (error) {
      console.error('Error updating helpful count:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading reviews...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Customer Reviews & Testimonials
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Discover what our valued customers say about their experience with Piyush Lifespaces. 
              Real reviews from real families who chose us for their dream homes.
            </p>
            
            {/* Review Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{stats.total}+</div>
                <div className="text-blue-100">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-4xl font-bold mr-2">{stats.average.toFixed(1)}</span>
                  {renderStars(Math.round(stats.average), 'lg')}
                </div>
                <div className="text-blue-100">Average Rating</div>
              </div>              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{satisfactionRate.toFixed(0)}%</div>
                <div className="text-blue-100">Satisfaction Rate</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Filters */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </h3>
              
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Reviews</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search by name, property, or content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <select
                  value={selectedRating || ''}
                  onChange={(e) => setSelectedRating(e.target.value ? parseInt(e.target.value) : null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>

              {/* Property Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Property</label>
                <select
                  value={selectedProperty}
                  onChange={(e) => setSelectedProperty(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Properties</option>
                  {properties.map((property) => (
                    <option key={property} value={property}>{property}</option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="rating">Highest Rating</option>
                  <option value="helpful">Most Helpful</option>
                </select>
              </div>

              {/* Write Review Button */}
              <button
                onClick={() => setShowNewReviewForm(true)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 flex items-center justify-center"
              >
                <Send className="h-4 w-4 mr-2" />
                Write a Review
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Customer Reviews ({filteredReviews.length})
                </h2>
                <p className="text-gray-600 mt-1">
                  Showing {filteredReviews.length} of {reviews.length} reviews
                </p>
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
              {filteredReviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-shrink-0">
                      <img
                        src={review.image || "/api/placeholder/80/80"}
                        alt={review.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900 flex items-center">
                            {review.name}
                            {review.verified && (
                              <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                Verified
                              </span>
                            )}
                          </h3>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            {review.location}
                            <span className="mx-2">•</span>
                            <Home className="h-4 w-4 mr-1" />
                            {review.property}
                            <span className="mx-2">•</span>
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(review.date).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="mt-2 md:mt-0 text-right">
                          {renderStars(review.rating)}
                          <div className="text-sm text-gray-600 mt-1 capitalize">
                            {review.category}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <Quote className="h-5 w-5 text-gray-400 mb-2" />
                        <p className="text-gray-700 leading-relaxed">{review.review}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className={`px-3 py-1 rounded-full text-xs ${
                          review.propertyType === 'residential' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {review.propertyType.charAt(0).toUpperCase() + review.propertyType.slice(1)}
                        </span>
                        
                        <button 
                          onClick={() => handleHelpfulClick(review.id)}
                          className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors"
                        >
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          Helpful ({review.helpful})
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredReviews.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search terms to find more reviews.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedRating(null)
                    setSelectedProperty('')
                    setSelectedCategory('')
                  }}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New Review Modal */}
      {showNewReviewForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Write a Review</h2>                <button
                  onClick={() => setShowNewReviewForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                    <input
                      type="text"
                      required
                      value={newReview.name}
                      onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={newReview.email}
                      onChange={(e) => setNewReview({...newReview, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={newReview.phone}
                      onChange={(e) => setNewReview({...newReview, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                    <input
                      type="text"
                      required
                      value={newReview.location}
                      onChange={(e) => setNewReview({...newReview, location: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="City, State"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Property *</label>
                    <input
                      type="text"
                      required
                      value={newReview.property}
                      onChange={(e) => setNewReview({...newReview, property: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Property name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Property Type *</label>
                    <select
                      required
                      value={newReview.propertyType}
                      onChange={(e) => setNewReview({...newReview, propertyType: e.target.value as any})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rating *</label>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview({...newReview, rating: star})}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`h-8 w-8 ${
                              star <= newReview.rating 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300 hover:text-yellow-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                    <select
                      required
                      value={newReview.category}
                      onChange={(e) => setNewReview({...newReview, category: e.target.value as any})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="quality">Quality</option>
                      <option value="service">Service</option>
                      <option value="location">Location</option>
                      <option value="amenities">Amenities</option>
                      <option value="value">Value</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Review *</label>
                  <textarea
                    required
                    rows={4}
                    value={newReview.review}
                    onChange={(e) => setNewReview({...newReview, review: e.target.value})}
                    placeholder="Share your experience with Piyush Lifespaces..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowNewReviewForm(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
