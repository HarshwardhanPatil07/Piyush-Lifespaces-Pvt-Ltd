import mongoose from 'mongoose'

export interface IReview extends mongoose.Document {
  name: string
  email: string
  phone?: string
  location: string
  rating: number
  review: string
  property: string
  propertyType: 'residential' | 'commercial'
  category: 'quality' | 'service' | 'location' | 'amenities' | 'value'
  verified: boolean
  helpful: number
  status: 'pending' | 'approved' | 'rejected'
  createdAt: Date
  updatedAt: Date
}

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  review: {
    type: String,
    required: true,
    trim: true
  },
  property: {
    type: String,
    required: true,
    trim: true
  },
  propertyType: {
    type: String,
    required: true,
    enum: ['residential', 'commercial']
  },
  category: {
    type: String,
    required: true,
    enum: ['quality', 'service', 'location', 'amenities', 'value']
  },
  verified: {
    type: Boolean,
    default: false
  },
  helpful: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true
})

// Add indexes for better query performance
reviewSchema.index({ status: 1, createdAt: -1 })
reviewSchema.index({ property: 1 })
reviewSchema.index({ rating: 1 })
reviewSchema.index({ category: 1 })

export default mongoose.models.Review || mongoose.model<IReview>('Review', reviewSchema)
